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
  Eye,
  TrendingUp,
  MousePointerClick,
  Check,
  HelpCircle,
  Megaphone,
  Layers,
  Award,
  Globe,
  Mail,
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
                <TrendingUp size={13} />
                <span>Audience</span>
              </div>
              <p className="text-xl sm:text-2xl font-black text-primary dark:text-white">100% AI</p>
            </div>
          </div>
        </header>

        {/* Featured Sponsor Highlight Card (Interactive Monetag Direct Link integration) */}
        <section className="mb-20" aria-label="Featured Sponsor Showcase">
          <div
            onClick={handleDirectLinkClick}
            className="cursor-pointer group relative bg-white dark:bg-[#111111] border border-black/10 dark:border-white/15 rounded-3xl p-8 sm:p-12 shadow-xl hover:border-black/30 dark:hover:border-white/30 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-black/5 dark:bg-white/10 text-primary dark:text-white px-3 py-1 rounded-full border border-black/10 dark:border-white/15 flex items-center gap-1">
                    <Award size={12} />
                    <span>Featured Sponsor Spotlight</span>
                  </span>
                  <span className="text-xs text-muted font-medium flex items-center gap-1">
                    <Star size={12} className="fill-amber-400 text-amber-400" /> 4.95 Rating
                  </span>
                  <span className="text-xs text-primary dark:text-white font-semibold flex items-center gap-1">
                    <ShieldCheck size={13} /> Verified AI Partner
                  </span>
                </div>

                <h2
                  className="text-2xl sm:text-3xl font-extrabold text-primary dark:text-white group-hover:underline underline-offset-4 decoration-zinc-400 transition-all"
                  style={{ fontFamily: '"Bricolage Grotesque", var(--font-bricolage), sans-serif' }}
                >
                  ProAI Studio — Next-Gen Generative Models &amp; Automation
                </h2>

                <p className="text-sm sm:text-base text-muted leading-relaxed">
                  Accelerate your production workflows with unified model orchestration, high-speed multi-prompt execution, automated asset scaling, and developer APIs.
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-muted pt-1">
                  <span className="flex items-center gap-1">
                    <Check size={13} /> Instant Activation
                  </span>
                  <span className="flex items-center gap-1">
                    <Check size={13} /> Exclusive Community Deal
                  </span>
                  <span className="flex items-center gap-1">
                    <Check size={13} /> Direct Partner Access
                  </span>
                </div>
              </div>

              {/* Uiverse-Inspired Sleek Black CTA Button */}
              <div className="shrink-0 w-full md:w-auto">
                <div className="relative w-full md:w-auto cursor-pointer opacity-95 group-hover:opacity-100 transition-opacity p-[2px] rounded-[16px] bg-gradient-to-t from-zinc-800 via-zinc-600 to-zinc-400 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-600 active:scale-95 shadow-lg">
                  <span className="w-full h-full flex items-center justify-center gap-2.5 px-8 py-3.5 bg-gradient-to-t from-black via-[#0d0d0d] to-[#1a1a1a] text-white rounded-[14px] font-bold text-sm tracking-wide transition-all group-hover:from-black group-hover:to-[#222222]">
                    <Sparkles size={16} className="text-white" />
                    <span>Claim Sponsor Offer</span>
                    <ExternalLink size={15} className="text-white/80 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Curated Partner Deals Grid (6 Cards, styled in website theme) */}
        <section className="mb-24" aria-label="Curated Partner Deals">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 text-muted text-xs font-semibold mb-3">
              <Zap size={13} />
              <span>Verified Creator Perks</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl font-extrabold text-primary dark:text-white mb-3"
              style={{ fontFamily: '"Bricolage Grotesque", var(--font-bricolage), sans-serif' }}
            >
              Exclusive AI Partner Deals &amp; Offers
            </h2>
            <p className="text-sm sm:text-base text-muted">
              Discover tested AI tools, cloud compute credits, and creative suites offering special deals for proCraft visitors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PARTNER_DEALS.map((deal) => (
              <div
                key={deal.id}
                onClick={handleDirectLinkClick}
                className="cursor-pointer group bg-white dark:bg-[#111111] border border-black/10 dark:border-white/10 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-black/30 dark:hover:border-white/30 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-black/5 dark:bg-white/10 text-primary dark:text-white px-2.5 py-0.5 rounded-full border border-black/10 dark:border-white/15">
                      {deal.badge}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-muted">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span>{deal.rating}</span>
                    </div>
                  </div>

                  <span className="text-xs text-muted font-medium block mb-1">
                    {deal.category}
                  </span>

                  <h3 className="text-base sm:text-lg font-bold text-primary dark:text-white group-hover:text-accent transition-colors mb-2.5 leading-snug">
                    {deal.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted leading-relaxed mb-6">
                    {deal.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between gap-3">
                  <span className="text-xs text-muted font-medium flex items-center gap-1">
                    <ShieldCheck size={12} /> {deal.tag}
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

        {/* Advertise with proCraft — Sponsorship Packages */}
        <section className="mb-24" aria-label="Sponsorship Packages">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 text-muted text-xs font-semibold mb-3">
              <Globe size={13} />
              <span>Direct Sponsorships</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl font-extrabold text-primary dark:text-white mb-3"
              style={{ fontFamily: '"Bricolage Grotesque", var(--font-bricolage), sans-serif' }}
            >
              Advertise on proCraft
            </h2>
            <p className="text-sm sm:text-base text-muted">
              Select a sponsorship package to place your brand in front of thousands of daily generative AI builders and creators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {AD_TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`relative bg-white dark:bg-[#111111] rounded-3xl p-8 flex flex-col justify-between transition-all duration-200 border ${
                  tier.popular
                    ? "border-black/30 dark:border-white/30 shadow-2xl scale-[1.02]"
                    : "border-black/10 dark:border-white/10 shadow-md hover:border-black/25 dark:hover:border-white/25"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-black text-white dark:bg-white dark:text-black text-[10px] font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full shadow-md">
                      Most Popular
                    </span>
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-primary dark:text-white mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-muted mb-6 leading-relaxed">
                    {tier.desc}
                  </p>

                  <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-black/10 dark:border-white/10">
                    <span className="text-4xl font-black text-primary dark:text-white">
                      {tier.price}
                    </span>
                    <span className="text-sm font-semibold text-muted">
                      {tier.period}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-black/80 dark:text-white/80">
                        <Check size={14} className="shrink-0 mt-0.5 text-primary dark:text-white" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/contact?subject=Advertising"
                  className={`w-full py-3.5 rounded-xl text-center text-xs font-bold uppercase tracking-wider transition-all ${
                    tier.popular
                      ? "bg-black text-white dark:bg-white dark:text-black hover:opacity-90 shadow-md"
                      : "bg-black/5 dark:bg-white/10 text-primary dark:text-white hover:bg-black/10 dark:hover:bg-white/15"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Advertising FAQ Section */}
        <section className="max-w-3xl mx-auto mb-20" aria-label="Advertising FAQ">
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
