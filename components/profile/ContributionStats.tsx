import React from 'react';
import { formatViewCount } from '@/lib/utils';

interface ContributionStatsProps {
  stats: {
    prompts: number;
    uses: number;
    rating: number;
    upvotes: number;
  };
}

export function ContributionStats({ stats }: ContributionStatsProps) {
  const statItems = [
    { label: 'Prompts', value: stats.prompts },
    { label: 'Total Uses', value: formatViewCount(stats.uses) },
    { label: 'Rating', value: stats.rating > 0 ? `${stats.rating.toFixed(1)}★` : '0', highlight: true },
    { label: 'Upvotes', value: formatViewCount(stats.upvotes) },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statItems.map((item, idx) => (
        <div key={idx} className="bg-surface border border-border p-5 rounded-xl shadow-sm flex flex-col justify-between">
          <span className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">
            {item.label}
          </span>
          <span className={`text-3xl font-bold ${item.highlight ? 'text-accent' : ''}`}>
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}
