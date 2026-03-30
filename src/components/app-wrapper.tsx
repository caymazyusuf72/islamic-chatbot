'use client';

import { useState, useEffect } from 'react';
import { SplashScreen } from './splash-screen';
import { LanguageProvider, useLanguage } from '@/contexts/language-context';

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
    return (
      <html lang="en" suppressHydrationWarning>
        <head>
          <title>NurAI</title>
          <meta name="description" content="Your AI assistant for Islamic knowledge, guided by the Quran and Sunnah." />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Lateef:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
        </head>
        <body className="font-body antialiased" />
      </html>
    );
  }

  return (
    <html lang={language} suppressHydrationWarning>
      <head>
        <title>NurAI</title>
        <meta name="description" content="Your AI assistant for Islamic knowledge, guided by the Quran and Sunnah." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lateef:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {showSplash && <SplashScreen />}
        <div className={showSplash ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
          {children}
        </div>
      </body>
    </html>
  );
}

export function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AppContent>{children}</AppContent>
    </LanguageProvider>
  );
}
