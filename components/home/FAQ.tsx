'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const faqs = [
  {
    id: 'q1',
    question: 'Q1 What is Nexpedia and who is it for?',
    answer: 'Nexpedia is a comprehensive directory and workspace for exploring the best AI tools, models, and prompts. It is designed for creators, developers, marketers, and anyone looking to boost their productivity by finding the perfect AI solutions for their workflow.'
  },
  {
    id: 'q2',
    question: 'Q2 How do I find the best AI tool for my specific needs?',
    answer: 'You can use our structured categories (such as LLMs, AI Image Models, and AI Video Models) or browse curated use cases to discover tools that match your specific requirements. We compare features and capabilities to help you make informed decisions.'
  },
  {
    id: 'q3',
    question: 'Q3 Do I need coding skills to use the prompt library?',
    answer: 'Not at all! Our prompt library is designed to be user-friendly for everyone. You can simply copy, paste, and adapt the provided prompts for various models like ChatGPT, Midjourney, and Claude to get high-quality results immediately.'
  },
  {
    id: 'q4',
    question: 'Q4 Can I organize and save my favorite AI models?',
    answer: 'Yes, Nexpedia allows you to build a personalized AI workspace. You can keep track of your favorite tools, save prompt templates, and organize resources to streamline your daily AI workflows.'
  },
  {
    id: 'q5',
    question: 'Q5 How often is the AI directory updated with new models?',
    answer: 'We continuously monitor the AI industry and update our directory weekly with the newest releases and trending models, ensuring you always have access to state-of-the-art tools like Flux, Veo, and the latest LLMs.'
  }
];

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="w-full bg-base dark:bg-[#0a0a0a] py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-primary dark:text-white mb-8 tracking-tight">FAQ</h2>
        
        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            
            return (
              <div 
                key={faq.id}
                className="rounded-xl border border-black/5 dark:border-white/5 bg-elevated dark:bg-[#141414] overflow-hidden transition-colors hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
                onClick={() => toggle(faq.id)}
              >
                <div className="flex items-center justify-between p-5">
                  <h3 className="font-bold text-primary dark:text-white text-[15px]">
                    {faq.question}
                  </h3>
                  <div className="w-7 h-7 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0">
                    <ChevronDown 
                      size={16} 
                      className={cn(
                        "text-black/50 dark:text-gray-400 transition-transform duration-300",
                        isOpen && "rotate-180"
                      )} 
                    />
                  </div>
                </div>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 text-black/60 dark:text-gray-400 text-sm leading-relaxed border-t border-black/5 dark:border-white/5 pt-3">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
