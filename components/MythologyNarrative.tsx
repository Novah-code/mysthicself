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
      <div className="bg-slate-800/40 backdrop-blur-md border-2 border-amber-500/30 rounded-3xl shadow-[0_0_50px_rgba(251,191,36,0.15)] p-12 text-center relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-amber-400/30 text-xl">⟡</div>

        <div className="text-6xl mb-6 opacity-60">📖</div>
        <h2 className="text-2xl font-serif text-amber-200 mb-4 tracking-wide">
          Your Personal Mythology
        </h2>
        <p className="text-amber-100/50 font-light">
          Record at least 2 dreams to unlock your personal mythology narrative
        </p>

        {/* Decorative bottom */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-amber-400/30 text-xl">⟡</div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/40 backdrop-blur-md border-2 border-amber-500/30 rounded-3xl shadow-[0_0_50px_rgba(251,191,36,0.15)] p-8 relative overflow-hidden">
      {/* Decorative corner ornaments */}
      <div className="absolute top-4 left-4 text-amber-500/20 text-2xl">❋</div>
      <div className="absolute top-4 right-4 text-amber-500/20 text-2xl">❋</div>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-serif text-amber-200 tracking-wide">
            📖 Your Personal Mythology
          </h2>
          <p className="text-amber-100/50 text-sm mt-2 font-light">
            AI-woven narrative connecting your {dreams.length} dreams into one mythological journey
          </p>
        </div>
        {!mythology && (
          <button
            onClick={generateMythology}
            disabled={isGenerating}
            className="bg-gradient-to-r from-amber-600 to-yellow-600 text-slate-900 px-8 py-3 rounded-full font-semibold hover:shadow-[0_0_30px_rgba(251,191,36,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap border border-amber-400/50"
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
              '✦ Weave My Mythology ✦'
            )}
          </button>
        )}
      </div>

      {mythology ? (
        <div className="space-y-8">
          {/* Current Phase */}
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl p-6 border border-amber-500/30 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">🌟</span>
              <div>
                <h3 className="text-lg font-serif text-amber-200">
                  Current Phase: {mythology.currentPhase}
                </h3>
                <p className="text-amber-100/70 text-sm font-light mt-1">{mythology.phaseDescription}</p>
              </div>
            </div>
          </div>

          {/* Main Narrative */}
          <div className="bg-slate-900/30 rounded-2xl p-8 border border-amber-500/20">
            <h3 className="text-xl font-serif mb-4 text-amber-200 flex items-center justify-center gap-2">
              <span className="text-amber-400/50">⟡</span>
              Your Journey
              <span className="text-amber-400/50">⟡</span>
            </h3>
            <div className="text-amber-50/80 leading-relaxed whitespace-pre-wrap font-light text-justify">
              {mythology.narrative}
            </div>
          </div>

          {/* Archetype Evolution */}
          <div className="bg-blue-900/20 rounded-2xl p-6 border border-cyan-500/30">
            <h3 className="text-lg font-serif mb-3 text-cyan-200 flex items-center gap-2">
              <span>🔄</span>
              Archetype Evolution
            </h3>
            <p className="text-cyan-100/70 font-light">{mythology.archetypeEvolution}</p>
          </div>

          {/* Insights */}
          <div className="bg-slate-900/30 rounded-2xl p-6 border border-amber-500/20">
            <h3 className="text-lg font-serif mb-4 text-amber-200 flex items-center gap-2">
              <span>💡</span>
              Key Insights
            </h3>
            <ul className="space-y-3">
              {mythology.insights.map((insight, index) => (
                <li key={index} className="flex gap-3">
                  <span className="text-amber-400 flex-shrink-0">✦</span>
                  <span className="text-amber-50/70 font-light">{insight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Next Steps */}
          <div className="bg-emerald-900/20 rounded-2xl p-6 border border-emerald-500/30">
            <h3 className="text-lg font-serif mb-3 text-emerald-200 flex items-center gap-2">
              <span>🔮</span>
              What Comes Next
            </h3>
            <p className="text-emerald-100/70 font-light">{mythology.nextSteps}</p>
          </div>

          {/* Regenerate Button */}
          <div className="text-center pt-4">
            <button
              onClick={generateMythology}
              disabled={isGenerating}
              className="text-amber-300 hover:text-amber-100 font-light tracking-wide underline decoration-amber-500/50 hover:decoration-amber-300 transition-all"
            >
              ⟡ Reweave Mythology ⟡
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
