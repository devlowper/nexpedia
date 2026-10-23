"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const showcasePrompts = [
  {
    id: 1,
    slug: 'hyper-realistic-studio-portraits',
    title: 'Hyper-Realistic Studio Portraits',
    description: 'Cinematic 85mm portrait, natural skin texture, rim lighting, atmospheric depth of field, 8k resolution.',
    tag: 'Midjourney v6 & FLUX',
    category: 'Photography',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=800&fit=crop'
  },
  {
    id: 2,
    slug: 'cyberpunk-sci-fi-landscapes',
    title: 'Cyberpunk & Sci-Fi Landscapes',
    description: 'Anime collectible PVC figurine in deep crimson red gel lighting, dramatic macro photography, 8k.',
    tag: 'FLUX.1 & Stable Diffusion',
    category: 'Concept Art',
    img: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&h=800&fit=crop'
  },
  {
    id: 3,
    slug: 'minimalist-3d-product-mockups',
    title: 'Minimalist 3D Product Mockups',
    description: 'High-end white smartwatch product render, polished silver lugs, glossy black screen on seamless grey studio.',
    tag: 'Midjourney v6',
    category: '3D Render',
    img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop'
  },
  {
    id: 4,
    slug: 'vector-logos-mascot-emblems',
    title: 'Vector Logos & Mascot Emblems',
    description: 'Abstract 3D wallpaper art, smooth flowing silk-like waves, vivid cyan to violet gradient with peach glow.',
    tag: 'DALL-E 3 & Midjourney',
    category: 'Branding',
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop'
  },
  {
    id: 5,
    slug: 'ghibli-style-anime-aesthetics',
    title: 'Ghibli-Style Anime Aesthetics',
    description: 'Surreal long-exposure astrophotography, sailboat silhouette on mirror-calm water under Milky Way and storm lightning.',
    tag: 'Niji v6',
    category: 'Anime & Illustration',
    img: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&h=800&fit=crop'
  }
];

export function VibeCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play logic
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % showcasePrompts.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % showcasePrompts.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + showcasePrompts.length) % showcasePrompts.length);

  const getCardProps = (index: number) => {
    const len = showcasePrompts.length;
    let dist = (index - activeIndex + len) % len;
    if (dist > len / 2) dist -= len;

    const isCenter = dist === 0;

    if (isMobile) {
      if (isCenter) return { x: 'calc(-50% + 0px)', y: '-50%', scale: 1, zIndex: 10, opacity: 1, isCenter: true };
      if (dist === 1) return { x: 'calc(-50% + 180px)', y: '-50%', scale: 0.88, zIndex: 5, opacity: 0, isCenter: false };
      if (dist === -1) return { x: 'calc(-50% - 180px)', y: '-50%', scale: 0.88, zIndex: 5, opacity: 0, isCenter: false };
      return { x: 'calc(-50% + 0px)', y: '-50%', scale: 0.5, zIndex: 0, opacity: 0, isCenter: false };
    }

    let x = 'calc(-50% + 0px)';
    let scale = 1;
    let opacity = 1;
    let zIndex = 10;

    if (isCenter) {
      x = 'calc(-50% + 0px)';
      scale = 1;
      zIndex = 20;
    } else if (dist === 1) {
      x = 'calc(-50% + 480px)';
      scale = 0.86;
      opacity = 0.85;
      zIndex = 10;
    } else if (dist === -1) {
      x = 'calc(-50% - 480px)';
      scale = 0.86;
      opacity = 0.85;
      zIndex = 10;
    } else if (dist === 2) {
      x = 'calc(-50% + 660px)';
      scale = 0.72;
      opacity = 0.45;
      zIndex = 5;
    } else if (dist === -2) {
      x = 'calc(-50% - 660px)';
      scale = 0.72;
      opacity = 0.45;
      zIndex = 5;
    } else {
      x = dist > 0 ? 'calc(-50% + 780px)' : 'calc(-50% - 780px)';
      scale = 0.5;
      opacity = 0;
      zIndex = 0;
    }

    return { x, y: '-50%', scale, opacity, zIndex, isCenter };
  };

  return (
    <section className="w-full relative flex flex-col items-center py-20 overflow-hidden bg-[var(--bg-base)]">
      
      {/* Clean Background (No pink glow) */}

      {/* Header */}
      <div className="w-full flex flex-col items-center mb-12 z-10 relative px-4 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-accent bg-accent/10 border border-accent/20 mb-3">
          <Sparkles size={12} />
          <span>Trending Styles</span>
        </div>
        <h2 className="section-title font-bricolage text-[clamp(2.2rem,4.5vw,3.8rem)] font-extrabold tracking-[-0.03em] text-black dark:text-white">
          Explore{' '}
          <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'var(--brand-gradient)' }}>
            Featured Prompt Styles
          </span>
        </h2>
        <p 
          className="vibe-carousel-subtitle text-sm md:text-base mt-2 max-w-lg font-medium text-[#626263] dark:text-white/80"
        >
          Master the art of AI prompting across top creative aesthetics and models.
        </p>
      </div>

      {/* Carousel Container */}
      <div 
        className="relative w-full h-[520px] md:h-[560px] flex justify-center items-center z-10 max-w-[1400px] mx-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {showcasePrompts.map((item, idx) => {
          const { x, y, scale, opacity, zIndex, isCenter } = getCardProps(idx);

          return (
            <motion.div
              key={item.id}
              initial={false}
              animate={{ x, y, scale, opacity, zIndex }}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              onClick={() => {
                if (!isCenter) setActiveIndex(idx);
              }}
              className={`absolute top-1/2 left-1/2 flex rounded-[28px] overflow-hidden transition-shadow duration-300 ${
                isCenter 
                  ? 'w-[95%] max-w-[840px] h-[480px] cursor-default bg-white dark:bg-surface border border-black/10 dark:border-border shadow-2xl' 
                  : 'w-[220px] h-[420px] cursor-pointer bg-white/95 dark:bg-elevated border border-black/10 dark:border-border/60 hover:border-accent/40 shadow-lg'
              }`}
            >
              <AnimatePresence mode="wait">
                {isCenter ? (
                  isMobile ? (
                    /* Mobile Center Card */
                    <motion.div
                      key="mobile-expanded"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-full flex flex-col justify-between p-5 bg-white dark:bg-surface relative"
                    >
                      <div className="relative w-full h-[220px] rounded-[20px] overflow-hidden mb-3 shrink-0">
                        <img
                          src={item.img}
                          alt={item.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3 flex gap-1.5">
                          <span className="text-[10px] font-semibold px-2.5 py-1 rounded-md bg-accent text-white shadow-sm">
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-[11px] text-[#626263] dark:text-white/70 font-semibold">
                              {item.tag}
                            </span>
                          </div>
                          <h3 className="text-xl font-bricolage font-bold text-black dark:text-white mb-2 line-clamp-1">
                            {item.title}
                          </h3>
                          <p className="text-xs text-[#626263] dark:text-white/80 line-clamp-2 mb-3">
                            "{item.description}"
                          </p>
                        </div>
                        <Link
                          href={`/prompt-library/${item.slug}`}
                          className="w-full flex items-center justify-center gap-2 bg-accent hover:opacity-90 text-white font-semibold text-xs py-3 rounded-xl transition-all shadow-md shadow-accent/20"
                        >
                          Explore Prompt <ArrowRight size={14} />
                        </Link>
                      </div>
                    </motion.div>
                  ) : (
                    /* Desktop Center Expanded Card Content */
                    <motion.div
                      key="expanded"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="w-full h-full flex"
                    >
                      {/* Left Text Side */}
                      <div className="w-1/2 p-10 flex flex-col justify-between bg-white dark:bg-surface">
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-accent/10 text-accent border border-accent/20">
                              {item.category}
                            </span>
                            <span 
                              className="text-xs text-[#626263] dark:text-white/70 font-semibold"
                            >
                              {item.tag}
                            </span>
                          </div>
                          <h3 
                            className="text-2xl md:text-3xl font-bricolage font-bold text-black dark:text-white mb-4 leading-tight"
                          >
                            {item.title}
                          </h3>
                          <p 
                            className="vibe-carousel-desc text-sm md:text-base font-normal leading-relaxed text-[#626263] dark:text-white/80"
                          >
                            "{item.description}"
                          </p>
                        </div>

                        <div className="pt-6 border-t border-black/10 dark:border-border">
                          <Link
                            href={`/prompt-library/${item.slug}`}
                            className="inline-flex items-center gap-2 bg-accent hover:opacity-90 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all shadow-md shadow-accent/20 hover:gap-3"
                          >
                            Explore Prompt <ArrowRight size={16} />
                          </Link>
                        </div>
                      </div>

                      {/* Right Image Side */}
                      <div className="w-1/2 h-full p-4 pl-0 bg-white dark:bg-surface">
                        <div className="w-full h-full rounded-[22px] overflow-hidden border border-black/10 dark:border-border relative">
                          <img 
                            src={item.img} 
                            alt={item.title} 
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                        </div>
                      </div>
                    </motion.div>
                  )
                ) : (
                  /* Side / Shrunk Card Content */
                  <motion.div
                    key="shrunk"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full rounded-[28px] overflow-hidden p-2 relative group"
                  >
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover rounded-[22px] transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none rounded-[28px]" />
                    <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-accent block mb-0.5">
                        {item.category}
                      </span>
                      <p className="text-xs font-semibold line-clamp-2">
                        {item.title}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          aria-label="Previous style"
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-white/90 dark:bg-surface/85 backdrop-blur-md border border-black/10 dark:border-border text-gray-900 dark:text-primary flex items-center justify-center hover:bg-accent hover:text-white transition-all shadow-lg"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next style"
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-white/90 dark:bg-surface/85 backdrop-blur-md border border-black/10 dark:border-border text-gray-900 dark:text-primary flex items-center justify-center hover:bg-accent hover:text-white transition-all shadow-lg"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center gap-2 mt-8 z-10">
        {showcasePrompts.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full ${
              activeIndex === idx 
                ? 'w-8 h-2.5 bg-accent shadow-sm shadow-accent/40' 
                : 'w-2.5 h-2.5 bg-black/20 dark:bg-white/20 hover:bg-accent/40'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
