import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  Sparkles,
  Zap,
  ShieldCheck,
  Gift,
  ArrowRight,
  Clock,
  Star,
  HelpCircle,
  Layers,
  Flame,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing | Free Launch Special (Oct 29 – Dec 31)",
  description:
    "Explore proCraft pricing. Enjoy 100% free unlimited access to our AI prompt library, AI tools directory, and image-to-prompt tools from October 29 to December 31!",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "proCraft Pricing — 100% Free Launch Access",
    description:
      "Full subscription access to proCraft is completely FREE from October 29 through December 31. Unlock 800+ prompts, curated AI tools, and reverse prompt engineering.",
    url: "https://procraft.site/pricing",
    siteName: "proCraft",
    type: "website",
  },
};

const FEATURES = [
  {
    title: "Unlimited AI Prompt Library",
    desc: "Curated, high-performing prompts for Midjourney, ChatGPT, FLUX, Stable Diffusion & Claude.",
  },
  {
    title: "1-Click Copy & Parameter Formatting",
    desc: "Instant copy with aspect ratios, stylistic parameters, lighting keywords & negative prompts.",
  },
  {
    title: "Curated AI Tools Directory",
    desc: "Full access to 500+ verified AI tools across design, coding, audio, writing, and video.",
  },
  {
    title: "Image to Prompt Reverse Engineering",
    desc: "Upload any reference artwork and let AI extract detailed prompts for instant recreation.",
  },
  {
    title: "Cloudflare R2 High-Speed CDN",
    desc: "Blazing-fast image previews served globally through cdn.procraft.site with zero lag.",
  },
  {
    title: "Save & Bookmark Favorites",
    desc: "Build and organize your personal prompt board for recurring creative and client projects.",
  },
  {
    title: "Daily Trending Prompt Updates",
    desc: "Fresh, tested prompts added regularly reflecting the latest model releases and aesthetic trends.",
  },
  {
    title: "Commercial Use Rights Included",
    desc: "Full freedom to use generated prompts for client work, commercial designs, and freelance gigs.",
  },
  {
    title: "Zero Credit Card or Payment Required",
    desc: "No auto-billing, no payment details collected, no hidden strings attached.",
  },
];

const FAQS = [
  {
    q: "Why is proCraft subscription completely free from 29 Oct to Dec?",
    a: "We recently launched proCraft as the premier AI prompt library and tools directory! To celebrate our new launch and welcome early creators, designers, and developers, we decided to give 100% free unrestricted access from October 29 through December 31.",
  },
  {
    q: "Do I need to enter a credit card or payment method?",
    a: "No! Absolutely not. You will never be asked for credit card details, PayPal, or any payment information during this launch period. Access is 100% frictionless and free.",
  },
  {
    q: "What features are included in the Free Launch Access?",
    a: "Everything is unlocked! You get full access to our entire prompt collection (Midjourney, FLUX, ChatGPT, Stable Diffusion), all directory tool links, image-to-prompt conversion workflows, and personal bookmarking.",
  },
  {
    q: "What happens after December 31?",
    a: "All prompts and bookmarks you saved during the launch period remain yours. When we introduce paid plans later, our early adopter community will receive grandfathered discounts and special perks.",
  },
  {
    q: "Can I use the prompts for client or commercial projects?",
    a: "Yes. All prompts and outputs you generate on proCraft can be freely used for personal, freelance, and commercial commercial client work without attribution.",
  },
];

export default function PricingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "proCraft AI Prompt Library & Directory",
    description:
      "Curated AI prompt library, AI tools directory, and image-to-prompt generator for Midjourney, ChatGPT, FLUX & Stable Diffusion.",
    image: "https://procraft.site/logo-dark-v2.png",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      validFrom: "2026-10-29",
      priceValidUntil: "2026-12-31",
      url: "https://procraft.site/pricing",
      category: "Free Launch Access",
    },
  };

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://procraft.site",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Pricing",
        item: "https://procraft.site/pricing",
      },
    ],
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      <main className="min-h-screen bg-[#FCFCFC] dark:bg-[#0A0A0A] text-black dark:text-white pt-28 pb-20 px-4 md:px-8 relative overflow-hidden">
        {/* Subtle Ambient Background Glows */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-accent/10 dark:bg-accent/15 blur-[140px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-96 right-10 w-[400px] h-[300px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-muted">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-primary font-medium">Pricing</span>
          </nav>

          {/* Hero Header */}
          <header className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
              <Gift size={14} className="animate-pulse" />
              <span>Official Launch Celebration • 100% Free</span>
            </div>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-primary dark:text-white mb-6 leading-[1.15]"
              style={{ fontFamily: '"Bricolage Grotesque", var(--font-bricolage), sans-serif' }}
            >
              Simple, Transparent Pricing.
            </h1>

            <p className="text-lg md:text-xl text-black/70 dark:text-white/70 leading-relaxed mb-6">
              To celebrate the official launch of <span className="font-semibold text-primary dark:text-white">proCraft</span>, full subscription access is completely <strong className="text-emerald-600 dark:text-emerald-400 font-bold">FREE for all creators from 29 Oct through 31 Dec!</strong>
            </p>

            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-muted font-medium">
              <Clock size={13} className="text-accent" />
              <span>Free Subscription Window: <strong>Oct 29 – Dec 31</strong></span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            </div>
          </header>

          {/* Pricing Section — ONLY ONE CARD as requested */}
          <section className="max-w-2xl mx-auto mb-24 relative" aria-label="Subscription Plans">
            {/* Outer Accent Glow Ring */}
            <div className="absolute -inset-1 bg-gradient-to-r from-accent via-emerald-500 to-accent rounded-[2rem] opacity-30 dark:opacity-40 blur-xl transition-all" />

            <div className="relative bg-white dark:bg-[#111111] border-2 border-accent/40 dark:border-accent/40 rounded-3xl p-8 sm:p-12 shadow-2xl overflow-hidden">
              {/* Top Banner Ribbon */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-6 border-b border-black/10 dark:border-white/10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-bold uppercase tracking-wider border border-accent/25">
                  <Flame size={13} />
                  <span>Early Launch Pass</span>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  <CheckCircle2 size={13} />
                  <span>29 Oct – Dec Free Access</span>
                </div>
              </div>

              {/* Card Title & Subtitle */}
              <div className="mb-6">
                <h2
                  className="text-2xl sm:text-3xl font-extrabold text-primary dark:text-white mb-2"
                  style={{ fontFamily: '"Bricolage Grotesque", var(--font-bricolage), sans-serif' }}
                >
                  Founder&apos;s Free Plan
                </h2>
                <p className="text-sm sm:text-base text-muted leading-relaxed">
                  Unrestricted access to the entire proCraft ecosystem: prompt libraries, curated AI directory, and image-to-prompt tools.
                </p>
              </div>

              {/* Price Block */}
              <div className="flex flex-wrap items-baseline gap-3 mb-8 p-5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl sm:text-6xl font-black tracking-tight text-primary dark:text-white">
                    $0
                  </span>
                  <span className="text-lg font-semibold text-muted">/ month</span>
                </div>
                <span className="text-sm line-through text-muted/70 decoration-rose-500 decoration-2 font-medium">
                  $29 / mo
                </span>
                <span className="ml-auto text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
                  100% OFF (New Launch)
                </span>
              </div>

              {/* Primary CTA */}
              <div className="space-y-3 mb-10">
                <Link
                  href="/prompt-library"
                  className="w-full flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-accent text-black font-bold text-base hover:bg-accent-hover transition-all duration-200 shadow-lg shadow-accent/20 hover:scale-[1.01] active:scale-[0.99]"
                >
                  <Sparkles size={18} />
                  <span>Claim Free Access &amp; Explore Prompts</span>
                  <ArrowRight size={18} />
                </Link>
                <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted text-center pt-1">
                  <span className="flex items-center gap-1">
                    <Check size={13} className="text-emerald-500" /> No credit card needed
                  </span>
                  <span className="flex items-center gap-1">
                    <Check size={13} className="text-emerald-500" /> Instant activation
                  </span>
                  <span className="flex items-center gap-1">
                    <Check size={13} className="text-emerald-500" /> Valid until Dec 31
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-black/10 dark:border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-[#111111] px-4 text-muted font-bold tracking-wider">
                    Everything Included
                  </span>
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-4">
                {FEATURES.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/30">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <div>
                      <strong className="text-sm font-semibold text-primary dark:text-white block">
                        {feature.title}
                      </strong>
                      <span className="text-xs text-muted leading-relaxed">
                        {feature.desc}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Why Is It Free? Section */}
          <section className="mb-24" aria-label="Why It Is Free">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2
                className="text-2xl sm:text-3xl font-extrabold text-primary dark:text-white mb-3"
                style={{ fontFamily: '"Bricolage Grotesque", var(--font-bricolage), sans-serif' }}
              >
                Why Are We Making It 100% Free?
              </h2>
              <p className="text-sm sm:text-base text-muted">
                No catches, no trial credit cards, no hidden fees. Here is our promise to you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-7 rounded-2xl bg-white dark:bg-[#111111] border border-black/10 dark:border-white/10 hover:border-accent/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-accent/15 text-accent flex items-center justify-center mb-5">
                  <Zap size={22} />
                </div>
                <h3 className="text-lg font-bold text-primary dark:text-white mb-2">
                  New Launch Celebration
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  We built proCraft to help creators master generative AI. To celebrate our official launch, we opened all premium prompts and tools for everyone.
                </p>
              </div>

              <div className="p-7 rounded-2xl bg-white dark:bg-[#111111] border border-black/10 dark:border-white/10 hover:border-accent/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center mb-5">
                  <Star size={22} />
                </div>
                <h3 className="text-lg font-bold text-primary dark:text-white mb-2">
                  Community-First Feedback
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Your feedback shapes proCraft. We want you to test our prompt library, try the image-to-prompt generator, and help us build the best directory on the web.
                </p>
              </div>

              <div className="p-7 rounded-2xl bg-white dark:bg-[#111111] border border-black/10 dark:border-white/10 hover:border-accent/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-blue-500/15 text-blue-500 flex items-center justify-center mb-5">
                  <ShieldCheck size={22} />
                </div>
                <h3 className="text-lg font-bold text-primary dark:text-white mb-2">
                  Zero Financial Risk
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  You never have to provide credit card numbers or billing details. Enjoy full freedom without worrying about unexpected auto-renewals or fees.
                </p>
              </div>
            </div>
          </section>

          {/* Frequently Asked Questions */}
          <section className="max-w-3xl mx-auto mb-24" aria-label="Frequently Asked Questions">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 text-muted text-xs font-semibold mb-3">
                <HelpCircle size={13} />
                <span>Got Questions?</span>
              </div>
              <h2
                className="text-2xl sm:text-3xl font-extrabold text-primary dark:text-white"
                style={{ fontFamily: '"Bricolage Grotesque", var(--font-bricolage), sans-serif' }}
              >
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {FAQS.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-white dark:bg-[#111111] border border-black/10 dark:border-white/10 rounded-2xl p-6 transition-all duration-200 open:border-accent/40"
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

          {/* Bottom Call to Action Banner */}
          <section className="relative rounded-3xl p-8 sm:p-12 text-center bg-gradient-to-r from-accent/15 via-emerald-500/10 to-accent/15 border border-accent/30 overflow-hidden shadow-xl">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary dark:text-white mb-4"
                style={{ fontFamily: '"Bricolage Grotesque", var(--font-bricolage), sans-serif' }}
              >
                Ready to Boost Your AI Workflow?
              </h2>
              <p className="text-sm sm:text-base text-muted mb-8 leading-relaxed">
                Take advantage of our 100% free launch subscription today. Discover thousands of tested prompts and verified AI tools.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/prompt-library"
                  className="px-8 py-3.5 rounded-xl bg-accent text-black font-bold text-sm hover:bg-accent-hover transition-all duration-200 shadow-md hover:scale-105"
                >
                  Explore Prompt Library
                </Link>
                <Link
                  href="/ai-directory"
                  className="px-8 py-3.5 rounded-xl bg-black/5 dark:bg-white/10 text-primary dark:text-white font-semibold text-sm hover:bg-black/10 dark:hover:bg-white/15 transition-all duration-200 border border-black/10 dark:border-white/10"
                >
                  Browse AI Directory
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
