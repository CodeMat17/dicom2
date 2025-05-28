import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { NextResponse } from "next/server";

interface SitemapImage {
  url: string;
}

interface SitemapRoute {
  url: string;
  lastmod: string;
  changefreq: string;
  priority: string;
  image?: SitemapImage;
}

export async function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://dicom.gouni.edu.ng";

  // Fetch dynamic data
  const achievements = await fetchQuery(api.achievements.getAllAchievements);

  // Static routes
  const staticRoutes: SitemapRoute[] = [
    {
      url: baseUrl,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: "1.0",
    },
    {
      url: `${baseUrl}/about-us`,
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: "0.8",
    },
    {
      url: `${baseUrl}/achievements`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: "0.9",
    },

    {
      url: `${baseUrl}/partnership`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: "0.9",
    },
    {
      url: `${baseUrl}/testimonials`,
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: "0.7",
    },
    {
      url: `${baseUrl}/our-staff`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: "0.9",
    },
    {
      url: `${baseUrl}/contact-us`,
      lastmod: new Date().toISOString(),
      changefreq: "monthly",
      priority: "0.5",
    },
  ];

  // Dynamic achievement routes
  const achievementRoutes: SitemapRoute[] =
    achievements?.map((achievement) => ({
      url: `${baseUrl}/achievements/${achievement.slug}`,
      lastmod: new Date(achievement._creationTime).toISOString(),
      changefreq: "weekly",
      priority: "0.6",
      // Add image if available
      ...(achievement.photoUrl && {
        image: {
          url: achievement.photoUrl.startsWith("https")
            ? achievement.photoUrl
            : `${baseUrl}${achievement.photoUrl}`,
        },
      }),
    })) || [];

  // Combine all routes
  const allRoutes = [...staticRoutes, ...achievementRoutes];

  // Create XML content
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${allRoutes
    .map(
      (route) => `
  <url>
    <loc>${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    ${
      route.image
        ? `
    <image:image>
      <image:loc>${route.image.url}</image:loc>
    </image:image>`
        : ""
    }
  </url>`
    )
    .join("")}
</urlset>`;

  return new NextResponse(xmlContent, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
