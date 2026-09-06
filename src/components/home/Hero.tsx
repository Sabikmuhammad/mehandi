"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-screen w-full flex items-center bg-forest text-ivory pt-20">
      <div className="container-custom grid lg:grid-cols-2 gap-12 items-center w-full h-full py-12 lg:py-0">
        
        {/* Left: Typography */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col items-start z-10"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-gold mb-6">
            Mangaluru • Karnataka
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] mb-6 font-medium text-balance">
            Your Story, <br />
            <span className="italic text-gold">Drawn by Hand.</span>
          </h1>
          <p className="text-ivory/80 text-lg md:text-xl max-w-md mb-10 leading-relaxed font-light">
            Exquisite bridal mehendi and bespoke designs crafted with patience, precision, and an eye for every little detail.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="/book"
              className="px-8 py-4 bg-gold text-forest text-sm uppercase tracking-widest hover:bg-white transition-colors text-center font-medium"
            >
              Book Your Date
            </Link>
            <Link
              href="/portfolio"
              className="px-8 py-4 border border-ivory/30 text-ivory text-sm uppercase tracking-widest hover:border-gold hover:text-gold transition-colors flex items-center justify-center gap-2 group"
            >
              Explore the Art
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Right: Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative h-[50vh] lg:h-screen w-full mt-8 lg:mt-0 lg:absolute lg:top-0 lg:right-0 lg:w-[50vw] z-0"
        >
          <Image
            src="/images/hero-bridal.jpg"
            alt="Intricate Bridal Mehendi Detail"
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Subtle gradient overlay to blend edge */}
          <div className="absolute inset-0 bg-gradient-to-t from-forest via-transparent to-transparent lg:hidden" />
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-forest to-transparent hidden lg:block" />
        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 lg:left-1/4 -translate-x-1/2 flex flex-col items-center gap-4 z-10"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-ivory/60">Scroll</span>
        <motion.div 
          className="w-[1px] h-12 bg-ivory/20 overflow-hidden"
        >
          <motion.div 
            className="w-full h-1/2 bg-gold"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
