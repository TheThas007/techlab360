"use client";

import { useState } from "react";
import LabLayout from "@/components/labs/LabLayout";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import OhmsLaw from "@/components/labs/physics/OhmsLaw";
import NewtonsLaws from "@/components/labs/physics/NewtonsLaws";
import WaveInterference from "@/components/labs/physics/WaveInterference";

export default function PhysicsLab() {
  const { t } = useLanguage();

  const EXPERIMENTS = [
    { id: "circuit", label: t("physics.tabs.circuit") || "Ohm's Law Simulator" },
    { id: "motion", label: t("physics.tabs.motion") || "Newton's Laws" },
    { id: "waves", label: t("physics.tabs.waves") || "Wave Interference" },
  ];

  const [activeExp, setActiveExp] = useState(EXPERIMENTS[0].id);

  return (
    <LabLayout
      title={t("physics.title") || "Physics Laboratory"}
      subtitle={t("physics.subtitle") || "Interactive simulations for electricity, mechanics, and waves"}
      experiments={EXPERIMENTS}
      activeExp={activeExp}
      onExpChange={setActiveExp}
    >
      {activeExp === "circuit" && <OhmsLaw />}
      {activeExp === "motion" && <NewtonsLaws />}
      {activeExp === "waves" && <WaveInterference />}
    </LabLayout>
  );
}

