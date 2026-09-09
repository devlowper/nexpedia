"use client";

import React, { useState, useEffect, useCallback, Suspense, useRef } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, SlidersHorizontal, Crown, ChevronRight, ArrowLeft, PanelLeftClose, PanelLeftOpen, LayoutGrid, ShoppingCart, User, Smile, Wand2, Paintbrush, Building, MonitorPlay, PenTool, LayoutTemplate, Briefcase, FileText, Code, GraduationCap, HeartPulse, DollarSign, Palette } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PromptCard, Prompt } from "@/components/prompts/PromptCard";
import { DesignPromptCard } from "@/components/prompts/DesignPromptCard";
import { SkeletonCard } from "@/components/ui/SkeletonCard";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

const CATEGORIES = [
  { label: "All Prompts", value: "All" },
  { label: "Business",    value: "Business" },
  { label: "Marketing",   value: "Marketing" },
  { label: "Writing",     value: "Writing" },
  { label: "Coding",      value: "Coding" },
  { label: "Education",   value: "Education" },
  { label: "Health",      value: "Health" },
  { label: "Finance",     value: "Finance" },
  { label: "Design",      value: "Design" },
];

const SORT_OPTIONS = [
  { label: "Newest",  value: "newest" },
  { label: "Popular", value: "popular" },
  { label: "Oldest",  value: "oldest" },
];

const CATEGORY_ICONS: Record<string, any> = {
  "All": LayoutGrid,
  "Business": Briefcase,
  "Marketing": ShoppingCart,
  "Writing": FileText,
  "Coding": Code,
  "Education": GraduationCap,
  "Health": HeartPulse,
  "Finance": DollarSign,
  "Design": Palette,
};

function usePrompts(params: {
  search: string;
  category: string;
  sort: string;
  premium: string;
  page: number;
}) {
  const [data, setData]       = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotal] = useState(1);

  const fetch_ = useCallback(async () => {
    setLoading(true);
    try {
      const q = new URLSearchParams();
      if (params.search)   q.set("search",   params.search);
      if (params.category && params.category !== "All") q.set("category", params.category);
      if (params.sort)     q.set("sort",     params.sort);
      if (params.premium !== "all") q.set("premium", params.premium);
      q.set("page",  String(params.page));
      q.set("limit", "16");

      const res  = await fetch(`${API}/api/prompts?${q.toString()}`);
      const json = await res.json();
      if (json.success) {
        setData(json.data ?? []);
        setTotal(json.pagination?.pages ?? 1);
      }
    } catch (e) {
      console.error("Failed to fetch prompts:", e);
    } finally {
      setLoading(false);
    }
  }, [params.search, params.category, params.sort, params.premium, params.page]);

  useEffect(() => { fetch_(); }, [fetch_]);

  return { data, loading, totalPages };
}

function ExploreContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read initial params from URL
  const initialCategory = searchParams.get("category") || "All";
  const initialPage = parseInt(searchParams.get("page") ?? "1", 10) || 1;

  const [search,   setSearch]   = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [sort,     setSort]     = useState("newest");
  const [premium,  setPremium]  = useState("all");
  const [page,     setPage]     = useState(initialPage);
  const [showFilters, setShowFilters] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Sync category and page when URL changes
  useEffect(() => {
    setCategory(searchParams.get("category") || "All");
    setPage(parseInt(searchParams.get("page") ?? "1", 10) || 1);
  }, [searchParams]);

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  // Update URL on category change
  const handleCategoryClick = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (cat === "All") params.delete("category");
    else params.set("category", cat);
    params.set("page", "1");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Pagination change
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Reset page when filters change (ignoring category which is handled by handleCategoryClick)
  const prevFilters = useRef({ debouncedSearch, sort, premium });
  useEffect(() => {
    const filtersChanged = 
      debouncedSearch !== prevFilters.current.debouncedSearch ||
      sort !== prevFilters.current.sort ||
      premium !== prevFilters.current.premium;

    if (filtersChanged) {
      prevFilters.current = { debouncedSearch, sort, premium };
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", "1");
      router.push(`?${params.toString()}`, { scroll: false });
    }
  }, [debouncedSearch, sort, premium, searchParams, router]);

  const { data: prompts, loading, totalPages } = usePrompts({
    search: debouncedSearch,
    category,
    sort,
    premium,
    page,
  });

  return (
    <div className="w-full px-4 md:px-8 py-8">
      {/* ── Header ── */}
      <div className="mb-8 flex flex-col items-center text-center">
        <Link href="/prompt-library" className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-primary transition-colors mb-4">
          <ArrowLeft size={16} /> Back to Library
        </Link>
        <h1 className="text-3xl font-bold text-primary tracking-tight">Explore Prompts</h1>
        <p className="text-muted mt-2 text-sm max-w-md">Browse, filter, and discover the perfect AI prompts.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* ── Left Sidebar ── */}
        <AnimatePresence initial={false}>
          {isSidebarOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0, overflow: "hidden" }}
                animate={{ width: "auto", opacity: 1, overflow: "visible" }}
                exit={{ width: 0, opacity: 0, overflow: "hidden" }}
                transition={{ duration: 0.3 }}
                className="hidden md:block shrink-0 sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto no-scrollbar pb-8"
              >
              <div className="w-64 bg-[#0A0D14] border border-border/40 rounded-2xl p-3 shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
                <div className="flex items-center justify-between mb-4 px-3 pt-2">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-faint">Categories</h3>
                  <span className="text-[10px] font-semibold text-faint">{CATEGORIES.length}</span>
                </div>
                <div className="flex flex-col gap-1">
                  {CATEGORIES.map((c) => {
                    const Icon = CATEGORY_ICONS[c.value] || LayoutGrid;
                    const isActive = category === c.value;
                    return (
                      <button
                        key={c.value}
                        onClick={() => handleCategoryClick(c.value)}
                        className={`relative w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                          isActive
                            ? "bg-accent/5 text-accent"
                            : "text-muted hover:text-primary hover:bg-black/5 dark:bg-white/5"
                        }`}
                      >
                        {/* Active Left Bar */}
                        {isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[60%] bg-accent rounded-r-md" />
                        )}
                        
                        <span className="flex items-center gap-3">
                          <Icon size={16} className={isActive ? "text-accent" : "text-faint group-hover:text-muted transition-colors"} />
                          {c.label === "All Prompts" ? "All" : c.label}
                        </span>

                        {/* Active Right Dot */}
                        {isActive && (
                          <div className="w-1 h-1 rounded-full bg-accent" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Mobile sidebar (always visible as full width block on mobile) */}
        <div className="w-full md:hidden shrink-0 space-y-6">
          <div className="w-full bg-[#0A0D14] border border-border/40 rounded-2xl p-3 shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
            <div className="flex items-center justify-between mb-4 px-3 pt-2">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-faint">Categories</h3>
              <span className="text-[10px] font-semibold text-faint">{CATEGORIES.length}</span>
            </div>
            <div className="flex flex-col gap-1">
              {CATEGORIES.map((c) => {
                const Icon = CATEGORY_ICONS[c.value] || LayoutGrid;
                const isActive = category === c.value;
                return (
                  <button
                    key={c.value}
                    onClick={() => handleCategoryClick(c.value)}
                    className={`relative w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                      isActive
                        ? "bg-accent/5 text-accent"
                        : "text-muted hover:text-primary hover:bg-black/5 dark:bg-white/5"
                    }`}
                  >
                    {/* Active Left Bar */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[60%] bg-accent rounded-r-md" />
                    )}
                    
                    <span className="flex items-center gap-3">
                      <Icon size={16} className={isActive ? "text-accent" : "text-faint group-hover:text-muted transition-colors"} />
                      {c.label === "All Prompts" ? "All" : c.label}
                    </span>

                    {/* Active Right Dot */}
                    {isActive && (
                      <div className="w-1 h-1 rounded-full bg-accent" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Right Content Area ── */}
        <div className="flex-1 w-full min-w-0">
          {/* Controls */}
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="hidden md:flex items-center justify-center w-11 h-11 rounded-full border border-border bg-black/5 dark:bg-white/5 hover:border-accent/40 text-muted transition-colors shrink-0"
                title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              >
                {isSidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
              </button>
              <div className="flex-1 flex items-center gap-3 bg-black/5 dark:bg-white/5 border border-border rounded-full px-4 py-2.5 focus-within:border-accent/50 transition-colors">
                <Search size={16} className="text-muted shrink-0" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={`Search ${category === "All" ? "all prompts" : category.toLowerCase() + " prompts"}…`}
                  className="flex-1 bg-transparent outline-none text-primary text-sm placeholder:text-faint"
                />
              </div>
              <button
                onClick={() => setShowFilters(v => !v)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-medium transition-colors ${showFilters ? "border-accent text-accent bg-accent/10" : "border-border text-muted bg-black/5 dark:bg-white/5 hover:border-accent/40"}`}
              >
                <SlidersHorizontal size={15} />
                Filters
              </button>
            </div>

            {/* Expanded filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap items-center gap-4 p-4 glass-card-solid">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-faint font-medium uppercase tracking-wider">Sort:</span>
                      {SORT_OPTIONS.map((s) => (
                        <button
                          key={s.value}
                          onClick={() => setSort(s.value)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            sort === s.value ? "bg-accent text-black" : "bg-black/5 dark:bg-white/5 text-muted hover:text-primary border border-border"
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-faint font-medium uppercase tracking-wider">Access:</span>
                      {[
                        { label: "All",  value: "all" },
                        { label: "Free", value: "false" },
                        { label: "Pro",  value: "true" },
                      ].map((p) => (
                        <button
                          key={p.value}
                          onClick={() => setPremium(p.value)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            premium === p.value ? "bg-accent text-black" : "bg-black/5 dark:bg-white/5 text-muted hover:text-primary border border-border"
                          }`}
                        >
                          {p.value === "true" && <Crown size={12} />}
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Grid */}
          <div className="min-h-[50vh]">
            {loading ? (
              <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="break-inside-avoid">
                    <SkeletonCard />
                  </div>
                ))}
              </div>
            ) : prompts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 gap-4 text-center glass-card-solid">
                <span className="text-5xl">🔭</span>
                <p className="text-primary text-lg font-bold mt-2">No prompts found</p>
                <p className="text-muted text-sm max-w-sm">We couldn't find any prompts matching your criteria in this category.</p>
              </div>
            ) : (
              <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 pb-12">
                {prompts.map((prompt, i) => (
                  <div key={prompt._id ?? prompt.slug} className="break-inside-avoid">
                    <DesignPromptCard prompt={prompt} index={i} masonry={true} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10">
              <button
                onClick={() => handlePageChange(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg text-sm font-medium border border-border text-muted bg-black/5 dark:bg-white/5 disabled:opacity-30 hover:border-accent/40 transition-colors"
              >
                Prev
              </button>
              {(() => {
                let startPage = page;
                let endPage = startPage + 2;
                if (endPage > totalPages) {
                  endPage = totalPages;
                  startPage = Math.max(1, endPage - 2);
                }
                const pages = [];
                for (let p = startPage; p <= endPage; p++) {
                  pages.push(p);
                }
                return pages.map((p) => (
                  <button
                    key={p}
                    onClick={() => handlePageChange(p)}
                    className={`w-9 h-9 rounded-lg text-sm font-semibold border transition-colors ${
                      page === p
                        ? "bg-accent text-black border-accent"
                        : "border-border text-muted bg-black/5 dark:bg-white/5 hover:border-accent/40"
                    }`}
                  >
                    {p}
                  </button>
                ));
              })()}
              <button
                onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-lg text-sm font-medium border border-border text-muted bg-black/5 dark:bg-white/5 disabled:opacity-30 hover:border-accent/40 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-accent"></div>
      </div>
    }>
      <ExploreContent />
    </Suspense>
  );
}
