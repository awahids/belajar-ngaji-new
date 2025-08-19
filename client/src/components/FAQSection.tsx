'use client';

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: "Apakah platform ini benar-benar gratis?",
    answer: "Ya, kami menyediakan akses gratis untuk modul dasar pembelajaran Al-Qur'an. Untuk fitur premium dan bimbingan personal, tersedia paket berbayar dengan harga terjangkau."
  },
  {
    question: "Siapa saja yang bisa menggunakan platform ini?",
    answer: "Platform ini dirancang untuk semua kalangan, mulai dari anak-anak, remaja, dewasa, hingga lansia. Baik yang sudah bisa baca Al-Qur'an maupun yang masih pemula."
  },
  {
    question: "Apakah ada sertifikat setelah menyelesaikan kursus?",
    answer: "Ya, setiap siswa yang menyelesaikan modul pembelajaran akan mendapatkan sertifikat digital yang dapat diunduh dan dibagikan."
  },
  {
    question: "Bagaimana metode pembelajaran yang digunakan?",
    answer: "Kami menggunakan metode pembelajaran interaktif dengan kombinasi video, audio, latihan praktik, dan ujian. Setiap materi disesuaikan dengan tingkat kemampuan siswa."
  },
  {
    question: "Apakah bisa belajar secara offline?",
    answer: "Saat ini platform masih berbasis online. Namun, beberapa materi dapat diunduh untuk dipelajari secara offline setelah berlangganan paket premium."
  },
  {
    question: "Berapa lama waktu yang dibutuhkan untuk menguasai Al-Qur'an?",
    answer: "Waktu pembelajaran bervariasi tergantung kemampuan awal dan konsistensi belajar. Rata-rata siswa dapat menguasai dasar dalam 3-6 bulan dengan belajar 30 menit per hari."
  },
  {
    question: "Apakah ada bimbingan langsung dari ustadz?",
    answer: "Ya, untuk paket premium kami menyediakan sesi konsultasi langsung dengan ustadz berpengalaman melalui video call atau chat."
  },
  {
    question: "Bagaimana cara memulai pembelajaran?",
    answer: "Sangat mudah! Cukup daftar akun gratis, ikuti tes penempatan singkat, dan sistem akan merekomendasikan modul yang sesuai dengan level Anda."
  }
];

const FAQSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient-primary">Pertanyaan</span> Umum
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Temukan jawaban atas pertanyaan yang sering diajukan tentang platform pembelajaran Al-Qur'an kami.
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="glass rounded-xl border-border/50 px-6"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pt-2 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;