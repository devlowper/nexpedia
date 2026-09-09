import React from 'react';
import Link from 'next/link';
import {
  Bot, BrainCircuit, Sparkles, Globe,
  MessageSquare, Cpu, Search, MessageCircle,
  Smartphone, FileText, LayoutGrid,
  Image as ImageIcon, Palette, Focus,
  Camera, Wand2, Stars, Lightbulb,
  Video, Film, Clapperboard, MonitorPlay,
  PlaySquare, Rocket, CameraIcon,
  Zap, PenTool, Layout, ChevronRight
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
  ];

  const imageModels = [
    { name: 'GPT Vision', icon: ImageIcon },
    { name: 'Midjourney', icon: Palette },
    { name: 'Nano Banana', icon: Focus },
    { name: 'FLUX', icon: Stars },
    { name: 'Ideogram', icon: Layout },
    { name: 'Stable Diffusion', icon: Wand2 },
  ];

  const videoModels = [
    { name: 'Veo', icon: Video },
    { name: 'Runway', icon: Film },
    { name: 'Seed', icon: PlaySquare },
    { name: 'Wan', icon: MonitorPlay },
    { name: 'Pika', icon: CameraIcon },
    { name: 'Sora', icon: Video },
  ];

  const ModelCard = ({ model, href }: { model: { name: string; icon: any }, href: string }) => {
    const Icon = model.icon;
    return (
      <Link
        href={href}
        className="flex items-center justify-between gap-2 px-3 h-[56px] rounded-xl border border-gray-100 dark:border-border bg-white dark:bg-surface hover:border-accent/30 dark:hover:border-accent/50 hover:bg-accent/5 dark:hover:bg-accent/10 transition-all group cursor-pointer"
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-gray-50 dark:bg-elevated flex items-center justify-center shrink-0">
            <Icon size={14} className="text-gray-500 dark:text-muted group-hover:text-accent dark:group-hover:text-accent transition-colors" />
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-primary group-hover:text-gray-900 dark:group-hover:text-white leading-tight line-clamp-2 text-left">{model.name}</span>
        </div>
        <ChevronRight size={14} className="text-gray-300 dark:text-faint group-hover:text-accent dark:group-hover:text-accent transition-colors shrink-0" />
      </Link>
    );
  };

  const ExploreBtn = ({ href }: { href: string }) => (
    <Link
      href={href}
      className="flex items-center justify-center gap-2 py-3 mt-4 rounded-xl border border-accent/20 dark:border-accent/30 bg-accent/5 dark:bg-accent/10 hover:bg-accent/10 dark:hover:bg-accent/20 transition-all text-accent text-sm font-semibold w-full mt-auto"
    >
      <LayoutGrid size={15} />
      Explore More Tools
    </Link>
  );

  return (
    <section className="w-full border-t border-border bg-surface">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row min-h-[560px]">

        {/* Left — gradient panel */}
        <div
          className="lg:w-[38%] flex flex-col justify-center gap-7 p-10 lg:p-14 relative overflow-hidden bg-gradient-to-br from-[#fff5f8] via-[#fce7f3] to-[#fdf2f8] dark:from-surface dark:via-elevated dark:to-surface dark:border-r dark:border-border"
        >
          {/* Soft blob */}
          <div
            className="absolute -top-20 -left-20 w-72 h-72 rounded-full pointer-events-none opacity-40 dark:opacity-20"
            style={{ background: 'radial-gradient(circle, #EA4C89 0%, transparent 70%)', filter: 'blur(60px)' }}
          />

          <div className="relative z-10">
            <p className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.18em] text-accent uppercase mb-5">
              <Sparkles size={12} /> Explore AI Models
            </p>
            <h2
              className="font-bricolage text-3xl md:text-4xl font-extrabold leading-tight text-gray-900 dark:text-primary mb-4"
              style={{ fontFamily: '"Bricolage Grotesque", var(--font-bricolage), sans-serif' }}
            >
              Discover the Best{' '}
              <span className="text-accent">AI Tools</span>{' '}
              for Your<br />Workflow
            </h2>
            <p className="text-gray-500 dark:text-muted text-sm leading-relaxed">
              Explore powerful AI tools, compare their features and capabilities, and discover the perfect solutions to simplify your work, boost productivity, and bring your ideas to life.
            </p>
          </div>

          <div className="relative z-10">
            <Link
              href="/prompt-library"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition-colors shadow-lg shadow-accent/20"
            >
              Explore Prompt Library <ChevronRight size={16} />
            </Link>
          </div>
        </div>

        {/* Right — white cards area */}
        <div className="lg:w-[62%] flex flex-col gap-4 p-6 lg:p-8 bg-white dark:bg-surface">

          {/* LLMs card */}
          <div className="rounded-2xl border border-gray-100 dark:border-border bg-white dark:bg-elevated p-5 shadow-sm flex flex-col h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 dark:bg-accent/20 flex items-center justify-center shrink-0">
                <Sparkles size={18} className="text-accent" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-primary text-sm">Most Popular AI Tools</h4>
                <p className="text-gray-400 dark:text-muted text-xs mt-0.5">Language, reasoning, writing, coding, analysis, research, planning, and multimodal work.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 flex-1 mb-4">
              {llmModels.map((m, i) => (
                <ModelCard
                  key={i}
                  model={m}
                  href={`/ai-directory/${m.name.toLowerCase().replace(/\s+/g, '-')}`}
                />
              ))}
            </div>
            <ExploreBtn href="/ai-directory?category=LLMs%20%26%20AI%20Assistants&page=1" />
          </div>

          {/* Image + Video row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Image Models */}
            <div className="rounded-2xl border border-gray-100 dark:border-border bg-white dark:bg-elevated p-5 shadow-sm flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 dark:bg-accent/20 flex items-center justify-center shrink-0">
                  <ImageIcon size={18} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-primary text-sm">AI Image Models</h4>
                  <p className="text-gray-400 dark:text-muted text-xs mt-0.5">Composition, subject, style, lighting, camera, typography, and negative constraints.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 flex-1 mb-4">
                {imageModels.map((m, i) => (
                  <ModelCard
                    key={i}
                    model={m}
                    href={`/ai-directory/${m.name.toLowerCase().replace(/\s+/g, '-')}`}
                  />
                ))}
              </div>
              <ExploreBtn href="/ai-directory?category=AI%20Image%20Tools&page=1" />
            </div>

            {/* Video Models */}
            <div className="rounded-2xl border border-gray-100 dark:border-border bg-white dark:bg-elevated p-5 shadow-sm flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 dark:bg-accent/20 flex items-center justify-center shrink-0">
                  <Video size={18} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-primary text-sm">AI Video Models</h4>
                  <p className="text-gray-400 dark:text-muted text-xs mt-0.5">Scenes, shots, motion, camera direction, continuity, timing, audio, and delivery format.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 flex-1 mb-4">
                {videoModels.map((m, i) => (
                  <ModelCard
                    key={i}
                    model={m}
                    href={`/ai-directory/${m.name.toLowerCase().replace(/\s+/g, '-')}`}
                  />
                ))}
              </div>
              <ExploreBtn href="/ai-directory?category=AI%20Video%20Tool&page=1" />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
