import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Call OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an expert AI prompt engineer and agent architect. 
Given a user's description of what they want an AI agent to do, you must design a complete AI agent profile.
CRITICAL INSTRUCTION: The "systemPrompt" you generate MUST be extremely detailed, comprehensive, and production-ready. It should be at least 3-5 paragraphs long and include explicit sections for the agent's persona, tone, rules, constraints, step-by-step reasoning protocols, and output formatting. Do NOT write a short or generic prompt.

You MUST respond with ONLY a valid JSON object matching this exact schema:
{
  "name": "Catchy name for the agent",
  "role": "1-2 sentence description of the agent's role",
  "recommendedModel": "Name of the best AI model for this task (e.g. GPT-4o, Claude 3.5 Sonnet)",
  "requiredTools": ["tool1", "tool2", "tool3"],
  "sampleWorkflow": ["Step 1", "Step 2", "Step 3"],
  "systemPrompt": "A highly detailed, multi-paragraph system prompt covering persona, rules, constraints, and explicit instructions."
}`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('OpenRouter error:', err);
      return NextResponse.json({ error: 'Failed to generate agent from provider' }, { status: 500 });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      return NextResponse.json({ error: 'No content received from AI' }, { status: 500 });
    }

    const agentData = JSON.parse(content);
    
    return NextResponse.json({
      success: true,
      data: agentData
    });
  } catch (error: any) {
    console.error('Generate agent error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
