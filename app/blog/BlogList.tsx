"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowRight, Sparkles } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/blogData';

export default function BlogList() {
  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 gap-8 w-full">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.slug}
            className="group flex flex-col md:flex-row bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
            <Link
              href={`/blog/${post.slug}`}
              className="w-full md:w-[42%] h-64 md:h-auto relative overflow-hidden flex-shrink-0 bg-black/5 dark:bg-white/5 block"
            >
              <Image
                src={post.coverImage.url}
                alt={post.coverImage.alt}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 md:hidden" />
              <div className="absolute top-3 left-3 bg-accent text-black font-bold text-[11px] px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                {post.category}
              </div>
            </Link>

            <div className="p-6 md:p-8 flex flex-col flex-1 justify-between">
              <div>
                <div className="hidden md:flex items-center gap-3 text-xs font-semibold text-accent uppercase tracking-wider mb-2.5">
                  <span className="flex items-center gap-1">
                    <Sparkles size={12} /> {post.category}
                  </span>
                  <span>•</span>
                  <span className="text-black/50 dark:text-white/50 flex items-center gap-1">
                    <Clock size={12} /> {post.readTime}
                  </span>
                </div>

                <h2 className="text-2xl md:text-2xl font-bold font-bricolage text-primary mb-3 leading-snug group-hover:text-accent transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                <p className="text-black/60 dark:text-white/60 text-sm leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-black/50 dark:text-white/50 pt-5 border-t border-black/5 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-primary">{post.author.name}</span>
                  <span>•</span>
                  <span>{post.publishedAt}</span>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="font-bold text-accent group-hover:underline flex items-center gap-1.5 transition-all group-hover:translate-x-1"
                >
                  Read Article
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
