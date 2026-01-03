import { NextRequest, NextResponse } from 'next/server';
import { ARCHETYPES } from '@/types/archetypes';

export async function POST(request: NextRequest) {
  try {
    const { dreamContent } = await request.json();

    if (!dreamContent || dreamContent.trim().length < 10) {
      return NextResponse.json(
        { error: 'Dream content must be at least 10 characters long' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Build archetype descriptions for prompt
    const archetypeList = Object.values(ARCHETYPES).map(arch =>
      `- ${arch.name} (${arch.emoji}): ${arch.description}. Keywords: ${arch.keywords.join(', ')}`
    ).join('\n');

    const prompt = `You are an expert in Jungian psychology and mythological narratives. Review the following dreams and score how strongly each archetype is present.

DREAMS:
"${dreamContent}"

ARCHETYPES TO CONSIDER:
${archetypeList}

For each archetype, provide a score from 0-100 indicating how strongly that archetype is present in these dreams, along with brief reasoning.

Respond ONLY with a JSON array in this exact format:
[
  {
    "archetypeId": "shadow",
    "score": 75,
    "reasoning": "Strong presence of fear and hidden emotions"
  },
  {
    "archetypeId": "hero",
    "score": 30,
    "reasoning": "Minor elements of overcoming obstacles"
  }
  ... (continue for all 5 archetypes)
]

Make sure to include ALL 5 archetypes (shadow, hero, wise_guide, lover, child) in your response.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      return NextResponse.json(
        { error: 'Failed to create mythology from dreams' },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
      return NextResponse.json(
        { error: 'Invalid response from AI' },
        { status: 502 }
      );
    }

    let responseText = data.candidates[0].content.parts[0].text.trim();

    // Extract JSON from markdown code blocks if present
    if (responseText.includes('```json')) {
      responseText = responseText.split('```json')[1].split('```')[0].trim();
    } else if (responseText.includes('```')) {
      responseText = responseText.split('```')[1].split('```')[0].trim();
    }

    const archetypeScores = JSON.parse(responseText);

    return NextResponse.json({
      archetypeScores
    });

  } catch (error) {
    console.error('Error in extract-archetypes:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
