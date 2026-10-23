"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, Loader2 } from 'lucide-react';
import { PinkArc } from './PinkArc';
import { LineStrip } from './LineStrip';
import { FloatingIcons } from './FloatingIcons';
import { getApiBaseUrl } from '@/lib/apiClient';

const placeholders = [
  "Convert image to prompt: Studio Ghibli anime style...",
  "Best prompts for Midjourney, ChatGPT & Stable Diffusion...",
  "Upload img to prompt for high-res photorealistic portrait...",
  "Discover trendy prompts for branding, 3D art & vector logos...",
];

const suggestionTags = [
  { label: "Image to Prompt", href: "/image-to-prompt" },
  { label: "Prompt Library", href: "/prompt-library" },
  { label: "Trendy Prompts", href: "/prompt-library/explore?sort=popular" },
  { label: "Best Prompts", href: "/prompt-library/explore?sort=popular" },
  { label: "Midjourney", href: "/prompt-library/explore?search=Midjourney" },
  { label: "ChatGPT", href: "/prompt-library/explore?search=ChatGPT" },
];

export function HeroSection() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholders[0]);
  const [index, setIndex] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [liveResults, setLiveResults] = useState<any[]>([]);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % placeholders.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentPlaceholder(placeholders[index]);
  }, [index]);

  // Live search debounced fetch
  useEffect(() => {
    const q = searchValue.trim();
    if (q.length < 2) {
      setLiveResults([]);
      setIsLoadingResults(false);
      return;
    }

    setIsLoadingResults(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`${getApiBaseUrl()}/api/prompts?search=${encodeURIComponent(q)}&limit=5`);
        const json = await res.json();
        if (json.success) {
          setLiveResults(json.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch live search results:", err);
      } finally {
        setIsLoadingResults(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchValue]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (query?: string) => {
    const q = (query ?? searchValue).trim();
    setShowDropdown(false);
    if (q) {
      router.push(`/prompt-library/explore?search=${encodeURIComponent(q)}`);
    } else {
      router.push('/prompt-library/explore');
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

        {/* 2. Soft Pink Arc with gentle rose sunrise bloom (replaces dark glow) */}
        <PinkArc />

        {/* 3. Subtle Clean Horizon Line */}
        <motion.div
          animate={{
            opacity: [0.08, 0.18, 0.08],
            scaleX: [0.85, 1.1, 0.85],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-black/10 dark:via-white/15 to-transparent"
        />
      </div>

      {/* Floating 3D Icon Tiles in left and right margins */}
      <FloatingIcons />

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
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
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
            Unleash your <br className="hidden sm:block" />
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
          {/* Thin horizontal line strip passing behind the search bar */}
          <LineStrip />

          {/* Search Bar Container */}
          <div
            ref={containerRef}
            onClick={() => inputRef.current?.focus()}
            className="group relative z-10 w-full glass-card-solid transition-all duration-300 cursor-text"
            style={{
              background: 'var(--bg-surface, #ffffff)',
              borderRadius: '999px',
              padding: '8px 8px 8px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              boxShadow: isFocused
                ? '0 0 0 1.5px var(--border), 0 16px 36px rgba(0,0,0,0.08)'
                : '0 8px 32px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
            }}
          >
            {/* Sparkle / Search icon */}
            <motion.svg
              animate={{ rotate: isFocused ? 90 : 0, scale: isFocused ? 1.05 : 1 }}
              transition={{ duration: 0.3 }}
              width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, color: 'var(--brand-solid)' }}
            >
              <path d="M12 2L13.09 8.26L19 6L14.74 10.91L21 12L14.74 13.09L19 18L13.09 15.74L12 22L10.91 15.74L5 18L9.26 13.09L3 12L9.26 10.91L5 6L10.91 8.26L12 2Z"
                stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            </motion.svg>

            {/* Input */}
            <div className="flex-1 relative h-[56px] flex items-center overflow-hidden">
              {/* Animated Placeholder Text */}
              {!isFocused && !searchValue && (
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
                ref={inputRef}
                type="text"
                value={searchValue}
                placeholder={isFocused && !searchValue ? "Search 6,000+ AI prompts, tools, or styles..." : ""}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  if (e.target.value.trim().length >= 2) setShowDropdown(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearch();
                  if (e.key === 'Escape') {
                    setShowDropdown(false);
                  }
                }}
                onFocus={() => {
                  setIsFocused(true);
                  if (searchValue.trim().length >= 2) setShowDropdown(true);
                }}
                onBlur={() => {
                  setTimeout(() => {
                    setIsFocused(false);
                  }, 200);
                }}
                className="w-full h-full bg-transparent border-none outline-none text-primary placeholder:text-muted/50"
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
              onClick={(e) => {
                e.stopPropagation();
                handleSearch();
              }}
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

          {/* Live Search Results Dropdown */}
          <AnimatePresence>
            {showDropdown && searchValue.trim().length >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.99 }}
                transition={{ duration: 0.18 }}
                className="absolute top-[76px] left-0 right-0 z-50 rounded-2xl border border-border bg-[var(--bg-surface)] shadow-2xl backdrop-blur-xl overflow-hidden p-2"
              >
                <div className="px-3 py-2 text-[11px] font-semibold text-muted uppercase tracking-wider flex items-center justify-between border-b border-border/50">
                  <span>Matching Prompts</span>
                  {isLoadingResults && <Loader2 size={13} className="animate-spin text-accent" />}
                </div>

                <div className="py-1 overflow-y-auto max-h-[260px] custom-scrollbar">
                  {isLoadingResults && liveResults.length === 0 ? (
                    <div className="p-4 text-center text-xs text-muted">
                      Searching prompts...
                    </div>
                  ) : liveResults.length > 0 ? (
                    liveResults.map((item) => (
                      <button
                        key={item._id || item.slug}
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowDropdown(false);
                          router.push(`/prompt-library/${item.slug}`);
                        }}
                        className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center gap-3 group"
                      >
                        {item.imageUrl || item.example_output_image_url ? (
                          <img
                            src={item.imageUrl || item.example_output_image_url}
                            alt=""
                            className="w-9 h-9 rounded-lg object-cover shrink-0 border border-border"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center text-sm shrink-0">
                            ✨
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-primary truncate group-hover:text-accent transition-colors">
                            {item.title || item.page_name}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            {item.category?.name && (
                              <span className="text-[10px] text-muted">
                                {item.category.name}
                              </span>
                            )}
                            {item.aiModel && (
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/5 dark:bg-white/5 text-muted">
                                {item.aiModel}
                              </span>
                            )}
                          </div>
                        </div>
                        <ArrowRight size={14} className="text-muted/40 group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0" />
                      </button>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-muted">
                      No prompts found for &ldquo;{searchValue}&rdquo;. Press Explore to browse library.
                    </div>
                  )}
                </div>

                {/* Footer link to full explore search */}
                <div className="pt-2 border-t border-border/50">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSearch();
                    }}
                    className="w-full text-center py-2 px-3 rounded-lg text-xs font-medium text-accent hover:bg-accent/10 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>View all search results for &ldquo;{searchValue}&rdquo;</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Suggestion Tags */}
          <div className="flex flex-wrap justify-center gap-2.5 mt-2">
            {suggestionTags.map((tag, i) => (
              <motion.button
                key={tag.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + (i * 0.08) }}
                whileHover={{ y: -2, borderColor: 'var(--brand-solid)' }}
                whileTap={{ scale: 0.96 }}
                onClick={() => router.push(tag.href)}
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
                {tag.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


