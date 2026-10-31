'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ArrowRight, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface AIDirectoryFAQItem {
  id: string;
  prefix: string;
  question: string;
  answer: React.ReactNode;
  plainAnswer: string;
}

const AI_DIRECTORY_FAQS: AIDirectoryFAQItem[] = [
  {
    id: 'aid-q1',
    prefix: 'Q1',
    question: "What is ProCraft's free AI tools directory and who is it for?",
    plainAnswer:
      "Welcome to ProCraft's free AI tools directory, your premier hub to compare and find the best free AI tools on the web. Our verified AI tools list spans text-to-image generators, video editors, coding assistants, and productivity software so you can effortlessly discover AI tools for any project. Whether you are searching for dependable free AI websites, specialized AI tools for creators, or hand-picked useful AI websites, our directory provides detailed pricing, ratings, and free AI resources to boost your workflow.",
    answer: (
      <span>
        Welcome to ProCraft&apos;s <strong>free AI tools directory</strong>, your premier hub to compare and find the <strong>best free AI tools</strong> on the web. Our verified <strong>AI tools list</strong> spans text-to-image generators, video editors, coding assistants, and productivity software so you can effortlessly <strong>discover AI tools</strong> for any project. Whether you are searching for dependable <strong>free AI websites</strong>, specialized <strong>AI tools for creators</strong>, or hand-picked <strong>useful AI websites</strong>, our directory provides detailed pricing, ratings, and <strong>free AI resources</strong> to boost your workflow.
      </span>
    ),
  },
  {
    id: 'aid-q2',
    prefix: 'Q2',
    question: 'How can creators discover AI tools across video, image, audio, and automation?',
    plainAnswer:
      'Navigate the rapidly evolving generative landscape with our curated directory. Our free AI tools directory aggregates the best free AI tools, open-source models, and SaaS platforms. Compare features, pricing, and pros and cons to select the optimal AI tools for creators and digital businesses. Pair these tools with our Free Prompt Library to maximize your creative output.',
    answer: (
      <div className="space-y-3">
        <p>
          Navigate the rapidly evolving generative landscape with our curated directory. Our <strong>free AI tools directory</strong> aggregates the <strong>best free AI tools</strong>, open-source models, and SaaS platforms. Compare features, pricing, and pros and cons to select the optimal <strong>AI tools for creators</strong> and digital businesses.
        </p>
        <Link
          href="/prompt-library"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-accent-hover transition-colors group"
        >
          <span>Pair with our Free Prompt Library</span>
          <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    ),
  },
  {
    id: 'aid-q3',
    prefix: 'Q3',
    question: 'Where can I find comprehensive useful AI websites and free AI resources?',
    plainAnswer:
      'Looking for unblocked free AI websites or hidden gem utilities? Our AI tools list highlights tested useful AI websites offering generous free tiers, browser extensions, and developer APIs to ensure you always have access to top-grade free AI resources. You can also extract and reverse-engineer prompts using our Image to Prompt converter.',
    answer: (
      <div className="space-y-3">
        <p>
          Looking for unblocked <strong>free AI websites</strong> or hidden gem utilities? Our <strong>AI tools list</strong> highlights tested <strong>useful AI websites</strong> offering generous free tiers, browser extensions, and developer APIs to ensure you always have access to top-grade <strong>free AI resources</strong>.
        </p>
        <Link
          href="/image-to-prompt"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-accent-hover transition-colors group"
        >
          <span>Extract prompts with Image to Prompt</span>
          <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    ),
  },
  {
    id: 'aid-q4',
    prefix: 'Q4',
    question: 'How often is this AI tools list updated with new software?',
    plainAnswer:
      'We update our AI tools list weekly with newly launched platforms, model upgrades, and free AI resources across generative video, image synthesis, text generation, and automation.',
    answer: (
      <span>
        We continuously track the artificial intelligence ecosystem and update our <strong>AI tools list</strong> weekly with newly launched platforms, frontier model upgrades, and <strong>free AI resources</strong> across generative video, image synthesis, text generation, and developer automation.
      </span>
    ),
  },
  {
    id: 'aid-q5',
    prefix: 'Q5',
    question: 'Which AI tools for creators are completely free to use?',
    plainAnswer:
      "You can easily filter our directory by selecting the 'Free' pricing filter to discover AI tools that offer full free tiers or generous daily credits, including open-source models and web utilities.",
    answer: (
      <span>
        You can easily filter our directory by selecting the <em>&quot;Free&quot;</em> pricing filter to discover <strong>AI tools for creators</strong> that offer full free tiers or generous daily credits, including open-source models, <strong>free AI websites</strong>, and web utilities without requiring upfront subscriptions or credit cards.
      </span>
    ),
  },
  {
    id: 'aid-q6',
    prefix: 'Q6',
    question: 'How do I submit useful AI websites or tools to the directory?',
    plainAnswer:
      'Creators and developers can submit their tools for verification through our submission portal to be featured on our curated AI tools list.',
    answer: (
      <span>
        Creators and developers can submit their tools for verification through our submission portal to be featured on our curated <strong>AI tools list</strong> and reach thousands of digital creators searching for verified <strong>useful AI websites</strong>.
      </span>
    ),
  },
];

export function AIDirectoryFAQ() {
  const [openId, setOpenId] = useState<string | null>('aid-q1');

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: AI_DIRECTORY_FAQS.map((faq) => ({
      '@type': 'Question',
      name: `${faq.prefix} ${faq.question}`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.plainAnswer,
      },
    })),
  };

  return (
    <section className="w-full mt-16 pt-12 border-t border-black/5 dark:border-white/5 relative z-10">
      {/* ── FAQPage Structured Data (AI Directory) ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4">
        {/* ── Header Section matching Screenshot Design ── */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <HelpCircle size={14} />
            <span>Knowledge Base & Support</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight font-bricolage mb-3">
            Frequently Asked Questions About{' '}
            <span className="bg-gradient-to-r from-accent via-pink-400 to-rose-400 bg-clip-text text-transparent">
              Our Free AI Tools directory.
            </span>
          </h2>
          <p className="faq-subtitle text-neutral-600 dark:text-neutral-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Explore our verified AI tools list to compare pricing tiers, discover top-rated creator utilities, and find the best free AI websites for your workflow.
          </p>
        </div>

        {/* ── FAQ Accordion Rows ── */}
        <div className="space-y-3.5">
          {AI_DIRECTORY_FAQS.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
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
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                      isOpen
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

// Keep aliases for backwards-compatibility
export function AIDirectorySEOIntro() {
  return null;
}

export function AIDirectorySEOExtended() {
  return <AIDirectoryFAQ />;
}
