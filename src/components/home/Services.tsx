"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
  {
    title: "Bridal Mehendi",
    description: "Intricate, personalized designs created for the bride's special day.",
    price: "Enquire for quote"
  },
  {
    title: "Engagement Mehendi",
    description: "Elegant designs for engagement ceremonies and intimate celebrations.",
    price: "Enquire for quote"
  },
  {
    title: "Party Mehendi",
    description: "Beautiful designs for guests, family gatherings and celebrations.",
    price: "Enquire for quote"
  },
  {
    title: "Custom Mehendi",
    description: "Personalized patterns created around your story, style and preferences.",
    price: "Let's Discuss"
  }
];

export function Services() {
  return (
    <section className="py-24 md:py-32 bg-ivory text-forest relative overflow-hidden border-t border-forest/5">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.2em] text-gold mb-6 block font-medium"
          >
            Offerings
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-forest"
          >
            Services & Packages
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="border border-forest/10 p-8 md:p-12 hover:border-gold transition-colors bg-[#FBF9F4] shadow-sm group flex flex-col h-full"
            >
              <h3 className="font-serif text-2xl mb-4 text-forest">{service.title}</h3>
              <p className="text-forest/70 font-light leading-relaxed mb-8 flex-grow">
                {service.description}
              </p>
              
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-forest/10">
                <span className="text-sm font-medium tracking-wide text-charcoal">{service.price}</span>
                <Link 
                  href="/book" 
                  className="text-xs uppercase tracking-widest text-gold hover:text-forest transition-colors flex items-center gap-2"
                >
                  Book 
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
