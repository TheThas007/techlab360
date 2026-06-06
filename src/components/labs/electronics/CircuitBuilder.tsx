"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function CircuitBuilder() {
  const { t } = useLanguage();

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#0A0A0A] items-center justify-center p-8">
      <div className="max-w-2xl text-center space-y-6">
        <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-8">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M12 21v-6"></path>
            <path d="M12 9V3"></path>
            <path d="M21 12h-6"></path>
            <path d="M9 12H3"></path>
          </svg>
        </div>
        <h2 className="text-3xl font-black text-white">{t("electronics.builder.title") || "Circuit Builder"}</h2>
        <p className="text-lg text-zinc-400">
          {t("electronics.builder.desc") || "Drag and drop components to build custom electronic circuits. Simulation engine coming in the next update."}
        </p>
        <div className="mt-8 p-6 rounded-2xl bg-[#111111] border border-white/10 inline-block text-left">
          <h3 className="text-white font-bold mb-4">{t("electronics.builder.features") || "Upcoming Features:"}</h3>
          <ul className="space-y-3 text-zinc-400 text-sm list-disc pl-4">
            <li>Interactive grid with snap-to-node routing</li>
            <li>Library of active and passive components</li>
            <li>Real-time node voltage analysis (SPICE engine)</li>
            <li>Oscilloscope signal probing</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
