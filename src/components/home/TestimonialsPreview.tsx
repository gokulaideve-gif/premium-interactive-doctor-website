"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { fadeInUp } from "@/lib/animations";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Patient",
    content: "Exceptional care from start to finish. The doctor took time to explain everything and made me feel completely at ease. Highly recommended!",
    rating: 5,
    image: "SJ",
  },
  {
    name: "Michael Chen",
    role: "Patient",
    content: "The best medical experience I've ever had. The facility is modern, the staff is professional, and the care is truly world-class.",
    rating: 5,
    image: "MC",
  },
  {
    name: "Emily Rodriguez",
    role: "Patient",
    content: "I'm so grateful for the amazing care I received. From the appointment booking to the follow-up, everything was seamless and professional.",
    rating: 5,
    image: "ER",
  },
  {
    name: "David Thompson",
    role: "Patient",
    content: "After years of searching for the right doctor, I finally found one who truly listens. The treatment has changed my life for the better.",
    rating: 5,
    image: "DT",
  },
];

export default function TestimonialsPreview() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 300 : -300, opacity: 0 }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrent((prev) => (prev + newDirection + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative py-24 lg:py-32 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
            What Our Patients Say
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Real stories from real patients who trust us with their health.
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 to-cyan-50 dark:from-slate-800 dark:to-slate-800 p-8 md:p-12 min-h-[300px]">
            <Quote className="absolute top-6 right-6 w-12 h-12 text-cyan-200 dark:text-cyan-800" />
            
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="space-y-6"
              >
                <div className="flex gap-1">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  &ldquo;{testimonials[current].content}&rdquo;
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
                    {testimonials[current].image}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">{testimonials[current].name}</h4>
                    <p className="text-sm text-slate-500">{testimonials[current].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => paginate(-1)}
              className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? "bg-cyan-500 w-6" : "bg-slate-300 dark:bg-slate-600"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => paginate(1)}
              className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
