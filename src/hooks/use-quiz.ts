'use client';

import { useState, useEffect, useCallback } from 'react';
import { QuizQuestion, QuizCategory, QuizDifficulty, QuizResult } from '@/types/quiz';
import { quizQuestions } from '@/data/quiz-questions';

interface UseQuizOptions {
  category?: QuizCategory;
  difficulty?: QuizDifficulty;
  questionCount?: number;
}

export function useQuiz(options: UseQuizOptions = {}) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [isFinished, setIsFinished] = useState(false);

  // Initialize quiz
  useEffect(() => {
    const filteredQuestions = quizQuestions.filter(q => {
      const categoryMatch = !options.category || q.category === options.category;
      const difficultyMatch = !options.difficulty || q.difficulty === options.difficulty;
      return categoryMatch && difficultyMatch;
    });

    // Shuffle and limit questions
    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
    const limited = shuffled.slice(0, options.questionCount || 10);
    
    setQuestions(limited);
    setStartTime(Date.now());
    setCurrentQuestionIndex(0);
    setCorrectAnswers([]);
    setWrongAnswers([]);
    setIsFinished(false);
  }, [options.category, options.difficulty, options.questionCount]);

  const currentQuestion = questions[currentQuestionIndex];

  const selectAnswer = useCallback((answerIndex: number) => {
    if (isAnswered) return;
    setSelectedAnswer(answerIndex);
  }, [isAnswered]);

  const submitAnswer = useCallback(() => {
    if (selectedAnswer === null || isAnswered) return;

    setIsAnswered(true);
    
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setCorrectAnswers(prev => [...prev, currentQuestionIndex]);
    } else {
      setWrongAnswers(prev => [...prev, currentQuestionIndex]);
    }
  }, [selectedAnswer, isAnswered, currentQuestion, currentQuestionIndex]);

  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  }, [currentQuestionIndex, questions.length]);

  const restartQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCorrectAnswers([]);
    setWrongAnswers([]);
    setStartTime(Date.now());
    setIsFinished(false);
    
    // Re-shuffle questions
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
  }, [questions]);

  const calculateScore = useCallback((): number => {
    const correctCount = correctAnswers.length;
    const wrongCount = wrongAnswers.length;
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    
    // Base score: correct × 10, wrong × -5
    let score = (correctCount * 10) - (wrongCount * 5);
    
    // Time bonus: faster completion = higher bonus (max 20 points)
    const avgTimePerQuestion = timeSpent / questions.length;
    if (avgTimePerQuestion < 10) {
      score += 20;
    } else if (avgTimePerQuestion < 20) {
      score += 10;
    } else if (avgTimePerQuestion < 30) {
      score += 5;
    }
    
    return Math.max(0, score);
  }, [correctAnswers, wrongAnswers, startTime, questions.length]);

  const getResult = useCallback((): QuizResult => {
    return {
      score: calculateScore(),
      total: questions.length,
      correctAnswers,
      wrongAnswers,
      timeSpent: Math.floor((Date.now() - startTime) / 1000),
      date: Date.now()
    };
  }, [calculateScore, questions.length, correctAnswers, wrongAnswers, startTime]);

  const isCorrectAnswer = useCallback((answerIndex: number): boolean => {
    return answerIndex === currentQuestion?.correctAnswer;
  }, [currentQuestion]);

  const progress = questions.length > 0 
    ? ((currentQuestionIndex + 1) / questions.length) * 100 
    : 0;

  return {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions: questions.length,
    selectedAnswer,
    isAnswered,
    correctAnswers,
    wrongAnswers,
    isFinished,
    progress,
    selectAnswer,
    submitAnswer,
    nextQuestion,
    restartQuiz,
    calculateScore,
    getResult,
    isCorrectAnswer
  };
}