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
});
export type GenerateDuaRecommendationsInput = z.infer<
  typeof GenerateDuaRecommendationsInputSchema
>;

const GenerateDuaRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('A list of relevant duas for the given situation.'),
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

  Based on the user's situation, suggest relevant duas from the Quran and Sunnah. Provide each dua as a string in the recommendation array.

  Situation: {{{situation}}}
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
