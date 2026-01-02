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
    <div className="bg-slate-800/40 backdrop-blur-md border-2 border-amber-500/30 rounded-3xl shadow-[0_0_50px_rgba(251,191,36,0.15)] p-8 mb-12 relative overflow-hidden">
      {/* Decorative corner ornaments */}
      <div className="absolute top-4 left-4 text-amber-500/20 text-2xl">❋</div>
      <div className="absolute top-4 right-4 text-amber-500/20 text-2xl">❋</div>
      <div className="absolute bottom-4 left-4 text-amber-500/20 text-2xl">❋</div>
      <div className="absolute bottom-4 right-4 text-amber-500/20 text-2xl">❋</div>

      <h2 className="text-2xl font-serif text-amber-200 mb-6 text-center tracking-wide">
        ✧ Record Your Dream ✧
      </h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={dreamContent}
          onChange={(e) => setDreamContent(e.target.value)}
          placeholder="Whisper the secrets of your slumber... (minimum 10 characters)"
          className="w-full p-6 bg-slate-900/50 border-2 border-amber-600/30 rounded-2xl focus:border-amber-500/60 focus:outline-none focus:ring-2 focus:ring-amber-400/20 resize-none transition-all text-amber-50 placeholder:text-amber-200/30 font-light"
          rows={6}
          disabled={isAnalyzing}
        />
        <div className="flex items-center justify-between mt-6">
          <span className="text-sm text-amber-200/50 font-light tracking-wide">
            {dreamContent.length} characters inscribed
          </span>
          <button
            type="submit"
            disabled={dreamContent.trim().length < 10 || isAnalyzing}
            className="bg-gradient-to-r from-amber-600 to-yellow-600 text-slate-900 px-10 py-3 rounded-full font-semibold hover:shadow-[0_0_30px_rgba(251,191,36,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-amber-400/50"
          >
            {isAnalyzing ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Divining...
              </span>
            ) : (
              '✦ Unveil Archetypes ✦'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
