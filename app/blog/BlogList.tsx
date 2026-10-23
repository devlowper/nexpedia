"use client";

import React, { useState } from 'react';

const allPosts = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function BlogList() {
  const [visibleCount, setVisibleCount] = useState(3);

  const loadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 gap-8 w-full">
        {allPosts.slice(0, visibleCount).map((i) => (
          <div key={i} className="group flex flex-col md:flex-row glass-card-solid rounded-2xl overflow-hidden border border-gray-100 dark:border-zinc-800 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="w-full md:w-[40%] h-56 md:h-auto bg-gray-200 dark:bg-zinc-800 relative overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-solid)] to-[var(--brand-solid-hover)] opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
            </div>
            <div className="p-6 md:p-8 flex flex-col flex-1">
              <span className="text-[var(--brand-solid)] text-sm font-semibold mb-2 tracking-wide uppercase">Company News</span>
              <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-4 leading-tight">
                Exciting New Features Coming to Nexpedia Soon
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-base mb-8 flex-1">
                We are working hard to bring you the best AI generation experience. Here's a sneak peek at what's coming next in our platform update, including new generation tools and advanced workflows.
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500 mt-auto pt-6 border-t border-gray-100 dark:border-zinc-800">
                <span className="font-medium">Oct 12, 2026</span>
                <span className="font-medium text-black dark:text-white group-hover:text-[var(--brand-solid)] transition-colors cursor-pointer flex items-center gap-1">
                  Read Article 
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-1">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {visibleCount < allPosts.length && (
        <button 
          onClick={loadMore}
          className="mt-16 px-10 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:bg-black/80 dark:hover:bg-gray-100 transition-colors shadow-[0_4px_14px_0_rgba(0,0,0,0.2)] dark:shadow-[0_4px_14px_0_rgba(255,255,255,0.1)] flex items-center gap-2"
        >
          Load More Blogs
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  );
}
