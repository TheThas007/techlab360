"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Play, Pause, StepForward, RotateCcw, Info } from "lucide-react";

export default function BrakeSystem() {
  const [mode, setMode] = useState<"auto" | "step">("auto");
  const [step, setStep] = useState(0); // 0: Idle, 1: Pedal, 2: Pressure, 3: Caliper, 4: Friction/Stop
  const [isPlaying, setIsPlaying] = useState(false);
  const [wheelSpeed, setWheelSpeed] = useState(360); // degrees per second
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  // Auto-run simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (mode === "auto" && isPlaying) {
      if (step < 4) {
        timer = setTimeout(() => setStep(s => s + 1), 800);
      }
    }
    return () => clearTimeout(timer);
  }, [step, mode, isPlaying]);

  // Handle Wheel Speed Deceleration
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 4) {
      timer = setInterval(() => {
        setWheelSpeed((prev) => Math.max(0, prev - 10)); // Decelerate
      }, 50);
    } else {
      setWheelSpeed(360); // Full speed
    }
    return () => clearInterval(timer);
  }, [step]);

  const handleReset = () => {
    setStep(0);
    setWheelSpeed(360);
    if (mode === "auto") setIsPlaying(false);
  };

  const tooltips: Record<string, { en: string; ta: string }> = {
    pedal: { en: "Brake Pedal: Driver's input to the system.", ta: "பிரேக் பெடல்: டிரைவர் மிதிக்கும் பகுதி." },
    master: { en: "Master Cylinder: Converts mechanical force to hydraulic pressure.", ta: "மாஸ்டர் சிலிண்டர்: இயந்திர விசையை திரவ அழுத்தமாக மாற்றுகிறது." },
    line: { en: "Hydraulic Line: Carries brake fluid under high pressure.", ta: "ஹைட்ராலிக் லைன்: அழுத்தப்பட்ட திரவத்தை கடத்துகிறது." },
    caliper: { en: "Caliper: Squeezes brake pads against the rotor.", ta: "காலிப்பர்: பிரேக் பேடுகளை சுழலும் தட்டின் மீது அழுத்துகிறது." },
    pads: { en: "Brake Pads: High-friction material that slows the disc.", ta: "பிரேக் பேடுகள்: தட்டை உரசும் உராயும் பொருள்." },
    rotor: { en: "Disc Rotor: Spins with the wheel. Friction slows it down.", ta: "டிஸ்க் ரோட்டர்: சக்கரத்துடன் சுழலும் இரும்பு தட்டு." },
  };

  // State calculations for SVG animation
  const pedalRot = step >= 1 ? 15 : 0;
  const cylinderPos = step >= 1 ? 10 : 0;
  const fluidOpacity = step >= 2 ? 1 : 0.3;
  const caliperPos = step >= 3 ? 5 : 0;
  const frictionGlow = step === 4 ? 0.8 : 0;

  return (
    <div className="w-full h-full min-h-[500px] flex gap-6 bg-[#0A0A0A] p-6 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden">
      
      {/* Simulation Area */}
      <div className="flex-1 relative flex items-center justify-center">
        
        {/* Controls Overlay */}
        <div className="absolute top-4 left-4 flex gap-2 z-10 glass-card p-2 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md">
          <button 
            onClick={() => { setMode("auto"); setIsPlaying(!isPlaying); if(step === 4) handleReset(); }}
            className={`px-3 h-10 flex items-center justify-center gap-2 rounded-lg transition-all font-bold text-xs ${mode === "auto" ? "bg-white text-black" : "bg-white/5 text-zinc-400 hover:text-white"}`}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />} Auto Play
          </button>
          
          <div className="w-px h-6 bg-white/10 self-center mx-1" />
          
          <button 
            onClick={() => { setMode("step"); setIsPlaying(false); setStep(s => s < 4 ? s + 1 : s); }}
            className={`px-3 h-10 flex items-center justify-center gap-2 rounded-lg transition-all font-bold text-xs ${mode === "step" ? "bg-white text-black" : "bg-white/5 text-zinc-400 hover:text-white"}`}
          >
            <StepForward size={14} /> Step Mode
          </button>

          <button 
            onClick={handleReset}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 text-zinc-400 hover:text-white transition-all ml-2"
          >
            <RotateCcw size={16} />
          </button>
        </div>

        {/* Dynamic Tooltip */}
        {hoveredPart && (
          <div className="absolute top-4 right-4 z-20 w-64 glass-card p-4 rounded-xl border border-white/10 bg-black/80 backdrop-blur-xl">
            <h4 className="text-white font-bold mb-2 capitalize border-b border-white/10 pb-2 flex items-center gap-2">
              <Info size={14} className="text-zinc-400" />
              {hoveredPart.replace("_", " ")}
            </h4>
            <p className="text-sm text-zinc-300 mb-2">{tooltips[hoveredPart]?.en}</p>
            <p className="text-xs text-zinc-500 font-medium">{tooltips[hoveredPart]?.ta}</p>
          </div>
        )}

        <svg viewBox="0 0 800 500" className="w-full h-full max-h-[500px] drop-shadow-2xl">
          <defs>
            <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#888" />
              <stop offset="50%" stopColor="#CCC" />
              <stop offset="100%" stopColor="#555" />
            </linearGradient>
            <linearGradient id="darkMetal" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#333" />
              <stop offset="100%" stopColor="#111" />
            </linearGradient>
            <radialGradient id="heatGlow">
              <stop offset="60%" stopColor="rgba(255, 68, 0, 0)" />
              <stop offset="80%" stopColor={`rgba(255, 68, 0, ${frictionGlow})`} />
              <stop offset="100%" stopColor="rgba(255, 68, 0, 0)" />
            </radialGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Elements */}
          <g opacity="0.05">
            {[...Array(16)].map((_, i) => (
              <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="500" stroke="#FFF" strokeWidth="1" />
            ))}
          </g>

          {/* --- HYDRAULIC SYSTEM --- */}
          
          {/* Hydraulic Line */}
          <g onMouseEnter={() => setHoveredPart("line")} onMouseLeave={() => setHoveredPart(null)} className="cursor-pointer">
            {/* Pipe casing */}
            <path d="M 280 210 Q 400 210 400 350 L 520 350" fill="none" stroke="#222" strokeWidth="12" strokeLinecap="round" />
            {/* Fluid */}
            <path d="M 280 210 Q 400 210 400 350 L 520 350" fill="none" stroke="#ff4444" strokeWidth="6" strokeLinecap="round" opacity={fluidOpacity} />
            {/* Flow animation */}
            {step >= 2 && (
              <motion.path d="M 280 210 Q 400 210 400 350 L 520 350" fill="none" stroke="#FFF" strokeWidth="2" strokeDasharray="10 20"
                animate={{ strokeDashoffset: [30, 0] }} transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
              />
            )}
          </g>

          {/* Master Cylinder */}
          <g transform="translate(180, 190)" onMouseEnter={() => setHoveredPart("master")} onMouseLeave={() => setHoveredPart(null)} className="cursor-pointer">
            {/* Reservoir */}
            <rect x="30" y="-30" width="40" height="30" rx="4" fill="#E4E4E7" opacity="0.8" />
            <rect x="35" y="-20" width="30" height="20" fill="#ff4444" opacity={fluidOpacity} />
            {/* Cylinder body */}
            <rect x="20" y="0" width="80" height="40" rx="4" fill="url(#metalGrad)" />
            {/* Piston */}
            <motion.rect x={cylinderPos} y="10" width="20" height="20" fill="#222" animate={{ x: cylinderPos }} transition={{ type: "spring", stiffness: 300 }} />
          </g>

          {/* Brake Pedal */}
          <g transform="translate(100, 100)" onMouseEnter={() => setHoveredPart("pedal")} onMouseLeave={() => setHoveredPart(null)} className="cursor-pointer">
            {/* Pivot */}
            <circle cx="0" cy="0" r="6" fill="#555" />
            {/* Pedal Arm */}
            <motion.g animate={{ rotate: pedalRot }} style={{ transformOrigin: "0px 0px" }} transition={{ type: "spring", stiffness: 300 }}>
              <rect x="-4" y="0" width="8" height="120" fill="#AAA" />
              {/* Pedal Pad */}
              <rect x="-15" y="110" width="30" height="15" rx="2" fill="#111" stroke="#555" strokeWidth="2" />
              {/* Connecting Rod to Cylinder */}
              <rect x="0" y="90" width="80" height="6" fill="#888" />
            </motion.g>
          </g>

          {/* --- WHEEL ASSEMBLY --- */}
          <g transform="translate(600, 250)">
            
            {/* Disc Rotor */}
            <g onMouseEnter={() => setHoveredPart("rotor")} onMouseLeave={() => setHoveredPart(null)} className="cursor-pointer">
              {/* Back plate */}
              <circle cx="0" cy="0" r="120" fill="url(#metalGrad)" />
              {/* Grooves / Slots for rotation visual */}
              <motion.g animate={{ rotate: 360 }} transition={{ duration: wheelSpeed > 0 ? 360 / wheelSpeed : 0, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "0px 0px" }}>
                {[0, 60, 120, 180, 240, 300].map(angle => (
                  <path key={angle} d="M 40 0 L 100 0" stroke="#333" strokeWidth="4" strokeDasharray="10 5" transform={`rotate(${angle})`} />
                ))}
                {/* Friction Heat Glow */}
                <circle cx="0" cy="0" r="120" fill="url(#heatGlow)" filter="url(#glow)" />
              </motion.g>
              {/* Hub */}
              <circle cx="0" cy="0" r="30" fill="url(#darkMetal)" stroke="#222" strokeWidth="4" />
            </g>

            {/* Brake Caliper */}
            <g onMouseEnter={() => setHoveredPart("caliper")} onMouseLeave={() => setHoveredPart(null)} className="cursor-pointer">
              <path d="M -80 -140 Q 0 -160 80 -140 L 90 -100 Q 0 -120 -90 -100 Z" fill="#ff4444" stroke="#222" strokeWidth="2" />
              <path d="M -90 -100 L -120 -80 L -120 80 L -90 100 Z" fill="#ff4444" stroke="#222" strokeWidth="2" />
              <text x="-95" y="5" fill="#FFF" fontSize="16" fontWeight="black" transform="rotate(-90 -95 5)" textAnchor="middle">BREMBO</text>

              {/* Brake Pads (Inside Caliper) */}
              <g onMouseEnter={() => setHoveredPart("pads")} onMouseLeave={() => setHoveredPart(null)}>
                {/* Outer Pad */}
                <motion.rect x="-105" y="-60" width="10" height="120" rx="2" fill="#52525B" animate={{ x: -105 + caliperPos }} transition={{ type: "spring", stiffness: 300 }} />
                {/* Inner Pad (behind disc conceptually, but drawn adjacent for 2D cut view) */}
                <motion.rect x="-55" y="-60" width="10" height="120" rx="2" fill="#52525B" animate={{ x: -55 - caliperPos }} transition={{ type: "spring", stiffness: 300 }} />
              </g>
            </g>

          </g>

        </svg>
      </div>

      {/* Side Explanation Panel */}
      <div className="w-80 shrink-0 flex flex-col gap-4">
        <div className="glass-card p-6 rounded-2xl border border-white/10 bg-black/40 relative overflow-hidden flex-1">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-white" />
          <h3 className="text-xl font-black text-white mb-4 tracking-tight">Braking Process</h3>
          
          <div className="space-y-3">
            {[
              { s: 0, title: "0. Idle State", desc: "Wheel spins freely. No pressure in hydraulic lines." },
              { s: 1, title: "1. Pedal Pressed", desc: "Driver pushes the brake pedal, actuating the master cylinder piston." },
              { s: 2, title: "2. Hydraulic Pressure", desc: "Brake fluid is pressurized and forced through the brake lines." },
              { s: 3, title: "3. Caliper Clamps", desc: "Pressure forces the caliper pistons to squeeze the brake pads inward." },
              { s: 4, title: "4. Friction & Stop", desc: "Pads rub against the spinning disc rotor, creating immense friction (heat) that stops the wheel." }
            ].map((item, idx) => (
              <div key={idx} className={`p-3 rounded-xl border transition-all duration-300 ${step >= item.s ? 'border-white/30 bg-white/5' : 'border-white/5 bg-transparent opacity-50'}`}>
                <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
            <h4 className="text-red-400 font-bold text-xs mb-1 uppercase tracking-wider">Physics Concept</h4>
            <p className="text-xs text-zinc-300">Kinetic energy of the moving car is converted into thermal energy (heat) via friction between the brake pads and the cast-iron rotor.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
