'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface UsePageLoadingReturn {
  isLoading: boolean;
  progress: number;
}

export function usePageLoading(): UsePageLoadingReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const loadingTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Cleanup function
    const cleanup = () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
        progressInterval.current = null;
      }
      if (loadingTimeout.current) {
        clearTimeout(loadingTimeout.current);
        loadingTimeout.current = null;
      }
    };

    // Sayfa değişikliği algılandı
    if (pathname !== previousPathname.current) {
      cleanup();
      
      // Loading başlat
      setIsLoading(true);
      setProgress(0);

      // Progress simülasyonu
      let currentProgress = 0;
      const startTime = Date.now();
      const minDuration = 500; // Minimum 500ms
      const maxDuration = 2000; // Maksimum 2000ms
      
      // Gerçekçi progress artışı için değişken hızlar
      const progressSteps = [
        { until: 30, speed: 50 },   // İlk %30'a hızlı ulaş
        { until: 60, speed: 100 },  // %60'a orta hızda
        { until: 90, speed: 150 },  // %90'a yavaşla
        { until: 95, speed: 300 },  // %95'te çok yavaş
      ];

      progressInterval.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        
        // Progress artış hızını belirle
        let speed = 300;
        for (const step of progressSteps) {
          if (currentProgress < step.until) {
            speed = step.speed;
            break;
          }
        }

        // Progress artır
        if (currentProgress < 95) {
          const increment = Math.random() * 3 + 1; // 1-4 arası rastgele artış
          currentProgress = Math.min(currentProgress + increment, 95);
          setProgress(Math.floor(currentProgress));
        }

        // Minimum süre doldu ve %90'a ulaştıysa tamamla
        if (elapsed >= minDuration && currentProgress >= 90) {
          currentProgress = 100;
          setProgress(100);
          
          // Loading'i kapat
          loadingTimeout.current = setTimeout(() => {
            setIsLoading(false);
            setProgress(0);
          }, 300);
          
          cleanup();
        }

        // Maksimum süre aşıldıysa zorla tamamla
        if (elapsed >= maxDuration) {
          currentProgress = 100;
          setProgress(100);
          
          loadingTimeout.current = setTimeout(() => {
            setIsLoading(false);
            setProgress(0);
          }, 300);
          
          cleanup();
        }
      }, 50);

      previousPathname.current = pathname;
    }

    return cleanup;
  }, [pathname]);

  return { isLoading, progress };
}