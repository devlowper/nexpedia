import React from 'react';
import BlogList from './BlogList';
import { AdsterraResponsiveBanner, AdsterraNativeBanner } from '@/components/ads/AdsterraBanner';

export const metadata = {
  title: 'Blog | AI Trends, Best Prompts & Guides | proCraft',
  description:
    'Read the latest articles on trendy prompts, image to prompt techniques, AI directory releases, and Midjourney creative workflows from proCraft.',
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="flex flex-col items-center mb-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 font-bricolage text-black dark:text-white">
          Our <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'var(--brand-gradient)' }}>Blog</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
          Discover the latest insights on image to prompt, trendy AI prompts, and design workflows from the proCraft team.
        </p>
      </div>

      {/* Header Ad Banner */}
      <AdsterraResponsiveBanner className="mb-10" />
      
      <BlogList />

      {/* Bottom Native Recommendations Banner */}
      <AdsterraNativeBanner className="mt-12" />
    </div>
  );
}
