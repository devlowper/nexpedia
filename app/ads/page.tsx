"use client";

import React, { useState, useEffect } from "react";
import Script from "next/script";

// Configurable Monetag Direct Link
const MONETAG = "https://uplcm.com/4/12127029";

const CARDS = [
  { title: "Card 1", src: "https://procraft.site/prompt-library", href: MONETAG },
  { title: "Card 2", src: "about:blank", href: MONETAG },
  { title: "Card 3", src: "about:blank", href: MONETAG },
  { title: "Card 4", src: "about:blank", href: MONETAG },
  { title: "Card 5", src: "about:blank", href: MONETAG },
  { title: "Card 6", src: "about:blank", href: MONETAG },
  { title: "Card 7", src: "about:blank", href: MONETAG },
  { title: "Card 8", src: "about:blank", href: MONETAG },
];

const VIDEOS = [
  { title: "Viral Video 1", note: "Trending now", href: MONETAG },
  { title: "Viral Video 2", note: "Trending now", href: MONETAG },
  { title: "Viral Video 3", note: "Trending now", href: MONETAG },
  { title: "Viral Video 4", note: "Trending now", href: MONETAG },
];

const APPS = [
  { title: "App 1", note: "Earning app", href: MONETAG },
  { title: "App 2", note: "Earning app", href: MONETAG },
  { title: "App 3", note: "Earning app", href: MONETAG },
  { title: "App 4", note: "Earning app", href: MONETAG },
];

const EXPOSE = [
  { title: "Expose Link 1", href: MONETAG },
  { title: "Expose Link 2", href: MONETAG },
  { title: "Expose Link 3", href: MONETAG },
  { title: "Expose Link 4", href: MONETAG },
];

export default function AdsLandingPage() {
  return (
    <>
      {/* ── Official Monetag Ad Scripts ── */}
      <Script
        id="monetag-zone-12134819"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(s){s.dataset.zone='12134819',s.src='https://n6wxm.com/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`
        }}
      />
      <Script
        id="monetag-zone-12127704"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(s){s.dataset.zone='12127704',s.src='https://nap5k.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`
        }}
      />
      <Script
        id="monetag-zone-12127660"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(s){s.dataset.zone='12127660',s.src='https://nap5k.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`
        }}
      />
      <Script
        id="monetag-zone-12127030"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(s){s.dataset.zone='12127030',s.src='https://al5sm.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`
        }}
      />

      <style jsx global>{`
        /* =========================================================
           proCraft Theme & 3D Black Button Styles
           ========================================================= */
        .ads-wrap {
          max-width: 1180px;
          margin: 0 auto;
          padding: 32px 16px 80px;
        }

        .ads-hero {
          display: grid;
          grid-template-columns: 1.2fr .8fr;
          gap: 40px;
          align-items: center;
          padding: 48px 0 24px;
        }
        @media(max-width: 880px) {
          .ads-hero {
            grid-template-columns: 1fr;
            padding-top: 24px;
          }
        }

        .ads-h1 {
          font-family: var(--font-bricolage), "Sora", sans-serif;
          font-size: clamp(2rem, 5.2vw, 3.5rem);
          line-height: 1.1;
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
          font-family: var(--font-bricolage), "Sora", sans-serif;
          font-weight: 700;
          font-size: .95rem;
          text-decoration: none;
          padding: 14px 24px;
          border: 1.5px solid currentColor;
          opacity: 0.8;
          border-radius: 16px;
          transition: all .15s ease;
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
          font: 700 .8rem var(--font-bricolage), "Sora", sans-serif;
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
          font-family: var(--font-bricolage), "Sora", sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 6px;
          letter-spacing: -.02em;
        }
        .ads-sub {
          margin-bottom: 22px;
          font-size: .95rem;
          opacity: 0.75;
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
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ads-frame iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }

        .ads-body {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex: 1;
        }
        .ads-body h3 {
          font-family: var(--font-bricolage), "Sora", sans-serif;
          font-size: 1rem;
          font-weight: 700;
        }

        /* 3D Black Button (Uiverse.io inspired) */
        a.ads-btn, .ads-expose a.ads-btn, a.ads-btn-big {
          position: relative;
          background: linear-gradient(to top, #0f1012, #212429);
          color: #ffffff !important;
          border: 0;
          border-radius: 16px;
          padding: 13px 26px;
          font-family: var(--font-bricolage), "Sora", sans-serif;
          font-weight: 700;
          font-size: .9rem;
          text-decoration: none;
          opacity: .96;
          box-shadow: 0 0 0 1.5px rgba(255, 255, 255, .15), inset 0 2px 0 rgba(255, 255, 255, .25), 0 6px 0 #000000, 0 12px 20px -4px rgba(0, 0, 0, .5);
          transform: translateY(0);
          transition: transform .12s ease, box-shadow .12s ease, opacity .15s ease;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          text-align: center;
        }
        a.ads-btn:hover, .ads-expose a.ads-btn:hover, a.ads-btn-big:hover {
          background: linear-gradient(to top, #16181c, #2c3038);
          color: #ffffff !important;
          opacity: 1;
          transform: translateY(-2px);
          box-shadow: 0 0 0 1.5px rgba(255, 255, 255, .25), inset 0 2px 0 rgba(255, 255, 255, .35), 0 8px 0 #000000, 0 16px 24px -4px rgba(0, 0, 0, .6);
        }
        a.ads-btn:active, .ads-expose a.ads-btn:active, a.ads-btn-big:active {
          transform: translateY(5px);
          box-shadow: 0 0 0 1.5px rgba(255, 255, 255, .15), inset 0 1px 0 rgba(255, 255, 255, .15), 0 1px 0 #000000, 0 4px 8px -2px rgba(0, 0, 0, .4);
        }
        .ads-card a.ads-btn {
          margin-top: auto;
          width: 100%;
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
          width: 42px;
          height: 42px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          transition: transform .2s ease;
        }
        .ads-row:hover .ads-play {
          transform: scale(1.08);
        }

        /* Apps */
        .ads-apps {
          display: grid;
          gap: 14px;
          grid-template-columns: repeat(4, 1fr);
        }
        @media(max-width: 980px) {
          .ads-apps { grid-template-columns: repeat(2, 1fr); }
        }
        @media(max-width: 480px) {
          .ads-apps { grid-template-columns: 1fr; }
        }
        .ads-app {
          border-radius: 18px;
          padding: 18px;
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          gap: 6px;
          transition: transform .15s ease, border-color .15s ease;
        }
        .ads-app:hover {
          transform: translateY(-3px);
        }
        .ads-ico {
          width: 46px;
          height: 46px;
          border-radius: 14px;
          display: grid;
          place-items: center;
          font-family: var(--font-bricolage), "Sora", sans-serif;
          font-weight: 800;
          font-size: 1.2rem;
        }

        /* Expose Buttons */
        .ads-expose {
          display: grid;
          gap: 16px;
          grid-template-columns: repeat(4, 1fr);
        }
        @media(max-width: 980px) {
          .ads-expose { grid-template-columns: repeat(2, 1fr); }
        }
        @media(max-width: 480px) {
          .ads-expose { grid-template-columns: 1fr; }
        }
        .ads-expose a.ads-btn {
          margin: 0;
          padding: 18px 24px;
          font-size: 1rem;
          width: 100%;
        }

        /* Disclaimer */
        .ads-disc {
          margin-top: 64px;
          border-radius: 18px;
          padding: 26px 28px;
          font-size: .95rem;
        }
        .ads-disc-head {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 14px;
        }
        .ads-disc-ico {
          flex: none;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          font-family: var(--font-bricolage), "Sora", sans-serif;
          font-weight: 800;
          font-size: 1.25rem;
        }
        .ads-disc .key {
          font-weight: 700;
          padding: 12px 16px;
          border-radius: 12px;
          margin-bottom: 12px;
        }

        @media(prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <main className="min-h-screen bg-[#FCFCFC] dark:bg-[#0A0A0A] text-[#111318] dark:text-white pt-24 pb-20">
        <div className="ads-wrap">
          {/* Hero Section */}
          <header className="ads-hero">
            <div>
              <h1 className="ads-h1">TURN ADVERTISING INTO PROFITABLE BUSINESS GROWTH</h1>
              <p>Discover today&apos;s trending offers, viral videos and money-making apps in one place. Some links are sponsored ads.</p>
              <div className="ads-cta">
                <a
                  className="ads-btn-big ads-btn"
                  href={MONETAG}
                  target="_blank"
                  rel="noopener sponsored"
                >
                  Start Growing Now
                </a>
                <a className="ads-ghost" href="#featured">
                  Browse Offers
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

          {/* Section: Featured */}
          <section id="featured" className="ads-section">
            <h2 className="ads-h2">Featured</h2>
            <p className="ads-sub">Click the button under a card to open the link in a new tab.</p>
            <div className="ads-grid">
              {CARDS.map((c, idx) => (
                <article
                  key={idx}
                  className="ads-card bg-white dark:bg-[#111111] border border-black/10 dark:border-white/10 shadow-md hover:border-black/30 dark:hover:border-white/25"
                >
                  <div className="ads-frame">
                    <iframe
                      src={c.src}
                      title={c.title}
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="ads-body">
                    <h3>{c.title}</h3>
                    <a
                      className="ads-btn"
                      href={c.href}
                      target="_blank"
                      rel="noopener sponsored"
                    >
                      Open Link
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Section: Viral Video Link */}
          <section className="ads-section">
            <h2 className="ads-h2">Viral Video Link</h2>
            <p className="ads-sub">The videos everyone is talking about right now.</p>
            <div className="ads-rows">
              {VIDEOS.map((v, idx) => (
                <a
                  key={idx}
                  className="ads-row bg-white dark:bg-[#111111] border border-black/10 dark:border-white/10 shadow-sm hover:border-black/30 dark:hover:border-white/25"
                  href={v.href}
                  target="_blank"
                  rel="noopener sponsored"
                >
                  <span className="ads-play bg-black text-white dark:bg-white dark:text-black">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="6 4 20 12 6 20 6 4" />
                    </svg>
                  </span>
                  <div>
                    <b className="text-base">{v.title}</b>
                    <span className="block text-xs opacity-70 mt-0.5">{v.note}</span>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Section: Moneymaking Viral Apps */}
          <section className="ads-section">
            <h2 className="ads-h2">Moneymaking Viral Apps</h2>
            <p className="ads-sub">Trending app picks. Please verify before using any app.</p>
            <div className="ads-apps">
              {APPS.map((a, idx) => (
                <a
                  key={idx}
                  className="ads-app bg-white dark:bg-[#111111] border border-black/10 dark:border-white/10 shadow-sm hover:border-black/30 dark:hover:border-white/25"
                  href={a.href}
                  target="_blank"
                  rel="noopener sponsored"
                >
                  <div className="ads-ico bg-black text-white dark:bg-white dark:text-black">
                    {a.title.charAt(0)}
                  </div>
                  <b className="text-sm font-bold mt-1">{a.title}</b>
                  <span className="text-xs opacity-70">{a.note}</span>
                </a>
              ))}
            </div>
          </section>

          {/* Section: Expose Viral Link */}
          <section className="ads-section">
            <h2 className="ads-h2">Expose Viral Link</h2>
            <p className="ads-sub">The buttons below are sponsored links.</p>
            <div className="ads-expose">
              {EXPOSE.map((e, idx) => (
                <a
                  key={idx}
                  className="ads-btn"
                  href={e.href}
                  target="_blank"
                  rel="noopener sponsored"
                >
                  {e.title}
                </a>
              ))}
            </div>
          </section>

          {/* Section: Ad Disclaimer */}
          <aside className="ads-disc bg-white dark:bg-[#111111] border-2 border-dashed border-black/20 dark:border-white/20 border-l-[8px] border-l-black dark:border-l-white shadow-lg">
            <div className="ads-disc-head">
              <span className="ads-disc-ico bg-black text-white dark:bg-white dark:text-black">
                !
              </span>
              <h2 className="ads-h2 m-0">Ad Disclaimer</h2>
            </div>
            <p className="key bg-black/5 dark:bg-white/10 text-black dark:text-white">
              We do NOT guarantee that clicking any button or link will take you to the original page.
            </p>
            <p className="opacity-80 text-sm leading-relaxed mb-2">
              This page contains sponsored advertisements and affiliate links. Ad content is controlled by third parties.
            </p>
            <p className="opacity-80 text-sm leading-relaxed">
              If this causes any inconvenience or annoyance, we sincerely apologize. Please verify any link before entering money, passwords or personal information.
            </p>
          </aside>
        </div>
      </main>
    </>
  );
}
