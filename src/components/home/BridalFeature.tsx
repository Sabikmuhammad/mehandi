"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BridalFeature() {
  return (
    <section className="py-24 md:py-32 bg-forest text-ivory relative overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[50vh] lg:h-[70vh] w-full rounded-sm overflow-hidden"
          >
            <Image
              src="/images/bridal-feature.jpg"
              alt="Luxury Bridal Mehendi"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-gold mb-6 block font-medium">
              The Bridal Experience
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight text-white">
              For the Bride Who Wants Every Detail to Matter.
            </h2>
            <p className="text-ivory/70 font-light text-lg mb-10 leading-relaxed">
              Your bridal mehendi should be as extraordinary as your celebration. We craft bespoke designs that weave your personal love story, traditions, and style into intricate art. 
            </p>
            <Link
              href="/book?service=bridal"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-forest text-sm uppercase tracking-widest hover:bg-white transition-colors font-medium group"
            >
              Enquire for Bridal Mehendi
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
