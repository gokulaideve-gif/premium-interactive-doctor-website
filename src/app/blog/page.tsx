"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";

const posts = [
  { title: "10 Tips for a Healthy Heart", excerpt: "Discover essential tips to maintain a healthy heart and reduce the risk of cardiovascular disease.", author: "Dr. John Smith", date: "March 15, 2026", category: "Cardiology", image: "❤️" },
  { title: "Understanding Your Blood Pressure", excerpt: "Learn what your blood pressure numbers mean and how to keep them in a healthy range.", author: "Dr. John Smith", date: "March 10, 2026", category: "General Health", image: "🩺" },
  { title: "The Importance of Annual Checkups", excerpt: "Why regular health checkups are crucial for early detection and prevention of diseases.", author: "Dr. John Smith", date: "March 5, 2026", category: "Preventive Care", image: "📋" },
  { title: "Managing Stress for Better Health", excerpt: "Effective strategies to manage stress and improve your overall physical and mental well-being.", author: "Dr. John Smith", date: "February 28, 2026", category: "Mental Health", image: "🧠" },
  { title: "Nutrition Tips for a Strong Immune System", excerpt: "Boost your immune system with these scientifically-backed nutrition recommendations.", author: "Dr. John Smith", date: "February 20, 2026", category: "Nutrition", image: "🥗" },
  { title: "Exercise Guidelines for Seniors", excerpt: "Safe and effective exercise recommendations for older adults to maintain mobility and health.", author: "Dr. John Smith", date: "February 15, 2026", category: "Fitness", image: "💪" },
];

export default function BlogPage() {
  return (
    <>
      <PageHeader
        title="Health Blog"
        subtitle="Expert health advice, medical insights, and wellness tips from Dr. John Smith."
        badge="Blog"
      />

      <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {posts.map((post, i) => (
              <motion.article
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="group rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 overflow-hidden hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-500"
              >
                <div className="h-48 bg-gradient-to-br from-cyan-100 to-teal-100 dark:from-cyan-900/30 dark:to-teal-900/30 flex items-center justify-center text-5xl">
                  {post.image}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author}
                    </span>
                    <Link href="#" className="text-cyan-600 dark:text-cyan-400 text-sm font-medium flex items-center gap-1 group/link">
                      Read More
                      <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
