/**
 * Prayer Times Utility Functions
 * Uses Aladhan API for accurate prayer times based on location
 */

export interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Sunrise: string;
  Imsak: string;
  Midnight: string;
}

export interface PrayerTimesData {
  date: string;
  hijriDate: string;
  times: PrayerTimes;
  location: {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
  };
}

/**
 * Fetch prayer times from Aladhan API using coordinates
 */
export async function getPrayerTimes(
  latitude: number,
  longitude: number,
  method: number = 2
): Promise<PrayerTimesData | null> {
  try {
    const date = new Date();
    const response = await fetch(
      `https://api.aladhan.com/v1/timings/${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}?latitude=${latitude}&longitude=${longitude}&method=${method}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch prayer times');
    }

    const data = await response.json();
    const timings = data.data.timings;
    const dateInfo = data.data.date;

    return {
      date: dateInfo.readable,
      hijriDate: `${dateInfo.hijri.day} ${dateInfo.hijri.month.en} ${dateInfo.hijri.year}`,
      times: {
        Fajr: timings.Fajr,
        Dhuhr: timings.Dhuhr,
        Asr: timings.Asr,
        Maghrib: timings.Maghrib,
        Isha: timings.Isha,
        Sunrise: timings.Sunrise,
        Imsak: timings.Imsak,
        Midnight: timings.Midnight,
      },
      location: {
        city: data.data.meta.timezone,
        country: data.data.meta.timezone,
        latitude,
        longitude,
      },
    };
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    return null;
  }
}

/**
 * Fetch prayer times from Aladhan API using city and country
 */
export async function getPrayerTimesByCity(
  city: string,
  country: string,
  method: number = 2
): Promise<PrayerTimesData | null> {
  try {
    const response = await fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=${method}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch prayer times for the specified city');
    }

    const data = await response.json();
    const timings = data.data.timings;
    const dateInfo = data.data.date;
    const meta = data.data.meta;

    return {
      date: dateInfo.readable,
      hijriDate: `${dateInfo.hijri.day} ${dateInfo.hijri.month.en} ${dateInfo.hijri.year}`,
      times: {
        Fajr: timings.Fajr,
        Dhuhr: timings.Dhuhr,
        Asr: timings.Asr,
        Maghrib: timings.Maghrib,
        Isha: timings.Isha,
        Sunrise: timings.Sunrise,
        Imsak: timings.Imsak,
        Midnight: timings.Midnight,
      },
      location: {
        city: city,
        country: country,
        latitude: meta.latitude,
        longitude: meta.longitude,
      },
    };
  } catch (error) {
    console.error('Error fetching prayer times by city:', error);
    return null;
  }
}

/**
 * Get user's current location
 */
export function getUserLocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => reject(error),
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
}

/**
 * Calculate time difference between current time and prayer time
 */
export function getTimeUntilPrayer(prayerTime: string): string {
  const now = new Date();
  const [hours, minutes] = prayerTime.split(':').map(Number);
  
  const prayerDate = new Date();
  prayerDate.setHours(hours, minutes, 0, 0);
  
  // If prayer time is earlier than current time, it's tomorrow
  if (prayerDate < now) {
    prayerDate.setDate(prayerDate.getDate() + 1);
  }
  
  const diff = prayerDate.getTime() - now.getTime();
  const hoursUntil = Math.floor(diff / (1000 * 60 * 60));
  const minutesUntil = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hoursUntil > 0) {
    return `${hoursUntil}h ${minutesUntil}m`;
  }
  return `${minutesUntil}m`;
}

/**
 * Get the next prayer time
 */
export function getNextPrayer(times: PrayerTimes): { name: string; time: string; timeUntil: string } {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  const prayers = [
    { name: 'Fajr', time: times.Fajr },
    { name: 'Sunrise', time: times.Sunrise },
    { name: 'Dhuhr', time: times.Dhuhr },
    { name: 'Asr', time: times.Asr },
    { name: 'Maghrib', time: times.Maghrib },
    { name: 'Isha', time: times.Isha },
  ];
  
  for (const prayer of prayers) {
    const [hours, minutes] = prayer.time.split(':').map(Number);
    if (hours > currentHour || (hours === currentHour && minutes > currentMinute)) {
      return {
        name: prayer.name,
        time: prayer.time,
        timeUntil: getTimeUntilPrayer(prayer.time),
      };
    }
  }
  
  // If all prayers have passed, return Fajr for tomorrow
  return {
    name: 'Fajr',
    time: times.Fajr,
    timeUntil: getTimeUntilPrayer(times.Fajr),
  };
}