'use client';

import { useEffect, useState } from 'react';

export function IslamicPatternBackground() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    // Load pattern preference from localStorage
    const saved = localStorage.getItem('nurai-pattern-enabled');
    if (saved !== null) {
      setIsEnabled(saved === 'true');
    }
  }, []);

  if (!isEnabled) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: -1,
        opacity: 0.04,
        transform: 'translateZ(0)',
        willChange: 'transform',
      }}
      aria-hidden="true"
    >
      <svg
        className={prefersReducedMotion ? '' : 'animate-pattern-rotate'}
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="islamic-pattern"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            {/* 8-pointed star pattern */}
            <g transform="translate(50, 50)">
              {/* Outer star points */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <g key={i} transform={`rotate(${angle})`}>
                  <path
                    d="M 0,-30 L -5,-15 L 0,-10 L 5,-15 Z"
                    fill="currentColor"
                    className="text-primary"
                  />
                </g>
              ))}
              
              {/* Inner octagon */}
              <path
                d="M -10,-10 L -10,10 L 10,10 L 10,-10 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-primary"
              />
              
              {/* Center circle */}
              <circle
                cx="0"
                cy="0"
                r="3"
                fill="currentColor"
                className="text-primary"
              />
            </g>

            {/* Corner decorations */}
            {[[0, 0], [100, 0], [0, 100], [100, 100]].map(([x, y], i) => (
              <g key={`corner-${i}`} transform={`translate(${x}, ${y})`}>
                <circle
                  cx="0"
                  cy="0"
                  r="2"
                  fill="currentColor"
                  className="text-primary"
                  opacity="0.5"
                />
              </g>
            ))}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
      </svg>

      <style jsx>{`
        @keyframes pattern-rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-pattern-rotate {
          animation: pattern-rotate 120s linear infinite;
          transform-origin: center;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-pattern-rotate {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

export function usePatternToggle() {
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('nurai-pattern-enabled');
    if (saved !== null) {
      setIsEnabled(saved === 'true');
    }
  }, []);

  const togglePattern = () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    localStorage.setItem('nurai-pattern-enabled', String(newValue));
    window.dispatchEvent(new Event('storage'));
  };

  return { isEnabled, togglePattern };
}