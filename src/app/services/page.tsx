"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Stethoscope, Heart, Brain, Bone, Eye, Microscope, Ambulance, Baby, Activity, Thermometer, Pill, Syringe } from "lucide-react";

const services = [
  { icon: Stethoscope, title: "General Checkup", desc: "Comprehensive health examinations and preventive care to keep you healthy.", price: "$150", duration: "45 min" },
  { icon: Heart, title: "Cardiology", desc: "Advanced heart care including ECG, stress tests, and cardiovascular treatments.", price: "$250", duration: "60 min" },
  { icon: Brain, title: "Neurology", desc: "Expert diagnosis and treatment of neurological conditions and disorders.", price: "$300", duration: "60 min" },
  { icon: Bone, title: "Orthopedics", desc: "Specialized care for bones, joints, muscles, and sports injuries.", price: "$200", duration: "45 min" },
  { icon: Eye, title: "Ophthalmology", desc: "Comprehensive eye exams, vision testing, and eye health management.", price: "$180", duration: "30 min" },
  { icon: Microscope, title: "Lab Services", desc: "State-of-the-art diagnostic laboratory testing with quick results.", price: "$50 - $500", duration: "Varies" },
  { icon: Ambulance, title: "Emergency Care", desc: "24/7 emergency medical services for urgent health concerns.", price: "Emergency", duration: "24/7" },
  { icon: Baby, title: "Pediatrics", desc: "Specialized healthcare for infants, children, and adolescents.", price: "$150", duration: "30 min" },
  { icon: Activity, title: "Dermatology", desc: "Skin health management, treatments, and cosmetic dermatology.", price: "$200", duration: "45 min" },
  { icon: Thermometer, title: "Immunizations", desc: "Vaccinations and immunization programs for all age groups.", price: "$25 - $150", duration: "15 min" },
  { icon: Pill, title: "Pharmacy", desc: "On-site pharmacy for convenient prescription filling and advice.", price: "Varies", duration: "Walk-in" },
  { icon: Syringe, title: "Vaccinations", desc: "COVID-19, flu shots, and travel vaccinations available.", price: "$30 - $100", duration: "15 min" },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Our Medical Services"
        subtitle="Comprehensive healthcare services tailored to your needs, delivered with excellence and compassion."
        badge="Services"
      />

      <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center mb-5 shadow-lg shadow-cyan-500/10">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{service.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">{service.desc}</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-lg font-bold text-cyan-600 dark:text-cyan-400">{service.price}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{service.duration}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
