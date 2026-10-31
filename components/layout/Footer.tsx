"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export function Footer() {
  const pathname = usePathname();

  // Hide footer on image-to-prompt, agent-builder and profile pages for full-screen experience
  if (pathname?.startsWith('/image-to-prompt') || pathname?.startsWith('/agent-builder') || pathname?.startsWith('/profile')) {
    return null;
  }

  return (
    <footer className="bg-[#FCFCFC] dark:bg-[#0A0A0A] border-t border-gray-100 dark:border-zinc-900 pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

          {/* Left Column (Brand & Newsletter) */}
          <div className="md:col-span-5 flex flex-col items-start">
            <Link href="/" className="inline-block mb-6 group transition-opacity hover:opacity-90" title="proCraft | Prompt Library">
              <Image
                src="/logo-dark-v2.png"
                alt="proCraft — AI Prompt Library & Directory"
                width={150}
                height={28}
                unoptimized
                className="block dark:hidden h-8 w-auto object-contain"
              />
              <Image
                src="/logo-light-v2.png"
                alt="proCraft — AI Prompt Library & Directory"
                width={150}
                height={28}
                unoptimized
                className="hidden dark:block h-8 w-auto object-contain"
              />
            </Link>

            <h3 className="font-bold text-2xl md:text-3xl mb-2 text-black dark:text-white">
              Stay on top of your creativity
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
              No spam. Just simple advice for staying inspired.
            </p>

            <form className="flex w-full max-w-md items-center bg-gray-100 dark:bg-zinc-900 rounded-full p-1 border border-gray-200 dark:border-zinc-800">
              <input
                type="email"
                placeholder="Enter email address"
                className="flex-1 bg-transparent border-none outline-none px-4 text-sm text-black dark:text-white placeholder:text-gray-500"
                required
              />
              <button
                type="submit"
                className="bg-[#111111] dark:bg-white text-white dark:text-black text-sm font-medium px-6 py-2 rounded-full hover:bg-black/80 dark:hover:bg-gray-100 transition-colors shadow-[0_4px_14px_0_rgba(0,0,0,0.2)] dark:shadow-[0_4px_14px_0_rgba(255,255,255,0.1)]"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Spacer for wider screens */}
          <div className="hidden md:block md:col-span-1"></div>

          {/* Right Columns (Links) */}
          <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Quick links */}
            <div>
              <h4 className="font-semibold text-black dark:text-white mb-6 text-sm">Quick links</h4>
              <ul className="space-y-4">
                {[
                  { name: 'Prompt Library', path: '/prompt-library' },
                  { name: 'AI Directory', path: '/ai-directory' },
                  { name: 'Img to Prompt', path: '/image-to-prompt' },
                  { name: 'Pricing', path: '/pricing', badge: 'Free' },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.path}
                      className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm hover:text-black dark:hover:text-white transition-colors"
                    >
                      <span>{item.name}</span>
                      {item.badge && (
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-black/5 dark:bg-white/10 text-black dark:text-white px-2 py-0.5 rounded-full border border-black/10 dark:border-white/15">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pages */}
            <div>
              <h4 className="font-semibold text-black dark:text-white mb-6 text-sm">Pages</h4>
              <ul className="space-y-4">
                {[
                  { name: 'About', path: '/about' },
                  { name: 'Blog', path: '/blog' },
                  { name: 'Advertise', path: '/ads' },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.path}
                      className="text-gray-500 dark:text-gray-400 text-sm hover:text-black dark:hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-black dark:text-white mb-6 text-sm">Support</h4>
              <ul className="space-y-4">
                {['FAQs', 'Contact', 'Privacy Policy', 'Terms & Conditions'].map((item) => {
                  let href = "#";
                  if (item === 'Contact') href = '/contact';
                  if (item === 'Privacy Policy') href = '/privacy';
                  if (item === 'Terms & Conditions') href = '/terms';

                  return (
                    <li key={item}>
                      <Link href={href} className="text-gray-500 dark:text-gray-400 text-sm hover:text-black dark:hover:text-white transition-colors">{item}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} ProCraft | AI Prompt Library & Directory. All rights reserved.
          </p>
          <div className="flex gap-3">
            <a
              href="https://www.instagram.com/procraft_prompt?xtok=MWI1OWx2aTg0aGs3OA=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Instagram"
              className="w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-900 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-800 hover:text-[#E4405F] dark:hover:text-[#E4405F] transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://www.facebook.com/share/1etWKVnYE1/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              title="Facebook"
              className="w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-900 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-800 hover:text-[#1877F2] dark:hover:text-[#1877F2] transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://pin.it/3yyolhT3M"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pinterest"
              title="Pinterest"
              className="w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-900 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-800 hover:text-[#BD081C] dark:hover:text-[#BD081C] transition-colors"
            >
              <Pinterest className="w-4 h-4" />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              title="X"
              className="w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-900 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-800 hover:text-black dark:hover:text-white transition-colors"
            >
              <Twitter className="w-4 h-4 fill-current" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Pinterest(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 0a12 12 0 0 0-4.37 23.18c-.07-.95-.13-2.42.03-3.46.14-.94.94-6.44.94-6.44s-.24-.48-.24-1.19c0-1.12.65-1.95 1.46-1.95.69 0 1.02.52 1.02 1.14 0 .7-.44 1.73-.67 2.69-.19.81.4 1.46 1.2 1.46 1.44 0 2.55-1.52 2.55-3.71 0-1.94-1.39-3.3-3.39-3.3-2.31 0-3.66 1.73-3.66 3.52 0 .7.27 1.44.61 1.85.07.08.08.15.06.24-.06.27-.21.84-.24.96-.04.16-.13.19-.3.12-1.13-.53-1.84-2.18-1.84-3.51 0-2.86 2.08-5.48 5.99-5.48 3.14 0 5.59 2.24 5.59 5.24 0 3.12-1.97 5.64-4.7 5.64-.92 0-1.78-.48-2.08-1.04l-.56 2.15c-.21.78-.77 1.77-1.14 2.38A12 12 0 1 0 12 0z" />
    </svg>
  );
}

function Instagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function Linkedin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function Facebook(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function Twitter(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
