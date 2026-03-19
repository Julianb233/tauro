import { properties } from "@/data/properties";

// TODO: Upgrade to properties.filter(p => p.featured) when featured flag is added
export const featuredProperties = properties.slice(0, 3);
