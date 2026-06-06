"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { STATS } from "@/lib/constants";
import { Users, FlaskConical, Building, Clock } from "lucide-react";

const ICONS = [Users, FlaskConical, Building, Clock];

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="stats" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((stat, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="glass-card p-6 text-center hover:border-white/10 transition-all duration-300 group"
              >
                <div className={`w-11 h-11 rounded-xl bg-[#111111] border border-white/5 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-white/5 transition-all duration-300`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-3xl sm:text-4xl font-black mb-1 text-white">
                  <span>{stat.value}</span>
                </div>
                <div className="text-sm text-zinc-500 font-medium">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
