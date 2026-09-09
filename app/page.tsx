import { HeroSection } from "@/components/home/HeroSection";
import { VibeCarousel } from "@/components/home/VibeCarousel";
import { LatestModels } from "@/components/home/LatestModels";
import { ModelAwareWorkflows } from "@/components/home/ModelAwareWorkflows";
import { UseCases } from "@/components/home/UseCases";
import { AIImagePrompts } from "@/components/home/AIImagePrompts";
import { AIPromptWorkspace } from "@/components/home/AIPromptWorkspace";
import { FAQ } from "@/components/home/FAQ";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      <HeroSection />
      <VibeCarousel />
      <div className="w-full">
        <UseCases />
      </div>
      <div className="w-full">
        <AIImagePrompts />
      </div>
      <div className="w-full">
        <LatestModels />
      </div>
      <div className="w-full">
        <AIPromptWorkspace />
      </div>
      <div className="w-full">
        <ModelAwareWorkflows />
      </div>
      <div className="w-full">
        <FAQ />
      </div>
    </div>
  );
}
