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
    <div className="max-w-md mx-auto mb-12 animate-fade-in">
      <div
        className="relative rounded-[2.5rem] p-8 shadow-2xl"
        style={{
          background: '#A8C5E8',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
        }}
      >
        {/* Inner card - player interface */}
        <div className="bg-black/20 backdrop-blur-sm rounded-[2rem] p-6 mb-6">
          <div className="bg-white/10 backdrop-blur-md rounded-[1.5rem] aspect-square mb-4 flex items-center justify-center overflow-hidden">
            {dreamContent ? (
              <div className="p-6 text-center">
                <p className="text-white/90 text-sm line-clamp-6 font-light">
                  {dreamContent}
                </p>
              </div>
            ) : (
              <div className="text-white/40 text-6xl">✨</div>
            )}
          </div>

          {/* Song title area */}
          <div className="text-center mb-4">
            <h3 className="text-white font-light text-lg mb-1">
              {dreamContent ? 'Your Dream' : 'Record a Dream'}
            </h3>
            <p className="text-white/60 text-sm font-light">
              {dreamContent.length} characters
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-white/20 rounded-full h-1 mb-4">
            <div
              className="bg-white/60 h-1 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((dreamContent.length / 500) * 100, 100)}%` }}
            ></div>
          </div>

          {/* Player controls */}
          <div className="flex items-center justify-center gap-6 mb-2">
            <button className="text-white/60 hover:text-white/90 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
              </svg>
            </button>

            <button
              onClick={handleSubmit}
              disabled={dreamContent.trim().length < 10 || isAnalyzing}
              className="bg-white/90 hover:bg-white text-gray-800 rounded-full p-4 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isAnalyzing ? (
                <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>

            <button className="text-white/60 hover:text-white/90 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 18h2V6h-2zm-3.5-6L4 6v12z"/>
              </svg>
            </button>
          </div>

          {/* Additional controls */}
          <div className="flex items-center justify-between px-2">
            <button className="text-white/60 hover:text-white/90 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 6c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1zm3.66 6.82l5.77 4.07c.66.47 1.58-.01 1.58-.82V7.93c0-.81-.91-1.28-1.58-.82l-5.77 4.07c-.57.4-.57 1.24 0 1.64z"/>
              </svg>
            </button>

            <button className="text-white/60 hover:text-white/90 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Text input area */}
        <form onSubmit={handleSubmit}>
          <textarea
            value={dreamContent}
            onChange={(e) => setDreamContent(e.target.value)}
            placeholder="Describe your dream..."
            className="w-full p-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none transition-all text-white placeholder:text-white/50 font-light"
            rows={3}
            disabled={isAnalyzing}
          />
        </form>
      </div>
    </div>
  );
}
