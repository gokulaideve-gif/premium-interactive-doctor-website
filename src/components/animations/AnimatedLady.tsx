"use client";

import { motion } from "framer-motion";

export default function AnimatedLady() {
  return (
    <motion.div
      className="relative w-32 h-40"
      animate={{ y: [0, -20, 0], x: [0, 5, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Head */}
      <motion.div
        className="absolute top-0 left-8 w-12 h-12 rounded-full bg-gradient-to-b from-amber-200 to-amber-300 shadow-lg"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* Hair */}
        <div className="w-full h-6 bg-amber-800 rounded-full relative">
          <motion.div
            className="absolute top-1 left-2 w-2 h-2 bg-amber-900 rounded-full"
            animate={{ scaleY: [1, 0.8, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-1 right-2 w-2 h-2 bg-amber-900 rounded-full"
            animate={{ scaleY: [1, 0.8, 1] }}
            transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
          />
        </div>
        {/* Eyes */}
        <div className="flex justify-center gap-2 mt-3">
          <motion.div
            className="w-1.5 h-1.5 bg-blue-600 rounded-full"
            animate={{ scaleY: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div
            className="w-1.5 h-1.5 bg-blue-600 rounded-full"
            animate={{ scaleY: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
          />
        </div>
        {/* Smile */}
        <div className="flex justify-center mt-2">
          <div className="w-3 h-1.5 bg-rose-400 rounded-full" />
        </div>
      </motion.div>

      {/* Body - Medical Coat */}
      <motion.div
        className="absolute top-12 left-4 w-16 h-16 bg-gradient-to-b from-pink-200 to-pink-300 rounded-lg shadow-md"
        animate={{ scaleX: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* Coat buttons */}
        <div className="flex flex-col gap-2 justify-center items-center h-full">
          <div className="w-2 h-2 bg-pink-600 rounded-full" />
          <div className="w-2 h-2 bg-pink-600 rounded-full" />
          <div className="w-2 h-2 bg-pink-600 rounded-full" />
        </div>
      </motion.div>

      {/* Left Arm - Holding Stethoscope */}
      <motion.div
        className="absolute top-14 -left-2 w-12 h-3 bg-gradient-to-r from-amber-200 to-amber-300 rounded-full origin-right"
        animate={{ rotate: [0, 25, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        {/* Hand */}
        <motion.div className="absolute -left-3 top-0 w-4 h-4 bg-amber-200 rounded-full" />
      </motion.div>

      {/* Right Arm */}
      <motion.div
        className="absolute top-14 right-0 w-12 h-3 bg-gradient-to-r from-amber-300 to-amber-200 rounded-full origin-left"
        animate={{ rotate: [0, -30, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
      >
        {/* Hand */}
        <motion.div className="absolute -right-3 top-0 w-4 h-4 bg-amber-200 rounded-full" />
      </motion.div>

      {/* Left Leg */}
      <motion.div
        className="absolute top-28 left-6 w-2 h-8 bg-gradient-to-b from-amber-300 to-amber-400 rounded-full"
        animate={{ rotate: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* Foot */}
        <div className="absolute bottom-0 left-0 w-4 h-2 bg-amber-500 rounded-full -left-1" />
      </motion.div>

      {/* Right Leg */}
      <motion.div
        className="absolute top-28 right-6 w-2 h-8 bg-gradient-to-b from-amber-300 to-amber-400 rounded-full"
        animate={{ rotate: [0, -15, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
      >
        {/* Foot */}
        <div className="absolute bottom-0 right-0 w-4 h-2 bg-amber-500 rounded-full -right-1" />
      </motion.div>

      {/* Stethoscope in hand */}
      <motion.div
        className="absolute top-10 -left-6 w-8 h-8"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Earpieces */}
          <circle cx="30" cy="15" r="5" fill="#ef4444" />
          <circle cx="70" cy="15" r="5" fill="#ef4444" />
          {/* Y-shaped tube */}
          <path d="M 30 20 L 30 50 L 50 70" stroke="#000" strokeWidth="4" fill="none" />
          <path d="M 70 20 L 70 50 L 50 70" stroke="#000" strokeWidth="4" fill="none" />
          {/* Chest piece */}
          <circle cx="50" cy="85" r="8" fill="#fbbf24" stroke="#000" strokeWidth="2" />
          <circle cx="50" cy="85" r="5" fill="#f59e0b" />
        </svg>
      </motion.div>

      {/* Heart floating above */}
      <motion.div
        className="absolute -top-4 right-4 text-2xl"
        animate={{
          y: [-10, 10, -10],
          x: [0, 5, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        💗
      </motion.div>
    </motion.div>
  );
}
