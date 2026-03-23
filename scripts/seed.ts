/**
 * Tauro Real Estate — Database Seed Script
 *
 * Reads all static data from src/data/*.ts and upserts it into
 * Supabase PostgreSQL tables. Idempotent — safe to run multiple times.
 *
 * Usage:
 *   npm run seed
 *
 * Requires .env.local with:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import { config } from "dotenv";
config({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";
import type { Database } from "../src/types/database";

// ---------------------------------------------------------------------------
// Static data imports
// ---------------------------------------------------------------------------
import { agents } from "../src/data/agents";
import { properties } from "../src/data/properties";
import { neighborhoods } from "../src/data/neighborhoods";
import { testimonials } from "../src/data/testimonials";
import { buyerFaqs, sellerFaqs, generalFaqs } from "../src/data/faq";

// ---------------------------------------------------------------------------
// Validate env
// ---------------------------------------------------------------------------
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "Missing required environment variables.\n" +
      "Ensure .env.local contains:\n" +
      "  NEXT_PUBLIC_SUPABASE_URL\n" +
      "  SUPABASE_SERVICE_ROLE_KEY\n",
  );
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Create admin Supabase client (bypasses RLS with service role key)
// ---------------------------------------------------------------------------
const supabase = createClient<Database>(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function fail(table: string, error: { message: string; details?: string }): never {
  console.error(`\nFailed to seed "${table}":`);
  console.error(`  Message: ${error.message}`);
  if (error.details) console.error(`  Details: ${error.details}`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Seed functions
// ---------------------------------------------------------------------------

async function seedAgents() {
  const rows = agents.map((a) => ({
    slug: a.slug,
    first_name: a.firstName,
    last_name: a.lastName,
    title: a.title,
    email: a.email,
    phone: a.phone,
    photo: a.photo,
    bio: a.bio,
    short_bio: a.shortBio,
    specialties: a.specialties,
    neighborhoods: a.neighborhoods,
    stats: a.stats as Record<string, unknown>,
    awards: a.awards as Record<string, unknown>[],
    video_intro_url: a.videoIntroUrl,
    video_intro_id: a.videoIntroId,
    social: a.social as Record<string, unknown>,
    languages: a.languages,
    license_number: a.licenseNumber,
  }));

  const { data, error } = await supabase
    .from("agents")
    .upsert(rows, { onConflict: "slug" })
    .select();

  if (error) fail("agents", error);
  console.log(`Seeding agents... ${data!.length} rows upserted`);
}

async function seedNeighborhoods() {
  const rows = neighborhoods.map((n) => ({
    slug: n.slug,
    name: n.name,
    tagline: n.tagline,
    description: n.description,
    selling_points: n.sellingPoints,
    lifestyle: n.lifestyle as Record<string, unknown>,
    stats: n.stats as Record<string, unknown>,
    image: n.image,
    card_image: n.cardImage,
    map_center: n.mapCenter as Record<string, unknown>,
    property_filter: n.propertyFilter,
    featured: n.featured,
  }));

  const { data, error } = await supabase
    .from("neighborhoods")
    .upsert(rows, { onConflict: "slug" })
    .select();

  if (error) fail("neighborhoods", error);
  console.log(`Seeding neighborhoods... ${data!.length} rows upserted`);
}

async function seedProperties() {
  // Resolve agent UUIDs by email so we can set listing_agent_id FK
  const { data: dbAgents, error: agentErr } = await supabase
    .from("agents")
    .select("id, email");

  if (agentErr) fail("agents (lookup)", agentErr);

  const agentEmailToId = new Map(
    (dbAgents ?? []).map((a) => [a.email, a.id]),
  );

  const rows = properties.map((p) => ({
    slug: p.slug,
    address: p.address,
    city: p.city,
    state: p.state,
    zip: p.zip,
    neighborhood: p.neighborhood,
    price: p.price,
    beds: p.beds,
    baths: p.baths,
    sqft: p.sqft,
    lot_sqft: p.lotSqft,
    year_built: p.yearBuilt,
    status: p.status,
    property_type: p.propertyType,
    images: p.images,
    description: p.description,
    features_interior: p.features.interior,
    features_exterior: p.features.exterior,
    features_community: p.features.community,
    listing_agent_id: agentEmailToId.get(p.agent.email) ?? null,
    lat: p.lat,
    lng: p.lng,
    open_house: p.openHouse ?? null,
    open_house_date: p.openHouseEvent?.date ?? null,
    open_house_start: p.openHouseEvent?.startTime ?? null,
    open_house_end: p.openHouseEvent?.endTime ?? null,
    video_url: p.videoUrl ?? null,
    virtual_tour_url: p.virtualTourUrl ?? null,
    featured: false,
  }));

  const { data, error } = await supabase
    .from("properties")
    .upsert(rows, { onConflict: "slug" })
    .select();

  if (error) fail("properties", error);
  console.log(`Seeding properties... ${data!.length} rows upserted`);
}

async function seedTestimonials() {
  const rows = testimonials.map((t, i) => ({
    quote: t.quote,
    name: t.name,
    role: t.role,
    rating: t.rating,
    sort_order: i,
  }));

  const { data, error } = await supabase
    .from("testimonials")
    .upsert(rows, { onConflict: "name" })
    .select();

  if (error) fail("testimonials", error);
  console.log(`Seeding testimonials... ${data!.length} rows upserted`);
}

async function seedFaq() {
  const allFaqs = [
    ...buyerFaqs.map((f, i) => ({
      question: f.question,
      answer: f.answer,
      category: "buyer" as const,
      sort_order: i,
    })),
    ...sellerFaqs.map((f, i) => ({
      question: f.question,
      answer: f.answer,
      category: "seller" as const,
      sort_order: i,
    })),
    ...generalFaqs.map((f, i) => ({
      question: f.question,
      answer: f.answer,
      category: "general" as const,
      sort_order: i,
    })),
  ];

  const { data, error } = await supabase
    .from("faq")
    .upsert(allFaqs, { onConflict: "question" })
    .select();

  if (error) fail("faq", error);
  console.log(`Seeding FAQ... ${data!.length} rows upserted`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log("Starting Tauro database seed...\n");

  // Order matters: agents must be seeded before properties (FK dependency)
  await seedAgents();
  await seedNeighborhoods();
  await seedProperties();
  await seedTestimonials();
  await seedFaq();

  console.log("\nSeed complete!");
}

main().catch((err) => {
  console.error("Unexpected error during seeding:", err);
  process.exit(1);
});
