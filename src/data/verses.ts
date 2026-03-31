import { Verse } from '@/types/verse';

export const verses: Verse[] = [
  // KURAN AYETLERİ - İman ve Tevhid
  {
    id: 'quran-1',
    type: 'quran',
    arabicText: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
    transliteration: 'Qul huwallāhu aḥad. Allāhuṣ-ṣamad. Lam yalid wa lam yūlad. Wa lam yakul-lahū kufuwan aḥad.',
    translation: {
      tr: 'De ki: "O, Allah\'tır, bir tektir. Allah Samed\'dir (her şey O\'na muhtaçtır, O, hiçbir şeye muhtaç değildir). O, doğurmamış ve doğmamıştır. Hiçbir şey O\'na denk ve benzer değildir."',
      en: 'Say: He is Allah, the One. Allah, the Eternal Refuge. He neither begets nor is born. Nor is there to Him any equivalent.',
      ar: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ'
    },
    reference: 'İhlas Suresi, 1-4',
    category: 'iman',
    tags: ['tevhid', 'iman', 'Allah\'ın sıfatları']
  },
  {
    id: 'quran-2',
    type: 'quran',
    arabicText: 'آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ',
    transliteration: 'Āmanar-rasūlu bimā unzila ilayhi mir-rabbihī wal-mu\'minūn. Kullun āmana billāhi wa malā\'ikatihī wa kutubihī wa rusulih.',
    translation: {
      tr: 'Peygamber, Rabbinden kendisine indirilene iman etti, mü\'minler de. Her biri; Allah\'a, meleklerine, kitaplarına ve peygamberlerine iman ettiler.',
      en: 'The Messenger has believed in what was revealed to him from his Lord, and [so have] the believers. All of them have believed in Allah and His angels and His books and His messengers.',
      ar: 'آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ'
    },
    reference: 'Bakara Suresi, 285',
    category: 'iman',
    tags: ['iman', 'inanç esasları', 'peygamber']
  },
  {
    id: 'quran-3',
    type: 'quran',
    arabicText: 'وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ',
    transliteration: 'Wa mā khalaqtul-jinna wal-insa illā liya\'budūn.',
    translation: {
      tr: 'Ben cinleri ve insanları ancak bana ibadet etsinler diye yarattım.',
      en: 'And I did not create the jinn and mankind except to worship Me.',
      ar: 'وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ'
    },
    reference: 'Zariyat Suresi, 56',
    category: 'iman',
    tags: ['yaratılış hikmeti', 'ibadet', 'kulluk']
  },

  // KURAN AYETLERİ - Sabır ve Şükür
  {
    id: 'quran-4',
    type: 'quran',
    arabicText: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا',
    transliteration: 'İnna ma\'al-\'usri yusrā.',
    translation: {
      tr: 'Şüphesiz güçlükle beraber bir kolaylık vardır.',
      en: 'Indeed, with hardship [will be] ease.',
      ar: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا'
    },
    reference: 'İnşirah Suresi, 6',
    category: 'sabır',
    tags: ['sabır', 'ümit', 'zorluk', 'kolaylık']
  },
  {
    id: 'quran-5',
    type: 'quran',
    arabicText: 'وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ وَإِنَّهَا لَكَبِيرَةٌ إِلَّا عَلَى الْخَاشِعِينَ',
    transliteration: 'Wasta\'īnū biṣ-ṣabri waṣ-ṣalāh. Wa innahā lakabīratun illā \'alal-khāshi\'īn.',
    translation: {
      tr: 'Sabır ve namazla Allah\'tan yardım dileyin. Şüphesiz bu, huşu sahibi olanlardan başkasına ağır gelir.',
      en: 'And seek help through patience and prayer, and indeed, it is difficult except for the humbly submissive [to Allah].',
      ar: 'وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ وَإِنَّهَا لَكَبِيرَةٌ إِلَّا عَلَى الْخَاشِعِينَ'
    },
    reference: 'Bakara Suresi, 45',
    category: 'sabır',
    tags: ['sabır', 'namaz', 'huşu', 'yardım']
  },
  {
    id: 'quran-6',
    type: 'quran',
    arabicText: 'لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ',
    transliteration: 'La\'in shakartum la\'azīdannakum.',
    translation: {
      tr: 'Andolsun, eğer şükrederseniz elbette size nimetimi artırırım.',
      en: 'If you are grateful, I will surely increase you [in favor].',
      ar: 'لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ'
    },
    reference: 'İbrahim Suresi, 7',
    category: 'şükür',
    tags: ['şükür', 'nimet', 'bereket']
  },
];