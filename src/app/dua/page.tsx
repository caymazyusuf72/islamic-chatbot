'use client';

import { useFormState } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { duaAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoaderCircle, BookHeart, Send, Sparkles, Copy, Volume2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

const initialState = {
  recommendations: null,
  error: null,
};

export default function DuaPage() {
  const [state, formAction] = useFormState(duaAction, initialState);
  const [pending, setPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    formAction(new FormData(event.currentTarget));
  };
  
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: 'Copied',
        description: 'Dua copied to clipboard.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to copy dua.',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    if (state.recommendations || state.error) {
      setPending(false);
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <div className="flex flex-col h-full w-full bg-background/80 backdrop-blur-sm">
      <header className="p-4 border-b flex items-center gap-2">
        <BookHeart className="text-primary" />
        <h1 className="text-xl font-headline font-bold tracking-wider">Dua Recommendations</h1>
      </header>

      <div className="flex-1 flex flex-col p-4 gap-4">
        <Card className="bg-card/80 backdrop-blur-md border">
          <CardContent className="p-6">
            <form ref={formRef} onSubmit={handleFormSubmit} className="flex items-center gap-4">
              <Input
                name="situation"
                placeholder="Describe a situation, e.g., 'for an exam' or 'when feeling anxious'"
                className="flex-1 bg-input"
                disabled={pending}
                required
              />
              <Button type="submit" size="icon" disabled={pending}>
                {pending ? <LoaderCircle className="animate-spin" /> : <Send />}
                <span className="sr-only">Get Recommendations</span>
              </Button>
            </form>
             <p className="text-xs text-muted-foreground text-center mt-2">
              Get dua recommendations for any situation you are facing.
            </p>
          </CardContent>
        </Card>

        <ScrollArea className="flex-1">
          <div className="max-w-4xl mx-auto">
            {pending && (
              <div className="flex items-center justify-center p-8 text-muted-foreground gap-2 animate-fade-in">
                <LoaderCircle className="animate-spin w-5 h-5" />
                <span>Finding the best duas for you...</span>
              </div>
            )}
            {state.error && <p className="text-destructive text-center">{state.error}</p>}
            {state.recommendations && (
              <div className="space-y-4 animate-slide-in">
                <h2 className="flex items-center gap-2 font-headline text-2xl text-primary"><Sparkles className="w-5 h-5" /> Here are some recommendations:</h2>
                {state.recommendations.map((dua, index) => (
                  <Card key={index} className="bg-card/60 backdrop-blur-md border transition-smooth hover:shadow-lg">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-lg flex-1">{dua}</p>
                        <div className="flex gap-1 flex-shrink-0">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-6 w-6 text-muted-foreground hover:text-foreground"
                            onClick={() => handleCopy(dua)}
                            title="Copy dua"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
