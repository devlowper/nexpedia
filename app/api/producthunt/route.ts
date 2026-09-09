import { NextResponse } from 'next/server';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  const token = process.env.PRODUCTHUNT_TOKEN;
  
  if (!token) {
    return NextResponse.json({ error: 'ProductHunt API token is not configured on the server.' }, { status: 500 });
  }
  
  const query = `
    query {
      posts(first: 20, topic: "artificial-intelligence", order: NEWEST) {
        edges {
          node {
            id
            name
            tagline
            url
            votesCount
            commentsCount
            thumbnail {
              url
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch('https://api.producthunt.com/v2/api/graphql', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 } // Next.js 13 fetch cache configuration
    });

    if (!res.ok) {
      throw new Error(`ProductHunt API returned status ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("ProductHunt API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
