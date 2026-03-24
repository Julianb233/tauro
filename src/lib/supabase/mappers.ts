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
// Open house text parser — fallback when structured columns are absent
// Handles the display format: "Sat, Mar 22 · 1:00 PM - 4:00 PM"
// Returns undefined if the text cannot be reliably parsed.
// ---------------------------------------------------------------------------

const MONTH_MAP: Record<string, number> = {
  Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
  Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12,
};

function parseTime12h(raw: string): string | undefined {
  // e.g. "1:00 PM" or "12:30 AM"
  const m = raw.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) return undefined;
  let h = parseInt(m[1], 10);
  const min = m[2];
  const ampm = m[3].toUpperCase();
  if (ampm === "PM" && h !== 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  return `${h.toString().padStart(2, "0")}:${min}`;
}

function parseOpenHouseText(
  text: string | null,
): { date: string; startTime: string; endTime: string } | undefined {
  if (!text) return undefined;
  // Pattern: "Day, Mon DD · H:MM AM - H:MM PM"
  const m = text.match(/(\w{3}),\s+(\w{3})\s+(\d{1,2})\s+[·•]\s+([\d:]+\s*[AP]M)\s*[-–]\s*([\d:]+\s*[AP]M)/i);
  if (!m) return undefined;
  const [, , monthStr, dayStr, startRaw, endRaw] = m;
  const month = MONTH_MAP[monthStr];
  if (!month) return undefined;
  const day = parseInt(dayStr, 10);
  const year = new Date().getFullYear();
  const date = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
  const startTime = parseTime12h(startRaw);
  const endTime = parseTime12h(endRaw);
  if (!startTime || !endTime) return undefined;
  return { date, startTime, endTime };
}

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
    openHouseEvent: row.open_house_date
      ? {
          date: row.open_house_date as string,
          startTime: (row.open_house_start as string | null)?.slice(0, 5) ?? "12:00",
          endTime: (row.open_house_end as string | null)?.slice(0, 5) ?? "15:00",
        }
      : parseOpenHouseText(row.open_house ?? null),
    videoUrl: row.video_url ?? undefined,
    virtualTourUrl: row.virtual_tour_url ?? undefined,
    tax_annual: row.tax_annual ?? 0,
    tax_year: row.tax_year ?? 2025,
    hoa_fee: row.hoa_fee ?? undefined,
    hoa_frequency: row.hoa_frequency ?? undefined,
    has_hoa: row.has_hoa ?? false,
    // AI-3891: Comprehensive property details
    mlsNumber: row.mls_number ?? undefined,
    heating: row.heating ?? undefined,
    cooling: row.cooling ?? undefined,
    garage: row.garage ?? undefined,
    parkingSpaces: row.parking_spaces ?? undefined,
    stories: row.stories ?? undefined,
    construction: row.construction ?? undefined,
    flooring: row.flooring ?? [],
    roofType: row.roof_type ?? undefined,
    rooms: (row.rooms as Property["rooms"]) ?? [],
    isNewConstruction: row.is_new_construction ?? undefined,
    isComingSoon: row.is_coming_soon ?? undefined,
    isExclusive: row.is_exclusive ?? undefined,
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
    gallery: (row.gallery as string[]) ?? [],
    monthlyTrend: (row.monthly_trend as Neighborhood["monthlyTrend"]) ?? [],
    mapCenter: (row.map_center as { lat: number; lng: number }) ?? { lat: 0, lng: 0 },
    demographics: (row.demographics as Neighborhood["demographics"]) ?? {
      population: 0,
      medianHouseholdIncome: "$0",
      ownerOccupied: 0,
      renterOccupied: 0,
      medianAge: 0,
    },
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
    ...(row.video_url ? { videoUrl: row.video_url } : {}),
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
