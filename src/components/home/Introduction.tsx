"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Introduction() {
  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative botanical element */}
      <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none opacity-[0.03]">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-primary">
          <path d="M50 0 Q60 40 100 50 Q60 60 50 100 Q40 60 0 50 Q40 40 50 0 Z" />
        </svg>
      </div>

      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:col-span-5 relative"
          >
            <div className="aspect-[3/4] relative w-full max-w-sm mx-auto overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1596489311494-df72049e6022?q=80&w=800&auto=format&fit=crop"
                alt="Mehendi artist at work"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 border border-primary/10 m-4" />
            </div>
          </motion.div>

          <div className="md:col-span-7 flex flex-col items-start lg:pl-12">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs uppercase tracking-[0.2em] text-accent mb-6"
            >
              The Art of Mehendi
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary leading-tight mb-8 text-balance"
            >
              More than a design.<br />
              <span className="italic">A memory you get to wear.</span>
            </motion.h2>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 text-foreground/80 font-light leading-relaxed max-w-xl"
            >
              <p>
                Every mehendi design is created with attention to symmetry, detail, personalization, and the significance of the occasion. We believe that the art on your hands should be as unique as the story you share.
              </p>
              <p>
                From intricate bridal masterpieces to minimalist contemporary patterns, Raihana Mehendi Artistry blends traditional Indian heritage with modern elegance to create timeless body art.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12"
            >
              <Image 
                src="/signature-placeholder.svg" 
                alt="Raihana" 
                width={120} 
                height={60} 
                className="opacity-80"
                style={{ filter: "invert(17%) sepia(21%) saturate(1005%) hue-rotate(94deg) brightness(94%) contrast(85%)" }} // Approximate filter for primary color
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
