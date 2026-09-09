import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      console.error("OPENROUTER_API_KEY is not defined in environment variables");
      return NextResponse.json({ error: "API Key Configuration Error" }, { status: 500 });
    }

    const body = await req.json();
    const { model, messages } = body;

    if (!model || !messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
    }

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        "X-Title": "Nexpedia AI Playground",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        messages
      })
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`OpenRouter Chat API Error (${res.status}):`, errorText);
      return NextResponse.json({ error: `OpenRouter API Error: ${res.status}` }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Failed to fetch chat completions from OpenRouter:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
