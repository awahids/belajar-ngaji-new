import { supabase } from '@/integrations/supabase/client';

export async function getMetrics() {
  try {
    const { data, error } = await supabase
      .from('metrics')
      .select('key, value');
    
    if (error) throw error;
    
    const metrics = data.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      sessionsCount: metrics.sessions || 50000,
      learnersCount: metrics.learners || 12000,
      lettersCount: metrics.letters || 28,
      dhikrEntries: metrics.dhikr_entries || 8,
      quizQuestions: metrics.quiz_questions || 40
    };
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
  // Fallback data since table may not exist yet
  const fallbackLetters = [
    { id: '1', letter: 'ا', name_id: 'Alif', name_en: 'Alif', order_index: 1, audio_url: null },
    { id: '2', letter: 'ب', name_id: 'Ba\'', name_en: 'Ba', order_index: 2, audio_url: null },
    { id: '3', letter: 'ت', name_id: 'Ta\'', name_en: 'Ta', order_index: 3, audio_url: null },
    { id: '4', letter: 'ث', name_id: 'Tsa', name_en: 'Tha', order_index: 4, audio_url: null },
    { id: '5', letter: 'ج', name_id: 'Jim', name_en: 'Jim', order_index: 5, audio_url: null },
    { id: '6', letter: 'ح', name_id: 'Ha\'', name_en: 'Ha', order_index: 6, audio_url: null },
    { id: '7', letter: 'خ', name_id: 'Kho\'', name_en: 'Kha', order_index: 7, audio_url: null },
    { id: '8', letter: 'د', name_id: 'Dal', name_en: 'Dal', order_index: 8, audio_url: null },
    { id: '9', letter: 'ذ', name_id: 'Dzal', name_en: 'Dhal', order_index: 9, audio_url: null },
    { id: '10', letter: 'ر', name_id: 'Ra\'', name_en: 'Ra', order_index: 10, audio_url: null },
    { id: '11', letter: 'ز', name_id: 'Zai', name_en: 'Zay', order_index: 11, audio_url: null },
    { id: '12', letter: 'س', name_id: 'Sin', name_en: 'Sin', order_index: 12, audio_url: null },
    { id: '13', letter: 'ش', name_id: 'Syin', name_en: 'Shin', order_index: 13, audio_url: null },
    { id: '14', letter: 'ص', name_id: 'Shod', name_en: 'Sad', order_index: 14, audio_url: null },
    { id: '15', letter: 'ض', name_id: 'Dhod', name_en: 'Dad', order_index: 15, audio_url: null },
    { id: '16', letter: 'ط', name_id: 'Tho\'', name_en: 'Ta', order_index: 16, audio_url: null },
    { id: '17', letter: 'ظ', name_id: 'Zho\'', name_en: 'Za', order_index: 17, audio_url: null },
    { id: '18', letter: 'ع', name_id: 'Ain', name_en: 'Ain', order_index: 18, audio_url: null },
    { id: '19', letter: 'غ', name_id: 'Ghoin', name_en: 'Ghain', order_index: 19, audio_url: null },
    { id: '20', letter: 'ف', name_id: 'Fa\'', name_en: 'Fa', order_index: 20, audio_url: null },
    { id: '21', letter: 'ق', name_id: 'Qof', name_en: 'Qaf', order_index: 21, audio_url: null },
    { id: '22', letter: 'ك', name_id: 'Kaf', name_en: 'Kaf', order_index: 22, audio_url: null },
    { id: '23', letter: 'ل', name_id: 'Lam', name_en: 'Lam', order_index: 23, audio_url: null },
    { id: '24', letter: 'م', name_id: 'Mim', name_en: 'Mim', order_index: 24, audio_url: null },
    { id: '25', letter: 'ن', name_id: 'Nun', name_en: 'Nun', order_index: 25, audio_url: null },
    { id: '26', letter: 'و', name_id: 'Wau', name_en: 'Waw', order_index: 26, audio_url: null },
    { id: '27', letter: 'ه', name_id: 'Ha\'', name_en: 'Ha', order_index: 27, audio_url: null },
    { id: '28', letter: 'ي', name_id: 'Ya\'', name_en: 'Ya', order_index: 28, audio_url: null }
  ];

  try {
    const { data, error } = await supabase
      .from('hijaiyah_letters')
      .select('*')
      .order('order_index');
    
    if (error) throw error;
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
    const { data, error } = await supabase
      .from('modules')
      .select('*')
      .eq('is_active', true)
      .order('order_index');
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching modules:', error);
    return [];
  }
}

export async function getValuePillars() {
  try {
    const { data, error } = await supabase
      .from('value_pillars')
      .select('*')
      .order('order_index');
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching value pillars:', error);
    return [];
  }
}

export async function getFeatures() {
  try {
    const { data, error } = await supabase
      .from('features')
      .select('*')
      .eq('is_active', true)
      .order('order_index');
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching features:', error);
    return [];
  }
}

export async function getArticles() {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .limit(6);
    
    if (error) throw error;
    return data || [];
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
    const { error } = await supabase
      .from('contact_messages')
      .insert([formData]);
    
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
}

export async function subscribeNewsletter(email: string) {
  try {
    const { error } = await supabase
      .from('subscribers')
      .insert([{ email }]);
    
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    throw error;
  }
}