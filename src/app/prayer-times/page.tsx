import { Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrayerTimesPage() {
  return (
    <div className="flex flex-col h-full w-full bg-background/80 backdrop-blur-sm">
      <header className="p-4 border-b flex items-center gap-2">
        <Clock className="text-primary" />
        <h1 className="text-xl font-headline font-bold tracking-wider">Prayer Times</h1>
      </header>
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center bg-card/80 backdrop-blur-md border">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              The Prayer Times feature is currently under development. Please check back later!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
