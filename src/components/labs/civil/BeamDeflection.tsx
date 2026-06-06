"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function BeamDeflection() {
  const { t } = useLanguage();
  
  // Beam parameters
  const [load, setLoad] = useState(50); // kN
  const [span, setSpan] = useState(5); // meters
  const [width] = useState(300); // mm
  const [depth, setDepth] = useState(450); // mm

  // Simplified deflection calculation for demo
  // Δ = (P * L^3) / (48 * E * I)
  const E = 25000; // MPa (Concrete)
  const I = (width * Math.pow(depth, 3)) / 12; // mm^4
  const deflection = ((load * 1000) * Math.pow(span * 1000, 3)) / (48 * E * I);
  
  // Calculate visual bend (SVG control point offset)
  const visualBend = Math.min(deflection * 5, 80); // Cap visual bending

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-0 bg-[#0A0A0A] overflow-y-auto custom-scrollbar md:overflow-hidden">
      <div className="flex-1 flex flex-col min-w-0">
      {/* Controls Panel */}
      <div className="min-h-[6rem] shrink-0 border-b border-white/5 bg-[#111111] flex items-center px-4 md:px-6 gap-4 md:gap-6 overflow-x-auto overflow-x-auto">
        <div className="flex-1 min-w-[200px]">
          <label className="text-xs font-semibold text-zinc-400 mb-1.5 flex justify-between">
            <span>{t("civil.controls.load") || "Point Load (P)"}</span>
            <span className="text-white">{load} kN</span>
          </label>
          <input
            type="range" min="0" max="200" step="5"
            value={load}
            onChange={(e) => setLoad(Number(e.target.value))}
            className="w-full accent-white"
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="text-xs font-semibold text-zinc-400 mb-1.5 flex justify-between">
            <span>{t("civil.controls.span") || "Span Length (L)"}</span>
            <span className="text-white">{span} m</span>
          </label>
          <input
            type="range" min="2" max="10" step="0.5"
            value={span}
            onChange={(e) => setSpan(Number(e.target.value))}
            className="w-full accent-white"
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="text-xs font-semibold text-zinc-400 mb-1.5 flex justify-between">
            <span>{t("civil.controls.depth") || "Beam Depth (d)"}</span>
            <span className="text-white">{depth} mm</span>
          </label>
          <input
            type="range" min="300" max="800" step="50"
            value={depth}
            onChange={(e) => setDepth(Number(e.target.value))}
            className="w-full accent-white"
          />
        </div>
      </div>

      {/* Simulation Area */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center min-h-[400px] md:min-h-0 p-8">
        <div className="w-full max-w-4xl aspect-[21/9] relative">
          <svg viewBox="0 0 1000 400" className="w-full h-full drop-shadow-2xl">
            {/* Background Grid */}
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            </pattern>
            <rect width="1000" height="400" fill="url(#grid)" />

            {/* Dimensions */}
            <path d="M200 350 L800 350" stroke="#52525B" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="200" y1="340" x2="200" y2="360" stroke="#52525B" strokeWidth="2" />
            <line x1="800" y1="340" x2="800" y2="360" stroke="#52525B" strokeWidth="2" />
            <text x="500" y="380" fill="#A1A1AA" fontSize="16" textAnchor="middle">Span (L) = {span}m</text>

            {/* Supports */}
            {/* Pin Support (Left) */}
            <path d="M160 250 L240 250 L200 180 Z" fill="#141414" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
            <circle cx="200" cy="180" r="6" fill="#A1A1AA" />
            <rect x="150" y="250" width="100" height="10" fill="#2A2A2A" />
            
            {/* Roller Support (Right) */}
            <path d="M760 230 L840 230 L800 180 Z" fill="#141414" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
            <circle cx="800" cy="180" r="6" fill="#A1A1AA" />
            <circle cx="780" cy="240" r="10" fill="#2A2A2A" />
            <circle cx="820" cy="240" r="10" fill="#2A2A2A" />
            <rect x="750" y="250" width="100" height="10" fill="#2A2A2A" />

            {/* Bending Beam (Animated) */}
            <motion.path
              d={`M200 170 Q 500 ${170 + visualBend} 800 170 L 800 190 Q 500 ${190 + visualBend} 200 190 Z`}
              fill="#E4E4E7"
              stroke="#FFFFFF"
              strokeWidth="2"
              animate={{ d: `M200 170 Q 500 ${170 + visualBend} 800 170 L 800 ${170 + depth/15} Q 500 ${170 + depth/15 + visualBend} 200 ${170 + depth/15} Z` }}
              transition={{ duration: 0.5 }}
            />

            {/* Point Load Arrow */}
            <motion.g 
              animate={{ y: visualBend }} 
              transition={{ duration: 0.5 }}
            >
              <path d="M500 50 L500 160" stroke="#FFFFFF" strokeWidth="6" strokeDasharray="8 6" />
              <path d="M485 145 L500 170 L515 145 Z" fill="#FFFFFF" />
              
              {/* Load Label */}
              <rect x="460" y="10" width="80" height="40" rx="8" fill="#FFFFFF" />
              <text x="500" y="36" fill="#000000" fontSize="18" fontWeight="bold" textAnchor="middle">{load} kN</text>
            </motion.g>

            {/* Deflection Marker */}
            <motion.path 
              d="M500 170 L500 250" 
              stroke="#52525B" strokeWidth="2" strokeDasharray="4 4"
              animate={{ d: `M500 170 L500 ${170 + visualBend}` }}
            />
          </svg>
        </div>
      </div>
      
      {/* Side Panel below for smaller screens, but structured like the other labs */}
      <div className="absolute right-0 top-0 bottom-0 w-80 border-l border-white/5 bg-[#050505] flex flex-col pointer-events-none md:pointer-events-auto opacity-0 md:opacity-100 md:relative">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-lg font-bold text-white mb-2">{t("civil.calculations.title") || "Design Checks"}</h2>
          <p className="text-sm text-zinc-400">{t("civil.calculations.desc") || "IS 456:2000 code compliance for RC Beams."}</p>
        </div>
        
        <div className="p-6 space-y-6 flex-1 overflow-y-auto custom-scrollbar">
          <div className="glass-card p-5">
            <div className="text-xs font-semibold text-zinc-500 mb-1">{t("civil.calculations.deflection") || "Max Deflection (Δ)"}</div>
            <div className="flex items-end gap-2">
              <div className="text-3xl font-black text-white">{deflection.toFixed(2)}</div>
              <div className="text-sm font-medium text-zinc-500 mb-1">mm</div>
            </div>
            {/* Status indicator */}
            <div className={`mt-3 text-xs font-bold px-2 py-1 rounded inline-flex ${deflection > (span*1000)/250 ? 'bg-white text-black' : 'bg-white/10 text-white'}`}>
              {deflection > (span*1000)/250 ? (t("civil.calculations.exceeds") || 'EXCEEDS LIMIT (L/250)') : (t("civil.calculations.safe") || 'SAFE')}
            </div>
          </div>

          <div className="glass-card p-5">
            <div className="text-xs font-semibold text-zinc-500 mb-1">{t("civil.calculations.moment") || "Max Bending Moment"}</div>
            <div className="flex items-end gap-2">
              <div className="text-3xl font-black text-white">{((load * span) / 4).toFixed(1)}</div>
              <div className="text-sm font-medium text-zinc-500 mb-1">kN·m</div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-bold text-white mb-3">{t("civil.calculations.properties") || "Beam Properties"}</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Width (b)</span>
                <span className="text-white font-mono">{width} mm</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Depth (d)</span>
                <span className="text-white font-mono">{depth} mm</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Moment of Inertia (I)</span>
                <span className="text-white font-mono">{(I / 1e6).toFixed(2)} × 10⁶</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
