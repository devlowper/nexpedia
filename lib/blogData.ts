export interface BlogPost {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  focusKeyword: string;
  secondaryKeywords: string[];
  coverImage: {
    url: string;
    alt: string;
  };
  category: string;
  publishedAt: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  excerpt: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'image-to-prompt-tips-and-tricks',
    title: 'Image to Prompt Tips and Tricks: How to Get Better AI Prompts from Any Image',
    seoTitle: 'Image to Prompt Tips & Tricks for Better AI Art (2026)',
    metaDescription: 'Learn proven image to prompt tips and tricks. Turn any picture into a detailed AI prompt for Midjourney, Stable Diffusion, Flux and more, step by step.',
    focusKeyword: 'image to prompt',
    secondaryKeywords: [
      'image to prompt generator',
      'AI image prompt',
      'reverse image prompt',
      'Midjourney prompt from image',
      'Stable Diffusion prompt',
      'how to write AI prompts'
    ],
    coverImage: {
      url: '/blog/image-to-prompt-tips-and-tricks/image-to-prompt-cover.webp',
      alt: 'Reference photo being converted into an AI prompt using an image to prompt tool'
    },
    category: 'Guides & Tutorials',
    publishedAt: 'Oct 24, 2026',
    readTime: '8 min read',
    author: {
      name: 'ProCraft Team',
      role: 'AI Prompt Engineering Team'
    },
    excerpt: 'Have you ever found an image online and wanted to recreate its exact visual style? Learn practical image to prompt tips and tricks to turn any picture into a recipe for Midjourney, Stable Diffusion, Flux, and more.'
  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
