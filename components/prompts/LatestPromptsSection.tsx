"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, ChevronDown, ChevronUp, Eye, Crown, Layers, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Prompt, cardVariants, cleanTitle, getPromptTools, getCategoryStyle } from "@/components/prompts/PromptCard";
import { useAuth } from "@/hooks/useAuth";
import { formatViewCount } from "@/lib/utils";
import { handleCardAdClick } from "@/lib/monetagAd";

// ── Config constants (mirrors backend) ────────────────────────────────────────
const LATEST_DEFAULT_VISIBLE = 4;

interface LatestPromptCardProps {
  prompt: Prompt;
  index: number;
}

const latestCardVariants: any = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      delay: i * 0.07,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

/** 
 * LatestPromptCard:
 * Visual-first card that reveals full prompt details (title, tools, category, views, save) on hover with rich micro-animations.
 */
function LatestPromptCard({ prompt, index }: LatestPromptCardProps) {
  const { toggleSavedPrompt, isPromptSaved } = useAuth();
  const [views, setViews] = useState(prompt.views_count ?? 0);
  const imageUrl = prompt.example_output_image_url ?? prompt.example_output_image ?? null;
  const tools = getPromptTools(prompt);
  const promptId = prompt._id || prompt.id || prompt.slug || '';
  const isSaved = isPromptSaved(promptId) || (prompt.slug ? isPromptSaved(prompt.slug) : false);

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await toggleSavedPrompt(promptId);
  };

  return (
    <motion.div
      custom={index}
      variants={latestCardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
      className="group relative w-full aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer border border-border/60 bg-surface dark:bg-[#0D1117] shadow-sm hover:shadow-[0_22px_45px_-12px_rgba(234,76,137,0.32)] hover:border-accent/60 transition-all duration-300"
    >
      {/* ── Background Image ── */}
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={prompt.page_name}
          fill
          className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          unoptimized
        />
      ) : (
        (() => {
          const style = getCategoryStyle(prompt.category?.name);
          const Icon = style.icon;
          return (
            <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${style.bg} overflow-hidden`}>
              <Icon size={64} className={`${style.color} opacity-40 group-hover:scale-115 group-hover:opacity-60 transition-all duration-500 ease-out`} strokeWidth={1.5} />
              <div className={`absolute -top-10 -left-10 w-36 h-36 blur-3xl opacity-50 rounded-full bg-gradient-to-br ${style.bg}`} />
            </div>
          );
        })()
      )}

      {/* ── Shimmer light sweep across card on hover ── */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-15" />

      {/* ── Gradient Overlay for Text Readability (visible on hover) ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />

      {/* ── Top Bar (Badges & Actions) ── */}
      <div className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between pointer-events-none">
        {/* Left: Category and Free/Pro badges (reveal on hover) */}
        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-auto">
          {prompt.category && (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-white/95 bg-black/60 border border-white/15 px-2 py-0.5 rounded-lg backdrop-blur-md shadow-sm">
              <Layers size={10} className="text-accent" />
              {prompt.category.name}
            </span>
          )}
          {prompt.is_premium ? (
            <span className="inline-flex items-center gap-1 text-[9px] font-bold tracking-wider uppercase text-accent bg-accent/15 border border-accent/40 px-2 py-0.5 rounded-lg backdrop-blur-md shadow-sm">
              <Crown size={9} className="text-accent" />
              {prompt.price || "PRO"}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[9px] font-bold tracking-wider uppercase text-white/90 bg-black/70 border border-white/15 px-2 py-0.5 rounded-lg backdrop-blur-md shadow-sm">
              FREE
            </span>
          )}
        </div>

        {/* Right: NEW badge (always visible) + Heart Save button (hover) */}
        <div className="flex items-center gap-1.5 ml-auto pointer-events-auto">
          {/* Heart Save Button */}
          <button
            onClick={handleSave}
            className={`p-1.5 rounded-lg backdrop-blur-md transition-all duration-200 shadow-sm border opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 ${
              isSaved
                ? 'bg-red-500/20 border-red-500/40 text-red-500 hover:bg-red-500/30 opacity-100'
                : 'bg-black/60 border-white/15 text-white/80 hover:text-white hover:bg-black/80'
            }`}
            title={isSaved ? "Remove from Saved" : "Save Prompt"}
          >
            <Heart size={13} fill={isSaved ? "currentColor" : "none"} className={isSaved ? "text-red-500" : ""} />
          </button>

          {/* Animated NEW Badge with ambient glowing pulse */}
          <div className="relative inline-flex items-center">
            <span className="absolute -inset-0.5 rounded-lg bg-accent/60 blur-xs animate-pulse opacity-80" />
            <span className="relative inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-lg bg-accent text-white shadow-md shadow-accent/30 border border-white/25 backdrop-blur-md">
              <Sparkles size={9} className="animate-pulse" />
              NEW
            </span>
          </div>
        </div>
      </div>

      {/* ── Hover Details: Bottom Info (Title, Tool logos, Views) ── */}
      <div className="absolute inset-x-0 bottom-0 z-20 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
        {/* Title */}
        <h3 className="font-bold text-white text-base leading-snug line-clamp-2 drop-shadow-md">
          {cleanTitle(prompt.page_name)}
        </h3>

        {/* Description snippet if available */}
        {prompt.description && (
          <p className="text-white/75 text-xs line-clamp-1 mt-1 font-normal drop-shadow-xs">
            {prompt.description}
          </p>
        )}

        {/* Footer row (Tools & Views) */}
        <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-white/15">
          {/* Tool / Model logos */}
          <div className="flex items-center gap-1.5">
            {tools.length > 0 ? (
              <div className="flex items-center gap-1">
                {tools.slice(0, 4).map((t: any, i: number) => (
                  <div
                    key={i}
                    title={t.name}
                    className="w-5.5 h-5.5 rounded-full bg-white border border-black/10 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs p-0.5 hover:scale-125 transition-transform duration-200"
                  >
                    {t.logo ? (
                      t.logo.startsWith("http") || t.logo.startsWith("/") ? (
                        <Image
                          src={t.logo}
                          alt={t.name}
                          width={16}
                          height={16}
                          className="object-contain w-3.5 h-3.5 shrink-0"
                          unoptimized
                        />
                      ) : (
                        <span className="text-[10px] leading-none select-none">{t.logo}</span>
                      )
                    ) : (
                      <span className="text-[9px] font-bold text-accent">{t.name[0]}</span>
                    )}
                  </div>
                ))}
                {tools.length > 4 && (
                  <span className="text-[10px] text-white/80 font-medium">+{tools.length - 4}</span>
                )}
              </div>
            ) : null}
          </div>

          {/* Views count */}
          <div className="flex items-center gap-1 text-white/90 text-xs font-medium bg-black/40 px-2 py-1 rounded-lg backdrop-blur-md border border-white/15 shadow-sm">
            <Eye size={12} />
            <span>{formatViewCount(views)}</span>
          </div>
        </div>
      </div>

      {/* ── Link overlay ── */}
      <Link
        href={`/prompt-library/${prompt.slug}`}
        onClick={(e) => {
          setViews((v) => v + 1);
          handleCardAdClick(e, prompt.slug);
        }}
        className="absolute inset-0 z-10"
        aria-label={`View prompt: ${prompt.page_name}`}
      />
    </motion.div>
  );
}

interface LatestPromptsSectionProps {
  prompts: Prompt[];
  loading: boolean;
}

export function LatestPromptsSection({ prompts, loading }: LatestPromptsSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const expandRef = useRef<HTMLDivElement>(null);

  const hasMore = prompts.length > LATEST_DEFAULT_VISIBLE;

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
