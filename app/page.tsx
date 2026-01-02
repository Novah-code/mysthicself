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
    <main className="min-h-screen relative overflow-hidden">
      {/* Base: Blended dream images as background */}
      <div className="absolute inset-0" style={{
        backgroundImage: `url('/dreams/1.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(60px) brightness(1.1)',
        opacity: 0.5
      }}></div>

      <div className="absolute inset-0" style={{
        backgroundImage: `url('/dreams/2.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(60px)',
        mixBlendMode: 'lighten',
        opacity: 0.4
      }}></div>

      <div className="absolute inset-0" style={{
        backgroundImage: `url('/dreams/3.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(60px)',
        mixBlendMode: 'screen',
        opacity: 0.35
      }}></div>

      <div className="absolute inset-0" style={{
        backgroundImage: `url('/dreams/4.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(60px)',
        mixBlendMode: 'lighten',
        opacity: 0.3
      }}></div>

      <div className="absolute inset-0" style={{
        backgroundImage: `url('/dreams/5.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(60px)',
        mixBlendMode: 'soft-light',
        opacity: 0.25
      }}></div>

      {/* Oil painting texture overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 800 800' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='oil'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='6' seed='2'/%3E%3CfeDisplacementMap in='SourceGraphic' scale='15'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23oil)' fill='white' opacity='0.4'/%3E%3C/svg%3E")`,
        backgroundSize: '100% 100%',
        mixBlendMode: 'overlay',
        opacity: 0.3
      }}></div>

      {/* Soft painted clouds */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-32 bg-white/20 rounded-full blur-3xl animate-drift"></div>
        <div className="absolute top-40 right-20 w-80 h-40 bg-white/15 rounded-full blur-3xl animate-drift animation-delay-2000"></div>
        <div className="absolute bottom-32 left-1/4 w-96 h-48 bg-white/10 rounded-full blur-3xl animate-drift animation-delay-4000"></div>
      </div>

      {/* Brushstroke-like blobs */}
      <div className="absolute inset-0 opacity-20 mix-blend-multiply">
        <div className="absolute top-0 left-0 w-96 h-96 bg-pink-400 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-20 w-96 h-96 bg-green-300 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-yellow-200 rounded-full blur-3xl animate-blob animation-delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl relative z-10">
        {/* Header */}
        <header className="text-center mb-16 animate-fade-in">
          <h1 className="text-7xl font-serif tracking-tight mb-6" style={{
            color: '#fff',
            textShadow: '0 4px 20px rgba(0,0,0,0.2), 0 2px 4px rgba(255,255,255,0.3)',
            filter: 'drop-shadow(0 0 40px rgba(255,255,255,0.4))',
          }}>
            MythicSelf
          </h1>

          <p className="text-xl text-white font-light tracking-wide" style={{
            textShadow: '0 2px 10px rgba(0,0,0,0.2)',
          }}>
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
            <p className="text-lg text-gray-700 font-light">No dreams recorded yet</p>
            <p className="mt-2 text-gray-500">Enter your first dream above to discover your archetypes</p>
          </div>
        )}
      </div>
    </main>
  );
}
