import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us — Nexpedia AI Prompt Library',
  description:
    'Learn about Nexpedia, our mission to build the best AI prompt library, image to prompt workflows, and empower creators worldwide.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-base dark:bg-[#0a0a0a] py-24 md:py-32 px-4 md:px-8 border-b border-black/5 dark:border-white/5 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 text-black/80 dark:text-white/90 text-[13px] font-medium tracking-wide mb-6">
            About Nexpedia
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-primary dark:text-white leading-tight tracking-tight mb-8" style={{ fontFamily: '"Bricolage Grotesque", var(--font-bricolage), sans-serif' }}>
            Empowering the Next Generation of Creators with AI.
          </h1>
          <p className="text-xl text-black/60 dark:text-white/70 leading-relaxed max-w-3xl mx-auto">
            We are building the definitive ecosystem for AI prompt libraries, image to prompt conversions, and creative workflows—designed to make you infinitely more productive and creative.
          </p>
        </div>
      </section>

      {/* Mission & Story Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-primary dark:text-white mb-6">Our Mission</h2>
            <p className="text-muted text-lg mb-6 leading-relaxed">
              At Nexpedia, we believe that AI is not just a tool, but a collaborative partner. Our mission is to democratize access to the most powerful AI workflows and trendy prompts, making them accessible to designers, developers, marketers, and dreamers around the world.
            </p>
            <p className="text-muted text-lg leading-relaxed">
              What started as a small directory of tools has evolved into a comprehensive platform where you can discover cutting-edge AI software, find the best prompts to unlock their potential, and convert images to prompts with ease.
            </p>
          </div>
          <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-black/5 dark:border-white/10">
            {/* Placeholder for an about image, falling back to a gradient block if image missing */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-surface-secondary absolute inset-0 -z-10"></div>
              <span className="text-4xl font-bold text-black/10 dark:text-white/10 select-none">Nexpedia</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4 md:px-8 bg-surface-secondary border-t border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary dark:text-white mb-4">Our Core Values</h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              These principles guide everything we build, design, and share with our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-base dark:bg-[#0a0a0a] p-8 rounded-2xl border border-black/5 dark:border-white/5 shadow-sm">
              <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center text-xl font-bold mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-primary dark:text-white mb-3">Accessibility First</h3>
              <p className="text-muted leading-relaxed">
                We design our platform to be intuitive. You shouldn't need a PhD in computer science to leverage state-of-the-art AI.
              </p>
            </div>
            <div className="bg-base dark:bg-[#0a0a0a] p-8 rounded-2xl border border-black/5 dark:border-white/5 shadow-sm">
              <div className="w-12 h-12 bg-purple-500/10 text-purple-500 rounded-xl flex items-center justify-center text-xl font-bold mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-primary dark:text-white mb-3">Community Driven</h3>
              <p className="text-muted leading-relaxed">
                Nexpedia is built for and by creators. We rely on the shared knowledge of our community to curate the best resources.
              </p>
            </div>
            <div className="bg-base dark:bg-[#0a0a0a] p-8 rounded-2xl border border-black/5 dark:border-white/5 shadow-sm">
              <div className="w-12 h-12 bg-[#ff3366]/10 text-[#ff3366] rounded-xl flex items-center justify-center text-xl font-bold mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-primary dark:text-white mb-3">Continuous Innovation</h3>
              <p className="text-muted leading-relaxed">
                The AI landscape shifts daily. We move fast, constantly updating our directories and tools to keep you at the cutting edge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 md:px-8 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-6">Ready to join the revolution?</h2>
        <p className="text-muted text-lg mb-10 max-w-2xl mx-auto">
          Start exploring our prompt library, discovering new tools, or building your own AI agents today.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/ai-directory" className="bg-[#111111] dark:bg-white text-white dark:text-black font-bold px-8 py-4 rounded-full hover:bg-black/80 dark:hover:bg-gray-100 transition-colors">
            Explore Tools
          </a>
          <a href="/contact" className="bg-transparent border border-black/10 dark:border-white/20 text-primary dark:text-white font-bold px-8 py-4 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
