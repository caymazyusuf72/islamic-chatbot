import { QuizQuestion } from '@/types/quiz';

export const quizQuestions: QuizQuestion[] = [
  // Prophets - Easy
  {
    id: 'prophets-1',
    category: 'prophets',
    difficulty: 'easy',
    question: {
      tr: 'İslam\'ın son peygamberi kimdir?',
      en: 'Who is the last prophet of Islam?',
      ar: 'من هو آخر نبي في الإسلام؟'
    },
    options: ['Hz. Muhammed (SAV)', 'Hz. İsa', 'Hz. Musa', 'Hz. İbrahim'],
    correctAnswer: 0,
    explanation: {
      tr: 'Hz. Muhammed (SAV) İslam\'ın son peygamberidir ve kendisinden sonra peygamber gelmeyecektir.',
      en: 'Prophet Muhammad (PBUH) is the last prophet of Islam and no prophet will come after him.',
      ar: 'النبي محمد (صلى الله عليه وسلم) هو آخر نبي في الإسلام ولن يأتي نبي بعده.'
    }
  },
  {
    id: 'prophets-2',
    category: 'prophets',
    difficulty: 'easy',
    question: {
      tr: 'Kabe\'yi ilk inşa eden peygamber kimdir?',
      en: 'Which prophet first built the Kaaba?',
      ar: 'من هو النبي الذي بنى الكعبة أولاً؟'
    },
    options: ['Hz. İbrahim', 'Hz. Muhammed', 'Hz. Nuh', 'Hz. Adem'],
    correctAnswer: 0,
    explanation: {
      tr: 'Hz. İbrahim ve oğlu Hz. İsmail birlikte Kabe\'yi inşa etmişlerdir.',
      en: 'Prophet Ibrahim and his son Ismail built the Kaaba together.',
      ar: 'بنى النبي إبراهيم وابنه إسماعيل الكعبة معاً.'
    }
  },
  {
    id: 'prophets-3',
    category: 'prophets',
    difficulty: 'medium',
    question: {
      tr: 'Hangi peygambere Tevrat indirilmiştir?',
      en: 'To which prophet was the Torah revealed?',
      ar: 'على أي نبي أنزلت التوراة؟'
    },
    options: ['Hz. Musa', 'Hz. İsa', 'Hz. Davud', 'Hz. İbrahim'],
    correctAnswer: 0,
    explanation: {
      tr: 'Tevrat, Hz. Musa\'ya indirilmiş kutsal kitaptır.',
      en: 'The Torah is the holy book revealed to Prophet Moses.',
      ar: 'التوراة هي الكتاب المقدس الذي أنزل على النبي موسى.'
    }
  },
  {
    id: 'prophets-4',
    category: 'prophets',
    difficulty: 'medium',
    question: {
      tr: 'Hangi peygamber balıkla ilgili bir mucize yaşamıştır?',
      en: 'Which prophet experienced a miracle involving a fish?',
      ar: 'أي نبي عاش معجزة تتعلق بالسمك؟'
    },
    options: ['Hz. Yunus', 'Hz. Nuh', 'Hz. Süleyman', 'Hz. Yusuf'],
    correctAnswer: 0,
    explanation: {
      tr: 'Hz. Yunus, balığın karnında kalmış ve Allah\'ın izniyle kurtulmuştur.',
      en: 'Prophet Yunus stayed in the belly of a fish and was saved by Allah\'s permission.',
      ar: 'بقي النبي يونس في بطن الحوت ونجا بإذن الله.'
    }
  },
  {
    id: 'prophets-5',
    category: 'prophets',
    difficulty: 'hard',
    question: {
      tr: 'Hangi peygamber hayvanlarla konuşabiliyordu?',
      en: 'Which prophet could speak with animals?',
      ar: 'أي نبي كان يستطيع التحدث مع الحيوانات؟'
    },
    options: ['Hz. Süleyman', 'Hz. Nuh', 'Hz. Musa', 'Hz. İsa'],
    correctAnswer: 0,
    explanation: {
      tr: 'Hz. Süleyman\'a Allah tarafından hayvanlarla konuşma yeteneği verilmiştir.',
      en: 'Prophet Sulaiman was given the ability to speak with animals by Allah.',
      ar: 'أعطى الله النبي سليمان القدرة على التحدث مع الحيوانات.'
    }
  },

  // Pillars - Easy
  {
    id: 'pillars-1',
    category: 'pillars',
    difficulty: 'easy',
    question: {
      tr: 'İslam\'ın kaç şartı vardır?',
      en: 'How many pillars of Islam are there?',
      ar: 'كم عدد أركان الإسلام؟'
    },
    options: ['5', '3', '7', '10'],
    correctAnswer: 0,
    explanation: {
      tr: 'İslam\'ın 5 şartı vardır: Kelime-i Şehadet, Namaz, Zekat, Oruç ve Hac.',
      en: 'There are 5 pillars of Islam: Shahada, Prayer, Zakat, Fasting, and Hajj.',
      ar: 'هناك 5 أركان للإسلام: الشهادة، الصلاة، الزكاة، الصوم، والحج.'
    }
  },
  {
    id: 'pillars-2',
    category: 'pillars',
    difficulty: 'easy',
    question: {
      tr: 'Günde kaç vakit namaz kılınır?',
      en: 'How many times a day do Muslims pray?',
      ar: 'كم مرة في اليوم يصلي المسلمون؟'
    },
    options: ['5', '3', '7', '2'],
    correctAnswer: 0,
    explanation: {
      tr: 'Müslümanlar günde 5 vakit namaz kılarlar: Sabah, Öğle, İkindi, Akşam ve Yatsı.',
      en: 'Muslims pray 5 times a day: Fajr, Dhuhr, Asr, Maghrib, and Isha.',
      ar: 'يصلي المسلمون 5 مرات في اليوم: الفجر، الظهر، العصر، المغرب، والعشاء.'
    }
  },
  {
    id: 'pillars-3',
    category: 'pillars',
    difficulty: 'medium',
    question: {
      tr: 'Ramazan ayında tutulan oruç İslam\'ın kaçıncı şartıdır?',
      en: 'Which pillar of Islam is fasting in Ramadan?',
      ar: 'أي ركن من أركان الإسلام هو الصيام في رمضان؟'
    },
    options: ['4. Şart', '3. Şart', '5. Şart', '2. Şart'],
    correctAnswer: 0,
    explanation: {
      tr: 'Oruç, İslam\'ın 4. şartıdır ve Ramazan ayında tutulur.',
      en: 'Fasting is the 4th pillar of Islam and is observed during Ramadan.',
      ar: 'الصيام هو الركن الرابع من أركان الإسلام ويتم في شهر رمضان.'
    }
  },
  {
    id: 'pillars-4',
    category: 'pillars',
    difficulty: 'medium',
    question: {
      tr: 'Zekat, malın yüzde kaçı olarak verilir?',
      en: 'What percentage of wealth is given as Zakat?',
      ar: 'ما هي النسبة المئوية من الثروة التي تُعطى كزكاة؟'
    },
    options: ['%2.5', '%5', '%10', '%1'],
    correctAnswer: 0,
    explanation: {
      tr: 'Zekat, belirli şartları taşıyan malın %2.5\'i olarak verilir.',
      en: 'Zakat is given as 2.5% of wealth that meets certain conditions.',
      ar: 'تُعطى الزكاة بنسبة 2.5٪ من الثروة التي تستوفي شروطاً معينة.'
    }
  },
  {
    id: 'pillars-5',
    category: 'pillars',
    difficulty: 'hard',
    question: {
      tr: 'Hac ibadeti hangi İslami ayda yapılır?',
      en: 'In which Islamic month is Hajj performed?',
      ar: 'في أي شهر إسلامي يتم أداء الحج؟'
    },
    options: ['Zilhicce', 'Ramazan', 'Muharrem', 'Şaban'],
    correctAnswer: 0,
    explanation: {
      tr: 'Hac ibadeti, İslami takvimin 12. ayı olan Zilhicce ayında yapılır.',
      en: 'Hajj is performed in Dhul-Hijjah, the 12th month of the Islamic calendar.',
      ar: 'يتم أداء الحج في ذي الحجة، الشهر الثاني عشر من التقويم الإسلامي.'
    }
  },

  // Quran - Easy
  {
    id: 'quran-1',
    category: 'quran',
    difficulty: 'easy',
    question: {
      tr: 'Kuran\'ın kaç suresi vardır?',
      en: 'How many chapters (surahs) are in the Quran?',
      ar: 'كم عدد سور القرآن؟'
    },
    options: ['114', '100', '120', '99'],
    correctAnswer: 0,
    explanation: {
      tr: 'Kuran-ı Kerim 114 sureden oluşmaktadır.',
      en: 'The Holy Quran consists of 114 chapters (surahs).',
      ar: 'يتكون القرآن الكريم من 114 سورة.'
    }
  },
  {
    id: 'quran-2',
    category: 'quran',
    difficulty: 'easy',
    question: {
      tr: 'Kuran\'ın ilk suresi hangisidir?',
      en: 'What is the first surah of the Quran?',
      ar: 'ما هي أول سورة في القرآن؟'
    },
    options: ['Fatiha', 'Bakara', 'İhlas', 'Nas'],
    correctAnswer: 0,
    explanation: {
      tr: 'Fatiha suresi, Kuran\'ın ilk suresidir ve namazda okunması farzdır.',
      en: 'Surah Al-Fatiha is the first chapter of the Quran and is recited in every prayer.',
      ar: 'سورة الفاتحة هي أول سورة في القرآن وتُقرأ في كل صلاة.'
    }
  },
  {
    id: 'quran-3',
    category: 'quran',
    difficulty: 'medium',
    question: {
      tr: 'Kuran\'ın en uzun suresi hangisidir?',
      en: 'What is the longest surah in the Quran?',
      ar: 'ما هي أطول سورة في القرآن؟'
    },
    options: ['Bakara', 'Al-i İmran', 'Nisa', 'Maide'],
    correctAnswer: 0,
    explanation: {
      tr: 'Bakara suresi, 286 ayetle Kuran\'ın en uzun suresidir.',
      en: 'Surah Al-Baqarah is the longest chapter with 286 verses.',
      ar: 'سورة البقرة هي أطول سورة في القرآن بـ 286 آية.'
    }
  },
  {
    id: 'quran-4',
    category: 'quran',
    difficulty: 'medium',
    question: {
      tr: 'Kuran hangi dilde indirilmiştir?',
      en: 'In which language was the Quran revealed?',
      ar: 'بأي لغة نزل القرآن؟'
    },
    options: ['Arapça', 'Türkçe', 'Farsça', 'İbranice'],
    correctAnswer: 0,
    explanation: {
      tr: 'Kuran-ı Kerim Arapça olarak Hz. Muhammed\'e indirilmiştir.',
      en: 'The Holy Quran was revealed in Arabic to Prophet Muhammad.',
      ar: 'نزل القرآن الكريم باللغة العربية على النبي محمد.'
    }
  },
  {
    id: 'quran-5',
    category: 'quran',
    difficulty: 'hard',
    question: {
      tr: 'Kuran\'da kaç cüz vardır?',
      en: 'How many juz (parts) are in the Quran?',
      ar: 'كم عدد الأجزاء في القرآن؟'
    },
    options: ['30', '20', '40', '25'],
    correctAnswer: 0,
    explanation: {
      tr: 'Kuran-ı Kerim, kolaylık açısından 30 cüze ayrılmıştır.',
      en: 'The Holy Quran is divided into 30 juz (parts) for ease of reading.',
      ar: 'ينقسم القرآن الكريم إلى 30 جزءاً لتسهيل القراءة.'
    }
  },

  // History - Easy
  {
    id: 'history-1',
    category: 'history',
    difficulty: 'easy',
    question: {
      tr: 'Hz. Muhammed hangi şehirde doğmuştur?',
      en: 'In which city was Prophet Muhammad born?',
      ar: 'في أي مدينة ولد النبي محمد؟'
    },
    options: ['Mekke', 'Medine', 'Kudüs', 'Şam'],
    correctAnswer: 0,
    explanation: {
      tr: 'Hz. Muhammed (SAV) Mekke\'de doğmuştur.',
      en: 'Prophet Muhammad (PBUH) was born in Mecca.',
      ar: 'ولد النبي محمد (صلى الله عليه وسلم) في مكة.'
    }
  },
  {
    id: 'history-2',
    category: 'history',
    difficulty: 'easy',
    question: {
      tr: 'Hicret hangi iki şehir arasında gerçekleşmiştir?',
      en: 'Between which two cities did the Hijra take place?',
      ar: 'بين أي مدينتين حدثت الهجرة؟'
    },
    options: ['Mekke-Medine', 'Mekke-Kudüs', 'Medine-Şam', 'Mekke-Yemen'],
    correctAnswer: 0,
    explanation: {
      tr: 'Hicret, Mekke\'den Medine\'ye yapılan göçtür ve İslami takvimin başlangıcıdır.',
      en: 'The Hijra was the migration from Mecca to Medina and marks the beginning of the Islamic calendar.',
      ar: 'الهجرة هي الانتقال من مكة إلى المدينة وتمثل بداية التقويم الإسلامي.'
    }
  },
  {
    id: 'history-3',
    category: 'history',
    difficulty: 'medium',
    question: {
      tr: 'İlk müslüman kadın kimdir?',
      en: 'Who was the first Muslim woman?',
      ar: 'من هي أول امرأة مسلمة؟'
    },
    options: ['Hz. Hatice', 'Hz. Aişe', 'Hz. Fatıma', 'Hz. Meryem'],
    correctAnswer: 0,
    explanation: {
      tr: 'Hz. Hatice, Hz. Muhammed\'in eşi ve İslam\'ı kabul eden ilk kadındır.',
      en: 'Khadijah was the wife of Prophet Muhammad and the first woman to accept Islam.',
      ar: 'خديجة كانت زوجة النبي محمد وأول امرأة تقبل الإسلام.'
    }
  },
  {
    id: 'history-4',
    category: 'history',
    difficulty: 'medium',
    question: {
      tr: 'İlk ezan hangi sahabi tarafından okunmuştur?',
      en: 'Which companion gave the first call to prayer (adhan)?',
      ar: 'من هو الصحابي الذي أذن أول مرة؟'
    },
    options: ['Hz. Bilal', 'Hz. Ömer', 'Hz. Ali', 'Hz. Ebu Bekir'],
    correctAnswer: 0,
    explanation: {
      tr: 'Hz. Bilal-i Habeşi, İslam tarihinde ilk ezanı okuyan sahabidir.',
      en: 'Bilal ibn Rabah was the first person to give the call to prayer in Islamic history.',
      ar: 'بلال بن رباح كان أول من أذن في تاريخ الإسلام.'
    }
  },
  {
    id: 'history-5',
    category: 'history',
    difficulty: 'hard',
    question: {
      tr: 'Miraç olayı hangi şehirden başlamıştır?',
      en: 'From which city did the Night Journey (Isra and Miraj) begin?',
      ar: 'من أي مدينة بدأت رحلة الإسراء والمعراج؟'
    },
    options: ['Mekke', 'Medine', 'Kudüs', 'Taif'],
    correctAnswer: 0,
    explanation: {
      tr: 'Miraç olayı Mekke\'den başlamış, Kudüs\'e oradan da göklere yükselmiştir.',
      en: 'The Night Journey began in Mecca, went to Jerusalem, and then ascended to the heavens.',
      ar: 'بدأت رحلة الإسراء والمعراج من مكة، ثم إلى القدس، ثم صعدت إلى السماوات.'
    }
  },

  // General - Easy
  {
    id: 'general-1',
    category: 'general',
    difficulty: 'easy',
    question: {
      tr: 'Müslümanların kıblesi neresidir?',
      en: 'What is the Qibla for Muslims?',
      ar: 'ما هي القبلة للمسلمين؟'
    },
    options: ['Kabe', 'Mescid-i Nebevi', 'Mescid-i Aksa', 'Arafat'],
    correctAnswer: 0,
    explanation: {
      tr: 'Müslümanlar namaz kılarken Mekke\'deki Kabe\'ye yönelirler.',
      en: 'Muslims face the Kaaba in Mecca when they pray.',
      ar: 'يتجه المسلمون نحو الكعبة في مكة عند الصلاة.'
    }
  },
  {
    id: 'general-2',
    category: 'general',
    difficulty: 'easy',
    question: {
      tr: 'Cuma namazı hangi gün kılınır?',
      en: 'On which day is Jummah prayer performed?',
      ar: 'في أي يوم تُصلى صلاة الجمعة؟'
    },
    options: ['Cuma', 'Cumartesi', 'Pazar', 'Pazartesi'],
    correctAnswer: 0,
    explanation: {
      tr: 'Cuma namazı, haftanın Cuma günü öğle vaktinde cemaatle kılınır.',
      en: 'Jummah prayer is performed in congregation on Friday at noon.',
      ar: 'تُصلى صلاة الجمعة جماعة يوم الجمعة في وقت الظهر.'
    }
  },
  {
    id: 'general-3',
    category: 'general',
    difficulty: 'medium',
    question: {
      tr: 'Abdest alırken kaç kere yıkanır?',
      en: 'How many times should each part be washed during ablution (wudu)?',
      ar: 'كم مرة يجب غسل كل جزء أثناء الوضوء؟'
    },
    options: ['3', '1', '5', '7'],
    correctAnswer: 0,
    explanation: {
      tr: 'Abdest alırken her uzuv üç kere yıkanır.',
      en: 'Each part should be washed three times during ablution.',
      ar: 'يجب غسل كل جزء ثلاث مرات أثناء الوضوء.'
    }
  },
  {
    id: 'general-4',
    category: 'general',
    difficulty: 'medium',
    question: {
      tr: 'Kurban Bayramı kaç gün sürer?',
      en: 'How many days does Eid al-Adha last?',
      ar: 'كم يوماً يستمر عيد الأضحى؟'
    },
    options: ['4', '3', '5', '7'],
    correctAnswer: 0,
    explanation: {
      tr: 'Kurban Bayramı 4 gün sürer ve ilk günü bayram namazı kılınır.',
      en: 'Eid al-Adha lasts 4 days and the Eid prayer is performed on the first day.',
      ar: 'يستمر عيد الأضحى 4 أيام وتُصلى صلاة العيد في اليوم الأول.'
    }
  },
  {
    id: 'general-5',
    category: 'general',
    difficulty: 'hard',
    question: {
      tr: 'Teravih namazı hangi ayda kılınır?',
      en: 'In which month is Taraweeh prayer performed?',
      ar: 'في أي شهر تُصلى صلاة التراويح؟'
    },
    options: ['Ramazan', 'Şaban', 'Recep', 'Şevval'],
    correctAnswer: 0,
    explanation: {
      tr: 'Teravih namazı, Ramazan ayında yatsı namazından sonra kılınan sünnet namazdır.',
      en: 'Taraweeh is a sunnah prayer performed after Isha prayer during Ramadan.',
      ar: 'التراويح هي صلاة سنة تُصلى بعد صلاة العشاء في شهر رمضان.'
    }
  },

  // Additional questions for variety
  {
    id: 'prophets-6',
    category: 'prophets',
    difficulty: 'hard',
    question: {
      tr: 'Hangi peygambere Zebur indirilmiştir?',
      en: 'To which prophet was the Psalms (Zabur) revealed?',
      ar: 'على أي نبي أنزل الزبور؟'
    },
    options: ['Hz. Davud', 'Hz. Süleyman', 'Hz. Musa', 'Hz. İsa'],
    correctAnswer: 0,
    explanation: {
      tr: 'Zebur, Hz. Davud\'a indirilmiş kutsal kitaptır.',
      en: 'The Psalms (Zabur) is the holy book revealed to Prophet David.',
      ar: 'الزبور هو الكتاب المقدس الذي أنزل على النبي داود.'
    }
  },
  {
    id: 'pillars-6',
    category: 'pillars',
    difficulty: 'hard',
    question: {
      tr: 'Kelime-i Şehadet\'in Türkçe anlamı nedir?',
      en: 'What is the meaning of Shahada?',
      ar: 'ما معنى الشهادة؟'
    },
    options: [
      'Allah\'tan başka ilah yoktur, Muhammed O\'nun elçisidir',
      'Allah birdir',
      'Namaz kılınız',
      'Zekat veriniz'
    ],
    correctAnswer: 0,
    explanation: {
      tr: 'Kelime-i Şehadet, İslam\'ın temel inancını ifade eden şehadet cümlesidir.',
      en: 'The Shahada is the Islamic declaration of faith expressing the core belief.',
      ar: 'الشهادة هي إعلان الإيمان الإسلامي الذي يعبر عن العقيدة الأساسية.'
    }
  }
];