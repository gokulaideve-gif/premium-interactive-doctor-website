"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CalendarDays, HeartPulse, ShieldCheck, Sparkles, Stethoscope } from "lucide-react";
import FloatingHearts from "@/components/animations/FloatingHearts";
import { useMousePosition } from "@/hooks/useMousePosition";

type HeroProps = { content: Record<string, string> };

const particles = [
  [8, 18, 0.2], [17, 71, 0.8], [28, 34, 1.3], [39, 82, 0.4], [51, 16, 1.1],
  [62, 66, 0.6], [74, 28, 1.5], [86, 74, 0.9], [93, 42, 0.1], [47, 48, 1.7],
];

export default function HeroSectionV2({ content }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { smoothPosition } = useMousePosition();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 42]);

  useEffect(() => setMouse(smoothPosition), [smoothPosition]);

  const get = (key: string, fallback: string) => content[`home:${key}`] || content[`global:${key}`] || fallback;
  const stats = [
    [get("stats.experience.value", "2+"), get("stats.experience.label", "Year Excellence"), "stats.experience"],
    [get("stats.patients.value", "5000+"), get("stats.patients.label", "Happy Patients"), "stats.patients"],
    [get("stats.success.value", "99%"), get("stats.success.label", "Patient satisfaction"), "stats.success"],
    [get("stats.access.value", "1"), get("stats.access.label", "Clinic Centre"), "stats.access"],
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden bg-[#fff8fb] pb-16 pt-28 dark:bg-slate-950 lg:flex lg:items-center lg:pb-10 lg:pt-24"
      data-cms-page="home"
    >
      <div className="absolute inset-0">
        <motion.div
          className="absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-pink-200/45 blur-[110px] dark:bg-pink-900/15"
          animate={{ scale: [1, 1.16, 1], x: [0, 36, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-32 top-0 h-[680px] w-[680px] rounded-full bg-rose-200/50 blur-[130px] dark:bg-rose-900/15"
          animate={{ scale: [1.1, 0.96, 1.1], y: [0, 45, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 opacity-[0.36] dark:opacity-[0.09]" style={{ backgroundImage: "radial-gradient(#db2777 0.7px, transparent 0.7px)", backgroundSize: "28px 28px" }} />
      </div>

      <motion.div
        className="pointer-events-none absolute h-80 w-80 rounded-full bg-pink-400/15 blur-3xl"
        style={{ left: mouse.x - 160, top: mouse.y - 160 }}
      />

      {particles.map(([left, top, delay], index) => (
        <motion.span
          key={index}
          className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-pink-400/45"
          style={{ left: `${left}%`, top: `${top}%` }}
          animate={{ y: [0, -24, 0], opacity: [0.25, 0.9, 0.25], scale: [1, 1.8, 1] }}
          transition={{ duration: 3.5 + index * 0.13, delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <FloatingHearts />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-5">
          <motion.div style={{ y: copyY }} className="relative z-20 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15 }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white/75 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-pink-700 shadow-sm backdrop-blur-xl dark:border-pink-900 dark:bg-slate-900/65 dark:text-pink-300"
            >
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-400 opacity-70" /><span className="relative h-2 w-2 rounded-full bg-pink-500" /></span>
              <span data-cms-key="hero.eyebrow" data-cms-label="Opening availability label">{get("hero.eyebrow", "Compassionate care • Appointments available")}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="font-black uppercase leading-[0.82] tracking-[-0.075em] text-slate-950 dark:text-white"
            >
              <span className="block text-[clamp(4.2rem,10.5vw,9.8rem)]" data-cms-key="hero.title" data-cms-label="Main opening title">
                {get("hero.title", "DR. RUDRA")}
              </span>
              <span
                className="mt-3 block bg-gradient-to-r from-pink-700 via-pink-500 to-rose-500 bg-clip-text text-[clamp(2.9rem,7.2vw,7.1rem)] text-transparent"
                data-cms-key="hero.accent"
                data-cms-label="Main opening title – second line"
              >
                {get("hero.accent", "WELLNESS CENTRE")}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.48 }}
              className="mx-auto mt-8 max-w-2xl text-base font-medium leading-7 text-slate-600 dark:text-slate-300 sm:text-lg lg:mx-0 lg:max-w-xl"
              data-cms-key="hero.subtitle"
              data-cms-label="Opening description"
            >
              {get("hero.subtitle", "Whole-person healthcare delivered with clinical excellence, kindness and a genuine commitment to your family’s wellbeing.")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.62 }}
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
            >
              <Link href="/booking" className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-pink-700 to-rose-500 px-7 py-4 text-sm font-bold text-white shadow-[0_18px_45px_rgba(219,39,119,0.27)] transition hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(219,39,119,0.34)]">
                <CalendarDays className="h-5 w-5" />
                <span data-cms-key="hero.primaryCta" data-cms-label="Primary button text">{get("hero.primaryCta", "Book a consultation")}</span>
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <Link href="/about" className="flex items-center gap-2 rounded-full border border-pink-200 bg-white/80 px-7 py-4 text-sm font-bold text-slate-800 shadow-sm backdrop-blur-lg transition hover:-translate-y-1 hover:border-pink-400 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white">
                <Stethoscope className="h-5 w-5 text-pink-600" />
                <span data-cms-key="hero.secondaryCta" data-cms-label="Secondary button text">{get("hero.secondaryCta", "Meet Dr. Swathy Priya")}</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
              className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-5 border-t border-pink-200/70 pt-7 lg:mx-0 lg:grid-cols-4 dark:border-pink-900/50"
            >
              {stats.map(([value, label, key], index) => (
                <motion.div key={key} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.9 + index * 0.09 }} className="text-left">
                  <p className="text-2xl font-black tracking-tight text-pink-700 dark:text-pink-400" data-cms-key={`${key}.value`} data-cms-label={`${label} value`}>{value}</p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400" data-cms-key={`${key}.label`} data-cms-label={`${label} label`}>{label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div style={{ y: imageY }} className="relative mx-auto min-h-[520px] w-full max-w-[620px] lg:min-h-[700px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.88, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-4 bottom-4 top-4 overflow-hidden rounded-[3.25rem] border-[10px] border-white bg-gradient-to-br from-cyan-100 via-white to-pink-100 shadow-[0_40px_100px_rgba(157,23,77,0.22)] dark:border-slate-900 dark:from-slate-800 dark:to-pink-950 sm:inset-x-10 lg:bottom-10 lg:top-10"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <motion.img
                src={get("hero.doctorImage", "/images/doctor-doll.png")}
                alt="Dr. Swathy Priya — main doctor portrait"
                className="h-full w-full object-cover"
                data-cms-key="hero.doctorImage"
                data-cms-label="Main doctor photo"
                animate={{ scale: [1, 1.035, 1] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-pink-950/75 via-pink-900/25 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-pink-100">Dr. Rudra Wellness Centre</p>
                <p className="mt-2 max-w-sm text-xl font-bold leading-tight" data-cms-key="hero.photoLabel" data-cms-label="Doctor photo caption">
                  {get("hero.photoLabel", "Personalised wellness, thoughtfully delivered")}
                </p>
              </div>
            </motion.div>

            <motion.div
              animate={{ x: [-8, 12, -8], y: [0, -18, 0], rotate: [-3, 4, -3] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-2 top-4 w-28 overflow-hidden rounded-[2rem] border-4 border-white bg-white shadow-2xl shadow-pink-500/20 sm:left-0 sm:w-36 lg:top-16 lg:w-40 dark:border-slate-800 dark:bg-slate-800"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={get("hero.mascotImage", "/images/doctor-doll.png")}
                alt="Animated doctor mascot"
                className="aspect-square w-full object-cover"
                data-cms-key="hero.mascotImage"
                data-cms-label="Animated doctor doll"
              />
              <div className="px-3 py-2 text-center text-[10px] font-black uppercase tracking-widest text-pink-700 dark:text-pink-300">Kind care</div>
            </motion.div>

            <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 3.2, repeat: Infinity }} className="absolute right-0 top-24 rounded-2xl border border-pink-100 bg-white/90 p-4 shadow-xl backdrop-blur-xl dark:border-pink-900 dark:bg-slate-900/90">
              <ShieldCheck className="h-7 w-7 text-pink-600" />
              <p className="mt-2 text-xs font-black text-slate-900 dark:text-white">Trusted care</p>
            </motion.div>

            <motion.div animate={{ x: [0, 8, 0], rotate: [0, 3, 0] }} transition={{ duration: 4.4, repeat: Infinity }} className="absolute bottom-3 right-2 flex items-center gap-3 rounded-2xl bg-pink-700 px-4 py-3 text-white shadow-xl shadow-pink-500/25 lg:bottom-20">
              <HeartPulse className="h-6 w-6" />
              <div><p className="text-[10px] font-bold uppercase tracking-wider text-pink-200">Care promise</p><p className="text-sm font-black">Listen. Treat. Support.</p></div>
            </motion.div>

            <motion.div animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="absolute right-6 top-6 text-pink-500"><Sparkles className="h-6 w-6" /></motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
