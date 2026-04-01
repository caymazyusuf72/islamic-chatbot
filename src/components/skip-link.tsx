'use client';

import { useLanguage } from '@/contexts/language-context';
import { getTranslation } from '@/lib/i18n';

/**
 * Skip to main content link for keyboard navigation
 * Allows users to bypass navigation and jump directly to main content
 */
export function SkipLink() {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(key, language);

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-6 focus:py-3 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:shadow-lg focus:font-semibold"
    >
      {t('accessibility.skipToMain') || 'Skip to main content'}
    </a>
  );
}