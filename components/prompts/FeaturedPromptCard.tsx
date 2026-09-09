"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, Crown, Layers, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Prompt, cardVariants } from "./PromptCard";
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

interface FeaturedPromptCardProps {
  prompt: Prompt;
  index?: number;
}

export function FeaturedPromptCard({ prompt, index = 0 }: FeaturedPromptCardProps) {
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
      className="group prompt-card col-span-1 md:col-span-2 cursor-pointer hover:-translate-y-1 !p-0 !flex-row overflow-hidden"
    >
      {/* ── Top Right Badges ── */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        {prompt.is_premium && (
          <span className="flex items-center gap-1 bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md">
            <Crown size={10} />
            PRO
          </span>
        )}
        <button 
          onClick={handleSave}
          className={`p-2 rounded-full backdrop-blur-md transition-colors shadow-sm ${isSaved ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' : 'bg-black/10 dark:bg-white/10 text-primary hover:bg-black/20 dark:hover:bg-white/20'}`}
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
          <span className="inline-flex items-center gap-1.5 self-start text-[10px] font-semibold uppercase tracking-wider text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-full">
            <Layers size={9} />
            FEATURED
          </span>
        )}

        {/* Title */}
        <h3 className="font-bold text-primary text-xl leading-snug line-clamp-2">
          {prompt.icon && <span className="mr-2">{prompt.icon}</span>}
          {prompt.page_name}
        </h3>

        {/* Description */}
        <p className="text-muted text-sm leading-relaxed line-clamp-3 flex-1">
          {prompt.description}
        </p>

        {/* ── Footer row ── */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-auto">
          {/* Tool avatars */}
          <div className="flex items-center -space-x-2">
            {uniqueTools.slice(0, 4).map((t: any) => {
              const logo = getToolLogo(t.recommended_tools_id.web_name);
              return (
                <div
                  key={t.recommended_tools_id.id}
                  title={t.recommended_tools_id.web_name}
                  className="w-7 h-7 rounded-full border-2 border-[var(--bg-surface)] bg-elevated overflow-hidden flex items-center justify-center shrink-0"
                >
                  {logo ? (
                    logo.startsWith("http") ? (
                      <Image src={logo} alt={t.recommended_tools_id.web_name} width={24} height={24} className="object-contain p-0.5" unoptimized />
                    ) : (
                      <span className="text-[14px] leading-none select-none">{logo}</span>
                    )
                  ) : (
                    <span className="text-[10px] font-bold text-muted">
                      {t.recommended_tools_id.web_name[0]}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Views */}
          <span className="flex items-center gap-1.5 text-faint text-xs font-medium">
            <Eye size={14} />
            {(prompt.views_count ?? 0).toLocaleString()}
          </span>
        </div>

        {/* ── Hover CTA overlay ── */}
        <Link
          href={`/prompt-library/${prompt.slug}`}
          className="absolute inset-0 z-10"
          aria-label={`View prompt: ${prompt.page_name}`}
        />
      </div>
    </motion.div>
  );
}
