"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Bot, BrainCircuit, Sparkles, Globe,
  MessageSquare, Cpu, Search, MessageCircle,
  Smartphone, FileText, LayoutGrid,
  Zap, ArrowRight, ChevronRight, Palette
} from 'lucide-react';

export function ModelAwareWorkflows() {
  const llmModels = [
    { name: 'ChatGPT', icon: Bot },
    { name: 'Claude', icon: BrainCircuit },
    { name: 'Gemini', icon: Sparkles },
    { name: 'Grok', icon: Globe },
    { name: 'Llama', icon: Cpu },
    { name: 'Mistral', icon: Zap },
    { name: 'DeepSeek', icon: Search },
    { name: 'Perplexity', icon: MessageSquare },
    { name: 'Cohere', icon: MessageCircle },
    { name: 'Kimi', icon: Smartphone },
    { name: 'Qwen', icon: FileText },
    { name: 'Midjourney', icon: Palette },
  ];

  const ModelCard = ({ model, href }: { model: { name: string; icon: any }, href: string }) => {
    const Icon = model.icon;
    return (
      <Link
        href={href}
        className="flex items-center justify-between gap-2 px-3 h-[52px] rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.04] hover:border-[#EA4C89]/40 hover:bg-[#EA4C89]/5 transition-all group cursor-pointer"
      >
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#EA4C89]/10 transition-colors">
            <Icon size={14} className="text-black/60 dark:text-white/70 group-hover:text-[#EA4C89] transition-colors" />
          </div>
          <span className="text-sm font-medium text-black/80 dark:text-white/90 group-hover:text-[#EA4C89] transition-colors truncate">{model.name}</span>
        </div>
        <ChevronRight size={14} className="text-black/30 dark:text-white/30 group-hover:text-[#EA4C89] group-hover:translate-x-0.5 transition-all shrink-0" />
      </Link>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="w-full bg-base dark:bg-[#0a0a0a] py-24 px-4 md:px-8 border-t border-black/5 dark:border-white/5 font-sans overflow-hidden relative cv-auto">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">

        {/* Left Content */}
        <div className="lg:w-1/2 flex flex-col items-start gap-8 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#EA4C89]/30 text-black/80 dark:text-white/90 text-[13px] font-medium tracking-wide">
            <Sparkles size={14} className="text-[#EA4C89]" />
            Explore AI Models
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-primary dark:text-white leading-[1.1] tracking-tight"
            style={{ fontFamily: '"Bricolage Grotesque", var(--font-bricolage), sans-serif' }}
          >
            Supercharge Your Workflow with the<br />
            <span className="text-[#EA4C89]">Best AI Tools & Models</span>
          </h2>

          <p className="text-black/60 dark:text-white/70 text-base md:text-lg leading-relaxed max-w-xl">
            Explore the best AI tools and models in our AI directory. Compare features, discover powerful AI solutions, and find the right tools for content creation, image generation, productivity, coding, and everyday tasks.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto">
            <Link
              href="/ai-directory"
              className="w-full sm:w-auto relative group cursor-pointer select-none p-[2px] rounded-full bg-gradient-to-t from-[#1b1a1b] to-[#454244] hover:from-[#232122] hover:to-[#555254] shadow-[0_4px_16px_rgba(0,0,0,0.35)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.5)] active:scale-[0.98] transition-all"
            >
              <span
                className="w-full sm:w-auto py-3.5 px-8 rounded-full bg-[#2D2B2C] group-hover:bg-[#383536] text-white font-bricolage font-bold text-sm tracking-normal transition-colors flex items-center justify-center gap-2"
                style={{ backgroundColor: '#2D2B2C', color: '#ffffff' }}
              >
                <span>Explore AI Directory</span>
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
            <Link
              href="/prompt-library"
              className="w-full sm:w-auto bg-transparent hover:bg-black/5 dark:hover:bg-white/5 border border-black/10 dark:border-white/20 text-primary dark:text-white font-bold text-sm px-8 py-4 rounded-full transition-colors flex items-center justify-center"
            >
              Browse Prompts
            </Link>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mt-8 pt-8 border-t border-black/5 dark:border-white/10 w-full">
            <div className="flex items-center gap-2.5">
              <Cpu size={20} className="text-[#EA4C89]" />
              <span className="text-black/70 dark:text-white/80 text-sm font-semibold">100+ Models</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Bot size={20} className="text-[#EA4C89]" />
              <span className="text-black/70 dark:text-white/80 text-sm font-semibold">Top LLMs</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Zap size={20} className="text-[#EA4C89]" />
              <span className="text-black/70 dark:text-white/80 text-sm font-semibold">Real-time Updates</span>
            </div>
          </div>
        </div>

        {/* Right Media Area - Grid Cards */}
        <div className="lg:w-1/2 relative w-full flex justify-center items-center mt-12 lg:mt-0">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="w-full rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#121212] p-6 md:p-8 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#EA4C89]/10 flex items-center justify-center shrink-0">
                  <Sparkles size={22} className="text-[#EA4C89]" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-base">Most Popular AI Tools</h4>
                  <p className="text-black/60 dark:text-white/60 text-xs mt-1">Language, reasoning, writing, coding, analysis, research, and multimodal workflows.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
                {llmModels.map((m, i) => (
                  <motion.div key={i} variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <ModelCard
                      model={m}
                      href={`/ai-directory/${m.name.toLowerCase().replace(/\s+/g, '-')}`}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            <Link
              href="/ai-directory?category=LLMs%20%26%20AI%20Assistants&page=1"
              className="flex items-center justify-center gap-2 py-3 mt-2 rounded-xl border border-[#EA4C89]/20 dark:border-[#EA4C89]/30 bg-[#EA4C89]/5 dark:bg-[#EA4C89]/10 hover:bg-[#EA4C89]/10 dark:hover:bg-[#EA4C89]/20 transition-all text-[#EA4C89] text-sm font-semibold w-full"
            >
              <LayoutGrid size={15} />
              Explore More Tools
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
