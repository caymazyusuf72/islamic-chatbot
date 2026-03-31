export type VerseType = 'quran' | 'hadith';

export interface Verse {
  id: string;
  type: VerseType;
  arabicText: string;
  transliteration: string;
  translation: {
    tr: string;
    en: string;
    ar: string;
  };
  reference: string;
  category: string;
  tags: string[];
}