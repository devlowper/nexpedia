import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/hooks/useTheme";
import { AuthProvider } from "@/hooks/useAuth";
import { MonetagGlobals } from "@/components/ads/MonetagGlobals";

const inter = Inter({ subsets: ["latin"] });
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://procraft.site";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "ProCraft | Best AI Prompt Library & AI Directory",
    template: "%s | ProCraft",
  },
  description:
    "Discover the best AI prompts, explore 5000+ verified AI tools, and unlock your creativity with ProCraft. Access ready-to-use prompts for ChatGPT, Gemini, Claude, DeepSeek, Midjourney, Nano Banana, and FLUX.",
  keywords: [
    "best ai prompt library",
    "ai prompt library",
    "ai directory",
    "best ai directory",
    "best ai tools",
    "ai tools directory",
    "free ai prompts",
    "ready to use ai prompts",
    "chatgpt prompts",
    "midjourney prompts",
    "flux prompts",
    "nano banana prompts",
    "gemini prompts",
    "claude prompts",
    "deepseek prompts",
    "stable diffusion prompts",
    "trending ai prompt styles",
    "trending ai image prompts",
    "creative ai art prompts",
    "photo editing prompts",
    "best ai prompts for work and creativity",
    "popular ai prompt categories",
    "image to prompt",
    "image to prompt converter",
    "ai image generation prompts",
    "ai prompts for productivity",
    "ai prompts for coding",
    "ai prompts for marketing",
    "procraft",
    "procraft ai",
    "procraft prompts",
    "copy and paste ai prompts"
  ],
  authors: [{ name: "proCraft Team", url: APP_URL }],
  creator: "proCraft",
  publisher: "proCraft",
  applicationName: "proCraft",
  category: "technology",
  manifest: "/site.webmanifest",
  alternates: {
    canonical: APP_URL,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: "ProCraft | Best AI Prompt Library & AI Directory",
    description:
      "Discover the best AI prompts, explore 5000+ verified AI tools, and unlock your creativity with ProCraft. Ready-to-use prompts for ChatGPT, Gemini, Claude, DeepSeek, Midjourney, Nano Banana, and FLUX.",
    url: APP_URL,
    siteName: "ProCraft",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://cdn.procraft.site/create-premium-speaker-grid-advertisements.avif",
        width: 1024,
        height: 1024,
        alt: "ProCraft | Best AI Prompt Library & AI Directory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ProCraft | Best AI Prompt Library & AI Directory",
    description:
      "Discover the best AI prompts, explore 5000+ verified AI tools, and unlock your creativity with ProCraft. Ready-to-use prompts for ChatGPT, Gemini, Claude, DeepSeek, Midjourney, Nano Banana, and FLUX.",
    creator: "@procraft",
    images: ["https://cdn.procraft.site/create-premium-speaker-grid-advertisements.avif"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google9b78feeff9304ba5",
    other: {
      "p:domain_verify": "72bb57b4ce79ce41325386fbf6e57ecf",
      "pinterest-site-verification": "72bb57b4ce79ce41325386fbf6e57ecf",
    },
  },
  other: {
    "google-adsense-account": "ca-pub-2157567865928309",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={bricolage.variable}>
      <head>
        {/* Google Search Favicons & Icons Specification */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ff3366" />


        {/* Preconnect & DNS-prefetch for critical resources */}
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Google AdSense Script: lazyOnload so it never blocks FCP, LCP, or initial page interactivity */}
        <Script
          id="google-adsense"
          strategy="lazyOnload"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2157567865928309"
          crossOrigin="anonymous"
        />

        {/* Anti-popunder & service worker cleanup guard */}
        <Script
          id="anti-popunder-guard"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                // Defer background cleanup so it does not block FCP or main thread
                var runCleanup = function() {
                  if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.getRegistrations().then(function(regs) {
                      for (var i = 0; i < (regs || []).length; i++) {
                        regs[i].unregister();
                      }
                    }).catch(function() {});
                  }
                  if ('caches' in window) {
                    caches.keys().then(function(keys) {
                      (keys || []).forEach(function(k) { caches.delete(k); });
                    }).catch(function() {});
                  }
                  try {
                    var adKeys = ['monetag', 'adsterra', 'vignette', 'popunder', '_ym'];
                    for (var k in localStorage) {
                      for (var a = 0; a < adKeys.length; a++) {
                        if (k.toLowerCase().indexOf(adKeys[a]) !== -1) localStorage.removeItem(k);
                      }
                    }
                    for (var sk in sessionStorage) {
                      for (var b = 0; b < adKeys.length; b++) {
                        if (sk.toLowerCase().indexOf(adKeys[b]) !== -1) sessionStorage.removeItem(sk);
                      }
                    }
                  } catch(e) {}
                };

                if ('requestIdleCallback' in window) {
                  requestIdleCallback(runCleanup);
                } else {
                  setTimeout(runCleanup, 1500);
                }

                // 4. Bulletproof Ads-Free Navigation Shield (Desktop & Mobile)
                var origOpen = window.open;
                var blockPopupsUntil = 0;
                var isNavInteracting = false;

                // Configure Monetag / Ad network exclusion globals
                window.onClickExcludes = ['nav', 'header', 'a', 'button', '[data-ads-free="true"]', '#navbar-hamburger-btn', '[data-mobile-drawer="true"]', '[data-nav-item="true"]'];

                window.__armAdsFree = function(durationMs) {
                  blockPopupsUntil = Date.now() + (durationMs || 3000);
                  isNavInteracting = true;
                  setTimeout(function() { isNavInteracting = false; }, durationMs || 3000);
                };

                var isAdUrl = function(u) {
                  var s = String(u || '').toLowerCase();
                  return s.indexOf('uplcm.com') !== -1 ||
                         s.indexOf('al5sm.com') !== -1 ||
                         s.indexOf('nap5k.com') !== -1 ||
                         s.indexOf('n6wxm.com') !== -1 ||
                         s.indexOf('adsterra') !== -1 ||
                         s.indexOf('propeller') !== -1 ||
                         s.indexOf('monetag') !== -1 ||
                         s.indexOf('clksite') !== -1 ||
                         s.indexOf('adk2') !== -1;
                };

                var armGuard = function(e) {
                  try {
                    var t = e.target;
                    if (t && t.closest && (
                      t.closest('nav') ||
                      t.closest('[data-ads-free="true"]') ||
                      t.closest('#navbar-hamburger-btn') ||
                      t.closest('[data-mobile-drawer="true"]') ||
                      t.closest('[data-nav-item="true"]') ||
                      t.closest('button') ||
                      t.closest('input')
                    )) {
                      window.__armAdsFree(3000);
                    }
                  } catch(err) {}
                };

                window.addEventListener('pointerdown', armGuard, { capture: true, passive: true });
                window.addEventListener('touchstart', armGuard, { capture: true, passive: true });
                window.addEventListener('mousedown', armGuard, { capture: true, passive: true });
                window.addEventListener('click', armGuard, { capture: true, passive: true });

                // Dummy window object returned when ad popunder is blocked:
                // Returning a mock window with closed=false prevents ad scripts from detecting
                // popup blocking and therefore prevents them from executing their fallback redirect!
                var makeFakeWindow = function() {
                  return {
                    closed: false,
                    focus: function() {},
                    blur: function() {},
                    close: function() { this.closed = true; },
                    postMessage: function() {},
                    document: { write: function() {}, open: function() {}, close: function() {} },
                    location: { href: '', replace: function() {}, assign: function() {} }
                  };
                };

                window.open = function(url, target, features) {
                  var urlStr = String(url || '');
                  // If user is navigating or interacting with nav bar / inputs:
                  if (Date.now() < blockPopupsUntil || isNavInteracting || isAdUrl(urlStr)) {
                    // ONLY allow real user authentication popups (Google OAuth / Firebase)
                    if (urlStr.indexOf('accounts.google.com') !== -1 || urlStr.indexOf('firebaseapp.com') !== -1) {
                      return origOpen.apply(this, arguments);
                    }
                    // Return fake window to safely neutralize popunder fallback redirects
                    return makeFakeWindow();
                  }

                  // Outside of navigation interactions, allow standard browser action
                  return origOpen.apply(this, arguments);
                };

                // Prevent synthetic clicks on ad anchors during navigation
                var origAnchorClick = HTMLAnchorElement.prototype.click;
                HTMLAnchorElement.prototype.click = function() {
                  if (Date.now() < blockPopupsUntil || isNavInteracting) {
                    var href = (this.getAttribute('href') || '').toLowerCase();
                    if (isAdUrl(href)) {
                      return;
                    }
                  }
                  return origAnchorClick.apply(this, arguments);
                };

                // Guard location.assign and location.replace against rogue ad redirects
                try {
                  var origAssign = window.location.assign;
                  if (typeof origAssign === 'function') {
                    window.location.assign = function(u) {
                      if (isAdUrl(u) && (Date.now() < blockPopupsUntil || isNavInteracting)) {
                        console.warn('Blocked rogue nav redirect (assign):', u);
                        return;
                      }
                      return origAssign.apply(window.location, arguments);
                    };
                  }
                  var origReplace = window.location.replace;
                  if (typeof origReplace === 'function') {
                    window.location.replace = function(u) {
                      if (isAdUrl(u) && (Date.now() < blockPopupsUntil || isNavInteracting)) {
                        console.warn('Blocked rogue nav redirect (replace):', u);
                        return;
                      }
                      return origReplace.apply(window.location, arguments);
                    };
                  }
                } catch(e) {}
              }
            `,
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${APP_URL}/#organization`,
                  "name": "proCraft",
                  "url": APP_URL,
                  "logo": {
                    "@type": "ImageObject",
                    "url": `${APP_URL}/icon-512.png`,
                    "width": 512,
                    "height": 512
                  },
                  "sameAs": [
                    "https://twitter.com/procraft",
                    "https://github.com/devlowper/nexpedia"
                  ]
                },
                {
                  "@type": "WebSite",
                  "@id": `${APP_URL}/#website`,
                  "url": APP_URL,
                  "name": "proCraft",
                  "alternateName": ["proCraft AI", "procraft.site"],
                  "description": "Best AI Prompt Library & AI Directory. Access ready-to-use prompts for ChatGPT, Gemini, Claude, DeepSeek, Midjourney, Nano Banana, and FLUX.",
                  "publisher": { "@id": `${APP_URL}/#organization` },
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                      "@type": "EntryPoint",
                      "urlTemplate": `${APP_URL}/prompt-library?search={search_term_string}`
                    },
                    "query-input": "required name=search_term_string"
                  }
                },
                {
                  "@type": "ItemList",
                  "@id": `${APP_URL}/#sitelinks`,
                  "name": "proCraft Sitelinks",
                  "itemListElement": [
                    {
                      "@type": "SiteNavigationElement",
                      "position": 1,
                      "name": "Prompt Library",
                      "description": "Explore curated prompts for Midjourney, ChatGPT, and FLUX",
                      "url": `${APP_URL}/prompt-library`
                    },
                    {
                      "@type": "SiteNavigationElement",
                      "position": 2,
                      "name": "AI Directory",
                      "description": "Discover verified AI productivity, video, and design tools",
                      "url": `${APP_URL}/ai-directory`
                    },
                    {
                      "@type": "SiteNavigationElement",
                      "position": 3,
                      "name": "Image to Prompt",
                      "description": "Extract AI prompts from any uploaded picture",
                      "url": `${APP_URL}/image-to-prompt`
                    },
                    {
                      "@type": "SiteNavigationElement",
                      "position": 4,
                      "name": "Login",
                      "description": "Sign in to your proCraft creator account",
                      "url": `${APP_URL}/login`
                    }
                  ]
                },
                {
                  "@type": "WebApplication",
                  "@id": `${APP_URL}/#webapp`,
                  "name": "proCraft",
                  "url": APP_URL,
                  "applicationCategory": "DesignApplication",
                  "operatingSystem": "All",
                  "description": "Discover curated prompts, explore the prompt library, and find AI tools with proCraft."
                }
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} ${bricolage.variable} overflow-x-hidden w-full max-w-[100vw]`}>
        <AuthProvider>
          <ThemeProvider>
            <div className="relative z-10 w-full overflow-x-hidden flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1 pt-[60px] w-full max-w-[100vw] overflow-hidden">
                {children}
              </main>
              <Footer />
              <MonetagGlobals />
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
