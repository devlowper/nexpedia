"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, Crown, Layers, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Prompt, cardVariants, cleanTitle, getPromptTools } from "./PromptCard";
import { useAuth } from "@/hooks/useAuth";

interface FeaturedPromptCardProps {
  prompt: Prompt;
  index?: number;
}

export function FeaturedPromptCard({ prompt, index = 0 }: FeaturedPromptCardProps) {
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
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="group prompt-card col-span-1 md:col-span-2 cursor-pointer hover:-translate-y-1 !p-0 !flex-row overflow-hidden"
    >
      {/* ── Top Right Badges ── */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        {prompt.is_premium ? (
          <span className="flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase text-accent bg-accent/15 border border-accent/40 px-2.5 py-1 rounded-lg backdrop-blur-md shadow-sm">
            <Crown size={11} className="text-accent" />
            PRO
          </span>
        ) : (
          <span className="flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase text-white/90 dark:text-primary bg-black/70 dark:bg-[#12141a]/90 border border-white/15 px-2.5 py-1 rounded-lg backdrop-blur-md shadow-sm">
            FREE
          </span>
        )}
        <button 
          onClick={handleSave}
          className={`p-2 rounded-xl backdrop-blur-md transition-colors shadow-sm border ${
            isSaved 
              ? 'bg-red-500/20 border-red-500/40 text-red-500 hover:bg-red-500/30' 
              : 'bg-black/60 dark:bg-[#12141a]/90 border-white/15 text-white/80 hover:text-white hover:bg-black/80'
          }`}
          title={isSaved ? "Remove from Saved" : "Save Prompt"}
        >
          <Heart size={14} fill={isSaved ? "currentColor" : "none"} className={isSaved ? "text-red-500" : ""} />
        </button>
      </div>

      {/* ── Cover image (Left Side on Desktop) ── */}
      <div className="relative w-1/3 min-w-[200px] h-full overflow-hidden shrink-0 bg-black/5 dark:bg-white/5 border-r border-border">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={prompt.page_name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent/10 to-accent/5">
            <span className="text-6xl select-none opacity-60">{prompt.icon ?? "✨"}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[var(--bg-surface)]" />
      </div>

      {/* ── Card body (Right Side) ── */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        {/* Category badge */}
        {prompt.category && (
          <span className="inline-flex items-center gap-1.5 self-start text-[11px] font-semibold tracking-wide text-accent bg-accent/10 border border-accent/25 px-2.5 py-1 rounded-lg">
            <Layers size={11} />
            {prompt.category.name || "FEATURED"}
          </span>
        )}

        {/* Title */}
        <h3 className="font-bold text-primary text-xl leading-snug line-clamp-2">
          {cleanTitle(prompt.page_name)}
        </h3>

        {/* Description */}
        <p className="text-muted text-sm leading-relaxed line-clamp-3 flex-1">
          {prompt.description}
        </p>

        {/* ── Footer row ── */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-auto gap-2">
          {/* Model logos only — no label */}
          <div className="flex items-center gap-1.5 min-w-0 flex-1 overflow-hidden">
            {tools.length > 0 ? (
              <div className="flex items-center gap-1.5">
                {tools.slice(0, 5).map((t, i) => (
                  <div
                    key={i}
                    title={t.name}
                    className="w-6 h-6 rounded-full bg-white dark:bg-white border border-black/10 flex items-center justify-center shrink-0 overflow-hidden shadow-xs hover:scale-110 transition-transform p-0.5"
                  >
                    {t.logo ? (
                      t.logo.startsWith("http") || t.logo.startsWith("/") ? (
                        <Image src={t.logo} alt={t.name} width={18} height={18} className="object-contain w-4 h-4 shrink-0" unoptimized />
                      ) : (
                        <span className="text-sm">{t.logo}</span>
                      )
                    ) : (
                      <span className="text-[10px] font-bold text-accent">{t.name[0]}</span>
                    )}
                  </div>
                ))}
                {tools.length > 5 && (
                  <span className="text-xs text-muted">+{tools.length - 5}</span>
                )}
              </div>
            ) : null}
          </div>

          {/* Views */}
          <span className="flex items-center gap-1.5 text-faint text-xs font-medium shrink-0">
            <Eye size={14} />
            {views.toLocaleString()}
          </span>
        </div>

        {/* ── Hover CTA overlay ── */}
        <Link
          href={`/prompt-library/${prompt.slug}`}
          onClick={() => setViews(v => v + 1)}
          className="absolute inset-0 z-10"
          aria-label={`View prompt: ${prompt.page_name}`}
        />
      </div>
    </motion.div>
  );
}
