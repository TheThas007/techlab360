"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Play, Pause, MoveHorizontal, MoveVertical, RotateCcw, Info } from "lucide-react";

export default function SuspensionSystem() {
  const [mode, setMode] = useState<"steering" | "suspension">("steering");
  const [steeringAngle, setSteeringAngle] = useState(0); // -100 to 100
  const [isBumpy, setIsBumpy] = useState(false);
  const [roadOffset, setRoadOffset] = useState(0);
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  // Road animation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isBumpy && mode === "suspension") {
      timer = setInterval(() => {
        setRoadOffset(prev => (prev + 5) % 100);
      }, 50);
    }
    return () => clearInterval(timer);
  }, [isBumpy, mode]);

  const handleReset = () => {
    setSteeringAngle(0);
    setIsBumpy(false);
  };

  const tooltips: Record<string, { en: string; ta: string }> = {
    steeringWheel: { en: "Steering Wheel: Driver input.", ta: "ஸ்டீயரிங் வீல்: டிரைவர் கட்டுப்பாடு." },
    column: { en: "Steering Column: Transfers rotation to the rack.", ta: "ஸ்டீயரிங் காலம்: சுழற்சியை ராக்கிற்கு கடத்துகிறது." },
    rack: { en: "Rack and Pinion: Converts rotational motion into linear motion.", ta: "ராக் & பினியன்: சுழற்சியை நேர்கோட்டு நகர்வாக மாற்றுகிறது." },
    tieRod: { en: "Tie Rod: Pushes or pulls the wheel hub to steer.", ta: "டை ராட்: சக்கரத்தை இடது/வலது திருப்ப தள்ளுகிறது/இழுக்கிறது." },
    spring: { en: "Coil Spring: Absorbs large impacts from the road.", ta: "காயில் ஸ்பிரிங்: சாலையின் அதிர்வுகளை தாங்குகிறது." },
    shock: { en: "Shock Absorber: Dampens the spring's bounce to keep the car stable.", ta: "ஷாக் அப்சார்பர்: ஸ்பிரிங்கின் துள்ளலை கட்டுப்படுத்துகிறது." },
    controlArm: { en: "Lower Control Arm: Hinges the wheel to the chassis.", ta: "கண்ட்ரோல் ஆர்ம்: சக்கரத்தை சேசிஸுடன் இணைக்கிறது." },
    chassis: { en: "Vehicle Chassis: Main frame of the car.", ta: "சேசிஸ்: காரின் பிரதான சட்டகம்." }
  };

  // Calculations for animation
  const rackMovement = steeringAngle * 0.4; // pixels to move rack
  const wheelTurn = steeringAngle * 0.3; // degrees to turn wheel
  const bounceY = isBumpy ? Math.sin(roadOffset * 0.5) * 15 : 0; // wheel bounce up/down
  const bodyBounceY = isBumpy ? Math.sin(roadOffset * 0.5 - 1) * 2 : 0; // body bounces very slightly (damped)

  return (
    <div className="w-full h-full min-h-[500px] flex gap-6 bg-[#0A0A0A] p-6 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden">
      
      {/* Simulation Area */}
      <div className="flex-1 relative flex items-center justify-center">
        
        {/* Controls Overlay */}
        <div className="absolute top-4 left-4 flex gap-2 z-10 glass-card p-2 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md">
          <button 
            onClick={() => setMode("steering")}
            className={`px-3 h-10 flex items-center justify-center gap-2 rounded-lg transition-all font-bold text-xs ${mode === "steering" ? "bg-white text-black" : "bg-white/5 text-zinc-400 hover:text-white"}`}
          >
            <MoveHorizontal size={14} /> Steering
          </button>
          
          <button 
            onClick={() => setMode("suspension")}
            className={`px-3 h-10 flex items-center justify-center gap-2 rounded-lg transition-all font-bold text-xs ${mode === "suspension" ? "bg-white text-black" : "bg-white/5 text-zinc-400 hover:text-white"}`}
          >
            <MoveVertical size={14} /> Suspension
          </button>

          <div className="w-px h-6 bg-white/10 self-center mx-1" />

          {mode === "steering" && (
            <input 
              type="range" min="-100" max="100" value={steeringAngle}
              onChange={(e) => setSteeringAngle(Number(e.target.value))}
              className="w-32 accent-white self-center"
            />
          )}

          {mode === "suspension" && (
            <button 
              onClick={() => setIsBumpy(!isBumpy)}
              className={`px-3 h-10 flex items-center justify-center gap-2 rounded-lg transition-all font-bold text-xs ${isBumpy ? "bg-red-500 text-white" : "bg-white/5 text-zinc-400 hover:text-white"}`}
            >
              {isBumpy ? <Pause size={14} /> : <Play size={14} />} {isBumpy ? "Stop Road" : "Bumpy Road"}
            </button>
          )}

          <button 
            onClick={handleReset}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 text-zinc-400 hover:text-white transition-all ml-2"
            title="Reset"
          >
            <RotateCcw size={16} />
          </button>
        </div>

        {/* Dynamic Tooltip */}
        {hoveredPart && (
          <div className="absolute bottom-4 left-4 z-20 w-64 glass-card p-4 rounded-xl border border-white/10 bg-black/80 backdrop-blur-xl">
            <h4 className="text-white font-bold mb-2 capitalize border-b border-white/10 pb-2 flex items-center gap-2">
              <Info size={14} className="text-zinc-400" />
              {hoveredPart.replace(/([A-Z])/g, ' $1').trim()}
            </h4>
            <p className="text-sm text-zinc-300 mb-2">{tooltips[hoveredPart]?.en}</p>
            <p className="text-xs text-zinc-500 font-medium">{tooltips[hoveredPart]?.ta}</p>
          </div>
        )}

        <svg viewBox="0 0 800 600" className="w-full h-full max-h-[600px] drop-shadow-2xl">
          <defs>
            <linearGradient id="metal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#888" />
              <stop offset="50%" stopColor="#CCC" />
              <stop offset="100%" stopColor="#555" />
            </linearGradient>
            <linearGradient id="darkMetal" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#333" />
              <stop offset="100%" stopColor="#111" />
            </linearGradient>
            <pattern id="roadTire" width="40" height="20" patternUnits="userSpaceOnUse">
              <path d="M 0 0 L 20 20 L 40 0" fill="none" stroke="#222" strokeWidth="2" />
            </pattern>
          </defs>

          <g opacity="0.05">
            {[...Array(16)].map((_, i) => (
              <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="600" stroke="#FFF" strokeWidth="1" />
            ))}
          </g>

          {/* ROAD (Visible in Suspension Mode) */}
          <motion.g animate={{ y: mode === "suspension" ? 0 : 50, opacity: mode === "suspension" ? 1 : 0 }} transition={{ duration: 0.5 }}>
            <rect x="0" y="520" width="800" height="80" fill="#111" />
            <motion.path d="M 0 520 Q 200 500, 400 520 T 800 520" fill="none" stroke="#555" strokeWidth="4" 
              animate={{ x: -roadOffset }} transition={{ type: "tween" }}
            />
            {isBumpy && (
               <motion.path d="M 0 520 Q 200 500, 400 520 T 800 520" fill="none" stroke="#ff4444" strokeWidth="2" strokeDasharray="10 5"
                animate={{ x: -roadOffset }} transition={{ type: "tween" }}
               />
            )}
          </motion.g>

          {/* VEHICLE CHASSIS (Fixed/Slightly Bouncing) */}
          <motion.g animate={{ y: bodyBounceY }} transition={{ type: "tween" }}>
            <path d="M 200 150 L 600 150 L 600 250 L 200 250 Z" fill="#141414" stroke="#333" strokeWidth="4" 
                  onMouseEnter={() => setHoveredPart("chassis")} onMouseLeave={() => setHoveredPart(null)} className="cursor-pointer" />
            <text x="400" y="200" fill="#333" fontSize="24" fontWeight="bold" textAnchor="middle">FRONT CHASSIS</text>

            {/* STEERING SYSTEM */}
            <g opacity={mode === "steering" ? 1 : 0.3} style={{ transition: 'opacity 0.5s' }}>
              {/* Steering Wheel */}
              <g transform="translate(400, 80)" onMouseEnter={() => setHoveredPart("steeringWheel")} onMouseLeave={() => setHoveredPart(null)} className="cursor-pointer">
                <ellipse cx="0" cy="0" rx="40" ry="10" fill="none" stroke="#FFF" strokeWidth="6" />
                <motion.line x1="-35" y1="0" x2="35" y2="0" stroke="#FFF" strokeWidth="4" 
                  animate={{ rotate: steeringAngle }} style={{ transformOrigin: "0px 0px" }} />
              </g>

              {/* Steering Column */}
              <motion.g onMouseEnter={() => setHoveredPart("column")} onMouseLeave={() => setHoveredPart(null)} className="cursor-pointer">
                <rect x="395" y="90" width="10" height="120" fill="url(#metal)" />
                <motion.line x1="395" y1="150" x2="405" y2="160" stroke="#222" strokeWidth="2" 
                  animate={{ x: (steeringAngle % 20) / 4 }} />
              </motion.g>

              {/* Rack and Pinion Housing */}
              <rect x="300" y="210" width="200" height="30" rx="4" fill="url(#darkMetal)" 
                onMouseEnter={() => setHoveredPart("rack")} onMouseLeave={() => setHoveredPart(null)} className="cursor-pointer" />
              
              {/* Rack (Moving Part) */}
              <motion.rect x={300 + rackMovement} y="220" width="200" height="10" fill="#E4E4E7" 
                animate={{ x: 300 + rackMovement }} transition={{ type: "tween" }} />
              
              {/* Tie Rods */}
              <g onMouseEnter={() => setHoveredPart("tieRod")} onMouseLeave={() => setHoveredPart(null)} className="cursor-pointer">
                <motion.line x1={300 + rackMovement} y1="225" x2="180" y2="280" stroke="url(#metal)" strokeWidth="6" 
                  animate={{ x1: 300 + rackMovement }} transition={{ type: "tween" }} />
                <motion.line x1={500 + rackMovement} y1="225" x2="620" y2="280" stroke="url(#metal)" strokeWidth="6" 
                  animate={{ x1: 500 + rackMovement }} transition={{ type: "tween" }} />
              </g>
            </g>
          </motion.g>

          {/* SUSPENSION & WHEELS (Bouncing) */}
          <g opacity={mode === "suspension" ? 1 : mode === "steering" ? 0.8 : 0.3} style={{ transition: 'opacity 0.5s' }}>
            
            {/* LEFT WHEEL ASSEMBLY */}
            <motion.g animate={{ y: bounceY }} transition={{ type: "tween" }}>
              {/* Lower Control Arm */}
              <g onMouseEnter={() => setHoveredPart("controlArm")} onMouseLeave={() => setHoveredPart(null)} className="cursor-pointer">
                <line x1="220" y1="250" x2="160" y2="400" stroke="#444" strokeWidth="8" />
              </g>

              {/* Shock Absorber & Spring */}
              <g onMouseEnter={() => setHoveredPart("shock")} onMouseLeave={() => setHoveredPart(null)} className="cursor-pointer">
                {/* Shock body */}
                <rect x="230" y="180" width="20" height="120" fill="url(#darkMetal)" />
                {/* Piston rod (slides in) */}
                <motion.rect x="235" y="120" width="10" height="100" fill="url(#metal)" 
                  animate={{ height: 100 - bounceY }} transition={{ type: "tween" }} />
              </g>
              <g onMouseEnter={() => setHoveredPart("spring")} onMouseLeave={() => setHoveredPart(null)} className="cursor-pointer">
                {/* Coil Spring (Simplified using path) */}
                <motion.path 
                  d={`M 220 180 Q 260 200, 220 220 Q 260 240, 220 260 Q 260 280, 220 ${300 - bounceY}`} 
                  fill="none" stroke="#4287f5" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"
                  animate={{ d: `M 220 180 Q 260 ${200 - bounceY*0.2}, 220 ${220 - bounceY*0.4} Q 260 ${240 - bounceY*0.6}, 220 ${260 - bounceY*0.8} Q 260 ${280 - bounceY}, 220 ${300 - bounceY}` }}
                />
              </g>

              {/* Left Wheel */}
              <motion.g transform="translate(140, 400)" animate={{ rotateY: wheelTurn }} style={{ transformOrigin: "0px 0px" }} transition={{ type: "tween" }}>
                <rect x="-30" y="-80" width="60" height="160" rx="10" fill="#111" />
                <rect x="-20" y="-70" width="40" height="140" fill="url(#roadTire)" />
                <circle cx="0" cy="0" r="15" fill="url(#metal)" />
              </motion.g>
            </motion.g>

            {/* RIGHT WHEEL ASSEMBLY */}
            <motion.g animate={{ y: bounceY }} transition={{ type: "tween" }}>
              {/* Lower Control Arm */}
              <line x1="580" y1="250" x2="640" y2="400" stroke="#444" strokeWidth="8" />

              {/* Shock Absorber & Spring */}
              <rect x="550" y="180" width="20" height="120" fill="url(#darkMetal)" />
              <motion.rect x="555" y="120" width="10" height="100" fill="url(#metal)" animate={{ height: 100 - bounceY }} />
              <motion.path 
                d={`M 580 180 Q 540 200, 580 220 Q 540 240, 580 260 Q 540 280, 580 ${300 - bounceY}`} 
                fill="none" stroke="#4287f5" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"
                animate={{ d: `M 580 180 Q 540 ${200 - bounceY*0.2}, 580 ${220 - bounceY*0.4} Q 540 ${240 - bounceY*0.6}, 580 ${260 - bounceY*0.8} Q 540 ${280 - bounceY}, 580 ${300 - bounceY}` }}
              />

              {/* Right Wheel */}
              <motion.g transform="translate(660, 400)" animate={{ rotateY: wheelTurn }} style={{ transformOrigin: "0px 0px" }} transition={{ type: "tween" }}>
                <rect x="-30" y="-80" width="60" height="160" rx="10" fill="#111" />
                <rect x="-20" y="-70" width="40" height="140" fill="url(#roadTire)" />
                <circle cx="0" cy="0" r="15" fill="url(#metal)" />
              </motion.g>
            </motion.g>

          </g>

        </svg>
      </div>

      {/* Side Explanation Panel */}
      <div className="w-80 shrink-0 flex flex-col gap-4">
        <div className="glass-card p-6 rounded-2xl border border-white/10 bg-black/40 relative overflow-hidden flex-1">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-white" />
          <h3 className="text-xl font-black text-white mb-4 tracking-tight">Dynamics</h3>
          
          <div className="space-y-4">
            <div className={`p-4 rounded-xl border transition-all duration-300 ${mode === "steering" ? 'border-white/30 bg-white/5' : 'border-white/5 bg-transparent opacity-50'}`}>
              <h4 className="text-white font-bold mb-1 flex items-center gap-2">
                <MoveHorizontal size={16} className="text-blue-400" /> Steering
              </h4>
              <p className="text-sm text-zinc-400">Rack and pinion gearset converts the circular motion of the steering wheel into the linear motion needed to turn the wheels.</p>
              {mode === "steering" && steeringAngle !== 0 && (
                <div className="mt-3 text-xs font-mono text-blue-400 bg-blue-500/10 p-2 rounded">
                  Wheel Angle: {(steeringAngle * 0.3).toFixed(1)}°
                </div>
              )}
            </div>

            <div className={`p-4 rounded-xl border transition-all duration-300 ${mode === "suspension" ? 'border-white/30 bg-white/5' : 'border-white/5 bg-transparent opacity-50'}`}>
              <h4 className="text-white font-bold mb-1 flex items-center gap-2">
                <MoveVertical size={16} className="text-red-400" /> Suspension
              </h4>
              <p className="text-sm text-zinc-400">Coil springs absorb impact forces from road bumps. Shock absorbers (dampers) control the spring's motion to prevent bouncing.</p>
              {mode === "suspension" && isBumpy && (
                <div className="mt-3 text-xs font-mono text-red-400 bg-red-500/10 p-2 rounded flex items-center gap-2">
                  <motion.div className="w-2 h-2 rounded-full bg-red-400" animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity }} />
                  Absorbing Impacts
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
