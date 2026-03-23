/**
 * Mapper functions that convert database rows (snake_case) to the existing
 * component interfaces (camelCase). This keeps all UI components unchanged.
 *
 * All mappers accept `any` to work with dynamic imports where TypeScript
 * cannot infer the exact Supabase row types.
 */

import type { Property } from "@/data/properties";
import type { Agent } from "@/data/agents";
import type { Neighborhood } from "@/data/neighborhoods";
import type { Testimonial } from "@/data/testimonials";
import type { FaqItem } from "@/data/faq";

// ---------------------------------------------------------------------------
// Properties
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapPropertyRow(row: any): Property {
  const agent = row.agents as { full_name?: string; phone?: string; email?: string; photo?: string; slug?: string } | null | undefined;
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
    lotSqft: row.lot_sqft ?? 0,
    yearBuilt: row.year_built ?? 0,
    status: row.status as Property["status"],
    propertyType: row.property_type as Property["propertyType"],
    images: row.images ?? [],
    description: row.description ?? "",
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
          slug: (agent.slug as string) ?? undefined,
        }
      : { name: "", phone: "", email: "", photo: "", slug: undefined },
    lat: row.lat ?? 0,
    lng: row.lng ?? 0,
    openHouse: row.open_house ?? undefined,
    videoUrl: row.video_url ?? undefined,
    virtualTourUrl: row.virtual_tour_url ?? undefined,
    tax_annual: row.tax_annual ?? 0,
    tax_year: row.tax_year ?? 2025,
    hoa_fee: row.hoa_fee ?? undefined,
    hoa_frequency: row.hoa_frequency ?? undefined,
    has_hoa: row.has_hoa ?? false,
  };
}

// ---------------------------------------------------------------------------
// Agents
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapAgentRow(row: any): Agent {
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
    videoIntroId: row.video_intro_id ?? null,
    activeListingIds: [],
    soldListingIds: [],
    soldListings: (row.sold_listings as Agent["soldListings"]) ?? [],
    social: (row.social as Agent["social"]) ?? {},
    languages: row.languages ?? [],
    licenseNumber: row.license_number ?? "",
  };
}

// ---------------------------------------------------------------------------
// Neighborhoods
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapNeighborhoodRow(row: any): Neighborhood {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    tagline: row.tagline ?? "",
    description: row.description ?? "",
    sellingPoints: row.selling_points ?? [],
    lifestyle: row.lifestyle as Neighborhood["lifestyle"],
    stats: row.stats as Neighborhood["stats"],
    marketData: (row.market_data as Neighborhood["marketData"]) ?? {
      medianPrice: (row.stats as Neighborhood["stats"])?.medianPrice ?? "$0",
      avgPricePerSqft: (row.stats as Neighborhood["stats"])?.avgPricePerSqft ?? "$0",
      medianDaysOnMarket: (row.stats as Neighborhood["stats"])?.avgDaysOnMarket ?? 0,
      activeListings: 0,
      priceChange12m: "+0.0%",
    },
    schools: (row.schools as Neighborhood["schools"]) ?? [],
    walkScore: row.walk_score ?? 0,
    transitScore: row.transit_score ?? 0,
    bikeScore: row.bike_score ?? 0,
    lifestyleInfo: (row.lifestyle_info as Neighborhood["lifestyleInfo"]) ?? {
      dining: "",
      nightlife: "",
      parks: "",
      culture: "",
    },
    localSpots: (row.local_spots as Neighborhood["localSpots"]) ?? [],
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapTestimonialRow(row: any): Testimonial {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapFaqRow(row: any): FaqItem {
  return {
    question: row.question,
    answer: row.answer,
  };
}
