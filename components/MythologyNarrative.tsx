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
      <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-[2rem] p-12 text-center animate-fade-in">
        <h2 className="text-2xl font-light text-gray-800 mb-4">
          Your Personal Mythology
        </h2>
        <p className="text-gray-600 font-light">
          Record at least 2 dreams to unlock your personal mythology narrative
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-[2rem] p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-light text-gray-800">
            Your Personal Mythology
          </h2>
          <p className="text-gray-600 text-sm mt-2 font-light">
            AI-woven narrative connecting your {dreams.length} dreams
          </p>
        </div>
        {!mythology && (
          <button
            onClick={generateMythology}
            disabled={isGenerating}
            className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-8 py-3 rounded-full font-light hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </span>
            ) : (
              'Create Mythology'
            )}
          </button>
        )}
      </div>

      {mythology ? (
        <div className="space-y-6">
          {/* Current Phase */}
          <div className="bg-gradient-to-r from-purple-100/50 to-pink-100/50 rounded-3xl p-6 border border-pink-200/50">
            <h3 className="text-lg font-light text-gray-800">
              Current Phase: {mythology.currentPhase}
            </h3>
            <p className="text-gray-600 text-sm font-light mt-1">{mythology.phaseDescription}</p>
          </div>

          {/* Main Narrative */}
          <div className="bg-white/50 rounded-3xl p-8 border border-gray-200/50">
            <h3 className="text-xl font-light mb-4 text-gray-800 text-center">
              Your Journey
            </h3>
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap font-light">
              {mythology.narrative}
            </div>
          </div>

          {/* Archetype Evolution */}
          <div className="bg-blue-100/30 rounded-3xl p-6 border border-blue-200/50">
            <h3 className="text-lg font-light mb-3 text-gray-800">
              Archetype Evolution
            </h3>
            <p className="text-gray-700 font-light">{mythology.archetypeEvolution}</p>
          </div>

          {/* Insights */}
          <div className="bg-white/50 rounded-3xl p-6 border border-gray-200/50">
            <h3 className="text-lg font-light mb-4 text-gray-800">
              Key Insights
            </h3>
            <ul className="space-y-3">
              {mythology.insights.map((insight, index) => (
                <li key={index} className="flex gap-3">
                  <span className="text-pink-400 flex-shrink-0">•</span>
                  <span className="text-gray-700 font-light">{insight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Next Steps */}
          <div className="bg-green-100/30 rounded-3xl p-6 border border-green-200/50">
            <h3 className="text-lg font-light mb-3 text-gray-800">
              What Comes Next
            </h3>
            <p className="text-gray-700 font-light">{mythology.nextSteps}</p>
          </div>

          {/* Regenerate Button */}
          <div className="text-center pt-4">
            <button
              onClick={generateMythology}
              disabled={isGenerating}
              className="text-gray-600 hover:text-gray-800 font-light underline decoration-gray-400 hover:decoration-gray-600 transition-all"
            >
              Regenerate Mythology
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
