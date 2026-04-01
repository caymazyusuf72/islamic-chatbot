'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { getTranslation } from '@/lib/i18n';
import { validateCoordinates } from '@/lib/qibla-calculator';
import { buttonVariants } from '@/lib/animations';

interface LocationInputProps {
  onLocationSelect: (lat: number, lng: number) => void;
  onUseCurrentLocation: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export function LocationInput({
  onLocationSelect,
  onUseCurrentLocation,
  loading = false,
  disabled = false,
}: LocationInputProps) {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(key, language);

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (!validateCoordinates(lat, lng)) {
      setError(t('qibla.invalidCoordinates'));
      return;
    }

    onLocationSelect(lat, lng);
  };

  return (
    <div className="space-y-4">
      {/* Use Current Location Button */}
      <motion.button
        onClick={onUseCurrentLocation}
        disabled={disabled || loading}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        aria-label={loading ? t('common.loading') : t('qibla.useMyLocation')}
        aria-busy={loading}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
            <span>{t('common.loading')}</span>
          </>
        ) : (
          <>
            <MapPin className="w-5 h-5" aria-hidden="true" />
            <span>{t('qibla.useMyLocation')}</span>
          </>
        )}
      </motion.button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {t('qibla.or')}
          </span>
        </div>
      </div>

      {/* Manual Coordinate Input */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="text-sm font-medium text-foreground mb-2">
          {t('qibla.manualLocation')}
        </div>

        <div className="space-y-2">
          <label htmlFor="latitude" className="block text-sm font-medium text-muted-foreground">
            {t('qibla.latitude')} (-90 to 90)
          </label>
          <input
            id="latitude"
            type="number"
            step="any"
            min="-90"
            max="90"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="41.0082"
            disabled={disabled || loading}
            className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            required
            aria-required="true"
            aria-invalid={!!error}
            aria-describedby={error ? 'location-error' : undefined}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="longitude" className="block text-sm font-medium text-muted-foreground">
            {t('qibla.longitude')} (-180 to 180)
          </label>
          <input
            id="longitude"
            type="number"
            step="any"
            min="-180"
            max="180"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="28.9784"
            disabled={disabled || loading}
            className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            required
            aria-required="true"
            aria-invalid={!!error}
            aria-describedby={error ? 'location-error' : undefined}
          />
        </div>

        {error && (
          <div
            id="location-error"
            role="alert"
            aria-live="polite"
            className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-lg"
          >
            {error}
          </div>
        )}

        <motion.button
          type="submit"
          disabled={disabled || loading || !latitude || !longitude}
          className="w-full px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          aria-label={t('qibla.calculate')}
        >
          {t('qibla.calculate')}
        </motion.button>
      </form>

      {/* Popular Cities (Optional) */}
      <div className="pt-2">
        <div className="text-xs text-muted-foreground mb-2">
          {t('qibla.popularCities')}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { name: 'Istanbul', lat: 41.0082, lng: 28.9784 },
            { name: 'Ankara', lat: 39.9334, lng: 32.8597 },
            { name: 'London', lat: 51.5074, lng: -0.1278 },
            { name: 'New York', lat: 40.7128, lng: -74.0060 },
          ].map((city) => (
            <button
              key={city.name}
              onClick={() => onLocationSelect(city.lat, city.lng)}
              disabled={disabled || loading}
              className="px-3 py-2 text-xs bg-muted hover:bg-muted/80 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={`Select ${city.name} location`}
            >
              {city.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}