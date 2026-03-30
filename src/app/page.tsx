'use client';

import { useEffect, useRef, useState } from 'react';
import { answerAction } from '@/app/actions';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, LoaderCircle, Sparkles, CornerDownLeft, Bot, User, Volume2, StopCircle, Copy, Trash2, Download, RotateCw, BookOpen, Baby } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/language-context';
import { getTranslation } from '@/lib/i18n';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  references?: string[];
  id: string;
  timestamp: number;
};

const STORAGE_KEY = 'nurai-chat-history';
const KIDS_MODE_KEY = 'nurai-kids-mode';

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
  const [retrying, setRetrying] = useState(false);
  const [kidsMode, setKidsMode] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(key, language);

  // Load chat history and kids mode from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load chat history:', e);
      }
    }
    
    const savedKidsMode = localStorage.getItem(KIDS_MODE_KEY);
    if (savedKidsMode) {
      setKidsMode(savedKidsMode === 'true');
    }
  }, []);

  // Save chat history to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [messages]);

  // Save kids mode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(KIDS_MODE_KEY, kidsMode.toString());
  }, [kidsMode]);

  const toggleKidsMode = () => {
    setKidsMode(prev => !prev);
    toast({
      title: t('common.success'),
      description: kidsMode ? t('kidsMode.disabled') : t('kidsMode.enabled'),
    });
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const question = formData.get('question') as string;

    if (!question.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: question,
      timestamp: Date.now(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    setPending(true);
    setError(null);
    formRef.current?.reset();

    const result = await answerAction([...messages, newMessage], language, kidsMode);

    if (result.response) {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: result.response.content,
        references: result.response.references,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, responseMessage]);
    } else if (result.error) {
      setError(result.error);
    }
    setPending(false);
  };

  const handleRetry = async (messageIndex: number) => {
    setRetrying(true);
    const messagesToRetry = messages.slice(0, messageIndex);
    
    const result = await answerAction(messagesToRetry, language, kidsMode);
    
    if (result.response) {
      const responseMessage: Message = {
        id: (Date.now()).toString(),
        role: 'assistant',
        content: result.response.content,
        references: result.response.references,
        timestamp: Date.now(),
      };
      
      setMessages(prev => [
        ...prev.slice(0, messageIndex),
        responseMessage,
      ]);
      toast({
        title: t('common.success'),
        description: t('chat.responseRegenerated'),
      });
    } else if (result.error) {
      toast({
        title: t('common.error'),
        description: result.error,
        variant: 'destructive',
      });
    }
    setRetrying(false);
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: t('common.success'),
        description: t('chat.copiedToClipboard'),
      });
    } catch (error) {
      toast({
        title: t('common.error'),
        description: t('chat.failedToCopy'),
        variant: 'destructive',
      });
    }
  };

  const handleDeleteMessage = (id: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
    toast({
      title: t('common.success'),
      description: t('chat.messageDeleted'),
    });
  };

  const handleClearChat = () => {
    setMessages([]);
    toast({
      title: t('common.success'),
      description: t('chat.chatCleared'),
    });
  };

  const handleExportChat = () => {
    const chatText = messages.map(msg =>
      `[${new Date(msg.timestamp).toLocaleString()}] ${msg.role.toUpperCase()}:\n${msg.content}\n${msg.references ? 'References: ' + msg.references.join(', ') : ''}\n\n`
    ).join('');
    
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nurai-chat-export-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: t('common.success'),
      description: t('chat.exportedSuccessfully'),
    });
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
      <header className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="text-primary" />
          <h1 className="text-xl font-headline font-bold tracking-wider">{t('nav.aiAnswers')}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleExportChat} title="Export chat">
            <Download className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleClearChat} title="Clear chat" disabled={messages.length === 0}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="max-w-4xl mx-auto space-y-8">
          {messages.length === 0 && !pending && (
            <div className="text-center text-muted-foreground pt-16">
              <p className="font-headline text-2xl mb-2">{t('chat.greeting')}</p>
              <p>{t('chat.howCanIHelp')}</p>
              <p className="text-xs mt-4">{t('chat.askAboutIslam')}</p>
            </div>
          )}

          {messages.map((msg, index) => (
            <div key={msg.id} className={`flex items-start gap-4 ${msg.role === 'user' ? 'justify-end' : ''}`}>
              {msg.role === 'assistant' && (
                <Avatar className="w-8 h-8 border-2 border-primary">
                  <AvatarFallback><Bot className="w-5 h-5" /></AvatarFallback>
                </Avatar>
              )}
              <div className={`flex flex-col gap-2 max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`rounded-lg p-4 flex items-start gap-2 ${msg.role === 'user' ? 'bg-primary/20' : 'bg-card/80 backdrop-blur-md border'}`}>
                  <div className="flex-1">
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                  <div className="flex flex-col gap-1 flex-shrink-0">
                    {msg.role === 'assistant' && <TTSButton text={msg.content} />}
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6 text-muted-foreground hover:text-foreground"
                      onClick={() => handleCopy(msg.content)}
                      title="Copy"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                    {error && msg.role === 'assistant' && index === messages.length - 1 && (
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 text-muted-foreground hover:text-foreground"
                        onClick={() => handleRetry(index)}
                        title="Retry"
                        disabled={retrying}
                      >
                        <RotateCw className={`w-3 h-3 ${retrying ? 'animate-spin' : ''}`} />
                      </Button>
                    )}
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6 text-muted-foreground hover:text-destructive"
                      onClick={() => handleDeleteMessage(msg.id)}
                      title="Delete"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                {msg.references && msg.references.length > 0 && (
                  <Card className="max-w-full w-fit bg-primary/5 border-primary/20 shadow-sm">
                    <CardHeader className="p-3 pb-2">
                      <CardTitle className="text-sm font-semibold flex items-center gap-2 text-primary">
                        <BookOpen className="w-4 h-4" />
                        {t('chat.references')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                      <ul className="text-xs space-y-2">
                        {msg.references.map((ref, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 cursor-pointer hover:text-primary transition-colors group"
                            onClick={() => handleCopy(ref)}
                            title="Kopyalamak için tıklayın"
                          >
                            <span className="text-primary/60 font-mono mt-0.5">•</span>
                            <span className="flex-1 group-hover:underline">{ref}</span>
                            <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" />
                          </li>
                        ))}
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
                <span className="text-muted-foreground text-sm">{t('chat.thinking')}</span>
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
            placeholder={t('chat.askQuestion')}
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
          {t('chat.shiftForNewLine')}
        </p>
      </div>
    </div>
  );
}
