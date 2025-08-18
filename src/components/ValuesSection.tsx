
'use client';

import { motion } from 'framer-motion';

interface ValuePillar {
  id: string;
  number: string;
  title: string;
  description: string;
}

interface ValuesSectionProps {
  valuePillars: ValuePillar[];
}

const ValuesSection = ({ valuePillars }: ValuesSectionProps) => {
  return (
    <section id="values" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Nilai Kami
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Prinsip-prinsip yang menjadi fondasi dalam setiap aspek pembelajaran
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {valuePillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.06 }}
            >
              <div className="text-8xl md:text-9xl font-bold text-emerald-600/20 mb-4">
                {pillar.number}
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {pillar.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
