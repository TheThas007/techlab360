"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const REACTIONS = [
  { id: "r1", label: "A + B → C (Exothermic)", dH: -50, Ea: 40 },
  { id: "r2", label: "X + Y → Z (Endothermic)", dH: 80, Ea: 120 },
];

export default function ChemicalKinetics() {
  const { t } = useLanguage();
  
  const [temperature, setTemperature] = useState(298); // Kelvin
  const [concentration, setConcentration] = useState(1.0); // Molar
  const [reaction, setReaction] = useState(REACTIONS[0]);

  // Simplified Arrhenius Equation calculation for demo
  // k = A * e^(-Ea / RT)
  const R = 8.314; // J/(mol·K)
  const A = Math.pow(10, 11);
  const Ea_Joules = reaction.Ea * 1000;
  
  const rateConstant = A * Math.exp(-Ea_Joules / (R * temperature));
  const reactionRate = rateConstant * concentration;
  
  // Visual mapping for animation speed
  const bubbleSpeed = Math.max(0.2, 5 / Math.max(1, reactionRate * 100));
  const bubbleCount = Math.min(30, Math.max(5, Math.floor(reactionRate * 5000)));

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#0A0A0A]">
      {/* Controls Panel */}
      <div className="h-24 shrink-0 border-b border-white/5 bg-[#111111] flex items-center px-6 gap-6 overflow-x-auto">
        <div className="flex-1 min-w-[200px]">
          <label className="text-xs font-semibold text-zinc-400 mb-1.5 flex justify-between">
            <span>{t("chemistry.controls.reaction") || "Reaction Type"}</span>
          </label>
          <select 
            className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/20"
            value={reaction.id}
            onChange={(e) => setReaction(REACTIONS.find(r => r.id === e.target.value) || REACTIONS[0])}
          >
            {REACTIONS.map(r => (
              <option key={r.id} value={r.id}>{r.label}</option>
            ))}
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="text-xs font-semibold text-zinc-400 mb-1.5 flex justify-between">
            <span>{t("chemistry.controls.temp") || "Temperature (T)"}</span>
            <span className="text-white">{temperature} K</span>
          </label>
          <input
            type="range" min="273" max="500" step="5"
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            className="w-full accent-white"
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="text-xs font-semibold text-zinc-400 mb-1.5 flex justify-between">
            <span>{t("chemistry.controls.concentration") || "Concentration [A]"}</span>
            <span className="text-white">{concentration.toFixed(1)} M</span>
          </label>
          <input
            type="range" min="0.1" max="5.0" step="0.1"
            value={concentration}
            onChange={(e) => setConcentration(Number(e.target.value))}
            className="w-full accent-white"
          />
        </div>
      </div>

      {/* Simulation Area */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center p-8">
        <div className="w-full max-w-2xl aspect-[4/3] relative">
          <svg viewBox="0 0 600 450" className="w-full h-full drop-shadow-2xl">
            
            {/* Stand Base & Pole */}
            <rect x="280" y="50" width="20" height="350" fill="#2A2A2A" stroke="rgba(255,255,255,0.1)" />
            <rect x="200" y="400" width="180" height="20" fill="#2A2A2A" stroke="rgba(255,255,255,0.1)" />
            
            {/* Clamp */}
            <rect x="240" y="180" width="40" height="10" fill="#52525B" />

            {/* Bunsen Burner (Visible only if Temp > 300K) */}
            <AnimatePresence>
              {temperature > 300 && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <rect x="270" y="340" width="20" height="60" fill="#52525B" />
                  {/* Flame */}
                  <motion.path
                    d="M280 340 Q260 300 280 270 Q300 300 280 340"
                    fill="#FFFFFF"
                    animate={{ 
                      d: [
                        "M280 340 Q260 300 280 270 Q300 300 280 340",
                        "M280 340 Q270 310 280 260 Q290 310 280 340",
                        "M280 340 Q260 300 280 270 Q300 300 280 340"
                      ],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />
                </motion.g>
              )}
            </AnimatePresence>

            {/* Round Bottom Flask */}
            <g transform="translate(180, 160)">
              {/* Flask Outline */}
              <path 
                d="M40 0 L40 60 Q20 80 10 110 A 50 50 0 1 0 110 110 Q100 80 80 60 L80 0 Z" 
                fill="rgba(255,255,255,0.03)" 
                stroke="rgba(255,255,255,0.4)" 
                strokeWidth="4" 
              />
              
              {/* Liquid Level (Volume based on concentration) */}
              <path 
                d={`M${20 - concentration*2} ${140 - concentration*10} A 50 50 0 0 0 ${100 + concentration*2} ${140 - concentration*10} A 50 50 0 0 1 110 110 A 50 50 0 0 1 10 110 A 50 50 0 0 1 ${20 - concentration*2} ${140 - concentration*10}`} 
                fill="#FFFFFF" 
                opacity="0.9"
              />

              {/* Animated Bubbles based on Reaction Rate */}
              {[...Array(bubbleCount)].map((_, i) => (
                <motion.circle
                  key={i}
                  cx={30 + Math.random() * 60}
                  cy={150}
                  r={2 + Math.random() * 4}
                  fill="#000000"
                  opacity="0.6"
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ 
                    y: - (50 + Math.random() * 40),
                    opacity: [0, 0.6, 0] 
                  }}
                  transition={{ 
                    duration: bubbleSpeed + Math.random(), 
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "easeOut"
                  }}
                />
              ))}
            </g>

            {/* Thermometer */}
            <g transform="translate(265, 80)">
              <rect x="0" y="0" width="10" height="150" rx="5" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" />
              <circle cx="5" cy="150" r="12" fill="#FFFFFF" opacity="0.8" />
              {/* Mercury Level */}
              <rect 
                x="3" 
                y={140 - ((temperature - 273) / 227) * 130} 
                width="4" 
                height={((temperature - 273) / 227) * 130 + 10} 
                fill="#FFFFFF" 
              />
            </g>

          </svg>
        </div>
      </div>
      
      {/* Side Panel */}
      <div className="absolute right-0 top-0 bottom-0 w-80 border-l border-white/5 bg-[#050505] flex flex-col pointer-events-none md:pointer-events-auto opacity-0 md:opacity-100 md:relative">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-lg font-bold text-white mb-2">{t("chemistry.kinetics.title") || "Kinetics Engine"}</h2>
          <p className="text-sm text-zinc-400">{t("chemistry.kinetics.desc") || "Real-time reaction rates calculated using the Arrhenius equation."}</p>
        </div>
        
        <div className="p-6 space-y-6 flex-1 overflow-y-auto custom-scrollbar">
          <div className="glass-card p-5 relative overflow-hidden">
            <div className="text-xs font-semibold text-zinc-500 mb-1">{t("chemistry.kinetics.rate") || "Reaction Rate (v)"}</div>
            <div className="flex items-end gap-2">
              <div className="text-3xl font-black text-white">{(reactionRate * 1000).toFixed(2)}</div>
              <div className="text-sm font-medium text-zinc-500 mb-1">mM/s</div>
            </div>
          </div>

          <div className="glass-card p-5">
            <div className="text-xs font-semibold text-zinc-500 mb-1">{t("chemistry.kinetics.constant") || "Rate Constant (k)"}</div>
            <div className="flex items-end gap-2">
              <div className="text-2xl font-bold text-white">{(rateConstant * 1000).toFixed(3)}</div>
              <div className="text-xs font-medium text-zinc-500 mb-1.5">s⁻¹</div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-bold text-white mb-4">{t("chemistry.kinetics.thermo") || "Thermodynamics"}</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-zinc-500">Activation Energy (Ea)</span>
                  <span className="text-white">{reaction.Ea} kJ/mol</span>
                </div>
                <div className="h-1.5 w-full bg-[#111111] rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    className="h-full bg-white" 
                    initial={{ width: 0 }}
                    animate={{ width: `${(reaction.Ea / 150) * 100}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-zinc-500">Enthalpy (ΔH)</span>
                  <span className="text-white">{reaction.dH} kJ/mol</span>
                </div>
                <div className="h-1.5 w-full bg-[#111111] rounded-full overflow-hidden border border-white/5 flex">
                  {reaction.dH < 0 ? (
                    <>
                      <motion.div className="h-full bg-white" style={{ width: `${Math.abs(reaction.dH)}%`, marginLeft: `${50 - Math.abs(reaction.dH)}%` }} />
                      <div className="h-full bg-transparent w-1/2" />
                    </>
                  ) : (
                    <>
                      <div className="h-full bg-transparent w-1/2" />
                      <motion.div className="h-full bg-white" style={{ width: `${reaction.dH}%` }} />
                    </>
                  )}
                </div>
                <div className="text-center mt-1 text-[10px] text-zinc-500 font-bold tracking-wider">
                  {reaction.dH < 0 ? "EXOTHERMIC" : "ENDOTHERMIC"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
