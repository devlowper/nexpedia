import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Prompt Library | Explore All AI Prompts & Ready-to-Use Styles',
  description:
    'Discover the best AI prompts for ChatGPT, Gemini, Claude, Midjourney, Nano Banana, and FLUX. Explore ready-to-use prompts for AI image generation, creative writing, photo editing, and productivity on ProCraft.',
  keywords: [
    'ai prompt library',
    'explore all ai prompts',
    'free ai prompt library',
    'creator database',
    'best ai prompts',
    'ready to use ai prompts',
    'chatgpt prompts',
    'midjourney prompts',
    'nano banana prompts',
    'flux prompts',
    'gemini prompts',
    'claude prompts',
    'stable diffusion prompts',
    'ai art prompt library',
    'creative photography prompts',
    'ai photo prompts',
    'one-click copy prompts',
    'image to prompt',
    'free prompt collections',
    'procraft prompt library',
  ],
  alternates: {
    canonical: '/prompt-library',
  },
  openGraph: {
    title: 'AI Prompt Library | Explore All AI Prompts | ProCraft',
    description:
      'Your ultimate AI prompt library for creative workflows. Discover the best AI prompts for Midjourney, FLUX, ChatGPT, Gemini, Claude, Nano Banana, and Stable Diffusion.',
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
