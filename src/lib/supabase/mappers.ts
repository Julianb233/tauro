/**
 * Mapper functions that convert database rows (snake_case) to the existing
 * component interfaces (camelCase). This keeps all UI components unchanged.
 */

import type { PropertyRow, AgentRow, NeighborhoodRow, TestimonialRow, FaqRow } from "@/types/database";
import type { Property } from "@/data/properties";
import type { Agent } from "@/data/agents";
import type { Neighborhood } from "@/data/neighborhoods";
import type { Testimonial } from "@/data/testimonials";
import type { FaqItem } from "@/data/faq";

// ---------------------------------------------------------------------------
// Properties
// ---------------------------------------------------------------------------

export function mapPropertyRow(row: PropertyRow & { agents?: Record<string, unknown> | null }): Property {
  const agent = row.agents as { full_name?: string; phone?: string; email?: string; photo?: string } | null | undefined;
  return {
    id: row.id,
    slug: row.slug,
    address: row.address,
    city: row.city,
    state: row.state,
    zip: row.zip,
    neighborhood: row.neighborhood,
    price: row.price,
    beds: row.beds,
    baths: row.baths,
    sqft: row.sqft,
    lotSqft: row.lot_sqft,
    yearBuilt: row.year_built ?? 0,
    status: row.status as Property["status"],
    propertyType: row.property_type as Property["propertyType"],
    images: row.images,
    description: row.description,
    features: {
      interior: row.features_interior ?? [],
      exterior: row.features_exterior ?? [],
      community: row.features_community ?? [],
    },
    agent: agent
      ? {
          name: (agent.full_name as string) ?? "",
          phone: (agent.phone as string) ?? "",
          email: (agent.email as string) ?? "",
          photo: (agent.photo as string) ?? "",
        }
      : { name: "", phone: "", email: "", photo: "" },
    lat: row.lat ?? 0,
    lng: row.lng ?? 0,
    openHouse: row.open_house ?? undefined,
    videoUrl: row.video_url ?? undefined,
    virtualTourUrl: row.virtual_tour_url ?? undefined,
  };
}

// ---------------------------------------------------------------------------
// Agents
// ---------------------------------------------------------------------------

export function mapAgentRow(row: AgentRow): Agent {
  return {
    id: row.id,
    slug: row.slug,
    firstName: row.first_name,
    lastName: row.last_name,
    fullName: row.full_name ?? `${row.first_name} ${row.last_name}`,
    title: row.title,
    email: row.email,
    phone: row.phone,
    photo: row.photo ?? "",
    bio: row.bio ?? "",
    shortBio: row.short_bio ?? "",
    specialties: row.specialties ?? [],
    neighborhoods: row.neighborhoods ?? [],
    stats: row.stats as Agent["stats"],
    awards: (row.awards as Agent["awards"]) ?? [],
    videoIntroUrl: row.video_intro_url ?? null,
    activeListingIds: [],
    soldListingIds: [],
    social: (row.social as Agent["social"]) ?? {},
    languages: row.languages ?? [],
    licenseNumber: row.license_number ?? "",
  };
}

// ---------------------------------------------------------------------------
// Neighborhoods
// ---------------------------------------------------------------------------

export function mapNeighborhoodRow(row: NeighborhoodRow): Neighborhood {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    tagline: row.tagline ?? "",
    description: row.description ?? "",
    sellingPoints: row.selling_points ?? [],
    lifestyle: row.lifestyle as Neighborhood["lifestyle"],
    stats: row.stats as Neighborhood["stats"],
    image: row.image ?? "",
    cardImage: row.card_image ?? "",
    mapCenter: (row.map_center as { lat: number; lng: number }) ?? { lat: 0, lng: 0 },
    propertyFilter: row.property_filter ?? "",
    featured: row.featured ?? false,
  };
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

export function mapTestimonialRow(row: TestimonialRow): Testimonial {
  return {
    quote: row.quote,
    name: row.name,
    role: row.role ?? "",
    rating: row.rating,
  };
}

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

export function mapFaqRow(row: FaqRow): FaqItem {
  return {
    question: row.question,
    answer: row.answer,
  };
}
