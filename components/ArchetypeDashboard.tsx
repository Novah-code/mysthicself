'use client';

import { useState, useEffect, useRef } from 'react';
import { Dream, ARCHETYPES } from '@/types/archetypes';
import AnimatedScore from './AnimatedScore';

interface ArchetypeDashboardProps {
  dreams: Dream[];
}

export default function ArchetypeDashboard({ dreams }: ArchetypeDashboardProps) {
  const [showDreamModal, setShowDreamModal] = useState(false);
  // Calculate average scores across all dreams
  const averageScores = Object.keys(ARCHETYPES).map(key => {
    const archetype = ARCHETYPES[key as keyof typeof ARCHETYPES];
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

  const latestDream = dreams[0];

  return (
    <div className="space-y-8">
      {/* Latest Dream */}
      {latestDream && (
        <div className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Latest Dream
          </h2>
          <p
            className="text-gray-600 mb-6 line-clamp-3 cursor-pointer hover:text-gray-800 transition-colors"
            onClick={() => setShowDreamModal(true)}
          >
            {latestDream.content}
          </p>
          <button
            onClick={() => setShowDreamModal(true)}
            className="text-sm text-blue-600 hover:text-blue-800 mb-6"
          >
            Read full dream →
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {latestDream.archetypeScores
              .sort((a, b) => b.score - a.score)
              .map(({ archetypeId, score, reasoning }) => {
                const archetype = Object.values(ARCHETYPES).find(a => a.id === archetypeId);
                if (!archetype) return null;

                return (
                  <div
                    key={archetypeId}
                    className="p-4 rounded-xl border-2 transition-all hover:shadow-md"
                    style={{ borderColor: archetype.color + '40' }}
                  >
                    <div className="text-3xl mb-2">{archetype.emoji}</div>
                    <h3 className="font-semibold text-sm mb-1">{archetype.name}</h3>
                    <div className="text-2xl font-bold mb-2">
                      <AnimatedScore value={score} className="" style={{ color: archetype.color }} />
                    </div>
                    {reasoning && (
                      <p className="text-xs text-gray-500 line-clamp-2">{reasoning}</p>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Overall Archetype Scores */}
      <div className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Your Mythological Profile
        </h2>
        <p className="text-gray-600 mb-6">
          Average archetype presence across {dreams.length} dream{dreams.length !== 1 ? 's' : ''}
        </p>
        <div className="space-y-4">
          {averageScores.map(({ archetype, score }) => (
            <div key={archetype.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{archetype.emoji}</span>
                  <div>
                    <h3 className="font-semibold">{archetype.name}</h3>
                    <p className="text-xs text-gray-500">{archetype.description}</p>
                  </div>
                </div>
                <AnimatedScore value={score} className="text-xl font-bold" style={{ color: archetype.color }} />
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1500 ease-out"
                  style={{
                    width: `${score}%`,
                    backgroundColor: archetype.color
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dream Modal */}
      {showDreamModal && latestDream && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={() => setShowDreamModal(false)}
        >
          <div
            className="bg-white/90 backdrop-blur-2xl border border-white/40 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Latest Dream
              </h2>
              <button
                onClick={() => setShowDreamModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {latestDream.content}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
