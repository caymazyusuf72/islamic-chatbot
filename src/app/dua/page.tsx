'use client';

import { useFormState } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { duaAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoaderCircle, BookHeart, Send, Sparkles } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const initialState = {
  recommendations: null,
  error: null,
};

export default function DuaPage() {
  const [state, formAction] = useFormState(duaAction, initialState);
  const [pending, setPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    formAction(new FormData(event.currentTarget));
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
              <div className="flex items-center justify-center p-8 text-muted-foreground gap-2">
                <LoaderCircle className="animate-spin w-5 h-5" />
                <span>Finding the best duas for you...</span>
              </div>
            )}
            {state.error && <p className="text-destructive text-center">{state.error}</p>}
            {state.recommendations && (
              <div className="space-y-4">
                <h2 className="flex items-center gap-2 font-headline text-2xl text-primary"><Sparkles className="w-5 h-5" /> Here are some recommendations:</h2>
                {state.recommendations.map((dua, index) => (
                  <Card key={index} className="bg-card/60 backdrop-blur-md border">
                    <CardContent className="p-4">
                      <p className="text-lg">{dua}</p>
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
