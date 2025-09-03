export interface QuranApiVerse {
  id: number;
  verse_number: number;
  verse_key: string;
  text_uthmani: string;
  text_imlaei: string;
  juz_number?: number;
  hizb_number?: number;
  rub_el_hizb_number?: number;
  translations?: Array<{
    id: number;
    text: string;
    language_name: string;
    resource_name: string;
  }>;
  audio?: {
    url: string;
  };
}

export interface QuranApiSurah {
  id: number;
  name_simple: string;
  name_arabic: string;
  name_complex: string;
  revelation_place: string;
  verses_count: number;
  translated_name: {
    name: string;
    language_name: string;
  };
}

export interface QuranApiReciter {
  id: number;
  reciter_name: string;
  style?: string;
  translated_name: {
    name: string;
    language_name: string;
  };
}

export interface SurahList {
  id: number;
  name_simple: string;
  name_arabic: string;
  revelation_place: string;
  verses_count: number;
  translated_name: {
    name: string;
    language_name: string;
  };
}

export interface IslamicQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation?: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  source?: string;
}

class QuranApiService {
  private baseUrl = 'https://api.quran.com/api/v4';
  private audioBaseUrl = 'https://cdn.islamic.network/quran/audio';
  private fallbackAudioUrl = 'https://everyayah.com/data';

  async getAllSurahs(): Promise<SurahList[]> {
    try {
      const response = await fetch(`${this.baseUrl}/chapters?language=id`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.chapters || [];
    } catch (error) {
      console.error('Error fetching surahs:', error);
      throw new Error('Gagal memuat daftar surah');
    }
  }

  async getSurahInfo(surahId: string): Promise<QuranApiSurah> {
    try {
      const response = await fetch(`${this.baseUrl}/chapters/${surahId}?language=id`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.chapter;
    } catch (error) {
      console.error('Error fetching surah info:', error);
      throw new Error('Gagal memuat informasi surah');
    }
  }

  async getSurahVerses(surahId: string, page: number = 1, perPage: number = 50): Promise<QuranApiVerse[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/verses/by_chapter/${surahId}?language=id&words=false&translations=33,134&fields=text_uthmani,text_imlaei,juz_number,hizb_number,rub_el_hizb_number&page=${page}&per_page=${perPage}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.verses || [];
    } catch (error) {
      console.error('Error fetching verses:', error);
      throw new Error('Gagal memuat ayat-ayat');
    }
  }

  async getRandomVerse(): Promise<QuranApiVerse | null> {
    try {
      // Get random surah (1-114) and random verse
      const randomSurah = Math.floor(Math.random() * 114) + 1;
      const surahInfo = await this.getSurahInfo(randomSurah.toString());
      const randomVerse = Math.floor(Math.random() * surahInfo.verses_count) + 1;
      
      const response = await fetch(
        `${this.baseUrl}/verses/by_key/${randomSurah}:${randomVerse}?language=id&words=false&translations=33,134&fields=text_uthmani,text_imlaei`
      );
      
      if (!response.ok) return null;
      
      const data = await response.json();
      return data.verse;
    } catch (error) {
      console.error('Error fetching random verse:', error);
      return null;
    }
  }

  async getReciters(): Promise<QuranApiReciter[]> {
    try {
      const response = await fetch(`${this.baseUrl}/resources/recitations`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.recitations.slice(0, 15) || []; // Limit to 15 reciters
    } catch (error) {
      console.error('Error fetching reciters:', error);
      // Return default reciters if API fails
      return [
        {
          id: 7,
          reciter_name: 'Mishari Rashid al-`Afasy',
          translated_name: { name: 'Mishary Rashid Alafasy', language_name: 'english' }
        },
        {
          id: 2,
          reciter_name: 'AbdulBaset AbdulSamad',
          translated_name: { name: 'Abdul Basit Murattal', language_name: 'english' }
        },
        {
          id: 5,
          reciter_name: 'Hani ar-Rifai',
          translated_name: { name: 'Hani ar-Rifai', language_name: 'english' }
        },
        {
          id: 1,
          reciter_name: 'Saood ash-Shuraym',
          translated_name: { name: 'Saood ash-Shuraym', language_name: 'english' }
        }
      ];
    }
  }

  // Primary audio URL with better formatting
  getAudioUrl(surahId: string, verseNumber: number, reciterId: number = 7): string {
    const formattedSurah = surahId.padStart(3, '0');
    const formattedVerse = verseNumber.toString().padStart(3, '0');
    
    // Using multiple audio sources based on reciter
    const audioSources = {
      7: `${this.audioBaseUrl}/7/${formattedSurah}${formattedVerse}.mp3`, // Mishary
      2: `${this.audioBaseUrl}/2/${formattedSurah}${formattedVerse}.mp3`, // Abdul Basit
      5: `${this.audioBaseUrl}/5/${formattedSurah}${formattedVerse}.mp3`, // Hani
      1: `${this.audioBaseUrl}/1/${formattedSurah}${formattedVerse}.mp3`, // Saood
    };
    
    return audioSources[reciterId as keyof typeof audioSources] || `https://verses.quran.com/${reciterId}/${formattedSurah}${formattedVerse}.mp3`;
  }

  // Alternative audio sources for better reliability
  getAlternativeAudioUrl(surahId: string, verseNumber: number, reciter: string = 'Mishary_Rashid_Alafasy'): string {
    const formattedSurah = surahId.padStart(3, '0');
    const formattedVerse = verseNumber.toString().padStart(3, '0');
    
    return `${this.fallbackAudioUrl}/${reciter}_128kbps/${formattedSurah}${formattedVerse}.mp3`;
  }

  // Third fallback audio source
  getFallbackAudioUrl(surahId: string, verseNumber: number): string {
    const formattedSurah = surahId.padStart(3, '0');
    const formattedVerse = verseNumber.toString().padStart(3, '0');
    
    return `https://audio.qurancdn.com/7/${formattedSurah}${formattedVerse}.mp3`;
  }

  // Get reciter folder name for alternative audio
  getReciterFolder(reciterId: number): string {
    const reciterMap: { [key: number]: string } = {
      7: 'Mishary_Rashid_Alafasy',
      2: 'Abdul_Basit_Murattal',
      5: 'Hani_Rifai',
      1: 'Saood_ash_Shuraym',
    };
    return reciterMap[reciterId] || 'Mishary_Rashid_Alafasy';
  }

  // Check if audio URL is accessible
  async checkAudioUrl(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  }

  // Get best available audio URL
  async getBestAudioUrl(surahId: string, verseNumber: number, reciterId: number = 7): Promise<string> {
    const urls = [
      this.getAudioUrl(surahId, verseNumber, reciterId),
      this.getAlternativeAudioUrl(surahId, verseNumber, this.getReciterFolder(reciterId)),
      this.getFallbackAudioUrl(surahId, verseNumber)
    ];

    for (const url of urls) {
      if (await this.checkAudioUrl(url)) {
        return url;
      }
    }

    return urls[0]; // Return first URL as fallback
  }

  // Generate Islamic quiz questions from scraped data
  async generateIslamicQuizQuestions(): Promise<IslamicQuizQuestion[]> {
    // This would typically involve scraping Islamic knowledge websites
    // For now, we'll return a static set of questions that could be expanded
    return [
      {
        id: '1',
        question: 'Berapa jumlah surah dalam Al-Quran?',
        options: ['114', '113', '115', '112'],
        correct_answer: 0,
        explanation: 'Al-Quran terdiri dari 114 surah, dimulai dari Al-Fatihah hingga An-Nas.',
        category: 'Al-Quran',
        difficulty: 'easy',
        source: 'Al-Quran'
      },
      {
        id: '2', 
        question: 'Surah terpanjang dalam Al-Quran adalah?',
        options: ['Al-Fatihah', 'Al-Baqarah', 'Ali Imran', 'An-Nisa'],
        correct_answer: 1,
        explanation: 'Surah Al-Baqarah adalah surah terpanjang dengan 286 ayat.',
        category: 'Al-Quran',
        difficulty: 'medium',
        source: 'Al-Quran'
      },
      {
        id: '3',
        question: 'Rukun Islam yang pertama adalah?',
        options: ['Shalat', 'Syahadat', 'Zakat', 'Puasa'],
        correct_answer: 1,
        explanation: 'Syahadat adalah rukun Islam yang pertama, yaitu bersaksi bahwa tidak ada Tuhan selain Allah dan Muhammad adalah utusan Allah.',
        category: 'Akidah',
        difficulty: 'easy',
        source: 'Hadits'
      },
      {
        id: '4',
        question: 'Berapa kali shalat wajib dalam sehari?',
        options: ['3', '4', '5', '6'],
        correct_answer: 2,
        explanation: 'Shalat wajib dalam sehari adalah 5 kali: Subuh, Dzuhur, Ashar, Maghrib, dan Isya.',
        category: 'Ibadah',
        difficulty: 'easy',
        source: 'Al-Quran dan Hadits'
      },
      {
        id: '5',
        question: 'Siapa nabi yang mendapat gelar Ulul Azmi?',
        options: ['Ibrahim, Musa, Isa, Muhammad, Nuh', 'Sulaiman, Daud, Yahya, Zakariya, Yusuf', 'Adam, Idris, Saleh, Hud, Luth', 'Harun, Ismail, Ishaq, Yaqub, Ayyub'],
        correct_answer: 0,
        explanation: 'Ulul Azmi adalah 5 nabi yang memiliki ketabahan luar biasa: Ibrahim, Musa, Isa, Muhammad, dan Nuh.',
        category: 'Sejarah Islam',
        difficulty: 'hard',
        source: 'Al-Quran'
      }
    ];
  }
}

export const quranApiService = new QuranApiService();