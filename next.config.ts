import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/astro-workshop", // Needed for GitHub Pages subdirectory
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: "/astro-workshop",
  },
};

export default nextConfig;
