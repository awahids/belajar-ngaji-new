'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Smartphone, Globe, Users } from 'lucide-react';

const scrollToContact = () => {
  const element = document.getElementById('contact');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-card relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-primary rounded-full opacity-5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-accent rounded-full opacity-5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Mulai Perjalanan{" "}
              <span className="text-gradient-primary">Spiritual</span> Anda
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
              Bergabunglah dengan ribuan siswa yang telah merasakan kemudahan belajar Al-Qur'an 
              dengan metode modern dan bimbingan ahli.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button 
              onClick={scrollToContact}
              size="lg"
              className="bg-gradient-primary hover:shadow-glow text-white px-10 py-6 text-lg font-semibold rounded-xl hover-lift group"
            >
              Daftar Sekarang - Gratis
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="glass border-border hover:bg-card/50 px-10 py-6 text-lg font-semibold rounded-xl hover-lift"
            >
              Hubungi Tim Kami
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="glass rounded-2xl p-6 hover-lift">
              <div className="flex items-center justify-center mb-4">
                <Smartphone className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Mobile Friendly</h3>
              <p className="text-muted-foreground">
                Belajar kapan saja, di mana saja melalui smartphone atau tablet Anda.
              </p>
            </div>
            <div className="glass rounded-2xl p-6 hover-lift">
              <div className="flex items-center justify-center mb-4">
                <Globe className="h-10 w-10 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Akses Global</h3>
              <p className="text-muted-foreground">
                Platform dapat diakses dari seluruh dunia dengan koneksi internet.
              </p>
            </div>
            <div className="glass rounded-2xl p-6 hover-lift">
              <div className="flex items-center justify-center mb-4">
                <Users className="h-10 w-10 text-primary-glow" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Komunitas Aktif</h3>
              <p className="text-muted-foreground">
                Bergabung dengan komunitas pembelajar Al-Qur'an yang saling mendukung.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;