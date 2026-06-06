"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { DASHBOARD_NAV } from "@/lib/constants";
import * as Icons from "lucide-react";
import { FlaskConical, ChevronLeft, LogOut } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  return (
    <aside
      className={`h-screen shrink-0 bg-[#000000] border-r border-white/5 transition-all duration-300 flex flex-col ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/5">
        <Link href="/" className={`flex items-center gap-2.5 overflow-hidden ${collapsed ? "justify-center w-full" : ""}`}>
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0">
            <FlaskConical className="w-4 h-4 text-black" />
          </div>
          {!collapsed && (
            <span className="text-base font-bold text-white whitespace-nowrap">
              TechLab <span className="text-zinc-500">360</span>
            </span>
          )}
        </Link>
        {!collapsed && (
          <button onClick={() => setCollapsed(true)} className="text-zinc-500 hover:text-white">
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav Links */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
        {collapsed && (
          <button onClick={() => setCollapsed(false)} className="w-full flex justify-center mb-4 text-zinc-500 hover:text-white">
            <ChevronLeft className="w-5 h-5 rotate-180" />
          </button>
        )}
        
        {DASHBOARD_NAV.map((item) => {
          const Icon = Icons[item.icon as keyof typeof Icons] as React.ElementType;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-item ${isActive ? "active" : ""} ${collapsed ? "justify-center px-0" : ""}`}
              title={collapsed ? t(item.tKey) || item.label : undefined}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-white" : "text-zinc-500"}`} />
              {!collapsed && <span>{t(item.tKey) || item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer Profile */}
      <div className="p-4 border-t border-white/5">
        <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
          <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold text-white shrink-0">
            TS
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">Thasmilan</div>
              <div className="text-xs text-zinc-500 truncate">Student ID: TS-001</div>
            </div>
          )}
          {!collapsed && (
            <Link href="/" className="text-zinc-500 hover:text-white shrink-0">
              <LogOut className="w-4 h-4" />
            </Link>
          )}
        </div>
        
        {/* Language Switcher */}
        {!collapsed && (
          <div className="mt-4 flex bg-[#111111] p-1 rounded-lg border border-white/5">
            {(["en", "ta", "si"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`flex-1 text-xs py-1.5 rounded-md font-medium transition-all ${
                  language === lang 
                    ? "bg-white text-black shadow-sm" 
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                {lang === "en" ? "EN" : lang === "ta" ? "தமிழ்" : "සිංහල"}
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
