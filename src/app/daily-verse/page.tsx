'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, RefreshCw, Heart } from 'lucide-react';
import { useDailyVerse } from '@/hooks/use-daily-verse';
import { useFavorites } from '@/contexts/favorites-context';
import { useLanguage } from '@/contexts/language-context';
import { useTheme } from '@/contexts/theme-context';
import { VerseCard } from '@/components/verse-card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { verses } from '@/data/verses';
import { VerseType } from '@/types/verse';
import { pageVariants } from '@/lib/animations';

export default function DailyVersePage() {
  const { t } = useLanguage();
  const { accentColor } = useTheme();
  const { favorites } = useFavorites();
  const [filterType, setFilterType] = useState<VerseType | 'all'>('all');
  const { verse, isLoading, getRandomVerse, totalVerses } = useDailyVerse({ filterType });

  const favoriteVerses = verses.filter((v) => favorites.includes(v.id));

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="container max-w-4xl mx-auto px-4 py-8 space-y-8"
    >
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <BookOpen className="h-8 w-8" style={{ color: accentColor }} />
          <h1 className="text-3xl md:text-4xl font-bold">{t('dailyVerse.title')}</h1>
        </div>
        <p className="text-muted-foreground">
          {totalVerses} {filterType === 'all' ? t('dailyVerse.all') : filterType === 'quran' ? t('dailyVerse.quran') : t('dailyVerse.hadith')}
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="daily">{t('dailyVerse.title')}</TabsTrigger>
          <TabsTrigger value="favorites">
            <Heart className="h-4 w-4 mr-2" />
            {t('dailyVerse.favorites')} ({favoriteVerses.length})
          </TabsTrigger>
        </TabsList>

        {/* Daily Verse Tab */}
        <TabsContent value="daily" className="space-y-6 mt-6">
          {/* Filter Buttons */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Button
              variant={filterType === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType('all')}
              style={filterType === 'all' ? { backgroundColor: accentColor } : undefined}
            >
              {t('dailyVerse.all')}
            </Button>
            <Button
              variant={filterType === 'quran' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType('quran')}
              style={filterType === 'quran' ? { backgroundColor: accentColor } : undefined}
            >
              {t('dailyVerse.quran')}
            </Button>
            <Button
              variant={filterType === 'hadith' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType('hadith')}
              style={filterType === 'hadith' ? { backgroundColor: accentColor } : undefined}
            >
              {t('dailyVerse.hadith')}
            </Button>
          </div>

          {/* Verse Card */}
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: accentColor }} />
                <p className="mt-4 text-muted-foreground">{t('common.loading')}</p>
              </motion.div>
            ) : verse ? (
              <motion.div key={verse.id}>
                <VerseCard verse={verse} />
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">{t('dailyVerse.noFavorites')}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* New Verse Button */}
          {verse && (
            <div className="flex justify-center">
              <Button
                onClick={getRandomVerse}
                size="lg"
                className="gap-2"
                style={{ backgroundColor: accentColor }}
              >
                <RefreshCw className="h-4 w-4" />
                {t('dailyVerse.newVerse')}
              </Button>
            </div>
          )}
        </TabsContent>

        {/* Favorites Tab */}
        <TabsContent value="favorites" className="space-y-6 mt-6">
          {favoriteVerses.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">{t('dailyVerse.noFavorites')}</p>
              <p className="text-sm text-muted-foreground">
                {t('dailyVerse.addToFavorites')}
              </p>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {favoriteVerses.map((verse, index) => (
                <motion.div
                  key={verse.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <VerseCard verse={verse} />
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}