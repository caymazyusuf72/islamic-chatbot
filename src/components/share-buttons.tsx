'use client';

import { useState } from 'react';
import { Twitter, Facebook, MessageCircle, Send, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/language-context';

interface ShareButtonsProps {
  text: string;
  url?: string;
  title?: string;
}

export function ShareButtons({ text, url = '', title = '' }: ShareButtonsProps) {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer,width=550,height=420');
    
    toast({
      title: t('dailyVerse.shareSuccess'),
      description: 'Twitter\'da paylaşılıyor...',
    });
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
    window.open(facebookUrl, '_blank', 'noopener,noreferrer,width=550,height=420');
    
    toast({
      title: t('dailyVerse.shareSuccess'),
      description: 'Facebook\'ta paylaşılıyor...',
    });
  };

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodedText}${shareUrl ? '%0A%0A' + encodedUrl : ''}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    
    toast({
      title: t('dailyVerse.shareSuccess'),
      description: 'WhatsApp\'ta paylaşılıyor...',
    });
  };

  const handleTelegramShare = () => {
    const telegramUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
    window.open(telegramUrl, '_blank', 'noopener,noreferrer');
    
    toast({
      title: t('dailyVerse.shareSuccess'),
      description: 'Telegram\'da paylaşılıyor...',
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      
      toast({
        title: t('dailyVerse.copiedToClipboard'),
        description: t('dailyVerse.copiedSuccess'),
      });

      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
      toast({
        title: t('common.error'),
        description: t('dailyVerse.copyFailed'),
        variant: 'destructive',
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          aria-label={t('dailyVerse.share')}
        >
          <Send className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onClick={handleTwitterShare}
          className="cursor-pointer gap-2"
        >
          <Twitter className="h-4 w-4" />
          <span>Twitter / X</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={handleFacebookShare}
          className="cursor-pointer gap-2"
        >
          <Facebook className="h-4 w-4" />
          <span>Facebook</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={handleWhatsAppShare}
          className="cursor-pointer gap-2"
        >
          <MessageCircle className="h-4 w-4" />
          <span>WhatsApp</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={handleTelegramShare}
          className="cursor-pointer gap-2"
        >
          <Send className="h-4 w-4" />
          <span>Telegram</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={handleCopy}
          className="cursor-pointer gap-2"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              <span>{t('dailyVerse.copied')}</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>{t('dailyVerse.copyText')}</span>
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}