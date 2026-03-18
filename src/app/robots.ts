import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/proposal/"],
      },
    ],
    sitemap: "https://tauro.realty/sitemap.xml",
  };
}
