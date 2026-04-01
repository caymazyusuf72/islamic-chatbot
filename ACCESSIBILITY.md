# Erişilebilirlik (Accessibility) Dokümantasyonu

Bu doküman, NurAI projesinde uygulanan erişilebilirlik iyileştirmelerini ve WCAG 2.1 AA standartlarına uygunluğu açıklar.

## İçindekiler

1. [Genel Bakış](#genel-bakış)
2. [Uygulanan İyileştirmeler](#uygulanan-iyileştirmeler)
3. [Klavye Navigasyonu](#klavye-navigasyonu)
4. [Ekran Okuyucu Desteği](#ekran-okuyucu-desteği)
5. [ARIA Attributes](#aria-attributes)
6. [Focus Management](#focus-management)
7. [Test Rehberi](#test-rehberi)

## Genel Bakış

NurAI projesi, tüm kullanıcıların uygulamaya eşit erişim sağlaması için WCAG 2.1 AA standartlarına uygun olarak geliştirilmiştir.

### Temel Prensipler

- **Algılanabilir**: İçerik tüm kullanıcılar tarafından algılanabilir olmalı
- **Kullanılabilir**: Arayüz bileşenleri ve navigasyon kullanılabilir olmalı
- **Anlaşılabilir**: Bilgi ve kullanıcı arayüzü anlaşılabilir olmalı
- **Sağlam**: İçerik yardımcı teknolojiler tarafından yorumlanabilir olmalı

## Uygulanan İyileştirmeler

### 1. Semantic HTML

Tüm component'lerde anlamsal HTML elementleri kullanılmıştır:

```tsx
// ✅ Doğru
<button onClick={handleClick}>Click me</button>
<nav aria-label="Main navigation">...</nav>
<main id="main-content">...</main>

// ❌ Yanlış
<div onClick={handleClick}>Click me</div>
```

### 2. Skip Link

Klavye kullanıcılarının navigasyonu atlayıp doğrudan ana içeriğe geçmesini sağlar:

```tsx
// src/components/skip-link.tsx
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

### 3. Focus Trap Hook

Modal ve popup'larda focus'u içeride tutar:

```tsx
// src/hooks/use-focus-trap.ts
const containerRef = useFocusTrap(isOpen);
```

### 4. Screen Reader Only Utility

Görsel olarak gizli ama ekran okuyucular için erişilebilir içerik:

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

## Klavye Navigasyonu

### Desteklenen Kısayollar

- **Tab**: Sonraki interaktif elemente geç
- **Shift + Tab**: Önceki interaktif elemente geç
- **Enter/Space**: Button'ları ve linkleri aktive et
- **Escape**: Modal'ları ve dropdown'ları kapat
- **Arrow Keys**: Dropdown ve radio group'larda gezin

### Focus Indicators

Tüm interaktif elementlerde görünür focus indicator'lar:

```css
*:focus-visible {
  outline: 2px solid rgb(var(--accent-primary));
  outline-offset: 2px;
  border-radius: 4px;
}

button:focus-visible,
a:focus-visible,
input:focus-visible {
  outline: 3px solid hsl(var(--primary));
  outline-offset: 2px;
}
```

## Ekran Okuyucu Desteği

### ARIA Labels

Tüm interaktif elementlerde açıklayıcı label'lar:

```tsx
<button aria-label="Close notification">
  <X className="h-4 w-4" aria-hidden="true" />
</button>
```

### ARIA Live Regions

Dinamik içerik güncellemeleri için:

```tsx
// Toast notifications
<div role="alert" aria-live="assertive" aria-atomic="true">
  {message}
</div>

// Quiz feedback
<div role="status" aria-live="polite">
  {explanation}
</div>
```

### ARIA States

Element durumlarını bildirmek için:

```tsx
<button
  aria-pressed={isActive}
  aria-expanded={isOpen}
  aria-checked={isSelected}
>
  Toggle
</button>
```

## ARIA Attributes

### Navigation

```tsx
<nav role="navigation" aria-label="Main navigation">
  <Link href="/" aria-current={isActive ? 'page' : undefined}>
    Home
  </Link>
</nav>
```

### Forms

```tsx
<input
  id="email"
  type="email"
  aria-required="true"
  aria-invalid={hasError}
  aria-describedby={hasError ? 'email-error' : undefined}
/>
{hasError && (
  <div id="email-error" role="alert">
    {errorMessage}
  </div>
)}
```

### Interactive Components

```tsx
// Dropdown
<DropdownMenu>
  <DropdownMenuTrigger aria-label="Language options">
    <Globe aria-hidden="true" />
  </DropdownMenuTrigger>
  <DropdownMenuContent aria-label="Language options">
    <DropdownMenuItem role="menuitemradio" aria-checked={isSelected}>
      English
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

// Quiz
<div role="radiogroup" aria-labelledby="quiz-question">
  <button role="radio" aria-checked={isSelected}>
    Option A
  </button>
</div>
```

## Focus Management

### Modal Focus Trap

```tsx
import { useFocusTrap } from '@/hooks/use-focus-trap';

function Modal({ isOpen, onClose }) {
  const containerRef = useFocusTrap(isOpen);
  
  return (
    <div ref={containerRef} role="dialog" aria-modal="true">
      {/* Modal content */}
    </div>
  );
}
```

### Focus Restoration

Modal kapandığında focus önceki elemente döner:

```tsx
useEffect(() => {
  if (!isActive) return;
  
  const previouslyFocusedElement = document.activeElement;
  
  return () => {
    previouslyFocusedElement?.focus();
  };
}, [isActive]);
```

## Test Rehberi

### Manuel Test Checklist

#### Klavye Navigasyonu
- [ ] Tab ile tüm interaktif elementlere erişilebiliyor
- [ ] Focus indicators görünür ve net
- [ ] Skip link çalışıyor
- [ ] Modal'larda focus trap çalışıyor
- [ ] Escape ile modal'lar kapanıyor

#### Ekran Okuyucu
- [ ] NVDA/JAWS ile navigation yapılabiliyor
- [ ] Tüm button'lar ve linkler tanımlanıyor
- [ ] Form hataları duyuruluyor
- [ ] Dynamic content güncellemeleri bildiriliyor
- [ ] ARIA labels doğru okunuyor

#### Görsel
- [ ] Renk kontrastı yeterli (4.5:1 minimum)
- [ ] Focus indicators görünür
- [ ] Text büyütülebiliyor (%200'e kadar)
- [ ] Layout responsive

### Otomatik Test Araçları

1. **axe DevTools**: Chrome/Firefox extension
2. **WAVE**: Web accessibility evaluation tool
3. **Lighthouse**: Chrome DevTools accessibility audit
4. **Pa11y**: Command-line accessibility testing

### Test Komutları

```bash
# Lighthouse audit
npm run lighthouse

# axe-core test
npm run test:a11y
```

## Bilinen Sınırlamalar

1. **Renk Kontrastı**: Bazı accent color kombinasyonları minimum kontrast oranını sağlamayabilir
2. **Dinamik İçerik**: Çok hızlı değişen içerikler ekran okuyucu kullanıcıları için zorlayıcı olabilir
3. **Karmaşık Etkileşimler**: Bazı animasyonlar reduced-motion tercihinde devre dışı bırakılmalı

## Gelecek İyileştirmeler

- [ ] Daha fazla klavye kısayolu
- [ ] Gelişmiş focus management
- [ ] Daha iyi error handling
- [ ] Accessibility settings sayfası
- [ ] High contrast mode desteği

## Kaynaklar

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM](https://webaim.org/)

## İletişim

Erişilebilirlik ile ilgili sorunlar için lütfen GitHub Issues üzerinden bildirim yapın.