'use client';

import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Star, Moon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  toHijri,
  getHijriMonths,
  getSpecialIslamicDates,
  type HijriDateInterface,
  formatHijriDate
} from '@/lib/hijri-calendar';
import { useLanguage } from '@/contexts/language-context';
import { getTranslation } from '@/lib/i18n';
import { CalendarSkeleton } from '@/components/loading-skeletons';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<HijriDateInterface | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(key, language);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const hijriDate = toHijri(currentDate);
  const specialDates = getSpecialIslamicDates(hijriDate.year);
  const hijriMonths = getHijriMonths();

  const daysInMonth = 30; // Hijri months alternate between 29 and 30 days
  const firstDayOffset = 0; // For simplicity, assuming day 1 is always Sunday

  const handlePreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(toHijri(new Date()));
  };

  const handleDateClick = (day: number) => {
    const date: HijriDateInterface = {
      day,
      month: hijriDate.month,
      year: hijriDate.year,
      monthName: hijriMonths[hijriDate.month - 1].name,
      monthNameArabic: hijriMonths[hijriDate.month - 1].nameArabic,
    };
    setSelectedDate(date);
  };

  const isSpecialDate = (day: number) => {
    return specialDates.some(
      (event) => event.date.day === day && event.date.month === hijriDate.month
    );
  };

  const getSpecialDateInfo = (day: number) => {
    return specialDates.find(
      (event) => event.date.day === day && event.date.month === hijriDate.month
    );
  };

  const isToday = (day: number) => {
    const today = toHijri(new Date());
    return day === today.day && hijriDate.month === today.month;
  };

  const weekDays = [
    t('weekDays.sun'),
    t('weekDays.mon'),
    t('weekDays.tue'),
    t('weekDays.wed'),
    t('weekDays.thu'),
    t('weekDays.fri'),
    t('weekDays.sat')
  ];

  return (
    <div className="flex flex-col h-full w-full bg-background/80 backdrop-blur-sm page-enter">
      <header className="p-4 border-b flex items-center gap-2" role="banner">
        <CalendarIcon className="text-primary" aria-hidden="true" />
        <h1 className="text-lg sm:text-xl font-headline font-bold tracking-wider">{t('calendar.title')}</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4" role="main">
        {isLoading ? (
          <CalendarSkeleton />
        ) : (
        <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6 animate-fade-in">
          {/* Current Hijri Date Display */}
          <Card className="bg-primary/10 backdrop-blur-md border-primary hover-scale" role="region" aria-label="Today's Hijri date">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Moon className="w-5 h-5 text-primary" aria-hidden="true" />
                <p className="text-xs sm:text-sm text-muted-foreground">{t('calendar.todayHijriDate')}</p>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-primary mb-2">
                {hijriDate.day} {hijriDate.monthNameArabic}
              </p>
              <p className="text-base sm:text-lg text-primary/80">
                {hijriDate.day} {hijriDate.monthName} {hijriDate.year} AH
              </p>
            </CardContent>
          </Card>

          {/* Calendar Grid */}
          <Card className="bg-card/80 backdrop-blur-md border hover-lift">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePreviousMonth}
                  aria-label="Previous month"
                  className="focus-ring"
                >
                  <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                </Button>
                <div className="text-center">
                  <CardTitle className="font-headline text-lg sm:text-2xl">
                    {hijriDate.monthName} {hijriDate.year}
                  </CardTitle>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNextMonth}
                  aria-label="Next month"
                  className="focus-ring"
                >
                  <ChevronRight className="w-5 h-5" aria-hidden="true" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-2 sm:p-4">
              {/* Week Days Header */}
              <div className="grid grid-cols-7 gap-1 mb-2" role="row">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs sm:text-sm font-medium text-muted-foreground py-2"
                    role="columnheader"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1" role="grid" aria-label="Calendar days">
                {/* Empty cells for days before the 1st */}
                {Array.from({ length: firstDayOffset }).map((_, index) => (
                  <div key={`empty-${index}`} className="aspect-square" />
                ))}

                {/* Days of the month */}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                  const day = index + 1;
                  const special = isSpecialDate(day);
                  const today = isToday(day);
                  const selected = selectedDate?.day === day && selectedDate?.month === hijriDate.month;

                  return (
                    <button
                      key={day}
                      onClick={() => handleDateClick(day)}
                      className={`
                        aspect-square rounded-lg flex items-center justify-center text-xs sm:text-sm font-medium
                        transition-all hover:bg-primary/20 focus-ring
                        ${today ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}
                        ${selected && !today ? 'bg-primary/20 ring-2 ring-primary' : ''}
                        ${special && !today && !selected ? 'text-primary' : ''}
                      `}
                      aria-label={`${day} ${hijriDate.monthName}${today ? ' - Today' : ''}${special ? ' - Special date' : ''}`}
                      aria-pressed={selected}
                      title={special ? getSpecialDateInfo(day)?.description : ''}
                      role="gridcell"
                    >
                      <div className="relative">
                        {day}
                        {special && (
                          <Star className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-2 h-2 sm:w-3 sm:h-3 text-primary fill-primary" aria-hidden="true" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-center mt-4">
                <Button
                  onClick={handleToday}
                  variant="outline"
                  size="sm"
                  className="focus-ring"
                  aria-label="Go to today's date"
                >
                  {t('calendar.today')}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Selected Date Details */}
          {selectedDate && (
            <Card className="bg-card/80 backdrop-blur-md border hover-lift animate-slide-in" role="region" aria-label="Selected date details">
              <CardHeader>
                <CardTitle className="font-headline text-base sm:text-xl">
                  {t('calendar.selectedDate')}: {selectedDate.day} {selectedDate.monthName} {selectedDate.year}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {formatHijriDate(selectedDate)}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Special Islamic Dates */}
          <Card className="bg-card/80 backdrop-blur-md border hover-lift" role="region" aria-label="Special Islamic dates">
            <CardHeader>
              <CardTitle className="font-headline text-base sm:text-xl flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" aria-hidden="true" />
                {t('calendar.specialDates')} {hijriDate.year} AH
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 sm:space-y-3" role="list">
                {specialDates.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-smooth cursor-pointer focus-ring"
                    onClick={() => setSelectedDate(event.date)}
                    role="listitem button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedDate(event.date);
                      }
                    }}
                    aria-label={`${event.name} on ${event.date.monthName} ${event.date.day}`}
                  >
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-xs sm:text-sm font-bold text-primary">{event.date.day}</span>
                    </div>
                    <div>
                      <p className="font-medium text-xs sm:text-sm">{event.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {event.date.monthName} {event.date.day}, {event.date.year}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Month List */}
          <Card className="bg-card/80 backdrop-blur-md border hover-lift" role="region" aria-label="Hijri months">
            <CardHeader>
              <CardTitle className="font-headline text-base sm:text-xl">{t('calendar.allMonths')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2" role="list">
                {hijriMonths.map((month) => (
                  <Button
                    key={month.number}
                    variant={month.number === hijriDate.month ? 'default' : 'outline'}
                    size="sm"
                    className="justify-start focus-ring text-xs sm:text-sm"
                    onClick={() => {
                      const newDate = new Date(currentDate);
                      newDate.setMonth(month.number - 1);
                      setCurrentDate(newDate);
                    }}
                    aria-label={`Go to ${month.name}`}
                    aria-pressed={month.number === hijriDate.month}
                  >
                    <span className="mr-2">{month.number}</span>
                    <span className="text-xs truncate">{month.name}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        )}
      </div>
    </div>
  );
}
