import { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/lib/blogData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://procraft.site';

  const staticRoutes = [
    '',
    '/prompt-library',
    '/ai-directory',
    '/image-to-prompt',
    '/agent-builder',
    '/blog',
    '/about',
    '/privacy',
    '/terms',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: (route === '' || route === '/prompt-library' ? 'daily' : 'weekly') as
      | 'daily'
      | 'weekly',
    priority: route === '' ? 1.0 : route === '/prompt-library' ? 0.9 : 0.7,
  }));

  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...blogRoutes];
}
