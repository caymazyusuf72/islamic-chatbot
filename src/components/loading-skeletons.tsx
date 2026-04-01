import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function ChatMessageSkeleton() {
  return (
    <div className="flex items-start gap-4 animate-pulse">
      <Skeleton className="w-8 h-8 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}

export function PrayerTimeCardSkeleton() {
  return (
    <Card className="bg-card/80 backdrop-blur-md border">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
        <Skeleton className="h-6 w-16" />
      </CardContent>
    </Card>
  );
}

export function PrayerTimesPageSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-card/80 backdrop-blur-md border">
        <CardContent className="p-6">
          <div className="space-y-3">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-40" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary/10 backdrop-blur-md border-primary">
        <CardContent className="p-6 text-center space-y-3">
          <Skeleton className="h-4 w-24 mx-auto" />
          <Skeleton className="h-8 w-32 mx-auto" />
          <Skeleton className="h-5 w-40 mx-auto" />
        </CardContent>
      </Card>

      <div className="grid gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <PrayerTimeCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function DuaCardSkeleton() {
  return (
    <Card className="bg-card/60 backdrop-blur-md border">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Skeleton className="w-5 h-5 rounded" />
          <Skeleton className="h-5 w-48" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted/30 p-4 rounded-lg">
          <Skeleton className="h-8 w-full mb-2" />
          <Skeleton className="h-8 w-5/6" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="bg-primary/5 p-3 rounded-lg space-y-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-4 w-full" />
        </div>
      </CardContent>
    </Card>
  );
}

export function CalendarSkeleton() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card className="bg-primary/10 backdrop-blur-md border-primary">
        <CardContent className="p-6 text-center space-y-3">
          <Skeleton className="h-4 w-32 mx-auto" />
          <Skeleton className="h-8 w-48 mx-auto" />
          <Skeleton className="h-5 w-56 mx-auto" />
        </CardContent>
      </Card>

      <Card className="bg-card/80 backdrop-blur-md border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton className="w-10 h-10 rounded" />
            <div className="text-center space-y-2">
              <Skeleton className="h-7 w-40 mx-auto" />
              <Skeleton className="h-4 w-32 mx-auto" />
            </div>
            <Skeleton className="w-10 h-10 rounded" />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-full" />
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 30 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-lg" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function QiblaMapSkeleton() {
  return (
    <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center animate-pulse">
      <div className="text-center space-y-3">
        <div className="w-16 h-16 bg-muted-foreground/20 rounded-full mx-auto flex items-center justify-center">
          <svg
            className="w-8 h-8 text-muted-foreground/40"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        </div>
        <div className="space-y-2">
          <div className="h-4 w-32 bg-muted-foreground/20 rounded mx-auto"></div>
          <div className="h-3 w-24 bg-muted-foreground/10 rounded mx-auto"></div>
        </div>
      </div>
    </div>
  );
}

export function ErrorDisplay({
  message,
  onRetry,
  retryLabel = 'Try Again'
}: {
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}) {
  return (
    <Card className="bg-destructive/10 border-destructive max-w-md mx-auto">
      <CardContent className="p-6 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center mx-auto">
          <svg
            className="w-6 h-6 text-destructive"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <p className="text-destructive font-medium">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            {retryLabel}
          </button>
        )}
      </CardContent>
    </Card>
  );
}