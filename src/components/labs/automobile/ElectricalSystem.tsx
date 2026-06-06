"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Battery, Power, Key, Lightbulb, TriangleAlert, Info } from "lucide-react";

export default function ElectricalSystem() {
  const [step, setStep] = useState<"off" | "ignition" | "starting" | "running">("off");
  const [fault, setFault] = useState<"none" | "dead_battery" | "starter_fail">("none");
  const [headlightsOn, setHeadlightsOn] = useState(false);
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  const handleNextStep = () => {
    if (fault === "dead_battery" && step === "off") {
      setStep("ignition"); // Can barely turn on ignition
      return;
    }
    if (fault === "starter_fail" && step === "ignition") {
      setStep("starting"); // Tries to start but fails
      return;
    }
    
    if (step === "off") setStep("ignition");
    else if (step === "ignition") setStep("starting");
    else if (step === "starting") setStep("running");
  };

  const handleReset = () => {
    setStep("off");
    setHeadlightsOn(false);
  };

  const isPowerFlowing = (path: string) => {
    if (fault === "dead_battery") return false;
    
    switch (path) {
      case "ignition": return step !== "off";
      case "starter": return step === "starting";
      case "alternator": return step === "running";
      case "ecu": return step !== "off";
      case "headlights": return headlightsOn && step !== "off";
      default: return false;
    }
  };

  const tooltips: Record<string, { en: string; ta: string }> = {
    battery: { en: "12V Battery: Stores electrical energy.", ta: "பேட்டரி: மின் சக்தியை சேமிக்கிறது." },
    ignition: { en: "Ignition Switch: Activates main relays.", ta: "இக்னிஷன்: முக்கிய சுற்றுகளை இணைக்கிறது." },
    starter: { en: "Starter Motor: Cranks the engine.", ta: "ஸ்டார்ட்டர்: இன்ஜினை சுழற்றுகிறது." },
    alternator: { en: "Alternator: Generates AC power & charges battery.", ta: "ஆல்டர்னேட்டர்: பேட்டரியை சார்ஜ் செய்கிறது." },
    ecu: { en: "ECU: Engine Control Unit (Brain of the car).", ta: "ECU: காரின் மூளை (கட்டுப்பாட்டு அலகு)." },
    fuse: { en: "Fuse Box: Protects circuits from overcurrent.", ta: "பியூஸ்: அதிக மின்னோட்டத்திலிருந்து பாதுகாக்கிறது." }
  };

  return (
    <div className="w-full h-full min-h-[500px] flex gap-6 bg-[#0A0A0A] p-6 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden">
      
      {/* Simulation Area */}
      <div className="flex-1 relative flex flex-col justify-center">
        
        {/* Controls Overlay */}
        <div className="absolute top-4 left-4 flex gap-2 z-10 glass-card p-2 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md">
          <button 
            onClick={handleReset}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white transition-all"
            title="Reset System"
          >
            <Power size={18} />
          </button>
          <button 
            onClick={handleNextStep}
            disabled={step === "running"}
            className="px-4 h-10 flex items-center justify-center gap-2 rounded-lg bg-white text-black font-bold hover:bg-zinc-200 transition-all disabled:opacity-50"
          >
            <Key size={16} />
            {step === "off" ? "Turn Ignition" : step === "ignition" ? "Start Engine" : step === "starting" ? "Release Key" : "Running"}
          </button>
          
          <div className="w-px h-6 bg-white/10 self-center mx-1" />
          
          <button 
            onClick={() => setHeadlightsOn(!headlightsOn)}
            className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-all ${headlightsOn ? "bg-white text-black border-white" : "bg-white/5 text-zinc-400 border-white/5 hover:text-white"}`}
            title="Toggle Headlights"
          >
            <Lightbulb size={18} />
          </button>
        </div>

        {/* Fault Controls Overlay */}
        <div className="absolute top-4 right-4 flex gap-2 z-10 glass-card p-2 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md">
          <button 
            onClick={() => { setFault(fault === "dead_battery" ? "none" : "dead_battery"); handleReset(); }}
            className={`px-3 h-10 flex items-center justify-center gap-2 text-xs font-bold rounded-lg border transition-all ${fault === "dead_battery" ? "bg-red-500/20 text-red-500 border-red-500/50" : "bg-white/5 text-zinc-400 border-white/5 hover:text-white"}`}
          >
            <TriangleAlert size={14} />
            Dead Battery
          </button>
          <button 
            onClick={() => { setFault(fault === "starter_fail" ? "none" : "starter_fail"); handleReset(); }}
            className={`px-3 h-10 flex items-center justify-center gap-2 text-xs font-bold rounded-lg border transition-all ${fault === "starter_fail" ? "bg-orange-500/20 text-orange-500 border-orange-500/50" : "bg-white/5 text-zinc-400 border-white/5 hover:text-white"}`}
          >
            <TriangleAlert size={14} />
            Bad Starter
          </button>
        </div>

        {/* Dynamic Tooltip */}
        {hoveredPart && (
          <div className="absolute bottom-4 left-4 z-20 w-64 glass-card p-4 rounded-xl border border-white/10 bg-black/80 backdrop-blur-xl">
            <h4 className="text-white font-bold mb-2 capitalize border-b border-white/10 pb-2 flex items-center gap-2">
              <Info size={14} className="text-zinc-400" />
              {hoveredPart}
            </h4>
            <p className="text-sm text-zinc-300 mb-2">{tooltips[hoveredPart]?.en}</p>
            <p className="text-xs text-zinc-500 font-medium">{tooltips[hoveredPart]?.ta}</p>
          </div>
        )}

        <svg viewBox="0 0 800 500" className="w-full h-full max-h-[500px] drop-shadow-2xl">
          <defs>
            <linearGradient id="batteryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#222" />
              <stop offset="100%" stopColor="#000" />
            </linearGradient>
            <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#333" />
              <stop offset="50%" stopColor="#555" />
              <stop offset="100%" stopColor="#333" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Grid */}
          <g opacity="0.03">
            {[...Array(16)].map((_, i) => (
              <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="500" stroke="#FFF" strokeWidth="1" />
            ))}
            {[...Array(10)].map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 50} x2="800" y2={i * 50} stroke="#FFF" strokeWidth="1" />
            ))}
          </g>

          {/* Engine Block Outline (Background Context) */}
          <path d="M 300 200 L 600 200 L 600 450 L 300 450 Z" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" strokeDasharray="10 5" />
          <text x="450" y="325" fill="rgba(255,255,255,0.05)" fontSize="24" fontWeight="bold" textAnchor="middle">ENGINE BLOCK</text>

          {/* WIRING HARNESS */}
          {/* Main Battery to Fuse Box */}
          <path d="M 160 380 L 160 250 L 220 250" fill="none" stroke="#2A2A2A" strokeWidth="6" />
          <motion.path d="M 160 380 L 160 250 L 220 250" fill="none" stroke="#FFFFFF" strokeWidth="3" filter="url(#glow)"
            animate={{ strokeDasharray: isPowerFlowing("ignition") ? ["0, 100", "100, 0"] : "0, 100", strokeDashoffset: isPowerFlowing("ignition") ? [100, 0] : 0 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }} opacity={isPowerFlowing("ignition") ? 1 : 0}
          />

          {/* Fuse Box to Ignition */}
          <path d="M 280 250 L 350 250 L 350 150" fill="none" stroke="#2A2A2A" strokeWidth="4" />
          <motion.path d="M 280 250 L 350 250 L 350 150" fill="none" stroke="#FFFFFF" strokeWidth="2" filter="url(#glow)"
            animate={{ strokeDasharray: isPowerFlowing("ignition") ? ["0, 100", "100, 0"] : "0, 100" }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }} opacity={isPowerFlowing("ignition") ? 1 : 0}
          />

          {/* Ignition to ECU */}
          <path d="M 350 110 L 350 60 L 500 60" fill="none" stroke="#2A2A2A" strokeWidth="4" />
          <motion.path d="M 350 110 L 350 60 L 500 60" fill="none" stroke="#FFFFFF" strokeWidth="2" filter="url(#glow)"
            animate={{ strokeDasharray: isPowerFlowing("ecu") ? ["0, 100", "100, 0"] : "0, 100" }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }} opacity={isPowerFlowing("ecu") ? 1 : 0}
          />

          {/* Battery to Starter (Heavy Wire) */}
          <path d="M 180 380 L 180 420 L 400 420 L 400 380" fill="none" stroke="#2A2A2A" strokeWidth="8" />
          <motion.path d="M 180 380 L 180 420 L 400 420 L 400 380" fill="none" stroke="#4287f5" strokeWidth="4" filter="url(#glow)"
            animate={{ strokeDasharray: isPowerFlowing("starter") ? ["0, 50", "50, 0"] : "0, 50" }}
            transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }} opacity={isPowerFlowing("starter") ? 1 : 0}
          />

          {/* ECU to Starter Relay (Control Wire) */}
          <path d="M 500 100 L 420 100 L 420 340" fill="none" stroke="#2A2A2A" strokeWidth="2" strokeDasharray="4" />
          <motion.path d="M 500 100 L 420 100 L 420 340" fill="none" stroke="#FFFFFF" strokeWidth="2" filter="url(#glow)" strokeDasharray="4"
            animate={{ strokeDashoffset: isPowerFlowing("starter") ? [20, 0] : 0 }}
            transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }} opacity={isPowerFlowing("starter") ? 1 : 0}
          />

          {/* Alternator to Battery (Charge Wire) */}
          <path d="M 520 280 L 520 250 L 140 250 L 140 380" fill="none" stroke="#2A2A2A" strokeWidth="6" />
          <motion.path d="M 520 280 L 520 250 L 140 250 L 140 380" fill="none" stroke="#ff4444" strokeWidth="3" filter="url(#glow)"
            animate={{ strokeDasharray: isPowerFlowing("alternator") ? ["0, 100", "100, 0"] : "0, 100" }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} opacity={isPowerFlowing("alternator") ? 1 : 0}
          />

          {/* Fuse Box to Headlights */}
          <path d="M 250 220 L 250 80 L 100 80" fill="none" stroke="#2A2A2A" strokeWidth="4" />
          <motion.path d="M 250 220 L 250 80 L 100 80" fill="none" stroke="#FFFFFF" strokeWidth="2" filter="url(#glow)"
            animate={{ strokeDasharray: isPowerFlowing("headlights") ? ["0, 100", "100, 0"] : "0, 100" }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }} opacity={isPowerFlowing("headlights") ? 1 : 0}
          />


          {/* COMPONENTS */}
          
          {/* 1. Battery */}
          <g transform="translate(120, 380)" 
            onMouseEnter={() => setHoveredPart("battery")} onMouseLeave={() => setHoveredPart(null)} className="cursor-pointer">
            <rect x="0" y="0" width="80" height="60" rx="4" fill="url(#batteryGrad)" stroke="#555" strokeWidth="2" />
            <rect x="15" y="-10" width="15" height="10" fill={fault === "dead_battery" ? "#ff4444" : "#ff4444"} />
            <rect x="50" y="-10" width="15" height="10" fill="#111" />
            <text x="22" y="35" fill="#FFF" fontSize="24" fontWeight="bold">12V</text>
            {fault === "dead_battery" && (
              <text x="40" y="80" fill="#ff4444" fontSize="12" fontWeight="bold" textAnchor="middle">DEAD</text>
            )}
          </g>

          {/* 2. Fuse Box */}
          <g transform="translate(220, 220)"
            onMouseEnter={() => setHoveredPart("fuse")} onMouseLeave={() => setHoveredPart(null)} className="cursor-pointer">
            <rect x="0" y="0" width="60" height="60" rx="4" fill="#1A1A1A" stroke="#555" strokeWidth="2" />
            {[0,1,2].map(i => (
              <rect key={i} x="10" y={10 + i * 15} width="40" height="8" fill={isPowerFlowing("ignition") ? "#FFF" : "#333"} filter={isPowerFlowing("ignition") ? "url(#glow)" : ""} />
            ))}
            <text x="30" y="80" fill="#A1A1AA" fontSize="12" fontWeight="bold" textAnchor="middle">FUSE BOX</text>
          </g>

          {/* 3. Ignition Switch */}
          <g transform="translate(330, 110)"
            onMouseEnter={() => setHoveredPart("ignition")} onMouseLeave={() => setHoveredPart(null)} className="cursor-pointer">
            <circle cx="20" cy="20" r="20" fill="#111" stroke="#555" strokeWidth="2" />
            <motion.rect x="16" y="5" width="8" height="30" rx="4" fill="#FFF" 
              animate={{ rotate: step === "off" ? 0 : step === "ignition" ? 45 : 90 }}
              style={{ transformOrigin: "20px 20px" }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            />
            <text x="20" y="60" fill="#A1A1AA" fontSize="12" fontWeight="bold" textAnchor="middle">IGNITION</text>
          </g>

          {/* 4. ECU */}
          <g transform="translate(500, 40)"
            onMouseEnter={() => setHoveredPart("ecu")} onMouseLeave={() => setHoveredPart(null)} className="cursor-pointer">
            <rect x="0" y="0" width="100" height="80" rx="8" fill="#111" stroke="#555" strokeWidth="2" />
            <rect x="10" y="10" width="80" height="60" rx="4" fill="#1A1A1A" />
            <motion.circle cx="80" cy="20" r="4" fill="#4287f5" filter="url(#glow)"
              animate={{ opacity: isPowerFlowing("ecu") ? [0.2, 1, 0.2] : 0.2 }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
            <text x="50" y="45" fill="#FFF" fontSize="16" fontWeight="bold" textAnchor="middle">ECU</text>
          </g>

          {/* 5. Starter Motor */}
          <g transform="translate(380, 340)"
            onMouseEnter={() => setHoveredPart("starter")} onMouseLeave={() => setHoveredPart(null)} className="cursor-pointer">
            <rect x="0" y="0" width="60" height="40" rx="4" fill="url(#metalGrad)" stroke="#555" strokeWidth="2" />
            <rect x="-10" y="10" width="10" height="20" fill="#333" />
            <motion.g animate={{ x: isPowerFlowing("starter") ? [-2, 2, -2] : 0 }} transition={{ duration: 0.05, repeat: Infinity }}>
              <circle cx="30" cy="20" r="10" fill="#111" />
              {fault === "starter_fail" && step === "starting" && (
                <path d="M 20 10 L 40 30 M 40 10 L 20 30" stroke="#ff4444" strokeWidth="3" />
              )}
            </motion.g>
            <text x="30" y="60" fill="#A1A1AA" fontSize="12" fontWeight="bold" textAnchor="middle">STARTER</text>
          </g>

          {/* 6. Alternator */}
          <g transform="translate(500, 280)"
            onMouseEnter={() => setHoveredPart("alternator")} onMouseLeave={() => setHoveredPart(null)} className="cursor-pointer">
            <circle cx="30" cy="30" r="30" fill="url(#metalGrad)" stroke="#555" strokeWidth="2" />
            <motion.circle cx="30" cy="30" r="15" fill="#111" strokeDasharray="10 10" stroke="#FFF" strokeWidth="4"
              animate={{ rotate: isPowerFlowing("alternator") ? 360 : 0 }}
              style={{ transformOrigin: "30px 30px" }}
              transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
            />
            <text x="30" y="80" fill="#A1A1AA" fontSize="12" fontWeight="bold" textAnchor="middle">ALTERNATOR</text>
          </g>

          {/* 7. Headlight */}
          <g transform="translate(40, 50)"
             className="cursor-pointer">
            <path d="M 60 0 Q 80 30 60 60 L 0 50 L 0 10 Z" fill="#111" stroke="#555" strokeWidth="2" />
            {isPowerFlowing("headlights") && (
              <motion.path d="M 0 50 L -100 100 L -100 -40 Z" fill="rgba(255,255,255,0.2)" filter="url(#glow)"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              />
            )}
            <text x="30" y="80" fill="#A1A1AA" fontSize="12" fontWeight="bold" textAnchor="middle">HEADLIGHT</text>
          </g>

        </svg>
      </div>

      {/* Side Explanation Panel */}
      <div className="w-80 shrink-0 flex flex-col gap-4">
        <div className="glass-card p-6 rounded-2xl border border-white/10 bg-black/40 relative overflow-hidden flex-1">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-white" />
          <h3 className="text-xl font-black text-white mb-4 tracking-tight">Electrical Flow</h3>
          
          <div className="space-y-4">
            <div className={`p-4 rounded-xl border transition-all duration-300 ${step === "off" ? 'border-white/30 bg-white/5' : 'border-white/5 bg-transparent opacity-50'}`}>
              <h4 className="text-white font-bold mb-1">0. System OFF</h4>
              <p className="text-sm text-zinc-400">Battery contains 12V potential. All circuits are open.</p>
            </div>

            <div className={`p-4 rounded-xl border transition-all duration-300 ${step === "ignition" ? 'border-white/30 bg-white/5' : 'border-white/5 bg-transparent opacity-50'}`}>
              <h4 className="text-white font-bold mb-1">1. Ignition ON</h4>
              <p className="text-sm text-zinc-400">Main relays close. ECU powers up and dashboard activates.</p>
              {fault === "dead_battery" && <p className="text-xs text-red-400 mt-2 font-bold">FAULT: Battery voltage too low to engage relays.</p>}
            </div>

            <div className={`p-4 rounded-xl border transition-all duration-300 ${step === "starting" ? 'border-white/30 bg-white/5' : 'border-white/5 bg-transparent opacity-50'}`}>
              <h4 className="text-white font-bold mb-1">2. Starting System</h4>
              <p className="text-sm text-zinc-400">High current flows to starter motor. Engine cranks.</p>
              {fault === "starter_fail" && <p className="text-xs text-orange-400 mt-2 font-bold">FAULT: Starter motor solenoid jammed. Engine won't crank.</p>}
            </div>

            <div className={`p-4 rounded-xl border transition-all duration-300 ${step === "running" ? 'border-white/30 bg-white/5' : 'border-white/5 bg-transparent opacity-50'}`}>
              <h4 className="text-white font-bold mb-1">3. Engine Running</h4>
              <p className="text-sm text-zinc-400">Alternator generates AC, rectifies to DC, and recharges the battery.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
