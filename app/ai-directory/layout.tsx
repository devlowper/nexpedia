import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'AI Tools Directory — Best AI Apps & Models',
  description:
    'Discover curated AI tools, image generators, and productivity models in the ProCraft AI Directory.',
  keywords: [
    'ai directory',
    'proCraft',
    'best ai tools',
    'ai image generators',
  ],
  alternates: {
    canonical: '/ai-directory',
  },
  openGraph: {
    title: 'AI Tools Directory — Best AI Apps & Models | ProCraft',
    description:
      'Discover curated AI tools, image generators, and productivity models in the ProCraft AI Directory.',
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

