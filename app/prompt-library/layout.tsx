import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Prompt Library — Trending Prompts',
  description:
    'Discover 800+ curated AI art prompts for Midjourney, ChatGPT, FLUX and Stable Diffusion. Copy prompts with one click on ProCraft.',
  keywords: [
    'prompt library',
    'best prompt',
    'trendy prompt',
    'image to prompt',
    'proCraft',
    'ai prompt library',
    'midjourney prompts',
    'chatgpt prompts',
  ],
  alternates: {
    canonical: '/prompt-library',
  },
  openGraph: {
    title: 'AI Prompt Library — Trending Prompts | ProCraft',
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
