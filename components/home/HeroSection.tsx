"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Particles } from './Particles';

const placeholders = [
  "Convert image to prompt: Studio Ghibli anime style...",
  "Best prompts for Midjourney, ChatGPT & Stable Diffusion...",
  "Upload img to prompt for high-res photorealistic portrait...",
  "Discover trendy prompts for branding, 3D art & vector logos...",
];

const suggestionTags = [
  "Image to Prompt",
  "Prompt Library",
  "Trendy Prompts",
  "Best Prompts",
  "Midjourney",
  "ChatGPT"
];

export function HeroSection() {
  const router = useRouter();
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholders[0]);
  const [index, setIndex] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % placeholders.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentPlaceholder(placeholders[index]);
  }, [index]);

  const handleSearch = (query?: string) => {
    const q = query ?? searchValue;
    if (q.trim()) {
      router.push(`/prompt-library?search=${encodeURIComponent(q.trim())}`);
    } else {
      router.push('/prompt-library');
    }
  };

  return (
    <section
      style={{
        background: 'var(--bg-base)',
        minHeight: 'calc(100vh - 80px)',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
      }}
    >
      {/* Modern Clean Background Animation with Interactive Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {/* 1. Subtle Architectural Grid with Radial Vignette */}
        <div 
          className="absolute inset-0 text-black/[0.06] dark:text-white/[0.035] opacity-[0.45] dark:opacity-[0.3]"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 75% 65% at 50% 38%, black 30%, transparent 85%)',
            WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 38%, black 30%, transparent 85%)',
          }}
        />

        {/* 2. Soft Neutral Center Halo (Pure clean lighting, zero pink) */}
        <motion.div
          animate={{
            scale: [0.95, 1.08, 0.95],
            opacity: [0.03, 0.07, 0.03],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[55vw] max-w-[600px] h-[40vw] max-h-[450px] rounded-full blur-[140px] bg-black/5 dark:bg-white/10"
        />

        {/* 3. Subtle Clean Horizon Line */}
        <motion.div
          animate={{
            opacity: [0.08, 0.18, 0.08],
            scaleX: [0.85, 1.1, 0.85],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-black/10 dark:via-white/15 to-transparent"
        />

        {/* 4. Delicate Neutral Floating Shimmer Dust */}
        {[
          { left: '18%', bottom: '25%', delay: 0, duration: 9, size: 2.5 },
          { left: '32%', bottom: '35%', delay: 2.5, duration: 11, size: 3 },
          { left: '68%', bottom: '30%', delay: 1.5, duration: 10, size: 2.5 },
          { left: '82%', bottom: '20%', delay: 4, duration: 12, size: 3 },
          { left: '50%', bottom: '15%', delay: 3, duration: 8, size: 2.5 },
        ].map((p, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-15, 15, -15],
              opacity: [0.15, 0.45, 0.15],
              scale: [0.85, 1.2, 0.85],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
            className="absolute rounded-full bg-black/30 dark:bg-white/40 shadow-[0_0_6px_rgba(255,255,255,0.2)]"
            style={{
              left: p.left,
              bottom: p.bottom,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
          />
        ))}
      </div>

      {/* 5. Interactive Full Background Morphing Particles */}
      <div className="absolute inset-0 z-0 pointer-events-auto select-none overflow-hidden">
        <Particles reach={120} force={75} />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl mx-auto pt-10 pointer-events-none">
        {/* ── Badge ── */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card pointer-events-auto cursor-default"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '36px',
            borderRadius: '999px',
            padding: '6px 18px',
            border: '1px solid var(--border)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}
        >
          <span className="w-2 h-2 rounded-full bg-[var(--brand-solid)]" />
          <span
            style={{
              color: 'var(--text-primary)',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase'
            }}
          >
            Curated AI Prompt Library
          </span>
        </motion.div>

        {/* ── Heading ── */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
           className="text-center w-full flex flex-col items-center"
        >
          <h1
            className="font-bricolage"
            style={{
              fontSize: 'clamp(3rem, 8vw, 5.5rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              marginBottom: '24px',
              color: 'var(--text-primary)',
            }}
          >
            Unleash your <br className="hidden sm:block"/>
            <span style={{ 
              background: 'var(--brand-gradient)', 
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
              paddingRight: '0.1em'
            }}>
              imagination.
            </span>
          </h1>
        </motion.div>

        {/* ── Subtitle ── */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            color: 'var(--text-muted)',
            textAlign: 'center',
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            lineHeight: 1.6,
            marginBottom: '56px',
            maxWidth: '650px',
            fontWeight: 400,
          }}
        >
          The ultimate AI prompt library and image to prompt workspace. Discover the best and trendy prompts for Midjourney, ChatGPT, FLUX, and creative workflows.
        </motion.p>

        {/* ── Search Bar Area ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-3xl flex flex-col items-center gap-6 relative pointer-events-auto"
        >
          {/* Animated Glow behind search bar */}
          <div 
             className={`absolute inset-0 z-0 bg-[var(--brand-solid)] rounded-full blur-2xl transition-opacity duration-500 ease-in-out ${isFocused ? 'opacity-30' : 'opacity-0'}`} 
             style={{ transform: 'scale(1.05, 1.2)', top: '10px' }}
          />
          
          <div
            className="group relative z-10 w-full glass-card-solid transition-all duration-300"
            style={{
              borderRadius: '999px',
              padding: '8px 8px 8px 28px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              boxShadow: isFocused 
                ? '0 0 0 2px rgba(255, 51, 102, 0.5), 0 20px 40px rgba(0,0,0,0.4)' 
                : '0 8px 32px rgba(0,0,0,0.2)',
            }}
          >
            {/* Sparkle icon */}
            <motion.svg 
              animate={{ rotate: isFocused ? 180 : 0, scale: isFocused ? 1.1 : 1 }}
              transition={{ duration: 0.5 }}
              width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, color: 'var(--brand-solid)' }}
            >
              <path d="M12 2L13.09 8.26L19 6L14.74 10.91L21 12L14.74 13.09L19 18L13.09 15.74L12 22L10.91 15.74L5 18L9.26 13.09L3 12L9.26 10.91L5 6L10.91 8.26L12 2Z"
                stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            </motion.svg>

            {/* Input */}
            <div className="flex-1 relative h-[56px] flex items-center overflow-hidden">
               {/* Animated Placeholder Text */}
               {!isFocused && (
                 <div className="absolute inset-0 flex items-center pointer-events-none">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={index}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="text-muted/60 absolute whitespace-nowrap"
                        style={{ fontSize: '1.05rem' }}
                      >
                        {currentPlaceholder}
                      </motion.span>
                    </AnimatePresence>
                 </div>
               )}
               
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearch();
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={(e) => {
                  if(e.target.value === '') setIsFocused(false);
                }}
                className="w-full h-full bg-transparent border-none outline-none text-primary"
                style={{
                  fontSize: '1.05rem',
                  zIndex: 10,
                }}
              />
            </div>

            {/* Search/Explore button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSearch()}
              className="gradient-pink relative overflow-hidden group/btn"
              style={{
                color: '#fff',
                border: 'none',
                borderRadius: '999px',
                height: '56px',
                padding: '0 32px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 600,
                fontSize: '1.05rem',
                cursor: 'pointer',
                flexShrink: 0,
                boxShadow: '0 4px 15px rgba(255, 51, 102, 0.3)',
              }}
            >
              {/* Button Hover effect */}
              <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
              
              <span className="relative z-10 flex items-center gap-2">
                Explore
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover/btn:translate-x-1">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </motion.button>
          </div>
          
          {/* Suggestion Tags */}
          <div className="flex flex-wrap justify-center gap-2.5 mt-2">
             {suggestionTags.map((tag, i) => (
                <motion.button
                   key={tag}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.4, delay: 0.4 + (i * 0.08) }}
                   whileHover={{ y: -2, borderColor: 'var(--brand-solid)' }}
                   whileTap={{ scale: 0.96 }}
                   onClick={() => handleSearch(tag)}
                   className="glass"
                   style={{
                      padding: '7px 16px',
                      borderRadius: '100px',
                      fontSize: '0.85rem',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      border: '1px solid var(--border)',
                      transition: 'all 0.2s',
                   }}
                >
                   {tag}
                </motion.button>
             ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


