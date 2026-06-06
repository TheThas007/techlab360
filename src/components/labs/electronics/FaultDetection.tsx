"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function FaultDetection() {
  const { t } = useLanguage();
  
  // 3 possible states: normal, short_circuit, open_circuit
  const [faultType, setFaultType] = useState<"normal" | "short" | "open">("normal");
  const [probedNode, setProbedNode] = useState<number | null>(null);

  // Simple circuit: Battery(9V) -> Node1 -> R1(100) -> Node2 -> R2(100) -> Node3(GND)
  // Voltage at nodes based on fault:
  // Normal: N1=9V, N2=4.5V, N3=0V
  // Short (across R2): N1=9V, N2=0V (shorted to GND), N3=0V
  // Open (between R1 & R2): N1=9V, N2=9V (no current flow, N2 sits at N1), N3=0V
  
  const getVoltageAtNode = (node: number) => {
    if (node === 1) return 9.0;
    if (node === 3) return 0.0;
    if (node === 2) {
      if (faultType === "normal") return 4.5;
      if (faultType === "short") return 0.0; // R2 is bypassed
      if (faultType === "open") return 9.0; // Break after N2, so N2 is connected to N1 through R1, no drop.
    }
    return 0;
  };

  const getSystemCurrent = () => {
    if (faultType === "normal") return 9 / 200; // 0.045 A
    if (faultType === "short") return 9 / 100; // 0.09 A
    if (faultType === "open") return 0; // 0 A
    return 0;
  };

  const current = getSystemCurrent();

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#0A0A0A]">
      {/* Controls Panel */}
      <div className="h-24 shrink-0 border-b border-white/5 bg-[#111111] flex items-center px-6 gap-6 overflow-x-auto">
        <div className="flex-1 min-w-[250px]">
          <label className="text-xs font-semibold text-zinc-400 mb-1.5 flex justify-between">
            <span>{t("electronics.fault.scenario") || "Fault Scenario"}</span>
          </label>
          <select 
            className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/20"
            value={faultType}
            onChange={(e) => {
              setFaultType(e.target.value as "normal" | "short" | "open");
              setProbedNode(null);
            }}
          >
            <option value="normal">Normal Operation</option>
            <option value="open">Open Circuit (Broken Trace)</option>
            <option value="short">Short Circuit (R2 Bypassed)</option>
          </select>
        </div>
        <div className="flex-1 text-sm text-zinc-400 border-l border-white/10 pl-6 hidden md:block">
          {t("electronics.fault.instructions") || "Click on the colored nodes (TP1, TP2, TP3) with the multimeter probe to measure voltage and diagnose the fault."}
        </div>
      </div>

      {/* Simulation Area */}
      <div className="flex-1 relative overflow-hidden flex flex-col md:flex-row items-center justify-center p-8 gap-8">
        
        {/* Schematic Area */}
        <div className="flex-1 w-full max-w-2xl aspect-[4/3] relative">
          <svg viewBox="0 0 800 600" className="w-full h-full drop-shadow-2xl">
            {/* Grid */}
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            </pattern>
            <rect width="800" height="600" fill="url(#grid)" />

            {/* Circuit Paths */}
            {/* Battery to R1 */}
            <path d="M 200 400 L 200 200 L 400 200" fill="none" stroke="#333" strokeWidth="6" />
            {/* R1 to R2 */}
            {faultType === "open" ? (
              // Open break between R1 and R2
              <path d="M 400 200 L 600 200 M 600 250 L 600 400" fill="none" stroke="#333" strokeWidth="6" />
            ) : (
              <path d="M 400 200 L 600 200 L 600 400" fill="none" stroke="#333" strokeWidth="6" />
            )}
            
            {/* Short circuit path */}
            {faultType === "short" && (
              <path d="M 600 200 L 700 200 L 700 400 L 600 400" fill="none" stroke="#EF4444" strokeWidth="4" strokeDasharray="10 5" />
            )}
            
            {/* R2 to Battery */}
            <path d="M 600 400 L 200 400" fill="none" stroke="#333" strokeWidth="6" />

            {/* Components */}
            {/* Battery */}
            <g transform="translate(200, 300)">
              <rect x="-30" y="-40" width="60" height="80" fill="#111" stroke="#fff" strokeWidth="2" />
              <text x="0" y="5" fill="#fff" fontSize="16" fontWeight="bold" textAnchor="middle">9V</text>
              <line x1="-40" y1="-50" x2="40" y2="-50" stroke="#fff" strokeWidth="4" />
              <line x1="-20" y1="50" x2="20" y2="50" stroke="#fff" strokeWidth="4" />
            </g>

            {/* R1 */}
            <g transform="translate(400, 200)">
              <rect x="-40" y="-15" width="80" height="30" fill="#111" stroke="#fff" strokeWidth="2" />
              <text x="0" y="5" fill="#fff" fontSize="14" textAnchor="middle">R1 100Ω</text>
            </g>

            {/* R2 */}
            <g transform="translate(600, 300)">
              <rect x="-15" y="-40" width="30" height="80" fill="#111" stroke="#fff" strokeWidth="2" />
              <text x="-25" y="5" fill="#fff" fontSize="14" textAnchor="end">R2 100Ω</text>
            </g>

            {/* Current Flow (If any) */}
            {current > 0 && (
              <motion.circle
                r="6" fill="#fff"
                animate={{ 
                  cx: [200, 200, faultType === "short" ? 700 : 600, faultType === "short" ? 700 : 600, 200], 
                  cy: [400, 200, 200, 400, 400] 
                }}
                transition={{ duration: 1 / Math.max(0.01, current * 20), repeat: Infinity, ease: "linear" }}
              />
            )}

            {/* Test Points */}
            <g transform="translate(200, 200)" className="cursor-pointer" onClick={() => setProbedNode(1)}>
              <circle cx="0" cy="0" r="16" fill={probedNode === 1 ? "#EF4444" : "#333"} stroke="#fff" strokeWidth="2" className="transition-colors" />
              <text x="0" y="-25" fill="#A1A1AA" fontSize="14" fontWeight="bold" textAnchor="middle">TP1</text>
            </g>

            <g transform="translate(600, 200)" className="cursor-pointer" onClick={() => setProbedNode(2)}>
              <circle cx="0" cy="0" r="16" fill={probedNode === 2 ? "#EF4444" : "#333"} stroke="#fff" strokeWidth="2" className="transition-colors" />
              <text x="0" y="-25" fill="#A1A1AA" fontSize="14" fontWeight="bold" textAnchor="middle">TP2</text>
            </g>

            <g transform="translate(400, 400)" className="cursor-pointer" onClick={() => setProbedNode(3)}>
              <circle cx="0" cy="0" r="16" fill={probedNode === 3 ? "#10B981" : "#333"} stroke="#fff" strokeWidth="2" className="transition-colors" />
              <text x="0" y="25" fill="#A1A1AA" fontSize="14" fontWeight="bold" textAnchor="middle">TP3 (GND)</text>
            </g>

          </svg>
        </div>

        {/* Multimeter */}
        <div className="w-64 shrink-0">
          <div className="bg-[#1A1A1A] border-4 border-zinc-800 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col h-80">
            {/* Display */}
            <div className="bg-[#A3E635] mx-4 mt-6 p-4 rounded text-right font-mono font-black text-4xl text-black shadow-inner">
              {probedNode ? getVoltageAtNode(probedNode).toFixed(2) : "---.-"}
              <span className="text-sm ml-1">V</span>
            </div>
            
            {/* Dial */}
            <div className="flex-1 flex items-center justify-center relative">
              <div className="w-24 h-24 rounded-full border-4 border-zinc-700 relative flex items-center justify-center">
                <div className="w-2 h-10 bg-white absolute top-2 rounded-full" style={{ transform: 'rotate(-45deg)', transformOrigin: 'bottom center' }}></div>
                <div className="absolute top-2 left-2 text-[10px] font-bold text-white">V-DC</div>
              </div>
            </div>

            {/* Probe Ports */}
            <div className="flex justify-center gap-6 pb-6">
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-full bg-red-950 border-2 border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]"></div>
                <span className="text-[10px] text-zinc-500 font-bold">VΩmA</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-full bg-zinc-950 border-2 border-zinc-500"></div>
                <span className="text-[10px] text-zinc-500 font-bold">COM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Diagnostics Panel (Bottom or Side) */}
      <div className="p-6 bg-[#050505] border-t border-white/5 flex gap-8">
        <div className="flex-1">
          <h3 className="text-sm font-bold text-white mb-2">Diagnostics Engine</h3>
          <p className="text-sm text-zinc-400 mb-4">
            Total System Current: <span className="font-mono text-white">{(current * 1000).toFixed(1)} mA</span>
          </p>
          <div className="flex gap-2">
            <div className={`px-3 py-1 rounded text-xs font-bold ${faultType === "normal" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
              {faultType === "normal" ? "SYSTEM HEALTHY" : "FAULT DETECTED"}
            </div>
            {current > 0.05 && (
              <div className="px-3 py-1 rounded text-xs font-bold bg-yellow-500/20 text-yellow-400">
                HIGH CURRENT ALERT
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 border-l border-white/10 pl-8 hidden md:block">
          <h3 className="text-sm font-bold text-white mb-2">Troubleshooting Guide</h3>
          <ul className="text-xs text-zinc-400 space-y-1 list-disc pl-4">
            <li>Expected Voltage at TP2 is 4.5V (Voltage Divider).</li>
            <li>If TP2 = 0V, R2 might be shorted to ground.</li>
            <li>If TP2 = 9V, the circuit is open after TP2, causing no voltage drop across R1.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
