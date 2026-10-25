import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  CheckCircle2, AlertTriangle, BookOpen, Sparkles, ArrowRight 
} from 'lucide-react';

export default function ImageToPromptPostContent() {
  return (
    <div className="text-base text-black/80 dark:text-white/80 leading-relaxed space-y-8 font-sans">
      {/* Intro */}
      <div className="text-lg md:text-xl font-medium leading-relaxed text-primary/95 space-y-4">
        <p>
          Have you ever found an image online and thought, <em>&quot;I want to create something exactly like this&quot;</em> but had no idea how to describe it? That is the exact problem image to prompt tools solve. You upload a picture, and AI analyzes it and writes a text prompt you can paste into your favorite AI image generator.
        </p>
        <p>
          But here is the catch: <strong>the first prompt an AI gives you is a starting point, not a finished recipe</strong>. The creators who get stunning results know a handful of tricks for improving image-generated prompts before they hit the generate button.
        </p>
        <p className="text-base text-black/70 dark:text-white/70">
          In this comprehensive guide, you will learn practical image to prompt tips and tricks that work for <strong>Midjourney, Stable Diffusion, Flux, DALL·E</strong>, and other popular models.
        </p>
      </div>

      {/* Quick Table of Contents Card */}
      <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-3">
        <div className="flex items-center gap-2 font-bold text-sm text-primary uppercase tracking-wider">
          <BookOpen size={16} className="text-accent" /> Table of Contents
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-accent">
          <li><a href="#what-is-image-to-prompt" className="hover:underline">1. What Is Image to Prompt?</a></li>
          <li><a href="#why-use-an-image-to-prompt-tool" className="hover:underline">2. Why Use an Image to Prompt Tool?</a></li>
          <li><a href="#10-tips-and-tricks" className="hover:underline">3. 10 Image to Prompt Tips &amp; Tricks</a></li>
          <li><a href="#common-mistakes" className="hover:underline">4. Common Mistakes to Avoid</a></li>
          <li><a href="#step-by-step-workflow" className="hover:underline">5. Simple Step-by-Step Workflow</a></li>
          <li><a href="#faq" className="hover:underline">6. Frequently Asked Questions</a></li>
        </ul>
      </div>

      {/* Section: What Is Image to Prompt */}
      <section id="what-is-image-to-prompt" className="space-y-4 pt-6">
        <h2 className="text-2xl sm:text-3xl font-bold font-bricolage text-primary">
          What Is Image to Prompt?
        </h2>
        <p>
          Image to prompt (also called reverse image prompting) is the process of turning an existing image into a written description that an AI image model can understand. A good image to prompt generator looks at your picture and extracts:
        </p>

        <div className="my-6 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-md">
          <div className="relative aspect-[4/3] max-w-xl mx-auto w-full">
            <Image
              src="/blog/image-to-prompt-tips-and-tricks/what-is-image-to-prompt.webp"
              alt="Diagram showing image feature extraction into style, subject, lighting, and camera details"
              fill
              sizes="(max-width: 600px) 100vw, 600px"
              className="object-contain p-4"
            />
          </div>
          <p className="text-xs text-center py-2 text-black/50 dark:text-white/50 bg-black/5 dark:bg-white/5 italic">
            AI breaks down pictures into core visual parameters: subject, setting, medium, lighting, color, and composition.
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <li className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-sm">
            <strong className="text-primary block mb-0.5">The main subject:</strong>
            A woman in a red coat, a vintage car, a mountain village.
          </li>
          <li className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-sm">
            <strong className="text-primary block mb-0.5">The setting and environment:</strong>
            City street at night, misty forest, studio backdrop.
          </li>
          <li className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-sm">
            <strong className="text-primary block mb-0.5">Art style or medium:</strong>
            Oil painting, 3D render, anime, film photograph.
          </li>
          <li className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-sm">
            <strong className="text-primary block mb-0.5">Lighting and mood:</strong>
            Golden hour, neon glow, soft diffused light, cinematic rim.
          </li>
          <li className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-sm">
            <strong className="text-primary block mb-0.5">Color palette:</strong>
            Warm earth tones, pastel pink and blue, duotone neon.
          </li>
          <li className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-sm">
            <strong className="text-primary block mb-0.5">Composition and camera details:</strong>
            Close-up portrait, wide angle, shallow depth of field, bokeh.
          </li>
        </ul>

        <p>
          That output becomes the recipe you feed into an AI art generator to recreate the aesthetic, or remix it into an entirely new creation.
        </p>
      </section>

      {/* Section: Why Use an Image to Prompt Tool */}
      <section id="why-use-an-image-to-prompt-tool" className="space-y-4 pt-6">
        <h2 className="text-2xl sm:text-3xl font-bold font-bricolage text-primary">
          Why Use an Image to Prompt Tool?
        </h2>
        <p>
          Writing prompts from scratch is challenging, especially when you are chasing a very specific visual aesthetic. An image to prompt tool helps you:
        </p>

        <div className="space-y-3">
          {[
            { title: '1. Save time', desc: 'Skip the trial-and-error guesswork of trying to find the exact descriptive words.' },
            { title: '2. Learn prompt writing', desc: 'See how computer vision models describe lighting, style, and composition, then reuse that vocabulary.' },
            { title: '3. Reproduce a style consistently', desc: 'Maintain uniform brand visuals, social media post series, and UI/UX design mockups.' },
            { title: '4. Build a reusable prompt library', desc: 'Collect working prompts that you can tweak for future client and personal projects.' },
            { title: '5. Improve SEO and accessibility', desc: 'The rich descriptive terms can directly inspire optimized image captions and alt text.' },
          ].map((item, idx) => (
            <div key={idx} className="flex gap-3.5 p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <CheckCircle2 size={20} className="text-accent shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-primary text-sm mb-0.5">{item.title}</h3>
                <p className="text-xs sm:text-sm text-black/60 dark:text-white/60">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section: 10 Tips and Tricks */}
      <section id="10-tips-and-tricks" className="space-y-8 pt-6">
        <div className="border-b border-black/10 dark:border-white/10 pb-4">
          <span className="text-accent font-bold text-xs uppercase tracking-wider">Expert Guide</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-bricolage text-primary mt-1">
            10 Image to Prompt Tips and Tricks That Actually Work
          </h2>
        </div>

        {/* Tip 1 */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-primary flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-accent text-black font-bold text-xs flex items-center justify-center">1</span>
            Start with a high-quality reference image
          </h3>
          <p>
            The AI can only describe what it can clearly see. Blurry, tiny, or heavily compressed images produce vague, generic prompts. Always use an image that is sharp, well-lit, and at least 1,000 pixels on its longest side. If you need to enlarge a small image first, run it through an AI upscaler before uploading.
          </p>
        </div>

        {/* Tip 2 */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-primary flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-accent text-black font-bold text-xs flex items-center justify-center">2</span>
            Choose images with one clear subject
          </h3>
          <p>
            Crowded images confuse the analysis. If your picture has five different focal points, the prompt generator will attempt to describe all of them, producing a chaotic prompt. Crop your image so the primary subject or composition you care about fills most of the frame.
          </p>
        </div>

        {/* Tip 3 */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-primary flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-accent text-black font-bold text-xs flex items-center justify-center">3</span>
            Remove distractions before uploading
          </h3>
          <p>
            Watermarks, text overlays, timestamps, logos, and black borders often sneak into the generated prompt. Crop them out first so the prompt focuses solely on the visual style, not unwanted interface clutter.
          </p>
        </div>

        {/* Tip 4 */}
        <div className="space-y-2 p-5 rounded-2xl bg-accent/10 border border-accent/20">
          <h3 className="text-xl font-bold text-primary flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-accent text-black font-bold text-xs flex items-center justify-center">4</span>
            Always edit the generated prompt
          </h3>
          <p className="font-medium text-primary text-sm">
            This is the single most important tip: <em>treat the AI output as a first draft.</em>
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-black/70 dark:text-white/70 pt-1">
            <li>Delete unwanted elements or background noise.</li>
            <li>Add specific details the AI missed.</li>
            <li>Replace generic buzzwords (<em>&quot;nice&quot;</em>, <em>&quot;beautiful&quot;</em>) with concrete descriptions (<em>&quot;soft rim lighting&quot;</em>, <em>&quot;matte pastel palette&quot;</em>).</li>
            <li>Reorder the tokens so the most important elements come first.</li>
          </ul>
        </div>

        {/* Tip 5 */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-primary flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-accent text-black font-bold text-xs flex items-center justify-center">5</span>
            Put the most important words first
          </h3>
          <p>
            Most AI image models assign greater weighting to words near the beginning of a prompt. Lead immediately with your subject and style, then layer in the environment, lighting, and camera details.
          </p>

          <figure className="my-4 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 shadow-md">
            <div className="relative aspect-[16/10] w-full max-w-lg mx-auto">
              <Image
                src="/blog/image-to-prompt-tips-and-tricks/image-to-prompt-word-order.webp"
                alt="A young man in a dark hoodie holding a coffee cup by a window in moody pink city lighting"
                fill
                sizes="(max-width: 600px) 100vw, 600px"
                className="object-contain"
              />
            </div>
            <figcaption className="p-2.5 text-center text-xs text-black/50 dark:text-white/50 bg-black/5 dark:bg-white/5 italic">
              Leading with the subject produces focused results, rather than burying the subject under background adjectives.
            </figcaption>
          </figure>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-400">
              <strong className="block font-bold mb-1">❌ Weak Word Order:</strong>
              &quot;soft light, blurry background, warm tones, a young man holding a coffee cup&quot;
            </div>
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400">
              <strong className="block font-bold mb-1">✓ Better Word Order:</strong>
              &quot;A young man holding a coffee cup, soft window light, warm tones, blurred background&quot;
            </div>
          </div>
        </div>

        {/* Tip 6 */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-primary flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-accent text-black font-bold text-xs flex items-center justify-center">6</span>
            Match the prompt style to the AI model
          </h3>
          <p>
            Different models are trained on different prompting conventions. Optimize your generated prompt for your target generator:
          </p>

          {/* Responsive Table */}
          <div className="overflow-x-auto rounded-xl border border-black/10 dark:border-white/10 shadow-sm">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-black/5 dark:bg-white/10 text-primary font-bold border-b border-black/10 dark:border-white/10">
                  <th className="p-3.5">AI Model</th>
                  <th className="p-3.5">Best Prompting Style</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/5">
                <tr>
                  <td className="p-3.5 font-semibold text-primary whitespace-nowrap">Midjourney</td>
                  <td className="p-3.5 text-black/70 dark:text-white/70">
                    Short descriptive phrases separated by commas, plus flags like <code className="bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded text-xs">--ar 16:9</code> and <code className="bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded text-xs">--style raw</code>.
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-primary whitespace-nowrap">Stable Diffusion</td>
                  <td className="p-3.5 text-black/70 dark:text-white/70">
                    Comma-separated keywords combined with a robust negative prompt (e.g. <em>blurry, extra fingers, low quality</em>).
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-primary whitespace-nowrap">Flux</td>
                  <td className="p-3.5 text-black/70 dark:text-white/70">
                    Natural, full-sentence descriptions. Flux excels at parsing detailed syntax and positional relationships.
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-primary whitespace-nowrap">DALL·E / ChatGPT</td>
                  <td className="p-3.5 text-black/70 dark:text-white/70">
                    Conversational sentences; describe what you want as if you are briefing a professional human illustrator.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Tip 7 */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-primary flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-accent text-black font-bold text-xs flex items-center justify-center">7</span>
            Use style words to lock in the look
          </h3>
          <p>
            The stylistic keywords determine how the model renders your subject. Add precise vocabulary across these key dimensions:
          </p>

          <figure className="my-4 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 shadow-md">
            <div className="relative aspect-[16/10] w-full max-w-lg mx-auto">
              <Image
                src="/blog/image-to-prompt-tips-and-tricks/image-to-prompt-styles.webp"
                alt="Comparison of 4 different artistic styles: watercolor, 3D render, dark photography, and vector illustration"
                fill
                sizes="(max-width: 600px) 100vw, 600px"
                className="object-contain"
              />
            </div>
            <figcaption className="p-2.5 text-center text-xs text-black/50 dark:text-white/50 bg-black/5 dark:bg-white/5 italic">
              The exact same subject rendered with four different style modifiers: watercolor, 3D clay render, dark photography, and vector icon.
            </figcaption>
          </figure>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <strong className="text-primary block mb-1">Medium:</strong>
              watercolor, digital illustration, 3D render, 35mm film photography, vector flat art.
            </div>
            <div className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <strong className="text-primary block mb-1">Lighting:</strong>
              golden hour, volumetric rays, neon rim lighting, soft diffused studio light.
            </div>
            <div className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <strong className="text-primary block mb-1">Camera:</strong>
              macro lens, shallow depth of field, tilt-shift, bokeh, overhead bird&apos;s-eye view.
            </div>
            <div className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <strong className="text-primary block mb-1">Mood:</strong>
              nostalgic, cinematic, cyberpunk, ethereal, hyper-minimalist, moody.
            </div>
          </div>
        </div>

        {/* Tip 8 */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-primary flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-accent text-black font-bold text-xs flex items-center justify-center">8</span>
            Describe composition and aspect ratio
          </h3>
          <p>
            A prompt that reproduces colors and subjects accurately will still look awkward if the framing is wrong. Specify shot composition (<em>close-up portrait, medium shot, wide landscape</em>) and declare your aspect ratio parameter: <strong>1:1</strong> for Instagram squares, <strong>16:9</strong> for desktop banners, and <strong>9:16</strong> for mobile stories.
          </p>
        </div>

        {/* Tip 9 */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-primary flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-accent text-black font-bold text-xs flex items-center justify-center">9</span>
            Iterate in small steps
          </h3>
          <p>
            Resist the temptation to rewrite the entire prompt every time an image isn&apos;t perfect. Tweak one parameter at a time—adjust the lighting keyword, test a new aspect ratio, or replace the medium term. This incremental approach teaches you how each token impacts generation.
          </p>
        </div>

        {/* Tip 10 */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-primary flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-accent text-black font-bold text-xs flex items-center justify-center">10</span>
            Save your best prompts in a personal library
          </h3>
          <p>
            When you discover a prompt formula that produces exceptional art, save it! Note the target generator, parameter settings, and reference image. Over time, you build an invaluable personal prompt asset library categorized by aesthetic (portraits, isometric icons, landing page illustrations).
          </p>
        </div>
      </section>

      {/* Section: Common Mistakes */}
      <section id="common-mistakes" className="space-y-4 pt-6">
        <h2 className="text-2xl sm:text-3xl font-bold font-bricolage text-primary">
          Common Mistakes to Avoid
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          {[
            { title: 'Copy-pasting without editing', desc: 'Raw AI outputs often include irrelevant details or clutter.' },
            { title: 'Overstuffing the prompt', desc: 'Long keyword stuffing (80+ words) dilutes focus and causes models to ignore parts of the instruction.' },
            { title: 'Conflicting style modifiers', desc: 'Combining "photorealistic anime watercolor 3D render" confuses the generator. Stick to one dominant medium.' },
            { title: 'Ignoring negative prompts', desc: 'In Stable Diffusion and SDXL workflows, a solid negative prompt eliminates deformed anatomy and artifacts.' },
            { title: 'Skipping aspect ratios', desc: 'Default square renders often crop crucial elements in cinematic or vertical scenes.' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-red-500/5 border border-red-500/15">
              <div className="flex items-center gap-2 font-bold text-red-500 text-sm mb-1">
                <AlertTriangle size={15} /> {item.title}
              </div>
              <p className="text-xs text-black/60 dark:text-white/60">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Simple Step-by-Step Workflow */}
      <section id="step-by-step-workflow" className="space-y-4 pt-6">
        <h2 className="text-2xl sm:text-3xl font-bold font-bricolage text-primary">
          A Simple Step-by-Step Workflow
        </h2>
        <p>
          Here is a proven, repeatable 7-step process you can follow for every project:
        </p>
        <ol className="space-y-3 list-decimal list-inside text-sm">
          <li className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
            <strong>Pick a clear reference image</strong> with one defined subject and good resolution.
          </li>
          <li className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
            <strong>Upload it to an Image to Prompt tool</strong> to generate the initial structured prompt.
          </li>
          <li className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
            <strong>Read and refine:</strong> prune unnecessary noise and add missing nuances.
          </li>
          <li className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
            <strong>Reorder:</strong> ensure the primary subject and medium appear at the very beginning.
          </li>
          <li className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
            <strong>Adapt syntax</strong> to your target engine (Midjourney comma style, Flux full sentences).
          </li>
          <li className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
            <strong>Generate and iterate</strong> by modifying one specific variable per test run.
          </li>
          <li className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
            <strong>Save successful prompts</strong> into your personal collection for future reuse.
          </li>
        </ol>
      </section>

      {/* Section: Ethical Use */}
      <section className="space-y-3 pt-6 p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
        <h2 className="text-xl font-bold font-bricolage text-primary">
          Using Image to Prompt Ethically
        </h2>
        <p className="text-sm text-black/70 dark:text-white/70">
          Image to prompt is powerful for dissecting lighting, technique, and composition. Always use it responsibly:
        </p>
        <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-black/70 dark:text-white/70">
          <li>Study art direction, color palettes, and techniques rather than attempting to clone a living artist&apos;s trademark work.</li>
          <li>Never upload private photos of individuals without consent.</li>
          <li>Respect copyright terms and platform guidelines of the AI engines you utilize.</li>
          <li>Aim to remix inspirations into original art rather than duplicating references.</li>
        </ul>
      </section>

      {/* Section: FAQ */}
      <section id="faq" className="space-y-4 pt-6">
        <h2 className="text-2xl sm:text-3xl font-bold font-bricolage text-primary">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {[
            {
              q: 'What is an image to prompt generator?',
              a: 'An image to prompt generator is an AI vision tool that inspects a picture and generates a detailed text prompt that you can paste into AI image models like Midjourney, Stable Diffusion, Flux, and DALL·E.'
            },
            {
              q: 'Can I get the exact same image back from a generated prompt?',
              a: 'Usually not identically. Diffusion models incorporate stochastic noise, meaning outputs will match the style, color, and subject, but not pixel-for-pixel. You can get remarkably close by locking down seeds and detailed prompt modifiers.'
            },
            {
              q: 'Which image formats work best?',
              a: 'WebP, JPG, and PNG are all universally supported. High-resolution, crisp images yield the most accurate analysis.'
            },
            {
              q: 'Is image to prompt free to use?',
              a: 'Yes! ProCraft offers free image to prompt conversions directly on the platform with instant results.'
            },
            {
              q: 'Can I use the prompt in any AI model?',
              a: 'Yes, but tailoring the syntax to the model yields far superior art: Midjourney prefers comma-separated phrases, Stable Diffusion utilizes negative prompts, and Flux excels with natural descriptive sentences.'
            },
            {
              q: 'How long should a good prompt be?',
              a: 'A strong prompt is typically between 30 and 80 words (1 to 3 sentences). It should succinctly capture subject, medium, lighting, camera angle, and mood without keyword redundancy.'
            }
          ].map((faq, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-1.5">
              <h3 className="font-bold text-primary text-sm sm:text-base">{faq.q}</h3>
              <p className="text-xs sm:text-sm text-black/60 dark:text-white/60 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Final Thoughts & Call to Action Banner */}
      <div className="my-12 p-8 rounded-3xl bg-gradient-to-br from-accent/20 via-accent/10 to-transparent border border-accent/30 text-center space-y-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-accent text-black mb-2 shadow-lg">
          <Sparkles size={24} />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-bricolage text-primary">
          Ready to Turn Any Image into a Working Prompt?
        </h2>
        <p className="text-sm sm:text-base text-black/70 dark:text-white/70 max-w-xl mx-auto">
          Upload any reference image to the free ProCraft Image to Prompt converter and generate detailed prompts optimized for Midjourney, Flux, and SDXL in seconds.
        </p>
        <div className="pt-2">
          <Link
            href="/image-to-prompt"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-black font-bold text-sm rounded-full hover:bg-accent-hover transition-all hover:scale-105 shadow-xl"
          >
            Launch Image to Prompt Tool
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Related Reading Internal Links */}
      <div className="pt-6 border-t border-black/10 dark:border-white/10 space-y-3">
        <h3 className="font-bold text-primary text-sm uppercase tracking-wider">Related Resources &amp; Guides:</h3>
        <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
          <Link href="/prompt-library" className="px-3.5 py-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-accent hover:text-black transition-colors font-medium">
            Explore Prompt Library →
          </Link>
          <Link href="/prompt-library?category=Design" className="px-3.5 py-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-accent hover:text-black transition-colors font-medium">
            Design &amp; Image Prompts →
          </Link>
          <Link href="/ai-directory" className="px-3.5 py-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-accent hover:text-black transition-colors font-medium">
            Top AI Image Generators Directory →
          </Link>
        </div>
      </div>
    </div>
  );
}
