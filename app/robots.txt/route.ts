import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://dicom.gouni.edu.ng";

  const content = `
# Global rules
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /private/
Crawl-delay: 10

# Specific rules for major search engines
User-agent: Googlebot
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /private/
Crawl-delay: 5

User-agent: Bingbot
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /private/
Crawl-delay: 10

# Allow Google News bot
User-agent: Googlebot-News
Allow: /achievements/
Allow: /news/
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /private/

# Allow Google Images bot
User-agent: Googlebot-Image
Allow: /*.jpg$
Allow: /*.jpeg$
Allow: /*.gif$
Allow: /*.png$
Allow: /*.webp$

# Host
Host: ${baseUrl}

# Sitemaps
Sitemap: ${baseUrl}/sitemap-index.xml
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
