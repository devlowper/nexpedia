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
import { Prompt, PromptCard, cardVariants } from "@/components/prompts/PromptCard";
import { useAuth } from "@/hooks/useAuth";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";


function BulletList({ text }: { text: string }) {
  const lines = text
    .split(/\n+/)
    .map((l) => l.trim().replace(/^●\s*/, ""))
    .filter(Boolean);

  return (
    <ul className="space-y-2">
      {lines.map((line, i) => (
        <li key={i} className="flex gap-2 text-muted text-sm leading-relaxed">
          <span className="text-accent mt-0.5 shrink-0">●</span>
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
  accent,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  accent?: string;
}) {
  return (
    <div className="details-card p-5 flex flex-col gap-4">
      <div className="flex items-center gap-2.5">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: accent ?? "rgba(204,255,0,0.12)", border: "1px solid rgba(204,255,0,0.2)" }}
        >
          <Icon size={15} style={{ color: "var(--brand-solid)" }} />
        </div>
        <h2 className="font-semibold text-primary text-sm tracking-wide">{title}</h2>
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
  const { user, toggleSavedPrompt } = useAuth();
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


const TOOL_LOGOS: Record<string, string> = {
  chatgpt: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
  gemini:  "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg",
  claude:  "https://upload.wikimedia.org/wikipedia/commons/1/14/Anthropic_Claude_Logo.png",
  grok:    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Grok_logo.svg/1200px-Grok_logo.svg.png",
};


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

    Promise.all([
      fetch(`${API}/api/prompts/${slug}`).then(r => r.json()),
      fetch(`${API}/api/prompts/${slug}/related`).then(r => r.json()),
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

  const uniqueTools = (() => {
    const seen = new Set<string>();
    return (prompt.recommended_tools ?? []).filter(t => {
      const k = t.recommended_tools_id?.web_name;
      if (!k || seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  })();

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
          <div className="relative w-full h-64 md:h-80 overflow-hidden">
            <Image
              src={imageUrl}
              alt={prompt.page_name}
              fill
              className="object-cover"
              unoptimized
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-elevated)] via-transparent to-transparent" />
          </div>
        )}

        <div className="p-6 md:p-8">
          {/* Badges row */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {prompt.category && (
              <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-accent bg-accent/10 border border-accent/20 px-2.5 py-1 rounded-full">
                <Layers size={9} /> {prompt.category.name}
              </span>
            )}
            {prompt.sub_category && (
              <span className="text-[10px] font-semibold text-muted bg-black/5 dark:bg-white/5 border border-border px-2.5 py-1 rounded-full">
                {prompt.sub_category.name}
              </span>
            )}
            {prompt.is_premium && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-amber-300 bg-amber-400/10 border border-amber-400/30 px-2.5 py-1 rounded-full">
                <Crown size={9} /> PRO
              </span>
            )}
            <span className="flex items-center gap-1 text-[10px] text-faint ml-auto">
              <Eye size={11} />
              {(prompt.views_count ?? 0).toLocaleString()} views
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-primary mb-3 leading-tight">
            {prompt.icon && <span className="mr-2">{prompt.icon}</span>}
            {prompt.page_name}
          </h1>

          {/* Description */}
          <p className="text-muted text-base leading-relaxed mb-6">{prompt.description}</p>

          {/* Tools + CTA */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Recommended tools */}
            {uniqueTools.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-faint">Works with:</span>
                {uniqueTools.map(t => {
                  const logo = TOOL_LOGOS[t.recommended_tools_id.web_name?.toLowerCase()];
                  return (
                    <div
                      key={t.recommended_tools_id.id}
                      title={t.recommended_tools_id.name}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-border text-xs text-muted"
                    >
                      {logo && (
                        <Image src={logo} alt="" width={14} height={14} className="object-contain" unoptimized />
                      )}
                      {t.recommended_tools_id.web_name}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Copy button */}
            {prompt.prompt_body && (
              <div className="ml-auto flex items-center gap-2 sm:gap-3">
                <SaveButton promptId={prompt._id || prompt.id || ''} />
                <ShareButton title={prompt.page_name} />
                <CopyButton text={prompt.prompt_body} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Info sections ── */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        {prompt.what_this_prompt_does && (
          <SectionCard icon={Sparkles} title="What This Prompt Does">
            <BulletList text={prompt.what_this_prompt_does} />
          </SectionCard>
        )}

        {prompt.tips && (
          <SectionCard icon={Lightbulb} title="Tips for This Prompt" accent="rgba(250,204,21,0.12)">
            <BulletList text={prompt.tips} />
          </SectionCard>
        )}

        {prompt.how_to_use_the_prompt && (
          <SectionCard icon={BookOpen} title="How to Use the Prompt" accent="rgba(96,165,250,0.12)">
            <BulletList text={prompt.how_to_use_the_prompt} />
          </SectionCard>
        )}
      </div>

      {/* ── Prompt body ── */}
      {prompt.prompt_body && (
        <div className="details-card p-5 mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-accent/10 border border-accent/20">
                <Wrench size={15} className="text-accent" />
              </div>
              <h2 className="font-semibold text-primary text-sm">The Prompt</h2>
            </div>
            <CopyButton text={prompt.prompt_body} />
          </div>
          <pre className="text-muted text-xs leading-relaxed whitespace-pre-wrap font-mono overflow-x-auto bg-black/20 p-4 rounded-lg border border-border max-h-96 overflow-y-auto">
            {prompt.prompt_body}
          </pre>
        </div>
      )}

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
