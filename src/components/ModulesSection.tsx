
'use client';

import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { useEffect, useState } from 'react';

interface Module {
  id: string;
  title: string;
  description: string;
  icon_name: string;
}

interface ModulesSectionProps {
  modules: Module[];
}

const ModulesSection = ({ modules }: ModulesSectionProps) => {
  const [metrics, setMetrics] = useState({ sessionsCount: 0, learnersCount: 0 });

  useEffect(() => {
    // Import the getMetrics function and call it
    import('@/lib/api').then(({ getMetrics }) => {
      getMetrics()
        .then(data => setMetrics(data))
        .catch(error => {
          console.error('Error fetching metrics:', error);
          // Fallback data
          setMetrics({ sessionsCount: 50000, learnersCount: 12000 });
        });
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="modules" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Modul Kami
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Pembelajaran terstruktur dari dasar hingga mahir dengan pendekatan yang mudah dipahami
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {modules.map((module) => {
            const IconComponent = Icons[module.icon_name as keyof typeof Icons] as any;
            
            return (
              <motion.div
                key={module.id}
                variants={itemVariants}
                className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer group"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                  {IconComponent && <IconComponent className="w-8 h-8 text-emerald-600" />}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{module.title}</h3>
                <p className="text-sm text-muted-foreground">{module.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="flex justify-center items-center space-x-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div>
            <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">
              {metrics.sessionsCount.toLocaleString()}+
            </div>
            <div className="text-muted-foreground">Sesi Latihan</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">
              {metrics.learnersCount.toLocaleString()}+
            </div>
            <div className="text-muted-foreground">Pelajar</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ModulesSection;
