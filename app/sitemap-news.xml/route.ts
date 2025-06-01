import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://dicom.gouni.edu.ng";

  // Fetch recent achievements (last 2 days)
  const achievements = await fetchQuery(api.achievements.getAllAchievements);
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  const recentAchievements = achievements?.filter(
    (achievement) => new Date(achievement._creationTime) >= twoDaysAgo
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
      ${recentAchievements
        ?.map(
          (achievement) => `
        <url>
          <loc>${baseUrl}/achievements/${achievement.slug}</loc>
          <news:news>
            <news:publication>
              <news:name>DICOM - Godfrey Okoye University</news:name>
              <news:language>en</news:language>
            </news:publication>
            <news:publication_date>${new Date(
              achievement._creationTime
            ).toISOString()}</news:publication_date>
            <news:title>${achievement.title}</news:title>
            <news:keywords>student achievements,competitions,academic excellence,${achievement.title
              .toLowerCase()
              .split(" ")
              .join(",")}</news:keywords>
          </news:news>
        </url>`
        )
        .join("")}
    </urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=1800", // 30 minutes cache
    },
  });
}
