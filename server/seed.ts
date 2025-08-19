import { db } from './db';
import { 
  hijaiyahLetters, 
  metrics, 
  modules, 
  valuePillars, 
  features, 
  articles,
  dhikr,
  quizCategories 
} from '@shared/schema';

async function seedDatabase() {
  console.log('Starting database seeding...');

  // Seed metrics
  const metricsData = [
    { key: 'sessions', value: 50000 },
    { key: 'learners', value: 12000 },
    { key: 'letters', value: 28 },
    { key: 'dhikr_entries', value: 8 },
    { key: 'quiz_questions', value: 40 }
  ];

  try {
    await db.insert(metrics).values(metricsData).onConflictDoNothing();
    console.log('Metrics seeded');
  } catch (error) {
    console.log('Metrics already exist or error:', error);
  }

  // Seed hijaiyah letters
  const lettersData = [
    { letter: 'ا', nameId: 'Alif', nameEn: 'Alif', orderIndex: 1, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/alif.mp3' },
    { letter: 'ب', nameId: 'Ba\'', nameEn: 'Ba', orderIndex: 2, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/ba.mp3' },
    { letter: 'ت', nameId: 'Ta\'', nameEn: 'Ta', orderIndex: 3, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/ta.mp3' },
    { letter: 'ث', nameId: 'Tsa', nameEn: 'Tha', orderIndex: 4, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/tsa.mp3' },
    { letter: 'ج', nameId: 'Jim', nameEn: 'Jim', orderIndex: 5, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/jim.mp3' },
    { letter: 'ح', nameId: 'Ha\'', nameEn: 'Ha', orderIndex: 6, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/ha.mp3' },
    { letter: 'خ', nameId: 'Kho\'', nameEn: 'Kha', orderIndex: 7, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/kho.mp3' },
    { letter: 'د', nameId: 'Dal', nameEn: 'Dal', orderIndex: 8, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/dal.mp3' },
    { letter: 'ذ', nameId: 'Dzal', nameEn: 'Dhal', orderIndex: 9, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/dza.mp3' },
    { letter: 'ر', nameId: 'Ra\'', nameEn: 'Ra', orderIndex: 10, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/ro.mp3' },
    { letter: 'ز', nameId: 'Zai', nameEn: 'Zay', orderIndex: 11, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/zai.mp3' },
    { letter: 'س', nameId: 'Sin', nameEn: 'Sin', orderIndex: 12, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/sin.mp3' },
    { letter: 'ش', nameId: 'Syin', nameEn: 'Shin', orderIndex: 13, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/syin.mp3' },
    { letter: 'ص', nameId: 'Shod', nameEn: 'Sad', orderIndex: 14, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/shod.mp3' },
    { letter: 'ض', nameId: 'Dhod', nameEn: 'Dad', orderIndex: 15, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/dhod.mp3' },
    { letter: 'ط', nameId: 'Tho\'', nameEn: 'Ta', orderIndex: 16, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/tho.mp3' },
    { letter: 'ظ', nameId: 'Zho\'', nameEn: 'Za', orderIndex: 17, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/dhzo.mp3' },
    { letter: 'ع', nameId: 'Ain', nameEn: 'Ain', orderIndex: 18, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/ain.mp3' },
    { letter: 'غ', nameId: 'Ghoin', nameEn: 'Ghain', orderIndex: 19, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/ghoin.mp3' },
    { letter: 'ف', nameId: 'Fa\'', nameEn: 'Fa', orderIndex: 20, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/fa.mp3' },
    { letter: 'ق', nameId: 'Qof', nameEn: 'Qaf', orderIndex: 21, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/qof.mp3' },
    { letter: 'ك', nameId: 'Kaf', nameEn: 'Kaf', orderIndex: 22, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/kaf.mp3' },
    { letter: 'ل', nameId: 'Lam', nameEn: 'Lam', orderIndex: 23, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/lam.mp3' },
    { letter: 'م', nameId: 'Mim', nameEn: 'Mim', orderIndex: 24, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/mim.mp3' },
    { letter: 'ن', nameId: 'Nun', nameEn: 'Nun', orderIndex: 25, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/nun.mp3' },
    { letter: 'و', nameId: 'Wau', nameEn: 'Waw', orderIndex: 26, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/waw.mp3' },
    { letter: 'ه', nameId: 'Ha\'', nameEn: 'Ha', orderIndex: 27, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/Ha%20(besar).mp3' },
    { letter: 'ي', nameId: 'Ya\'', nameEn: 'Ya', orderIndex: 28, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/ya.mp3' }
  ];

  try {
    await db.insert(hijaiyahLetters).values(lettersData).onConflictDoNothing();
    console.log('Hijaiyah letters seeded');
  } catch (error) {
    console.log('Hijaiyah letters already exist or error:', error);
  }

  // Seed modules
  const modulesData = [
    {
      title: 'Belajar Hijaiyah',
      titleEn: 'Learn Arabic Letters',
      description: 'Pelajari 28 huruf hijaiyah dengan audio dan latihan interaktif',
      descriptionEn: 'Learn 28 Arabic letters with audio and interactive exercises',
      iconName: 'BookOpen',
      orderIndex: 1,
      isActive: true
    },
    {
      title: 'Baca Al-Qur\'an',
      titleEn: 'Read Quran',
      description: 'Baca dan dengarkan ayat-ayat suci Al-Qur\'an',
      descriptionEn: 'Read and listen to the holy verses of the Quran',
      iconName: 'Book',
      orderIndex: 2,
      isActive: true
    },
    {
      title: 'Dzikir Harian',
      titleEn: 'Daily Dhikr',
      description: 'Kumpulan dzikir pagi dan sore dengan terjemahan',
      descriptionEn: 'Collection of morning and evening dhikr with translations',
      iconName: 'Heart',
      orderIndex: 3,
      isActive: true
    },
    {
      title: 'Kuis Islami',
      titleEn: 'Islamic Quiz',
      description: 'Uji pengetahuan agama dengan berbagai kategori kuis',
      descriptionEn: 'Test your religious knowledge with various quiz categories',
      iconName: 'Brain',
      orderIndex: 4,
      isActive: true
    }
  ];

  try {
    await db.insert(modules).values(modulesData).onConflictDoNothing();
    console.log('Modules seeded');
  } catch (error) {
    console.log('Modules already exist or error:', error);
  }

  console.log('Database seeding completed!');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase().catch(console.error);
}

export { seedDatabase };