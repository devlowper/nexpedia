"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  CheckCircle2, AlertTriangle, BookOpen, Sparkles, ArrowRight,
  Layers, Lightbulb, RefreshCw, Zap, Copy, Check, Eye, Sliders,
  HelpCircle, ShieldCheck, Camera, FileText
} from 'lucide-react';
import { AdsterraBanner, AdsterraResponsiveBanner } from '@/components/ads/AdsterraBanner';

function CopyablePrompt({ title, prompt }: { title?: string; prompt: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-zinc-900/70 shadow-sm">
      {title && (
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]">
          <span className="text-xs font-bold text-primary flex items-center gap-1.5">
            <Sparkles size={13} className="text-accent" />
            {title}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-[11px] font-semibold text-accent hover:text-accent-hover transition-colors px-2 py-1 rounded-md bg-accent/10"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? 'Copied!' : 'Copy Prompt'}
          </button>
        </div>
      )}
      <div className="p-4 font-mono text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed whitespace-pre-wrap">
        {prompt}
      </div>
      {!title && (
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 flex items-center gap-1 text-[11px] font-semibold text-accent hover:text-accent-hover transition-colors px-2.5 py-1 rounded-md bg-accent/10 backdrop-blur-md border border-accent/20"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      )}
    </div>
  );
}

export default function GPTImagePromptGuidePostContent() {
  return (
    <div className="text-base text-black/80 dark:text-white/80 leading-relaxed space-y-10 font-sans">
      {/* Intro & Overview */}
      <div className="text-lg md:text-xl font-medium leading-relaxed text-primary/95 space-y-5">
        <p>
          Most people write image prompts as if they are describing a painting. <strong>GPT Image 2.5</strong> rewards a different habit: writing prompts like a short creative brief that says <strong>what to make, what to change, and what must stay exactly as it is.</strong>
        </p>
        <p>
          That last part is the real upgrade. Earlier models could produce beautiful pictures, but the moment you asked for one small edit, something else would quietly shift: a face, a logo, the camera angle, the whole layout. GPT Image 2.5 is much better at changing one thing and leaving the rest alone, but only when your prompt tells it where the boundaries are.
        </p>
        <p className="text-base text-black/70 dark:text-white/70">
          In this guide we will cover how to structure prompts for new images and edits, how to use reference images, how to get exact text, how to make transparent assets, and which model to pick. You will also get copy-paste prompts you can use today.
        </p>
      </div>

      {/* Table of Contents */}
      <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-3">
        <div className="flex items-center gap-2 font-bold text-sm text-primary uppercase tracking-wider">
          <BookOpen size={16} className="text-accent" /> Table of Contents
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-accent">
          <li><a href="#what-is-gpt-image" className="hover:underline">1. What is GPT Image 2.5?</a></li>
          <li><a href="#mindset-shift" className="hover:underline">2. The Mindset Shift: Change & Stability</a></li>
          <li><a href="#flare-vs-sunburst" className="hover:underline">3. Flare vs Sunburst: Which to Pick</a></li>
          <li><a href="#6-part-formula" className="hover:underline">4. 6-Part Formula for New Images</a></li>
          <li><a href="#composition-negative-space" className="hover:underline">5. Controlling Composition & Space</a></li>
          <li><a href="#exact-text" className="hover:underline">6. Getting Exact Text Right</a></li>
          <li><a href="#editing-formula" className="hover:underline">7. The Editing Formula: Change, Keep, Blend, Don&apos;t</a></li>
          <li><a href="#reference-images" className="hover:underline">8. Reference Images: Assigning Roles</a></li>
          <li><a href="#transparent-background" className="hover:underline">9. Transparent Backgrounds (PNG)</a></li>
          <li><a href="#sketch-to-image" className="hover:underline">10. Sketch to Finished Image</a></li>
          <li><a href="#ui-screens" className="hover:underline">11. UI Screens & Infographics</a></li>
          <li><a href="#copy-paste-prompts" className="hover:underline">12. 5 Copy-Paste Prompts</a></li>
          <li><a href="#mistakes-and-checklist" className="hover:underline">13. Common Mistakes & Checklist</a></li>
          <li><a href="#faq" className="hover:underline">14. Frequently Asked Questions</a></li>
        </ul>
      </div>

      {/* ── Section 1: What is GPT Image 2.5? ── */}
      <section id="what-is-gpt-image" className="space-y-4 pt-6 border-t border-black/10 dark:border-white/10">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-bricolage text-primary">
          What is GPT Image 2.5?
        </h2>
        <p>
          According to OpenAI&apos;s announcement on September 8, 2026, ChatGPT Images 2.5 is the new image experience inside ChatGPT, and developers get two primary API models:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-accent font-bold text-sm uppercase tracking-wide">
              <Zap size={16} /> GPT-Image-2.5 Flare
            </div>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              The <strong>fast model</strong>, aimed at most everyday, high-volume uses, social media iterations, and agile workflow drafts.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-accent font-bold text-sm uppercase tracking-wide">
              <Sparkles size={16} /> GPT-Image-2.5 Sunburst
            </div>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              The <strong>higher-quality model</strong> designed for demanding creative projects, refined typography, and intricate multi-step editing tasks.
            </p>
          </div>
        </div>

        <p className="text-sm text-neutral-700 dark:text-neutral-300">
          Both handle generation, editing, and transparent backgrounds. In ChatGPT you also get tools like <strong>Sketch</strong> (draw a rough layout), templates, comments pinned directly on an image for targeted edits, and shareable prompts.
        </p>

        <p className="text-xs text-muted italic">
          *Note: model names and features are based on OpenAI&apos;s launch information. Always check OpenAI&apos;s current docs before building a product on them.
        </p>
      </section>

      {/* ── Section 2: The Mindset Shift ── */}
      <section id="mindset-shift" className="space-y-4 pt-6 border-t border-black/10 dark:border-white/10">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-bricolage text-primary">
          The Mindset Shift: Prompt for Change AND Stability
        </h2>
        <p>
          A good old-style prompt answered one question: <em>what should the image look like?</em>
        </p>
        <p>
          A good GPT Image 2.5 prompt answers three distinct questions:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          {[
            { num: '1', title: 'What to create or change?', desc: 'Specific new element, colorway, or material you want introduced.' },
            { num: '2', title: 'What must not change?', desc: 'Faces, logos, camera angle, lighting, and composition that must stay intact.' },
            { num: '3', title: 'What is it used for?', desc: 'Instagram 4:5, web hero banner, thumbnail, or e-commerce transparent asset.' },
          ].map((item) => (
            <div key={item.num} className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 flex flex-col justify-between">
              <div>
                <span className="w-6 h-6 rounded-full bg-accent text-black font-extrabold text-xs flex items-center justify-center mb-2">
                  {item.num}
                </span>
                <strong className="text-primary text-sm block mb-1">{item.title}</strong>
                <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm text-amber-800 dark:text-amber-200 flex items-start gap-2.5">
          <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
          <span>
            <strong>Crucial Rule:</strong> If you skip question two (what must stay unchanged), the model is completely free to &quot;improve&quot; elements you never wanted touched.
          </span>
        </div>
      </section>

      {/* ── Section 3: Flare vs Sunburst Table ── */}
      <section id="flare-vs-sunburst" className="space-y-4 pt-6 border-t border-black/10 dark:border-white/10">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-bricolage text-primary">
          Flare vs Sunburst: Which One Should You Use?
        </h2>

        <div className="overflow-x-auto my-4 rounded-xl border border-black/10 dark:border-white/10 shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-black/5 dark:bg-white/5 border-b border-black/10 dark:border-white/10 text-primary font-bold">
              <tr>
                <th className="p-3.5 sm:p-4">Criteria</th>
                <th className="p-3.5 sm:p-4 text-accent">Flare</th>
                <th className="p-3.5 sm:p-4 text-accent">Sunburst</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5">
              <tr>
                <td className="p-3.5 sm:p-4 font-semibold text-primary">Strength</td>
                <td className="p-3.5 sm:p-4">High speed and high throughput</td>
                <td className="p-3.5 sm:p-4">Extreme visual quality and tighter boundary control</td>
              </tr>
              <tr>
                <td className="p-3.5 sm:p-4 font-semibold text-primary">Good for</td>
                <td className="p-3.5 sm:p-4">Social content, drafts, volume testing, rapid prototypes</td>
                <td className="p-3.5 sm:p-4">Commercial campaigns, polished product shots, complex edits</td>
              </tr>
              <tr>
                <td className="p-3.5 sm:p-4 font-semibold text-primary">Pick it when</td>
                <td className="p-3.5 sm:p-4">Results already pass your quality bar on first pass</td>
                <td className="p-3.5 sm:p-4">Flare fails on fine details, typography, or micro-textures</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          <strong>Simple rule:</strong> start with Flare. If the output passes, keep it. If you keep rerunning prompts because details break, try Sunburst. Do not judge by speed alone—a fast model that needs four retries can cost more time and compute than a slower one that nails it on the first try.
        </p>
      </section>

      {/* Mid-Article Responsive Ad */}
      <AdsterraResponsiveBanner className="my-8" />

      {/* ── Section 4: 6-Part Formula ── */}
      <section id="6-part-formula" className="space-y-6 pt-6 border-t border-black/10 dark:border-white/10">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-bricolage text-primary">
          The 6-Part Formula for Generating a New Image
        </h2>
        <p>
          You do not need all six every time, but this is a reliable skeleton for predictable, professional visual outputs:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { tag: '1. Asset', desc: 'What is it, and where will it be used? (e.g. "Instagram 4:5 product ad", "YouTube thumbnail")' },
            { tag: '2. Subject', desc: 'The main hero object or character, described with concrete, visible details.' },
            { tag: '3. Scene', desc: 'The surrounding setting, environment, action, and supporting props.' },
            { tag: '4. Look', desc: 'Lighting style, color temperature, material finishes, and realism level.' },
            { tag: '5. Text', desc: 'Exact wording inside quotation marks, placement coordinates, and frequency.' },
            { tag: '6. Rules', desc: 'Explicit negative constraints detailing what must NEVER appear.' },
          ].map((item) => (
            <div key={item.tag} className="p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/10 dark:border-white/10">
              <strong className="text-accent text-xs uppercase tracking-wider block mb-1">{item.tag}</strong>
              <p className="text-xs text-neutral-700 dark:text-neutral-300">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Weak vs Strong comparison */}
        <div className="space-y-4 pt-4">
          <h3 className="text-xl font-bold font-bricolage text-primary">Weak vs Strong Comparison</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-red-500/10 border border-red-500/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                <AlertTriangle size={15} /> Weak Prompt
              </div>
              <p className="font-mono text-xs sm:text-sm text-red-950 dark:text-red-200 bg-white/50 dark:bg-black/40 p-3 rounded-lg border border-red-500/15">
                &quot;Make a cool, premium coffee ad.&quot;
              </p>
              <p className="text-xs text-red-800/80 dark:text-red-300/80">
                &quot;Cool&quot; and &quot;premium&quot; are subjective feelings that produce generic clip art with floating beans and random text.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 size={15} /> Strong Brief Prompt
              </div>
              <p className="font-mono text-xs text-emerald-950 dark:text-emerald-200 bg-white/50 dark:bg-black/40 p-3 rounded-lg border border-emerald-500/15 leading-relaxed">
                Create a 4:5 Instagram ad photo for a specialty coffee brand.<br/><br/>
                <strong>Subject:</strong> one matte black coffee bag with a small cream label, standing upright.<br/>
                <strong>Scene:</strong> rustic wooden counter, a ceramic cup with steam beside it, soft morning window light from the left.<br/>
                <strong>Composition:</strong> bag in the lower-left third, upper-right 35% kept empty and calm for a headline.<br/>
                <strong>Look:</strong> realistic product photography, warm tones, shallow depth of field, natural wood texture.<br/>
                <strong>Rules:</strong> no people, no extra bags, no floating beans, no watermarks.
              </p>
            </div>
          </div>
        </div>

        {/* Visual Figure 1: Coffee Product Photography with Negative Space */}
        <figure className="my-8 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-lg bg-black/5 dark:bg-white/5">
          <div className="relative aspect-[16/10] w-full">
            <Image
              src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=900&auto=format&fit=crop&q=80"
              alt="Specialty coffee product photography with calm negative space for editorial typography"
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
          </div>
          <figcaption className="p-3 text-center text-xs text-muted bg-black/[0.02] dark:bg-white/[0.02] italic border-t border-black/5 dark:border-white/5">
            Example output generated from the 6-part formula: subject placed in the lower third with clean, natural lighting and reserved negative space for copy.
          </figcaption>
        </figure>
      </section>

      {/* ── Section 5: Composition & Negative Space ── */}
      <section id="composition-negative-space" className="space-y-4 pt-6 border-t border-black/10 dark:border-white/10">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-bricolage text-primary">
          Composition: Tell the Model Where the Empty Space Goes
        </h2>
        <p>
          Saying &quot;leave space for text&quot; is too vague. Always specify percentages and spatial zones so graphic designers can immediately place headlines:
        </p>

        <CopyablePrompt
          title="Composition Prompt Template"
          prompt={`Keep the top 40% of the image clean and low-detail.
Place the subject in the lower third.
Keep a safe margin around the edges for cropping to 1:1 later.`}
        />
      </section>

      {/* ── Section 6: Exact Text ── */}
      <section id="exact-text" className="space-y-4 pt-6 border-t border-black/10 dark:border-white/10">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-bricolage text-primary">
          Getting Exact Text Right
        </h2>
        <p>
          Text rendering is where AI images often slip. Use this strict pattern to enforce letter-for-letter precision:
        </p>

        <CopyablePrompt
          title="Precise Text Rendering Formula"
          prompt={`Render this headline exactly once, with no other text anywhere:
"Fresh roasted. Fast delivered."
Place it at the top-left, bold modern sans-serif, white, left aligned.
No logos, no watermarks, no extra words.`}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {[
            { title: 'Quote copy strictly', desc: 'Put the final headline in quotation marks. Never ask the model to invent slogans.' },
            { title: 'Define frequency', desc: 'Explicitly state "render this headline exactly once" to avoid repeated phrases.' },
            { title: 'Assign visual hierarchy', desc: 'State exact placement (top-left, centered) and scale relative to other objects.' },
            { title: 'Always proofread', desc: 'Zoom in and check spelling, character spacing, capitals, and punctuation marks.' },
          ].map((h, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/10 dark:border-white/10">
              <strong className="text-xs sm:text-sm font-bold text-primary block mb-0.5">{h.title}</strong>
              <p className="text-xs text-muted">{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 7: The Editing Formula: Change, Keep, Blend, Don't ── */}
      <section id="editing-formula" className="space-y-6 pt-6 border-t border-black/10 dark:border-white/10">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-bricolage text-primary">
          The Editing Formula: Change, Keep, Blend, Don&apos;t
        </h2>
        <p>
          For any image edit, split your prompt into four explicit components. This prevents the model from hallucinating unwanted changes:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'CHANGE', desc: 'The single object, color, or detail being altered.' },
            { label: 'KEEP', desc: 'Every background, angle, texture, and element that must remain intact.' },
            { label: 'BLEND', desc: 'How contact shadows, light temperature, and reflections integrate.' },
            { label: "DON'T", desc: 'Explicit constraints against redesigning the scene or adding props.' },
          ].map((f) => (
            <div key={f.label} className="p-3.5 rounded-xl bg-accent/5 border border-accent/20">
              <strong className="text-accent text-xs font-bold block mb-1">{f.label}</strong>
              <p className="text-xs text-neutral-700 dark:text-neutral-300">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="text-lg font-bold text-primary">Example 1: Recolor a sneaker without touching anything else</h3>
          <CopyablePrompt
            title="Sneaker Recolor Formula"
            prompt={`CHANGE: Make only the sneaker's main upper material forest green instead of white.

KEEP: sneaker shape, laces, sole, stitching, logo placement, camera angle, background, crop, and shadow direction.

BLEND: update only the reflections and color bounce that would naturally come from the new green surface.

DON'T: redesign the shoe, add graphics, change the background, or alter the logo.`}
          />
        </div>

        {/* Visual Figure 2: Sneaker Product Edit */}
        <figure className="my-8 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-lg bg-black/5 dark:bg-white/5">
          <div className="relative aspect-[16/10] w-full">
            <Image
              src="https://images.unsplash.com/photo-1552346154-21d32810aba3?w=900&auto=format&fit=crop&q=80"
              alt="High-detail sneaker photography showing precise material texture and intact sole structure"
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
          </div>
          <figcaption className="p-3 text-center text-xs text-muted bg-black/[0.02] dark:bg-white/[0.02] italic border-t border-black/5 dark:border-white/5">
            The Change-Keep-Blend-Don&apos;t method guarantees that only surface materials shift while geometry, stitching, and shadow direction remain completely locked.
          </figcaption>
        </figure>

        <div className="space-y-4 pt-2">
          <h3 className="text-lg font-bold text-primary">Example 2: Swap furniture in a room photo</h3>
          <CopyablePrompt
            title="Furniture Swap Formula"
            prompt={`CHANGE: Replace only the sofa with a low beige linen sofa of similar size.

KEEP: wall color, windows, floor, rug, lamp, camera position, and lighting direction.

BLEND: give the new sofa a realistic contact shadow and match the room's color temperature.

DON'T: add new furniture or change the room layout.`}
          />
        </div>

        <div className="p-4 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 flex items-start gap-3">
          <Lightbulb size={18} className="text-accent shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
            <strong>Pro tip:</strong> If an edit starts drifting after multiple turns, paste your <code>KEEP</code> list again in full. Do not assume the model retains conversational memory indefinitely.
          </p>
        </div>
      </section>

      {/* ── Section 8: Reference Images ── */}
      <section id="reference-images" className="space-y-6 pt-6 border-t border-black/10 dark:border-white/10">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-bricolage text-primary">
          Using Reference Images: Give Every Image a Job
        </h2>
        <p>
          When you upload more than one image, saying &quot;use these as reference&quot; leads to mixed-up results. Assign explicit, dedicated roles to each image:
        </p>

        <CopyablePrompt
          title="Multi-Reference Role Assignment"
          prompt={`Image 1 = the product. Keep its exact shape, label, color, and proportions.
Image 2 = lighting reference only. Copy the soft window light and warm shadows, not the objects.
Image 3 = composition reference only. Copy the left-weighted placement and empty space, not the colors or text.`}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 space-y-2">
            <h4 className="font-bold text-sm text-primary flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-accent" /> Protecting a Person&apos;s Face
            </h4>
            <div className="font-mono text-xs text-neutral-700 dark:text-neutral-300 p-3 rounded-lg bg-black/5 dark:bg-white/5 leading-relaxed">
              Keep the person&apos;s face shape, eyes, nose, lips, skin tone, hairstyle, pose, and expression exactly the same.<br/>
              Change only the jacket to a navy blazer.<br/>
              Do not beautify, age, or restyle the person.
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 space-y-2">
            <h4 className="font-bold text-sm text-primary flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-accent" /> Protecting a Product
            </h4>
            <div className="font-mono text-xs text-neutral-700 dark:text-neutral-300 p-3 rounded-lg bg-black/5 dark:bg-white/5 leading-relaxed">
              The product must remain the exact same item: same silhouette, label size, logo position, printed text, cap shape, and material finish.
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 9: Transparent Background ── */}
      <section id="transparent-background" className="space-y-6 pt-6 border-t border-black/10 dark:border-white/10">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-bricolage text-primary">
          Transparent Background (PNG Cutouts)
        </h2>
        <p>
          Transparent output is ideal for e-commerce catalogs, YouTube thumbnails, and web mockups. In the API you configure the background option to transparent and specify PNG or WebP. In your prompt, enforce clean boundary definitions:
        </p>

        <CopyablePrompt
          title="Product Cutout Transparency Prompt"
          prompt={`Create a clean product cutout of the supplied headphones.
Keep the exact shape, logo, buttons, and material.
One centered product on a fully transparent background.
Clean edges, no white halo, no checkerboard pattern, no floor, no shadow.`}
        />

        {/* Visual Figure 3: Transparent Product Cutout Studio Asset */}
        <figure className="my-8 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-lg bg-black/5 dark:bg-white/5">
          <div className="relative aspect-[16/10] w-full">
            <Image
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&auto=format&fit=crop&q=80"
              alt="High precision studio headphones product cutout with crisp clean silhouettes"
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
          </div>
          <figcaption className="p-3 text-center text-xs text-muted bg-black/[0.02] dark:bg-white/[0.02] italic border-t border-black/5 dark:border-white/5">
            Generating transparent cutout assets: crisp edge definition without white fringing or baked-in faux checkerboards.
          </figcaption>
        </figure>

        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-xs sm:text-sm text-red-800 dark:text-red-200 flex items-start gap-2.5">
          <AlertTriangle size={18} className="text-red-500 shrink-0 mt-0.5" />
          <span>
            <strong>Careful with Fake Transparency:</strong> A gray-and-white checkerboard drawn directly into pixel data is NOT true transparency. Always test by placing the generated PNG on a bright solid color layer in Photoshop or Figma to verify edge quality.
          </span>
        </div>
      </section>

      {/* ── Section 10: Sketch to Finished Image ── */}
      <section id="sketch-to-image" className="space-y-4 pt-6 border-t border-black/10 dark:border-white/10">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-bricolage text-primary">
          Sketch to Finished Image
        </h2>
        <p>
          The Sketch feature in ChatGPT Images 2.5 is ideal when you know spatial layout but need the model to supply realism. Explicitly define what the sketch controls and what it does not:
        </p>

        <CopyablePrompt
          title="Sketch to Photorealistic Interior"
          prompt={`The sketch controls: layout, object positions, scale, camera angle, and empty areas.
The sketch does NOT control: materials, final lighting, or fine detail.

Turn it into a photorealistic cozy cafe interior.
Keep the exact layout and camera position.
Materials: dark wood counter, terrazzo floor, brass lamps, green velvet chairs.
Lighting: warm afternoon sun from the left window.
Do not add or move furniture, and do not add any text.`}
        />
      </section>

      {/* ── Section 11: UI Screens & Infographics ── */}
      <section id="ui-screens" className="space-y-6 pt-6 border-t border-black/10 dark:border-white/10">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-bricolage text-primary">
          UI Screens, Slides, and Infographics
        </h2>
        <p>
          For digital user interfaces, stop prompting like an artist and start prompting like a <strong>product designer writing a specification</strong>:
        </p>

        <CopyablePrompt
          title="SaaS Dashboard Specification Prompt"
          prompt={`Create a realistic desktop dashboard screenshot for a prompt-management app.
Canvas: 1440 x 1024.
Layout: left sidebar (Home, Prompts, History), top bar with search, main area with 3 summary cards and one line chart.
Style: dark charcoal UI, thin borders, one pink accent for buttons, clean readable fonts.
It should look like a real shipped product, not concept art.
No laptop mockup, no glowing 3D effects, no fake extra charts.`}
        />

        {/* Visual Figure 4: Modern Dark UI Analytics Dashboard */}
        <figure className="my-8 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-lg bg-black/5 dark:bg-white/5">
          <div className="relative aspect-[16/10] w-full">
            <Image
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=80"
              alt="Clean modern dark theme analytics dashboard with precise charts and data tables"
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
          </div>
          <figcaption className="p-3 text-center text-xs text-muted bg-black/[0.02] dark:bg-white/[0.02] italic border-t border-black/5 dark:border-white/5">
            Prompting like a product designer produces crisp, production-grade UI layouts without exaggerated conceptual 3D halos.
          </figcaption>
        </figure>

        <div className="p-4 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10">
          <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
            <strong>Fact-Checking Infographics:</strong> For infographics and diagrams, supply the exact labels, step numbers, and titles. <strong>Check every number and arrow yourself.</strong> Image models will readily make a diagram look visually persuasive while hallucinating incorrect data.
          </p>
        </div>
      </section>

      {/* ── Section 12: 5 Copy-Paste Prompts ── */}
      <section id="copy-paste-prompts" className="space-y-6 pt-6 border-t border-black/10 dark:border-white/10">
        <div className="border-b border-black/10 dark:border-white/10 pb-4">
          <span className="text-accent font-bold text-xs uppercase tracking-wider">Ready to Use</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-bricolage text-primary mt-1">
            5 Copy-Paste GPT Image 2.5 Prompts
          </h2>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-bold text-primary mb-1">1. Skincare Product Ad (Negative Space & Single Headline)</h4>
            <CopyablePrompt
              prompt={`Create a 4:5 ad photo for a skincare brand. One frosted glass serum bottle with a white dropper on a wet gray stone, fresh water droplets, soft cool daylight from the left, pale blue-gray background. Bottle in the lower-left third, upper-right 40% empty. Realistic studio photography, not 3D. Render the text "Glow, simplified." exactly once at the top-right in thin white sans-serif. No people, no extra products, no watermarks.`}
            />
          </div>

          <div>
            <h4 className="text-sm font-bold text-primary mb-1">2. Change the Background Only (Identity Locked)</h4>
            <CopyablePrompt
              prompt={`CHANGE: Replace only the background with a sunny beach at golden hour.
KEEP: the person's face, hair, clothes, pose, expression, and framing exactly the same.
BLEND: match the warm light on the person's skin and add soft natural edge shadows.
DON'T: change the outfit, retouch the face, or add other people.`}
            />
          </div>

          <div>
            <h4 className="text-sm font-bold text-primary mb-1">3. Translate Poster Copy</h4>
            <CopyablePrompt
              prompt={`CHANGE: Replace only the headline "Built for every mile." with "Hecho para cada kilómetro."
KEEP: font style, text position, box width, colors, product, logo, background, and composition.
Fit the new line inside the existing text area. Do not add other text.`}
            />
          </div>

          <div>
            <h4 className="text-sm font-bold text-primary mb-1">4. High-CTR YouTube Thumbnail</h4>
            <CopyablePrompt
              prompt={`Create a 16:9 YouTube thumbnail. A surprised creator on the left third, a glowing laptop on the right. Dark background with a hot-pink accent glow. Big bold text "STOP DOING THIS" rendered once, upper-right, white with a thin pink outline. Keep the center clean. No other text, no logos.`}
            />
          </div>

          <div>
            <h4 className="text-sm font-bold text-primary mb-1">5. Transparent Vector Sticker</h4>
            <CopyablePrompt
              prompt={`Create a cute die-cut sticker of a smiling coffee cup with a thick white outline. Flat vector style, bold colors. Fully transparent background, no shadow, no checkerboard, no extra elements.`}
            />
          </div>
        </div>
      </section>

      {/* ── Section 13: Common Mistakes & Checklist ── */}
      <section id="mistakes-and-checklist" className="space-y-6 pt-6 border-t border-black/10 dark:border-white/10">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-bricolage text-primary">
          Common Mistakes to Avoid & Quick Checklist
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            'Starting with generic adjectives ("cinematic, premium") instead of naming the actual asset.',
            'Describing the change but forgetting to state what must stay identical.',
            'Uploading several reference photos without assigning single, distinct roles.',
            'Asking the model to invent marketing slogans instead of providing quoted copy.',
            'Forgetting to specify that text should appear exactly once.',
            'Changing the model, quality tier, and prompt all in one turn.',
          ].map((m, idx) => (
            <div key={idx} className="flex gap-2.5 items-start p-3 rounded-xl bg-red-500/5 border border-red-500/15 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200">
              <AlertTriangle size={15} className="text-red-500 shrink-0 mt-0.5" />
              <span>{m}</span>
            </div>
          ))}
        </div>

        {/* Quick Pre-Flight Checklist */}
        <div className="p-6 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 space-y-3">
          <h3 className="font-bold text-sm text-primary uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 size={16} className="text-accent" /> Quick Checklist Before You Hit Generate
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-accent shrink-0" />
              <span>I named the exact asset format (4:5 ad, 16:9 thumbnail) and its intended usage.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-accent shrink-0" />
              <span>Subject and scene contain physical, visible details rather than subjective fluff.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-accent shrink-0" />
              <span>I defined composition and percentage of empty space reserved for headlines.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-accent shrink-0" />
              <span>Exact text is quoted in quotation marks and limited to one single appearance.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-accent shrink-0" />
              <span>For edits, I maintained separate <strong>CHANGE</strong> and <strong>KEEP</strong> boundaries.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* ── Section 14: How ProCraft Helps ── */}
      <section className="p-8 rounded-3xl bg-gradient-to-br from-accent/10 via-black/[0.02] to-black/[0.04] dark:from-accent/15 dark:via-white/[0.02] dark:to-white/[0.04] border border-accent/25 space-y-4">
        <h3 className="text-2xl font-bold font-bricolage text-primary">
          How ProCraft Helps You Write Better Image Prompts
        </h3>
        <p className="text-sm text-neutral-700 dark:text-neutral-300">
          Writing complex image briefs from scratch is time-consuming. Speed up your creative pipeline with our free suite of creator tools:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <Link
            href="/image-to-prompt"
            className="p-4 rounded-2xl bg-white/80 dark:bg-zinc-900/80 border border-black/5 dark:border-white/10 hover:border-accent transition-all group"
          >
            <Camera size={20} className="text-accent mb-2 group-hover:scale-110 transition-transform" />
            <strong className="text-sm font-bold text-primary block mb-1">Image to Prompt</strong>
            <p className="text-xs text-muted">Upload any reference art to reverse-engineer its lighting, composition, and style parameters.</p>
          </Link>

          <Link
            href="/prompt-library"
            className="p-4 rounded-2xl bg-white/80 dark:bg-zinc-900/80 border border-black/5 dark:border-white/10 hover:border-accent transition-all group"
          >
            <Layers size={20} className="text-accent mb-2 group-hover:scale-110 transition-transform" />
            <strong className="text-sm font-bold text-primary block mb-1">AI Prompt Library</strong>
            <p className="text-xs text-muted">Browse 10,000+ battle-tested prompts ready for Midjourney, FLUX, and ChatGPT with 1-click copy.</p>
          </Link>

          <Link
            href="/ai-directory"
            className="p-4 rounded-2xl bg-white/80 dark:bg-zinc-900/80 border border-black/5 dark:border-white/10 hover:border-accent transition-all group"
          >
            <Zap size={20} className="text-accent mb-2 group-hover:scale-110 transition-transform" />
            <strong className="text-sm font-bold text-primary block mb-1">AI Tools Directory</strong>
            <p className="text-xs text-muted">Compare 5,000+ verified generative AI tools and image enhancers for your creative stack.</p>
          </Link>
        </div>
      </section>

      {/* ── Section 15: FAQ ── */}
      <section id="faq" className="space-y-4 pt-6 border-t border-black/10 dark:border-white/10">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-bricolage text-primary">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3 pt-2">
          {[
            {
              q: 'What is GPT Image 2.5?',
              a: "It is OpenAI's latest image generation and editing suite. ChatGPT users get Images 2.5, while developers access the Flare and Sunburst models through the API."
            },
            {
              q: 'Which model should I start with?',
              a: 'Always start with Flare. Switch to Sunburst only if fine texture quality or strict editing precision falls short.'
            },
            {
              q: 'How do I edit one element without changing the rest of the image?',
              a: 'Separate your instructions into explicit CHANGE and KEEP lists. If the image begins to drift during multiple iterations, re-paste your KEEP list.'
            },
            {
              q: 'How do I get exact text inside an AI image?',
              a: 'Enclose the text in quotation marks, declare that it must appear exactly once, specify placement coordinates, and always proofread the generated output.'
            },
            {
              q: 'Can GPT Image 2.5 produce transparent backgrounds?',
              a: 'Yes. Specify a transparent background in the prompt and configure the API background setting to transparent with PNG or WebP output format.'
            },
            {
              q: 'Does a longer prompt always yield a better image?',
              a: 'No. Add only the details and boundaries necessary for the creative brief. Clear, disciplined instructions consistently outperform long, wordy paragraphs.'
            },
            {
              q: 'Can I guarantee 100% pixel-perfect preservation with prompting alone?',
              a: 'No AI prompt can guarantee zero pixel-level drift. If exact legal labels or trademarked logos must remain untouched, composite the approved region back into the original in an editor.'
            },
          ].map((faq, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 space-y-1.5">
              <h4 className="font-bold text-sm text-primary flex items-center gap-2">
                <HelpCircle size={15} className="text-accent shrink-0" />
                {faq.q}
              </h4>
              <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 pl-6 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Conclusion & CTA ── */}
      <section className="pt-6 border-t border-black/10 dark:border-white/10 space-y-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-bricolage text-primary">
          Conclusion
        </h2>
        <p>
          GPT Image 2.5 is at its best when you treat it like a creative partner that needs a clear brief. Say what the image is for, describe what you can actually see, quote your text, give each reference a job, and always separate the change from the things that must stay put.
        </p>
        <p>
          The best prompt is not the longest one. It is the one that makes the result predictable. Start small, change one thing at a time, and keep a library of the prompts that work.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
          <Link
            href="/image-to-prompt"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-accent hover:bg-accent-hover text-black font-bold text-sm flex items-center justify-center gap-2 transition-transform hover:scale-105"
          >
            <span>Try Image to Prompt Free</span>
            <ArrowRight size={15} />
          </Link>
          <Link
            href="/prompt-library"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-primary font-bold text-sm flex items-center justify-center transition-colors border border-black/10 dark:border-white/10"
          >
            Explore Prompt Library
          </Link>
        </div>
      </section>
    </div>
  );
}

