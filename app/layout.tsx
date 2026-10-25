import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/hooks/useTheme";
import { AuthProvider } from "@/hooks/useAuth";

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
      { url: '/favicon.ico?v=2' },
      { url: '/icon.png?v=2', type: 'image/png' },
    ],
    shortcut: '/favicon.ico?v=2',
    apple: '/apple-icon.png?v=2',
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
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
