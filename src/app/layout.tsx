import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { SidebarProvider, Sidebar, SidebarInset, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarFooter } from '@/components/ui/sidebar';
import { AppWrapper } from '@/components/app-wrapper';
import { Toaster } from '@/components/ui/toaster';
import { Icons } from '@/components/icons';
import { ThemeToggle } from '@/components/theme-toggle';
import { NavLink } from '@/components/nav-link';
import { MessageCircle, BookHeart, Clock, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'NurAI',
  description: 'Your AI assistant for Islamic knowledge, guided by the Quran and Sunnah.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lateef:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased')}>
        <AppWrapper>
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
                      <span>AI Answers</span>
                    </NavLink>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <NavLink href="/dua">
                      <BookHeart />
                      <span>Dua Recommendations</span>
                    </NavLink>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <NavLink href="/prayer-times">
                      <Clock />
                      <span>Prayer Times</span>
                    </NavLink>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <NavLink href="/calendar">
                      <Calendar />
                      <span>Hijri Calendar</span>
                    </NavLink>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarContent>
              <SidebarFooter>
                <ThemeToggle />
              </SidebarFooter>
            </Sidebar>
            <SidebarInset>
              <main className="h-full w-full">
                {children}
              </main>
            </SidebarInset>
          </SidebarProvider>
        </AppWrapper>
        <Toaster />
      </body>
    </html>
  );
}
