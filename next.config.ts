import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Required for GitHub Pages
  images: {
    unoptimized: true, // Required for GitHub Pages (no server/image optimization)
  },
};

export default nextConfig;
