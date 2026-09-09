"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Film, Package, Share2, Tv, Video, Crosshair, Users, ChevronLeft, ChevronRight, ArrowUp } from 'lucide-react';

const baseItems = [
  { label: 'UGC Ads', icon: Share2, img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&h=800&fit=crop' },
  { label: 'Product Ads', icon: Package, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=800&fit=crop' },
  { label: 'Film Trailer', icon: Video, img: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=800&fit=crop' },
  { label: 'Social Content', icon: Users, img: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=500&h=800&fit=crop' },
  { label: 'Brand Film', icon: Tv, img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=800&fit=crop' },
  { label: 'Explainer', icon: Crosshair, img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=800&fit=crop' },
  { label: 'Micro Drama', icon: Film, img: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=800&fit=crop' },
];

// Duplicate items for the seamless infinity loop
const displayItems = [...baseItems, ...baseItems, ...baseItems, ...baseItems, ...baseItems, ...baseItems];

export function VibeCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesTrackRef = useRef<HTMLDivElement>(null);
  const iconsTrackRef = useRef<HTMLDivElement>(null);

  const currentXRef = useRef(0);
  const targetXRef = useRef(0);

  const [itemWidth, setItemWidth] = useState(240);
  const gap = 4;
  const stepWidth = itemWidth + gap;

  // Update itemWidth whenever the container resizes
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const w = containerRef.current.getBoundingClientRect().width;
        // Mobile: show ~2 cards; tablet: ~3; desktop: ~4-5
        if (w < 480) setItemWidth(Math.floor(w / 2.2));
        else if (w < 768) setItemWidth(Math.floor(w / 3));
        else setItemWidth(240);
      }
    };
    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    const setWidth = baseItems.length * stepWidth;

    const animate = () => {
      // 1. Auto infinity scroll
      targetXRef.current -= 0.6;

      // 2. Smooth interpolation
      currentXRef.current += (targetXRef.current - currentXRef.current) * 0.1;

      // 3. Seamless Loop
      if (currentXRef.current <= -setWidth) {
        currentXRef.current += setWidth;
        targetXRef.current += setWidth;
      }
      if (currentXRef.current > 0) {
        currentXRef.current -= setWidth;
        targetXRef.current -= setWidth;
      }

      if (imagesTrackRef.current && iconsTrackRef.current && containerRef.current) {
        imagesTrackRef.current.style.transform = `translateX(${currentXRef.current}px)`;
        iconsTrackRef.current.style.transform = `translateX(${currentXRef.current}px)`;

        const containerHeight = containerRef.current.getBoundingClientRect().height;
        const screenWidth = containerRef.current.getBoundingClientRect().width;
        const iconElements = iconsTrackRef.current.children;

        for (let i = 0; i < iconElements.length; i++) {
          const el = iconElements[i] as HTMLElement;
          const innerIcon = el.querySelector('.inner-icon') as HTMLElement;

          if (innerIcon) {
            const itemCenterX = currentXRef.current + (i * stepWidth) + (itemWidth / 2);

            if (itemCenterX > -300 && itemCenterX < screenWidth + 300) {
              const t = itemCenterX / screenWidth;
              const ySvg = 735.3 - 210 * t + 210 * (t * t);
              const yScreen = ((ySvg - 300) / 480) * containerHeight;

              innerIcon.style.transform = `translate(-50%, -16px) translateY(${yScreen}px)`;
            }
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [stepWidth, itemWidth]);

  const handleNext = () => {
    targetXRef.current -= stepWidth;
  };

  const handlePrev = () => {
    targetXRef.current += stepWidth;
  };

  return (
    <section className="w-full relative flex flex-col items-center">

      <div ref={containerRef} className="relative w-full h-[320px] md:h-[550px] overflow-hidden">

        {/* Title: overlaid on top of the carousel */}
        <div className="absolute top-0 left-0 w-full flex justify-center pt-4 md:pt-6 z-30 pointer-events-none">
          <h2
            className="section-title font-bricolage text-[clamp(1.8rem,5vw,4rem)] font-[900] tracking-[-1px]"
            style={{ fontFamily: '"Bricolage Grotesque", var(--font-bricolage), sans-serif' }}
          >
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'var(--brand-gradient)' }}>Vibe Direct Now</span>
          </h2>
        </div>

        {/* Edge fade overlays — hide thin image strips at top/bottom of curve mask */}
        <div className="absolute top-0 left-0 w-full h-[12%] z-10 pointer-events-none" style={{ background: 'linear-gradient(to bottom, var(--bg-base) 30%, transparent)' }} />
        <div className="absolute bottom-0 left-0 w-full h-[12%] z-10 pointer-events-none" style={{ background: 'linear-gradient(to top, var(--bg-base) 30%, transparent)' }} />

        {/* Track 1: Images */}
        <div
          ref={imagesTrackRef}
          className="absolute top-0 flex h-full items-center will-change-transform"
          style={{ gap: `${gap}px` }}
        >
          {displayItems.map((item, i) => (
            <div key={i} className="flex-none h-full relative" style={{ width: `${itemWidth}px` }}>
              <div className="w-full h-full bg-base overflow-hidden">
                <img
                  src={item.img}
                  alt={item.label}
                  className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity duration-500"
                />
              </div>
            </div>
          ))}
        </div>

        {/* SVG Mask & Curve Lines */}
        <svg viewBox="0 300 1920 480" preserveAspectRatio="none" className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
          <path
            d="M0,0 L1920,0 L1920,1080 L0,1080 Z M1920,735.3c-284.7-31.2-602.6-52.1-948.8-52.5c-355-0.5-680.6,20.6-971.2,52.5c0-130.2,0-260.3,0-390.5c293.6,25.8,614,42.1,957.7,42.2c345.5,0.1,667.4-16.2,962.3-42.2C1920,474.9,1920,605.1,1920,735.3z"
            fill="var(--bg-base)"
            fillRule="evenodd"
          />
          <path
            d="M0,344.8 c293.6,25.8,614,42.1,957.7,42.2 c345.5,0.1,667.4-16.2,962.3-42.2"
            fill="none"
            stroke="url(#orange-grad)"
            strokeWidth="3"
          />
          <path
            d="M1920,735.3 c-284.7-31.2-602.6-52.1-948.8-52.5 c-355-0.5-680.6,20.6-971.2,52.5"
            fill="none"
            stroke="url(#orange-grad)"
            strokeWidth="3"
          />
          <defs>
            <linearGradient id="orange-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--bg-base)" />
              <stop offset="30%" stopColor="var(--brand-solid)" />
              <stop offset="50%" stopColor="var(--brand-solid)" stopOpacity="0.7" />
              <stop offset="70%" stopColor="var(--brand-solid)" />
              <stop offset="100%" stopColor="var(--bg-base)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Track 3: Dynamic Icons & Texts */}
        <div
          ref={iconsTrackRef}
          className="absolute top-0 flex h-full pointer-events-none z-20 will-change-transform"
          style={{ gap: `${gap}px` }}
        >
          {displayItems.map((item, i) => (
            <div key={i} className="flex-none relative h-full" style={{ width: `${itemWidth}px` }}>
              <div className="inner-icon absolute top-0 left-1/2 flex flex-col items-center pointer-events-auto cursor-pointer group will-change-transform">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center bg-elevated border border-border mb-1 md:mb-2 transition-all">
                  <item.icon size={14} className="text-primary group-hover:text-accent transition-colors" />
                </div>
                <span className="text-primary text-[0.65rem] md:text-xs font-bold whitespace-nowrap group-hover:text-accent transition-colors">{item.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Arrow buttons — hidden on mobile, visible on md+ */}
        <button
          onClick={handlePrev}
          className="absolute left-3 md:left-6 top-[50%] -translate-y-1/2 z-30 w-9 h-9 md:w-12 md:h-12 rounded-full bg-elevated border border-border text-primary flex items-center justify-center hover:bg-accent hover:text-black hover:border-accent transition-colors shadow-lg pointer-events-auto"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-3 md:right-6 top-[50%] -translate-y-1/2 z-30 w-9 h-9 md:w-12 md:h-12 rounded-full bg-elevated border border-border text-primary flex items-center justify-center hover:bg-accent hover:text-black hover:border-accent transition-colors shadow-lg pointer-events-auto"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="w-full flex justify-center mt-4 md:mt-6 px-4 z-30 mb-10">
        <div className="w-full max-w-[500px] bg-elevated rounded-full p-1.5 flex items-center shadow-[0_0_15px_rgba(0,0,0,0.5)] relative border border-border">
          <div className="pl-4 pr-2 text-primary">
            <Video size={20} />
          </div>
          <input
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-primary text-sm placeholder:text-muted transition-colors"
            placeholder="A|"
          />
          <button className="w-10 h-10 rounded-full bg-accent text-black flex items-center justify-center hover:bg-accent-hover hover:opacity-90 transition-all shadow-lg">
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
