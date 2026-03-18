import { MetadataRoute } from "next";
import { properties } from "@/data/properties";
import { neighborhoods } from "@/data/neighborhoods";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tauro.realty";

  const staticPages = [
    "", "/properties", "/agents", "/join", "/contact", "/book-tour", "/sell",
    "/neighborhoods", "/buyers-guide", "/sellers-guide", "/market-insights",
    "/faq", "/home-value", "/why-join", "/about",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const propertyPages = properties.map((p) => ({
    url: `${baseUrl}/properties/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  const neighborhoodPages = neighborhoods.map((n) => ({
    url: `${baseUrl}/neighborhoods/${n.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...propertyPages, ...neighborhoodPages];
}
