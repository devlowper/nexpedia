"use client";

import React from "react";

export function PinkArc() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0"
    >
      {/* ── Bloom 1: Gentle rose sunrise bloom (wide diffused radial glow at 10-14% opacity) ── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[140vw] max-w-[2000px] h-[580px] blur-[90px]"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(232, 64, 127, 0.13) 0%, rgba(247, 182, 207, 0.06) 45%, transparent 75%)",
        }}
      />

      {/* ── Bloom 2: Secondary lighter, wider soft bloom ── */}
      <div
        className="absolute top-[3%] left-1/2 -translate-x-1/2 w-[160vw] max-w-[2400px] h-[480px] blur-[110px]"
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at 50% 5%, rgba(255, 143, 184, 0.08) 0%, rgba(232, 64, 127, 0.03) 40%, transparent 70%)",
        }}
      />
    </div>
  );
}
