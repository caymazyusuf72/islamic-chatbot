# 🛡️ Güvenlik Dokümantasyonu

## Genel Bakış

NurAI projesi için uygulanan güvenlik önlemleri ve best practice'ler.

## 🔒 Uygulanan Güvenlik Önlemleri

### 1. Rate Limiting

**Dosya:** [`src/lib/rate-limiter.ts`](src/lib/rate-limiter.ts)

- **Chat API:** 10 istek/dakika (IP bazlı)
- **Dua API:** 5 istek/dakika (IP bazlı)
- **Genel API:** 30 istek/dakika (IP bazlı)

**Özellikler:**
- Memory-based implementation (Redis gerektirmez)
- Sliding window algoritması
- Otomatik cleanup (5 dakikada bir)
- Rate limit headers (X-RateLimit-*)
- 429 status code ile retry-after bilgisi

**Kullanım:**
```typescript
import { chatRateLimiter, getClientIp } from '@/lib/rate-limiter';

const clientIp = getClientIp(request);
const result = chatRateLimiter.check(clientIp);

if (!result.allowed) {
  // Rate limit aşıldı
  return NextResponse.json(
    { error: 'Too many requests' },
    { status: 429 }
  );
}
```

### 2. Input Validation

**Dosya:** [`src/lib/validators.ts`](src/lib/validators.ts)

**Zod Schema'ları:**
- `chatMessageSchema` - Chat mesajları için
- `duaRequestSchema` - Dua istekleri için
- `islamicQuestionSchema` - İslami sorular için

**Kontroller:**
- XSS pattern detection
- Injection attack prevention
- Length validation (min/max)
- Type validation
- Whitespace kontrolü

**Tehlikeli Pattern'ler:**
```typescript
- <script> tags
- javascript: protocol
- on* event handlers (onclick, onerror, vb.)
- <iframe>, <object>, <embed> tags
- eval() calls
- vbscript: protocol
```

**Kullanım:**
```typescript
import { chatMessageSchema, validateInput } from '@/lib/validators';

const validation = validateInput(chatMessageSchema, body);
if (!validation.success) {
  return NextResponse.json(
    { error: validation.error },
    { status: 400 }
  );
}
```

### 3. Security Headers

**Dosya:** [`src/middleware.ts`](src/middleware.ts)

**Uygulanan Header'lar:**

| Header | Değer | Amaç |
|--------|-------|------|
| Content-Security-Policy | Strict CSP | XSS koruması |
| X-Content-Type-Options | nosniff | MIME sniffing engelleme |
| X-Frame-Options | DENY | Clickjacking koruması |
| X-XSS-Protection | 1; mode=block | XSS koruması (eski tarayıcılar) |
| Referrer-Policy | strict-origin-when-cross-origin | Referrer sızıntısı kontrolü |
| Permissions-Policy | Kısıtlı | Tarayıcı özellik erişimi |
| Strict-Transport-Security | max-age=31536000 | HTTPS zorunluluğu (production) |

**CORS Yapılandırması:**
- Sadece izin verilen origin'ler
- Credentials desteği
- Preflight request handling
- OPTIONS method desteği

### 4. Error Handling

**Uygulanan İyileştirmeler:**

✅ **Yapılanlar:**
- Generic error messages (production)
- Detailed logging (console)
- Hassas bilgi sızdırma engelleme
- Stack trace gizleme

❌ **Yapılmayanlar:**
- Error details kullanıcıya gösterilmez
- Internal error messages expose edilmez
- API key'ler log'lanmaz

**Örnek:**
```typescript
// ❌ YANLIŞ
return NextResponse.json(
  { error: error.message }, // Hassas bilgi sızıntısı!
  { status: 500 }
);

// ✅ DOĞRU
console.error('Internal error:', error); // Sadece log
return NextResponse.json(
  { error: 'Service temporarily unavailable' },
  { status: 500 }
);
```

### 5. API Route Güvenliği

**Dosya:** [`src/app/api/chat/route.ts`](src/app/api/chat/route.ts)

**Güvenlik Katmanları:**
1. Request size kontrolü (10KB limit)
2. Rate limiting
3. JSON parse error handling
4. Input validation
5. API key kontrolü
6. Generic error responses

**Request Flow:**
```
Request → Size Check → Rate Limit → Parse JSON → Validate Input → Process → Response
```

## 🔐 Environment Variables

**Güvenli Saklama:**
- `.env.local` dosyası (git'e commit edilmez)
- `.env.example` template olarak kullanılır
- Production'da platform environment variables

**Gerekli Variables:**
```env
GOOGLE_API_KEY=your_api_key_here
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## 🚨 Güvenlik Best Practices

### API Key Yönetimi
- ✅ Environment variables kullan
- ✅ `.gitignore`'a `.env.local` ekle
- ✅ Production'da platform secrets kullan
- ❌ Asla kod içine hardcode etme
- ❌ Client-side'da expose etme

### Input Validation
- ✅ Her input'u validate et
- ✅ Whitelist approach kullan
- ✅ Type checking yap
- ✅ Length limits koy
- ❌ Sadece client-side validation yapma

### Error Handling
- ✅ Generic error messages
- ✅ Detailed logging (server-side)
- ✅ Status code'ları doğru kullan
- ❌ Stack trace'leri expose etme
- ❌ Internal details paylaşma

### Rate Limiting
- ✅ IP bazlı limiting
- ✅ Endpoint bazlı farklı limitler
- ✅ Retry-After header'ı ekle
- ✅ Rate limit headers kullan

## 📊 Güvenlik Metrikleri

### Rate Limit Konfigürasyonu

| Endpoint | Limit | Window | Açıklama |
|----------|-------|--------|----------|
| `/api/chat` | 10 req | 60s | Chat mesajları |
| Dua API | 5 req | 60s | Dua recommendations |
| Genel API | 30 req | 60s | Diğer endpoint'ler |

### Input Limits

| Alan | Min | Max | Açıklama |
|------|-----|-----|----------|
| Chat message | 1 | 2000 | Karakter sayısı |
| Dua situation | 3 | 500 | Karakter sayısı |
| Question | 5 | 1000 | Karakter sayısı |
| History | - | 50 | Mesaj sayısı |

## 🔍 Güvenlik Testleri

### Manuel Test Senaryoları

1. **Rate Limiting Test:**
```bash
# 10'dan fazla istek gönder
for i in {1..15}; do
  curl -X POST http://localhost:9002/api/chat \
    -H "Content-Type: application/json" \
    -d '{"message":"test"}' \
    -w "\nStatus: %{http_code}\n"
done
```

2. **XSS Test:**
```bash
curl -X POST http://localhost:9002/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"<script>alert(1)</script>"}'
# Beklenen: 400 Bad Request
```

3. **Large Payload Test:**
```bash
# 10KB'dan büyük payload
curl -X POST http://localhost:9002/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"'$(python -c 'print("A"*11000)')'"}'
# Beklenen: 413 Payload Too Large
```

4. **Invalid JSON Test:**
```bash
curl -X POST http://localhost:9002/api/chat \
  -H "Content-Type: application/json" \
  -d 'invalid json'
# Beklenen: 400 Bad Request
```

## 🛠️ Bakım ve Güncelleme

### Düzenli Kontroller
- [ ] Rate limit değerlerini gözden geçir
- [ ] Security headers'ı güncelle
- [ ] Validation rules'ları kontrol et
- [ ] Error logs'ları incele
- [ ] Dependencies'i güncelle

### Güvenlik Güncellemeleri
```bash
# Dependencies güvenlik taraması
npm audit

# Güvenlik güncellemeleri
npm audit fix
```

## 📝 Değişiklik Geçmişi

### v1.0.0 (2026-04-01)
- ✅ Rate limiting implementasyonu
- ✅ Input validation (Zod)
- ✅ Security headers middleware
- ✅ Error handling iyileştirmeleri
- ✅ API route güvenlik katmanları
- ✅ CORS yapılandırması

## 🆘 Güvenlik Sorunları

Güvenlik açığı tespit ederseniz:
1. **Asla** public issue açmayın
2. Proje sahibine özel mesaj gönderin
3. Detaylı açıklama ve PoC sağlayın
4. Sorumlu açıklama (responsible disclosure) yapın

## 📚 Kaynaklar

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/security-headers)
- [Zod Documentation](https://zod.dev/)
- [Rate Limiting Best Practices](https://www.cloudflare.com/learning/bots/what-is-rate-limiting/)