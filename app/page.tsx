'use client';

import { useState, useEffect } from 'react';
import { Dream, ArchetypeScore } from '@/types/archetypes';
import { dreamStorage } from '@/lib/storage';
import DreamInput from '@/components/DreamInput';
import ArchetypeDashboard from '@/components/ArchetypeDashboard';
import MythologyNarrative from '@/components/MythologyNarrative';
import ArchetypeEvolution from '@/components/ArchetypeEvolution';
import ArchetypeDialogue from '@/components/ArchetypeDialogue';

export default function Home() {
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Load dreams on mount
  useEffect(() => {
    const stored = dreamStorage.getAll();
    setDreams(stored);
  }, []);

  const handleDreamSubmit = async (dreamContent: string) => {
    setIsAnalyzing(true);

    try {
      // Call API to extract archetypes
      const response = await fetch('/api/extract-archetypes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dreamContent }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze dream');
      }

      const { archetypeScores } = await response.json();

      // Create new dream object
      const newDream: Dream = {
        id: Date.now().toString(),
        content: dreamContent,
        timestamp: Date.now(),
        archetypeScores: archetypeScores as ArchetypeScore[],
      };

      // Save to localStorage
      dreamStorage.save(newDream);

      // Update state
      setDreams([newDream, ...dreams]);
    } catch (error) {
      console.error('Error analyzing dream:', error);
      alert('Failed to analyze dream. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-900 relative overflow-hidden">
      {/* Mystical background effects */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0ic3RhcnMiIHg9IjAiIHk9IjAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMykiLz48Y2lyY2xlIGN4PSI4MCIgY3k9IjUwIiByPSIxLjUiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4yKSIvPjxjaXJjbGUgY3g9IjE1MCIgY3k9IjMwIiByPSIwLjgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC40KSIvPjxjaXJjbGUgY3g9IjQwIiBjeT0iMTQwIiByPSIxLjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4zKSIvPjxjaXJjbGUgY3g9IjE4MCIgY3k9IjE3MCIgcj0iMC45IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMykiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjc3RhcnMpIi8+PC9zdmc+')] opacity-40"></div>

      <div className="container mx-auto px-4 py-12 max-w-6xl relative z-10">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="inline-block">
            <div className="relative">
              {/* Decorative top ornament */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-amber-400/60 text-2xl">✦</div>

              <h1 className="text-6xl font-serif bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 bg-clip-text text-transparent mb-2 tracking-wide filter drop-shadow-[0_0_30px_rgba(251,191,36,0.3)]">
                MythicSelf
              </h1>

              {/* Decorative bottom ornament */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-amber-400/60 text-xl">⟡</div>
            </div>
          </div>

          <p className="text-lg text-amber-100/70 mt-8 font-light tracking-widest">
            Discover your personal mythology through dream archetypes
          </p>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-500/30"></div>
            <span className="text-amber-400/50 text-xs">✧</span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-500/30"></div>
          </div>
        </header>

        {/* Dream Input */}
        <DreamInput onSubmit={handleDreamSubmit} isAnalyzing={isAnalyzing} />

        {/* Personal Mythology Narrative - UNIQUE FEATURE! */}
        {dreams.length > 0 && (
          <div className="mb-12">
            <MythologyNarrative dreams={dreams} />
          </div>
        )}

        {/* Archetype Evolution Timeline - UNIQUE FEATURE! */}
        {dreams.length > 0 && (
          <div className="mb-12">
            <ArchetypeEvolution dreams={dreams} />
          </div>
        )}

        {/* Interactive Archetype Dialogue - UNIQUE FEATURE! */}
        <div className="mb-12">
          <ArchetypeDialogue dreams={dreams} />
        </div>

        {/* Archetype Dashboard */}
        {dreams.length > 0 && (
          <ArchetypeDashboard dreams={dreams} />
        )}

        {/* Empty State */}
        {dreams.length === 0 && !isAnalyzing && (
          <div className="text-center mt-16 bg-slate-800/30 backdrop-blur-sm border border-amber-500/20 rounded-2xl p-12">
            <div className="text-6xl mb-4 opacity-60">✨</div>
            <p className="text-lg text-amber-100/60 font-light">No dreams recorded yet.</p>
            <p className="mt-2 text-amber-100/40">Enter your first dream above to discover your archetypes.</p>
          </div>
        )}
      </div>
    </main>
  );
}
