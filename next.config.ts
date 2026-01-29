import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export", // Commented out for Vercel (Enables Image Optimization)
  images: {
    unoptimized: true, // Bypass optimization to fix Google Drive redirects
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
