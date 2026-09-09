"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FilterTabs } from '../ui/FilterTabs';

const tabs = [
  { label: 'Marketing & Ads', value: 'Marketing & Ads' },
  { label: 'Film & Stories', value: 'Film & Stories' },
  { label: 'Music Video', value: 'Music Video' },
  { label: 'Animation & Illustration', value: 'Animation & Illustration' },
  { label: 'UGC', value: 'UGC' },
  { label: 'Micro Drama', value: 'Micro Drama' },
  { label: 'Anime', value: 'Anime' },
  { label: 'Gaming & Concept Art', value: 'Gaming & Concept Art' },
  { label: 'Explainer', value: 'Explainer' },
  { label: 'Mood & Atmosphere', value: 'Mood & Atmosphere' },
];

const cards = [
  { label: 'Cinematic Lighting', emoji: '🎬', bg: 'linear-gradient(135deg, #1a1a2e, #16213e)' },
  { label: 'Product Concept', emoji: '🛍️', bg: 'linear-gradient(135deg, #2b1055, #7597de)' },
  { label: 'Character Design', emoji: '👤', bg: 'linear-gradient(135deg, #0f2027, #2c5364)' },
  { label: 'Surreal Landscapes', emoji: '🌌', bg: 'linear-gradient(135deg, #1d976c, #93f9b9)' },
  { label: 'Anime Style', emoji: '🌸', bg: 'linear-gradient(135deg, #ff7e5f, #feb47b)' },
  { label: 'Cyberpunk City', emoji: '🏙️', bg: 'linear-gradient(135deg, #232526, #414345)' },
  { label: 'Cosmic Horror', emoji: '👾', bg: 'linear-gradient(135deg, #4b1248, #f0c27b)' },
  { label: 'Fantasy Kingdom', emoji: '🏰', bg: 'linear-gradient(135deg, #11998e, #38ef7d)' },
  { label: 'Micro Drama Set', emoji: '🎭', bg: 'linear-gradient(135deg, #ee0979, #ff6a00)' },
  { label: 'Vintage Poster', emoji: '🖼️', bg: 'linear-gradient(135deg, #8e2de2, #4a00e0)' },
];

export function InspirationGallery() {
  const [activeTab, setActiveTab] = useState('Marketing & Ads');

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16">
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-[1.5rem] font-[700] tracking-[-0.5px]">Inspirations</h2>
        <Link href="/prompt-library" className="text-accent text-sm hover:underline">
          See all &rarr;
        </Link>
      </div>

      <div className="mb-8 overflow-x-auto no-scrollbar pb-2">
        <FilterTabs 
          tabs={tabs} 
          active={activeTab} 
          onChange={setActiveTab} 
          className="flex-nowrap md:flex-wrap"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {cards.map((card, i) => (
          <div key={i} className="aspect-[4/5] relative overflow-hidden rounded-[14px] group cursor-pointer border border-border hover:border-[rgba(255,51,102,0.3)] transition-all">
            <div className="absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity" style={{ background: card.bg }}></div>
            <div className="absolute inset-0 flex items-center justify-center text-4xl transform group-hover:scale-110 transition-transform duration-300">
              {card.emoji}
            </div>
            
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="text-primary text-sm font-semibold">{card.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
