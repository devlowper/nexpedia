import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Best AI Directory • Over 5000+ Verified AI Tools | ProCraft',
  description:
    'Explore the best AI tools directory featuring 5000+ AI tools for image generation, video creation, writing, coding, and productivity. Compare features, explore free AI tools, and find the best solutions on ProCraft.',
  keywords: [
    'best ai directory',
    'over 5000+ verified ai tools',
    'ai tools directory',
    'creative ai tools',
    'best ai tools',
    'best ai models',
    'ai image generators',
    'ai video creation',
    'ai coding assistants',
    'ai writing tools',
    'ai productivity tools',
    'free ai tools directory',
    'best free ai tools',
    'useful ai websites',
    'discover ai tools',
    'procraft ai directory',
  ],
  alternates: {
    canonical: '/ai-directory',
  },
  openGraph: {
    title: 'Best AI Directory • Over 5000+ Verified AI Tools | ProCraft',
    description:
      'Explore the best AI tools directory featuring 5000+ AI tools for image generation, video creation, writing, coding, and productivity. Compare features and find the best solutions on ProCraft.',
    url: '/ai-directory',
  },
};

export default function AIDirectoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

