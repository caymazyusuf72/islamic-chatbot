'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/language-context';
import { useTheme } from '@/contexts/theme-context';
import { QuizQuestion } from '@/types/quiz';
import { Check, X, Clock, Award } from 'lucide-react';

interface QuizCardProps {
  question: QuizQuestion;
  selectedAnswer: number | null;
  isAnswered: boolean;
  onSelectAnswer: (index: number) => void;
  onSubmit: () => void;
  onNext: () => void;
  currentIndex: number;
  totalQuestions: number;
  progress: number;
  timeElapsed?: number;
}

export function QuizCard({
  question,
  selectedAnswer,
  isAnswered,
  onSelectAnswer,
  onSubmit,
  onNext,
  currentIndex,
  totalQuestions,
  progress,
  timeElapsed
}: QuizCardProps) {
  const { language } = useLanguage();
  const { theme } = useTheme();

  const questionText = question.question[language];
  const explanationText = question.explanation?.[language];

  const getOptionLabel = (index: number) => {
    return String.fromCharCode(65 + index); // A, B, C, D
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Progress Bar */}
      <div className="mb-6" role="region" aria-label="Quiz progress">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground" aria-label={`Question ${currentIndex + 1} of ${totalQuestions}`}>
            {currentIndex + 1} / {totalQuestions}
          </span>
          {timeElapsed !== undefined && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground" aria-label={`Time elapsed: ${Math.floor(timeElapsed / 60)} minutes ${timeElapsed % 60} seconds`}>
              <Clock className="w-4 h-4" aria-hidden="true" />
              <span aria-hidden="true">{Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}</span>
            </div>
          )}
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Quiz completion progress">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-lg" role="article" aria-labelledby="quiz-question">
        {/* Question */}
        <div className="mb-6">
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm mb-4" role="note">
            {question.category.charAt(0).toUpperCase() + question.category.slice(1)}
          </div>
          <h2 id="quiz-question" className="text-xl font-semibold mb-2">{questionText}</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Award className="w-4 h-4" aria-hidden="true" />
            <span className="capitalize">{question.difficulty}</span>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6" role="radiogroup" aria-labelledby="quiz-question">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectOption = index === question.correctAnswer;
            const showResult = isAnswered;

            let optionClass = 'border-border hover:border-primary/50';
            if (showResult) {
              if (isCorrectOption) {
                optionClass = 'border-green-500 bg-green-500/10';
              } else if (isSelected && !isCorrect) {
                optionClass = 'border-red-500 bg-red-500/10';
              }
            } else if (isSelected) {
              optionClass = 'border-primary bg-primary/10';
            }

            return (
              <motion.button
                key={index}
                onClick={() => !isAnswered && onSelectAnswer(index)}
                disabled={isAnswered}
                className={`w-full p-4 border-2 rounded-lg text-left transition-all ${optionClass} ${
                  isAnswered ? 'cursor-default' : 'cursor-pointer hover:shadow-md'
                }`}
                whileHover={!isAnswered ? { scale: 1.02 } : {}}
                whileTap={!isAnswered ? { scale: 0.98 } : {}}
                role="radio"
                aria-checked={isSelected}
                aria-label={`Option ${getOptionLabel(index)}: ${option}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                        showResult && isCorrectOption
                          ? 'bg-green-500 text-white'
                          : showResult && isSelected && !isCorrect
                          ? 'bg-red-500 text-white'
                          : isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      {getOptionLabel(index)}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                  {showResult && isCorrectOption && (
                    <Check className="w-5 h-5 text-green-500" aria-label="Correct answer" />
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <X className="w-5 h-5 text-red-500" aria-label="Incorrect answer" />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Explanation */}
        <AnimatePresence>
          {isAnswered && explanationText && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 bg-secondary/50 rounded-lg border border-border"
              role="status"
              aria-live="polite"
            >
              <div className="flex items-start gap-2">
                <div className={`mt-0.5 ${isCorrect ? 'text-green-500' : 'text-blue-500'}`}>
                  {isCorrect ? <Check className="w-5 h-5" aria-hidden="true" /> : <Award className="w-5 h-5" aria-hidden="true" />}
                </div>
                <div>
                  <p className="font-semibold mb-1">
                    {isCorrect ? '✓ Doğru!' : 'Açıklama'}
                  </p>
                  <p className="text-sm text-muted-foreground">{explanationText}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Button */}
        <div className="flex justify-end">
          {!isAnswered ? (
            <motion.button
              onClick={onSubmit}
              disabled={selectedAnswer === null}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Submit answer"
            >
              Cevapla
            </motion.button>
          ) : (
            <motion.button
              onClick={onNext}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={currentIndex < totalQuestions - 1 ? 'Next question' : 'Finish quiz'}
            >
              {currentIndex < totalQuestions - 1 ? 'Sonraki' : 'Bitir'}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}