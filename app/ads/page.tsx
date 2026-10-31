"use client";

import React, { useState } from "react";
import Script from "next/script";
import {
  ShieldCheck,
  Sparkles,
  Zap,
  TrendingUp,
  Gift,
  Key,
  Flame,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  Play,
  Smartphone,
  ExternalLink,
  Coins,
  Cpu,
  Layers,
  Code2,
  Video,
  Box,
  Mic,
  Star,
  Users,
  Globe,
  HelpCircle,
} from "lucide-react";
import { AdsterraResponsiveBanner } from "@/components/ads/AdsterraBanner";
import { handleTwoClickAd, triggerMonetagSmartlink, TwoClickLink, getNextDirectLink } from "@/lib/monetagAd";

// Official Monetag Direct Links (4 Direct Links rotated evenly across all action buttons & cards)
const DIRECT_LINKS = [
  "https://uplcm.com/4/12127029",
  "https://uplcm.com/4/12155084",
  "https://uplcm.com/4/12155091",
  "https://uplcm.com/4/12156082",
];

let globalLinkCounter = 0;
const getDirectLink = (idx?: number) => {
  if (typeof idx === 'number') return DIRECT_LINKS[idx % DIRECT_LINKS.length];
  const link = DIRECT_LINKS[globalLinkCounter % DIRECT_LINKS.length];
  globalLinkCounter++;
  return link;
};



// Featured 8 Cards (Unsplash Photos + 3D Black Buttons, NO EMOJIS)
const FEATURED_CARDS = [
  {
    title: "FLUX.1 & Midjourney v6.1",
    desc: "Leading generative diffusion models for photorealistic rendering, complex multi-subject prompts, and typography.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&h=450&q=80",
    badge: "Top Rated",
    cta: "Explore FLUX",
    href: "https://blackforestlabs.ai/",
  },
  {
    title: "Google AI Pro & Gemini Ultra",
    desc: "12 months free for verified students, featuring Gemini advanced reasoning, deep multimodal analysis, and workspace tools.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&h=450&q=80",
    badge: "12-Mo Free",
    cta: "Claim Google Deal",
    href: "https://gemini.google.com/",
  },
  {
    title: "RunPod Serverless Cloud GPUs",
    desc: "Deploy FLUX, SDXL, and custom LLM inference pipelines on scalable NVIDIA RTX 4090 and H100 GPU clusters.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&h=450&q=80",
    badge: "Instant Setup",
    cta: "Get Cloud GPU",
    href: "https://www.runpod.io/",
  },
  {
    title: "Runway Gen-3 Alpha Studio",
    desc: "High-fidelity text-to-video, camera direction controls, and motion brush synthesis for professional creators.",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&h=450&q=80",
    badge: "Creator Pick",
    cta: "Create Video",
    href: "https://runwayml.com/",
  },
  {
    title: "Perplexity Education Pro",
    desc: "Real-time cited web search, academic paper synthesis, multi-file analysis, and frontier model routing.",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&h=450&q=80",
    badge: "50% Student Off",
    cta: "Unlock Access",
    href: "https://www.perplexity.ai/pro",
  },
  {
    title: "Muse Autonomous Agent",
    desc: "Personal AI agent workflow. Redeem code XC7IQO inside Settings within 48 hours for 1 billion bonus tokens.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&h=450&q=80",
    badge: "1B Token Bonus",
    cta: "Claim 1B Tokens",
    href: "https://muse.ai/join",
  },
  {
    title: "Tripo3D AI Model Generator",
    desc: "Transform single 2D images or text prompts into game-ready 3D meshes with PBR textures and GLTF/FBX export.",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&h=450&q=80",
    badge: "Fast 3D Export",
    cta: "Generate 3D Assets",
    href: "https://www.tripo3d.ai/",
  },
  {
    title: "ElevenLabs Voice Synthesis",
    desc: "Industry-leading human-like voice cloning, multilingual TTS, and sound effects for video and game development.",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&h=450&q=80",
    badge: "10K Free Chars",
    cta: "Synthesize Voice",
    href: "https://elevenlabs.io/",
  },
];

// Verified AI Partner Deals (6 Cards with Authentic Official Brand Logos & Neutral Badges)
const PARTNER_DEALS = [
  {
    id: "google-ai",
    title: "Google AI Pro & Ultra Plans",
    category: "FOUNDATION MODELS",
    badge: "12-Mo Free / 50% Off",
    rating: "4.9",
    desc: "12 months free AI Pro for verified students, plus 50% off the 3-month AI Ultra plan for advanced generative workflows.",
    brandColor: "#1A73E8",
    cta: "Claim Google AI Deal",
    href: "https://gemini.google.com/",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z"/>
        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.13C3.26 21.36 7.33 24 12 24z"/>
        <path fill="#FBBC05" d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.58H1.26C.46 8.18 0 9.99 0 12s.46 3.82 1.26 5.42l4.02-3.13z"/>
        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.26 6.58l4.02 3.13c.95-2.83 3.6-4.96 6.72-4.96z"/>
      </svg>
    ),
  },
  {
    id: "perplexity-pro",
    title: "Perplexity Education Pro",
    category: "AI SEARCH & RESEARCH",
    badge: "$10 / Month",
    rating: "4.9",
    desc: "Academic search, source citations, and file analysis at 50% off ($10/mo down from $20/mo) for verified students.",
    brandColor: "#1FB8CD",
    cta: "Get Student Access",
    href: "https://www.perplexity.ai/pro",
    renderIcon: () => (
      <img src="/brands/perplexity.png" alt="Perplexity AI" className="w-6 h-6 object-contain" />
    ),
  },
  {
    id: "seadance-ai",
    title: "Seadance AI Video Generator",
    category: "AI VIDEO GENERATION",
    badge: "50% Annual Off",
    rating: "4.8",
    desc: "Cinematic video generation with up to 180,000 credits. Yearly billing tiers start from $14.95/month.",
    brandColor: "#06B6D4",
    cta: "Unlock Seadance Deal",
    href: "https://videomakerai.io/seadance",
    renderIcon: () => (
      <img src="/brands/seadance.png" alt="Seadance AI" className="w-6 h-6 object-contain" />
    ),
  },
  {
    id: "muse-agent",
    title: "Muse – Personal AI Agent",
    category: "AUTONOMOUS AI AGENT",
    badge: "1 Billion Tokens",
    rating: "4.8",
    desc: "Redeem referral code XC7IQO inside Settings within 48 hours of joining to unlock 1 billion Muse bonus tokens.",
    brandColor: "#0066FF",
    cta: "Claim 1B Tokens",
    href: "https://muse.ai/join",
    renderIcon: () => (
      <img src="/brands/muse.png" alt="Muse AI" className="w-6 h-6 object-contain" />
    ),
  },
  {
    id: "gemini-argon",
    title: "Google Gemini 4 Argon",
    category: "FLAGSHIP REASONING",
    badge: "1.98B Tokens",
    rating: "5.0",
    desc: "Flagship multi-step reasoning model optimized for deep coding, mathematical proofs, complex document synthesis, and up to 1M token output generation.",
    brandColor: "#1A73E8",
    cta: "Explore Gemini Argon",
    href: "https://ai.google.dev/",
    renderIcon: () => (
      <img src="/brands/gemini.png" alt="Google Gemini" className="w-7 h-7 object-contain" />
    ),
  },
  {
    id: "higgsfield-ai",
    title: "Higgsfield AI Studio",
    category: "AI VIDEO GENERATION",
    badge: "24h Unlimited Free",
    rating: "4.8",
    desc: "Cinematic video generation and camera controls. Toggle the unlimited switch to unlock a 24-hour unlimited generation trial with $0 upfront.",
    brandColor: "#D4FF00",
    cta: "Start Free Trial",
    href: "https://higgsfield.ai/",
    renderIcon: () => (
      <img src="/brands/higgsfield.png" alt="Higgsfield AI" className="w-7 h-7 rounded-lg object-cover" />
    ),
  },
];

// Moneymaking & Creator Apps (4 Cards with Authentic Official Brand Logos & Colors)
const VIRAL_APPS = [
  {
    title: "Freecash Rewards Hub",
    category: "Rewards & Testing",
    badge: "Top Rated",
    rating: "4.9",
    users: "500K+ Users",
    desc: "Complete daily surveys, test new apps, play games, and get instant payouts via PayPal, crypto, or gift cards.",
    brandColor: "#00E785",
    badgeColor: "text-[#00E785] bg-[#00E785]/10 border-[#00E785]/30",
    cta: "Get App & Bonus",
    href: "https://freecash.com/",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
        <rect width="24" height="24" rx="6" fill="#00E785" fillOpacity="0.15" />
        <path d="M7 5h10v3H10.5v3h5.5v3H10.5v5H7V5z" fill="#00E785" />
        <circle cx="17" cy="16.5" r="2.5" fill="#00E785" />
      </svg>
    ),
  },
  {
    title: "Swagbucks Daily Perks",
    category: "Daily Rewards & Spin",
    badge: "Daily Spin",
    rating: "4.8",
    users: "1M+ Users",
    desc: "Earn daily rewards and spin-to-win prizes by completing short polls, web searches, and brand offers.",
    brandColor: "#00AEEF",
    badgeColor: "text-[#00AEEF] bg-[#00AEEF]/10 border-[#00AEEF]/30",
    cta: "Play & Spin Now",
    href: "https://www.swagbucks.com/",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
        <rect width="24" height="24" rx="6" fill="#00AEEF" fillOpacity="0.15" />
        <path d="M8 8.5C8 6.57 9.57 5 11.5 5h1c1.93 0 3.5 1.57 3.5 3.5v1.2a3.5 3.5 0 0 1-2 3.15 3.5 3.5 0 0 1 2 3.15v1.5c0 1.93-1.57 3.5-3.5 3.5h-1C9.57 21 8 19.43 8 17.5v-1" stroke="#00AEEF" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M11 9h2.5M10 17h3.5M10 13h3.5" stroke="#00AEEF" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Binance Web3 Airdrop Hub",
    category: "Crypto & Airdrops",
    badge: "Verified Drop",
    rating: "4.9",
    users: "2M+ Users",
    desc: "Participate in verified decentralized token drops, zero-gas quests, and early ecosystem grant campaigns.",
    brandColor: "#F3BA2F",
    badgeColor: "text-[#F3BA2F] bg-[#F3BA2F]/10 border-[#F3BA2F]/30",
    cta: "Claim Free Tokens",
    href: "https://www.binance.com/",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#F3BA2F">
        <path d="M16.624 13.9202l2.7175 2.7154-7.353 7.353-7.353-7.352 2.7175-2.7164 4.6355 4.6595 4.6356-4.6595zm4.6366-4.6366L24 12l-2.7154 2.7164L18.5682 12l2.6924-2.7164zm-9.273 0l2.7164 2.6924-2.7164 2.7174L9.272 12l2.7154-2.7164zm-9.273 0L5.4095 12l-2.6924 2.6924L0 12l2.7164-2.7164zM11.9897.0102l7.3523 7.3303-2.7174 2.7154-4.6355-4.6355-4.6356 4.6595-2.7174-2.7164L11.9897.0102z" />
      </svg>
    ),
  },
  {
    title: "Toloka AI Micro-Tasks",
    category: "Micro-Tasks & AI",
    badge: "Fast Payout",
    rating: "4.7",
    users: "300K+ Users",
    desc: "Perform quick online micro-tasks including image tagging, content verification, and AI training with direct withdrawals.",
    brandColor: "#FF334B",
    badgeColor: "text-[#FF334B] bg-[#FF334B]/10 border-[#FF334B]/30",
    cta: "Start Micro Tasks",
    href: "https://toloka.ai/",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
        <path d="M12 2L4 6.5v11L12 22l8-4.5v-11L12 2z" stroke="#FF334B" strokeWidth="2" fill="#FF334B" fillOpacity="0.12" />
        <path d="M8 8.5h8M12 8.5v7" stroke="#FF334B" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

// Viral Embedded Videos (YouTube iframes)
const VIRAL_VIDEOS = [
  {
    title: "Prompt Engineering Full Course",
    embedUrl: "https://www.youtube.com/embed/YhRfgYH_AoU?si=rPV1LqNrTkhffLbo",
    tag: "Trending Now",
    desc: "Complete masterclass on prompt engineering, system instructions, and LLM reasoning.",
    cta: "Watch Full Video",
    href: DIRECT_LINKS[1],
  },
  {
    title: "Practical AI Prompting Strategies",
    embedUrl: "https://www.youtube.com/embed/B6d8e3r96gQ?si=dJkPpckswkmd2RPO",
    tag: "Staff Pick",
    desc: "Breakthrough AI workflows, chain-of-thought methods, and real-world prompting tips.",
    cta: "Watch Full Video",
    href: DIRECT_LINKS[2],
  },
  {
    title: "Future-Proof AI Career Skills",
    embedUrl: "https://www.youtube.com/embed/p09yRj47kNM?si=d0D3lJ7mHwII3lUV",
    tag: "High Yield",
    desc: "Essential AI competencies, high-value prompt design, and digital productivity frameworks.",
    cta: "Watch Full Video",
    href: DIRECT_LINKS[0],
  },
  {
    title: "Advanced Prompting & RAG Masterclass",
    embedUrl: "https://www.youtube.com/embed/n287tR0dHHs?si=oureukUiSbH0uc9Y",
    tag: "Top Tutorial",
    desc: "Deep-dive showcase on structuring multi-modal prompts, automated pipelines, and agent workflows.",
    cta: "Watch Full Video",
    href: DIRECT_LINKS[1],
  },
];

// Quick Access Perks (Fixed: NO EMOJIS)
const QUICK_PERKS = [
  {
    title: "$25 Instant Welcome Bonus",
    badge: "Instant Cashout",
    icon: Gift,
    desc: "Create a free verified account to claim your starter credit balance immediately.",
    cta: "Claim $25 Bonus",
    href: DIRECT_LINKS[2],
  },
  {
    title: "VIP All-Access Pass",
    badge: "Priority Access",
    icon: Key,
    desc: "Bypass standard queues and get direct access to premium AI models and prompt packs.",
    cta: "Unlock VIP Pass",
    href: DIRECT_LINKS[0],
  },
  {
    title: "Secret 800+ AI Prompt Vault",
    badge: "Master Vault",
    icon: Sparkles,
    desc: "Complete commercial bundle covering cinematic lighting, photorealism, and UI kits.",
    cta: "Open Prompt Vault",
    href: DIRECT_LINKS[1],
  },
  {
    title: "High-Yield Earning Portal",
    badge: "Automated Earning",
    icon: TrendingUp,
    desc: "Instant access to traffic monetization tools, creator deals, and revenue-share platforms.",
    cta: "Launch Portal",
    href: DIRECT_LINKS[2],
  },
];

// FAQ Items (Full Transparency & Legal/Compliance Protection)
const FAQS = [
  {
    q: "What kind of links and offers are featured on this page?",
    a: "This page showcases a curated mix of AI tools, educational resources, and third-party sponsored advertisements/affiliate deals powered by external ad networks (such as Monetag and Adsterra). Some outbound links route through promotional advertising gateways before arriving at destination offers.",
  },
  {
    q: "Does proCraft guarantee the destinations or claims of third-party links?",
    a: "No. As explicitly stated in our Ad Disclaimer, we do NOT guarantee that clicking any button or link will take you to the original product page. Promotional terms, trial credits, and software claims are controlled entirely by external third parties. proCraft assumes no liability for third-party websites or services.",
  },
  {
    q: "How can I protect my personal data when browsing external offers?",
    a: "We strongly advise exercising standard digital diligence: always verify the destination domain in your browser address bar, and never enter financial details, credit card numbers, passwords, or sensitive personal data on unfamiliar third-party websites without independent verification.",
  },
  {
    q: "Why does proCraft feature sponsored ads and partner links?",
    a: "Sponsorships and ad networks enable us to maintain, curate, and provide our 800+ Midjourney, FLUX, and ChatGPT prompt database 100% free of charge to creators worldwide without charging subscription fees or locking resources behind a paywall.",
  },
  {
    q: "Are popunder ads or vignette screens controlled by proCraft?",
    a: "No. Advertising scripts on this page may trigger on-click popunder windows or interstitial sponsor pages served dynamically by certified third-party ad networks. proCraft does not host or distribute third-party executable software.",
  },
  {
    q: "What should I do if I encounter an inappropriate, broken, or suspicious ad?",
    a: "We actively monitor user safety. If an external ad redirects to suspicious content or causes an inconvenience, please reach out via our Contact page with details. We promptly review and blacklist problematic ad placements.",
  },
  {
    q: "How can a verified AI tool or startup advertise directly with proCraft?",
    a: "If you represent an AI company or creative software and wish to book a direct, transparent sponsorship banner or featured deal without ad network intermediaries, reach out directly via our Contact page.",
  },
];

export default function AdsLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [clickedButtons, setClickedButtons] = useState<Record<string, boolean>>({});

  // 1st click -> Monetag Ad Direct Link in new tab; 2nd click -> Original Link
  const handleButtonClick = (e: React.MouseEvent, id: string, originalUrl?: string) => {
    const isClicked = clickedButtons[id] || (typeof window !== 'undefined' && sessionStorage.getItem(`ads_click_${id}`) === '1');
    if (!isClicked) {
      e.preventDefault();
      setClickedButtons(prev => ({ ...prev, [id]: true }));
      try {
        sessionStorage.setItem(`ads_click_${id}`, '1');
      } catch (_) {}
      const adUrl = getDirectLink();
      window.open(adUrl, '_blank', 'noopener,noreferrer');
    }
    // 2nd click: natural <a href={originalUrl} target="_blank"> handles opening original link
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      {/* ── Advertisement Page: High-Intent Deals & Direct Monetization ──
          Popunder/Vignette hijacking scripts (tag.min.js) are completely removed
          so that navigation links, hamburger menu, and pages remain 100% ad-free & smooth.
          Monetization is cleanly driven via verified deal links and display banners. ── */}

      <style jsx global>{`
        /* =========================================================
           proCraft Theme Font & 3D Black Button Styles
           ========================================================= */
        .ads-wrap,
        .ads-wrap * {
          font-family: "Bricolage Grotesque", var(--font-bricolage), sans-serif !important;
        }

        .ads-wrap {
          max-width: 1180px;
          margin: 0 auto;
          padding: 32px 16px 80px;
          font-family: "Bricolage Grotesque", var(--font-bricolage), sans-serif !important;
        }

        .ads-hero {
          display: grid;
          grid-template-columns: 1.2fr .8fr;
          gap: 40px;
          align-items: center;
          padding: 32px 0 24px;
        }
        @media(max-width: 880px) {
          .ads-hero {
            grid-template-columns: 1fr;
            padding-top: 16px;
          }
        }

        .ads-h1 {
          font-family: "Bricolage Grotesque", var(--font-bricolage), sans-serif !important;
          font-size: clamp(2rem, 5vw, 3.4rem);
          line-height: 1.08;
          font-weight: 800;
          letter-spacing: -.03em;
        }

        .ads-hero p {
          margin-top: 16px;
          font-size: 1.1rem;
          line-height: 1.6;
          opacity: 0.8;
        }

        .ads-cta {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 28px;
          align-items: center;
        }

        .ads-ghost {
          font-family: "Bricolage Grotesque", var(--font-bricolage), sans-serif !important;
          font-weight: 700;
          font-size: .95rem;
          text-decoration: none;
          padding: 14px 24px;
          border: 1.5px solid currentColor;
          opacity: 0.8;
          border-radius: 16px;
          transition: all .15s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .ads-ghost:hover {
          opacity: 1;
          transform: translateY(-2px);
        }

        .ads-trust {
          list-style: none;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 8px 22px;
          margin-top: 24px;
          font-size: .92rem;
          opacity: 0.75;
        }
        .ads-trust li {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ads-trust li:before {
          content: "";
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: currentColor;
        }

        .ads-hero-art {
          position: relative;
          aspect-ratio: 1/1;
          max-width: 380px;
          width: 100%;
          justify-self: center;
          border-radius: 28px;
          padding: 32px;
          display: flex;
          align-items: flex-end;
        }
        .ads-bars {
          display: flex;
          align-items: flex-end;
          gap: 12px;
          width: 100%;
          height: 100%;
        }
        .ads-bars i {
          flex: 1;
          border-radius: 10px 10px 4px 4px;
          transform-origin: bottom;
          animation: adsGrow .9s cubic-bezier(.2,.8,.2,1) both;
        }
        @keyframes adsGrow {
          from { transform: scaleY(0); }
        }

        .ads-chip {
          position: absolute;
          font-family: "Bricolage Grotesque", var(--font-bricolage), sans-serif !important;
          font-size: .8rem;
          font-weight: 700;
          padding: 8px 16px;
          border-radius: 999px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }
        .ads-c1 { top: 20px; left: -14px; }
        .ads-c2 { top: 48%; right: -14px; }
        @media(max-width: 480px) {
          .ads-c1 { left: 8px; }
          .ads-c2 { right: 8px; }
        }

        .ads-section {
          margin-top: 60px;
        }
        .ads-h2 {
          font-family: "Bricolage Grotesque", var(--font-bricolage), sans-serif !important;
          font-size: 1.55rem;
          font-weight: 800;
          margin-bottom: 6px;
          letter-spacing: -.02em;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .ads-sub {
          margin-bottom: 22px;
          font-size: .95rem;
          opacity: 0.75;
          font-family: "Bricolage Grotesque", var(--font-bricolage), sans-serif !important;
        }

        /* 4 Col Desktop, 2 Col Tablet, 1 Col Mobile */
        .ads-grid {
          display: grid;
          gap: 18px;
          grid-template-columns: repeat(4, 1fr);
        }
        @media(max-width: 980px) {
          .ads-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media(max-width: 560px) {
          .ads-grid { grid-template-columns: 1fr; }
        }

        .ads-card {
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform .2s ease, border-color .2s ease;
        }
        .ads-card:hover {
          transform: translateY(-4px);
        }

        .ads-frame {
          aspect-ratio: 4/3;
          position: relative;
          background: rgba(120, 120, 120, 0.08);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ads-frame img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .35s ease;
        }
        .ads-card:hover .ads-frame img {
          transform: scale(1.06);
        }
        .ads-card-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: rgba(17, 19, 24, 0.88);
          color: #ffffff;
          font-family: "Bricolage Grotesque", var(--font-bricolage), sans-serif !important;
          font-size: .72rem;
          font-weight: 700;
          letter-spacing: .03em;
          padding: 4px 10px;
          border-radius: 999px;
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          z-index: 2;
        }

        .ads-body {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }
        .ads-body h3 {
          font-family: "Bricolage Grotesque", var(--font-bricolage), sans-serif !important;
          font-size: 1rem;
          font-weight: 700;
          line-height: 1.35;
        }
        .ads-desc {
          font-size: .83rem;
          line-height: 1.5;
          opacity: 0.75;
          margin-bottom: 4px;
          font-family: "Bricolage Grotesque", var(--font-bricolage), sans-serif !important;
        }

        /* =========================================================
           Uiverse 2-Layer Black Button Architecture
           Outer: relative cursor-pointer opacity-90 hover:opacity-100 p-[2px] bg-black rounded-[16px] bg-gradient-to-t from-[#141517] to-[#3e414c] active:scale-95
           Inner: w-full h-full flex items-center justify-center gap-2 px-6 py-3 bg-[#0A0A0A] text-white rounded-[14px] bg-gradient-to-t from-[#0b0c0e] to-[#1a1b1f]
           ========================================================= */
        a.ads-btn, a.ads-btn-big {
          position: relative;
          cursor: pointer;
          opacity: 0.92;
          transition: opacity 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
          padding: 2px !important;
          border-radius: 16px;
          background: linear-gradient(to top, #1b1a1b, #454244);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          border: 0;
          user-select: none;
          color: #ffffff !important;
        }
        a.ads-btn:hover, a.ads-btn-big:hover {
          opacity: 1;
          background: linear-gradient(to top, #232122, #555254);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
          color: #ffffff !important;
        }
        a.ads-btn:active, a.ads-btn-big:active {
          transform: scale(0.95);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
        }

        .ads-btn-inner {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 11px 22px;
          background: #2D2B2C !important;
          color: #ffffff !important;
          border-radius: 14px;
          font-family: "Bricolage Grotesque", var(--font-bricolage), sans-serif !important;
          font-weight: 700;
          font-size: 0.88rem;
          letter-spacing: -0.01em;
          transition: background 0.15s ease;
        }
        a.ads-btn-big .ads-btn-inner {
          padding: 14px 28px;
          font-size: 0.95rem;
        }
        a.ads-btn:hover .ads-btn-inner, a.ads-btn-big:hover .ads-btn-inner {
          background: #383536 !important;
          color: #ffffff !important;
        }

        .ads-card a.ads-btn {
          margin-top: auto;
          width: 100%;
        }

        /* 3 Col Grid for Partner Deals */
        .ads-grid-3 {
          display: grid;
          gap: 18px;
          grid-template-columns: repeat(3, 1fr);
        }
        @media(max-width: 900px) {
          .ads-grid-3 { grid-template-columns: 1fr; }
        }

        /* Viral Videos */
        .ads-rows {
          display: grid;
          gap: 12px;
        }
        .ads-row {
          display: flex;
          align-items: center;
          gap: 16px;
          border-radius: 16px;
          padding: 16px 20px;
          text-decoration: none;
          color: inherit;
          transition: transform .15s ease, border-color .15s ease;
        }
        .ads-row:hover {
          transform: translateX(4px);
        }
        .ads-play {
          flex: none;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          transition: transform .2s ease;
        }
        .ads-row:hover .ads-play {
          transform: scale(1.08);
        }

        /* FAQ Accordion Styling */
        .ads-faq-item {
          border-radius: 16px;
          overflow: hidden;
          transition: all .2s ease;
        }
        .ads-faq-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 22px;
          text-align: left;
          font-family: "Bricolage Grotesque", var(--font-bricolage), sans-serif !important;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          background: transparent;
          border: none;
          color: inherit;
        }
        .ads-faq-content {
          padding: 0 22px 20px;
          font-size: .93rem;
          line-height: 1.6;
          opacity: 0.8;
          font-family: "Bricolage Grotesque", var(--font-bricolage), sans-serif !important;
        }

        @media(prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <main
        className="min-h-screen bg-[#FCFCFC] dark:bg-[#0A0A0A] text-[#111318] dark:text-white pt-24 pb-20"
        style={{ fontFamily: '"Bricolage Grotesque", var(--font-bricolage), sans-serif' }}
      >
        <div className="ads-wrap">

          {/* ── 1. Hero Section ── */}
          <header className="ads-hero">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-black/5 dark:bg-white/10 mb-4 border border-black/10 dark:border-white/10">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Curated Partner Hub & Trending Deals</span>
              </div>
              <h1 className="ads-h1">TURN ADVERTISING INTO PROFITABLE BUSINESS GROWTH</h1>
              <p>Discover today&apos;s trending creator offers, high-yield reward apps, and viral videos in one place. Some links are sponsored ads.</p>
              <div className="ads-cta">
                <a
                  className="ads-btn-big ads-btn"
                  href={DIRECT_LINKS[0]}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  onClick={(e) => {
                    const direct = getNextDirectLink();
                    e.currentTarget.href = direct;
                  }}
                >
                  <span className="ads-btn-inner">
                    <span>Start Growing Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </a>
                <a className="ads-ghost" href="#featured">
                  <span>Browse Offers</span>
                </a>
              </div>
              <ul className="ads-trust">
                <li>Fresh picks daily</li>
                <li>Free to browse</li>
                <li>Sponsored links marked</li>
              </ul>
            </div>

            {/* Growth Art Visual */}
            <div className="ads-hero-art bg-white dark:bg-[#111111] border border-black/10 dark:border-white/10 shadow-lg">
              <div className="ads-bars">
                <i className="bg-black/20 dark:bg-white/20" style={{ height: "32%" }}></i>
                <i className="bg-black/30 dark:bg-white/30" style={{ height: "48%", animationDelay: "0.08s" }}></i>
                <i className="bg-black/40 dark:bg-white/40" style={{ height: "44%", animationDelay: "0.16s" }}></i>
                <i className="bg-black/60 dark:bg-white/60" style={{ height: "68%", animationDelay: "0.24s" }}></i>
                <i className="bg-black/80 dark:bg-white/80" style={{ height: "86%", animationDelay: "0.32s" }}></i>
                <i className="bg-black dark:bg-white" style={{ height: "100%", animationDelay: "0.40s" }}></i>
              </div>
              <div className="ads-chip ads-c1 bg-black text-white dark:bg-white dark:text-black">
                +248% reach
              </div>
              <div className="ads-chip ads-c2 bg-white text-black dark:bg-[#111111] dark:text-white border border-black/10 dark:border-white/15">
                Trending now
              </div>
            </div>
          </header>



          {/* ── 4. Section: Featured 8 Cards (Unsplash Photos + 3D Black Buttons) ── */}
          <section id="featured" className="ads-section">
            <h2 className="ads-h2 font-['var(--font-bricolage)'] font-extrabold">
              <Sparkles className="w-5 h-5" />
              <span>Featured Picks & Viral Offers</span>
            </h2>
            <p className="ads-sub font-['var(--font-bricolage)']">Click the button under a card to claim the verified offer in a new tab.</p>
            <div className="ads-grid">
              {FEATURED_CARDS.map((c, idx) => (
                <article
                  key={idx}
                  className="ads-card bg-white dark:bg-[#111111] border border-black/10 dark:border-white/10 shadow-md hover:border-black/30 dark:hover:border-white/25"
                >
                  <div className="ads-frame">
                    <img src={c.image} alt={c.title} loading="lazy" />
                    <span className="ads-card-badge font-['var(--font-bricolage)'] font-bold">{c.badge}</span>
                  </div>
                  <div className="ads-body">
                    <h3 className="font-['var(--font-bricolage)'] font-bold">{c.title}</h3>
                    <p className="ads-desc font-['var(--font-bricolage)']">{c.desc}</p>
                    <TwoClickLink
                      className="ads-btn font-['var(--font-bricolage)'] font-bold"
                      originalHref={c.href}
                      originalTarget="_blank"
                    >
                      <span className="ads-btn-inner">
                        <span>{c.cta || "Open Link"}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </span>
                    </TwoClickLink>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* ── 5. ADSTERRA BANNER #1 (Responsive 728x90 Desktop / 320x50 Mobile) ── */}
          <div className="my-14 py-4 px-2 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/10">
            <AdsterraResponsiveBanner showLabel={true} />
          </div>

          {/* ── 6. Section: Verified AI Partner Deals (6 Rich Cards) ── */}
          <section className="ads-section">
            <h2 className="ads-h2 font-['var(--font-bricolage)'] font-extrabold">
              <Cpu className="w-5 h-5" />
              <span>Verified AI Partner Deals</span>
            </h2>
            <p className="ads-sub font-['var(--font-bricolage)']">Hand-tested developer infrastructure, creative suites, and generative AI perks.</p>
            <div className="ads-grid-3">
              {PARTNER_DEALS.map((deal, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white dark:bg-[#111111] border border-black/10 dark:border-white/10 shadow-sm flex flex-col justify-between hover:border-black/30 dark:hover:border-white/30 transition-all hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center shadow-sm border p-1.5 overflow-hidden"
                        style={{
                          backgroundColor: `${deal.brandColor}15`,
                          borderColor: `${deal.brandColor}35`,
                        }}
                      >
                        {deal.renderIcon()}
                      </div>
                      {/* Badge */}
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-neutral-800/90 text-neutral-300 border border-neutral-700/70 tracking-wide font-['var(--font-bricolage)']">
                        {deal.badge}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-1.5 font-['var(--font-bricolage)']">
                      <span className="text-xs uppercase tracking-wider opacity-60 font-bold font-['var(--font-bricolage)']">
                        {deal.category}
                      </span>
                      <span className="text-xs font-bold flex items-center gap-0.5 opacity-80">
                        <Star className="w-3 h-3 fill-current text-amber-500" /> {deal.rating}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-base text-black dark:text-white font-['var(--font-bricolage)'] mb-2 tracking-tight">
                      {deal.title}
                    </h3>
                    <p className="text-xs opacity-75 text-black dark:text-white leading-relaxed mb-6 font-['var(--font-bricolage)']">
                      {deal.desc}
                    </p>
                  </div>
                  <TwoClickLink
                    originalHref={deal.href}
                    originalTarget="_blank"
                    className="ads-btn w-full font-['var(--font-bricolage)'] font-bold"
                  >
                    <span className="ads-btn-inner">
                      <span>{deal.cta}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </TwoClickLink>
                </div>
              ))}
            </div>
          </section>

          {/* ── 7. Section: Moneymaking & Creator Apps (Fixed: Polished Cards with Real Icons & 3D Buttons) ── */}
          <section className="ads-section">
            <h2 className="ads-h2 font-['var(--font-bricolage)'] font-extrabold">
              <Smartphone className="w-5 h-5" />
              <span>Moneymaking & Creator Apps</span>
            </h2>
            <p className="ads-sub font-['var(--font-bricolage)']">Trending verified rewards applications, micro-task platforms, and digital tools.</p>
            <div className="ads-grid">
              {VIRAL_APPS.map((app, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white dark:bg-[#111111] border border-black/10 dark:border-white/10 shadow-sm flex flex-col justify-between hover:border-black/30 dark:hover:border-white/30 transition-all hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md flex-none border"
                        style={{
                          backgroundColor: `${app.brandColor}18`,
                          borderColor: `${app.brandColor}35`,
                        }}
                      >
                        {app.renderIcon()}
                      </div>
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border font-['var(--font-bricolage)'] ${app.badgeColor}`}>
                        {app.badge}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-1.5 font-['var(--font-bricolage)']">
                      <span className="text-[11px] uppercase tracking-wider opacity-60 font-bold">
                        {app.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-base font-['var(--font-bricolage)'] mb-1 text-black dark:text-white">
                      {app.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs opacity-80 mb-2.5 font-['var(--font-bricolage)']">
                      <span className="flex items-center gap-1 font-bold">
                        <Star className="w-3 h-3 fill-current text-amber-500" /> {app.rating}
                      </span>
                      <span>•</span>
                      <span className="font-medium">{app.users}</span>
                    </div>
                    <p className="text-xs opacity-75 text-black dark:text-white leading-relaxed mb-5 font-['var(--font-bricolage)']">
                      {app.desc}
                    </p>
                  </div>
                  <TwoClickLink
                    originalHref={app.href}
                    originalTarget="_blank"
                    className="ads-btn w-full font-['var(--font-bricolage)'] font-bold"
                  >
                    <span className="ads-btn-inner">
                      <span>{app.cta}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </TwoClickLink>
                </div>
              ))}
            </div>
          </section>

          {/* ── 8. Section: Viral Videos (Embedded Players) ── */}
          <section className="ads-section">
            <h2 className="ads-h2">
              <Play className="w-5 h-5 fill-current" />
              <span>Viral Video Showcase</span>
            </h2>
            <p className="ads-sub">Watch trending creator masterclasses and AI breakthroughs directly on-page.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {VIRAL_VIDEOS.map((v, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-[#111111] border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm flex flex-col hover:border-black/30 dark:hover:border-white/30 transition-all"
                >
                  <div className="relative w-full aspect-video bg-black overflow-hidden">
                    <iframe
                      className="w-full h-full"
                      src={v.embedUrl}
                      title={v.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-1 gap-3">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="font-bold text-base text-black dark:text-white font-['var(--font-bricolage)']">
                          {v.title}
                        </h3>
                        <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-black dark:text-white border border-black/10 dark:border-white/15 flex-none">
                          {v.tag}
                        </span>
                      </div>
                      <p className="text-xs text-black/70 dark:text-white/70 leading-relaxed">
                        {v.desc}
                      </p>
                    </div>
                    <TwoClickLink
                      originalHref={v.href}
                      originalTarget="_blank"
                      className="ads-btn w-full"
                    >
                      <span className="ads-btn-inner">
                        <span>{v.cta}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </span>
                    </TwoClickLink>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 9. Section: Instant Bonus & VIP Access Perks (Fixed "Expose Viral Link" -> Voucher Cards) ── */}
          <section className="ads-section">
            <h2 className="ads-h2 font-['var(--font-bricolage)'] font-extrabold text-neutral-900 dark:text-white">
              <Gift className="w-5 h-5 text-accent" />
              <span>Instant Bonus & VIP Perks</span>
            </h2>
            <p className="ads-sub text-neutral-600 dark:text-neutral-400">High-priority access tokens, starter credits, and commercial master downloads.</p>
            <div className="ads-grid">
              {QUICK_PERKS.map((perk, idx) => {
                const IconComponent = perk.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white dark:bg-[#111111] border border-black/10 dark:border-white/10 shadow-sm flex flex-col justify-between hover:border-black/30 dark:hover:border-white/30 transition-all hover:-translate-y-1"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center shadow-sm">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-neutral-800 dark:text-neutral-200 border border-black/10 dark:border-white/15">
                          {perk.badge}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm md:text-base text-neutral-900 dark:text-white font-['var(--font-bricolage)'] mb-1 leading-snug">
                        {perk.title}
                      </h3>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-5 font-normal">
                        {perk.desc}
                      </p>
                    </div>
                    <TwoClickLink
                      originalHref={perk.href}
                      originalTarget="_blank"
                      className="ads-btn w-full text-xs"
                    >
                      <span className="ads-btn-inner">
                        <span>{perk.cta}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </TwoClickLink>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── 10. ADSTERRA BANNER #2 (Responsive 728x90 Desktop / 320x50 Mobile) ── */}
          <div className="my-14 py-4 px-2 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/10">
            <AdsterraResponsiveBanner showLabel={true} />
          </div>

          {/* ── 11. FAQ Section ("fqr add koro last er dibe") ── */}
          <section className="ads-section">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-bold tracking-widest uppercase opacity-60 font-['var(--font-bricolage)']">
                Transparency & Safe Browsing
              </span>
              <h2 className="ads-h2 justify-center mt-1 font-['var(--font-bricolage)'] font-extrabold">
                <HelpCircle className="w-5 h-5" />
                <span>Frequently Asked Questions</span>
              </h2>
              <p className="ads-sub mt-2 mb-0 font-['var(--font-bricolage)']">
                Full transparency regarding sponsored links, partner offers, and safe link browsing.
              </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="ads-faq-item bg-white dark:bg-[#111111] border border-black/10 dark:border-white/10 shadow-sm"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="ads-faq-btn font-['var(--font-bricolage)'] font-bold"
                      aria-expanded={isOpen}
                    >
                      <span className="pr-4">{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 flex-none transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="faq-answer ads-faq-content text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── 12. Noticeable Ad Disclaimer ── */}
          <aside className="mt-16 rounded-2xl p-6 md:p-8 bg-white dark:bg-[#131416] border-2 border-black/20 dark:border-white/20 border-l-[8px] border-l-black dark:border-l-white shadow-xl">
            {/* Header with High-Contrast '!' and Title */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center flex-none shadow-md font-black text-2xl">
                !
              </div>
              <div>
                <h3 className="font-extrabold text-2xl md:text-3xl text-black dark:text-white font-['var(--font-bricolage)'] tracking-tight leading-tight">
                  Ad Disclaimer
                </h3>
              </div>
            </div>

            {/* Key Notice Highlight Callout Box */}
            <div className="my-5 p-4 md:p-5 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/15 dark:border-white/20 flex items-start gap-3.5">
              <div className="w-6 h-6 rounded-lg bg-black text-white dark:bg-white dark:text-black flex items-center justify-center flex-none font-extrabold text-xs mt-0.5">
                !
              </div>
              <div className="text-sm md:text-base font-bold text-neutral-900 dark:text-white leading-relaxed">
                We do NOT guarantee that clicking any button or link will take you to the original page.
              </div>
            </div>

            {/* Explanatory & Apology Paragraphs */}
            <div className="ad-disclaimer-body space-y-3 my-5 text-sm md:text-base text-neutral-800 dark:text-neutral-200 leading-relaxed font-normal">
              <p>
                This page contains sponsored advertisements and affiliate links. Ad content is controlled by third parties.
              </p>
              <p>
                If this causes any inconvenience or annoyance, we sincerely apologize. Please verify any link before entering money, passwords or personal information.
              </p>
            </div>

            {/* Bottom Footnote */}
            <div className="ad-disclaimer-footnote pt-4 border-t border-black/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-600 dark:text-neutral-400">
              <span>proCraft Transparency Notice</span>
            </div>
          </aside>

        </div>
      </main>
    </>
  );
}