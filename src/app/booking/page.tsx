"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import { useForm } from "react-hook-form";
import { Calendar, Clock, User, Phone, Mail, MessageSquare, ChevronDown, Check } from "lucide-react";
import toast from "react-hot-toast";
import { fadeInUp, staggerContainer } from "@/lib/animations";

type FormData = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  message: string;
};

const services = [
  "General Checkup",
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Dermatology",
  "Lab Services",
  "Emergency Care",
];

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Booking data:", data);
    setIsSubmitted(true);
    toast.success("Appointment booked successfully!");
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-slate-900 dark:to-slate-800">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="text-center p-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-bold text-slate-900 dark:text-white mb-4"
          >
            Appointment Confirmed!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-slate-600 dark:text-slate-400 mb-8"
          >
            We&apos;ll send a confirmation to your email and phone.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onClick={() => { setIsSubmitted(false); setStep(1); }}
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-medium rounded-full hover:shadow-lg transition-all"
          >
            Book Another
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title="Book an Appointment"
        subtitle="Schedule your visit with our expert medical team. Choose your preferred date and time."
        badge="Booking"
      />

      <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Steps Indicator */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex items-center justify-center gap-4 mb-12"
          >
            {[1, 2, 3].map((s) => (
              <motion.div
                key={s}
                variants={fadeInUp}
                className="flex items-center gap-2"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  step >= s
                    ? "bg-gradient-to-br from-cyan-400 to-teal-500 text-white"
                    : "bg-slate-200 dark:bg-slate-700 text-slate-500"
                }`}>
                  {s}
                </div>
                <span className={`text-sm hidden sm:block ${step >= s ? "text-cyan-600 dark:text-cyan-400 font-medium" : "text-slate-400"}`}>
                  {s === 1 ? "Details" : s === 2 ? "Schedule" : "Confirm"}
                </span>
                {s < 3 && <div className="w-8 h-px bg-slate-300 dark:bg-slate-600 mx-2" />}
              </motion.div>
            ))}
          </motion.div>

          <motion.form
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Personal Info */}
            <motion.div variants={fadeInUp} className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 space-y-5">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <User className="w-5 h-5 text-cyan-500" />
                Personal Information
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-cyan-400 dark:focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all text-slate-900 dark:text-white"
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
                  <input
                    {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-cyan-400 dark:focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all text-slate-900 dark:text-white"
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Phone</label>
                  <input
                    {...register("phone", { required: "Phone is required" })}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-cyan-400 dark:focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all text-slate-900 dark:text-white"
                    placeholder="+1 (234) 567-890"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Service</label>
                  <select
                    {...register("service", { required: "Select a service" })}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-cyan-400 dark:focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all text-slate-900 dark:text-white appearance-none"
                  >
                    <option value="">Select a service</option>
                    {services.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service.message}</p>}
                </div>
              </div>
            </motion.div>

            {/* Date & Time */}
            <motion.div variants={fadeInUp} className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 space-y-5">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-cyan-500" />
                Schedule
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Preferred Date</label>
                  <input
                    type="date"
                    {...register("date", { required: "Date is required" })}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-cyan-400 dark:focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all text-slate-900 dark:text-white"
                  />
                  {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Preferred Time</label>
                  <select
                    {...register("time", { required: "Time is required" })}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-cyan-400 dark:focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all text-slate-900 dark:text-white"
                  >
                    <option value="">Select time</option>
                    {timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>}
                </div>
              </div>
            </motion.div>

            {/* Message */}
            <motion.div variants={fadeInUp} className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 space-y-5">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-cyan-500" />
                Additional Notes
              </h3>
              <textarea
                {...register("message")}
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-cyan-400 dark:focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all resize-none text-slate-900 dark:text-white"
                placeholder="Any specific concerns or notes..."
              />
            </motion.div>

            <motion.div variants={fadeInUp} className="flex justify-center pt-4">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-full shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300"
              >
                Confirm Appointment
              </motion.button>
            </motion.div>
          </motion.form>

          {/* WhatsApp Booking */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10 border border-emerald-100 dark:border-emerald-800/30"
          >
            <p className="text-slate-700 dark:text-slate-300 mb-4">Or book via WhatsApp</p>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white font-medium rounded-full hover:bg-emerald-600 transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              WhatsApp Booking
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
