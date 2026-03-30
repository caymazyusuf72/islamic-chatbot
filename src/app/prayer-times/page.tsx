'use client';

import { useEffect, useState } from 'react';
import { Clock, MapPin, RefreshCw, Moon, Sun, MapPinned } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getPrayerTimes, getPrayerTimesByCity, getUserLocation, getNextPrayer, type PrayerTimesData, type PrayerTimes } from '@/lib/prayer-times';
import { useLanguage } from '@/contexts/language-context';
import { getTranslation } from '@/lib/i18n';

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
    <Card className={`bg-card/80 backdrop-blur-md border ${isNext ? 'border-primary ring-2 ring-primary/20' : ''}`}>
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isNext ? 'bg-primary/20' : 'bg-muted'}`}>
            {['Fajr', 'Isha'].includes(name) && <Moon className={`w-5 h-5 ${isNext ? 'text-primary' : 'text-muted-foreground'}`} />}
            {['Sunrise'].includes(name) && <Sun className={`w-5 h-5 ${isNext ? 'text-primary' : 'text-muted-foreground'}`} />}
            {['Dhuhr', 'Asr', 'Maghrib'].includes(name) && <Clock className={`w-5 h-5 ${isNext ? 'text-primary' : 'text-muted-foreground'}`} />}
          </div>
          <div>
            <p className="font-medium">{name}</p>
            {isNext && nextPrayer && (
              <p className="text-xs text-primary font-medium">{t('prayer.nextPrayer')}: {nextPrayer.timeUntil}</p>
            )}
          </div>
        </div>
        <p className={`text-lg font-bold ${isNext ? 'text-primary' : 'text-foreground'}`}>{time}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex flex-col h-full w-full bg-background/80 backdrop-blur-sm">
      <header className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="text-primary" />
          <h1 className="text-xl font-headline font-bold tracking-wider">{t('prayer.title')}</h1>
        </div>
        <Button variant="ghost" size="icon" onClick={handleRefresh} disabled={loading} title={t('prayer.refresh')}>
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        {loading && !prayerData && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <RefreshCw className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">{t('prayer.fetchingPrayerTimes')}</p>
            </div>
          </div>
        )}

        {error && (
          <div className="max-w-md mx-auto space-y-4">
            <Card className="bg-destructive/10 border-destructive">
              <CardContent className="p-6 text-center">
                <p className="text-destructive mb-4">{error}</p>
                {!showManualInput && (
                  <div className="flex gap-2 justify-center">
                    <Button onClick={() => fetchPrayerTimes()}>{t('prayer.tryAgain')}</Button>
                    <Button variant="outline" onClick={() => setShowManualInput(true)}>
                      {t('prayer.location')}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {showManualInput && (
              <Card className="bg-card/80 backdrop-blur-md border">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPinned className="w-5 h-5 text-primary" />
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
                    />
                  </div>
                  <Button
                    onClick={fetchPrayerTimesByCity}
                    className="w-full"
                    disabled={manualLoading}
                  >
                    {manualLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>
                        <MapPin className="w-4 h-4 mr-2" />
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
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Location & Date Info */}
            <Card className="bg-card/80 backdrop-blur-md border">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <p className="font-medium">{prayerData.location.city}</p>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>{t('prayer.gregorianDate')}: {prayerData.date}</p>
                  <p>{t('prayer.hijriDate')}: {prayerData.hijriDate}</p>
                </div>
              </CardContent>
            </Card>

            {/* Next Prayer Highlight */}
            {nextPrayer && (
              <Card className="bg-primary/10 backdrop-blur-md border-primary">
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-2">{t('prayer.nextPrayer')}</p>
                  <p className="text-3xl font-bold text-primary mb-1">{nextPrayer.name}</p>
                  <p className="text-lg text-primary/80">{nextPrayer.timeUntil}</p>
                  <p className="text-sm text-muted-foreground mt-2">{nextPrayer.time}</p>
                </CardContent>
              </Card>
            )}

            {/* Prayer Times Grid */}
            <div className="grid gap-3">
              <PrayerCard name={t('prayer.fajr')} time={prayerData.times.Fajr} isNext={nextPrayer?.name === 'Fajr'} />
              <PrayerCard name={t('prayer.sunrise')} time={prayerData.times.Sunrise} isNext={nextPrayer?.name === 'Sunrise'} />
              <PrayerCard name={t('prayer.dhuhr')} time={prayerData.times.Dhuhr} isNext={nextPrayer?.name === 'Dhuhr'} />
              <PrayerCard name={t('prayer.asr')} time={prayerData.times.Asr} isNext={nextPrayer?.name === 'Asr'} />
              <PrayerCard name={t('prayer.maghrib')} time={prayerData.times.Maghrib} isNext={nextPrayer?.name === 'Maghrib'} />
              <PrayerCard name={t('prayer.isha')} time={prayerData.times.Isha} isNext={nextPrayer?.name === 'Isha'} />
            </div>

            {/* Additional Times */}
            <Card className="bg-muted/30 backdrop-blur-md border-dashed">
              <CardHeader>
                <CardTitle className="text-sm font-medium">{t('prayer.additionalTimes')}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('prayer.imsak')}</span>
                  <span className="font-medium">{prayerData.times.Imsak}</span>
                </div>
                <div className="flex justify-between">
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
