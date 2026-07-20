"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryItems = [
  { title: "Modern Reception Area", category: "Facility", emoji: "🏥" },
  { title: "State-of-the-Art Equipment", category: "Equipment", emoji: "🔬" },
  { title: "Comfortable Patient Rooms", category: "Facility", emoji: "🛏️" },
  { title: "Advanced Lab Technology", category: "Equipment", emoji: "🧪" },
  { title: "Friendly Medical Staff", category: "Team", emoji: "👩‍⚕️" },
  { title: "Consultation Room", category: "Facility", emoji: "🩺" },
  { title: "Waiting Area", category: "Facility", emoji: "🪑" },
  { title: "Emergency Unit", category: "Facility", emoji: "🚑" },
  { title: "Pharmacy Section", category: "Facility", emoji: "💊" },
];

export default function GalleryPage() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <>
      <PageHeader
        title="Our Gallery"
        subtitle="Take a virtual tour of our state-of-the-art medical facility."
        badge="Gallery"
      />

      <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Tags */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-wrap items-center justify-center gap-3 mb-12"
          >
            {["All", "Facility", "Equipment", "Team"].map((tag) => (
              <motion.button
                key={tag}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-cyan-50 dark:hover:bg-cyan-900/20 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all"
              >
                {tag}
              </motion.button>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {galleryItems.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                layoutId={`gallery-${i}`}
                onClick={() => setSelected(i)}
                className="relative group cursor-pointer rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-slate-800 dark:to-slate-800 border border-slate-100 dark:border-slate-700/50 aspect-[4/3]"
              >
                <div className="w-full h-full flex items-center justify-center text-6xl">
                  {item.emoji}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <h3 className="text-white font-semibold">{item.title}</h3>
                    <span className="text-white/70 text-sm">{item.category}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); setSelected(prev => prev !== null ? (prev - 1 + galleryItems.length) % galleryItems.length : null); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            <motion.div
              key={selected}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full"
            >
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-cyan-100 to-teal-100 dark:from-slate-700 dark:to-slate-700 flex items-center justify-center text-8xl mb-4">
                {galleryItems[selected].emoji}
              </div>
              <h3 className="text-white text-xl font-semibold text-center">{galleryItems[selected].title}</h3>
              <p className="text-white/60 text-center mt-1">{galleryItems[selected].category}</p>
            </motion.div>

            <button
              onClick={(e) => { e.stopPropagation(); setSelected(prev => prev !== null ? (prev + 1) % galleryItems.length : null); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
