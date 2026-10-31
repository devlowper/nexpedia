"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search, Sparkles, X, ArrowRight, TrendingUp, Zap, Star, ShieldCheck,
  Flame, LayoutGrid, CheckCircle2, SlidersHorizontal
} from 'lucide-react';

interface AIDirectoryHeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  taxonomyMap: Record<string, string[]>;
  categoryConfig: Record<string, { from: string; to: string; icon: any; tagBg: string; tagText: string; iconColor: string }>;
  scrollToCategory: (cat: string) => void;
  totalToolsCount?: number;
}

const FLOATING_TOOLS = [
  {
    name: "Midjourney",
    category: "Image",
    logo: "/logos/midjourney.svg",
    pos: { left: "4%", top: "14%" },
    floatDuration: 7.2,
    floatY: 8,
    rotate: -4,
    mobileHide: false,
    mobilePos: { left: "3%", top: "8%" },
    mobileSize: 34,
  },
  {
    name: "Claude",
    category: "Writing",
    logo: "/logos/claude.svg",
    pos: { right: "4%", top: "16%" },
    floatDuration: 8.0,
    floatY: -8,
    rotate: 4,
    mobileHide: false,
    mobilePos: { right: "3%", top: "8%" },
    mobileSize: 34,
  },
  {
    name: "ChatGPT",
    category: "LLM",
    logo: "/logos/chatgpt.svg",
    pos: { left: "6%", top: "54%" },
    floatDuration: 6.8,
    floatY: 7,
    rotate: 3,
    mobileHide: true,
  },
  {
    name: "Gemini",
    category: "Multimodal",
    logo: "/logos/gemini.svg",
    pos: { right: "5%", top: "52%" },
    floatDuration: 7.5,
    floatY: -7,
    rotate: -3,
    mobileHide: true,
  },
];

const TRENDING_CHIPS = [
  { label: "Midjourney", query: "Midjourney" },
  { label: "Video Editing", query: "video" },
  { label: "Image Generators", query: "image" },
  { label: "Code Assistant", query: "code" },
  { label: "Voice & Audio", query: "audio" },
  { label: "Free Tools", query: "free" },
];

export function AIDirectoryHero({
  searchQuery,
  setSearchQuery,
  taxonomyMap,
  categoryConfig,
  scrollToCategory,
  totalToolsCount = 500,
}: AIDirectoryHeroProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <section className="relative w-full overflow-hidden pt-8 pb-10 md:pt-12 md:pb-16 flex flex-col items-center justify-center">
      {/* ── Background Atmosphere & Ambient Lighting ── */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        {/* Animated Radial Aurora Glows */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.28, 0.15],
            x: [0, 20, 0],
            y: [0, -15, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] md:w-[900px] h-[350px] md:h-[450px] rounded-full blur-[90px] md:blur-[130px]"
          style={{
            background: "radial-gradient(ellipse at center, rgba(255, 45, 120, 0.35) 0%, rgba(168, 85, 247, 0.2) 50%, transparent 80%)",
          }}
        />

        <motion.div
          animate={{
            scale: [1.1, 0.95, 1.1],
            opacity: [0.1, 0.22, 0.1],
            x: [0, -25, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[20%] left-[20%] w-[350px] md:w-[500px] h-[300px] rounded-full blur-[100px]"
          style={{
            background: "radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, transparent 70%)",
          }}
        />

        {/* Subtle Tech Architectural Grid with Radial Fade */}
        <div
          className="absolute inset-0 text-black/[0.04] dark:text-white/[0.03] opacity-60"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 85%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 85%)',
          }}
        />

        {/* Ambient Horizontal Horizon Line */}
        <motion.div
          animate={{
            opacity: [0.1, 0.25, 0.1],
            scaleX: [0.9, 1.05, 0.9],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[48%] left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent"
        />
      </div>

      {/* ── Ambient Floating 3D Tool Cards ── */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-[2]">
        {FLOATING_TOOLS.map((tool, idx) => (
          <motion.div
            key={tool.name}
            className={`absolute will-change-transform ${tool.mobileHide ? 'hidden md:flex' : 'flex'}`}
            style={{
              left: tool.pos.left,
              right: tool.pos.right,
              top: tool.pos.top,
            }}
            animate={{
              y: [0, -tool.floatY, 0, tool.floatY, 0],
              rotate: [tool.rotate, tool.rotate + 1.5, tool.rotate, tool.rotate - 1.5, tool.rotate],
            }}
            transition={{
              duration: tool.floatDuration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: idx * 0.8,
            }}
          >
            <div
              className="p-2 sm:p-2.5 rounded-2xl bg-white/70 dark:bg-zinc-900/80 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-[0_12px_28px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_28px_rgba(0,0,0,0.4)] flex items-center gap-2.5"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-black/5 dark:bg-white/5 p-1.5 flex items-center justify-center border border-black/5 dark:border-white/10">
                <img
                  src={tool.logo}
                  alt={tool.name}
                  className="w-full h-full object-contain"
                  loading="eager"
                />
              </div>
              <div className="hidden lg:block pr-1.5">
                <p className="text-xs font-bold text-primary leading-tight">{tool.name}</p>
                <p className="text-[10px] text-muted">{tool.category}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Main Content Container ── */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl mx-auto px-4 text-center">

        {/* Animated Top Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04] text-black/80 dark:text-white/90 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-6 cursor-default backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-black/40 dark:bg-white/40" />
          <span>
            Best AI Directory • Over 5000+ Verified AI Tools
          </span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-bricolage text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-primary mb-5"
        >
          Discover the World&apos;s Best <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-accent via-[#ff4d94] to-[#c471f5] bg-clip-text text-transparent inline-block">
            Creative AI Tools.
          </span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-muted text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8 px-2"
        >
          Explore the best AI tools directory featuring 5000+ AI tools for image generation, video creation, writing, coding, and productivity.
          Discover powerful AI software, compare features, explore free AI tools, and find the best solutions to simplify your workflow with ProCraft.
        </motion.p>

        {/* ── Modern Glassmorphic Search Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xl mx-auto mb-5"
        >
          <div
            className={`relative flex items-center w-full rounded-full transition-all duration-300 backdrop-blur-xl ${isFocused
              ? 'bg-white/95 dark:bg-zinc-900/95 ring-2 ring-accent/40 shadow-[0_0_35px_rgba(255,45,120,0.22)] border-accent/40'
              : 'bg-white/80 dark:bg-zinc-900/80 border border-black/10 dark:border-white/15 shadow-xl hover:border-black/20 dark:hover:border-white/25'
              }`}
          >
            {/* Left Icon with subtle animation */}
            <div className="pl-4 pr-2 text-accent flex items-center justify-center">
              <motion.div
                animate={{ rotate: isFocused ? 90 : 0, scale: isFocused ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <Sparkles size={19} />
              </motion.div>
            </div>

            {/* Input Element */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search 5000+ AI tools ('Coding', 'Video editing', ' Productivity')..."
              className="flex-1 bg-transparent border-none outline-none py-3.5 px-2 text-sm text-primary placeholder:text-muted/70 font-medium"
            />

            {/* Clear Button (if query exists) */}
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="p-1.5 mr-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-muted hover:text-primary transition-colors"
                title="Clear search"
              >
                <X size={15} />
              </button>
            )}

            {/* Right Badge / Search Action Button - 3D Black */}
            <div className="pr-1.5 shrink-0">
              <div className="relative p-[1.5px] rounded-full bg-gradient-to-t from-[#1b1a1b] to-[#454244] hover:from-[#232122] hover:to-[#555254] shadow-[0_3px_12px_rgba(0,0,0,0.35)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.5)] active:scale-[0.97] transition-all select-none">
                <button
                  type="button"
                  className="px-4 sm:px-5 py-2 rounded-full bg-[#2D2B2C] hover:bg-[#383536] text-white font-bricolage font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer border-none outline-none"
                  style={{ backgroundColor: '#2D2B2C', color: '#ffffff' }}
                >
                  <Search size={13} className="text-white" />
                  <span className="hidden sm:inline">Search</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Trending Quick-Filter Search Chips ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center flex-wrap gap-1.5 sm:gap-2 mb-8 max-w-2xl"
        >
          <span className="text-[11px] font-semibold text-muted flex items-center gap-1 mr-1">
            <Flame size={13} className="text-accent" /> Trending:
          </span>
          {TRENDING_CHIPS.map((chip) => (
            <button
              key={chip.label}
              type="button"
              onClick={() => setSearchQuery(chip.query)}
              className={`text-[11px] font-medium px-2.5 py-1 rounded-full border transition-all ${searchQuery.toLowerCase() === chip.query.toLowerCase()
                ? 'bg-accent text-black border-accent font-bold shadow-sm'
                : 'bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/10 text-muted hover:text-primary hover:border-accent/30'
                }`}
            >
              {chip.label}
            </button>
          ))}
        </motion.div>

        {/* ── Category Filter Buttons Marquee / Wrap ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="w-full max-w-full overflow-x-auto pb-2 scrollbar-hide pt-1"
        >
          <div className="flex items-center justify-start md:justify-center gap-2 min-w-max mx-auto px-2 md:flex-wrap md:min-w-0">
            {Object.keys(taxonomyMap).map((cat) => {
              const cfg = categoryConfig[cat];
              const IconComp = cfg?.icon || LayoutGrid;

              return (
                <button
                  key={cat}
                  onClick={() => scrollToCategory(cat)}
                  className="group flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold transition-all bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-black/5 dark:border-white/10 text-muted hover:text-primary hover:border-accent/40 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <IconComp size={14} className={`${cfg?.iconColor || 'text-accent'} group-hover:scale-110 transition-transform`} />
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
