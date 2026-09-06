"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-secondary text-primary relative overflow-hidden">
        <div className="container-custom relative z-10 text-center max-w-3xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-5xl md:text-6xl mb-6"
          >
            Meet Raihana
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-primary/70 font-light"
          >
            The artist behind the intricate stories woven on your hands.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 relative"
            >
              <div className="aspect-[3/4] relative w-full overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1596489311494-df72049e6022?q=80&w=1000&auto=format&fit=crop"
                  alt="Raihana Portrait"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            <div className="lg:col-span-7 flex flex-col items-start lg:pl-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6 text-foreground/80 font-light leading-relaxed max-w-2xl text-lg"
              >
                <p>
                  With a deep-rooted passion for art and tradition, my journey with mehendi began as a fascination with the intricate patterns that adorn a bride on her most special day.
                </p>
                <p>
                  I believe that mehendi is more than just a pre-wedding ritual; it is a personalized canvas that tells a story. Whether it's weaving hidden names, skylines of where you met, or traditional motifs passed down through generations, my focus is always on <span className="font-medium text-primary">personalization and precision</span>.
                </p>
                <p>
                  Having worked with brides from diverse backgrounds, my goal is not just to provide a service, but to create a <span className="font-medium text-primary">comfortable, relaxing experience</span>. The hours you spend getting your mehendi done should be a time for you to breathe, unwind, and embrace the joy of the upcoming celebrations.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-10"
              >
                <Image 
                  src="/signature-placeholder.svg" 
                  alt="Raihana" 
                  width={150} 
                  height={80} 
                  className="opacity-90"
                  style={{ filter: "invert(17%) sepia(21%) saturate(1005%) hue-rotate(94deg) brightness(94%) contrast(85%)" }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-primary text-secondary">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-secondary/20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="py-6"
            >
              <h3 className="font-serif text-5xl md:text-6xl text-highlight mb-4">100+</h3>
              <p className="text-sm uppercase tracking-widest text-secondary/80">Happy Brides</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="py-6"
            >
              <h3 className="font-serif text-5xl md:text-6xl text-highlight mb-4">5+</h3>
              <p className="text-sm uppercase tracking-widest text-secondary/80">Years of Craft</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="py-6"
            >
              <h3 className="font-serif text-5xl md:text-6xl text-highlight mb-4">500+</h3>
              <p className="text-sm uppercase tracking-widest text-secondary/80">Custom Designs</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background text-center">
        <div className="container-custom">
          <h2 className="font-serif text-4xl text-primary mb-8">Let's craft your story together.</h2>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-secondary text-sm uppercase tracking-widest hover:bg-highlight hover:text-primary transition-colors font-medium group"
          >
            Enquire Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
