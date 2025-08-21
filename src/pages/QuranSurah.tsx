import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Pause, Bookmark, Volume2, ToggleLeft, ToggleRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link, useParams } from 'react-router-dom';
import { quranApiService, type QuranApiVerse, type QuranApiSurah, type QuranApiReciter } from '@/services/quranApi';
import { useQuranAudio } from '@/hooks/useQuranAudio';
import { useToast } from '@/hooks/use-toast';

const QuranSurah = () => {
  const { id } = useParams<{ id: string }>();
  const [surahInfo, setSurahInfo] = useState<QuranApiSurah | null>(null);
  const [verses, setVerses] = useState<QuranApiVerse[]>([]);
  const [reciters, setReciters] = useState<QuranApiReciter[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [selectedReciter, setSelectedReciter] = useState<number>(7); // Mishary Rashid Alafasy
  const [bookmarkedVerses, setBookmarkedVerses] = useState<Set<string>>(new Set());
  
  const { toast } = useToast();
  const { isPlaying, currentVerse, isLoading: audioLoading, error: audioError, playVerse, pauseAudio, stopAudio } = useQuranAudio(id || '', selectedReciter);

  useEffect(() => {
    const fetchSurahData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        console.log('Fetching surah data for ID:', id);
        
        // Fetch surah info and verses in parallel
        const [surahData, versesData, recitersData] = await Promise.all([
          quranApiService.getSurahInfo(id),
          quranApiService.getSurahVerses(id),
          quranApiService.getReciters()
        ]);

        console.log('Surah data loaded:', { surahData, versesCount: versesData.length, recitersCount: recitersData.length });
        
        setSurahInfo(surahData);
        setVerses(versesData);
        setReciters(recitersData.slice(0, 10)); // Limit to first 10 reciters
        
      } catch (error) {
        console.error('Error fetching surah data:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error instanceof Error ? error.message : 'Gagal memuat data surah. Silakan coba lagi.',
        });
      } finally {
        setLoading(false);
      }
    };

    const loadBookmarks = () => {
      try {
        const saved = localStorage.getItem('quranVerseBookmarks');
        if (saved) {
          setBookmarkedVerses(new Set(JSON.parse(saved)));
        }
      } catch (error) {
        console.error('Error loading bookmarks:', error);
      }
    };

    fetchSurahData();
    loadBookmarks();
  }, [id, toast]);

  // Show audio error toast
  useEffect(() => {
    if (audioError) {
      toast({
        variant: 'destructive',
        title: 'Audio Error',
        description: audioError,
      });
    }
  }, [audioError, toast]);

  const toggleBookmark = (verseKey: string) => {
    try {
      const newBookmarks = new Set(bookmarkedVerses);
      if (newBookmarks.has(verseKey)) {
        newBookmarks.delete(verseKey);
      } else {
        newBookmarks.add(verseKey);
      }
      setBookmarkedVerses(newBookmarks);
      localStorage.setItem('quranVerseBookmarks', JSON.stringify([...newBookmarks]));
    } catch (error) {
      console.error('Error saving bookmark:', error);
    }
  };

  const handleAudioToggle = (verseNumber: number) => {
    console.log('Audio toggle for verse:', verseNumber, { currentVerse, isPlaying });
    
    if (currentVerse === verseNumber && isPlaying) {
      pauseAudio();
    } else if (currentVerse === verseNumber && !isPlaying) {
      // Resume if same verse
      playVerse(verseNumber);
    } else {
      // Play new verse
      stopAudio();
      playVerse(verseNumber);
    }
  };

  const handleReciterChange = (newReciterId: string) => {
    console.log('Changing reciter to:', newReciterId);
    stopAudio(); // Stop current audio when changing reciter
    setSelectedReciter(parseInt(newReciterId));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span>Memuat surah...</span>
        </div>
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
            {surahInfo?.name_simple} - {surahInfo?.translated_name.name}
          </h1>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Surah Header */}
          <Card className="glass p-6 mb-8">
            <div className="text-center">
              <div className="text-4xl font-arabic mb-4" dir="rtl" lang="ar">
                {surahInfo?.name_arabic}
              </div>
              <div className="flex items-center justify-center gap-4 mb-4">
                <Badge variant="outline">Surah {surahInfo?.id}</Badge>
                <Badge variant="outline">
                  {surahInfo?.revelation_place === 'makkah' ? 'Makkah' : 'Madinah'}
                </Badge>
                <Badge variant="outline">{surahInfo?.verses_count} Ayat</Badge>
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
                
                <Select value={selectedReciter.toString()} onValueChange={handleReciterChange}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Pilih Qari" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Mishary Rashid Alafasy</SelectItem>
                    <SelectItem value="2">Abdul Basit Murattal</SelectItem>
                    <SelectItem value="5">Hani ar-Rifai</SelectItem>
                    {reciters.map((reciter) => (
                      <SelectItem key={reciter.id} value={reciter.id.toString()}>
                        {reciter.translated_name?.name || reciter.reciter_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Bismillah */}
          {surahInfo && surahInfo.id !== 1 && surahInfo.id !== 9 && (
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
                    {/* Verse Number and Controls */}
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
                          onClick={() => handleAudioToggle(verse.verse_number)}
                          disabled={audioLoading && currentVerse === verse.verse_number}
                        >
                          {audioLoading && currentVerse === verse.verse_number ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : currentVerse === verse.verse_number && isPlaying ? (
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
