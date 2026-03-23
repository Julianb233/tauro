import { MetadataRoute } from "next";
import { loadProperties, loadNeighborhoods, loadAgents } from "@/lib/data";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://tauro.realty";
  const [properties, neighborhoods, agents] = await Promise.all([loadProperties(), loadNeighborhoods(), loadAgents()]);

  const staticPages = [
    "", "/properties", "/agents", "/join", "/contact", "/book-tour", "/sell",
    "/neighborhoods", "/buyers-guide", "/sellers-guide", "/market-insights",
    "/faq", "/home-value", "/why-join", "/about", "/privacy", "/terms", "/careers", "/sitemap-page",
  ].map((path) => ({ url: `${baseUrl}${path}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: path === "" ? 1.0 : 0.7 }));

  const propertyPages = properties.map((p) => ({ url: `${baseUrl}/properties/${p.slug}`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 }));
  const neighborhoodPages = neighborhoods.map((n) => ({ url: `${baseUrl}/neighborhoods/${n.slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 }));
  const agentPages = agents.map((a) => ({ url: `${baseUrl}/agents/${a.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 }));
  const homesForSalePages = neighborhoods.map((n) => ({ url: `${baseUrl}/homes-for-sale/${n.slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 }));
  const locationLandingPages = neighborhoods.map((n) => ({ url: `${baseUrl}/homes-for-sale-in-${n.slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 }));

  return [...staticPages, ...propertyPages, ...neighborhoodPages, ...agentPages, ...homesForSalePages, ...locationLandingPages];
}
