import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'AI Directory — Top AI Tools & Models | proCraft',
  description:
    'Discover curated AI tools, image generators, and productivity models in the proCraft AI Directory.',
  keywords: [
    'ai directory',
    'proCraft',
    'best ai tools',
    'ai image generators',
  ],
  alternates: {
    canonical: '/ai-directory',
  },
};

export default function AIDirectoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

