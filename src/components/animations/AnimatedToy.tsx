"use client";

import { motion } from "framer-motion";

export default function AnimatedToy() {
  return (
    <motion.div
      className="relative w-24 h-32"
      animate={{
        x: [-100, 100, -100],
        y: [0, -30, 0],
      }}
      transition={{
        x: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      {/* Toy Capsule */}
      <motion.div
        className="absolute top-0 w-20 h-24 rounded-3xl bg-gradient-to-b from-pink-300 via-pink-400 to-pink-500 shadow-xl"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {/* Top Cap */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-3 bg-gradient-to-b from-rose-400 to-rose-500 rounded-t-2xl" />

        {/* Eyes */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          <motion.div
            className="w-3 h-3 bg-blue-600 rounded-full"
            animate={{ scale: [1, 0.7, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
          <motion.div
            className="w-3 h-3 bg-blue-600 rounded-full"
            animate={{ scale: [1, 0.7, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
          />
        </div>

        {/* Smile */}
        <motion.path
          d="M 28 40 Q 40 50 52 40"
          stroke="#fbbf24"
          strokeWidth="2"
          fill="none"
          animate={{ strokeDashoffset: [0, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        {/* Stethoscope on toy */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12"
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Earpieces */}
            <circle cx="25" cy="10" r="4" fill="#ef4444" />
            <circle cx="75" cy="10" r="4" fill="#ef4444" />
            {/* Tube */}
            <path d="M 25 15 Q 25 40 50 60" stroke="#1f2937" strokeWidth="3" fill="none" />
            <path d="M 75 15 Q 75 40 50 60" stroke="#1f2937" strokeWidth="3" fill="none" />
            {/* Chest piece */}
            <circle cx="50" cy="75" r="7" fill="#fbbf24" stroke="#1f2937" strokeWidth="1.5" />
            <circle cx="50" cy="75" r="4" fill="#f59e0b" />
          </svg>
        </motion.div>

        {/* Arms waving */}
        <motion.div
          className="absolute top-14 -left-4 w-6 h-2 bg-gradient-to-r from-pink-300 to-pink-400 rounded-full"
          animate={{ rotate: [0, 45, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-14 -right-4 w-6 h-2 bg-gradient-to-r from-pink-400 to-pink-300 rounded-full"
          animate={{ rotate: [0, -45, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
        />

        {/* Legs kicking */}
        <motion.div
          className="absolute bottom-2 left-4 w-2 h-6 bg-gradient-to-b from-pink-400 to-pink-600 rounded-full"
          animate={{ rotate: [0, 30, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-2 right-4 w-2 h-6 bg-gradient-to-b from-pink-400 to-pink-600 rounded-full"
          animate={{ rotate: [0, -30, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
        />

        {/* Sparkles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-300 rounded-full"
            style={{
              left: `${20 + i * 30}%`,
              top: `${10 + i * 10}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            ✨
          </motion.div>
        ))}
      </motion.div>

      {/* Shadow under toy */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-2 bg-black/10 rounded-full blur-md"
        animate={{ scaleX: [1, 0.8, 1], scaleY: [1, 0.6, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
}
