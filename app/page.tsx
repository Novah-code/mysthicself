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
    <main className="min-h-screen bg-gradient-to-br from-blue-400 via-pink-300 to-green-300 relative overflow-hidden">
      {/* Animated dreamlike background */}
      <div className="absolute inset-0 opacity-40 blur-3xl">
        <div className="absolute top-0 left-0 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-20 w-96 h-96 bg-green-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 8 + 4}px`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.5 + 0.3
            }}
          >
            ✦
          </div>
        ))}
      </div>

      {/* Floating flowers/petals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-slow"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 15}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 15}s`
            }}
          >
            {['🌸', '🌺', '🌼', '💫', '✨'][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>

      {/* Clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-8xl opacity-30 animate-drift">☁️</div>
        <div className="absolute top-40 right-20 text-7xl opacity-25 animate-drift animation-delay-2000">☁️</div>
        <div className="absolute bottom-32 left-1/4 text-9xl opacity-20 animate-drift animation-delay-4000">☁️</div>
      </div>

      {/* Moon */}
      <div className="absolute top-10 right-10 text-8xl opacity-60 animate-glow-soft pointer-events-none">
        🌙
      </div>

      {/* Dreamy characters and nature */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Flying horse */}
        <div className="absolute top-1/3 right-10 text-6xl opacity-40 animate-float-diagonal">
          🦄
        </div>

        {/* Mountains at bottom */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-around opacity-30">
          <div className="text-9xl">🏔️</div>
          <div className="text-8xl translate-y-4">⛰️</div>
          <div className="text-9xl">🏔️</div>
        </div>

        {/* Trees */}
        <div className="absolute bottom-20 left-20 text-7xl opacity-25 animate-sway">🌳</div>
        <div className="absolute bottom-24 right-32 text-6xl opacity-30 animate-sway animation-delay-1000">🌲</div>

        {/* Butterfly */}
        <div className="absolute top-1/2 left-1/4 text-4xl animate-flutter">🦋</div>

        {/* Bird */}
        <div className="absolute top-1/4 left-1/3 text-3xl animate-fly">🕊️</div>

        {/* Rainbow */}
        <div className="absolute top-32 left-1/2 transform -translate-x-1/2 text-8xl opacity-20">
          🌈
        </div>

        {/* More magical creatures */}
        <div className="absolute bottom-40 left-1/2 text-5xl opacity-35 animate-float-slow animation-delay-2000">
          ✨🐴✨
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl relative z-10">
        {/* Header */}
        <header className="text-center mb-16 animate-fade-in">
          <h1 className="text-7xl font-light bg-gradient-to-r from-white via-pink-100 to-blue-100 bg-clip-text text-transparent mb-6 tracking-tight filter drop-shadow-[0_2px_20px_rgba(255,255,255,0.5)] animate-glow">
            MythicSelf
          </h1>

          <p className="text-xl text-white/90 font-light tracking-wide">
            Discover your personal mythology through dream archetypes
          </p>
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
          <div className="text-center mt-16 bg-white/60 backdrop-blur-xl border border-white/40 rounded-[2rem] p-12 animate-fade-in">
            <div className="text-6xl mb-4 animate-float">✨</div>
            <p className="text-lg text-gray-700 font-light">No dreams recorded yet</p>
            <p className="mt-2 text-gray-500">Enter your first dream above to discover your archetypes</p>
          </div>
        )}
      </div>
    </main>
  );
}
