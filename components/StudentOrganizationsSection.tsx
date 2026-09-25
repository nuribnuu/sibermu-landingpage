"use client";

import React, { useState, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useDynamicSectionHeight } from "@/hooks/useDynamicSectionHeight";
import MobileReveal from "@/components/MobileReveal";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export interface LifeAtCard {
  icon?: string;
  title: string;
  description: string;
  isComingSoon?: boolean;
  comingSoonMessage?: string;
}

function CardIcon({ name, className = "w-5 h-5 text-black" }: { name?: string; className?: string }) {
  switch (name) {
    case "users":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    case "globe":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      );
    case "business":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      );
    case "creator":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      );
    case "code":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      );
    default:
      return null;
  }
}

export const section4Data = {
  id: {
    headline: "Organisasi & Unit Kegiatan Mahasiswa (UKM)",
    subheadline:
      "Di SIBERMU, mahasiswa memiliki ruang untuk mengembangkan kepemimpinan dan kolaborasi melalui organisasi mahasiswa, serta menyalurkan minat dan bakat lewat berbagai Unit Kegiatan Mahasiswa (UKM).",
    cards: [
      {
        icon: "users",
        title: "BEM SIBERMU",
        description:
          "Organisasi mahasiswa tertinggi di SIBERMU, wadah aspirasi dan kepemimpinan mahasiswa. Segera hadir.",
        isComingSoon: true,
        comingSoonMessage: "Organisasi ini akan segera hadir.",
      },
      {
        icon: "globe",
        title: "UKM English Club",
        description:
          "Wadah pengembangan kemampuan bahasa Inggris, debat, dan komunikasi global bagi mahasiswa.",
      },
      {
        icon: "business",
        title: "UKM Business",
        description:
          "Inkubasi wirausaha, kreativitas bisnis digital, dan pengembangan jiwa kepemimpinan finansial.",
      },
      {
        icon: "creator",
        title: "UKM Digital Creator",
        description:
          "Eksplorasi pembuatan konten digital, desain grafis, editing video, dan branding kreatif.",
      },
      {
        icon: "code",
        title: "UKM Coding",
        description:
          "Pusat belajar pemrograman, pengembangan web/aplikasi, dan solusi teknologi masa depan.",
      },
    ],
  },
  en: {
    headline: "Student Organizations & Student Activity Units (UKM)",
    subheadline:
      "At SIBERMU, students have a space to develop leadership and collaboration through student organizations, and to channel their interests and talents through various Student Activity Units (UKM).",
    cards: [
      {
        icon: "users",
        title: "BEM SIBERMU (Student Executive Board)",
        description:
          "The highest student organization at SIBERMU, a platform for student aspiration and leadership. Coming soon.",
        isComingSoon: true,
        comingSoonMessage: "This organization is coming soon.",
      },
      {
        icon: "globe",
        title: "UKM English Club",
        description:
          "A platform for developing English language skills, debate, and global communication for students.",
      },
      {
        icon: "business",
        title: "UKM Business",
        description:
          "Startup incubation, digital business creativity, and the development of financial leadership skills.",
      },
      {
        icon: "creator",
        title: "UKM Digital Creator",
        description:
          "Exploring digital content creation, graphic design, video editing, and creative branding.",
      },
      {
        icon: "code",
        title: "UKM Coding",
        description:
          "A hub for learning programming, web/app development, and future technology solutions.",
      },
    ],
  },
};

export default function StudentOrganizationsSection() {
  const { locale, t } = useLanguage();
  const content = section4Data[locale] || section4Data.id;
  const { containerRef, minHeight, stickyTop } = useDynamicSectionHeight();
  const [activeModalCard, setActiveModalCard] = useState<LifeAtCard | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Synchronous Layout Effect for Position-Fixed Scroll Lock, Pointer-Events Isolation & Instant Scroll Restoration
  useIsomorphicLayoutEffect(() => {
    if (activeModalCard) {
      const scrollY = window.scrollY;
      const root = document.documentElement;
      const body = document.body;

      const origHtmlOverflow = root.style.overflow;
      const origBodyOverflow = body.style.overflow;
      const origBodyPosition = body.style.position;
      const origBodyTop = body.style.top;
      const origBodyWidth = body.style.width;
      const origScrollBehavior = root.style.scrollBehavior;

      // Lock scroll via position fixed on body & overflow hidden on root/body
      root.style.overflow = "hidden";
      body.style.overflow = "hidden";
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.width = "100%";

      // Disable pointer events on Header and Bottom Nav elements while modal is active
      const headerEl = document.querySelector("header");
      const bottomNavEl = document.querySelector(".fixed.bottom-0");
      const origHeaderPointerEvents = headerEl ? (headerEl as HTMLElement).style.pointerEvents : "";
      const origBottomNavPointerEvents = bottomNavEl ? (bottomNavEl as HTMLElement).style.pointerEvents : "";

      if (headerEl) (headerEl as HTMLElement).style.pointerEvents = "none";
      if (bottomNavEl) (bottomNavEl as HTMLElement).style.pointerEvents = "none";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setActiveModalCard(null);
        }
      };
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        // Synchronous restoration before browser paint
        root.style.overflow = origHtmlOverflow;
        body.style.overflow = origBodyOverflow;
        body.style.position = origBodyPosition;
        body.style.top = origBodyTop;
        body.style.width = origBodyWidth;

        // Force instant scroll restoration without triggering smooth-scroll animation
        root.style.scrollBehavior = "auto";
        window.scrollTo({ top: scrollY, left: 0, behavior: "instant" });
        root.style.scrollBehavior = origScrollBehavior;

        // Restore pointer-events on Header and Bottom Nav
        if (headerEl) (headerEl as HTMLElement).style.pointerEvents = origHeaderPointerEvents;
        if (bottomNavEl) (bottomNavEl as HTMLElement).style.pointerEvents = origBottomNavPointerEvents;

        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [activeModalCard]);

  const handleCardClick = (card: LifeAtCard) => {
    if (card.isComingSoon) {
      setActiveModalCard(card);
    }
  };

  const modalJSX = activeModalCard ? (
    <div
      className="fixed inset-0 w-screen h-screen bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-200 touch-none"
      onClick={() => setActiveModalCard(null)}
      onWheel={(e) => e.preventDefault()}
    >
      <div
        className="bg-white rounded-none border-[3.5px] border-black shadow-[8px_8px_0px_#000000] max-w-md w-full p-6 sm:p-7 relative z-[10000] animate-in zoom-in-95 duration-150 overflow-hidden text-[#1A2A5B] touch-auto"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between mb-5 pb-4 border-b-2 border-black/10">
          <div className="flex items-center space-x-3.5 pr-6">
            {activeModalCard.icon && (
              <div className="w-11 h-11 bg-[#FF9E44] border-2 border-black rounded-none shadow-[2px_2px_0px_#000000] flex items-center justify-center shrink-0">
                <CardIcon name={activeModalCard.icon} className="w-6 h-6 text-black" />
              </div>
            )}
            <div>
              <h3 className="font-bold text-xl text-[#1A2A5B] leading-snug">
                {activeModalCard.title}
              </h3>
            </div>
          </div>

          {/* Close (×) Button */}
          <button
            type="button"
            onClick={() => setActiveModalCard(null)}
            className="w-8 h-8 rounded-none border-2 border-black bg-white hover:bg-[#FF9E44] text-black flex items-center justify-center transition-colors shrink-0 cursor-pointer font-bold text-base shadow-[2px_2px_0px_#000000]"
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        {/* Modal Body — Coming Soon Message */}
        <div className="py-6 px-4 bg-amber-50/80 border-2 border-black rounded-none shadow-[3px_3px_0px_#000000] text-center flex flex-col items-center justify-center space-y-2">
          <div className="w-10 h-10 rounded-none border-2 border-black bg-[#FF9E44] flex items-center justify-center text-black mb-1 shadow-[2px_2px_0px_#000000]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="font-semibold text-base text-amber-950">
            {activeModalCard.comingSoonMessage || (locale === "en" ? "This organization is coming soon." : "Organisasi ini akan segera hadir.")}
          </p>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <section
      id="life-at-sibermu"
      data-theme="light"
      style={{
        ...(minHeight ? { minHeight: `${minHeight}px` } : {}),
        ...(stickyTop !== null ? { top: `${stickyTop}px` } : {}),
      }}
      className="relative lg:sticky lg:top-0 min-h-screen w-full bg-slate-50 text-[#1A2A5B] z-[40] flex flex-col justify-center overflow-visible lg:overflow-visible py-14 sm:py-16 lg:pt-[calc(var(--header-marquee-total)+1.5rem)] lg:pb-10 border-t border-slate-200 lg:border-t-2 lg:border-[#ff9e44] scroll-mt-[var(--header-marquee-total)]"
    >
      {/* Subtle Dot Grid Background Pattern */}
      <div className="dot-grid-pattern-light" aria-hidden="true" />

      {/* Main Container */}
      <div ref={containerRef} className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        
        {/* HEADER BLOCK */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <MobileReveal delay={0} rotate={-1.5}>
            <h2 className="font-bold text-3xl sm:text-4xl lg:text-[clamp(2.25rem,3.5vw,3.125rem)] text-[#1A2A5B] leading-[1.2] tracking-tight mb-3">
              <span className="headline-marker headline-marker-1">
                {t("section4.headline") || content.headline}
              </span>
            </h2>
          </MobileReveal>

          <MobileReveal delay={100}>
            <p className="text-[#706F6F] text-sm sm:text-base lg:text-lg leading-[1.65] font-normal">
              {t("section4.subheadline") || content.subheadline}
            </p>
          </MobileReveal>
        </div>

        {/* 5 FEATURE CARDS GRID (3 Columns Desktop, 2 Columns Tablet with BEM Spanning Full Width at Top, 1 Column Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
          {content.cards.map((card, idx) => {
            // Card 01 (BEM) spans 2 columns on medium screens (tablet) for a balanced 1+2+2 grid layout
            const gridSpanClass = idx === 0 ? "md:col-span-2 lg:col-span-1" : "";
            const cardRotate = idx % 2 === 0 ? -2 : 2;

            return (
              <MobileReveal
                key={idx}
                delay={idx * 100}
                rotate={cardRotate}
                className={gridSpanClass}
              >
                <div
                  onClick={() => handleCardClick(card)}
                  className={`bg-white p-5 sm:p-6 rounded-none border-[3.5px] sm:border-4 border-black shadow-[6px_6px_0px_#000000] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[9px_9px_0px_#000000] relative group h-full ${
                    card.isComingSoon ? "cursor-pointer" : ""
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between mb-3.5">
                      {/* ICON BADGE */}
                      {card.icon && (
                        <div className="w-9 h-9 sm:w-10 sm:h-10 neobrutalist-badge flex items-center justify-center bg-[#FF9E44] text-black shrink-0 border-2 border-black">
                          <CardIcon name={card.icon} className="w-5 h-5 text-black" />
                        </div>
                      )}

                      <div className="flex items-center space-x-2 ml-auto">
                        {card.isComingSoon && (
                          <span className="text-[10px] sm:text-[11px] font-bold tracking-wide uppercase px-2 py-0.5 bg-amber-100 border border-amber-300 text-amber-800 rounded-none">
                            Soon
                          </span>
                        )}
                        {/* SUBTLE CORNER ACCENT ICON */}
                        <div className="w-8 h-8 rounded-none border border-black/10 flex items-center justify-center text-[#1A2A5B]/40 group-hover:text-[#1A2A5B] group-hover:border-black transition-colors">
                          ↗
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-lg sm:text-xl text-[#1A2A5B] tracking-tight mb-2 uppercase">
                        {card.title}
                      </h3>
                      <p className="text-[#706F6F] text-xs sm:text-sm leading-[1.6] font-normal">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              </MobileReveal>
            );
          })}
        </div>

      </div>

      {/* SHARED POPUP MODAL COMPONENT (PORTAL MOUNTED DIRECTLY TO DOCUMENT.BODY) */}
      {isMounted && modalJSX ? createPortal(modalJSX, document.body) : null}
    </section>
  );
}
