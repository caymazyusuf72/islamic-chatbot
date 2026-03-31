'use client';

import { useState, useEffect, useMemo } from 'react';
import { Verse, VerseType } from '@/types/verse';
import { verses } from '@/data/verses';

interface UseDailyVerseOptions {
  filterType?: VerseType | 'all';
}

export function useDailyVerse(options: UseDailyVerseOptions = {}) {
  const { filterType = 'all' } = options;
  const [currentVerse, setCurrentVerse] = useState<Verse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Filter verses based on type
  const filteredVerses = useMemo(() => {
    if (filterType === 'all') return verses;
    return verses.filter((v) => v.type === filterType);
  }, [filterType]);

  // Get daily verse based on date seed
  const getDailyVerse = useMemo(() => {
    const today = new Date();
    const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    
    // Simple hash function for date-based seed
    let hash = 0;
    for (let i = 0; i < dateString.length; i++) {
      const char = dateString.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    
    const index = Math.abs(hash) % filteredVerses.length;
    return filteredVerses[index];
  }, [filteredVerses]);

  // Get random verse
  const getRandomVerse = () => {
    const randomIndex = Math.floor(Math.random() * filteredVerses.length);
    const verse = filteredVerses[randomIndex];
    setCurrentVerse(verse);
    
    // Cache the random verse for the session
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('current-verse', JSON.stringify(verse));
    }
  };

  // Initialize verse on mount
  useEffect(() => {
    setIsLoading(true);
    
    // Try to get cached verse from session
    if (typeof window !== 'undefined') {
      const cached = sessionStorage.getItem('current-verse');
      if (cached) {
        try {
          const parsedVerse = JSON.parse(cached);
          // Verify the cached verse matches current filter
          if (filterType === 'all' || parsedVerse.type === filterType) {
            setCurrentVerse(parsedVerse);
            setIsLoading(false);
            return;
          }
        } catch (error) {
          console.error('Failed to parse cached verse:', error);
        }
      }
    }
    
    // Otherwise use daily verse
    setCurrentVerse(getDailyVerse);
    setIsLoading(false);
  }, [getDailyVerse, filterType]);

  return {
    verse: currentVerse,
    isLoading,
    getRandomVerse,
    totalVerses: filteredVerses.length,
  };
}