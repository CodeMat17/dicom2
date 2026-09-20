import { getAllAchievements } from "@/lib/server-data";
import { SITE_URL } from "@/lib/structured-data";
import type { MetadataRoute } from "next";

// Generated at build time and refreshed on the same schedule as the pages it
// lists, so crawling the sitemap never runs a query on the request path.
export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const achievements = await getAllAchievements();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/achievements`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/our-staff`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/about-us`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/partnership`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/gallery`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/testimonials`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/contact-us`, changeFrequency: "yearly", priority: 0.5 },
  ];

  const storyRoutes: MetadataRoute.Sitemap = (achievements ?? []).map(
    (achievement) => ({
      url: `${SITE_URL}/achievements/${achievement.slug}`,
      lastModified: new Date(
        achievement.publishedAt ?? achievement._creationTime
      ),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })
  );

  return [...staticRoutes, ...storyRoutes];
}
