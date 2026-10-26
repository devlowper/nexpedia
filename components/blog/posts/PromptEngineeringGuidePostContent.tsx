import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  CheckCircle2, AlertTriangle, BookOpen, Sparkles, ArrowRight,
  Layers, Lightbulb, RefreshCw, Library, Zap, Copy, Check
} from 'lucide-react';
import { AdsterraBanner, AdsterraResponsiveBanner } from '@/components/ads/AdsterraBanner';

export default function PromptEngineeringGuidePostContent() {
  return (
    <div className="text-base text-black/80 dark:text-white/80 leading-relaxed space-y-10 font-sans">
      {/* Intro & Overview */}
      <div className="text-lg md:text-xl font-medium leading-relaxed text-primary/95 space-y-5">
        <p>
          <strong>Prompt engineering</strong> is the skill of writing clear, structured instructions that make an AI model produce exactly the result you want. Whether you use ChatGPT, Claude, Gemini, Midjourney, Stable Diffusion, or any other AI tool, the quality of your output depends directly on the quality of your prompt.
        </p>
        <p>
          A vague prompt gives a vague answer. A well-engineered prompt gives a precise, usable, often impressive result on the first try.
        </p>
        <p className="text-base text-black/70 dark:text-white/70">
          In this comprehensive 2026 guide, you will learn four practical, high-leverage skills that every AI creator, designer, and developer needs:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 not-prose">
          {[
            { num: '1', title: 'Prompt making', desc: 'Writing strong prompts from scratch using a tested formula' },
            { num: '2', title: 'Image to prompt', desc: 'Turning any picture into a ready-to-use prompt in seconds' },
            { num: '3', title: 'Reverse prompt engineering', desc: 'Working backwards from a finished result to the prompt that created it' },
            { num: '4', title: 'Building a prompt library', desc: 'Saving and organizing your best prompts for repeated efficiency' },
          ].map((item) => (
            <div key={item.num} className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-start gap-3">
              <span className="w-7 h-7 rounded-lg bg-accent text-black font-extrabold text-xs flex items-center justify-center shrink-0">
                {item.num}
              </span>
              <div>
                <h3 className="font-bold text-primary text-sm">{item.title}</h3>
                <p className="text-xs text-black/60 dark:text-white/60">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Prompt Engineering Matters */}
      <section className="p-6 rounded-2xl bg-gradient-to-br from-black/5 via-black/5 to-accent/5 dark:from-white/5 dark:via-white/5 dark:to-accent/10 border border-black/10 dark:border-white/10 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold font-bricolage text-primary flex items-center gap-2">
          <Zap size={22} className="text-accent" />
          Why Prompt Engineering Matters
        </h2>
        <p className="text-sm sm:text-base text-black/75 dark:text-white/75">
          Most people lose hours because they treat AI like a search engine. They type a short phrase, get an average result, and then keep regenerating blindly. Prompt engineering fixes this cycle by giving the model what it actually needs: <strong>context, structure, and constraints</strong>.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {[
            { title: 'Better quality on the first generation', desc: 'Stop spinning your wheels with 10 mediocre attempts.' },
            { title: 'Less wasted time & credits', desc: 'Save subscription credits and compute time across paid AI tools.' },
            { title: 'Consistent style across projects', desc: 'Maintain uniform brand visuals, voices, and mockups.' },
            { title: 'Repeatable results you can scale', desc: 'Turn proven prompts into commercial client deliverables.' },
          ].map((b, idx) => (
            <div key={idx} className="flex gap-2.5 items-start p-3 rounded-lg bg-white/60 dark:bg-zinc-800/60 border border-black/5 dark:border-white/5">
              <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs sm:text-sm font-semibold text-primary block">{b.title}</strong>
                <span className="text-[11px] sm:text-xs text-black/60 dark:text-white/60">{b.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Table of Contents */}
      <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-3">
        <div className="flex items-center gap-2 font-bold text-sm text-primary uppercase tracking-wider">
          <BookOpen size={16} className="text-accent" /> Table of Contents
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-accent">
          <li><a href="#part-1-prompt-making" className="hover:underline">Part 1: Prompt Making – How to Write a Great Prompt</a></li>
          <li><a href="#part-2-image-to-prompt" className="hover:underline">Part 2: Image to Prompt – Turn Any Picture Into a Prompt</a></li>
          <li><a href="#part-3-reverse-prompting" className="hover:underline">Part 3: Reverse Prompt Engineering Explained</a></li>
          <li><a href="#part-4-prompt-library" className="hover:underline">Part 4: Build a Prompt Library That Saves You Hours</a></li>
          <li><a href="#common-mistakes" className="hover:underline">Common Prompt Engineering Mistakes to Avoid</a></li>
          <li><a href="#workflow" className="hover:underline">A Simple Prompt Engineering Workflow</a></li>
          <li><a href="#faq" className="hover:underline">Frequently Asked Questions</a></li>
        </ul>
      </div>

      {/* ================= PART 1: PROMPT MAKING ================= */}
      <section id="part-1-prompt-making" className="space-y-6 pt-6 border-t border-black/10 dark:border-white/10">
        <div className="space-y-2">
          <span className="text-accent font-bold text-xs uppercase tracking-wider">Part 1</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-bricolage text-primary">
            Prompt Making – How to Write a Great Prompt
          </h2>
        </div>

        <p>
          Good prompts are not magic. They follow a predictable pattern. Whether you are generating images in Midjourney or writing code with Claude, use this universal master formula:
        </p>

        {/* Master Formula Box */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-accent/15 via-accent/10 to-transparent border border-accent/30 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
            <Sparkles size={14} /> The Universal Prompt Engineering Formula
          </span>
          <div className="p-3.5 rounded-xl bg-black/80 dark:bg-black/90 text-white font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed border border-white/10">
            Subject + Details + Style + Composition + Lighting + Color + Quality + Constraints
          </div>
          <p className="text-xs text-black/60 dark:text-white/60">
            Each token layers essential guidance onto the AI model&apos;s latent space, removing ambiguity before the generation begins.
          </p>
        </div>

        {/* Part 1 Infographic Image */}
        <figure className="my-6 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-xl bg-black/5 dark:bg-white/5">
          <div className="relative aspect-[4/5] sm:aspect-[4/3] max-w-lg mx-auto w-full">
            <Image
              src="https://i.ibb.co/hFbJTBvX/prompt-making-formula-infographic.webp"
              alt="prompt engineering formula infographic"
              fill
              sizes="(max-width: 600px) 100vw, 600px"
              className="object-contain p-2"
            />
          </div>
          <figcaption className="p-3 text-center text-xs text-black/50 dark:text-white/50 bg-black/5 dark:bg-white/5 italic border-t border-black/5 dark:border-white/5">
            prompt engineering formula infographic — Crafting structured prompts eliminates guesswork and delivers higher fidelity outputs.
          </figcaption>
        </figure>

        <h3 className="text-xl font-bold font-bricolage text-primary pt-2">
          The 5 Core Elements of a Strong Prompt
        </h3>

        <div className="space-y-3 text-sm">
          {[
            {
              num: '1',
              title: 'Be specific about the subject',
              example: 'Instead of "a dog", specify "a golden retriever puppy sitting on a wooden porch in autumn".'
            },
            {
              num: '2',
              title: 'Add descriptive details',
              example: 'Mention materials, textures, mood, age, clothing, and environment to enrich the scene.'
            },
            {
              num: '3',
              title: 'Define the style',
              example: 'Options include minimalist vector, cinematic 35mm photography, watercolor illustration, 3D clay render, or flat design.'
            },
            {
              num: '4',
              title: 'Control camera and lighting',
              example: 'Terms like "soft studio lighting", "golden hour rim light", "85mm f/1.8 lens", and "top-down overhead view" change the visual weight dramatically.'
            },
            {
              num: '5',
              title: 'Set explicit constraints',
              example: 'Instruct the AI on what to avoid: "no text, no watermark, no extra fingers, no cluttered background".'
            },
          ].map((elem) => (
            <div key={elem.num} className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-accent text-black font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {elem.num}
              </span>
              <div>
                <strong className="text-primary block mb-0.5">{elem.title}</strong>
                <p className="text-xs text-black/60 dark:text-white/60">{elem.example}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Before and After Comparison */}
        <div className="space-y-3 pt-4">
          <h3 className="text-lg font-bold font-bricolage text-primary">Before and After Example</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-red-500/10 border border-red-500/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                <AlertTriangle size={15} /> Weak Prompt
              </div>
              <p className="font-mono text-sm text-red-950 dark:text-red-200 bg-white/50 dark:bg-black/40 p-3 rounded-lg border border-red-500/15">
                &quot;a logo for a tech brand&quot;
              </p>
              <p className="text-xs text-red-800/80 dark:text-red-300/80">
                Lacks style, geometry, composition, palette, and scale. AI produces unpredictable, generic clip art.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 size={15} /> Engineered Prompt
              </div>
              <p className="font-mono text-xs text-emerald-950 dark:text-emerald-200 bg-white/50 dark:bg-black/40 p-3 rounded-lg border border-emerald-500/15 leading-relaxed">
                &quot;A premium minimalist logo icon for an AI creative platform, bold geometric shapes, negative-space four-point star, single solid color on a white background, flat vector style, perfect symmetry, no gradients, no text, scalable to favicon size.&quot;
              </p>
              <p className="text-xs text-emerald-800/80 dark:text-emerald-300/80">
                Removes guesswork. The AI has far less room to make assumptions or drift off-brand.
              </p>
            </div>
          </div>
        </div>

        {/* Tips for Text AI */}
        <div className="p-5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-3">
          <h3 className="text-base font-bold text-primary flex items-center gap-2">
            <Lightbulb size={18} className="text-accent" />
            Prompt Making Tips for Text AI (ChatGPT, Claude, Gemini)
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-black/75 dark:text-white/75">
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">•</span>
              <span><strong>Assign a role:</strong> &quot;Act as a senior SEO strategist and technical copywriter.&quot;</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">•</span>
              <span><strong>Give context:</strong> Clarify who the target audience is and what the primary goal is.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">•</span>
              <span><strong>Specify output format:</strong> Table, bullet list, 500 words, markdown headers, or JSON.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">•</span>
              <span><strong>Add examples:</strong> Provide few-shot demonstrations of the tone or format you expect.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">•</span>
              <span><strong>Chain reasoning:</strong> Ask for step-by-step thinking prior to complex decisions.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">•</span>
              <span><strong>Iterate in thread:</strong> Treat the first answer as a draft and prompt refinements.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* In-Article Ad Banner between Part 1 & 2 */}
      <AdsterraResponsiveBanner className="my-10" />

      {/* ================= PART 2: IMAGE TO PROMPT ================= */}
      <section id="part-2-image-to-prompt" className="space-y-6 pt-6 border-t border-black/10 dark:border-white/10">
        <div className="space-y-2">
          <span className="text-accent font-bold text-xs uppercase tracking-wider">Part 2</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-bricolage text-primary">
            Image to Prompt – Turn Any Picture Into a Prompt
          </h2>
        </div>

        <p>
          Have you ever seen an amazing AI image online and wondered, <em>&quot;What prompt created that?&quot;</em> This is exactly what an <strong>image to prompt tool</strong> solves.
        </p>

        <p>
          An image to prompt generator analyzes an uploaded picture using computer vision and multimodal models, writing a detailed text description covering the subject, art style, lighting, colors, composition, and mood. You can then paste that prompt directly into Midjourney, DALL·E, Stable Diffusion, Leonardo, or Flux to recreate or remix the look.
        </p>

        {/* Part 2 Image */}
        <figure className="my-6 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-xl bg-black/5 dark:bg-white/5">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src="https://i.ibb.co/LXRmKVD8/image-to-prompt-tool-example.webp"
              alt="image to prompt tool example"
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
          </div>
          <figcaption className="p-3 text-center text-xs text-black/50 dark:text-white/50 bg-black/5 dark:bg-white/5 italic border-t border-black/5 dark:border-white/5">
            image to prompt tool example — Uploading any reference image produces an instant prompt breakdown of styles, camera lenses, and lighting parameters.
          </figcaption>
        </figure>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* When Image to Prompt Is Useful */}
          <div className="p-5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-3">
            <h3 className="font-bold text-base text-primary">When Image to Prompt Is Useful</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-black/70 dark:text-white/70">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                <span><strong>Learning:</strong> Study how professional, award-winning images are described by vision models.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                <span><strong>Style matching:</strong> Recreate a consistent visual style for your brand or client assets.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                <span><strong>Inspiration:</strong> Transform real-world reference photos into surreal AI concepts.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                <span><strong>Client mood boards:</strong> Quickly turn a messy client mood board into actionable prompts.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                <span><strong>Series consistency:</strong> Keep a series of blog banners or game assets visually cohesive.</span>
              </li>
            </ul>
          </div>

          {/* Tips to Get Better Results */}
          <div className="p-5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-3">
            <h3 className="font-bold text-base text-primary">Tips for Better Image to Prompt Output</h3>
            <ol className="space-y-2 text-xs sm:text-sm text-black/70 dark:text-white/70 list-decimal list-inside">
              <li><strong>Upload clear, high-res images:</strong> Blurry files produce generic, ambiguous descriptions.</li>
              <li><strong>Focus on one main subject:</strong> Busy collages confuse the neural vision parser.</li>
              <li><strong>Edit the output:</strong> Treat the generated prompt as a launchpad, not a rigid script.</li>
              <li><strong>Remove what you don&apos;t want:</strong> Delete copyright references, watermarks, or unwanted tokens.</li>
              <li><strong>Test across models:</strong> Adjust syntax for Midjourney vs Stable Diffusion for maximum fidelity.</li>
            </ol>
          </div>
        </div>

        {/* Callout to ProCraft Tool */}
        <div className="p-5 rounded-2xl bg-accent/15 border border-accent/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-bold text-primary text-sm sm:text-base">
              Try the ProCraft Image to Prompt Tool
            </h4>
            <p className="text-xs sm:text-sm text-black/70 dark:text-white/70">
              Upload any reference picture and extract a detailed, ready-to-use prompt in seconds—100% free.
            </p>
          </div>
          <Link
            href="/image-to-prompt"
            className="px-5 py-2.5 bg-accent text-black font-bold text-xs rounded-full hover:bg-accent-hover transition-all whitespace-nowrap shadow-md flex items-center gap-1.5"
          >
            Open Image to Prompt Tool <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Mid-Article Responsive Banner */}
      <AdsterraResponsiveBanner className="my-10" />

      {/* ================= PART 3: REVERSE PROMPT ENGINEERING ================= */}
      <section id="part-3-reverse-prompting" className="space-y-6 pt-6 border-t border-black/10 dark:border-white/10">
        <div className="space-y-2">
          <span className="text-accent font-bold text-xs uppercase tracking-wider">Part 3</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-bricolage text-primary">
            Reverse Prompt Engineering Explained
          </h2>
        </div>

        <p>
          <strong>Reverse prompt engineering</strong> means starting from a finished output and working backwards to reconstruct the exact prompt and parameter configuration that could have produced it. It works for images, text, code, and even AI video generations.
        </p>

        <p>
          It is widely recognized as one of the fastest ways to level up your AI prompting skills, because you learn directly from results that have already proven to be effective.
        </p>

        {/* Part 3 Image */}
        <figure className="my-6 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-xl bg-black/5 dark:bg-white/5">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src="https://i.ibb.co/Kp0hBJ06/reverse-prompt-engineering-workflow.webp"
              alt="reverse prompt engineering workflow"
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
          </div>
          <figcaption className="p-3 text-center text-xs text-black/50 dark:text-white/50 bg-black/5 dark:bg-white/5 italic border-t border-black/5 dark:border-white/5">
            reverse prompt engineering workflow — Deconstructing finished generations into atomic parameters unlocks repeatable creative mastery.
          </figcaption>
        </figure>

        <h3 className="text-xl font-bold font-bricolage text-primary">
          How to Do Reverse Prompt Engineering Step by Step
        </h3>

        <div className="space-y-3 text-sm">
          {[
            {
              step: 'Step 1: Analyze the result',
              desc: 'Inspect the primary subject, art style, color palette, lighting type, camera angle, depth of field, background setting, and overall mood.'
            },
            {
              step: 'Step 2: Break it into components',
              desc: 'Write each observation as an isolated keyword or token phrase (e.g. "matte pastel background", "cinematic rim light", "isometric 3D render").'
            },
            {
              step: 'Step 3: Rebuild the prompt',
              desc: 'Combine the components following the Part 1 formula: Subject + Details + Style + Lighting + Color + Constraints.'
            },
            {
              step: 'Step 4: Generate and compare',
              desc: 'Run your rebuilt prompt in your chosen model and place the new output side-by-side with the reference original.'
            },
            {
              step: 'Step 5: Refine iteratively',
              desc: 'Adjust the differences one variable at a time (e.g. change lens millimeter, tune color saturation, add negative tokens) until the aesthetic locks in.'
            },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-start gap-3.5">
              <span className="w-8 h-8 rounded-xl bg-accent/20 text-accent font-bold text-xs flex items-center justify-center shrink-0 border border-accent/30">
                0{idx + 1}
              </span>
              <div>
                <strong className="text-primary text-sm block mb-1">{item.step}</strong>
                <p className="text-xs sm:text-sm text-black/60 dark:text-white/60">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Reverse Prompting for Text */}
        <div className="p-5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-3">
          <h3 className="text-base font-bold text-primary flex items-center gap-2">
            <RefreshCw size={18} className="text-accent" />
            Reverse Prompting for Text
          </h3>
          <p className="text-xs sm:text-sm text-black/75 dark:text-white/75">
            You can also paste a top-performing article, landing page headline, or viral tweet into ChatGPT, Claude, or Gemini and ask:
          </p>
          <div className="p-3.5 rounded-xl bg-black/80 dark:bg-black/90 text-accent font-mono text-xs border border-white/10">
            &quot;Analyze the following writing sample. Write the comprehensive prompt that would instruct an AI to reproduce this exact tone, cadence, sentence structure, and vocabulary.&quot;
          </div>
          <p className="text-xs text-black/60 dark:text-white/60">
            This reverse technique is invaluable for capturing brand tone guidelines and institutional voice without writing rules from scratch.
          </p>
        </div>

        {/* Image to Prompt vs Reverse Prompt Engineering Comparison */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-accent/10 to-transparent border border-accent/20 space-y-2">
          <h4 className="font-bold text-primary text-sm sm:text-base">
            Image to Prompt vs. Reverse Prompt Engineering
          </h4>
          <p className="text-xs sm:text-sm text-black/70 dark:text-white/70">
            They are intimately connected. An <strong>image to prompt tool</strong> automates the reverse prompt engineering process for images. Doing it manually hones your analytical artistic eye; using an automated tool saves you dozens of minutes every day. The best creators alternate between both.
          </p>
        </div>
      </section>

      {/* In-Article Banner before Part 4 */}
      <div className="w-full flex justify-center my-8">
        <AdsterraBanner format="300x250" />
      </div>

      {/* ================= PART 4: PROMPT LIBRARY ================= */}
      <section id="part-4-prompt-library" className="space-y-6 pt-6 border-t border-black/10 dark:border-white/10">
        <div className="space-y-2">
          <span className="text-accent font-bold text-xs uppercase tracking-wider">Part 4</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-bricolage text-primary">
            Build a Prompt Library That Saves You Hours
          </h2>
        </div>

        <p>
          Your best prompts are valuable intellectual property. If you leave them buried across scattered browser tabs and chat histories, you are forced to re-invent the wheel every time you start a project.
        </p>

        <p>
          A <strong>prompt library</strong> solves this problem once and for all by storing, categorizing, and tagging tested prompts in one central, searchable repository.
        </p>

        {/* Part 4 Image */}
        <figure className="my-6 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-xl bg-black/5 dark:bg-white/5">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src="https://i.ibb.co/TM1c3H88/procraft-prompt-library-preview.webp"
              alt="ProCraft prompt library preview"
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
          </div>
          <figcaption className="p-3 text-center text-xs text-black/50 dark:text-white/50 bg-black/5 dark:bg-white/5 italic border-t border-black/5 dark:border-white/5">
            ProCraft prompt library preview — Curating high-performing prompts with tags and templates saves countless creative hours.
          </figcaption>
        </figure>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-3">
            <h3 className="font-bold text-base text-primary">What to Save in Your Prompt Library</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-black/70 dark:text-white/70">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-accent shrink-0" />
                <span>The complete prompt text and seed numbers</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-accent shrink-0" />
                <span>The exact AI model it was engineered for (Midjourney v6, SDXL, Claude 3.5 Sonnet)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-accent shrink-0" />
                <span>A sample preview image or output excerpt</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-accent shrink-0" />
                <span>Tags for category, style, and commercial use-case</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-accent shrink-0" />
                <span>Notes on parameter quirks and words that failed</span>
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-3">
            <h3 className="font-bold text-base text-primary">How to Organize Your Prompts</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-black/70 dark:text-white/70">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span><strong>By category:</strong> Logos, portraits, product shots, landing pages, code</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span><strong>By model:</strong> Midjourney, ChatGPT, Stable Diffusion, Gemini</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span><strong>By aesthetic style:</strong> Minimalist, cinematic, vector, clay render, anime</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span><strong>By project/client:</strong> Client A brand kit, Website launch, Social ads</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Use Templates With Variables */}
        <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-3">
          <h3 className="text-base font-bold text-primary flex items-center gap-2">
            <Copy size={18} className="text-accent" />
            Use Templates With Dynamic Variables
          </h3>
          <p className="text-xs sm:text-sm text-black/75 dark:text-white/75">
            Turn your best one-off prompts into flexible, reusable templates by swapping specific tokens with bracketed variables:
          </p>
          <div className="p-4 rounded-xl bg-black/80 dark:bg-black/90 text-white font-mono text-xs sm:text-sm border border-white/10 leading-relaxed">
            A <span className="text-accent">[SUBJECT]</span> in <span className="text-accent">[STYLE]</span> style, <span className="text-accent">[LIGHTING]</span>, <span className="text-accent">[COLOR PALETTE]</span>, clean background, high detail, no text.
          </div>
          <p className="text-xs text-black/60 dark:text-white/60">
            Now you only swap out the bracketed fields while maintaining bulletproof aesthetic consistency across 50 generations.
          </p>
        </div>

        {/* Explore ProCraft Prompt Library */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-accent/20 via-accent/10 to-transparent border border-accent/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-bold text-primary text-sm sm:text-base">
              Explore the ProCraft Prompt Library
            </h4>
            <p className="text-xs sm:text-sm text-black/70 dark:text-white/70">
              Don&apos;t want to start from zero? Browse hundreds of curated, battle-tested prompts ready to copy and adapt.
            </p>
          </div>
          <Link
            href="/prompt-library"
            className="px-5 py-2.5 bg-accent text-black font-bold text-xs rounded-full hover:bg-accent-hover transition-all whitespace-nowrap shadow-md flex items-center gap-1.5"
          >
            Browse Prompt Library <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ================= COMMON MISTAKES ================= */}
      <section id="common-mistakes" className="space-y-4 pt-6 border-t border-black/10 dark:border-white/10">
        <h2 className="text-2xl sm:text-3xl font-bold font-bricolage text-primary">
          Common Prompt Engineering Mistakes to Avoid
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-sm">
          {[
            { title: '1. Being too vague', desc: '"Make it look nice" tells the AI nothing. Use concrete nouns, lenses, and color names.' },
            { title: '2. Overloading the prompt', desc: 'Stuffing 50 conflicting concepts into one prompt degrades coherence and model attention.' },
            { title: '3. Ignoring negative prompts', desc: 'Always tell diffusion models what to omit (watermarks, text, blurry, extra limbs).' },
            { title: '4. Not iterating systematically', desc: 'High-performing prompts are crafted through 3 to 5 small, single-variable tweaks.' },
            { title: '5. Blind copy-pasting', desc: 'Prompts tuned for Midjourney will behave differently in Flux or SDXL. Always adapt syntax.' },
            { title: '6. Forgetting to save winners', desc: 'If you fail to save winning prompts to your library, you will waste hours recreating them.' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-red-500/5 border border-red-500/15 space-y-1">
              <strong className="text-red-600 dark:text-red-400 font-bold text-xs sm:text-sm block">
                {item.title}
              </strong>
              <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= WORKFLOW ================= */}
      <section id="workflow" className="space-y-4 pt-6 border-t border-black/10 dark:border-white/10">
        <h2 className="text-2xl sm:text-3xl font-bold font-bricolage text-primary">
          A Simple Prompt Engineering Workflow
        </h2>
        <p className="text-sm text-black/70 dark:text-white/70">
          Combine all four skills into this repeatable, production-grade loop:
        </p>

        <div className="space-y-2.5">
          {[
            { step: '1', title: 'Find a reference image or idea', desc: 'Identify a strong visual reference that exemplifies the lighting and style you desire.' },
            { step: '2', title: 'Use Image to Prompt to extract a base prompt', desc: 'Upload the reference to an automated image to prompt tool to get an immediate parameter breakdown.' },
            { step: '3', title: 'Apply reverse prompt engineering', desc: 'Deconstruct each keyword to understand which words drive composition, lighting, and medium.' },
            { step: '4', title: 'Customize using the prompt making formula', desc: 'Insert your custom subject and constraints into the Universal Formula.' },
            { step: '5', title: 'Generate, compare, and refine', desc: 'Run the prompt, evaluate the output against expectations, and iterate one variable at a time.' },
            { step: '6', title: 'Save the winner to your prompt library', desc: 'Store the finalized prompt with tags and sample images for future instant retrieval.' },
          ].map((s) => (
            <div key={s.step} className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-accent text-black font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {s.step}
              </span>
              <div className="text-xs sm:text-sm">
                <strong className="text-primary">{s.title}:</strong>{' '}
                <span className="text-black/60 dark:text-white/60">{s.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section id="faq" className="space-y-4 pt-6 border-t border-black/10 dark:border-white/10">
        <h2 className="text-2xl sm:text-3xl font-bold font-bricolage text-primary">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {[
            {
              q: 'What is prompt engineering in simple words?',
              a: 'Prompt engineering is the practice of writing clear, structured instructions so an AI model gives you accurate, high-quality results on the first attempt without endless trial and error.'
            },
            {
              q: 'What is an image to prompt generator?',
              a: 'It is an AI computer vision tool that inspects a picture and generates a detailed text prompt describing its subject, medium, lighting, color, and composition, which you can paste into AI image generators to recreate or remix the style.'
            },
            {
              q: 'What is reverse prompt engineering?',
              a: 'It is the process of working backwards from a finished AI output (image, article, or code) to uncover the prompt, instructions, and constraints that produced it.'
            },
            {
              q: 'Do I need coding skills to learn prompt engineering?',
              a: 'No. Prompt engineering is fundamentally about structured thinking, clear written communication, and creative experimentation. Anyone can master it without writing a single line of code.'
            },
            {
              q: 'Are prompt libraries worth using?',
              a: 'Yes! A prompt library saves hours of repetitive drafting, keeps team brand aesthetics consistent, and ensures your best breakthroughs are preserved as reusable assets.'
            },
            {
              q: 'Can the same prompt work in every AI tool?',
              a: 'Not always. Different models interpret syntax differently. For example, Midjourney prefers comma-separated token weights, Stable Diffusion depends on negative prompts, and Flux excels with natural full sentences.'
            }
          ].map((faq, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-1.5">
              <h3 className="font-bold text-primary text-sm sm:text-base">{faq.q}</h3>
              <p className="text-xs sm:text-sm text-black/60 dark:text-white/60 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final Thoughts & CTA Banner */}
      <div className="my-12 p-8 rounded-3xl bg-gradient-to-br from-accent/20 via-accent/10 to-transparent border border-accent/30 text-center space-y-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-accent text-black mb-2 shadow-lg">
          <Sparkles size={24} />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-bricolage text-primary">
          Master Prompt Engineering on ProCraft
        </h2>
        <p className="text-sm sm:text-base text-black/70 dark:text-white/70 max-w-xl mx-auto">
          Prompt engineering is one of the most valuable skills for creators in 2026. Explore our free prompt library, reverse any reference with the Image to Prompt tool, and start crafting high-impact AI creations today.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/image-to-prompt"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-black font-bold text-sm rounded-full hover:bg-accent-hover transition-all hover:scale-105 shadow-xl"
          >
            Try Free Image to Prompt
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/prompt-library"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black/5 dark:bg-white/10 text-primary font-bold text-sm rounded-full hover:bg-black/10 dark:hover:bg-white/15 transition-all border border-black/10 dark:border-white/10"
          >
            Explore Prompt Library
          </Link>
        </div>
      </div>

      {/* Internal Links & Related Resources */}
      <div className="pt-6 border-t border-black/10 dark:border-white/10 space-y-3">
        <h3 className="font-bold text-primary text-sm uppercase tracking-wider">Internal Links &amp; Recommended Resources:</h3>
        <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
          <Link href="/image-to-prompt" className="px-3.5 py-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-accent hover:text-black transition-colors font-medium">
            Image to Prompt Tool →
          </Link>
          <Link href="/prompt-library" className="px-3.5 py-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-accent hover:text-black transition-colors font-medium">
            Prompt Library →
          </Link>
          <Link href="/ai-directory" className="px-3.5 py-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-accent hover:text-black transition-colors font-medium">
            AI Directory →
          </Link>
          <Link href="/blog/image-to-prompt-tips-and-tricks" className="px-3.5 py-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-accent hover:text-black transition-colors font-medium">
            Image to Prompt Tips &amp; Tricks Guide →
          </Link>
        </div>
      </div>
    </div>
  );
}
