"use client";

import React, { useEffect, useRef, useState } from "react";

interface TileConfig {
  id: string;
  name: string;
  logo: string;
  size: number;
  tilt: number;
  // Desktop positioning
  position: {
    left?: string;
    right?: string;
    top: string;
  };
  // Mobile specific positioning for corner anchors
  mobileVisible: boolean;
  mobileSize?: number;
  mobilePosition?: {
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
  };
  // 3D Glass Styling
  bgGradient: string;
  border: string;
  shadowColor: string;
  logoInvert?: boolean;
  isFar?: boolean;
  // Float Animation
  floatDuration: number;
  floatDelay: number;
  floatY: number;
  floatRotate: number;
}

const TILE_CONFIGS: TileConfig[] = [
  // ── Left Margin (5 Tiles - Balanced Staggered Flow) ──
  {
    id: "chatgpt",
    name: "ChatGPT",
    logo: "/logos/chatgpt.svg",
    size: 74,
    tilt: -2,
    position: { left: "3%", top: "12%" },
    mobileVisible: true,
    mobileSize: 36,
    mobilePosition: { left: "4%", top: "13%" },
    bgGradient: "linear-gradient(180deg, #FFFFFF 0%, #F5F5F7 100%)",
    border: "1px solid rgba(0, 0, 0, 0.08)",
    shadowColor: "rgba(16, 163, 127, 0.25)",
    logoInvert: false,
    floatDuration: 7.0,
    floatDelay: 0,
    floatY: 7,
    floatRotate: 1.0,
  },
  {
    id: "claude",
    name: "Claude",
    logo: "/logos/claude.svg",
    size: 80,
    tilt: 2,
    position: { left: "10.5%", top: "24%" },
    mobileVisible: true,
    mobileSize: 36,
    mobilePosition: { right: "4%", top: "13%" },
    bgGradient: "linear-gradient(180deg, #EA724F 0%, #D85834 100%)",
    border: "1px solid rgba(255, 255, 255, 0.25)",
    shadowColor: "rgba(217, 119, 87, 0.30)",
    logoInvert: true,
    floatDuration: 8.2,
    floatDelay: 1.2,
    floatY: -7,
    floatRotate: -1.0,
  },
  {
    id: "gemini",
    name: "Gemini",
    logo: "/logos/gemini.svg",
    size: 70,
    tilt: -2,
    position: { left: "3.5%", top: "44%" },
    mobileVisible: true,
    mobileSize: 34,
    mobilePosition: { left: "3.5%", top: "48%" },
    bgGradient: "linear-gradient(180deg, #FFFFFF 0%, #F3F4F8 100%)",
    border: "1px solid rgba(0, 0, 0, 0.08)",
    shadowColor: "rgba(49, 134, 255, 0.25)",
    logoInvert: false,
    floatDuration: 6.8,
    floatDelay: 2.5,
    floatY: 6,
    floatRotate: 0.8,
  },
  {
    id: "muse",
    name: "Muse",
    logo: "/logos/muse.svg",
    size: 64,
    tilt: 2,
    position: { left: "11%", top: "60%" },
    mobileVisible: false,
    bgGradient: "linear-gradient(180deg, #2D3035 0%, #1A1C20 100%)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    shadowColor: "rgba(26, 28, 32, 0.28)",
    logoInvert: true,
    isFar: true,
    floatDuration: 7.5,
    floatDelay: 3.2,
    floatY: -6,
    floatRotate: -0.8,
  },
  {
    id: "midjourney",
    name: "Midjourney",
    logo: "/logos/midjourney.svg",
    size: 76,
    tilt: -2,
    position: { left: "3%", top: "76%" },
    mobileVisible: false,
    bgGradient: "linear-gradient(180deg, #242429 0%, #111114 100%)",
    border: "1px solid rgba(255, 255, 255, 0.14)",
    shadowColor: "rgba(0, 0, 0, 0.30)",
    logoInvert: true,
    floatDuration: 8.6,
    floatDelay: 0.8,
    floatY: 7,
    floatRotate: 1.0,
  },

  // ── Right Margin (4 Tiles - Balanced Staggered Flow) ──
  {
    id: "deepseek",
    name: "DeepSeek",
    logo: "/logos/deepseek.svg",
    size: 76,
    tilt: 2,
    position: { right: "3%", top: "14%" },
    mobileVisible: false,
    bgGradient: "linear-gradient(180deg, #2C75F9 0%, #1454E1 100%)",
    border: "1px solid rgba(255, 255, 255, 0.22)",
    shadowColor: "rgba(20, 84, 225, 0.30)",
    logoInvert: true,
    floatDuration: 7.4,
    floatDelay: 0.6,
    floatY: -7,
    floatRotate: -1.0,
  },
  {
    id: "grok",
    name: "Grok",
    logo: "/logos/grok.svg",
    size: 78,
    tilt: -2,
    position: { right: "10.5%", top: "28%" },
    mobileVisible: false,
    bgGradient: "linear-gradient(180deg, #232327 0%, #0E0E11 100%)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    shadowColor: "rgba(0, 0, 0, 0.30)",
    logoInvert: true,
    floatDuration: 8.0,
    floatDelay: 2.0,
    floatY: 7,
    floatRotate: 1.0,
  },
  {
    id: "manus",
    name: "Manus",
    logo: "/logos/manus.svg",
    size: 66,
    tilt: 2,
    position: { right: "3.5%", top: "48%" },
    mobileVisible: false,
    bgGradient: "linear-gradient(180deg, #F6F6F9 0%, #E3E3E9 100%)",
    border: "1px solid rgba(0, 0, 0, 0.08)",
    shadowColor: "rgba(110, 110, 125, 0.24)",
    logoInvert: false,
    isFar: true,
    floatDuration: 6.6,
    floatDelay: 2.8,
    floatY: -6,
    floatRotate: -0.8,
  },
  {
    id: "qwen",
    name: "Qwen",
    logo: "/logos/qwen.svg",
    size: 80,
    tilt: -2,
    position: { right: "10%", top: "68%" },
    mobileVisible: true,
    mobileSize: 34,
    mobilePosition: { right: "3.5%", top: "48%" },
    bgGradient: "linear-gradient(180deg, #7C4CF5 0%, #5925D2 100%)",
    border: "1px solid rgba(255, 255, 255, 0.22)",
    shadowColor: "rgba(105, 50, 213, 0.30)",
    logoInvert: true,
    floatDuration: 8.4,
    floatDelay: 1.6,
    floatY: 7,
    floatRotate: 1.0,
  },
];

export function FloatingIcons() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Performance-optimized direct DOM parallax (Zero React state re-renders)
  useEffect(() => {
    if (isMobile) return;

    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      if (containerRef.current) {
        containerRef.current.style.setProperty("--mouse-x", currentX.toFixed(3));
        containerRef.current.style.setProperty("--mouse-y", currentY.toFixed(3));
      }
      rafId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none select-none overflow-hidden z-[1]"
      style={{
        // Default CSS custom property fallback
        ['--mouse-x' as any]: '0',
        ['--mouse-y' as any]: '0',
      }}
    >
      {TILE_CONFIGS.map((tile) => {
        if (isMobile && !tile.mobileVisible) {
          return null;
        }

        const size = isMobile && tile.mobileSize ? tile.mobileSize : tile.size;
        const logoSize = Math.round(size * 0.52);
        const borderRadius = Math.round(size * 0.26);
        const maxParallax = (size / 80) * 8;

        const posStyle: React.CSSProperties = isMobile && tile.mobilePosition
          ? {
              left: tile.mobilePosition.left,
              right: tile.mobilePosition.right,
              top: tile.mobilePosition.top,
              bottom: tile.mobilePosition.bottom,
            }
          : {
              left: tile.position.left,
              right: tile.position.right,
              top: tile.position.top,
            };

        const floatY = isMobile ? Math.min(3.5, tile.floatY * 0.5) : tile.floatY;
        const floatRot = isMobile ? tile.floatRotate * 0.6 : tile.floatRotate;

        return (
          <div
            key={tile.id}
            className="absolute will-change-transform"
            style={{
              ...posStyle,
              width: size,
              height: size,
              opacity: tile.isFar ? 0.85 : 1,
              // Hardware-accelerated GPU floating keyframe animation
              animation: `gpuTileFloat ${tile.floatDuration}s ease-in-out ${tile.floatDelay}s infinite`,
              transform: `translate(calc(var(--mouse-x, 0) * ${maxParallax}px), calc(var(--mouse-y, 0) * ${maxParallax}px)) rotate(${tile.tilt}deg)`,
              // Custom CSS properties for keyframe interpolation
              ['--tile-tilt' as any]: `${tile.tilt}deg`,
              ['--tile-float-y' as any]: `${floatY}px`,
              ['--tile-float-rot' as any]: `${floatRot}deg`,
            }}
          >
            {/* Smooth Rounded Square 3D Glass Container */}
            <div
              className="relative w-full h-full flex items-center justify-center transition-all duration-300"
              style={{
                borderRadius: `${borderRadius}px`,
                background: tile.bgGradient,
                border: tile.border,
                boxShadow: `
                  inset 0 1.5px 0.5px rgba(255, 255, 255, 0.65),
                  inset 0 -1px 1px rgba(0, 0, 0, 0.06),
                  0 10px 20px ${tile.shadowColor}
                `,
              }}
            >
              {/* Glossy top highlight */}
              <div
                className="absolute inset-x-0 top-0 h-[42%] pointer-events-none"
                style={{
                  borderTopLeftRadius: `${borderRadius - 1}px`,
                  borderTopRightRadius: `${borderRadius - 1}px`,
                  background:
                    "linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.02) 100%)",
                }}
              />

              {/* Logo from /public/logos/ */}
              <img
                src={tile.logo}
                alt={tile.name}
                width={logoSize}
                height={logoSize}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="relative z-10 object-contain select-none"
                style={{
                  width: `${logoSize}px`,
                  height: `${logoSize}px`,
                  filter: tile.logoInvert ? "brightness(0) invert(1)" : "none",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
