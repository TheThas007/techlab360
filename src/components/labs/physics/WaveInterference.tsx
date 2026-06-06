"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function WaveInterference() {
  const { t } = useLanguage();
  
  const [amp1, setAmp1] = useState(50); // px
  const [amp2, setAmp2] = useState(50); // px
  const [phaseDiff, setPhaseDiff] = useState(0); // degrees
  const [frequency] = useState(2); // fixed for display

  // Generate path data for sine waves
  const generateSineWave = (amplitude: number, phase: number) => {
    const points = [];
    const width = 800;
    const centerY = 200;
    const phaseRad = (phase * Math.PI) / 180;
    
    for (let x = 0; x <= width; x += 5) {
      // 2 complete cycles over 800px => freq * 2*PI * (x/width)
      const t = (x / width) * 2 * Math.PI * frequency;
      const y = centerY - Math.sin(t + phaseRad) * amplitude;
      points.push(`${x === 0 ? 'M' : 'L'} ${x} ${y}`);
    }
    return points.join(' ');
  };

  const generateResultantWave = () => {
    const points = [];
    const width = 800;
    const centerY = 200;
    const phaseRad = (phaseDiff * Math.PI) / 180;
    
    for (let x = 0; x <= width; x += 5) {
      const t = (x / width) * 2 * Math.PI * frequency;
      const y1 = Math.sin(t) * amp1;
      const y2 = Math.sin(t + phaseRad) * amp2;
      const y = centerY - (y1 + y2);
      points.push(`${x === 0 ? 'M' : 'L'} ${x} ${y}`);
    }
    return points.join(' ');
  };

  // Math calculation for max resultant amplitude using cosine rule for phasor addition
  const phaseRad = (phaseDiff * Math.PI) / 180;
  const resultantAmp = Math.sqrt(Math.pow(amp1, 2) + Math.pow(amp2, 2) + 2 * amp1 * amp2 * Math.cos(phaseRad));
  
  let interferenceType = "Constructive";
  if (Math.cos(phaseRad) < -0.9) interferenceType = "Fully Destructive";
  else if (Math.cos(phaseRad) < 0) interferenceType = "Partially Destructive";
  else if (Math.cos(phaseRad) < 0.9) interferenceType = "Partially Constructive";
  else interferenceType = "Fully Constructive";

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#0A0A0A]">
      {/* Controls Panel */}
      <div className="h-24 shrink-0 border-b border-white/5 bg-[#111111] flex items-center px-6 gap-6 overflow-x-auto">
        <div className="flex-1 min-w-[150px] max-w-xs">
          <label className="text-xs font-semibold text-zinc-400 mb-1.5 flex justify-between">
            <span className="text-red-400">{t("physics.controls.amp1") || "Wave 1 Amplitude"}</span>
            <span className="text-white">{amp1}</span>
          </label>
          <input
            type="range" min="0" max="100" step="5"
            value={amp1}
            onChange={(e) => setAmp1(Number(e.target.value))}
            className="w-full accent-red-500"
          />
        </div>
        <div className="flex-1 min-w-[150px] max-w-xs">
          <label className="text-xs font-semibold text-zinc-400 mb-1.5 flex justify-between">
            <span className="text-blue-400">{t("physics.controls.amp2") || "Wave 2 Amplitude"}</span>
            <span className="text-white">{amp2}</span>
          </label>
          <input
            type="range" min="0" max="100" step="5"
            value={amp2}
            onChange={(e) => setAmp2(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>
        <div className="flex-1 min-w-[200px] max-w-sm">
          <label className="text-xs font-semibold text-zinc-400 mb-1.5 flex justify-between">
            <span>{t("physics.controls.phase") || "Phase Difference (Δφ)"}</span>
            <span className="text-white">{phaseDiff}°</span>
          </label>
          <input
            type="range" min="0" max="360" step="15"
            value={phaseDiff}
            onChange={(e) => setPhaseDiff(Number(e.target.value))}
            className="w-full accent-white"
          />
        </div>
      </div>

      {/* Simulation Area */}
      <div className="flex-1 relative overflow-hidden flex flex-col items-center justify-center p-8">
        
        {/* Component Waves (Smaller) */}
        <div className="w-full max-w-4xl h-32 relative mb-4 flex gap-4">
          <div className="flex-1 glass-card overflow-hidden relative">
            <div className="absolute top-2 left-3 text-xs font-bold text-red-400">Wave 1 (y₁)</div>
            <svg viewBox="0 0 800 400" className="w-full h-full" preserveAspectRatio="none">
              <line x1="0" y1="200" x2="800" y2="200" stroke="#333" strokeWidth="2" strokeDasharray="10 10" />
              <path d={generateSineWave(amp1 * 2, 0)} fill="none" stroke="#F87171" strokeWidth="4" />
            </svg>
          </div>
          <div className="flex-1 glass-card overflow-hidden relative">
            <div className="absolute top-2 left-3 text-xs font-bold text-blue-400">Wave 2 (y₂)</div>
            <div className="absolute top-2 right-3 text-xs font-bold text-zinc-500">Δφ = {phaseDiff}°</div>
            <svg viewBox="0 0 800 400" className="w-full h-full" preserveAspectRatio="none">
              <line x1="0" y1="200" x2="800" y2="200" stroke="#333" strokeWidth="2" strokeDasharray="10 10" />
              <path d={generateSineWave(amp2 * 2, phaseDiff)} fill="none" stroke="#60A5FA" strokeWidth="4" />
            </svg>
          </div>
        </div>

        {/* Resultant Wave (Large) */}
        <div className="w-full max-w-4xl flex-1 glass-card relative overflow-hidden flex flex-col">
          <div className="p-4 border-b border-white/5 flex justify-between items-center bg-[#0A0A0A]/50">
            <h3 className="text-sm font-bold text-white tracking-wide uppercase">Resultant Wave (y = y₁ + y₂)</h3>
            <div className={`text-xs font-bold px-3 py-1 rounded-full ${
              Math.cos(phaseRad) > 0.5 ? 'bg-green-500/20 text-green-400' :
              Math.cos(phaseRad) < -0.5 ? 'bg-red-500/20 text-red-400' :
              'bg-yellow-500/20 text-yellow-400'
            }`}>
              {interferenceType}
            </div>
          </div>
          <div className="flex-1 relative">
            <svg viewBox="0 0 800 400" className="w-full h-full" preserveAspectRatio="none">
              {/* Grid and Axis */}
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              </pattern>
              <rect width="800" height="400" fill="url(#grid)" />
              <line x1="0" y1="200" x2="800" y2="200" stroke="#555" strokeWidth="2" />
              <line x1="40" y1="0" x2="40" y2="400" stroke="#555" strokeWidth="2" />

              {/* Faint Component Waves overlay */}
              <path d={generateSineWave(amp1, 0)} fill="none" stroke="rgba(248, 113, 113, 0.3)" strokeWidth="2" strokeDasharray="5 5" />
              <path d={generateSineWave(amp2, phaseDiff)} fill="none" stroke="rgba(96, 165, 250, 0.3)" strokeWidth="2" strokeDasharray="5 5" />

              {/* Resultant Wave */}
              <path d={generateResultantWave()} fill="none" stroke="#FFFFFF" strokeWidth="6" style={{ filter: "drop-shadow(0px 0px 8px rgba(255,255,255,0.4))" }} />
            </svg>
          </div>
        </div>

      </div>
      
      {/* Side Panel */}
      <div className="absolute right-0 top-0 bottom-0 w-80 border-l border-white/5 bg-[#050505] flex flex-col pointer-events-none md:pointer-events-auto opacity-0 md:opacity-100 md:relative">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-lg font-bold text-white mb-2">{t("physics.waves.title") || "Wave Superposition"}</h2>
          <p className="text-sm text-zinc-400">{t("physics.waves.desc") || "When two or more waves overlap in space, their resulting displacement is the sum of the individual displacements."}</p>
        </div>
        
        <div className="p-6 space-y-6 flex-1 overflow-y-auto custom-scrollbar">
          <div className="glass-card p-5">
            <div className="text-xs font-semibold text-zinc-500 mb-1">{t("physics.waves.res_amp") || "Resultant Amplitude (A)"}</div>
            <div className="flex items-end gap-2">
              <div className="text-3xl font-black text-white">{resultantAmp.toFixed(1)}</div>
            </div>
            <div className="mt-2 text-xs text-zinc-400 font-mono">
              √(A₁² + A₂² + 2A₁A₂cos(Δφ))
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-bold text-white mb-3">{t("physics.waves.types") || "Interference Types"}</h3>
            <div className="space-y-4 text-sm">
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="font-bold text-green-400 mb-1">Constructive (Δφ = 0°, 360°)</div>
                <div className="text-xs text-zinc-400">Waves are in phase. Amplitudes add up fully.</div>
              </div>
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="font-bold text-red-400 mb-1">Destructive (Δφ = 180°)</div>
                <div className="text-xs text-zinc-400">Waves are exactly out of phase. Amplitudes cancel out.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
