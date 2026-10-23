import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Layers, ArrowRight, Database, FolderCheck, Zap,
  PenTool, Code, Megaphone, Palette, Search
} from 'lucide-react';

export function AIPromptWorkspace() {
  return (
    <section className="w-full bg-base dark:bg-[#0a0a0a] py-24 px-4 md:px-8 border-t border-black/5 dark:border-white/5 font-sans overflow-hidden relative">
      {/* Clean Background (No pink glow) */}

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">

        {/* Left Content */}
        <div className="lg:w-1/2 flex flex-col items-start gap-8 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#EA4C89]/30 text-black/80 dark:text-white/90 text-[13px] font-medium tracking-wide">
            <Layers size={14} className="text-[#EA4C89]" />
            Curated AI Prompt Library
          </div>

          <h2
            className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-primary dark:text-white leading-[1.05] tracking-tight"
            style={{ fontFamily: '"Bricolage Grotesque", var(--font-bricolage), sans-serif' }}
          >
            Find the Best Prompt.<br />
            <span className="text-[#EA4C89]">Craft Trendy AI Art.</span>
          </h2>

          <p className="text-black/60 dark:text-white/70 text-lg md:text-xl leading-relaxed max-w-lg">
            proCraft gives you instant access to the best prompt library and image to prompt inspirations for Midjourney, ChatGPT, FLUX, and AI workflows.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto">
            <Link href="/prompt-library" className="w-full sm:w-auto bg-[#EA4C89] hover:bg-[#d43a76] text-white font-bold text-sm px-8 py-4 rounded-full transition-colors flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(234,76,137,0.35)]">
              Explore Prompt Library <ArrowRight size={16} />
            </Link>
            <Link href="/ai-directory" className="w-full sm:w-auto bg-transparent hover:bg-black/5 dark:hover:bg-white/5 border border-black/10 dark:border-white/20 text-primary dark:text-white font-bold text-sm px-8 py-4 rounded-full transition-colors flex items-center justify-center">
              Browse AI Directory
            </Link>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mt-8 pt-8 border-t border-black/5 dark:border-white/10 w-full">
            <div className="flex items-center gap-2.5">
              <Database size={20} className="text-[#EA4C89]" />
              <span className="text-black/70 dark:text-white/80 text-sm font-semibold">10K+ Prompts</span>
            </div>
            <div className="flex items-center gap-2.5">
              <FolderCheck size={20} className="text-[#EA4C89]" />
              <span className="text-black/70 dark:text-white/80 text-sm font-semibold">50+ Categories</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Zap size={20} className="text-[#EA4C89]" />
              <span className="text-black/70 dark:text-white/80 text-sm font-semibold">Free to Explore</span>
            </div>
          </div>
        </div>

        {/* Right Media Area - Image and Floating Tags */}
        <div className="lg:w-1/2 relative w-full flex justify-center items-center mt-12 lg:mt-0 min-h-[500px]">

          {/* Main Image */}
          <div className="relative z-10 w-[90%] max-w-[550px] aspect-square rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 shadow-[0_0_40px_rgba(234,76,137,0.18)]">
            <Image 
              src="/neon-laptop.jpg" 
              alt="AI Workspace"
              fill
              className="object-cover object-center"
            />
          </div>

          {/* Connecting SVG curved lines (simplified representation using absolute positioning) */}
          <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none hidden md:block" style={{ opacity: 0.3 }}>
            {/* We can use simple path curves to simulate the connections if needed, but styling absolute pills with faint borders also works well */}
          </svg>

          {/* Floating Pills */}
          <div className="absolute top-[10%] left-0 md:-left-4 z-20 flex items-center gap-2 px-4 py-2 rounded-full border border-[#EA4C89]/50 bg-white/80 dark:bg-black/60 backdrop-blur-md text-primary dark:text-white text-sm font-medium shadow-[0_0_15px_rgba(234,76,137,0.2)] animate-[float_4s_ease-in-out_infinite]">
            <PenTool size={16} className="text-[#EA4C89]" />
            Writing
          </div>

          <div className="absolute top-[5%] right-[10%] md:-right-4 z-20 flex items-center gap-2 px-4 py-2 rounded-full border border-[#EA4C89]/40 bg-white/80 dark:bg-black/60 backdrop-blur-md text-primary dark:text-white text-sm font-medium shadow-[0_0_15px_rgba(234,76,137,0.2)] animate-[float_5s_ease-in-out_infinite_reverse]">
            <Palette size={16} className="text-[#EA4C89]" />
            Design
          </div>

          <div className="absolute top-[30%] left-[5%] z-20 flex items-center gap-2 px-4 py-2 rounded-full border border-[#EA4C89]/40 bg-white/80 dark:bg-black/60 backdrop-blur-md text-primary dark:text-white text-sm font-medium shadow-[0_0_15px_rgba(234,76,137,0.2)] animate-[float_6s_ease-in-out_infinite]">
            <Code size={16} className="text-[#EA4C89]" />
            Coding
          </div>

          <div className="absolute top-[25%] right-0 md:-right-8 z-20 flex items-center gap-2 px-4 py-2 rounded-full border border-[#EA4C89]/50 bg-white/80 dark:bg-black/60 backdrop-blur-md text-primary dark:text-white text-sm font-medium shadow-[0_0_15px_rgba(234,76,137,0.2)] animate-[float_4.5s_ease-in-out_infinite_0.5s]">
            <Megaphone size={16} className="text-[#EA4C89]" />
            Marketing
          </div>

          <div className="absolute bottom-[20%] right-[-5%] md:-right-12 z-20 flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#EA4C89]/40 bg-white/80 dark:bg-black/60 backdrop-blur-md text-primary dark:text-white text-sm font-medium shadow-[0_0_15px_rgba(234,76,137,0.2)] animate-[float_5.5s_ease-in-out_infinite_1s]">
            <Search size={18} className="text-[#EA4C89]" />
            Research
          </div>

        </div>
      </div>
    </section>
  );
}
