import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Directory — Top AI Tools & Models | Nexpedia',
  description:
    'Discover curated AI tools, image generators, and productivity models in the Nexpedia AI Directory.',
  keywords: [
    'ai directory',
    'Nexpedia',
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
