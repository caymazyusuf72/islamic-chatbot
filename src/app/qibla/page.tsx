'use client';

import { useState, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Compass, MapPin, AlertCircle, Info, Smartphone, Map } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { getTranslation } from '@/lib/i18n';
import { QiblaCompass } from '@/components/qibla-compass';
import { LocationInput } from '@/components/location-input';
import { useGeolocation } from '@/hooks/use-geolocation';
import { useDeviceOrientation, getCompassHeading } from '@/hooks/use-device-orientation';
import { useTheme } from 'next-themes';
import {
  calculateQiblaDirection,
  calculateDistanceToKaaba,
  getCardinalDirection,
  getLocationName,
} from '@/lib/qibla-calculator';
import { pageVariants, cardVariants } from '@/lib/animations';
import { QiblaMapSkeleton } from '@/components/loading-skeletons';

// Lazy load map component to avoid SSR issues
const QiblaMap = lazy(() => import('@/components/qibla-map').then(mod => ({ default: mod.QiblaMap })));

export default function QiblaPage() {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(key, language);
  const { theme } = useTheme();

  const geolocation = useGeolocation();
  const orientation = useDeviceOrientation();

  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [locationName, setLocationName] = useState<string>('');
  const [showLocationInput, setShowLocationInput] = useState(true);
  const [viewMode, setViewMode] = useState<'compass' | 'map'>('compass');

  // Calculate Qibla when location is available
  useEffect(() => {
    if (geolocation.latitude !== null && geolocation.longitude !== null) {
      const direction = calculateQiblaDirection(
        geolocation.latitude,
        geolocation.longitude
      );
      const dist = calculateDistanceToKaaba(
        geolocation.latitude,
        geolocation.longitude
      );

      setQiblaDirection(direction);
      setDistance(dist);
      setShowLocationInput(false);

      // Get location name
      getLocationName(geolocation.latitude, geolocation.longitude).then(
        setLocationName
      );
    }
  }, [geolocation.latitude, geolocation.longitude]);

  const handleUseCurrentLocation = () => {
    geolocation.requestLocation();
  };

  const handleManualLocation = (lat: number, lng: number) => {
    const direction = calculateQiblaDirection(lat, lng);
    const dist = calculateDistanceToKaaba(lat, lng);

    setQiblaDirection(direction);
    setDistance(dist);
    setShowLocationInput(false);

    getLocationName(lat, lng).then(setLocationName);
  };

  const compassHeading = getCompassHeading(orientation.alpha);

  return (
    <motion.div
      className="min-h-screen bg-background p-4 md:p-8"
      initial="initial"
      animate="animate"
      variants={pageVariants}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Compass className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-headline font-bold">
              {t('qibla.title')}
            </h1>
          </div>
          <p className="text-muted-foreground">
            {t('qibla.description')}
          </p>
        </div>

        {/* Location Input or Compass View */}
        {showLocationInput ? (
          <motion.div
            className="bg-card border border-border rounded-xl p-6 shadow-lg"
            variants={cardVariants}
          >
            <LocationInput
              onLocationSelect={handleManualLocation}
              onUseCurrentLocation={handleUseCurrentLocation}
              loading={geolocation.loading}
              disabled={geolocation.loading}
            />

            {/* Geolocation Error */}
            {geolocation.error && (
              <div className="mt-4 flex items-start gap-2 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-medium text-destructive">
                    {t('qibla.permissionDenied')}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {t('qibla.permissionInstructions')}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <>
            {/* Location Info */}
            <motion.div
              className="bg-card border border-border rounded-xl p-4 shadow-lg"
              variants={cardVariants}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">
                      {t('qibla.yourLocation')}
                    </div>
                    <div className="font-medium">{locationName}</div>
                  </div>
                </div>
                <button
                  onClick={() => setShowLocationInput(true)}
                  className="text-sm text-primary hover:underline"
                >
                  {t('qibla.change')}
                </button>
              </div>
            </motion.div>

            {/* View Mode Toggle */}
            <motion.div
              className="bg-card border border-border rounded-xl p-2 shadow-lg flex gap-2"
              variants={cardVariants}
            >
              <button
                onClick={() => setViewMode('compass')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                  viewMode === 'compass'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                <Compass className="w-5 h-5" />
                <span className="hidden sm:inline">{t('qibla.compass')}</span>
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                  viewMode === 'map'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                <Map className="w-5 h-5" />
                <span className="hidden sm:inline">{t('qibla.map')}</span>
              </button>
            </motion.div>

            {/* Qibla Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                className="bg-card border border-border rounded-xl p-4 shadow-lg"
                variants={cardVariants}
              >
                <div className="text-sm text-muted-foreground mb-1">
                  {t('qibla.direction')}
                </div>
                <div className="text-2xl font-bold text-primary">
                  {qiblaDirection !== null && (
                    <>
                      {Math.round(qiblaDirection)}° {t(getCardinalDirection(qiblaDirection))}
                    </>
                  )}
                </div>
              </motion.div>

              <motion.div
                className="bg-card border border-border rounded-xl p-4 shadow-lg"
                variants={cardVariants}
              >
                <div className="text-sm text-muted-foreground mb-1">
                  {t('qibla.distance')}
                </div>
                <div className="text-2xl font-bold text-primary">
                  {distance !== null && `${distance.toLocaleString()} km`}
                </div>
              </motion.div>
            </div>

            {/* Compass or Map View */}
            {qiblaDirection !== null && (
              <motion.div
                className="bg-card border border-border rounded-xl p-6 shadow-lg"
                variants={cardVariants}
              >
                {viewMode === 'compass' ? (
                  <QiblaCompass
                    qiblaDirection={qiblaDirection}
                    deviceHeading={compassHeading}
                    className="max-w-md mx-auto"
                  />
                ) : (
                  <div className="w-full h-[500px] md:h-[600px]">
                    <Suspense fallback={<QiblaMapSkeleton />}>
                      <QiblaMap
                        userLocation={{
                          lat: geolocation.latitude!,
                          lng: geolocation.longitude!,
                        }}
                        qiblaDirection={qiblaDirection}
                        distance={distance!}
                        isDarkMode={theme === 'dark'}
                      />
                    </Suspense>
                  </div>
                )}
              </motion.div>
            )}

            {/* Device Orientation Instructions */}
            {!orientation.supported && (
              <motion.div
                className="flex items-start gap-2 p-4 bg-muted rounded-lg"
                variants={cardVariants}
              >
                <Info className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="flex-1 text-sm text-muted-foreground">
                  {t('qibla.notSupported')}
                </div>
              </motion.div>
            )}

            {orientation.supported && !orientation.permissionGranted && (
              <motion.div
                className="bg-card border border-border rounded-xl p-6 shadow-lg"
                variants={cardVariants}
              >
                <div className="text-center space-y-4">
                  <Smartphone className="w-12 h-12 text-primary mx-auto" />
                  <div>
                    <div className="font-medium mb-2">
                      {t('qibla.enableCompass')}
                    </div>
                    <div className="text-sm text-muted-foreground mb-4">
                      {t('qibla.compassInstructions')}
                    </div>
                    <button
                      onClick={orientation.requestPermission}
                      disabled={orientation.loading}
                      className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {orientation.loading
                        ? t('common.loading')
                        : t('qibla.enableCompass')}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {orientation.needsCalibration && orientation.permissionGranted && (
              <motion.div
                className="flex items-start gap-2 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg"
                variants={cardVariants}
              >
                <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-medium text-amber-600 dark:text-amber-400">
                    {t('qibla.calibrate')}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {t('qibla.calibrationInstructions')}
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}

        {/* Info Section */}
        <motion.div
          className="bg-muted/50 rounded-xl p-4 text-sm text-muted-foreground"
          variants={cardVariants}
        >
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div>
              {t('qibla.info')}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}