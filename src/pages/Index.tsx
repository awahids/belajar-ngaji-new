
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ModulesSection from '@/components/ModulesSection';
import ValuesSection from '@/components/ValuesSection';
import FeaturesSection from '@/components/FeaturesSection';
import ArticlesSection from '@/components/ArticlesSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

interface HomeProps {
  modules: any[];
  valuePillars: any[];
  features: any[];
  articles: any[];
}

// This would be a server-side data fetch in a real Next.js app
const Index = () => {
  // For now, we'll use dummy data since we're in a React SPA context
  const modules = [
    {
      id: '1',
      title: 'Huruf Hijaiyah',
      description: 'Pelajari 28 huruf dasar Al-Qur\'an dengan audio dan panduan pengucapan',
      icon_name: 'Type'
    },
    {
      id: '2',
      title: 'Latihan Menulis',
      description: 'Berlatih menulis huruf Arab dengan panduan garis dan bentuk yang benar',
      icon_name: 'PenTool'
    },
    {
      id: '3',
      title: 'Tajwid Dasar',
      description: 'Kuasai aturan bacaan Al-Qur\'an untuk meningkatkan kualitas tilawah',
      icon_name: 'BookOpen'
    },
    {
      id: '4',
      title: 'Murottal Per Ayat',
      description: 'Dengarkan dan ikuti bacaan Al-Qur\'an ayat demi ayat',
      icon_name: 'Headphones'
    }
  ];

  const valuePillars = [
    {
      id: '1',
      number: '01',
      title: 'Terstruktur',
      description: 'Pembelajaran sistematis dari dasar hingga mahir dengan kurikulum yang teruji'
    },
    {
      id: '2',
      number: '02',
      title: 'Interaktif',
      description: 'Fitur audio, latihan menulis, dan kuis untuk pengalaman belajar yang menyenangkan'
    },
    {
      id: '3',
      number: '03',
      title: 'Mudah Diakses',
      description: 'Belajar kapan saja, dimana saja dengan antarmuka yang ramah untuk semua usia'
    }
  ];

  const features = [
    {
      id: '1',
      title: 'Audio Tajwid',
      description: 'Dengarkan pengucapan yang benar dari qari berpengalaman',
      icon_name: 'Volume2'
    },
    {
      id: '2',
      title: 'Latihan Tulis',
      description: 'Canvas interaktif untuk berlatih menulis huruf Arab dengan feedback real-time',
      icon_name: 'Edit3'
    },
    {
      id: '3',
      title: 'Progress & Kuis',
      description: 'Pantau kemajuan belajar dan uji pemahaman dengan kuis interaktif',
      icon_name: 'TrendingUp'
    },
    {
      id: '4',
      title: 'Mode Anak',
      description: 'Antarmuka khusus anak dengan gamifikasi dan reward system',
      icon_name: 'Heart'
    }
  ];

  const articles = [
    {
      id: '1',
      title: 'Pentingnya Belajar Tajwid dalam Membaca Al-Qur\'an',
      excerpt: 'Pelajari mengapa tajwid sangat penting dalam membaca Al-Qur\'an dan bagaimana memulainya',
      slug: 'pentingnya-belajar-tajwid'
    },
    {
      id: '2',
      title: 'Tips Mengajarkan Huruf Hijaiyah pada Anak',
      excerpt: 'Metode efektif dan menyenangkan untuk mengajarkan huruf Arab kepada anak-anak',
      slug: 'tips-mengajar-hijaiyah-anak'
    },
    {
      id: '3',
      title: 'Sejarah dan Keunikan Mushaf Al-Qur\'an',
      excerpt: 'Mengenal sejarah penulisan dan keunikan mushaf Al-Qur\'an dari masa ke masa',
      slug: 'sejarah-mushaf-quran'
    },
    {
      id: '4',
      title: 'Adab dan Etika Membaca Al-Qur\'an',
      excerpt: 'Panduan lengkap tentang adab yang harus diperhatikan saat membaca Al-Qur\'an',
      slug: 'adab-membaca-quran'
    },
    {
      id: '5',
      title: 'Manfaat Menghafal Al-Qur\'an untuk Kesehatan Mental',
      excerpt: 'Penelitian ilmiah tentang dampak positif menghafal Al-Qur\'an bagi kesehatan mental',
      slug: 'manfaat-menghafal-quran'
    },
    {
      id: '6',
      title: 'Teknologi dalam Pembelajaran Al-Qur\'an Modern',
      excerpt: 'Bagaimana teknologi membantu mempermudah pembelajaran Al-Qur\'an di era digital',
      slug: 'teknologi-pembelajaran-quran'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ModulesSection modules={modules} />
      <ValuesSection valuePillars={valuePillars} />
      <FeaturesSection features={features} />
      <ArticlesSection articles={articles} />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
