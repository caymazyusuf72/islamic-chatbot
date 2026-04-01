import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// API key kontrolü
const apiKey = process.env.GOOGLE_API_KEY;

if (!apiKey) {
  throw new Error(
    'GOOGLE_API_KEY environment variable is not set. ' +
    'Please create a .env.local file and add your API key. ' +
    'Get your API key from: https://aistudio.google.com/app/apikey'
  );
}

export const ai = genkit({
  plugins: [googleAI({apiKey})],
  model: 'googleai/gemini-2.0-flash',
});
