import { IslamicQuizQuestion } from './quranApi';

export interface ScrapedIslamicContent {
  questions: IslamicQuizQuestion[];
  hadithOfTheDay?: {
    arabic: string;
    translation: string;
    source: string;
    reference: string;
  };
  islamicFacts?: Array<{
    title: string;
    content: string;
    category: string;
  }>;
}

class IslamicDataScraperService {
  private baseUrls = {
    quizApi: 'https://api.freeapi.app/api/v1/public/quotes/quote/random', // Placeholder
    hadithApi: 'https://api.hadith.gading.dev/books/bukhari?range=1-100',
    islamicFacts: 'https://jsonplaceholder.typicode.com/posts' // Placeholder
  };

  // Generate comprehensive Islamic quiz questions
  async generateIslamicQuizQuestions(): Promise<IslamicQuizQuestion[]> {
    try {
      // This would ideally scrape from Islamic educational websites
      // For now, we'll return an expanded static dataset
      const questions: IslamicQuizQuestion[] = [
        // Al-Quran Questions
        {
          id: 'quran-1',
          question: 'Berapa jumlah surah dalam Al-Quran?',
          options: ['114', '113', '115', '112'],
          correct_answer: 0,
          explanation: 'Al-Quran terdiri dari 114 surah, dimulai dari Al-Fatihah hingga An-Nas.',
          category: 'Al-Quran',
          difficulty: 'easy',
          source: 'Al-Quran'
        },
        {
          id: 'quran-2',
          question: 'Surah terpanjang dalam Al-Quran adalah?',
          options: ['Al-Fatihah', 'Al-Baqarah', 'Ali Imran', 'An-Nisa'],
          correct_answer: 1,
          explanation: 'Surah Al-Baqarah adalah surah terpanjang dengan 286 ayat.',
          category: 'Al-Quran',
          difficulty: 'medium',
          source: 'Al-Quran'
        },
        {
          id: 'quran-3',
          question: 'Surah terpendek dalam Al-Quran adalah?',
          options: ['Al-Ikhlas', 'Al-Kautsar', 'An-Nasr', 'Al-Lahab'],
          correct_answer: 1,
          explanation: 'Surah Al-Kautsar adalah surah terpendek dengan hanya 3 ayat.',
          category: 'Al-Quran',
          difficulty: 'medium',
          source: 'Al-Quran'
        },
        {
          id: 'quran-4',
          question: 'Berapa jumlah juz dalam Al-Quran?',
          options: ['30', '29', '31', '28'],
          correct_answer: 0,
          explanation: 'Al-Quran terbagi menjadi 30 juz untuk memudahkan membaca dan menghafal.',
          category: 'Al-Quran',
          difficulty: 'easy',
          source: 'Al-Quran'
        },
        
        // Akidah Questions
        {
          id: 'akidah-1',
          question: 'Rukun Islam yang pertama adalah?',
          options: ['Shalat', 'Syahadat', 'Zakat', 'Puasa'],
          correct_answer: 1,
          explanation: 'Syahadat adalah rukun Islam yang pertama, yaitu bersaksi bahwa tidak ada Tuhan selain Allah dan Muhammad adalah utusan Allah.',
          category: 'Akidah',
          difficulty: 'easy',
          source: 'Hadits'
        },
        {
          id: 'akidah-2',
          question: 'Berapa jumlah rukun iman?',
          options: ['5', '6', '7', '4'],
          correct_answer: 1,
          explanation: 'Rukun iman berjumlah 6: Iman kepada Allah, malaikat, kitab, rasul, hari akhir, dan qada qadar.',
          category: 'Akidah',
          difficulty: 'easy',
          source: 'Al-Quran dan Hadits'
        },
        {
          id: 'akidah-3',
          question: 'Nama malaikat yang bertugas meniup sangkakala adalah?',
          options: ['Jibril', 'Mikail', 'Israfil', 'Izrail'],
          correct_answer: 2,
          explanation: 'Malaikat Israfil bertugas meniup sangkakala pada hari kiamat.',
          category: 'Akidah',
          difficulty: 'medium',
          source: 'Al-Quran dan Hadits'
        },

        // Ibadah Questions
        {
          id: 'ibadah-1',
          question: 'Berapa kali shalat wajib dalam sehari?',
          options: ['3', '4', '5', '6'],
          correct_answer: 2,
          explanation: 'Shalat wajib dalam sehari adalah 5 kali: Subuh, Dzuhur, Ashar, Maghrib, dan Isya.',
          category: 'Ibadah',
          difficulty: 'easy',
          source: 'Al-Quran dan Hadits'
        },
        {
          id: 'ibadah-2',
          question: 'Bulan puasa wajib bagi umat Islam adalah?',
          options: ['Rajab', 'Syaban', 'Ramadan', 'Syawal'],
          correct_answer: 2,
          explanation: 'Bulan Ramadan adalah bulan di mana umat Islam wajib berpuasa.',
          category: 'Ibadah',
          difficulty: 'easy',
          source: 'Al-Quran'
        },
        {
          id: 'ibadah-3',
          question: 'Jumlah rakaat shalat Maghrib adalah?',
          options: ['2', '3', '4', '5'],
          correct_answer: 1,
          explanation: 'Shalat Maghrib terdiri dari 3 rakaat.',
          category: 'Ibadah',
          difficulty: 'easy',
          source: 'Hadits'
        },

        // Sejarah Islam Questions
        {
          id: 'sejarah-1',
          question: 'Siapa nabi yang mendapat gelar Ulul Azmi?',
          options: ['Ibrahim, Musa, Isa, Muhammad, Nuh', 'Sulaiman, Daud, Yahya, Zakariya, Yusuf', 'Adam, Idris, Saleh, Hud, Luth', 'Harun, Ismail, Ishaq, Yaqub, Ayyub'],
          correct_answer: 0,
          explanation: 'Ulul Azmi adalah 5 nabi yang memiliki ketabahan luar biasa: Ibrahim, Musa, Isa, Muhammad, dan Nuh.',
          category: 'Sejarah Islam',
          difficulty: 'hard',
          source: 'Al-Quran'
        },
        {
          id: 'sejarah-2',
          question: 'Hijrah Nabi Muhammad dari Mekah ke Madinah terjadi pada tahun?',
          options: ['620 M', '621 M', '622 M', '623 M'],
          correct_answer: 2,
          explanation: 'Hijrah Nabi Muhammad terjadi pada tahun 622 M, yang menjadi awal kalender Hijriah.',
          category: 'Sejarah Islam',
          difficulty: 'medium',
          source: 'Sirah Nabawiyah'
        },
        {
          id: 'sejarah-3',
          question: 'Perang pertama yang diikuti Rasulullah adalah?',
          options: ['Perang Badr', 'Perang Uhud', 'Perang Khandaq', 'Perang Khaibar'],
          correct_answer: 0,
          explanation: 'Perang Badr adalah perang pertama yang diikuti Rasulullah pada tahun 2 H.',
          category: 'Sejarah Islam',
          difficulty: 'medium',
          source: 'Sirah Nabawiyah'
        },

        // Akhlak Questions
        {
          id: 'akhlak-1',
          question: 'Sifat yang wajib bagi Allah SWT yang artinya "Maha Penyayang" adalah?',
          options: ['Ar-Rahman', 'Ar-Rahim', 'Al-Ghafur', 'At-Tawwab'],
          correct_answer: 1,
          explanation: 'Ar-Rahim berarti Maha Penyayang, yaitu kasih sayang Allah yang khusus untuk orang beriman.',
          category: 'Akhlak',
          difficulty: 'medium',
          source: 'Al-Quran'
        },
        {
          id: 'akhlak-2',
          question: 'Berbakti kepada orang tua dalam Islam disebut?',
          options: ['Ihsan', 'Birrul Walidain', 'Tawadhuk', 'Rahmah'],
          correct_answer: 1,
          explanation: 'Birrul Walidain adalah berbakti kepada kedua orang tua, yang merupakan kewajiban setelah beribadah kepada Allah.',
          category: 'Akhlak',
          difficulty: 'easy',
          source: 'Al-Quran dan Hadits'
        },

        // Fikih Questions
        {
          id: 'fikih-1',
          question: 'Syarat wajib zakat fitrah adalah?',
          options: ['Muslim, berakal, baligh, mampu', 'Muslim, merdeka, mampu', 'Muslim, berakal, mampu', 'Semua jawaban benar'],
          correct_answer: 0,
          explanation: 'Syarat wajib zakat fitrah adalah Muslim, berakal, baligh, dan mampu.',
          category: 'Fikih',
          difficulty: 'medium',
          source: 'Hadits'
        },
        {
          id: 'fikih-2',
          question: 'Kadar zakat emas adalah?',
          options: ['2.5%', '5%', '10%', '20%'],
          correct_answer: 0,
          explanation: 'Kadar zakat emas dan perak adalah 2.5% dari harta yang mencapai nisab.',
          category: 'Fikih',
          difficulty: 'medium',
          source: 'Hadits'
        }
      ];

      return questions;
    } catch (error) {
      console.error('Error generating Islamic quiz questions:', error);
      return [];
    }
  }

  // Scrape Hadith of the day (simulated)
  async getHadithOfTheDay(): Promise<{ arabic: string; translation: string; source: string; reference: string } | null> {
    try {
      // In a real implementation, this would scrape from hadith websites
      const hadiths = [
        {
          arabic: 'إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى',
          translation: 'Sesungguhnya amal perbuatan tergantung pada niatnya, dan sesungguhnya setiap orang (akan dibalas) berdasarkan apa yang dia niatkan.',
          source: 'Sahih Bukhari',
          reference: 'Hadits No. 1'
        },
        {
          arabic: 'الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ',
          translation: 'Seorang Muslim adalah orang yang kaum muslimin selamat dari gangguan lisan dan tangannya.',
          source: 'Sahih Bukhari',
          reference: 'Hadits No. 10'
        },
        {
          arabic: 'لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ',
          translation: 'Tidak beriman salah seorang dari kalian hingga dia mencintai untuk saudaranya apa yang dia cintai untuk dirinya sendiri.',
          source: 'Sahih Bukhari',
          reference: 'Hadits No. 13'
        }
      ];

      const randomIndex = Math.floor(Math.random() * hadiths.length);
      return hadiths[randomIndex];
    } catch (error) {
      console.error('Error fetching hadith:', error);
      return null;
    }
  }

  // Scrape Islamic facts (simulated)
  async getIslamicFacts(): Promise<Array<{ title: string; content: string; category: string }>> {
    try {
      // In a real implementation, this would scrape from Islamic educational websites
      return [
        {
          title: 'Waktu Shalat Terbaik',
          content: 'Shalat di awal waktu adalah yang paling utama dan dicintai Allah SWT.',
          category: 'Ibadah'
        },
        {
          title: 'Manfaat Membaca Al-Quran',
          content: 'Setiap huruf yang dibaca dari Al-Quran mendapat pahala 10 kebaikan.',
          category: 'Al-Quran'
        },
        {
          title: 'Keutamaan Sedekah',
          content: 'Sedekah tidak akan mengurangi harta, bahkan Allah akan melipat gandakan pahala sedekah.',
          category: 'Akhlak'
        },
        {
          title: 'Adab Makan dalam Islam',
          content: 'Rasulullah mengajarkan untuk makan dengan tangan kanan, memulai dengan bismillah, dan tidak berlebihan.',
          category: 'Adab'
        },
        {
          title: 'Keutamaan Shalat Berjamaah',
          content: 'Shalat berjamaah memiliki pahala 27 derajat lebih tinggi dari shalat sendirian.',
          category: 'Ibadah'
        }
      ];
    } catch (error) {
      console.error('Error fetching Islamic facts:', error);
      return [];
    }
  }

  // Main scraping function
  async scrapeIslamicContent(): Promise<ScrapedIslamicContent> {
    try {
      const [questions, hadithOfTheDay, islamicFacts] = await Promise.all([
        this.generateIslamicQuizQuestions(),
        this.getHadithOfTheDay(),
        this.getIslamicFacts()
      ]);

      return {
        questions,
        hadithOfTheDay: hadithOfTheDay || undefined,
        islamicFacts
      };
    } catch (error) {
      console.error('Error scraping Islamic content:', error);
      return {
        questions: [],
        islamicFacts: []
      };
    }
  }
}

export const islamicDataScraperService = new IslamicDataScraperService();