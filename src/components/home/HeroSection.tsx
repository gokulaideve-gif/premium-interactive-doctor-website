"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, Heart, Shield, Activity } from "lucide-react";
import { useMousePosition } from "@/hooks/useMousePosition";

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function FloatingIcons() {
  const icons = [
    { Icon: Heart, color: "text-rose-400", x: "10%", y: "20%", size: 20 },
    { Icon: Shield, color: "text-cyan-400", x: "85%", y: "30%", size: 24 },
    { Icon: Activity, color: "text-emerald-400", x: "90%", y: "70%", size: 18 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {icons.map((item, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: item.x, top: item.y }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <item.Icon className={`${item.color} opacity-60`} size={item.size} />
        </motion.div>
      ))}
    </div>
  );
}

function ECGHeartbeat() {
  return (
    <svg className="absolute bottom-32 left-0 w-full h-16 opacity-10" viewBox="0 0 1200 60" preserveAspectRatio="none">
      <motion.path
        d="M0,30 L200,30 L220,30 L240,10 L260,50 L280,30 L400,30 L420,30 L430,15 L440,45 L450,30 L600,30 L620,30 L640,10 L660,50 L680,30 L800,30 L820,30 L830,15 L840,45 L850,30 L1000,30 L1020,30 L1040,10 L1060,50 L1080,30 L1200,30"
        fill="none"
        stroke="url(#ecgGradient)"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      <defs>
        <linearGradient id="ecgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#14b8a6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function HeroSection() {
  const { smoothPosition } = useMousePosition();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMousePos(smoothPosition);
  }, [smoothPosition]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
    >
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-cyan-200/20 to-teal-200/20 dark:from-cyan-900/10 dark:to-teal-900/10 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-blue-200/20 to-cyan-200/20 dark:from-blue-900/10 dark:to-cyan-900/10 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-violet-200/10 to-fuchsia-200/10 dark:from-violet-900/5 dark:to-fuchsia-900/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Mouse Follow Glow */}
      <motion.div
        className="absolute pointer-events-none w-[300px] h-[300px] rounded-full bg-gradient-to-r from-cyan-400/10 to-teal-400/10 blur-3xl"
        style={{
          left: mousePos.x - 150,
          top: mousePos.y - 150,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      />

      <FloatingParticles />
      <FloatingIcons />
      <ECGHeartbeat />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-cyan-200 dark:border-cyan-800 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
            Available for appointments
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight"
        >
          <span className="text-slate-900 dark:text-white">Your Health,</span>
          <br />
          <span className="bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-500 bg-clip-text text-transparent">
            Our Priority
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed"
        >
          Experience world-class healthcare with cutting-edge technology and compassionate medical professionals dedicated to your well-being.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/booking"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-full overflow-hidden shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-shadow duration-300"
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500"
              animate={{ x: ["0%", "100%", "0%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{ opacity: 0.3 }}
            />
            <span className="relative">Book Appointment</span>
            <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/about"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-full hover:bg-white dark:hover:bg-white/10 transition-all duration-300"
          >
            <Play className="w-5 h-5" />
            <span>Learn More</span>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
        >
          {[
            { value: "2+", label: "Year Excellence" },
            { value: "5000+", label: "Happy Patients" },
            { value: "99%", label: "Success Rate" },
            { value: "1", label: "Clinic Centre" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          className="w-5 h-8 rounded-full border-2 border-slate-300 dark:border-slate-600 flex justify-center pt-1.5"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-cyan-400"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
        <span className="text-[10px] text-slate-400 uppercase tracking-widest">Scroll</span>
      </motion.div>
    </section>
  );
}
