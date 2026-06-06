"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

import TwoStrokeEngine from "./TwoStrokeEngine";

export default function EngineSimulation({ type, rpm }: { type: "4stroke" | "2stroke", rpm: number }) {

  const duration = 60 / rpm;
  const strokeDuration = duration * 2;

  if (type === "2stroke") {
    return <TwoStrokeEngine rpm={rpm} />;
  }

  return (
    <div className="w-full max-w-2xl aspect-video relative bg-[#0A0A0A] rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
      <svg viewBox="0 0 800 600" className="w-full h-full drop-shadow-2xl">
        {/* Engine Block */}
        <path d="M250 150 L550 150 L600 450 L200 450 Z" fill="#141414" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
        
        {/* Cylinder */}
        <rect x="350" y="200" width="100" height="200" fill="#0A0A0A" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        
        {/* Intake Valve (Left) */}
        <motion.g animate={{ y: [0, 20, 0, 0] }} transition={{ duration: strokeDuration, repeat: Infinity, ease: "linear" }}>
          <rect x="360" y="150" width="10" height="60" fill="#E4E4E7" />
          <path d="M350 210 L380 210 L370 200 L360 200 Z" fill="#E4E4E7" />
        </motion.g>
        
        {/* Exhaust Valve (Right) */}
        <motion.g animate={{ y: [0, 0, 0, 20] }} transition={{ duration: strokeDuration, repeat: Infinity, ease: "linear" }}>
          <rect x="430" y="150" width="10" height="60" fill="#E4E4E7" />
          <path d="M420 210 L450 210 L440 200 L430 200 Z" fill="#E4E4E7" />
        </motion.g>

        {/* Spark Plug */}
        <rect x="390" y="150" width="20" height="40" fill="#52525B" />
        <motion.circle 
          cx="400" cy="195" r="15" fill="#FFFFFF"
          animate={{ opacity: [0, 0, 1, 0] }}
          transition={{ duration: strokeDuration, repeat: Infinity, ease: "linear" }}
        />

        {/* Mixture colors */}
        <motion.rect 
          x="352" y="200" width="96" height="200"
          animate={{ fill: ["#4287f5", "#111111", "#ff4444", "#555555"] }}
          transition={{ duration: strokeDuration, repeat: Infinity, ease: "linear" }}
          opacity="0.2"
        />

        {/* Piston */}
        <motion.g animate={{ y: [0, -100, 0, -100, 0] }} transition={{ duration: strokeDuration, repeat: Infinity, ease: "easeInOut" }}>
          <rect x="355" y="300" width="90" height="60" rx="4" fill="#E4E4E7" />
          <rect x="355" y="310" width="90" height="5" fill="#52525B" />
          <rect x="355" y="325" width="90" height="5" fill="#52525B" />
          {/* Connecting Rod */}
          <rect x="390" y="360" width="20" height="120" fill="#A1A1AA" />
        </motion.g>

        {/* Crankshaft */}
        <circle cx="400" cy="480" r="40" fill="#2A2A2A" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
        <motion.circle 
          cx="400" cy="440" r="10" fill="#E4E4E7"
          animate={{ rotate: 360 }}
          style={{ transformOrigin: "400px 480px" }}
          transition={{ duration: duration, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Labels */}
        <text x="250" y="140" fill="#FFFFFF" fontSize="16" fontWeight="bold">Intake</text>
        <text x="480" y="140" fill="#FFFFFF" fontSize="16" fontWeight="bold">Exhaust</text>
      </svg>
    </div>
  );
}
