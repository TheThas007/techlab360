"use client";

import { Bell, Search } from "lucide-react";

export default function DashboardHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="h-20 shrink-0 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-6">
      <div>
        <h1 className="text-xl font-bold text-white">{title}</h1>
        {subtitle && <p className="text-xs text-zinc-500 mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden md:flex relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search labs, notes..."
            className="bg-[#111111] border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-sm text-white focus:outline-none focus:border-white/20 w-64 transition-all"
          />
        </div>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-full bg-[#111111] border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2.5 w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        </button>
      </div>
    </header>
  );
}
