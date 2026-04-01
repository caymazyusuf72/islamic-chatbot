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
  },

  // Ethics and Manners (Ahlak ve Adab) - NEW CATEGORY
  {
    id: 'ethics-1',
    category: 'ethics',
    difficulty: 'easy',
    question: {
      tr: 'İslam\'da en güzel ahlak örneği kimdir?',
      en: 'Who is the best example of good character in Islam?',
      ar: 'من هو أفضل مثال للأخلاق الحسنة في الإسلام؟'
    },
    options: ['Hz. Muhammed (SAV)', 'Hz. Ebu Bekir', 'Hz. Ömer', 'Hz. Ali'],
    correctAnswer: 0,
    explanation: {
      tr: 'Hz. Muhammed (SAV) en güzel ahlak örneğidir ve Kuran\'da "üstün bir ahlak üzeresin" diye övülmüştür.',
      en: 'Prophet Muhammad (PBUH) is the best example of good character and is praised in the Quran.',
      ar: 'النبي محمد (صلى الله عليه وسلم) هو أفضل مثال للأخلاق الحسنة.'
    }
  },
  {
    id: 'ethics-2',
    category: 'ethics',
    difficulty: 'easy',
    question: {
      tr: 'Anne babaya nasıl davranılmalıdır?',
      en: 'How should we treat our parents?',
      ar: 'كيف يجب أن نعامل والدينا؟'
    },
    options: ['Saygı ve iyilikle', 'Sadece itaat ederek', 'Uzak durarak', 'Bazen ziyaret ederek'],
    correctAnswer: 0,
    explanation: {
      tr: 'İslam\'da anne babaya saygı ve iyilik göstermek, Allah\'a ibadetten sonra en önemli görevdir.',
      en: 'In Islam, showing respect and kindness to parents is the most important duty after worship to Allah.',
      ar: 'في الإسلام، إظهار الاحترام واللطف للوالدين هو أهم واجب بعد عبادة الله.'
    }
  },
  {
    id: 'ethics-3',
    category: 'ethics',
    difficulty: 'medium',
    question: {
      tr: 'Komşu hakları İslam\'da ne kadar önemlidir?',
      en: 'How important are the rights of neighbors in Islam?',
      ar: 'ما مدى أهمية حقوق الجيران في الإسلام؟'
    },
    options: ['Çok önemlidir', 'Önemli değildir', 'Sadece Müslüman komşular için', 'İsteğe bağlıdır'],
    correctAnswer: 0,
    explanation: {
      tr: 'Hz. Muhammed (SAV) komşu haklarının önemini vurgulamıştır.',
      en: 'Prophet Muhammad (PBUH) emphasized the importance of neighbors\' rights.',
      ar: 'أكد النبي محمد (صلى الله عليه وسلم) على أهمية حقوق الجيران.'
    }
  },
  {
    id: 'ethics-4',
    category: 'ethics',
    difficulty: 'medium',
    question: {
      tr: 'Yalan söylemek İslam\'da nasıl değerlendirilir?',
      en: 'How is lying viewed in Islam?',
      ar: 'كيف يُنظر إلى الكذب في الإسلام؟'
    },
    options: ['Büyük günahtır', 'Küçük günahtır', 'Bazen caizdir', 'Günah değildir'],
    correctAnswer: 0,
    explanation: {
      tr: 'Yalan söylemek İslam\'da büyük günahlardan biridir.',
      en: 'Lying is one of the major sins in Islam.',
      ar: 'الكذب من الكبائر في الإسلام.'
    }
  },
  {
    id: 'ethics-5',
    category: 'ethics',
    difficulty: 'hard',
    question: {
      tr: 'Gıybet (dedikodu) nedir?',
      en: 'What is backbiting (gheebah)?',
      ar: 'ما هي الغيبة؟'
    },
    options: ['Arkasından kötü konuşmak', 'Yüzüne karşı eleştirmek', 'İftira atmak', 'Yalan söylemek'],
    correctAnswer: 0,
    explanation: {
      tr: 'Gıybet, bir kimsenin yokken onun hoşlanmayacağı doğru şeyleri söylemektir ve haramdır.',
      en: 'Backbiting is mentioning something about a person in their absence that they would dislike.',
      ar: 'الغيبة هي ذكر شيء عن شخص في غيابه مما يكرهه.'
    }
  },
  {
    id: 'ethics-6',
    category: 'ethics',
    difficulty: 'easy',
    question: {
      tr: 'Sadaka vermek hangi ahlaki değeri gösterir?',
      en: 'What moral value does giving charity demonstrate?',
      ar: 'ما القيمة الأخلاقية التي تظهرها الصدقة؟'
    },
    options: ['Cömertlik', 'Kibir', 'Gösteriş', 'Bencillik'],
    correctAnswer: 0,
    explanation: {
      tr: 'Sadaka vermek cömertliği, paylaşmayı ve başkalarını düşünmeyi gösterir.',
      en: 'Giving charity demonstrates generosity, sharing, and caring for others.',
      ar: 'إعطاء الصدقة يُظهر الكرم والمشاركة والاهتمام بالآخرين.'
    }
  },
  {
    id: 'ethics-7',
    category: 'ethics',
    difficulty: 'medium',
    question: {
      tr: 'Sabır İslam\'da nasıl bir erdemdir?',
      en: 'What kind of virtue is patience in Islam?',
      ar: 'ما نوع الفضيلة التي يمثلها الصبر في الإسلام؟'
    },
    options: ['En yüce erdemlerden', 'Zayıflık işaretidir', 'Önemsizdir', 'Sadece peygamberlere mahsustur'],
    correctAnswer: 0,
    explanation: {
      tr: 'Sabır İslam\'da en yüce erdemlerden biridir ve Kuran\'da defalarca övülmüştür.',
      en: 'Patience is one of the highest virtues in Islam and is praised repeatedly in the Quran.',
      ar: 'الصبر من أعلى الفضائل في الإسلام.'
    }
  },
  {
    id: 'ethics-8',
    category: 'ethics',
    difficulty: 'hard',
    question: {
      tr: 'Tevazu (alçak gönüllülük) neden önemlidir?',
      en: 'Why is humility important?',
      ar: 'لماذا التواضع مهم؟'
    },
    options: ['Kibri önler ve Allah\'a yaklaştırır', 'Zayıf görünmemizi sağlar', 'Başkaları bizi sever', 'Toplumda kabul görürüz'],
    correctAnswer: 0,
    explanation: {
      tr: 'Tevazu kibri önler, insanı Allah\'a yaklaştırır ve İslam\'ın temel ahlaki değerlerindendir.',
      en: 'Humility prevents arrogance, brings one closer to Allah.',
      ar: 'التواضع يمنع الكبر، ويقرب الإنسان من الله.'
    }
  },
  {
    id: 'ethics-9',
    category: 'ethics',
    difficulty: 'medium',
    question: {
      tr: 'Emanete hıyanet etmek nasıl bir günahtır?',
      en: 'What kind of sin is betraying trust?',
      ar: 'ما نوع الخطيئة التي تمثلها خيانة الأمانة؟'
    },
    options: ['Büyük günahtır', 'Küçük günahtır', 'Günah değildir', 'Bazen caizdir'],
    correctAnswer: 0,
    explanation: {
      tr: 'Emanete hıyanet büyük günahlardan biridir.',
      en: 'Betraying trust is a major sin.',
      ar: 'خيانة الأمانة من الكبائر.'
    }
  },
  {
    id: 'ethics-10',
    category: 'ethics',
    difficulty: 'easy',
    question: {
      tr: 'Gülümsemek İslam\'da nasıl değerlendirilir?',
      en: 'How is smiling viewed in Islam?',
      ar: 'كيف يُنظر إلى الابتسامة في الإسلام؟'
    },
    options: ['Sadaka sayılır', 'Önemsizdir', 'Gereksizdir', 'Zaman kaybıdır'],
    correctAnswer: 0,
    explanation: {
      tr: 'Hz. Muhammed (SAV) "Kardeşinin yüzüne gülümsemen sadakadır" buyurmuştur.',
      en: 'Prophet Muhammad (PBUH) said: "Your smile for your brother is a charity".',
      ar: 'قال النبي محمد: "تبسمك في وجه أخيك صدقة".'
    }
  },

  // Hajj and Umrah (Hac ve Umre) - NEW CATEGORY
  {
    id: 'hajj-1',
    category: 'hajj',
    difficulty: 'easy',
    question: {
      tr: 'Hac ibadeti İslam\'ın kaçıncı şartıdır?',
      en: 'Which pillar of Islam is Hajj?',
      ar: 'أي ركن من أركان الإسلام هو الحج؟'
    },
    options: ['5. Şart', '4. Şart', '3. Şart', '2. Şart'],
    correctAnswer: 0,
    explanation: {
      tr: 'Hac, İslam\'ın 5. şartıdır ve gücü yeten her Müslüman\'a ömründe bir kez farzdır.',
      en: 'Hajj is the 5th pillar of Islam and is obligatory once in a lifetime.',
      ar: 'الحج هو الركن الخامس من أركان الإسلام.'
    }
  },
  {
    id: 'hajj-2',
    category: 'hajj',
    difficulty: 'easy',
    question: {
      tr: 'Hac hangi şehirde yapılır?',
      en: 'In which city is Hajj performed?',
      ar: 'في أي مدينة يُؤدى الحج؟'
    },
    options: ['Mekke', 'Medine', 'Kudüs', 'Cidde'],
    correctAnswer: 0,
    explanation: {
      tr: 'Hac ibadeti Mekke\'de ve çevresindeki kutsal yerlerde yapılır.',
      en: 'Hajj is performed in Mecca and the surrounding holy sites.',
      ar: 'يُؤدى الحج في مكة والمواقع المقدسة المحيطة بها.'
    }
  },
  {
    id: 'hajj-3',
    category: 'hajj',
    difficulty: 'medium',
    question: {
      tr: 'Arafat vakfesi hangi günde yapılır?',
      en: 'On which day is the standing at Arafat performed?',
      ar: 'في أي يوم يتم الوقوف بعرفة؟'
    },
    options: ['Zilhicce 9', 'Zilhicce 10', 'Zilhicce 8', 'Zilhicce 11'],
    correctAnswer: 0,
    explanation: {
      tr: 'Arafat vakfesi, Haccın en önemli rüknü olup Zilhicce ayının 9. günü yapılır.',
      en: 'The standing at Arafat is the most important pillar of Hajj.',
      ar: 'الوقوف بعرفة هو أهم ركن من أركان الحج.'
    }
  },
  {
    id: 'hajj-4',
    category: 'hajj',
    difficulty: 'medium',
    question: {
      tr: 'İhram nedir?',
      en: 'What is Ihram?',
      ar: 'ما هو الإحرام؟'
    },
    options: ['Hac için giyilen özel kıyafet ve niyetlenme hali', 'Sadece beyaz elbise', 'Hac duası', 'Kabe\'yi tavaf etmek'],
    correctAnswer: 0,
    explanation: {
      tr: 'İhram, Hac veya Umre için niyetlenme hali ve giyilen özel kıyafettir.',
      en: 'Ihram is the state of consecration and special clothing worn for Hajj or Umrah.',
      ar: 'الإحرام هو حالة التقديس والملابس الخاصة.'
    }
  },
  {
    id: 'hajj-5',
    category: 'hajj',
    difficulty: 'hard',
    question: {
      tr: 'Tavaf kaç kere yapılır?',
      en: 'How many times is Tawaf performed?',
      ar: 'كم مرة يتم الطواف؟'
    },
    options: ['7 kere', '5 kere', '3 kere', '10 kere'],
    correctAnswer: 0,
    explanation: {
      tr: 'Tavaf, Kabe\'nin etrafında 7 kere dönmektir.',
      en: 'Tawaf is circling the Kaaba 7 times.',
      ar: 'الطواف هو الدوران حول الكعبة 7 مرات.'
    }
  },
  {
    id: 'hajj-6',
    category: 'hajj',
    difficulty: 'medium',
    question: {
      tr: 'Safa ve Merve arasında kaç kere gidilir?',
      en: 'How many times is the walk between Safa and Marwa performed?',
      ar: 'كم مرة يتم السعي بين الصفا والمروة؟'
    },
    options: ['7 kere', '5 kere', '3 kere', '9 kere'],
    correctAnswer: 0,
    explanation: {
      tr: 'Safa ile Merve arasında 7 kere gidip gelinir, buna Sa\'y denir.',
      en: 'The walk between Safa and Marwa is performed 7 times, called Sa\'y.',
      ar: 'السعي بين الصفا والمروة يتم 7 مرات.'
    }
  },
  {
    id: 'hajj-7',
    category: 'hajj',
    difficulty: 'hard',
    question: {
      tr: 'Şeytan taşlama (Cemre) hangi günlerde yapılır?',
      en: 'On which days is the stoning of the devil (Jamarat) performed?',
      ar: 'في أي أيام يتم رمي الجمرات؟'
    },
    options: ['Zilhicce 10, 11, 12, 13', 'Sadece Zilhicce 10', 'Zilhicce 9 ve 10', 'Zilhicce 8, 9, 10'],
    correctAnswer: 0,
    explanation: {
      tr: 'Cemre atma, Kurban Bayramı günü başlar ve teşrik günlerinde devam eder.',
      en: 'The stoning begins on Eid day and continues during the days of Tashreeq.',
      ar: 'يبدأ رمي الجمرات في يوم العيد.'
    }
  },
  {
    id: 'hajj-8',
    category: 'hajj',
    difficulty: 'easy',
    question: {
      tr: 'Umre hangi zaman yapılabilir?',
      en: 'When can Umrah be performed?',
      ar: 'متى يمكن أداء العمرة؟'
    },
    options: ['Yılın her zamanı', 'Sadece Ramazan\'da', 'Sadece Zilhicce\'de', 'Sadece kışın'],
    correctAnswer: 0,
    explanation: {
      tr: 'Umre, yılın her zamanında yapılabilir, ancak Ramazan\'da sevabı daha fazladır.',
      en: 'Umrah can be performed at any time of the year.',
      ar: 'يمكن أداء العمرة في أي وقت من السنة.'
    }
  },
  {
    id: 'hajj-9',
    category: 'hajj',
    difficulty: 'medium',
    question: {
      tr: 'Mina\'da kaç gece geçirilir?',
      en: 'How many nights are spent in Mina?',
      ar: 'كم ليلة تُقضى في منى؟'
    },
    options: ['2-3 gece', '1 gece', '4 gece', '5 gece'],
    correctAnswer: 0,
    explanation: {
      tr: 'Hacılar Mina\'da teşrik günlerinde 2 veya 3 gece geçirirler.',
      en: 'Pilgrims spend 2 or 3 nights in Mina during the days of Tashreeq.',
      ar: 'يقضي الحجاج ليلتين أو ثلاث ليالٍ في منى.'
    }
  },
  {
    id: 'hajj-10',
    category: 'hajj',
    difficulty: 'hard',
    question: {
      tr: 'Veda tavafı ne zaman yapılır?',
      en: 'When is the Farewell Tawaf performed?',
      ar: 'متى يتم طواف الوداع؟'
    },
    options: ['Mekke\'den ayrılmadan önce', 'Haccın başında', 'Arafat\'tan sonra', 'Mina\'da'],
    correctAnswer: 0,
    explanation: {
      tr: 'Veda tavafı, Hac ibadetinin son rüknü olup Mekke\'den ayrılmadan önce yapılır.',
      en: 'The Farewell Tawaf is the last pillar of Hajj.',
      ar: 'طواف الوداع هو آخر ركن من أركان الحج.'
    }
  }
];