"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, AlertCircle, Plus } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

const ASSIGNMENTS = [
  { id: 1, title: "Ohm's Law Lab Report", subject: "Electronics", due: "Tomorrow", status: "pending", priority: "high", desc: "Complete the circuit experiment report with V-I characteristics graph" },
  { id: 2, title: "Engine Disassembly Analysis", subject: "Automobile", due: "Dec 15", status: "in-progress", priority: "medium", desc: "Document engine component identification and functions" },
  { id: 3, title: "Beam Design Calculation", subject: "Civil Eng", due: "Dec 18", status: "pending", priority: "medium", desc: "Design a simply supported beam for given load conditions per IS 456" },
  { id: 4, title: "Chemical Equilibrium Study", subject: "Chemistry", due: "Dec 20", status: "completed", priority: "low", desc: "Analyze Le Chatelier's principle with reaction examples" },
  { id: 5, title: "Newton's Laws Problems", subject: "Physics", due: "Dec 22", status: "completed", priority: "low", desc: "Solve 10 numericals on Newton's laws of motion" },
  { id: 6, title: "Concrete Mix Design", subject: "Civil Eng", due: "Dec 25", status: "pending", priority: "high", desc: "Calculate M25 grade concrete mix proportions using IS 10262" },
];

// Map status to simple B&W styles
const STATUS_CONFIG = {
  pending: { label: "Pending", icon: Clock },
  "in-progress": { label: "In Progress", icon: AlertCircle },
  completed: { label: "Completed", icon: CheckCircle2 },
};

// Map priority to B&W opacity levels
const PRIORITY_COLORS = {
  high: "bg-white text-black border-white",
  medium: "bg-[#222222] text-white border-white/20",
  low: "bg-transparent text-zinc-400 border-white/10",
};

export default function AssignmentsPage() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? ASSIGNMENTS : ASSIGNMENTS.filter(a => a.status === filter);
  const pending = ASSIGNMENTS.filter(a => a.status === "pending").length;
  const inProgress = ASSIGNMENTS.filter(a => a.status === "in-progress").length;
  const completed = ASSIGNMENTS.filter(a => a.status === "completed").length;

  return (
    <div className="flex flex-col flex-1 overflow-auto bg-[#000000]">
      <DashboardHeader title="Assignments" subtitle="Track your lab reports and homework" />

      <div className="p-6 space-y-5 max-w-7xl mx-auto w-full">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Pending", count: pending },
            { label: "In Progress", count: inProgress },
            { label: "Completed", count: completed },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-4 text-center"
            >
              <div className={`text-3xl font-black mb-1 text-white`}>{s.count}</div>
              <div className="text-xs text-zinc-500">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {["all", "pending", "in-progress", "completed"].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                  filter === f ? "bg-white text-black" : "text-zinc-500 hover:text-white hover:bg-white/5"
                }`}
              >
                {f.replace("-", " ")}
              </button>
            ))}
          </div>
          <button className="btn-primary text-xs flex items-center gap-1.5 px-3 py-2">
            <Plus className="w-3.5 h-3.5" />
            Add Task
          </button>
        </div>

        {/* Assignment List */}
        <div className="space-y-3">
          {filtered.map((assignment, i) => {
            const status = STATUS_CONFIG[assignment.status as keyof typeof STATUS_CONFIG];
            const StatusIcon = status.icon;
            return (
              <motion.div
                key={assignment.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card-hover p-5 flex items-start gap-4"
              >
                <div className={`w-10 h-10 rounded-xl bg-[#111111] border border-white/5 flex items-center justify-center shrink-0 mt-0.5`}>
                  <StatusIcon className={`w-5 h-5 text-white`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h3 className="text-sm font-bold text-white">{assignment.title}</h3>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${PRIORITY_COLORS[assignment.priority as keyof typeof PRIORITY_COLORS]}`}>
                        {assignment.priority}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-500 mb-3">{assignment.desc}</p>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-zinc-400">{assignment.subject}</span>
                    <span className="text-xs text-zinc-400">Due: {assignment.due}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border bg-[#111111] border-white/10 text-white`}>
                      {status.label}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
