import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://dicom.gouni.edu.ng";

  // Fetch dynamic data
  const achievements = await fetchQuery(api.achievements.getAllAchievements);

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/achievements`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/partnership`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/our-staff`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ] as MetadataRoute.Sitemap;

  // Dynamic achievement routes with images
  const achievementRoutes =
    achievements?.map((achievement) => {
      // Base route
      const route = {
        url: `${baseUrl}/achievements/${achievement.slug}`,
        lastModified: new Date(achievement._creationTime),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      };

      // Add image URL if available
      if (achievement.photoUrl) {
        const imageUrl = achievement.photoUrl.startsWith("https")
          ? achievement.photoUrl
          : `${baseUrl}${achievement.photoUrl}`;

        return {
          ...route,
          images: [imageUrl],
        };
      }

      return route;
    }) || [];

  // Combine all routes
  return [...staticRoutes, ...achievementRoutes];
}
