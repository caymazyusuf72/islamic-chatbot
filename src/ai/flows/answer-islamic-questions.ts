'use server';

/**
 * @fileOverview A flow that answers questions about Islam based on the Quran, Hadith, and scholarly opinions, with conversation history.
 *
 * - answerIslamicQuestion - A function that answers the islamic question.
 * - AnswerIslamicQuestionInput - The input type for the answerIslamicQuestion function.
 * - AnswerIslamicQuestionOutput - The return type for the answerIslamicQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const AnswerIslamicQuestionInputSchema = z.object({
  question: z.string().describe('The latest question about Islam to be answered.'),
  history: z.array(MessageSchema).optional().describe('The history of the conversation so far.'),
});
export type AnswerIslamicQuestionInput = z.infer<typeof AnswerIslamicQuestionInputSchema>;

const AnswerIslamicQuestionOutputSchema = z.object({
  answer: z.string().describe('The answer to the question, grounded in the Quran, Hadith, and scholarly opinions.'),
  references: z.array(z.string()).describe('A list of references used to formulate the answer (e.g., Quran Surah and verse, Hadith source, scholar name).'),
});
export type AnswerIslamicQuestionOutput = z.infer<typeof AnswerIslamicQuestionOutputSchema>;

export async function answerIslamicQuestion(input: AnswerIslamicQuestionInput): Promise<AnswerIslamicQuestionOutput> {
  return answerIslamicQuestionFlow(input);
}

const answerIslamicQuestionPrompt = ai.definePrompt({
  name: 'answerIslamicQuestionPrompt',
  input: {schema: AnswerIslamicQuestionInputSchema},
  output: {schema: AnswerIslamicQuestionOutputSchema},
  prompt: `You are an AI assistant providing answers to questions about Islam. Your answers should be grounded in the Quran, Hadith, and the opinions of respected Islamic scholars.

You MUST provide specific references to support your answer. Format references as follows:
* Quran: "Surah Name Chapter:Verse" (e.g., "Al-Baqarah 2:255", "Al-Fatiha 1:1-7")
* Hadith: "Source, Book/Chapter, Hadith Number" (e.g., "Sahih Bukhari, Kitab al-Iman, Hadith 50", "Sahih Muslim, Book of Faith, Hadith 1")
* Scholarly Opinion: "Scholar Name (Era/School)" (e.g., "Imam al-Ghazali (11th century)", "Ibn Taymiyyah (Hanbali)")

IMPORTANT: Always provide at least 2-3 specific references for each answer. Be precise with verse numbers, hadith sources, and scholar names.

Remember the conversation history and use it as context to provide a relevant and coherent answer.

{{#if history}}
Conversation History:
{{#each history}}
{{this.role}}: {{{this.content}}}
{{/each}}
{{/if}}

Current Question: {{{question}}}

Answer in markdown format.
  `,
});

const answerIslamicQuestionFlow = ai.defineFlow(
  {
    name: 'answerIslamicQuestionFlow',
    inputSchema: AnswerIslamicQuestionInputSchema,
    outputSchema: AnswerIslamicQuestionOutputSchema,
  },
  async input => {
    const {output} = await answerIslamicQuestionPrompt(input);
    return output!;
  }
);
