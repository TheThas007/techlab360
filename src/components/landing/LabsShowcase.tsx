"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";

const PREVIEWS = [
  {
    id: "automobile",
    label: "Automobile Lab",
    component: () => (
      <svg viewBox="0 0 400 300" className="w-full h-full drop-shadow-2xl">
        <defs>
          <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2A2A2A" />
            <stop offset="100%" stopColor="#111111" />
          </linearGradient>
          <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill="#0A0A0A" rx="16" />
        
        {/* Engine Block */}
        <path d="M120 180 L280 180 L300 240 L100 240 Z" fill="url(#metal)" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
        <rect x="140" y="100" width="120" height="80" fill="url(#metal)" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
        
        {/* Pistons */}
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${160 + i * 40}, 0)`}>
            <rect x="0" y="110" width="20" height="40" fill="#111111" />
            <motion.rect
              x="2" y="115" width="16" height="20" fill="#FFFFFF"
              animate={{ y: [115, 125, 115] }}
              transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
            />
          </g>
        ))}

        {/* UI Overlay */}
        <rect x="20" y="20" width="100" height="60" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <text x="30" y="45" fill="#FFFFFF" fontSize="12" fontWeight="bold">RPM</text>
        <text x="30" y="65" fill="#A1A1AA" fontSize="16" fontWeight="bold">3,200</text>
      </svg>
    ),
  },
  {
    id: "electronics",
    label: "Electronics Lab",
    component: () => (
      <svg viewBox="0 0 400 300" className="w-full h-full drop-shadow-2xl">
        <rect width="400" height="300" fill="#0A0A0A" rx="16" />
        
        {/* Grid */}
        <pattern id="grid2" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.1)" />
        </pattern>
        <rect width="400" height="300" fill="url(#grid2)" />

        {/* Circuit */}
        <path d="M100 200 L100 100 L300 100 L300 200 Z" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
        
        {/* Battery */}
        <rect x="70" y="140" width="60" height="20" fill="#111" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
        <text x="80" y="154" fill="#FFF" fontSize="12">9V</text>

        {/* Resistor */}
        <path d="M180 100 l10 -10 l20 20 l20 -20 l20 20 l10 -10" fill="none" stroke="#FFF" strokeWidth="3" />

        {/* LED (Glowing) */}
        <circle cx="300" cy="150" r="15" fill="#111" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
        <motion.circle 
          cx="300" cy="150" r="10" fill="#FFF" 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.circle 
          cx="300" cy="150" r="25" fill="#FFF" opacity="0.1"
          animate={{ r: [20, 30, 20] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </svg>
    ),
  },
  {
    id: "civil",
    label: "Civil Eng",
    component: () => (
      <svg viewBox="0 0 400 300" className="w-full h-full drop-shadow-2xl">
        <rect width="400" height="300" fill="#0A0A0A" rx="16" />
        {/* Grid pattern */}
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        </pattern>
        <rect width="400" height="300" fill="url(#grid)" />
        
        {/* Supports */}
        <path d="M80 200 L120 200 L100 160 Z" fill="#2A2A2A" stroke="rgba(255,255,255,0.2)" />
        <path d="M280 200 L320 200 L300 160 Z" fill="#2A2A2A" stroke="rgba(255,255,255,0.2)" />
        <circle cx="300" cy="205" r="5" fill="#52525B" />
        
        {/* Beam */}
        <rect x="80" y="150" width="240" height="10" fill="#E4E4E7" />
        
        {/* Load Arrow */}
        <motion.g 
          animate={{ y: [0, 10, 0] }} 
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M200 60 L200 140" stroke="#FFFFFF" strokeWidth="4" strokeDasharray="4 4" />
          <path d="M190 130 L200 145 L210 130 Z" fill="#FFFFFF" />
          <rect x="175" y="30" width="50" height="30" rx="4" fill="#FFFFFF" />
          <text x="200" y="50" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle">50 kN</text>
        </motion.g>
      </svg>
    ),
  },
  {
    id: "chemistry",
    label: "Chemistry Lab",
    component: () => (
      <svg viewBox="0 0 400 300" className="w-full h-full drop-shadow-2xl">
        <rect width="400" height="300" fill="#0A0A0A" rx="16" />
        
        {/* Stand */}
        <rect x="195" y="50" width="10" height="200" fill="#2A2A2A" />
        <rect x="150" y="240" width="100" height="10" fill="#2A2A2A" />
        <rect x="170" y="140" width="30" height="5" fill="#52525B" />

        {/* Flask */}
        <path d="M220 180 Q250 240 250 250 A20 20 0 0 1 230 270 L170 270 A20 20 0 0 1 150 250 Q150 240 180 180 L180 120 L220 120 Z" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
        
        {/* Liquid */}
        <path d="M165 210 Q200 205 235 210 L245 250 A15 15 0 0 1 230 265 L170 265 A15 15 0 0 1 155 250 Z" fill="#FFFFFF" opacity="0.8" />
        
        {/* Bubbles */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.circle
            key={i}
            cx={180 + i * 15}
            cy="250"
            r={2 + Math.random() * 3}
            fill="#000000"
            opacity="0.5"
            animate={{ y: [0, -40], opacity: [0.5, 0] }}
            transition={{ duration: 1 + Math.random(), repeat: Infinity, delay: Math.random() }}
          />
        ))}

        {/* Drops */}
        <motion.circle
          cx="200" cy="100" r="4" fill="#FFFFFF"
          animate={{ y: [0, 100], opacity: [1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </svg>
    ),
  },
];

export default function LabsShowcase() {
  const [activeTab, setActiveTab] = useState(PREVIEWS[0].id);

  return (
    <section id="labs" className="py-24 relative bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6">
            Experience the <span className="text-zinc-500">laboratories</span>
          </h2>
          <p className="text-lg text-zinc-400">
            Click through the tabs below to preview the highly interactive virtual environments.
          </p>
        </div>

        <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-2xl">
          {/* Tabs Sidebar */}
          <div className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-white/5 p-4 flex flex-row lg:flex-col gap-2 overflow-x-auto">
            {PREVIEWS.map((preview) => (
              <button
                key={preview.id}
                onClick={() => setActiveTab(preview.id)}
                className={`flex items-center justify-between px-5 py-4 rounded-xl font-medium transition-all duration-200 shrink-0 lg:shrink whitespace-nowrap ${
                  activeTab === preview.id
                    ? "bg-white text-black shadow-md"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {preview.label}
                {activeTab === preview.id && (
                  <Play className="w-4 h-4" />
                )}
              </button>
            ))}
          </div>

          {/* Preview Area */}
          <div className="flex-1 p-6 lg:p-10 relative min-h-[400px] flex items-center justify-center bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')]">
            <AnimatePresence mode="wait">
              {PREVIEWS.map((preview) =>
                preview.id === activeTab ? (
                  <motion.div
                    key={preview.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="w-full max-w-2xl aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0A0A0A]"
                  >
                    <preview.component />
                  </motion.div>
                ) : null
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
