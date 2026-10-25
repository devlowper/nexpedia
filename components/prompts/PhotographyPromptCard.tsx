"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, Crown, Heart, Camera } from "lucide-react";
import { motion } from "framer-motion";
import { Prompt, cardVariants, cleanTitle, getPromptTools, getCategoryStyle } from "./PromptCard";
import { useAuth } from "@/hooks/useAuth";
import { formatViewCount } from "@/lib/utils";

interface PhotographyPromptCardProps {
  prompt: Prompt;
  index?: number;
  className?: string;
}

export function PhotographyPromptCard({ 
  prompt, 
  index = 0, 
  className = "" 
}: PhotographyPromptCardProps) {
  const { toggleSavedPrompt, isPromptSaved } = useAuth();
  const [views, setViews] = useState(prompt.views_count ?? 0);
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
      className={`group relative w-full aspect-[3/4] min-h-[380px] sm:min-h-[400px] rounded-2xl overflow-hidden cursor-pointer bg-surface dark:bg-[#0D1117] border border-black/10 dark:border-white/10 hover:border-accent/60 transition-all duration-500 shadow-md hover:shadow-2xl ${className}`}
    >
      {/* ── Background Photo Image ── */}
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={prompt.page_name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          unoptimized
        />
      ) : (
        (() => {
          const style = getCategoryStyle(prompt.category?.name || "Photography");
          const Icon = Camera;
          return (
            <div className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-amber-500/20 to-yellow-600/30 overflow-hidden`}>
              <Icon size={64} className="text-amber-500/50 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
              <div className="absolute -bottom-8 -right-8 w-36 h-36 blur-3xl opacity-40 bg-amber-500/30 rounded-full" />
            </div>
          );
        })()
      )}

      {/* ── Subtle bottom vignette when NOT hovered (clean showcase) ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none group-hover:opacity-0 transition-opacity duration-300" />

      {/* ── Rich Dark Overlay on Hover ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />

      {/* ── Top Badges & Actions (Inside Hover) ── */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-start justify-between opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white bg-black/65 border border-white/20 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-sm">
            <Camera size={12} className="text-accent" />
            Photography
          </span>

          {prompt.is_premium ? (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase text-accent bg-accent/20 border border-accent/40 px-2 py-1 rounded-lg backdrop-blur-md shadow-sm">
              <Crown size={10} className="text-accent" />
              {prompt.price || "PRO"}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase text-white/90 bg-black/60 border border-white/15 px-2 py-1 rounded-lg backdrop-blur-md shadow-sm">
              FREE
            </span>
          )}
        </div>

        <button
          onClick={handleSave}
          className={`p-2 rounded-xl backdrop-blur-md transition-colors pointer-events-auto shadow-md border z-30 ${
            isSaved
              ? "bg-red-500/25 border-red-500/50 text-red-500 hover:bg-red-500/35"
              : "bg-black/65 border-white/20 text-white/90 hover:text-white hover:bg-black/85"
          }`}
          title={isSaved ? "Remove from Saved" : "Save Prompt"}
        >
          <Heart size={14} fill={isSaved ? "currentColor" : "none"} className={isSaved ? "text-red-500" : ""} />
        </button>
      </div>

      {/* ── Bottom Details (Inside Hover) ── */}
      <div className="absolute inset-x-0 bottom-0 z-20 p-4 sm:p-5 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300">
        {/* Title */}
        <h3 className="font-bold text-white text-base sm:text-lg leading-snug line-clamp-2 drop-shadow-md">
          {cleanTitle(prompt.page_name)}
        </h3>

        {/* Description */}
        {prompt.description && (
          <p className="text-white/80 text-xs leading-relaxed line-clamp-2 drop-shadow-sm font-normal">
            {prompt.description}
          </p>
        )}

        {/* Footer row: Tools & Views */}
        <div className="flex items-center justify-between pt-2 mt-1 border-t border-white/15 gap-2">
          {/* Tool logos */}
          <div className="flex items-center gap-1.5 min-w-0 flex-1 overflow-hidden">
            {tools.length > 0 ? (
              <div className="flex items-center gap-1.5">
                {tools.slice(0, 4).map((t, i) => (
                  <div
                    key={i}
                    title={t.name}
                    className="w-6 h-6 rounded-full bg-white border border-black/10 flex items-center justify-center shrink-0 overflow-hidden shadow-sm hover:scale-110 transition-transform p-0.5"
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
                        <span className="text-xs leading-none select-none">{t.logo}</span>
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
          <div className="flex items-center gap-1.5 text-white/90 text-xs font-medium bg-black/50 px-2.5 py-1 rounded-lg backdrop-blur-md border border-white/15 shadow-sm shrink-0">
            <Eye size={12} />
            <span>{formatViewCount(views)}</span>
          </div>
        </div>
      </div>

      {/* ── Link overlay ── */}
      <Link
        href={`/prompt-library/${prompt.slug}`}
        onClick={() => setViews((v) => v + 1)}
        className="absolute inset-0 z-20"
        aria-label={`View prompt: ${prompt.page_name}`}
      />
    </motion.div>
  );
}
