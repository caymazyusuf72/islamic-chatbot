export interface WordPair {
  id: string;
  arabic: string;
  turkish: string;
  category: string;
}

export interface WordMatchGame {
  pairs: WordPair[];
  matched: string[];
  selected: string | null;
  moves: number;
  startTime: number;
}

export interface WordMatchResult {
  moves: number;
  timeSpent: number;
  category: string;
  date: number;
}

export interface WordMatchProgress {
  totalGames: number;
  bestMoves: Record<string, number>;
  bestTimes: Record<string, number>;
  recentResults: WordMatchResult[];
}