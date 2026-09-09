"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AITool } from '../page';
import { Loader2, ArrowLeft, CheckCircle2, Star, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';
import { Toast } from '@/components/ui/Toast';

// Custom SVG Icons matching the visual design
const ShareIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M15 8v-4l7 7-7 7v-4.1c-5 0-8.5 1.6-11 5.1 1-5 4-10 11-11.1z" />
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
  </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const RedditIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M24 11.5c0-1.65-1.35-3-3-3-.96 0-1.86.48-2.42 1.24-1.64-1-3.85-1.64-6.24-1.72l1.37-4.31 3.82.82c.04.93.81 1.67 1.76 1.67 1.02 0 1.84-.83 1.84-1.84S19.3 2.5 18.28 2.5c-.86 0-1.58.59-1.78 1.39l-4.23-.9c-.19-.04-.38.08-.43.27l-1.6 5.03c-2.49.04-4.79.68-6.49 1.71-.56-.75-1.46-1.23-2.41-1.23-1.65 0-3 1.35-3 3 0 1.15.65 2.14 1.59 2.65-.09.45-.14.9-.14 1.35 0 3.73 4.38 6.75 9.75 6.75s9.75-3.02 9.75-6.75c0-.45-.05-.9-.14-1.35.94-.5 1.59-1.49 1.59-2.65zM6.5 14c.83 0 1.5.67 1.5 1.5S7.33 17 6.5 17 5 16.33 5 15.5 5.67 14 6.5 14zm11 5.5c-1.8 1.8-5.2 1.8-7 0-.2-.2-.2-.5 0-.7.2-.2.5-.2.7 0 1.4 1.4 4.2 1.4 5.6 0 .2-.2.5-.2.7 0 .2.2.2.5 0 .7zm-.5-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
  </svg>
);

export default function AIDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [tool, setTool] = useState<AITool | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleShare = async () => {
    if (!tool) return;
    const pageUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: tool.name,
          text: `Check out ${tool.name} on Nexpedia!`,
          url: pageUrl,
        });
      } catch (err: any) {
        console.log('Error sharing:', err);
        // Fallback to clipboard on error or cancellation
        try {
          await navigator.clipboard.writeText(pageUrl);
          setToastMessage('Link copied to clipboard!');
        } catch (clipErr) {
          console.log('Clipboard fallback failed:', clipErr);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(pageUrl);
        setToastMessage('Link copied to clipboard!');
      } catch (err) {
        console.log('Error copying to clipboard:', err);
      }
    }
  };

  useEffect(() => {
    const fetchTool = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/directory/${params.slug}`);
        if (!res.ok) throw new Error('Failed to fetch tool details');
        const data = await res.json();
        if (data.success) {
          setTool(data.data);
        } else {
          throw new Error(data.error || 'Failed to fetch tool');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (params.slug) fetchTool();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-accent" size={40} />
      </div>
    );
  }

  if (error || !tool) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="text-red-500 bg-red-500/10 p-6 rounded-xl border border-red-500/20 max-w-lg text-center">
          <h2 className="text-xl font-bold mb-2">Error Loading Details</h2>
          <p className="text-muted">{error || 'Tool not found.'}</p>
          <button
            onClick={() => router.back()}
            className="mt-6 px-4 py-2 bg-black/5 dark:bg-black/10 dark:bg-white/10 rounded-lg transition-colors flex items-center gap-2 mx-auto"
          >
            <ArrowLeft size={16} /> Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <button
        onClick={() => router.back()}
        className="mb-8 text-muted hover:text-primary flex items-center gap-2 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Directory
      </button>

      {/* Header Section */}
      <div className="bg-black/5 dark:bg-black/5 dark:bg-white/5 border border-border rounded-3xl p-8 md:p-12 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 blur-[100px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />

        <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-elevated border border-border shadow-2xl flex items-center justify-center shrink-0 overflow-hidden p-2">
            {tool.logo ? (
              <img src={tool.logo} alt={tool.name} className="w-full h-full object-contain" />
            ) : (
              <Sparkles className="text-accent" size={40} />
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <h1 className="text-4xl md:text-5xl font-extrabold">{tool.name}</h1>
              {tool.isVerified && (
                <ShieldCheck className="text-blue-400" size={28} />
              )}
            </div>

            <p className="text-xl text-accent font-medium mb-4">{tool.tagline}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {tool.categories?.map(cat => (
                <span key={cat} className="px-3 py-1 bg-black/5 dark:bg-black/5 dark:bg-white/5 border border-border rounded-full text-sm">
                  {cat}
                </span>
              ))}
              {tool.badges?.map(badge => (
                <span key={badge} className="px-3 py-1 bg-accent/10 text-accent border border-accent/20 rounded-full text-sm font-semibold">
                  {badge}
                </span>
              ))}
              {tool.rating !== undefined && tool.rating > 0 && (
                <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-full text-sm font-bold flex items-center gap-1">
                  <Star size={14} className="fill-yellow-500" /> {tool.rating}
                  {tool.reviewCount ? ` (${tool.reviewCount})` : ''}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-4 items-center mt-6">
              {tool.websiteUrl && (
                <a
                  href={tool.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-[#19c05b] text-black rounded-xl font-bold transition-transform hover:scale-105 shrink-0"
                >
                  Visit Website <ExternalLink size={18} />
                </a>
              )}

              <div className="flex items-center gap-3 bg-black/5 dark:bg-black/5 dark:bg-white/5 border border-border rounded-2xl p-2 pl-3 pr-3">
                {/* Share Icon */}
                <button
                  onClick={handleShare}
                  className="w-10 h-10 rounded-full bg-black/10 dark:bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:bg-black/20 dark:bg-white/20 text-primary flex items-center justify-center transition-all duration-200 cursor-pointer shrink-0"
                  title="Share this tool"
                >
                  <ShareIcon className="w-5 h-5" />
                </button>

                {/* Divider if socials exist */}
                {(() => {
                  const socialLinks = tool.socialLinks || {};
                  const hasSocials = Object.keys(socialLinks).length > 0 && Object.values(socialLinks).some(link => typeof link === 'string' && link.trim() !== '');
                  return (
                    <>
                      {hasSocials && (
                        <div className="h-6 w-px bg-black/10 dark:bg-black/10 dark:bg-white/10 mx-1 shrink-0" />
                      )}

                      {hasSocials ? (
                        <div className="flex items-center gap-2">
                          {socialLinks.facebook && (
                            <a
                              href={socialLinks.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 rounded-full bg-black/10 dark:bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:bg-black/20 dark:bg-white/20 text-primary flex items-center justify-center transition-all duration-200 shrink-0"
                              title="Facebook"
                            >
                              <FacebookIcon className="w-5 h-5" />
                            </a>
                          )}
                          {(socialLinks.twitter || socialLinks.x) && (
                            <a
                              href={socialLinks.twitter || socialLinks.x}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 rounded-full bg-black/10 dark:bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:bg-black/20 dark:bg-white/20 text-primary flex items-center justify-center transition-all duration-200 shrink-0"
                              title="X (formerly Twitter)"
                            >
                              <XIcon className="w-5 h-5" />
                            </a>
                          )}
                          {socialLinks.linkedin && (
                            <a
                              href={socialLinks.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 rounded-full bg-black/10 dark:bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:bg-black/20 dark:bg-white/20 text-primary flex items-center justify-center transition-all duration-200 shrink-0"
                              title="LinkedIn"
                            >
                              <LinkedinIcon className="w-5 h-5" />
                            </a>
                          )}
                          {socialLinks.reddit && (
                            <a
                              href={socialLinks.reddit}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 rounded-full bg-black/10 dark:bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:bg-black/20 dark:bg-white/20 text-primary flex items-center justify-center transition-all duration-200 shrink-0"
                              title="Reddit"
                            >
                              <RedditIcon className="w-5 h-5" />
                            </a>
                          )}
                          {socialLinks.instagram && (
                            <a
                              href={socialLinks.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 rounded-full bg-black/10 dark:bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:bg-black/20 dark:bg-white/20 text-primary flex items-center justify-center transition-all duration-200 shrink-0"
                              title="Instagram"
                            >
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                              </svg>
                            </a>
                          )}
                          {socialLinks.youtube && (
                            <a
                              href={socialLinks.youtube}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 rounded-full bg-black/10 dark:bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:bg-black/20 dark:bg-white/20 text-primary flex items-center justify-center transition-all duration-200 shrink-0"
                              title="YouTube"
                            >
                              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.5 12 3.5 12 3.5s-7.518 0-9.388.553a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.553 9.388.553 9.388.553s7.518 0 9.388-.553a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                              </svg>
                            </a>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted text-sm font-medium ml-2 select-none whitespace-nowrap">
                          No social media links available
                        </span>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Details in 1st Card */}
        {(tool.pricing || (tool.pricingTiers && tool.pricingTiers.length > 0)) && (
          <div className="mt-8 pt-8 border-t border-border relative z-10">
            <h3 className="text-lg font-bold mb-4 uppercase tracking-wider text-muted">Pricing Details</h3>
            {tool.pricing && (
              <div className="inline-block px-3 py-1 bg-black/10 dark:bg-black/10 dark:bg-white/10 border border-border rounded-lg text-sm font-semibold mb-6">
                Model: {tool.pricing}
              </div>
            )}

            {tool.pricingTiers && tool.pricingTiers.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tool.pricingTiers.map((tier, idx) => (
                  <div key={idx} className="flex justify-between items-center p-4 bg-black/40 rounded-xl border border-border">
                    <span className="font-medium text-primary/90">{tier.name}</span>
                    <span className="font-bold text-accent">{tier.price}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="space-y-8">
        {/* Main Content Area */}
        <section className="bg-black/5 dark:bg-black/5 dark:bg-white/5 border border-border rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">About {tool.name}</h2>
          <p className="text-muted leading-relaxed text-lg">{tool.description}</p>
        </section>

        {tool.features && tool.features.length > 0 && (
          <section className="bg-black/5 dark:bg-black/5 dark:bg-white/5 border border-border rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="text-accent" /> Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tool.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-black/20 p-4 rounded-xl border border-border">
                  <CheckCircle2 className="text-accent shrink-0 mt-0.5" size={18} />
                  <span className="text-primary/90 text-sm leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {tool.pros && tool.pros.length > 0 && (
          <section className="bg-black/5 dark:bg-black/5 dark:bg-white/5 border border-border rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-primary">Why use it?</h2>
            <ul className="space-y-4">
              {tool.pros.map((pro, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <span className="text-accent text-xs font-bold">✓</span>
                  </div>
                  <span className="text-muted pt-0.5">{pro}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}
