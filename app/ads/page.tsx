"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Zap,
  ShieldCheck,
  ArrowRight,
  Star,
  ExternalLink,
  Users,
  MousePointerClick,
  Check,
  HelpCircle,
  Megaphone,
  Layers,
  Award,
  Mail,
  Sparkle,
} from "lucide-react";

const MONETAG_DIRECT_LINK = "https://uplcm.com/4/12127029";

const PARTNER_DEALS = [
  {
    id: "cloud-gpu",
    badge: "Limited Offer",
    title: "AI Cloud Compute & High-Speed GPU Access",
    desc: "Deploy FLUX, Stable Diffusion XL, and custom LoRA models with fast on-demand cloud GPUs and zero hardware setup.",
    category: "Cloud & Compute",
    rating: 4.9,
    tag: "Verified Deal",
    cta: "Claim GPU Trial",
  },
  {
    id: "prompt-toolkit",
    badge: "Trending",
    title: "Generative AI Workflow & Creative Asset Suite",
    desc: "Accelerate your creative pipeline with batch image processing, upscaling workflows, and instant prompt augmentation.",
    category: "Workflow & Tools",
    rating: 4.8,
    tag: "Popular Choice",
    cta: "Explore Tool Suite",
  },
  {
    id: "code-assistant",
    badge: "Developer Pick",
    title: "Full-Stack AI Code Automation & Copilot",
    desc: "Speed up software engineering with intelligent context-aware code generation, automated debugging, and test suites.",
    category: "Developer Tools",
    rating: 4.9,
    tag: "Top Rated",
    cta: "Start Free Coding",
  },
  {
    id: "video-generation",
    badge: "Featured Deal",
    title: "Cinematic Text-to-Video & Camera Motion Studio",
    desc: "Create broadcast-grade visual effects, dynamic character motion, and AI-generated commercials in minutes.",
    category: "Video & Animation",
    rating: 4.7,
    tag: "Staff Pick",
    cta: "Unlock Video Perks",
  },
  {
    id: "3d-art-suite",
    badge: "Exclusive",
    title: "Next-Gen 3D Mesh & Texture Generator",
    desc: "Transform single reference images and text prompts into game-ready 3D assets with PBR material maps.",
    category: "3D & Gaming",
    rating: 4.8,
    tag: "Creator Deal",
    cta: "Generate 3D Now",
  },
  {
    id: "voice-synthesis",
    badge: "New Release",
    title: "Ultra-Realistic AI Voice Cloning & Audio Dubbing",
    desc: "Generate studio-grade voiceovers in 30+ languages with emotional inflection, pacing control, and multi-speaker dialog.",
    category: "Audio & Voice",
    rating: 4.9,
    tag: "Verified",
    cta: "Try Voice Studio",
  },
];

const AD_TIERS = [
  {
    name: "Starter Spotlight",
    price: "$149",
    period: "/ month",
    desc: "Ideal for early-stage AI startups and independent tool creators looking for targeted traction.",
    features: [
      "1x Dedicated Banner in Category & Explore pages",
      "Featured badge on your tool in the AI Directory",
      "Direct do-follow backlink to your website",
      "Estimated 15,000+ monthly targeted creator impressions",
      "Standard click & impression analytics",
    ],
    popular: false,
    cta: "Book Starter Ad",
  },
  {
    name: "Growth Partner",
    price: "$299",
    period: "/ month",
    desc: "Best for growing AI software, prompt tools, and platforms wanting prominent visibility.",
    features: [
      "Homepage Hero Sponsored Partner Card",
      "Top #1 sticky placement in your tool's directory category",
      "3x Curated prompts showcasing your tool in the Prompt Library",
      "Estimated 45,000+ monthly creator impressions",
      "Weekly performance report & CTR insights",
      "Priority sponsor support",
    ],
    popular: true,
    cta: "Book Growth Ad",
  },
  {
    name: "Enterprise Takeover",
    price: "$599",
    period: "/ month",
    desc: "Full-scale brand awareness campaign across all proCraft digital channels and active creator network.",
    features: [
      "Sitewide banner placement across all prompt & tool detail pages",
      "Dedicated feature article on the proCraft Blog",
      "Permanent high-authority SEO backlink & review",
      "Exclusive newsletter feature to our subscriber base",
      "Estimated 100,000+ monthly high-intent impressions",
      "Dedicated campaign manager & custom ad copy assistance",
    ],
    popular: false,
    cta: "Contact Enterprise",
  },
];

const FAQS = [
  {
    q: "How does advertising on proCraft help my product?",
    a: "proCraft is visited daily by active AI artists, prompt engineers, UI/UX designers, and developers actively looking for prompts, workflows, and tools to improve their work. Your ad is shown to high-intent decision-makers and builders.",
  },
  {
    q: "How can I book a direct sponsorship spot?",
    a: "Choose any of the sponsorship tiers above or click 'Book Ad' to reach our partnerships team directly via our Contact page or email. We will set up your creative assets within 24 hours.",
  },
  {
    q: "What ad formats and placements are supported?",
    a: "We support responsive native banners, directory spotlight badges, interactive showcase cards, dedicated blog features, and sponsored prompt packs tailored to your AI model or software.",
  },
  {
    q: "How do you verify partner deals and sponsored links?",
    a: "All third-party tools and partner offers showcased on this page undergo security and quality checks to ensure our community receives safe, high-quality AI software and relevant creative deals.",
  },
];

export default function AdsPage() {
  // Safe dynamic Monetag scripts injection on this dedicated ads page only
  useEffect(() => {
    const zones = [
      { zone: "12134819", src: "https://n6wxm.com/vignette.min.js" },
      { zone: "12127704", src: "https://nap5k.com/tag.min.js" },
      { zone: "12127660", src: "https://nap5k.com/tag.min.js" },
      { zone: "12127030", src: "https://al5sm.com/tag.min.js" },
    ];

    const elements: HTMLScriptElement[] = [];

    zones.forEach(({ zone, src }) => {
      try {
        const s = document.createElement("script");
        s.dataset.zone = zone;
        s.src = src;
        s.async = true;
        document.body.appendChild(s);
        elements.push(s);
      } catch (err) {
        console.warn("Ad script injection error:", err);
      }
    });

    return () => {
      elements.forEach((el) => {
        if (el && el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
    };
  }, []);

  const handleDirectLinkClick = () => {
    if (typeof window !== "undefined") {
      window.open(MONETAG_DIRECT_LINK, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <main className="min-h-screen bg-[#FCFCFC] dark:bg-[#0A0A0A] text-black dark:text-white pt-28 pb-20 px-4 md:px-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-muted">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-primary font-medium">Advertise &amp; Partner Hub</span>
        </nav>

        {/* Hero Section */}
        <header className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-primary dark:text-white text-xs font-semibold uppercase tracking-wider mb-6">
            <Megaphone size={14} className="text-primary dark:text-white" />
            <span>Sponsor &amp; Ads Hub • Verified Deals</span>
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-primary dark:text-white mb-6 leading-[1.15]"
            style={{ fontFamily: '"Bricolage Grotesque", var(--font-bricolage), sans-serif' }}
          >
            Reach 50,000+ AI Creators &amp; Innovators.
          </h1>

          <p className="text-lg md:text-xl text-black/70 dark:text-white/70 leading-relaxed mb-8">
            Promote your AI tool, model, or creative software directly to designers, engineers, and prompt enthusiasts worldwide. Explore verified sponsor showcases and exclusive partner deals below.
          </p>

          {/* Key Audience Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto text-left">
            <div className="p-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10">
              <div className="flex items-center gap-1.5 text-muted text-xs mb-1">
                <Users size={13} />
                <span>Monthly Reach</span>
              </div>
              <p className="text-xl sm:text-2xl font-black text-primary dark:text-white">50K+</p>
            </div>
            <div className="p-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10">
              <div className="flex items-center gap-1.5 text-muted text-xs mb-1">
                <Layers size={13} />
                <span>Curated Prompts</span>
              </div>
              <p className="text-xl sm:text-2xl font-black text-primary dark:text-white">800+</p>
            </div>
            <div className="p-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10">
              <div className="flex items-center gap-1.5 text-muted text-xs mb-1">
                <MousePointerClick size={13} />
                <span>Avg. CTR</span>
              </div>
              <p className="text-xl sm:text-2xl font-black text-primary dark:text-white">4.8%</p>
            </div>
            <div className="p-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10">
              <div className="flex items-center gap-1.5 text-muted text-xs mb-1">
                <Award size={13} />
                <span>Targeted Intent</span>
              </div>
              <p className="text-xl sm:text-2xl font-black text-primary dark:text-white">100%</p>
            </div>
          </div>
        </header>

        {/* Featured Sponsor Showcase Banner */}
        <section className="mb-20" aria-label="Featured Sponsor Showcase">
          <div
            onClick={handleDirectLinkClick}
            className="group cursor-pointer rounded-3xl border border-black/10 dark:border-white/15 bg-white dark:bg-[#111111] p-8 sm:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
              <div className="space-y-4 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black text-white dark:bg-white dark:text-black text-[11px] font-bold uppercase tracking-wider">
                    <Sparkle size={12} />
                    <span>Featured Sponsor</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-muted font-medium">
                    <Star size={13} className="fill-amber-400 text-amber-400" />
                    <span>4.9 / 5.0 (2,400+ reviews)</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-primary dark:text-white font-medium bg-black/5 dark:bg-white/10 px-2.5 py-0.5 rounded-full border border-black/5 dark:border-white/10">
                    <ShieldCheck size={13} />
                    <span>Verified Partner</span>
                  </span>
                </div>

                <h2
                  className="text-2xl sm:text-3xl font-extrabold text-primary dark:text-white leading-tight group-hover:underline underline-offset-4 decoration-zinc-400"
                  style={{ fontFamily: '"Bricolage Grotesque", var(--font-bricolage), sans-serif' }}
                >
                  Accelerate Your Generative AI Production Pipeline
                </h2>

                <p className="text-sm sm:text-base text-muted leading-relaxed">
                  Unlock high-performance cloud GPUs, instant reverse prompt engineering, and automated batch rendering for Midjourney, FLUX, and custom SDXL models.
                </p>
              </div>

              {/* Action Button */}
              <div className="shrink-0 w-full lg:w-auto">
                <div className="relative cursor-pointer opacity-95 hover:opacity-100 transition-opacity p-[2px] rounded-[16px] bg-gradient-to-t from-zinc-800 via-zinc-600 to-zinc-400 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-600 active:scale-95 shadow-md">
                  <span className="flex items-center justify-center gap-2.5 px-8 py-3.5 bg-gradient-to-t from-black via-[#0d0d0d] to-[#1a1a1a] text-white rounded-[14px] font-bold text-sm tracking-wide transition-all group-hover:from-black group-hover:to-[#222222]">
                    <span>Explore Verified Deal</span>
                    <ExternalLink size={16} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6 Curated AI Partner & Sponsored Deals */}
        <section className="mb-24" aria-label="Curated AI Partner Deals">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 text-muted text-xs font-semibold mb-3">
              <Zap size={13} className="text-primary dark:text-white" />
              <span>Verified Creator Perks</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary dark:text-white mb-3"
              style={{ fontFamily: '"Bricolage Grotesque", var(--font-bricolage), sans-serif' }}
            >
              Exclusive AI Partner Deals
            </h2>
            <p className="text-sm sm:text-base text-muted">
              Handpicked tools and resources offering special discounts and extended free trials for proCraft users.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PARTNER_DEALS.map((deal) => (
              <div
                key={deal.id}
                onClick={handleDirectLinkClick}
                className="group cursor-pointer rounded-2xl bg-white dark:bg-[#111111] border border-black/10 dark:border-white/10 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-black/30 dark:hover:border-white/25 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-black/5 dark:bg-white/10 text-primary dark:text-white px-2.5 py-0.5 rounded-full border border-black/10 dark:border-white/15">
                      {deal.badge}
                    </span>
                    <span className="text-xs text-muted flex items-center gap-1 font-medium">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span>{deal.rating}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-primary dark:text-white mb-2 leading-snug group-hover:underline underline-offset-4 decoration-zinc-400">
                    {deal.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted leading-relaxed mb-6">
                    {deal.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between gap-2">
                  <span className="text-xs text-muted font-medium">
                    {deal.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-primary dark:text-white group-hover:translate-x-0.5 transition-transform">
                    <span>{deal.cta}</span>
                    <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sponsorship Pricing Packages */}
        <section className="mb-24" aria-label="Sponsorship Packages">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 text-muted text-xs font-semibold mb-3">
              <Megaphone size={13} />
              <span>Sponsor Packages</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary dark:text-white mb-3"
              style={{ fontFamily: '"Bricolage Grotesque", var(--font-bricolage), sans-serif' }}
            >
              Direct Sponsorship Placements
            </h2>
            <p className="text-sm sm:text-base text-muted">
              Get maximum brand exposure to active prompt engineers and digital creators. Transparent pricing, no setup fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {AD_TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-3xl p-7 sm:p-8 transition-all flex flex-col justify-between ${
                  tier.popular
                    ? "bg-white dark:bg-[#111111] border-2 border-black/40 dark:border-white/40 shadow-xl relative"
                    : "bg-white dark:bg-[#111111] border border-black/10 dark:border-white/10 shadow-sm hover:shadow-md"
                }`}
              >
                <div>
                  {tier.popular && (
                    <div className="inline-block mb-4 px-3 py-1 rounded-full bg-black text-white dark:bg-white dark:text-black text-[10px] font-bold uppercase tracking-wider">
                      Most Popular Choice
                    </div>
                  )}

                  <h3
                    className="text-xl font-bold text-primary dark:text-white mb-2"
                    style={{ fontFamily: '"Bricolage Grotesque", var(--font-bricolage), sans-serif' }}
                  >
                    {tier.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted leading-relaxed mb-6">
                    {tier.desc}
                  </p>

                  <div className="flex items-baseline gap-1.5 mb-8 pb-6 border-b border-black/10 dark:border-white/10">
                    <span className="text-4xl sm:text-5xl font-black text-primary dark:text-white">
                      {tier.price}
                    </span>
                    <span className="text-sm font-semibold text-muted">
                      {tier.period}
                    </span>
                  </div>

                  <ul className="space-y-3.5 mb-8">
                    {tier.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <Check size={15} className="text-primary dark:text-white shrink-0 mt-0.5" />
                        <span className="text-black/80 dark:text-white/80">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/contact?subject=Advertising"
                  className="w-full block"
                >
                  <div className="relative cursor-pointer opacity-95 hover:opacity-100 transition-opacity p-[2px] rounded-[14px] bg-gradient-to-t from-zinc-800 via-zinc-600 to-zinc-400 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-600 active:scale-95 shadow-md">
                    <span className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-t from-black via-[#0d0d0d] to-[#1a1a1a] text-white rounded-[12px] font-bold text-xs uppercase tracking-wider transition-all group-hover:from-black group-hover:to-[#222222]">
                      <span>{tier.cta}</span>
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="max-w-3xl mx-auto mb-24" aria-label="Advertising FAQ">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 text-muted text-xs font-semibold mb-3">
              <HelpCircle size={13} />
              <span>Got Questions?</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl font-extrabold text-primary dark:text-white"
              style={{ fontFamily: '"Bricolage Grotesque", var(--font-bricolage), sans-serif' }}
            >
              Advertising &amp; Sponsorship FAQ
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <details
                key={i}
                className="group bg-white dark:bg-[#111111] border border-black/10 dark:border-white/10 rounded-2xl p-6 transition-all duration-200 open:border-black/30 dark:open:border-white/30"
              >
                <summary className="font-semibold text-base text-primary dark:text-white cursor-pointer list-none flex items-center justify-between gap-4">
                  <span>{faq.q}</span>
                  <span className="w-6 h-6 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-muted group-open:rotate-180 transition-transform shrink-0 text-xs">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-sm text-muted leading-relaxed border-t border-black/5 dark:border-white/5 pt-4">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Contact Partnerships Call-to-Action */}
        <section className="relative rounded-3xl p-8 sm:p-12 text-center bg-black/[0.02] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 overflow-hidden shadow-lg">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary dark:text-white mb-4"
              style={{ fontFamily: '"Bricolage Grotesque", var(--font-bricolage), sans-serif' }}
            >
              Need a Custom Campaign or Direct Booking?
            </h2>
            <p className="text-sm sm:text-base text-muted mb-8 leading-relaxed">
              We create custom sponsorship packages, newsletter features, and bespoke AI workflow integrations tailored to your budget and growth targets.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact?subject=Advertising" className="group">
                <div className="relative cursor-pointer opacity-95 hover:opacity-100 transition-opacity p-[2px] rounded-[14px] bg-gradient-to-t from-zinc-800 via-zinc-600 to-zinc-400 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-600 active:scale-95 shadow-md">
                  <span className="flex items-center gap-2 px-7 py-3 bg-gradient-to-t from-black via-[#0d0d0d] to-[#1a1a1a] text-white rounded-[12px] font-bold text-sm tracking-wide transition-all group-hover:from-black group-hover:to-[#222222]">
                    <Mail size={16} />
                    <span>Contact Partnerships</span>
                  </span>
                </div>
              </Link>
              <button
                type="button"
                onClick={handleDirectLinkClick}
                className="px-7 py-3 rounded-[14px] bg-black/5 dark:bg-white/10 text-primary dark:text-white font-semibold text-sm hover:bg-black/10 dark:hover:bg-white/15 transition-all duration-200 border border-black/10 dark:border-white/10 flex items-center gap-2"
              >
                <span>View Partner Offers</span>
                <ExternalLink size={14} />
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
