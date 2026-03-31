'use client';

import { motion } from 'framer-motion';
import { Heart, Share2, Copy } from 'lucide-react';
import { Verse } from '@/types/verse';
import { useFavorites } from '@/contexts/favorites-context';
import { useLanguage } from '@/contexts/language-context';
import { useTheme } from '@/contexts/theme-context';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { fadeIn, slideUp } from '@/lib/animations';

interface VerseCardProps {
  verse: Verse;
}

export function VerseCard({ verse }: VerseCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { language, t } = useLanguage();
  const { accentColor } = useTheme();
  const { toast } = useToast();
  const favorite = isFavorite(verse.id);

  const handleFavoriteToggle = () => {
    if (favorite) {
      removeFavorite(verse.id);
      toast({
        title: t('dailyVerse.removeFromFavorites'),
        description: t('dailyVerse.removedFromFavorites'),
      });
    } else {
      addFavorite(verse.id);
      toast({
        title: t('dailyVerse.addToFavorites'),
        description: t('dailyVerse.addedToFavorites'),
      });
    }
  };

  const handleCopy = async () => {
    const text = `${verse.arabicText}\n\n${verse.transliteration}\n\n${verse.translation[language]}\n\n— ${verse.reference}`;
    
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: t('dailyVerse.copiedToClipboard'),
        description: t('dailyVerse.copiedSuccess'),
      });
    } catch (error) {
      console.error('Failed to copy:', error);
      toast({
        title: t('common.error'),
        description: t('dailyVerse.copyFailed'),
        variant: 'destructive',
      });
    }
  };

  const handleShare = async () => {
    const text = `${verse.translation[language]}\n\n— ${verse.reference}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: verse.reference,
          text: text,
        });
      } catch (error) {
        console.error('Failed to share:', error);
      }
    } else {
      // Fallback to copy
      handleCopy();
    }
  };

  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Card className="overflow-hidden">
        <CardContent className="p-6 space-y-6">
          {/* Type Badge */}
          <motion.div variants={slideUp} className="flex items-center justify-between">
            <Badge 
              variant="outline"
              style={{ 
                borderColor: accentColor,
                color: accentColor 
              }}
            >
              {verse.type === 'quran' ? t('dailyVerse.quran') : t('dailyVerse.hadith')}
            </Badge>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleFavoriteToggle}
                className="h-8 w-8"
              >
                <Heart
                  className={`h-4 w-4 ${favorite ? 'fill-current' : ''}`}
                  style={{ color: favorite ? accentColor : undefined }}
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                className="h-8 w-8"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleShare}
                className="h-8 w-8"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          {/* Arabic Text */}
          <motion.div 
            variants={slideUp}
            className="text-center"
          >
            <p 
              className="text-2xl md:text-3xl font-arabic leading-loose"
              dir="rtl"
              lang="ar"
            >
              {verse.arabicText}
            </p>
          </motion.div>

          {/* Transliteration */}
          <motion.div 
            variants={slideUp}
            className="text-center"
          >
            <p className="text-sm md:text-base text-muted-foreground italic">
              {verse.transliteration}
            </p>
          </motion.div>

          {/* Translation */}
          <motion.div 
            variants={slideUp}
            className="text-center"
          >
            <p className="text-base md:text-lg leading-relaxed">
              {verse.translation[language]}
            </p>
          </motion.div>

          {/* Reference */}
          <motion.div 
            variants={slideUp}
            className="text-center pt-4 border-t"
          >
            <p 
              className="text-sm font-medium"
              style={{ color: accentColor }}
            >
              {verse.reference}
            </p>
          </motion.div>

          {/* Tags */}
          {verse.tags.length > 0 && (
            <motion.div 
              variants={slideUp}
              className="flex flex-wrap gap-2 justify-center"
            >
              {verse.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary"
                  className="text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}