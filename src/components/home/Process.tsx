"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Tell Us Your Story",
    description: "Share your event details, date and design preferences."
  },
  {
    num: "02",
    title: "Design Consultation",
    description: "Discuss your preferred style, coverage and inspiration."
  },
  {
    num: "03",
    title: "The Mehendi Session",
    description: "Relax while Raihana creates your design."
  },
  {
    num: "04",
    title: "Your Moment",
    description: "Leave with beautiful mehendi created especially for you."
  }
];

export function Process() {
  return (
    <section className="py-24 md:py-32 bg-primary text-secondary">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-highlight mb-6 block">
              The Experience
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-6">
              Our Process
            </h2>
            <p className="text-secondary/70 font-light leading-relaxed">
              We ensure a smooth, comfortable, and highly personalized experience from the moment you enquire to the final stain.
            </p>
          </motion.div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {steps.map((step, index) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative pl-12"
                >
                  <span className="absolute left-0 top-1 font-serif text-3xl text-highlight opacity-30">
                    {step.num}
                  </span>
                  <h3 className="font-serif text-2xl text-white mb-4 pl-2">{step.title}</h3>
                  <p className="text-secondary/70 font-light pl-2">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
