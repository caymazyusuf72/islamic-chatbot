'use client';

import { useEffect, useState } from 'react';
import { Clock, MapPin, RefreshCw, Moon, Sun, MapPinned } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getPrayerTimes, getPrayerTimesByCity, getUserLocation, getNextPrayer, type PrayerTimesData, type PrayerTimes } from '@/lib/prayer-times';
import { useLanguage } from '@/contexts/language-context';
import { getTranslation } from '@/lib/i18n';
import { PrayerTimesPageSkeleton, ErrorDisplay } from '@/components/loading-skeletons';

export default function PrayerTimesPage() {
  const [prayerData, setPrayerData] = useState<PrayerTimesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [showManualInput, setShowManualInput] = useState(false);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [manualLoading, setManualLoading] = useState(false);
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(key, language);

  const fetchPrayerTimes = async (lat?: number, lon?: number) => {
    try {
      setLoading(true);
      setError(null);
      
      let coords: { latitude: number; longitude: number };
      if (lat && lon) {
        coords = { latitude: lat, longitude: lon };
      } else {
        const position = await getUserLocation();
        coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
      }
      setLocation(coords);
      
      const data = await getPrayerTimes(coords.latitude, coords.longitude);
      if (data) {
        setPrayerData(data);
        setShowManualInput(false);
      } else {
        setError(t('prayer.failedToFetch'));
      }
    } catch (err) {
      console.error('Error:', err);
      if (err instanceof Error) {
        if (err.message.includes('Geolocation') || err.message.includes('denied')) {
          setError(t('prayer.locationAccessDenied'));
          setShowManualInput(true);
        } else {
          setError(err.message);
        }
      } else {
        setError(t('prayer.locationAccessDenied'));
        setShowManualInput(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchPrayerTimesByCity = async () => {
    if (!city.trim() || !country.trim()) {
      setError('Please enter both city and country');
      return;
    }

    try {
      setManualLoading(true);
      setError(null);
      
      const data = await getPrayerTimesByCity(city.trim(), country.trim());
      if (data) {
        setPrayerData(data);
        setShowManualInput(false);
      } else {
        setError(t('prayer.failedToFetch'));
      }
    } catch (err) {
      console.error('Error:', err);
      setError(t('prayer.failedToFetch'));
    } finally {
      setManualLoading(false);
    }
  };

  useEffect(() => {
    fetchPrayerTimes();
  }, []);

  const handleRefresh = () => {
    if (location) {
      fetchPrayerTimes(location.latitude, location.longitude);
    } else {
      fetchPrayerTimes();
    }
  };

  const nextPrayer = prayerData ? getNextPrayer(prayerData.times) : null;

  const PrayerCard = ({ name, time, isNext = false }: { name: string; time: string; isNext?: boolean }) => (
    <Card
      className={`bg-card/80 backdrop-blur-md border transition-smooth hover-lift ${isNext ? 'border-primary ring-2 ring-primary/20' : ''}`}
      role="article"
      aria-label={`${name} prayer time: ${time}${isNext ? ' - Next prayer' : ''}`}
    >
      <CardContent className="p-4 sm:p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors ${isNext ? 'bg-primary/20' : 'bg-muted'}`}
            aria-hidden="true"
          >
            {['Fajr', 'Isha'].includes(name) && <Moon className={`w-5 h-5 sm:w-6 sm:h-6 ${isNext ? 'text-primary' : 'text-muted-foreground'}`} />}
            {['Sunrise'].includes(name) && <Sun className={`w-5 h-5 sm:w-6 sm:h-6 ${isNext ? 'text-primary' : 'text-muted-foreground'}`} />}
            {['Dhuhr', 'Asr', 'Maghrib'].includes(name) && <Clock className={`w-5 h-5 sm:w-6 sm:h-6 ${isNext ? 'text-primary' : 'text-muted-foreground'}`} />}
          </div>
          <div>
            <p className="font-medium text-sm sm:text-base">{name}</p>
            {isNext && nextPrayer && (
              <p className="text-xs sm:text-sm text-primary font-medium">{t('prayer.nextPrayer')}: {nextPrayer.timeUntil}</p>
            )}
          </div>
        </div>
        <p className={`text-lg sm:text-xl font-bold ${isNext ? 'text-primary' : 'text-foreground'}`}>{time}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex flex-col h-full w-full bg-background/80 backdrop-blur-sm page-enter">
      <header className="p-4 border-b flex items-center justify-between" role="banner">
        <div className="flex items-center gap-2">
          <Clock className="text-primary" aria-hidden="true" />
          <h1 className="text-lg sm:text-xl font-headline font-bold tracking-wider">{t('prayer.title')}</h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRefresh}
          disabled={loading}
          aria-label={t('prayer.refresh')}
          className="focus-ring"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" />
        </Button>
      </header>

      <div className="flex-1 overflow-y-auto p-4" role="main">
        {loading && !prayerData && <PrayerTimesPageSkeleton />}

        {error && (
          <div className="max-w-md mx-auto space-y-4 animate-fade-in">
            <ErrorDisplay
              message={error}
              onRetry={!showManualInput ? () => fetchPrayerTimes() : undefined}
              retryLabel={t('prayer.tryAgain')}
            />
            {!showManualInput && (
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => setShowManualInput(true)}
                  className="focus-ring"
                >
                  <MapPinned className="w-4 h-4 mr-2" aria-hidden="true" />
                  {t('prayer.location')}
                </Button>
              </div>
            )}

            {showManualInput && (
              <Card className="bg-card/80 backdrop-blur-md border animate-slide-in">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPinned className="w-5 h-5 text-primary" aria-hidden="true" />
                    {t('prayer.location')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="city" className="text-sm font-medium">
                      City
                    </label>
                    <Input
                      id="city"
                      placeholder="e.g., Istanbul, London, New York"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && fetchPrayerTimesByCity()}
                      className="focus-ring"
                      aria-required="true"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="country" className="text-sm font-medium">
                      Country
                    </label>
                    <Input
                      id="country"
                      placeholder="e.g., Turkey, United Kingdom, USA"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && fetchPrayerTimesByCity()}
                      className="focus-ring"
                      aria-required="true"
                    />
                  </div>
                  <Button
                    onClick={fetchPrayerTimesByCity}
                    className="w-full focus-ring"
                    disabled={manualLoading}
                    aria-label="Get prayer times for entered location"
                  >
                    {manualLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
                        Loading...
                      </>
                    ) : (
                      <>
                        <MapPin className="w-4 h-4 mr-2" aria-hidden="true" />
                        Get Prayer Times
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {prayerData && (
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 animate-fade-in">
            {/* Location & Date Info */}
            <Card className="bg-card/80 backdrop-blur-md border hover-lift" role="region" aria-label="Location and date information">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-primary" aria-hidden="true" />
                  <p className="font-medium text-sm sm:text-base">{prayerData.location.city}</p>
                </div>
                <div className="space-y-1 text-xs sm:text-sm text-muted-foreground">
                  <p>{t('prayer.gregorianDate')}: {prayerData.date}</p>
                  <p>{t('prayer.hijriDate')}: {prayerData.hijriDate}</p>
                </div>
              </CardContent>
            </Card>

            {/* Next Prayer Highlight */}
            {nextPrayer && (
              <Card
                className="bg-primary/10 backdrop-blur-md border-primary hover-scale"
                role="region"
                aria-label="Next prayer information"
              >
                <CardContent className="p-4 sm:p-6 text-center">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-2">{t('prayer.nextPrayer')}</p>
                  <p className="text-2xl sm:text-3xl font-bold text-primary mb-1">{nextPrayer.name}</p>
                  <p className="text-base sm:text-lg text-primary/80">{nextPrayer.timeUntil}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2">{nextPrayer.time}</p>
                </CardContent>
              </Card>
            )}

            {/* Prayer Times Grid */}
            <div className="grid gap-2 sm:gap-3" role="list" aria-label="Prayer times">
              <PrayerCard name={t('prayer.fajr')} time={prayerData.times.Fajr} isNext={nextPrayer?.name === 'Fajr'} />
              <PrayerCard name={t('prayer.sunrise')} time={prayerData.times.Sunrise} isNext={nextPrayer?.name === 'Sunrise'} />
              <PrayerCard name={t('prayer.dhuhr')} time={prayerData.times.Dhuhr} isNext={nextPrayer?.name === 'Dhuhr'} />
              <PrayerCard name={t('prayer.asr')} time={prayerData.times.Asr} isNext={nextPrayer?.name === 'Asr'} />
              <PrayerCard name={t('prayer.maghrib')} time={prayerData.times.Maghrib} isNext={nextPrayer?.name === 'Maghrib'} />
              <PrayerCard name={t('prayer.isha')} time={prayerData.times.Isha} isNext={nextPrayer?.name === 'Isha'} />
            </div>

            {/* Additional Times */}
            <Card className="bg-muted/30 backdrop-blur-md border-dashed hover-lift" role="region" aria-label="Additional prayer times">
              <CardHeader>
                <CardTitle className="text-sm sm:text-base font-medium">{t('prayer.additionalTimes')}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-2 text-xs sm:text-sm">
                <div className="flex justify-between items-center p-2 rounded bg-background/50">
                  <span className="text-muted-foreground">{t('prayer.imsak')}</span>
                  <span className="font-medium">{prayerData.times.Imsak}</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-background/50">
                  <span className="text-muted-foreground">{t('prayer.midnight')}</span>
                  <span className="font-medium">{prayerData.times.Midnight}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
