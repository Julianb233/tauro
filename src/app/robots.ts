import { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/proposal/", "/login/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
