"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Sarah Johnson", role: "Patient", content: "Exceptional care from start to finish. The doctor took time to explain everything and made me feel completely at ease. Highly recommended!", rating: 5, date: "March 2026" },
  { name: "Michael Chen", role: "Patient", content: "The best medical experience I've ever had. The facility is modern, the staff is professional, and the care is truly world-class.", rating: 5, date: "February 2026" },
  { name: "Emily Rodriguez", role: "Patient", content: "I'm so grateful for the amazing care I received. From the appointment booking to the follow-up, everything was seamless and professional.", rating: 5, date: "January 2026" },
  { name: "David Thompson", role: "Patient", content: "After years of searching for the right doctor, I finally found one who truly listens. The treatment has changed my life for the better.", rating: 5, date: "December 2025" },
  { name: "Lisa Anderson", role: "Patient", content: "The level of care and attention I received was outstanding. The entire team made me feel welcome and supported throughout my treatment.", rating: 5, date: "November 2025" },
  { name: "James Wilson", role: "Patient", content: "Professional, knowledgeable, and incredibly caring. I wouldn't trust anyone else with my health. A truly exceptional medical practice.", rating: 5, date: "October 2025" },
];

export default function TestimonialsPage() {
  return (
    <>
      <PageHeader
        title="Patient Testimonials"
        subtitle="Real stories from real patients who trust us with their health."
        badge="Testimonials"
      />

      <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {testimonials.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="relative p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-500"
              >
                <Quote className="absolute top-6 right-6 w-8 h-8 text-cyan-200 dark:text-cyan-800" />
                <div className="flex gap-1 mb-4">
                  {[...Array(item.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  &ldquo;{item.content}&rdquo;
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">{item.name}</h4>
                    <p className="text-xs text-slate-500">{item.role} • {item.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
