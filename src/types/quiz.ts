export type QuizCategory = 'prophets' | 'pillars' | 'quran' | 'history' | 'general' | 'ethics' | 'hajj';
export type QuizDifficulty = 'easy' | 'medium' | 'hard';

export interface QuizQuestion {
  id: string;
  category: QuizCategory;
  difficulty: QuizDifficulty;
  question: {
    tr: string;
    en: string;
    ar: string;
  };
  options: string[];
  correctAnswer: number; // index
  explanation?: {
    tr: string;
    en: string;
    ar: string;
  };
}

export interface QuizResult {
  score: number;
  total: number;
  correctAnswers: number[];
  wrongAnswers: number[];
  timeSpent: number;
  date: number;
  points: number;
  combo: number;
  achievements: string[];
}

export interface Achievement {
  id: string;
  name: {
    tr: string;
    en: string;
    ar: string;
  };
  description: {
    tr: string;
    en: string;
    ar: string;
  };
  icon: string;
  condition: (stats: QuizProgress) => boolean;
  unlocked: boolean;
  unlockedAt?: number;
}

export interface QuizProgress {
  categoryScores: Record<QuizCategory, number>;
  totalQuizzes: number;
  totalCorrect: number;
  totalWrong: number;
  bestScores: Record<QuizCategory, number>;
  recentResults: QuizResult[];
  totalPoints: number;
  achievements: Achievement[];
  streak: number;
  lastPlayedDate?: number;
}