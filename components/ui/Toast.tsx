"use client";

import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, onClose, duration = 2800 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={cn(
      "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
      "bg-elevated border border-accent/30 text-sm font-medium",
      "px-5 py-2.5 rounded-full shadow-lg text-primary",
      "animate-in slide-in-from-bottom-5 fade-in duration-300"
    )}>
      {message}
    </div>
  );
}
