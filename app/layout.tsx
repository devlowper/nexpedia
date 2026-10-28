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
    default: "proCraft | Prompt Library & Directory",
    template: "%s | proCraft",
  },
  description:
    "proCraft is the ultimate AI prompt library and tools directory. Discover curated prompts and tools for Midjourney, ChatGPT, Stable Diffusion & FLUX.",
  keywords: [
    "prompt library",
    "proCraft",
    "procraft",
    "image to prompt",
    "best AI prompts",
    "ai prompt generator",
    "midjourney prompts",
    "chatgpt prompt library",
    "trending ai prompts",
    "free prompt library"
  ],
  authors: [{ name: "proCraft Team" }],
  creator: "proCraft",
  publisher: "proCraft",
  applicationName: "proCraft",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: "proCraft | Prompt Library & Directory",
    description:
      "Explore curated prompts, prompt styles, and AI tools with proCraft.",
    url: APP_URL,
    siteName: "proCraft",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "proCraft | Prompt Library & Directory",
    description:
      "Discover the best prompt library, trendy prompts, and creative tools with proCraft.",
    creator: "@procraft",
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
        {/* Google Search Favicons & App Icons */}
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />


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
                  "@type": "WebSite",
                  "@id": `${APP_URL}/#website`,
                  "url": APP_URL,
                  "name": "proCraft",
                  "alternateName": ["procraft", "proCraft AI"],
                  "description": "Best AI Prompt Library and Directory for creators.",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": `${APP_URL}/prompt-library?search={search_term_string}`,
                    "query-input": "required name=search_term_string"
                  }
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
