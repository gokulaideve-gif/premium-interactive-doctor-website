"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Check } from "lucide-react";

const treatments = [
  {
    category: "Internal Medicine",
    items: ["Annual Physical Exams", "Chronic Disease Management", "Hypertension Treatment", "Diabetes Care", "Thyroid Disorders", "Respiratory Infections"],
  },
  {
    category: "Cardiology",
    items: ["Heart Disease Diagnosis", "ECG & EKG Testing", "Echocardiograms", "Stress Tests", "Holter Monitoring", "Cardiac Risk Assessment"],
  },
  {
    category: "Neurology",
    items: ["Headache & Migraine Treatment", "Neurological Exams", "Memory Assessment", "Movement Disorders", "Neuropathy Treatment", "Sleep Studies"],
  },
  {
    category: "Orthopedics",
    items: ["Joint Pain Treatment", "Sports Medicine", "Fracture Care", "Arthritis Management", "Physical Therapy", "Spine Care"],
  },
  {
    category: "Preventive Care",
    items: ["Health Screenings", "Vaccinations", "Wellness Exams", "Nutrition Counseling", "Weight Management", "Smoking Cessation"],
  },
  {
    category: "Diagnostic Services",
    items: ["Blood Tests", "Urinalysis", "X-Rays", "Ultrasounds", "CT Scans", "MRI Referrals"],
  },
];

export default function TreatmentsPage() {
  return (
    <>
      <PageHeader
        title="Treatments & Specialties"
        subtitle="Comprehensive treatment options backed by the latest medical research and technology."
        badge="Treatments"
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
            {treatments.map((treatment, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-500 group"
              >
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
                  {treatment.category}
                </h3>
                <ul className="space-y-3">
                  {treatment.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-gradient-to-br from-cyan-100 to-teal-100 dark:from-cyan-900/30 dark:to-teal-900/30 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                      </span>
                      <span className="text-slate-700 dark:text-slate-300 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
