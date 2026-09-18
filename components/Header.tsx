"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import LanguageDropdown from "@/components/LanguageDropdown";
import MegaMenu from "@/components/MegaMenu";

export default function Header() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [activeMegaMenu, setActiveMegaMenu] = useState<"kemahasiswaan" | "layanan" | "aik" | null>(null);
  const [headerTheme, setHeaderTheme] = useState<"dark" | "light">("light");
  const [isScrolled, setIsScrolled] = useState(false);

  // Mobile Bottom Sheet & Submenu state
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);

  const navItems = [
    { key: "home", label: t("nav.home"), href: "/", hasMega: false },
    { key: "kemahasiswaan", label: t("nav.kemahasiswaan"), href: "/kemahasiswaan", hasMega: true, megaKey: "kemahasiswaan" as const },
    { key: "prestasi", label: t("nav.prestasi"), href: "/prestasi", hasMega: false },
    { key: "layanan", label: t("nav.layanan"), href: "/layanan", hasMega: true, megaKey: "layanan" as const },
    { key: "aik", label: t("nav.aik"), href: "/aik", hasMega: true, megaKey: "aik" as const },
    { key: "kegiatan", label: t("nav.kegiatan"), href: "/kegiatan", hasMega: false },
  ];

  const handleMouseEnter = (item: (typeof navItems)[0]) => {
    if (item.hasMega && item.megaKey) {
      setActiveMegaMenu(item.megaKey);
    } else {
      setActiveMegaMenu(null);
    }
  };

  // Detect active section theme with IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll("[data-theme]");
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
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

    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  // Detect scroll position (State 1: scrollY <= 25, State 2: scrollY > 25)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLight = headerTheme === "light";
  const isHomeActive = pathname === "/";
  const isPrestasiActive = pathname.startsWith("/prestasi");
  const isDaftarActive = pathname.startsWith("/daftar");
  const isKegiatanActive = pathname.startsWith("/kegiatan");

  // Header 2-State Background styling
  const headerStyleClass = !isScrolled
    ? "bg-transparent backdrop-blur-none border-b border-transparent shadow-none"
    : isLight
      ? "bg-white/75 backdrop-blur-md border-b border-[#1A2A5B]/10 shadow-sm"
      : "bg-[#120e36]/75 backdrop-blur-md border-b border-white/10 shadow-sm";

  return (
    <>
      {/* TOP HEADER (Minimal on Mobile: Logo Left + Language Right) */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full h-14 sm:h-16 lg:h-[76px] px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ease-in-out ${headerStyleClass}`}
      >
        {/* LOGO SIBERMU (Kiri) */}
        <Link href="/" className="flex items-center group focus:outline-none shrink-0">
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
        </Link>

        {/* DESKTOP NAVIGATION LINKS (Hidden on Mobile) */}
        <nav className="hidden lg:flex items-center space-x-7 xl:space-x-9">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            const isMegaOpen = activeMegaMenu === item.megaKey;

            const textColorClass = isLight
              ? isActive || isMegaOpen
                ? "text-[#1A2A5B] font-semibold underline underline-offset-4 decoration-2 decoration-[#1A2A5B]"
                : "text-[#1A2A5B]/90 hover:text-[#1A2A5B] hover:underline hover:underline-offset-4 hover:decoration-2"
              : isActive || isMegaOpen
                ? "text-white font-semibold underline underline-offset-4 decoration-2 decoration-white"
                : "text-white/90 hover:text-white hover:underline hover:underline-offset-4 hover:decoration-2";

            return (
              <div
                key={item.key}
                className="relative py-2"
                onMouseEnter={() => handleMouseEnter(item)}
              >
                <Link
                  href={item.href}
                  className={`text-[14px] sm:text-[15px] font-medium transition-colors duration-300 ease-in-out flex items-center space-x-1.5 ${textColorClass}`}
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
                </Link>
              </div>
            );
          })}
        </nav>

        {/* DESKTOP ACTIONS (Hidden on Mobile) */}
        <div className="hidden lg:flex items-center space-x-5 shrink-0">
          <LanguageDropdown theme={headerTheme} />
          <Link
            href="/daftar"
            className={`font-medium text-sm transition-colors duration-300 whitespace-nowrap ${
              isLight
                ? "text-[#1A2A5B] hover:text-[#1A2A5B] hover:underline hover:underline-offset-4 hover:decoration-2"
                : "text-white hover:text-white hover:underline hover:underline-offset-4 hover:decoration-2"
            }`}
          >
            {t("nav.register")}
          </Link>
        </div>

        {/* MOBILE TOP ACTIONS (Language Dropdown Only) */}
        <div className="flex lg:hidden items-center">
          <LanguageDropdown theme={headerTheme} />
        </div>

        {/* Mega Menu Overlay (Desktop) */}
        <MegaMenu activeMenu={activeMegaMenu} onClose={() => setActiveMegaMenu(null)} />
      </header>

      {/* MOBILE BOTTOM TAB BAR (Fixed, visible ONLY on mobile breakpoint < 768px) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 w-full bg-[#120e36] border-t border-white/10 shadow-2xl h-16 lg:hidden flex items-center justify-around px-2">
        {/* 1. Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center space-y-1 w-14 transition-colors ${
            isHomeActive ? "text-amber-400 font-semibold" : "text-white"
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-[11px] tracking-tight">{t("nav.home")}</span>
        </Link>

        {/* 2. Prestasi */}
        <Link
          href="/prestasi"
          className={`flex flex-col items-center justify-center space-y-1 w-14 transition-colors ${
            isPrestasiActive ? "text-amber-400 font-semibold" : "text-white"
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15a7 7 0 007-7V4H5v4a7 7 0 007 7zm0 0v4m-4 2h8M5 4H3a2 2 0 00-2 2v1a4 4 0 004 4m14-7h2a2 2 0 012 2v1a4 4 0 01-4 4" />
          </svg>
          <span className="text-[11px] tracking-tight">{t("nav.prestasi")}</span>
        </Link>

        {/* 3. Daftar */}
        <Link
          href="/daftar"
          className={`flex flex-col items-center justify-center space-y-1 w-14 transition-colors ${
            isDaftarActive ? "text-amber-400 font-semibold" : "text-white"
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-[11px] tracking-tight">{t("nav.register")}</span>
        </Link>

        {/* 4. Kegiatan */}
        <Link
          href="/kegiatan"
          className={`flex flex-col items-center justify-center space-y-1 w-14 transition-colors ${
            isKegiatanActive ? "text-amber-400 font-semibold" : "text-white"
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-[11px] tracking-tight">{t("nav.kegiatan")}</span>
        </Link>

        {/* 5. More (Opens Bottom Sheet) */}
        <button
          type="button"
          onClick={() => setIsBottomSheetOpen(true)}
          className={`flex flex-col items-center justify-center space-y-1 w-14 transition-colors ${
            isBottomSheetOpen ? "text-amber-400 font-semibold" : "text-white"
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span className="text-[11px] tracking-tight">More</span>
        </button>
      </div>

      {/* MOBILE BOTTOM SHEET "MORE" MENU */}
      {isBottomSheetOpen && (
        <div className="lg:hidden">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/60 z-[60] animate-in fade-in duration-200"
            onClick={() => {
              setIsBottomSheetOpen(false);
              setExpandedMobileMenu(null);
            }}
          />

          {/* Bottom Sheet Panel */}
          <div className="fixed inset-x-0 bottom-0 z-[70] bg-[#120e36] border-t border-white/10 rounded-t-3xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300 ease-out max-h-[85vh] overflow-y-auto">
            {/* Drag Handle Bar */}
            <div className="w-12 h-1.5 bg-white/30 rounded-full mx-auto mb-5" />

            {/* Bottom Sheet Header */}
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

            {/* Bottom Sheet Menu Items */}
            <div className="flex flex-col">
              {!expandedMobileMenu ? (
                <>
                  {/* List Navigation items that have mega-menu submenus */}
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
                /* Submenu Detail Items */
                <div className="flex flex-col space-y-2 py-2">
                  {expandedMobileMenu === "kemahasiswaan" && (
                    <>
                      <Link href="/kemahasiswaan" onClick={() => setIsBottomSheetOpen(false)} className="py-3 text-sm font-medium text-slate-200 hover:text-white border-b border-white/10">
                        {t("megaMenu.kemahasiswaan.item1")}
                      </Link>
                      <Link href="/kemahasiswaan" onClick={() => setIsBottomSheetOpen(false)} className="py-3 text-sm font-medium text-slate-200 hover:text-white border-b border-white/10">
                        {t("megaMenu.kemahasiswaan.item2")}
                      </Link>
                      <Link href="/kemahasiswaan" onClick={() => setIsBottomSheetOpen(false)} className="py-3 text-sm font-medium text-slate-200 hover:text-white border-b border-white/10">
                        {t("megaMenu.kemahasiswaan.item3")}
                      </Link>
                      <Link href="/kemahasiswaan" onClick={() => setIsBottomSheetOpen(false)} className="py-3 text-sm font-medium text-slate-200 hover:text-white">
                        {t("megaMenu.kemahasiswaan.item4")}
                      </Link>
                    </>
                  )}

                  {expandedMobileMenu === "layanan" && (
                    <>
                      <Link href="/layanan" onClick={() => setIsBottomSheetOpen(false)} className="py-3 text-sm font-medium text-slate-200 hover:text-white border-b border-white/10">
                        {t("megaMenu.layanan.item1")}
                      </Link>
                      <Link href="/layanan" onClick={() => setIsBottomSheetOpen(false)} className="py-3 text-sm font-medium text-slate-200 hover:text-white border-b border-white/10">
                        {t("megaMenu.layanan.item2")}
                      </Link>
                      <Link href="/layanan" onClick={() => setIsBottomSheetOpen(false)} className="py-3 text-sm font-medium text-slate-200 hover:text-white border-b border-white/10">
                        {t("megaMenu.layanan.item3")}
                      </Link>
                      <Link href="/layanan" onClick={() => setIsBottomSheetOpen(false)} className="py-3 text-sm font-medium text-slate-200 hover:text-white">
                        {t("megaMenu.layanan.item4")}
                      </Link>
                    </>
                  )}

                  {expandedMobileMenu === "aik" && (
                    <>
                      <Link href="/aik" onClick={() => setIsBottomSheetOpen(false)} className="py-3 text-sm font-medium text-slate-200 hover:text-white border-b border-white/10">
                        {t("megaMenu.aik.item1")}
                      </Link>
                      <Link href="/aik" onClick={() => setIsBottomSheetOpen(false)} className="py-3 text-sm font-medium text-slate-200 hover:text-white border-b border-white/10">
                        {t("megaMenu.aik.item2")}
                      </Link>
                      <Link href="/aik" onClick={() => setIsBottomSheetOpen(false)} className="py-3 text-sm font-medium text-slate-200 hover:text-white border-b border-white/10">
                        {t("megaMenu.aik.item3")}
                      </Link>
                      <Link href="/aik" onClick={() => setIsBottomSheetOpen(false)} className="py-3 text-sm font-medium text-slate-200 hover:text-white">
                        {t("megaMenu.aik.item4")}
                      </Link>
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
