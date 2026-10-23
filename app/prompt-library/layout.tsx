import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prompt Library — Curated & Trending AI Prompts',
  description:
    'Explore the ultimate AI prompt library on Nexpedia. Find curated prompts, image-to-prompt styles, ChatGPT system prompts, and Midjourney recipes.',
  keywords: [
    'prompt library',
    'best prompt',
    'trendy prompt',
    'image to prompt',
    'Nexpedia',
    'ai prompt library',
    'midjourney prompts',
    'chatgpt prompts',
  ],
  alternates: {
    canonical: '/prompt-library',
  },
  openGraph: {
    title: 'Prompt Library — Curated & Trending AI Prompts | Nexpedia',
    description:
      'Explore thousands of curated, trending AI prompts ready to copy with 1-click.',
    url: '/prompt-library',
  },
};

export default function PromptLibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
