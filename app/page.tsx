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
      backgroundImage: `url('/background.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>

      {/* Floating dream objects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Giraffe - top left */}
        <div className="absolute" style={{
          top: '10%',
          left: '5%',
          width: '200px',
          animation: 'float 25s ease-in-out infinite',
          animationDelay: '0s'
        }}>
          <img src="/floating/giraff.png" alt="" className="w-full h-auto opacity-70" style={{
            filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.2))',
            animation: 'wobble 4s ease-in-out infinite'
          }} />
        </div>

        {/* Woman - top right */}
        <div className="absolute" style={{
          top: '15%',
          right: '8%',
          width: '180px',
          animation: 'float 20s ease-in-out infinite',
          animationDelay: '-5s'
        }}>
          <img src="/floating/woman.png" alt="" className="w-full h-auto opacity-65" style={{
            filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.2))',
            animation: 'sway-gentle 5s ease-in-out infinite'
          }} />
        </div>

        {/* Clock - bottom left */}
        <div className="absolute" style={{
          bottom: '20%',
          left: '12%',
          width: '150px',
          animation: 'float 22s ease-in-out infinite',
          animationDelay: '-10s'
        }}>
          <img src="/floating/clock.png" alt="" className="w-full h-auto opacity-75" style={{
            filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.2))',
            animation: 'rotate 28s linear infinite'
          }} />
        </div>

        {/* Guitar - bottom right */}
        <div className="absolute" style={{
          bottom: '15%',
          right: '15%',
          width: '190px',
          animation: 'float 27s ease-in-out infinite',
          animationDelay: '-15s'
        }}>
          <img src="/floating/guitar.png" alt="" className="w-full h-auto opacity-70" style={{
            filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.2))',
            animation: 'wobble 3.5s ease-in-out infinite'
          }} />
        </div>

        {/* Train - center */}
        <div className="absolute" style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '220px',
          animation: 'float 24s ease-in-out infinite',
          animationDelay: '-8s'
        }}>
          <img src="/floating/train.png" alt="" className="w-full h-auto opacity-68" style={{
            filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.2))',
            animation: 'sway-gentle 6s ease-in-out infinite'
          }} />
        </div>
      </div>

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
