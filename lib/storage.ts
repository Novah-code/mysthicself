import { Dream } from '@/types/archetypes';

const STORAGE_KEY = 'dream-myth-dreams';

export const dreamStorage = {
  save: (dream: Dream): void => {
    if (typeof window === 'undefined') return;

    const dreams = dreamStorage.getAll();
    dreams.push(dream);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dreams));
  },

  getAll: (): Dream[] => {
    if (typeof window === 'undefined') return [];

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error('Error parsing dreams from localStorage:', error);
      return [];
    }
  },

  getById: (id: string): Dream | null => {
    const dreams = dreamStorage.getAll();
    return dreams.find(d => d.id === id) || null;
  },

  delete: (id: string): void => {
    if (typeof window === 'undefined') return;

    const dreams = dreamStorage.getAll().filter(d => d.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dreams));
  },

  clear: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
  },

  update: (id: string, updatedDream: Dream): void => {
    if (typeof window === 'undefined') return;

    const dreams = dreamStorage.getAll();
    const index = dreams.findIndex(d => d.id === id);

    if (index !== -1) {
      dreams[index] = updatedDream;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dreams));
    }
  }
};
