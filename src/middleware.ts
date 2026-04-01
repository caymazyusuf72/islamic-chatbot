/**
 * Next.js Middleware - Security Headers ve CORS
 * Tüm request'ler için güvenlik header'ları ekler
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Response oluştur
  const response = NextResponse.next();

  // Security Headers
  const headers = response.headers;

  // 1. Content Security Policy (CSP)
  // XSS saldırılarına karşı koruma
  headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://*.googleapis.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https://generativelanguage.googleapis.com https://*.googleapis.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; ')
  );

  // 2. X-Content-Type-Options
  // MIME type sniffing'i engeller
  headers.set('X-Content-Type-Options', 'nosniff');

  // 3. X-Frame-Options
  // Clickjacking saldırılarına karşı koruma
  headers.set('X-Frame-Options', 'DENY');

  // 4. X-XSS-Protection
  // Eski tarayıcılar için XSS koruması
  headers.set('X-XSS-Protection', '1; mode=block');

  // 5. Referrer-Policy
  // Referrer bilgisi sızıntısını kontrol eder
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // 6. Permissions-Policy
  // Tarayıcı özelliklerine erişimi kısıtlar
  headers.set(
    'Permissions-Policy',
    [
      'camera=()',
      'microphone=()',
      'geolocation=(self)',
      'interest-cohort=()',
    ].join(', ')
  );

  // 7. Strict-Transport-Security (HSTS)
  // HTTPS kullanımını zorunlu kılar (production'da)
  if (process.env.NODE_ENV === 'production') {
    headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );
  }

  // 8. CORS Headers (API route'ları için)
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Allowed origins (production'da kendi domain'inizi ekleyin)
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:9002',
      process.env.NEXT_PUBLIC_APP_URL,
    ].filter(Boolean);

    const origin = request.headers.get('origin');
    
    if (origin && allowedOrigins.includes(origin)) {
      headers.set('Access-Control-Allow-Origin', origin);
      headers.set('Access-Control-Allow-Credentials', 'true');
    }

    // Preflight request için
    if (request.method === 'OPTIONS') {
      headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      headers.set(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, X-Requested-With'
      );
      headers.set('Access-Control-Max-Age', '86400'); // 24 saat

      return new NextResponse(null, {
        status: 204,
        headers,
      });
    }
  }

  // 9. Cache Control (API route'ları için)
  if (request.nextUrl.pathname.startsWith('/api/')) {
    headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    headers.set('Pragma', 'no-cache');
    headers.set('Expires', '0');
  }

  return response;
}

// Middleware'in çalışacağı path'ler
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};