"use client";

import { motion } from "framer-motion";

export default function HeroVisual() {
  return (
    <div className="relative w-full aspect-square max-w-[560px] mx-auto">
      {/* Outer rotating ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-2 rounded-full border border-white/5"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-10 rounded-full border border-white/5"
      />

      {/* Central hub */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          {/* Main glowing circle */}
          <div className="w-40 h-40 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-xl">
            <div className="w-28 h-28 rounded-full bg-white/10 border border-white/10 flex items-center justify-center">
              <span className="text-5xl text-white">⚙️</span>
            </div>
          </div>
          {/* Glow */}
          <div className="absolute inset-0 rounded-full bg-white/5 blur-2xl" />
        </motion.div>
      </div>

      {/* Orbiting Lab Cards - All Grayscale */}
      {[
        { emoji: "🔧", label: "Automobile", angle: 0, delay: 0 },
        { emoji: "🏗️", label: "Civil Eng", angle: 72, delay: 0.2 },
        { emoji: "⚡", label: "Physics", angle: 144, delay: 0.4 },
        { emoji: "🔋", label: "Electronics", angle: 216, delay: 0.6 },
        { emoji: "🤖", label: "AI Tutor", angle: 288, delay: 0.8 },
      ].map((item, i) => {
        const rad = (item.angle * Math.PI) / 180;
        const radius = 195;
        const x = Math.cos(rad - Math.PI / 2) * radius;
        const y = Math.sin(rad - Math.PI / 2) * radius;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: item.delay + 0.5, duration: 0.5 }}
            className="absolute"
            style={{
              left: `calc(50% + ${x}px - 52px)`,
              top: `calc(50% + ${y}px - 52px)`,
            }}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: item.delay,
              }}
              className={`w-[104px] h-[104px] rounded-2xl bg-[#111111] border-white/10 border backdrop-blur-xl flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:scale-110 hover:border-white/20 transition-transform duration-300`}
            >
              <span className="text-3xl grayscale">{item.emoji}</span>
              <span className="text-xs font-semibold text-zinc-300 text-center leading-tight px-1">
                {item.label}
              </span>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Connection lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 560 560">
        {[0, 72, 144, 216, 288].map((angle, i) => {
          const rad = ((angle - 90) * Math.PI) / 180;
          const r1 = 70;
          const r2 = 195;
          const x1 = 280 + Math.cos(rad) * r1;
          const y1 = 280 + Math.sin(rad) * r1;
          const x2 = 280 + Math.cos(rad) * r2;
          const y2 = 280 + Math.sin(rad) * r2;
          return (
            <motion.line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="1"
              strokeDasharray="4 6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.1 }}
            />
          );
        })}
      </svg>

      {/* Floating Badges */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute -bottom-4 -left-4 glass-card px-3 py-2 flex items-center gap-2"
      >
        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
        <span className="text-xs font-medium text-zinc-300">200+ Experiments</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7 }}
        className="absolute -top-4 -right-4 glass-card px-3 py-2 flex items-center gap-2"
      >
        <span className="text-sm grayscale">🎓</span>
        <span className="text-xs font-medium text-zinc-300">50K+ Students</span>
      </motion.div>
    </div>
  );
}
