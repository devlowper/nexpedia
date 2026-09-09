import React from 'react';
import { cn } from '@/lib/utils';

export interface TabItem {
  label: string;
  value: string;
  badge?: string;
}

interface FilterTabsProps {
  tabs: TabItem[];
  active: string;
  onChange: (value: string) => void;
  className?: string;
}

export function FilterTabs({ tabs, active, onChange, className }: FilterTabsProps) {
  return (
    <div className={cn("flex gap-2 flex-wrap", className)}>
      {tabs.map(tab => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            "px-4 py-1.5 rounded-full text-xs font-medium border transition-all",
            active === tab.value 
              ? "border-accent text-accent bg-accent-dim"
              : "border-border bg-black/5 dark:bg-black/5 dark:bg-white/5 text-muted hover:text-primary hover:bg-black/10 dark:hover:bg-black/10 dark:bg-white/10"
          )}
        >
          {tab.label}
          {tab.badge && <span className="badge-new ml-1">{tab.badge}</span>}
        </button>
      ))}
    </div>
  );
}
