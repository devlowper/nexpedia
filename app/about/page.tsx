import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Us | proCraft AI Prompt Library',
  description:
    'Learn about proCraft, our mission to build the best AI prompt library, image to prompt workflows, and empower creators worldwide.',
  alternates: {
    canonical: '/about',
  },
};

interface TeamMember {
  name: string;
  role: string;
  shortBio: string;
  bio: string;
  avatar: string;
  social: {
    github: string;
    linkedin: string;
  };
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "MD Rakib Hossen",
    role: "Founder & Full-Stack Developer",
    shortBio: "Full-stack web developer and CSE student building proCraft end to end.",
    bio: "Rakib is a full-stack web developer and CSE student. He designs and builds the entire proCraft platform, from the curated prompt library and AI directory to the image to prompt workspace. His work spans modern web apps built with Next.js, React, TypeScript and Node.js, including learning platforms, appointment systems and result portals. Rakib focuses on fast, clean and easy-to-use products, so creators can find the right prompt and get great AI results without friction.",
    avatar: "https://avatars.githubusercontent.com/u/246551904?v=4",
    social: {
      github: "https://github.com/devlowper",
      linkedin: "https://www.linkedin.com/in/md-rakib-hossen-cs"
    }
  },
  {
    name: "Samir Qureshi",
    role: "SEO Expert",
    shortBio: "Business-minded tech explorer leading proCraft's search strategy.",
    bio: "Samir is a business-minded tech explorer and lifelong learner with a passion for entrepreneurship and turning ideas into reality. As our SEO expert, he leads proCraft's search strategy, from keyword research and content planning to on-page optimization, so creators can easily discover our prompt library and tools. With hands-on experience in web projects such as business websites and e-commerce tools, Samir connects technology with growth and keeps proCraft focused on what people are actually searching for.",
    avatar: "https://avatars.githubusercontent.com/u/231531033?v=4",
    social: {
      github: "https://github.com/samir-60",
      linkedin: "https://www.linkedin.com/in/samir-qureshi-b13b27261/"
    }
  }
];

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.3a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
    </svg>
  );
}

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
            About proCraft
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
              At proCraft, we believe that AI is not just a tool, but a collaborative partner. Our mission is to democratize access to the most powerful AI workflows and trendy prompts, making them accessible to designers, developers, marketers, and dreamers around the world.
            </p>
            <p className="text-muted text-lg leading-relaxed">
              What started as a small directory of tools has evolved into a comprehensive platform where you can discover cutting-edge AI software, find the best prompts to unlock their potential, and convert images to prompts with ease.
            </p>
          </div>
          <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-black/5 dark:border-white/10">
            {/* Placeholder for an about image, falling back to a gradient block if image missing */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-surface-secondary absolute inset-0 -z-10"></div>
              <span className="text-4xl font-bold text-black/10 dark:text-white/10 select-none">proCraft</span>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="py-24 px-4 md:px-8 bg-black/[0.02] dark:bg-white/[0.02] border-t border-black/5 dark:border-white/5 relative overflow-hidden">
        {/* Subtle accent glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-accent/5 blur-[160px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider mb-4">
              The Minds Behind proCraft
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-primary dark:text-white font-bricolage mb-4 tracking-tight" style={{ fontFamily: '"Bricolage Grotesque", var(--font-bricolage), sans-serif' }}>
              Meet Our Team
            </h2>
            <p className="text-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              We are a passionate duo of full-stack engineers and search strategists building the future of AI prompt engineering and creative workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.name}
                className="group relative flex flex-col justify-between bg-white dark:bg-[#111111] border border-black/10 dark:border-white/10 rounded-3xl p-8 md:p-9 transition-all duration-300 hover:shadow-2xl hover:border-accent/40 hover:-translate-y-1.5"
              >
                <div>
                  {/* Member Header: Avatar, Name, Role, Socials */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-6">
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-accent/30 shadow-md group-hover:scale-105 transition-transform duration-300">
                      <Image
                        src={member.avatar}
                        alt={member.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-2xl font-bold font-bricolage text-primary dark:text-white group-hover:text-accent transition-colors" style={{ fontFamily: '"Bricolage Grotesque", var(--font-bricolage), sans-serif' }}>
                          {member.name}
                        </h3>

                        {/* Social Links */}
                        <div className="flex items-center gap-2">
                          {member.social.github && (
                            <a
                              href={member.social.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${member.name}'s GitHub Profile`}
                              className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black flex items-center justify-center text-black/70 dark:text-white/70 transition-colors"
                            >
                              <GitHubIcon className="w-4 h-4" />
                            </a>
                          )}
                          {member.social.linkedin && (
                            <a
                              href={member.social.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${member.name}'s LinkedIn Profile`}
                              className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 hover:bg-[#0077b5] hover:text-white flex items-center justify-center text-black/70 dark:text-white/70 transition-colors"
                            >
                              <LinkedInIcon className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-accent/15 text-accent border border-accent/20 mt-1.5">
                        {member.role}
                      </div>

                      <p className="text-xs font-medium text-black/50 dark:text-white/50 mt-2">
                        {member.shortBio}
                      </p>
                    </div>
                  </div>

                  {/* Comprehensive Bio */}
                  <p className="text-sm text-black/70 dark:text-white/70 leading-relaxed pt-5 border-t border-black/5 dark:border-white/5">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
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
                proCraft is built for and by creators. We rely on the shared knowledge of our community to curate the best resources.
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
