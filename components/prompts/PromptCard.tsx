"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, Crown, Layers, Briefcase, ShoppingCart, FileText, Code, GraduationCap, HeartPulse, DollarSign, Palette, Sparkles, Heart, Camera, Shapes, PenTool, Video, Flame, LayoutTemplate, Smartphone } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { formatViewCount } from "@/lib/utils";


export interface RecommendedTool {
  recommended_tools_id: {
    id: number;
    name: string;
    web_name: string;
    tech_name: string;
  };
}

export interface PromptCategory {
  id: number;
  name: string;
  slug: string;
}

export interface Prompt {
  _id?: string;
  id?: string;
  slug: string;
  page_name: string;
  icon?: string;
  description: string;
  is_premium?: boolean;
  price?: string;
  isLatest?: boolean;
  views_count?: number;
  saveCount?: number;
  example_output_image?: string | null;
  example_output_image_url?: string | null;
  date_published?: string;
  what_this_prompt_does?: string;
  tips?: string;
  how_to_use_the_prompt?: string;
  prompt_body?: string;
  category?: PromptCategory;
  sub_category?: PromptCategory;
  recommended_tools?: RecommendedTool[];
  aiModel?: string;
}

export interface DisplayTool {
  name: string;
  logo: string | null;
}

export const TOOL_LOGOS: Record<string, string> = {
  chatgpt: "/models/chatgpt.svg",
  "chat gpt": "/models/chatgpt.svg",
  openai: "/models/chatgpt.svg",
  "dall-e": "/models/chatgpt.svg",
  "dall-e 3": "/models/chatgpt.svg",
  dalle: "/models/chatgpt.svg",
  claude: "/models/claude.svg",
  anthropic: "/models/claude.svg",
  gemini: "/models/gemini.svg",
  grok: "/models/grok.svg",
  deepseek: "/models/deepseek.svg",
  midjourney: "/models/midjourney.svg",
  midjourny: "/models/midjourney.svg",
  runway: "https://www.google.com/s2/favicons?domain=runwayml.com&sz=128",
  runwayml: "https://www.google.com/s2/favicons?domain=runwayml.com&sz=128",
  "nano banana": "🍌",
  "nano banana pro": "🍌",
  banana: "🍌",
  flux: "https://www.google.com/s2/favicons?domain=blackforestlabs.ai&sz=128",
  "flux.1": "https://www.google.com/s2/favicons?domain=blackforestlabs.ai&sz=128",
  "stable diffusion": "https://www.google.com/s2/favicons?domain=stability.ai&sz=128",
  stability: "https://www.google.com/s2/favicons?domain=stability.ai&sz=128",
  sdxl: "https://www.google.com/s2/favicons?domain=stability.ai&sz=128",
  perplexity: "https://www.google.com/s2/favicons?domain=perplexity.ai&sz=128",
  mistral: "https://www.google.com/s2/favicons?domain=mistral.ai&sz=128",
  llama: "https://www.google.com/s2/favicons?domain=llama.meta.com&sz=128",
  qwen: "https://www.google.com/s2/favicons?domain=qwenlm.github.io&sz=128",
};

export const getToolLogo = (rawName?: string): string | null => {
  if (!rawName) return null;
  const name = rawName.trim().toLowerCase();
  if (name.includes("banana")) return "🍌";
  if (name.includes("midjourney") || name.includes("midjourny") || name.includes("mid-journey") || name.includes("mid journey") || name === "mj") {
    return "/models/midjourney.svg";
  }
  if (name.includes("claude") || name.includes("anthropic")) {
    return "/models/claude.svg";
  }
  if (name.includes("chatgpt") || name.includes("chat gpt") || name.includes("gpt") || name.includes("openai") || name.includes("dall") || name.includes("sora")) {
    return "/models/chatgpt.svg";
  }
  if (name.includes("gemini") || name.includes("bard")) {
    return "/models/gemini.svg";
  }
  if (name.includes("grok") || name.includes("xai")) {
    return "/models/grok.svg";
  }
  if (name.includes("deepseek") || name.includes("deep seek")) {
    return "/models/deepseek.svg";
  }
  if (name.includes("flux")) {
    return "https://www.google.com/s2/favicons?domain=blackforestlabs.ai&sz=128";
  }
  if (name.includes("stable") || name.includes("sdxl") || name.includes("diffusion")) {
    return "https://www.google.com/s2/favicons?domain=stability.ai&sz=128";
  }
  if (name.includes("runway")) {
    return "https://www.google.com/s2/favicons?domain=runwayml.com&sz=128";
  }
  if (name.includes("perplexity")) {
    return "https://www.google.com/s2/favicons?domain=perplexity.ai&sz=128";
  }
  if (name.includes("mistral")) {
    return "https://www.google.com/s2/favicons?domain=mistral.ai&sz=128";
  }
  if (name.includes("llama") || name.includes("meta")) {
    return "https://www.google.com/s2/favicons?domain=llama.meta.com&sz=128";
  }
  if (name.includes("qwen") || name.includes("alibaba")) {
    return "https://www.google.com/s2/favicons?domain=qwenlm.github.io&sz=128";
  }
  if (TOOL_LOGOS[name]) return TOOL_LOGOS[name];
  for (const [key, logo] of Object.entries(TOOL_LOGOS)) {
    if (name.includes(key) || key.includes(name)) return logo;
  }
  const domainGuess = name.replace(/[^a-z0-9]/g, "");
  return `https://www.google.com/s2/favicons?domain=${domainGuess}.com&sz=128`;
};

export const getPromptTools = (prompt: Prompt): DisplayTool[] => {
  const tools: DisplayTool[] = [];
  const seen = new Set<string>();

  // 1. Check prompt.aiModel first (Admin panel adds this field)
  if (prompt.aiModel && prompt.aiModel.trim()) {
    const modelNames = prompt.aiModel.split(/[,/]/).map(m => m.trim()).filter(Boolean);
    for (const name of modelNames) {
      const lower = name.toLowerCase();
      if (!seen.has(lower)) {
        seen.add(lower);
        tools.push({
          name: name,
          logo: getToolLogo(name)
        });
      }
    }
  }

  // 2. Check prompt.recommended_tools (legacy / relational data)
  if (prompt.recommended_tools && Array.isArray(prompt.recommended_tools)) {
    for (const t of prompt.recommended_tools) {
      const name = t.recommended_tools_id?.web_name || t.recommended_tools_id?.name;
      if (name && name.trim()) {
        const lower = name.trim().toLowerCase();
        if (!seen.has(lower)) {
          seen.add(lower);
          tools.push({
            name: name.trim(),
            logo: getToolLogo(name.trim())
          });
        }
      }
    }
  }

  return tools;
};

const getUniqueTools = (tools?: RecommendedTool[]) => {
  if (!tools?.length) return [];
  const seen = new Set<string>();
  return tools.filter((t) => {
    const key = t.recommended_tools_id?.web_name;
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

export const CATEGORY_STYLES: Record<string, { icon: any, bg: string, color: string }> = {
  "Business":       { icon: Briefcase,     bg: "from-blue-500/20 to-indigo-600/30 dark:from-blue-500/20 dark:to-indigo-600/30", color: "text-indigo-500 dark:text-indigo-400" },
  "Marketing":      { icon: ShoppingCart,  bg: "from-rose-500/20 to-pink-600/30 dark:from-rose-500/20 dark:to-pink-600/30",   color: "text-rose-500 dark:text-rose-400" },
  "Writing":        { icon: FileText,      bg: "from-amber-500/20 to-orange-600/30 dark:from-amber-500/20 dark:to-orange-600/30",color: "text-amber-500 dark:text-amber-400" },
  "Coding":         { icon: Code,          bg: "from-emerald-500/20 to-teal-600/30 dark:from-emerald-500/20 dark:to-teal-600/30",color: "text-teal-500 dark:text-teal-400" },
  "Website & App":  { icon: Code,          bg: "from-emerald-500/20 to-teal-600/30 dark:from-emerald-500/20 dark:to-teal-600/30",color: "text-teal-500 dark:text-teal-400" },
  "Education":      { icon: GraduationCap, bg: "from-cyan-500/20 to-blue-600/30 dark:from-cyan-500/20 dark:to-blue-600/30",   color: "text-cyan-500 dark:text-cyan-400" },
  "Health":         { icon: HeartPulse,    bg: "from-red-500/20 to-rose-600/30 dark:from-red-500/20 dark:to-rose-600/30",    color: "text-red-500 dark:text-red-400" },
  "Finance":        { icon: DollarSign,    bg: "from-green-500/20 to-emerald-600/30 dark:from-green-500/20 dark:to-emerald-600/30",color: "text-green-500 dark:text-green-400" },
  "Design":         { icon: Palette,       bg: "from-fuchsia-500/20 to-purple-600/30 dark:from-fuchsia-500/20 dark:to-purple-600/30",color: "text-fuchsia-500 dark:text-fuchsia-400" },
  "Photography":    { icon: Camera,        bg: "from-amber-500/20 to-yellow-600/30 dark:from-amber-500/20 dark:to-yellow-600/30", color: "text-amber-500 dark:text-amber-400" },
  "Logos & Icons":  { icon: Shapes,        bg: "from-indigo-500/20 to-violet-600/30 dark:from-indigo-500/20 dark:to-violet-600/30", color: "text-indigo-400 dark:text-indigo-300" },
  "Vector Design":  { icon: PenTool,       bg: "from-sky-500/20 to-blue-600/30 dark:from-sky-500/20 dark:to-blue-600/30", color: "text-sky-500 dark:text-sky-400" },
  "Video":          { icon: Video,         bg: "from-rose-500/20 to-red-600/30 dark:from-rose-500/20 dark:to-red-600/30", color: "text-rose-500 dark:text-rose-400" },
  "Viral Prompt":   { icon: Flame,         bg: "from-orange-500/20 to-amber-600/30 dark:from-orange-500/20 dark:to-amber-600/30", color: "text-orange-500 dark:text-orange-400" },
  "Mockup Prompt":  { icon: LayoutTemplate,bg: "from-teal-500/20 to-emerald-600/30 dark:from-teal-500/20 dark:to-emerald-600/30", color: "text-teal-400 dark:text-teal-300" },
  "Master Prompt":  { icon: Crown,         bg: "from-purple-500/20 to-pink-600/30 dark:from-purple-500/20 dark:to-pink-600/30", color: "text-purple-400 dark:text-purple-300" },
};

export const getCategoryStyle = (categoryName?: string) => {
  return CATEGORY_STYLES[categoryName || ""] || { icon: Sparkles, bg: "from-gray-500/10 to-slate-500/20 dark:from-gray-500/20 dark:to-slate-600/30", color: "text-gray-400 dark:text-gray-500" };
};


export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.06, ease: "easeOut" as const },
  }),
};

// Helper to remove any emojis from text
export const cleanTitle = (title: string) => {
  if (!title) return "";
  return title.replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu, "").trim();
};

interface PromptCardProps {
  prompt: Prompt;
  index?: number;
  imageAspect?: string;
  className?: string;
}

export function PromptCard({ 
  prompt, 
  index = 0, 
  imageAspect = "aspect-[16/9]", 
  className = "" 
}: PromptCardProps) {
  const { toggleSavedPrompt, isPromptSaved } = useAuth();
  const [views, setViews] = useState(prompt.views_count ?? 0);
  const imageUrl =
    prompt.example_output_image_url ?? prompt.example_output_image ?? null;
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
      className={`group relative flex flex-col rounded-xl bg-surface dark:bg-[#0D1117] border border-black/10 dark:border-white/10 hover:border-accent/60 transition-all duration-300 cursor-pointer overflow-hidden ${className}`}
    >
      {/* ── Cover image ── */}
      <div className={`relative w-full ${imageAspect} overflow-hidden shrink-0 bg-black/5 dark:bg-white/5 border-b border-black/5 dark:border-white/5`}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={prompt.page_name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            unoptimized
          />
        ) : (
          (() => {
            const style = getCategoryStyle(prompt.category?.name);
            const Icon = style.icon;
            return (
              <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${style.bg} overflow-hidden`}>
                <Icon size={48} className={`${style.color} opacity-50 group-hover:scale-110 group-hover:opacity-70 transition-all duration-500 ease-out`} strokeWidth={1.5} />
                <div className={`absolute -bottom-4 -right-4 blur-2xl opacity-40 mix-blend-overlay w-24 h-24 rounded-full bg-gradient-to-br ${style.bg}`} />
              </div>
            );
          })()
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between pointer-events-none z-20">
          <div className="flex flex-wrap items-center gap-1.5 max-w-[80%] pointer-events-auto">
            {prompt.category && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white/95 bg-black/70 dark:bg-[#12141a]/90 border border-white/15 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-sm">
                <Layers size={11} className="text-accent" />
                {prompt.category.name}
              </span>
            )}

            {prompt.is_premium ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase text-accent bg-accent/15 border border-accent/40 px-2 py-1 rounded-lg backdrop-blur-md shadow-sm">
                <Crown size={10} className="text-accent" />
                {prompt.price || "PRO"}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase text-white/90 dark:text-primary bg-black/70 dark:bg-[#12141a]/90 border border-white/15 px-2 py-1 rounded-lg backdrop-blur-md shadow-sm">
                FREE
              </span>
            )}
          </div>
          
          <button 
            onClick={handleSave}
            className={`p-2 rounded-xl backdrop-blur-md transition-colors pointer-events-auto shadow-sm border ${
              isSaved 
                ? 'bg-red-500/20 border-red-500/40 text-red-500 hover:bg-red-500/30' 
                : 'bg-black/60 dark:bg-[#12141a]/90 border-white/15 text-white/80 hover:text-white hover:bg-black/80'
            }`}
            title={isSaved ? "Remove from Saved" : "Save Prompt"}
          >
            <Heart size={14} fill={isSaved ? "currentColor" : "none"} className={isSaved ? "text-red-500" : ""} />
          </button>
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="flex flex-col flex-1 p-4 gap-2.5">
        {/* Title */}
        <h3 className="font-semibold text-primary text-base leading-snug line-clamp-1 group-hover:text-accent transition-colors duration-200">
          {cleanTitle(prompt.page_name)}
        </h3>

        {/* Description */}
        <p className="text-muted/80 text-xs leading-relaxed line-clamp-2 flex-1 font-normal">
          {prompt.description}
        </p>

        {/* ── Footer row ── */}
        <div className="flex items-center justify-between pt-3 mt-auto border-t border-black/5 dark:border-white/5 gap-2">
          {/* Model logos only — no label */}
          <div className="flex items-center gap-1.5 min-w-0 flex-1 overflow-hidden">
            {tools.length > 0 ? (
              <div className="flex items-center gap-1.5">
                {tools.slice(0, 5).map((t, i) => (
                  <div
                    key={i}
                    title={t.name}
                    className="w-5.5 h-5.5 rounded-full bg-white dark:bg-white border border-black/10 dark:border-black/20 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs hover:scale-110 transition-transform p-0.5"
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
                {tools.length > 5 && (
                  <span className="text-[10px] text-muted font-medium">+{tools.length - 5}</span>
                )}
              </div>
            ) : null}
          </div>

          {/* Views count */}
          <div className="flex items-center gap-1 text-faint text-[11px] font-medium shrink-0 ml-1">
            <Eye size={12} />
            <span>{formatViewCount(views)}</span>
          </div>
        </div>

        {/* ── Link overlay ── */}
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
