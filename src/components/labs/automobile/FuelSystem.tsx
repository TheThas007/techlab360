"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function FuelSystem() {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-4xl aspect-video relative flex items-center justify-center bg-[#0A0A0A] rounded-2xl border border-white/5 shadow-2xl p-4">
      <svg viewBox="0 0 1000 400" className="w-full h-full">
        {/* Fuel Tank */}
        <rect x="50" y="150" width="150" height="100" rx="16" fill="#141414" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
        <text x="125" y="205" fill="#FFFFFF" fontSize="18" fontWeight="bold" textAnchor="middle">Fuel Tank</text>
        <path d="M50 200 Q125 190 200 200 L200 250 L50 250 Z" fill="#FFFFFF" opacity="0.1" />

        {/* Lines */}
        <path d="M200 220 L300 220 L300 150 L400 150" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />
        <path d="M500 150 L650 150" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />
        <path d="M750 150 L850 150" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />

        {/* Fuel Particles Animation */}
        {[...Array(20)].map((_, i) => (
          <motion.circle
            key={i}
            r="4" fill="#4287f5"
            animate={{
              cx: [200, 300, 300, 400, 500, 650, 750, 850],
              cy: [220, 220, 150, 150, 150, 150, 150, 150],
            }}
            transition={{
              duration: 4, repeat: Infinity, ease: "linear", delay: i * 0.2
            }}
          />
        ))}

        {/* Fuel Pump */}
        <circle cx="450" cy="150" r="50" fill="#1A1A1A" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
        <motion.circle cx="450" cy="150" r="30" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeDasharray="10 10" animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
        <text x="450" y="230" fill="#FFFFFF" fontSize="16" fontWeight="bold" textAnchor="middle">Fuel Pump</text>

        {/* Fuel Filter */}
        <rect x="650" y="120" width="100" height="60" rx="8" fill="#141414" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
        <line x1="680" y1="120" x2="680" y2="180" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
        <line x1="700" y1="120" x2="700" y2="180" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
        <line x1="720" y1="120" x2="720" y2="180" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
        <text x="700" y="210" fill="#FFFFFF" fontSize="16" fontWeight="bold" textAnchor="middle">Fuel Filter</text>

        {/* Engine/Injector */}
        <path d="M850 130 L900 130 L880 180 Z" fill="#2A2A2A" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
        <rect x="850" y="180" width="50" height="100" fill="#0A0A0A" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
        <text x="875" y="310" fill="#FFFFFF" fontSize="16" fontWeight="bold" textAnchor="middle">Engine</text>
        
        {/* Spray Animation */}
        <motion.path d="M875 180 L860 250 L890 250 Z" fill="#4287f5" animate={{ opacity: [0, 0.5, 0] }} transition={{ duration: 0.5, repeat: Infinity }} />
      </svg>
    </div>
  );
}
