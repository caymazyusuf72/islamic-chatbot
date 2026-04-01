'use client';

import './globals.css';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { SidebarProvider, Sidebar, SidebarInset, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarFooter } from '@/components/ui/sidebar';
import { AppWrapper } from '@/components/app-wrapper';
import { Toaster } from '@/components/ui/toaster';
import { Icons } from '@/components/icons';
import { ThemeToggle } from '@/components/theme-toggle';
import { ThemePicker } from '@/components/theme-picker';
import { NavLink } from '@/components/nav-link';
import { LanguageSwitcher } from '@/components/language-switcher';
import { SkipLink } from '@/components/skip-link';
import { useLanguage } from '@/contexts/language-context';
import { ThemeProvider } from '@/contexts/theme-context';
import { FavoritesProvider } from '@/contexts/favorites-context';
import { IslamicPatternBackground } from '@/components/islamic-pattern-background';
import { PageTransition } from '@/components/page-transition';
import { getTranslation } from '@/lib/i18n';
import { reportWebVitals } from '@/lib/performance';
import { MessageCircle, BookHeart, BookOpen, Clock, Calendar, Compass, GraduationCap } from 'lucide-react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Track Web Vitals
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Dynamic import of web-vitals to avoid SSR issues
      import('web-vitals').then(({ onCLS, onFID, onLCP, onFCP, onTTFB, onINP }) => {
        onCLS(reportWebVitals);
        onFID(reportWebVitals);
        onLCP(reportWebVitals);
        onFCP(reportWebVitals);
        onTTFB(reportWebVitals);
        onINP(reportWebVitals);
      }).catch(() => {
        // Silently fail if web-vitals is not available
      });
    }
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>NurAI - Islamic AI Assistant</title>
        <meta name="description" content="Your AI assistant for Islamic knowledge, guided by the Quran and Sunnah." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#d4af37" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lateef:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider>
          <AppWrapper>
            <IslamicPatternBackground />
            <LayoutContent>{children}</LayoutContent>
          </AppWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { language, setLanguage } = useLanguage();
  const t = (key: string) => getTranslation(key, language);

  return (
    <FavoritesProvider>
      <SkipLink />
      <SidebarProvider>
        <Sidebar role="navigation" aria-label={t('accessibility.mainNavigation') || 'Main navigation'}>
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <Icons.logo className="h-8 w-8 text-primary" />
              <h1 className="text-xl font-headline font-bold">NurAI</h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <NavLink href="/">
                  <MessageCircle />
                  <span>{t('nav.aiAnswers')}</span>
                </NavLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <NavLink href="/dua">
                  <BookHeart />
                  <span>{t('nav.duaRecommendations')}</span>
                </NavLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <NavLink href="/daily-verse">
                  <BookOpen />
                  <span>{t('nav.dailyVerse')}</span>
                </NavLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <NavLink href="/prayer-times">
                  <Clock />
                  <span>{t('nav.prayerTimes')}</span>
                </NavLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <NavLink href="/calendar">
                  <Calendar />
                  <span>{t('nav.hijriCalendar')}</span>
                </NavLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <NavLink href="/qibla">
                  <Compass />
                  <span>{t('nav.qibla')}</span>
                </NavLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <NavLink href="/education">
                  <GraduationCap />
                  <span>{t('nav.education')}</span>
                </NavLink>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <div className="flex items-center gap-2">
              <LanguageSwitcher
                currentLanguage={language}
                onLanguageChange={setLanguage}
              />
              <ThemePicker />
              <ThemeToggle />
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <main id="main-content" className="h-full w-full" role="main" aria-label={t('accessibility.mainContent') || 'Main content'}>
            <PageTransition>
              {children}
            </PageTransition>
          </main>
        </SidebarInset>
      </SidebarProvider>
      <Toaster />
    </FavoritesProvider>
  );
}
