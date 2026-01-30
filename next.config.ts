import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Required for GitHub Pages
  basePath: "/astro-workshop", // Required for GitHub Pages sub-folder deployment
  images: {
    unoptimized: true, // Required for GitHub Pages
  },
};

export default nextConfig;
