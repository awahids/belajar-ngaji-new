export async function getMetrics() {
  try {
    const response = await fetch('/api/metrics');
    if (!response.ok) throw new Error('Failed to fetch metrics');
    return await response.json();
  } catch (error) {
    console.error('Error fetching metrics:', error);
    return {
      sessionsCount: 50000,
      learnersCount: 12000,
      lettersCount: 28,
      dhikrEntries: 8,
      quizQuestions: 40
    };
  }
}

export async function getHijaiyahLetters() {
  // Fallback data for offline/error scenarios
  const fallbackLetters = [
    { id: '1', letter: 'ا', nameId: 'Alif', nameEn: 'Alif', orderIndex: 1, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/alif.mp3' },
    { id: '2', letter: 'ب', nameId: 'Ba\'', nameEn: 'Ba', orderIndex: 2, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/ba.mp3' },
    { id: '3', letter: 'ت', nameId: 'Ta\'', nameEn: 'Ta', orderIndex: 3, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/ta.mp3' },
    { id: '4', letter: 'ث', nameId: 'Tsa', nameEn: 'Tha', orderIndex: 4, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/tsa.mp3' },
    { id: '5', letter: 'ج', nameId: 'Jim', nameEn: 'Jim', orderIndex: 5, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/jim.mp3' },
    { id: '6', letter: 'ح', nameId: 'Ha\'', nameEn: 'Ha', orderIndex: 6, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/ha.mp3' },
    { id: '7', letter: 'خ', nameId: 'Kho\'', nameEn: 'Kha', orderIndex: 7, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/kho.mp3' },
    { id: '8', letter: 'د', nameId: 'Dal', nameEn: 'Dal', orderIndex: 8, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/dal.mp3' },
    { id: '9', letter: 'ذ', nameId: 'Dzal', nameEn: 'Dhal', orderIndex: 9, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/dza.mp3' },
    { id: '10', letter: 'ر', nameId: 'Ra\'', nameEn: 'Ra', orderIndex: 10, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/ro.mp3' },
    { id: '11', letter: 'ز', nameId: 'Zai', nameEn: 'Zay', orderIndex: 11, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/zai.mp3' },
    { id: '12', letter: 'س', nameId: 'Sin', nameEn: 'Sin', orderIndex: 12, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/sin.mp3' },
    { id: '13', letter: 'ش', nameId: 'Syin', nameEn: 'Shin', orderIndex: 13, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/syin.mp3' },
    { id: '14', letter: 'ص', nameId: 'Shod', nameEn: 'Sad', orderIndex: 14, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/shod.mp3' },
    { id: '15', letter: 'ض', nameId: 'Dhod', nameEn: 'Dad', orderIndex: 15, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/dhod.mp3' },
    { id: '16', letter: 'ط', nameId: 'Tho\'', nameEn: 'Ta', orderIndex: 16, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/tho.mp3' },
    { id: '17', letter: 'ظ', nameId: 'Zho\'', nameEn: 'Za', orderIndex: 17, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/dhzo.mp3' },
    { id: '18', letter: 'ع', nameId: 'Ain', nameEn: 'Ain', orderIndex: 18, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/ain.mp3' },
    { id: '19', letter: 'غ', nameId: 'Ghoin', nameEn: 'Ghain', orderIndex: 19, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/ghoin.mp3' },
    { id: '20', letter: 'ف', nameId: 'Fa\'', nameEn: 'Fa', orderIndex: 20, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/fa.mp3' },
    { id: '21', letter: 'ق', nameId: 'Qof', nameEn: 'Qaf', orderIndex: 21, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/qof.mp3' },
    { id: '22', letter: 'ك', nameId: 'Kaf', nameEn: 'Kaf', orderIndex: 22, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/kaf.mp3' },
    { id: '23', letter: 'ل', nameId: 'Lam', nameEn: 'Lam', orderIndex: 23, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/lam.mp3' },
    { id: '24', letter: 'م', nameId: 'Mim', nameEn: 'Mim', orderIndex: 24, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/mim.mp3' },
    { id: '25', letter: 'ن', nameId: 'Nun', nameEn: 'Nun', orderIndex: 25, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/nun.mp3' },
    { id: '26', letter: 'و', nameId: 'Wau', nameEn: 'Waw', orderIndex: 26, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/waw.mp3' },
    { id: '27', letter: 'ه', nameId: 'Ha\'', nameEn: 'Ha', orderIndex: 27, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/Ha%20(besar).mp3' },
    { id: '28', letter: 'ي', nameId: 'Ya\'', nameEn: 'Ya', orderIndex: 28, audioUrl: 'https://raw.githubusercontent.com/awahids/belajar-ngaji/master/audio/hijaiyah/ya.mp3' }
  ];

  try {
    const response = await fetch('/api/hijaiyah-letters');
    if (!response.ok) throw new Error('Failed to fetch hijaiyah letters');
    const data = await response.json();
    return data || fallbackLetters;
  } catch (error) {
    console.error('Error fetching hijaiyah letters:', error);
    return fallbackLetters;
  }
}

export async function getDhikr(type?: 'morning' | 'evening') {
  // Fallback data
  const fallbackDhikr = [
    {
      id: '1',
      type: 'morning' as const,
      arabic_text: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
      transliteration: 'Ashbahnaa wa ashbahal mulku lillaahi, walhamdu lillaahi, laa ilaaha illallaahu wahdahu laa syariika lahu',
      translation_id: 'Kami telah memasuki waktu pagi dan kerajaan hanya milik Allah. Segala puji bagi Allah. Tidak ada Tuhan selain Allah Yang Maha Esa, tidak ada sekutu bagi-Nya.',
      recommended_count: 1,
      order_index: 1
    },
    {
      id: '2',
      type: 'morning' as const,
      arabic_text: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ',
      transliteration: 'Allaahumma anta rabbii laa ilaaha illa anta, khalaqtanii wa ana abduka',
      translation_id: 'Ya Allah, Engkau adalah Tuhanku, tidak ada Tuhan selain Engkau. Engkau menciptakanku dan aku adalah hamba-Mu.',
      recommended_count: 1,
      order_index: 2
    },
    {
      id: '3',
      type: 'evening' as const,
      arabic_text: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
      transliteration: 'Amsainaa wa amsal mulku lillaahi, walhamdu lillaahi, laa ilaaha illallaahu wahdahu laa syariika lahu',
      translation_id: 'Kami telah memasuki waktu sore dan kerajaan hanya milik Allah. Segala puji bagi Allah. Tidak ada Tuhan selain Allah Yang Maha Esa, tidak ada sekutu bagi-Nya.',
      recommended_count: 1,
      order_index: 1
    },
    {
      id: '4',
      type: 'evening' as const,
      arabic_text: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ',
      transliteration: 'Allaahumma bika amsainaa, wa bika ashbahnaa, wa bika nahyaa, wa bika namuutu, wa ilaikal mashiir',
      translation_id: 'Ya Allah, dengan rahmat-Mu kami memasuki sore, dengan rahmat-Mu kami memasuki pagi, dengan rahmat-Mu kami hidup, dengan rahmat-Mu kami mati, dan kepada-Mu tempat kembali.',
      recommended_count: 1,
      order_index: 2
    }
  ];

  const filteredData = type ? fallbackDhikr.filter(item => item.type === type) : fallbackDhikr;
  return filteredData;
}

export async function getQuizCategories() {
  // Fallback data
  const fallbackCategories = [
    {
      id: '1',
      name: 'Hijaiyah',
      name_en: 'Arabic Letters',
      description: 'Kuis tentang huruf-huruf hijaiyah dan pengucapannya',
      description_en: 'Quiz about Arabic letters and pronunciation',
      icon_name: 'BookOpen',
      order_index: 1
    },
    {
      id: '2',
      name: 'Tajwid Dasar',
      name_en: 'Basic Tajweed',
      description: 'Kuis tentang aturan-aturan tajwid dasar dalam membaca Al-Qur\'an',
      description_en: 'Quiz about basic tajweed rules in Quran recitation',
      icon_name: 'Volume2',
      order_index: 2
    },
    {
      id: '3',
      name: 'Ibadah Harian',
      name_en: 'Daily Worship',
      description: 'Kuis tentang ibadah sehari-hari dalam Islam',
      description_en: 'Quiz about daily Islamic worship practices',
      icon_name: 'Clock',
      order_index: 3
    },
    {
      id: '4',
      name: 'Pengetahuan Umum',
      name_en: 'General Knowledge',
      description: 'Kuis tentang pengetahuan umum agama Islam',
      description_en: 'Quiz about general Islamic knowledge',
      icon_name: 'Brain',
      order_index: 4
    }
  ];

  return fallbackCategories;
}

export async function getQuizQuestions(categoryId: string) {
  // Fallback data
  const fallbackQuestions = [
    {
      id: '1',
      question: 'Berapa jumlah huruf hijaiyah?',
      question_en: 'How many Arabic letters are there?',
      explanation: 'Huruf hijaiyah berjumlah 28 huruf, dimulai dari Alif hingga Ya.',
      explanation_en: 'There are 28 Arabic letters, from Alif to Ya.',
      difficulty: 'easy' as const,
      quiz_options: [
        { id: '1', option_text: '26', option_text_en: '26', is_correct: false, order_index: 1 },
        { id: '2', option_text: '27', option_text_en: '27', is_correct: false, order_index: 2 },
        { id: '3', option_text: '28', option_text_en: '28', is_correct: true, order_index: 3 },
        { id: '4', option_text: '29', option_text_en: '29', is_correct: false, order_index: 4 }
      ]
    },
    {
      id: '2',
      question: 'Huruf pertama dalam abjad hijaiyah adalah?',
      question_en: 'What is the first letter in the Arabic alphabet?',
      explanation: 'Alif adalah huruf pertama dalam urutan abjad hijaiyah.',
      explanation_en: 'Alif is the first letter in the Arabic alphabet order.',
      difficulty: 'easy' as const,
      quiz_options: [
        { id: '5', option_text: 'Alif', option_text_en: 'Alif', is_correct: true, order_index: 1 },
        { id: '6', option_text: 'Ba', option_text_en: 'Ba', is_correct: false, order_index: 2 },
        { id: '7', option_text: 'Ta', option_text_en: 'Ta', is_correct: false, order_index: 3 },
        { id: '8', option_text: 'Tsa', option_text_en: 'Tsa', is_correct: false, order_index: 4 }
      ]
    }
  ];

  return fallbackQuestions;
}

export async function getModules() {
  try {
    const response = await fetch('/api/modules');
    if (!response.ok) throw new Error('Failed to fetch modules');
    return await response.json();
  } catch (error) {
    console.error('Error fetching modules:', error);
    return [];
  }
}

export async function getValuePillars() {
  try {
    const response = await fetch('/api/value-pillars');
    if (!response.ok) throw new Error('Failed to fetch value pillars');
    return await response.json();
  } catch (error) {
    console.error('Error fetching value pillars:', error);
    return [];
  }
}

export async function getFeatures() {
  try {
    const response = await fetch('/api/features');
    if (!response.ok) throw new Error('Failed to fetch features');
    return await response.json();
  } catch (error) {
    console.error('Error fetching features:', error);
    return [];
  }
}

export async function getArticles() {
  try {
    const response = await fetch('/api/articles');
    if (!response.ok) throw new Error('Failed to fetch articles');
    return await response.json();
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export async function submitContactForm(formData: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) throw new Error('Failed to submit contact form');
    return await response.json();
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
}

export async function subscribeNewsletter(email: string) {
  try {
    const response = await fetch('/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    if (!response.ok) throw new Error('Failed to subscribe to newsletter');
    return await response.json();
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    throw error;
  }
}