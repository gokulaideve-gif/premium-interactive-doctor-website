"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Stethoscope, Heart, Brain, Bone, Microscope, Ambulance } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const services = [
  { icon: Stethoscope, title: "General Checkup", desc: "Comprehensive health examinations with kindness and care.", color: "from-pink-400 to-rose-500" },
  { icon: Heart, title: "Cardiology", desc: "Heart health with compassionate, expert treatment.", color: "from-rose-400 to-red-500" },
  { icon: Brain, title: "Neurology", desc: "Neurological care with gentle, personalized approach.", color: "from-pink-400 to-purple-500" },
  { icon: Bone, title: "Orthopedics", desc: "Joint and bone care with supportive treatment.", color: "from-rose-300 to-pink-500" },
  { icon: Microscope, title: "Lab Services", desc: "Accurate diagnostics for your health clarity.", color: "from-pink-300 to-rose-400" },
  { icon: Ambulance, title: "Emergency Care", desc: "24/7 emergency support when you need it most.", color: "from-red-400 to-pink-500" },
];

export default function ServicesPreviewPink() {
  return (
    <section className="relative py-24 lg:py-32 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="inline-block px-4 py-2 rounded-full bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 text-sm font-medium mb-4">
            Our Services
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
            Comprehensive Wellness Care
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            From routine care to specialized treatments, we provide compassionate healthcare services.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-pink-50/50 to-rose-50/50 dark:from-slate-800/50 dark:to-slate-800/30 border border-pink-100 dark:border-rose-800/30 hover:border-pink-200 dark:hover:border-pink-700 transition-all duration-300 cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 shadow-lg shadow-pink-500/20`}>
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{service.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium rounded-full hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300"
          >
            View All Services
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
