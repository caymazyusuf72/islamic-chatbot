declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * Google Gemini API Key
     * Get your API key from: https://aistudio.google.com/app/apikey
     */
    GOOGLE_API_KEY: string;

    /**
     * Next.js public app URL
     * @default "http://localhost:3000"
     */
    NEXT_PUBLIC_APP_URL?: string;

    /**
     * Node environment
     */
    NODE_ENV: 'development' | 'production' | 'test';
  }
}