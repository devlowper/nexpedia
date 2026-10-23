"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PromptCard, Prompt } from "@/components/prompts/PromptCard";

// ── Config constants (mirrors backend) ────────────────────────────────────────
const LATEST_DEFAULT_VISIBLE = 4;

interface LatestPromptCardProps {
  prompt: Prompt;
  index: number;
}

/** Wrapper that renders a PromptCard with the "Latest" badge overlaid. */
function LatestPromptCard({ prompt, index }: LatestPromptCardProps) {
  return (
    <div className="relative">
      {/* Latest badge — positioned neatly at top right beside the heart button */}
      <div className="absolute top-3 right-12 z-30 pointer-events-none">
        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-lg bg-accent text-white shadow-md shadow-accent/25 border border-white/20 backdrop-blur-md">
          <Sparkles size={9} />
          NEW
        </span>
      </div>
      <PromptCard 
        prompt={prompt} 
        index={index} 
        imageAspect="aspect-[1/1]" 
      />
    </div>
  );
}

interface LatestPromptsSectionProps {
  prompts: Prompt[];
  loading: boolean;
}

export function LatestPromptsSection({ prompts, loading }: LatestPromptsSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const expandRef = useRef<HTMLDivElement>(null);

  const visible = expanded ? prompts : prompts.slice(0, LATEST_DEFAULT_VISIBLE);
  const hasMore  = prompts.length > LATEST_DEFAULT_VISIBLE;

  // Smooth scroll when expanding to keep user oriented
  const handleExpand = () => {
    setExpanded(true);
  };

  const handleCollapse = () => {
    setExpanded(false);
    // Scroll back to section heading
    expandRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ── Loading state: hide entirely until we know there are latest prompts ──
  if (loading) return null;

  // ── Empty / hidden state ──────────────────────────────────────────────────
  if (prompts.length === 0) return null;

  return (
    <section className="space-y-6 pt-2 pb-10" ref={expandRef}>
      {/* ── Section Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border/50 pb-4 gap-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/25 flex items-center justify-center shadow-sm">
              <Sparkles size={18} className="text-accent" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary font-bricolage">
              Latest Prompts
            </h2>
            <p className="text-muted text-sm mt-0.5">
              Fresh prompts — added recently, ready to use.
            </p>
          </div>
        </div>

        {/* Card count badge */}
        <span className="self-start md:self-auto inline-flex items-center gap-1.5 text-xs font-semibold text-accent bg-accent/10 border border-accent/25 px-3 py-1 rounded-lg">
          <Sparkles size={11} />
          {prompts.length} prompt{prompts.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* ── Cards Grid ── */}
      {!loading && (
        <>
          {/* Always-visible cards (first 4) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {prompts.slice(0, LATEST_DEFAULT_VISIBLE).map((p, i) => (
              <LatestPromptCard key={p.slug ?? p._id} prompt={p} index={i} />
            ))}
          </div>

          {/* Expandable extra cards */}
          <AnimatePresence>
            {expanded && prompts.length > LATEST_DEFAULT_VISIBLE && (
              <motion.div
                key="extra-cards"
                initial={{ opacity: 0, height: 0, overflow: "hidden" }}
                animate={{ opacity: 1, height: "auto", overflow: "visible" }}
                exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 pt-5">
                  {prompts.slice(LATEST_DEFAULT_VISIBLE).map((p, i) => (
                    <LatestPromptCard
                      key={p.slug ?? p._id}
                      prompt={p}
                      index={LATEST_DEFAULT_VISIBLE + i}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── See more / Show less button ── */}
          {hasMore && (
            <div className="flex justify-center pt-2">
              {!expanded ? (
                <button
                  onClick={handleExpand}
                  className="group flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-accent bg-accent/10 hover:bg-accent/20 border border-accent/25 hover:border-accent/40 transition-all duration-200 shadow-sm"
                >
                  <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
                  See {prompts.length - LATEST_DEFAULT_VISIBLE} more
                </button>
              ) : (
                <button
                  onClick={handleCollapse}
                  className="group flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-accent bg-accent/10 hover:bg-accent/20 border border-accent/25 hover:border-accent/40 transition-all duration-200 shadow-sm"
                >
                  <ChevronUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
                  Show less
                </button>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}
