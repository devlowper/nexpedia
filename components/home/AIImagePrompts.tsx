"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { DesignPromptCard } from '../prompts/DesignPromptCard';
import { Prompt } from '../prompts/PromptCard';
import { SkeletonCard } from '../ui/SkeletonCard';
import { getApiBaseUrl } from '@/lib/apiClient';

export function AIImagePrompts() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch some design/image prompts to show in the masonry grid
    const fetchPrompts = async () => {
      try {
        const baseUrl = getApiBaseUrl();
        const res = await fetch(`${baseUrl}/api/prompts?category=Design&limit=14`);
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
    <section className="w-full bg-base py-20 px-4 border-t border-border cv-auto">
      <div className="max-w-7xl mx-auto flex flex-col items-center">

        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className="section-title font-bricolage text-4xl font-bold text-primary mb-3"
            style={{ fontFamily: '"Bricolage Grotesque", var(--font-bricolage), sans-serif' }}
          >
            Trendy AI Image Prompts & Img to Prompt
          </h2>
          <p className="text-black/60 dark:text-white/60 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
            Explore the latest trending AI image prompts, viral photo editing styles, and creative AI art ideas. Discover ready-to-use prompts for ChatGPT, Gemini, Midjourney, Nano Banana, and FLUX. Copy your favorite prompts instantly or use Image to Prompt to transform any reference image into detailed, powerful AI prompts. Get inspired and create stunning AI-generated visuals with ProCraft.
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
