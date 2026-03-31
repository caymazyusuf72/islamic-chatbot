'use client';

import { useState, useEffect } from 'react';
import { SplashScreen } from './splash-screen';
import { LanguageProvider, useLanguage } from '@/contexts/language-context';
import { ProgressProvider } from '@/contexts/progress-context';

function AppContent({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (sessionStorage.getItem('splashShown')) {
        setShowSplash(false);
      } else {
        setShowSplash(true);
        const timer = setTimeout(() => {
          setShowSplash(false);
          sessionStorage.setItem('splashShown', 'true');
        }, 2500);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {showSplash && <SplashScreen />}
      <div className={showSplash ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
        {children}
      </div>
    </>
  );
}

export function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ProgressProvider>
        <AppContent>{children}</AppContent>
      </ProgressProvider>
    </LanguageProvider>
  );
}
