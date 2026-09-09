import React from 'react';
import Link from 'next/link';

export function UseCases() {
  const useCases = [
    {
      title: "E-commerce product promotional image",
      description: "Transform your e-commerce game with stunning promotional visuals that convert! Simply upload your product and model photos, and watch AI create captivating marketing images that preserve every detail while dramatically boosting your sales potential. Cut production costs by 90% and launch campaigns in minutes, not days.",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop",
      slug: "e-commerce-product-promotional-image",
      reverse: false
    },
    {
      title: "Movie storyboard generation",
      description: "Input the initial frame photo, AI can generate subsequent frame photos, which you can edit as needed to create a movie storyboard that meets your needs. Next, use our picture-to-video function to generate a coherent video from each frame without changing the characters, for the production of a completely high-quality movie.",
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop",
      slug: "movie-storyboard-generation",
      reverse: true
    },
    {
      title: "Sticker generation",
      description: "Transform your creative ideas into stunning, professional-quality stickers instantly. Simply upload an image or describe your vision, and watch AI bring your concepts to life with incredible detail and vibrant colors that make your stickers stand out.",
      image: "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?q=80&w=1973&auto=format&fit=crop",
      slug: "sticker-generation",
      reverse: false
    }
  ];

  return (
    <section className="w-full bg-base py-20 px-4 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col items-center">

        {/* Header */}
        <div className="text-center mb-20">
          <h2
            className="section-title font-bricolage text-3xl md:text-4xl font-bold text-primary mb-4"
            style={{ fontFamily: '"Bricolage Grotesque", var(--font-bricolage), sans-serif' }}
          >
            Typical use cases of Nexpedia
          </h2>
          <p className="text-black/60 dark:text-white/60 text-sm max-w-xl mx-auto">
            See how Nexpedia can improve your design efficiency.
          </p>
        </div>

        {/* Use Case Rows */}
        <div className="flex flex-col gap-24 w-full">
          {useCases.map((useCase, i) => (
            <div key={i} className={`flex flex-col md:flex-row items-center gap-10 md:gap-20 ${useCase.reverse ? 'md:flex-row-reverse' : ''}`}>

              {/* Image Area */}
              <div className="w-full md:w-1/2">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-elevated border border-border shadow-2xl group">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${useCase.image}')` }} />
                  {/* Decorative Elements */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Text Area */}
              <div className="w-full md:w-1/2 flex flex-col items-start text-left">
                <h3
                  className="font-bricolage text-2xl md:text-3xl font-bold text-primary mb-4 tracking-tight"
                  style={{ fontFamily: '"Bricolage Grotesque", var(--font-bricolage), sans-serif' }}
                >
                  {useCase.title.split(' ').map((word, idx, arr) => {
                    // Highlight the last word (or specific keywords) in accent color
                    if (idx === arr.length - 1) return <span key={idx} className="text-accent">{word}</span>;
                    return word + ' ';
                  })}
                </h3>
                <p className="text-black/60 dark:text-white/60 text-sm leading-relaxed mb-8">
                  {useCase.description}
                </p>
                <Link
                  href={`/prompt-library/${useCase.slug}`}
                  className="text-accent text-sm font-semibold hover:text-accent-hover transition-colors flex items-center gap-2"
                >
                  How to use &rarr;
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
