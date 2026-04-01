'use client';

import { Languages, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { getTranslation, type Language } from '@/lib/i18n';

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

const languages: Array<{ code: Language; name: string; flag: string }> = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];

export function LanguageSwitcher({ currentLanguage, onLanguageChange }: LanguageSwitcherProps) {
  const { toast } = useToast();

  const handleLanguageChange = (lang: Language) => {
    onLanguageChange(lang);
    localStorage.setItem('nurai-language', lang);
    toast({
      title: 'Language Changed',
      description: `Language switched to ${languages.find(l => l.code === lang)?.name}`,
    });
  };

  const currentLang = languages.find(l => l.code === currentLanguage);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          aria-label={`Current language: ${currentLang?.name}. Click to change language`}
        >
          <Globe className="w-4 h-4" aria-hidden="true" />
          <span className="hidden sm:inline">{currentLang?.name}</span>
          <span className="sm:hidden" aria-label={currentLang?.name}>{currentLang?.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" aria-label="Language options">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={currentLanguage === lang.code ? 'bg-accent' : ''}
            role="menuitemradio"
            aria-checked={currentLanguage === lang.code}
          >
            <span className="mr-2" aria-hidden="true">{lang.flag}</span>
            {lang.name}
            {currentLanguage === lang.code && (
              <span className="sr-only"> (selected)</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}