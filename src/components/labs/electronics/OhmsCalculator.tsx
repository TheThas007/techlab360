"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function OhmsCalculator() {
  const { t } = useLanguage();
  
  const [voltage, setVoltage] = useState("12");
  const [current, setCurrent] = useState("");
  const [resistance, setResistance] = useState("100");

  const [lastEdited, setLastEdited] = useState<"V" | "I" | "R">("V");

  // Recalculate logic when inputs change
  const handleCalculate = () => {
    const v = parseFloat(voltage);
    const i = parseFloat(current);
    const r = parseFloat(resistance);

    if (lastEdited !== "V" && !isNaN(i) && !isNaN(r)) {
      setVoltage((i * r).toFixed(2));
    } else if (lastEdited !== "I" && !isNaN(v) && !isNaN(r)) {
      setCurrent((v / r).toFixed(3));
    } else if (lastEdited !== "R" && !isNaN(v) && !isNaN(i) && i !== 0) {
      setResistance((v / i).toFixed(2));
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#0A0A0A] items-center justify-center p-8">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Interactive Triangle */}
        <div className="relative aspect-square max-w-sm mx-auto w-full">
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
            {/* Triangle Base */}
            <polygon points="50,10 90,80 10,80" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinejoin="round" />
            
            {/* Divider lines */}
            <line x1="30" y1="45" x2="70" y2="45" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
            <line x1="50" y1="45" x2="50" y2="80" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
            
            {/* V */}
            <text x="50" y="38" fill={lastEdited === "V" ? "#3B82F6" : "#FFFFFF"} fontSize="16" fontWeight="bold" textAnchor="middle">V</text>
            
            {/* I */}
            <text x="35" y="70" fill={lastEdited === "I" ? "#10B981" : "#FFFFFF"} fontSize="16" fontWeight="bold" textAnchor="middle">I</text>
            
            {/* R */}
            <text x="65" y="70" fill={lastEdited === "R" ? "#F59E0B" : "#FFFFFF"} fontSize="16" fontWeight="bold" textAnchor="middle">R</text>
          </svg>
          
          <div className="absolute -bottom-10 left-0 right-0 text-center text-sm text-zinc-500 font-mono">
            V = I × R &nbsp; | &nbsp; I = V / R &nbsp; | &nbsp; R = V / I
          </div>
        </div>

        {/* Input Form */}
        <div className="glass-card p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{t("electronics.ohms.title") || "Ohm's Law Calculator"}</h2>
            <p className="text-sm text-zinc-400 mb-6">{t("electronics.ohms.desc") || "Enter any two values to calculate the third."}</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2 block">Voltage (V)</label>
              <div className="relative">
                <input
                  type="number"
                  className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white text-lg focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="e.g. 12"
                  value={voltage}
                  onChange={(e) => { setVoltage(e.target.value); setLastEdited("V"); }}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 font-bold">Volts</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-green-400 uppercase tracking-wider mb-2 block">Current (I)</label>
              <div className="relative">
                <input
                  type="number"
                  className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white text-lg focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="e.g. 0.12"
                  value={current}
                  onChange={(e) => { setCurrent(e.target.value); setLastEdited("I"); }}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 font-bold">Amps</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-yellow-400 uppercase tracking-wider mb-2 block">Resistance (R)</label>
              <div className="relative">
                <input
                  type="number"
                  className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white text-lg focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="e.g. 100"
                  value={resistance}
                  onChange={(e) => { setResistance(e.target.value); setLastEdited("R"); }}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 font-bold">Ohms</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full mt-6 py-4 rounded-xl bg-white text-black font-bold text-lg hover:bg-zinc-200 transition-colors"
          >
            {t("electronics.ohms.calculate") || "Calculate Missing Value"}
          </button>
        </div>

      </div>
    </div>
  );
}
