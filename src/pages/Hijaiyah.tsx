import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Pause, RotateCcw, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getHijaiyahLetters } from '@/lib/api';
import { Link } from 'react-router-dom';

interface HijaiyahLetter {
  id: string;
  letter: string;
  name_id: string;
  name_en?: string;
  order_index: number;
  audio_url?: string;
}

const Hijaiyah = () => {
  const [letters, setLetters] = useState<HijaiyahLetter[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<HijaiyahLetter | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [learnedLetters, setLearnedLetters] = useState<Set<string>>(new Set());
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const lettersData = await getHijaiyahLetters();
      setLetters(lettersData);
    };

    const savedProgress = localStorage.getItem('hijaiyahProgress');
    if (savedProgress) {
      setLearnedLetters(new Set(JSON.parse(savedProgress)));
    }

    loadData();
  }, []);

  const playAudio = (letter: HijaiyahLetter) => {
    setSelectedLetter(letter);
    
    // Mark as learned
    const newLearned = new Set(learnedLetters);
    newLearned.add(letter.id);
    setLearnedLetters(newLearned);
    localStorage.setItem('hijaiyahProgress', JSON.stringify([...newLearned]));

    // For demo, we'll use speech synthesis
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(letter.name_id);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.7;
      setIsPlaying(true);
      
      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
    }
  };

  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
    setIsPlaying(false);
  };

  // Canvas drawing functions for tracing practice
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Redraw the letter outline
    if (selectedLetter) {
      ctx.font = '120px serif';
      ctx.fillStyle = '#e5e7eb';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(selectedLetter.letter, canvas.width / 2, canvas.height / 2);
    }
  };

  useEffect(() => {
    if (selectedLetter && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Setup canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      
      // Draw letter outline
      ctx.font = '120px serif';
      ctx.fillStyle = '#e5e7eb';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(selectedLetter.letter, canvas.width / 2, canvas.height / 2);
    }
  }, [selectedLetter]);

  const progressPercentage = Math.round((learnedLetters.size / letters.length) * 100);

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
          <h1 className="text-4xl font-bold text-foreground">Belajar Hijaiyah</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Letters Grid */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">Huruf Hijaiyah</h2>
                <Badge variant="secondary" className="px-3 py-1">
                  Progress: {progressPercentage}% ({learnedLetters.size}/{letters.length})
                </Badge>
              </div>
              
              <motion.div 
                className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.05 }}
              >
                {letters.map((letter, index) => (
                  <motion.div
                    key={letter.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card 
                      className={`
                        relative p-4 cursor-pointer hover-lift transition-all duration-300
                        ${selectedLetter?.id === letter.id ? 'ring-2 ring-primary bg-primary/5' : ''}
                        ${learnedLetters.has(letter.id) ? 'bg-gradient-primary text-white' : 'glass'}
                      `}
                      onClick={() => playAudio(letter)}
                    >
                      <div className="text-center">
                        <div className="text-3xl font-bold mb-2 font-arabic" dir="rtl" lang="ar">
                          {letter.letter}
                        </div>
                        <div className="text-sm font-medium">{letter.name_id}</div>
                        {letter.name_en && (
                          <div className="text-xs opacity-70">{letter.name_en}</div>
                        )}
                      </div>
                      
                      {learnedLetters.has(letter.id) && (
                        <div className="absolute top-2 right-2">
                          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        </div>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Practice Area */}
          <div className="lg:col-span-1">
            <Card className="glass p-6">
              <h3 className="text-xl font-semibold mb-4">Latihan Menulis</h3>
              
              {selectedLetter ? (
                <div>
                  <div className="mb-4">
                    <div className="text-center mb-2">
                      <div className="text-4xl font-bold mb-2 font-arabic" dir="rtl" lang="ar">
                        {selectedLetter.letter}
                      </div>
                      <div className="text-lg font-medium">{selectedLetter.name_id}</div>
                    </div>
                    
                    <div className="flex gap-2 justify-center">
                      <Button
                        size="sm"
                        onClick={() => playAudio(selectedLetter)}
                        disabled={isPlaying}
                        className="flex items-center gap-2"
                      >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        Putar Audio
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={clearCanvas}
                        className="flex items-center gap-2"
                      >
                        <RotateCcw className="h-4 w-4" />
                        Reset
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <canvas
                      ref={canvasRef}
                      width={300}
                      height={200}
                      className="w-full cursor-crosshair bg-white"
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                    />
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-2 text-center">
                    Klik dan seret untuk menelusuri huruf
                  </p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Volume2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Pilih huruf untuk mulai berlatih
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hijaiyah;