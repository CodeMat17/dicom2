import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { NextResponse } from "next/server";

interface SitemapRoute {
  url: string;
  lastmod: string;
  changefreq: string;
  priority: string;
  image?: {
    url: string;
    title?: string;
    caption?: string;
  };
}

export async function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://dicom.gouni.edu.ng";

  // Fetch dynamic data
  const achievements = await fetchQuery(api.achievements.getAllAchievements);

  // Static routes with enhanced metadata
  const staticRoutes: SitemapRoute[] = [
    {
      url: baseUrl,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: "1.0",
      image: {
        url: `${baseUrl}/opengraph-image.jpg`,
        title: "DICOM - Directorate of Competitions",
        caption: "Empowering Students Through Competition and Excellence",
      },
    },
    {
      url: `${baseUrl}/about-us`,
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: "0.8",
      image: {
        url: `${baseUrl}/about-us/opengraph-image.jpg`,
        title: "About DICOM",
        caption: "Learn about our mission and vision",
      },
    },
    {
      url: `${baseUrl}/achievements`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: "0.9",
      image: {
        url: `${baseUrl}/achievements/opengraph-image.jpg`,
        title: "Our Achievements",
        caption: "Celebrating student excellence and achievements",
      },
    },
    {
      url: `${baseUrl}/partnership`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: "0.9",
      image: {
        url: `${baseUrl}/partnership/opengraph-image.jpg`,
        title: "Partner with DICOM",
        caption: "Strategic partnerships for academic excellence",
      },
    },
    {
      url: `${baseUrl}/testimonials`,
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: "0.7",
      image: {
        url: `${baseUrl}/testimonials/opengraph-image.jpg`,
        title: "Student Testimonials",
        caption: "Success stories from our students",
      },
    },
    {
      url: `${baseUrl}/our-staff`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: "0.9",
      image: {
        url: `${baseUrl}/our-staff/opengraph-image.jpg`,
        title: "Our Staff",
        caption: "Meet our dedicated team",
      },
    },
    {
      url: `${baseUrl}/contact-us`,
      lastmod: new Date().toISOString(),
      changefreq: "monthly",
      priority: "0.5",
      image: {
        url: `${baseUrl}/contact-us/opengraph-image.jpg`,
        title: "Contact DICOM",
        caption: "Get in touch with us",
      },
    },
  ];

  // Dynamic achievement routes with enhanced metadata
  const achievementRoutes: SitemapRoute[] =
    achievements
      ?.map((achievement): SitemapRoute => {
        const route: SitemapRoute = {
          url: `${baseUrl}/achievements/${achievement.slug}`,
          lastmod: new Date(achievement._creationTime).toISOString(),
          changefreq: "weekly",
          priority: "0.6",
        };

        // Only add image if photoUrl exists
        if (achievement.photoUrl) {
          route.image = {
            url: achievement.photoUrl.startsWith("https")
              ? achievement.photoUrl
              : `${baseUrl}${achievement.photoUrl}`,
            title: achievement.title,
            caption: achievement.description,
          };
        }

        return route;
      })
      .filter((route): route is SitemapRoute => Boolean(route)) || [];

  // Combine all routes
  const allRoutes = [...staticRoutes, ...achievementRoutes];

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
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
            ${
              route.image.title
                ? `<image:title>${route.image.title}</image:title>`
                : ""
            }
            ${
              route.image.caption
                ? `<image:caption>${route.image.caption}</image:caption>`
                : ""
            }
          </image:image>`
              : ""
          }
        </url>`
        )
        .join("")}
    </urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
