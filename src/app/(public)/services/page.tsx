"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const packages = [
  {
    id: "bridal",
    title: "Bridal Mehendi",
    price: "Custom Quote",
    description: "The complete bridal experience, tailored to your love story and personal style.",
    inclusions: [
      "Initial Design Consultation",
      "Personalized Motif Design",
      "Both Hands (Front & Back) up to Elbows",
      "Both Feet up to Ankles",
      "Event Coordination",
      "Aftercare Instructions & Kit"
    ]
  },
  {
    id: "engagement",
    title: "Engagement Mehendi",
    price: "Custom Quote",
    description: "Elegant, medium-coverage designs perfect for engagement ceremonies and roka.",
    inclusions: [
      "Design Style Consultation",
      "Both Hands (Front & Back) up to Mid-Arm",
      "Minimal Foot Design (Optional)",
      "Aftercare Instructions"
    ]
  },
  {
    id: "party",
    title: "Party Mehendi",
    price: "Custom Quote",
    description: "Hourly or per-hand pricing for bridesmaids, family members, and guests.",
    inclusions: [
      "Variety of Design Options (Arabic, Mandala, Minimal)",
      "Flexible Coverage (One side / Both sides)",
      "Hourly Booking Available for Large Groups",
      "Fast & Intricate Application"
    ]
  },
  {
    id: "custom",
    title: "Custom Mehendi",
    price: "Let's Discuss",
    description: "Specialized designs for festivals, baby showers, or editorial shoots.",
    inclusions: [
      "Detailed Requirement Gathering",
      "Unique Conceptual Design",
      "Flexible Coverage",
      "On-Location Services Available"
    ]
  }
];

export default function ServicesPage() {
  return (
    <div className="pt-20 min-h-screen bg-background">
      {/* Header */}
      <section className="py-24 md:py-32 bg-primary text-secondary relative overflow-hidden">
        <div className="container-custom relative z-10 text-center max-w-3xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-[0.2em] text-highlight mb-6 block"
          >
            Offerings
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl mb-6"
          >
            Services & Packages
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-secondary/70 font-light"
          >
            Every design is unique, just like your celebration. Explore our base offerings.
          </motion.p>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-24">
        <div className="container-custom max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border border-primary/10 p-8 md:p-12 shadow-sm flex flex-col h-full hover:shadow-xl hover:border-primary/20 transition-all duration-500"
              >
                <div className="mb-8">
                  <h2 className="font-serif text-3xl text-primary mb-2">{pkg.title}</h2>
                  <p className="text-sm uppercase tracking-widest text-accent font-medium mb-4">{pkg.price}</p>
                  <p className="text-primary/70 font-light leading-relaxed">
                    {pkg.description}
                  </p>
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-xs uppercase tracking-widest text-primary mb-4 font-semibold">What's Included</h3>
                  <ul className="space-y-4 mb-8">
                    {pkg.inclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-highlight shrink-0 mt-0.5" />
                        <span className="text-sm text-primary/80 font-light leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-auto pt-6 border-t border-primary/10">
                  <Link 
                    href={`/book?service=${pkg.id}`}
                    className="inline-flex items-center justify-center w-full py-4 border border-primary text-primary text-xs uppercase tracking-widest hover:bg-primary hover:text-secondary transition-colors"
                  >
                    Enquire Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ or Custom Note */}
      <section className="py-20 bg-secondary/50 text-center">
        <div className="container-custom max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl text-primary mb-6">Need something specific?</h2>
          <p className="text-primary/70 font-light mb-8">
            Our packages serve as a baseline. The final quote is determined by the intricacy of the design, the length of the mehendi applied, and travel requirements. 
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-highlight hover:text-primary transition-colors font-medium group"
          >
            Contact for Custom Requests
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
