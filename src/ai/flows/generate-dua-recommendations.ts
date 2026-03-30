'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating dua recommendations based on user input.
 *
 * It exports:
 * - `generateDuaRecommendations`: An async function to generate dua recommendations.
 * - `GenerateDuaRecommendationsInput`: The input type for the function.
 * - `GenerateDuaRecommendationsOutput`: The output type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDuaRecommendationsInputSchema = z.object({
  situation: z
    .string()
    .describe('The user\'s current situation or need for which a dua is desired.'),
  language: z
    .enum(['en', 'tr', 'ar'])
    .optional()
    .describe('The language for the dua meaning (English, Turkish, or Arabic).'),
});
export type GenerateDuaRecommendationsInput = z.infer<
  typeof GenerateDuaRecommendationsInputSchema
>;

const DuaSchema = z.object({
  title: z.string().describe('A short title for the dua (e.g., "Dua for Exams")'),
  arabicText: z.string().describe('The dua in Arabic script'),
  transliteration: z.string().describe('The dua in Latin script (pronunciation guide)'),
  meaning: z.string().describe('The meaning/translation of the dua in the requested language'),
  source: z.string().describe('The source of the dua (e.g., Quran 2:286, Sahih Bukhari, Traditional dua)'),
  whenToRecite: z.string().describe('When or in what situation this dua should be recited'),
});

const GenerateDuaRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(DuaSchema)
    .describe('A list of relevant duas with full details for the given situation.'),
});
export type GenerateDuaRecommendationsOutput = z.infer<
  typeof GenerateDuaRecommendationsOutputSchema
>;

export async function generateDuaRecommendations(
  input: GenerateDuaRecommendationsInput
): Promise<GenerateDuaRecommendationsOutput> {
  return generateDuaRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDuaRecommendationsPrompt',
  input: {schema: GenerateDuaRecommendationsInputSchema},
  output: {schema: GenerateDuaRecommendationsOutputSchema},
  prompt: `You are an AI assistant specialized in providing Islamic duas (supplications).

  Based on the user's situation, suggest 3-5 relevant duas from the Quran and Sunnah. For each dua, provide:
  
  1. A short descriptive title
  2. The complete Arabic text (in Arabic script)
  3. The transliteration (pronunciation in Latin script)
  4. The meaning/translation in {{language}} language (if not specified, use English)
  5. The authentic source (Quran verse, Hadith reference, or traditional dua)
  6. When or in what situation this dua should be recited
  
  Ensure all Arabic text is properly formatted and accurate. The transliteration should help non-Arabic speakers pronounce the dua correctly.
  
  User's situation: {{{situation}}}
  Language for meaning: {{language}}
  `,
});

const generateDuaRecommendationsFlow = ai.defineFlow(
  {
    name: 'generateDuaRecommendationsFlow',
    inputSchema: GenerateDuaRecommendationsInputSchema,
    outputSchema: GenerateDuaRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
