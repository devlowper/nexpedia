import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function GlassCard({ children, className, hover, onClick }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "glass-card p-6",
        "transition-transform duration-300",
        hover && "hover:-translate-y-1 cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}
