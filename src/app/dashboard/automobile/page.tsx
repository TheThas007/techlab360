"use client";

import { useState } from "react";
import LabLayout from "@/components/labs/LabLayout";
import { useLanguage } from "@/lib/i18n/LanguageContext";

import EngineSimulation from "@/components/labs/automobile/EngineSimulation";
import FuelSystem from "@/components/labs/automobile/FuelSystem";
import TransmissionSystem from "@/components/labs/automobile/TransmissionSystem";
import CompareEngines from "@/components/labs/automobile/CompareEngines";
import FaultQuiz from "@/components/labs/automobile/FaultQuiz";
import VehicleSystems from "@/components/labs/automobile/VehicleSystems";
import ElectricalSystem from "@/components/labs/automobile/ElectricalSystem";
import BrakeSystem from "@/components/labs/automobile/BrakeSystem";
import SuspensionSystem from "@/components/labs/automobile/SuspensionSystem";

export default function AutomobileLab() {
  const { t } = useLanguage();
  const [activeExp, setActiveExp] = useState("4stroke");
  const [rpm, setRpm] = useState(3000);
  const [gear, setGear] = useState(1);

  const EXPERIMENTS = [
    { id: "4stroke", label: t("automobile.tabs.4stroke") || "4-Stroke Engine" },
    { id: "2stroke", label: t("automobile.tabs.2stroke") || "2-Stroke Engine" },
    { id: "fuel", label: t("automobile.tabs.fuel") || "Fuel System" },
    { id: "gear", label: t("automobile.tabs.gear") || "Gear System" },
    { id: "compare", label: t("automobile.tabs.compare") || "Engine Comparison" },
    { id: "electrical", label: t("automobile.tabs.electrical") || "Electrical System" },
    { id: "brakes", label: t("automobile.tabs.brakes") || "Brake System" },
    { id: "suspension", label: t("automobile.tabs.suspension") || "Steering & Suspension" },
    { id: "systems", label: t("automobile.tabs.systems") || "Vehicle Systems" },
    { id: "quiz", label: t("automobile.tabs.quiz") || "Fault Quiz" },
  ];

  return (
    <LabLayout
      title={t("automobile.title") || "Automobile Engineering"}
      subtitle={t("automobile.subtitle") || "Explore engine mechanics, transmission, and vehicle systems"}
      experiments={EXPERIMENTS}
      activeExp={activeExp}
      onExpChange={setActiveExp}
    >
      <div className="flex-1 flex flex-col min-h-0 bg-[#0A0A0A]">
        {/* Controls Panel */}
        <div className="h-20 shrink-0 border-b border-white/5 bg-[#111111] flex items-center px-6 gap-6">
          {(activeExp === "4stroke" || activeExp === "2stroke") && (
            <div className="flex-1 max-w-sm">
              <label className="text-xs font-semibold text-zinc-400 mb-1.5 flex justify-between">
                <span>{t("automobile.controls.rpm") || "Engine Speed (RPM)"}</span>
                <span className="text-white">{rpm}</span>
              </label>
              <input
                type="range"
                min="600"
                max="7000"
                step="100"
                value={rpm}
                onChange={(e) => setRpm(Number(e.target.value))}
                className="w-full accent-white"
              />
            </div>
          )}
          {activeExp === "gear" && (
            <div className="flex-1 max-w-sm">
              <label className="text-xs font-semibold text-zinc-400 mb-1.5 flex justify-between">
                <span>{t("automobile.controls.gear") || "Selected Gear"}</span>
                <span className="text-white">Gear {gear}</span>
              </label>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={gear}
                onChange={(e) => setGear(Number(e.target.value))}
                className="w-full accent-white"
              />
            </div>
          )}
        </div>

        {/* Simulation Area */}
        <div className="flex-1 relative overflow-hidden flex items-center justify-center p-8">
          {activeExp === "4stroke" && <EngineSimulation type="4stroke" rpm={rpm} />}
          {activeExp === "2stroke" && <EngineSimulation type="2stroke" rpm={rpm} />}
          {activeExp === "fuel" && <FuelSystem />}
          {activeExp === "gear" && <TransmissionSystem gear={gear} />}
          { activeExp === "compare" && <CompareEngines /> }
          { activeExp === "electrical" && <ElectricalSystem /> }
          { activeExp === "brakes" && <BrakeSystem /> }
          { activeExp === "suspension" && <SuspensionSystem /> }
          { activeExp === "systems" && <VehicleSystems /> }
          { activeExp === "quiz" && <FaultQuiz /> }
        </div>
      </div>
      
      {/* Side Panel (Theory & Principles) */}
      <div className="w-80 shrink-0 border-l border-white/5 bg-[#050505] flex flex-col">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-lg font-bold text-white mb-2">{t("automobile.theory.title") || "Theory & Principles"}</h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            {t(`automobile.theory.${activeExp}`) || "Select an experiment to view detailed principles and interactive content."}
          </p>
        </div>
        
        {activeExp === "4stroke" && (
          <div className="p-6">
            <h3 className="text-sm font-bold text-white mb-4">The 4 Strokes</h3>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="text-xs font-bold text-white mb-1">{t("automobile.4stroke_details.intake") || "1. Intake"}</div>
                <div className="text-xs text-zinc-500">{t("automobile.4stroke_details.intake_desc")}</div>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="text-xs font-bold text-white mb-1">{t("automobile.4stroke_details.compression") || "2. Compression"}</div>
                <div className="text-xs text-zinc-500">{t("automobile.4stroke_details.compression_desc")}</div>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="text-xs font-bold text-white mb-1">{t("automobile.4stroke_details.power") || "3. Power"}</div>
                <div className="text-xs text-zinc-500">{t("automobile.4stroke_details.power_desc")}</div>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="text-xs font-bold text-white mb-1">{t("automobile.4stroke_details.exhaust") || "4. Exhaust"}</div>
                <div className="text-xs text-zinc-500">{t("automobile.4stroke_details.exhaust_desc")}</div>
              </div>
            </div>
          </div>
        )}

        {activeExp === "electrical" && (
          <div className="p-6">
            <h3 className="text-sm font-bold text-white mb-4">Electrical Circuit</h3>
            <p className="text-sm text-zinc-400">The automobile electrical system consists of the battery, starter, and alternator. The battery provides initial power to crank the engine via the starter motor. Once running, the alternator generates electricity to power vehicle systems and recharge the battery.</p>
          </div>
        )}

        {activeExp === "brakes" && (
          <div className="p-6">
            <h3 className="text-sm font-bold text-white mb-4">Hydraulics & Friction</h3>
            <p className="text-sm text-zinc-400">Brake fluid transmits the force from your foot on the pedal to the brake calipers. The calipers squeeze the brake pads against the spinning disc rotor, converting kinetic energy into heat through friction.</p>
          </div>
        )}

        {activeExp === "suspension" && (
          <div className="p-6">
            <h3 className="text-sm font-bold text-white mb-4">Ride Dynamics</h3>
            <p className="text-sm text-zinc-400">The rack and pinion converts rotational steering input into linear motion. Meanwhile, springs absorb vertical impacts and shock absorbers dampen the oscillation to maintain tire contact with the road.</p>
          </div>
        )}

      </div>
    </LabLayout>
  );
}
