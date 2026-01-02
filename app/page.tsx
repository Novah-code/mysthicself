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
    <main className="min-h-screen relative overflow-hidden" style={{
      background: `
        radial-gradient(ellipse at 20% 30%, #F5C5B8 0%, transparent 50%),
        radial-gradient(ellipse at 80% 20%, #C4B5D8 0%, transparent 45%),
        radial-gradient(ellipse at 50% 60%, #B8D8E8 0%, transparent 50%),
        radial-gradient(ellipse at 90% 70%, #F5A3B8 0%, transparent 52%),
        radial-gradient(ellipse at 60% 40%, #F5E5C8 0%, transparent 45%),
        radial-gradient(ellipse at 40% 90%, #D8B8D8 0%, transparent 48%),
        radial-gradient(ellipse at 15% 85%, #A8C8B8 0%, transparent 35%),
        linear-gradient(135deg, #A8C8E1 0%, #F5C5B8 25%, #C4B5D8 50%, #F5E5C8 75%, #F5A3B8 100%)
      `,
    }}>
      {/* Heavy oil painting texture layers - 진한 유화 질감 */}

      {/* Layer 1: Thick brush strokes with displacement */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='oil1'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.4' numOctaves='8' seed='1'/%3E%3CfeDisplacementMap in='SourceGraphic' scale='40' xChannelSelector='R' yChannelSelector='G'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23oil1)' fill='%23F5C5B8' opacity='0.7'/%3E%3C/svg%3E")`,
        backgroundSize: '100% 100%',
        mixBlendMode: 'soft-light',
        opacity: 0.8
      }}></div>

      {/* Layer 2: Directional brush strokes */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 800 800' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='brush1'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.6 0.3' numOctaves='6'/%3E%3CfeDisplacementMap in='SourceGraphic' scale='25'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23brush1)' fill='%23C4B5D8' opacity='0.6'/%3E%3C/svg%3E")`,
        backgroundSize: '100% 100%',
        mixBlendMode: 'multiply',
        opacity: 0.7
      }}></div>

      {/* Layer 3: Cross-hatching texture */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 600 600' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='brush2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.3 0.8' numOctaves='7'/%3E%3CfeDisplacementMap in='SourceGraphic' scale='30'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23brush2)' fill='%23B8D8E8' opacity='0.5'/%3E%3C/svg%3E")`,
        backgroundSize: '100% 100%',
        mixBlendMode: 'overlay',
        opacity: 0.6
      }}></div>

      {/* Layer 4: Impasto effect (thick paint lumps) */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='impasto'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='5'/%3E%3CfeDisplacementMap in='SourceGraphic' scale='8'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23impasto)' fill='white' opacity='0.3'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px',
        mixBlendMode: 'overlay',
        opacity: 0.9
      }}></div>

      {/* Canvas weave texture - 캔버스 직조 질감 */}
      <div className="absolute inset-0 opacity-30 mix-blend-multiply pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 150 150' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='canvas'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23canvas)' fill='white'/%3E%3C/svg%3E")`,
        backgroundSize: '80px 80px'
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
