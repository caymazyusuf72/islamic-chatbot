/**
 * Internationalization (i18n) System
 * Supports English and Turkish languages
 */

export type Language = 'en' | 'tr' | 'ar';

export type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

export const translations: Translations = {
  en: {
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.retry': 'Retry',
    'common.copy': 'Copy',
    'common.delete': 'Delete',
    'common.export': 'Export',
    'common.clear': 'Clear',
    'common.close': 'Close',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.search': 'Search',
    
    // Navigation
    'nav.aiAnswers': 'AI-Powered Answers',
    'nav.duaRecommendations': 'Dua Recommendations',
    'nav.prayerTimes': 'Prayer Times',
    'nav.hijriCalendar': 'Hijri Calendar',
    'nav.settings': 'Settings',
    'nav.language': 'Language',
    
    // Chat
    'chat.greeting': 'Assalamu alaikum!',
    'chat.howCanIHelp': 'How can I help you today?',
    'chat.askAboutIslam': 'Ask me anything about Islam, based on Quran, Hadith, and scholars.',
    'chat.askQuestion': 'Ask a question...',
    'chat.thinking': 'Thinking...',
    'chat.references': 'References',
    'chat.send': 'Send',
    'chat.shiftForNewLine': 'Shift + Enter for a new line.',
    'chat.copiedToClipboard': 'Text copied to clipboard.',
    'chat.failedToCopy': 'Failed to copy text.',
    'chat.messageDeleted': 'Message deleted.',
    'chat.chatCleared': 'Chat history cleared.',
    'chat.exportedSuccessfully': 'Chat exported successfully.',
    'chat.responseRegenerated': 'Response regenerated successfully.',
    
    // Dua
    'dua.title': 'Dua Recommendations',
    'dua.placeholder': 'Describe a situation, e.g., \'for an exam\' or \'when feeling anxious\'',
    'dua.description': 'Get dua recommendations for any situation you are facing.',
    'dua.findingBestDuas': 'Finding the best duas for you...',
    'dua.hereAreRecommendations': 'Here are some recommendations:',
    'dua.getCopied': 'Dua copied to clipboard.',
    'dua.failedToCopy': 'Failed to copy dua.',
    'dua.getRecommendations': 'Get Recommendations',
    
    // Prayer Times
    'prayer.title': 'Prayer Times',
    'prayer.fajr': 'Fajr',
    'prayer.sunrise': 'Sunrise',
    'prayer.dhuhr': 'Dhuhr',
    'prayer.asr': 'Asr',
    'prayer.maghrib': 'Maghrib',
    'prayer.isha': 'Isha',
    'prayer.imsak': 'Imsak',
    'prayer.midnight': 'Midnight',
    'prayer.nextPrayer': 'Next Prayer',
    'prayer.location': 'Location',
    'prayer.gregorianDate': 'Gregorian',
    'prayer.hijriDate': 'Hijri',
    'prayer.additionalTimes': 'Additional Times',
    'prayer.refresh': 'Refresh',
    'prayer.locationAccessDenied': 'Location access denied. Please enable location services.',
    'prayer.failedToFetch': 'Failed to fetch prayer times.',
    'prayer.tryAgain': 'Try Again',
    'prayer.fetchingPrayerTimes': 'Fetching prayer times...',
    
    // Calendar
    'calendar.title': 'Hijri Calendar',
    'calendar.todayHijriDate': "Today's Hijri Date",
    'calendar.previousMonth': 'Previous Month',
    'calendar.nextMonth': 'Next Month',
    'calendar.today': 'Today',
    'calendar.allMonths': 'All Months',
    'calendar.specialDates': 'Special Dates',
    'calendar.year': 'Year',
    'calendar.selectedDate': 'Selected Date',
    
    // Months
    'months.muharram': 'Muharram',
    'months.safar': 'Safar',
    'months.rabiAlAwwal': 'Rabi al-Awwal',
    'months.rabiAlThani': 'Rabi al-Thani',
    'months.jumadaAlAwwal': 'Jumada al-Awwal',
    'months.jumadaAlThani': 'Jumada al-Thani',
    'months.rajab': 'Rajab',
    'months.shaaban': 'Shaaban',
    'months.ramadan': 'Ramadan',
    'months.shawwal': 'Shawwal',
    'months.dhuAlQadah': 'Dhu al-Qadah',
    'months.dhuAlHijjah': 'Dhu al-Hijjah',
    
    // Special Islamic Dates
    'specialDates.islamicNewYear': 'Islamic New Year',
    'specialDates.ashura': 'Ashura',
    'specialDates.mawlidAlNabi': 'Mawlid al-Nabi',
    'specialDates.israAndMiraj': 'Isra and Mi\'raj',
    'specialDates.laylatAlQadr': 'Laylat al-Qadr',
    'specialDates.eidAlFitr': 'Eid al-Fitr',
    'specialDates.dayOfArafah': 'Day of Arafah',
    'specialDates.eidAlAdha': 'Eid al-Adha',
    
    // Week Days
    'weekDays.sun': 'Sun',
    'weekDays.mon': 'Mon',
    'weekDays.tue': 'Tue',
    'weekDays.wed': 'Wed',
    'weekDays.thu': 'Thu',
    'weekDays.fri': 'Fri',
    'weekDays.sat': 'Sat',
  },
  
  tr: {
    // Common
    'common.loading': 'Yükleniyor...',
    'common.error': 'Hata',
    'common.success': 'Başarılı',
    'common.retry': 'Yeniden Dene',
    'common.copy': 'Kopyala',
    'common.delete': 'Sil',
    'common.export': 'Dışa Aktar',
    'common.clear': 'Temizle',
    'common.close': 'Kapat',
    'common.cancel': 'İptal',
    'common.save': 'Kaydet',
    'common.search': 'Ara',
    
    // Navigation
    'nav.aiAnswers': 'AI Destekli Cevaplar',
    'nav.duaRecommendations': 'Dua Tavsiyeleri',
    'nav.prayerTimes': 'Namaz Vakitleri',
    'nav.hijriCalendar': 'Hicri Takvim',
    'nav.settings': 'Ayarlar',
    'nav.language': 'Dil',
    
    // Chat
    'chat.greeting': 'Esselamu Aleyküm!',
    'chat.howCanIHelp': 'Bugün size nasıl yardımcı olabilirim?',
    'chat.askAboutIslam': 'Kur\'an, Hadis ve alimlere dayalı İslami konularda bana sorunuzu sorun.',
    'chat.askQuestion': 'Bir sorun sorun...',
    'chat.thinking': 'Düşünüyor...',
    'chat.references': 'Referanslar',
    'chat.send': 'Gönder',
    'chat.shiftForNewLine': 'Yeni satır için Shift + Enter tuşuna basın.',
    'chat.copiedToClipboard': 'Metin panoya kopyalandı.',
    'chat.failedToCopy': 'Metin kopyalanamadı.',
    'chat.messageDeleted': 'Mesaj silindi.',
    'chat.chatCleared': 'Sohbet geçmişi temizlendi.',
    'chat.exportedSuccessfully': 'Sohbet başarıyla dışa aktarıldı.',
    'chat.responseRegenerated': 'Cevap başarıyla yeniden oluşturuldu.',
    
    // Dua
    'dua.title': 'Dua Tavsiyeleri',
    'dua.placeholder': 'Bir durum açıklayın, örn., "sınav için" veya "kaygılıyken"',
    'dua.description': 'Karşılaştığınız herhangi bir durum için dua önerileri alın.',
    'dua.findingBestDuas': 'En uygun duaları buluyorum...',
    'dua.hereAreRecommendations': 'İşte bazı öneriler:',
    'dua.getCopied': 'Dua panoya kopyalandı.',
    'dua.failedToCopy': 'Dua kopyalanamadı.',
    'dua.getRecommendations': 'Tavsiyeleri Al',
    
    // Prayer Times
    'prayer.title': 'Namaz Vakitleri',
    'prayer.fajr': 'İmsak',
    'prayer.sunrise': 'Güneş',
    'prayer.dhuhr': 'Öğle',
    'prayer.asr': 'İkindi',
    'prayer.maghrib': 'Akşam',
    'prayer.isha': 'Yatsı',
    'prayer.imsak': 'İmsak',
    'prayer.midnight': 'Gece Yarısı',
    'prayer.nextPrayer': 'Sıradaki Namaz',
    'prayer.location': 'Konum',
    'prayer.gregorianDate': 'Miladi',
    'prayer.hijriDate': 'Hicri',
    'prayer.additionalTimes': 'Diğer Vakitler',
    'prayer.refresh': 'Yenile',
    'prayer.locationAccessDenied': 'Konum erişimi reddedildi. Lütfen konum hizmetlerini etkinleştirin.',
    'prayer.failedToFetch': 'Namaz vakitleri alınamadı.',
    'prayer.tryAgain': 'Tekrar Dene',
    'prayer.fetchingPrayerTimes': 'Namaz vakitleri getiriliyor...',
    
    // Calendar
    'calendar.title': 'Hicri Takvim',
    'calendar.todayHijriDate': 'Bugünün Hicri Tarihi',
    'calendar.previousMonth': 'Önceki Ay',
    'calendar.nextMonth': 'Sonraki Ay',
    'calendar.today': 'Bugün',
    'calendar.allMonths': 'Tüm Aylar',
    'calendar.specialDates': 'Özel Günler',
    'calendar.year': 'Yıl',
    'calendar.selectedDate': 'Seçilen Tarih',
    
    // Months
    'months.muharram': 'Muharrem',
    'months.safar': 'Safer',
    'months.rabiAlAwwal': 'Rebiülevvel',
    'months.rabiAlThani': 'Rebiülahir',
    'months.jumadaAlAwwal': 'Cemaziyülevvel',
    'months.jumadaAlThani': 'Cemaziyülahir',
    'months.rajab': 'Recep',
    'months.shaaban': 'Şa\'ban',
    'months.ramadan': 'Ramazan',
    'months.shawwal': 'Şevval',
    'months.dhuAlQadah': 'Zilkade',
    'months.dhuAlHijjah': 'Zilhicce',
    
    // Special Islamic Dates
    'specialDates.islamicNewYear': 'Hicri Yılbaşı',
    'specialDates.ashura': 'Aşure Günü',
    'specialDates.mawlidAlNabi': 'Mevlid Kandili',
    'specialDates.israAndMiraj': 'Mirac Kandili',
    'specialDates.laylatAlQadr': 'Kadir Gecesi',
    'specialDates.eidAlFitr': 'Ramazan Bayramı',
    'specialDates.dayOfArafah': 'Arefe Günü',
    'specialDates.eidAlAdha': 'Kurban Bayramı',
    
    // Week Days
    'weekDays.sun': 'Paz',
    'weekDays.mon': 'Pzt',
    'weekDays.tue': 'Sal',
    'weekDays.wed': 'Çar',
    'weekDays.thu': 'Per',
    'weekDays.fri': 'Cum',
    'weekDays.sat': 'Cmt',
  },
  
  ar: {
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'خطأ',
    'common.success': 'نجح',
    'common.retry': 'إعادة المحاولة',
    'common.copy': 'نسخ',
    'common.delete': 'حذف',
    'common.export': 'تصدير',
    'common.clear': 'مسح',
    'common.close': 'إغلاق',
    'common.cancel': 'إلغاء',
    'common.save': 'حفظ',
    'common.search': 'بحث',
    
    // Navigation
    'nav.aiAnswers': 'إجابات بالذكاء الاصطناعي',
    'nav.duaRecommendations': 'توصيات الأدعية',
    'nav.prayerTimes': 'أوقات الصلاة',
    'nav.hijriCalendar': 'التقويم الهجري',
    'nav.settings': 'الإعدادات',
    'nav.language': 'اللغة',
    
    // Chat
    'chat.greeting': 'السلام عليكم!',
    'chat.howCanIHelp': 'كيف يمكنني مساعدتك اليوم؟',
    'chat.askAboutIslam': 'اسألني أي شيء عن الإسلام، بناءً على القرآن والحديث والعلماء.',
    'chat.askQuestion': 'اطرح سؤالاً...',
    'chat.thinking': 'جاري التفكير...',
    'chat.references': 'المراجع',
    'chat.send': 'إرسال',
    'chat.shiftForNewLine': 'Shift + Enter لسطر جديد.',
    'chat.copiedToClipboard': 'تم نسخ النص إلى الحافظة.',
    'chat.failedToCopy': 'فشل نسخ النص.',
    'chat.messageDeleted': 'تم حذف الرسالة.',
    'chat.chatCleared': 'تم مسح سجل المحادثة.',
    'chat.exportedSuccessfully': 'تم تصدير المحادثة بنجاح.',
    'chat.responseRegenerated': 'تم إعادة إنشاء الرد بنجاح.',
    
    // Dua
    'dua.title': 'توصيات الأدعية',
    'dua.placeholder': 'صف موقفاً، مثل "للامتحان" أو "عند الشعور بالقلق"',
    'dua.description': 'احصل على توصيات الأدعية لأي موقف تواجهه.',
    'dua.findingBestDuas': 'جاري البحث عن أفضل الأدعية لك...',
    'dua.hereAreRecommendations': 'إليك بعض التوصيات:',
    'dua.getCopied': 'تم نسخ الدعاء إلى الحافظة.',
    'dua.failedToCopy': 'فشل نسخ الدعاء.',
    'dua.getRecommendations': 'احصل على التوصيات',
    
    // Prayer Times
    'prayer.title': 'أوقات الصلاة',
    'prayer.fajr': 'الفجر',
    'prayer.sunrise': 'الشروق',
    'prayer.dhuhr': 'الظهر',
    'prayer.asr': 'العصر',
    'prayer.maghrib': 'المغرب',
    'prayer.isha': 'العشاء',
    'prayer.imsak': 'الإمساك',
    'prayer.midnight': 'منتصف الليل',
    'prayer.nextPrayer': 'الصلاة التالية',
    'prayer.location': 'الموقع',
    'prayer.gregorianDate': 'ميلادي',
    'prayer.hijriDate': 'هجري',
    'prayer.additionalTimes': 'أوقات إضافية',
    'prayer.refresh': 'تحديث',
    'prayer.locationAccessDenied': 'تم رفض الوصول إلى الموقع. يرجى تمكين خدمات الموقع.',
    'prayer.failedToFetch': 'فشل في جلب أوقات الصلاة.',
    'prayer.tryAgain': 'حاول مرة أخرى',
    'prayer.fetchingPrayerTimes': 'جاري جلب أوقات الصلاة...',
    
    // Calendar
    'calendar.title': 'التقويم الهجري',
    'calendar.todayHijriDate': 'التاريخ الهجري اليوم',
    'calendar.previousMonth': 'الشهر السابق',
    'calendar.nextMonth': 'الشهر التالي',
    'calendar.today': 'اليوم',
    'calendar.allMonths': 'جميع الأشهر',
    'calendar.specialDates': 'التواريخ الخاصة',
    'calendar.year': 'السنة',
    'calendar.selectedDate': 'التاريخ المحدد',
    
    // Months
    'months.muharram': 'محرم',
    'months.safar': 'صفر',
    'months.rabiAlAwwal': 'ربيع الأول',
    'months.rabiAlThani': 'ربيع الثاني',
    'months.jumadaAlAwwal': 'جمادى الأولى',
    'months.jumadaAlThani': 'جمادى الثانية',
    'months.rajab': 'رجب',
    'months.shaaban': 'شعبان',
    'months.ramadan': 'رمضان',
    'months.shawwal': 'شوال',
    'months.dhuAlQadah': 'ذو القعدة',
    'months.dhuAlHijjah': 'ذو الحجة',
    
    // Special Islamic Dates
    'specialDates.islamicNewYear': 'رأس السنة الهجرية',
    'specialDates.ashura': 'يوم عاشوراء',
    'specialDates.mawlidAlNabi': 'المولد النبوي',
    'specialDates.israAndMiraj': 'الإسراء والمعراج',
    'specialDates.laylatAlQadr': 'ليلة القدر',
    'specialDates.eidAlFitr': 'عيد الفطر',
    'specialDates.dayOfArafah': 'يوم عرفة',
    'specialDates.eidAlAdha': 'عيد الأضحى',
    
    // Week Days
    'weekDays.sun': 'الأحد',
    'weekDays.mon': 'الإثنين',
    'weekDays.tue': 'الثلاثاء',
    'weekDays.wed': 'الأربعاء',
    'weekDays.thu': 'الخميس',
    'weekDays.fri': 'الجمعة',
    'weekDays.sat': 'السبت',
  },
};

export const defaultLanguage: Language = 'en';

export function getTranslation(key: string, lang: Language = 'en'): string {
  return translations[lang][key] || translations.en[key] || key;
}

export function getAllTranslations(lang: Language) {
  return translations[lang];
}