"use client";

import { motion } from "framer-motion";

interface PulsingDotsProps {
  color?: string;
  count?: number;
}

export default function PulsingDots({ color = "from-pink-400 to-rose-400", count = 3 }: PulsingDotsProps) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className={`w-2 h-2 rounded-full bg-gradient-to-r ${color}`}
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}
