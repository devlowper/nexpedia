"use client";

import React, { useState, useEffect, useCallback, Suspense, useRef } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, ArrowLeft } from "lucide-react";
import { PromptCard, Prompt } from "@/components/prompts/PromptCard";
import { SkeletonCard } from "@/components/ui/SkeletonCard";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

function useToolPrompts(params: {
  tool: string;
  search: string;
  page: number;
}) {
  const [data, setData]       = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotal] = useState(1);

  const fetch_ = useCallback(async () => {
    setLoading(true);
    try {
      const q = new URLSearchParams();
      q.set("tool", params.tool);
      if (params.search) q.set("search", params.search);
      q.set("page", String(params.page));
      q.set("limit", "12");

      const res  = await fetch(`${API}/api/prompts?${q.toString()}`);
      const json = await res.json();
      if (json.success) {
        setData(json.data ?? []);
        setTotal(json.pagination?.pages ?? 1);
      }
    } catch (e) {
      console.error("Failed to fetch tool prompts:", e);
    } finally {
      setLoading(false);
    }
  }, [params.tool, params.search, params.page]);

  useEffect(() => { fetch_(); }, [fetch_]);

  return { data, loading, totalPages };
}

function ToolPromptsContent() {
  const { tool } = useParams<{ tool: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const decodedTool = decodeURIComponent(tool);

  const initialPage = parseInt(searchParams.get("page") ?? "1", 10) || 1;

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(initialPage);

  // Sync state when URL page changes
  useEffect(() => {
    const p = parseInt(searchParams.get("page") ?? "1", 10) || 1;
    setPage(p);
  }, [searchParams]);

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Track previous filters to avoid resetting on page changes
  const prevFilters = useRef({ debouncedSearch });

  // Reset to page 1 in URL and state when search query changes
  useEffect(() => {
    const filtersChanged = debouncedSearch !== prevFilters.current.debouncedSearch;
    if (filtersChanged) {
      prevFilters.current = { debouncedSearch };
      setPage(1);
      const params = new URLSearchParams(searchParams.toString());
      if (params.get("page") !== "1") {
        params.set("page", "1");
        router.push(`?${params.toString()}`, { scroll: false });
      }
    }
  }, [debouncedSearch, searchParams, router]);

  const { data: prompts, loading, totalPages } = useToolPrompts({
    tool: decodedTool,
    search: debouncedSearch,
    page,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* ── Breadcrumb / Back ── */}
      <div className="mb-8">
        <Link
          href="/prompt-library"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Prompt Library
        </Link>
      </div>

      {/* ── Hero header ── */}
      <div className="flex flex-col items-center text-center mb-10 gap-3">
        <span className="text-[10px] font-bold tracking-[0.25em] text-muted uppercase">
          AI Tool Category
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
          Browse <span className="text-accent">{decodedTool}</span> Prompts
        </h1>
        <p className="text-muted text-base max-w-xl">
          Expert-crafted prompts optimized specifically for {decodedTool} to elevate your AI-assisted workflow.
        </p>
      </div>

      {/* ── Search Controls ── */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex-1 flex items-center gap-3 bg-black/5 dark:bg-white/5 border border-border rounded-full px-4 py-2.5 focus-within:border-accent/50 transition-colors">
          <Search size={16} className="text-muted shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${decodedTool} prompts…`}
            className="flex-1 bg-transparent outline-none text-primary text-sm placeholder:text-faint"
          />
        </div>
      </div>

      {/* ── Grid ── */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : prompts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
          <span className="text-6xl">🔍</span>
          <p className="text-muted text-lg font-medium">No prompts found for {decodedTool}</p>
          <p className="text-faint text-sm">Try adjusting your search query</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {prompts.map((prompt, i) => (
            <PromptCard key={prompt._id ?? prompt.id ?? prompt.slug} prompt={prompt} index={i} />
          ))}
        </div>
      )}

      {/* ── Pagination ── */}
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
  );
}

export default function ToolPromptsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-12 flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-accent"></div>
      </div>
    }>
      <ToolPromptsContent />
    </Suspense>
  );
}
