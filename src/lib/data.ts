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
    if (!row) return staticGetPropertyBySlug(slug);
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
    const data = await queries.getFeaturedProperties(6);
    if (!data) return staticProperties.slice(0, 6);
    return data.map(mappers.mapPropertyRow);
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
    const data = await queries.getAgents();
    if (!data) return staticAgents;
    return data.map(mappers.mapAgentRow);
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
    if (!row) {
      const agent = staticGetAgentBySlug(slug);
      if (!agent) return null;
      const listings = staticProperties.filter((p) =>
        agent.activeListingIds.includes(p.id),
      );
      return { agent, listings };
    }
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

/** Count active listings per neighborhood by matching propertyFilter. */
function enrichWithListingCounts(
  neighborhoods: Neighborhood[],
  properties: Property[],
): Neighborhood[] {
  const countByFilter = new Map<string, number>();
  for (const p of properties) {
    const key = p.neighborhood.toLowerCase();
    countByFilter.set(key, (countByFilter.get(key) ?? 0) + 1);
  }
  return neighborhoods.map((n) => {
    const count = countByFilter.get(n.propertyFilter.toLowerCase()) ?? 0;
    if (count === n.marketData.activeListings) return n;
    return {
      ...n,
      marketData: { ...n.marketData, activeListings: count },
    };
  });
}

export async function loadNeighborhoods(): Promise<Neighborhood[]> {
  if (!hasSupabase()) {
    return enrichWithListingCounts(staticNeighborhoods, staticProperties);
  }
  try {
    const queries = await getQueries();
    const mappers = await getMappers();
    const [neighborhoodData, propertyData] = await Promise.all([
      queries.getNeighborhoods(),
      queries.getProperties({ limit: 5000 }),
    ]);
    const neighborhoods = (neighborhoodData ?? []).map(mappers.mapNeighborhoodRow);
    const properties = (propertyData?.data ?? []).map(mappers.mapPropertyRow);
    return enrichWithListingCounts(
      neighborhoods.length ? neighborhoods : staticNeighborhoods,
      properties.length ? properties : staticProperties,
    );
  } catch {
    return enrichWithListingCounts(staticNeighborhoods, staticProperties);
  }
}

export async function loadNeighborhoodBySlug(
  slug: string,
): Promise<Neighborhood | undefined> {
  if (!hasSupabase()) {
    const n = staticGetNeighborhoodBySlug(slug);
    if (!n) return undefined;
    return enrichWithListingCounts([n], staticProperties)[0];
  }
  try {
    const queries = await getQueries();
    const mappers = await getMappers();
    const row = await queries.getNeighborhoodBySlug(slug);
    const neighborhood = row
      ? mappers.mapNeighborhoodRow(row)
      : staticGetNeighborhoodBySlug(slug);
    if (!neighborhood) return undefined;
    const propertyData = await queries.getProperties({ limit: 5000 });
    const properties = (propertyData?.data ?? []).map(mappers.mapPropertyRow);
    return enrichWithListingCounts(
      [neighborhood],
      properties.length ? properties : staticProperties,
    )[0];
  } catch {
    const n = staticGetNeighborhoodBySlug(slug);
    if (!n) return undefined;
    return enrichWithListingCounts([n], staticProperties)[0];
  }
}

export async function loadFeaturedNeighborhoods(): Promise<Neighborhood[]> {
  if (!hasSupabase()) {
    return enrichWithListingCounts(
      staticGetFeaturedNeighborhoods(),
      staticProperties,
    );
  }
  try {
    const queries = await getQueries();
    const mappers = await getMappers();
    const [neighborhoodData, propertyData] = await Promise.all([
      queries.getFeaturedNeighborhoods(),
      queries.getProperties({ limit: 5000 }),
    ]);
    const neighborhoods = (neighborhoodData ?? []).map(mappers.mapNeighborhoodRow);
    const properties = (propertyData?.data ?? []).map(mappers.mapPropertyRow);
    return enrichWithListingCounts(
      neighborhoods.length ? neighborhoods : staticGetFeaturedNeighborhoods(),
      properties.length ? properties : staticProperties,
    );
  } catch {
    return enrichWithListingCounts(
      staticGetFeaturedNeighborhoods(),
      staticProperties,
    );
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
    const data = await queries.getTestimonials();
    if (!data) return staticTestimonials;
    return data.map(mappers.mapTestimonialRow);
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
    const data = await queries.getFaqs(category);
    if (!data) return staticFallback();
    return data.map(mappers.mapFaqRow);
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
    const [data, propertyData] = await Promise.all([
      queries.getFeaturedNeighborhoods(),
      queries.getProperties({ limit: 5000 }),
    ]);
    if (!data) return staticHomepageNeighborhoods;
    const properties = (propertyData?.data ?? []).map(mappers.mapPropertyRow);
    const neighborhoods = data.map(mappers.mapNeighborhoodRow);
    const enriched = enrichWithListingCounts(neighborhoods, properties);
    return enriched.map((n): HomepageNeighborhood => ({
      name: n.name,
      slug: n.slug,
      description: n.tagline,
      image: n.cardImage || n.image,
      listings: n.marketData.activeListings,
    }));
  } catch {
    return staticHomepageNeighborhoods;
  }
}
