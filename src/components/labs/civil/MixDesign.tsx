"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function MixDesign() {
  const { t } = useLanguage();
  
  // Mix parameters
  const [grade, setGrade] = useState("M20");
  const [waterCementRatio, setWaterCementRatio] = useState(0.5);

  // Define mix proportions (Cement : Sand : Aggregate)
  const mixes: Record<string, { c: number; s: number; a: number }> = {
    "M10": { c: 1, s: 3, a: 6 },
    "M15": { c: 1, s: 2, a: 4 },
    "M20": { c: 1, s: 1.5, a: 3 },
    "M25": { c: 1, s: 1, a: 2 },
  };

  const currentMix = mixes[grade];
  const totalParts = currentMix.c + currentMix.s + currentMix.a;
  
  // Calculate relative heights for the visualizer
  const cementHeight = (currentMix.c / totalParts) * 100;
  const sandHeight = (currentMix.s / totalParts) * 100;
  const aggregateHeight = (currentMix.a / totalParts) * 100;

  // Water volume representation (approximate based on w/c ratio)
  const waterHeight = cementHeight * waterCementRatio;

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-0 bg-[#0A0A0A] overflow-y-auto custom-scrollbar md:overflow-hidden">
      <div className="flex-1 flex flex-col min-w-0">
      {/* Controls Panel */}
      <div className="min-h-[6rem] shrink-0 border-b border-white/5 bg-[#111111] flex items-center px-4 md:px-6 gap-4 md:gap-6 overflow-x-auto overflow-x-auto">
        <div className="flex-1 min-w-[200px]">
          <label className="text-xs font-semibold text-zinc-400 mb-1.5 flex justify-between">
            <span>{t("civil.controls.grade") || "Concrete Grade"}</span>
            <span className="text-white">{grade}</span>
          </label>
          <select 
            className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/20"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          >
            <option value="M10">M10 (1:3:6)</option>
            <option value="M15">M15 (1:2:4)</option>
            <option value="M20">M20 (1:1.5:3)</option>
            <option value="M25">M25 (1:1:2)</option>
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="text-xs font-semibold text-zinc-400 mb-1.5 flex justify-between">
            <span>{t("civil.controls.wc_ratio") || "Water/Cement Ratio"}</span>
            <span className="text-white">{waterCementRatio.toFixed(2)}</span>
          </label>
          <input
            type="range" min="0.35" max="0.65" step="0.05"
            value={waterCementRatio}
            onChange={(e) => setWaterCementRatio(Number(e.target.value))}
            className="w-full accent-white"
          />
        </div>
      </div>

      {/* Simulation Area */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center min-h-[400px] md:min-h-0 p-8">
        <div className="w-full max-w-lg aspect-square relative flex items-center justify-center">
          
          <svg viewBox="0 0 400 400" className="w-full h-full max-w-[300px]">
            {/* Measuring Cylinder / Bucket */}
            <path d="M100 50 L100 350 A 50 20 0 0 0 300 350 L300 50" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="8" />
            <ellipse cx="200" cy="350" rx="100" ry="20" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
            <ellipse cx="200" cy="50" rx="100" ry="20" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="8" strokeDasharray="5 5" />

            {/* Clipping path for contents */}
            <defs>
              <clipPath id="bucketClip">
                <path d="M100 50 L100 350 A 50 20 0 0 0 300 350 L300 50 Z" />
              </clipPath>
            </defs>

            <g clipPath="url(#bucketClip)">
              {/* Aggregate Layer */}
              <motion.rect 
                x="100" width="200" fill="#52525B"
                initial={false}
                animate={{ 
                  y: 350 - (aggregateHeight * 2.8),
                  height: aggregateHeight * 2.8
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
              
              {/* Sand Layer */}
              <motion.rect 
                x="100" width="200" fill="#A1A1AA"
                initial={false}
                animate={{ 
                  y: 350 - ((aggregateHeight + sandHeight) * 2.8),
                  height: sandHeight * 2.8
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />

              {/* Cement Layer */}
              <motion.rect 
                x="100" width="200" fill="#D4D4D8"
                initial={false}
                animate={{ 
                  y: 350 - ((aggregateHeight + sandHeight + cementHeight) * 2.8),
                  height: cementHeight * 2.8
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />

              {/* Water Overlay (semi-transparent blue) */}
              <motion.rect 
                x="100" width="200" fill="rgba(56, 189, 248, 0.4)"
                initial={false}
                animate={{ 
                  y: 350 - ((aggregateHeight + sandHeight + cementHeight) * 2.8),
                  height: waterHeight * 2.8
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </g>

            {/* Labels pointing to layers */}
            <motion.g animate={{ y: 350 - (aggregateHeight * 1.4) }} transition={{ duration: 0.5 }}>
              <line x1="310" y1="0" x2="350" y2="0" stroke="#FFFFFF" strokeWidth="2" />
              <text x="360" y="5" fill="#FFFFFF" fontSize="14">Aggregate</text>
            </motion.g>

            <motion.g animate={{ y: 350 - (aggregateHeight * 2.8) - (sandHeight * 1.4) }} transition={{ duration: 0.5 }}>
              <line x1="310" y1="0" x2="350" y2="0" stroke="#FFFFFF" strokeWidth="2" />
              <text x="360" y="5" fill="#FFFFFF" fontSize="14">Sand</text>
            </motion.g>

            <motion.g animate={{ y: 350 - ((aggregateHeight + sandHeight) * 2.8) - (cementHeight * 1.4) }} transition={{ duration: 0.5 }}>
              <line x1="310" y1="0" x2="350" y2="0" stroke="#FFFFFF" strokeWidth="2" />
              <text x="360" y="5" fill="#FFFFFF" fontSize="14">Cement</text>
            </motion.g>

            {/* Scale markings */}
            <g opacity="0.3">
              {[0, 25, 50, 75, 100].map(mark => (
                <line key={mark} x1="90" y1={350 - (mark * 2.8)} x2="100" y2={350 - (mark * 2.8)} stroke="#FFF" strokeWidth="2" />
              ))}
            </g>
          </svg>

        </div>
      </div>
      
      </div>
      
      {/* Side Panel */}
      <div className="w-full md:w-80 shrink-0 border-t md:border-t-0 md:border-l border-white/5 bg-[#050505] flex flex-col">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-lg font-bold text-white mb-2">{t("civil.mix.title") || "Mix Proportions"}</h2>
          <p className="text-sm text-zinc-400">{t("civil.mix.desc") || "Standard nominal mix design ratios for concrete."}</p>
        </div>
        
        <div className="p-6 space-y-6 flex-1 overflow-y-auto custom-scrollbar">
          <div className="glass-card p-5">
            <div className="text-xs font-semibold text-zinc-500 mb-1">{t("civil.mix.ratio") || "Nominal Ratio"}</div>
            <div className="flex items-end gap-2">
              <div className="text-3xl font-black text-white">1 : {currentMix.s} : {currentMix.a}</div>
            </div>
            <div className="mt-2 text-xs text-zinc-400">Cement : Sand : Aggregate</div>
          </div>

          <div className="glass-card p-5">
            <div className="text-xs font-semibold text-zinc-500 mb-1">{t("civil.mix.strength") || "Compressive Strength (28 days)"}</div>
            <div className="flex items-end gap-2">
              <div className="text-3xl font-black text-white">{grade.replace("M", "")}</div>
              <div className="text-sm font-medium text-zinc-500 mb-1">N/mm² (MPa)</div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-bold text-white mb-3">{t("civil.mix.theory") || "Theory"}</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              The M stands for Mix, and the number signifies the characteristic compressive strength of the concrete in N/mm² at 28 days.
              <br/><br/>
              A higher water-cement ratio increases workability but significantly decreases the final strength of the concrete.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
