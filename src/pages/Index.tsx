
import { useEffect, useState } from 'react';
import { getModules, getValuePillars, getFeatures, getArticles } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ModulesSection from '@/components/ModulesSection';
import ValuesSection from '@/components/ValuesSection';
import FeaturesSection from '@/components/FeaturesSection';
import ArticlesSection from '@/components/ArticlesSection';
import ContactSection from '@/components/ContactSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  const [modules, setModules] = useState([]);
  const [valuePillars, setValuePillars] = useState([]);
  const [features, setFeatures] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [modulesData, valuePillarsData, featuresData, articlesData] = await Promise.all([
          getModules(),
          getValuePillars(),
          getFeatures(),
          getArticles()
        ]);
        
        setModules(modulesData);
        setValuePillars(valuePillarsData);
        setFeatures(featuresData);
        setArticles(articlesData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ModulesSection modules={modules} />
      <ValuesSection valuePillars={valuePillars} />
      <FeaturesSection features={features} />
      <TestimonialsSection />
      <ArticlesSection articles={articles} />
      <FAQSection />
      <CTASection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
