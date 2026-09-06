"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Aisha R.",
    text: "Beautiful, detailed work and such a lovely experience. Raihana made my bridal mehendi session so relaxing and the stain was incredibly dark!",
    type: "Bridal Mehendi"
  },
  {
    id: 2,
    name: "Priyanka S.",
    text: "I wanted a mix of traditional and modern motifs for my engagement, and she delivered exactly what I envisioned. Highly recommend her artistry.",
    type: "Engagement Mehendi"
  },
  {
    id: 3,
    name: "Fatima K.",
    text: "The attention to detail is unmatched. She incorporated elements of our love story into the design seamlessly. Truly a master at her craft.",
    type: "Bridal Mehendi"
  }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-8"
          >
            <div className="flex gap-1 text-highlight">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-current" />
              ))}
            </div>
          </motion.div>
          
          <div className="relative h-[250px] sm:h-[200px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-primary leading-relaxed italic mb-8">
                  "{testimonials[currentIndex].text}"
                </p>
                <div className="flex flex-col items-center">
                  <span className="text-sm font-medium text-primary uppercase tracking-widest">
                    — {testimonials[currentIndex].name}
                  </span>
                  <span className="text-xs text-primary/60 mt-1 uppercase tracking-widest">
                    {testimonials[currentIndex].type}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-4 mt-12">
            <button
              onClick={prev}
              className="p-3 border border-primary/20 rounded-full text-primary hover:bg-primary hover:text-white transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="p-3 border border-primary/20 rounded-full text-primary hover:bg-primary hover:text-white transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
