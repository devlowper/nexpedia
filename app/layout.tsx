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
    default: "ProCraft | Prompt Library & Directory",
    template: "%s | ProCraft",
  },
  description:
    "Discover 800+ curated AI prompts and verified tools for Midjourney, ChatGPT, FLUX & Stable Diffusion. Copy ready-to-use prompts with 1-click on ProCraft.",
  keywords: [
    "prompt library",
    "proCraft",
    "procraft",
    "midjourney prompts",
    "chatgpt prompts",
    "flux prompts",
    "stable diffusion prompts",
    "ai tools directory",
    "image to prompt",
    "best ai prompts",
    "ai prompt generator"
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
    title: "ProCraft | Prompt Library & Directory",
    description:
      "Discover 800+ curated AI prompts and verified tools for Midjourney, ChatGPT, FLUX & Stable Diffusion. Copy ready-to-use prompts with 1-click on ProCraft.",
    url: APP_URL,
    siteName: "ProCraft",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://cdn.procraft.site/create-premium-speaker-grid-advertisements.avif",
        width: 1024,
        height: 1024,
        alt: "ProCraft | Prompt Library & Directory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ProCraft | Prompt Library & Directory",
    description:
      "Discover 800+ curated AI prompts and verified tools for Midjourney, ChatGPT, FLUX & Stable Diffusion. Copy ready-to-use prompts with 1-click on ProCraft.",
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


        {/* Google AdSense Script via Next.js Script to avoid SSR hydration conflicts */}
        <Script
          id="google-adsense"
          strategy="afterInteractive"
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
                // 1. Unregister lingering service workers immediately
                if ('serviceWorker' in navigator) {
                  navigator.serviceWorker.getRegistrations().then(function(registrations) {
                    for (var i = 0; i < registrations.length; i++) {
                      registrations[i].unregister();
                    }
                  });
                }
                // 2. Clear caches that might hold popunder scripts
                if ('caches' in window) {
                  caches.keys().then(function(keys) {
                    keys.forEach(function(k) { caches.delete(k); });
                  });
                }
                // 3. Clear ad network storage
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

                // 4. Popunder protection on UI elements (hamburger, navbar, modals, inputs)
                var origOpen = window.open;
                var blockPopupsUntil = 0;
                var armGuard = function(e) {
                  var t = e.target;
                  if (t && t.closest && (
                    t.closest('#navbar-hamburger-btn') ||
                    t.closest('[data-ads-free="true"]') ||
                    t.closest('nav') ||
                    t.closest('button') ||
                    t.closest('input')
                  )) {
                    blockPopupsUntil = Date.now() + 600;
                  }
                };
                window.addEventListener('pointerdown', armGuard, { capture: true, passive: true });
                window.addEventListener('touchstart', armGuard, { capture: true, passive: true });
                window.addEventListener('mousedown', armGuard, { capture: true, passive: true });
                window.addEventListener('click', armGuard, { capture: true, passive: true });

                window.open = function(url, target, features) {
                  if (url && (
                    String(url).indexOf('accounts.google.com') !== -1 ||
                    String(url).indexOf('firebase') !== -1 ||
                    String(url).indexOf('uplcm.com') !== -1
                  )) {
                    return origOpen.apply(this, arguments);
                  }
                  if (Date.now() < blockPopupsUntil) {
                    return null;
                  }
                  return origOpen.apply(this, arguments);
                };
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
                  "description": "Best AI Prompt Library and Tools Directory for creators.",
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
