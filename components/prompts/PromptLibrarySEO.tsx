'use client';

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Camera,
  Palette,
  CheckCircle2,
  ChevronDown,
  HelpCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function PromptLibrarySEOIntro() {
  return (
    <section className="relative w-full my-12 rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 bg-white dark:bg-[#111215] p-6 sm:p-8 md:p-12 shadow-sm">
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-bold uppercase tracking-wider mb-5 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Creator Database</span>
        </div>

        {/* Headline */}
        <h2 className="font-bricolage text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary dark:text-white tracking-tight leading-tight mb-5">
          The Definitive <span className="bg-gradient-to-r from-accent via-pink-400 to-rose-400 bg-clip-text text-transparent">Free Prompt Library</span> for High-End AI Workflows
        </h2>

        {/* Exact Core SEO Paragraph */}
        <p className="prompt-seo-intro-desc text-neutral-800 dark:text-neutral-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mb-8 font-normal">
          Welcome to ProCraft&apos;s <strong className="text-neutral-900 dark:text-white font-semibold">free prompt library</strong>, the definitive <strong className="text-neutral-900 dark:text-white font-semibold">online prompt library</strong> created for digital artists, designers, and creators worldwide. Our comprehensive <strong className="text-neutral-900 dark:text-white font-semibold">AI prompt database</strong> gives you instant access to thousands of verified <strong className="text-neutral-900 dark:text-white font-semibold">ready made AI prompts</strong> optimized for Midjourney, FLUX, ChatGPT, and Stable Diffusion. Whether you are exploring our curated <strong className="text-neutral-900 dark:text-white font-semibold">AI art prompt library</strong>, finding studio shots in our <strong className="text-neutral-900 dark:text-white font-semibold">photography prompt library</strong>, or discovering our <strong className="text-neutral-900 dark:text-white font-semibold">image generation prompt library</strong>, copy battle-tested prompt recipes with a single click and create without limits.
        </p>

        {/* Feature Highlights Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl pt-6 border-t border-black/5 dark:border-white/10">
          <div className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/10 text-xs font-semibold text-neutral-800 dark:text-white/90">
            <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-none" />
            <span>1-Click Copy Ready</span>
          </div>
          <div className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/10 text-xs font-semibold text-neutral-800 dark:text-white/90">
            <Sparkles className="w-3.5 h-3.5 text-accent flex-none" />
            <span>FLUX & Midjourney</span>
          </div>
          <div className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/10 text-xs font-semibold text-neutral-800 dark:text-white/90">
            <Camera className="w-3.5 h-3.5 text-accent flex-none" />
            <span>Studio Lighting</span>
          </div>
          <div className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/10 text-xs font-semibold text-neutral-800 dark:text-white/90">
            <Palette className="w-3.5 h-3.5 text-accent flex-none" />
            <span>100% Free Forever</span>
          </div>
        </div>
      </div>
    </section>
  );
}

interface PromptFAQItem {
  id: string;
  prefix: string;
  question: string;
  answer: React.ReactNode;
  plainAnswer: string;
}

const PROMPT_FAQS: PromptFAQItem[] = [
  {
    id: "pl-q1",
    prefix: "Q1",
    question: "What makes ProCraft the premier free prompt library and online prompt library?",
    plainAnswer:
      "ProCraft is built as an open, high-performance free prompt library and online prompt library created for digital artists, designers, and creators. Our AI prompt database is continuously updated with verified, ready made AI prompts engineered for Midjourney, FLUX, ChatGPT, and Stable Diffusion, complete with optimal aspect ratios, lighting parameters, and negative prompts.",
    answer: (
      <span>
        ProCraft is built as an open, high-performance <strong>free prompt library</strong> and <strong>online prompt library</strong> created for digital artists, designers, and creators worldwide. Our comprehensive <strong>AI prompt database</strong> is continuously updated with verified, <strong>ready made AI prompts</strong> engineered for Midjourney, FLUX, ChatGPT, and Stable Diffusion, complete with optimal aspect ratios, lighting parameters, and negative prompts.
      </span>
    ),
  },
  {
    id: "pl-q2",
    prefix: "Q2",
    question: "What photography styles are featured in the photography prompt library?",
    plainAnswer:
      "Our photography prompt library covers an extensive range of specialized aesthetics, including realistic AI photography prompts (natural skin texture, raw camera aesthetics, golden hour tones), best cinematic portrait AI prompts (volumetric smoke, rim lighting, 35mm anamorphic lens depth), and black and white portrait AI prompts (high-contrast monochrome, dramatic shadow sculpting, classic film grain). You can also discover haute couture editorial aesthetics in our AI fashion photography prompts.",
    answer: (
      <span>
        Our <strong>photography prompt library</strong> covers an extensive range of specialized aesthetics, including <strong>realistic AI photography prompts</strong> (natural skin texture, raw camera aesthetics, golden hour tones), <strong>best cinematic portrait AI prompts</strong> (volumetric smoke, rim lighting, 35mm anamorphic lens depth), and <strong>black and white portrait AI prompts</strong> (high-contrast monochrome, dramatic shadow sculpting, classic film grain). You can also discover haute couture editorial aesthetics in our <strong>AI fashion photography prompts</strong>.
      </span>
    ),
  },
  {
    id: "pl-q3",
    prefix: "Q3",
    question: "How do I explore 3D character design and social avatars in the AI art prompt library?",
    plainAnswer:
      "Inside our AI art prompt library, creators can access ready made AI prompts such as 3D cartoon character AI prompts (Pixar and Disney-inspired clay shaders, expressive poses, studio lighting) and creative profile picture AI prompts (eye-catching social avatars, vibrant neon aesthetics, stylized vector framing). You can also pair these prompts with reverse-engineered concepts from our Image to Prompt converter to deconstruct any visual artwork.",
    answer: (
      <span>
        Inside our <strong>AI art prompt library</strong>, creators can access ready-made styles such as <strong>3D cartoon character AI prompts</strong> (Pixar and Disney-inspired clay shaders, expressive poses, studio render) and <strong>creative profile picture AI prompts</strong> (eye-catching social avatars, vibrant neon aesthetics, stylized vector framing). You can also pair these prompts with reverse-engineered concepts from our{" "}
        <Link href="/image-to-prompt" className="text-accent hover:underline font-semibold">
          Image to Prompt converter
        </Link>{" "}
        to deconstruct and recreate any visual artwork.
      </span>
    ),
  },
  {
    id: "pl-q4",
    prefix: "Q4",
    question: "How does the image generation prompt library deliver ultra-realistic portraits?",
    plainAnswer:
      "Every entry in our image generation prompt library comes pre-tested with camera focal lengths, shader instructions, and negative prompts to produce ultra realistic AI portrait prompts with 8K micro-details and authentic catchlights. To explore compatible AI models, diffusion engines, or generators for running these prompt recipes, visit our Free AI Tools Directory.",
    answer: (
      <span>
        Every entry in our <strong>image generation prompt library</strong> comes pre-tested with camera focal lengths, shader instructions, and negative prompts to produce <strong>ultra realistic AI portrait prompts</strong> with 8K micro-details and authentic catchlights. To explore compatible AI models, diffusion engines, or generators for running these prompt recipes, visit our{" "}
        <Link href="/ai-directory" className="text-accent hover:underline font-semibold">
          Free AI Tools Directory
        </Link>
        .
      </span>
    ),
  },
  {
    id: "pl-q5",
    prefix: "Q5",
    question: "Are all ready made AI prompts in this AI prompt database free for commercial use?",
    plainAnswer:
      "Yes! Every single prompt across our free prompt library and online prompt library is 100% free to copy, customize, and integrate into personal artworks, client commissions, and commercial production pipelines without licensing fees or attribution required.",
    answer: (
      <span>
        Yes, 100%! Every single prompt across our <strong>free prompt library</strong> and <strong>online prompt library</strong> is completely free to copy, customize, and integrate into personal artworks, client commissions, and commercial production pipelines without licensing fees or attribution required.
      </span>
    ),
  },
  {
    id: "pl-q6",
    prefix: "Q6",
    question: "How do I copy and execute prompts with Midjourney, FLUX, and ChatGPT?",
    plainAnswer:
      "Each prompt card in our online prompt library features a fast one-click copy button. Simply click 'Copy Prompt' to load the full recipe directly into your clipboard, or click into the prompt details to view aspect ratios, seed numbers, and model tags before running them in your generative tool of choice.",
    answer: (
      <span>
        Each prompt card in our <strong>online prompt library</strong> features a fast one-click copy button. Simply click <em>&quot;Copy Prompt&quot;</em> to load the full recipe directly into your clipboard, or click into the prompt details to view aspect ratios, seed numbers, and model tags before running them in your generative tool of choice.
      </span>
    ),
  },
];

export function PromptLibrarySEOExtended() {
  const [openId, setOpenId] = useState<string | null>("pl-q1");

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PROMPT_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.plainAnswer,
      },
    })),
  };

  return (
    <section className="w-full mt-16 pt-16 border-t border-black/5 dark:border-white/5 relative overflow-hidden">
      {/* ── FAQPage Structured Data (Prompt Library) ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Decorative ambient background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header Section matching Homepage FAQ */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <HelpCircle size={14} />
            <span>Knowledge Base & Support</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight font-bricolage mb-3">
            Frequently Asked Questions About{" "}
            <span className="bg-gradient-to-r from-accent via-pink-400 to-rose-400 bg-clip-text text-transparent">
              Our Free Prompt Library
            </span>
          </h2>
          <p className="faq-subtitle text-neutral-600 dark:text-neutral-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about navigating our free prompt library, copying ready made AI prompts, and exploring specialized photography and 3D art styles.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {PROMPT_FAQS.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-accent/40 bg-white dark:bg-[#131418] shadow-md ring-1 ring-accent/20"
                    : "border-black/10 dark:border-white/10 bg-white dark:bg-[#111215] hover:border-black/20 dark:hover:border-white/20"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-2.5 sm:gap-3 flex-1">
                    <span className="faq-prefix font-extrabold text-accent text-base sm:text-lg font-bricolage shrink-0">
                      {faq.prefix}
                    </span>
                    <h3 className="font-bold text-neutral-900 dark:text-white text-base sm:text-lg leading-snug font-bricolage">
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                      isOpen
                        ? "bg-accent text-white border-accent rotate-180 shadow-sm"
                        : "bg-black/[0.04] dark:bg-white/[0.06] text-black/60 dark:text-neutral-400 border-black/5 dark:border-white/10"
                    }`}
                  >
                    <ChevronDown size={17} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="faq-answer px-5 sm:px-6 pb-6 pt-2 text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed border-t border-black/10 dark:border-white/10 pl-11 sm:pl-12 font-normal">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
