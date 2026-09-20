import { SITE_URL } from "@/lib/structured-data";
import type { MetadataRoute } from "next";

// A static file. The previous version set a Crawl-delay, which Google ignores
// and which only ever slowed down the crawlers that do honour it.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
