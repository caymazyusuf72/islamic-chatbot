'use client';

import './globals.css';
import { cn } from '@/lib/utils';
import { SidebarProvider, Sidebar, SidebarInset, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarFooter } from '@/components/ui/sidebar';
import { AppWrapper } from '@/components/app-wrapper';
import { Toaster } from '@/components/ui/toaster';
import { Icons } from '@/components/icons';
import { ThemeToggle } from '@/components/theme-toggle';
import { NavLink } from '@/components/nav-link';
import { LanguageSwitcher } from '@/components/language-switcher';
import { useLanguage } from '@/contexts/language-context';
import { getTranslation } from '@/lib/i18n';
import { MessageCircle, BookHeart, Clock, Calendar } from 'lucide-react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppWrapper>
      <LayoutContent>{children}</LayoutContent>
    </AppWrapper>
  );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { language, setLanguage } = useLanguage();
  const t = (key: string) => getTranslation(key, language);

  return (
    <>
      <SidebarProvider>
        <Sidebar>
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
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <div className="flex items-center gap-2">
              <LanguageSwitcher
                currentLanguage={language}
                onLanguageChange={setLanguage}
              />
              <ThemeToggle />
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <main className="h-full w-full">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
      <Toaster />
    </>
  );
}
