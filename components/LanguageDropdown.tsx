"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface LanguageDropdownProps {
  theme?: "dark" | "light";
}

export default function LanguageDropdown({ theme = "dark" }: LanguageDropdownProps) {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const languages = [
    { code: "id", label: "ID", fullLabel: "Bahasa Indonesia", flag: "🇮🇩" },
    { code: "en", label: "EN", fullLabel: "English", flag: "🇬🇧" },
  ];

  const triggerColorClass =
    theme === "light"
      ? "text-[#1A2A5B] hover:text-[#1A2A5B] hover:underline hover:underline-offset-4 hover:decoration-2"
      : "text-white hover:text-white hover:underline hover:underline-offset-4 hover:decoration-2";

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Language Trigger - Text simple "ID" atau "EN" + chevron kecil */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-1 bg-transparent border-none text-sm font-medium focus:outline-none cursor-pointer transition-colors duration-300 p-0 shadow-none ${triggerColorClass}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{locale.toUpperCase()}</span>
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-40 rounded-none bg-[#120e36]/95 border border-white/10 shadow-xl z-[110] p-1 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {languages.map((lang) => {
            const isActive = locale === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  setLocale(lang.code as "id" | "en");
                  setIsOpen(false);
                }}
                className={`flex items-center space-x-2.5 w-full px-3 py-2.5 text-xs rounded-none font-medium transition-colors ${
                  isActive
                    ? "bg-white/15 text-white font-semibold"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="text-sm">{lang.flag}</span>
                <span>{lang.fullLabel}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}


