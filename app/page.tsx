import { HeroSection } from "@/components/home/HeroSection";
import { VibeCarousel } from "@/components/home/VibeCarousel";
import { ModelAwareWorkflows } from "@/components/home/ModelAwareWorkflows";
import { UseCases } from "@/components/home/UseCases";
import { AIImagePrompts } from "@/components/home/AIImagePrompts";
import { PopularCategories } from "@/components/home/PopularCategories";
import { AIPromptWorkspace } from "@/components/home/AIPromptWorkspace";
import { FAQ } from "@/components/home/FAQ";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

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

      <ScrollReveal className="w-full" delay={0.2}>
        <AIPromptWorkspace />
      </ScrollReveal>

      <ScrollReveal className="w-full" delay={0.1}>
        <ModelAwareWorkflows />
      </ScrollReveal>

      <ScrollReveal className="w-full" delay={0.2}>
        <FAQ />
      </ScrollReveal>
    </div>
  );
}
