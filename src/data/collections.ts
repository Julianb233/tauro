import { Property } from "./properties";

export interface PropertyCollection {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  filter: (property: Property) => boolean;
}

const URBAN_NEIGHBORHOODS = [
  "Rittenhouse",
  "Center City",
  "Old City",
  "Fishtown",
  "Northern Liberties",
];

export const collections: PropertyCollection[] = [
  {
    slug: "modern-luxury",
    name: "Modern Luxury",
    tagline: "New construction meets world-class design",
    description:
      "Philadelphia's finest new-build and recently renovated properties. Sleek finishes, smart-home technology, and contemporary architecture — built for the way you live now.",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    filter: (p) => p.yearBuilt >= 2019 && p.price >= 800_000,
  },
  {
    slug: "historic-charm",
    name: "Historic Charm",
    tagline: "Timeless character, modern comfort",
    description:
      "Pre-war brownstones, colonial gems, and converted warehouses that honor Philadelphia's rich history. Original details preserved alongside thoughtful modern updates.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    filter: (p) => p.yearBuilt < 1950,
  },
  {
    slug: "urban-living",
    name: "Urban Living",
    tagline: "Walk to everything that matters",
    description:
      "Prime locations in Philadelphia's most walkable neighborhoods. Steps from world-class dining, nightlife, and culture — the city at your doorstep.",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
    filter: (p) => URBAN_NEIGHBORHOODS.includes(p.neighborhood),
  },
  {
    slug: "best-value",
    name: "Best Value",
    tagline: "Smart investments under $700K",
    description:
      "Exceptional properties at accessible price points. Emerging neighborhoods, first-time buyer opportunities, and investment-grade homes with serious upside potential.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    filter: (p) => p.price < 700_000,
  },
];

export function getCollectionBySlug(
  slug: string,
): PropertyCollection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getCollectionProperties(
  collection: PropertyCollection,
  properties: Property[],
): Property[] {
  return properties.filter(collection.filter);
}
