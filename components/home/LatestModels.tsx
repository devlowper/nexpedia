import React from 'react';
import Link from 'next/link';

const models = [
  { name: 'ChatGPT Image-2', image: '/models/model1.png', description: 'Advanced image generation with precise text', color: '#10a37f' },
  { name: 'Seedance 2.0', image: '/models/model2.png', description: 'Multi-modal AI video generation', color: '#10a37f' },
  { name: 'Nano Banana Pro', image: '/models/model3.png', description: 'Fast and efficient image generation', color: '#10a37f' },
  { name: 'Kling 3.0 Omni', image: '/models/model4.png', description: 'Enhanced multimodal references', color: '#10a37f' },
];

export function LatestModels() {
  const duplicatedModels = [...models, ...models, ...models];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16">
      <div className="flex justify-between items-end mb-8">
        <h2
          className="section-title font-bricolage text-[1.5rem] font-[700] tracking-[-0.5px]"
          style={{ fontFamily: '"Bricolage Grotesque", var(--font-bricolage), sans-serif' }}
        >
          Latest AI Models
        </h2>
        <Link href="/ai-models" className="text-muted text-sm hover:text-primary transition-colors">
          More &rarr;
        </Link>
      </div>

      <div className="relative w-full overflow-hidden pb-4">
        {/* Optional gradient fade at edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-base to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-base to-transparent z-10 pointer-events-none" />

        <div className="flex gap-4 w-max animate-scroll-left hover:[animation-play-state:paused]">
          {duplicatedModels.map((model, i) => {
            const words = model.name.split(' ');
            const firstPart = words.slice(0, -1).join(' ');
            const lastPart = words[words.length - 1];

            return (
              <div key={i} className="min-w-[280px] max-w-[280px] md:min-w-[320px] md:max-w-[320px] flex flex-col gap-3 group cursor-pointer shrink-0">
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-border/50 p-[2px]">
                  {/* Spinning light effect */}
                  <div className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,var(--brand-solid)_50%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Image mask */}
                  <div className="relative w-full h-full rounded-[10px] overflow-hidden bg-surface">
                    <img
                      src={model.image}
                      alt={model.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="flex flex-col px-1">
                  <h3 className="font-bold text-[15px] text-primary whitespace-normal">
                    {firstPart} <span className="text-accent">{lastPart}</span>
                  </h3>
                  <p className="text-muted text-[13px] mt-0.5 whitespace-normal">{model.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
