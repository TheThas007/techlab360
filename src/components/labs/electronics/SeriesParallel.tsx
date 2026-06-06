"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function SeriesParallel() {
  const { t } = useLanguage();
  
  const [voltage, setVoltage] = useState(9);
  const [r1, setR1] = useState(100);
  const [r2, setR2] = useState(100);
  const [isSeries, setIsSeries] = useState(true);

  // Ohm's law calculation
  const totalResistance = isSeries ? r1 + r2 : (r1 * r2) / (r1 + r2);
  const totalCurrent = voltage / totalResistance;

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#0A0A0A]">
      {/* Controls Panel */}
      <div className="h-24 shrink-0 border-b border-white/5 bg-[#111111] flex items-center px-6 gap-6 overflow-x-auto">
        <div className="flex-1 min-w-[150px]">
          <label className="text-xs font-semibold text-zinc-400 mb-1.5 flex justify-between">
            <span>{t("electronics.controls.voltage") || "Voltage (V)"}</span>
            <span className="text-white">{voltage} V</span>
          </label>
          <input
            type="range" min="1" max="24" step="1"
            value={voltage}
            onChange={(e) => setVoltage(Number(e.target.value))}
            className="w-full accent-white"
          />
        </div>
        <div className="flex-1 min-w-[150px]">
          <label className="text-xs font-semibold text-zinc-400 mb-1.5 flex justify-between">
            <span>{t("electronics.controls.r1") || "Resistor 1 (R1)"}</span>
            <span className="text-white">{r1} Ω</span>
          </label>
          <input
            type="range" min="10" max="500" step="10"
            value={r1}
            onChange={(e) => setR1(Number(e.target.value))}
            className="w-full accent-white"
          />
        </div>
        <div className="flex-1 min-w-[150px]">
          <label className="text-xs font-semibold text-zinc-400 mb-1.5 flex justify-between">
            <span>{t("electronics.controls.r2") || "Resistor 2 (R2)"}</span>
            <span className="text-white">{r2} Ω</span>
          </label>
          <input
            type="range" min="10" max="500" step="10"
            value={r2}
            onChange={(e) => setR2(Number(e.target.value))}
            className="w-full accent-white"
          />
        </div>
        <div className="flex shrink-0 items-center justify-center pt-5">
          <button
            onClick={() => setIsSeries(!isSeries)}
            className="px-6 py-2 rounded-lg bg-white text-black font-semibold hover:bg-zinc-200 transition-colors"
          >
            {t("electronics.controls.toggle") || "Toggle:"} {isSeries ? (t("electronics.controls.series") || "Series") : (t("electronics.controls.parallel") || "Parallel")}
          </button>
        </div>
      </div>

      {/* Simulation Area */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center p-8">
        <div className="w-full max-w-3xl aspect-[4/3] relative">
          <svg viewBox="0 0 800 600" className="w-full h-full drop-shadow-2xl">
            {/* Background Grid */}
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            </pattern>
            <rect width="800" height="600" fill="url(#grid)" />

            {/* Circuit Path */}
            {isSeries ? (
              <>
                <path d="M 200 400 L 200 200 L 600 200 L 600 400 Z" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                
                {/* Resistor 1 */}
                <g transform="translate(300, 200)">
                  <rect x="-30" y="-15" width="60" height="30" fill="#111" stroke="#fff" strokeWidth="2" />
                  <text x="0" y="5" fill="#fff" fontSize="14" textAnchor="middle">{r1}Ω</text>
                </g>
                
                {/* Resistor 2 */}
                <g transform="translate(500, 200)">
                  <rect x="-30" y="-15" width="60" height="30" fill="#111" stroke="#fff" strokeWidth="2" />
                  <text x="0" y="5" fill="#fff" fontSize="14" textAnchor="middle">{r2}Ω</text>
                </g>
              </>
            ) : (
              <>
                <path d="M 200 400 L 200 100 L 600 100 L 600 400 Z" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                <path d="M 200 300 L 600 300" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                
                {/* Resistor 1 */}
                <g transform="translate(400, 100)">
                  <rect x="-30" y="-15" width="60" height="30" fill="#111" stroke="#fff" strokeWidth="2" />
                  <text x="0" y="5" fill="#fff" fontSize="14" textAnchor="middle">{r1}Ω</text>
                </g>
                
                {/* Resistor 2 */}
                <g transform="translate(400, 300)">
                  <rect x="-30" y="-15" width="60" height="30" fill="#111" stroke="#fff" strokeWidth="2" />
                  <text x="0" y="5" fill="#fff" fontSize="14" textAnchor="middle">{r2}Ω</text>
                </g>
              </>
            )}

            {/* Battery */}
            <g transform="translate(400, 400)">
              <rect x="-40" y="-20" width="80" height="40" fill="#222" stroke="#fff" strokeWidth="2" rx="4" />
              <text x="0" y="5" fill="#fff" fontSize="16" fontWeight="bold" textAnchor="middle">{voltage}V</text>
              {/* Positive / Negative */}
              <path d="M 50 -20 L 50 20" stroke="#fff" strokeWidth="4" />
              <path d="M -50 -10 L -50 10" stroke="#fff" strokeWidth="4" />
            </g>

            {/* Current Animation */}
            <motion.circle
              r="6" fill="#fff"
              animate={isSeries 
                ? { cx: [200, 200, 600, 600, 200], cy: [400, 200, 200, 400, 400] }
                : { cx: [200, 200, 600, 600, 200], cy: [400, 100, 100, 400, 400] }
              }
              transition={{ duration: 1 / Math.max(0.01, totalCurrent), repeat: Infinity, ease: "linear" }}
            />
          </svg>
        </div>
      </div>
      
      {/* Side Panel */}
      <div className="absolute right-0 top-0 bottom-0 w-80 border-l border-white/5 bg-[#050505] flex flex-col pointer-events-none md:pointer-events-auto opacity-0 md:opacity-100 md:relative">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-lg font-bold text-white mb-2">{t("electronics.sp.title") || "Calculations"}</h2>
          <p className="text-sm text-zinc-400">{t("electronics.sp.desc") || "Total resistance and current in the active circuit."}</p>
        </div>
        
        <div className="p-6 space-y-6 flex-1 overflow-y-auto custom-scrollbar">
          <div className="glass-card p-5 relative overflow-hidden">
            <div className="text-xs font-semibold text-zinc-500 mb-1">{t("electronics.sp.req") || "Total Resistance (Req)"}</div>
            <div className="flex items-end gap-2">
              <div className="text-3xl font-black text-white">{totalResistance.toFixed(1)}</div>
              <div className="text-sm font-medium text-zinc-500 mb-1">Ω</div>
            </div>
          </div>

          <div className="glass-card p-5">
            <div className="text-xs font-semibold text-zinc-500 mb-1">{t("electronics.sp.current") || "Total Current (I)"}</div>
            <div className="flex items-end gap-2">
              <div className="text-2xl font-bold text-white">{totalCurrent.toFixed(3)}</div>
              <div className="text-xs font-medium text-zinc-500 mb-1.5">A</div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-bold text-white mb-3">{t("physics.calculations.formulas") || "Formulas"}</h3>
            <div className="space-y-3 font-mono text-sm">
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/10 text-white">
                <span>R_eq = {isSeries ? "R1 + R2" : "(R1 × R2) / (R1 + R2)"}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/10 text-white">
                <span>I = V / R_eq</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
