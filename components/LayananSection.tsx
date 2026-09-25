"use client";

import React, { useState, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useInfiniteLoopSlider } from "@/hooks/useInfiniteLoopSlider";
import { useDynamicSectionHeight } from "@/hooks/useDynamicSectionHeight";
import MobileReveal from "@/components/MobileReveal";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export type CardType = "direct" | "coming_soon" | "multi_link";

export interface SubItem {
  name: string;
  url: string;
}

export interface ServiceCardData {
  id: string;
  type: CardType;
  icon: string;
  title: {
    id: string;
    en: string;
  };
  description: {
    id: string;
    en: string;
  };
  url?: string;
  comingSoonMessage?: {
    id: string;
    en: string;
  };
  subItems?: SubItem[];
}

export const servicesData: ServiceCardData[] = [
  // TYPE A — DIRECT LINK CARDS (11 cards)
  {
    id: "lms-solusi",
    type: "direct",
    icon: "monitor",
    title: {
      id: "LMS Solusi",
      en: "LMS Solusi",
    },
    description: {
      id: "Pembelajaran online dengan teknologi terkini.",
      en: "Online learning with the latest technology.",
    },
    url: "https://solusi.sibermu.ac.id/",
  },
  {
    id: "helpdesk",
    type: "direct",
    icon: "headset",
    title: {
      id: "Helpdesk",
      en: "Helpdesk",
    },
    description: {
      id: "Pusat bantuan untuk kendala teknis & layanan.",
      en: "Support center for technical and service issues.",
    },
    url: "https://helpdesk.sibermu.ac.id/",
  },
  {
    id: "siakad",
    type: "direct",
    icon: "document",
    title: {
      id: "SIAKAD",
      en: "SIAKAD",
    },
    description: {
      id: "Layanan KRS dan KHS mahasiswa.",
      en: "Student course registration (KRS) and grade report (KHS) services.",
    },
    url: "https://student.sibermu.ac.id/",
  },
  {
    id: "kal-akademik",
    type: "direct",
    icon: "calendar",
    title: {
      id: "Kal. Akademik",
      en: "Academic Calendar",
    },
    description: {
      id: "Informasi kalender akademik setiap semester.",
      en: "Academic calendar information for each semester.",
    },
    url: "https://kaldik.sibermu.ac.id/",
  },
  {
    id: "akademik",
    type: "direct",
    icon: "book",
    title: {
      id: "Akademik",
      en: "Academic",
    },
    description: {
      id: "Pusat informasi terkait kegiatan akademik.",
      en: "Information hub for academic activities.",
    },
    url: "https://sibermu.ac.id/akademik",
  },
  {
    id: "penmaru",
    type: "direct",
    icon: "user-plus",
    title: {
      id: "PENMARU",
      en: "Admissions",
    },
    description: {
      id: "Pendaftaran dan penerimaan mahasiswa baru.",
      en: "New student registration and admissions.",
    },
    url: "https://sibermu.ac.id/admisi",
  },
  {
    id: "tte-sibermu",
    type: "direct",
    icon: "signature",
    title: {
      id: "TTE",
      en: "TTE",
    },
    description: {
      id: "Tanda tangan elektronik.",
      en: "Electronic signature.",
    },
    url: "https://tte.sibermu.ac.id/",
  },
  {
    id: "tugas-akhir",
    type: "direct",
    icon: "graduation-cap",
    title: {
      id: "Tugas Akhir",
      en: "Thesis",
    },
    description: {
      id: "Manajemen tugas akhir.",
      en: "Thesis/final project management.",
    },
    url: "https://ta.sibermu.ac.id/",
  },
  {
    id: "jurnal",
    type: "direct",
    icon: "journal",
    title: {
      id: "Jurnal",
      en: "Journal",
    },
    description: {
      id: "Publikasi jurnal penelitian dan karya ilmiah.",
      en: "Research and scientific publication journal.",
    },
    url: "https://www.jurnalsibermu.com/",
  },
  {
    id: "sso-sibermu",
    type: "direct",
    icon: "key",
    title: {
      id: "SSO",
      en: "SSO",
    },
    description: {
      id: "Akses semua layanan dengan satu akun.",
      en: "Access all services with one account.",
    },
    url: "https://sso.sibermu.ac.id/",
  },
  {
    id: "eprints",
    type: "direct",
    icon: "archive",
    title: {
      id: "E-Prints",
      en: "E-Prints",
    },
    description: {
      id: "Repositori digital karya ilmiah & skripsi.",
      en: "Digital repository for theses and scientific works.",
    },
    url: "https://eprints.sibermu.ac.id/",
  },

  // TYPE B — COMING SOON CARD (1 card)
  {
    id: "shortlink",
    type: "coming_soon",
    icon: "link",
    title: {
      id: "Short Link",
      en: "Short Link",
    },
    description: {
      id: "Akan hadir.",
      en: "Coming soon.",
    },
    comingSoonMessage: {
      id: "Layanan ini akan segera hadir.",
      en: "This service is coming soon.",
    },
  },

  // TYPE C — MULTI-LINK GROUP CARDS (3 cards)
  {
    id: "portal-prodi",
    type: "multi_link",
    icon: "portal",
    title: {
      id: "Portal Prodi",
      en: "Study Program Portal",
    },
    description: {
      id: "Halaman web resmi setiap program studi.",
      en: "Official website for each study program.",
    },
    subItems: [
      { name: "Informatika", url: "https://informatika.sibermu.ac.id/" },
      { name: "Sistem Informasi", url: "https://si.sibermu.ac.id/" },
      { name: "Administrasi Kesehatan", url: "https://adminkes.sibermu.ac.id/" },
      { name: "Akuntansi", url: "https://akuntansi.sibermu.ac.id/" },
      { name: "Manajemen", url: "https://manajemen.sibermu.ac.id/" },
      { name: "Hukum", url: "https://hukum.sibermu.ac.id/" },
    ],
  },
  {
    id: "layanan-dosen",
    type: "multi_link",
    icon: "dosen",
    title: {
      id: "Layanan Dosen",
      en: "Lecturer Services",
    },
    description: {
      id: "Layanan khusus untuk mendukung aktivitas dosen.",
      en: "Dedicated services to support lecturer activities.",
    },
    subItems: [
      { name: "Asesmen", url: "https://asesmen.sibermu.ac.id/" },
      { name: "OBE", url: "https://obe.sibermu.ac.id/" },
      { name: "Lecture", url: "https://lecture.sibermu.ac.id/login" },
      { name: "Dosen", url: "https://dosen.sibermu.ac.id/login" },
      { name: "HRD", url: "https://hrd.sibermu.ac.id/login" },
    ],
  },
  {
    id: "layanan-lain",
    type: "multi_link",
    icon: "layanan-lain",
    title: {
      id: "Layanan Lain",
      en: "Other Services",
    },
    description: {
      id: "Layanan pendukung lainnya untuk sivitas akademika.",
      en: "Additional support services for the academic community.",
    },
    subItems: [
      { name: "Manajemen Akademik", url: "https://academic.sibermu.ac.id/login" },
    ],
  },
];

// Helper to chunk array into pages of 4 items
const pagesData = [
  servicesData.slice(0, 4),   // Page 1: cards 1-4
  servicesData.slice(4, 8),   // Page 2: cards 5-8
  servicesData.slice(8, 12),  // Page 3: cards 9-12
  servicesData.slice(12, 15), // Page 4: cards 13-15 (3 cards, 4th slot empty)
];

// 3 cloned sets of pages for seamless infinite looping
const loopedPages = [
  ...pagesData.map((cards, idx) => ({ key: `set1-page-${idx}`, cards })),
  ...pagesData.map((cards, idx) => ({ key: `set2-page-${idx}`, cards })),
  ...pagesData.map((cards, idx) => ({ key: `set3-page-${idx}`, cards })),
];

// Helper to render SVG icons cleanly
function ServiceIcon({ name, className = "w-5 h-5 text-black" }: { name: string; className?: string }) {
  switch (name) {
    case "monitor":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case "headset":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v3a3 3 0 01-3 3z" />
        </svg>
      );
    case "document":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case "calendar":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    case "book":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      );
    case "user-plus":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      );
    case "signature":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      );
    case "graduation-cap":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      );
    case "journal":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      );
    case "key":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      );
    case "archive":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M5 8h14M5 8a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v1a2 2 0 01-2 2M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      );
    case "link":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      );
    case "portal":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h5m-5 0V11m0 0h5m-5 0H7" />
        </svg>
      );
    case "dosen":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case "layanan-lain":
    default:
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      );
  }
}

export default function LayananSection() {
  const { locale, t } = useLanguage();
  const { containerRef, minHeight, stickyTop } = useDynamicSectionHeight();
  const [activeModalCard, setActiveModalCard] = useState<ServiceCardData | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const {
    scrollRef,
    scroll,
    handleScroll,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
    dragDistance,
  } = useInfiniteLoopSlider({ itemCount: pagesData.length, locale });

  const headline = t("section6.headline") || (locale === "en" ? "Services" : "Layanan");
  const subheadline =
    t("section6.subheadline") ||
    (locale === "en"
      ? "Full support for the academic journey and personal development of SIBERMU students."
      : "Dukungan penuh untuk perjalanan akademik dan pengembangan diri mahasiswa SIBERMU.");
  const seeMoreText = t("section6.seeMore") || (locale === "en" ? "See More →" : " Selengkapnya →");

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

  const handleCardClick = (card: ServiceCardData) => {
    if (card.type === "direct" && card.url) {
      window.open(card.url, "_blank", "noopener,noreferrer");
    } else {
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
            <div className="w-11 h-11 bg-[#FF9E44] border-2 border-black rounded-none shadow-[2px_2px_0px_#000000] flex items-center justify-center shrink-0">
              <ServiceIcon name={activeModalCard.icon} className="w-6 h-6 text-black" />
            </div>
            <div>
              <h3 className="font-bold text-xl text-[#1A2A5B] leading-snug">
                {activeModalCard.title[locale] || activeModalCard.title.id}
              </h3>
              <p className="text-xs text-[#706F6F] font-normal mt-0.5">
                {activeModalCard.description[locale] || activeModalCard.description.id}
              </p>
            </div>
          </div>

          {/* Close (×) Button - Sharp Corners & Neobrutalist Styling */}
          <button
            type="button"
            onClick={() => setActiveModalCard(null)}
            className="w-8 h-8 rounded-none border-2 border-black bg-white hover:bg-[#FF9E44] text-black flex items-center justify-center transition-colors shrink-0 cursor-pointer font-bold text-base shadow-[2px_2px_0px_#000000]"
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div>
          {/* TYPE B — COMING SOON MESSAGE */}
          {activeModalCard.type === "coming_soon" && (
            <div className="py-6 px-4 bg-amber-50/80 border-2 border-black rounded-none shadow-[3px_3px_0px_#000000] text-center flex flex-col items-center justify-center space-y-2">
              <div className="w-10 h-10 rounded-none border-2 border-black bg-[#FF9E44] flex items-center justify-center text-black mb-1 shadow-[2px_2px_0px_#000000]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="font-semibold text-base text-amber-950">
                {activeModalCard.comingSoonMessage?.[locale] || activeModalCard.comingSoonMessage?.id}
              </p>
            </div>
          )}

          {/* TYPE C — MULTI-LINK GROUP LIST */}
          {activeModalCard.type === "multi_link" && activeModalCard.subItems && (
            <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                {locale === "en" ? "Select a portal to visit:" : "Pilih portal yang ingin dibuka:"}
              </p>
              {activeModalCard.subItems.map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-[#1A2A5B] hover:text-white border-2 border-black rounded-none transition-all duration-200 group text-sm font-semibold cursor-pointer shadow-[3px_3px_0px_#000000] hover:shadow-[5px_5px_0px_#000000] hover:-translate-y-0.5"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-none bg-white group-hover:bg-white/20 border-2 border-black group-hover:border-white flex items-center justify-center shrink-0 text-[#1A2A5B] group-hover:text-white transition-colors shadow-[1px_1px_0px_#000000]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </div>
                    <span>{item.name}</span>
                  </div>
                  <span className="text-black group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-base font-bold">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;

  return (
    <section
      id="layanan-mahasiswa"
      data-theme="light"
      style={{
        ...(minHeight ? { minHeight: `${minHeight}px` } : {}),
        ...(stickyTop !== null ? { top: `${stickyTop}px` } : {}),
      }}
      className="relative lg:sticky lg:top-0 min-h-screen w-full bg-slate-50 text-[#1A2A5B] z-[60] flex flex-col justify-center overflow-visible lg:overflow-visible py-16 sm:py-20 lg:pt-[calc(var(--header-marquee-total)+1.5rem)] lg:pb-12 border-t border-slate-200 lg:border-t-2 lg:border-[#ff9e44] scroll-mt-[var(--header-marquee-total)]"
    >
      {/* Subtle Dot Grid Background Pattern */}
      <div className="dot-grid-pattern-light" aria-hidden="true" />

      {/* Main Container */}
      <div ref={containerRef} className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        
        {/* HEADER BLOCK */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <MobileReveal delay={0} rotate={-1.5}>
            <h2 className="font-bold text-4xl sm:text-5xl lg:text-[clamp(2.25rem,3.5vw,3.125rem)] text-[#1A2A5B] leading-[1.2] tracking-tight mb-3">
              <span className="headline-marker headline-marker-1">
                {headline}
              </span>
            </h2>
          </MobileReveal>

          <MobileReveal delay={100}>
            <p className="text-[#706F6F] text-base sm:text-lg leading-[1.65] font-normal">
              {subheadline}
            </p>
          </MobileReveal>
        </div>

        {/* PAGINATED 2x2 SLIDER CONTAINER WITH OVERLAPPING CIRCULAR NAVIGATION ARROWS */}
        <MobileReveal delay={150} rotate={1.5} className="relative max-w-5xl mx-auto px-2 sm:px-4">
          
          {/* LEFT CIRCULAR ARROW BUTTON */}
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Previous services page"
            className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-md text-[#1A2A5B] border-2 border-black rounded-full flex items-center justify-center font-bold text-lg sm:text-xl hover:bg-[#FF9E44] hover:text-black hover:border-black transition-all shadow-[0_4px_14px_rgba(0,0,0,0.2)] active:scale-95 cursor-pointer"
          >
            ‹
          </button>

          {/* RIGHT CIRCULAR ARROW BUTTON */}
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Next services page"
            className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-md text-[#1A2A5B] border-2 border-black rounded-full flex items-center justify-center font-bold text-lg sm:text-xl hover:bg-[#FF9E44] hover:text-black hover:border-black transition-all shadow-[0_4px_14px_rgba(0,0,0,0.2)] active:scale-95 cursor-pointer"
          >
            ›
          </button>

          {/* DRAGGABLE & INFINITE SCROLLING 2x2 PAGE SLIDER TRACK */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className="flex gap-6 sm:gap-8 overflow-x-auto py-3 px-1 select-none cursor-grab active:cursor-grabbing no-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {loopedPages.map((pageGroup) => (
              <div
                key={pageGroup.key}
                className="w-full flex-shrink-0 grid grid-cols-2 grid-rows-2 gap-3.5 sm:gap-5 lg:gap-6"
              >
                {/* 4 Grid slots per page */}
                {[0, 1, 2, 3].map((slotIdx) => {
                  const card = pageGroup.cards[slotIdx];
                  if (!card) {
                    // Empty 4th slot placeholder on Page 4 (leaves slot blank without stretching remaining cards)
                    return <div key={`empty-${slotIdx}`} className="invisible" aria-hidden="true" />;
                  }

                  const cardTitle = card.title[locale] || card.title.id;
                  const cardDesc = card.description[locale] || card.description.id;

                  return (
                    <div
                      key={card.id}
                      onClick={() => {
                        if (dragDistance > 5) return;
                        handleCardClick(card);
                      }}
                      className="bg-white p-3.5 sm:p-5 lg:p-6 rounded-none border-[3.5px] border-black shadow-[4px_4px_0px_#000000] sm:shadow-[5px_5px_0px_#000000] flex flex-col justify-between h-full hover:-translate-y-1 hover:shadow-[8px_8px_0px_#000000] transition-all duration-300 group cursor-pointer"
                    >
                      <div className="flex-1 flex flex-col min-h-0 mb-2 sm:mb-4">
                        {/* Top row: Icon Badge */}
                        <div className="flex items-center justify-between mb-2 sm:mb-3.5 shrink-0">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#FF9E44] border-2 border-black flex items-center justify-center shrink-0 rounded-none shadow-[2px_2px_0px_#000000]">
                            <ServiceIcon name={card.icon} className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                          </div>
                          {/* Visual indicator tag for multi-link / popup */}
                          {card.type === "multi_link" && (
                            <span className="text-[9px] sm:text-[11px] font-bold tracking-wide uppercase px-1.5 sm:px-2 py-0.5 bg-slate-100 border border-black/20 text-[#1A2A5B]">
                              Group
                            </span>
                          )}
                          {card.type === "coming_soon" && (
                            <span className="text-[9px] sm:text-[11px] font-bold tracking-wide uppercase px-1.5 sm:px-2 py-0.5 bg-amber-100 border border-amber-300 text-amber-800">
                              Soon
                            </span>
                          )}
                        </div>

                        {/* Title & Description */}
                        <h3 className="font-bold text-xs sm:text-base lg:text-lg text-[#1A2A5B] leading-tight uppercase mb-1 sm:mb-2 group-hover:text-[#1A2A5B] line-clamp-2">
                          {cardTitle}
                        </h3>
                        <p className="text-[#706F6F] text-[11px] sm:text-xs lg:text-sm leading-snug sm:leading-relaxed font-normal line-clamp-2 sm:line-clamp-3 lg:line-clamp-4">
                          {cardDesc}
                        </p>
                      </div>

                      {/* Bottom Trigger Link/Button */}
                      <div className="pt-1.5 sm:pt-2 border-t border-slate-100 flex items-center justify-between mt-auto shrink-0">
                        <span className="font-bold text-[11px] sm:text-xs lg:text-sm text-[#1A2A5B] group-hover:text-[#FF9E44] transition-colors flex items-center space-x-1">
                          <span>{seeMoreText}</span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

        </MobileReveal>

      </div>

      {/* SHARED POPUP MODAL COMPONENT (PORTAL MOUNTED DIRECTLY TO DOCUMENT.BODY) */}
      {isMounted && modalJSX ? createPortal(modalJSX, document.body) : null}
    </section>
  );
}
