"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, Crown, Heart, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { Prompt, cardVariants, getCategoryStyle } from "./PromptCard";
import { useAuth } from "@/hooks/useAuth";

const TOOL_LOGOS: Record<string, string> = {
  chatgpt: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
  gemini:  "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg",
  claude:  "https://upload.wikimedia.org/wikipedia/commons/1/14/Anthropic_Claude_Logo.png",
  grok:    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Grok_logo.svg/1200px-Grok_logo.svg.png",
  deepseek: "https://avatars.githubusercontent.com/u/148784381?s=200&v=4",
  midjourney: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.svg",
};

const getToolLogo = (webName: string) => {
  const name = webName?.toLowerCase();
  if (name === "nano banana" || name === "nano banana pro") return "🍌";
  return TOOL_LOGOS[name] ?? null;
};

const getUniqueTools = (tools?: any[]) => {
  if (!tools?.length) return [];
  const seen = new Set<string>();
  return tools.filter((t) => {
    const key = t.recommended_tools_id?.web_name;
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

interface DesignPromptCardProps {
  prompt: Prompt;
  index?: number;
  masonry?: boolean;
}

export function DesignPromptCard({ prompt, index = 0, masonry = false }: DesignPromptCardProps) {
  const { user, toggleSavedPrompt } = useAuth();
  const imageUrl = prompt.example_output_image_url ?? prompt.example_output_image ?? null;
  const uniqueTools = getUniqueTools(prompt.recommended_tools);
  const promptId = prompt._id || prompt.id || '';
  const isSaved = user?.savedPrompts?.includes(promptId);

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      alert("Please log in to save prompts.");
      return;
    }
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
      {imageUrl ? (
        masonry ? (
          <img
            src={imageUrl}
            alt={prompt.page_name}
            className="w-full h-auto block object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <Image
            src={imageUrl}
            alt={prompt.page_name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            unoptimized
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

      {/* ── Premium badge ── */}
      {prompt.is_premium && (
        <span className="absolute top-4 left-4 z-20 flex items-center gap-1 bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Crown size={10} />
          PRO
        </span>
      )}

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
            {prompt.icon && <span className="mr-2">{prompt.icon}</span>}
            {prompt.page_name}
          </h3>

          {/* Footer row (Tools & Views) */}
          <div className="flex items-center justify-between mt-1">
            {/* Tool tags */}
            <div className="flex flex-wrap items-center gap-1.5">
              {uniqueTools.slice(0, 3).map((t: any) => (
                <span
                  key={t.recommended_tools_id?.web_name}
                  className="text-[10px] font-semibold text-white/90 bg-white/10 px-2 py-1 rounded-md backdrop-blur-sm border border-white/10"
                >
                  {t.recommended_tools_id.web_name}
                </span>
              ))}
            </div>

            {/* Views */}
            <span className="flex items-center gap-1.5 text-white/80 text-xs font-medium bg-white/10 px-2 py-1 rounded-full backdrop-blur-sm border border-white/10">
              <Eye size={12} />
              {(prompt.views_count ?? 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* ── Hover CTA overlay ── */}
      <Link
        href={`/prompt-library/${prompt.slug}`}
        className="absolute inset-0 z-30"
        aria-label={`View prompt: ${prompt.page_name}`}
      />
    </motion.div>
  );
}
