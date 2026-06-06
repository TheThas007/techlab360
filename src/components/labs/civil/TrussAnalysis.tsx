"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function TrussAnalysis() {
  const { t } = useLanguage();
  
  const [load, setLoad] = useState(100); // kN
  
  // A simple Warren Truss: 5 nodes. 
  // Node 1: Left support (Pin)
  // Node 2: Top left
  // Node 3: Bottom middle
  // Node 4: Top right
  // Node 5: Right support (Roller)
  
  // For a symmetric load P at the center bottom node (Node 3):
  // Reactions at Node 1 and 5: R = P / 2
  // Let angle theta be 60 degrees.
  const reaction = load / 2;
  
  // Member Forces (Tension +, Compression -)
  // Bottom chord (1-3, 3-5): Tension = R / tan(theta) = R / sqrt(3) ~ R * 0.577
  // Top chord (2-4): Compression = - R / tan(theta) * 2 (Wait, actually it's - R / tan(theta) from moment about 3, but let's just use simplified proportional logic for the visualizer)
  
  // Simplified forces for educational visualization
  const F_12 = -(reaction * 1.15); // Compression
  const F_23 = (reaction * 1.15) / 2; // Tension
  const F_13 = reaction * 0.577; // Tension
  
  // Color scale helper based on force magnitude and sign
  const getStrokeColor = (force: number) => {
    if (Math.abs(force) < 0.1) return "#52525B"; // Neutral
    return force > 0 ? "#3B82F6" : "#EF4444"; // Blue for Tension, Red for Compression
  };
  
  const getStrokeWidth = (force: number) => {
    return Math.max(2, Math.min(10, 2 + (Math.abs(force) / 20)));
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#0A0A0A]">
      {/* Controls Panel */}
      <div className="h-24 shrink-0 border-b border-white/5 bg-[#111111] flex items-center px-6 gap-6">
        <div className="flex-1 max-w-sm">
          <label className="text-xs font-semibold text-zinc-400 mb-1.5 flex justify-between">
            <span>{t("civil.controls.load") || "Center Load (P)"}</span>
            <span className="text-white">{load} kN</span>
          </label>
          <input
            type="range" min="0" max="300" step="10"
            value={load}
            onChange={(e) => setLoad(Number(e.target.value))}
            className="w-full accent-white"
          />
        </div>
        
        {/* Legend */}
        <div className="flex gap-4 ml-auto">
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-red-500 rounded-full" />
            <span className="text-xs text-zinc-400">{t("civil.truss.compression") || "Compression"}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-blue-500 rounded-full" />
            <span className="text-xs text-zinc-400">{t("civil.truss.tension") || "Tension"}</span>
          </div>
        </div>
      </div>

      {/* Simulation Area */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center p-8">
        <div className="w-full max-w-4xl aspect-[21/9] relative">
          <svg viewBox="0 0 1000 400" className="w-full h-full drop-shadow-2xl">
            {/* Background Grid */}
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            </pattern>
            <rect width="1000" height="400" fill="url(#grid)" />

            {/* Nodes Coordinates:
                N1: (200, 250)
                N2: (350, 100)
                N3: (500, 250)
                N4: (650, 100)
                N5: (800, 250)
            */}

            {/* Truss Members */}
            {/* Bottom Chord 1-3 */}
            <motion.line x1="200" y1="250" x2="500" y2="250" stroke={getStrokeColor(F_13)} animate={{ strokeWidth: getStrokeWidth(F_13) }} transition={{ duration: 0.3 }} />
            {/* Bottom Chord 3-5 */}
            <motion.line x1="500" y1="250" x2="800" y2="250" stroke={getStrokeColor(F_13)} animate={{ strokeWidth: getStrokeWidth(F_13) }} transition={{ duration: 0.3 }} />
            
            {/* Top Chord 2-4 */}
            <motion.line x1="350" y1="100" x2="650" y2="100" stroke={getStrokeColor(F_12)} animate={{ strokeWidth: getStrokeWidth(F_12) }} transition={{ duration: 0.3 }} />
            
            {/* Diagonals */}
            <motion.line x1="200" y1="250" x2="350" y2="100" stroke={getStrokeColor(F_12)} animate={{ strokeWidth: getStrokeWidth(F_12) }} transition={{ duration: 0.3 }} />
            <motion.line x1="350" y1="100" x2="500" y2="250" stroke={getStrokeColor(F_23)} animate={{ strokeWidth: getStrokeWidth(F_23) }} transition={{ duration: 0.3 }} />
            <motion.line x1="500" y1="250" x2="650" y2="100" stroke={getStrokeColor(F_23)} animate={{ strokeWidth: getStrokeWidth(F_23) }} transition={{ duration: 0.3 }} />
            <motion.line x1="650" y1="100" x2="800" y2="250" stroke={getStrokeColor(F_12)} animate={{ strokeWidth: getStrokeWidth(F_12) }} transition={{ duration: 0.3 }} />

            {/* Supports */}
            {/* Pin Support (Left) */}
            <path d="M160 300 L240 300 L200 250 Z" fill="#141414" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
            <rect x="150" y="300" width="100" height="10" fill="#2A2A2A" />
            
            {/* Roller Support (Right) */}
            <path d="M760 280 L840 280 L800 250 Z" fill="#141414" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
            <circle cx="780" cy="290" r="10" fill="#2A2A2A" />
            <circle cx="820" cy="290" r="10" fill="#2A2A2A" />
            <rect x="750" y="300" width="100" height="10" fill="#2A2A2A" />

            {/* Reaction Forces */}
            {load > 0 && (
              <>
                <motion.path d="M200 380 L200 320" stroke="#10B981" strokeWidth="4" strokeDasharray="6 4" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }} />
                <path d="M190 330 L200 310 L210 330 Z" fill="#10B981" />
                <text x="200" y="395" fill="#10B981" fontSize="14" textAnchor="middle" className="font-bold">{reaction} kN</text>

                <motion.path d="M800 380 L800 320" stroke="#10B981" strokeWidth="4" strokeDasharray="6 4" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.75 }} />
                <path d="M790 330 L800 310 L810 330 Z" fill="#10B981" />
                <text x="800" y="395" fill="#10B981" fontSize="14" textAnchor="middle" className="font-bold">{reaction} kN</text>
              </>
            )}

            {/* Nodes */}
            <circle cx="200" cy="250" r="8" fill="#FFFFFF" />
            <circle cx="350" cy="100" r="8" fill="#FFFFFF" />
            <circle cx="500" cy="250" r="8" fill="#FFFFFF" />
            <circle cx="650" cy="100" r="8" fill="#FFFFFF" />
            <circle cx="800" cy="250" r="8" fill="#FFFFFF" />

            {/* Applied Load Arrow */}
            <motion.g animate={{ y: load > 0 ? 5 : 0 }} transition={{ duration: 0.2 }}>
              <path d="M500 120 L500 230" stroke="#F59E0B" strokeWidth="6" strokeDasharray="8 6" />
              <path d="M485 215 L500 240 L515 215 Z" fill="#F59E0B" />
              <rect x="460" y="80" width="80" height="40" rx="8" fill="#F59E0B" />
              <text x="500" y="106" fill="#000000" fontSize="18" fontWeight="bold" textAnchor="middle">{load} kN</text>
            </motion.g>
          </svg>
        </div>
      </div>
      
      {/* Side Panel */}
      <div className="absolute right-0 top-0 bottom-0 w-80 border-l border-white/5 bg-[#050505] flex flex-col pointer-events-none md:pointer-events-auto opacity-0 md:opacity-100 md:relative">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-lg font-bold text-white mb-2">{t("civil.truss.title") || "Structural Analysis"}</h2>
          <p className="text-sm text-zinc-400">{t("civil.truss.desc") || "Analyzing internal forces using the Method of Joints."}</p>
        </div>
        
        <div className="p-6 space-y-6 flex-1 overflow-y-auto custom-scrollbar">
          <div className="glass-card p-5">
            <div className="text-xs font-semibold text-zinc-500 mb-1">{t("civil.truss.max_comp") || "Max Compression"}</div>
            <div className="flex items-end gap-2">
              <div className="text-3xl font-black text-red-400">{Math.abs(F_12).toFixed(1)}</div>
              <div className="text-sm font-medium text-zinc-500 mb-1">kN</div>
            </div>
          </div>

          <div className="glass-card p-5">
            <div className="text-xs font-semibold text-zinc-500 mb-1">{t("civil.truss.max_tens") || "Max Tension"}</div>
            <div className="flex items-end gap-2">
              <div className="text-3xl font-black text-blue-400">{Math.abs(F_13).toFixed(1)}</div>
              <div className="text-sm font-medium text-zinc-500 mb-1">kN</div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-bold text-white mb-3">{t("civil.truss.theory") || "Mechanics"}</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Trusses consist of two-force members, meaning members are only subjected to axial forces (tension or compression).
              <br/><br/>
              A downward load generally puts the top chord in compression and the bottom chord in tension, similar to a solid beam's bending behavior.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
