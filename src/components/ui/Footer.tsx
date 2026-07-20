"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, ArrowUpRight } from "lucide-react";

const footerLinks = {
  quickLinks: [
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/treatments", label: "Treatments" },
    { href: "/achievements", label: "Achievements" },
    { href: "/booking", label: "Book Appointment" },
    { href: "/blog", label: "Health Blog" },
    { href: "/contact", label: "Contact" },
  ],
  services: [
    { href: "/services", label: "General Checkup" },
    { href: "/services", label: "Cardiology" },
    { href: "/services", label: "Neurology" },
    { href: "/services", label: "Pediatrics" },
    { href: "/services", label: "Orthopedics" },
    { href: "/services", label: "Emergency Care" },
  ],
  support: [
    { href: "/faq", label: "FAQ" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/emergency", label: "Emergency" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-slate-900 dark:bg-slate-950 text-white overflow-hidden" data-cms-page="global">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center gap-3 mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/rudra-logo.svg" alt="Dr. Swathy Priya Wellness Centre logo" className="h-14 w-14 rounded-full object-contain" data-cms-key="brand.logo" data-cms-label="Website logo" />
              <div>
                <h3 className="text-lg font-bold" data-cms-key="brand.shortName" data-cms-label="Short brand name">Dr. Swathy Priya</h3>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-pink-400" data-cms-key="brand.tagline" data-cms-label="Brand tagline">Wellness Centre</p>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6" data-cms-key="footer.description" data-cms-label="Footer introduction">
              Compassionate whole-person healthcare for you and your family.
            </p>
            <div className="flex gap-3">
              {["facebook", "twitter", "instagram", "linkedin"].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-cyan-500/20 transition-colors"
                >
                  <span className="text-xs capitalize text-slate-400">{social[0]}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-wider text-pink-400 mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-slate-400 hover:text-white text-sm transition-colors flex items-center gap-1 group">
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-wider text-pink-400 mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-slate-400 hover:text-white text-sm transition-colors flex items-center gap-1 group">
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-wider text-pink-400 mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <span className="text-slate-400 text-sm">123 Healthcare Ave, Medical District, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-cyan-400 shrink-0" />
                <a href="tel:+1234567890" className="text-slate-400 hover:text-white text-sm transition-colors">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-cyan-400 shrink-0" />
                <a href="mailto:info@medicare.com" className="text-slate-400 hover:text-white text-sm transition-colors">info@medicare.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-cyan-400 shrink-0" />
                <span className="text-slate-400 text-sm">Mon-Sat: 8:00 AM - 8:00 PM</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 MediCare. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">Privacy</Link>
            <Link href="/terms" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">Terms</Link>
            <Link href="/faq" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
