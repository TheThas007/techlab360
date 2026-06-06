"use client";

import { useState } from "react";
import LabLayout from "@/components/labs/LabLayout";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import BeamDeflection from "@/components/labs/civil/BeamDeflection";
import MixDesign from "@/components/labs/civil/MixDesign";
import TrussAnalysis from "@/components/labs/civil/TrussAnalysis";

export default function CivilLab() {
  const { t } = useLanguage();
  
  const EXPERIMENTS = [
    { id: "beam", label: t("civil.tabs.beam") || "Beam Deflection" },
    { id: "concrete", label: t("civil.tabs.concrete") || "Mix Design" },
    { id: "truss", label: t("civil.tabs.truss") || "Truss Analysis" },
  ];

  const [activeExp, setActiveExp] = useState(EXPERIMENTS[0].id);

  return (
    <LabLayout
      title={t("civil.title") || "Civil Engineering"}
      subtitle={t("civil.subtitle") || "Structural analysis, concrete mix, and material testing"}
      experiments={EXPERIMENTS}
      activeExp={activeExp}
      onExpChange={setActiveExp}
    >
      {activeExp === "beam" && <BeamDeflection />}
      {activeExp === "concrete" && <MixDesign />}
      {activeExp === "truss" && <TrussAnalysis />}
    </LabLayout>
  );
}

