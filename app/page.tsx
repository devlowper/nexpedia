import { HeroSection } from "@/components/home/HeroSection";
import { VibeCarousel } from "@/components/home/VibeCarousel";
import { ModelAwareWorkflows } from "@/components/home/ModelAwareWorkflows";
import { UseCases } from "@/components/home/UseCases";
import { AIImagePrompts } from "@/components/home/AIImagePrompts";
import { PopularCategories } from "@/components/home/PopularCategories";
import { AIPromptWorkspace } from "@/components/home/AIPromptWorkspace";
import { FAQ } from "@/components/home/FAQ";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { AdsterraResponsiveBanner, AdsterraNativeBanner } from "@/components/ads/AdsterraBanner";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      <HeroSection />
      
      <ScrollReveal className="w-full">
        <VibeCarousel />
      </ScrollReveal>

      <ScrollReveal className="w-full" delay={0.1}>
        <UseCases />
      </ScrollReveal>

      <ScrollReveal className="w-full" delay={0.2}>
        <AIImagePrompts />
      </ScrollReveal>

      <ScrollReveal className="w-full" delay={0.2}>
        <PopularCategories />
      </ScrollReveal>

      {/* Adsterra Referral Banner */}
      <div className="w-full flex justify-center items-center py-6 px-4">
        {/* Desktop Banner (728x90) */}
        <a
          href="https://beta.publishers.adsterra.com/referral/K5FfRGDMU7"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="hidden sm:block hover:opacity-95 hover:scale-[1.01] transition-all"
        >
          <img
            alt="Adsterra Monetize Your Traffic"
            src="https://landings-cdn.adsterratech.com/referralBanners/png/728%20x%2090%20px.png"
            width={728}
            height={90}
            className="rounded-xl shadow-md max-w-full h-auto"
          />
        </a>

        {/* Mobile Banner (120x60) */}
        <a
          href="https://beta.publishers.adsterra.com/referral/K5FfRGDMU7"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="block sm:hidden hover:opacity-95 hover:scale-[1.02] transition-all"
        >
          <img
            alt="Adsterra Referral Banner"
            src="https://landings-cdn.adsterratech.com/referralBanners/png/120%20x%2060%20px.png"
            width={120}
            height={60}
            className="rounded-lg shadow-md h-auto"
          />
        </a>
      </div>

      <ScrollReveal className="w-full" delay={0.2}>
        <AIPromptWorkspace />
      </ScrollReveal>

      <ScrollReveal className="w-full" delay={0.1}>
        <ModelAwareWorkflows />
      </ScrollReveal>

      <ScrollReveal className="w-full" delay={0.2}>
        <FAQ />
      </ScrollReveal>

      {/* Bottom Ad Section */}
      <div className="w-full max-w-6xl mx-auto px-4 py-8 flex flex-col items-center">
        <AdsterraResponsiveBanner />
        <AdsterraNativeBanner />
      </div>
    </div>
  );
}
