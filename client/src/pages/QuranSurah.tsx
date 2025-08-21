import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Pause, Bookmark, Volume2, ToggleLeft, ToggleRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link, useParams } from 'react-router-dom';

interface Verse {
  id: number;
  verse_number: number;
  verse_key: string;
  hizb_number: number;
  rub_el_hizb_number: number;
  ruku_number: number;
  manzil_number: number;
  sajdah_number?: number;
  text_uthmani: string;
  text_imlaei: string;
  page_number: number;
  juz_number: number;
  translations?: {
    text: string;
    language_name: string;
  }[];
  audio?: {
    url: string;
  };
}

interface SurahInfo {
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

const QuranSurah = () => {
  const { id } = useParams<{ id: string }>();
  const [surahInfo, setSurahInfo] = useState<SurahInfo | null>(null);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [currentPlaying, setCurrentPlaying] = useState<number | null>(null);
  const [selectedQari, setSelectedQari] = useState('1'); // Default to Mishary Rashid
  const [bookmarkedVerses, setBookmarkedVerses] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchSurahData = async () => {
      if (!id) return;

      try {
        // Fetch surah info
        const infoResponse = await fetch(`https://api.quran.com/api/v4/chapters/${id}?language=id`);
        const infoData = await infoResponse.json();
        setSurahInfo(infoData.chapter);

        // Fetch verses
        const versesResponse = await fetch(`https://api.quran.com/api/v4/verses/by_chapter/${id}?language=id&words=true&translations=33&fields=text_uthmani,text_imlaei&page=1&per_page=50`);
        const versesData = await versesResponse.json();
        setVerses(versesData.verses || []);
        
      } catch (error) {
        console.error('Error fetching surah data:', error);
        // Fallback data
        setSurahInfo({
          id: parseInt(id),
          name_simple: "Al-Fatihah",
          name_arabic: "الفاتحة",
          name_complex: "Al-Fātiḥah",
          revelation_place: "makkah",
          verses_count: 7,
          translated_name: { name: "Pembuka", language_name: "indonesian" }
        });
      } finally {
        setLoading(false);
      }
    };

    const loadBookmarks = () => {
      const saved = localStorage.getItem('quranVerseBookmarks');
      if (saved) {
        setBookmarkedVerses(new Set(JSON.parse(saved)));
      }
    };

    fetchSurahData();
    loadBookmarks();
  }, [id]);

  const toggleBookmark = (verseKey: string) => {
    const newBookmarks = new Set(bookmarkedVerses);
    if (newBookmarks.has(verseKey)) {
      newBookmarks.delete(verseKey);
    } else {
      newBookmarks.add(verseKey);
    }
    setBookmarkedVerses(newBookmarks);
    localStorage.setItem('quranVerseBookmarks', JSON.stringify([...newBookmarks]));
  };

  const playAudio = async (verseNumber: number) => {
    setCurrentPlaying(verseNumber);
    
    try {
      // Use Quran.com audio API
      const audioUrl = `https://everyayah.com/data/Mishary_Rashid_Alafasy_128kbps/${id?.padStart(3, '0')}${verseNumber.toString().padStart(3, '0')}.mp3`;
      
      const audio = new Audio(audioUrl);
      audio.onended = () => setCurrentPlaying(null);
      audio.onerror = () => {
        setCurrentPlaying(null);
        // Fallback to speech synthesis
        if ('speechSynthesis' in window) {
          speechSynthesis.cancel();
          const verse = verses.find(v => v.verse_number === verseNumber);
          if (verse) {
            const utterance = new SpeechSynthesisUtterance(verse.text_uthmani);
            utterance.lang = 'ar-SA';
            utterance.rate = 0.7;
            utterance.onend = () => setCurrentPlaying(null);
            speechSynthesis.speak(utterance);
          }
        }
      };
      
      audio.play();
    } catch (error) {
      console.error('Error playing audio:', error);
      setCurrentPlaying(null);
    }
  };

  const stopAudio = () => {
    setCurrentPlaying(null);
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!surahInfo) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Surah tidak ditemukan</h2>
          <Button asChild>
            <Link to="/quran">Kembali ke Daftar Surah</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/quran">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali
            </Link>
          </Button>
          <h1 className="text-4xl font-bold text-foreground">
            {surahInfo.name_simple} - {surahInfo.translated_name.name}
          </h1>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Surah Header */}
          <Card className="glass p-6 mb-8">
            <div className="text-center">
              <div className="text-4xl font-arabic mb-4" dir="rtl" lang="ar">
                {surahInfo.name_arabic}
              </div>
              <div className="flex items-center justify-center gap-4 mb-4">
                <Badge variant="outline">
                  Surah {surahInfo.id}
                </Badge>
                <Badge variant="outline">
                  {surahInfo.revelation_place === 'makkah' ? 'Makkah' : 'Madinah'}
                </Badge>
                <Badge variant="outline">
                  {surahInfo.verses_count} Ayat
                </Badge>
              </div>
              
              {/* Controls */}
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowTranslation(!showTranslation)}
                  className="flex items-center gap-2"
                >
                  {showTranslation ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
                  Terjemahan
                </Button>
                
                <Select value={selectedQari} onValueChange={setSelectedQari}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Pilih Qari" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Mishary Rashid Alafasy</SelectItem>
                    <SelectItem value="2">Abdul Basit</SelectItem>
                    <SelectItem value="3">Sudais</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Bismillah (for all surahs except At-Tawbah and Al-Fatihah) */}
          {surahInfo.id !== 1 && surahInfo.id !== 9 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <Card className="glass p-6">
                <p className="text-3xl font-arabic" dir="rtl" lang="ar">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                {showTranslation && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang
                  </p>
                )}
              </Card>
            </motion.div>
          )}

          {/* Verses */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {verses.map((verse, index) => (
              <motion.div
                key={verse.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass p-6">
                  <div className="space-y-4">
                    {/* Verse Number */}
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="px-3 py-1">
                        Ayat {verse.verse_number}
                      </Badge>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleBookmark(verse.verse_key)}
                          className={bookmarkedVerses.has(verse.verse_key) ? 'text-yellow-500' : ''}
                        >
                          <Bookmark 
                            className={`h-4 w-4 ${bookmarkedVerses.has(verse.verse_key) ? 'fill-current' : ''}`} 
                          />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => 
                            currentPlaying === verse.verse_number 
                              ? stopAudio() 
                              : playAudio(verse.verse_number)
                          }
                        >
                          {currentPlaying === verse.verse_number ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Arabic Text */}
                    <div className="text-right">
                      <p className="text-2xl leading-relaxed font-arabic" dir="rtl" lang="ar">
                        {verse.text_uthmani}
                        <span className="inline-block w-8 h-8 rounded-full bg-primary text-white text-sm font-bold mx-2 text-center leading-8">
                          {verse.verse_number}
                        </span>
                      </p>
                    </div>

                    {/* Translation */}
                    {showTranslation && verse.translations && verse.translations[0] && (
                      <div className="pt-4 border-t border-border/20">
                        <p className="text-base leading-relaxed">
                          {verse.translations[0].text}
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default QuranSurah;