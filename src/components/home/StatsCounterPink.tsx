"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Users, Award, Heart, Building } from "lucide-react";

function Counter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <div ref={ref} className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
      {count}{suffix}
    </div>
  );
}

const stats = [
  { icon: Users, value: 50000, suffix: "+", label: "Happy Patients", color: "from-pink-400 to-rose-500" },
  { icon: Award, value: 20, suffix: "+", label: "Years Excellence", color: "from-rose-400 to-red-500" },
  { icon: Heart, value: 99, suffix: "%", label: "Success Rate", color: "from-pink-400 to-rose-500" },
  { icon: Building, value: 8, suffix: "", label: "Clinic Centers", color: "from-rose-400 to-pink-500" },
];

export default function StatsCounterPink() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-rose-900 to-pink-900 dark:from-slate-950 dark:to-slate-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <div className={`inline-flex w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} items-center justify-center mb-4`}>
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <Counter end={stat.value} suffix={stat.suffix} />
              <p className="text-rose-100 text-sm mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
