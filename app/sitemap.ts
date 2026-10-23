import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://procraft.com';

  const routes = [
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

  return routes;
}
