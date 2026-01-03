import { NextRequest, NextResponse } from 'next/server';
import { Dream } from '@/types/archetypes';

export async function POST(request: NextRequest) {
  try {
    const { dreams } = await request.json();

    if (!dreams || !Array.isArray(dreams) || dreams.length === 0) {
      return NextResponse.json(
        { error: 'At least one dream is required' },
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

    // Sort dreams by timestamp (oldest first for chronological narrative)
    const sortedDreams = [...dreams].sort((a: Dream, b: Dream) => a.timestamp - b.timestamp);

    // Build dream summary for prompt
    const dreamSummary = sortedDreams.map((dream: Dream, index: number) => {
      const topArchetype = dream.archetypeScores
        .sort((a, b) => b.score - a.score)[0];

      const date = new Date(dream.timestamp).toLocaleDateString();

      return `Dream ${index + 1} (${date}):
Content: "${dream.content.substring(0, 200)}${dream.content.length > 200 ? '...' : ''}"
Dominant Archetype: ${topArchetype.archetypeId} (${topArchetype.score}%)
Top 3 Archetypes: ${dream.archetypeScores
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map(s => `${s.archetypeId}: ${s.score}%`)
        .join(', ')}`;
    }).join('\n\n');

    const prompt = `You are an expert in Jungian psychology and Joseph Campbell's Hero's Journey. Analyze these dreams chronologically and create a cohesive personal mythology narrative.

DREAMS (${sortedDreams.length} dreams over time):

${dreamSummary}

HERO'S JOURNEY STAGES:
1. The Ordinary World
2. The Call to Adventure
3. Refusal of the Call
4. Meeting the Mentor (Wise Guide)
5. Crossing the Threshold
6. Tests, Allies, Enemies
7. Approach to the Inmost Cave (Shadow work)
8. The Ordeal
9. Reward (Seizing the Sword)
10. The Road Back
11. Resurrection
12. Return with the Elixir

YOUR TASK:
1. Identify which Hero's Journey stage the dreamer is currently in
2. Trace the evolution of their dominant archetypes over time
3. Create a compelling narrative that connects these dreams into one mythological story
4. Provide insights about what this journey means
5. Predict what might come next in their journey

Respond ONLY with a JSON object in this format:
{
  "currentPhase": "The Ordeal",
  "phaseDescription": "You are facing your deepest fears...",
  "narrative": "Your dreams tell a story of profound transformation. Three weeks ago, you stood at the threshold... [3-4 paragraphs of connected narrative]",
  "archetypeEvolution": "Your journey began dominated by Shadow (fear, hiding), evolved through Hero (courage, action), and now Wise Guide is emerging (wisdom, integration).",
  "insights": [
    "Your Shadow archetype peaked during [specific dream], suggesting...",
    "The emergence of your Hero shows...",
    "Your Wise Guide is now speaking..."
  ],
  "nextSteps": "Based on your journey, you may soon enter [next phase]. Watch for dreams about...",
  "dominantPattern": "Transformation through facing fear"
}

Make the narrative personal, compelling, and psychologically insightful. Use specific details from their dreams.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash:generateContent?key=${apiKey}`,
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
        { error: 'Failed to generate mythology' },
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

    const mythology = JSON.parse(responseText);

    return NextResponse.json({ mythology });

  } catch (error) {
    console.error('Error in generate-mythology:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
