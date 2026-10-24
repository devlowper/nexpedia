import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — proCraft',
  description: 'Understand how proCraft collects, uses, protects, and retains your data.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 min-h-[70vh]">
      <div className="mb-10 pb-6 border-b border-border/40">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-3">
          Privacy Policy
        </h1>
        <p className="text-sm text-muted-foreground font-medium">
          Last updated: October 25, 2026
        </p>
      </div>

      <div className="space-y-10 text-muted-foreground leading-relaxed text-base md:text-lg">
        <p className="text-foreground/90 text-lg">
          proCraft (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates{' '}
          <a href="https://procraft.site" className="text-primary hover:underline font-medium" target="_blank" rel="noopener noreferrer">
            https://procraft.site
          </a>
          . This Privacy Policy explains how we collect, use, disclose, and retain information when you use our prompt library, image-to-prompt tools, and related services (collectively, the &ldquo;Service&rdquo;).
        </p>
        <p className="text-foreground/90 text-lg">
          By using the Service, you acknowledge this Privacy Policy. Where applicable law requires consent for a particular processing activity, we will seek that consent separately.
        </p>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground">1. Information We Collect</h2>
          <p>
            We collect information needed to provide, maintain, and protect the Service. The information collected may include:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong className="text-foreground">Account information:</strong> When you sign in using Google through Firebase Authentication, we may receive your name, email address, profile photo URL, and unique account identifier.
            </li>
            <li>
              <strong className="text-foreground">Uploaded images and submitted content:</strong> When you use our image-to-prompt tools, you may submit images and text for processing. The information necessary to fulfill your request may be transmitted to our AI processing providers.
            </li>
            <li>
              <strong className="text-foreground">Saved prompts and preferences:</strong> We may store prompts you save, favorite, bookmark, or add to your collection, together with relevant account information.
            </li>
            <li>
              <strong className="text-foreground">Technical information:</strong> Our hosting and infrastructure providers may process technical information such as IP addresses, browser and device information, access timestamps, referring URLs, and security or diagnostic logs.
            </li>
            <li>
              <strong className="text-foreground">Cookies and local storage:</strong> The website may use cookies, local storage, or similar technologies to maintain authentication sessions, remember preferences, and support features such as guest saved prompts.
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground">2. Google Account Information</h2>
          <p>
            When you sign in using Google, we use the information provided through Firebase Authentication to create or identify your account, authenticate your session, and display your profile.
          </p>
          <p>
            We do not sell Google account information or use it for targeted advertising or credit evaluation.
          </p>
          <p>
            We do not intentionally provide Google account information to AI model providers for training public AI models. Information necessary to fulfill a feature request is handled separately as described in the third-party processing section below.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground">3. How We Use Information</h2>
          <p>We use relevant information for the following purposes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To create and authenticate user accounts.</li>
            <li>To provide saved prompts, favorites, and account features.</li>
            <li>To process uploaded images and text to generate descriptive prompts.</li>
            <li>To operate, maintain, and improve the functionality and reliability of the Service.</li>
            <li>To detect abuse, investigate security incidents, and protect our systems.</li>
            <li>To respond to support requests and communicate important service-related notices.</li>
            <li>To comply with applicable legal obligations.</li>
          </ul>
          <p className="text-sm italic pt-1">
            We do not use Google Analytics or Firebase Analytics, based on our current stated configuration. This statement should be rechecked against the deployed website and its configuration before publication.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground">4. Legal Basis for Processing</h2>
          <p>
            Where applicable data protection law requires a legal basis, we process personal information on the basis appropriate to the activity, which may include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-foreground">Contract:</strong> To provide the features and services you request.</li>
            <li><strong className="text-foreground">Legitimate interests:</strong> To secure, maintain, and improve the Service, where permitted by law.</li>
            <li><strong className="text-foreground">Consent:</strong> Where you have given consent for a specific activity and consent is legally required.</li>
            <li><strong className="text-foreground">Legal obligations:</strong> To comply with applicable laws and lawful requests.</li>
          </ul>
          <p>The applicable legal basis depends on the processing activity and your location.</p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground">5. Third-Party Services and Data Sharing</h2>
          <p>
            We do not sell personal information. We may share or transmit relevant information to service providers where necessary to operate the Service.
          </p>
          <div className="space-y-4 pt-2">
            <div className="p-4 rounded-xl border border-border/60 bg-muted/20">
              <h3 className="font-semibold text-foreground mb-1">Google and Firebase</h3>
              <p className="text-sm">Used for authentication and, where configured, database or related application services.</p>
            </div>
            <div className="p-4 rounded-xl border border-border/60 bg-muted/20">
              <h3 className="font-semibold text-foreground mb-1">Cloudflare</h3>
              <p className="text-sm">Used for hosting, DNS, content delivery, and infrastructure security. Cloudflare may process technical and traffic information to provide these services.</p>
            </div>
            <div className="p-4 rounded-xl border border-border/60 bg-muted/20">
              <h3 className="font-semibold text-foreground mb-1">OpenRouter and AI model providers</h3>
              <p className="text-sm">
                When you request image analysis or prompt generation, relevant images, text inputs, and processing parameters may be transmitted through OpenRouter to the AI models selected for the request.
              </p>
              <p className="text-sm mt-2">
                These providers process data under their respective terms and policies. Their retention practices and data-use rules may differ. Do not assume that every provider immediately deletes submitted content or excludes it from all forms of logging or processing.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-border/60 bg-muted/20">
              <h3 className="font-semibold text-foreground mb-1">Other providers</h3>
              <p className="text-sm">
                Additional service providers may process information if needed to support a feature you choose or to meet legal requirements. Any such sharing should be limited to the relevant purpose.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground">6. Data Retention</h2>
          <p>
            We retain information according to the purpose for which it is processed, applicable legal obligations, and operational requirements.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-foreground">Account information:</strong> May be retained while your account remains active and for an appropriate period afterward where needed for legal compliance, security, or dispute resolution.</li>
            <li><strong className="text-foreground">Saved prompts and preferences:</strong> May remain stored while associated with your account or until deleted, subject to applicable retention requirements.</li>
            <li><strong className="text-foreground">Technical logs:</strong> Infrastructure providers may retain logs for security, diagnostics, and operational purposes according to their own retention policies.</li>
          </ul>
          <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 text-sm mt-3">
            <p className="font-medium text-foreground mb-1">Uploaded images:</p>
            <p>
              The exact storage location, retention period, and deletion process have not yet been verified. These details must be confirmed against the actual application code, storage configuration, and AI provider arrangements before this Privacy Policy is published. We will not claim that uploaded images are deleted immediately or within a specific number of hours until that behavior has been technically confirmed.
            </p>
          </div>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground">7. Cookies and Local Storage</h2>
          <p>
            We may use essential cookies and local storage to maintain authentication sessions, remember user preferences, and support saved items or other website features.
          </p>
          <p>
            You can manage cookies through your browser settings. Disabling essential storage technologies may prevent certain features, including sign-in, from functioning correctly.
          </p>
          <p>
            Any non-essential tracking technologies, if introduced in the future, should be disclosed and handled in accordance with applicable consent requirements.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground">8. Your Privacy Rights</h2>
          <p>Depending on your location and applicable law, you may have rights to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Request access to personal information we hold about you.</li>
            <li>Request correction of inaccurate or incomplete information.</li>
            <li>Request deletion of your personal information.</li>
            <li>Request a copy of certain information in a portable format.</li>
            <li>Object to or restrict certain processing activities.</li>
            <li>Withdraw consent where processing is based on consent.</li>
            <li>Lodge a complaint with an appropriate data protection authority.</li>
          </ul>
          <p>
            To exercise an applicable right, contact{' '}
            <a href="mailto:ahmedrakin@gmail.com" className="text-primary hover:underline">
              ahmedrakin@gmail.com
            </a>
            . We may need to verify your identity before fulfilling a request.
          </p>
          <div className="p-5 rounded-2xl border border-border/60 bg-muted/30 space-y-2 mt-2">
            <h3 className="font-semibold text-foreground">Account deletion</h3>
            <p className="text-sm">
              To request account deletion, send an email from your registered account to{' '}
              <a href="mailto:ahmedrakin@gmail.com" className="text-primary hover:underline font-medium">
                ahmedrakin@gmail.com
              </a>{' '}
              with the subject line &ldquo;Account Deletion Request.&rdquo;
            </p>
            <p className="text-sm">
              We aim to process deletion requests within 30 days, subject to identity verification, technical requirements, and applicable legal obligations. Information that must lawfully be retained may be kept for the required period.
            </p>
            <p className="text-sm">
              Deleting your proCraft account does not automatically cancel a separate paid subscription. Please cancel any active subscription through the relevant subscription or payment interface where applicable.
            </p>
          </div>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground">9. Data Security</h2>
          <p>
            We use appropriate measures intended to protect information processed through the Service. These measures may include secure connections, access restrictions, and security features provided by our infrastructure providers.
          </p>
          <p>
            No method of electronic transmission or storage can be guaranteed to be completely secure. We therefore cannot promise absolute security. Any description of specific technical safeguards should reflect measures that are actually implemented and maintained.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground">10. Children&apos;s Privacy</h2>
          <p>
            proCraft is not intended for children under 13, and we do not knowingly collect personal information from children under 13.
          </p>
          <p>
            If you believe a child under 13 has provided personal information through the Service, contact{' '}
            <a href="mailto:ahmedrakin@gmail.com" className="text-primary hover:underline">
              ahmedrakin@gmail.com
            </a>{' '}
            so that we can assess the situation and take appropriate action in accordance with applicable law. Where local law establishes a higher minimum age or additional consent requirements, those requirements apply.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground">11. International Data Transfers</h2>
          <p>
            proCraft is operated from Bangladesh. Our service providers may process information in Bangladesh, the United States, or other jurisdictions, depending on their infrastructure and the services used.
          </p>
          <p>
            Where personal information is transferred internationally, we will take steps required by applicable law to support lawful transfers and appropriate protection.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground">12. Third-Party Links and Services</h2>
          <p>
            The Service may link to third-party websites or integrate third-party tools. Their privacy practices are governed by their own policies, not this Privacy Policy. We encourage you to review the privacy terms of any third-party service before submitting personal information to it.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground">13. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy as the Service, our practices, or applicable legal requirements change.
          </p>
          <p>
            We will update the &ldquo;Last updated&rdquo; date when revisions are made and provide additional notice where required by law. We encourage you to review this page periodically.
          </p>
        </section>

        {/* Section 14 */}
        <section className="space-y-3 pt-4 border-t border-border/40">
          <h2 className="text-2xl font-bold text-foreground">14. Contact Information</h2>
          <p>For privacy questions, requests, or concerns, contact:</p>
          <div className="space-y-1 text-sm bg-muted/40 p-5 rounded-2xl border border-border/50">
            <p><strong className="text-foreground">Website:</strong> <a href="https://procraft.site" className="text-primary hover:underline">https://procraft.site</a></p>
            <p><strong className="text-foreground">Operator:</strong> MD Rakib Hossen / proCraft</p>
            <p><strong className="text-foreground">Location:</strong> Bangladesh</p>
            <p><strong className="text-foreground">Email:</strong> <a href="mailto:ahmedrakin45@gmail.com" className="text-primary hover:underline">ahmedrakin45@gmail.com</a></p>
          </div>
        </section>
      </div>
    </div>
  );
}
