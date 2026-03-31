'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/theme-context';
import { useLanguage } from '@/contexts/language-context';
import { getTranslation } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Palette, Check, Sun, Moon, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type AccentColor = 'emerald' | 'blue' | 'purple' | 'rose' | 'amber' | 'teal';
type Theme = 'light' | 'dark' | 'system';

const accentColors: { name: AccentColor; color: string; label: string }[] = [
  { name: 'emerald', color: 'rgb(16, 185, 129)', label: 'Emerald' },
  { name: 'blue', color: 'rgb(59, 130, 246)', label: 'Blue' },
  { name: 'purple', color: 'rgb(168, 85, 247)', label: 'Purple' },
  { name: 'rose', color: 'rgb(244, 63, 94)', label: 'Rose' },
  { name: 'amber', color: 'rgb(245, 158, 11)', label: 'Amber' },
  { name: 'teal', color: 'rgb(20, 184, 166)', label: 'Teal' },
];

const themeOptions: { value: Theme; icon: typeof Sun; label: string }[] = [
  { value: 'light', icon: Sun, label: 'Light' },
  { value: 'dark', icon: Moon, label: 'Dark' },
  { value: 'system', icon: Monitor, label: 'System' },
];

export function ThemePicker() {
  const [open, setOpen] = useState(false);
  const { theme, accentColor, setTheme, setAccentColor } = useTheme();
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(key, language);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label={t('theme.customize')}
        >
          <Palette className="h-5 w-5" />
          <span className="sr-only">{t('theme.customize')}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Theme Selection */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">{t('nav.settings')}</h4>
              <div className="grid grid-cols-3 gap-2">
                {themeOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <motion.button
                      key={option.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setTheme(option.value)}
                      className={`
                        relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all
                        ${
                          theme === option.value
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }
                      `}
                      aria-label={t(`theme.${option.value}`)}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-xs font-medium">
                        {t(`theme.${option.value}`)}
                      </span>
                      {theme === option.value && (
                        <motion.div
                          layoutId="theme-indicator"
                          className="absolute -top-1 -right-1 bg-primary rounded-full p-0.5"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        >
                          <Check className="h-3 w-3 text-primary-foreground" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Accent Color Selection */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">{t('theme.accentColor')}</h4>
              <div className="grid grid-cols-6 gap-2">
                {accentColors.map((color) => (
                  <motion.button
                    key={color.name}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setAccentColor(color.name)}
                    className={`
                      relative w-10 h-10 rounded-full border-2 transition-all
                      ${
                        accentColor === color.name
                          ? 'border-foreground ring-2 ring-offset-2 ring-foreground'
                          : 'border-border hover:border-foreground/50'
                      }
                    `}
                    style={{ backgroundColor: color.color }}
                    aria-label={color.label}
                  >
                    {accentColor === color.name && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <Check className="h-5 w-5 text-white drop-shadow-lg" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Info Text */}
            <p className="text-xs text-muted-foreground">
              {t('theme.customize')}
            </p>
          </motion.div>
        </AnimatePresence>
      </PopoverContent>
    </Popover>
  );
}