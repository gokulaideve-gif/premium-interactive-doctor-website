"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Award, CalendarDays } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

type Achievement = {
  id: number;
  title: string;
  category: string;
  achievementDate: string;
  imageUrl: string | null;
};

export default function AchievementsPreview({ achievements, content }: { achievements: Achievement[]; content: Record<string, string> }) {
  const get = (key: string, fallback: string) => content[`home:${key}`] || fallback;

  return (
    <section className="relative overflow-hidden bg-[#fff8fb] py-24 dark:bg-slate-950 lg:py-32" data-cms-page="home">
      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-pink-200/30 blur-[100px] dark:bg-pink-900/10" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="mb-14 text-center">
          <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-pink-700 dark:border-pink-900 dark:bg-slate-900 dark:text-pink-300">
            <Award className="h-4 w-4" />
            <span data-cms-key="achievements.eyebrow" data-cms-label="Achievements label">{get("achievements.eyebrow", "Milestones")}</span>
          </motion.span>
          <motion.h2 variants={fadeInUp} className="mx-auto mt-5 max-w-4xl text-4xl font-black tracking-[-0.045em] text-slate-950 dark:text-white sm:text-5xl lg:text-6xl" data-cms-key="achievements.title" data-cms-label="Achievements heading">
            {get("achievements.title", "Recognition built on meaningful care")}
          </motion.h2>
          <motion.p variants={fadeInUp} className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300" data-cms-key="achievements.description" data-cms-label="Achievements introduction">
            {get("achievements.description", "New qualifications, research, awards and moments from Dr. Rudra’s continuing wellness journey.")}
          </motion.p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((achievement) => (
            <motion.article key={achievement.id} variants={fadeInUp} whileHover={{ y: -9 }} className="group overflow-hidden rounded-[2rem] border border-pink-100 bg-white shadow-[0_18px_55px_rgba(157,23,77,0.07)] transition-shadow hover:shadow-[0_28px_70px_rgba(157,23,77,0.15)] dark:border-pink-950 dark:bg-slate-900">
              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-950 dark:to-slate-900">
                {achievement.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={achievement.imageUrl} alt={achievement.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                ) : (
                  <div className="grid h-full place-items-center"><Award className="h-14 w-14 text-pink-300" /></div>
                )}
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-pink-700 backdrop-blur-lg">{achievement.category}</span>
              </div>
              <div className="p-5">
                <h3 className="text-base font-black leading-snug text-slate-950 dark:text-white">{achievement.title}</h3>
                <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-slate-500"><CalendarDays className="h-3.5 w-3.5 text-pink-500" />{new Date(`${achievement.achievementDate}T00:00:00`).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 text-center">
          <Link href="/achievements" className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-pink-700 dark:bg-white dark:text-slate-950 dark:hover:bg-pink-200">
            View all achievements <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
