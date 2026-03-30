'use client';

import { useEffect, useRef, useState } from 'react';
import { answerAction } from '@/app/actions';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, LoaderCircle, Sparkles, CornerDownLeft, Bot, User, Volume2, StopCircle, Copy, Trash2, Download, RotateCw, BookOpen, Baby } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/language-context';
import { getTranslation } from '@/lib/i18n';
import { ChatMessageSkeleton, ErrorDisplay } from '@/components/loading-skeletons';

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
      className="h-7 w-7 text-muted-foreground focus-ring"
      aria-label={isPlaying ? 'Stop reading' : 'Read aloud'}
    >
      {isLoading ? (
        <LoaderCircle className="animate-spin" aria-hidden="true" />
      ) : isPlaying ? (
        <StopCircle aria-hidden="true" />
      ) : (
        <Volume2 aria-hidden="true" />
      )}
      <span className="sr-only">{isPlaying ? 'Stop reading' : 'Read aloud'}</span>
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

  const handleExampleQuestion = (question: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: question,
      timestamp: Date.now(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    setPending(true);
    setError(null);

    answerAction([...messages, newMessage], language, kidsMode).then(result => {
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
    <div className="flex flex-col h-full w-full bg-background/80 backdrop-blur-sm page-enter">
      <header className="p-3 sm:p-4 border-b flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3" role="banner">
        <div className="flex items-center gap-2">
          <Sparkles className="text-primary" aria-hidden="true" />
          <h1 className="text-lg sm:text-xl font-headline font-bold tracking-wider">{t('nav.aiAnswers')}</h1>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-2">
            <Switch
              id="kids-mode"
              checked={kidsMode}
              onCheckedChange={toggleKidsMode}
              className="focus-ring"
              aria-label={t('kidsMode.title')}
            />
            <Label htmlFor="kids-mode" className="flex items-center gap-1 cursor-pointer text-xs sm:text-sm">
              <Baby className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
              <span className="hidden sm:inline">{t('kidsMode.title')}</span>
            </Label>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleExportChat}
              aria-label="Export chat"
              className="focus-ring h-8 w-8 sm:h-10 sm:w-10"
            >
              <Download className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClearChat}
              aria-label="Clear chat"
              disabled={messages.length === 0}
              className="focus-ring h-8 w-8 sm:h-10 sm:w-10"
            >
              <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-1 p-3 sm:p-4" ref={scrollAreaRef} role="main">
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-8">
          {messages.length === 0 && !pending && (
            <div className="text-center text-muted-foreground pt-8 sm:pt-16 px-4">
              <p className="font-headline text-xl sm:text-2xl mb-2">{t('chat.greeting')}</p>
              <p className="text-sm sm:text-base">{t('chat.howCanIHelp')}</p>
              <p className="text-xs sm:text-sm mt-4">{t('chat.askAboutIslam')}</p>
              
              {kidsMode && (
                <Card className="mt-6 sm:mt-8 max-w-2xl mx-auto bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover-lift">
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg flex items-center justify-center gap-2">
                      <Baby className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                      {t('kidsMode.tryExample')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      <Button
                        variant="outline"
                        className="h-auto py-2 sm:py-3 px-3 sm:px-4 text-left text-xs sm:text-sm justify-start hover:bg-primary/10 hover:border-primary/40 focus-ring transition-smooth"
                        onClick={() => handleExampleQuestion(t('kidsMode.exampleQuestion1'))}
                      >
                        {t('kidsMode.exampleQuestion1')}
                      </Button>
                      <Button
                        variant="outline"
                        className="h-auto py-2 sm:py-3 px-3 sm:px-4 text-left text-xs sm:text-sm justify-start hover:bg-primary/10 hover:border-primary/40 focus-ring transition-smooth"
                        onClick={() => handleExampleQuestion(t('kidsMode.exampleQuestion2'))}
                      >
                        {t('kidsMode.exampleQuestion2')}
                      </Button>
                      <Button
                        variant="outline"
                        className="h-auto py-2 sm:py-3 px-3 sm:px-4 text-left text-xs sm:text-sm justify-start hover:bg-primary/10 hover:border-primary/40 focus-ring transition-smooth"
                        onClick={() => handleExampleQuestion(t('kidsMode.exampleQuestion3'))}
                      >
                        {t('kidsMode.exampleQuestion3')}
                      </Button>
                      <Button
                        variant="outline"
                        className="h-auto py-2 sm:py-3 px-3 sm:px-4 text-left text-xs sm:text-sm justify-start hover:bg-primary/10 hover:border-primary/40 focus-ring transition-smooth"
                        onClick={() => handleExampleQuestion(t('kidsMode.exampleQuestion4'))}
                      >
                        {t('kidsMode.exampleQuestion4')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2 sm:gap-4 message-enter ${msg.role === 'user' ? 'justify-end' : ''}`}
              role="article"
              aria-label={`${msg.role === 'user' ? 'Your' : 'Assistant'} message`}
            >
              {msg.role === 'assistant' && (
                <Avatar className="w-7 h-7 sm:w-8 sm:h-8 border-2 border-primary flex-shrink-0">
                  <AvatarFallback><Bot className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" /></AvatarFallback>
                </Avatar>
              )}
              <div className={`flex flex-col gap-2 max-w-[85%] sm:max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`rounded-lg p-3 sm:p-4 flex items-start gap-2 transition-smooth hover-lift ${msg.role === 'user' ? 'bg-primary/20' : 'bg-card/80 backdrop-blur-md border'}`}>
                  <div className="flex-1 min-w-0">
                    <p className="whitespace-pre-wrap text-sm sm:text-base break-words">{msg.content}</p>
                  </div>
                  <div className="flex flex-col gap-1 flex-shrink-0 ml-2">
                    {msg.role === 'assistant' && <TTSButton text={msg.content} />}
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6 text-muted-foreground hover:text-foreground focus-ring"
                      onClick={() => handleCopy(msg.content)}
                      aria-label="Copy message"
                    >
                      <Copy className="w-3 h-3" aria-hidden="true" />
                    </Button>
                    {error && msg.role === 'assistant' && index === messages.length - 1 && (
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 text-muted-foreground hover:text-foreground focus-ring"
                        onClick={() => handleRetry(index)}
                        aria-label="Retry"
                        disabled={retrying}
                      >
                        <RotateCw className={`w-3 h-3 ${retrying ? 'animate-spin' : ''}`} aria-hidden="true" />
                      </Button>
                    )}
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6 text-muted-foreground hover:text-destructive focus-ring"
                      onClick={() => handleDeleteMessage(msg.id)}
                      aria-label="Delete message"
                    >
                      <Trash2 className="w-3 h-3" aria-hidden="true" />
                    </Button>
                  </div>
                </div>
                {msg.references && msg.references.length > 0 && (
                  <Card className="max-w-full w-fit bg-primary/5 border-primary/20 shadow-sm hover-lift reference-card">
                    <CardHeader className="p-2 sm:p-3 pb-2">
                      <CardTitle className="text-xs sm:text-sm font-semibold flex items-center gap-2 text-primary">
                        <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
                        {t('chat.references')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-2 sm:p-3 pt-0">
                      <ul className="text-xs space-y-2" role="list">
                        {msg.references.map((ref, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 cursor-pointer hover:text-primary transition-colors group focus-ring rounded p-1"
                            onClick={() => handleCopy(ref)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleCopy(ref);
                              }
                            }}
                            tabIndex={0}
                            role="button"
                            aria-label={`Copy reference: ${ref}`}
                          >
                            <span className="text-primary/60 font-mono mt-0.5" aria-hidden="true">•</span>
                            <span className="flex-1 group-hover:underline break-words">{ref}</span>
                            <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" aria-hidden="true" />
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>
              {msg.role === 'user' && (
                 <Avatar className="w-7 h-7 sm:w-8 sm:h-8 border-2 border-muted flex-shrink-0">
                  <AvatarFallback><User className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" /></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {pending && <ChatMessageSkeleton />}
          {error && (
            <div className="animate-fade-in">
              <ErrorDisplay
                message={error}
                onRetry={() => formRef.current?.requestSubmit()}
                retryLabel={t('common.tryAgain')}
              />
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-3 sm:p-4 border-t bg-background/80 backdrop-blur-sm">
        <form
          ref={formRef}
          onSubmit={handleFormSubmit}
          className="max-w-4xl mx-auto flex items-end gap-2 sm:gap-4"
        >
          <Textarea
            name="question"
            placeholder={t('chat.askQuestion')}
            className="flex-1 resize-none bg-input focus-ring text-sm sm:text-base min-h-[44px]"
            rows={1}
            disabled={pending}
            aria-label={t('chat.askQuestion')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                formRef.current?.requestSubmit();
              }
            }}
          />
          <Button
            type="submit"
            size="icon"
            disabled={pending}
            className="focus-ring h-11 w-11 flex-shrink-0"
            aria-label="Send message"
          >
            {pending ? <LoaderCircle className="animate-spin" aria-hidden="true" /> : <Send aria-hidden="true" />}
            <span className="sr-only">Send</span>
          </Button>
        </form>
         <p className="text-xs sm:text-sm text-muted-foreground text-center mt-2">
          {t('chat.shiftForNewLine')}
        </p>
      </div>
    </div>
  );
}
