"use client";

import React from "react";

export function LineStrip() {
  return (
    <div
      aria-hidden="true"
      className="absolute top-[36px] left-0 right-0 pointer-events-none select-none z-[1]"
    >
      {/* ── Full-screen Width Line Passing Behind the Search Bar ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen pointer-events-none overflow-hidden">
        {/* Blurred copy underneath for glow (blur 8px, opacity 35%) */}
        <div
          className="w-full h-[4px] blur-[8px] opacity-35"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(232, 64, 127, 0) 5%, var(--brand-solid, #E8407F) 25%, #FF8FB8 50%, var(--brand-solid, #E8407F) 75%, rgba(232, 64, 127, 0) 95%, transparent 100%)",
          }}
        />

        {/* Sharp 1.5px core line: transparent -> #E8407F -> #FF8FB8 -> #E8407F -> transparent */}
        <div
          className="w-full h-[1.5px] -mt-[2.75px]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(232, 64, 127, 0) 4%, var(--brand-solid, #E8407F) 22%, #FF8FB8 50%, var(--brand-solid, #E8407F) 78%, rgba(232, 64, 127, 0) 96%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Left glowing end-dot near where the line meets the search bar ── */}
      <div
        className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full z-[1]"
        style={{
          background: "#FF8FB8",
          boxShadow:
            "0 0 6px 1.5px rgba(255, 143, 184, 0.9), 0 0 12px 3px rgba(232, 64, 127, 0.5)",
        }}
      />

      {/* ── Right glowing end-dot near where the line meets the search bar ── */}
      <div
        className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full z-[1]"
        style={{
          background: "#FF8FB8",
          boxShadow:
            "0 0 6px 1.5px rgba(255, 143, 184, 0.9), 0 0 12px 3px rgba(232, 64, 127, 0.5)",
        }}
      />
    </div>
  );
}
