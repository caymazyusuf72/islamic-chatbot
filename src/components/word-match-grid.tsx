'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/theme-context';
import { RotateCcw, Trophy, Clock } from 'lucide-react';

interface Card {
  id: string;
  content: string;
  type: 'arabic' | 'turkish';
  pairId: string;
  isMatched: boolean;
  isFlipped: boolean;
}

interface WordMatchGridProps {
  cards: Card[];
  selectedCards: string[];
  moves: number;
  isFinished: boolean;
  progress: number;
  timeElapsed?: number;
  onCardClick: (cardId: string) => void;
  onRestart: () => void;
}

export function WordMatchGrid({
  cards,
  selectedCards,
  moves,
  isFinished,
  progress,
  timeElapsed,
  onCardClick,
  onRestart
}: WordMatchGridProps) {
  const { theme } = useTheme();

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Stats Bar */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg">
            <Trophy className="w-5 h-5 text-primary" />
            <span className="font-semibold">{moves}</span>
            <span className="text-sm text-muted-foreground">Hamle</span>
          </div>
          {timeElapsed !== undefined && (
            <div className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg">
              <Clock className="w-5 h-5 text-primary" />
              <span className="font-semibold">
                {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}
              </span>
            </div>
          )}
        </div>
        <motion.button
          onClick={onRestart}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw className="w-4 h-4" />
          Yeniden Başla
        </motion.button>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {cards.map((card) => {
          const isSelected = selectedCards.includes(card.id);
          const isFlipped = card.isFlipped || card.isMatched;

          return (
            <motion.div
              key={card.id}
              className="aspect-square cursor-pointer"
              onClick={() => !card.isMatched && onCardClick(card.id)}
              whileHover={!card.isMatched ? { scale: 1.05 } : {}}
              whileTap={!card.isMatched ? { scale: 0.95 } : {}}
            >
              <motion.div
                className="relative w-full h-full"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring' }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Card Back */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-lg shadow-lg flex items-center justify-center"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(0deg)'
                  }}
                >
                  <div className="text-4xl text-white opacity-50">؟</div>
                </div>

                {/* Card Front */}
                <div
                  className={`absolute inset-0 rounded-lg shadow-lg flex items-center justify-center p-4 ${
                    card.isMatched
                      ? 'bg-green-500/20 border-2 border-green-500'
                      : isSelected
                      ? 'bg-primary/20 border-2 border-primary'
                      : 'bg-card border-2 border-border'
                  }`}
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <div
                    className={`text-center font-semibold ${
                      card.type === 'arabic' ? 'text-2xl' : 'text-lg'
                    } ${card.isMatched ? 'text-green-600' : ''}`}
                  >
                    {card.content}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Finish Message */}
      {isFinished && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border-2 border-green-500 rounded-lg p-6 text-center"
        >
          <div className="text-4xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold mb-2">Tebrikler!</h3>
          <p className="text-muted-foreground mb-4">
            Oyunu {moves} hamlede tamamladınız!
          </p>
          {timeElapsed !== undefined && (
            <p className="text-sm text-muted-foreground">
              Süre: {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
}