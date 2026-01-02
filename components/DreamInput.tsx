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
    <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.1)] p-8 mb-12 relative overflow-hidden animate-fade-in">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100/20 via-transparent to-blue-100/20 pointer-events-none"></div>

      <h2 className="text-2xl font-light text-gray-800 mb-6 text-center relative z-10">
        Record Your Dream
      </h2>
      <form onSubmit={handleSubmit} className="relative z-10">
        <textarea
          value={dreamContent}
          onChange={(e) => setDreamContent(e.target.value)}
          placeholder="Describe your dream..."
          className="w-full p-6 bg-white/60 border border-gray-200/50 rounded-3xl focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200/50 resize-none transition-all text-gray-700 placeholder:text-gray-400 font-light shadow-sm"
          rows={6}
          disabled={isAnalyzing}
        />
        <div className="flex items-center justify-between mt-6">
          <span className="text-sm text-gray-500 font-light">
            {dreamContent.length} characters
          </span>
          <button
            type="submit"
            disabled={dreamContent.trim().length < 10 || isAnalyzing}
            className="bg-gradient-to-r from-pink-400 to-blue-400 text-white px-8 py-3 rounded-full font-light hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isAnalyzing ? (
              <span className="flex items-center gap-2">
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
  );
}
