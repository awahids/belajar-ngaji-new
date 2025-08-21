import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Bookmark, Play, Pause, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';

interface Surah {
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

const Quran = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarks, setBookmarks] = useState<Set<number>>(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await fetch('https://api.quran.com/api/v4/chapters?language=id');
        const data = await response.json();
        setSurahs(data.chapters || []);
      } catch (error) {
        console.error('Error fetching surahs:', error);
        // Fallback data if API fails
        setSurahs([
          {
            id: 1,
            name_simple: "Al-Fatihah",
            name_arabic: "الفاتحة",
            name_complex: "Al-Fātiḥah",
            revelation_place: "makkah",
            verses_count: 7,
            translated_name: { name: "Pembuka", language_name: "indonesian" }
          },
          {
            id: 2,
            name_simple: "Al-Baqarah",
            name_arabic: "البقرة",
            name_complex: "Al-Baqarah",
            revelation_place: "madinah",
            verses_count: 286,
            translated_name: { name: "Sapi Betina", language_name: "indonesian" }
          }
          // Add more fallback data as needed
        ]);
      } finally {
        setLoading(false);
      }
    };

    const loadBookmarks = () => {
      const saved = localStorage.getItem('quranBookmarks');
      if (saved) {
        setBookmarks(new Set(JSON.parse(saved)));
      }
    };

    fetchSurahs();
    loadBookmarks();
  }, []);

  const toggleBookmark = (surahId: number) => {
    const newBookmarks = new Set(bookmarks);
    if (newBookmarks.has(surahId)) {
      newBookmarks.delete(surahId);
    } else {
      newBookmarks.add(surahId);
    }
    setBookmarks(newBookmarks);
    localStorage.setItem('quranBookmarks', JSON.stringify([...newBookmarks]));
  };

  const filteredSurahs = surahs.filter(surah =>
    surah.name_simple.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.name_arabic.includes(searchQuery) ||
    surah.translated_name.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.id.toString().includes(searchQuery)
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali
            </Link>
          </Button>
          <h1 className="text-4xl font-bold text-foreground">Al-Qur'an</h1>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Search */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari surah (nama, nomor, atau arti)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="glass p-4 text-center">
              <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">114</div>
              <div className="text-sm text-muted-foreground">Total Surah</div>
            </Card>
            <Card className="glass p-4 text-center">
              <Bookmark className="h-8 w-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold">{bookmarks.size}</div>
              <div className="text-sm text-muted-foreground">Bookmark</div>
            </Card>
            <Card className="glass p-4 text-center">
              <Search className="h-8 w-8 text-primary-glow mx-auto mb-2" />
              <div className="text-2xl font-bold">{filteredSurahs.length}</div>
              <div className="text-sm text-muted-foreground">Hasil Pencarian</div>
            </Card>
          </div>

          {/* Surahs Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.05 }}
          >
            {filteredSurahs.map((surah, index) => (
              <motion.div
                key={surah.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="glass p-4 hover-lift cursor-pointer group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Surah Number */}
                      <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                        {surah.id}
                      </div>
                      
                      {/* Surah Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{surah.name_simple}</h3>
                          <Badge variant="outline" className="text-xs">
                            {surah.revelation_place === 'makkah' ? 'Makkah' : 'Madinah'}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mb-1">
                          {surah.translated_name.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {surah.verses_count} Ayat
                        </div>
                      </div>
                    </div>

                    {/* Arabic Name and Actions */}
                    <div className="text-right">
                      <div className="text-xl font-arabic mb-2" dir="rtl" lang="ar">
                        {surah.name_arabic}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark(surah.id);
                          }}
                          className={bookmarks.has(surah.id) ? 'text-yellow-500' : ''}
                        >
                          <Bookmark 
                            className={`h-4 w-4 ${bookmarks.has(surah.id) ? 'fill-current' : ''}`} 
                          />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => navigate(`/quran/surah/${surah.id}`)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Baca
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filteredSurahs.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Tidak ditemukan</h3>
              <p className="text-muted-foreground">
                Coba gunakan kata kunci yang berbeda
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quran;