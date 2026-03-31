'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { QuizProgress, QuizResult, QuizCategory } from '@/types/quiz';
import { WordMatchProgress, WordMatchResult } from '@/types/word-match';

interface ProgressContextType {
  quizProgress: QuizProgress;
  wordMatchProgress: WordMatchProgress;
  addQuizResult: (result: QuizResult, category: QuizCategory) => void;
  addWordMatchResult: (result: WordMatchResult) => void;
  resetProgress: () => void;
  getAverageScore: () => number;
  getBestScore: (category: QuizCategory) => number;
  getTotalQuizzes: () => number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const QUIZ_STORAGE_KEY = 'islamic-chatbot-quiz-progress';
const WORD_MATCH_STORAGE_KEY = 'islamic-chatbot-word-match-progress';

const initialQuizProgress: QuizProgress = {
  categoryScores: {
    prophets: 0,
    pillars: 0,
    quran: 0,
    history: 0,
    general: 0
  },
  totalQuizzes: 0,
  totalCorrect: 0,
  totalWrong: 0,
  bestScores: {
    prophets: 0,
    pillars: 0,
    quran: 0,
    history: 0,
    general: 0
  },
  recentResults: []
};

const initialWordMatchProgress: WordMatchProgress = {
  totalGames: 0,
  bestMoves: {},
  bestTimes: {},
  recentResults: []
};

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [quizProgress, setQuizProgress] = useState<QuizProgress>(initialQuizProgress);
  const [wordMatchProgress, setWordMatchProgress] = useState<WordMatchProgress>(initialWordMatchProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    try {
      const savedQuizProgress = localStorage.getItem(QUIZ_STORAGE_KEY);
      const savedWordMatchProgress = localStorage.getItem(WORD_MATCH_STORAGE_KEY);

      if (savedQuizProgress) {
        setQuizProgress(JSON.parse(savedQuizProgress));
      }
      if (savedWordMatchProgress) {
        setWordMatchProgress(JSON.parse(savedWordMatchProgress));
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save quiz progress to localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(quizProgress));
      } catch (error) {
        console.error('Error saving quiz progress:', error);
      }
    }
  }, [quizProgress, isLoaded]);

  // Save word match progress to localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(WORD_MATCH_STORAGE_KEY, JSON.stringify(wordMatchProgress));
      } catch (error) {
        console.error('Error saving word match progress:', error);
      }
    }
  }, [wordMatchProgress, isLoaded]);

  const addQuizResult = (result: QuizResult, category: QuizCategory) => {
    setQuizProgress(prev => {
      const newProgress = { ...prev };
      
      // Update category score
      newProgress.categoryScores[category] += result.score;
      
      // Update best score
      if (result.score > newProgress.bestScores[category]) {
        newProgress.bestScores[category] = result.score;
      }
      
      // Update totals
      newProgress.totalQuizzes += 1;
      newProgress.totalCorrect += result.correctAnswers.length;
      newProgress.totalWrong += result.wrongAnswers.length;
      
      // Add to recent results (keep last 10)
      newProgress.recentResults = [result, ...prev.recentResults].slice(0, 10);
      
      return newProgress;
    });
  };

  const addWordMatchResult = (result: WordMatchResult) => {
    setWordMatchProgress(prev => {
      const newProgress = { ...prev };
      
      // Update total games
      newProgress.totalGames += 1;
      
      // Update best moves for category
      if (!newProgress.bestMoves[result.category] || result.moves < newProgress.bestMoves[result.category]) {
        newProgress.bestMoves[result.category] = result.moves;
      }
      
      // Update best time for category
      if (!newProgress.bestTimes[result.category] || result.timeSpent < newProgress.bestTimes[result.category]) {
        newProgress.bestTimes[result.category] = result.timeSpent;
      }
      
      // Add to recent results (keep last 10)
      newProgress.recentResults = [result, ...prev.recentResults].slice(0, 10);
      
      return newProgress;
    });
  };

  const resetProgress = () => {
    setQuizProgress(initialQuizProgress);
    setWordMatchProgress(initialWordMatchProgress);
    localStorage.removeItem(QUIZ_STORAGE_KEY);
    localStorage.removeItem(WORD_MATCH_STORAGE_KEY);
  };

  const getAverageScore = (): number => {
    if (quizProgress.totalQuizzes === 0) return 0;
    const totalScore = Object.values(quizProgress.categoryScores).reduce((sum, score) => sum + score, 0);
    return Math.round(totalScore / quizProgress.totalQuizzes);
  };

  const getBestScore = (category: QuizCategory): number => {
    return quizProgress.bestScores[category];
  };

  const getTotalQuizzes = (): number => {
    return quizProgress.totalQuizzes;
  };

  return (
    <ProgressContext.Provider
      value={{
        quizProgress,
        wordMatchProgress,
        addQuizResult,
        addWordMatchResult,
        resetProgress,
        getAverageScore,
        getBestScore,
        getTotalQuizzes
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}