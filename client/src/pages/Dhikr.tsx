import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Pause, Copy, Share, RotateCcw, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { getDhikr } from '@/lib/api';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface DhikrItem {
  id: string;
  type: 'morning' | 'evening';
  arabic_text: string;
  transliteration: string;
  translation_id: string;
  translation_en?: string;
  recommended_count: number;
  audio_url?: string;
  source?: string;
  order_index: number;
}

const Dhikr = () => {
  const [dhikrData, setDhikrData] = useState<DhikrItem[]>([]);
  const [activeType, setActiveType] = useState<'morning' | 'evening'>('morning');
  const [counters, setCounters] = useState<Record<string, number>>({});
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      const data = await getDhikr();
      setDhikrData(data);
    };

    const loadProgress = () => {
      const savedCounters = localStorage.getItem('dhikrCounters');
      const savedCompleted = localStorage.getItem('dhikrCompleted');
      const lastReset = localStorage.getItem('dhikrLastReset');
      
      const today = new Date().toDateString();
      
      // Reset daily progress if it's a new day
      if (lastReset !== today) {
        localStorage.setItem('dhikrLastReset', today);
        localStorage.removeItem('dhikrCounters');
        localStorage.removeItem('dhikrCompleted');
      } else {
        if (savedCounters) setCounters(JSON.parse(savedCounters));
        if (savedCompleted) setCompletedItems(new Set(JSON.parse(savedCompleted)));
      }
    };

    loadData();
    loadProgress();
  }, []);

  const incrementCounter = (itemId: string, recommendedCount: number) => {
    const newCounters = { ...counters };
    newCounters[itemId] = (newCounters[itemId] || 0) + 1;
    setCounters(newCounters);
    
    // Mark as completed if reached recommended count
    if (newCounters[itemId] >= recommendedCount) {
      const newCompleted = new Set(completedItems);
      newCompleted.add(itemId);
      setCompletedItems(newCompleted);
      localStorage.setItem('dhikrCompleted', JSON.stringify([...newCompleted]));
      
      toast({
        title: "Alhamdulillah! 🎉",
        description: "Anda telah menyelesaikan dhikr ini!",
      });
    }
    
    localStorage.setItem('dhikrCounters', JSON.stringify(newCounters));
  };

  const decrementCounter = (itemId: string) => {
    const newCounters = { ...counters };
    if (newCounters[itemId] > 0) {
      newCounters[itemId]--;
      setCounters(newCounters);
      
      // Remove from completed if below recommended count
      const item = dhikrData.find(d => d.id === itemId);
      if (item && newCounters[itemId] < item.recommendedCount) {
        const newCompleted = new Set(completedItems);
        newCompleted.delete(itemId);
        setCompletedItems(newCompleted);
        localStorage.setItem('dhikrCompleted', JSON.stringify([...newCompleted]));
      }
      
      localStorage.setItem('dhikrCounters', JSON.stringify(newCounters));
    }
  };

  const resetAllCounters = () => {
    setCounters({});
    setCompletedItems(new Set());
    localStorage.removeItem('dhikrCounters');
    localStorage.removeItem('dhikrCompleted');
    toast({
      title: "Reset Berhasil",
      description: "Semua penghitung dhikr telah direset.",
    });
  };

  const playAudio = (item: DhikrItem) => {
    setIsPlaying(item.id);
    
    // Use speech synthesis for Arabic text
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(item.transliteration);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.6;
      
      utterance.onend = () => setIsPlaying(null);
      speechSynthesis.speak(utterance);
    }
  };

  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
    setIsPlaying(null);
  };

  const copyText = (item: DhikrItem) => {
    const text = `${item.arabic_text}\n\n${item.transliteration}\n\n${item.translation_id}`;
    navigator.clipboard.writeText(text);
    toast({
      title: "Disalin!",
      description: "Teks dhikr berhasil disalin ke clipboard.",
    });
  };

  const shareText = (item: DhikrItem) => {
    const text = `${item.arabic_text}\n\n${item.transliteration}\n\n${item.translation_id}\n\n#DhikrHarian #BelajarNgaji`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Dhikr Harian',
        text: text,
      });
    } else {
      navigator.clipboard.writeText(text);
      toast({
        title: "Disalin untuk Dibagikan!",
        description: "Teks dhikr berhasil disalin. Anda bisa membagikannya sekarang.",
      });
    }
  };

  const filteredDhikr = dhikrData.filter(item => item.type === activeType);
  const completedToday = filteredDhikr.filter(item => completedItems.has(item.id)).length;
  const progressPercentage = filteredDhikr.length > 0 ? Math.round((completedToday / filteredDhikr.length) * 100) : 0;

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
          <h1 className="text-4xl font-bold text-foreground">Dhikr Harian</h1>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs value={activeType} onValueChange={(value) => setActiveType(value as 'morning' | 'evening')}>
            <div className="flex items-center justify-between mb-6">
              <TabsList className="grid w-fit grid-cols-2">
                <TabsTrigger value="morning" className="flex items-center gap-2">
                  <Sun className="h-4 w-4" />
                  Dhikr Pagi
                </TabsTrigger>
                <TabsTrigger value="evening" className="flex items-center gap-2">
                  <Moon className="h-4 w-4" />
                  Dhikr Petang
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="px-3 py-1">
                  Progress: {progressPercentage}% ({completedToday}/{filteredDhikr.length})
                </Badge>
                <Button variant="outline" size="sm" onClick={resetAllCounters}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset Harian
                </Button>
              </div>
            </div>

            <TabsContent value="morning">
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ staggerChildren: 0.1 }}
              >
                {filteredDhikr.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`p-6 ${completedItems.has(item.id) ? 'bg-gradient-primary text-white' : 'glass'}`}>
                      <div className="space-y-4">
                        {/* Arabic Text */}
                        <div className="text-right">
                          <p className="text-2xl leading-relaxed font-arabic" dir="rtl" lang="ar">
                            {item.arabic_text}
                          </p>
                        </div>

                        {/* Transliteration */}
                        <div>
                          <p className="text-lg italic text-muted-foreground">
                            {item.transliteration}
                          </p>
                        </div>

                        {/* Translation */}
                        <div>
                          <p className="text-base leading-relaxed">
                            {item.translation_id}
                          </p>
                        </div>

                        {/* Counter and Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-border/20">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant={completedItems.has(item.id) ? "secondary" : "outline"}
                                onClick={() => decrementCounter(item.id)}
                                disabled={(counters[item.id] || 0) === 0}
                              >
                                -
                              </Button>
                              <span className="min-w-[60px] text-center font-bold">
                                {counters[item.id] || 0} / {item.recommended_count}
                              </span>
                              <Button
                                size="sm"
                                variant={completedItems.has(item.id) ? "secondary" : "default"}
                                onClick={() => incrementCounter(item.id, item.recommended_count)}
                              >
                                +
                              </Button>
                            </div>

                            {completedItems.has(item.id) && (
                              <Badge variant="secondary" className="bg-green-500 text-white">
                                ✓ Selesai
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => isPlaying === item.id ? stopAudio() : playAudio(item)}
                            >
                              {isPlaying === item.id ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyText(item)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => shareText(item)}
                            >
                              <Share className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="evening">
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ staggerChildren: 0.1 }}
              >
                {filteredDhikr.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`p-6 ${completedItems.has(item.id) ? 'bg-gradient-primary text-white' : 'glass'}`}>
                      <div className="space-y-4">
                        {/* Arabic Text */}
                        <div className="text-right">
                          <p className="text-2xl leading-relaxed font-arabic" dir="rtl" lang="ar">
                            {item.arabic_text}
                          </p>
                        </div>

                        {/* Transliteration */}
                        <div>
                          <p className="text-lg italic text-muted-foreground">
                            {item.transliteration}
                          </p>
                        </div>

                        {/* Translation */}
                        <div>
                          <p className="text-base leading-relaxed">
                            {item.translation_id}
                          </p>
                        </div>

                        {/* Counter and Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-border/20">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant={completedItems.has(item.id) ? "secondary" : "outline"}
                                onClick={() => decrementCounter(item.id)}
                                disabled={(counters[item.id] || 0) === 0}
                              >
                                -
                              </Button>
                              <span className="min-w-[60px] text-center font-bold">
                                {counters[item.id] || 0} / {item.recommended_count}
                              </span>
                              <Button
                                size="sm"
                                variant={completedItems.has(item.id) ? "secondary" : "default"}
                                onClick={() => incrementCounter(item.id, item.recommended_count)}
                              >
                                +
                              </Button>
                            </div>

                            {completedItems.has(item.id) && (
                              <Badge variant="secondary" className="bg-green-500 text-white">
                                ✓ Selesai
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => isPlaying === item.id ? stopAudio() : playAudio(item)}
                            >
                              {isPlaying === item.id ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyText(item)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => shareText(item)}
                            >
                              <Share className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dhikr;