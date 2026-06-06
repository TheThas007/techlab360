"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function OhmsLaw() {
  const { t } = useLanguage();
  
  const [voltage, setVoltage] = useState(12);
  const [resistance, setResistance] = useState(100);

  const current = voltage / resistance;
  const power = voltage * current;

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-0 bg-[#0A0A0A] overflow-y-auto custom-scrollbar md:overflow-hidden">
      <div className="flex-1 flex flex-col min-w-0">
      {/* Controls Panel */}
      <div className="min-h-[6rem] shrink-0 border-b border-white/5 bg-[#111111] flex items-center px-4 md:px-6 gap-4 md:gap-6 overflow-x-auto overflow-x-auto">
        <div className="flex-1 min-w-[200px] max-w-xs">
          <label className="text-xs font-semibold text-zinc-400 mb-1.5 flex justify-between">
            <span>{t("physics.controls.voltage") || "Voltage (V)"}</span>
            <span className="text-white">{voltage} V</span>
          </label>
          <input
            type="range" min="1" max="24" step="1"
            value={voltage}
            onChange={(e) => setVoltage(Number(e.target.value))}
            className="w-full accent-white"
          />
        </div>
        <div className="flex-1 min-w-[200px] max-w-xs">
          <label className="text-xs font-semibold text-zinc-400 mb-1.5 flex justify-between">
            <span>{t("physics.controls.resistance") || "Resistance (R)"}</span>
            <span className="text-white">{resistance} Ω</span>
          </label>
          <input
            type="range" min="10" max="500" step="10"
            value={resistance}
            onChange={(e) => setResistance(Number(e.target.value))}
            className="w-full accent-white"
          />
        </div>
      </div>

      {/* Simulation Area */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center min-h-[400px] md:min-h-0 p-8">
        <div className="w-full max-w-3xl aspect-video relative">
          <svg viewBox="0 0 800 600" className="w-full h-full drop-shadow-2xl">
            {/* Background Grid */}
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            </pattern>
            <rect width="800" height="600" fill="url(#grid)" />

            {/* Wire Path */}
            <path d="M200 400 L200 200 L600 200 L600 400 Z" fill="none" stroke="#2A2A2A" strokeWidth="8" />

            {/* Animated Current (Electrons) */}
            <motion.path
              d="M200 400 L200 200 L600 200 L600 400"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeDasharray="15 20"
              animate={{ strokeDashoffset: [0, -70] }}
              transition={{ duration: 1 / current, repeat: Infinity, ease: "linear" }}
            />

            {/* Battery Source */}
            <g transform="translate(160, 360)">
              <rect x="0" y="0" width="80" height="80" rx="8" fill="#141414" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
              <rect x="25" y="-10" width="30" height="10" fill="#2A2A2A" />
              <text x="40" y="45" fill="#FFFFFF" fontSize="20" fontWeight="bold" textAnchor="middle">{voltage}V</text>
            </g>

            {/* Resistor Component */}
            <g transform="translate(360, 180)">
              <rect x="0" y="0" width="80" height="40" fill="#1A1A1A" stroke="rgba(255,255,255,0.5)" strokeWidth="4" />
              <path d="M10 20 l10 -10 l10 20 l10 -20 l10 20 l10 -10 l10 10" fill="none" stroke="#FFFFFF" strokeWidth="2" />
              <text x="40" y="-15" fill="#FFFFFF" fontSize="16" fontWeight="bold" textAnchor="middle">{resistance}Ω</text>
            </g>

            {/* Light Bulb (Brightness based on power) */}
            <g transform="translate(560, 320)">
              <path d="M20 80 L60 80 L60 100 L20 100 Z" fill="#2A2A2A" />
              <path d="M30 100 L50 100 L45 110 L35 110 Z" fill="#52525B" />
              
              {/* Bulb Glass */}
              <circle cx="40" cy="40" r="40" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
              
              {/* Filament */}
              <path d="M25 80 L30 50 L40 30 L50 50 L55 80" fill="none" stroke="#52525B" strokeWidth="2" />
              
              {/* Glow Effect */}
              <motion.circle 
                cx="40" cy="40" r="40" 
                fill="#FFFFFF"
                style={{ opacity: Math.min(power / 2.8, 1) * 0.8 }}
              />
              <motion.circle 
                cx="40" cy="40" r="60" 
                fill="#FFFFFF"
                style={{ opacity: Math.min(power / 2.8, 1) * 0.3 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </g>

            {/* Labels */}
            <text x="400" y="500" fill="#A1A1AA" fontSize="18" textAnchor="middle">{t("physics.calculations.current_flow") || "Current Flow"}: {current.toFixed(2)} A</text>
          </svg>
        </div>
      </div>
      
      </div>
      
      {/* Side Panel */}
      <div className="w-full md:w-80 shrink-0 border-t md:border-t-0 md:border-l border-white/5 bg-[#050505] flex flex-col">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-lg font-bold text-white mb-2">{t("physics.calculations.title") || "Calculations"}</h2>
          <p className="text-sm text-zinc-400">{t("physics.calculations.desc") || "Live readings from the circuit simulation based on Ohm's Law."}</p>
        </div>
        
        <div className="p-6 space-y-6 flex-1 overflow-y-auto custom-scrollbar">
          <div className="glass-card p-5">
            <div className="text-xs font-semibold text-zinc-500 mb-1">{t("physics.calculations.current") || "Current (I = V/R)"}</div>
            <div className="text-3xl font-black text-white">{current.toFixed(3)} <span className="text-sm font-medium text-zinc-500">{t("physics.calculations.amps") || "Amps"}</span></div>
          </div>

          <div className="glass-card p-5">
            <div className="text-xs font-semibold text-zinc-500 mb-1">{t("physics.calculations.power") || "Power (P = V×I)"}</div>
            <div className="text-3xl font-black text-white">{power.toFixed(2)} <span className="text-sm font-medium text-zinc-500">{t("physics.calculations.watts") || "Watts"}</span></div>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-bold text-white mb-3">{t("physics.calculations.formulas") || "Formulas"}</h3>
            <div className="space-y-3 font-mono text-sm">
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/10 text-zinc-300">
                <span>V = I × R</span>
                <span className="text-xs text-zinc-500">Voltage</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/10 text-white border-white/20">
                <span>I = V / R</span>
                <span className="text-xs text-zinc-400">Current</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/10 text-zinc-300">
                <span>P = V × I</span>
                <span className="text-xs text-zinc-500">Power</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
