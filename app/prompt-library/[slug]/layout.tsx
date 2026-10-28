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
    const res = await fetch(`${apiBase}/api/prompts/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error('Prompt not found');
    const json = await res.json();
    const prompt = json.data;

    if (!prompt) throw new Error('No prompt data');

    const cleanName = (prompt.page_name || 'AI Prompt')
      .replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu, '')
      .replace(/\s*\|\s*proCraft/i, '')
      .trim();

    // 50-60 chars title
    const title = `${cleanName} — AI Prompt | proCraft`;

    // 150-160 chars description
    let rawDesc = prompt.description || prompt.what_this_prompt_does || `Discover the best ${prompt.category?.name || 'AI'} prompt for Midjourney, ChatGPT, FLUX & Stable Diffusion. Copy ready-to-use prompt on proCraft.`;
    rawDesc = rawDesc.replace(/\s+/g, ' ').trim();
    const description = rawDesc.length > 160 ? `${rawDesc.slice(0, 157)}...` : rawDesc;

    const imgUrl = prompt.example_output_image_url || prompt.example_output_image;
    const pageUrl = `${SITE_URL}/prompt-library/${slug}`;

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
        type: 'article',
        images: imgUrl
          ? [
              {
                url: imgUrl,
                width: 1024,
                height: 1024,
                alt: cleanName,
              },
            ]
          : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: imgUrl ? [imgUrl] : undefined,
      },
    };
  } catch {
    return {
      title: 'AI Prompt Details — proCraft',
      description: 'Explore high-quality AI art prompts for Midjourney, ChatGPT, FLUX, and Stable Diffusion on proCraft.',
    };
  }
}

export default function PromptDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

