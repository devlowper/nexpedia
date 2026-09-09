"use client";

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { motion } from 'framer-motion';

export function SkeletonCard() {
  return (
    <GlassCard className="flex flex-col h-[280px] relative overflow-hidden border border-border bg-black/[0.02] dark:bg-white/[0.02]">
      {/* Shimmer effect */}
      <motion.div 
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent z-10 pointer-events-none"
        animate={{ translateX: ['-100%', '100%'] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="header flex gap-4 items-center mb-4 relative z-0">
        <div className="icon rounded-xl w-12 h-12 bg-black/5 dark:bg-black/5 dark:bg-white/5 animate-pulse shrink-0" />
        <div className="min-w-0 flex-1 space-y-2">
          <div className="h-5 bg-black/5 dark:bg-black/5 dark:bg-white/5 rounded-md w-3/4 animate-pulse" />
          <div className="h-4 bg-black/5 dark:bg-black/5 dark:bg-white/5 rounded-md w-1/4 animate-pulse" />
        </div>
      </div>
      
      <div className="space-y-2 mb-4 relative z-0">
        <div className="h-4 bg-black/5 dark:bg-black/5 dark:bg-white/5 rounded-md w-full animate-pulse" />
        <div className="h-4 bg-black/5 dark:bg-black/5 dark:bg-white/5 rounded-md w-full animate-pulse" />
        <div className="h-4 bg-black/5 dark:bg-black/5 dark:bg-white/5 rounded-md w-2/3 animate-pulse" />
      </div>
      
      <div className="tags flex gap-1.5 flex-wrap mb-4 relative z-0 mt-auto">
        <div className="h-5 bg-black/5 dark:bg-black/5 dark:bg-white/5 rounded-md w-12 animate-pulse" />
        <div className="h-5 bg-black/5 dark:bg-black/5 dark:bg-white/5 rounded-md w-16 animate-pulse" />
        <div className="h-5 bg-black/5 dark:bg-black/5 dark:bg-white/5 rounded-md w-10 animate-pulse" />
      </div>
      
      <div className="mt-auto pt-4 border-t border-border relative z-0 flex items-center justify-between w-full">
        <div className="h-8 bg-black/5 dark:bg-black/5 dark:bg-white/5 rounded-lg w-20 animate-pulse" />
        <div className="h-8 bg-black/5 dark:bg-black/5 dark:bg-white/5 rounded-lg w-24 animate-pulse" />
      </div>
    </GlassCard>
  );
}
