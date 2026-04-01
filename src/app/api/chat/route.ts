import { NextRequest, NextResponse } from 'next/server';
import { ai } from '@/ai/genkit';
import { chatRateLimiter, getClientIp } from '@/lib/rate-limiter';
import { chatMessageSchema, validateInput, validateRequestSize } from '@/lib/validators';

export async function POST(request: NextRequest) {
  try {
    // 1. Request size kontrolü (10KB limit)
    const sizeCheck = validateRequestSize(request, 10 * 1024);
    if (!sizeCheck.valid) {
      return NextResponse.json(
        { error: sizeCheck.error },
        { status: 413 } // Payload Too Large
      );
    }

    // 2. Rate limiting kontrolü
    const clientIp = getClientIp(request);
    const rateLimitResult = chatRateLimiter.check(clientIp);

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          error: 'Too many requests',
          message: 'Rate limit exceeded. Please try again later.',
          retryAfter: rateLimitResult.retryAfter
        },
        {
          status: 429,
          headers: {
            'Retry-After': rateLimitResult.retryAfter?.toString() || '60',
            'X-RateLimit-Limit': '10',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
          }
        }
      );
    }

    // 3. Request body'yi parse et
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    // 4. Input validation
    const validation = validateInput(chatMessageSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const { message } = validation.data;

    // 5. API key kontrolü
    if (!process.env.GOOGLE_API_KEY) {
      console.error('GOOGLE_API_KEY not configured');
      return NextResponse.json(
        { error: 'Service temporarily unavailable' },
        { status: 503 }
      );
    }

    // 6. AI ile sohbet et
    const { text } = await ai.generate({
      prompt: message,
      config: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    });

    // 7. Başarılı response (rate limit headers ile)
    return NextResponse.json(
      {
        response: text,
        success: true
      },
      {
        headers: {
          'X-RateLimit-Limit': '10',
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
        }
      }
    );

  } catch (error) {
    // Production'da hassas bilgi sızdırma
    console.error('Chat API Error:', error);
    
    // Generic error message
    return NextResponse.json(
      {
        error: 'Failed to process chat request',
        message: 'An unexpected error occurred. Please try again later.'
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