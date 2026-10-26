'use client';

import React from 'react';
import { Sparkles, ExternalLink, ArrowRight, Star, ShieldCheck, Zap } from 'lucide-react';
import { triggerMonetagSmartlink } from '@/lib/monetagAd';

interface SponsoredCardProps {
  variant?: 'banner' | 'card' | 'directory';
  className?: string;
  title?: string;
  description?: string;
}

export function SponsoredCard({
  variant = 'banner',
  className = '',
  title = 'ProAI Studio — Next-Gen AI Prompts & Generative Models',
  description = 'Supercharge your creative workflow with state-of-the-art AI prompt packs, instant multi-model generation, and high-converting asset automation.',
}: SponsoredCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerMonetagSmartlink();
  };

  if (variant === 'directory') {
    return (
      <div
        onClick={handleClick}
        className={`w-full my-8 group cursor-pointer select-none rounded-2xl p-[1px] bg-gradient-to-r from-accent/40 via-purple-500/30 to-blue-500/40 hover:from-accent hover:via-purple-500 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-accent/10 ${className}`}
      >
        <div className="bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl rounded-2xl p-6 md:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-purple-500/20 border border-accent/30 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
              <Zap className="text-accent" size={26} />
            </div>
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-accent/20 text-accent dark:bg-accent/20 dark:text-accent px-2.5 py-0.5 rounded-full border border-accent/40 flex items-center gap-1">
                  <Sparkles size={11} /> Sponsored Partner
                </span>
                <span className="text-xs text-muted font-medium flex items-center gap-1">
                  <Star size={12} className="text-yellow-500 fill-yellow-500" /> 4.9 (1,480+ users)
                </span>
                <span className="text-xs text-blue-500 font-semibold flex items-center gap-0.5">
                  <ShieldCheck size={13} /> Verified
                </span>
              </div>
              <h3 className="text-lg md:text-xl font-bold font-bricolage text-primary group-hover:text-accent transition-colors leading-snug">
                {title}
              </h3>
              <p className="text-xs md:text-sm text-black/60 dark:text-white/60 leading-relaxed max-w-3xl">
                {description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto justify-end">
            <button
              type="button"
              className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-accent text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-accent/90 group-hover:scale-105 transition-all shadow-md"
            >
              <span>Explore Sponsor</span>
              <ExternalLink size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Banner variant (for Home under FAQ and Prompt Library under Category list)
  return (
    <div
      onClick={handleClick}
      className={`w-full max-w-5xl mx-auto my-10 group cursor-pointer select-none rounded-2xl p-[1px] bg-gradient-to-r from-accent/30 via-pink-500/20 to-blue-500/30 hover:from-accent hover:via-pink-500 hover:to-blue-500 transition-all duration-300 shadow-xl ${className}`}
    >
      <div className="bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-accent/10 rounded-full blur-3xl pointer-events-none group-hover:bg-accent/20 transition-all" />

        <div className="flex items-start gap-5 flex-1 relative z-10">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-tr from-accent/20 via-pink-500/15 to-purple-500/20 border border-accent/40 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="text-accent" size={28} />
          </div>

          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-accent text-black px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                SPONSORED
              </span>
              <span className="text-xs text-muted font-medium flex items-center gap-1">
                <Star size={12} className="text-yellow-500 fill-yellow-500" /> Featured AI Partner
              </span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5">
                <ShieldCheck size={13} /> Official Selection
              </span>
            </div>

            <h3 className="text-lg md:text-2xl font-bold font-bricolage text-primary group-hover:text-accent transition-colors leading-snug">
              {title}
            </h3>

            <p className="text-xs md:text-sm text-black/60 dark:text-white/60 leading-relaxed max-w-2xl">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-center shrink-0 w-full md:w-auto justify-end relative z-10 pt-2 md:pt-0">
          <button
            type="button"
            className="w-full md:w-auto px-6 py-3 rounded-full bg-accent text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-accent/90 group-hover:scale-105 transition-all shadow-lg hover:shadow-accent/20"
          >
            <span>Visit Sponsor</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
