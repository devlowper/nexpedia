import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions — proCraft',
  description: 'Review the terms and conditions for using the proCraft platform and prompt library.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsConditionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 min-h-[70vh]">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-primary">Terms & Conditions</h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none text-muted">
        <p className="mb-6">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-bold text-primary mt-10 mb-4">1. Agreement to Terms</h2>
        <p className="mb-6">
          By accessing or using our website and services, you agree to be bound by these Terms and Conditions and our Privacy Policy. 
          If you do not agree with any part of these terms, you may not access the service.
        </p>
        
        <h2 className="text-2xl font-bold text-primary mt-10 mb-4">2. Intellectual Property Rights</h2>
        <p className="mb-6">
          Unless otherwise indicated, the Site and Services are our proprietary property and all source code, databases, 
          functionality, software, website designs, audio, video, text, photographs, and graphics on the Site and the 
          trademarks, service marks, and logos contained therein are owned or controlled by us or licensed to us.
        </p>
        
        <h2 className="text-2xl font-bold text-primary mt-10 mb-4">3. User Representations</h2>
        <p className="mb-6">
          By using the Site, you represent and warrant that:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>All registration information you submit will be true, accurate, current, and complete.</li>
          <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
          <li>You have the legal capacity and you agree to comply with these Terms of Use.</li>
          <li>You will not access the Site through automated or non-human means, whether through a bot, script or otherwise.</li>
        </ul>
        
        <h2 className="text-2xl font-bold text-primary mt-10 mb-4">4. Prohibited Activities</h2>
        <p className="mb-6">
          You may not access or use the Site for any purpose other than that for which we make the Site available. 
          The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
        </p>

        <h2 className="text-2xl font-bold text-primary mt-10 mb-4">5. Modifications and Interruptions</h2>
        <p className="mb-6">
          We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. 
          However, we have no obligation to update any information on our Site. We also reserve the right to modify or discontinue all or part of the Site without notice at any time.
        </p>
      </div>
    </div>
  );
}
