"use client";

import { motion } from "framer-motion";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Play, TrendingUp, Clock, Target, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ACHIEVEMENTS } from "@/lib/constants";

export default function DashboardHome() {
  return (
    <div className="flex flex-col flex-1 overflow-auto bg-[#000000]">
      <DashboardHeader title="Overview" subtitle="Welcome back, Thasmilan!" />

      <div className="p-6 max-w-7xl mx-auto w-full space-y-6">
        
        {/* Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-zinc-800 flex items-center justify-center relative">
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle cx="20" cy="20" r="18" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeDasharray="113" strokeDashoffset="34" className="text-white" />
              </svg>
              <span className="text-xs font-bold text-white">70%</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Overall Progress</div>
              <div className="text-xs text-zinc-500">12/24 Labs Completed</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Study Time</div>
              <div className="text-xs text-zinc-500">24h 15m total</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-5 flex items-center justify-between group cursor-pointer hover:border-white/20 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Next Task</div>
                <div className="text-xs text-zinc-500">Complete Engine Quiz</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Left Column (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Labs */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-bold text-white">Continue Learning</h3>
                <Link href="/dashboard/physics" className="text-xs text-zinc-400 hover:text-white">View all</Link>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Automobile Engine Simulator", subject: "Automobile", progress: 60 },
                  { name: "Ohm's Law Experiment", subject: "Physics", progress: 90 },
                  { name: "Beam Load Testing", subject: "Civil Eng", progress: 20 },
                ].map((lab, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#111111] border border-white/5 hover:border-white/10 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-black border border-white/10 flex items-center justify-center group-hover:bg-white/5 transition-colors">
                        <Play className="w-4 h-4 text-white ml-0.5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{lab.name}</div>
                        <div className="text-xs text-zinc-500">{lab.subject}</div>
                      </div>
                    </div>
                    <div className="w-24">
                      <div className="flex justify-end text-xs text-zinc-400 mb-1">{lab.progress}%</div>
                      <div className="h-1.5 w-full bg-black rounded-full overflow-hidden">
                        <div className="h-full bg-white" style={{ width: `${lab.progress}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* AI Assistant Banner */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6 relative overflow-hidden group border-white/10">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Stuck on a concept?</h3>
                  <p className="text-sm text-zinc-400 max-w-md">Our AI Tutor is available 24/7 to help you understand complex engineering concepts or debug your circuit designs.</p>
                </div>
                <Link href="/dashboard/ai-tutor" className="btn-primary text-sm px-5 py-2.5 whitespace-nowrap">
                  Ask AI Tutor
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Column (1/3) */}
          <div className="space-y-6">
            {/* Weekly Activity */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-6">
              <h3 className="text-base font-bold text-white mb-5">Weekly Activity</h3>
              <div className="flex items-end justify-between h-32 gap-2 mb-2">
                {[40, 70, 45, 90, 60, 30, 80].map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-[#111111] rounded-t-sm relative group cursor-pointer transition-all hover:bg-[#222222]" style={{ height: `${val}%` }}>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black border border-white/10 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                        {val}m
                      </div>
                    </div>
                    <span className="text-[10px] text-zinc-600 font-medium">{['M','T','W','T','F','S','S'][i]}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white">Achievements</h3>
                <span className="text-xs font-bold text-zinc-400">3/6</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {ACHIEVEMENTS.map((badge) => (
                  <div
                    key={badge.id}
                    title={badge.description}
                    className={`aspect-square rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                      badge.unlocked 
                        ? "bg-[#111111] border-white/20 shadow-sm" 
                        : "bg-transparent border-white/5 opacity-40 grayscale"
                    }`}
                  >
                    <span className="text-2xl">{badge.icon}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
