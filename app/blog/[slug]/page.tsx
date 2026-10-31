import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { getBlogPostBySlug, BLOG_POSTS } from '@/lib/blogData';
import ImageToPromptPostContent from '@/components/blog/posts/ImageToPromptPostContent';
import PromptEngineeringGuidePostContent from '@/components/blog/posts/PromptEngineeringGuidePostContent';
import GPTImagePromptGuidePostContent from '@/components/blog/posts/GPTImagePromptGuidePostContent';
import { AdsterraBanner, AdsterraResponsiveBanner, AdsterraNativeBanner } from '@/components/ads/AdsterraBanner';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found | proCraft',
    };
  }

  const siteUrl = 'https://procraft.site';
  const url = `${siteUrl}/blog/${post.slug}`;
  const imageUrl = post.coverImage.url.startsWith('http')
    ? post.coverImage.url
    : `${siteUrl}${post.coverImage.url}`;

  return {
    title: `${post.seoTitle} | proCraft`,
    description: post.metaDescription,
    keywords: [post.focusKeyword, ...post.secondaryKeywords],
    authors: [{ name: post.author.name }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.seoTitle,
      description: post.metaDescription,
      url,
      siteName: 'proCraft',
      locale: 'en_US',
      type: 'article',
      publishedTime: post.slug === 'how-to-prompt-gpt-image-2-5'
        ? '2026-10-31T00:00:00.000Z'
        : post.slug === 'prompt-engineering-guide'
        ? '2026-10-26T00:00:00.000Z'
        : '2026-10-24T00:00:00.000Z',
      authors: [post.author.name],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.coverImage.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle,
      description: post.metaDescription,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const siteUrl = 'https://procraft.site';
  const imageUrl = post.coverImage.url.startsWith('http')
    ? post.coverImage.url
    : `${siteUrl}${post.coverImage.url}`;
  const publishDateIso = post.slug === 'how-to-prompt-gpt-image-2-5'
    ? '2026-10-31T00:00:00.000Z'
    : post.slug === 'prompt-engineering-guide'
    ? '2026-10-26T00:00:00.000Z'
    : '2026-10-24T00:00:00.000Z';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    image: imageUrl,
    datePublished: publishDateIso,
    dateModified: publishDateIso,
    author: {
      '@type': 'Organization',
      name: post.author.name,
      url: 'https://procraft.site',
    },
    publisher: {
      '@type': 'Organization',
      name: 'proCraft',
      logo: {
        '@type': 'ImageObject',
        url: 'https://procraft.site/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.slug}`,
    },
    keywords: [post.focusKeyword, ...post.secondaryKeywords].join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="min-h-screen pt-28 pb-20 px-4 md:px-6 max-w-4xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-black/50 dark:text-white/50 mb-8">
          <Link href="/blog" className="hover:text-accent transition-colors flex items-center gap-1.5">
            <ArrowLeft size={14} /> Back to Blog
          </Link>
          <span>/</span>
          <span className="text-accent">{post.category}</span>
        </div>

        {/* Article Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-accent/15 text-accent text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-accent/20">
              {post.category}
            </span>
            <span className="text-xs text-black/50 dark:text-white/50 flex items-center gap-1">
              <Clock size={13} /> {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-bricolage text-primary tracking-tight leading-[1.2] mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 py-4 border-y border-black/10 dark:border-white/10 text-xs text-black/60 dark:text-white/60">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-accent/15 border border-accent/25 flex items-center justify-center p-1 overflow-hidden">
                <Image
                  src="/logo-icon-pink.png"
                  alt={post.author.name}
                  width={20}
                  height={20}
                  className="w-4 h-4 object-contain"
                />
              </div>
              <span className="font-semibold text-primary">{post.author.name}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Calendar size={13} />
              <span>{post.publishedAt}</span>
            </div>
          </div>
        </header>

        {/* Hero Cover Image */}
        <figure className="mb-12 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-xl bg-black/5 dark:bg-white/5">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt}
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
          </div>
          <figcaption className="p-3 text-center text-xs text-black/50 dark:text-white/50 bg-black/5 dark:bg-white/5 italic border-t border-black/5 dark:border-white/5">
            {post.coverImage.alt}
          </figcaption>
        </figure>

        {/* Top/Mid-Article Responsive Banner */}
        <AdsterraResponsiveBanner className="mb-10" />

        {/* Article Body Content */}
        {post.slug === 'image-to-prompt-tips-and-tricks' && <ImageToPromptPostContent />}
        {post.slug === 'prompt-engineering-guide' && <PromptEngineeringGuidePostContent />}
        {post.slug === 'how-to-prompt-gpt-image-2-5' && <GPTImagePromptGuidePostContent />}

        {/* Bottom Article Ads */}
        <div className="w-full flex flex-col items-center mt-12 pt-8 border-t border-black/10 dark:border-white/10">
          <AdsterraBanner format="300x250" />
          <AdsterraNativeBanner />
          <AdsterraResponsiveBanner className="mt-8" />
        </div>
      </article>
    </>
  );
}
