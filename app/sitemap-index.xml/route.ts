import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://dicom.gouni.edu.ng";
  const currentDate = new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <sitemap>
        <loc>${baseUrl}/sitemap.xml</loc>
        <lastmod>${currentDate}</lastmod>
      </sitemap>
      <sitemap>
        <loc>${baseUrl}/sitemap-news.xml</loc>
        <lastmod>${currentDate}</lastmod>
      </sitemap>
    </sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
