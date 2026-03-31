export type QuizCategory = 'prophets' | 'pillars' | 'quran' | 'history' | 'general';
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
}

export interface QuizProgress {
  categoryScores: Record<QuizCategory, number>;
  totalQuizzes: number;
  totalCorrect: number;
  totalWrong: number;
  bestScores: Record<QuizCategory, number>;
  recentResults: QuizResult[];
}