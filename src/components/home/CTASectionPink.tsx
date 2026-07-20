"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, MessageCircle, ArrowRight } from "lucide-react";

export default function CTASectionPink() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-rose-400 to-red-500" />
      
      {/* Background animated blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-white/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-white/10 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Start Your Wellness Journey Today
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            Schedule your appointment with Dr. Rudra Wellness Centre and experience compassionate, world-class healthcare for you and your family.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/booking"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-pink-600 font-semibold rounded-full hover:shadow-xl hover:shadow-black/10 transition-all duration-300"
          >
            <Calendar className="w-5 h-5" />
            <span>Book Appointment</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5" />
            <span>WhatsApp Chat</span>
          </a>
        </motion.div>

        {/* Floating hearts animation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center gap-8 text-3xl"
        >
          {["💗", "🌸", "💕"].map((emoji, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
