import { Achievement } from '@/types/quiz';

export const achievements: Achievement[] = [
  {
    id: 'first_quiz',
    name: {
      tr: 'İlk Adım',
      en: 'First Step',
      ar: 'الخطوة الأولى'
    },
    description: {
      tr: 'İlk quiz\'i tamamladın!',
      en: 'Completed your first quiz!',
      ar: 'أكملت أول اختبار لك!'
    },
    icon: '🎯',
    condition: (stats) => stats.totalQuizzes >= 1,
    unlocked: false
  },
  {
    id: 'ten_correct',
    name: {
      tr: '10 Doğru Cevap',
      en: '10 Correct Answers',
      ar: '10 إجابات صحيحة'
    },
    description: {
      tr: 'Toplam 10 doğru cevap verdin!',
      en: 'Answered 10 questions correctly!',
      ar: 'أجبت على 10 أسئلة بشكل صحيح!'
    },
    icon: '✅',
    condition: (stats) => stats.totalCorrect >= 10,
    unlocked: false
  },
  {
    id: 'perfect_score',
    name: {
      tr: 'Mükemmel Skor',
      en: 'Perfect Score',
      ar: 'نتيجة مثالية'
    },
    description: {
      tr: 'Bir quiz\'de %100 başarı elde ettin!',
      en: 'Achieved 100% in a quiz!',
      ar: 'حققت 100٪ في اختبار!'
    },
    icon: '🏆',
    condition: (stats) => stats.bestScores && Object.values(stats.bestScores).some(score => score === 100),
    unlocked: false
  },
  {
    id: 'speed_learner',
    name: {
      tr: 'Hızlı Öğrenci',
      en: 'Speed Learner',
      ar: 'متعلم سريع'
    },
    description: {
      tr: 'Bir quiz\'i 30 saniyeden kısa sürede tamamladın!',
      en: 'Completed a quiz in under 30 seconds!',
      ar: 'أكملت اختباراً في أقل من 30 ثانية!'
    },
    icon: '⚡',
    condition: (stats) => stats.recentResults.some(result => result.timeSpent < 30),
    unlocked: false
  },
  {
    id: 'dedicated_learner',
    name: {
      tr: 'Azimli Öğrenci',
      en: 'Dedicated Learner',
      ar: 'متعلم مخلص'
    },
    description: {
      tr: '10 quiz tamamladın!',
      en: 'Completed 10 quizzes!',
      ar: 'أكملت 10 اختبارات!'
    },
    icon: '📚',
    condition: (stats) => stats.totalQuizzes >= 10,
    unlocked: false
  },
  {
    id: 'knowledge_seeker',
    name: {
      tr: 'Bilgi Arayıcısı',
      en: 'Knowledge Seeker',
      ar: 'باحث عن المعرفة'
    },
    description: {
      tr: '50 doğru cevap verdin!',
      en: 'Answered 50 questions correctly!',
      ar: 'أجبت على 50 سؤالاً بشكل صحيح!'
    },
    icon: '🌟',
    condition: (stats) => stats.totalCorrect >= 50,
    unlocked: false
  },
  {
    id: 'master_student',
    name: {
      tr: 'Usta Öğrenci',
      en: 'Master Student',
      ar: 'طالب متقن'
    },
    description: {
      tr: '100 doğru cevap verdin!',
      en: 'Answered 100 questions correctly!',
      ar: 'أجبت على 100 سؤال بشكل صحيح!'
    },
    icon: '👑',
    condition: (stats) => stats.totalCorrect >= 100,
    unlocked: false
  },
  {
    id: 'streak_3',
    name: {
      tr: '3 Günlük Seri',
      en: '3 Day Streak',
      ar: 'سلسلة 3 أيام'
    },
    description: {
      tr: '3 gün üst üste quiz çözdün!',
      en: 'Solved quizzes for 3 days in a row!',
      ar: 'حللت الاختبارات لمدة 3 أيام متتالية!'
    },
    icon: '🔥',
    condition: (stats) => stats.streak >= 3,
    unlocked: false
  },
  {
    id: 'streak_7',
    name: {
      tr: '7 Günlük Seri',
      en: '7 Day Streak',
      ar: 'سلسلة 7 أيام'
    },
    description: {
      tr: '7 gün üst üste quiz çözdün!',
      en: 'Solved quizzes for 7 days in a row!',
      ar: 'حللت الاختبارات لمدة 7 أيام متتالية!'
    },
    icon: '🔥🔥',
    condition: (stats) => stats.streak >= 7,
    unlocked: false
  },
  {
    id: 'category_master_prophets',
    name: {
      tr: 'Peygamberler Uzmanı',
      en: 'Prophets Expert',
      ar: 'خبير الأنبياء'
    },
    description: {
      tr: 'Peygamberler kategorisinde %80 üzeri başarı!',
      en: 'Achieved over 80% in Prophets category!',
      ar: 'حققت أكثر من 80٪ في فئة الأنبياء!'
    },
    icon: '📿',
    condition: (stats) => stats.bestScores?.prophets >= 80,
    unlocked: false
  },
  {
    id: 'category_master_quran',
    name: {
      tr: 'Kuran Uzmanı',
      en: 'Quran Expert',
      ar: 'خبير القرآن'
    },
    description: {
      tr: 'Kuran kategorisinde %80 üzeri başarı!',
      en: 'Achieved over 80% in Quran category!',
      ar: 'حققت أكثر من 80٪ في فئة القرآن!'
    },
    icon: '📖',
    condition: (stats) => stats.bestScores?.quran >= 80,
    unlocked: false
  },
  {
    id: 'all_categories',
    name: {
      tr: 'Çok Yönlü Öğrenci',
      en: 'Well-Rounded Student',
      ar: 'طالب متعدد الجوانب'
    },
    description: {
      tr: 'Tüm kategorilerde en az bir quiz çözdün!',
      en: 'Completed at least one quiz in all categories!',
      ar: 'أكملت اختباراً واحداً على الأقل في جميع الفئات!'
    },
    icon: '🎓',
    condition: (stats) => {
      const categories = stats.categoryScores;
      return Object.values(categories).every(score => score > 0);
    },
    unlocked: false
  }
];

export function checkAchievements(stats: any): Achievement[] {
  return achievements.map(achievement => ({
    ...achievement,
    unlocked: achievement.condition(stats)
  }));
}

export function getNewlyUnlockedAchievements(
  oldStats: any,
  newStats: any
): Achievement[] {
  const oldAchievements = checkAchievements(oldStats);
  const newAchievements = checkAchievements(newStats);
  
  return newAchievements.filter((newAch, index) => 
    newAch.unlocked && !oldAchievements[index].unlocked
  );
}