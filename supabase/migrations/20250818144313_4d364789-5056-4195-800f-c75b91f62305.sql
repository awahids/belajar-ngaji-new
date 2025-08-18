
-- Create tables for Belajar Ngaji platform

-- Metrics table for counters
CREATE TABLE public.metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Modules table
CREATE TABLE public.modules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  title_en TEXT,
  description TEXT NOT NULL,
  description_en TEXT,
  icon_name TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Value pillars table
CREATE TABLE public.value_pillars (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  number TEXT NOT NULL, -- "01", "02", "03"
  title TEXT NOT NULL,
  title_en TEXT,
  description TEXT NOT NULL,
  description_en TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Features table
CREATE TABLE public.features (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  title_en TEXT,
  description TEXT NOT NULL,
  description_en TEXT,
  icon_name TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Articles table
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  title_en TEXT,
  excerpt TEXT NOT NULL,
  excerpt_en TEXT,
  image_url TEXT,
  slug TEXT UNIQUE NOT NULL,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Hijaiyah letters table
CREATE TABLE public.hijaiyah_letters (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  letter TEXT NOT NULL,
  name_id TEXT NOT NULL,
  name_en TEXT,
  order_index INTEGER NOT NULL,
  audio_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tajwid rules table
CREATE TABLE public.tajwid_rules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  name_en TEXT,
  description TEXT NOT NULL,
  description_en TEXT,
  example_arabic TEXT,
  example_transliteration TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Contact messages table
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Newsletter subscribers table
CREATE TABLE public.subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.value_pillars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hijaiyah_letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tajwid_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Create public read policies for content tables
CREATE POLICY "Public can view metrics" ON public.metrics FOR SELECT USING (true);
CREATE POLICY "Public can view modules" ON public.modules FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view value pillars" ON public.value_pillars FOR SELECT USING (true);
CREATE POLICY "Public can view features" ON public.features FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view published articles" ON public.articles FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view hijaiyah letters" ON public.hijaiyah_letters FOR SELECT USING (true);
CREATE POLICY "Public can view tajwid rules" ON public.tajwid_rules FOR SELECT USING (true);

-- Contact form policies
CREATE POLICY "Anyone can submit contact messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can subscribe to newsletter" ON public.subscribers FOR INSERT WITH CHECK (true);

-- Insert seed data
INSERT INTO public.metrics (key, value) VALUES 
  ('sessions', 50000),
  ('learners', 12000);

INSERT INTO public.modules (title, title_en, description, description_en, icon_name, order_index) VALUES
  ('Huruf Hijaiyah', 'Arabic Letters', 'Pelajari 28 huruf dasar Al-Qur''an dengan audio dan panduan pengucapan', 'Learn 28 basic Quranic letters with audio and pronunciation guide', 'type', 1),
  ('Latihan Menulis', 'Writing Practice', 'Berlatih menulis huruf Arab dengan panduan garis dan bentuk yang benar', 'Practice writing Arabic letters with proper stroke and form guidance', 'pen-tool', 2),
  ('Tajwid Dasar', 'Basic Tajweed', 'Kuasai aturan bacaan Al-Qur''an untuk meningkatkan kualitas tilawah', 'Master Quranic recitation rules to improve your tilawah quality', 'book-open', 3),
  ('Murottal Per Ayat', 'Verse by Verse', 'Dengarkan dan ikuti bacaan Al-Qur''an ayat demi ayat', 'Listen and follow Quranic recitation verse by verse', 'headphones', 4);

INSERT INTO public.value_pillars (number, title, title_en, description, description_en, order_index) VALUES
  ('01', 'Terstruktur', 'Structured', 'Pembelajaran sistematis dari dasar hingga mahir dengan kurikulum yang teruji', 'Systematic learning from basics to advanced with proven curriculum', 1),
  ('02', 'Interaktif', 'Interactive', 'Fitur audio, latihan menulis, dan kuis untuk pengalaman belajar yang menyenangkan', 'Audio features, writing practice, and quizzes for engaging learning experience', 2),
  ('03', 'Mudah Diakses', 'Accessible', 'Belajar kapan saja, dimana saja dengan antarmuka yang ramah untuk semua usia', 'Learn anytime, anywhere with user-friendly interface for all ages', 3);

INSERT INTO public.features (title, title_en, description, description_en, icon_name, order_index) VALUES
  ('Audio Tajwid', 'Tajweed Audio', 'Dengarkan pengucapan yang benar dari qari berpengalaman', 'Listen to correct pronunciation from experienced reciters', 'volume-2', 1),
  ('Latihan Tulis', 'Writing Practice', 'Canvas interaktif untuk berlatih menulis huruf Arab dengan feedback real-time', 'Interactive canvas for Arabic letter writing practice with real-time feedback', 'edit-3', 2),
  ('Progress & Kuis', 'Progress & Quiz', 'Pantau kemajuan belajar dan uji pemahaman dengan kuis interaktif', 'Track learning progress and test understanding with interactive quizzes', 'trending-up', 3),
  ('Mode Anak', 'Kids Mode', 'Antarmuka khusus anak dengan gamifikasi dan reward system', 'Special kids interface with gamification and reward system', 'heart', 4);

INSERT INTO public.articles (title, title_en, excerpt, excerpt_en, slug) VALUES
  ('Pentingnya Belajar Tajwid dalam Membaca Al-Qur''an', 'The Importance of Learning Tajweed in Quranic Recitation', 'Pelajari mengapa tajwid sangat penting dalam membaca Al-Qur''an dan bagaimana memulainya', 'Learn why tajweed is crucial in Quranic recitation and how to get started', 'pentingnya-belajar-tajwid'),
  ('Tips Mengajarkan Huruf Hijaiyah pada Anak', 'Tips for Teaching Arabic Letters to Children', 'Metode efektif dan menyenangkan untuk mengajarkan huruf Arab kepada anak-anak', 'Effective and fun methods for teaching Arabic letters to children', 'tips-mengajar-hijaiyah-anak'),
  ('Sejarah dan Keunikan Mushaf Al-Qur''an', 'History and Uniqueness of Quranic Manuscript', 'Mengenal sejarah penulisan dan keunikan mushaf Al-Qur''an dari masa ke masa', 'Understanding the history and uniqueness of Quranic manuscripts through the ages', 'sejarah-mushaf-quran'),
  ('Adab dan Etika Membaca Al-Qur''an', 'Etiquette and Ethics of Reading the Quran', 'Panduan lengkap tentang adab yang harus diperhatikan saat membaca Al-Qur''an', 'Complete guide on etiquette to observe when reading the Quran', 'adab-membaca-quran'),
  ('Manfaat Menghafal Al-Qur''an untuk Kesehatan Mental', 'Benefits of Memorizing Quran for Mental Health', 'Penelitian ilmiah tentang dampak positif menghafal Al-Qur''an bagi kesehatan mental', 'Scientific research on positive impacts of Quran memorization on mental health', 'manfaat-menghafal-quran'),
  ('Teknologi dalam Pembelajaran Al-Qur''an Modern', 'Technology in Modern Quranic Learning', 'Bagaimana teknologi membantu mempermudah pembelajaran Al-Qur''an di era digital', 'How technology helps facilitate Quranic learning in the digital age', 'teknologi-pembelajaran-quran');

INSERT INTO public.hijaiyah_letters (letter, name_id, name_en, order_index, audio_url) VALUES
  ('ا', 'Alif', 'Alif', 1, '/audio/hijaiyah/alif.mp3'),
  ('ب', 'Ba', 'Ba', 2, '/audio/hijaiyah/ba.mp3'),
  ('ت', 'Ta', 'Ta', 3, '/audio/hijaiyah/ta.mp3'),
  ('ث', 'Tsa', 'Tsa', 4, '/audio/hijaiyah/tsa.mp3'),
  ('ج', 'Jim', 'Jim', 5, '/audio/hijaiyah/jim.mp3'),
  ('ح', 'Ha', 'Ha', 6, '/audio/hijaiyah/ha.mp3'),
  ('خ', 'Kha', 'Kha', 7, '/audio/hijaiyah/kha.mp3'),
  ('د', 'Dal', 'Dal', 8, '/audio/hijaiyah/dal.mp3'),
  ('ذ', 'Dzal', 'Dzal', 9, '/audio/hijaiyah/dzal.mp3'),
  ('ر', 'Ra', 'Ra', 10, '/audio/hijaiyah/ra.mp3'),
  ('ز', 'Zai', 'Zai', 11, '/audio/hijaiyah/zai.mp3'),
  ('س', 'Sin', 'Sin', 12, '/audio/hijaiyah/sin.mp3'),
  ('ش', 'Syin', 'Syin', 13, '/audio/hijaiyah/syin.mp3'),
  ('ص', 'Shad', 'Shad', 14, '/audio/hijaiyah/shad.mp3'),
  ('ض', 'Dhad', 'Dhad', 15, '/audio/hijaiyah/dhad.mp3'),
  ('ط', 'Tha', 'Tha', 16, '/audio/hijaiyah/tha.mp3'),
  ('ظ', 'Zha', 'Zha', 17, '/audio/hijaiyah/zha.mp3'),
  ('ع', 'Ain', 'Ain', 18, '/audio/hijaiyah/ain.mp3'),
  ('غ', 'Ghain', 'Ghain', 19, '/audio/hijaiyah/ghain.mp3'),
  ('ف', 'Fa', 'Fa', 20, '/audio/hijaiyah/fa.mp3'),
  ('ق', 'Qaf', 'Qaf', 21, '/audio/hijaiyah/qaf.mp3'),
  ('ك', 'Kaf', 'Kaf', 22, '/audio/hijaiyah/kaf.mp3'),
  ('ل', 'Lam', 'Lam', 23, '/audio/hijaiyah/lam.mp3'),
  ('م', 'Mim', 'Mim', 24, '/audio/hijaiyah/mim.mp3'),
  ('ن', 'Nun', 'Nun', 25, '/audio/hijaiyah/nun.mp3'),
  ('و', 'Wau', 'Wau', 26, '/audio/hijaiyah/wau.mp3'),
  ('ه', 'Ha', 'Ha', 27, '/audio/hijaiyah/ha2.mp3'),
  ('ي', 'Ya', 'Ya', 28, '/audio/hijaiyah/ya.mp3');

INSERT INTO public.tajwid_rules (name, name_en, description, description_en, example_arabic, example_transliteration, order_index) VALUES
  ('Ikhfa', 'Ikhfa', 'Menyembunyikan bunyi nun mati atau tanwin ketika bertemu dengan huruf ikhfa', 'Concealing the sound of nun sukun or tanwin when meeting ikhfa letters', 'مِن شَيْءٍ', 'min syai-in', 1),
  ('Idgham', 'Idgham', 'Memasukkan bunyi nun mati atau tanwin ke dalam huruf sesudahnya', 'Merging the sound of nun sukun or tanwin into the following letter', 'مِن رَّبِّهِمْ', 'mir rabbihim', 2),
  ('Iqlab', 'Iqlab', 'Mengubah bunyi nun mati atau tanwin menjadi mim ketika bertemu ba', 'Changing nun sukun or tanwin sound into mim when meeting ba', 'مِن بَعْدِ', 'mim ba''di', 3),
  ('Idzhar', 'Idzhar', 'Menjelaskan bunyi nun mati atau tanwin ketika bertemu huruf halaq', 'Clarifying the sound of nun sukun or tanwin when meeting throat letters', 'مِنْ عِلْمٍ', 'min ''ilmin', 4),
  ('Qalqalah', 'Qalqalah', 'Memantulkan suara pada huruf qalqalah ketika sukun', 'Bouncing sound on qalqalah letters when sukun', 'الْحَقُّ', 'al-haqqu', 5),
  ('Mad Tabi''i', 'Natural Mad', 'Panjang alami pada huruf mad tanpa sebab tambahan', 'Natural length on mad letters without additional cause', 'قَالَ', 'qaala', 6),
  ('Mad Wajib Muttashil', 'Connected Obligatory Mad', 'Panjang wajib ketika huruf mad bertemu hamzah dalam satu kata', 'Obligatory length when mad letter meets hamzah in one word', 'جَاءَ', 'jaa''a', 7);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_metrics_updated_at BEFORE UPDATE ON public.metrics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_modules_updated_at BEFORE UPDATE ON public.modules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_value_pillars_updated_at BEFORE UPDATE ON public.value_pillars FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_features_updated_at BEFORE UPDATE ON public.features FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON public.articles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hijaiyah_letters_updated_at BEFORE UPDATE ON public.hijaiyah_letters FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tajwid_rules_updated_at BEFORE UPDATE ON public.tajwid_rules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
