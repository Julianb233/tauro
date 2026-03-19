/**
 * Data loading module — the single entry point for all data fetching.
 *
 * Returns static data from @/data/* modules.
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
// Properties
// ---------------------------------------------------------------------------

export async function loadProperties(): Promise<Property[]> {
  return staticProperties;
}

export async function loadPropertyBySlug(
  slug: string,
): Promise<Property | undefined> {
  return staticGetPropertyBySlug(slug);
}

export async function loadFeaturedProperties(): Promise<Property[]> {
  return staticProperties.slice(0, 6);
}

// ---------------------------------------------------------------------------
// Agents
// ---------------------------------------------------------------------------

export async function loadAgents(): Promise<Agent[]> {
  return staticAgents;
}

export async function loadAgentBySlug(
  slug: string,
): Promise<{ agent: Agent; listings: Property[] } | null> {
  const agent = staticGetAgentBySlug(slug);
  if (!agent) return null;
  const listings = staticProperties.filter((p) =>
    agent.activeListingIds.includes(p.id),
  );
  return { agent, listings };
}

// ---------------------------------------------------------------------------
// Neighborhoods
// ---------------------------------------------------------------------------

export async function loadNeighborhoods(): Promise<Neighborhood[]> {
  return staticNeighborhoods;
}

export async function loadNeighborhoodBySlug(
  slug: string,
): Promise<Neighborhood | undefined> {
  return staticGetNeighborhoodBySlug(slug);
}

export async function loadFeaturedNeighborhoods(): Promise<Neighborhood[]> {
  return staticGetFeaturedNeighborhoods();
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

export async function loadTestimonials(): Promise<Testimonial[]> {
  return staticTestimonials;
}

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

export async function loadFaqs(
  category?: "buyer" | "seller" | "general",
): Promise<FaqItem[]> {
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
}

// ---------------------------------------------------------------------------
// Homepage Neighborhoods (for the showcase component)
// ---------------------------------------------------------------------------

export async function loadHomepageNeighborhoods(): Promise<
  HomepageNeighborhood[]
> {
  return staticHomepageNeighborhoods;
}
