export type LessonType = 'text' | 'example' | 'table';

export interface LessonContent {
    id: string;
    type: LessonType;
    content: string; // Markdown supported
    arabicText?: string; // For examples
    translation?: string;
}

export type QuizType = 'multiple-choice' | 'fill-blank' | 'arrange';

export interface QuizOption {
    id: string;
    text: string;
    isCorrect: boolean;
}

export interface QuizQuestion {
    id: string;
    type: QuizType;
    question: string;
    options?: QuizOption[]; // For multiple choice
    correctAnswer?: string; // For fill-blank
    explanation?: string; // Shown after answering
}

export interface MaterialChapter {
    id: string; // e.g., "jurumiyyah-1"
    title: string;
    titleAr: string;
    description: string;
    order: number;
    isLocked: boolean;
    lessons: LessonContent[];
    quiz: QuizQuestion[];
    xpReward: number;
}

export interface UserProgressNahwu {
    completedChapters: string[];
    quizScores: Record<string, number>; // chapterId -> score
    lastAccessedChapter: string;
}
