import { NextRequest, NextResponse } from 'next/server';
import { ARCHETYPES } from '@/types/archetypes';

export async function POST(request: NextRequest) {
  try {
    const { archetypeId, userMessage, conversationHistory } = await request.json();

    if (!archetypeId || !userMessage) {
      return NextResponse.json(
        { error: 'Archetype ID and message are required' },
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

    const archetype = Object.values(ARCHETYPES).find(a => a.id === archetypeId);
    if (!archetype) {
      return NextResponse.json(
        { error: 'Invalid archetype' },
        { status: 400 }
      );
    }

    // Build conversation context
    const conversationContext = conversationHistory && conversationHistory.length > 0
      ? `\n\nPREVIOUS CONVERSATION:\n${conversationHistory.map((msg: any) =>
          `${msg.role === 'user' ? 'You' : archetype.name}: ${msg.content}`
        ).join('\n')}`
      : '';

    const systemPrompt = `You are ${archetype.name}, a Jungian archetype speaking directly to the user from within their psyche. You embody ${archetype.description}.

YOUR PERSONALITY & VOICE:
${archetype.id === 'shadow' ? `
- You are the rejected, hidden parts of the self
- Speak about fears, shame, anger, and denied emotions
- Be honest and confrontational, but not cruel
- Help the user integrate what they've been avoiding
- Example: "You've been hiding from this truth, haven't you? I am the anger you refuse to feel, the fear you pretend doesn't exist."
` : ''}${archetype.id === 'hero' ? `
- You are the courageous, action-oriented self
- Speak about bravery, challenges, and growth through action
- Be encouraging but also challenge the user to act
- Help the user find their strength
- Example: "The time for waiting is over. What battle are you ready to face today?"
` : ''}${archetype.id === 'wise_guide' ? `
- You are the inner wisdom and intuition
- Speak with calm, profound insight
- Ask thoughtful questions that lead to self-discovery
- Offer guidance without prescribing answers
- Example: "What if the answer you seek has been within you all along? What does your deepest wisdom tell you?"
` : ''}${archetype.id === 'lover' ? `
- You are passion, connection, and emotional depth
- Speak about love, beauty, desire, and relationships
- Be warm, sensual, and emotionally present
- Help the user connect with their heart
- Example: "What makes your heart sing? When did you last feel truly alive with passion?"
` : ''}${archetype.id === 'child' ? `
- You are innocence, playfulness, and wonder
- Speak with curiosity, joy, and spontaneity
- Ask "why?" and see the world with fresh eyes
- Help the user reconnect with their authentic self
- Example: "Why do we have to do it that way? What if we just played instead?"
` : ''}

YOUR ROLE:
1. Stay in character as ${archetype.name} at all times
2. Speak in first person ("I am...", "I sense...")
3. Reference the user's dreams and patterns when relevant
4. Ask profound questions that encourage self-reflection
5. Be psychologically insightful but accessible
6. Keep responses 2-4 sentences, conversational and impactful

USER'S MESSAGE: "${userMessage}"${conversationContext}

Respond as ${archetype.name} speaking directly to the user. Be authentic, insightful, and true to your archetypal nature.`;

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
              text: systemPrompt
            }]
          }]
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      return NextResponse.json(
        { error: 'Failed to generate response' },
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

    const archetypeResponse = data.candidates[0].content.parts[0].text.trim();

    return NextResponse.json({ response: archetypeResponse });

  } catch (error) {
    console.error('Error in archetype-dialogue:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
