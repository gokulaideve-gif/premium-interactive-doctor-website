"use client";

import { motion } from "framer-motion";

export default function RotatingElements() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Rotating outer ring */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-2 border-transparent border-t-pink-400 border-r-pink-300 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Rotating inner ring */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 border-2 border-transparent border-t-rose-400 border-r-rose-300 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      {/* Orbiting hearts */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-2xl">💗</div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-2xl">💕</div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 text-2xl">🌸</div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-2xl">✨</div>
      </motion.div>
    </div>
  );
}
