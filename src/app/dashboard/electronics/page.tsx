"use client";

import { useState } from "react";
import LabLayout from "@/components/labs/LabLayout";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import CircuitBuilder from "@/components/labs/electronics/CircuitBuilder";
import SeriesParallel from "@/components/labs/electronics/SeriesParallel";
import OhmsCalculator from "@/components/labs/electronics/OhmsCalculator";
import FaultDetection from "@/components/labs/electronics/FaultDetection";

export default function ElectronicsLab() {
  const { t } = useLanguage();

  const EXPERIMENTS = [
    { id: "circuit", label: t("electronics.tabs.builder") || "Circuit Builder" },
    { id: "series-parallel", label: t("electronics.tabs.sp") || "Series & Parallel" },
    { id: "ohms", label: t("electronics.tabs.ohms") || "Ohm's Law Calculator" },
    { id: "fault", label: t("electronics.tabs.fault") || "Fault Detection" },
  ];

  const [activeExp, setActiveExp] = useState(EXPERIMENTS[0].id);

  return (
    <LabLayout
      title={t("electronics.title") || "Electronics Lab"}
      subtitle={t("electronics.subtitle") || "Build circuits, analyze current, and detect faults."}
      experiments={EXPERIMENTS}
      activeExp={activeExp}
      onExpChange={setActiveExp}
    >
      {activeExp === "circuit" && <CircuitBuilder />}
      {activeExp === "series-parallel" && <SeriesParallel />}
      {activeExp === "ohms" && <OhmsCalculator />}
      {activeExp === "fault" && <FaultDetection />}
    </LabLayout>
  );
}

