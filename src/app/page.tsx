'use client';

import { useEffect, useRef, useState } from 'react';
import { answerAction } from '@/app/actions';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, LoaderCircle, Sparkles, CornerDownLeft, Bot, User, Volume2, StopCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { textToSpeech } from '@/ai/flows/text-to-speech';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  references?: string[];
};

function TTSButton({ text }: { text: string }) {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePlayback = async () => {
    if (audio && isPlaying) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
      return;
    }

    if (audio) {
      audio.play();
      setIsPlaying(true);
      return;
    }

    setIsLoading(true);
    try {
      const response = await textToSpeech({ text });
      if (response.audioDataUri) {
        const newAudio = new Audio(response.audioDataUri);
        newAudio.addEventListener('ended', () => {
          setIsPlaying(false);
        });
        setAudio(newAudio);
        newAudio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('TTS Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={handlePlayback}
      disabled={isLoading}
      className="h-7 w-7 text-muted-foreground"
    >
      {isLoading ? (
        <LoaderCircle className="animate-spin" />
      ) : isPlaying ? (
        <StopCircle />
      ) : (
        <Volume2 />
      )}
      <span className="sr-only">Read aloud</span>
    </Button>
  );
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [pending, setPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const question = formData.get('question') as string;

    if (!question.trim()) return;
    
    const newMessages: Message[] = [...messages, { role: 'user', content: question }];
    setMessages(newMessages);
    setPending(true);
    setError(null);
    formRef.current?.reset();

    const result = await answerAction(newMessages);

    if (result.response) {
      setMessages(prev => [...prev, result.response as Message]);
    } else if (result.error) {
      setError(result.error);
      // Optionally remove the user's message if the API call fails
      // setMessages(prev => prev.slice(0, -1));
    }
    setPending(false);
  };
  
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, pending]);

  return (
    <div className="flex flex-col h-full w-full bg-background/80 backdrop-blur-sm">
      <header className="p-4 border-b flex items-center gap-2">
        <Sparkles className="text-primary" />
        <h1 className="text-xl font-headline font-bold tracking-wider">AI-Powered Answers</h1>
      </header>

      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="max-w-4xl mx-auto space-y-8">
          {messages.length === 0 && !pending && (
            <div className="text-center text-muted-foreground pt-16">
              <p className="font-headline text-2xl mb-2">Assalamu alaikum!</p>
              <p>How can I help you today?</p>
              <p className="text-xs mt-4">Ask me anything about Islam, based on the Quran, Hadith, and scholars.</p>
            </div>
          )}

          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start gap-4 ${msg.role === 'user' ? 'justify-end' : ''}`}>
              {msg.role === 'assistant' && (
                <Avatar className="w-8 h-8 border-2 border-primary">
                  <AvatarFallback><Bot className="w-5 h-5" /></AvatarFallback>
                </Avatar>
              )}
              <div className={`flex flex-col gap-2 max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`rounded-lg p-4 flex items-end gap-2 ${msg.role === 'user' ? 'bg-primary/20' : 'bg-card/80 backdrop-blur-md border'}`}>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                   {msg.role === 'assistant' && <TTSButton text={msg.content} />}
                </div>
                {msg.references && msg.references.length > 0 && (
                  <Card className="max-w-full w-fit bg-card/60 border-dashed">
                    <CardHeader className="p-2 pb-0">
                      <CardTitle className="text-xs font-medium">References</CardTitle>
                    </CardHeader>
                    <CardContent className="p-2">
                      <ul className="text-xs text-muted-foreground list-disc list-inside">
                        {msg.references.map((ref, i) => <li key={i}>{ref}</li>)}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>
              {msg.role === 'user' && (
                 <Avatar className="w-8 h-8 border-2 border-muted">
                  <AvatarFallback><User className="w-5 h-5" /></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {pending && (
            <div className="flex items-start gap-4">
              <Avatar className="w-8 h-8 border-2 border-primary animate-pulse">
                <AvatarFallback><Bot className="w-5 h-5" /></AvatarFallback>
              </Avatar>
              <div className="rounded-lg p-4 bg-card/80 backdrop-blur-md border flex items-center gap-2">
                <LoaderCircle className="animate-spin w-4 h-4" />
                <span className="text-muted-foreground text-sm">Thinking...</span>
              </div>
            </div>
          )}
           {error && <p className="text-destructive text-center">{error}</p>}
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-background/80 backdrop-blur-sm">
        <form
          ref={formRef}
          onSubmit={handleFormSubmit}
          className="max-w-4xl mx-auto flex items-start gap-4"
        >
          <Textarea
            name="question"
            placeholder="Ask a question..."
            className="flex-1 resize-none bg-input"
            rows={1}
            disabled={pending}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                formRef.current?.requestSubmit();
              }
            }}
          />
          <Button type="submit" size="icon" disabled={pending}>
            {pending ? <LoaderCircle className="animate-spin" /> : <Send />}
            <span className="sr-only">Send</span>
          </Button>
        </form>
         <p className="text-xs text-muted-foreground text-center mt-2">
          Press <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100"><span className="text-xs">Shift</span>+<CornerDownLeft size={10} /></kbd> for a new line.
        </p>
      </div>
    </div>
  );
}
