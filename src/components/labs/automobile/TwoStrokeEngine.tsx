"use client";

import { motion, useAnimation, useMotionValue } from "framer-motion";
import { useState, useEffect } from "react";
import { Play, Pause, StepForward, Info } from "lucide-react";

export default function TwoStrokeEngine({ rpm }: { rpm: number }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [step, setStep] = useState<"up" | "down">("down");
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  const duration = 60 / rpm;

  // Tooltip content
  const tooltips: Record<string, { en: string; ta: string }> = {
    piston: { en: "Piston: Compresses mixture & transfers power.", ta: "பிஸ்டன்: எரிபொருளை அழுத்தி சக்தியை உருவாக்குகிறது." },
    spark: { en: "Spark Plug: Ignites the compressed mixture.", ta: "ஸ்பார்க் பிளக்: அழுத்தப்பட்ட எரிபொருளை எரிக்கிறது." },
    crankcase: { en: "Crankcase: Draws in new fuel-air mixture.", ta: "கிராங்க்கேஸ்: புதிய எரிபொருள் கலவையை உள்ளிழுக்கிறது." },
    intake: { en: "Intake Port: Entry point for fuel & air.", ta: "இன்டேக் போர்ட்: எரிபொருள் உள்ளே வரும் வழி." },
    exhaust: { en: "Exhaust Port: Exit for burnt gases.", ta: "எக்ஸாஸ்ட் போர்ட்: கழிவு புகை வெளியேறும் வழி." },
    transfer: { en: "Transfer Port: Moves mixture to cylinder.", ta: "டிரான்ஸ்ஃபர் போர்ட்: கலவையை சிலிண்டருக்கு அனுப்புகிறது." }
  };

  const handleStep = () => {
    setIsPlaying(false);
    setStep((prev) => (prev === "down" ? "up" : "down"));
  };

  return (
    <div className="w-full h-full min-h-[500px] flex gap-6 bg-[#0A0A0A] p-6 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden">
      
      {/* Simulation Area */}
      <div className="flex-1 relative flex items-center justify-center">
        {/* Controls Overlay */}
        <div className="absolute top-4 left-4 flex gap-2 z-10 glass-card p-2 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white transition-all"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button 
            onClick={handleStep}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white transition-all"
            title="Step Forward"
          >
            <StepForward size={18} />
          </button>
        </div>

        {/* Dynamic Tooltip */}
        {hoveredPart && (
          <div className="absolute top-4 right-4 z-20 w-64 glass-card p-4 rounded-xl border border-white/10 bg-black/80 backdrop-blur-xl">
            <h4 className="text-white font-bold mb-2 capitalize border-b border-white/10 pb-2 flex items-center gap-2">
              <Info size={14} className="text-zinc-400" />
              {hoveredPart.replace("port", " Port")}
            </h4>
            <p className="text-sm text-zinc-300 mb-2">{tooltips[hoveredPart].en}</p>
            <p className="text-xs text-zinc-500 font-medium">{tooltips[hoveredPart].ta}</p>
          </div>
        )}

        <svg viewBox="0 0 500 600" className="w-full h-full max-h-[500px] drop-shadow-2xl">
          <defs>
            <linearGradient id="metal" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1A1A1A" />
              <stop offset="50%" stopColor="#2A2A2A" />
              <stop offset="100%" stopColor="#1A1A1A" />
            </linearGradient>
            <linearGradient id="pistonMetal" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#52525B" />
              <stop offset="50%" stopColor="#A1A1AA" />
              <stop offset="100%" stopColor="#52525B" />
            </linearGradient>
          </defs>

          {/* Background Grid */}
          <g opacity="0.05">
            {[...Array(10)].map((_, i) => (
              <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="600" stroke="#FFF" strokeWidth="1" />
            ))}
            {[...Array(12)].map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 50} x2="500" y2={i * 50} stroke="#FFF" strokeWidth="1" />
            ))}
          </g>

          {/* Engine Block */}
          <path 
            d="M 180 150 L 320 150 L 320 250 L 360 250 L 360 300 L 320 300 L 320 400 A 100 100 0 0 1 180 400 L 180 350 L 140 350 L 140 280 L 180 280 Z" 
            fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="4" 
          />

          {/* Intake Port (Left) */}
          <path 
            d="M 140 280 L 180 280 L 180 350 L 140 350 Z" 
            fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="4"
            onMouseEnter={() => setHoveredPart("intake")}
            onMouseLeave={() => setHoveredPart(null)}
            className="cursor-pointer hover:stroke-white transition-all"
          />
          <text x="100" y="320" fill="#A1A1AA" fontSize="12" fontWeight="bold">INTAKE</text>

          {/* Transfer Port (Left Wall) */}
          <path 
            d="M 160 200 L 180 200 L 180 280 L 160 280 Z" 
            fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="4"
            onMouseEnter={() => setHoveredPart("transfer")}
            onMouseLeave={() => setHoveredPart(null)}
            className="cursor-pointer hover:stroke-white transition-all"
          />

          {/* Exhaust Port (Right) */}
          <path 
            d="M 320 250 L 360 250 L 360 300 L 320 300 Z" 
            fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="4"
            onMouseEnter={() => setHoveredPart("exhaust")}
            onMouseLeave={() => setHoveredPart(null)}
            className="cursor-pointer hover:stroke-white transition-all"
          />
          <text x="370" y="280" fill="#A1A1AA" fontSize="12" fontWeight="bold">EXHAUST</text>

          {/* Intake Flow Animation */}
          <motion.g
            animate={isPlaying ? { opacity: [0, 0.5, 0], x: [140, 180, 180] } : { opacity: step === "up" ? 0.5 : 0 }}
            transition={{ duration, repeat: Infinity, ease: "linear", times: [0, 0.5, 1] }}
          >
            <circle cx="0" cy="315" r="4" fill="#4287f5" />
            <circle cx="-10" cy="300" r="4" fill="#4287f5" />
            <circle cx="-20" cy="330" r="4" fill="#4287f5" />
          </motion.g>

          {/* Transfer Flow Animation */}
          <motion.g
            animate={isPlaying ? { opacity: [0, 0.5, 0], y: [280, 240, 200] } : { opacity: step === "down" ? 0.5 : 0 }}
            transition={{ duration, repeat: Infinity, ease: "linear", delay: duration/2 }}
          >
            <circle cx="170" cy="0" r="4" fill="#4287f5" />
            <circle cx="165" cy="10" r="4" fill="#4287f5" />
          </motion.g>

          {/* Combustion / Spark */}
          <rect 
            x="240" y="140" width="20" height="20" fill="#52525B"
            onMouseEnter={() => setHoveredPart("spark")}
            onMouseLeave={() => setHoveredPart(null)}
            className="cursor-pointer"
          />
          <motion.circle
            cx="250" cy="165" r="20" fill="#FFFFFF"
            animate={isPlaying ? { opacity: [0, 0, 1, 0, 0] } : { opacity: step === "down" ? 1 : 0 }}
            transition={{ duration, repeat: Infinity, ease: "linear", times: [0, 0.1, 0.15, 0.2, 1] }}
          />

          {/* Cylinder Combustion Area Color */}
          <motion.rect
            x="180" y="150" width="140" height="150"
            animate={isPlaying ? { fill: ["#111111", "#111111", "#ff4444", "#555555"] } : { fill: step === "down" ? "#ff4444" : "#111111" }}
            transition={{ duration, repeat: Infinity, ease: "linear", times: [0, 0.1, 0.15, 0.8] }}
            opacity="0.2"
          />

          {/* Exhaust Smoke Animation */}
          <motion.g
            animate={isPlaying ? { opacity: [0, 0, 0.6, 0], x: [320, 320, 360, 400] } : { opacity: step === "down" ? 0.6 : 0 }}
            transition={{ duration, repeat: Infinity, ease: "linear", times: [0, 0.5, 0.6, 1] }}
          >
            <circle cx="0" cy="275" r="8" fill="#555555" />
            <circle cx="10" cy="265" r="12" fill="#555555" />
            <circle cx="15" cy="285" r="10" fill="#555555" />
          </motion.g>

          {/* Piston */}
          <motion.g
            animate={isPlaying ? { y: [0, -100, 0] } : { y: step === "up" ? -100 : 0 }}
            transition={isPlaying ? { duration, repeat: Infinity, ease: "easeInOut" } : { duration: 0.5 }}
            onMouseEnter={() => setHoveredPart("piston")}
            onMouseLeave={() => setHoveredPart(null)}
            className="cursor-pointer"
          >
            <rect x="182" y="250" width="136" height="80" rx="8" fill="url(#pistonMetal)" stroke="#FFFFFF" strokeWidth="1" />
            <rect x="182" y="260" width="136" height="4" fill="#2A2A2A" />
            <rect x="182" y="270" width="136" height="4" fill="#2A2A2A" />
            
            {/* Connecting Rod */}
            <rect x="240" y="310" width="20" height="120" fill="url(#metal)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <circle cx="250" cy="310" r="8" fill="#1A1A1A" />
          </motion.g>

          {/* Crankcase Area */}
          <circle 
            cx="250" cy="450" r="90" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" strokeDasharray="4" 
            onMouseEnter={() => setHoveredPart("crankcase")}
            onMouseLeave={() => setHoveredPart(null)}
            className="cursor-pointer hover:stroke-white transition-all"
          />

          {/* Crankshaft */}
          <circle cx="250" cy="450" r="40" fill="#1A1A1A" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
          <motion.circle
            cx="250" cy="410" r="10" fill="#FFF"
            animate={isPlaying ? { rotate: 360 } : { rotate: step === "up" ? 180 : 0 }}
            style={{ transformOrigin: "250px 450px" }}
            transition={isPlaying ? { duration, repeat: Infinity, ease: "linear" } : { duration: 0.5 }}
          />
        </svg>
      </div>

      {/* Side Explanation Panel */}
      <div className="w-80 shrink-0 flex flex-col gap-4">
        <div className="glass-card p-6 rounded-2xl border border-white/10 bg-black/40 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-zinc-500 to-white" />
          <h3 className="text-xl font-black text-white mb-4 tracking-tight">2-Stroke Cycle</h3>
          
          <div className="space-y-6">
            <div className={`p-4 rounded-xl border transition-all duration-300 ${(!isPlaying && step === "up") || (isPlaying) ? 'border-white/30 bg-white/5' : 'border-white/5 bg-transparent opacity-50'}`}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center text-xs font-bold">1</div>
                <h4 className="text-white font-bold">Upward Stroke</h4>
              </div>
              <p className="text-sm text-zinc-300 mb-2">Piston moves up, compressing mixture in cylinder while sucking new mixture into crankcase.</p>
              <p className="text-xs text-zinc-500 font-medium">பிஸ்டன் மேலே நகரும் போது கலவை அழுத்தப்படுகிறது, அதேசமயம் புதிய கலவை உள்ளே வருகிறது.</p>
            </div>

            <div className={`p-4 rounded-xl border transition-all duration-300 ${(!isPlaying && step === "down") || (isPlaying) ? 'border-white/30 bg-white/5' : 'border-white/5 bg-transparent opacity-50'}`}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center text-xs font-bold">2</div>
                <h4 className="text-white font-bold">Downward Stroke</h4>
              </div>
              <p className="text-sm text-zinc-300 mb-2">Spark ignites, pushing piston down (Power). Burnt gases exit while new mixture transfers up.</p>
              <p className="text-xs text-zinc-500 font-medium">ஸ்பார்க் எரிந்து பிஸ்டனை கீழே தள்ளுகிறது. புகை வெளியேறி புதிய கலவை சிலிண்டருக்கு செல்கிறது.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
