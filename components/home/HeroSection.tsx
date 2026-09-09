"use client";

import React, { useState, useEffect } from 'react';

const placeholders = [
  "Anime girl under cherry blossoms, Studio Ghibli style...",
  "Create a trailer for a movie that doesn't exist...",
  "A samurai fighting in neon Tokyo rain...",
  "Product ad for luxury sunglasses on red background...",
];

export function HeroSection() {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholders[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentPlaceholder(placeholders[index]);
  }, [index]);

  return (
    <section
      style={{
        background: 'var(--bg-base)',
        minHeight: 'calc(100vh - 60px)',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingLeft: '1rem',
        paddingRight: '1rem',
      }}
    >
      {/* ── Bottom glow arc (glow-ring) ── */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full aspect-square pointer-events-none z-0 
                   w-[140vw] bottom-[-70vw] md:w-[90vw] md:bottom-[-45vw] max-w-[1000px]"
        style={{
          background: `radial-gradient(
            circle at center,
            transparent 50%,
            rgba(204, 255, 0, 0.3) 58%,
            rgba(204, 255, 0, 0.8) 63%,
            rgba(12, 123, 57, 0.9) 66%,
            rgba(12, 123, 57, 0.4) 71%,
            transparent 78%
          )`,
          filter: 'blur(35px)',
        }}
      />

      {/* ── Badge ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '36px',
          position: 'relative',
          zIndex: 10,
          background: 'var(--glass-bg)',
          border: '1px solid var(--border)',
          borderRadius: '999px',
          padding: '6px 14px 6px 8px',
        }}
      >
        <span
          style={{
            background: '#4B35C8',
            color: '#ffffff',
            fontSize: '11px',
            fontWeight: 700,
            padding: '3px 9px',
            borderRadius: '999px',
            letterSpacing: '0.02em',
          }}
        >
          2025
        </span>
        <span
          style={{
            color: 'var(--text-muted)',
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '0.01em',
          }}
        >
          Next-Gen AI Studio
        </span>
      </div>

      {/* ── Heading ── */}
      <h1
        className="section-title font-bricolage"
        style={{
          fontSize: 'clamp(2.4rem, 5.5vw, 4rem)',
          fontWeight: 900,
          color: 'var(--text-primary)',
          textAlign: 'center',
          lineHeight: 1.1,
          letterSpacing: '-2px',
          marginBottom: '20px',
          position: 'relative',
          zIndex: 10,
          maxWidth: '720px',
          fontFamily: '"Bricolage Grotesque", var(--font-bricolage), sans-serif',
        }}
      >
        What would you like<br />
        to create today?
      </h1>

      {/* ── Subtitle ── */}
      <p
        style={{
          color: 'var(--text-muted)',
          textAlign: 'center',
          fontSize: '15px',
          lineHeight: 1.7,
          marginBottom: '40px',
          position: 'relative',
          zIndex: 10,
          maxWidth: '440px',
        }}
      >
        Creating latest solutions that redefine innovation.<br />
        Stay ahead with AI-powered technology for the future.
      </p>

      {/* ── Search Bar ── */}
      <div
        style={{
          width: '100%',
          maxWidth: '580px',
          background: 'var(--glass-bg)',
          border: '1px solid var(--border)',
          borderRadius: '999px',
          padding: '5px 5px 5px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 0 60px rgba(139,92,246,0.15), 0 4px 32px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(12px)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Sparkle icon */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, color: 'var(--text-faint)' }}>
          <path d="M12 2L13.09 8.26L19 6L14.74 10.91L21 12L14.74 13.09L19 18L13.09 15.74L12 22L10.91 15.74L5 18L9.26 13.09L3 12L9.26 10.91L5 6L10.91 8.26L12 2Z"
            stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>

        {/* Input */}
        <input
          type="text"
          placeholder={currentPlaceholder}
          className="placeholder:text-muted placeholder:opacity-100"
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text-primary)',
            fontSize: '14px',
            lineHeight: '1.5',
            height: '44px',
          }}
        />

        {/* Create button */}
        <button
          style={{
            background: '#ffffff',
            color: '#000000',
            border: 'none',
            borderRadius: '999px',
            height: '44px',
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontWeight: 700,
            fontSize: '14px',
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#f0f0f0')}
          onMouseLeave={e => (e.currentTarget.style.background = '#ffffff')}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Create
        </button>
      </div>

    </section>
  );
}
