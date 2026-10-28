"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, Crown, Heart, Share2, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { Prompt, cardVariants, getCategoryStyle, cleanTitle, getPromptTools } from "./PromptCard";
import { useAuth } from "@/hooks/useAuth";
import { formatViewCount } from "@/lib/utils";

interface DesignPromptCardProps {
  prompt: Prompt;
  index?: number;
  masonry?: boolean;
}

export function DesignPromptCard({ prompt, index = 0, masonry = false }: DesignPromptCardProps) {
  const { toggleSavedPrompt, isPromptSaved } = useAuth();
  const [views, setViews] = useState(prompt.views_count ?? 0);
  const [imgError, setImgError] = useState(false);
  const tools = getPromptTools(prompt);
  const imageUrl = prompt.example_output_image_url ?? prompt.example_output_image ?? null;
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
      className={`group relative w-full rounded-2xl overflow-hidden cursor-pointer ${masonry ? "h-auto mb-6 inline-block" : "aspect-[3/4] md:aspect-[4/5]"}`}
    >
      {/* ── Background Image ── */}
      {imageUrl && !imgError ? (
        masonry ? (
          <img
            src={imageUrl}
            alt={`${cleanTitle(prompt.page_name) || "AI Design Prompt"} — ${prompt.category?.name || "AI"} Prompt Output`}
            loading="lazy"
            decoding="async"
            className="w-full h-auto block object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            onError={() => setImgError(true)}
          />
        ) : (
          <Image
            src={imageUrl}
            alt={`${cleanTitle(prompt.page_name) || "AI Design Prompt"} — ${prompt.category?.name || "AI"} Prompt Output`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            unoptimized
            onError={() => setImgError(true)}
          />
        )
      ) : (
        (() => {
          const style = getCategoryStyle(prompt.category?.name);
          const Icon = style.icon;
          return (
            <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${style.bg} ${masonry ? "h-[300px] static" : ""} overflow-hidden`}>
              <Icon size={72} className={`${style.color} opacity-40 group-hover:scale-110 group-hover:opacity-60 transition-all duration-700 ease-out drop-shadow-xl`} strokeWidth={1.5} />
              <div className={`absolute -top-10 -left-10 w-40 h-40 blur-3xl opacity-50 rounded-full bg-gradient-to-br ${style.bg}`} />
            </div>
          );
        })()
      )}

      {/* ── Gradient Overlay for Text Readability ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* ── Top Left Badges (Category & Pricing) ── */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {prompt.category && (
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-white/95 bg-black/60 border border-white/15 px-2 py-0.5 rounded-lg backdrop-blur-md">
            <Layers size={10} className="text-accent" />
            {prompt.category.name}
          </span>
        )}
        {prompt.is_premium ? (
          <span className="flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase text-accent bg-accent/15 border border-accent/40 px-2 py-0.5 rounded-lg backdrop-blur-md shadow-sm">
            <Crown size={10} className="text-accent" />
            PRO
          </span>
        ) : (
          <span className="flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase text-white/90 dark:text-primary bg-black/70 dark:bg-[#12141a]/90 border border-white/15 px-2 py-0.5 rounded-lg backdrop-blur-md shadow-sm">
            FREE
          </span>
        )}
      </div>

      {/* ── Content (Visible only on hover) ── */}
      <div className="absolute inset-0 z-20 p-5 flex flex-col justify-between opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
        
        {/* Top actions (Heart & Share) */}
        <div className="flex justify-end gap-2">
          <button 
            onClick={handleSave}
            className={`p-2 rounded-full backdrop-blur-md transition-colors relative z-40 ${isSaved ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' : 'bg-black/40 text-white hover:bg-black/60'}`}
            title={isSaved ? "Remove from Saved" : "Save Prompt"}
          >
            <Heart size={16} fill={isSaved ? "currentColor" : "none"} className={isSaved ? "text-red-500" : ""} />
          </button>
          <button className="p-2 bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-md text-white transition-colors relative z-40">
            <Share2 size={16} />
          </button>
        </div>

        {/* Bottom Content */}
        <div className="flex flex-col gap-2">
          {/* Title */}
          <h3 className="font-bold text-white text-lg leading-tight line-clamp-2 drop-shadow-md">
            {cleanTitle(prompt.page_name)}
          </h3>

          {/* Description */}
          {prompt.description && (
            <p className="text-white/80 text-xs leading-relaxed line-clamp-2 drop-shadow-sm font-normal">
              {prompt.description}
            </p>
          )}

          {/* Footer row (Tools & Views) */}
          <div className="flex items-center justify-between mt-1">
            {/* Tool logos only */}
            <div className="flex items-center gap-1.5">
              {tools.slice(0, 4).map((t: any, idx: number) => (
                <div
                  key={idx}
                  title={t.name}
                  className="w-6 h-6 rounded-full bg-white dark:bg-white border border-black/10 flex items-center justify-center shrink-0 overflow-hidden shadow-sm hover:scale-110 transition-transform p-0.5"
                >
                  {t.logo ? (
                    t.logo.startsWith("http") || t.logo.startsWith("/") ? (
                      <Image src={t.logo} alt={t.name} width={16} height={16} className="object-contain w-4 h-4 shrink-0" unoptimized />
                    ) : (
                      <span className="text-xs">{t.logo}</span>
                    )
                  ) : (
                    <span className="text-[10px] font-bold text-accent">{t.name[0]}</span>
                  )}
                </div>
              ))}
              {tools.length > 4 && (
                <span className="text-[10px] text-white/80 font-medium">+{tools.length - 4}</span>
              )}
            </div>

            {/* Views */}
            <span className="flex items-center gap-1.5 text-white/90 text-xs font-medium bg-black/40 px-2.5 py-1 rounded-lg backdrop-blur-sm border border-white/15 shadow-sm">
              <Eye size={12} />
              {formatViewCount(views)}
            </span>
          </div>
        </div>
      </div>

      {/* ── Hover CTA overlay ── */}
      <Link
        href={`/prompt-library/${prompt.slug}`}
        onClick={() => setViews((v) => v + 1)}
        className="absolute inset-0 z-30"
        aria-label={`View prompt: ${prompt.page_name}`}
      />
    </motion.div>
  );
}
