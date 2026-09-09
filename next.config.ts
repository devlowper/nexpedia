import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Unsplash (used in mock data)
      { protocol: "https", hostname: "images.unsplash.com" },
      // Google Favicon API (used for tool logos)
      { protocol: "https", hostname: "www.google.com" },
      // Common AI tool logo CDNs
      { protocol: "https", hostname: "*.unsplash.com" },
      { protocol: "https", hostname: "ph-files.imgix.net" },
      { protocol: "https", hostname: "ph-avatars.imgix.net" },
      // ProductHunt thumbnails
      { protocol: "https", hostname: "*.imgix.net" },
    ],
  },
};

export default nextConfig;
