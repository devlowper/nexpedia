import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Nexpedia',
  description: 'Learn how Nexpedia protects your privacy and personal data.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 min-h-[70vh]">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-primary">Privacy Policy</h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none text-muted">
        <p className="mb-6">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-bold text-primary mt-10 mb-4">1. Introduction</h2>
        <p className="mb-6">
          Welcome to Nexpedia. We respect your privacy and are committed to protecting your personal data. 
          This privacy policy will inform you as to how we look after your personal data when you visit our website 
          and tell you about your privacy rights and how the law protects you.
        </p>
        
        <h2 className="text-2xl font-bold text-primary mt-10 mb-4">2. The Data We Collect About You</h2>
        <p className="mb-6">
          Personal data, or personal information, means any information about an individual from which that person can be identified. 
          We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
          <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
          <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version.</li>
          <li><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
        </ul>
        
        <h2 className="text-2xl font-bold text-primary mt-10 mb-4">3. How We Use Your Data</h2>
        <p className="mb-6">
          We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
          <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
          <li>Where we need to comply with a legal obligation.</li>
        </ul>

        <h2 className="text-2xl font-bold text-primary mt-10 mb-4">4. Contact Us</h2>
        <p className="mb-6">
          If you have any questions about this privacy policy or our privacy practices, please contact us via our contact page.
        </p>
      </div>
    </div>
  );
}
