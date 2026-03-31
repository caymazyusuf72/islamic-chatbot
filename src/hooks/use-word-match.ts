'use client';

import { useState, useEffect, useCallback } from 'react';
import { WordPair, WordMatchGame, WordMatchResult } from '@/types/word-match';
import { wordPairs } from '@/data/word-pairs';

interface Card {
  id: string;
  content: string;
  type: 'arabic' | 'turkish';
  pairId: string;
  isMatched: boolean;
  isFlipped: boolean;
}

export function useWordMatch(category?: string) {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  // Fisher-Yates shuffle algorithm
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Initialize game
  useEffect(() => {
    const filteredPairs = category 
      ? wordPairs.filter(pair => pair.category === category)
      : wordPairs;

    // Select random pairs (8 pairs = 16 cards for 4x4 grid)
    const selectedPairs = shuffleArray(filteredPairs).slice(0, 8);

    // Create cards from pairs
    const gameCards: Card[] = [];
    selectedPairs.forEach(pair => {
      gameCards.push({
        id: `${pair.id}-ar`,
        content: pair.arabic,
        type: 'arabic',
        pairId: pair.id,
        isMatched: false,
        isFlipped: false
      });
      gameCards.push({
        id: `${pair.id}-tr`,
        content: pair.turkish,
        type: 'turkish',
        pairId: pair.id,
        isMatched: false,
        isFlipped: false
      });
    });

    // Shuffle cards
    setCards(shuffleArray(gameCards));
    setStartTime(Date.now());
    setMoves(0);
    setMatchedPairs([]);
    setSelectedCards([]);
    setIsFinished(false);
  }, [category]);

  const flipCard = useCallback((cardId: string) => {
    if (isChecking || selectedCards.length >= 2) return;

    const card = cards.find(c => c.id === cardId);
    if (!card || card.isMatched || selectedCards.includes(cardId)) return;

    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));

    setSelectedCards(prev => [...prev, cardId]);
  }, [cards, selectedCards, isChecking]);

  // Check for match when 2 cards are selected
  useEffect(() => {
    if (selectedCards.length !== 2) return;

    setIsChecking(true);
    const [firstId, secondId] = selectedCards;
    const firstCard = cards.find(c => c.id === firstId);
    const secondCard = cards.find(c => c.id === secondId);

    if (!firstCard || !secondCard) return;

    const isMatch = firstCard.pairId === secondCard.pairId && 
                    firstCard.type !== secondCard.type;

    setTimeout(() => {
      if (isMatch) {
        // Match found
        setCards(prev => prev.map(c => 
          c.pairId === firstCard.pairId 
            ? { ...c, isMatched: true, isFlipped: true }
            : c
        ));
        setMatchedPairs(prev => [...prev, firstCard.pairId]);
      } else {
        // No match - flip back
        setCards(prev => prev.map(c => 
          (c.id === firstId || c.id === secondId)
            ? { ...c, isFlipped: false }
            : c
        ));
      }

      setSelectedCards([]);
      setMoves(prev => prev + 1);
      setIsChecking(false);
    }, 1000);
  }, [selectedCards, cards]);

  // Check if game is finished
  useEffect(() => {
    if (cards.length > 0 && matchedPairs.length === cards.length / 2) {
      setIsFinished(true);
    }
  }, [matchedPairs, cards.length]);

  const restartGame = useCallback(() => {
    const filteredPairs = category 
      ? wordPairs.filter(pair => pair.category === category)
      : wordPairs;

    const selectedPairs = shuffleArray(filteredPairs).slice(0, 8);

    const gameCards: Card[] = [];
    selectedPairs.forEach(pair => {
      gameCards.push({
        id: `${pair.id}-ar`,
        content: pair.arabic,
        type: 'arabic',
        pairId: pair.id,
        isMatched: false,
        isFlipped: false
      });
      gameCards.push({
        id: `${pair.id}-tr`,
        content: pair.turkish,
        type: 'turkish',
        pairId: pair.id,
        isMatched: false,
        isFlipped: false
      });
    });

    setCards(shuffleArray(gameCards));
    setStartTime(Date.now());
    setMoves(0);
    setMatchedPairs([]);
    setSelectedCards([]);
    setIsFinished(false);
    setIsChecking(false);
  }, [category]);

  const getResult = useCallback((): WordMatchResult => {
    return {
      moves,
      timeSpent: Math.floor((Date.now() - startTime) / 1000),
      category: category || 'all',
      date: Date.now()
    };
  }, [moves, startTime, category]);

  const progress = cards.length > 0 
    ? (matchedPairs.length / (cards.length / 2)) * 100 
    : 0;

  return {
    cards,
    selectedCards,
    matchedPairs,
    moves,
    isFinished,
    isChecking,
    progress,
    flipCard,
    restartGame,
    getResult
  };
}