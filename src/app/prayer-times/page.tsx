'use client';

import { useEffect, useState } from 'react';
import { Clock, MapPin, RefreshCw, Moon, Sun } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getPrayerTimes, getUserLocation, getNextPrayer, type PrayerTimesData, type PrayerTimes } from '@/lib/prayer-times';

export default function PrayerTimesPage() {
  const [prayerData, setPrayerData] = useState<PrayerTimesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  const fetchPrayerTimes = async (lat?: number, lon?: number) => {
    try {
      setLoading(true);
      setError(null);
      
      const coords = lat && lon ? { latitude: lat, longitude: lon } : await getUserLocation();
      setLocation(coords);
      
      const data = await getPrayerTimes(coords.latitude, coords.longitude);
      if (data) {
        setPrayerData(data);
      } else {
        setError('Failed to fetch prayer times');
      }
    } catch (err) {
      console.error('Error:', err);
      if (err instanceof Error) {
        if (err.name === 'GeolocationPositionError') {
          setError('Location access denied. Please enable location services.');
        } else {
          setError(err.message);
        }
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrayerTimes();
  }, []);

  const handleRefresh = () => {
    if (location) {
      fetchPrayerTimes(location.latitude, location.longitude);
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
              <p className="text-xs text-primary font-medium">Next: {nextPrayer.timeUntil}</p>
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
          <h1 className="text-xl font-headline font-bold tracking-wider">Prayer Times</h1>
        </div>
        <Button variant="ghost" size="icon" onClick={handleRefresh} disabled={loading}>
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        {loading && !prayerData && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <RefreshCw className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Fetching prayer times...</p>
            </div>
          </div>
        )}

        {error && (
          <Card className="w-full max-w-md mx-auto bg-destructive/10 border-destructive">
            <CardContent className="p-6 text-center">
              <p className="text-destructive mb-4">{error}</p>
              <Button onClick={() => fetchPrayerTimes()}>Try Again</Button>
            </CardContent>
          </Card>
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
                  <p>Gregorian: {prayerData.date}</p>
                  <p>Hijri: {prayerData.hijriDate}</p>
                </div>
              </CardContent>
            </Card>

            {/* Next Prayer Highlight */}
            {nextPrayer && (
              <Card className="bg-primary/10 backdrop-blur-md border-primary">
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-2">Next Prayer</p>
                  <p className="text-3xl font-bold text-primary mb-1">{nextPrayer.name}</p>
                  <p className="text-lg text-primary/80">in {nextPrayer.timeUntil}</p>
                  <p className="text-sm text-muted-foreground mt-2">at {nextPrayer.time}</p>
                </CardContent>
              </Card>
            )}

            {/* Prayer Times Grid */}
            <div className="grid gap-3">
              <PrayerCard name="Fajr" time={prayerData.times.Fajr} isNext={nextPrayer?.name === 'Fajr'} />
              <PrayerCard name="Sunrise" time={prayerData.times.Sunrise} isNext={nextPrayer?.name === 'Sunrise'} />
              <PrayerCard name="Dhuhr" time={prayerData.times.Dhuhr} isNext={nextPrayer?.name === 'Dhuhr'} />
              <PrayerCard name="Asr" time={prayerData.times.Asr} isNext={nextPrayer?.name === 'Asr'} />
              <PrayerCard name="Maghrib" time={prayerData.times.Maghrib} isNext={nextPrayer?.name === 'Maghrib'} />
              <PrayerCard name="Isha" time={prayerData.times.Isha} isNext={nextPrayer?.name === 'Isha'} />
            </div>

            {/* Additional Times */}
            <Card className="bg-muted/30 backdrop-blur-md border-dashed">
              <CardHeader>
                <CardTitle className="text-sm font-medium">Additional Times</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Imsak</span>
                  <span className="font-medium">{prayerData.times.Imsak}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Midnight</span>
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
