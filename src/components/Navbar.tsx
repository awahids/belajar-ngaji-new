
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md border-b border-border' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-foreground">
            Belajar Ngaji
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('modules')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Modul
            </button>
            <button 
              onClick={() => scrollToSection('values')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Nilai Kami
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Fitur
            </button>
            <button 
              onClick={() => scrollToSection('articles')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Artikel
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Kontak
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
