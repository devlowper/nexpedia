"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft, Eye, Crown, Copy, Check, Lightbulb,
  BookOpen, Wrench, ChevronRight, Layers, Sparkles, Share2, Heart
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Prompt, PromptCard, cardVariants, cleanTitle, getPromptTools } from "@/components/prompts/PromptCard";
import { useAuth } from "@/hooks/useAuth";
import { getApiBaseUrl } from "@/lib/apiClient";
import { formatViewCount } from "@/lib/utils";


function BulletList({ text, bulletColor = "text-accent" }: { text: string; bulletColor?: string }) {
  const lines = text
    .split(/\n+/)
    .map((l) => l.trim().replace(/^●\s*/, ""))
    .filter(Boolean);

  return (
    <ul className="space-y-2.5">
      {lines.map((line, i) => (
        <li key={i} className="flex gap-2.5 text-muted text-sm leading-relaxed">
          <span className={`${bulletColor} mt-0.5 shrink-0 select-none`}>●</span>
          <span>{line}</span>
        </li>
      ))}
    </ul>
  );
}


function SectionCard({
  icon: Icon,
  title,
  children,
  iconBg = "bg-accent/10",
  iconBorder = "border-accent/25",
  iconColor = "text-accent",
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  iconBg?: string;
  iconBorder?: string;
  iconColor?: string;
}) {
  return (
    <div className="details-card p-5 md:p-6 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${iconBg} ${iconBorder}`}
        >
          <Icon size={16} className={iconColor} />
        </div>
        <h2 className="font-bold text-primary text-sm tracking-wide">{title}</h2>
      </div>
      {children}
    </div>
  );
}


function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-accent text-black hover:bg-accent-hover transition-colors"
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span
            key="check"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="flex items-center gap-1.5"
          >
            <Check size={15} /> Copied!
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="flex items-center gap-1.5"
          >
            <Copy size={15} /> Copy Prompt
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}


function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (err) {
        // user aborted
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border border-border bg-black/5 dark:bg-white/5 text-muted hover:text-primary hover:border-accent/40 transition-colors"
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span
            key="check"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="flex items-center gap-1.5 text-accent"
          >
            <Check size={15} /> Copied!
          </motion.span>
        ) : (
          <motion.span
            key="share"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="flex items-center gap-1.5"
          >
            <Share2 size={15} /> Share
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

function SaveButton({ promptId }: { promptId: string }) {
  const { toggleSavedPrompt, isPromptSaved } = useAuth();
  const isSaved = isPromptSaved(promptId);

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await toggleSavedPrompt(promptId);
  };

  return (
    <button
      onClick={handleSave}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${
        isSaved 
          ? 'border-red-500/40 bg-red-500/10 text-red-500 hover:bg-red-500/20' 
          : 'border-border bg-black/5 dark:bg-white/5 text-muted hover:text-primary hover:border-accent/40'
      }`}
    >
      <Heart size={15} fill={isSaved ? "currentColor" : "none"} className={isSaved ? "text-red-500" : ""} />
      <span className="hidden sm:inline">{isSaved ? "Saved" : "Save"}</span>
    </button>
  );
}





function DetailSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-6 animate-pulse">
      <div className="h-5 w-32 bg-black/5 dark:bg-white/5 rounded-md" />
      <div className="h-10 w-3/4 bg-black/5 dark:bg-white/5 rounded-md" />
      <div className="h-4 w-1/2 bg-black/5 dark:bg-white/5 rounded-md" />
      <div className="h-48 w-full bg-black/5 dark:bg-white/5 rounded-xl" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1,2,3].map(i => <div key={i} className="h-32 bg-black/5 dark:bg-white/5 rounded-xl" />)}
      </div>
    </div>
  );
}


export default function PromptDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const router   = useRouter();

  const [prompt,  setPrompt]  = useState<Prompt | null>(null);
  const [related, setRelated] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);

    const baseUrl = getApiBaseUrl();
    Promise.all([
      fetch(`${baseUrl}/api/prompts/${slug}`).then(r => r.json()),
      fetch(`${baseUrl}/api/prompts/${slug}/related`).then(r => r.json()),
    ])
      .then(([pRes, rRes]) => {
        if (pRes.success)  setPrompt(pRes.data);
        if (rRes.success)  setRelated(rRes.data ?? []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <DetailSkeleton />;

  if (!prompt) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
        <span className="text-6xl">😕</span>
        <p className="text-primary text-xl font-semibold">Prompt not found</p>
        <Link href="/prompt-library" className="text-accent underline text-sm">
          ← Back to library
        </Link>
      </div>
    );
  }

  const imageUrl = prompt.example_output_image_url ?? prompt.example_output_image ?? null;

  const tools = getPromptTools(prompt);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto px-4 py-10"
    >
      {/* ── Breadcrumb ── */}
      <nav className="flex items-center gap-2 text-xs text-muted mb-6">
        <button onClick={() => router.back()} className="flex items-center gap-1 hover:text-primary transition-colors">
          <ArrowLeft size={13} /> Back
        </button>
        <ChevronRight size={12} className="text-faint" />
        <Link href="/prompt-library" className="hover:text-primary transition-colors">Prompt Library</Link>
        <ChevronRight size={12} className="text-faint" />
        {prompt.category && (
          <>
            <span className="text-muted">{prompt.category.name}</span>
            <ChevronRight size={12} className="text-faint" />
          </>
        )}
        <span className="text-primary line-clamp-1">{prompt.page_name}</span>
      </nav>

      {/* ── Hero ── */}
      <div className="details-card overflow-hidden mb-6">
        {imageUrl && (
          <div className="relative w-full aspect-video bg-black/5 dark:bg-white/5 flex items-center justify-center border-b border-border">
            <img
              src={imageUrl}
              alt={prompt.page_name}
              className="w-full h-full object-contain"
            />
          </div>
        )}

        <div className="p-6 md:p-8">
          {/* Badges row */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {prompt.category && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-accent bg-accent/10 border border-accent/25 px-2.5 py-1 rounded-lg">
                <Layers size={11} /> {prompt.category.name}
              </span>
            )}
            {prompt.sub_category && (
              <span className="inline-flex items-center text-[11px] font-medium text-muted bg-black/20 dark:bg-white/5 border border-border px-2.5 py-1 rounded-lg">
                {prompt.sub_category.name}
              </span>
            )}
            {prompt.is_premium ? (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase text-accent bg-accent/15 border border-accent/35 px-2.5 py-1 rounded-lg shadow-sm">
                <Crown size={11} className="text-accent" /> {prompt.price || "PRO"}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase text-muted bg-black/5 dark:bg-white/5 border border-border px-2.5 py-1 rounded-lg shadow-sm">
                FREE
              </span>
            )}
            <span className="flex items-center gap-1 text-[11px] text-faint ml-auto">
              <Eye size={12} />
              {formatViewCount(prompt.views_count)} views
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-primary mb-3 leading-tight">
            {cleanTitle(prompt.page_name)}
          </h1>

          {/* Description */}
          <p className="text-muted text-base leading-relaxed mb-6">{prompt.description}</p>

          {/* Action buttons */}
          {prompt.prompt_body && (
            <div className="flex items-center justify-end gap-2 sm:gap-3">
              <SaveButton promptId={prompt._id || prompt.id || ''} />
              <ShareButton title={prompt.page_name} />
              <CopyButton text={prompt.prompt_body} />
            </div>
          )}
        </div>
      </div>

      {/* ── Info sections ── */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        {/* Works with small card */}
        {tools.length > 0 && (
          <div className="details-card p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-accent/10 border border-accent/25 shadow-2xs">
                  <Wrench size={15} className="text-accent" />
                </div>
                <span className="text-xs font-bold text-primary tracking-wide uppercase">
                  Works with:
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {tools.map((t, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 border border-border text-xs font-semibold text-primary shadow-xs hover:border-accent/40 transition-colors"
                  >
                    {t.logo && (
                      t.logo.startsWith("http") || t.logo.startsWith("/") ? (
                        <Image
                          src={t.logo}
                          alt={t.name}
                          width={16}
                          height={16}
                          className="object-contain w-4 h-4 shrink-0 rounded-xs"
                          unoptimized
                        />
                      ) : (
                        <span className="text-sm leading-none">{t.logo}</span>
                      )
                    )}
                    <span>{t.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {prompt.what_this_prompt_does && (
          <SectionCard
            icon={Sparkles}
            title="What This Prompt Does"
            iconBg="bg-accent/10"
            iconBorder="border-accent/25"
            iconColor="text-accent"
          >
            <BulletList text={prompt.what_this_prompt_does} bulletColor="text-accent" />
          </SectionCard>
        )}

        {prompt.tips && (
          <SectionCard
            icon={Lightbulb}
            title="Tips for This Prompt"
            iconBg="bg-amber-500/10"
            iconBorder="border-amber-500/25"
            iconColor="text-amber-400"
          >
            <BulletList text={prompt.tips} bulletColor="text-amber-400" />
          </SectionCard>
        )}

        {prompt.how_to_use_the_prompt && (
          <SectionCard
            icon={BookOpen}
            title="How to Use the Prompt"
            iconBg="bg-blue-500/10"
            iconBorder="border-blue-500/25"
            iconColor="text-blue-400"
          >
            <BulletList text={prompt.how_to_use_the_prompt} bulletColor="text-blue-400" />
          </SectionCard>
        )}
      </div>

      {/* ── Prompt body ── */}
      {prompt.prompt_body && (() => {
        const hasNegative = /negative\s+prompt\s*:/i.test(prompt.prompt_body);
        let positivePrompt = prompt.prompt_body;
        let negativePrompt = "";

        if (hasNegative) {
          const parts = prompt.prompt_body.split(/negative\s+prompt\s*:\s*/i);
          positivePrompt = parts[0]?.trim();
          negativePrompt = parts[1]?.trim();
        }

        return (
          <div className="space-y-4 mb-10">
            <div className="details-card p-5 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-accent/10 border border-accent/25">
                    <Wrench size={16} className="text-accent" />
                  </div>
                  <h2 className="font-bold text-primary text-sm">The Prompt</h2>
                </div>
                <CopyButton text={positivePrompt} />
              </div>
              <pre className="text-muted text-xs leading-relaxed whitespace-pre-wrap font-mono overflow-x-auto bg-black/20 p-4 rounded-xl border border-border max-h-96 overflow-y-auto">
                {positivePrompt}
              </pre>
            </div>

            {negativePrompt && (
              <div className="details-card p-5 md:p-6 border-red-500/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-red-500/10 border border-red-500/25">
                      <span className="text-red-400 text-xs font-bold font-mono">NEG</span>
                    </div>
                    <div>
                      <h2 className="font-bold text-primary text-sm">Negative Prompt</h2>
                      <p className="text-[11px] text-muted">What to avoid / exclude from generation</p>
                    </div>
                  </div>
                  <CopyButton text={negativePrompt} />
                </div>
                <pre className="text-red-300/80 text-xs leading-relaxed whitespace-pre-wrap font-mono overflow-x-auto bg-red-950/20 p-4 rounded-xl border border-red-500/20 max-h-60 overflow-y-auto">
                  {negativePrompt}
                </pre>
              </div>
            )}
          </div>
        );
      })()}

      {/* ── Related prompts ── */}
      {related.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-5">
            <h2 className="text-lg font-bold text-primary">Related Prompts</h2>
            <span className="text-faint text-xs">({related.length})</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map((rp, i) => (
              <PromptCard
                key={rp._id ?? rp.id ?? rp.slug}
                prompt={rp}
                index={i}
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
