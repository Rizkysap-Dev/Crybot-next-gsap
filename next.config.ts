import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  basePath: "",
  assetPrefix: isProd ? "https://crybot-next-gsap.vercel.app" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
