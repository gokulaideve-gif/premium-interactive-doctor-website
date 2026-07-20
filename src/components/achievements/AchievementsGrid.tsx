"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Award, CalendarDays } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

type Achievement = {
  id: number;
  title: string;
  description: string;
  category: string;
  achievementDate: string;
  imageUrl: string | null;
};

export default function AchievementsGrid({ achievements }: { achievements: Achievement[] }) {
  const [active, setActive] = useState("All");
  const categories = useMemo(() => ["All", ...Array.from(new Set(achievements.map((item) => item.category)))], [achievements]);
  const filtered = active === "All" ? achievements : achievements.filter((item) => item.category === active);

  return (
    <div>
      <div className="mb-12 flex flex-wrap justify-center gap-2" data-no-cms>
        {categories.map((category) => (
          <button key={category} onClick={() => setActive(category)} className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${active === category ? "bg-pink-600 text-white shadow-lg shadow-pink-500/20" : "bg-pink-50 text-slate-600 hover:bg-pink-100 hover:text-pink-700 dark:bg-slate-800 dark:text-slate-300"}`}>
            {category}
          </button>
        ))}
      </div>

      <motion.div key={active} initial="hidden" animate="visible" variants={staggerContainer} className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <motion.article key={item.id} variants={fadeInUp} whileHover={{ y: -8 }} className="group overflow-hidden rounded-[2rem] border border-pink-100 bg-white shadow-[0_20px_65px_rgba(157,23,77,0.08)] dark:border-pink-950 dark:bg-slate-900">
            <div className="aspect-[16/10] overflow-hidden bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-950 dark:to-slate-900">
              {item.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              ) : (
                <div className="grid h-full place-items-center"><Award className="h-16 w-16 text-pink-300" /></div>
              )}
            </div>
            <div className="p-7">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-pink-50 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-pink-700 dark:bg-pink-950/40 dark:text-pink-300">{item.category}</span>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-400"><CalendarDays className="h-3.5 w-3.5" />{new Date(`${item.achievementDate}T00:00:00`).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}</span>
              </div>
              <h2 className="mt-5 text-2xl font-black tracking-tight text-slate-950 dark:text-white">{item.title}</h2>
              <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>

      {filtered.length === 0 && <div className="py-24 text-center"><Award className="mx-auto h-14 w-14 text-pink-300" /><p className="mt-4 font-bold text-slate-500">No published achievements in this category.</p></div>}
    </div>
  );
}
