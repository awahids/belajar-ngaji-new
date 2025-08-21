
export interface QuranApiVerse {
  id: number;
  verse_number: number;
  verse_key: string;
  text_uthmani: string;
  text_imlaei: string;
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
  name: string;
  style?: string;
  qirat?: string;
}

class QuranApiService {
  private baseUrl = 'https://api.quran.com/api/v4';

  async getSurahInfo(surahId: string): Promise<QuranApiSurah> {
    const response = await fetch(`${this.baseUrl}/chapters/${surahId}?language=id`);
    if (!response.ok) throw new Error('Failed to fetch surah info');
    const data = await response.json();
    return data.chapter;
  }

  async getSurahVerses(surahId: string, page: number = 1, perPage: number = 50): Promise<QuranApiVerse[]> {
    const response = await fetch(
      `${this.baseUrl}/verses/by_chapter/${surahId}?language=id&words=false&translations=33&fields=text_uthmani,text_imlaei&page=${page}&per_page=${perPage}`
    );
    if (!response.ok) throw new Error('Failed to fetch verses');
    const data = await response.json();
    return data.verses || [];
  }

  async getReciters(): Promise<QuranApiReciter[]> {
    const response = await fetch(`${this.baseUrl}/resources/recitations`);
    if (!response.ok) throw new Error('Failed to fetch reciters');
    const data = await response.json();
    return data.recitations || [];
  }

  getAudioUrl(surahId: string, verseNumber: number, reciterId: number = 7): string {
    // Default reciter ID 7 is Mishary Rashid Alafasy
    const formattedSurah = surahId.padStart(3, '0');
    const formattedVerse = verseNumber.toString().padStart(3, '0');
    
    // Using Quran.com audio API with reciter ID
    return `https://verses.quran.com/${reciterId}/${formattedSurah}${formattedVerse}.mp3`;
  }

  // Alternative audio sources for better reliability
  getAlternativeAudioUrl(surahId: string, verseNumber: number, reciter: string = 'Mishary_Rashid_Alafasy'): string {
    const formattedSurah = surahId.padStart(3, '0');
    const formattedVerse = verseNumber.toString().padStart(3, '0');
    
    return `https://everyayah.com/data/${reciter}_128kbps/${formattedSurah}${formattedVerse}.mp3`;
  }
}

export const quranApiService = new QuranApiService();
