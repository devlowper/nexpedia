"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { PromptCard, Prompt } from "@/components/prompts/PromptCard";
import { DesignPromptCard } from "@/components/prompts/DesignPromptCard";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import { PromptEnhancer } from "@/components/home/PromptEnhancer";

const MARQUEE_TOOLS = [
  { name: "ChatGPT", logo: "https://www.google.com/s2/favicons?domain=chatgpt.com&sz=128", color: "#10a37f" },
  { name: "Claude", logo: "https://www.google.com/s2/favicons?domain=claude.ai&sz=128", color: "#d97706" },
  { name: "DeepSeek", logo: "https://www.google.com/s2/favicons?domain=deepseek.com&sz=128", color: "#3b82f6" },
  { name: "Gemini", logo: "https://www.google.com/s2/favicons?domain=gemini.google.com&sz=128", color: "#1a73e8" },
  { name: "Grok", logo: "https://www.google.com/s2/favicons?domain=x.com&sz=128", color: "#ffffff" },
  { name: "Midjourney", logo: "https://www.google.com/s2/favicons?domain=midjourney.com&sz=128", color: "#8b5cf6" },
  { name: "Nano Banana", emoji: "🍌", color: "#f9c22e" },
];

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
const CATEGORY_ORDER = ["Design", "Business", "Marketing", "Writing", "Coding", "Education", "Health", "Finance"];


function useGroupedPrompts() {
  const [grouped, setGrouped] = useState<Record<string, Prompt[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/prompts/grouped`)
      .then(res => res.json())
      .then(json => {
        if (json.success) setGrouped(json.data || {});
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { grouped, loading };
}

function useSearchPrompts(query: string) {
  const [results, setResults] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    setLoading(true);
    const delay = setTimeout(() => {
      fetch(`${API}/api/prompts?search=${encodeURIComponent(query)}&limit=20`)
        .then(res => res.json())
        .then(json => {
          if (json.success) setResults(json.data || []);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }, 400); // debounce

    return () => clearTimeout(delay);
  }, [query]);

  return { results, loading };
}


function renderDesignSection(category: string, prompts: Prompt[]) {
  return (
    <section key={category} className="space-y-6 pt-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border/50 pb-4 gap-3">
        <div>
          <h2 className="text-3xl font-bold text-primary mb-1">
            {category}
          </h2>
          <p className="text-muted text-sm">Get inspired and create stunning visuals with AI-powered design prompts.</p>
        </div>
        <Link
          href={`/prompt-library/explore?category=${encodeURIComponent(category)}`}
          className="text-sm font-medium text-muted hover:text-accent flex items-center gap-1 transition-colors group whitespace-nowrap"
        >
          See more
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5">
        {prompts.slice(0, 12).map((p, i) => (
          <div key={p.slug} className="break-inside-avoid">
            <DesignPromptCard prompt={p} index={i} masonry={true} />
          </div>
        ))}
      </div>
    </section>
  );
}



function renderStandardSection(category: string, prompts: Prompt[], description: string) {
  return (
    <section key={category} className="space-y-6 pt-10">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-border/50 pb-4 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary flex items-center gap-2 mb-1">
            {category}
          </h2>
          <p className="text-muted text-sm">{description}</p>
        </div>
        <Link
          href={`/prompt-library/explore?category=${encodeURIComponent(category)}`}
          className="text-sm font-medium text-muted hover:text-accent flex items-center gap-1 transition-colors group whitespace-nowrap"
        >
          See more
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {prompts.slice(0, 4).map((p, i) => (
          <PromptCard key={p.slug} prompt={p} index={i} />
        ))}
      </div>
    </section>
  );
}


function PromptLibraryContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const search = searchParams.get("search") || "";

  const setSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const { grouped, loading: groupedLoading } = useGroupedPrompts();
  const { results: searchResults, loading: searchLoading } = useSearchPrompts(search);

  const isSearching = search.trim().length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 relative overflow-hidden">

      {/* ── Prompt Enhancer ── */}
      <div className="w-full mb-12 relative z-10">
        <PromptEnhancer />
      </div>

      {/* ── Hero header ── */}
      <div className="flex flex-col items-center text-center mb-10 gap-3 relative z-10">
        <span className="text-[10px] font-bold tracking-[0.25em] text-muted uppercase">Prompt Library</span>
        <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
          Browse <span className="text-accent">All Prompts</span>
        </h1>
        <p className="text-muted text-base max-w-xl">
          Discover expert-crafted prompts for every use case — copy, customise, and supercharge your AI workflow.
        </p>
      </div>

      {/* ── AI Tools Infinite Scroll Marquee ── */}
      <div className="w-full mb-12 glass-card-solid p-6 md:p-8 relative z-10">
        <p className="text-center text-xs font-bold text-muted mb-4 uppercase tracking-[0.25em]">
          Explore by AI Tool
        </p>
        <div className="marquee-container py-2">
          <div className="marquee-content">
            {[...MARQUEE_TOOLS, ...MARQUEE_TOOLS].map((tool, idx) => (
              <Link
                key={`${tool.name}-${idx}`}
                href={`/prompt-library/explore?tool=${encodeURIComponent(tool.name)}`}
                className="flex items-center gap-3 bg-black/5 dark:bg-white/5 border border-border rounded-full px-5 py-2 hover:bg-black/10 dark:hover:bg-white/10 hover:border-accent/40 hover:scale-[1.03] transition-all duration-300 shadow-sm hover:shadow-md group shrink-0"
                style={{ "--tool-color": tool.color } as React.CSSProperties}
              >
                <div className="w-5 h-5 rounded-full flex items-center justify-center overflow-hidden shrink-0 bg-black/10">
                  {tool.logo ? (
                    <img src={tool.logo} alt={tool.name} width={16} height={16} className="object-contain" />
                  ) : (
                    <span className="text-[12px] leading-none">{tool.emoji}</span>
                  )}
                </div>
                <span className="text-primary text-xs font-semibold tracking-wide">
                  {tool.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Search Bar ── */}
      <div className="mb-16 max-w-2xl mx-auto relative z-10">
        <div className="flex items-center gap-3 bg-elevated/80 backdrop-blur-xl border border-border rounded-full px-5 py-3.5 focus-within:border-accent/50 transition-all shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:bg-elevated">
          <Search size={18} className="text-accent shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search prompts by keyword or description…"
            className="flex-1 bg-transparent outline-none text-primary text-sm placeholder:text-faint"
          />
        </div>
      </div>

      {/* ── Main Content Area ── */}
      <div className="relative z-10">
        {isSearching ? (
          /* SEARCH RESULTS */
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-primary">Search results for "{search}"</h2>
            {searchLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : searchResults.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center glass-card-solid">
                <span className="text-5xl mb-4">🔍</span>
                <p className="text-primary font-bold text-xl">No results found</p>
                <p className="text-muted text-sm mt-2">Try adjusting your search keywords.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {searchResults.map((prompt, i) => (
                  <PromptCard key={prompt.slug} prompt={prompt} index={i} />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* MIXED LAYOUT CATEGORY SECTIONS */
          <div className="space-y-20">
            {groupedLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="h-6 w-32 bg-black/10 dark:bg-white/10 animate-pulse rounded"></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, j) => <SkeletonCard key={j} />)}
                  </div>
                </div>
              ))
            ) : (
              CATEGORY_ORDER.map((category, idx) => {
                const prompts = grouped[category];
                if (!prompts || prompts.length === 0) return null;
                
                if (category === "Design") {
                  return renderDesignSection(category, prompts);
                } else {
                  let description = "Explore specialized prompts for this category.";
                  if (category === "Business") description = "Elevate your business strategy and operations with AI.";
                  if (category === "Marketing") description = "Supercharge your campaigns and copy with tailored prompts.";
                  if (category === "Writing") description = "Overcome writer's block and polish your content.";
                  if (category === "Coding") description = "Accelerate your development workflow and debugging.";
                  if (category === "Finance") description = "Optimize your financial analysis, modeling, and planning with AI.";
                  if (category === "Education") description = "Enhance learning, teaching, and course creation with powerful prompts.";
                  if (category === "Health") description = "Discover AI workflows for wellness, fitness, and health insights.";
                  
                  return renderStandardSection(category, prompts, description);
                }
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function PromptLibraryPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-12 flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-accent"></div>
      </div>
    }>
      <PromptLibraryContent />
    </Suspense>
  );
}
