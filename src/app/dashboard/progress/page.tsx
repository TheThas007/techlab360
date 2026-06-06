"use client";

import { motion } from "framer-motion";
import { TrendingUp, Award, Calendar, Target } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

const SUBJECT_DATA = [
  { label: "Physics", progress: 88, experiments: 12, quizScore: 91 },
  { label: "Automobile", progress: 72, experiments: 8, quizScore: 78 },
  { label: "Civil Eng", progress: 45, experiments: 5, quizScore: 62 },
  { label: "Chemistry", progress: 33, experiments: 3, quizScore: 55 },
  { label: "Electronics", progress: 10, experiments: 1, quizScore: 20 },
];

const MONTHLY_DATA = [22, 35, 28, 45, 38, 52, 48, 61, 55, 70, 65, 78];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const STREAK_CALENDAR = Array.from({ length: 35 }, (_, i) => ({
  active: Math.random() > 0.3 && i < 28,
  today: i === 27,
}));

export default function ProgressPage() {
  const overallProgress = Math.round(SUBJECT_DATA.reduce((s, x) => s + x.progress, 0) / SUBJECT_DATA.length);

  return (
    <div className="flex flex-col flex-1 overflow-auto bg-[#000000]">
      <DashboardHeader title="Progress Tracking" subtitle="Your learning journey analytics" />

      <div className="p-6 space-y-5 max-w-7xl mx-auto w-full">
        {/* Top Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Overall Progress", value: `${overallProgress}%`, icon: TrendingUp },
            { label: "Experiments Done", value: "29", icon: Target },
            { label: "Study Streak", value: "14 days", icon: Calendar },
            { label: "Badges Earned", value: "3 / 6", icon: Award },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="glass-card p-5"
              >
                <div className={`w-10 h-10 rounded-xl bg-[#111111] border border-white/10 flex items-center justify-center mb-3`}>
                  <Icon className={`w-5 h-5 text-white`} />
                </div>
                <div className={`text-2xl font-black text-white mb-0.5`}>{stat.value}</div>
                <div className="text-xs text-zinc-500">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Subject Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <h3 className="text-base font-bold text-white mb-5">Subject Performance</h3>
          <div className="grid sm:grid-cols-2 gap-5">
            {SUBJECT_DATA.map((s, i) => (
              <div key={s.label} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`text-sm font-bold text-white`}>{s.label}</div>
                    <div className="text-xs text-zinc-500">{s.experiments} experiments · Quiz: {s.quizScore}%</div>
                  </div>
                  <div className={`text-2xl font-black text-white`}>{s.progress}%</div>
                </div>
                <div className="h-2.5 bg-[#111111] border border-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.progress}%` }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                    className={`h-full rounded-full bg-white`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Row */}
        <div className="grid lg:grid-cols-2 gap-5">
          {/* Monthly Progress Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <h3 className="text-base font-bold text-white mb-5">Progress Over Time</h3>
            <div className="flex items-end gap-1.5 h-28">
              {MONTHLY_DATA.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(val / 80) * 100}px` }}
                    transition={{ duration: 0.6, delay: 0.05 * i }}
                    className={`w-full rounded-t-sm transition-colors ${i === 11 ? "bg-white" : "bg-[#222222] group-hover:bg-[#333333]"}`}
                  />
                  <span className={`text-[9px] ${i === 11 ? "text-white font-bold" : "text-zinc-600"}`}>{MONTHS[i].slice(0, 1)}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Study Streak Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-white">Study Streak</h3>
              <span className="text-sm font-bold text-white">🔥 14 days</span>
            </div>
            <div className="grid grid-cols-7 gap-1.5">
              {["M","T","W","T","F","S","S"].map((d, i) => (
                <div key={i} className="text-center text-[10px] text-zinc-600 mb-1">{d}</div>
              ))}
              {STREAK_CALENDAR.map((day, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-[4px] ${
                    day.today
                      ? "bg-white"
                      : day.active
                      ? "bg-[#333333]"
                      : "bg-[#111111]"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-4 mt-4 text-xs text-zinc-500">
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-[#333333]"/><span>Active</span></div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-white"/><span>Today</span></div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-[#111111]"/><span>Inactive</span></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
