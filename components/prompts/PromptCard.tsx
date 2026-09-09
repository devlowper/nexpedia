"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, Crown, Layers, Briefcase, ShoppingCart, FileText, Code, GraduationCap, HeartPulse, DollarSign, Palette, Sparkles, Heart } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";


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
}


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
  "Business":  { icon: Briefcase,     bg: "from-blue-500/20 to-indigo-600/30 dark:from-blue-500/20 dark:to-indigo-600/30", color: "text-indigo-500 dark:text-indigo-400" },
  "Marketing": { icon: ShoppingCart,  bg: "from-rose-500/20 to-pink-600/30 dark:from-rose-500/20 dark:to-pink-600/30",   color: "text-rose-500 dark:text-rose-400" },
  "Writing":   { icon: FileText,      bg: "from-amber-500/20 to-orange-600/30 dark:from-amber-500/20 dark:to-orange-600/30",color: "text-amber-500 dark:text-amber-400" },
  "Coding":    { icon: Code,          bg: "from-emerald-500/20 to-teal-600/30 dark:from-emerald-500/20 dark:to-teal-600/30",color: "text-teal-500 dark:text-teal-400" },
  "Education": { icon: GraduationCap, bg: "from-cyan-500/20 to-blue-600/30 dark:from-cyan-500/20 dark:to-blue-600/30",   color: "text-cyan-500 dark:text-cyan-400" },
  "Health":    { icon: HeartPulse,    bg: "from-red-500/20 to-rose-600/30 dark:from-red-500/20 dark:to-rose-600/30",    color: "text-red-500 dark:text-red-400" },
  "Finance":   { icon: DollarSign,    bg: "from-green-500/20 to-emerald-600/30 dark:from-green-500/20 dark:to-emerald-600/30",color: "text-green-500 dark:text-green-400" },
  "Design":    { icon: Palette,       bg: "from-fuchsia-500/20 to-purple-600/30 dark:from-fuchsia-500/20 dark:to-purple-600/30",color: "text-fuchsia-500 dark:text-fuchsia-400" },
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


interface PromptCardProps {
  prompt: Prompt;
  index?: number;
}

export function PromptCard({ prompt, index = 0 }: PromptCardProps) {
  const { user, toggleSavedPrompt } = useAuth();
  const imageUrl =
    prompt.example_output_image_url ?? prompt.example_output_image ?? null;
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
      className="group relative flex flex-col rounded-xl bg-surface dark:bg-[#0D1117] border border-black/10 dark:border-white/10 hover:border-accent/60 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* ── Cover image ── */}
      <div className="relative w-full aspect-[16/9] overflow-hidden shrink-0 bg-black/5 dark:bg-white/5 border-b border-black/5 dark:border-white/5">
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
          <div className="flex flex-col gap-1.5 items-start">
            {prompt.category ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-black/90 dark:text-white/90 bg-white/60 dark:bg-black/60 border border-black/10 dark:border-white/15 backdrop-blur-md px-2.5 py-0.5 rounded-md pointer-events-auto">
                <Layers size={11} className="text-accent dark:text-accent" />
                {prompt.category.name}
              </span>
            ) : <div />}

            {prompt.is_premium && (
              <span className="flex items-center gap-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-md pointer-events-auto">
                <Crown size={10} />
                PRO
              </span>
            )}
          </div>
          
          <button 
            onClick={handleSave}
            className={`p-2 rounded-full backdrop-blur-md transition-colors pointer-events-auto shadow-sm ${isSaved ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' : 'bg-white/60 dark:bg-black/60 text-black/70 dark:text-white/70 hover:bg-white/80 dark:hover:bg-black/80'}`}
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
          {prompt.icon && <span className="mr-1.5">{prompt.icon}</span>}
          {prompt.page_name}
        </h3>

        {/* Description */}
        <p className="text-muted/80 text-xs leading-relaxed line-clamp-2 flex-1 font-normal">
          {prompt.description}
        </p>

        {/* ── Footer row ── */}
        <div className="flex items-center justify-between pt-3 mt-auto border-t border-black/5 dark:border-white/5">
          {/* Tool avatars */}
          <div className="flex items-center -space-x-1.5">
            {uniqueTools.slice(0, 4).map((t) => {
              const logo = getToolLogo(t.recommended_tools_id.web_name);
              return (
                <div
                  key={t.recommended_tools_id.id}
                  title={t.recommended_tools_id.web_name}
                  className="w-5 h-5 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-black/50 overflow-hidden flex items-center justify-center shrink-0 shadow-sm"
                >
                  {logo ? (
                    logo.startsWith("http") ? (
                      <Image src={logo} alt={t.recommended_tools_id.web_name} width={16} height={16} className="object-contain p-0.5" unoptimized />
                    ) : (
                      <span className="text-[10px] leading-none select-none">{logo}</span>
                    )
                  ) : (
                    <span className="text-[8px] font-bold text-muted">
                      {t.recommended_tools_id.web_name[0]}
                    </span>
                  )}
                </div>
              );
            })}
            {uniqueTools.length === 0 && (
              <span className="text-faint text-[10px]">—</span>
            )}
          </div>

          {/* Views count */}
          <div className="flex items-center gap-1 text-faint text-[11px] font-medium">
            <Eye size={12} />
            <span>{(prompt.views_count ?? 0).toLocaleString()}</span>
          </div>
        </div>

        {/* ── Link overlay ── */}
        <Link
          href={`/prompt-library/${prompt.slug}`}
          className="absolute inset-0 z-10"
          aria-label={`View prompt: ${prompt.page_name}`}
        />
      </div>
    </motion.div>
  );
}
