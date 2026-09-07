"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
  eventType: z.string().min(1, "Event type is required"),
  eventDate: z.string().min(1, "Event date is required"),
  venue: z.string().min(1, "Venue is required"),
  guests: z.string().min(1, "Number of guests is required"),
  style: z.string().min(1, "Style preference is required"),
  budget: z.string().min(1, "Budget range is required"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const steps = [
  { id: "personal", title: "Personal Details", fields: ["name", "phone", "email"] },
  { id: "event", title: "Event Type", fields: ["eventType"] },
  { id: "date_venue", title: "Date & Venue", fields: ["eventDate", "venue"] },
  { id: "details", title: "Details", fields: ["guests", "style", "budget"] },
  { id: "additional", title: "Additional Notes", fields: ["notes"] },
];

export default function BookPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
  });

  const eventType = watch("eventType");
  const style = watch("style");
  const budget = watch("budget");
  const guests = watch("guests");

  const processForm: SubmitHandler<FormData> = async (data) => {
    setSubmitError("");
    
    // Call the server action
    const { submitBookingEnquiry } = await import('./actions');
    const result = await submitBookingEnquiry(data);
    
    if (result.success && result.bookingId) {
      setSubmittedName(data.name);
      setIsSubmitted(true);
    } else {
      setSubmitError(result.error || "Failed to submit booking. Please try again.");
    }
  };

  const nextStep = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as (keyof FormData)[]);
    
    if (!output) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  if (isSubmitted) {
    return (
      <div className="pt-20 min-h-screen bg-ivory flex flex-col items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="container-custom max-w-2xl text-center"
        >
          <div className="w-20 h-20 bg-forest rounded-full flex items-center justify-center mx-auto mb-8 text-ivory">
            <Check className="w-10 h-10" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-forest mb-6">
            Thank you, {submittedName}.
          </h1>
          <p className="text-forest/70 font-light text-lg mb-10">
            Your enquiry has been received. Raihana will review your details and get back to you shortly with availability and a custom quote.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-8 py-4 bg-forest text-ivory text-sm uppercase tracking-widest hover:bg-gold transition-colors"
          >
            Return Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-ivory flex flex-col">
      <section className="py-16 md:py-24 bg-forest text-ivory relative overflow-hidden flex-shrink-0">
        <div className="container-custom relative z-10 text-center max-w-3xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-6xl mb-6"
          >
            Let's Create Something Beautiful.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-ivory/70 font-light"
          >
            Tell us about your celebration and we'll get back to you with availability and details.
          </motion.p>
        </div>
      </section>

      <section className="flex-grow py-16 bg-forest/5">
        <div className="container-custom max-w-3xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex justify-between mb-2">
              <span className="text-xs uppercase tracking-widest text-forest/60">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-xs uppercase tracking-widest text-forest font-medium">
                {steps[currentStep].title}
              </span>
            </div>
            <div className="h-1 bg-forest/10 w-full rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-forest"
                initial={{ width: `${(1 / steps.length) * 100}%` }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Form */}
          <div className="bg-[#FBF9F4] p-8 md:p-12 lg:p-16 shadow-xl border border-forest/5 rounded-sm">
            <form onSubmit={handleSubmit(processForm)}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Step 1: Personal Details */}
                  {currentStep === 0 && (
                    <div className="space-y-8">
                      <div>
                        <label className="block text-sm uppercase tracking-widest text-forest mb-2">Full Name</label>
                        <input
                          type="text"
                          {...register("name")}
                          className="w-full bg-transparent border-b border-forest/20 py-3 text-charcoal placeholder-[#7A817A] focus:outline-none focus:border-gold transition-colors"
                          placeholder="Your Name"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm uppercase tracking-widest text-forest mb-2">Phone Number</label>
                        <input
                          type="tel"
                          {...register("phone")}
                          className="w-full bg-transparent border-b border-forest/20 py-3 text-charcoal placeholder-[#7A817A] focus:outline-none focus:border-gold transition-colors"
                          placeholder="+91 "
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm uppercase tracking-widest text-forest mb-2">Email Address</label>
                        <input
                          type="email"
                          {...register("email")}
                          className="w-full bg-transparent border-b border-forest/20 py-3 text-charcoal placeholder-[#7A817A] focus:outline-none focus:border-gold transition-colors"
                          placeholder="your@email.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Event Type */}
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <label className="block text-sm uppercase tracking-widest text-forest mb-4">What are we celebrating?</label>
                      {["Wedding", "Engagement", "Party", "Other"].map((type) => (
                        <div
                          key={type}
                          onClick={() => setValue("eventType", type)}
                          className={`cursor-pointer p-4 border transition-colors ${
                            eventType === type ? "border-forest bg-forest/5 text-forest" : "border-forest/20 text-charcoal/70 hover:border-forest/50"
                          }`}
                        >
                          <span className="font-serif text-xl">{type}</span>
                        </div>
                      ))}
                      {errors.eventType && <p className="text-red-500 text-xs mt-1">{errors.eventType.message}</p>}
                    </div>
                  )}

                  {/* Step 3: Date & Venue */}
                  {currentStep === 2 && (
                    <div className="space-y-8">
                      <div>
                        <label className="block text-sm uppercase tracking-widest text-forest mb-2">Event Date</label>
                        <input
                          type="date"
                          {...register("eventDate")}
                          className="w-full bg-transparent border-b border-forest/20 py-3 text-charcoal focus:outline-none focus:border-gold transition-colors"
                        />
                        {errors.eventDate && <p className="text-red-500 text-xs mt-1">{errors.eventDate.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm uppercase tracking-widest text-forest mb-2">Venue / Location</label>
                        <input
                          type="text"
                          {...register("venue")}
                          className="w-full bg-transparent border-b border-forest/20 py-3 text-charcoal placeholder-[#7A817A] focus:outline-none focus:border-gold transition-colors"
                          placeholder="City, Hotel, or Address"
                        />
                        {errors.venue && <p className="text-red-500 text-xs mt-1">{errors.venue.message}</p>}
                      </div>
                    </div>
                  )}

                  {/* Step 4: Details */}
                  {currentStep === 3 && (
                    <div className="space-y-8">
                      <div>
                        <label className="block text-sm uppercase tracking-widest text-forest mb-4">Number of People</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {["Just me", "2-5", "6-15", "15+"].map((num) => (
                            <div
                              key={num}
                              onClick={() => setValue("guests", num)}
                              className={`cursor-pointer p-3 border text-center text-sm transition-colors ${
                                guests === num ? "border-forest bg-forest/5 text-forest" : "border-forest/20 text-charcoal/70 hover:border-forest/50"
                              }`}
                            >
                              {num}
                            </div>
                          ))}
                        </div>
                        {errors.guests && <p className="text-red-500 text-xs mt-1">{errors.guests.message}</p>}
                      </div>

                      <div>
                        <label className="block text-sm uppercase tracking-widest text-forest mb-4">Preferred Style</label>
                        <div className="grid grid-cols-2 gap-3">
                          {["Traditional", "Arabic", "Minimal", "Custom/Mixed"].map((sty) => (
                            <div
                              key={sty}
                              onClick={() => setValue("style", sty)}
                              className={`cursor-pointer p-3 border text-center text-sm transition-colors ${
                                style === sty ? "border-forest bg-forest/5 text-forest" : "border-forest/20 text-charcoal/70 hover:border-forest/50"
                              }`}
                            >
                              {sty}
                            </div>
                          ))}
                        </div>
                        {errors.style && <p className="text-red-500 text-xs mt-1">{errors.style.message}</p>}
                      </div>

                      <div>
                        <label className="block text-sm uppercase tracking-widest text-forest mb-4">Budget Range</label>
                        <div className="grid grid-cols-2 gap-3">
                          {["Under ₹5,000", "₹5,000 - ₹15,000", "₹15,000 - ₹25,000", "₹25,000+"].map((bud) => (
                            <div
                              key={bud}
                              onClick={() => setValue("budget", bud)}
                              className={`cursor-pointer p-3 border text-center text-sm transition-colors ${
                                budget === bud ? "border-forest bg-forest/5 text-forest" : "border-forest/20 text-charcoal/70 hover:border-forest/50"
                              }`}
                            >
                              {bud}
                            </div>
                          ))}
                        </div>
                        {errors.budget && <p className="text-red-500 text-xs mt-1">{errors.budget.message}</p>}
                      </div>
                    </div>
                  )}

                  {/* Step 5: Additional */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm uppercase tracking-widest text-forest mb-2">Additional Notes</label>
                        <textarea
                          {...register("notes")}
                          rows={5}
                          className="w-full bg-transparent border border-forest/20 p-4 text-charcoal placeholder-[#7A817A] focus:outline-none focus:border-gold transition-colors resize-none"
                          placeholder="Any specific requests, motifs, or details you'd like to share?"
                        />
                      </div>
                      <div className="p-4 bg-forest/5 border border-forest/10 flex flex-col gap-2">
                        <span className="text-xs uppercase tracking-widest text-forest font-medium">Reference Images</span>
                        <span className="text-sm text-forest/70 font-light">
                          You can share reference images with us via WhatsApp once we respond to your enquiry.
                        </span>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="mt-12">
                {submitError && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
                    {submitError}
                  </div>
                )}
                <div className="flex justify-between items-center pt-8 border-t border-forest/10">
                  {currentStep > 0 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex items-center gap-2 text-sm uppercase tracking-widest text-forest/70 hover:text-gold transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                  ) : (
                    <div></div> // Spacer
                  )}

                  {currentStep < steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center gap-2 px-8 py-3 bg-forest text-ivory text-sm uppercase tracking-widest hover:bg-gold transition-colors"
                    >
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2 px-8 py-3 bg-gold text-forest text-sm uppercase tracking-widest hover:bg-forest hover:text-ivory transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Sending..." : "Send Enquiry"}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
