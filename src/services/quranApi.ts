
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
  reciter_name: string;
  style?: string;
  translated_name: {
    name: string;
    language_name: string;
  };
}

class QuranApiService {
  private baseUrl = 'https://api.quran.com/api/v4';

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
        `${this.baseUrl}/verses/by_chapter/${surahId}?language=id&words=false&translations=33&fields=text_uthmani,text_imlaei&page=${page}&per_page=${perPage}`
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

  async getReciters(): Promise<QuranApiReciter[]> {
    try {
      const response = await fetch(`${this.baseUrl}/resources/recitations`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.recitations || [];
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
          translated_name: { name: 'Sudais & Shuraym', language_name: 'english' }
        }
      ];
    }
  }

  getAudioUrl(surahId: string, verseNumber: number, reciterId: number = 7): string {
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

  // Get reciter folder name for alternative audio
  getReciterFolder(reciterId: number): string {
    const reciterMap: { [key: number]: string } = {
      7: 'Mishary_Rashid_Alafasy',
      2: 'Abdul_Basit_Murattal',
      5: 'Sudais_and_Shuraym',
    };
    return reciterMap[reciterId] || 'Mishary_Rashid_Alafasy';
  }
}

export const quranApiService = new QuranApiService();
