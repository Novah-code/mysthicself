'use client';

import { useState } from 'react';

interface DreamInputProps {
  onSubmit: (dreamContent: string) => void;
  isAnalyzing: boolean;
}

export default function DreamInput({ onSubmit, isAnalyzing }: DreamInputProps) {
  const [dreamContent, setDreamContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dreamContent.trim().length >= 10) {
      onSubmit(dreamContent);
      setDreamContent('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mb-12 animate-fade-in">
      <div
        className="relative rounded-[2.5rem] overflow-hidden shadow-2xl"
        style={{
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        }}
      >
        {/* Background image with reduced opacity */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/card.png)',
            opacity: 0.3,
          }}
        ></div>

        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>

        {/* Content on top */}
        <div className="relative z-10 p-12">
          <h2 className="text-3xl font-serif text-white mb-8 text-center drop-shadow-lg">
            Record Your Dream
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <textarea
              value={dreamContent}
              onChange={(e) => setDreamContent(e.target.value)}
              placeholder="Describe your dream in detail..."
              className="w-full p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none transition-all text-white placeholder:text-white/60 font-light text-lg leading-relaxed"
              rows={8}
              disabled={isAnalyzing}
            />

            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70 font-light">
                {dreamContent.length} characters
              </span>

              <button
                type="submit"
                disabled={dreamContent.trim().length < 10 || isAnalyzing}
                className="bg-white/90 hover:bg-white text-gray-900 px-10 py-4 rounded-full font-medium hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isAnalyzing ? (
                  <span className="flex items-center gap-3">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </span>
                ) : (
                  'Analyze Dream'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
