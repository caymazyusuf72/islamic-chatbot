
'use server';

import { answerIslamicQuestion } from '@/ai/flows/answer-islamic-questions';
import { generateDuaRecommendations } from '@/ai/flows/generate-dua-recommendations';

type Message = {
  role: 'user' | 'assistant' | 'model';
  content: string;
};

type AnswerState = {
  response: {
    role: 'assistant';
    content: string;
    references?: string[];
  } | null;
  error: string | null;
};

export async function answerAction(
  messages: Message[],
  language?: 'en' | 'tr' | 'ar',
  kidsMode?: boolean
): Promise<AnswerState> {
  const currentQuestion = messages[messages.length - 1]?.content;

  if (!currentQuestion) {
    return { response: null, error: 'Invalid question.' };
  }

  // The history is all messages except the last one.
  const history = messages.slice(0, -1).map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    content: msg.content
  }));
  
  try {
    const result = await answerIslamicQuestion({
      question: currentQuestion,
      history,
      language: language || 'en',
      kidsMode: kidsMode || false
    });
    return {
      response: {
        role: 'assistant',
        content: result.answer,
        references: result.references,
      },
      error: null,
    };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { response: null, error: `Failed to get an answer. ${errorMessage}` };
  }
}

type Dua = {
  title: string;
  arabicText: string;
  transliteration: string;
  meaning: string;
  source: string;
  whenToRecite: string;
};

type DuaState = {
  recommendations: Dua[] | null;
  error: string | null;
};

export async function duaAction(
  prevState: DuaState,
  formData: FormData
): Promise<DuaState> {
  const situation = formData.get('situation');
  const language = formData.get('language') as 'en' | 'tr' | 'ar' | null;

  if (!situation || typeof situation !== 'string') {
    return { recommendations: null, error: 'Invalid situation provided.' };
  }

  try {
    const result = await generateDuaRecommendations({
      situation,
      language: language || 'en'
    });
    return { recommendations: result.recommendations, error: null };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { recommendations: null, error: `Failed to get recommendations. ${errorMessage}` };
  }
}
