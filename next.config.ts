import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/atharv_portfolio",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
      },
    ],
  },
};

export default nextConfig;
