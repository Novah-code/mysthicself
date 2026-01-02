'use client';

import { useState } from 'react';
import { Dream } from '@/types/archetypes';

interface MythologyNarrativeProps {
  dreams: Dream[];
}

interface Mythology {
  currentPhase: string;
  phaseDescription: string;
  narrative: string;
  archetypeEvolution: string;
  insights: string[];
  nextSteps: string;
  dominantPattern: string;
}

export default function MythologyNarrative({ dreams }: MythologyNarrativeProps) {
  const [mythology, setMythology] = useState<Mythology | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateMythology = async () => {
    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate-mythology', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dreams }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate mythology');
      }

      const { mythology } = await response.json();
      setMythology(mythology);
    } catch (error) {
      console.error('Error generating mythology:', error);
      alert('Failed to generate mythology. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (dreams.length < 2) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="text-6xl mb-4">📖</div>
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          Your Personal Mythology
        </h2>
        <p className="text-gray-600">
          Record at least 2 dreams to unlock your personal mythology narrative
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            📖 Your Personal Mythology
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            AI-generated narrative connecting your {dreams.length} dreams into one mythological journey
          </p>
        </div>
        {!mythology && (
          <button
            onClick={generateMythology}
            disabled={isGenerating}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Weaving your myth...
              </span>
            ) : (
              'Generate My Mythology'
            )}
          </button>
        )}
      </div>

      {mythology ? (
        <div className="space-y-6">
          {/* Current Phase */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">🌟</span>
              <div>
                <h3 className="text-lg font-semibold text-purple-900">
                  Current Phase: {mythology.currentPhase}
                </h3>
                <p className="text-purple-700 text-sm">{mythology.phaseDescription}</p>
              </div>
            </div>
          </div>

          {/* Main Narrative */}
          <div className="prose max-w-none">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Your Journey</h3>
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {mythology.narrative}
            </div>
          </div>

          {/* Archetype Evolution */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-2 text-blue-900 flex items-center gap-2">
              <span>🔄</span>
              Archetype Evolution
            </h3>
            <p className="text-blue-800">{mythology.archetypeEvolution}</p>
          </div>

          {/* Insights */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center gap-2">
              <span>💡</span>
              Key Insights
            </h3>
            <ul className="space-y-2">
              {mythology.insights.map((insight, index) => (
                <li key={index} className="flex gap-3">
                  <span className="text-purple-600 flex-shrink-0">•</span>
                  <span className="text-gray-700">{insight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Next Steps */}
          <div className="bg-green-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-2 text-green-900 flex items-center gap-2">
              <span>🔮</span>
              What Comes Next
            </h3>
            <p className="text-green-800">{mythology.nextSteps}</p>
          </div>

          {/* Regenerate Button */}
          <div className="text-center pt-4">
            <button
              onClick={generateMythology}
              disabled={isGenerating}
              className="text-purple-600 hover:text-purple-800 font-semibold underline"
            >
              Regenerate Mythology
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
