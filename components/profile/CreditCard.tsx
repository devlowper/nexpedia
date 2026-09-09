import React from 'react';

interface CreditCardProps {
  credits: number;
  onSubmitClick: () => void;
}

export function CreditCard({ credits, onSubmitClick }: CreditCardProps) {
  return (
    <div className="bg-surface border border-border rounded-xl p-5 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <div>
        <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-1">Contribution Credits</h3>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">💎 {credits} Credits</span>
        </div>
        <p className="text-xs text-muted mt-2">Earn 1 credit for every approved prompt.</p>
        <button className="text-xs text-accent hover:underline mt-1 font-medium block md:inline-block md:mt-2">
          View Credit History
        </button>
      </div>
      
      <button onClick={onSubmitClick} className="w-full md:w-auto px-6 py-3 bg-accent text-black font-bold text-sm rounded-md hover:bg-accent-hover transition-colors whitespace-nowrap">
        Submit a Prompt
      </button>
    </div>
  );
}
