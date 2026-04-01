'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface PageLoadingProps {
  isLoading: boolean;
  progress: number;
}

export function PageLoading({ isLoading, progress }: PageLoadingProps) {
  const [displayProgress, setDisplayProgress] = useState(0);

  // Smooth progress animation
  useEffect(() => {
    if (isLoading) {
      setDisplayProgress(0);
    } else {
      setDisplayProgress(progress);
    }
  }, [isLoading, progress]);

  useEffect(() => {
    if (isLoading && displayProgress < progress) {
      const timer = setTimeout(() => {
        setDisplayProgress(prev => Math.min(prev + 1, progress));
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [isLoading, displayProgress, progress]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          role="status"
          aria-live="polite"
          aria-label="Sayfa yükleniyor"
        >
          <div className="text-center space-y-6 px-4">
            {/* Bismillah yazısı */}
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-3xl md:text-4xl lg:text-5xl font-arabic text-primary font-bold"
              style={{ fontFamily: 'Lateef, serif' }}
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </motion.h1>

            {/* Progress bar container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="w-full max-w-xs mx-auto space-y-3"
            >
              {/* Progress bar */}
              <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden shadow-inner">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: `${displayProgress}%` }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary/80 rounded-full shadow-sm"
                >
                  {/* Shimmer effect */}
                  <motion.div
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />
                </motion.div>
              </div>

              {/* Yüzde göstergesi */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-sm text-muted-foreground font-medium tabular-nums"
                aria-live="polite"
              >
                {displayProgress}%
              </motion.p>
            </motion.div>

            {/* Loading text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xs text-muted-foreground"
            >
              Yükleniyor...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}