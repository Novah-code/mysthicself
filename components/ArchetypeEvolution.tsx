'use client';

import { Dream, ARCHETYPES } from '@/types/archetypes';

interface ArchetypeEvolutionProps {
  dreams: Dream[];
}

export default function ArchetypeEvolution({ dreams }: ArchetypeEvolutionProps) {
  if (dreams.length < 3) {
    return (
      <div className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl p-8 text-center">
        <div className="text-6xl mb-4">📈</div>
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          Archetype Evolution Timeline
        </h2>
        <p className="text-gray-600">
          Record at least 3 dreams to see how your archetypes evolve over time
        </p>
      </div>
    );
  }

  // Sort dreams chronologically (oldest to newest)
  const sortedDreams = [...dreams].sort((a, b) => a.timestamp - b.timestamp);

  // Get top archetype for each dream
  const evolution = sortedDreams.map(dream => {
    const topArchetype = dream.archetypeScores
      .sort((a, b) => b.score - a.score)[0];

    const archetype = Object.values(ARCHETYPES).find(a => a.id === topArchetype.archetypeId);

    return {
      dream,
      archetype,
      score: topArchetype.score,
      date: new Date(dream.timestamp).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })
    };
  });

  // Calculate archetype frequency changes
  const archetypeFrequency = Object.values(ARCHETYPES).map(archetype => {
    const appearances = evolution.filter(e => e.archetype?.id === archetype.id).length;
    const percentage = Math.round((appearances / sortedDreams.length) * 100);

    return {
      archetype,
      appearances,
      percentage
    };
  }).sort((a, b) => b.appearances - a.appearances);

  return (
    <div className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <span>📈</span>
          Archetype Evolution Timeline
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          Track how your dominant archetypes shift across {dreams.length} dreams
        </p>
      </div>

      {/* Timeline Visualization */}
      <div className="mb-8 relative">
        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -translate-y-1/2" />

        <div className="relative flex justify-between items-center">
          {evolution.map((item, index) => (
            <div key={item.dream.id} className="flex flex-col items-center relative z-10">
              {/* Connection line to previous */}
              {index > 0 && (
                <div
                  className="absolute right-full w-full h-1 top-1/2 -translate-y-1/2"
                  style={{
                    background: `linear-gradient(to right, ${evolution[index-1].archetype?.color}, ${item.archetype?.color})`,
                    width: 'calc(100% + 2rem)',
                    marginRight: '-2rem'
                  }}
                />
              )}

              {/* Archetype node */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg border-4 border-white relative z-10"
                style={{ backgroundColor: item.archetype?.color + '20' }}
              >
                {item.archetype?.emoji}
              </div>

              {/* Info */}
              <div className="mt-3 text-center">
                <p className="text-xs font-semibold text-gray-800">
                  {item.archetype?.name.replace('The ', '')}
                </p>
                <p className="text-xs text-gray-500">{item.date}</p>
                <p className="text-xs font-bold mt-1" style={{ color: item.archetype?.color }}>
                  {item.score}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Archetype Frequency Summary */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Archetype Frequency
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {archetypeFrequency.map(({ archetype, appearances, percentage }) => (
            <div
              key={archetype.id}
              className="p-4 rounded-xl border-2 text-center"
              style={{ borderColor: archetype.color + '40' }}
            >
              <div className="text-3xl mb-2">{archetype.emoji}</div>
              <h4 className="font-semibold text-sm mb-1">{archetype.name}</h4>
              <div className="text-2xl font-bold" style={{ color: archetype.color }}>
                {percentage}%
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {appearances} of {sortedDreams.length} dreams
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
        <h3 className="text-lg font-semibold mb-2 text-purple-900 flex items-center gap-2">
          <span>💡</span>
          Evolution Insights
        </h3>
        <div className="text-sm text-purple-800">
          {evolution.length >= 3 && (
            <p className="mb-2">
              <strong>Your journey began with {evolution[0].archetype?.name}</strong> and has evolved through {' '}
              {evolution.slice(1, -1).map(e => e.archetype?.name).join(', ')}
              {evolution.length > 2 && `, currently expressing ${evolution[evolution.length - 1].archetype?.name}`}.
            </p>
          )}
          <p>
            Your most frequent archetype is <strong>{archetypeFrequency[0].archetype.name}</strong>,
            appearing as the dominant force in {archetypeFrequency[0].percentage}% of your dreams.
          </p>
        </div>
      </div>
    </div>
  );
}
