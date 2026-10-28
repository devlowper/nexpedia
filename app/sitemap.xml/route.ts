import { NextResponse } from 'next/server';
import { BLOG_POSTS } from '@/lib/blogData';
import { getApiBaseUrl } from '@/lib/apiClient';

export const dynamic = 'force-dynamic';
export const revalidate = 86400; // 24 hours

function escapeXml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://procraft.site';
  const apiBase = getApiBaseUrl();
  const today = new Date().toISOString().split('T')[0];

  // 1. Static Core Pages
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: '/prompt-library', priority: '0.95', changefreq: 'daily' },
    { url: '/ai-directory', priority: '0.90', changefreq: 'daily' },
    { url: '/image-to-prompt', priority: '0.85', changefreq: 'weekly' },
    { url: '/agent-builder', priority: '0.80', changefreq: 'weekly' },
    { url: '/blog', priority: '0.80', changefreq: 'weekly' },
    { url: '/login', priority: '0.60', changefreq: 'monthly' },
    { url: '/about', priority: '0.50', changefreq: 'monthly' },
    { url: '/contact', priority: '0.50', changefreq: 'monthly' },
    { url: '/privacy', priority: '0.30', changefreq: 'yearly' },
    { url: '/terms', priority: '0.30', changefreq: 'yearly' },
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

  // Add static routes
  for (const p of staticPages) {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}${p.url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${p.changefreq}</changefreq>\n`;
    xml += `    <priority>${p.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  // Add Blog Posts with Cover Images
  for (const post of BLOG_POSTS) {
    const postUrl = `${baseUrl}/blog/${post.slug}`;
    const coverUrl = post.coverImage?.url?.startsWith('http')
      ? post.coverImage.url
      : `${baseUrl}${post.coverImage.url}`;

    xml += `  <url>\n`;
    xml += `    <loc>${postUrl}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    if (coverUrl) {
      xml += `    <image:image>\n`;
      xml += `      <image:loc>${escapeXml(coverUrl)}</image:loc>\n`;
      xml += `      <image:title>${escapeXml(post.title)}</image:title>\n`;
      xml += `      <image:caption>${escapeXml(post.metaDescription)}</image:caption>\n`;
      xml += `    </image:image>\n`;
    }
    xml += `  </url>\n`;
  }

  // 2. Fetch Prompts with Images (for Google Image Search)
  try {
    const res = await fetch(`${apiBase}/api/prompts?limit=1000`, {
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 86400 }
    });
    if (res.ok) {
      const data = await res.json();
      const prompts = Array.isArray(data) ? data : (data.data || []);
      for (const prompt of prompts) {
        if (!prompt.slug) continue;
        const promptUrl = `${baseUrl}/prompt-library/${prompt.slug}`;
        const imgUrl = prompt.example_output_image_url || prompt.imageUrl;
        const promptDate = prompt.date_published
          ? new Date(prompt.date_published).toISOString().split('T')[0]
          : today;

        xml += `  <url>\n`;
        xml += `    <loc>${promptUrl}</loc>\n`;
        xml += `    <lastmod>${promptDate}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.75</priority>\n`;

        if (imgUrl && imgUrl.startsWith('http')) {
          xml += `    <image:image>\n`;
          xml += `      <image:loc>${escapeXml(imgUrl)}</image:loc>\n`;
          xml += `      <image:title>${escapeXml(prompt.page_name || prompt.title || 'AI Prompt')}</image:title>\n`;
          if (prompt.description) {
            xml += `      <image:caption>${escapeXml(prompt.description.slice(0, 200))}</image:caption>\n`;
          }
          xml += `    </image:image>\n`;
        }
        xml += `  </url>\n`;
      }
    }
  } catch (err) {
    console.error('Error fetching prompts for sitemap:', err);
  }

  // 3. Fetch AI Directory Tools with Logos
  try {
    const res = await fetch(`${apiBase}/api/directory`, {
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 86400 }
    });
    if (res.ok) {
      const data = await res.json();
      const tools = Array.isArray(data) ? data : (data.data || []);
      for (const tool of tools) {
        if (!tool.slug) continue;
        const toolUrl = `${baseUrl}/ai-directory/${tool.slug}`;

        xml += `  <url>\n`;
        xml += `    <loc>${toolUrl}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.75</priority>\n`;

        if (tool.logo && tool.logo.startsWith('http')) {
          xml += `    <image:image>\n`;
          xml += `      <image:loc>${escapeXml(tool.logo)}</image:loc>\n`;
          xml += `      <image:title>${escapeXml(tool.name || 'AI Tool')}</image:title>\n`;
          if (tool.description) {
            xml += `      <image:caption>${escapeXml(tool.description.slice(0, 200))}</image:caption>\n`;
          }
          xml += `    </image:image>\n`;
        }
        xml += `  </url>\n`;
      }
    }
  } catch (err) {
    console.error('Error fetching tools for sitemap:', err);
  }

  xml += `</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
    },
  });
}
