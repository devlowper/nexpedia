import { NextResponse } from 'next/server';

// Revalidate this endpoint at most every 1 hour (3600 seconds)
export const revalidate = 3600;

export async function GET() {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      console.error("OPENROUTER_API_KEY is not defined in environment variables");
      return NextResponse.json({ error: "API Key Configuration Error" }, { status: 500 });
    }

    const res = await fetch("https://openrouter.ai/api/v1/models", {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      next: { revalidate: 3600 } // Cache the response for 1 hour
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`OpenRouter API Error (${res.status}):`, errorText);
      return NextResponse.json({ error: `OpenRouter API Error: ${res.status}` }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Failed to fetch models from OpenRouter:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
