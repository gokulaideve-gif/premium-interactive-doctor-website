"use client";

import { motion } from "framer-motion";
import { Award, Users, Clock, Shield, ThumbsUp, Heart } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const features = [
  { icon: Award, title: "2+ Years Experience", desc: "Trusted expertise in healthcare excellence." },
  { icon: Users, title: "Expert Team", desc: "Compassionate doctors dedicated to your care." },
  { icon: Clock, title: "24/7 Availability", desc: "Always here when you need medical support." },
  { icon: Shield, title: "Safe & Secure", desc: "Your health information protected with care." },
  { icon: ThumbsUp, title: "High Success Rate", desc: "99% patient satisfaction guaranteed." },
  { icon: Heart, title: "Kind & Caring", desc: "Treating you and your family with compassion." },
];

export default function WhyChooseUsPink() {
  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-slate-800/50 dark:to-slate-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="inline-block px-4 py-2 rounded-full bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 text-sm font-medium mb-4">
            Why Choose Us
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
            Care You Can Trust
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Dr. Rudra Wellness Centre combines medical excellence with heartfelt compassion.
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
              className="relative p-8 rounded-2xl bg-white dark:bg-slate-800 border border-pink-100 dark:border-rose-800/50 hover:shadow-xl hover:shadow-pink-500/5 transition-all duration-500 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-pink-600 dark:text-pink-400" />
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
