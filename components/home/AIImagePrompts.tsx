"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { DesignPromptCard } from '../prompts/DesignPromptCard';
import { Prompt } from '../prompts/PromptCard';
import { SkeletonCard } from '../ui/SkeletonCard';

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export function AIImagePrompts() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch some design/image prompts to show in the masonry grid
    const fetchPrompts = async () => {
      try {
        const res = await fetch(`${API}/api/prompts?category=Design&limit=14`);
        const json = await res.json();
        if (json.success) {
          setPrompts(json.data);
        }
      } catch (err) {
        console.error("Failed to load AI Image Prompts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrompts();
  }, []);

  return (
    <section className="w-full bg-base py-20 px-4 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col items-center">

        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className="section-title font-bricolage text-4xl font-bold text-primary mb-3"
            style={{ fontFamily: '"Bricolage Grotesque", var(--font-bricolage), sans-serif' }}
          >
            AI Image Prompts
          </h2>
          <p className="text-black/60 dark:text-white/60 text-sm max-w-xl mx-auto italic">
            Get inspired and discover amazing AI image prompts. One-click copy to start creating.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="w-full min-h-[40vh] mb-12">
          {loading ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="break-inside-avoid mb-4">
                  <SkeletonCard />
                </div>
              ))}
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
              {prompts.map((prompt, i) => (
                <div key={prompt._id ?? prompt.slug} className="break-inside-avoid">
                  <DesignPromptCard prompt={prompt} index={i} masonry={true} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* View More CTA */}
        <Link
          href="/prompt-library/explore?category=Design"
          className="inline-flex items-center gap-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:bg-white/10 transition-colors text-primary text-xs font-bold px-6 py-3 rounded-full"
        >
          View More Inspirations &rarr;
        </Link>
      </div>
    </section>
  );
}
