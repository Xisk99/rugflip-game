import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Fast builds for Vercel deployment */
  eslint: {
    // Disable ESLint during builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript checking during builds
    ignoreBuildErrors: true,
  },
  // Optimize for faster builds
  swcMinify: true,
  // Disable source maps in production for faster builds
  productionBrowserSourceMaps: false,
};

export default nextConfig;
