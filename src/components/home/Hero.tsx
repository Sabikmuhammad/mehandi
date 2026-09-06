"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative h-[95vh] min-h-[600px] w-full flex items-center overflow-hidden bg-primary text-secondary">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1621008670183-bba88686a34c?q=80&w=2000&auto=format&fit=crop"
          alt="Bridal Mehendi Detail"
          fill
          className="object-cover object-[70%_50%] opacity-40 mix-blend-overlay"
          priority
          sizes="100vw"
        />
        {/* Subtle Henna Pattern Overlay (CSS gradient as placeholder) */}
        <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="container-custom relative z-10 grid md:grid-cols-2 gap-8 items-center pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col items-start"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-highlight mb-6">
            Mangaluru • Karnataka
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-6 font-medium text-balance">
            Your Story, <br />
            <span className="italic text-highlight">Drawn by Hand.</span>
          </h1>
          <p className="text-secondary/80 text-lg md:text-xl max-w-md mb-10 leading-relaxed font-light">
            Exquisite bridal mehendi and bespoke designs crafted with patience, precision, and an eye for every little detail.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="/book"
              className="px-8 py-4 bg-highlight text-primary text-sm uppercase tracking-widest hover:bg-white transition-colors text-center font-medium"
            >
              Book Your Date
            </Link>
            <Link
              href="/portfolio"
              className="px-8 py-4 border border-secondary/30 text-secondary text-sm uppercase tracking-widest hover:border-highlight hover:text-highlight transition-colors flex items-center justify-center gap-2 group"
            >
              Explore the Art
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-secondary/60">Scroll to Explore</span>
        <motion.div 
          className="w-[1px] h-12 bg-secondary/20 overflow-hidden"
        >
          <motion.div 
            className="w-full h-1/2 bg-highlight"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
