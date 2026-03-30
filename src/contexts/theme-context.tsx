'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';
type AccentColor = 'emerald' | 'blue' | 'purple' | 'rose' | 'amber' | 'teal';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  accentColor: AccentColor;
  setTheme: (theme: Theme) => void;
  setAccentColor: (color: AccentColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEYS = {
  THEME: 'nurai-theme',
  ACCENT_COLOR: 'nurai-accent-color',
} as const;

const ACCENT_COLOR_CLASSES: Record<AccentColor, string> = {
  emerald: 'accent-emerald',
  blue: 'accent-blue',
  purple: 'accent-purple',
  rose: 'accent-rose',
  amber: 'accent-amber',
  teal: 'accent-teal',
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [accentColor, setAccentColorState] = useState<AccentColor>('emerald');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) as Theme | null;
      const savedAccent = localStorage.getItem(STORAGE_KEYS.ACCENT_COLOR) as AccentColor | null;

      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        setThemeState(savedTheme);
      }

      if (savedAccent && Object.keys(ACCENT_COLOR_CLASSES).includes(savedAccent)) {
        setAccentColorState(savedAccent);
      }
    } catch (error) {
      console.error('Error loading theme from localStorage:', error);
    }

    setMounted(true);
  }, []);

  // Resolve system theme
  useEffect(() => {
    const getSystemTheme = (): 'light' | 'dark' => {
      if (typeof window === 'undefined') return 'light';
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    const updateResolvedTheme = () => {
      const resolved = theme === 'system' ? getSystemTheme() : theme;
      setResolvedTheme(resolved);
    };

    updateResolvedTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        updateResolvedTheme();
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('light', 'dark');
    
    // Add resolved theme class
    root.classList.add(resolvedTheme);

    // Apply smooth transition
    root.style.setProperty('color-scheme', resolvedTheme);
  }, [resolvedTheme, mounted]);

  // Apply accent color to document
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    
    // Remove all accent color classes
    Object.values(ACCENT_COLOR_CLASSES).forEach(className => {
      root.classList.remove(className);
    });
    
    // Add current accent color class
    root.classList.add(ACCENT_COLOR_CLASSES[accentColor]);

    // Set CSS variables for accent color
    const accentColorMap: Record<AccentColor, { primary: string; hover: string; light: string }> = {
      emerald: { primary: '16 185 129', hover: '5 150 105', light: '167 243 208' },
      blue: { primary: '59 130 246', hover: '37 99 235', light: '191 219 254' },
      purple: { primary: '168 85 247', hover: '147 51 234', light: '233 213 255' },
      rose: { primary: '244 63 94', hover: '225 29 72', light: '254 205 211' },
      amber: { primary: '245 158 11', hover: '217 119 6', light: '253 230 138' },
      teal: { primary: '20 184 166', hover: '13 148 136', light: '153 246 228' },
    };

    const colors = accentColorMap[accentColor];
    root.style.setProperty('--accent-primary', colors.primary);
    root.style.setProperty('--accent-hover', colors.hover);
    root.style.setProperty('--accent-light', colors.light);
  }, [accentColor, mounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
    } catch (error) {
      console.error('Error saving theme to localStorage:', error);
    }
  };

  const setAccentColor = (newColor: AccentColor) => {
    setAccentColorState(newColor);
    try {
      localStorage.setItem(STORAGE_KEYS.ACCENT_COLOR, newColor);
    } catch (error) {
      console.error('Error saving accent color to localStorage:', error);
    }
  };

  // Prevent flash of unstyled content
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        accentColor,
        setTheme,
        setAccentColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}