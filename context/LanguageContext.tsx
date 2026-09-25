"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { id } from "@/locales/id";
import { en } from "@/locales/en";

type Locale = "id" | "en";

export const siteMeta = {
  id: {
    title: "Biro Kemahasiswaan & AIK | SIBERMU",
    description: "Biro Kemahasiswaan dan Al-Islam Kemuhammadiyahan — mendampingi mahasiswa belajar, berkarya, dan bertumbuh tanpa batas.",
  },
  en: {
    title: "Student Affairs & AIK | SIBERMU",
    description: "Student Affairs and Al-Islam Kemuhammadiyahan Bureau — supporting students to learn, create, and grow without limits.",
  },
};

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (keyPath: string) => string;
}

const dictionaries = { id, en };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("id");

  useEffect(() => {
    const savedLocale = localStorage.getItem("sibermu_lang") as Locale;
    if (savedLocale && (savedLocale === "id" || savedLocale === "en")) {
      setLocaleState(savedLocale);
    }
  }, []);

  useEffect(() => {
    const meta = siteMeta[locale] || siteMeta.id;
    document.title = meta.title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", meta.description);
    }
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("sibermu_lang", newLocale);
  };

  const t = (keyPath: string): string => {
    const keys = keyPath.split(".");
    let current: any = dictionaries[locale];

    for (const key of keys) {
      if (current && typeof current === "object" && key in current) {
        current = current[key];
      } else {
        // Fallback to ID if key missing in EN or vice versa
        let fallback: any = dictionaries["id"];
        for (const fk of keys) {
          if (fallback && typeof fallback === "object" && fk in fallback) {
            fallback = fallback[fk];
          } else {
            return keyPath;
          }
        }
        return typeof fallback === "string" ? fallback : keyPath;
      }
    }

    return typeof current === "string" ? current : keyPath;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
