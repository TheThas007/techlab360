"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import en from "./dictionaries/en.json";
import ta from "./dictionaries/ta.json";
import si from "./dictionaries/si.json";

type Language = "en" | "ta" | "si";
type Dictionary = typeof en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const dictionaries: Record<Language, Dictionary> = {
  en,
  ta: ta as unknown as Dictionary,
  si: si as unknown as Dictionary,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("app_lang") as Language;
    if (savedLang && ["en", "ta", "si"].includes(savedLang)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguageState(savedLang);
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("app_lang", lang);
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = dictionaries[language];
    
    for (const k of keys) {
      if (value === undefined) break;
      value = value[k as keyof typeof value];
    }
    
    // Fallback to English if translation is missing
    if (value === undefined && language !== "en") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let enValue: any = dictionaries["en"];
      for (const k of keys) {
        if (enValue === undefined) break;
        enValue = enValue[k as keyof typeof enValue];
      }
      return typeof enValue === "string" ? enValue : key;
    }

    return typeof value === "string" ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
