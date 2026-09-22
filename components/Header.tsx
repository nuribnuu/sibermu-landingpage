"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import LanguageDropdown from "@/components/LanguageDropdown";
import MegaMenu from "@/components/MegaMenu";

export default function Header() {
  const { t } = useLanguage();
  const [activeMegaMenu, setActiveMegaMenu] = useState<"kemahasiswaan" | "layanan" | "aik" | null>(null);
  const [headerTheme, setHeaderTheme] = useState<"dark" | "light">("light");
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeNavKey, setActiveNavKey] = useState<string>("home");

  // Mobile Bottom Sheet & Submenu state
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);

  const navItems = [
    { key: "home", label: t("nav.home"), href: "#hero", hasMega: false },
    { key: "kemahasiswaan", label: t("nav.kemahasiswaan"), href: "#life-at-sibermu", hasMega: true, megaKey: "kemahasiswaan" as const },
    { key: "prestasi", label: t("nav.prestasi"), href: "#prestasi", hasMega: false },
    { key: "layanan", label: t("nav.layanan"), href: "#layanan-mahasiswa", hasMega: true, megaKey: "layanan" as const },
    { key: "aik", label: t("nav.aik"), href: "#aik", hasMega: true, megaKey: "aik" as const },
    { key: "masjid", label: t("nav.masjid"), href: "#masjid-amal-mulya", hasMega: false },
  ];

  const handleMouseEnter = (item: (typeof navItems)[0]) => {
    if (item.hasMega && item.megaKey) {
      setActiveMegaMenu(item.megaKey);
    } else {
      setActiveMegaMenu(null);
    }
  };

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#") || href.startsWith("/#")) {
      e.preventDefault();
      const targetId = href.replace(/^\/?#/, "");
      if (targetId === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
      setIsBottomSheetOpen(false);
    }
  };

  // Scroll-Spy & Active Section Theme Detector
  useEffect(() => {
    const sectionIds = [
      "hero",
      "dua-dunia",
      "life-at-sibermu",
      "prestasi",
      "layanan-mahasiswa",
      "aik",
      "masjid-amal-mulya",
      "closing-cta",
    ];

    const sectionNavMap: Record<string, string> = {
      hero: "home",
      "dua-dunia": "home",
      "life-at-sibermu": "kemahasiswaan",
      prestasi: "prestasi",
      "layanan-mahasiswa": "layanan",
      aik: "aik",
      "masjid-amal-mulya": "masjid",
      "closing-cta": "home",
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

    // Scroll Spy Observer
    const spyObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;

        const topEntry = visible.reduce((prev, curr) =>
          curr.intersectionRatio > prev.intersectionRatio ? curr : prev
        );

        const id = topEntry.target.id;
        if (id && sectionNavMap[id]) {
          setActiveNavKey(sectionNavMap[id]);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) spyObserver.observe(el);
    });

    return () => {
      themeObserver.disconnect();
      spyObserver.disconnect();
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
        className={`fixed top-0 left-0 right-0 z-[100] w-full h-14 sm:h-16 lg:h-[76px] px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ease-in-out ${headerStyleClass}`}
      >
        {/* LOGO SIBERMU */}
        <a
          href="#hero"
          onClick={(e) => handleAnchorClick(e, "#hero")}
          className="flex items-center group focus:outline-none shrink-0 cursor-pointer"
        >
          <Image
            src="/logo.png"
            alt="SiberMu Logo"
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
        <div className="hidden lg:flex items-center space-x-5 shrink-0">
          <LanguageDropdown theme={headerTheme} />
          <a
            href="#closing-cta"
            onClick={(e) => handleAnchorClick(e, "#closing-cta")}
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
        <div className="flex lg:hidden items-center">
          <LanguageDropdown theme={headerTheme} />
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
          className="flex flex-col items-center justify-center space-y-1 w-14 transition-colors cursor-pointer relative group"
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
          <span className={`text-[11px] tracking-tight transition-colors ${
            activeNavKey === "home" ? "text-amber-400 font-semibold" : "text-white font-normal"
          }`}>{t("nav.home")}</span>
        </a>

        {/* 2. Prestasi */}
        <a
          href="#prestasi"
          onClick={(e) => handleAnchorClick(e, "#prestasi")}
          className="flex flex-col items-center justify-center space-y-1 w-14 transition-colors cursor-pointer relative group"
        >
          <div className={`absolute -top-6 w-11 h-11 rounded-none flex items-center justify-center border-[3.5px] border-[#120e36] shadow-[0_4px_14px_rgba(255,158,68,0.45)] transition-all duration-200 group-hover:scale-105 group-active:scale-95 ${
            activeNavKey === "prestasi"
              ? "bg-[#FF9E44] text-[#120e36] scale-105 ring-2 ring-[#FF9E44]/50"
              : "bg-[#FF9E44] text-[#120e36]"
          }`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 15a7 7 0 007-7V4H5v4a7 7 0 007 7zm0 0v4m-4 2h8M5 4H3a2 2 0 00-2 2v1a4 4 0 004 4m14-7h2a2 2 0 012 2v1a4 4 0 01-4 4" />
            </svg>
          </div>
          <svg className="w-5 h-5 opacity-0" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M0 0h24v24H0z" />
          </svg>
          <span className={`text-[11px] tracking-tight transition-colors ${
            activeNavKey === "prestasi" ? "text-amber-400 font-semibold" : "text-white font-normal"
          }`}>{t("nav.prestasi")}</span>
        </a>

        {/* 3. Daftar */}
        <a
          href="#closing-cta"
          onClick={(e) => handleAnchorClick(e, "#closing-cta")}
          className="flex flex-col items-center justify-center space-y-1 w-14 transition-colors cursor-pointer relative group"
        >
          {/* Floating Gold Circle Icon elevated higher (-top-6) above navbar border */}
          <div className="absolute -top-6 w-11 h-11 bg-[#FF9E44] text-[#120e36] rounded-none flex items-center justify-center border-[3.5px] border-[#120e36] shadow-[0_4px_14px_rgba(255,158,68,0.45)] transition-transform duration-200 group-hover:scale-105 group-active:scale-95">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <svg className="w-5 h-5 opacity-0" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M0 0h24v24H0z" />
          </svg>
          <span className="text-[11px] tracking-tight text-white font-normal transition-colors group-hover:text-amber-400">{t("nav.register")}</span>
        </a>

        {/* 4. AIK / Masjid */}
        <a
          href="#aik"
          onClick={(e) => handleAnchorClick(e, "#aik")}
          className="flex flex-col items-center justify-center space-y-1 w-14 transition-colors cursor-pointer relative group"
        >
          <div className={`absolute -top-6 w-11 h-11 rounded-none flex items-center justify-center border-[3.5px] border-[#120e36] shadow-[0_4px_14px_rgba(255,158,68,0.45)] transition-all duration-200 group-hover:scale-105 group-active:scale-95 ${
            activeNavKey === "aik" || activeNavKey === "masjid"
              ? "bg-[#FF9E44] text-[#120e36] scale-105 ring-2 ring-[#FF9E44]/50"
              : "bg-[#FF9E44] text-[#120e36]"
          }`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <svg className="w-5 h-5 opacity-0" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M0 0h24v24H0z" />
          </svg>
          <span className={`text-[11px] tracking-tight transition-colors ${
            activeNavKey === "aik" || activeNavKey === "masjid" ? "text-amber-400 font-semibold" : "text-white font-normal"
          }`}>AIK</span>
        </a>

        {/* 5. More */}
        <button
          type="button"
          onClick={() => setIsBottomSheetOpen(true)}
          className="flex flex-col items-center justify-center space-y-1 w-14 transition-colors relative group cursor-pointer"
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
          <span className={`text-[11px] tracking-tight transition-colors ${
            isBottomSheetOpen ? "text-amber-400 font-semibold" : "text-white font-normal"
          }`}>More</span>
        </button>
      </div>

      {/* MOBILE BOTTOM SHEET MENU */}
      {isBottomSheetOpen && (
        <div className="lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 z-[110] animate-in fade-in duration-200"
            onClick={() => {
              setIsBottomSheetOpen(false);
              setExpandedMobileMenu(null);
            }}
          />

          <div className="fixed inset-x-0 bottom-0 z-[120] bg-[#120e36] border-t border-white/10 rounded-t-3xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300 ease-out max-h-[85vh] overflow-y-auto">
            <div className="w-12 h-1.5 bg-white/30 rounded-none mx-auto mb-5" />

            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <button
                type="button"
                onClick={() => {
                  if (expandedMobileMenu) {
                    setExpandedMobileMenu(null);
                  } else {
                    setIsBottomSheetOpen(false);
                  }
                }}
                className="text-white/70 hover:text-white p-1"
              >
                {expandedMobileMenu ? (
                  <span className="text-sm font-semibold flex items-center gap-1">
                    ← Kembali
                  </span>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>

              <h3 className="text-base font-bold text-white tracking-wide">
                {expandedMobileMenu
                  ? navItems.find((n) => n.key === expandedMobileMenu)?.label
                  : "Menu Utama"}
              </h3>

              <div className="w-8" />
            </div>

            <div className="flex flex-col">
              {!expandedMobileMenu ? (
                <>
                  <button
                    type="button"
                    onClick={() => setExpandedMobileMenu("kemahasiswaan")}
                    className="py-4 text-base font-medium text-white border-b border-white/10 flex items-center justify-between hover:bg-white/5 px-2 rounded-lg transition-colors"
                  >
                    <span>{t("nav.kemahasiswaan")}</span>
                    <span className="text-white/60 text-lg">›</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setExpandedMobileMenu("layanan")}
                    className="py-4 text-base font-medium text-white border-b border-white/10 flex items-center justify-between hover:bg-white/5 px-2 rounded-lg transition-colors"
                  >
                    <span>{t("nav.layanan")}</span>
                    <span className="text-white/60 text-lg">›</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setExpandedMobileMenu("aik")}
                    className="py-4 text-base font-medium text-white flex items-center justify-between hover:bg-white/5 px-2 rounded-lg transition-colors"
                  >
                    <span>{t("nav.aik")}</span>
                    <span className="text-white/60 text-lg">›</span>
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 py-2">
                  {expandedMobileMenu === "kemahasiswaan" && (
                    <>
                      <a href="#life-at-sibermu" onClick={(e) => handleAnchorClick(e, "#life-at-sibermu")} className="py-3 text-sm font-medium text-slate-200 hover:text-white border-b border-white/10">
                        {t("megaMenu.kemahasiswaan.item1")}
                      </a>
                      <a href="#life-at-sibermu" onClick={(e) => handleAnchorClick(e, "#life-at-sibermu")} className="py-3 text-sm font-medium text-slate-200 hover:text-white border-b border-white/10">
                        {t("megaMenu.kemahasiswaan.item2")}
                      </a>
                      <a href="#prestasi" onClick={(e) => handleAnchorClick(e, "#prestasi")} className="py-3 text-sm font-medium text-slate-200 hover:text-white border-b border-white/10">
                        {t("megaMenu.kemahasiswaan.item3")}
                      </a>
                      <a href="#layanan-mahasiswa" onClick={(e) => handleAnchorClick(e, "#layanan-mahasiswa")} className="py-3 text-sm font-medium text-slate-200 hover:text-white">
                        {t("megaMenu.kemahasiswaan.item4")}
                      </a>
                    </>
                  )}

                  {expandedMobileMenu === "layanan" && (
                    <>
                      <a href="#layanan-mahasiswa" onClick={(e) => handleAnchorClick(e, "#layanan-mahasiswa")} className="py-3 text-sm font-medium text-slate-200 hover:text-white border-b border-white/10">
                        {t("megaMenu.layanan.item1")}
                      </a>
                      <a href="#layanan-mahasiswa" onClick={(e) => handleAnchorClick(e, "#layanan-mahasiswa")} className="py-3 text-sm font-medium text-slate-200 hover:text-white border-b border-white/10">
                        {t("megaMenu.layanan.item2")}
                      </a>
                      <a href="#layanan-mahasiswa" onClick={(e) => handleAnchorClick(e, "#layanan-mahasiswa")} className="py-3 text-sm font-medium text-slate-200 hover:text-white border-b border-white/10">
                        {t("megaMenu.layanan.item3")}
                      </a>
                      <a href="#layanan-mahasiswa" onClick={(e) => handleAnchorClick(e, "#layanan-mahasiswa")} className="py-3 text-sm font-medium text-slate-200 hover:text-white">
                        {t("megaMenu.layanan.item4")}
                      </a>
                    </>
                  )}

                  {expandedMobileMenu === "aik" && (
                    <>
                      <a href="#aik" onClick={(e) => handleAnchorClick(e, "#aik")} className="py-3 text-sm font-medium text-slate-200 hover:text-white border-b border-white/10">
                        {t("megaMenu.aik.item1")}
                      </a>
                      <a href="#aik" onClick={(e) => handleAnchorClick(e, "#aik")} className="py-3 text-sm font-medium text-slate-200 hover:text-white border-b border-white/10">
                        {t("megaMenu.aik.item2")}
                      </a>
                      <a href="#aik" onClick={(e) => handleAnchorClick(e, "#aik")} className="py-3 text-sm font-medium text-slate-200 hover:text-white border-b border-white/10">
                        {t("megaMenu.aik.item3")}
                      </a>
                      <a href="#masjid-amal-mulya" onClick={(e) => handleAnchorClick(e, "#masjid-amal-mulya")} className="py-3 text-sm font-medium text-slate-200 hover:text-white">
                        {t("megaMenu.aik.item4")}
                      </a>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
