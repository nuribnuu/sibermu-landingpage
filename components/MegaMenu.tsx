"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

interface MegaMenuProps {
  activeMenu: "kemahasiswaan" | "layanan" | "aik" | null;
  onClose: () => void;
}

export default function MegaMenu({ activeMenu, onClose }: MegaMenuProps) {
  const { t } = useLanguage();

  if (!activeMenu) return null;

  let menuData = {
    mainCategories: [] as { label: string; isExternal: boolean }[],
    subItems: [] as string[],
    ctaLabel: "",
    ctaLink: "",
  };

  if (activeMenu === "kemahasiswaan") {
    menuData = {
      mainCategories: [
        { label: t("megaMenu.kemahasiswaan.category1Title"), isExternal: false },
        { label: t("megaMenu.kemahasiswaan.category2Title"), isExternal: false },
        { label: "Portal Mahasiswa SiberMu", isExternal: true },
      ],
      subItems: [
        t("megaMenu.kemahasiswaan.item1"),
        t("megaMenu.kemahasiswaan.item2"),
        t("megaMenu.kemahasiswaan.item3"),
        t("megaMenu.kemahasiswaan.item4"),
        t("megaMenu.kemahasiswaan.item5"),
        t("megaMenu.kemahasiswaan.item6"),
      ],
      ctaLabel: "Pelajari Lebih Lanjut Layanan Kemahasiswaan SiberMu",
      ctaLink: "/kemahasiswaan",
    };
  } else if (activeMenu === "layanan") {
    menuData = {
      mainCategories: [
        { label: t("megaMenu.layanan.category1Title"), isExternal: false },
        { label: t("megaMenu.layanan.category2Title"), isExternal: false },
        { label: "Sistem Informasi Akademik (SIAKAD)", isExternal: true },
      ],
      subItems: [
        t("megaMenu.layanan.item1"),
        t("megaMenu.layanan.item2"),
        t("megaMenu.layanan.item3"),
        t("megaMenu.layanan.item4"),
        t("megaMenu.layanan.item5"),
        t("megaMenu.layanan.item6"),
      ],
      ctaLabel: "Jelajahi Portal Layanan Terpadu Universitas Siber Muhammadiyah",
      ctaLink: "/layanan",
    };
  } else if (activeMenu === "aik") {
    menuData = {
      mainCategories: [
        { label: t("megaMenu.aik.category1Title"), isExternal: false },
        { label: t("megaMenu.aik.category2Title"), isExternal: false },
        { label: "Jurnal & Studi Al-Islam", isExternal: true },
      ],
      subItems: [
        t("megaMenu.aik.item1"),
        t("megaMenu.aik.item2"),
        t("megaMenu.aik.item3"),
        t("megaMenu.aik.item4"),
        t("megaMenu.aik.item5"),
        t("megaMenu.aik.item6"),
      ],
      ctaLabel: "Pelajari Lebih Lanjut Nilai-Nilai Al-Islam & Kemuhammadiyahan",
      ctaLink: "/aik",
    };
  }

  return (
    <div
      className="absolute left-0 right-0 top-full w-full z-50 bg-[#1A2A5B] border-b border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200"
      onMouseLeave={onClose}
    >
      {/* Container Inner Padding (Edge-to-Edge Panel with Clean Inner Layout) */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-10 lg:py-12">
        
        {/* 2-COLUMN LAYOUT (Kiri: ~25% Kategori Utama, Kanan: ~75% Sub-Items) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* KOLOM KIRI (Kategori Utama) */}
          <div className="lg:col-span-3 flex flex-col space-y-6 sm:space-y-7 border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-10">
            {menuData.mainCategories.map((cat, idx) => (
              <a
                key={idx}
                href="#"
                className="font-bold text-base sm:text-[17px] text-white inline-flex items-center justify-between group transition-all hover:underline hover:underline-offset-4 hover:decoration-2"
              >
                <span>{cat.label}</span>
                {cat.isExternal ? (
                  <span className="text-white/80 group-hover:text-white text-base ml-2 font-normal transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0">
                    ↗
                  </span>
                ) : (
                  <span className="text-white/80 group-hover:text-white text-lg ml-2 font-light transition-transform group-hover:translate-x-1 shrink-0">
                    ›
                  </span>
                )}
              </a>
            ))}
          </div>

          {/* KOLOM KANAN (Sub-Items Flat List) */}
          <div className="lg:col-span-9 flex flex-col justify-start">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {menuData.subItems.map((item, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="font-bold text-base text-white/90 hover:text-white hover:underline underline-offset-4 decoration-2 transition-all py-1"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* CTA SECTION (Bawah, Full-Width Row) */}
        <div className="pt-8 mt-10 border-t border-white/10 flex items-center justify-between">
          <a
            href={menuData.ctaLink}
            className="inline-flex items-center space-x-3.5 group"
          >
            {/* Circular Icon Button (Thin 1px White Border, Amber Arrow inside) */}
            <div className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-amber-400 group-hover:border-amber-400 group-hover:bg-amber-400/10 transition-all shrink-0">
              <svg
                className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7-7 7M3 12h18" />
              </svg>
            </div>

            {/* CTA Text Label */}
            <span className="font-semibold text-sm sm:text-[15px] text-white group-hover:text-amber-300 transition-colors">
              {menuData.ctaLabel}
            </span>
          </a>
        </div>

      </div>
    </div>
  );
}
