"use client";

import { ReactNode } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { cn } from "@/lib/utils";

interface LabLayoutProps {
  title: string;
  subtitle: string;
  experiments: { id: string; label: string }[];
  activeExp: string;
  onExpChange: (id: string) => void;
  children: ReactNode;
}

export default function LabLayout({
  title,
  subtitle,
  experiments,
  activeExp,
  onExpChange,
  children,
}: LabLayoutProps) {
  return (
    <div className="flex flex-col flex-1 overflow-hidden h-screen bg-[#000000]">
      <DashboardHeader title={title} subtitle={subtitle} />

      {/* Experiment Selector Bar */}
      <div className="border-b border-white/5 bg-[#050505] px-4 overflow-x-auto shrink-0 custom-scrollbar">
        <div className="flex gap-2 py-3">
          {experiments.map((exp) => (
            <button
              key={exp.id}
              id={`exp-${exp.id}`}
              onClick={() => onExpChange(exp.id)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200",
                exp.id === activeExp
                  ? "bg-white text-black shadow-sm"
                  : "text-zinc-500 hover:text-white hover:bg-white/5"
              )}
            >
              {exp.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area (Layout managed by individual lab pages now) */}
      <div className="flex flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
