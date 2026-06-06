"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FlaskConical, MoveRight, Mail, Lock, User, Building } from "lucide-react";

export default function SignupPage() {
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
        <h1 className="text-2xl font-bold text-white mb-2">Create an account</h1>
        <p className="text-sm text-zinc-400">Join 50,000+ students learning engineering.</p>
      </div>

      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); window.location.href = '/dashboard'; }}>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-zinc-300">First Name</label>
            <div className="relative">
              <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                placeholder="John"
                required
                className="w-full bg-[#111111] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-all placeholder:text-zinc-600"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-zinc-300">Last Name</label>
            <input
              type="text"
              placeholder="Doe"
              required
              className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-all placeholder:text-zinc-600"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-zinc-300">University</label>
          <div className="relative">
            <Building className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Stanford University"
              required
              className="w-full bg-[#111111] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-all placeholder:text-zinc-600"
            />
          </div>
        </div>

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
          <label className="text-sm font-medium text-zinc-300">Password</label>
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
          Create Account
          <MoveRight className="w-4 h-4" />
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-zinc-500">
        Already have an account?{" "}
        <Link href="/login" className="text-white font-medium hover:underline">
          Sign in
        </Link>
      </div>
    </motion.div>
  );
}
