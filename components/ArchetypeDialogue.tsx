'use client';

import { useState } from 'react';
import { Dream, ARCHETYPES, Archetype } from '@/types/archetypes';

interface ArchetypeDialogueProps {
  dreams: Dream[];
}

interface Message {
  role: 'user' | 'archetype';
  content: string;
  archetypeId?: string;
}

export default function ArchetypeDialogue({ dreams }: ArchetypeDialogueProps) {
  const [selectedArchetype, setSelectedArchetype] = useState<Archetype | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (dreams.length === 0) {
    return (
      <div className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl p-8 text-center">
        <div className="text-6xl mb-4">💬</div>
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          Talk to Your Archetypes
        </h2>
        <p className="text-gray-600">
          Record your first dream to unlock conversations with your inner archetypes
        </p>
      </div>
    );
  }

  // Calculate dominant archetype
  const archetypeScores = Object.values(ARCHETYPES).map(archetype => {
    const scores = dreams.flatMap(dream =>
      dream.archetypeScores
        .filter(score => score.archetypeId === archetype.id)
        .map(score => score.score)
    );

    const average = scores.length > 0
      ? scores.reduce((sum, score) => sum + score, 0) / scores.length
      : 0;

    return {
      archetype,
      score: Math.round(average)
    };
  }).sort((a, b) => b.score - a.score);

  const sendMessage = async () => {
    if (!userInput.trim() || !selectedArchetype || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: userInput.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/archetype-dialogue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          archetypeId: selectedArchetype.id,
          userMessage: userMessage.content,
          conversationHistory: messages
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const { response: archetypeResponse } = await response.json();

      const archetypeMessage: Message = {
        role: 'archetype',
        content: archetypeResponse,
        archetypeId: selectedArchetype.id
      };

      setMessages(prev => [...prev, archetypeMessage]);
    } catch (error) {
      console.error('Error in dialogue:', error);
      alert('Failed to get response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const startConversation = (archetype: Archetype) => {
    setSelectedArchetype(archetype);
    setMessages([]);
  };

  const endConversation = () => {
    setSelectedArchetype(null);
    setMessages([]);
    setUserInput('');
  };

  return (
    <div className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <span>💬</span>
          Talk to Your Archetypes
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          Have a conversation with the voices within your psyche
        </p>
      </div>

      {!selectedArchetype ? (
        <div>
          <p className="text-gray-600 mb-6">
            Select an archetype to begin your dialogue. Each archetype will speak from their unique perspective within your psyche.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {archetypeScores.map(({ archetype, score }) => (
              <button
                key={archetype.id}
                onClick={() => startConversation(archetype)}
                className="p-6 rounded-xl border-2 transition-all hover:shadow-lg hover:scale-105 text-center"
                style={{ borderColor: archetype.color + '40' }}
              >
                <div className="text-4xl mb-3">{archetype.emoji}</div>
                <h3 className="font-semibold text-sm mb-2">{archetype.name}</h3>
                <div className="text-2xl font-bold mb-2" style={{ color: archetype.color }}>
                  {score}%
                </div>
                <p className="text-xs text-gray-500 mb-3">{archetype.description}</p>
                <div className="text-xs font-semibold text-purple-600">
                  Talk to {archetype.name.replace('The ', '')}
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          {/* Conversation Header */}
          <div
            className="mb-6 p-4 rounded-xl flex items-center justify-between"
            style={{ backgroundColor: selectedArchetype.color + '20' }}
          >
            <div className="flex items-center gap-3">
              <div className="text-4xl">{selectedArchetype.emoji}</div>
              <div>
                <h3 className="font-semibold text-lg" style={{ color: selectedArchetype.color }}>
                  {selectedArchetype.name}
                </h3>
                <p className="text-sm text-gray-600">{selectedArchetype.description}</p>
              </div>
            </div>
            <button
              onClick={endConversation}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-semibold transition-colors"
            >
              End Conversation
            </button>
          </div>

          {/* Messages */}
          <div className="mb-6 space-y-4 max-h-96 overflow-y-auto">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <p>Start the conversation by asking a question or sharing a thought.</p>
                <p className="text-sm mt-2">
                  Example: "What are you trying to tell me?" or "Why do you appear in my dreams?"
                </p>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-purple-100 text-purple-900'
                      : 'border-2'
                  }`}
                  style={
                    message.role === 'archetype'
                      ? {
                          borderColor: selectedArchetype.color + '40',
                          backgroundColor: selectedArchetype.color + '10'
                        }
                      : {}
                  }
                >
                  {message.role === 'archetype' && (
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{selectedArchetype.emoji}</span>
                      <span className="font-semibold text-sm" style={{ color: selectedArchetype.color }}>
                        {selectedArchetype.name}
                      </span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div
                  className="max-w-[80%] p-4 rounded-2xl border-2"
                  style={{
                    borderColor: selectedArchetype.color + '40',
                    backgroundColor: selectedArchetype.color + '10'
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{selectedArchetype.emoji}</span>
                    <span className="text-sm" style={{ color: selectedArchetype.color }}>
                      {selectedArchetype.name} is thinking...
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex gap-3">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder={`Ask ${selectedArchetype.name} a question...`}
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-500"
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={!userInput.trim() || isLoading}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
