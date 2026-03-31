'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/language-context';
import { getTranslation } from '@/lib/i18n';
import { rotateVariants } from '@/lib/animations';

interface QiblaCompassProps {
  qiblaDirection: number;
  deviceHeading: number | null;
  className?: string;
}

export function QiblaCompass({
  qiblaDirection,
  deviceHeading,
  className = '',
}: QiblaCompassProps) {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(key, language);

  // Calculate the rotation needed to point Qibla arrow north
  const compassRotation = deviceHeading !== null ? -deviceHeading : 0;
  
  // Calculate Qibla arrow rotation relative to compass
  const qiblaRotation = qiblaDirection;

  return (
    <div className={`relative ${className}`}>
      {/* Compass Container */}
      <motion.div
        className="relative w-full aspect-square"
        initial="initial"
        animate="animate"
        custom={compassRotation}
        variants={rotateVariants}
      >
        {/* Compass Circle */}
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full"
          aria-label={t('qibla.compass')}
        >
          {/* Outer Circle */}
          <circle
            cx="200"
            cy="200"
            r="190"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-border"
          />

          {/* Inner Circle */}
          <circle
            cx="200"
            cy="200"
            r="170"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-border opacity-50"
          />

          {/* Cardinal Direction Markers */}
          {[0, 90, 180, 270].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 200 + 180 * Math.sin(rad);
            const y1 = 200 - 180 * Math.cos(rad);
            const x2 = 200 + 160 * Math.sin(rad);
            const y2 = 200 - 160 * Math.cos(rad);

            return (
              <line
                key={angle}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeWidth="3"
                className="text-foreground"
              />
            );
          })}

          {/* Degree Markers */}
          {Array.from({ length: 36 }, (_, i) => i * 10).map((angle) => {
            if (angle % 90 === 0) return null; // Skip cardinal directions
            
            const rad = (angle * Math.PI) / 180;
            const x1 = 200 + 180 * Math.sin(rad);
            const y1 = 200 - 180 * Math.cos(rad);
            const x2 = 200 + 170 * Math.sin(rad);
            const y2 = 200 - 170 * Math.cos(rad);

            return (
              <line
                key={angle}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeWidth="1"
                className="text-muted-foreground"
              />
            );
          })}

          {/* Cardinal Direction Labels */}
          <text
            x="200"
            y="40"
            textAnchor="middle"
            className="fill-foreground font-bold text-2xl"
          >
            {t('qibla.north')}
          </text>
          <text
            x="360"
            y="210"
            textAnchor="middle"
            className="fill-muted-foreground font-semibold text-xl"
          >
            {t('qibla.east')}
          </text>
          <text
            x="200"
            y="375"
            textAnchor="middle"
            className="fill-muted-foreground font-semibold text-xl"
          >
            {t('qibla.south')}
          </text>
          <text
            x="40"
            y="210"
            textAnchor="middle"
            className="fill-muted-foreground font-semibold text-xl"
          >
            {t('qibla.west')}
          </text>

          {/* Center Circle */}
          <circle
            cx="200"
            cy="200"
            r="15"
            fill="currentColor"
            className="text-primary"
          />
        </svg>

        {/* Qibla Direction Arrow (Green) */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial="initial"
          animate="animate"
          custom={qiblaRotation}
          variants={rotateVariants}
        >
          <svg
            viewBox="0 0 400 400"
            className="w-full h-full"
            aria-label={t('qibla.direction')}
          >
            {/* Qibla Arrow */}
            <g className="drop-shadow-lg">
              <path
                d="M 200 60 L 220 180 L 200 160 L 180 180 Z"
                fill="rgb(16, 185, 129)"
                stroke="rgb(5, 150, 105)"
                strokeWidth="2"
              />
              <circle
                cx="200"
                cy="60"
                r="8"
                fill="rgb(16, 185, 129)"
              />
            </g>

            {/* Kaaba Icon at arrow tip */}
            <g transform="translate(200, 40)">
              <rect
                x="-8"
                y="-8"
                width="16"
                height="16"
                fill="rgb(16, 185, 129)"
                stroke="rgb(5, 150, 105)"
                strokeWidth="1"
                rx="2"
              />
            </g>
          </svg>
        </motion.div>

        {/* Device Heading Arrow (Blue) - Only show if available */}
        {deviceHeading !== null && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full"
              aria-label={t('qibla.deviceHeading')}
            >
              <g className="drop-shadow-lg">
                <path
                  d="M 200 80 L 210 160 L 200 150 L 190 160 Z"
                  fill="rgb(59, 130, 246)"
                  stroke="rgb(37, 99, 235)"
                  strokeWidth="2"
                  opacity="0.7"
                />
              </g>
            </svg>
          </div>
        )}
      </motion.div>

      {/* Degree Display */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="bg-background/90 backdrop-blur-sm rounded-full px-6 py-3 border-2 border-primary shadow-lg">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">
              {Math.round(qiblaDirection)}°
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {t('qibla.direction')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}