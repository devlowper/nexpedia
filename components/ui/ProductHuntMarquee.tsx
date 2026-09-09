"use client";

import React, { useEffect, useState } from 'react';
import { ExternalLink, Sparkles, MessageSquare, Triangle } from 'lucide-react';
import Image from 'next/image';

interface PHPost {
  id: string;
  name: string;
  tagline: string;
  url: string;
  votesCount?: number;
  commentsCount?: number;
  thumbnail: {
    url: string;
  };
}

export function ProductHuntMarquee() {
  const [posts, setPosts] = useState<PHPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPHData = async () => {
      try {
        const res = await fetch('/api/producthunt');
        const data = await res.json();
        if (data.data?.posts?.edges) {
          const fetchedPosts = data.data.posts.edges.map((edge: any) => edge.node);
          setPosts(fetchedPosts);
        }
      } catch (err) {
        console.error("Failed to fetch ProductHunt data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPHData();
  }, []);

  if (loading || posts.length === 0) {
    return null; // or a skeleton if preferred
  }

  // Duplicate posts for smooth infinite scrolling
  const duplicatedPosts = [...posts, ...posts, ...posts];

  return (
    <div className="w-full mb-12 animate-fadeIn relative">
      <div className="flex items-center justify-between mb-4 px-4 max-w-7xl mx-auto">
        <h2 className="text-xl font-bold tracking-tight text-primary/90 flex items-center gap-2">
          <Sparkles className="text-orange-500" size={20} /> Latest on ProductHunt
        </h2>
        <a 
          href="https://www.producthunt.com/categories/artificial-intelligence" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors flex items-center gap-1 group"
        >
          See more
          <span className="transform group-hover:translate-x-1 transition-transform inline-block">
            →
          </span>
        </a>
      </div>

      <div className="w-full overflow-hidden relative group">
        {/* Gradient fades for edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-base to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-base to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex whitespace-nowrap animate-scroll-left hover:[animation-play-state:paused] py-2">
          {duplicatedPosts.map((post, idx) => (
            <div
              key={`${post.id}-${idx}`}
              className="inline-flex items-center gap-3 bg-elevated border border-border rounded-2xl p-3 pr-4 mx-2 shadow-sm transition-all shrink-0 group/card hover:border-orange-500/50"
            >
              <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-black/5 dark:bg-black/5 dark:bg-white/5 flex items-center justify-center">
                {post.thumbnail?.url ? (
                  <img src={post.thumbnail.url} alt={post.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-orange-500 font-bold text-xs">PH</div>
                )}
              </div>
              
              <div className="flex flex-col flex-1 min-w-[150px]">
                <span className="font-bold text-sm text-primary flex items-center gap-1.5">
                  {post.name}
                </span>
                <span className="text-xs text-muted max-w-[180px] truncate">
                  {post.tagline}
                </span>
              </div>

              <div className="flex items-center gap-3 border-l border-border pl-4 ml-1">
                <div className="flex flex-col items-center justify-center text-orange-500">
                  <Triangle size={12} className="fill-orange-500 mb-0.5" />
                  <span className="text-[10px] font-bold">{post.votesCount || 0}</span>
                </div>
                <div className="flex flex-col items-center justify-center text-gray-400">
                  <MessageSquare size={12} className="mb-0.5" />
                  <span className="text-[10px] font-bold">{post.commentsCount || 0}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
