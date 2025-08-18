import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BookOpen, Volume2, PenTool } from 'lucide-react';
import { Link } from 'react-router-dom';

const HijaiyahSection = () => {
  return (
    <section id="hijaiyah" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Belajar <span className="text-gradient-primary">Hijaiyah</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Pelajari 28 huruf hijaiyah dengan audio, latihan menulis, dan pelacakan progress otomatis
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="glass p-6 text-center hover-lift">
              <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">28 Huruf Lengkap</h3>
              <p className="text-muted-foreground">Dari Alif hingga Ya dengan nama dan pengucapan yang benar</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="glass p-6 text-center hover-lift">
              <Volume2 className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Audio Interaktif</h3>
              <p className="text-muted-foreground">Dengarkan pengucapan yang benar untuk setiap huruf</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="glass p-6 text-center hover-lift">
              <PenTool className="h-12 w-12 text-primary-glow mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Latihan Menulis</h3>
              <p className="text-muted-foreground">Canvas interaktif untuk berlatih menulis huruf hijaiyah</p>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button asChild size="lg" className="bg-gradient-primary hover:shadow-glow text-white px-8 py-6 text-lg">
            <Link to="/hijaiyah">Mulai Belajar Hijaiyah</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HijaiyahSection;