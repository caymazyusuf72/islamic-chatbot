# Vercel'e Deployment Talimatları

Bu proje Vercel'e deploy edilmeye hazır hale getirilmiştir.

## Gereksinimler

- Vercel hesabı (ücretsiz: https://vercel.com/signup)
- Google Gemini API anahtarı (https://aistudio.google.com/app/apikey)

## Deployment Adımları

### 1. Vercel CLI ile Deployment (Önerilen)

```bash
# Vercel CLI'yi global olarak yükleyin
npm install -g vercel

# Proje dizininde Vercel'e login olun
vercel login

# İlk deployment
vercel

# Production deployment
vercel --prod
```

### 2. Vercel Dashboard ile Deployment

1. https://vercel.com adresine gidin ve giriş yapın
2. "New Project" butonuna tıklayın
3. GitHub reposunu seçin: `caymazyusuf72/islamic-chatbot`
4. Framework Preset: **Next.js** (otomatik algılanacaktır)
5. Environment Variables bölümüne gidin ve şunları ekleyin:
   - `GEMINI_API_KEY`: Google Gemini API anahtarınız

6. "Deploy" butonuna tıklayın

### 3. Environment Variables Ayarlama

Vercel Dashboard'da:
1. Projenize gidin
2. Settings > Environment Variables
3. Aşağıdaki değişkeni ekleyin:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: Google Gemini API anahtarınız
   - **Environment**: Production, Preview, Development (hepsini seçin)

### 4. Custom Domain (Opsiyonel)

1. Vercel Dashboard'da projenize gidin
2. Settings > Domains
3. Kendi domain'inizi ekleyin

## Build Ayarları

Proje otomatik olarak şu ayarlarla build edilecektir:

- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

## Önemli Notlar

- `.env` dosyası `.gitignore`'da olduğu için GitHub'a yüklenmez
- Environment variables'ları mutlaka Vercel Dashboard'dan ekleyin
- Her commit otomatik olarak preview deployment oluşturur
- `main` branch'e push production deployment tetikler

## Sorun Giderme

### Build Hataları

Eğer build sırasında TypeScript veya ESLint hataları alırsanız, `next.config.ts` dosyasında zaten şu ayarlar yapılmıştır:

```typescript
typescript: {
  ignoreBuildErrors: true,
},
eslint: {
  ignoreDuringBuilds: true,
}
```

### API Key Hataları

- Gemini API anahtarınızın geçerli olduğundan emin olun
- Environment variables'ın doğru yazıldığından emin olun
- Deployment sonrası environment variables değiştirdiyseniz, projeyi yeniden deploy edin

## Deployment Sonrası

Deployment başarılı olduktan sonra:
1. Vercel size bir URL verecektir (örn: `islamic-chatbot.vercel.app`)
2. Bu URL'yi ziyaret ederek uygulamanızı test edin
3. Tüm özellikler çalışıyor mu kontrol edin

## Destek

Sorun yaşarsanız:
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Proje Issues: https://github.com/caymazyusuf72/islamic-chatbot/issues