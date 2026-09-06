"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const portfolioItems = [
  {
    id: 1,
    title: "Bridal Masterpiece",
    category: "Bridal",
    image: "https://images.unsplash.com/photo-1588662998394-28bba335b0d0?q=80&w=800&auto=format&fit=crop",
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: 2,
    title: "Minimalist Elegance",
    category: "Minimal",
    image: "https://images.unsplash.com/photo-1596489311494-df72049e6022?q=80&w=800&auto=format&fit=crop",
    aspectRatio: "aspect-square",
  },
  {
    id: 3,
    title: "Traditional Motifs",
    category: "Traditional",
    image: "https://images.unsplash.com/photo-1621008670183-bba88686a34c?q=80&w=800&auto=format&fit=crop",
    aspectRatio: "aspect-[4/5]",
  },
  {
    id: 4,
    title: "Contemporary Arabic",
    category: "Arabic",
    image: "https://images.unsplash.com/photo-1588662998394-28bba335b0d0?q=80&w=800&auto=format&fit=crop",
    aspectRatio: "aspect-square",
  },
];

export function FeaturedPortfolio() {
  return (
    <section className="py-24 md:py-32 bg-secondary text-primary">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl text-primary">A Gallery of Stories</h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link 
              href="/portfolio" 
              className="group flex items-center gap-2 text-sm uppercase tracking-widest hover:text-highlight transition-colors"
            >
              View Full Gallery
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className={`relative w-full ${item.aspectRatio} overflow-hidden bg-primary/5 mb-4`}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500" />
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="px-6 py-2 bg-secondary text-primary text-xs uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    View Design
                  </span>
                </div>
              </div>
              <h3 className="font-serif text-lg text-primary">{item.title}</h3>
              <p className="text-xs uppercase tracking-widest text-primary/60 mt-1">{item.category}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
