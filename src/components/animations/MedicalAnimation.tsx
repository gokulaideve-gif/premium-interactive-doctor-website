"use client";

import { motion } from "framer-motion";

export default function MedicalAnimation() {
  return (
    <div className="relative w-full h-96 flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 to-rose-50 dark:from-slate-800 dark:to-slate-800 rounded-3xl">
      {/* Animated Stethoscope */}
      <motion.div
        className="absolute text-8xl"
        animate={{
          rotate: [0, 10, -10, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        🩺
      </motion.div>

      {/* Orbiting hearts */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-8 h-8 text-pink-400"
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            left: "50%",
            top: "50%",
            x: Math.cos((i * Math.PI) / 3) * 120,
            y: Math.sin((i * Math.PI) / 3) * 120,
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
          >
            💗
          </motion.div>
        </motion.div>
      ))}

      {/* Center pulse */}
      <motion.div
        className="absolute w-16 h-16 rounded-full bg-gradient-to-r from-pink-400 to-rose-500"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Floating pills */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`pill-${i}`}
          className="absolute text-4xl"
          animate={{
            x: [Math.random() * 200 - 100, Math.random() * 200 - 100],
            y: [Math.random() * 200 - 100, Math.random() * 200 - 100],
            rotate: [0, 360],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            left: `${25 + i * 20}%`,
            top: `${30 + i * 15}%`,
          }}
        >
          💊
        </motion.div>
      ))}

      {/* Text below */}
      <motion.div
        className="absolute bottom-8 text-center"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Compassionate Care
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          For You & Your Family
        </p>
      </motion.div>
    </div>
  );
}
