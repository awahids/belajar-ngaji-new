
'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-background to-muted/50">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Badge variant="secondary" className="mb-6 text-sm px-4 py-2">
            Gratis untuk Pemula
          </Badge>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Belajar Al-Qur'an
          <br />
          <span className="text-emerald-600">dari Dasar</span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Belajar Huruf Hijaiyah, Tajwid, dan Baca Al-Qur'an dari dasar—dengan audio & latihan menulis.
          Platform pembelajaran interaktif yang mudah diakses untuk semua usia.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Button 
            size="lg" 
            onClick={scrollToContact}
            className="text-lg px-8 py-4 h-auto bg-emerald-600 hover:bg-emerald-700"
          >
            Mulai Belajar
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
