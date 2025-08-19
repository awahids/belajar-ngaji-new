
'use client';

import { motion } from 'framer-motion';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-muted/50 border-t border-border py-12">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-foreground mb-4">Belajar Ngaji</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Platform pembelajaran Al-Qur'an yang interaktif dan mudah diakses untuk semua usia. 
              Belajar dari dasar dengan pendekatan yang terstruktur dan menyenangkan.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Navigasi</h4>
            <div className="space-y-2">
              <button 
                onClick={() => scrollToSection('modules')}
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Modul
              </button>
              <button 
                onClick={() => scrollToSection('values')}
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Nilai Kami
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Fitur
              </button>
              <button 
                onClick={() => scrollToSection('articles')}
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Artikel
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Kontak</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>Email: info@belajarngaji.com</p>
              <p>WhatsApp: +62 812-3456-7890</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          className="pt-8 border-t border-border text-center text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p>&copy; 2024 Belajar Ngaji. Semua hak cipta dilindungi.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
