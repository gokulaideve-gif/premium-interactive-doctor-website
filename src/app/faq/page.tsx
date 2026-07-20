"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { ChevronDown, Search } from "lucide-react";

const faqs = [
  { q: "How do I book an appointment?", a: "You can book an appointment through our online booking system, call us directly, or send a message via WhatsApp. We recommend booking at least 24 hours in advance for preferred time slots." },
  { q: "What insurance plans do you accept?", a: "We accept most major insurance plans including Blue Cross, Aetna, Cigna, UnitedHealthcare, and Medicare. Please contact our office to verify your specific coverage." },
  { q: "What should I bring to my first appointment?", a: "Please bring your photo ID, insurance card, list of current medications, any relevant medical records, and a completed patient intake form (available on our website)." },
  { q: "How long does a typical appointment last?", a: "Initial consultations typically last 45-60 minutes. Follow-up appointments are usually 15-30 minutes depending on the nature of your visit." },
  { q: "Do you offer telemedicine appointments?", a: "Yes, we offer virtual consultations for appropriate medical concerns. Telemedicine appointments can be scheduled through our booking system." },
  { q: "What are your office hours?", a: "We are open Monday through Saturday, 8:00 AM to 8:00 PM. We also offer 24/7 emergency care services." },
  { q: "Is parking available?", a: "Yes, we have a complimentary parking lot for patients. Valet parking is also available for patients with mobility concerns." },
  { q: "Can I get my prescriptions refilled?", a: "Yes, you can request prescription refills through your patient portal or by calling our office. Please allow 24-48 hours for processing." },
  { q: "Do you provide lab services on-site?", a: "Yes, we have a fully equipped laboratory on-site for most routine blood work and diagnostic tests, with results typically available within 24-48 hours." },
  { q: "What COVID-19 precautions do you follow?", a: "We follow all CDC guidelines including enhanced sanitation protocols, mask requirements in clinical areas, and social distancing measures in waiting areas." },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about our services, appointments, and policies."
        badge="FAQ"
      />

      <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative mb-12"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-cyan-400 dark:focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all text-slate-900 dark:text-white"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-3"
          >
            {filteredFaqs.map((faq, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="text-sm sm:text-base font-medium text-slate-900 dark:text-white pr-4">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
