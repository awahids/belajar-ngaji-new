import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Check, X, Brain, Trophy, RotateCcw, Lightbulb } from 'lucide-react';
import { islamicDataScraperService } from '@/services/islamicDataScraper';
import { IslamicQuizQuestion } from '@/services/quranApi';

interface QuizState {
  currentQuestion: number;
  selectedAnswer: number | null;
  showResult: boolean;
  score: number;
  answered: boolean[];
  userAnswers: (number | null)[];
}

const IslamicQuizSection = () => {
  const [questions, setQuestions] = useState<IslamicQuizQuestion[]>([]);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    selectedAnswer: null,
    showResult: false,
    score: 0,
    answered: [],
    userAnswers: []
  });
  const [loading, setLoading] = useState(true);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        const scrapedData = await islamicDataScraperService.scrapeIslamicContent();
        const shuffledQuestions = scrapedData.questions
          .sort(() => Math.random() - 0.5)
          .slice(0, 10); // Limit to 10 questions per quiz
        
        setQuestions(shuffledQuestions);
        setQuizState({
          currentQuestion: 0,
          selectedAnswer: null,
          showResult: false,
          score: 0,
          answered: new Array(shuffledQuestions.length).fill(false),
          userAnswers: new Array(shuffledQuestions.length).fill(null)
        });
      } catch (error) {
        console.error('Error loading quiz questions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  const handleAnswerSelect = (answerIndex: number) => {
    if (quizState.answered[quizState.currentQuestion]) return;
    
    setQuizState(prev => ({
      ...prev,
      selectedAnswer: answerIndex
    }));
  };

  const handleAnswerSubmit = () => {
    if (quizState.selectedAnswer === null) return;

    const currentQ = questions[quizState.currentQuestion];
    const isCorrect = quizState.selectedAnswer === currentQ.correct_answer;
    
    setQuizState(prev => {
      const newAnswered = [...prev.answered];
      const newUserAnswers = [...prev.userAnswers];
      newAnswered[prev.currentQuestion] = true;
      newUserAnswers[prev.currentQuestion] = prev.selectedAnswer;
      
      return {
        ...prev,
        answered: newAnswered,
        userAnswers: newUserAnswers,
        score: isCorrect ? prev.score + 1 : prev.score
      };
    });

    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (quizState.currentQuestion < questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        selectedAnswer: prev.userAnswers[prev.currentQuestion + 1],
      }));
      setShowExplanation(false);
    } else {
      setQuizState(prev => ({ ...prev, showResult: true }));
    }
  };

  const handlePreviousQuestion = () => {
    if (quizState.currentQuestion > 0) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1,
        selectedAnswer: prev.userAnswers[prev.currentQuestion - 1],
      }));
      setShowExplanation(quizState.answered[quizState.currentQuestion - 1]);
    }
  };

  const handleRestart = () => {
    setQuizState({
      currentQuestion: 0,
      selectedAnswer: null,
      showResult: false,
      score: 0,
      answered: new Array(questions.length).fill(false),
      userAnswers: new Array(questions.length).fill(null)
    });
    setShowExplanation(false);
  };

  const getScoreLevel = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return { level: 'Excellent', color: 'text-green-600', emoji: '🌟' };
    if (percentage >= 80) return { level: 'Very Good', color: 'text-blue-600', emoji: '⭐' };
    if (percentage >= 70) return { level: 'Good', color: 'text-yellow-600', emoji: '👍' };
    if (percentage >= 60) return { level: 'Fair', color: 'text-orange-600', emoji: '📚' };
    return { level: 'Keep Learning', color: 'text-red-600', emoji: '💪' };
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-muted rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (questions.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-br from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Quiz Tidak Tersedia</h2>
            <p className="text-muted-foreground">Maaf, tidak dapat memuat soal quiz saat ini.</p>
          </div>
        </div>
      </section>
    );
  }

  const currentQuestion = questions[quizState.currentQuestion];
  const progress = ((quizState.currentQuestion + 1) / questions.length) * 100;

  if (quizState.showResult) {
    const scoreInfo = getScoreLevel(quizState.score, questions.length);
    
    return (
      <section className="py-20 bg-gradient-to-br from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <Card className="glass p-8">
                <CardHeader>
                  <div className="text-6xl mb-4">{scoreInfo.emoji}</div>
                  <CardTitle className="text-3xl mb-4">
                    Quiz Selesai!
                  </CardTitle>
                  <div className={`text-2xl font-bold ${scoreInfo.color} mb-2`}>
                    {scoreInfo.level}
                  </div>
                  <div className="text-4xl font-bold mb-4">
                    {quizState.score}/{questions.length}
                  </div>
                  <div className="text-lg text-muted-foreground">
                    Anda berhasil menjawab {quizState.score} dari {questions.length} soal dengan benar
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Progress value={(quizState.score / questions.length) * 100} className="h-4" />
                    <Button onClick={handleRestart} className="w-full" size="lg">
                      <RotateCcw className="mr-2 h-5 w-5" />
                      Ulangi Quiz
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Review Answers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold text-center mb-6">Review Jawaban</h3>
              {questions.map((question, index) => {
                const userAnswer = quizState.userAnswers[index];
                const isCorrect = userAnswer === question.correct_answer;
                
                return (
                  <Card key={question.id} className="glass">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isCorrect ? 'bg-green-500' : 'bg-red-500'
                        } text-white font-bold`}>
                          {isCorrect ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{index + 1}</Badge>
                            <Badge variant="secondary">{question.category}</Badge>
                            <Badge variant={question.difficulty === 'easy' ? 'default' : question.difficulty === 'medium' ? 'secondary' : 'destructive'}>
                              {question.difficulty}
                            </Badge>
                          </div>
                          <h4 className="font-semibold mb-3">{question.question}</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                            {question.options.map((option, optionIndex) => (
                              <div
                                key={optionIndex}
                                className={`p-3 rounded-lg border text-sm ${
                                  optionIndex === question.correct_answer
                                    ? 'bg-green-100 border-green-500 text-green-800'
                                    : optionIndex === userAnswer && userAnswer !== question.correct_answer
                                    ? 'bg-red-100 border-red-500 text-red-800'
                                    : 'bg-muted border-border'
                                }`}
                              >
                                {option}
                              </div>
                            ))}
                          </div>
                          {question.explanation && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                              <div className="flex items-center gap-2 mb-1">
                                <Lightbulb className="h-4 w-4 text-blue-600" />
                                <span className="text-sm font-medium text-blue-800">Penjelasan:</span>
                              </div>
                              <p className="text-sm text-blue-700">{question.explanation}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Brain className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">Quiz Islam</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Uji pengetahuan Islam Anda dengan quiz interaktif
            </p>
            
            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Soal {quizState.currentQuestion + 1} dari {questions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </motion.div>

          {/* Question Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            key={quizState.currentQuestion}
            className="mb-8"
          >
            <Card className="glass">
              <CardHeader>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline">Soal {quizState.currentQuestion + 1}</Badge>
                  <Badge variant="secondary">{currentQuestion.category}</Badge>
                  <Badge variant={currentQuestion.difficulty === 'easy' ? 'default' : currentQuestion.difficulty === 'medium' ? 'secondary' : 'destructive'}>
                    {currentQuestion.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-xl leading-relaxed">
                  {currentQuestion.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentQuestion.options.map((option, index) => (
                    <Button
                      key={index}
                      variant={quizState.selectedAnswer === index ? 'default' : 'outline'}
                      className={`p-4 h-auto text-left justify-start whitespace-normal ${
                        quizState.answered[quizState.currentQuestion]
                          ? index === currentQuestion.correct_answer
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : index === quizState.selectedAnswer && index !== currentQuestion.correct_answer
                            ? 'bg-red-500 hover:bg-red-600 text-white'
                            : ''
                          : ''
                      }`}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={quizState.answered[quizState.currentQuestion]}
                    >
                      <span className="font-bold mr-2">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </Button>
                  ))}
                </div>

                {/* Explanation */}
                {showExplanation && currentQuestion.explanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-800">Penjelasan:</span>
                    </div>
                    <p className="text-blue-700">{currentQuestion.explanation}</p>
                    {currentQuestion.source && (
                      <p className="text-sm text-blue-600 mt-2">
                        Sumber: {currentQuestion.source}
                      </p>
                    )}
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePreviousQuestion}
              disabled={quizState.currentQuestion === 0}
            >
              Sebelumnya
            </Button>

            <div className="flex gap-2">
              {!quizState.answered[quizState.currentQuestion] && (
                <Button
                  onClick={handleAnswerSubmit}
                  disabled={quizState.selectedAnswer === null}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Jawab
                </Button>
              )}

              {quizState.answered[quizState.currentQuestion] && (
                <Button onClick={handleNextQuestion}>
                  {quizState.currentQuestion < questions.length - 1 ? 'Selanjutnya' : 'Lihat Hasil'}
                  {quizState.currentQuestion === questions.length - 1 && (
                    <Trophy className="ml-2 h-4 w-4" />
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IslamicQuizSection;