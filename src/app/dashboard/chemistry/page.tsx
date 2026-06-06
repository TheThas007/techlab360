"use client";

import { useState } from "react";
import LabLayout from "@/components/labs/LabLayout";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import ChemicalKinetics from "@/components/labs/chemistry/ChemicalKinetics";
import AcidBaseTitration from "@/components/labs/chemistry/AcidBaseTitration";
import GasLaws from "@/components/labs/chemistry/GasLaws";

export default function ChemistryLab() {
  const { t } = useLanguage();

  const EXPERIMENTS = [
    { id: "reaction", label: t("chemistry.tabs.kinetics") || "Chemical Kinetics" },
    { id: "ph", label: t("chemistry.tabs.titration") || "Acid-Base Titration" },
    { id: "gas", label: t("chemistry.tabs.gas") || "Gas Laws" },
  ];

  const [activeExp, setActiveExp] = useState(EXPERIMENTS[0].id);

  return (
    <LabLayout
      title={t("chemistry.title") || "Chemistry Laboratory"}
      subtitle={t("chemistry.subtitle") || "Interactive chemical reactions, thermodynamics, and analysis"}
      experiments={EXPERIMENTS}
      activeExp={activeExp}
      onExpChange={setActiveExp}
    >
      {activeExp === "reaction" && <ChemicalKinetics />}
      {activeExp === "ph" && <AcidBaseTitration />}
      {activeExp === "gas" && <GasLaws />}
    </LabLayout>
  );
}

