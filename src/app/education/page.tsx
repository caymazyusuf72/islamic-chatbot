'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/language-context';
import { getTranslation } from '@/lib/i18n';
import { Brain, Gamepad2, Trophy, BarChart3 } from 'lucide-react';
import { QuizCard } from '@/components/quiz-card';
import { WordMatchGrid } from '@/components/word-match-grid';
import { useQuiz } from '@/hooks/use-quiz';
import { useWordMatch } from '@/hooks/use-word-match';
import { useProgress } from '@/contexts/progress-context';
import { QuizCategory, QuizDifficulty } from '@/types/quiz';

type GameMode = 'menu' | 'quiz' | 'wordMatch';

export default function EducationPage() {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(key, language);
  const { quizProgress, wordMatchProgress, addQuizResult, addWordMatchResult } = useProgress();

  const [gameMode, setGameMode] = useState<GameMode>('menu');
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory>('general');
  const [selectedDifficulty, setSelectedDifficulty] = useState<QuizDifficulty>('easy');
  const [wordMatchCategory, setWordMatchCategory] = useState<string>('prayer');

  const quiz = useQuiz({
    category: selectedCategory,
    difficulty: selectedDifficulty,
    questionCount: 10
  });

  const wordMatch = useWordMatch(wordMatchCategory);

  const handleQuizFinish = () => {
    const result = quiz.getResult();
    addQuizResult(result, selectedCategory);
    setGameMode('menu');
  };

  const handleWordMatchFinish = () => {
    const result = wordMatch.getResult();
    addWordMatchResult(result);
    setGameMode('menu');
  };

  if (gameMode === 'quiz') {
    if (quiz.isFinished) {
      const result = quiz.getResult();
      return (
        <div className="container mx-auto p-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-lg p-8 text-center"
          >
            <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
            <h2 className="text-3xl font-bold mb-4">Quiz Tamamlandı!</h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-secondary rounded-lg">
                <div className="text-3xl font-bold text-primary">{result.score}</div>
                <div className="text-sm text-muted-foreground">{t('education.score')}</div>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <div className="text-3xl font-bold text-green-500">{result.correctAnswers.length}</div>
                <div className="text-sm text-muted-foreground">{t('education.correct')}</div>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <div className="text-3xl font-bold text-red-500">{result.wrongAnswers.length}</div>
                <div className="text-sm text-muted-foreground">{t('education.wrong')}</div>
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <motion.button
                onClick={() => quiz.restartQuiz()}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('education.restart')}
              </motion.button>
              <motion.button
                onClick={handleQuizFinish}
                className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ana Menü
              </motion.button>
            </div>
          </motion.div>
        </div>
      );
    }

    return (
      <div className="container mx-auto p-6">
        <QuizCard
          question={quiz.currentQuestion}
          selectedAnswer={quiz.selectedAnswer}
          isAnswered={quiz.isAnswered}
          onSelectAnswer={quiz.selectAnswer}
          onSubmit={quiz.submitAnswer}
          onNext={quiz.nextQuestion}
          currentIndex={quiz.currentQuestionIndex}
          totalQuestions={quiz.totalQuestions}
          progress={quiz.progress}
        />
      </div>
    );
  }

  if (gameMode === 'wordMatch') {
    return (
      <div className="container mx-auto p-6">
        <WordMatchGrid
          cards={wordMatch.cards}
          selectedCards={wordMatch.selectedCards}
          moves={wordMatch.moves}
          isFinished={wordMatch.isFinished}
          progress={wordMatch.progress}
          onCardClick={wordMatch.flipCard}
          onRestart={() => {
            wordMatch.restartGame();
            if (wordMatch.isFinished) {
              handleWordMatchFinish();
            }
          }}
        />
        {wordMatch.isFinished && (
          <div className="mt-6 text-center">
            <motion.button
              onClick={handleWordMatchFinish}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ana Menü
            </motion.button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{t('education.title')}</h1>
        <p className="text-muted-foreground">İslami bilginizi test edin ve kelime dağarcığınızı geliştirin</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">{t('education.totalQuizzes')}</h3>
          </div>
          <div className="text-3xl font-bold">{quizProgress.totalQuizzes}</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <h3 className="font-semibold">{t('education.averageScore')}</h3>
          </div>
          <div className="text-3xl font-bold">
            {quizProgress.totalQuizzes > 0
              ? Math.round(
                  Object.values(quizProgress.categoryScores).reduce((a, b) => a + b, 0) /
                    quizProgress.totalQuizzes
                )
              : 0}
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <Gamepad2 className="w-5 h-5 text-green-500" />
            <h3 className="font-semibold">Kelime Oyunları</h3>
          </div>
          <div className="text-3xl font-bold">{wordMatchProgress.totalGames}</div>
        </div>
      </div>

      {/* Game Modes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quiz */}
        <motion.div
          className="bg-card border border-border rounded-lg p-6 cursor-pointer hover:border-primary transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-8 h-8 text-primary" />
            <h2 className="text-2xl font-bold">{t('education.quiz')}</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            İslami konularda bilginizi test edin. Peygamberler, İslam'ın şartları ve daha fazlası.
          </p>

          {/* Category Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">{t('education.selectCategory')}</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as QuizCategory)}
              className="w-full p-2 bg-secondary border border-border rounded-lg"
            >
              <option value="prophets">{t('education.categories.prophets')}</option>
              <option value="pillars">{t('education.categories.pillars')}</option>
              <option value="quran">{t('education.categories.quran')}</option>
              <option value="history">{t('education.categories.history')}</option>
              <option value="general">{t('education.categories.general')}</option>
            </select>
          </div>

          {/* Difficulty Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">{t('education.selectDifficulty')}</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as QuizDifficulty)}
              className="w-full p-2 bg-secondary border border-border rounded-lg"
            >
              <option value="easy">{t('education.difficulty.easy')}</option>
              <option value="medium">{t('education.difficulty.medium')}</option>
              <option value="hard">{t('education.difficulty.hard')}</option>
            </select>
          </div>

          <motion.button
            onClick={() => setGameMode('quiz')}
            className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('education.start')}
          </motion.button>
        </motion.div>

        {/* Word Match */}
        <motion.div
          className="bg-card border border-border rounded-lg p-6 cursor-pointer hover:border-primary transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Gamepad2 className="w-8 h-8 text-green-500" />
            <h2 className="text-2xl font-bold">{t('education.wordMatch')}</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Arapça kelimeleri Türkçe karşılıklarıyla eşleştirin. Kelime dağarcığınızı geliştirin.
          </p>

          {/* Category Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">{t('education.selectCategory')}</label>
            <select
              value={wordMatchCategory}
              onChange={(e) => setWordMatchCategory(e.target.value)}
              className="w-full p-2 bg-secondary border border-border rounded-lg"
            >
              <option value="prayer">Namaz</option>
              <option value="dua">Dua</option>
              <option value="daily">Günlük Kelimeler</option>
              <option value="numbers">Sayılar</option>
              <option value="terms">İslami Terimler</option>
            </select>
          </div>

          <motion.button
            onClick={() => setGameMode('wordMatch')}
            className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('education.start')}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}