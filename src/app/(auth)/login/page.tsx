"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FlaskConical, MoveRight, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 sm:p-10"
    >
      <div className="flex justify-center mb-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
            <FlaskConical className="w-6 h-6 text-black" />
          </div>
        </Link>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Welcome back</h1>
        <p className="text-sm text-zinc-400">Enter your details to access your labs.</p>
      </div>

      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); window.location.href = '/dashboard'; }}>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-zinc-300">Email</label>
          <div className="relative">
            <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="email"
              placeholder="student@university.edu"
              required
              className="w-full bg-[#111111] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-all placeholder:text-zinc-600"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-300">Password</label>
            <a href="#" className="text-xs text-zinc-500 hover:text-white transition-colors">Forgot password?</a>
          </div>
          <div className="relative">
            <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="password"
              placeholder="••••••••"
              required
              className="w-full bg-[#111111] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-all placeholder:text-zinc-600"
            />
          </div>
        </div>

        <button type="submit" className="w-full btn-primary py-3 flex items-center justify-center gap-2 mt-6">
          Sign In
          <MoveRight className="w-4 h-4" />
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-zinc-500">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-white font-medium hover:underline">
          Sign up
        </Link>
      </div>
    </motion.div>
  );
}
