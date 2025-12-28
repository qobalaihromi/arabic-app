import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
interface FlashcardProgress {
  wordId: string;
  status: 'new' | 'learning' | 'review' | 'mastered';
  nextReview: number; // timestamp
  correctCount: number;
  incorrectCount: number;
}

interface KitabProgress {
  chapterId: string;
  paragraphsRead: string[];
  wordsLearned: string[];
}

interface AppState {
  // Flashcard Progress
  flashcardProgress: Record<string, FlashcardProgress>;
  updateFlashcardProgress: (wordId: string, correct: boolean) => void;
  getWordsToReview: () => string[];
  
  // Kitab Reading Progress
  kitabProgress: Record<string, KitabProgress>;
  markParagraphRead: (chapterId: string, paragraphId: string) => void;
  
  // Settings
  showHarakat: boolean;
  toggleHarakat: () => void;
  
  // Stats
  streak: number;
  lastStudyDate: string | null;
  totalXP: number;
  addXP: (amount: number) => void;
  updateStreak: () => void;
}

// Spaced Repetition intervals (in milliseconds)
const SRS_INTERVALS = {
  new: 0,
  learning: 1 * 24 * 60 * 60 * 1000, // 1 day
  review: 3 * 24 * 60 * 60 * 1000, // 3 days
  mastered: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Flashcard Progress
      flashcardProgress: {},
      
      updateFlashcardProgress: (wordId: string, correct: boolean) => {
        set((state) => {
          const current = state.flashcardProgress[wordId] || {
            wordId,
            status: 'new',
            nextReview: Date.now(),
            correctCount: 0,
            incorrectCount: 0,
          };
          
          let newStatus: FlashcardProgress['status'] = current.status;
          
          if (correct) {
            if (current.status === 'new') newStatus = 'learning';
            else if (current.status === 'learning') newStatus = 'review';
            else if (current.status === 'review') newStatus = 'mastered';
          } else {
            newStatus = 'learning';
          }
          
          const nextReview = Date.now() + SRS_INTERVALS[newStatus];
          
          return {
            flashcardProgress: {
              ...state.flashcardProgress,
              [wordId]: {
                wordId,
                status: newStatus,
                nextReview,
                correctCount: current.correctCount + (correct ? 1 : 0),
                incorrectCount: current.incorrectCount + (correct ? 0 : 1),
              },
            },
          };
        });
      },
      
      getWordsToReview: () => {
        const { flashcardProgress } = get();
        const now = Date.now();
        return Object.values(flashcardProgress)
          .filter((p) => p.nextReview <= now)
          .map((p) => p.wordId);
      },
      
      // Kitab Progress
      kitabProgress: {},
      
      markParagraphRead: (chapterId: string, paragraphId: string) => {
        set((state) => {
          const current = state.kitabProgress[chapterId] || {
            chapterId,
            paragraphsRead: [],
            wordsLearned: [],
          };
          
          if (!current.paragraphsRead.includes(paragraphId)) {
            return {
              kitabProgress: {
                ...state.kitabProgress,
                [chapterId]: {
                  ...current,
                  paragraphsRead: [...current.paragraphsRead, paragraphId],
                },
              },
            };
          }
          return state;
        });
      },
      
      // Settings
      showHarakat: true,
      
      toggleHarakat: () => {
        set((state) => ({ showHarakat: !state.showHarakat }));
      },
      
      // Stats
      streak: 0,
      lastStudyDate: null,
      totalXP: 0,
      
      addXP: (amount: number) => {
        set((state) => ({ totalXP: state.totalXP + amount }));
      },
      
      updateStreak: () => {
        const today = new Date().toDateString();
        const { lastStudyDate, streak } = get();
        
        if (lastStudyDate === today) {
          return; // Already studied today
        }
        
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastStudyDate === yesterday.toDateString()) {
          set({ streak: streak + 1, lastStudyDate: today });
        } else {
          set({ streak: 1, lastStudyDate: today });
        }
      },
    }),
    {
      name: 'kitab-reader-storage',
    }
  )
);
