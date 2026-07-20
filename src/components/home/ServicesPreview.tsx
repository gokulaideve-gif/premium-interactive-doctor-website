"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Stethoscope, Heart, Brain, Bone, Microscope, Ambulance } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const services = [
  { icon: Stethoscope, title: "General Checkup", desc: "Comprehensive health examinations and preventive care.", color: "from-cyan-400 to-blue-500" },
  { icon: Heart, title: "Cardiology", desc: "Advanced heart care and cardiovascular treatments.", color: "from-rose-400 to-pink-500" },
  { icon: Brain, title: "Neurology", desc: "Expert diagnosis and treatment of neurological conditions.", color: "from-violet-400 to-purple-500" },
  { icon: Bone, title: "Orthopedics", desc: "Specialized care for bones, joints, and muscles.", color: "from-amber-400 to-orange-500" },
  { icon: Microscope, title: "Lab Services", desc: "State-of-the-art diagnostic laboratory testing.", color: "from-emerald-400 to-teal-500" },
  { icon: Ambulance, title: "Emergency Care", desc: "24/7 emergency medical services when you need it.", color: "from-red-400 to-rose-500" },
];

export default function ServicesPreview() {
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
          <motion.span variants={fadeInUp} className="inline-block px-4 py-2 rounded-full bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-4">
            Our Services
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
            Comprehensive Medical Care
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            From routine checkups to specialized treatments, we offer a full range of healthcare services.
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
              className="group relative p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 hover:border-cyan-200 dark:hover:border-cyan-800 transition-all duration-300 cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 shadow-lg`}>
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{service.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{service.desc}</p>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/0 via-cyan-400/0 to-teal-400/0 group-hover:from-cyan-400/5 group-hover:via-cyan-400/0 group-hover:to-teal-400/5 transition-all duration-500" />
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-medium rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
          >
            View All Services
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
