import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BookOpen, Bookmark, Search, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuranSection = () => {
  return (
    <section id="quran" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Al-<span className="text-gradient-primary">Qur'an</span> Digital
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Baca Al-Qur'an lengkap 114 surah dengan terjemahan dan audio dari qari terbaik dunia
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
              <BookOpen className="h-10 w-10 text-primary mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">114 Surah</h3>
              <p className="text-sm text-muted-foreground">Lengkap dari Al-Fatihah hingga An-Nas</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="glass p-6 text-center hover-lift">
              <Volume2 className="h-10 w-10 text-accent mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Audio Qari</h3>
              <p className="text-sm text-muted-foreground">Pilihan qari terbaik dunia</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="glass p-6 text-center hover-lift">
              <Search className="h-10 w-10 text-primary-glow mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Pencarian Cepat</h3>
              <p className="text-sm text-muted-foreground">Cari surah berdasarkan nama atau nomor</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="glass p-6 text-center hover-lift">
              <Bookmark className="h-10 w-10 text-yellow-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Bookmark</h3>
              <p className="text-sm text-muted-foreground">Simpan ayat favorit untuk dibaca lagi</p>
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
          <Button asChild size="lg" className="bg-gradient-primary hover:shadow-glow text-white px-8 py-6 text-lg">
            <Link to="/quran">Baca Al-Qur'an</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default QuranSection;