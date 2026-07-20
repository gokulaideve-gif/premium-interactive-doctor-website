"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useForm } from "react-hook-form";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Contact data:", data);
    toast.success("Message sent successfully! We'll get back to you soon.");
    reset();
  };

  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch with us. We're here to help you with any questions or concerns."
        badge="Contact"
      />

      <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeInUp}>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  Get in Touch
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  We&apos;d love to hear from you. Choose the most convenient way to reach us.
                </p>
              </motion.div>

              <div className="space-y-4">
                {[
                  { icon: MapPin, title: "Visit Us", desc: "75, Amirthi Rd, Pennathur, Tamil Nadu 632058" },
                  { icon: Phone, title: "Call Us", desc: "+1 (234) 567-890", href: "tel:+1234567890" },
                  { icon: Mail, title: "Email Us", desc: "care@drrudrawellness.com", href: "mailto:care@drrudrawellness.com" },
                  { icon: Clock, title: "Office Hours", desc: "Mon-Sat: 8:00 AM - 8:00 PM" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-100 to-teal-100 dark:from-cyan-900/30 dark:to-teal-900/30 flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                      {item.href ? (
                        <a href={item.href} className="text-slate-600 dark:text-slate-400 text-sm hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                          {item.desc}
                        </a>
                      ) : (
                        <p className="text-slate-600 dark:text-slate-400 text-sm">{item.desc}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* WhatsApp / Emergency */}
              <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4">
                <a
                  href="https://wa.me/917904676870"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
                <a
                  href="tel:+1234567890"
                  className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-rose-500 text-white font-medium hover:bg-rose-600 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Emergency
                </a>
              </motion.div>

              {/* Map */}
              <motion.div variants={fadeInUp} className="rounded-2xl overflow-hidden h-64 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <iframe
                  src="https://www.google.com/maps?q=75+Amirthi+Rd+Pennathur+Tamil+Nadu+632058&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Clinic Location"
                />
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.form
                variants={fadeInUp}
                onSubmit={handleSubmit(onSubmit)}
                className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 space-y-5"
              >
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Send us a Message</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                  Fill out the form and we&apos;ll respond within 24 hours.
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Name</label>
                    <input
                      {...register("name", { required: "Name is required" })}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-cyan-400 dark:focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all text-slate-900 dark:text-white"
                      placeholder="Your name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
                    <input
                      {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-cyan-400 dark:focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all text-slate-900 dark:text-white"
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Subject</label>
                  <input
                    {...register("subject", { required: "Subject is required" })}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-cyan-400 dark:focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all text-slate-900 dark:text-white"
                    placeholder="How can we help?"
                  />
                  {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Message</label>
                  <textarea
                    {...register("message", { required: "Message is required" })}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-cyan-400 dark:focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all resize-none text-slate-900 dark:text-white"
                    placeholder="Tell us more about your inquiry..."
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </motion.button>
              </motion.form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
