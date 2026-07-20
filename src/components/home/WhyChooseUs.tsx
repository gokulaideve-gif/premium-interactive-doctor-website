"use client";

import { motion } from "framer-motion";
import { Award, Users, Clock, Shield, ThumbsUp, Zap } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const features = [
  { icon: Award, title: "15+ Years Experience", desc: "Decades of medical expertise and proven results." },
  { icon: Users, title: "Expert Team", desc: "Board-certified doctors and specialized medical staff." },
  { icon: Clock, title: "24/7 Availability", desc: "Round-the-clock care for all your medical needs." },
  { icon: Shield, title: "Safe & Secure", desc: "HIPAA-compliant with the highest safety standards." },
  { icon: ThumbsUp, title: "High Success Rate", desc: "99% patient satisfaction and treatment success." },
  { icon: Zap, title: "Modern Technology", desc: "Cutting-edge equipment and advanced treatments." },
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-24 lg:py-32 bg-slate-50 dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="inline-block px-4 py-2 rounded-full bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 text-sm font-medium mb-4">
            Why Choose Us
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
            Why Patients Trust Us
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            We combine medical excellence with compassionate care to deliver the best health outcomes.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="relative p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-500 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-100 to-teal-100 dark:from-cyan-900/30 dark:to-teal-900/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
