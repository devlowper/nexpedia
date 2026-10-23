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

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://nexpedia.com";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "Nexpedia — AI Prompt Library & Directory",
    template: "%s | Nexpedia",
  },
  description:
    "Nexpedia is the ultimate AI prompt library and tools directory. Discover curated prompts and tools for Midjourney, ChatGPT, Stable Diffusion & FLUX.",
  keywords: [
    "prompt library",
    "Nexpedia",
    "nexpedia",
    "image to prompt",
    "best AI prompts",
    "ai prompt generator",
    "midjourney prompts",
    "chatgpt prompt library",
    "trending ai prompts",
    "free prompt library"
  ],
  authors: [{ name: "Nexpedia Team" }],
  creator: "Nexpedia",
  publisher: "Nexpedia",
  applicationName: "Nexpedia",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nexpedia — AI Prompt Library & Directory",
    description:
      "Explore curated prompts, prompt styles, and AI tools with Nexpedia.",
    url: APP_URL,
    siteName: "Nexpedia",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexpedia — AI Prompt Library & Directory",
    description:
      "Discover the best prompt library, trendy prompts, and creative tools with Nexpedia.",
    creator: "@nexpedia",
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
                  "name": "Nexpedia",
                  "alternateName": ["nexpedia", "Nexpedia AI"],
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
                  "name": "Nexpedia",
                  "url": APP_URL,
                  "applicationCategory": "DesignApplication",
                  "operatingSystem": "All",
                  "description": "Discover curated prompts, explore the prompt library, and find AI tools with Nexpedia."
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
