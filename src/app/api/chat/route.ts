import { NextRequest, NextResponse } from 'next/server';
import { ai } from '@/ai/genkit';

export async function POST(request: NextRequest) {
  try {
    // Request body'den mesajı al
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    // API key kontrolü (genkit.ts'de yapılıyor ama ekstra güvenlik için)
    if (!process.env.GOOGLE_API_KEY) {
      return NextResponse.json(
        { 
          error: 'API key not configured',
          details: 'GOOGLE_API_KEY environment variable is not set'
        },
        { status: 500 }
      );
    }

    // AI ile sohbet et
    const { text } = await ai.generate({
      prompt: message,
      config: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    });

    return NextResponse.json({ 
      response: text,
      success: true 
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    
    // Hata mesajını kullanıcıya döndür
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json(
      { 
        error: 'Failed to process chat request',
        details: errorMessage
      },
      { status: 500 }
    );
  }
}

// GET isteği için bilgilendirme
export async function GET() {
  return NextResponse.json(
    { 
      message: 'Chat API endpoint. Use POST method to send messages.',
      usage: {
        method: 'POST',
        body: {
          message: 'Your message here'
        }
      }
    },
    { status: 200 }
  );
}