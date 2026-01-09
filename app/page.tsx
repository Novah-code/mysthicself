'use client';

import { useState, useEffect } from 'react';
import { Dream, ArchetypeScore } from '@/types/archetypes';
import { dreamStorage } from '@/lib/storage';
import DreamInput from '@/components/DreamInput';
import ArchetypeDashboard from '@/components/ArchetypeDashboard';
import MythologyNarrative from '@/components/MythologyNarrative';
import ArchetypeEvolution from '@/components/ArchetypeEvolution';
import ArchetypeDialogue from '@/components/ArchetypeDialogue';
import About from '@/components/About';

type View = 'home' | 'dashboard' | 'timeline' | 'mythology' | 'dialogue' | 'about';

export default function Home() {
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentView, setCurrentView] = useState<View>('home');
  const [menuOpen, setMenuOpen] = useState(false);

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
        throw new Error('Failed to create mythology');
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

      // Navigate to dashboard after dream submission
      setCurrentView('dashboard');
    } catch (error) {
      console.error('Error creating mythology:', error);
      alert('Failed to create your mythology. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const menuItems = [
    { id: 'home' as View, label: 'Add Dream', disabled: false },
    { id: 'dashboard' as View, label: 'Dashboard', disabled: dreams.length === 0 },
    { id: 'timeline' as View, label: 'Timeline', disabled: dreams.length < 3 },
    { id: 'mythology' as View, label: 'My Mythology', disabled: dreams.length < 2 },
    { id: 'dialogue' as View, label: 'Dialogue', disabled: dreams.length === 0 },
    { id: 'about' as View, label: 'About', disabled: false },
  ];

  const getIcon = (id: View) => {
    switch (id) {
      case 'home':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        );
      case 'dashboard':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'timeline':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      case 'mythology':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'dialogue':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      case 'about':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
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
        {/* Giraffe - far left edge */}
        <div className="absolute" style={{
          top: '10%',
          left: '-8%',
          width: '300px',
          animation: 'float 35s ease-in-out infinite',
          animationDelay: '0s',
          zIndex: 5
        }}>
          <img src="/floating/giraff.png" alt="" className="w-full h-auto opacity-70" style={{
            filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.2))',
            animation: 'wobble 6s ease-in-out infinite'
          }} />
        </div>

        {/* Woman - moved inward */}
        <div className="absolute" style={{
          top: '18%',
          right: '5%',
          width: '250px',
          animation: 'float 30s ease-in-out infinite',
          animationDelay: '-5s',
          zIndex: 5
        }}>
          <img src="/floating/woman.png" alt="" className="w-full h-auto opacity-65" style={{
            filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.2))',
            animation: 'sway-gentle 7s ease-in-out infinite'
          }} />
        </div>

        {/* Clock - top edge */}
        <div className="absolute" style={{
          top: '-5%',
          left: '40%',
          width: '200px',
          animation: 'float 32s ease-in-out infinite',
          animationDelay: '-10s',
          zIndex: 5
        }}>
          <img src="/floating/clock.png" alt="" className="w-full h-auto opacity-75" style={{
            filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.2))',
            animation: 'rotate 40s linear infinite'
          }} />
        </div>

        {/* Guitar - bottom right corner */}
        <div className="absolute" style={{
          bottom: '-3%',
          right: '5%',
          width: '180px',
          animation: 'float 38s ease-in-out infinite',
          animationDelay: '-15s',
          zIndex: 5
        }}>
          <img src="/floating/guitar.png" alt="" className="w-full h-auto opacity-70" style={{
            filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.2))',
            animation: 'wobble 5s ease-in-out infinite'
          }} />
        </div>

        {/* Train - bottom left, more visible */}
        <div className="absolute" style={{
          bottom: '-5%',
          left: '2%',
          width: '320px',
          animation: 'float 34s ease-in-out infinite',
          animationDelay: '-8s',
          zIndex: 5
        }}>
          <img src="/floating/train.png" alt="" className="w-full h-auto opacity-68" style={{
            filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.2))',
            animation: 'sway-gentle 8s ease-in-out infinite'
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

      {/* Hamburger Menu Button - Glassmorphism */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-6 right-6 z-50 bg-white/20 backdrop-blur-lg border border-white/30 p-4 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
      >
        <div className="space-y-1.5">
          <div className={`w-6 h-0.5 bg-gray-700 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-gray-700 transition-all ${menuOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-gray-700 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
        </div>
      </button>

      {/* Side Menu - Glassmorphism with Baby Pink/Blue */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white/10 backdrop-blur-2xl border-l border-white/20 shadow-2xl z-40 transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 h-full flex flex-col">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">MythicSelf</h2>
            <p className="text-sm text-gray-600">Navigate your journey</p>
          </div>

          <nav className="space-y-3 flex-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (!item.disabled) {
                    setCurrentView(item.id);
                    setMenuOpen(false);
                  }
                }}
                disabled={item.disabled}
                className={`w-full text-left p-4 rounded-2xl transition-all border ${
                  currentView === item.id
                    ? 'bg-pink-100/50 border-pink-200/50 text-pink-900 shadow-md backdrop-blur-sm'
                    : item.disabled
                    ? 'bg-gray-50/30 border-gray-200/30 text-gray-400 cursor-not-allowed backdrop-blur-sm'
                    : 'bg-white/30 border-white/40 text-gray-700 hover:bg-blue-50/40 hover:border-blue-200/40 hover:shadow-sm backdrop-blur-sm'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">{getIcon(item.id)}</div>
                  <div>
                    <div className="font-semibold text-sm">{item.label}</div>
                    {item.disabled && (
                      <div className="text-xs opacity-60 mt-0.5">
                        {item.id === 'timeline' ? 'Need 3+ dreams' :
                         item.id === 'mythology' ? 'Need 2+ dreams' :
                         'Record dreams first'}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </nav>

          {dreams.length > 0 && (
            <div className="mt-auto space-y-3 pt-6 border-t border-white/20">
              <div className="p-4 bg-pink-50/40 backdrop-blur-sm border border-pink-200/40 rounded-2xl">
                <div className="text-xs text-pink-800/80 font-medium mb-1">
                  Your Progress
                </div>
                <div className="text-xl font-bold text-pink-900">
                  {dreams.length} dream{dreams.length !== 1 ? 's' : ''} recorded
                </div>
              </div>

              <button
                onClick={() => {
                  if (confirm('Are you sure you want to delete all dreams? This cannot be undone.')) {
                    dreamStorage.clear();
                    setDreams([]);
                    setCurrentView('home');
                    setMenuOpen(false);
                  }
                }}
                className="w-full p-3 bg-red-50/40 backdrop-blur-sm border border-red-200/40 hover:bg-red-100/50 text-red-700 rounded-2xl text-sm font-semibold transition-all"
              >
                Clear All Dreams
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
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

        {/* View Rendering */}
        {currentView === 'home' && (
          <DreamInput onSubmit={handleDreamSubmit} isAnalyzing={isAnalyzing} />
        )}

        {currentView === 'dashboard' && dreams.length > 0 && (
          <div className="animate-fade-in">
            <ArchetypeDashboard dreams={dreams} />
          </div>
        )}

        {currentView === 'timeline' && dreams.length >= 3 && (
          <div className="animate-fade-in">
            <ArchetypeEvolution dreams={dreams} />
          </div>
        )}

        {currentView === 'mythology' && dreams.length >= 2 && (
          <div className="animate-fade-in">
            <MythologyNarrative dreams={dreams} />
          </div>
        )}

        {currentView === 'dialogue' && dreams.length > 0 && (
          <div className="animate-fade-in">
            <ArchetypeDialogue dreams={dreams} />
          </div>
        )}

        {currentView === 'about' && (
          <div className="animate-fade-in">
            <About />
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 text-center pb-8">
          <p className="text-white/80 text-sm" style={{
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
          }}>
            © 2026 MythicSelf. Created for the Gemini 3 Global Hackathon.
          </p>
        </footer>
      </div>
    </main>
  );
}
