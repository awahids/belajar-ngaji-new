'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Ahmad Zulfikar",
    role: "Mahasiswa",
    content: "Platform ini sangat membantu saya memahami tajwid dengan lebih baik. Metode pembelajaran yang interaktif membuat belajar Al-Qur'an menjadi menyenangkan.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    role: "Guru TPA",
    content: "Sebagai guru TPA, saya merekomendasikan platform ini untuk semua santri. Materinya sangat lengkap dan mudah dipahami.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b1e38133?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Muhammad Iqbal",
    role: "Pelajar SMA",
    content: "Alhamdulillah, setelah 3 bulan belajar di sini, bacaan Al-Qur'an saya menjadi lebih baik dan lancar.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 4,
    name: "Fatimah Azzahra",
    role: "Ibu Rumah Tangga",
    content: "Sebagai seorang ibu, saya sangat terbantu dengan platform ini. Saya bisa belajar sambil mengajar anak-anak di rumah.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 5,
    name: "Abdullah Malik",
    role: "Ustadz",
    content: "Platform yang sangat recommended untuk semua kalangan. Materi yang disajikan sangat berkualitas dan sesuai dengan kaidah yang benar.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 6,
    name: "Maryam Salsabila",
    role: "Mahasiswi",
    content: "Interface yang user-friendly dan materi yang mudah dipahami. Sangat cocok untuk pemula seperti saya.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-gradient-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Apa Kata{" "}
            <span className="text-gradient-primary">Mereka</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ribuan siswa telah merasakan manfaatnya. Bergabunglah dengan komunitas pembelajar Al-Qur'an terbesar di Indonesia.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="glass h-full hover-lift border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Quote className="h-8 w-8 text-primary/60 mb-4" />
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;