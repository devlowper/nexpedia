import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advertise & Sponsored Deals | proCraft Partner Hub",
  description:
    "Promote your AI tools, prompt engineering models, and creative software to 50,000+ active creators on proCraft. Explore advertising packages, banner placements, and verified partner deals.",
  alternates: {
    canonical: "/ads",
  },
  openGraph: {
    title: "Advertise with proCraft — Sponsor & Deals Hub",
    description:
      "Reach targeted AI creators, prompt engineers, and tech innovators with custom sponsorships, directory placements, and high-impact showcase banners.",
    url: "https://procraft.site/ads",
    siteName: "proCraft",
    type: "website",
  },
};

export default function AdsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
