import type { NextConfig } from "next";

/**
 * Response headers for every route.
 *
 * There is deliberately no script nonce in the CSP: a nonce has to be minted
 * per request, which would make every page dynamic and put rendering back on
 * the server. The pages here are static files on the CDN, so the policy is
 * written to be enforceable on a cached document — it pins where scripts,
 * images and connections may come from, and blocks framing outright.
 */
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      // Next's hydration payload and the inline bootstrap are unhashed inline
      // scripts; see the note above on why this is not nonce-based.
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://res.cloudinary.com https://*.convex.cloud",
      "font-src 'self' data:",
      "connect-src 'self' https://*.convex.cloud https://*.convex.site",
      "upgrade-insecure-requests",
    ].join("; "),
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uncommon-turtle-638.convex.cloud",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    // Photographs are cached by the optimiser for a month rather than the
    // default minute, so a returning visitor — and the next build — reuse
    // work that has already been paid for.
    minimumCacheTTL: 2592000,
  },
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // The old hand-rolled sitemap routes; both are now served by app/sitemap.ts.
      { source: "/sitemap-index.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/sitemap-news.xml", destination: "/sitemap.xml", permanent: true },
    ];
  },
};

export default nextConfig;
