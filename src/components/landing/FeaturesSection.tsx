"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FEATURES } from "@/lib/constants";
import { Car, Building2, Zap, FlaskConical, Bot, BookOpen, Cpu } from "lucide-react";
import Link from "next/link";

const ICON_MAP: Record<string, React.ElementType> = {
  Car,
  Building2,
  Zap,
  FlaskConical,
  Bot,
  BookOpen,
  Cpu,
};

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="py-24 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border border-white/5 text-sm font-medium text-zinc-400 mb-6"
          >
            Virtual Environments
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6"
          >
            Everything you need to master <br className="hidden md:block" />
            <span className="text-zinc-500">engineering concepts</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-lg text-zinc-400"
          >
            Access state-of-the-art virtual equipment, interactive simulations, and AI-guided learning—anytime, anywhere.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => {
            const Icon = ICON_MAP[feature.icon];
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group glass-card-hover relative overflow-hidden flex flex-col h-full"
              >
                {/* Background Shimmer (B&W) */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/[0.03] to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="p-8 flex-1 flex flex-col relative z-10">
                  <div className={`w-12 h-12 rounded-2xl bg-[#111111] border border-white/10 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1">
                    {feature.description}
                  </p>
                  
                  <div className="space-y-2 mb-8">
                    {feature.experiments.slice(0, 3).map((exp, j) => (
                      <div key={j} className="flex items-center gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                        <span className="text-sm text-zinc-300 font-medium">{exp}</span>
                      </div>
                    ))}
                  </div>

                  <Link 
                    href={feature.id === 'ai' || feature.id === 'notes' ? `/dashboard/${feature.id}` : `/dashboard/${feature.id}`}
                    className="mt-auto text-sm font-semibold text-white group-hover:text-zinc-300 flex items-center gap-1.5 transition-colors"
                  >
                    Open Lab 
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                      className="inline-block"
                    >
                      →
                    </motion.span>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
