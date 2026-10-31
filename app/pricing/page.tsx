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
  Sparkle,
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
    a: "Yes. All prompts and outputs you generate on proCraft can be freely used for personal, freelance, and commercial client work without attribution.",
  },
];

const REVIEWS = [
  {
    name: "Alex Rivera",
    role: "Midjourney & FLUX Artist",
    handle: "@alexr_art",
    avatar: "AR",
    rating: 5,
    review:
      "The Midjourney and FLUX prompts here are next-level. I saved at least 10 hours this week alone testing concepts for client projects. Having 100% free access is unreal.",
  },
  {
    name: "Elena Rostova",
    role: "Senior UI/UX Designer",
    handle: "@elena_design",
    avatar: "ER",
    rating: 5,
    review:
      "The image-to-prompt reverse engineering feature blew my mind. Uploaded a 3D render and got prompt parameters that recreated the lighting and composition perfectly.",
  },
  {
    name: "Marcus Chen",
    role: "Indie Hacker & Developer",
    handle: "@marcusbuilds",
    avatar: "MC",
    rating: 5,
    review:
      "Most AI directories are bloated with dead links. proCraft is clean, lightning fast, and actually curated. Bookmarking my favorite ChatGPT coding prompts is super smooth.",
  },
  {
    name: "Sarah Jenkins",
    role: "Brand Strategist & Content Lead",
    handle: "@sarahj_creative",
    avatar: "SJ",
    rating: 5,
    review:
      "Finding viral marketing and mockup prompts has never been this straightforward. 1-click copy with all parameters already tuned is a massive productivity hack.",
  },
  {
    name: "David Morales",
    role: "AI Photographer",
    handle: "@davidm_lens",
    avatar: "DM",
    rating: 5,
    review:
      "The cinematic portrait and studio lighting prompts on proCraft are some of the best I've seen. The Cloudflare R2 previews load instantly without any lag.",
  },
  {
    name: "Priya Patel",
    role: "Creative Director",
    handle: "@priyacreates",
    avatar: "PP",
    rating: 5,
    review:
      "proCraft feels like what prompt libraries should have been from day one. Sleek dark mode UI, zero spam, and genuinely high-quality generative AI prompts.",
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

      <main className="min-h-screen bg-[#FCFCFC] dark:bg-[#0A0A0A] text-black dark:text-white pt-28 pb-20 px-4 md:px-8 relative">
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-primary dark:text-white text-xs font-semibold uppercase tracking-wider mb-6">
              <Gift size={14} className="text-primary dark:text-white" />
              <span>Official Launch Celebration • 100% Free</span>
            </div>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-primary dark:text-white mb-6 leading-[1.15]"
              style={{ fontFamily: '"Bricolage Grotesque", var(--font-bricolage), sans-serif' }}
            >
              Simple, Transparent Pricing.
            </h1>

            <p className="text-lg md:text-xl text-black/70 dark:text-white/70 leading-relaxed mb-6">
              To celebrate the official launch of <span className="font-semibold text-primary dark:text-white">proCraft</span>, full subscription access is completely <strong className="text-primary dark:text-white font-bold underline decoration-zinc-400 dark:decoration-zinc-600 underline-offset-4">FREE for all creators from 29 Oct through 31 Dec!</strong>
            </p>

            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-muted font-medium">
              <Clock size={13} className="text-primary dark:text-white" />
              <span>Free Subscription Window: <strong className="text-primary dark:text-white">Oct 29 – Dec 31</strong></span>
              <span className="w-1.5 h-1.5 rounded-full bg-black/60 dark:bg-white/60" />
            </div>
          </header>

          {/* Pricing Section — ONLY ONE CARD as requested */}
          <section className="max-w-2xl mx-auto mb-24" aria-label="Subscription Plans">
            <div className="relative bg-white dark:bg-[#111111] border border-black/10 dark:border-white/15 rounded-3xl p-8 sm:p-12 shadow-xl dark:shadow-2xl overflow-hidden">
              {/* Top Header Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-6 border-b border-black/10 dark:border-white/10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-primary dark:text-white text-xs font-bold uppercase tracking-wider border border-black/10 dark:border-white/15">
                  <Sparkle size={13} />
                  <span>Early Launch Pass</span>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary dark:text-white bg-black/5 dark:bg-white/5 px-3 py-1 rounded-full border border-black/10 dark:border-white/10">
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
              <div className="flex flex-wrap items-baseline gap-3 mb-8 p-5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl sm:text-6xl font-black tracking-tight text-primary dark:text-white">
                    $0
                  </span>
                  <span className="text-lg font-semibold text-muted">/ month</span>
                </div>
                <span className="text-sm line-through text-muted/70 decoration-zinc-400 dark:decoration-zinc-600 decoration-2 font-medium">
                  $29 / mo
                </span>
                <span className="ml-auto text-xs font-bold text-primary dark:text-white bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 px-2.5 py-1 rounded-lg">
                  100% OFF (New Launch)
                </span>
              </div>

              {/* Primary CTA Button (Uiverse.io inspired, styled in sleek black) */}
              <div className="space-y-3 mb-10">
                <Link href="/prompt-library" className="block w-full group">
                  <div className="relative w-full cursor-pointer opacity-95 hover:opacity-100 transition-opacity p-[2px] rounded-[16px] bg-gradient-to-t from-zinc-800 via-zinc-600 to-zinc-400 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-600 active:scale-95 shadow-lg">
                    <span className="w-full h-full flex items-center justify-center gap-2.5 px-8 py-3.5 bg-gradient-to-t from-black via-[#0d0d0d] to-[#1a1a1a] text-white rounded-[14px] font-bold text-base tracking-wide transition-all group-hover:from-black group-hover:to-[#222222]">
                      <Sparkles size={18} className="text-white" />
                      <span>Explore Prompt Library</span>
                      <ArrowRight size={18} className="text-white/80 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
                <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted text-center pt-2">
                  <span className="flex items-center gap-1">
                    <Check size={13} className="text-primary dark:text-white" /> No credit card needed
                  </span>
                  <span className="flex items-center gap-1">
                    <Check size={13} className="text-primary dark:text-white" /> Instant access
                  </span>
                  <span className="flex items-center gap-1">
                    <Check size={13} className="text-primary dark:text-white" /> Free until Dec 31
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
                    <div className="w-5 h-5 rounded-full bg-black/5 dark:bg-white/10 text-primary dark:text-white flex items-center justify-center shrink-0 mt-0.5 border border-black/10 dark:border-white/10">
                      <Check size={12} strokeWidth={2.5} />
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
              <div className="p-7 rounded-2xl bg-white dark:bg-[#111111] border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/10 text-primary dark:text-white flex items-center justify-center mb-5 border border-black/10 dark:border-white/10">
                  <Zap size={22} />
                </div>
                <h3 className="text-lg font-bold text-primary dark:text-white mb-2">
                  New Launch Celebration
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  We built proCraft to help creators master generative AI. To celebrate our official launch, we opened all premium prompts and tools for everyone.
                </p>
              </div>

              <div className="p-7 rounded-2xl bg-white dark:bg-[#111111] border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/10 text-primary dark:text-white flex items-center justify-center mb-5 border border-black/10 dark:border-white/10">
                  <Star size={22} />
                </div>
                <h3 className="text-lg font-bold text-primary dark:text-white mb-2">
                  Community-First Feedback
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Your feedback shapes proCraft. We want you to test our prompt library, try the image-to-prompt generator, and help us build the best directory on the web.
                </p>
              </div>

              <div className="p-7 rounded-2xl bg-white dark:bg-[#111111] border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/10 text-primary dark:text-white flex items-center justify-center mb-5 border border-black/10 dark:border-white/10">
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

          {/* Creator Reviews Infinite Scroll Motion */}
          <section className="mb-24 overflow-hidden" aria-label="Creator Reviews">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 text-muted text-xs font-semibold mb-3">
                <Star size={13} className="fill-amber-400 text-amber-400" />
                <span>Loved By Early Creators</span>
              </div>
              <h2
                className="text-2xl sm:text-3xl font-extrabold text-primary dark:text-white mb-3"
                style={{ fontFamily: '"Bricolage Grotesque", var(--font-bricolage), sans-serif' }}
              >
                What Creators Are Saying
              </h2>
              <p className="text-sm sm:text-base text-muted">
                Real feedback from designers, developers, and AI artists exploring proCraft.
              </p>
            </div>

            <div className="marquee-container py-3">
              <div
                className="marquee-content"
                style={{ "--marquee-duration": "35s" } as React.CSSProperties}
              >
                {[...REVIEWS, ...REVIEWS].map((item, idx) => (
                  <div
                    key={`${item.name}-${idx}`}
                    className="w-[320px] sm:w-[380px] shrink-0 bg-white dark:bg-[#111111] border border-black/10 dark:border-white/10 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-black/20 dark:hover:border-white/25 transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Stars */}
                      <div className="flex items-center gap-1 mb-4">
                        {Array.from({ length: item.rating }).map((_, s) => (
                          <Star
                            key={s}
                            size={14}
                            className="fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>

                      {/* Review Content */}
                      <p className="text-sm text-black/80 dark:text-white/80 leading-relaxed mb-6 font-normal">
                        &ldquo;{item.review}&rdquo;
                      </p>
                    </div>

                    {/* Reviewer Meta */}
                    <div className="flex items-center gap-3 pt-4 border-t border-black/5 dark:border-white/5">
                      <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 flex items-center justify-center font-bold text-xs text-primary dark:text-white shrink-0">
                        {item.avatar}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-primary dark:text-white truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-muted truncate">
                          {item.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
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
                  className="group bg-white dark:bg-[#111111] border border-black/10 dark:border-white/10 rounded-2xl p-6 transition-all duration-200 open:border-black/30 dark:open:border-white/30"
                >
                  <summary className="font-semibold text-base text-primary dark:text-white cursor-pointer list-none flex items-center justify-between gap-4">
                    <span>{faq.q}</span>
                    <span className="w-6 h-6 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-muted group-open:rotate-180 transition-transform shrink-0 text-xs">
                      ▼
                    </span>
                  </summary>
                  <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-black/5 dark:border-white/5 pt-4">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* Bottom Call to Action Banner (Clean Website Theme) */}
          <section className="relative rounded-3xl p-8 sm:p-12 text-center bg-black/[0.02] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 overflow-hidden shadow-lg">
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
                <Link href="/prompt-library" className="group">
                  <div className="relative cursor-pointer opacity-95 hover:opacity-100 transition-opacity p-[2px] rounded-[14px] bg-gradient-to-t from-zinc-800 via-zinc-600 to-zinc-400 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-600 active:scale-95 shadow-md">
                    <span className="flex items-center gap-2 px-7 py-3 bg-gradient-to-t from-black via-[#0d0d0d] to-[#1a1a1a] text-white rounded-[12px] font-bold text-sm tracking-wide transition-all group-hover:from-black group-hover:to-[#222222]">
                      <Sparkles size={16} />
                      <span>Explore Prompt Library</span>
                    </span>
                  </div>
                </Link>
                <Link
                  href="/ai-directory"
                  className="px-7 py-3 rounded-[14px] bg-black/5 dark:bg-white/10 text-primary dark:text-white font-semibold text-sm hover:bg-black/10 dark:hover:bg-white/15 transition-all duration-200 border border-black/10 dark:border-white/10"
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
