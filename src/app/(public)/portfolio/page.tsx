"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const categories = ["All", "Bridal", "Minimal", "Traditional", "Arabic"];

const portfolioImages = [
  { id: 1, category: "Bridal", src: "/images/portfolio-1.jpg", aspect: "aspect-[3/4]" },
  { id: 2, category: "Minimal", src: "/images/portfolio-2.jpg", aspect: "aspect-square" },
  { id: 3, category: "Traditional", src: "/images/portfolio-3.jpg", aspect: "aspect-[4/5]" },
  { id: 4, category: "Traditional", src: "/images/portfolio-4.jpg", aspect: "aspect-square" },
  { id: 5, category: "Bridal", src: "/images/portfolio-5.jpg", aspect: "aspect-[3/4]" },
  { id: 6, category: "Arabic", src: "/images/portfolio-6.jpg", aspect: "aspect-[4/5]" },
  // Duplicate for filler if we want more, but we only generated 6 images.
  { id: 7, category: "Minimal", src: "/images/portfolio-1.jpg", aspect: "aspect-[3/4]" },
  { id: 8, category: "Bridal", src: "/images/portfolio-3.jpg", aspect: "aspect-square" },
  { id: 9, category: "Arabic", src: "/images/portfolio-2.jpg", aspect: "aspect-[4/3]" },
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = portfolioImages.filter(
    (img) => activeCategory === "All" || img.category === activeCategory
  );

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = "auto";
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-ivory">
      <section className="py-24 bg-forest text-ivory relative overflow-hidden">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-5xl md:text-6xl mb-6 text-white"
          >
            A Gallery of Stories
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-ivory/70 font-light"
          >
            Explore our curated collection of bespoke mehendi designs.
          </motion.p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-sm uppercase tracking-widest pb-1 border-b-2 transition-colors font-medium ${
                  activeCategory === cat 
                    ? "border-gold text-gold" 
                    : "border-transparent text-charcoal hover:text-gold"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry-like Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <AnimatePresence>
              {filteredImages.map((img, idx) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className={`relative w-full ${img.aspect} overflow-hidden group cursor-pointer bg-forest/5`}
                  onClick={() => openLightbox(idx)}
                >
                  <Image
                    src={img.src}
                    alt={`${img.category} Mehendi`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/20 transition-colors duration-500" />
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ZoomIn className="w-8 h-8 text-ivory mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500" />
                    <span className="text-ivory text-xs uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                      View Design
                    </span>
                  </div>
                  
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-ivory text-forest text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {img.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-forest/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={closeLightbox}
          >
            <button 
              className="absolute top-6 right-6 text-ivory/70 hover:text-white p-2 transition-colors z-50"
              onClick={closeLightbox}
            >
              <X className="w-8 h-8" />
            </button>
            
            <button 
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-ivory/70 hover:text-white p-4 transition-colors z-50"
              onClick={prevImage}
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            
            <button 
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-ivory/70 hover:text-white p-4 transition-colors z-50"
              onClick={nextImage}
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            <motion.div 
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="relative w-full max-w-5xl max-h-[85vh] h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full">
                <Image
                  src={filteredImages[lightboxIndex].src}
                  alt={`${filteredImages[lightboxIndex].category} Detail`}
                  fill
                  className="object-contain"
                  quality={90}
                />
              </div>
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-ivory/70 text-xs uppercase tracking-widest">
                {lightboxIndex + 1} / {filteredImages.length} • {filteredImages[lightboxIndex].category}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
