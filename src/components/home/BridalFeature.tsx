"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export function BridalFeature() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={containerRef} className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden bg-primary text-secondary">
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
        <Image
          src="https://images.unsplash.com/photo-1588662998394-28bba335b0d0?q=80&w=2000&auto=format&fit=crop"
          alt="Luxury Bridal Mehendi"
          fill
          className="object-cover opacity-50"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-primary/40" />

      <div className="container-custom relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-highlight mb-6 block">
            The Bridal Experience
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight text-balance text-white">
            For the Bride Who Wants Every Detail to Matter.
          </h2>
          <p className="text-secondary/80 font-light text-lg mb-10 max-w-xl mx-auto">
            Your bridal mehendi should be as extraordinary as your celebration. We craft bespoke designs that weave your personal love story, traditions, and style into intricate art.
          </p>
          <Link
            href="/book?service=bridal"
            className="inline-block px-8 py-4 bg-highlight text-primary text-sm uppercase tracking-widest hover:bg-white transition-colors font-medium"
          >
            Enquire for Bridal Mehendi
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
