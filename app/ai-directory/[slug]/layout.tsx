import type { Metadata } from 'next';
import { getApiBaseUrl } from '@/lib/apiClient';
import { SITE_URL, SITE_CONFIG } from '@/lib/constants';

interface LayoutProps {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const apiBase = getApiBaseUrl();

  try {
    const res = await fetch(`${apiBase}/api/directory/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error('Tool not found');
    const json = await res.json();
    const tool = json.data;

    if (!tool) throw new Error('No tool data');

    const cleanName = (tool.name || 'AI Tool').trim();

    // 50-60 chars title
    const title = `${cleanName} — AI Tool Review & Pricing | proCraft`;

    // 150-160 chars description
    let rawDesc = tool.tagline || tool.description || `Discover ${cleanName}: pricing, features, alternatives and pros/cons in the proCraft AI Directory.`;
    rawDesc = rawDesc.replace(/\s+/g, ' ').trim();
    const description = rawDesc.length > 160 ? `${rawDesc.slice(0, 157)}...` : rawDesc;

    const logoUrl = tool.logo;
    const pageUrl = `${SITE_URL}/ai-directory/${slug}`;

    return {
      title,
      description,
      alternates: {
        canonical: pageUrl,
      },
      openGraph: {
        title,
        description,
        url: pageUrl,
        siteName: SITE_CONFIG.name,
        locale: 'en_US',
        type: 'website',
        images: logoUrl
          ? [
              {
                url: logoUrl,
                width: 512,
                height: 512,
                alt: `${cleanName} Logo`,
              },
            ]
          : undefined,
      },
      twitter: {
        card: 'summary',
        title,
        description,
        images: logoUrl ? [logoUrl] : undefined,
      },
    };
  } catch {
    return {
      title: 'AI Tool Review & Details — proCraft',
      description: 'Discover curated AI tools, pricing, and models in the proCraft AI Directory.',
    };
  }
}

export default function AIDirectoryDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

