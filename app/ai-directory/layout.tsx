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
  return (
    <>
      <Script
        src="https://quge5.com/88/tag.min.js"
        data-zone="302292"
        data-cfasync="false"
        strategy="afterInteractive"
      />
      {children}
    </>
  );
}

