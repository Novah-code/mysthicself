'use client';

import { useState } from 'react';

interface DreamInputProps {
  onSubmit: (dreamContent: string) => void;
  isAnalyzing: boolean;
}

const SAMPLE_DREAMS = `Dream 1: I was in a vast library with endless shelves reaching into darkness. Every book I touched turned to sand and slipped through my fingers.

Dream 2: I found myself as a child again, standing in my childhood home, but all the furniture was covered in white sheets and everything echoed.

Dream 3: I was teaching a class but couldn't remember what subject. The students kept asking questions in a language I almost understood but couldn't quite grasp.

Dream 4: I was swimming in an ocean that turned into the night sky. Stars became fish and I could breathe the cosmos.

Dream 5: I walked through a forest where the trees were made of clocks. Each one showed a different time from my life.`;

export default function DreamInput({ onSubmit, isAnalyzing }: DreamInputProps) {
  const [dreamContent, setDreamContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dreamContent.trim().length >= 10) {
      onSubmit(dreamContent);
      setDreamContent('');
    }
  };

  const handleLoadSample = () => {
    setDreamContent(SAMPLE_DREAMS);
  };

  return (
    <div className="max-w-2xl mx-auto mb-12 animate-fade-in">
      <div
        className="relative rounded-full overflow-hidden shadow-2xl aspect-square"
        style={{
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        }}
      >
        {/* Background image with reduced opacity */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/card.png)',
            opacity: 0.35,
          }}
        ></div>

        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>

        {/* Content on top */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center p-16">
          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center space-y-6">
            <textarea
              value={dreamContent}
              onChange={(e) => setDreamContent(e.target.value)}
              placeholder="Paste 5–10 dreams from the past month.&#10;We'll connect them into one mythic narrative."
              className="w-full p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none transition-all text-white placeholder:text-white/60 font-light text-lg leading-relaxed"
              rows={6}
              disabled={isAnalyzing}
            />

            <div className="flex flex-col items-center gap-3 w-full">
              <button
                type="submit"
                disabled={dreamContent.trim().length < 10 || isAnalyzing}
                className="bg-white/90 hover:bg-white text-gray-900 px-12 py-4 rounded-full font-medium hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isAnalyzing ? (
                  <span className="flex items-center gap-3">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Your Myth...
                  </span>
                ) : (
                  'Discover Your Mythology'
                )}
              </button>

              <button
                type="button"
                onClick={handleLoadSample}
                disabled={isAnalyzing}
                className="text-white/70 hover:text-white text-sm font-light underline underline-offset-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Try with sample dreams
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
