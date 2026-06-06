"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function GasLaws() {
  const { t } = useLanguage();
  
  // PV = nRT -> P = nRT/V
  const [volume, setVolume] = useState(50); // Liters
  const [temperature, setTemperature] = useState(300); // Kelvin
  
  // Constants
  const nR = 100; // Arbitrary constant for n*R to make P visually sensible (1 atm at 300K, 100L... wait, 100*300/50 = 600? Let's scale it)
  // Let's make P = 1.0 atm at V=50, T=300 => nR = P*V/T = 1 * 50 / 300 = 1/6
  const P_constant = 50 / 300; 
  
  const pressure = (P_constant * temperature) / volume;

  // Particle simulation parameters
  const particleCount = 40;
  // Kinetic energy proportional to temperature -> speed proportional to sqrt(T)
  const baseSpeed = Math.sqrt(temperature) * 0.1;
  
  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#0A0A0A]">
      {/* Controls Panel */}
      <div className="h-24 shrink-0 border-b border-white/5 bg-[#111111] flex items-center px-6 gap-6 overflow-x-auto">
        <div className="flex-1 min-w-[200px] max-w-xs">
          <label className="text-xs font-semibold text-zinc-400 mb-1.5 flex justify-between">
            <span>{t("chemistry.controls.volume") || "Volume (V)"}</span>
            <span className="text-white">{volume.toFixed(1)} L</span>
          </label>
          <input
            type="range" min="10" max="100" step="1"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full accent-white"
          />
        </div>
        <div className="flex-1 min-w-[200px] max-w-xs">
          <label className="text-xs font-semibold text-zinc-400 mb-1.5 flex justify-between">
            <span>{t("chemistry.controls.temp") || "Temperature (T)"}</span>
            <span className="text-white">{temperature} K</span>
          </label>
          <input
            type="range" min="100" max="800" step="10"
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            className="w-full accent-white"
          />
        </div>
      </div>

      {/* Simulation Area */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center p-8">
        <div className="w-full max-w-2xl aspect-[4/3] relative flex items-center justify-center">
          
          <svg viewBox="0 0 600 450" className="w-full h-full max-w-[400px]">
            {/* Cylinder Base */}
            <path d="M100 50 L100 350 A 100 20 0 0 0 300 350 L300 50" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.4)" strokeWidth="6" />
            
            {/* Piston Area (y = 50 is V=100, y = 300 is V=0 => y = 350 - (volume * 3) ) */}
            <motion.g 
              animate={{ y: 350 - (volume * 3) }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <ellipse cx="200" cy="0" rx="100" ry="20" fill="#52525B" stroke="#A1A1AA" strokeWidth="2" />
              <rect x="195" y="-150" width="10" height="150" fill="#A1A1AA" />
              <rect x="150" y="-160" width="100" height="20" fill="#52525B" rx="5" />
            </motion.g>

            {/* Clipping path for particles inside the volume */}
            <defs>
              <clipPath id="gasClip">
                <rect x="100" y="50" width="200" height="300" />
              </clipPath>
            </defs>

            {/* Particles */}
            <g clipPath="url(#gasClip)">
              {[...Array(particleCount)].map((_, i) => (
                <motion.circle
                  key={i}
                  r="4"
                  fill="#60A5FA"
                  initial={{
                    cx: 120 + Math.random() * 160,
                    cy: 350 - Math.random() * (volume * 2.8)
                  }}
                  animate={{
                    cx: [
                      120 + Math.random() * 160, 
                      120 + Math.random() * 160,
                      120 + Math.random() * 160
                    ],
                    cy: [
                      350 - Math.random() * (volume * 2.8),
                      350 - Math.random() * (volume * 2.8),
                      350 - Math.random() * (volume * 2.8)
                    ]
                  }}
                  transition={{
                    duration: (Math.random() * 2 + 1) / baseSpeed,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "linear"
                  }}
                />
              ))}
            </g>

            {/* Pressure Gauge */}
            <g transform="translate(350, 200)">
              <circle cx="0" cy="0" r="40" fill="#1A1A1A" stroke="rgba(255,255,255,0.4)" strokeWidth="4" />
              <circle cx="0" cy="0" r="32" fill="#0A0A0A" />
              {/* Ticks */}
              {[...Array(9)].map((_, i) => (
                <line 
                  key={i} 
                  x1="0" y1="-28" 
                  x2="0" y2="-24" 
                  stroke="#A1A1AA" 
                  strokeWidth="2" 
                  transform={`rotate(${-120 + i * 30})`} 
                />
              ))}
              {/* Needle (0 to 3 atm mapped to -120 to 120 deg) */}
              <motion.g
                animate={{ rotate: -120 + Math.min(pressure / 3 * 240, 240) }}
                transition={{ type: "spring", stiffness: 50 }}
              >
                <polygon points="-2,0 2,0 0,-26" fill="#EF4444" />
                <circle cx="0" cy="0" r="4" fill="#A1A1AA" />
              </motion.g>
              <text x="0" y="15" fill="#FFFFFF" fontSize="10" textAnchor="middle" className="font-bold">atm</text>
            </g>

            {/* Fire (Temperature indicator) */}
            <motion.g transform="translate(200, 380)" style={{ opacity: temperature > 400 ? 1 : 0 }}>
              <path d="M-20 0 Q0 -40 20 0 Z" fill="#EF4444" />
              <path d="M-10 0 Q0 -20 10 0 Z" fill="#F59E0B" />
            </motion.g>

          </svg>
        </div>
      </div>
      
      {/* Side Panel */}
      <div className="absolute right-0 top-0 bottom-0 w-80 border-l border-white/5 bg-[#050505] flex flex-col pointer-events-none md:pointer-events-auto opacity-0 md:opacity-100 md:relative">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-lg font-bold text-white mb-2">{t("chemistry.gas.title") || "Ideal Gas Law"}</h2>
          <p className="text-sm text-zinc-400">{t("chemistry.gas.desc") || "Observing the relationship between Pressure, Volume, and Temperature."}</p>
        </div>
        
        <div className="p-6 space-y-6 flex-1 overflow-y-auto custom-scrollbar">
          <div className="glass-card p-5 relative overflow-hidden">
            <div className="text-xs font-semibold text-zinc-500 mb-1">{t("chemistry.gas.pressure") || "Pressure (P)"}</div>
            <div className="flex items-end gap-2">
              <div className="text-3xl font-black text-white">{pressure.toFixed(2)}</div>
              <div className="text-sm font-medium text-zinc-500 mb-1">atm</div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-bold text-white mb-4">{t("physics.calculations.formulas") || "Formulas"}</h3>
            <div className="space-y-3 font-mono text-sm">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-white text-center">
                PV = nRT
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-bold text-white mb-3">Behaviors</h3>
            <ul className="text-xs text-zinc-400 space-y-2 list-disc pl-4">
              <li><strong>Boyle's Law:</strong> Decreasing volume increases pressure (T constant).</li>
              <li><strong>Charles's Law:</strong> Increasing temperature increases volume (P constant).</li>
              <li><strong>Gay-Lussac's Law:</strong> Increasing temperature increases pressure (V constant).</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
