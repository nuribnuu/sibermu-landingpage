"use client";

import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import LanguageDropdown from "@/components/LanguageDropdown";
import MegaMenu from "@/components/MegaMenu";
import { smoothScrollToTarget, getTargetScrollTop } from "@/utils/smoothScroll";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Header() {
  const { t } = useLanguage();
  const [activeMegaMenu, setActiveMegaMenu] = useState<"kemahasiswaan" | "aik" | null>(null);
  const [headerTheme, setHeaderTheme] = useState<"dark" | "light">("light");
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeNavKey, setActiveNavKey] = useState<string>("home");

  // Track anchor navigation to prevent layout effect cleanup from snapping back scroll
  const isNavigatingRef = useRef(false);

  // Mobile Bottom Sheet state
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const navItems = [
    { key: "home", label: t("nav.home"), href: "#hero", hasMega: false },
    { key: "kemahasiswaan", label: t("nav.kemahasiswaan"), href: "#life-at-sibermu", hasMega: true, megaKey: "kemahasiswaan" as const },
    { key: "aik", label: t("nav.aik"), href: "#aik", hasMega: true, megaKey: "aik" as const },
  ];

  const handleMouseEnter = (item: (typeof navItems)[0]) => {
    if (item.hasMega && item.megaKey) {
      setActiveMegaMenu(item.megaKey);
    } else {
      setActiveMegaMenu(null);
    }
  };

  const getTargetScrollTop = (targetId: string): number => {
    if (!targetId || targetId === "hero") return 0;

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
    if (targetIndex === -1) {
      const targetEl = document.getElementById(targetId);
      return targetEl ? targetEl.getBoundingClientRect().top + window.scrollY : 0;
    }

    let totalTop = 0;
    for (let i = 0; i < targetIndex; i++) {
      const sec = document.getElementById(sectionIds[i]);
      if (sec) {
        totalTop += sec.offsetHeight;
      }
    }

    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;
    if (!isDesktop) {
      const headerMarqueeTotal = parseInt(
        getComputedStyle(document.documentElement)
          .getPropertyValue("--header-marquee-total") || "110",
        10
      );
      totalTop = Math.max(0, totalTop - (headerMarqueeTotal || 80));
    }

    return totalTop;
  };

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#") || href.startsWith("/#")) {
      e.preventDefault();
      const targetId = href.replace(/^\/?#/, "");
      
      const wasBottomSheetOpen = isBottomSheetOpen;
      isNavigatingRef.current = true;
      setIsBottomSheetOpen(false);
      setActiveMegaMenu(null);

      const delay = wasBottomSheetOpen ? 120 : 0;

      setTimeout(() => {
        smoothScrollToTarget(targetId, undefined, () => {
          isNavigatingRef.current = false;
        });
      }, delay);
    }
  };

  // Scroll-Spy & Active Section Theme Detector
  useEffect(() => {
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

    const sectionNavMap: Record<string, string | null> = {
      hero: "home",
      "hero-secondary": "home",
      "dua-dunia": "home",
      "life-at-sibermu": "kemahasiswaan",
      prestasi: "kemahasiswaan",
      "layanan-mahasiswa": "kemahasiswaan",
      aik: "aik",
      "masjid-amal-mulya": "aik",
      "closing-cta": null,
    };

    const sections = document.querySelectorAll("[data-theme]");

    // Theme Observer
    const themeObserver = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length === 0) return;

        const maxEntry = visibleEntries.reduce((prev, curr) =>
          curr.intersectionRatio > prev.intersectionRatio ? curr : prev
        );

        const theme = maxEntry.target.getAttribute("data-theme");
        if (theme === "light" || theme === "dark") {
          setHeaderTheme(theme);
        }
      },
      {
        rootMargin: "0px 0px -90% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0],
      }
    );

    sections.forEach((sec) => themeObserver.observe(sec));

    // Scroll Spy Handler (Works bidirectionally on scroll UP & DOWN for sticky stacked layout)
    let ticking = false;

    const handleScrollSpy = () => {
      const headerMarqueeTotal = parseInt(
        getComputedStyle(document.documentElement)
          .getPropertyValue("--header-marquee-total") || "110",
        10
      );
      const targetY = (headerMarqueeTotal || 80) + 50;

      let currentActiveId: string | null = null;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();

        // In a top-to-bottom list of sticky stacking sections:
        // The active section is the LAST section in DOM order whose top edge has reached targetY
        if (rect.top <= targetY) {
          currentActiveId = id;
        }
      }

      if (currentActiveId && sectionNavMap[currentActiveId] !== undefined) {
        const navKey = sectionNavMap[currentActiveId];
        setActiveNavKey(navKey || "");
      } else {
        setActiveNavKey("");
      }
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScrollSpy();
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScrollSpy();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      themeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Synchronous Layout Effect for Position-Fixed Mobile Bottom Sheet Scroll Lock & Instant Restoration
  useIsomorphicLayoutEffect(() => {
    if (isBottomSheetOpen) {
      const scrollY = window.scrollY;
      const root = document.documentElement;
      const body = document.body;

      const origHtmlOverflow = root.style.overflow;
      const origBodyOverflow = body.style.overflow;
      const origBodyPosition = body.style.position;
      const origBodyTop = body.style.top;
      const origBodyWidth = body.style.width;
      const origBodyLeft = body.style.left;
      const origScrollBehavior = root.style.scrollBehavior;

      root.style.overflow = "hidden";
      body.style.overflow = "hidden";
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.width = "100%";
      body.style.left = "0";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsBottomSheetOpen(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        root.style.overflow = origHtmlOverflow;
        body.style.overflow = origBodyOverflow;
        body.style.position = origBodyPosition;
        body.style.top = origBodyTop;
        body.style.width = origBodyWidth;
        body.style.left = origBodyLeft;

        root.style.scrollBehavior = "auto";
        window.scrollTo({ top: scrollY, left: 0, behavior: "instant" });
        root.style.scrollBehavior = origScrollBehavior;

        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isBottomSheetOpen]);

  // Dynamic ResizeObserver to handle browser zoom (Ctrl +/-), resize, and reflow
  useEffect(() => {
    const updateHeaderMetrics = () => {
      const headerEl = document.querySelector("header");
      const marqueeEl =
        document.querySelector(".running-text-sticky") ||
        document.querySelector('[class*="bg-[#FF9E44]"]');

      const hHeight = headerEl
        ? headerEl.getBoundingClientRect().height
        : window.innerWidth >= 1024
        ? 76
        : window.innerWidth >= 640
        ? 64
        : 56;

      const mHeight = marqueeEl
        ? marqueeEl.getBoundingClientRect().height
        : window.innerWidth >= 1024
        ? 50
        : window.innerWidth >= 640
        ? 46
        : 38;

      const totalHeight = hHeight + mHeight;

      document.documentElement.style.setProperty("--header-height", `${hHeight}px`);
      document.documentElement.style.setProperty("--marquee-height", `${mHeight}px`);
      document.documentElement.style.setProperty("--header-marquee-total", `${totalHeight}px`);
    };

    updateHeaderMetrics();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        updateHeaderMetrics();
      });

      const headerEl = document.querySelector("header");
      if (headerEl) resizeObserver.observe(headerEl);

      const marqueeEl =
        document.querySelector(".running-text-sticky") ||
        document.querySelector('[class*="bg-[#FF9E44]"]');
      if (marqueeEl) resizeObserver.observe(marqueeEl);
    }

    window.addEventListener("resize", updateHeaderMetrics);
    return () => {
      window.removeEventListener("resize", updateHeaderMetrics);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  const isLight = headerTheme === "light";

  // Header 2-State Background styling
  const headerStyleClass = !isScrolled
    ? "bg-transparent backdrop-blur-none border-b border-transparent shadow-none"
    : isLight
      ? "bg-white/75 backdrop-blur-md border-b border-[#1A2A5B]/10 shadow-sm"
      : "bg-[#120e36]/75 backdrop-blur-md border-b border-white/10 shadow-sm";

  return (
    <>
      {/* TOP HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-[130] w-full h-14 sm:h-16 lg:h-[76px] transition-all duration-300 ease-in-out ${headerStyleClass}`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 h-full flex items-center justify-between">
          {/* LOGO SIBERMU */}
          <a
            href="#hero"
            onClick={(e) => handleAnchorClick(e, "#hero")}
            className="flex items-center group focus:outline-none shrink-0 cursor-pointer"
          >
            <Image
              src="/logo.png"
              alt="SIBERMU Logo"
              width={130}
              height={34}
              className={`h-6 sm:h-7 lg:h-8 w-auto object-contain transition-all duration-300 group-hover:scale-105 ${
                isLight
                  ? "[filter:brightness(0)_opacity(0.85)]"
                  : "brightness-100"
              }`}
              priority
            />
          </a>

          {/* DESKTOP NAVIGATION LINKS */}
          <nav className="hidden lg:flex items-center space-x-7 xl:space-x-9">
            {navItems.map((item) => {
              const isMegaOpen = activeMegaMenu === item.megaKey;
              const isActive = activeNavKey === item.key;

              const textColorClass = isLight
                ? isActive || isMegaOpen
                  ? "text-[#1A2A5B] font-bold underline underline-offset-4 decoration-2 decoration-[#1A2A5B]"
                  : "text-[#1A2A5B]/90 hover:text-[#1A2A5B] hover:underline hover:underline-offset-4 hover:decoration-2"
                : isActive || isMegaOpen
                  ? "text-white font-bold underline underline-offset-4 decoration-2 decoration-white"
                  : "text-white/90 hover:text-white hover:underline hover:underline-offset-4 hover:decoration-2";

              return (
                <div
                  key={item.key}
                  className="relative py-2"
                  onMouseEnter={() => handleMouseEnter(item)}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleAnchorClick(e, item.href)}
                    className={`text-[14px] sm:text-[15px] font-medium transition-colors duration-300 ease-in-out flex items-center space-x-1.5 cursor-pointer ${textColorClass}`}
                  >
                    {item.key === "home" && (
                      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    )}
                    {item.key === "kemahasiswaan" && (
                      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      </svg>
                    )}
                    {item.key === "aik" && (
                      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    )}
                    <span>{item.label}</span>
                    {item.hasMega && (
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isLight ? "text-[#1A2A5B]/70" : "text-white/80"
                        } ${isMegaOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </a>
                </div>
              );
            })}
          </nav>

          {/* DESKTOP ACTIONS */}
          <div className="hidden lg:flex items-center space-x-5 shrink-0 relative z-[130]">
            <LanguageDropdown theme={headerTheme} />
            <a
              href="https://admissions.sibermu.ac.id/"
              target="_blank"
              rel="noopener noreferrer"
              className={`font-medium text-sm transition-colors duration-300 whitespace-nowrap cursor-pointer ${
                isLight
                  ? "text-[#1A2A5B] hover:text-[#1A2A5B] hover:underline hover:underline-offset-4 hover:decoration-2"
                  : "text-white hover:text-white hover:underline hover:underline-offset-4 hover:decoration-2"
              }`}
            >
              {t("nav.register")}
            </a>
          </div>

          {/* MOBILE TOP ACTIONS */}
          <div className="flex lg:hidden items-center space-x-3 sm:space-x-4 shrink-0 relative z-[130]">
            <LanguageDropdown theme={headerTheme} />
            <a
              href="https://admissions.sibermu.ac.id/"
              target="_blank"
              rel="noopener noreferrer"
              className={`font-medium text-xs sm:text-sm transition-colors duration-300 whitespace-nowrap cursor-pointer ${
                isLight
                  ? "text-[#1A2A5B] hover:text-[#1A2A5B] hover:underline hover:underline-offset-4 hover:decoration-2"
                  : "text-white hover:text-white hover:underline hover:underline-offset-4 hover:decoration-2"
              }`}
            >
              {t("nav.register")}
            </a>
          </div>
        </div>

        {/* Mega Menu Overlay (Desktop) */}
        <MegaMenu activeMenu={activeMegaMenu} onClose={() => setActiveMegaMenu(null)} />
      </header>

      {/* MOBILE BOTTOM TAB BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] w-full bg-[#120e36] border-t border-white/10 shadow-2xl h-16 lg:hidden flex items-center justify-around px-2">
        {/* 1. Home */}
        <a
          href="#hero"
          onClick={(e) => handleAnchorClick(e, "#hero")}
          className="flex flex-col items-center justify-center text-center space-y-1 w-20 sm:w-24 px-1 transition-colors cursor-pointer relative group"
        >
          <div className={`absolute -top-6 w-11 h-11 rounded-none flex items-center justify-center border-[3.5px] border-[#120e36] shadow-[0_4px_14px_rgba(255,158,68,0.45)] transition-all duration-200 group-hover:scale-105 group-active:scale-95 ${
            activeNavKey === "home"
              ? "bg-[#FF9E44] text-[#120e36] scale-105 ring-2 ring-[#FF9E44]/50"
              : "bg-[#FF9E44] text-[#120e36]"
          }`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <svg className="w-5 h-5 opacity-0" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M0 0h24v24H0z" />
          </svg>
          <span className={`text-[10px] sm:text-[11px] leading-[1.15] text-center transition-colors w-full flex items-center justify-center h-[26px] break-words ${
            activeNavKey === "home" ? "text-amber-400 font-semibold" : "text-white font-normal"
          }`}>{t("nav.home")}</span>
        </a>

        {/* 2. Kemahasiswaan */}
        <a
          href="#life-at-sibermu"
          onClick={(e) => handleAnchorClick(e, "#life-at-sibermu")}
          className="flex flex-col items-center justify-center text-center space-y-1 w-20 sm:w-24 px-1 transition-colors cursor-pointer relative group"
        >
          <div className={`absolute -top-6 w-11 h-11 rounded-none flex items-center justify-center border-[3.5px] border-[#120e36] shadow-[0_4px_14px_rgba(255,158,68,0.45)] transition-all duration-200 group-hover:scale-105 group-active:scale-95 ${
            activeNavKey === "kemahasiswaan"
              ? "bg-[#FF9E44] text-[#120e36] scale-105 ring-2 ring-[#FF9E44]/50"
              : "bg-[#FF9E44] text-[#120e36]"
          }`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          </div>
          <svg className="w-5 h-5 opacity-0" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M0 0h24v24H0z" />
          </svg>
          <span className={`text-[10px] sm:text-[11px] leading-[1.15] text-center transition-colors w-full flex items-center justify-center h-[26px] break-words ${
            activeNavKey === "kemahasiswaan" ? "text-amber-400 font-semibold" : "text-white font-normal"
          }`}>{t("nav.kemahasiswaan")}</span>
        </a>

        {/* 3. AIK */}
        <a
          href="#aik"
          onClick={(e) => handleAnchorClick(e, "#aik")}
          className="flex flex-col items-center justify-center text-center space-y-1 w-20 sm:w-24 px-1 transition-colors cursor-pointer relative group"
        >
          <div className={`absolute -top-6 w-11 h-11 rounded-none flex items-center justify-center border-[3.5px] border-[#120e36] shadow-[0_4px_14px_rgba(255,158,68,0.45)] transition-all duration-200 group-hover:scale-105 group-active:scale-95 ${
            activeNavKey === "aik"
              ? "bg-[#FF9E44] text-[#120e36] scale-105 ring-2 ring-[#FF9E44]/50"
              : "bg-[#FF9E44] text-[#120e36]"
          }`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <svg className="w-5 h-5 opacity-0" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M0 0h24v24H0z" />
          </svg>
          <span className={`text-[10px] sm:text-[11px] leading-[1.15] text-center transition-colors w-full flex items-center justify-center h-[26px] break-words ${
            activeNavKey === "aik" ? "text-amber-400 font-semibold" : "text-white font-normal"
          }`}>{t("nav.aik")}</span>
        </a>

        {/* 4. More */}
        <button
          type="button"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.dispatchEvent(new Event("close-chatbot-popup"));
            }
            setIsBottomSheetOpen(true);
          }}
          className="flex flex-col items-center justify-center text-center space-y-1 w-20 sm:w-24 px-1 transition-colors relative group cursor-pointer"
        >
          <div className={`absolute -top-6 w-11 h-11 rounded-none flex items-center justify-center border-[3.5px] border-[#120e36] shadow-[0_4px_14px_rgba(255,158,68,0.45)] transition-all duration-200 group-hover:scale-105 group-active:scale-95 ${
            isBottomSheetOpen
              ? "bg-[#FF9E44] text-[#120e36] scale-105 ring-2 ring-[#FF9E44]/50"
              : "bg-[#FF9E44] text-[#120e36]"
          }`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          <svg className="w-5 h-5 opacity-0" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M0 0h24v24H0z" />
          </svg>
          <span className={`text-[10px] sm:text-[11px] leading-[1.15] text-center transition-colors w-full flex items-center justify-center h-[26px] break-words ${
            isBottomSheetOpen ? "text-amber-400 font-semibold" : "text-white font-normal"
          }`}>{t("nav.more")}</span>
        </button>
      </div>

      {/* MOBILE BOTTOM SHEET MENU */}
      {isBottomSheetOpen && (
        <div className="lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 z-[110] animate-in fade-in duration-200 touch-none"
            onClick={() => setIsBottomSheetOpen(false)}
          />

          <div className="fixed inset-x-0 bottom-0 z-[120] bg-[#120e36] border-t border-white/10 rounded-t-3xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300 ease-out max-h-[85vh] overflow-y-auto overscroll-contain">
            <div className="w-12 h-1.5 bg-white/30 rounded-none mx-auto mb-5" />

            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <h3 className="text-base font-bold text-white tracking-wide">
                {t("nav.more")}
              </h3>

              <button
                type="button"
                onClick={() => setIsBottomSheetOpen(false)}
                className="text-white/70 hover:text-white p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col space-y-1 py-2">
              <a
                href="#life-at-sibermu"
                onClick={(e) => handleAnchorClick(e, "#life-at-sibermu")}
                className="py-3.5 px-3 text-sm font-medium text-slate-200 hover:text-white hover:bg-white/5 border-b border-white/10 flex items-center justify-between transition-colors"
              >
                <span>{t("megaMenu.kemahasiswaan.item1")}</span>
                <span className="text-[#FF9E44]">→</span>
              </a>
              <a
                href="#prestasi"
                onClick={(e) => handleAnchorClick(e, "#prestasi")}
                className="py-3.5 px-3 text-sm font-medium text-slate-200 hover:text-white hover:bg-white/5 border-b border-white/10 flex items-center justify-between transition-colors"
              >
                <span>{t("megaMenu.kemahasiswaan.item2")}</span>
                <span className="text-[#FF9E44]">→</span>
              </a>
              <a
                href="#layanan-mahasiswa"
                onClick={(e) => handleAnchorClick(e, "#layanan-mahasiswa")}
                className="py-3.5 px-3 text-sm font-medium text-slate-200 hover:text-white hover:bg-white/5 border-b border-white/10 flex items-center justify-between transition-colors"
              >
                <span>{t("megaMenu.kemahasiswaan.item3")}</span>
                <span className="text-[#FF9E44]">→</span>
              </a>
              <a
                href="#aik"
                onClick={(e) => handleAnchorClick(e, "#aik")}
                className="py-3.5 px-3 text-sm font-medium text-slate-200 hover:text-white hover:bg-white/5 border-b border-white/10 flex items-center justify-between transition-colors"
              >
                <span>{t("megaMenu.aik.item1")}</span>
                <span className="text-[#FF9E44]">→</span>
              </a>
              <a
                href="#masjid-amal-mulya"
                onClick={(e) => handleAnchorClick(e, "#masjid-amal-mulya")}
                className="py-3.5 px-3 text-sm font-medium text-slate-200 hover:text-white hover:bg-white/5 flex items-center justify-between transition-colors"
              >
                <span>{t("megaMenu.aik.item2")}</span>
                <span className="text-[#FF9E44]">→</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
