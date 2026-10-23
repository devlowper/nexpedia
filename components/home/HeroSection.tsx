"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";
import Link from "next/link";

/* ══ Precision 3D Chrome Floating Sculptures ═════════════════════════
   High-contrast specular metallic chrome geometries with realistic
   reflections and highlights inspired by luxury 3D interfaces.
   ══════════════════════════════════════════════════════════════════ */

// 1. Faceted Metallic Chrome Crystal (Top Left)
function ChromeCrystal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="c-crys-1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="35%" stopColor="#cbd5e1" />
          <stop offset="70%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
        <linearGradient id="c-crys-2" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="40%" stopColor="#64748b" />
          <stop offset="80%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="c-crys-3" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="45%" stopColor="#334155" />
          <stop offset="75%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
        <linearGradient id="c-crys-4" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#020617" />
          <stop offset="60%" stopColor="#475569" />
          <stop offset="100%" stopColor="#c084fc" stopOpacity="0.5" />
        </linearGradient>
        <filter id="c-crys-glow" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="16" stdDeviation="16" floodColor="#000" floodOpacity="0.85" />
          <feDropShadow dx="-4" dy="-4" stdDeviation="10" floodColor="#38bdf8" floodOpacity="0.25" />
        </filter>
      </defs>
      <g filter="url(#c-crys-glow)">
        <polygon points="70,14 116,46 76,78 28,46" fill="url(#c-crys-1)" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />
        <polygon points="28,46 76,78 54,124 16,74" fill="url(#c-crys-2)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
        <polygon points="76,78 116,46 126,92 84,126" fill="url(#c-crys-3)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
        <polygon points="76,78 84,126 54,124" fill="url(#c-crys-4)" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" />
        <line x1="70" y1="14" x2="76" y2="78" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" opacity="0.95" />
        <circle cx="70" cy="14" r="2.5" fill="#ffffff" />
      </g>
    </svg>
  );
}

// 2. Liquid Chrome Double Capsule / Pill (Mid Left)
function ChromeCapsules({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="c-cap-1" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="25%" stopColor="#cbd5e1" />
          <stop offset="48%" stopColor="#1e293b" />
          <stop offset="52%" stopColor="#020617" />
          <stop offset="58%" stopColor="#ffffff" />
          <stop offset="80%" stopColor="#475569" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="c-cap-2" x1="0.8" y1="0" x2="0.2" y2="1">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="30%" stopColor="#94a3b8" />
          <stop offset="50%" stopColor="#020617" />
          <stop offset="56%" stopColor="#ffffff" />
          <stop offset="85%" stopColor="#334155" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <filter id="c-cap-glow" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#000" floodOpacity="0.85" />
        </filter>
      </defs>
      <g filter="url(#c-cap-glow)">
        <g transform="rotate(-28 85 75)">
          <rect x="62" y="32" width="46" height="86" rx="23" fill="url(#c-cap-2)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          <path d="M72 45 C 72 38, 98 38, 98 45" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" opacity="0.85" />
        </g>
        <g transform="rotate(32 60 85)">
          <rect x="36" y="40" width="48" height="90" rx="24" fill="url(#c-cap-1)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />
          <path d="M46 54 C 46 46, 74 46, 74 54" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.95" />
          <path d="M46 116 C 46 122, 74 122, 74 116" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}

// 3. Metallic Chrome Reflective Droplet / Orb (Top Right)
function ChromeOrb({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="c-orb-grad" cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="18%" stopColor="#e2e8f0" />
          <stop offset="42%" stopColor="#475569" />
          <stop offset="68%" stopColor="#0f172a" />
          <stop offset="88%" stopColor="#020617" />
          <stop offset="100%" stopColor="#334155" />
        </radialGradient>
        <linearGradient id="c-orb-rim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.55" />
        </linearGradient>
        <filter id="c-orb-glow" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="16" stdDeviation="16" floodColor="#000" floodOpacity="0.8" />
        </filter>
      </defs>
      <g filter="url(#c-orb-glow)">
        <circle cx="65" cy="65" r="46" fill="url(#c-orb-grad)" stroke="url(#c-orb-rim)" strokeWidth="1.2" />
        <ellipse cx="50" cy="48" rx="11" ry="7" transform="rotate(-30 50 48)" fill="#ffffff" opacity="0.9" />
        <path d="M42 98 A 44 44 0 0 0 94 80" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

// 4. Faceted Chrome 3D Chevron / Monogram Ribbon (Mid Right)
function ChromeGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="c-gly-1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#94a3b8" />
          <stop offset="75%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
        <linearGradient id="c-gly-2" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="30%" stopColor="#475569" />
          <stop offset="70%" stopColor="#020617" />
          <stop offset="90%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <linearGradient id="c-gly-3" x1="0" y1="0.5" x2="1" y2="0.5">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="50%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
        <filter id="c-gly-glow" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#000" floodOpacity="0.85" />
          <feDropShadow dx="4" dy="-4" stdDeviation="14" floodColor="#c084fc" floodOpacity="0.3" />
        </filter>
      </defs>
      <g filter="url(#c-gly-glow)">
        <polygon points="38,28 66,16 66,112 38,124" fill="url(#c-gly-2)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
        <polygon points="66,54 118,22 118,52 66,84" fill="url(#c-gly-1)" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />
        <polygon points="66,84 118,52 118,82 66,114" fill="url(#c-gly-3)" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" />
        <line x1="66" y1="16" x2="66" y2="114" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" opacity="0.95" />
      </g>
    </svg>
  );
}

/* ══ Placeholders & Categories ════════════════════════════════════════ */
const placeholders = [
  "What do you need a prompt for?",
  "Midjourney v6.1 studio portrait lighting...",
  "FLUX.1 cyberpunk concept art wallpaper...",
  "Minimalist 3D isometric product render...",
  "ChatGPT prompts for SEO, copywriting & code...",
  "Studio Ghibli style anime landscape...",
];

const trendingTags = [
  "Midjourney",
  "FLUX.1",
  "ChatGPT",
  "Photorealistic",
  "3D Render",
  "Anime & Art",
  "Image to Prompt",
];

export function HeroSection() {
  const router = useRouter();
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Rotate animated placeholders
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  // Subtle interactive parallax mouse movement
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleSearch = (query?: string) => {
    const q = query ?? searchValue;
    if (q.trim()) {
      router.push(`/prompt-library?search=${encodeURIComponent(q.trim())}`);
    } else {
      router.push("/prompt-library");
    }
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[96vh] -mt-[60px] pt-28 pb-12 flex flex-col items-center justify-between overflow-hidden px-4 sm:px-6 select-none text-white"
      style={{
        background: "radial-gradient(ellipse 95% 75% at 50% 25%, #070913 0%, #030408 60%, #000000 100%)",
      }}
    >
      {/* ── Background Subtle Ambient Lighting ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft radial aura in the center behind text */}
        <div
          className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[800px] h-[450px] rounded-full blur-[150px] opacity-25 pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(56, 189, 248, 0.18) 50%, transparent 80%)",
          }}
        />

        {/* Faint architectural grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, #ffffff 1px, transparent 1px),
              linear-gradient(to bottom, #ffffff 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 85%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 85%)",
          }}
        />
      </div>

      {/* ── Floating 3D Chrome Elements (Desktop & Tablet) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 max-w-7xl mx-auto">
        {/* Top-Left: Chrome Crystal */}
        <motion.div
          animate={{
            y: [-12, 10, -12],
            rotate: [-4, 6, -4],
            x: mousePos.x * -25,
          }}
          transition={{
            y: { duration: 7.5, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 9, repeat: Infinity, ease: "easeInOut" },
            x: { type: "spring", stiffness: 40, damping: 20 },
          }}
          className="absolute top-[12%] left-[4%] sm:left-[9%] lg:left-[12%] w-20 sm:w-24 lg:w-28 opacity-90 hover:opacity-100 transition-opacity"
          style={{ filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.85))" }}
        >
          <ChromeCrystal className="w-full h-auto" />
        </motion.div>

        {/* Mid-Left: Liquid Chrome Capsules */}
        <motion.div
          animate={{
            y: [12, -14, 12],
            rotate: [6, -4, 6],
            x: mousePos.x * -35,
          }}
          transition={{
            y: { duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
            rotate: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
            x: { type: "spring", stiffness: 45, damping: 20 },
          }}
          className="absolute top-[34%] left-[2%] sm:left-[4%] lg:left-[6%] w-24 sm:w-28 lg:w-32 opacity-95 hover:opacity-100 transition-opacity"
          style={{ filter: "drop-shadow(0 25px 35px rgba(0,0,0,0.9))" }}
        >
          <ChromeCapsules className="w-full h-auto" />
        </motion.div>

        {/* Top-Right: Chrome Reflective Orb */}
        <motion.div
          animate={{
            y: [-10, 14, -10],
            rotate: [3, -5, 3],
            x: mousePos.x * 25,
          }}
          transition={{
            y: { duration: 6.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
            rotate: { duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 },
            x: { type: "spring", stiffness: 40, damping: 20 },
          }}
          className="absolute top-[14%] right-[4%] sm:right-[9%] lg:right-[12%] w-18 sm:w-22 lg:w-24 opacity-90 hover:opacity-100 transition-opacity"
          style={{ filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.85))" }}
        >
          <ChromeOrb className="w-full h-auto" />
        </motion.div>

        {/* Mid-Right: Chrome Faceted Glyph */}
        <motion.div
          animate={{
            y: [14, -12, 14],
            rotate: [-6, 5, -6],
            x: mousePos.x * 35,
          }}
          transition={{
            y: { duration: 9.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
            rotate: { duration: 11, repeat: Infinity, ease: "easeInOut", delay: 0.7 },
            x: { type: "spring", stiffness: 45, damping: 20 },
          }}
          className="absolute top-[34%] right-[2%] sm:right-[4%] lg:right-[6%] w-24 sm:w-28 lg:w-32 opacity-95 hover:opacity-100 transition-opacity"
          style={{ filter: "drop-shadow(0 25px 35px rgba(0,0,0,0.9))" }}
        >
          <ChromeGlyph className="w-full h-auto" />
        </motion.div>
      </div>

      {/* ── Main Hero Content ── */}
      <div className="relative z-20 flex flex-col items-center w-full max-w-4xl mx-auto my-auto text-center pointer-events-auto">
        {/* Brand / Minimalist Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-7 border border-white/12 bg-white/[0.04] backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
        >
          <div className="w-5 h-5 rounded-md bg-[#ff3366] flex items-center justify-center text-white font-black text-xs shadow-sm">
            P
          </div>
          <span className="text-[13px] font-semibold tracking-wide text-white font-mono">
            proCraft
          </span>
        </motion.div>

        {/* Clean, Bold, Modern Headline matching the reference */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-medium leading-[1.08] tracking-[-0.035em] max-w-3xl mb-5"
          style={{
            fontFamily: "var(--font-bricolage), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          }}
        >
          Discover the best<br />
          prompts on the internet
        </motion.h1>

        {/* Clean, Minimalist Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/60 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-14 px-4 font-normal"
        >
          proCraft is a curated library with thousands of trending AI prompts,
          image-to-prompt tools, and creative models to upgrade productivity.
        </motion.p>

        {/* ── SEARCH BAR & THE SIGNATURE NEON LIGHT BEAM ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[620px] flex flex-col items-center px-2"
        >
          {/* Search Pill + Direct Centered Light Beam */}
          <div className="relative w-full flex items-center justify-center">
            
            {/* The Horizontal Glowing Beam (Vertically centered exactly through the search capsule) */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[160%] sm:w-[200%] max-w-[1250px] pointer-events-none flex items-center justify-center">
              
              {/* Left Intense Magenta/Violet Neon Aura Flare */}
              <div
                className={`absolute left-[10%] sm:left-[16%] md:left-[20%] w-60 sm:w-80 h-32 sm:h-40 rounded-full blur-[45px] sm:blur-[60px] transition-all duration-700 pointer-events-none ${
                  isFocused ? "opacity-100 scale-110" : "opacity-90 scale-100"
                }`}
                style={{
                  background: "radial-gradient(circle, #d946ef 0%, #a855f7 40%, #7e22ce 70%, transparent 85%)",
                }}
              />

              {/* Right Intense Electric Cyan Neon Aura Flare */}
              <div
                className={`absolute right-[10%] sm:right-[16%] md:right-[20%] w-60 sm:w-80 h-32 sm:h-40 rounded-full blur-[45px] sm:blur-[60px] transition-all duration-700 pointer-events-none ${
                  isFocused ? "opacity-100 scale-110" : "opacity-90 scale-100"
                }`}
                style={{
                  background: "radial-gradient(circle, #06b6d4 0%, #0ea5e9 40%, #2563eb 70%, transparent 85%)",
                }}
              />

              {/* Horizontal Laser Line shooting out both sides */}
              <div
                className="absolute w-full h-[3px] pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(168, 85, 247, 0.25) 12%, rgba(217, 70, 239, 0.95) 32%, #ffffff 50%, rgba(6, 182, 212, 0.95) 68%, rgba(56, 189, 248, 0.25) 88%, transparent 100%)",
                  boxShadow: "0 0 16px 3px rgba(255, 255, 255, 0.95), 0 0 45px 12px rgba(168, 85, 247, 0.8), 0 0 55px 15px rgba(6, 182, 212, 0.8)",
                }}
              />

              {/* Secondary Light Bloom */}
              <div
                className="absolute w-[80%] h-14 pointer-events-none blur-xl opacity-65"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(192, 132, 252, 0.6) 30%, #ffffff 50%, rgba(56, 189, 248, 0.6) 70%, transparent 100%)",
                }}
              />
            </div>

            {/* Central Sleek Capsule Search Bar Pill */}
            <div
              className={`group relative z-20 w-full rounded-full transition-all duration-300 flex items-center justify-between px-6 py-3.5 sm:py-4 ${
                isFocused
                  ? "bg-[#08090f]/95 shadow-[0_0_0_1.5px_rgba(255,255,255,0.45),0_15px_45px_rgba(0,0,0,0.9)] scale-[1.01]"
                  : "bg-[#090b12]/92 hover:bg-[#0c0e17]/95 shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_24px_-4px_rgba(168,85,247,0.35),0_0_24px_-4px_rgba(6,182,212,0.35)]"
              }`}
              style={{
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
              }}
            >
              {/* Input & Animated Placeholder Area */}
              <div className="relative flex-1 flex items-center h-7 overflow-hidden text-left">
                {!searchValue && (
                  <div className="absolute inset-0 flex items-center pointer-events-none">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={currentPlaceholderIndex}
                        initial={{ y: 16, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -16, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="text-white/60 text-sm sm:text-base font-normal truncate pr-4"
                      >
                        {placeholders[currentPlaceholderIndex]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                )}

                <input
                  id="hero-search-input"
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                  className="w-full h-full bg-transparent border-none outline-none text-white text-sm sm:text-base font-normal placeholder-transparent z-10"
                />
              </div>

              {/* Right Magnifying Glass Search Button */}
              <button
                onClick={() => handleSearch()}
                aria-label="Search proCraft"
                className="ml-3 p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200 flex items-center justify-center shrink-0"
              >
                <Search size={19} strokeWidth={2.2} />
              </button>
            </div>
          </div>

          {/* Trending Quick Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 relative z-20">
            <span className="text-[12px] uppercase font-semibold text-white/35 tracking-wider mr-1 hidden sm:inline">
              Trending:
            </span>
            {trendingTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleSearch(tag)}
                className="px-3 py-1 rounded-full text-[12px] sm:text-[13px] text-white/60 hover:text-white bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 hover:border-white/25 transition-all duration-200"
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Bottom Featured Preview Peek ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="relative z-20 w-full max-w-7xl mx-auto flex items-center justify-between pt-8 border-t border-white/[0.06] text-white/50 text-xs sm:text-sm font-medium pointer-events-auto"
      >
        <div className="flex items-center gap-2 text-white/70">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>Featured Prompts & Models</span>
        </div>

        <Link
          href="/prompt-library"
          className="group flex items-center gap-1.5 text-white/60 hover:text-white transition-colors text-xs sm:text-sm font-medium"
        >
          <span>Explore All 2,000+ Prompts</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </section>
  );
}
