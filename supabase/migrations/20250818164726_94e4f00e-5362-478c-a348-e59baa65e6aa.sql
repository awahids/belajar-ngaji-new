-- Create hijaiyah letters table
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

-- Create dhikr (zikir) table
CREATE TABLE public.dhikr (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('morning', 'evening')),
  arabic_text TEXT NOT NULL,
  transliteration TEXT NOT NULL,
  translation_id TEXT NOT NULL,
  translation_en TEXT,
  recommended_count INTEGER DEFAULT 1,
  audio_url TEXT,
  source TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tajwid rules table (already exists but ensure it's properly structured)
-- ALTER TABLE public.tajwid_rules ADD COLUMN IF NOT EXISTS audio_url TEXT;

-- Create quiz categories table
CREATE TABLE public.quiz_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  name_en TEXT,
  description TEXT,
  description_en TEXT,
  icon_name TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create quiz questions table
CREATE TABLE public.quiz_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID NOT NULL REFERENCES public.quiz_categories(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  question_en TEXT,
  explanation TEXT,
  explanation_en TEXT,
  difficulty TEXT DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  order_index INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create quiz options table
CREATE TABLE public.quiz_options (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question_id UUID NOT NULL REFERENCES public.quiz_questions(id) ON DELETE CASCADE,
  option_text TEXT NOT NULL,
  option_text_en TEXT,
  is_correct BOOLEAN NOT NULL DEFAULT false,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.hijaiyah_letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dhikr ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_options ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (no login required)
CREATE POLICY "Public can view hijaiyah letters" 
ON public.hijaiyah_letters 
FOR SELECT 
USING (true);

CREATE POLICY "Public can view dhikr" 
ON public.dhikr 
FOR SELECT 
USING (true);

CREATE POLICY "Public can view quiz categories" 
ON public.quiz_categories 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Public can view quiz questions" 
ON public.quiz_questions 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Public can view quiz options" 
ON public.quiz_options 
FOR SELECT 
USING (true);

-- Create indexes for better performance
CREATE INDEX idx_hijaiyah_letters_order ON public.hijaiyah_letters(order_index);
CREATE INDEX idx_dhikr_type_order ON public.dhikr(type, order_index);
CREATE INDEX idx_quiz_questions_category ON public.quiz_questions(category_id);
CREATE INDEX idx_quiz_options_question ON public.quiz_options(question_id);

-- Insert seed data for hijaiyah letters
INSERT INTO public.hijaiyah_letters (letter, name_id, name_en, order_index) VALUES
('ا', 'Alif', 'Alif', 1),
('ب', 'Ba''', 'Ba', 2),
('ت', 'Ta''', 'Ta', 3),
('ث', 'Tsa', 'Tha', 4),
('ج', 'Jim', 'Jim', 5),
('ح', 'Ha''', 'Ha', 6),
('خ', 'Kho''', 'Kha', 7),
('د', 'Dal', 'Dal', 8),
('ذ', 'Dzal', 'Dhal', 9),
('ر', 'Ra''', 'Ra', 10),
('ز', 'Zai', 'Zay', 11),
('س', 'Sin', 'Sin', 12),
('ش', 'Syin', 'Shin', 13),
('ص', 'Shod', 'Sad', 14),
('ض', 'Dhod', 'Dad', 15),
('ط', 'Tho''', 'Ta', 16),
('ظ', 'Zho''', 'Za', 17),
('ع', 'Ain', 'Ain', 18),
('غ', 'Ghoin', 'Ghain', 19),
('ف', 'Fa''', 'Fa', 20),
('ق', 'Qof', 'Qaf', 21),
('ك', 'Kaf', 'Kaf', 22),
('ل', 'Lam', 'Lam', 23),
('م', 'Mim', 'Mim', 24),
('ن', 'Nun', 'Nun', 25),
('و', 'Wau', 'Waw', 26),
('ه', 'Ha''', 'Ha', 27),
('ي', 'Ya''', 'Ya', 28);

-- Insert seed data for dhikr (morning and evening)
INSERT INTO public.dhikr (type, arabic_text, transliteration, translation_id, recommended_count, order_index) VALUES
('morning', 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ', 'Ashbahnaa wa ashbahal mulku lillaahi, walhamdu lillaahi, laa ilaaha illallaahu wahdahu laa syariika lahu', 'Kami telah memasuki waktu pagi dan kerajaan hanya milik Allah. Segala puji bagi Allah. Tidak ada Tuhan selain Allah Yang Maha Esa, tidak ada sekutu bagi-Nya.', 1, 1),
('morning', 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ', 'Allaahumma anta rabbii laa ilaaha illa anta, khalaqtanii wa ana abduka', 'Ya Allah, Engkau adalah Tuhanku, tidak ada Tuhan selain Engkau. Engkau menciptakanku dan aku adalah hamba-Mu.', 1, 2),
('morning', 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ', 'A''uudzu billaahi minasy syaithaanir rajiim', 'Aku berlindung kepada Allah dari godaan setan yang terkutuk.', 3, 3),
('morning', 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ', 'Bismillaahil ladzii laa yadhurru ma''asmihi syai''un fil ardhi wa laa fis samaa''i wa huwas samii''ul ''aliim', 'Dengan nama Allah yang tidak ada sesuatu pun yang dapat membahayakan bersama nama-Nya, baik di bumi maupun di langit. Dia Maha Mendengar lagi Maha Mengetahui.', 3, 4),
('evening', 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ', 'Amsainaa wa amsal mulku lillaahi, walhamdu lillaahi, laa ilaaha illallaahu wahdahu laa syariika lahu', 'Kami telah memasuki waktu sore dan kerajaan hanya milik Allah. Segala puji bagi Allah. Tidak ada Tuhan selain Allah Yang Maha Esa, tidak ada sekutu bagi-Nya.', 1, 1),
('evening', 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ', 'Allaahumma bika amsainaa, wa bika ashbahnaa, wa bika nahyaa, wa bika namuutu, wa ilaikal mashiir', 'Ya Allah, dengan rahmat-Mu kami memasuki sore, dengan rahmat-Mu kami memasuki pagi, dengan rahmat-Mu kami hidup, dengan rahmat-Mu kami mati, dan kepada-Mu tempat kembali.', 1, 2),
('evening', 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ', 'A''uudzu billaahi minasy syaithaanir rajiim', 'Aku berlindung kepada Allah dari godaan setan yang terkutuk.', 3, 3),
('evening', 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ', 'Bismillaahil ladzii laa yadhurru ma''asmihi syai''un fil ardhi wa laa fis samaa''i wa huwas samii''ul ''aliim', 'Dengan nama Allah yang tidak ada sesuatu pun yang dapat membahayakan bersama nama-Nya, baik di bumi maupun di langit. Dia Maha Mendengar lagi Maha Mengetahui.', 3, 4);

-- Insert seed data for quiz categories
INSERT INTO public.quiz_categories (name, name_en, description, description_en, icon_name, order_index) VALUES
('Hijaiyah', 'Arabic Letters', 'Kuis tentang huruf-huruf hijaiyah dan pengucapannya', 'Quiz about Arabic letters and pronunciation', 'BookOpen', 1),
('Tajwid Dasar', 'Basic Tajweed', 'Kuis tentang aturan-aturan tajwid dasar dalam membaca Al-Qur''an', 'Quiz about basic tajweed rules in Quran recitation', 'Volume2', 2),
('Ibadah Harian', 'Daily Worship', 'Kuis tentang ibadah sehari-hari dalam Islam', 'Quiz about daily Islamic worship practices', 'Clock', 3),
('Pengetahuan Umum', 'General Knowledge', 'Kuis tentang pengetahuan umum agama Islam', 'Quiz about general Islamic knowledge', 'Brain', 4);

-- Insert sample quiz questions
INSERT INTO public.quiz_questions (category_id, question, explanation, difficulty, order_index) VALUES
-- Hijaiyah questions
((SELECT id FROM quiz_categories WHERE name = 'Hijaiyah'), 'Berapa jumlah huruf hijaiyah?', 'Huruf hijaiyah berjumlah 28 huruf, dimulai dari Alif hingga Ya.', 'easy', 1),
((SELECT id FROM quiz_categories WHERE name = 'Hijaiyah'), 'Huruf pertama dalam abjad hijaiyah adalah?', 'Alif adalah huruf pertama dalam urutan abjad hijaiyah.', 'easy', 2),
((SELECT id FROM quiz_categories WHERE name = 'Hijaiyah'), 'Huruf hijaiyah yang tidak dapat disambung dengan huruf setelahnya adalah?', 'Huruf Alif, Dal, Dzal, Ra, Zai, dan Wau tidak dapat disambung dengan huruf setelahnya.', 'medium', 3),

-- Tajwid questions
((SELECT id FROM quiz_categories WHERE name = 'Tajwid Dasar'), 'Hukum nun sukun atau tanwin bertemu dengan huruf ba adalah?', 'Nun sukun atau tanwin bertemu huruf ba hukumnya iqlab, yaitu dibaca menjadi mim dengan dengung.', 'medium', 1),
((SELECT id FROM quiz_categories WHERE name = 'Tajwid Dasar'), 'Berapa panjang bacaan mad thabi''i?', 'Mad thabi''i dibaca sepanjang 2 harakat atau 1 alif.', 'easy', 2),

-- Ibadah questions
((SELECT id FROM quiz_categories WHERE name = 'Ibadah Harian'), 'Berapa kali umat Islam diwajibkan shalat dalam sehari?', 'Umat Islam diwajibkan shalat 5 kali sehari: Subuh, Dzuhur, Ashar, Maghrib, dan Isya.', 'easy', 1),
((SELECT id FROM quiz_categories WHERE name = 'Ibadah Harian'), 'Kapan waktu mustajab untuk berdoa pada hari Jumat?', 'Waktu mustajab berdoa pada hari Jumat adalah antara Ashar hingga Maghrib.', 'medium', 2),

-- General knowledge questions
((SELECT id FROM quiz_categories WHERE name = 'Pengetahuan Umum'), 'Siapa nabi terakhir yang diutus Allah SWT?', 'Nabi Muhammad SAW adalah nabi dan rasul terakhir yang diutus Allah SWT.', 'easy', 1),
((SELECT id FROM quiz_categories WHERE name = 'Pengetahuan Umum'), 'Berapa jumlah surah dalam Al-Qur''an?', 'Al-Qur''an terdiri dari 114 surah, dimulai dari Al-Fatihah hingga An-Nas.', 'easy', 2);

-- Insert quiz options for each question
-- Hijaiyah question 1 options
INSERT INTO public.quiz_options (question_id, option_text, is_correct, order_index) VALUES
((SELECT id FROM quiz_questions WHERE question LIKE 'Berapa jumlah huruf hijaiyah%'), '26', false, 1),
((SELECT id FROM quiz_questions WHERE question LIKE 'Berapa jumlah huruf hijaiyah%'), '27', false, 2),
((SELECT id FROM quiz_questions WHERE question LIKE 'Berapa jumlah huruf hijaiyah%'), '28', true, 3),
((SELECT id FROM quiz_questions WHERE question LIKE 'Berapa jumlah huruf hijaiyah%'), '29', false, 4);

-- Hijaiyah question 2 options
INSERT INTO public.quiz_options (question_id, option_text, is_correct, order_index) VALUES
((SELECT id FROM quiz_questions WHERE question LIKE 'Huruf pertama dalam abjad hijaiyah%'), 'Alif', true, 1),
((SELECT id FROM quiz_questions WHERE question LIKE 'Huruf pertama dalam abjad hijaiyah%'), 'Ba', false, 2),
((SELECT id FROM quiz_questions WHERE question LIKE 'Huruf pertama dalam abjad hijaiyah%'), 'Ta', false, 3),
((SELECT id FROM quiz_questions WHERE question LIKE 'Huruf pertama dalam abjad hijaiyah%'), 'Tsa', false, 4);

-- Continue with other question options...
-- Tajwid question 1 options
INSERT INTO public.quiz_options (question_id, option_text, is_correct, order_index) VALUES
((SELECT id FROM quiz_questions WHERE question LIKE '%nun sukun atau tanwin bertemu dengan huruf ba%'), 'Ikhfa', false, 1),
((SELECT id FROM quiz_questions WHERE question LIKE '%nun sukun atau tanwin bertemu dengan huruf ba%'), 'Iqlab', true, 2),
((SELECT id FROM quiz_questions WHERE question LIKE '%nun sukun atau tanwin bertemu dengan huruf ba%'), 'Idgham', false, 3),
((SELECT id FROM quiz_questions WHERE question LIKE '%nun sukun atau tanwin bertemu dengan huruf ba%'), 'Izhar', false, 4);

-- Update metrics table
UPDATE public.metrics SET value = 28 WHERE key = 'letters';
INSERT INTO public.metrics (key, value) VALUES ('dhikr_entries', 8) ON CONFLICT (key) DO UPDATE SET value = 8;
INSERT INTO public.metrics (key, value) VALUES ('quiz_questions', 8) ON CONFLICT (key) DO UPDATE SET value = 8;

-- Create trigger for updated_at columns
CREATE TRIGGER update_hijaiyah_letters_updated_at
  BEFORE UPDATE ON public.hijaiyah_letters
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_dhikr_updated_at
  BEFORE UPDATE ON public.dhikr
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_quiz_categories_updated_at
  BEFORE UPDATE ON public.quiz_categories
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_quiz_questions_updated_at
  BEFORE UPDATE ON public.quiz_questions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();