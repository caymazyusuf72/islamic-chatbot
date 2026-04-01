/**
 * Rate Limiter - Memory-based implementation
 * IP bazlı rate limiting için kullanılır
 */

interface RateLimitRecord {
  count: number;
  resetTime: number;
  firstRequest: number;
}

interface RateLimitStore {
  [key: string]: RateLimitRecord;
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  retryAfter?: number;
}

export class RateLimiter {
  private store: RateLimitStore = {};
  private limit: number;
  private windowMs: number;
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor(limit: number = 10, windowMs: number = 60000) {
    this.limit = limit;
    this.windowMs = windowMs;
    
    // Her 5 dakikada bir eski kayıtları temizle
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 5 * 60 * 1000);
  }

  /**
   * Rate limit kontrolü yapar
   * @param identifier - Genellikle IP adresi
   * @returns Rate limit durumu
   */
  check(identifier: string): RateLimitResult {
    const now = Date.now();
    const record = this.store[identifier];

    // Kayıt yoksa veya süre dolmuşsa yeni kayıt oluştur
    if (!record || now > record.resetTime) {
      this.store[identifier] = {
        count: 1,
        resetTime: now + this.windowMs,
        firstRequest: now
      };
      
      return {
        allowed: true,
        remaining: this.limit - 1,
        resetTime: now + this.windowMs
      };
    }

    // Limit aşıldıysa reddet
    if (record.count >= this.limit) {
      const retryAfter = Math.ceil((record.resetTime - now) / 1000);
      
      return {
        allowed: false,
        remaining: 0,
        resetTime: record.resetTime,
        retryAfter
      };
    }

    // Sayacı artır
    record.count++;
    
    return {
      allowed: true,
      remaining: this.limit - record.count,
      resetTime: record.resetTime
    };
  }

  /**
   * Belirli bir identifier için rate limit'i sıfırlar
   * @param identifier - Sıfırlanacak identifier
   */
  reset(identifier: string): void {
    delete this.store[identifier];
  }

  /**
   * Tüm rate limit kayıtlarını temizler
   */
  resetAll(): void {
    this.store = {};
  }

  /**
   * Süresi dolmuş kayıtları temizler
   */
  private cleanup(): void {
    const now = Date.now();
    const identifiers = Object.keys(this.store);
    
    for (const identifier of identifiers) {
      if (this.store[identifier].resetTime < now) {
        delete this.store[identifier];
      }
    }
  }

  /**
   * Cleanup interval'ı durdurur
   */
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }

  /**
   * Mevcut kayıt sayısını döndürür (test/debug için)
   */
  getStoreSize(): number {
    return Object.keys(this.store).length;
  }
}

/**
 * IP adresini request'ten çıkarır
 * @param request - Next.js request objesi
 * @returns IP adresi
 */
export function getClientIp(request: Request): string {
  // Vercel, Cloudflare gibi platformlarda proxy header'ları kontrol et
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  // Fallback - localhost için
  return '127.0.0.1';
}

// Global rate limiter instance'ları
// Chat API için: 10 istek/dakika
export const chatRateLimiter = new RateLimiter(10, 60 * 1000);

// Dua recommendations için: 5 istek/dakika (daha ağır işlem)
export const duaRateLimiter = new RateLimiter(5, 60 * 1000);

// Genel API için: 30 istek/dakika
export const generalRateLimiter = new RateLimiter(30, 60 * 1000);