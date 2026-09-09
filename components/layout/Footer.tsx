import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#FCFCFC] dark:bg-[#0A0A0A] border-t border-gray-100 dark:border-zinc-900 pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Left Column (Brand & Newsletter) */}
          <div className="md:col-span-5 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-2 group mb-6">
              <div className="w-8 h-8 rounded flex items-center justify-center bg-accent text-black font-black text-xl">
                N
              </div>
              <span className="font-bold text-xl tracking-tight text-black dark:text-white">
                Nexpedia
              </span>
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
                {['Features', 'Use Cases', 'Social proof', 'Numbers', 'AI Suggestions'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-500 dark:text-gray-400 text-sm hover:text-black dark:hover:text-white transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pages */}
            <div>
              <h4 className="font-semibold text-black dark:text-white mb-6 text-sm">Pages</h4>
              <ul className="space-y-4">
                {['About', 'Waitlist', 'Changelog', 'Error 404'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-500 dark:text-gray-400 text-sm hover:text-black dark:hover:text-white transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-black dark:text-white mb-6 text-sm">Support</h4>
              <ul className="space-y-4">
                {['FAQs', 'Contact', 'Privacy Policy', 'Terms & Conditions'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-500 dark:text-gray-400 text-sm hover:text-black dark:hover:text-white transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Designed by Nexpedia
          </p>
          <div className="flex gap-3">
            <a href="#" className="w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-900 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-800 hover:text-black dark:hover:text-white transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-900 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-800 hover:text-black dark:hover:text-white transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-900 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-800 hover:text-black dark:hover:text-white transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-900 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-800 hover:text-black dark:hover:text-white transition-colors">
              <Twitter className="w-4 h-4 fill-current" />
            </a>
          </div>
        </div>
      </div>
    </footer>
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
