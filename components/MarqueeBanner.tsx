"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

const MARQUEE_TEXTS = {
  id: [
    "SELAMAT DATANG DI BIRO KEMAHASISWAAN DAN AIK SIBERMU",
    "#BelajarSepanjangMasaTanpaBatas",
    "#KuliahKapanpunDanDimanapun",
  ],
  en: [
    "WELCOME TO THE SIBERMU STUDENT AFFAIRS AND AIK BUREAU",
    "#LifelongLearningWithoutLimits",
    "#StudyAnytimeAnywhere",
  ],
};

export default function MarqueeBanner() {
  const { locale } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section2 =
        document.getElementById("hero-secondary") ||
        document.querySelector("section:nth-of-type(2)");
      const vh = window.innerHeight;

      if (section2) {
        const rect = section2.getBoundingClientRect();
        if (rect.top <= vh * 0.95) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } else {
        if (window.scrollY >= vh * 1.5) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const currentLocale = locale === "en" ? "en" : "id";
  const baseItems = MARQUEE_TEXTS[currentLocale];

  // Repeat the 3-sentence array 6x (18 items per Copy) to ensure width exceeds all viewport sizes without gap
  const marqueeItems = Array(6).fill(baseItems).flat();

  return (
    <div
      className={`w-full transition-opacity duration-300 ease-in-out ${
        isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="w-full bg-[#FF9E44] h-[38px] sm:h-[46px] lg:h-[50px] overflow-hidden flex items-center select-none relative shadow-sm border-t-[2.5px] border-b-[2.5px] sm:border-t-[3px] sm:border-b-[3px] border-[#1A2A5B]">
        {/* Single track container (w-max) containing 2 identical copies side-by-side */}
        <div className="flex w-max items-center animate-marquee">
          {/* Copy 1 */}
          <div className="flex shrink-0 items-center whitespace-nowrap">
            {marqueeItems.map((item, idx) => (
              <React.Fragment key={`c1-${idx}`}>
                <span className="font-bold text-[#1A2A5B] uppercase text-[12px] sm:text-[14px] lg:text-[16px] tracking-[0.5px] px-4 sm:px-6">
                  {item}
                </span>
                <span className="text-[#1A2A5B] text-[10px] sm:text-[12px] lg:text-[14px] px-2 sm:px-4 opacity-90 shrink-0">
                  ★
                </span>
              </React.Fragment>
            ))}
          </div>

          {/* Copy 2 (Identical replica for seamless loop at -50%) */}
          <div className="flex shrink-0 items-center whitespace-nowrap" aria-hidden="true">
            {marqueeItems.map((item, idx) => (
              <React.Fragment key={`c2-${idx}`}>
                <span className="font-bold text-[#1A2A5B] uppercase text-[12px] sm:text-[14px] lg:text-[16px] tracking-[0.5px] px-4 sm:px-6">
                  {item}
                </span>
                <span className="text-[#1A2A5B] text-[10px] sm:text-[12px] lg:text-[14px] px-2 sm:px-4 opacity-90 shrink-0">
                  ★
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}



