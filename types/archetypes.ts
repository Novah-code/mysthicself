export interface Archetype {
  id: string;
  name: string;
  emoji: string;
  color: string;
  description: string;
  keywords: string[];
}

export const ARCHETYPES: Record<string, Archetype> = {
  SHADOW: {
    id: 'shadow',
    name: 'The Shadow',
    emoji: '🌑',
    color: '#6B4C9A',
    description: 'Hidden fears, rejected parts, unconscious patterns',
    keywords: ['fear', 'anger', 'hiding', 'dark', 'rejected', 'denial', 'shame', 'repressed']
  },

  HERO: {
    id: 'hero',
    name: 'The Hero',
    emoji: '⚔️',
    color: '#E63946',
    description: 'Courage, challenges, growth, transformation',
    keywords: ['challenge', 'journey', 'battle', 'overcome', 'strength', 'victory', 'courage', 'fight']
  },

  WISE_GUIDE: {
    id: 'wise_guide',
    name: 'The Wise Guide',
    emoji: '🧙',
    color: '#457B9D',
    description: 'Inner wisdom, guidance, insight, mentorship',
    keywords: ['wisdom', 'guidance', 'teacher', 'old', 'knowing', 'insight', 'mentor', 'advice']
  },

  LOVER: {
    id: 'lover',
    name: 'The Lover',
    emoji: '💝',
    color: '#F4A261',
    description: 'Connection, passion, intimacy, relationships',
    keywords: ['love', 'connection', 'passion', 'beauty', 'intimacy', 'relationship', 'romance', 'desire']
  },

  CHILD: {
    id: 'child',
    name: 'The Child',
    emoji: '🌟',
    color: '#2A9D8F',
    description: 'Innocence, playfulness, wonder, new beginnings',
    keywords: ['play', 'innocent', 'wonder', 'joy', 'curiosity', 'new', 'young', 'spontaneous']
  }
} as const;

export interface ArchetypeScore {
  archetypeId: string;
  score: number; // 0-100
  reasoning?: string;
}

export interface Dream {
  id: string;
  content: string;
  timestamp: number;
  archetypeScores: ArchetypeScore[];
}

export interface MythologyNarrative {
  currentPhase: string;
  dominantArchetype: string;
  narrative: string;
  insights: string[];
}
