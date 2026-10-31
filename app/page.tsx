import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/home/HeroSection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Best AI Prompt Library & AI Directory | ProCraft",
  description:
    "Discover the best AI prompts, explore powerful AI tools, and unlock your creativity with ProCraft. Access ready-to-use prompts for ChatGPT, Gemini, Claude, DeepSeek, Midjourney, Nano Banana, and FLUX.",
  keywords: [
    "best ai prompt library",
    "ai directory",
    "best ai tools",
    "trending ai prompt styles",
    "trending ai image prompts",
    "best ai prompts for work and creativity",
    "popular ai prompt categories",
    "chatgpt prompts",
    "midjourney prompts",
    "flux prompts",
    "nano banana prompts",
    "gemini prompts",
    "claude prompts",
    "deepseek prompts",
    "image to prompt",
    "free ai prompts",
    "procraft"
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Best AI Prompt Library & AI Directory | ProCraft",
    description:
      "Discover the best AI prompts, explore powerful AI tools, and unlock your creativity with ProCraft. Ready-to-use prompts for ChatGPT, Gemini, Claude, DeepSeek, Midjourney, Nano Banana, and FLUX.",
    url: "/",
  },
};

// ── Performance Optimization: Dynamically load below-the-fold sections ──
// Slashes initial homepage JS bundle and Total Blocking Time (TBT)
const VibeCarousel = dynamic(
  () => import("@/components/home/VibeCarousel").then((mod) => mod.VibeCarousel),
  {
    loading: () => <div className="w-full h-[520px] bg-black/[0.02] dark:bg-white/[0.02]" />,
  }
);

const UseCases = dynamic(
  () => import("@/components/home/UseCases").then((mod) => mod.UseCases),
  {
    loading: () => <div className="w-full h-[600px] bg-black/[0.02] dark:bg-white/[0.02]" />,
  }
);

const AIImagePrompts = dynamic(
  () => import("@/components/home/AIImagePrompts").then((mod) => mod.AIImagePrompts),
  {
    loading: () => <div className="w-full h-[600px] bg-black/[0.02] dark:bg-white/[0.02]" />,
  }
);

const PopularCategories = dynamic(
  () => import("@/components/home/PopularCategories").then((mod) => mod.PopularCategories),
  {
    loading: () => <div className="w-full h-[500px] bg-black/[0.02] dark:bg-white/[0.02]" />,
  }
);

const AIPromptWorkspace = dynamic(
  () => import("@/components/home/AIPromptWorkspace").then((mod) => mod.AIPromptWorkspace),
  {
    loading: () => <div className="w-full h-[550px] bg-black/[0.02] dark:bg-white/[0.02]" />,
  }
);

const ModelAwareWorkflows = dynamic(
  () => import("@/components/home/ModelAwareWorkflows").then((mod) => mod.ModelAwareWorkflows),
  {
    loading: () => <div className="w-full h-[550px] bg-black/[0.02] dark:bg-white/[0.02]" />,
  }
);

const FAQ = dynamic(
  () => import("@/components/home/FAQ").then((mod) => mod.FAQ),
  {
    loading: () => <div className="w-full h-[600px] bg-black/[0.02] dark:bg-white/[0.02]" />,
  }
);

const SponsoredCard = dynamic(
  () => import("@/components/ads/SponsoredCard").then((mod) => mod.SponsoredCard),
  {
    loading: () => <div className="w-full max-w-5xl h-36 bg-black/[0.02] dark:bg-white/[0.02] rounded-2xl" />,
  }
);

const AdsterraBanner = dynamic(
  () => import("@/components/ads/AdsterraBanner").then((mod) => mod.AdsterraBanner),
  {
    loading: () => <div className="w-[320px] h-[50px] bg-black/[0.02] dark:bg-white/[0.02] rounded-xl" />,
  }
);

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* ── Above-the-fold critical Hero (Instant render for LCP) ── */}
      <HeroSection />
      
      {/* ── Below-the-fold Sections (Progressively revealed & lazy loaded) ── */}
      <ScrollReveal className="w-full">
        <VibeCarousel />
      </ScrollReveal>

      <ScrollReveal className="w-full" delay={0.05}>
        <UseCases />
      </ScrollReveal>

      <ScrollReveal className="w-full" delay={0.05}>
        <AIImagePrompts />
      </ScrollReveal>

      <ScrollReveal className="w-full" delay={0.05}>
        <PopularCategories />
      </ScrollReveal>

      <ScrollReveal className="w-full" delay={0.05}>
        <AIPromptWorkspace />
      </ScrollReveal>

      <ScrollReveal className="w-full" delay={0.05}>
        <ModelAwareWorkflows />
      </ScrollReveal>

      <ScrollReveal className="w-full" delay={0.05}>
        <FAQ />
      </ScrollReveal>

      {/* Sponsored Partner Card under FAQ */}
      <ScrollReveal className="w-full px-4" delay={0.05}>
        <SponsoredCard variant="banner" />
      </ScrollReveal>

      {/* Bottom Ad Banners (320x50) */}
      <div className="w-full flex flex-wrap items-center justify-center gap-4 my-6 px-4">
        <AdsterraBanner format="320x50" />
        <AdsterraBanner format="320x50" />
      </div>
    </div>
  );
}
