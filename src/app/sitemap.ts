import { MetadataRoute } from "next";
import { loadProperties, loadNeighborhoods, loadAgents } from "@/lib/data";
import { siteUrl } from "@/lib/site-config";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [properties, neighborhoods, agents] = await Promise.all([loadProperties(), loadNeighborhoods(), loadAgents()]);

  const staticPages = [
    "", "/properties", "/agents", "/join", "/contact", "/book-tour", "/sell",
    "/neighborhoods", "/buyers-guide", "/sellers-guide", "/market-insights",
    "/faq", "/home-value", "/why-join", "/about", "/privacy", "/terms", "/careers", "/sitemap-page",
  ].map((path) => ({ url: `${siteUrl}${path}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: path === "" ? 1.0 : 0.7 }));

  const propertyPages = properties.map((p) => ({ url: `${siteUrl}/properties/${p.slug}`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 }));
  const neighborhoodPages = neighborhoods.map((n) => ({ url: `${siteUrl}/neighborhoods/${n.slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 }));
  const agentPages = agents.map((a) => ({ url: `${siteUrl}/agents/${a.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 }));
  const locationLandingPages = neighborhoods.map((n) => ({ url: `${siteUrl}/homes-for-sale-in-${n.slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 }));

  return [...staticPages, ...propertyPages, ...neighborhoodPages, ...agentPages, ...locationLandingPages];
}
