/**
 * Hijri Calendar Utility Functions
 * Provides conversion between Gregorian and Hijri dates
 */

export interface HijriDate {
  day: number;
  month: number;
  year: number;
  monthName: string;
  monthNameArabic: string;
}

export interface HijriMonth {
  number: number;
  name: string;
  nameArabic: string;
  days: number;
}

const HIJRI_MONTHS: Array<{ number: number; name: string; nameArabic: string; days: number }> = [
  { number: 1, name: 'Muharram', nameArabic: 'محرم', days: 30 },
  { number: 2, name: 'Safar', nameArabic: 'صفر', days: 29 },
  { number: 3, name: 'Rabi al-Awwal', nameArabic: 'ربيع الأول', days: 30 },
  { number: 4, name: 'Rabi al-Thani', nameArabic: 'ربيع الآخر', days: 29 },
  { number: 5, name: 'Jumada al-Awwal', nameArabic: 'جمادى الأولى', days: 30 },
  { number: 6, name: 'Jumada al-Thani', nameArabic: 'جمادى الآخرة', days: 29 },
  { number: 7, name: 'Rajab', nameArabic: 'رجب', days: 30 },
  { number: 8, name: 'Shaaban', nameArabic: 'شعبان', days: 29 },
  { number: 9, name: 'Ramadan', nameArabic: 'رمضان', days: 30 },
  { number: 10, name: 'Shawwal', nameArabic: 'شوال', days: 29 },
  { number: 11, name: 'Dhu al-Qadah', nameArabic: 'ذو القعدة', days: 30 },
  { number: 12, name: 'Dhu al-Hijjah', nameArabic: 'ذو الحجة', days: 30 },
];

const ISLAMIC_EPOCH = 227014; // Julian day number for 1 Muharram 1 AH
const GREGORIAN_EPOCH = 1721425.5; // Julian day number for 1 January 1 AD

/**
 * Convert Gregorian date to Julian day number
 */
function gregorianToJulian(year: number, month: number, day: number): number {
  return (
    GREGORIAN_EPOCH -
    1 +
    Math.floor(365.25 * (year + 4716)) +
    Math.floor(30.6001 * (month + 1)) +
    day -
    Math.floor(49 * year) -
    Math.floor(month / 3) +
    Math.floor(3 * year) +
    Math.floor(month / 3)
  );
}

/**
 * Convert Julian day number to Hijri date
 */
function julianToHijri(jd: number): HijriDate {
  const l = jd - ISLAMIC_EPOCH;
  const n = Math.floor(l / 30);
  const i = Math.floor((l - 30 * n) / 29.5);
  
  let year = Math.floor(i / 12) + 1 + n * 30;
  let month = (i % 12) + 1;
  const day = Math.floor(l - 30 * n - Math.floor(29.5 * (i % 12)) + 1);
  
  const monthInfo = HIJRI_MONTHS[month - 1];
  
  return {
    day,
    month,
    year,
    monthName: monthInfo.name,
    monthNameArabic: monthInfo.nameArabic,
  };
}

/**
 * Convert Gregorian date to Hijri date
 */
export function toHijri(gregorianDate: Date): HijriDate {
  const year = gregorianDate.getFullYear();
  const month = gregorianDate.getMonth() + 1;
  const day = gregorianDate.getDate();
  
  const jd = gregorianToJulian(year, month, day);
  return julianToHijri(jd);
}

/**
 * Get Hijri month name
 */
export function getHijriMonthName(month: number): string {
  return HIJRI_MONTHS[month - 1]?.name || '';
}

/**
 * Get Hijri month name in Arabic
 */
export function getHijriMonthNameArabic(month: number): string {
  return HIJRI_MONTHS[month - 1]?.nameArabic || '';
}

/**
 * Get all Hijri months
 */
export function getHijriMonths(): HijriMonth[] {
  return [...HIJRI_MONTHS];
}

/**
 * Format Hijri date
 */
export function formatHijriDate(hijriDate: HijriDate, format: 'long' | 'short' = 'long'): string {
  if (format === 'long') {
    return `${hijriDate.day} ${hijriDate.monthName} ${hijriDate.year} AH`;
  }
  return `${hijriDate.day}/${hijriDate.month}/${hijriDate.year} AH`;
}

/**
 * Get Hijri month days
 */
export function getHijriMonthDays(month: number): number {
  return HIJRI_MONTHS[month - 1]?.days || 30;
}

/**
 * Check if a Hijri date is valid
 */
export function isValidHijriDate(day: number, month: number, year: number): boolean {
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 30) return false;
  if (year < 1) return false;
  return true;
}

/**
 * Get special Islamic dates for a year
 */
export function getSpecialIslamicDates(hijriYear: number): Array<{ name: string; date: HijriDate; description: string }> {
  return [
    {
      name: 'Islamic New Year',
      date: { day: 1, month: 1, year: hijriYear, monthName: 'Muharram', monthNameArabic: 'محرم' },
      description: '1st of Muharram - Islamic New Year',
    },
    {
      name: 'Ashura',
      date: { day: 10, month: 1, year: hijriYear, monthName: 'Muharram', monthNameArabic: 'محرم' },
      description: '10th of Muharram - Day of Ashura',
    },
    {
      name: 'Mawlid al-Nabi',
      date: { day: 12, month: 3, year: hijriYear, monthName: 'Rabi al-Awwal', monthNameArabic: 'ربيع الأول' },
      description: '12th of Rabi al-Awwal - Prophet Muhammad\'s Birthday',
    },
    {
      name: 'Isra and Mi raj',
      date: { day: 27, month: 7, year: hijriYear, monthName: 'Rajab', monthNameArabic: 'رجب' },
      description: '27th of Rajab - Isra and Mi raj',
    },
    {
      name: 'Laylat al-Qadr (Expected)',
      date: { day: 27, month: 9, year: hijriYear, monthName: 'Ramadan', monthNameArabic: 'رمضان' },
      description: '27th of Ramadan - Laylat al-Qadr (Night of Power)',
    },
    {
      name: 'Eid al-Fitr',
      date: { day: 1, month: 10, year: hijriYear, monthName: 'Shawwal', monthNameArabic: 'شوال' },
      description: '1st of Shawwal - Eid al-Fitr',
    },
    {
      name: 'Day of Arafah',
      date: { day: 9, month: 12, year: hijriYear, monthName: 'Dhu al-Hijjah', monthNameArabic: 'ذو الحجة' },
      description: '9th of Dhu al-Hijjah - Day of Arafah',
    },
    {
      name: 'Eid al-Adha',
      date: { day: 10, month: 12, year: hijriYear, monthName: 'Dhu al-Hijjah', monthNameArabic: 'ذو الحجة' },
      description: '10th of Dhu al-Hijjah - Eid al-Adha',
    },
  ];
}