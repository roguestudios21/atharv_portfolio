import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const isCloudflare = process.env.CF_PAGES === "1";
const basePath = isGithubActions ? "/atharv_portfolio" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath,
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
