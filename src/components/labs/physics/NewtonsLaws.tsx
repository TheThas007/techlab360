"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function NewtonsLaws() {
  const { t } = useLanguage();
  
  const [mass, setMass] = useState(10); // kg
  const [appliedForce, setAppliedForce] = useState(50); // N
  const [frictionCoef, setFrictionCoef] = useState(0.2); // mu
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [velocity, setVelocity] = useState(0); // m/s
  const [position, setPosition] = useState(0); // m
  
  const controls = useAnimation();
  
  const g = 9.81; // m/s^2
  const normalForce = mass * g;
  const maxStaticFriction = frictionCoef * normalForce;
  
  // Kinetic friction is usually slightly less, but we'll simplify: f_k = f_s
  const frictionForce = velocity > 0 || appliedForce > maxStaticFriction 
    ? maxStaticFriction 
    : appliedForce; // If not moving and force < max static, friction matches applied.
    
  const netForce = appliedForce - frictionForce;
  const acceleration = netForce > 0 ? netForce / mass : (velocity > 0 ? -frictionForce / mass : 0);

  useEffect(() => {
    let animationFrame: number;
    let lastTime = performance.now();

    const updatePhysics = (time: number) => {
      const dt = (time - lastTime) / 1000; // seconds
      lastTime = time;

      if (isPlaying) {
        setVelocity((prevV) => {
          let newV = prevV + acceleration * dt;
          if (newV < 0 && appliedForce === 0) newV = 0; // Stop if friction brings it to 0
          return newV;
        });

        setPosition((prevP) => {
          const newP = prevP + velocity * dt;
          // Loop around or stop at edge for demo purposes
          if (newP > 20) return 0; // Wrap around for continuous demo
          return newP;
        });
      }
      animationFrame = requestAnimationFrame(updatePhysics);
    };

    animationFrame = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animationFrame);
  }, [isPlaying, acceleration, velocity, appliedForce]);

  const resetSimulation = () => {
    setIsPlaying(false);
    setVelocity(0);
    setPosition(0);
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-0 bg-[#0A0A0A] overflow-y-auto custom-scrollbar md:overflow-hidden">
      <div className="flex-1 flex flex-col min-w-0">
      {/* Controls Panel */}
      <div className="min-h-[6rem] shrink-0 border-b border-white/5 bg-[#111111] flex items-center px-4 md:px-6 gap-4 md:gap-6 overflow-x-auto overflow-x-auto">
        <div className="flex gap-2 shrink-0">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-zinc-200 transition-colors"
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
          </button>
          <button 
            onClick={resetSimulation}
            className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
        
        <div className="w-px h-10 bg-white/10 mx-2 shrink-0" />

        <div className="flex-1 min-w-[150px] max-w-xs">
          <label className="text-xs font-semibold text-zinc-400 mb-1.5 flex justify-between">
            <span>{t("physics.controls.mass") || "Mass (kg)"}</span>
            <span className="text-white">{mass} kg</span>
          </label>
          <input
            type="range" min="1" max="100" step="1"
            value={mass}
            onChange={(e) => setMass(Number(e.target.value))}
            className="w-full accent-white"
          />
        </div>
        <div className="flex-1 min-w-[150px] max-w-xs">
          <label className="text-xs font-semibold text-zinc-400 mb-1.5 flex justify-between">
            <span>{t("physics.controls.applied_force") || "Applied Force (N)"}</span>
            <span className="text-white">{appliedForce} N</span>
          </label>
          <input
            type="range" min="0" max="500" step="10"
            value={appliedForce}
            onChange={(e) => setAppliedForce(Number(e.target.value))}
            className="w-full accent-white"
          />
        </div>
        <div className="flex-1 min-w-[150px] max-w-xs">
          <label className="text-xs font-semibold text-zinc-400 mb-1.5 flex justify-between">
            <span>{t("physics.controls.friction") || "Friction Coef (μ)"}</span>
            <span className="text-white">{frictionCoef.toFixed(2)}</span>
          </label>
          <input
            type="range" min="0" max="1" step="0.05"
            value={frictionCoef}
            onChange={(e) => setFrictionCoef(Number(e.target.value))}
            className="w-full accent-white"
          />
        </div>
      </div>

      {/* Simulation Area */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center min-h-[400px] md:min-h-0 p-8">
        <div className="w-full max-w-4xl aspect-[21/9] relative bg-black/50 border border-white/5 rounded-2xl overflow-hidden">
          
          <svg viewBox="0 0 1000 400" className="w-full h-full">
            {/* Background Details */}
            <rect x="0" y="300" width="1000" height="100" fill="#1A1A1A" />
            <path d="M0 300 L1000 300" stroke="#333" strokeWidth="4" />
            
            {/* Distance markers */}
            {[0,1,2,3,4,5,6,7,8,9,10].map(i => (
              <g key={i} transform={`translate(${i * 100}, 300)`}>
                <line x1="0" y1="0" x2="0" y2="10" stroke="#555" strokeWidth="2" />
                <text x="0" y="25" fill="#555" fontSize="12" textAnchor="middle">{i * 2}m</text>
              </g>
            ))}

            {/* The Block */}
            {/* Pixel position = position * 50 (50 pixels per meter) */}
            <motion.g 
              animate={{ x: position * 50 }}
              transition={{ type: "tween", ease: "linear", duration: 0 }}
            >
              {/* Box */}
              <rect x="50" y={300 - 80} width="80" height="80" rx="8" fill="#D4D4D8" stroke="#FFFFFF" strokeWidth="2" />
              <text x="90" y={300 - 35} fill="#000" fontSize="20" fontWeight="bold" textAnchor="middle">{mass}kg</text>

              {/* Force Vectors */}
              
              {/* Applied Force (Right) */}
              {appliedForce > 0 && (
                <g>
                  <line x1="130" y1={300 - 40} x2={130 + Math.min(appliedForce, 200)} y2={300 - 40} stroke="#3B82F6" strokeWidth="6" />
                  <polygon points={`${130 + Math.min(appliedForce, 200)},250 ${130 + Math.min(appliedForce, 200)},270 ${145 + Math.min(appliedForce, 200)},260`} fill="#3B82F6" />
                  <text x={140 + Math.min(appliedForce, 200)/2} y={300 - 50} fill="#3B82F6" fontSize="14" fontWeight="bold" textAnchor="middle">F_app</text>
                </g>
              )}

              {/* Friction Force (Left) */}
              {frictionForce > 0 && (
                <g>
                  <line x1="50" y1={300 - 10} x2={50 - Math.min(frictionForce, 100)} y2={300 - 10} stroke="#EF4444" strokeWidth="6" />
                  <polygon points={`${50 - Math.min(frictionForce, 100)},280 ${50 - Math.min(frictionForce, 100)},300 ${35 - Math.min(frictionForce, 100)},290`} fill="#EF4444" />
                  <text x={25 - Math.min(frictionForce, 100)/2} y={300 - 20} fill="#EF4444" fontSize="14" fontWeight="bold" textAnchor="middle">f_k</text>
                </g>
              )}

              {/* Gravity & Normal Force */}
              <line x1="90" y1={300 - 80} x2="90" y2={300 - 130} stroke="#10B981" strokeWidth="4" />
              <polygon points="85,180 95,180 90,170" fill="#10B981" />
              <text x="90" y={300 - 140} fill="#10B981" fontSize="12" textAnchor="middle">N</text>

              <line x1="90" y1="300" x2="90" y2="350" stroke="#F59E0B" strokeWidth="4" />
              <polygon points="85,340 95,340 90,350" fill="#F59E0B" />
              <text x="90" y={370} fill="#F59E0B" fontSize="12" textAnchor="middle">mg</text>
            </motion.g>
          </svg>

          {/* Speedometer overlay */}
          <div className="absolute top-6 left-6 glass-card p-4 rounded-2xl flex items-center gap-6">
            <div>
              <div className="text-xs text-zinc-500 font-semibold mb-1 uppercase tracking-wider">{t("physics.newton.velocity") || "Velocity"}</div>
              <div className="text-2xl font-black text-white font-mono">{velocity.toFixed(2)} <span className="text-sm text-zinc-500">m/s</span></div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div>
              <div className="text-xs text-zinc-500 font-semibold mb-1 uppercase tracking-wider">{t("physics.newton.acceleration") || "Acceleration"}</div>
              <div className="text-2xl font-black text-white font-mono">{acceleration.toFixed(2)} <span className="text-sm text-zinc-500">m/s²</span></div>
            </div>
          </div>

        </div>
      </div>
      
      </div>
      
      {/* Side Panel */}
      <div className="w-full md:w-80 shrink-0 border-t md:border-t-0 md:border-l border-white/5 bg-[#050505] flex flex-col">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-lg font-bold text-white mb-2">{t("physics.newton.title") || "Kinematics Analysis"}</h2>
          <p className="text-sm text-zinc-400">{t("physics.newton.desc") || "Applying Newton's Second Law: F = ma."}</p>
        </div>
        
        <div className="p-6 space-y-6 flex-1 overflow-y-auto custom-scrollbar">
          <div className="glass-card p-5">
            <div className="text-xs font-semibold text-zinc-500 mb-1">{t("physics.newton.net_force") || "Net Force (ΣF)"}</div>
            <div className="flex items-end gap-2">
              <div className="text-3xl font-black text-white">{netForce.toFixed(1)}</div>
              <div className="text-sm font-medium text-zinc-500 mb-1">N</div>
            </div>
            <div className="mt-2 text-xs text-zinc-400 font-mono">
              F_app - f_k = {appliedForce} - {frictionForce.toFixed(1)}
            </div>
          </div>

          <div className="glass-card p-5">
            <div className="text-xs font-semibold text-zinc-500 mb-1">{t("physics.newton.max_friction") || "Max Static Friction"}</div>
            <div className="flex items-end gap-2">
              <div className="text-3xl font-black text-white">{maxStaticFriction.toFixed(1)}</div>
              <div className="text-sm font-medium text-zinc-500 mb-1">N</div>
            </div>
            <div className={`mt-3 text-xs font-bold px-2 py-1 rounded inline-flex ${appliedForce > maxStaticFriction ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
              {appliedForce > maxStaticFriction ? 'IN MOTION' : 'AT REST'}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-bold text-white mb-3">{t("physics.calculations.formulas") || "Formulas"}</h3>
            <div className="space-y-3 font-mono text-sm">
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/10 text-white">
                <span>ΣF = m × a</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/10 text-zinc-300">
                <span>f_s(max) = μ_s × N</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/10 text-zinc-300">
                <span>N = m × g</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
