import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uncommon-turtle-638.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
