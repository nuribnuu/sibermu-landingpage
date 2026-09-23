"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useDynamicSectionHeight } from "@/hooks/useDynamicSectionHeight";

const badgeHashtags = {
  id: [
    "#MelampauiBatas",
    "#Berkemajuan",
    "#Ihsan",
    "#Respect",
    "#Inspiratif",
    "#Creative",
    "#Helpful",
    "#Inovatif",
  ],
  en: [
    "#BeyondBoundaries",
    "#Progressive",
    "#Ihsan",
    "#Respect",
    "#Inspirative",
    "#Creative",
    "#Helpful",
    "#Innovative",
  ],
};

export const section9ClosingData = {
  id: {
    badgePrefix: "SIBERMU",
    headline: "Mulai Perjalananmu Bersama SiberMu",
    cta1: "Daftar",
  },
  en: {
    badgePrefix: "SIBERMU",
    headline: "Start Your Journey With SiberMu",
    cta1: "Register",
  },
};

export default function ClosingCtaSection() {
  const { locale } = useLanguage();
  const content = section9ClosingData[locale] || section9ClosingData.id;
  const currentHashtags = badgeHashtags[locale] || badgeHashtags.id;
  const { containerRef, minHeight, stickyTop } = useDynamicSectionHeight();

  const [badgeIndex, setBadgeIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBadgeIndex((prev) => (prev + 1) % currentHashtags.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [currentHashtags.length]);

  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    const sectionIds = [
      "hero",
      "hero-secondary",
      "dua-dunia",
      "life-at-sibermu",
      "prestasi",
      "layanan-mahasiswa",
      "aik",
      "masjid-amal-mulya",
      "closing-cta",
    ];
    const targetIndex = sectionIds.indexOf(targetId);
    let totalTop = 0;
    if (targetIndex > 0) {
      for (let i = 0; i < targetIndex; i++) {
        const sec = document.getElementById(sectionIds[i]);
        if (sec) totalTop += sec.offsetHeight;
       }
    }
    window.scrollTo({ top: totalTop, behavior: "smooth" });
  };

  return (
    <section
      id="closing-cta"
      data-theme="dark"
      style={{
        ...(minHeight ? { minHeight: `${minHeight}px` } : {}),
        ...(stickyTop !== null ? { top: `${stickyTop}px` } : {}),
      }}
      className="relative lg:sticky lg:top-0 min-h-screen w-full bg-[#0b091f] text-white z-[90] flex flex-col justify-center overflow-visible lg:overflow-visible py-16 sm:py-20 lg:pt-[calc(var(--header-marquee-total)+1.5rem)] lg:pb-8 border-t border-white/5 lg:border-t-2 lg:border-[#ff9e44] scroll-mt-[var(--header-marquee-total)]"
    >
      <div className="dot-grid-pattern-dark" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-indigo-600/15 rounded-none blur-[150px] pointer-events-none" />

      <div ref={containerRef} className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 relative z-10 text-center flex flex-col items-center justify-center">
        <div className="inline-flex items-center justify-center px-4 py-1.5 bg-white/10 text-amber-400 font-extrabold text-xs sm:text-sm border border-amber-400/40 rounded-none tracking-wider uppercase mb-2 sm:mb-4 shadow-sm overflow-hidden">
          <span>{content.badgePrefix}&nbsp;</span>
          <span key={badgeIndex} className="inline-block animate-fade-slide">
            {currentHashtags[badgeIndex]}
          </span>
        </div>

        <h2 className="font-bold text-4xl sm:text-5xl lg:text-[clamp(2.25rem,4vw,3.5rem)] text-white leading-[1.18] tracking-tight mb-4 sm:mb-6 max-w-3xl">
          <span className="headline-marker headline-marker-1">
            {content.headline}
          </span>
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto">
          <a
            href="https://admissions.sibermu.ac.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit sm:w-auto bg-[#FF9E44] text-black hover:bg-[#e88d37] font-semibold text-sm sm:text-[15px] px-8 py-4 rounded-none border-2 border-black shadow-[5px_5px_0px_#000000] flex items-center justify-center space-x-2.5 transition-all cursor-pointer group"
          >
            <span>{content.cta1}</span>
            <span className="text-base group-hover:translate-x-1.5 transition-transform inline-block">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
