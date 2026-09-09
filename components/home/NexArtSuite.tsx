import React from 'react';
import Link from 'next/link';
import { Video, Image, PlaySquare, FileVideo, Replace, Edit3, Type, Layers, Frame, Mic } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';

const tools = [
  { title: 'Smart Shot', desc: 'Storyboard sheet + cinematic video', icon: Video, badge: 'NEW' },
  { title: 'VFX', desc: 'Mask regions to protect and regenerate the rest', icon: Layers },
  { title: 'Replace Bg', desc: 'Swap the scene behind your subject', icon: Replace },
  { title: 'Relight Video', desc: 'Relight a video to match a reference look', icon: PlaySquare },
  { title: 'Motion Sync', desc: 'Sync motion from a reference video', icon: FileVideo, badge: 'SOON' },
  { title: 'Lip-Sync', desc: 'Lip-sync videos from audio and image', icon: Mic },
  { title: 'Edit Video', desc: 'Modify or retake videos (Kling O1, LTX-2)', icon: Edit3 },
  { title: 'Edit Image', desc: 'Edit images with AI models', icon: Image },
  { title: 'Image Upscale', desc: 'Upscale and enhance image quality', icon: Layers },
  { title: 'Frame to Video', desc: 'Generate videos from images', icon: Frame },
];

export function NexArtSuite() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16">
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-[1.5rem] font-[700] tracking-[-0.5px]">NexArt Suite</h2>
        <Link href="/ai-directory" className="text-accent text-sm hover:underline">
          More &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {tools.map((tool, i) => (
          <GlassCard key={i} hover className="flex flex-col gap-3">
            <div className="w-10 h-10 rounded-[10px] bg-accent-dim flex items-center justify-center">
              <tool.icon size={20} color="var(--brand-solid)" />
            </div>
            <div>
              <h3 className="text-[0.95rem] font-[600] flex items-center gap-2 mb-1">
                {tool.title}
                {tool.badge === 'NEW' && <Badge variant="new">NEW</Badge>}
                {tool.badge === 'SOON' && <Badge variant="soon">SOON</Badge>}
              </h3>
              <p className="text-muted text-xs leading-relaxed">
                {tool.desc}
              </p>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
