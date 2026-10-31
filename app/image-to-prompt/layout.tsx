import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Image to Prompt Converter | Recreate Any Image Into a Prompt | ProCraft',
  description:
    'Convert any photo or reference image into detailed, powerful AI prompts for Midjourney, FLUX, ChatGPT, and Stable Diffusion with ProCraft.',
  keywords: [
    'image to prompt',
    'image to prompt converter',
    'ai image to prompt converter',
    'recreate any image into a prompt',
    'photo to prompt',
    'picture to prompt',
    'midjourney image to prompt',
    'flux image to prompt',
    'vision ai prompt generator',
    'free image to prompt',
    'procraft image to prompt',
  ],
  alternates: {
    canonical: '/image-to-prompt',
  },
  openGraph: {
    title: 'AI Image to Prompt Converter | Recreate Any Image Into a Prompt | ProCraft',
    description:
      'Convert any photo or reference image into detailed, powerful AI prompts for Midjourney, FLUX, ChatGPT, and Stable Diffusion with ProCraft.',
    url: '/image-to-prompt',
  },
};

export default function ImageToPromptLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

