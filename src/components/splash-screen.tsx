'use client';

import { cn } from "@/lib/utils";

export function SplashScreen() {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-background",
        "animate-fade-out animation-delay-[2s]"
      )}
    >
      <h1
        className="animate-bismillah font-headline text-5xl md:text-7xl text-primary"
        style={{ animationDelay: '0.2s' }}
      >
        بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
      </h1>
    </div>
  );
}
