"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function CompareEngines() {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-5xl overflow-x-auto bg-[#0A0A0A] p-6 rounded-2xl border border-white/5 shadow-2xl">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="p-4 text-zinc-500 font-medium">Feature</th>
            <th className="p-4 text-white font-bold text-lg">Petrol Engine</th>
            <th className="p-4 text-white font-bold text-lg">Diesel Engine</th>
            <th className="p-4 text-white font-bold text-lg">Electric Vehicle</th>
          </tr>
        </thead>
        <tbody className="text-sm text-zinc-300">
          <tr className="border-b border-white/5 bg-white/[0.02]">
            <td className="p-4 text-zinc-500 font-medium">Ignition</td>
            <td className="p-4">Spark Plug</td>
            <td className="p-4">Compression Heat</td>
            <td className="p-4">No combustion (Battery)</td>
          </tr>
          <tr className="border-b border-white/5">
            <td className="p-4 text-zinc-500 font-medium">Torque</td>
            <td className="p-4">Medium (at higher RPM)</td>
            <td className="p-4">High (at lower RPM)</td>
            <td className="p-4">Instant & High</td>
          </tr>
          <tr className="border-b border-white/5 bg-white/[0.02]">
            <td className="p-4 text-zinc-500 font-medium">Efficiency</td>
            <td className="p-4">~25-30%</td>
            <td className="p-4">~35-40%</td>
            <td className="p-4">~85-90%</td>
          </tr>
          <tr className="border-b border-white/5">
            <td className="p-4 text-zinc-500 font-medium">Noise/Vibration</td>
            <td className="p-4">Low</td>
            <td className="p-4">High</td>
            <td className="p-4">Very Low (Silent)</td>
          </tr>
          <tr>
            <td className="p-4 text-zinc-500 font-medium">Best For</td>
            <td className="p-4">Light vehicles, high speed</td>
            <td className="p-4">Heavy vehicles, trucks</td>
            <td className="p-4">City driving, eco-friendly</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
