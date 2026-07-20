"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Ambulance, Phone, Heart, MapPin, Clock, Shield } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function EmergencyPage() {
  return (
    <section className="relative min-h-screen pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden bg-gradient-to-br from-rose-50 via-white to-rose-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-rose-200/20 to-red-200/20 dark:from-rose-900/10 dark:to-red-900/10 blur-3xl"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-red-200/20 to-rose-200/20 dark:from-red-900/10 dark:to-rose-900/10 blur-3xl"
          animate={{ scale: [1.1, 1, 1.1], rotate: [0, -45, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-rose-400 to-red-500 mb-8 shadow-xl shadow-rose-500/30"
        >
          <Ambulance className="w-12 h-12 text-white" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4"
        >
          Emergency Services
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-slate-600 dark:text-slate-400 mb-8"
        >
          We&apos;re here for you 24/7. Immediate medical attention when you need it most.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.a
            href="tel:911"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-5 bg-gradient-to-r from-rose-500 to-red-600 text-white text-xl font-bold rounded-full shadow-xl shadow-rose-500/30 animate-pulse-glow"
          >
            <Phone className="w-6 h-6" />
            Call 911
          </motion.a>
          <motion.a
            href="tel:+1234567890"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold rounded-full shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <Phone className="w-5 h-5" />
            +1 (234) 567-890
          </motion.a>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {[
            { icon: Clock, title: "24/7 Availability", desc: "Round-the-clock emergency medical services" },
            { icon: MapPin, title: "Quick Access", desc: "Centrally located with easy ambulance access" },
            { icon: Shield, title: "Expert Team", desc: "Board-certified emergency physicians" },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="p-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50"
            >
              <item.icon className="w-8 h-8 text-rose-500 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{item.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50"
        >
          <Heart className="w-8 h-8 text-rose-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">When to Seek Emergency Care</h3>
          <ul className="text-left space-y-3 max-w-lg mx-auto mt-6">
            {[
              "Chest pain or difficulty breathing",
              "Severe bleeding or head injury",
              "Sudden severe headache or vision changes",
              "Signs of stroke (facial drooping, arm weakness, slurred speech)",
              "Severe allergic reactions",
              "Major burns or fractures",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Link href="/booking" className="text-cyan-600 dark:text-cyan-400 font-medium hover:underline">
            ← Back to Home
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
