"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Award, GraduationCap, Heart, Stethoscope, Clock, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Dr. John Smith"
        subtitle="A dedicated physician with over 15 years of experience in providing exceptional healthcare."
        badge="About Us"
      />

      {/* Doctor Introduction */}
      <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden bg-gradient-to-br from-cyan-100 to-teal-100 dark:from-cyan-900/30 dark:to-teal-900/30">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Stethoscope className="w-24 h-24 text-cyan-300 dark:text-cyan-700" />
                </div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent"
                  animate={{ opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
              {/* Floating Cards */}
              <motion.div
                className="absolute -bottom-6 -right-6 p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-rose-500" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">15+ Years</p>
                    <p className="text-xs text-slate-500">Experience</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-6"
            >
              <motion.span variants={fadeInUp} className="inline-block px-4 py-2 rounded-full bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 text-sm font-medium">
                Meet Your Doctor
              </motion.span>
              <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                Dedicated to Your Health & Well-being
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Dr. John Smith is a board-certified physician with extensive training from top medical institutions. 
                He specializes in internal medicine and preventative care, with a passion for helping patients 
                achieve optimal health through personalized treatment plans.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                His approach combines the latest medical research with compassionate, patient-centered care. 
                He believes in taking the time to listen to each patient&apos;s concerns and developing 
                treatment strategies that address both immediate needs and long-term wellness goals.
              </motion.p>

              <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { icon: GraduationCap, title: "Harvard Medical" },
                  { icon: Award, title: "Board Certified" },
                  { icon: Clock, title: "15+ Years Exp" },
                  { icon: Globe, title: "Multi-lingual" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-100 to-teal-100 dark:from-cyan-900/30 dark:to-teal-900/30 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.title}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline - Qualifications */}
      <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="inline-block px-4 py-2 rounded-full bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 text-sm font-medium mb-4">
              Qualifications
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Education & Experience
            </motion.h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400 via-teal-400 to-blue-400" />

            <div className="space-y-12">
              {[
                { year: "2020 - Present", title: "Chief Medical Officer", org: "MediCare Premium Clinic", desc: "Leading a team of healthcare professionals providing top-tier medical services." },
                { year: "2015 - 2020", title: "Senior Physician", org: "City General Hospital", desc: "Specialized in internal medicine and patient care management." },
                { year: "2012 - 2015", title: "Residency Program", org: "Massachusetts General Hospital", desc: "Completed residency with honors in Internal Medicine." },
                { year: "2008 - 2012", title: "MD Degree", org: "Harvard Medical School", desc: "Doctor of Medicine with specialization in Internal Medicine." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="relative pl-16"
                >
                  <div className="absolute left-4 top-1 w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold border-4 border-white dark:border-slate-900">
                    {i + 1}
                  </div>
                  <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50">
                    <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">{item.year}</span>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mt-1">{item.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{item.org}</p>
                    <p className="text-slate-600 dark:text-slate-400 mt-3 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
