"use client";

import { motion } from "framer-motion";

export default function TransmissionSystem({ gear }: { gear: number }) {
  // Speed multiplier based on gear (1 = high torque/low speed, 5 = low torque/high speed)
  const speed = gear;
  const torque = 6 - gear;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl p-8 bg-[#0A0A0A] rounded-2xl border border-white/5 shadow-2xl">
      <div className="flex justify-between w-full max-w-2xl mb-8">
        <div className="glass-card p-6 flex-1 mx-2 text-center">
          <div className="text-3xl font-black text-white">{speed * 20} <span className="text-sm">km/h</span></div>
          <div className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Vehicle Speed</div>
        </div>
        <div className="glass-card p-6 flex-1 mx-2 text-center">
          <div className="text-3xl font-black text-white">{torque} <span className="text-sm">x</span></div>
          <div className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Torque Multiplier</div>
        </div>
      </div>

      <svg viewBox="0 0 600 300" className="w-full max-w-2xl">
        {/* Input Shaft (Engine Side) */}
        <rect x="50" y="140" width="200" height="20" fill="#2A2A2A" />
        <text x="100" y="130" fill="#A1A1AA" fontSize="14">Engine Input</text>
        
        {/* Output Shaft (Wheel Side) */}
        <rect x="350" y="140" width="200" height="20" fill="#2A2A2A" />
        <text x="400" y="130" fill="#A1A1AA" fontSize="14">To Wheels</text>
        
        {/* Input Gear */}
        <motion.circle 
          cx="250" cy="150" r={40 + gear * 10} fill="#111111" stroke="#FFFFFF" strokeWidth="4" strokeDasharray="10 5"
          animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Output Gear */}
        <motion.circle 
          cx="350" cy="150" r={90 - gear * 10} fill="#1A1A1A" stroke="#FFFFFF" strokeWidth="4" strokeDasharray="10 5"
          animate={{ rotate: -360 }} transition={{ duration: 2 * ((90 - gear * 10)/(40 + gear * 10)), repeat: Infinity, ease: "linear" }}
        />
      </svg>
      
      <p className="text-zinc-400 mt-8 text-center max-w-lg">
        Gear 1 provides high torque for starting. Higher gears provide higher speed but lower torque.
      </p>
    </div>
  );
}
