/**
 * Data loading module — the single entry point for all data fetching.
 *
 * Tries Supabase first via dynamic imports; gracefully falls back to static
 * data if environment variables are not set or the query fails.
 *
 * Dynamic imports are used intentionally to prevent the linter from stripping
 * the Supabase imports (which appear unused when env vars are not configured).
 */

import {
  properties as staticProperties,
  getPropertyBySlug as staticGetPropertyBySlug,
} from "@/data/properties";
import type { Property } from "@/data/properties";

import {
  agents as staticAgents,
  getAgentBySlug as staticGetAgentBySlug,
} from "@/data/agents";
import type { Agent } from "@/data/agents";

import {
  neighborhoods as staticNeighborhoods,
  getNeighborhoodBySlug as staticGetNeighborhoodBySlug,
  getFeaturedNeighborhoods as staticGetFeaturedNeighborhoods,
} from "@/data/neighborhoods";
import type { Neighborhood } from "@/data/neighborhoods";

import { testimonials as staticTestimonials } from "@/data/testimonials";
import type { Testimonial } from "@/data/testimonials";

import {
  buyerFaqs as staticBuyerFaqs,
  sellerFaqs as staticSellerFaqs,
  generalFaqs as staticGeneralFaqs,
} from "@/data/faq";
import type { FaqItem } from "@/data/faq";

import { homepageNeighborhoods as staticHomepageNeighborhoods } from "@/data/homepage-neighborhoods";
import type { HomepageNeighborhood } from "@/data/homepage-neighborhoods";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function hasSupabase(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

async function getQueries() {
  return import("@/lib/supabase/queries");
}

async function getMappers() {
  return import("@/lib/supabase/mappers");
}

// ---------------------------------------------------------------------------
// Properties
// ---------------------------------------------------------------------------

export async function loadProperties(): Promise<Property[]> {
  if (!hasSupabase()) return staticProperties;
  try {
    const queries = await getQueries();
    const mappers = await getMappers();
    const result = await queries.getProperties({ limit: 1000 });
    return (result?.data ?? []).map(mappers.mapPropertyRow);
  } catch {
    return staticProperties;
  }
}

export async function loadPropertyBySlug(
  slug: string,
): Promise<Property | undefined> {
  if (!hasSupabase()) return staticGetPropertyBySlug(slug);
  try {
    const queries = await getQueries();
    const mappers = await getMappers();
    const row = await queries.getPropertyBySlug(slug);
    return mappers.mapPropertyRow(row);
  } catch {
    return staticGetPropertyBySlug(slug);
  }
}

export async function loadFeaturedProperties(): Promise<Property[]> {
  if (!hasSupabase()) return staticProperties.slice(0, 6);
  try {
    const queries = await getQueries();
    const mappers = await getMappers();
    const result = await queries.getFeaturedProperties(6);
    return (result ?? []).map(mappers.mapPropertyRow);
  } catch {
    return staticProperties.slice(0, 6);
  }
}

// ---------------------------------------------------------------------------
// Agents
// ---------------------------------------------------------------------------

export async function loadAgents(): Promise<Agent[]> {
  if (!hasSupabase()) return staticAgents;
  try {
    const queries = await getQueries();
    const mappers = await getMappers();
    const result = await queries.getAgents();
    return (result ?? []).map(mappers.mapAgentRow);
  } catch {
    return staticAgents;
  }
}

export async function loadAgentBySlug(
  slug: string,
): Promise<{ agent: Agent; listings: Property[] } | null> {
  if (!hasSupabase()) {
    const agent = staticGetAgentBySlug(slug);
    if (!agent) return null;
    const listings = staticProperties.filter((p) =>
      agent.activeListingIds.includes(p.id),
    );
    return { agent, listings };
  }
  try {
    const queries = await getQueries();
    const mappers = await getMappers();
    const row = await queries.getAgentBySlug(slug);
    const agent = mappers.mapAgentRow(row);
    const rawProperties = (row as Record<string, unknown>).properties;
    const listings = Array.isArray(rawProperties)
      ? rawProperties.map(mappers.mapPropertyRow)
      : [];
    return { agent, listings };
  } catch {
    const agent = staticGetAgentBySlug(slug);
    if (!agent) return null;
    const listings = staticProperties.filter((p) =>
      agent.activeListingIds.includes(p.id),
    );
    return { agent, listings };
  }
}

// ---------------------------------------------------------------------------
// Neighborhoods
// ---------------------------------------------------------------------------

export async function loadNeighborhoods(): Promise<Neighborhood[]> {
  if (!hasSupabase()) return staticNeighborhoods;
  try {
    const queries = await getQueries();
    const mappers = await getMappers();
    const result = await queries.getNeighborhoods();
    return (result ?? []).map(mappers.mapNeighborhoodRow);
  } catch {
    return staticNeighborhoods;
  }
}

export async function loadNeighborhoodBySlug(
  slug: string,
): Promise<Neighborhood | undefined> {
  if (!hasSupabase()) return staticGetNeighborhoodBySlug(slug);
  try {
    const queries = await getQueries();
    const mappers = await getMappers();
    const row = await queries.getNeighborhoodBySlug(slug);
    return mappers.mapNeighborhoodRow(row);
  } catch {
    return staticGetNeighborhoodBySlug(slug);
  }
}

export async function loadFeaturedNeighborhoods(): Promise<Neighborhood[]> {
  if (!hasSupabase()) return staticGetFeaturedNeighborhoods();
  try {
    const queries = await getQueries();
    const mappers = await getMappers();
    const result = await queries.getFeaturedNeighborhoods();
    return (result ?? []).map(mappers.mapNeighborhoodRow);
  } catch {
    return staticGetFeaturedNeighborhoods();
  }
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

export async function loadTestimonials(): Promise<Testimonial[]> {
  if (!hasSupabase()) return staticTestimonials;
  try {
    const queries = await getQueries();
    const mappers = await getMappers();
    const result = await queries.getTestimonials();
    return (result ?? []).map(mappers.mapTestimonialRow);
  } catch {
    return staticTestimonials;
  }
}

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

export async function loadFaqs(
  category?: "buyer" | "seller" | "general",
): Promise<FaqItem[]> {
  const staticFallback = () => {
    switch (category) {
      case "buyer":
        return staticBuyerFaqs;
      case "seller":
        return staticSellerFaqs;
      case "general":
        return staticGeneralFaqs;
      default:
        return [...staticBuyerFaqs, ...staticSellerFaqs, ...staticGeneralFaqs];
    }
  };

  if (!hasSupabase()) return staticFallback();
  try {
    const queries = await getQueries();
    const mappers = await getMappers();
    const result = await queries.getFaqs(category);
    return (result ?? []).map(mappers.mapFaqRow);
  } catch {
    return staticFallback();
  }
}

// ---------------------------------------------------------------------------
// Homepage Neighborhoods (for the showcase component)
// ---------------------------------------------------------------------------

export async function loadHomepageNeighborhoods(): Promise<
  HomepageNeighborhood[]
> {
  if (!hasSupabase()) return staticHomepageNeighborhoods;
  try {
    const queries = await getQueries();
    const mappers = await getMappers();
    const result = await queries.getFeaturedNeighborhoods();
    return (result ?? []).map((row): HomepageNeighborhood => {
      const n = mappers.mapNeighborhoodRow(row);
      return {
        name: n.name,
        slug: n.slug,
        description: n.tagline,
        image: n.cardImage || n.image,
        listings: 0,
      };
    });
  } catch {
    return staticHomepageNeighborhoods;
  }
}
