'use client';

export default function About() {
  return (
    <div className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">About MythicSelf</h1>

      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-800">What is MythicSelf?</h2>
          <p className="leading-relaxed">
            MythicSelf is an AI-powered dream exploration tool that uses Google's Gemini 3 Flash to identify archetypal patterns in your dreams and weave them into a personal mythological narrative based on Joseph Campbell's Hero's Journey framework.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-800">How It Works</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li>Record your dreams (5-10 dreams recommended)</li>
            <li>AI identifies 5 Jungian archetypes: Shadow, Hero, Wise Guide, Lover, and Child</li>
            <li>Explore how these archetypes evolve over time</li>
            <li>Generate a Hero's Journey narrative connecting your dreams</li>
            <li>Have reflective conversations with your inner archetypes</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Powered by Gemini 3 Flash</h2>
          <p className="leading-relaxed">
            This app leverages Gemini 3 Flash's 1M token context window to analyze multiple dreams simultaneously, creating cohesive narratives that span weeks or months of dream experiences.
          </p>
        </section>

        <section className="bg-amber-50/60 backdrop-blur-sm border-2 border-amber-200/60 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-3 text-amber-900 flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Important Disclaimer
          </h2>
          <div className="text-amber-900 space-y-2">
            <p className="font-semibold">
              This app is for educational, creative, and reflective purposes only.
            </p>
            <ul className="space-y-1 text-sm list-disc list-inside ml-2">
              <li>It is <strong>not a diagnostic tool</strong></li>
              <li>It does <strong>not provide medical or psychological advice</strong></li>
              <li>It is <strong>not a substitute</strong> for professional psychological counseling or therapy</li>
              <li>All interpretations are narrative explorations based on mythological frameworks</li>
            </ul>
            <p className="text-sm mt-4">
              If you are experiencing mental health concerns, please consult with a qualified mental health professional.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Privacy</h2>
          <p className="leading-relaxed">
            All your dreams are stored locally in your browser using localStorage. Nothing is sent to external servers except for AI analysis via the Gemini API. Your dream data is private and remains on your device.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Built For</h2>
          <p className="leading-relaxed">
            Gemini 3 Global Hackathon 2025 - Showcasing the power of Gemini 3 Flash's long context window and creative reasoning capabilities.
          </p>
        </section>

        <section className="text-center pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            © 2026 MythicSelf. Created for the Gemini 3 Global Hackathon.
          </p>
        </section>
      </div>
    </div>
  );
}
