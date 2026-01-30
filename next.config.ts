import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repoName = "/astro-workshop";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? repoName : undefined,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? repoName : "",
  },
};

export default nextConfig;
