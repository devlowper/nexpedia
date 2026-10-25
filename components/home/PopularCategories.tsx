"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { getApiBaseUrl } from "@/lib/apiClient";

export interface CategoryPrompt {
  _id?: string;
  id?: string;
  slug?: string;
  page_name?: string;
  title?: string;
  imageUrl?: string | null;
  example_output_image_url?: string | null;
  example_output_image?: string | null;
  category?: { name: string; slug: string } | string;
}

interface CategoryDefinition {
  id: string;
  name: string;
  categoryKeys: string[];
  subtitle: string;
  href: string;
  fallbackCount: string;
  fallbackImages: string[];
}

const CATEGORY_DEFINITIONS: CategoryDefinition[] = [
  // 1. Video
  {
    id: "video",
    name: "Video",
    categoryKeys: ["Video", "video"],
    subtitle: "Cinematic Motion & Sora Prompts",
    href: "/prompt-library/explore?category=Video",
    fallbackCount: "480+",
    fallbackImages: [
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop",
    ],
  },

  // 2. Website & App (Coding)
  {
    id: "coding",
    name: "Website & App",
    categoryKeys: ["Coding", "coding", "Website & App", "Website & App (Coding)"],
    subtitle: "Modern UI/UX & Web Dev Prompts",
    href: "/prompt-library/explore?category=Coding",
    fallbackCount: "620+",
    fallbackImages: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop",
    ],
  },

  // 3. Mockup Prompt
  {
    id: "mockup",
    name: "Mockup Prompt",
    categoryKeys: ["Mockup Prompt", "mockup prompt", "Mockup", "mockup"],
    subtitle: "Minimalist Packaging & Print Design",
    href: "/prompt-library/explore?category=Mockup+Prompt",
    fallbackCount: "540+",
    fallbackImages: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&auto=format&fit=crop",
    ],
  },

  // 4. Photography
  {
    id: "photography",
    name: "Photography",
    categoryKeys: ["Photography", "photography"],
    subtitle: "Studio Lighting & Editorial Portraits",
    href: "/prompt-library/explore?category=Photography",
    fallbackCount: "890+",
    fallbackImages: [
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop",
    ],
  },

  // 5. Viral Prompt
  {
    id: "viral",
    name: "Viral Prompt",
    categoryKeys: ["Viral Prompt", "viral prompt", "Viral"],
    subtitle: "High-Engagement Visuals & Aesthetics",
    href: "/prompt-library/explore?category=Viral+Prompt",
    fallbackCount: "710+",
    fallbackImages: [
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563089145-599997674d42?w=400&auto=format&fit=crop",
    ],
  },

  // 6. Logos & Icons
  {
    id: "logos-icons",
    name: "Logos & Icons",
    categoryKeys: ["Logos & Icons", "logos & icons", "Logos", "Vector Design"],
    subtitle: "Scalable Vector Badges & Emblems",
    href: "/prompt-library/explore?category=Logos+%26+Icons",
    fallbackCount: "630+",
    fallbackImages: [
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542744094-24638eff58bb?w=400&auto=format&fit=crop",
    ],
  },

  // 7. Marketing & Business
  {
    id: "marketing-business",
    name: "Marketing & Business",
    categoryKeys: ["Marketing", "marketing", "Business", "business"],
    subtitle: "Campaign Strategy & Growth Graphics",
    href: "/prompt-library/explore?category=Marketing",
    fallbackCount: "750+",
    fallbackImages: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&auto=format&fit=crop",
    ],
  },

  // 8. Master Prompt
  {
    id: "master-prompt",
    name: "Master Prompt",
    categoryKeys: ["Master Prompt", "master prompt", "Design"],
    subtitle: "Detailed Mega-Prompts & Classic Art",
    href: "/prompt-library/explore?category=Master+Prompt",
    fallbackCount: "390+",
    fallbackImages: [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop",
    ],
  },
];

// Helper to get image from a prompt object
function getPromptImage(p?: CategoryPrompt): string | null {
  if (!p) return null;
  return p.imageUrl || p.example_output_image_url || p.example_output_image || null;
}

// Fail-safe image component that never displays broken icons
function SafeImage({
  src,
  alt,
  fallbackSrc,
  className = "",
}: {
  src: string;
  alt: string;
  fallbackSrc: string;
  className?: string;
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    } else {
      setHasError(true);
    }
  };

  if (hasError) {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-900 ${className}`}>
        <span className="text-[10px] text-white/40 font-medium px-2 text-center">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      className={className}
      loading="lazy"
    />
  );
}

export function PopularCategories({
  embedded = false,
  className = "",
  groupedPrompts: initialGrouped,
}: {
  embedded?: boolean;
  className?: string;
  groupedPrompts?: Record<string, CategoryPrompt[]>;
}) {
  const [grouped, setGrouped] = useState<Record<string, CategoryPrompt[]>>(initialGrouped || {});

  // If groupedPrompts not passed in, fetch dynamically so cards use real prompts from library
  useEffect(() => {
    if (initialGrouped && Object.keys(initialGrouped).length > 0) {
      setGrouped(initialGrouped);
      return;
    }

    let isMounted = true;
    fetch(`${getApiBaseUrl()}/api/prompts/grouped`)
      .then(res => res.json())
      .then(json => {
        if (isMounted && json.success && json.data) {
          setGrouped(json.data);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [initialGrouped]);

  return (
    <section
      className={`w-full transition-colors ${
        embedded
          ? "py-8 sm:py-12 bg-transparent"
          : "bg-base py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-border"
      } ${className}`}
    >
      <div className={embedded ? "w-full" : "max-w-7xl mx-auto"}>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore Categories</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-primary font-bricolage"
              style={{ fontFamily: '"Bricolage Grotesque", var(--font-bricolage), sans-serif' }}
            >
              Popular Categories
            </h2>
            <p className="text-muted text-sm sm:text-base max-w-xl mt-1.5">
              Curated prompt collections tailored for Midjourney, FLUX, ChatGPT, and modern creative workflows.
            </p>
          </div>

          <Link
            href="/prompt-library/explore"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary hover:text-accent transition-colors group self-start sm:self-auto shrink-0"
          >
            <span>Browse All Categories</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* 8 Category Cards Grid (4 columns x 2 rows) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {CATEGORY_DEFINITIONS.map((cat) => {
            // Find prompts for this category from the database
            let matchingPrompts: CategoryPrompt[] = [];
            for (const key of cat.categoryKeys) {
              if (grouped[key] && grouped[key].length > 0) {
                matchingPrompts = grouped[key];
                break;
              }
            }

            // Extract images: take uploaded prompt images if available, otherwise use verified fallback
            const realImages = matchingPrompts
              .map(getPromptImage)
              .filter((url): url is string => Boolean(url));

            const img0 = realImages[0] || cat.fallbackImages[0];
            const img1 = realImages[1] || cat.fallbackImages[1];
            const img2 = realImages[2] || cat.fallbackImages[2];

            // Display live count if prompts exist, otherwise fallbackCount
            const countLabel =
              matchingPrompts.length > 0
                ? `${matchingPrompts.length} Prompt${matchingPrompts.length > 1 ? "s" : ""}`
                : cat.fallbackCount;

            return (
              <Link
                key={cat.id}
                href={cat.href}
                className="group relative flex flex-col justify-between rounded-2xl bg-surface border border-border hover:border-accent/40 transition-all duration-300 overflow-hidden shadow-xs hover:shadow-xl hover:shadow-accent/5 cursor-pointer"
              >
                {/* Top Card Deck / Visual Fan Area */}
                <div className="relative h-44 sm:h-48 w-full flex items-center justify-center overflow-hidden pt-5 px-3 select-none bg-black/[0.02] dark:bg-white/[0.02]">
                  {/* Subtle ambient fade at bottom of deck */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface via-surface/60 to-transparent pointer-events-none z-20" />

                  {/* 3-card elegant fan */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Left Card */}
                    <div className="absolute w-24 sm:w-26 h-32 sm:h-34 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 shadow-md transform -translate-x-8 sm:-translate-x-10 -rotate-8 scale-90 opacity-80 group-hover:-rotate-12 group-hover:-translate-x-12 group-hover:opacity-95 transition-all duration-300 ease-out z-10 bg-base">
                      <SafeImage
                        src={img0}
                        alt={`${cat.name} preview 1`}
                        fallbackSrc={cat.fallbackImages[0]}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Right Card */}
                    <div className="absolute w-24 sm:w-26 h-32 sm:h-34 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 shadow-md transform translate-x-8 sm:translate-x-10 rotate-8 scale-90 opacity-80 group-hover:rotate-12 group-hover:translate-x-12 group-hover:opacity-95 transition-all duration-300 ease-out z-10 bg-base">
                      <SafeImage
                        src={img2}
                        alt={`${cat.name} preview 3`}
                        fallbackSrc={cat.fallbackImages[2]}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Center Hero Card */}
                    <div className="absolute w-28 sm:w-30 h-34 sm:h-36 rounded-xl overflow-hidden border border-black/15 dark:border-white/20 shadow-xl transform rotate-0 scale-100 group-hover:-translate-y-2 group-hover:scale-105 group-hover:shadow-2xl transition-all duration-300 ease-out z-20 bg-base">
                      <SafeImage
                        src={img1}
                        alt={`${cat.name} main preview`}
                        fallbackSrc={cat.fallbackImages[1]}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Top Badge (Live prompt count or curated count) */}
                  <div className="absolute top-2.5 right-2.5 z-30">
                    <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-black/40 dark:bg-black/60 backdrop-blur-md text-white/90 border border-white/15">
                      {countLabel}
                    </span>
                  </div>
                </div>

                {/* Card Footer Bar */}
                <div className="relative z-20 p-4 sm:p-5 flex items-center justify-between border-t border-border bg-surface transition-colors">
                  <div className="min-w-0 pr-2">
                    <h3 className="font-bold text-sm sm:text-base text-primary group-hover:text-accent transition-colors truncate font-bricolage">
                      {cat.name}
                    </h3>
                    <p className="text-muted text-xs truncate mt-0.5">
                      {cat.subtitle}
                    </p>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 border border-border flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-white transition-colors" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
