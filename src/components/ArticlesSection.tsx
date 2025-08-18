
'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
}

interface ArticlesSectionProps {
  articles: Article[];
}

const ArticlesSection = ({ articles }: ArticlesSectionProps) => {
  return (
    <section id="articles" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Artikel & Tips
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Kumpulan artikel edukatif dan tips praktis untuk meningkatkan kualitas pembelajaran Al-Qur'an
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full cursor-pointer hover:shadow-xl transition-all duration-300 group">
                <CardHeader>
                  <CardTitle className="text-lg leading-tight group-hover:text-emerald-600 transition-colors">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {article.excerpt}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
