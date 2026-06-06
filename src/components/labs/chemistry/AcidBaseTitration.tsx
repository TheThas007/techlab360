"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function AcidBaseTitration() {
  const { t } = useLanguage();
  
  // Titration parameters
  // Initial acid in flask: Strong Acid (e.g., HCl)
  const [volAcid] = useState(25); // mL fixed
  const [concAcid] = useState(0.1); // M fixed
  
  // Titrant added: Strong Base (e.g., NaOH)
  const [concBase] = useState(0.1); // M fixed
  const [volBaseAdded, setVolBaseAdded] = useState(0); // mL

  // Simplified Strong Acid-Strong Base pH calculation
  const calculatePH = (vb: number) => {
    const molesAcid = concAcid * volAcid;
    const molesBase = concBase * vb;
    const totalVolume = volAcid + vb;

    if (molesAcid > molesBase) {
      // Acid excess
      const concH = (molesAcid - molesBase) / totalVolume;
      return -Math.log10(concH);
    } else if (molesBase > molesAcid) {
      // Base excess
      const concOH = (molesBase - molesAcid) / totalVolume;
      const pOH = -Math.log10(concOH);
      return 14 - pOH;
    } else {
      // Equivalence point
      return 7.0;
    }
  };

  const currentPH = calculatePH(volBaseAdded);
  
  // Phenolphthalein color logic (colorless < 8.2, pink > 10.0)
  // For visual drama, we transition earlier and steeper
  const getIndicatorColor = (ph: number) => {
    if (ph < 7) return "rgba(255,255,255,0.05)"; // Colorless/water
    if (ph > 9) return "rgba(236, 72, 153, 0.8)"; // Pink
    // Transition
    const intensity = (ph - 7) / 2;
    return `rgba(236, 72, 153, ${intensity})`;
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#0A0A0A]">
      {/* Controls Panel */}
      <div className="h-24 shrink-0 border-b border-white/5 bg-[#111111] flex items-center px-6 gap-6 overflow-x-auto">
        <div className="flex-1 min-w-[300px] max-w-md">
          <label className="text-xs font-semibold text-zinc-400 mb-1.5 flex justify-between">
            <span>{t("chemistry.controls.titrant") || "Titrant Added (NaOH)"}</span>
            <span className="text-white">{volBaseAdded.toFixed(1)} mL</span>
          </label>
          <input
            type="range" min="0" max="50" step="0.1"
            value={volBaseAdded}
            onChange={(e) => setVolBaseAdded(Number(e.target.value))}
            className="w-full accent-white"
          />
        </div>
      </div>

      {/* Simulation Area */}
      <div className="flex-1 relative overflow-hidden flex flex-col md:flex-row items-center justify-center p-8 gap-8">
        
        {/* Apparatus View */}
        <div className="flex-1 max-w-sm aspect-[3/4] relative flex items-center justify-center">
          <svg viewBox="0 0 400 600" className="w-full h-full drop-shadow-2xl">
            {/* Retort Stand */}
            <rect x="50" y="550" width="150" height="20" fill="#2A2A2A" />
            <rect x="120" y="50" width="10" height="500" fill="#2A2A2A" />
            <rect x="120" y="200" width="80" height="10" fill="#52525B" />
            
            {/* Burette */}
            <g transform="translate(200, 50)">
              <rect x="-15" y="0" width="30" height="350" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.4)" strokeWidth="3" />
              {/* Burette Liquid (NaOH) */}
              {/* Scale: 0 to 50mL. Total height 350px. 7px per mL. */}
              {/* Empty space at top grows as volBaseAdded increases */}
              <rect x="-13" y={volBaseAdded * 7} width="26" height={350 - (volBaseAdded * 7)} fill="#E4E4E7" opacity="0.8" />
              
              {/* Scale marks */}
              {[...Array(11)].map((_, i) => (
                <line key={i} x1="-15" y1={i * 35} x2="-5" y2={i * 35} stroke="#FFF" strokeWidth="1" />
              ))}
              
              {/* Stopcock */}
              <rect x="-20" y="360" width="40" height="10" fill="#2A2A2A" />
              <rect x="-5" y="350" width="10" height="30" fill="rgba(255,255,255,0.4)" />
              {/* Drip nozzle */}
              <path d="M-2 380 L2 380 L1 390 L-1 390 Z" fill="rgba(255,255,255,0.4)" />
            </g>

            {/* Erlenmeyer Flask */}
            <g transform="translate(200, 420)">
              <path 
                d="M-20 0 L20 0 L20 40 L60 120 A 10 10 0 0 1 50 130 L-50 130 A 10 10 0 0 1 -60 120 L-20 40 Z" 
                fill="rgba(255,255,255,0.03)" 
                stroke="rgba(255,255,255,0.4)" 
                strokeWidth="4" 
              />
              
              {/* Flask Liquid */}
              {/* Base height + added volume */}
              {/* Clip path for liquid */}
              <defs>
                <clipPath id="flaskClip">
                  <path d="M-20 0 L20 0 L20 40 L60 120 A 10 10 0 0 1 50 130 L-50 130 A 10 10 0 0 1 -60 120 L-20 40 Z" />
                </clipPath>
              </defs>
              
              <rect 
                x="-60" 
                y={80 - (volBaseAdded * 0.5)} 
                width="120" 
                height={50 + (volBaseAdded * 0.5)} 
                fill={getIndicatorColor(currentPH)}
                clipPath="url(#flaskClip)"
                className="transition-colors duration-500"
              />
            </g>
          </svg>
        </div>

        {/* Graph View */}
        <div className="flex-1 max-w-sm glass-card p-4 relative aspect-square flex flex-col">
          <h3 className="text-sm font-bold text-white mb-2 text-center">Titration Curve</h3>
          <div className="flex-1 relative border-l-2 border-b-2 border-zinc-600 ml-6 mb-6">
            {/* Y Axis (pH 0-14) */}
            <div className="absolute -left-6 bottom-0 top-0 flex flex-col justify-between text-[10px] text-zinc-500 py-1">
              <span>14</span>
              <span>7</span>
              <span>0</span>
            </div>
            {/* X Axis (Volume 0-50) */}
            <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[10px] text-zinc-500 px-1">
              <span>0</span>
              <span>25</span>
              <span>50</span>
            </div>
            
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
              {/* Theoretical Curve Line */}
              <polyline 
                points={Array.from({length: 51}).map((_, i) => {
                  const ph = calculatePH(i);
                  return `${(i / 50) * 100},${100 - (ph / 14) * 100}`;
                }).join(" ")}
                fill="none" 
                stroke="rgba(255,255,255,0.2)" 
                strokeWidth="2" 
              />
              
              {/* Plotted points up to current volume */}
              <polyline 
                points={Array.from({length: Math.floor(volBaseAdded) + 1}).map((_, i) => {
                  const ph = calculatePH(i);
                  return `${(i / 50) * 100},${100 - (ph / 14) * 100}`;
                }).join(" ")}
                fill="none" 
                stroke="#FFFFFF" 
                strokeWidth="3" 
              />
              
              {/* Current Point Marker */}
              <circle 
                cx={(volBaseAdded / 50) * 100} 
                cy={100 - (currentPH / 14) * 100} 
                r="3" 
                fill="#F472B6" 
              />
              
              {/* Equivalence Point Line (pH 7) */}
              <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1" strokeDasharray="2 2" />
            </svg>
          </div>
        </div>

      </div>
      
      {/* Side Panel */}
      <div className="absolute right-0 top-0 bottom-0 w-80 border-l border-white/5 bg-[#050505] flex flex-col pointer-events-none md:pointer-events-auto opacity-0 md:opacity-100 md:relative">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-lg font-bold text-white mb-2">{t("chemistry.titration.title") || "Acid-Base Titration"}</h2>
          <p className="text-sm text-zinc-400">{t("chemistry.titration.desc") || "Neutralizing 0.1M HCl with 0.1M NaOH."}</p>
        </div>
        
        <div className="p-6 space-y-6 flex-1 overflow-y-auto custom-scrollbar">
          <div className="glass-card p-5 relative overflow-hidden">
            <div className="text-xs font-semibold text-zinc-500 mb-1">{t("chemistry.titration.ph") || "Current pH"}</div>
            <div className="flex items-end gap-2">
              <div className="text-3xl font-black text-white">{currentPH.toFixed(2)}</div>
            </div>
            {currentPH === 7 && (
              <div className="absolute top-2 right-2 text-[10px] font-bold bg-green-500/20 text-green-400 px-2 py-1 rounded">EQUIVALENCE</div>
            )}
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-bold text-white mb-4">{t("chemistry.titration.solution") || "Solution Details"}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-500">Acid (HCl)</span>
                <span className="text-white font-mono">{volAcid} mL, {concAcid}M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Base (NaOH)</span>
                <span className="text-white font-mono">{volBaseAdded.toFixed(1)} mL, {concBase}M</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/10">
                <span className="text-zinc-500">Indicator</span>
                <span className="text-pink-400 font-medium">Phenolphthalein</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
