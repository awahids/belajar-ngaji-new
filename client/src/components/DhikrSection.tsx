import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sun, Moon, Heart, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';

const DhikrSection = () => {
  return (
    <section id="dhikr" className="py-20 bg-gradient-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Dhikr <span className="text-gradient-accent">Pagi & Petang</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Kumpulan dhikr pilihan untuk dibaca di waktu pagi dan petang dengan counter otomatis
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
              <Sun className="h-10 w-10 text-yellow-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Dhikr Pagi</h3>
              <p className="text-sm text-muted-foreground">Dibaca setelah Subuh hingga Dhuhur</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="glass p-6 text-center hover-lift">
              <Moon className="h-10 w-10 text-blue-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Dhikr Petang</h3>
              <p className="text-sm text-muted-foreground">Dibaca setelah Ashar hingga Maghrib</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="glass p-6 text-center hover-lift">
              <Heart className="h-10 w-10 text-red-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Counter Digital</h3>
              <p className="text-sm text-muted-foreground">Hitung otomatis jumlah bacaan dhikr</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="glass p-6 text-center hover-lift">
              <Timer className="h-10 w-10 text-green-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Reset Harian</h3>
              <p className="text-sm text-muted-foreground">Progress direset otomatis setiap hari</p>
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
            <Link to="/dhikr">Mulai Berdhikr</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default DhikrSection;