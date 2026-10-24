import type { NextConfig } from "next";
import os from "os";

function getLocalDevOrigins(): string[] {
  const origins = new Set<string>([
    "localhost",
    "127.0.0.1",
    "10.88.79.223",
    "10.88.79.223:3000",
    "10.215.133.223",
    "10.215.133.223:3000",
  ]);

  try {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name] || []) {
        if (iface.family === "IPv4" && !iface.internal) {
          origins.add(iface.address);
          origins.add(`${iface.address}:3000`);
          origins.add(`${iface.address}:3001`);
        }
      }
    }
  } catch {
    // ignore
  }

  return Array.from(origins);
}

const nextConfig: NextConfig = {
  output: "standalone",
  // @ts-ignore
  allowedDevOrigins: getLocalDevOrigins(),
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
      // ImgBB
      { protocol: "https", hostname: "i.ibb.co" },
      // GitHub Avatars
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "github.com" },
    ],
  },
};

export default nextConfig;
