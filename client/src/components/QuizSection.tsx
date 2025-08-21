import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trophy, Clock, Brain, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuizSection = () => {
  return (
    <section id="quiz" className="py-20 bg-gradient-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Kuis <span className="text-gradient-accent">Agama Islam</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Uji pengetahuan agama Islam Anda dengan berbagai kategori kuis interaktif
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="glass p-6 text-center hover-lift">
              <Brain className="h-10 w-10 text-primary mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">4 Kategori</h3>
              <p className="text-sm text-muted-foreground">Hijaiyah, Tajwid, Ibadah, Pengetahuan Umum</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="glass p-6 text-center hover-lift">
              <Clock className="h-10 w-10 text-accent mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Mode Tantangan</h3>
              <p className="text-sm text-muted-foreground">Kuis dengan batas waktu untuk tantangan ekstra</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="glass p-6 text-center hover-lift">
              <Target className="h-10 w-10 text-primary-glow mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Pembahasan</h3>
              <p className="text-sm text-muted-foreground">Penjelasan lengkap untuk setiap jawaban</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="glass p-6 text-center hover-lift">
              <Trophy className="h-10 w-10 text-yellow-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Skor & Share</h3>
              <p className="text-sm text-muted-foreground">Lacak progress dan bagikan pencapaian</p>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button asChild size="lg" className="bg-gradient-accent hover:shadow-glow text-white px-8 py-6 text-lg">
            <Link to="/quiz">Mulai Kuis</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default QuizSection;