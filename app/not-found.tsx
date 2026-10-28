import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Compass } from 'lucide-react';

export const metadata = {
  title: 'Page Not Found — 404 | proCraft',
  description: 'The requested page could not be found. Explore our AI prompt library and tools directory on proCraft.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/25 flex items-center justify-center text-accent mb-6 shadow-sm">
        <Compass size={32} />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-3">404 — Page Not Found</h1>
      <p className="text-muted text-base max-w-md mx-auto mb-8 leading-relaxed">
        The page you are looking for does not exist or has been moved. Explore our curated AI prompt library and tools directory instead.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="px-6 py-2.5 rounded-xl bg-accent text-black font-semibold text-sm hover:bg-accent-hover transition-colors inline-flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <Link
          href="/prompt-library"
          className="px-6 py-2.5 rounded-xl border border-border bg-black/5 dark:bg-white/5 text-primary font-semibold text-sm hover:border-accent/40 transition-colors"
        >
          Explore Prompts
        </Link>
      </div>
    </div>
  );
}
