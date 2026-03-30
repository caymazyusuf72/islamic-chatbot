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

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<HijriDateInterface | null>(null);
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(key, language);

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
    <div className="flex flex-col h-full w-full bg-background/80 backdrop-blur-sm">
      <header className="p-4 border-b flex items-center gap-2">
        <CalendarIcon className="text-primary" />
        <h1 className="text-xl font-headline font-bold tracking-wider">{t('calendar.title')}</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Current Hijri Date Display */}
          <Card className="bg-primary/10 backdrop-blur-md border-primary">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Moon className="w-5 h-5 text-primary" />
                <p className="text-sm text-muted-foreground">{t('calendar.todayHijriDate')}</p>
              </div>
              <p className="text-3xl font-bold text-primary mb-2">
                {hijriDate.day} {hijriDate.monthNameArabic}
              </p>
              <p className="text-lg text-primary/80">
                {hijriDate.day} {hijriDate.monthName} {hijriDate.year} AH
              </p>
            </CardContent>
          </Card>

          {/* Calendar Grid */}
          <Card className="bg-card/80 backdrop-blur-md border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="icon" onClick={handlePreviousMonth}>
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <div className="text-center">
                  <CardTitle className="font-headline text-2xl">
                    {hijriDate.monthName} {hijriDate.year}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={handleNextMonth}>
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              {/* Week Days Header */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-medium text-muted-foreground py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
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
                        aspect-square rounded-lg flex items-center justify-center text-sm font-medium
                        transition-all hover:bg-primary/20
                        ${today ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}
                        ${selected && !today ? 'bg-primary/20 ring-2 ring-primary' : ''}
                        ${special && !today && !selected ? 'text-primary' : ''}
                      `}
                      title={special ? getSpecialDateInfo(day)?.description : ''}
                    >
                      <div className="relative">
                        {day}
                        {special && (
                          <Star className="absolute -top-2 -right-2 w-3 h-3 text-primary fill-primary" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-center mt-4">
                <Button onClick={handleToday} variant="outline" size="sm">
                  {t('calendar.today')}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Selected Date Details */}
          {selectedDate && (
            <Card className="bg-card/80 backdrop-blur-md border">
              <CardHeader>
                <CardTitle className="font-headline text-xl">
                  {t('calendar.selectedDate')}: {selectedDate.day} {selectedDate.monthName} {selectedDate.year}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {formatHijriDate(selectedDate)}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Special Islamic Dates */}
          <Card className="bg-card/80 backdrop-blur-md border">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                {t('calendar.specialDates')} {hijriDate.year} AH
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {specialDates.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer"
                    onClick={() => setSelectedDate(event.date)}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{event.date.day}</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{event.name}</p>
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
          <Card className="bg-card/80 backdrop-blur-md border">
            <CardHeader>
              <CardTitle className="font-headline text-xl">{t('calendar.allMonths')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {hijriMonths.map((month) => (
                  <Button
                    key={month.number}
                    variant={month.number === hijriDate.month ? 'default' : 'outline'}
                    size="sm"
                    className="justify-start"
                    onClick={() => {
                      const newDate = new Date(currentDate);
                      newDate.setMonth(month.number - 1);
                      setCurrentDate(newDate);
                    }}
                  >
                    <span className="mr-2">{month.number}</span>
                    <span className="text-xs">{month.name}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
