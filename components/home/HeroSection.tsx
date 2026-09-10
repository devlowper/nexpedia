"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
      {/* Dynamic Animated Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full blur-[100px]"
          style={{ background: 'linear-gradient(135deg, rgba(75, 53, 200, 0.4), transparent)' }}
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
            x: [0, -30, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] rounded-full blur-[120px]"
          style={{ background: 'linear-gradient(135deg, rgba(12, 123, 57, 0.3), transparent)' }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl">
        {/* ── Badge ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '36px',
            background: 'var(--glass-bg)',
            border: '1px solid var(--border)',
            borderRadius: '999px',
            padding: '6px 14px',
            backdropFilter: 'blur(10px)',
          }}
        >
          <span
            style={{
              color: 'var(--text-primary)',
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.01em',
            }}
          >
            Next-Gen AI Studio
          </span>
        </motion.div>

        {/* ── Heading ── */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-bricolage"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 800,
            textAlign: 'center',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: '24px',
            maxWidth: '800px',
            color: 'var(--text-primary)',
          }}
        >
          What would you like<br />
          to create today?
        </motion.h1>

        {/* ── Subtitle ── */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            color: 'var(--text-muted)',
            textAlign: 'center',
            fontSize: '16px',
            lineHeight: 1.6,
            marginBottom: '48px',
            maxWidth: '500px',
            fontWeight: 400,
          }}
        >
          Creating cutting-edge solutions that redefine innovation.<br />
          Stay ahead with AI-powered technology for the future.
        </motion.p>

        {/* ── Search Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="group"
          style={{
            width: '100%',
            maxWidth: '640px',
            background: 'var(--glass-bg)',
            border: '1px solid var(--border)',
            borderRadius: '999px',
            padding: '6px 6px 6px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(20px)',
            transition: 'all 0.3s ease',
          }}
        >
          {/* Sparkle icon */}
          <motion.svg 
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, color: '#A78BFA' }}
          >
            <path d="M12 2L13.09 8.26L19 6L14.74 10.91L21 12L14.74 13.09L19 18L13.09 15.74L12 22L10.91 15.74L5 18L9.26 13.09L3 12L9.26 10.91L5 6L10.91 8.26L12 2Z"
              stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          </motion.svg>

          {/* Input */}
          <input
            type="text"
            placeholder={currentPlaceholder}
            className="placeholder:text-muted/60"
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '15px',
              height: '48px',
            }}
          />

          {/* Create button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: 'var(--text-primary)',
              color: 'var(--bg-base)',
              border: 'none',
              borderRadius: '999px',
              height: '48px',
              padding: '0 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 600,
              fontSize: '15px',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Create
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

