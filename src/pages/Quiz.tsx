import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Clock, Share, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { getQuizCategories, getQuizQuestions } from '@/lib/api';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface QuizCategory {
  id: string;
  name: string;
  name_en?: string;
  description: string;
  description_en?: string;
  icon_name: string;
  order_index: number;
}

interface QuizOption {
  id: string;
  option_text: string;
  option_text_en?: string;
  is_correct: boolean;
  order_index: number;
}

interface QuizQuestion {
  id: string;
  question: string;
  question_en?: string;
  explanation?: string;
  explanation_en?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  quiz_options: QuizOption[];
}

const Quiz = () => {
  const { categoryId } = useParams<{ categoryId?: string }>();
  const [categories, setCategories] = useState<QuizCategory[]>([]);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per question
  const [challengeMode, setChallengeMode] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const loadCategories = async () => {
      const categoriesData = await getQuizCategories();
      setCategories(categoriesData);
    };

    loadCategories();
  }, []);

  useEffect(() => {
    if (categoryId) {
      const loadQuestions = async () => {
        const questionsData = await getQuizQuestions(categoryId);
        setQuestions(questionsData);
        setCurrentQuestion(0);
        setScore(0);
        setQuizComplete(false);
        setSelectedAnswer(null);
        setShowExplanation(false);
        if (challengeMode) setTimeLeft(30);
      };

      loadQuestions();
    }
  }, [categoryId, challengeMode]);

  // Timer for challenge mode
  useEffect(() => {
    if (challengeMode && timeLeft > 0 && !showExplanation && !quizComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (challengeMode && timeLeft === 0 && !showExplanation) {
      // Auto-submit when time runs out
      handleAnswerSubmit(null);
    }
  }, [timeLeft, challengeMode, showExplanation, quizComplete]);

  const handleAnswerSubmit = (optionId: string | null) => {
    if (showExplanation) return;

    setSelectedAnswer(optionId);
    setShowExplanation(true);

    const currentQ = questions[currentQuestion];
    const correctOption = currentQ.quiz_options.find(opt => opt.is_correct);
    
    if (optionId === correctOption?.id) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      if (challengeMode) setTimeLeft(30);
    } else {
      setQuizComplete(true);
      saveScore();
    }
  };

  const saveScore = () => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;

    const scoreData = {
      categoryId,
      categoryName: category.name,
      score,
      total: questions.length,
      percentage: Math.round((score / questions.length) * 100),
      date: new Date().toISOString(),
      mode: challengeMode ? 'challenge' : 'practice'
    };

    const savedScores = JSON.parse(localStorage.getItem('quizScores') || '[]');
    savedScores.push(scoreData);
    localStorage.setItem('quizScores', JSON.stringify(savedScores));
  };

  const shareResult = () => {
    const category = categories.find(c => c.id === categoryId);
    const percentage = Math.round((score / questions.length) * 100);
    const text = `Saya baru menyelesaikan kuis ${category?.name} dengan skor ${score}/${questions.length} (${percentage}%)! 🎉 #BelajarNgaji #KuisIslam`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Hasil Kuis Islam',
        text: text,
      });
    } else {
      navigator.clipboard.writeText(text);
      toast({
        title: "Disalin!",
        description: "Hasil kuis berhasil disalin untuk dibagikan.",
      });
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuizComplete(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
    if (challengeMode) setTimeLeft(30);
  };

  // Category selection view
  if (!categoryId) {
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
            <h1 className="text-4xl font-bold text-foreground">Kuis Agama Islam</h1>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-lg text-muted-foreground">
                Pilih kategori kuis untuk menguji pengetahuan Anda
              </p>
            </div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass p-6 hover-lift cursor-pointer group">
                    <div className="text-center">
                      <div className="text-4xl mb-4">
                        {category.icon_name === 'BookOpen' && '📚'}
                        {category.icon_name === 'Volume2' && '🔊'}
                        {category.icon_name === 'Clock' && '⏰'}
                        {category.icon_name === 'Brain' && '🧠'}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                      <p className="text-muted-foreground mb-4">{category.description}</p>
                      
                      <div className="flex gap-2 justify-center">
                        <Button 
                          onClick={() => {
                            setChallengeMode(false);
                            navigate(`/quiz/${category.id}`);
                          }}
                          variant="outline"
                          size="sm"
                        >
                          Latihan
                        </Button>
                        <Button 
                          onClick={() => {
                            setChallengeMode(true);
                            navigate(`/quiz/${category.id}`);
                          }}
                          size="sm"
                          className="bg-gradient-primary"
                        >
                          Tantangan
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz completion view
  if (quizComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    const category = categories.find(c => c.id === categoryId);

    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="glass p-8">
                <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                
                <h2 className="text-3xl font-bold mb-4">
                  {percentage >= 80 ? 'Luar Biasa! 🎉' : percentage >= 60 ? 'Bagus! 👏' : 'Tetap Semangat! 💪'}
                </h2>
                
                <div className="text-6xl font-bold text-gradient-primary mb-4">
                  {percentage}%
                </div>
                
                <p className="text-lg mb-6">
                  Anda menjawab {score} dari {questions.length} pertanyaan dengan benar
                </p>
                
                <div className="mb-6">
                  <Badge variant="outline" className="px-4 py-2 text-base">
                    {category?.name} - Mode {challengeMode ? 'Tantangan' : 'Latihan'}
                  </Badge>
                </div>
                
                <div className="flex gap-4 justify-center">
                  <Button onClick={resetQuiz} variant="outline">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Ulangi
                  </Button>
                  <Button onClick={shareResult} variant="outline">
                    <Share className="h-4 w-4 mr-2" />
                    Bagikan
                  </Button>
                  <Button onClick={() => navigate('/quiz')}>
                    Pilih Kategori Lain
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz question view
  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const category = categories.find(c => c.id === categoryId);
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" onClick={() => navigate('/quiz')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>
          <h1 className="text-2xl font-bold text-foreground">
            {category?.name} - {challengeMode ? 'Mode Tantangan' : 'Mode Latihan'}
          </h1>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Progress and Timer */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                Pertanyaan {currentQuestion + 1} dari {questions.length}
              </span>
              {challengeMode && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className={`font-bold ${timeLeft <= 5 ? 'text-red-500' : ''}`}>
                    {timeLeft}s
                  </span>
                </div>
              )}
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question */}
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="glass p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline">
                  {currentQ.difficulty === 'easy' ? 'Mudah' : 
                   currentQ.difficulty === 'medium' ? 'Sedang' : 'Sulit'}
                </Badge>
                <Badge variant="outline">
                  Skor: {score}/{questions.length}
                </Badge>
              </div>
              
              <h3 className="text-xl font-semibold mb-6">
                {currentQ.question}
              </h3>

              <div className="space-y-3">
                {currentQ.quiz_options
                  .sort((a, b) => a.order_index - b.order_index)
                  .map((option) => (
                    <Button
                      key={option.id}
                      variant={
                        showExplanation
                          ? option.is_correct
                            ? "default"
                            : selectedAnswer === option.id
                            ? "destructive"
                            : "outline"
                          : selectedAnswer === option.id
                          ? "default"
                          : "outline"
                      }
                      className="w-full text-left justify-start h-auto p-4"
                      onClick={() => handleAnswerSubmit(option.id)}
                      disabled={showExplanation}
                    >
                      <span className="text-wrap">{option.option_text}</span>
                      {showExplanation && option.is_correct && (
                        <span className="ml-auto">✓</span>
                      )}
                    </Button>
                  ))}
              </div>

              {/* Explanation */}
              {showExplanation && currentQ.explanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-6 p-4 bg-muted/50 rounded-lg"
                >
                  <h4 className="font-semibold mb-2">Pembahasan:</h4>
                  <p className="text-sm">{currentQ.explanation}</p>
                </motion.div>
              )}

              {/* Next Button */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 text-center"
                >
                  <Button onClick={handleNextQuestion}>
                    {currentQuestion < questions.length - 1 ? 'Pertanyaan Selanjutnya' : 'Lihat Hasil'}
                  </Button>
                </motion.div>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;