'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ExternalLink,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { getNextDirectLink, DIRECT_LINKS } from '@/lib/monetagAd';

export interface SponsoredCardProps {
  variant?: 'banner' | 'card' | 'directory';
  className?: string;
  title?: string;
  description?: string;
  ctaText?: string;
  badge?: string;
  customHref?: string;
}

export function SponsoredCard({
  variant = 'banner',
  className = '',
  title = 'ProAI Studio — Free AI Prompts & Generative AI Tools',
  description = 'Discover verified Midjourney and FLUX prompt recipes alongside top-rated creator tools to streamline your AI workflow.',
  ctaText = 'Visit Sponsor',
  badge = 'Sponsors ads',
  customHref,
}: SponsoredCardProps) {
  // Deterministic initial state on both SSR and client to completely prevent hydration mismatch
  const [adUrl, setAdUrl] = useState<string>(() => customHref || DIRECT_LINKS[0]);

  useEffect(() => {
    if (!customHref) {
      setAdUrl(getNextDirectLink());
    }
  }, [customHref]);

  const handleLinkClick = () => {
    // Rotate to the next Monetag direct link for future clicks
    if (!customHref) {
      setAdUrl(getNextDirectLink());
    }
  };

  // ── Variant 1: Directory Row (For AI Directory Page between categories) ──
  if (variant === 'directory') {
    return (
      <a
        href={adUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        onClick={handleLinkClick}
        suppressHydrationWarning
        className={`w-full my-8 block group cursor-pointer select-none rounded-2xl border border-black/10 dark:border-white/10 hover:border-accent/40 bg-white dark:bg-[#111215] transition-colors ${className}`}
      >
        <div className="p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-center gap-3.5 sm:gap-4 flex-1">
            {/* Compact Clean Icon Box */}
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-accent/10 border border-accent/25 flex items-center justify-center shrink-0 text-accent">
              <Zap size={20} />
            </div>

            <div className="space-y-1.5 flex-1">
              {/* Only One Badge: Sponsors ads */}
              <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-accent/10 border border-accent/25 text-accent">
                  {badge}
                </span>
              </div>

              {/* Small SEO-Friendly Title */}
              <h3 className="text-base sm:text-lg font-bold font-bricolage text-neutral-900 dark:text-white group-hover:text-accent transition-colors leading-snug">
                {title}
              </h3>

              {/* SEO-Friendly Subtitle */}
              <p className="sponsor-card-desc text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-3xl font-normal">
                {description}
              </p>
            </div>
          </div>

          {/* Uiverse 2-Layer 3D Button Architecture (#2D2B2C) */}
          <div className="flex items-center shrink-0 w-full md:w-auto justify-end">
            <div className="relative inline-flex items-center justify-center p-[2px] rounded-[16px] bg-gradient-to-t from-[#1b1a1b] to-[#454244] group-hover:from-[#232122] group-hover:to-[#555254] shadow-[0_4px_14px_rgba(0,0,0,0.35)] group-hover:shadow-[0_6px_20px_rgba(0,0,0,0.5)] active:scale-95 transition-all select-none w-full md:w-auto">
              <span
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-[14px] bg-[#2D2B2C] group-hover:bg-[#383536] text-white font-bricolage font-bold text-xs sm:text-sm tracking-normal transition-colors whitespace-nowrap w-full"
                style={{ backgroundColor: '#2D2B2C', color: '#ffffff' }}
              >
                <span>{ctaText || 'Visit Sponsor'}</span>
                <ExternalLink size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </div>
          </div>
        </div>
      </a>
    );
  }

  // ── Variant 2: Card (For Multi-Column Grid Layouts) ──
  if (variant === 'card') {
    return (
      <a
        href={adUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        onClick={handleLinkClick}
        suppressHydrationWarning
        className={`block group cursor-pointer select-none rounded-2xl border border-black/10 dark:border-white/10 hover:border-accent/40 bg-white dark:bg-[#111215] transition-colors ${className}`}
      >
        <div className="p-5 flex flex-col justify-between h-full">
          <div className="space-y-3">
            {/* Only One Badge: Sponsors ads */}
            <div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-accent/10 border border-accent/25 text-accent">
                {badge}
              </span>
            </div>

            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/25 flex items-center justify-center text-accent">
              <Sparkles size={18} />
            </div>

            <div>
              <h3 className="font-bold text-base font-bricolage text-neutral-900 dark:text-white group-hover:text-accent transition-colors leading-snug">
                {title}
              </h3>
              <p className="sponsor-card-desc text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed mt-1.5 font-normal">
                {description}
              </p>
            </div>
          </div>

          {/* Uiverse 2-Layer 3D Button Architecture (#2D2B2C) */}
          <div className="pt-4 mt-3 border-t border-black/5 dark:border-white/10">
            <div className="relative flex items-center justify-center p-[2px] rounded-[16px] bg-gradient-to-t from-[#1b1a1b] to-[#454244] group-hover:from-[#232122] group-hover:to-[#555254] shadow-[0_4px_14px_rgba(0,0,0,0.35)] group-hover:shadow-[0_6px_20px_rgba(0,0,0,0.5)] active:scale-95 transition-all select-none w-full">
              <span
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-[14px] bg-[#2D2B2C] group-hover:bg-[#383536] text-white font-bricolage font-bold text-xs tracking-normal transition-colors"
                style={{ backgroundColor: '#2D2B2C', color: '#ffffff' }}
              >
                <span>{ctaText}</span>
                <ArrowRight size={13} />
              </span>
            </div>
          </div>
        </div>
      </a>
    );
  }

  // ── Variant 3: Banner (Default: For Homepage & Prompt Library Page) ──
  return (
    <a
      href={adUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      onClick={handleLinkClick}
      suppressHydrationWarning
      className={`w-full max-w-5xl mx-auto my-8 block group cursor-pointer select-none rounded-2xl border border-black/10 dark:border-white/10 hover:border-accent/40 bg-white dark:bg-[#111215] transition-colors ${className}`}
    >
      <div className="p-5 sm:p-7 md:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
        <div className="flex items-center gap-4 sm:gap-4.5 flex-1">
          {/* Compact Clean Icon Box */}
          <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-accent/10 border border-accent/25 flex items-center justify-center shrink-0 text-accent">
            <Sparkles size={22} />
          </div>

          <div className="space-y-2 flex-1">
            {/* Only One Badge: Sponsors ads */}
            <div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-accent/10 border border-accent/25 text-accent">
                {badge}
              </span>
            </div>

            {/* Small SEO-Friendly Title */}
            <h3 className="text-base sm:text-lg md:text-xl font-bold font-bricolage text-neutral-900 dark:text-white group-hover:text-accent transition-colors tracking-tight leading-snug">
              {title}
            </h3>

            {/* SEO-Friendly Subtitle */}
            <p className="sponsor-card-desc text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-2xl font-normal">
              {description}
            </p>
          </div>
        </div>

        {/* Uiverse 2-Layer 3D Button Architecture (#2D2B2C) */}
        <div className="flex items-center shrink-0 w-full lg:w-auto justify-end">
          <div className="relative inline-flex items-center justify-center p-[2px] rounded-[16px] bg-gradient-to-t from-[#1b1a1b] to-[#454244] group-hover:from-[#232122] group-hover:to-[#555254] shadow-[0_4px_14px_rgba(0,0,0,0.35)] group-hover:shadow-[0_6px_20px_rgba(0,0,0,0.5)] active:scale-95 transition-all select-none w-full lg:w-auto">
            <span
              className="flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-2.5 rounded-[14px] bg-[#2D2B2C] group-hover:bg-[#383536] text-white font-bricolage font-bold text-xs sm:text-sm tracking-normal transition-colors whitespace-nowrap w-full"
              style={{ backgroundColor: '#2D2B2C', color: '#ffffff' }}
            >
              <span>{ctaText}</span>
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
