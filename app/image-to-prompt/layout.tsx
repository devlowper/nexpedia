import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Image to Prompt AI Converter',
  description:
    'Convert any photo or illustration into detailed AI prompts for Midjourney, FLUX, and Stable Diffusion with 1-click on ProCraft.',
  alternates: {
    canonical: '/image-to-prompt',
  },
  openGraph: {
    title: 'Free Image to Prompt AI Converter | ProCraft',
    description:
      'Convert any photo or illustration into detailed AI prompts for Midjourney, FLUX, and Stable Diffusion.',
    url: '/image-to-prompt',
  },
};

export default function ImageToPromptLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

