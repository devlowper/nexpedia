'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FAQItem {
  id: string;
  prefix: string;
  question: string;
  answer: React.ReactNode;
  plainAnswer: string;
}

const HOME_OVERALL_FAQS: FAQItem[] = [
  {
    id: 'home-q1',
    prefix: 'Q1',
    question: 'What is ProCraft AI and what makes it the premier platform for AI creators?',
    plainAnswer:
      'ProCraft AI is an all-in-one generative ecosystem created for digital artists, designers, prompt engineers, and marketers. The platform brings together a massive AI prompts collection with thousands of verified free AI prompts alongside an authoritative free AI tools directory tracking 500+ apps. Whether you need production-ready ProCraft prompts for Midjourney and FLUX or reverse-engineered recipes via our vision studio, ProCraft streamlines creative workflows in seconds.',
    answer: (
      <span>
        <strong>ProCraft AI</strong> is an all-in-one generative ecosystem created for digital artists, designers, prompt engineers, and marketers. The platform brings together a massive <strong>AI prompts collection</strong> featuring thousands of verified <strong>free AI prompts</strong> alongside an authoritative{' '}
        <Link href="/ai-directory" className="text-accent font-semibold hover:underline">
          free AI tools directory
        </Link>{' '}
        tracking 500+ apps. Whether you need production-ready <strong>ProCraft prompts</strong> for Midjourney, FLUX, and ChatGPT or reverse-engineered vision recipes, ProCraft empowers creators to build without boundaries.
      </span>
    ),
  },
  {
    id: 'home-q2',
    prefix: 'Q2',
    question: 'Where can I find free AI prompts and copy and paste AI prompts ready for production?',
    plainAnswer:
      'You can browse our curated AI prompts collection inside the ProCraft Prompt Library. We feature thousands of tested copy and paste AI prompts organized by style, camera optics, 3D character art, and model compatibility. Every entry includes tested parameters (--ar aspect ratios, --stylize values, negative prompts) that you can copy with a single click and paste directly into Midjourney, FLUX, or ChatGPT.',
    answer: (
      <div className="space-y-3">
        <p>
          You can browse our curated <strong>AI prompts collection</strong> directly inside our platform. We feature thousands of tested <strong>copy and paste AI prompts</strong> organized by artistic style, camera optics, 3D character art, and model compatibility. Every entry includes tested parameters (<code className="text-xs bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded font-mono">--ar</code> aspect ratios, stylize values, negative prompts) that you can copy with a single tap.
        </p>
        <Link
          href="/prompt-library"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-accent-hover transition-colors group"
        >
          <span>Explore our Free AI Prompts Library</span>
          <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    ),
  },
  {
    id: 'home-q3',
    prefix: 'Q3',
    question: 'How does the free AI tools directory help me find and compare creative software?',
    plainAnswer:
      'Our free AI tools directory tracks over 500+ verified artificial intelligence applications spanning text-to-image generators, video synthesis suites, coding assistants, audio workstations, and productivity utilities. You can filter by pricing (Free, Freemium, Paid), compare user reviews, and discover unblocked free AI websites to assemble the optimal creative stack.',
    answer: (
      <div className="space-y-3">
        <p>
          Our <strong>free AI tools directory</strong> tracks over 500+ verified artificial intelligence applications spanning text-to-image generators, video synthesis suites, coding assistants, audio workstations, and productivity utilities. You can filter by pricing tiers (Free, Freemium, Paid), inspect feature breakdowns, and discover verified <strong>free AI websites</strong> to assemble your ideal generative stack.
        </p>
        <Link
          href="/ai-directory"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-accent-hover transition-colors group"
        >
          <span>Browse the Free AI Tools Directory</span>
          <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    ),
  },
  {
    id: 'home-q4',
    prefix: 'Q4',
    question: 'How does the Image to Prompt (Img to Prompt) vision studio work on ProCraft AI?',
    plainAnswer:
      'Our intelligent Image to Prompt converter analyzes any uploaded graphic, photo, or 3D render to deconstruct lighting, shaders, camera angles, color grading, and artistic styles. It generates production-grade text-to-image prompts optimized for FLUX, Midjourney, and Stable Diffusion so you can replicate and evolve existing aesthetics effortlessly.',
    answer: (
      <div className="space-y-3">
        <p>
          Our intelligent <strong>Image to Prompt</strong> vision studio analyzes any uploaded graphic, photo, or 3D render to deconstruct lighting, shaders, focal lengths, color grading, and artistic movements. It generates production-grade text-to-image prompt recipes tailored for FLUX, Midjourney, and Stable Diffusion so you can reverse-engineer any visual aesthetic.
        </p>
        <Link
          href="/image-to-prompt"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-accent-hover transition-colors group"
        >
          <span>Try Image to Prompt Vision Studio</span>
          <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    ),
  },
  {
    id: 'home-q5',
    prefix: 'Q5',
    question: 'Can I use copy and paste AI prompts from ProCraft for commercial projects?',
    plainAnswer:
      'Yes, 100%! All copy and paste AI prompts provided across ProCraft AI are completely free to use, modify, and integrate into client deliverables, commercial campaigns, video productions, and personal artworks without licensing fees, paywalls, or attribution requirements.',
    answer: (
      <span>
        Yes, 100%! All <strong>copy and paste AI prompts</strong> provided across <strong>ProCraft AI</strong> are completely free to copy, modify, and integrate into client deliverables, commercial campaigns, video productions, and personal artworks without licensing fees, paywalls, or attribution requirements.
      </span>
    ),
  },
  {
    id: 'home-q6',
    prefix: 'Q6',
    question: 'How often are new ProCraft prompts and verified AI tools added to the platform?',
    plainAnswer:
      'We monitor the generative AI frontier continuously and update our platform daily. Our team rigorously tests new frontier models (like FLUX.1, Midjourney v6.1, Claude 3.7, and Sora), adding trending prompt recipes and newly launched tools to our AI prompts collection and free AI tools directory every week.',
    answer: (
      <span>
        We monitor the generative AI landscape continuously and update our platform daily. Our team rigorously tests new frontier models (like FLUX.1, Midjourney v6.1, Claude 3.7, and Sora), adding trending <strong>ProCraft prompts</strong> and newly launched platforms to our <strong>AI prompts collection</strong> and <strong>free AI tools directory</strong> every week.
      </span>
    ),
  },
];

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>('home-q1');

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HOME_OVERALL_FAQS.map((faq) => ({
      '@type': 'Question',
      name: `${faq.prefix} ${faq.question}`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.plainAnswer,
      },
    })),
  };

  return (
    <section className="w-full bg-[#FCFCFC] dark:bg-[#0A0A0A] py-16 px-4 md:px-8 border-t border-black/5 dark:border-white/5 transition-colors relative overflow-hidden">
      {/* ── FAQPage Structured Data (Homepage Overall) ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Decorative ambient background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <HelpCircle size={14} />
            <span>Knowledge Base & Support</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight font-bricolage mb-3">
            Frequently Asked Questions About{' '}
            <span className="bg-gradient-to-r from-accent via-pink-400 to-rose-400 bg-clip-text text-transparent">
              ProCraft
            </span>
          </h2>
          <p className="faq-subtitle text-neutral-600 dark:text-neutral-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our verified free AI prompts, generative creator workflows, and authoritative AI tools directory.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {HOME_OVERALL_FAQS.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${isOpen
                    ? 'border-accent/40 bg-white dark:bg-[#131418] shadow-md ring-1 ring-accent/20'
                    : 'border-black/10 dark:border-white/10 bg-white dark:bg-[#111215] hover:border-black/20 dark:hover:border-white/20'
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
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${isOpen
                        ? 'bg-accent text-white border-accent rotate-180 shadow-sm'
                        : 'bg-black/[0.04] dark:bg-white/[0.06] text-black/60 dark:text-neutral-400 border-black/5 dark:border-white/10'
                      }`}
                  >
                    <ChevronDown size={17} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
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
