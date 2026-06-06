"use client";

import { motion } from "framer-motion";
import { User, Mail, BookOpen, Award, Settings, Bell, Shield, Camera } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function ProfilePage() {
  return (
    <div className="flex flex-col flex-1 overflow-auto bg-[#000000]">
      <DashboardHeader title="Profile" subtitle="Manage your account and preferences" />
      <div className="p-6 space-y-5 max-w-3xl mx-auto w-full">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center text-3xl font-black text-black">
                T
              </div>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg bg-[#111111] border border-white/20 flex items-center justify-center text-zinc-400 hover:text-white transition-colors shadow-lg">
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-xl font-black text-white mb-1">Thasmilan</h2>
              <p className="text-zinc-500 text-sm mb-3">Engineering Technology Student</p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#111111] border border-white/10 text-white">Physics</span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#111111] border border-white/10 text-white">Civil Eng</span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#111111] border border-white/10 text-white">Automobile</span>
              </div>
            </div>
            <button className="btn-secondary text-sm flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </motion.div>

        {/* Info Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: Mail, label: "Email", value: "thasmilan@student.edu" },
            { icon: BookOpen, label: "Program", value: "Technology Stream" },
            { icon: User, label: "Student ID", value: "TS-2024-001" },
            { icon: Award, label: "Level", value: "Intermediate Learner" },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="glass-card p-4 flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-[#111111] border border-white/5 flex items-center justify-center shrink-0">
                  <Icon className={`w-4 h-4 text-white`} />
                </div>
                <div>
                  <div className="text-xs text-zinc-500 mb-0.5">{item.label}</div>
                  <div className="text-sm font-semibold text-white">{item.value}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6"
        >
          <h3 className="text-sm font-bold text-white mb-4">Preferences</h3>
          <div className="space-y-4">
            {[
              { icon: Bell, label: "Email Notifications", desc: "Receive updates about new labs", enabled: true },
              { icon: Shield, label: "Two-Factor Auth", desc: "Secure your account", enabled: false },
              { icon: BookOpen, label: "Study Reminders", desc: "Daily learning reminders", enabled: true },
            ].map((pref, i) => {
              const Icon = pref.icon;
              return (
                <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-zinc-500" />
                    <div>
                      <div className="text-sm font-medium text-white">{pref.label}</div>
                      <div className="text-xs text-zinc-500">{pref.desc}</div>
                    </div>
                  </div>
                  <button className={`w-10 h-5 rounded-full transition-all duration-200 relative ${pref.enabled ? "bg-white" : "bg-[#222222]"}`}>
                    <div className={`w-4 h-4 rounded-full absolute top-0.5 transition-all duration-200 ${pref.enabled ? "bg-black right-0.5" : "bg-zinc-500 left-0.5"}`} />
                  </button>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
