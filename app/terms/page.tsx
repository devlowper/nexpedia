import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions | proCraft',
  description: 'Review the terms and conditions governing your access to and use of proCraft.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsConditionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 min-h-[70vh]">
      <div className="mb-10 pb-6 border-b border-border/40">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-3">
          Terms and Conditions
        </h1>
        <p className="text-sm text-muted-foreground font-medium">
          Last updated: October 25, 2026
        </p>
      </div>

      <div className="space-y-10 text-muted-foreground leading-relaxed text-base md:text-lg">
        <p className="text-foreground/90 text-lg">
          Welcome to proCraft. These Terms and Conditions (&ldquo;Terms&rdquo;) govern your access to and use of{' '}
          <a href="https://procraft.site" className="text-primary hover:underline font-medium" target="_blank" rel="noopener noreferrer">
            https://procraft.site
          </a>
          , including our prompt library, image-to-prompt tools, and related services (collectively, the &ldquo;Service&rdquo;).
        </p>
        <p className="text-foreground/90 text-lg">
          By accessing or using proCraft, you agree to these Terms and our Privacy Policy. If you do not agree, please do not use the Service.
        </p>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground">1. About proCraft</h2>
          <p>
            proCraft is operated by MD Rakib Hossen in Bangladesh. The Service provides access to curated AI prompts and tools that help users generate descriptive prompts from images and text inputs.
          </p>
          <p>
            References to &ldquo;proCraft,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo; mean the operator of the Service.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground">2. Eligibility</h2>
          <p>
            You must be at least 13 years old to use proCraft, or older if required by applicable law. Users under 18 must have the consent and appropriate supervision of a parent or legal guardian where required by law.
          </p>
          <p>
            By using the Service, you represent that you meet the applicable eligibility requirements.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground">3. User Accounts and Security</h2>
          <p>
            proCraft supports Google sign-in through Firebase Authentication.
          </p>
          <p>
            You are responsible for providing accurate information, maintaining the security of your account, and all activities conducted through your account, except where applicable law provides otherwise.
          </p>
          <p>
            If you suspect unauthorized access to your account, contact us promptly at{' '}
            <a href="mailto:ahmedrakin45@gmail.com" className="text-primary hover:underline">
              ahmedrakin45@gmail.com
            </a>
            .
          </p>
          <p>
            We may suspend or terminate accounts that violate these Terms or pose a security risk, subject to applicable law.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground">4. Free and Paid Plans</h2>
          <p>
            proCraft offers free and paid access options. Features, usage allowances, and other benefits may vary by plan.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-foreground">Free access:</strong> Free features may be subject to daily generation limits, fair-use restrictions, or other usage limits.
            </li>
            <li>
              <strong className="text-foreground">Paid access:</strong> Paid features, prices, billing periods, and applicable usage limits will be presented through the relevant purchase or subscription interface.
            </li>
            <li>
              <strong className="text-foreground">Usage limits:</strong> We may apply reasonable technical restrictions to protect service availability and prevent abuse.
            </li>
            <li>
              <strong className="text-foreground">Changes to plans:</strong> We may introduce, modify, or discontinue plans and features. Where changes affect existing paid subscriptions, we will provide notice and handle them in accordance with applicable law and the applicable subscription terms.
            </li>
          </ul>
          <p>
            You are responsible for reviewing the price, billing frequency, renewal conditions, and other terms presented before completing a purchase. Cancellation, renewal, refund eligibility, and payment-provider terms will be governed by the applicable checkout terms and any mandatory consumer protections.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground">5. Acceptable Use</h2>
          <p>You agree to use proCraft lawfully and responsibly. You must not:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Upload or submit content that is unlawful, defamatory, harassing, hateful, sexually exploitative, or otherwise prohibited by applicable law.</li>
            <li>Violate another person&apos;s privacy, intellectual property rights, or other legal rights.</li>
            <li>Use bots, scrapers, crawlers, or automated scripts to extract prompts or other Service content without our written permission.</li>
            <li>Bypass usage limits, interfere with security controls, probe for vulnerabilities, or overload our infrastructure.</li>
            <li>Reverse-engineer, decompile, or attempt to obtain the source code of the Service except where such restrictions are prohibited by law.</li>
            <li>Use the Service to facilitate fraud, unlawful harm, or other prohibited activity.</li>
            <li>Use generated outputs in a way that violates the terms or policies of the relevant AI provider.</li>
          </ul>
          <p>We may investigate suspected misuse and take reasonable action to protect the Service and its users.</p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground">6. User Content and Uploaded Images</h2>
          <p>
            You retain ownership of images you upload and text you submit, subject to any rights held by third parties.
          </p>
          <p>
            You are responsible for ensuring that you have the necessary rights and permissions to upload, process, or use your content.
          </p>
          <p>
            You grant proCraft a limited, non-exclusive license to transmit, process, and use your submitted content as reasonably necessary to operate the requested feature, generate outputs, maintain service security, and provide the Service. We do not claim ownership of your uploaded images or submitted prompts.
          </p>
          <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 text-sm">
            <strong className="text-foreground">Image retention notice:</strong> The precise retention period and deletion process for uploaded images must be confirmed against the actual storage configuration and AI processing pipeline before this section is published. See the pre-publication checklist accompanying this draft.
          </div>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground">7. Generated Prompts and Library Content</h2>
          <h3 className="text-lg font-semibold text-foreground pt-2">Curated library</h3>
          <p>
            The selection, arrangement, categorization, formatting, original explanatory text, and presentation of the proCraft prompt library are owned by proCraft or its respective licensors, subject to applicable third-party rights. You may not copy or redistribute substantial portions of the curated library or use automated extraction to reproduce the Service without permission.
          </p>
          <h3 className="text-lg font-semibold text-foreground pt-2">AI-generated prompts</h3>
          <p>
            Subject to applicable law and third-party rights, you may use, copy, edit, and distribute prompts generated through proCraft for personal or commercial projects.
          </p>
          <p>
            AI-generated outputs may resemble existing content and may not be unique. We do not guarantee exclusivity, originality, accuracy, or suitability for any particular purpose. You are responsible for reviewing outputs and ensuring that your intended use complies with applicable law and the terms of the relevant AI platform.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground">8. Intellectual Property</h2>
          <p>
            The proCraft name, logo, branding, website design, original content, and software are owned by proCraft or its licensors, except for user content and third-party materials.
          </p>
          <p>
            You may not reproduce, modify, distribute, or create derivative works from our protected brand assets or proprietary materials without permission, except where permitted by law.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground">9. Third-Party Services</h2>
          <p>proCraft relies on third-party services to operate certain features, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Google Sign-In and Firebase services.</li>
            <li>Cloudflare hosting, DNS, and content delivery services.</li>
            <li>OpenRouter and the AI model providers used for image analysis and prompt generation.</li>
          </ul>
          <p>
            These providers operate under their own terms and privacy policies. When you use features that depend on them, relevant data may be transmitted to those providers to fulfill your request. We are not responsible for third-party services to the extent permitted by law, but this does not exclude liability that cannot legally be excluded.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground">10. AI Output Disclaimer</h2>
          <p>
            The Service uses artificial intelligence to generate prompts and related outputs. Results may be inaccurate, incomplete, misleading, inappropriate, or unsuitable for your intended use.
          </p>
          <p>
            The Service is provided as a creative assistance tool, not as a guarantee of factual accuracy, originality, or commercial clearance.
          </p>
          <p>
            You are responsible for checking generated content before using it, including verifying facts, permissions, licensing requirements, and compliance with third-party platform policies.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground">11. Availability and Changes</h2>
          <p>
            We aim to maintain the availability of proCraft but do not guarantee uninterrupted or error-free operation.
          </p>
          <p>
            We may update, modify, suspend, or discontinue features when reasonably necessary for maintenance, security, operational requirements, or business reasons, subject to applicable law and any applicable paid subscription terms.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground">12. Suspension and Termination</h2>
          <p>
            We may restrict or terminate access where reasonably necessary because of a violation of these Terms, suspected fraud, security threats, unlawful activity, or misuse of the Service.
          </p>
          <p>
            You may stop using proCraft at any time. To request account deletion, contact{' '}
            <a href="mailto:ahmedrakin45@gmail.com" className="text-primary hover:underline">
              ahmedrakin45@gmail.com
            </a>{' '}
            from your registered email address. Account deletion does not necessarily cancel a separate paid subscription. You should cancel any active subscription through the relevant subscription or payment interface where applicable.
          </p>
          <p>
            We will handle termination, outstanding payments, and data deletion in accordance with applicable law.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground">13. Disclaimer of Warranties</h2>
          <p>
            To the maximum extent permitted by applicable law, proCraft is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis, without warranties that cannot be excluded by law.
          </p>
          <p>
            We do not guarantee that the Service will be uninterrupted, error-free, secure in every circumstance, or suitable for a particular purpose. Nothing in these Terms excludes any statutory rights or warranties that cannot legally be excluded.
          </p>
        </section>

        {/* Section 14 */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground">14. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, proCraft and its operator will not be liable for indirect, incidental, special, consequential, or punitive losses arising from your use of, or inability to use, the Service.
          </p>
          <p>
            To the extent permitted by law, our aggregate liability for claims relating to the Service will not exceed the greater of the amount you paid to proCraft during the 12 months preceding the event giving rise to the claim or USD 20.
          </p>
          <p>
            This limitation does not apply to liability that cannot lawfully be limited or excluded, including any liability that applicable law requires us to retain.
          </p>
        </section>

        {/* Section 15 */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground">15. Indemnification</h2>
          <p>
            To the extent permitted by applicable law, you agree to be responsible for claims, losses, liabilities, and reasonable expenses arising from your unlawful use of the Service, your material violation of these Terms, or your infringement of another person&apos;s rights.
          </p>
          <p>
            Nothing in this section requires you to indemnify proCraft for losses caused by our own unlawful conduct.
          </p>
        </section>

        {/* Section 16 */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground">16. Governing Law and Disputes</h2>
          <p>
            These Terms are governed by the laws of Bangladesh, subject to any mandatory legal protections that apply to you.
          </p>
          <p>
            Disputes relating to the Service will be handled by the competent courts of Bangladesh where legally appropriate. Nothing in this section removes any mandatory right you may have to bring a claim in another competent forum.
          </p>
        </section>

        {/* Section 17 */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground">17. Changes to These Terms</h2>
          <p>
            We may revise these Terms to reflect changes to the Service, our business practices, or legal requirements.
          </p>
          <p>
            When we update these Terms, we will revise the &ldquo;Last updated&rdquo; date. Where required by law, we will provide notice of material changes. Continued use of the Service after changes take effect constitutes acceptance where legally valid.
          </p>
        </section>

        {/* Section 18 */}
        <section className="space-y-3 pt-4 border-t border-border/40">
          <h2 className="text-2xl font-bold text-foreground">18. Contact Information</h2>
          <p>For questions, support requests, or concerns regarding these Terms, contact:</p>
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
