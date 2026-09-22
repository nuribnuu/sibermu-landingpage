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

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isExternal?: boolean) => {
    if (isExternal) return;
    if (href.startsWith("#") || href.startsWith("/#")) {
      e.preventDefault();
      const targetId = href.replace(/^\/?#/, "");
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
      onClose();
    }
  };

  let menuData = {
    mainCategories: [] as { label: string; isExternal: boolean; href: string }[],
    subItems: [] as { label: string; href: string }[],
    ctaLabel: "",
    ctaLink: "",
  };

  if (activeMenu === "kemahasiswaan") {
    menuData = {
      mainCategories: [
        { label: t("megaMenu.kemahasiswaan.category1Title"), isExternal: false, href: "#life-at-sibermu" },
        { label: t("megaMenu.kemahasiswaan.category2Title"), isExternal: false, href: "#layanan-mahasiswa" },
        { label: "Portal Mahasiswa SiberMu", isExternal: true, href: "https://sibermu.ac.id" },
      ],
      subItems: [
        { label: t("megaMenu.kemahasiswaan.item1"), href: "#life-at-sibermu" },
        { label: t("megaMenu.kemahasiswaan.item2"), href: "#life-at-sibermu" },
        { label: t("megaMenu.kemahasiswaan.item3"), href: "#prestasi" },
        { label: t("megaMenu.kemahasiswaan.item4"), href: "#life-at-sibermu" },
        { label: t("megaMenu.kemahasiswaan.item5"), href: "#layanan-mahasiswa" },
        { label: t("megaMenu.kemahasiswaan.item6"), href: "#layanan-mahasiswa" },
      ],
      ctaLabel: t("megaMenu.kemahasiswaan.promoCta"),
      ctaLink: "#life-at-sibermu",
    };
  } else if (activeMenu === "layanan") {
    menuData = {
      mainCategories: [
        { label: t("megaMenu.layanan.category1Title"), isExternal: false, href: "#layanan-mahasiswa" },
        { label: t("megaMenu.layanan.category2Title"), isExternal: false, href: "#layanan-mahasiswa" },
        { label: "SIAKAD SiberMu", isExternal: true, href: "https://sibermu.ac.id" },
      ],
      subItems: [
        { label: t("megaMenu.layanan.item1"), href: "#layanan-mahasiswa" },
        { label: t("megaMenu.layanan.item2"), href: "#layanan-mahasiswa" },
        { label: t("megaMenu.layanan.item3"), href: "#layanan-mahasiswa" },
        { label: t("megaMenu.layanan.item4"), href: "#layanan-mahasiswa" },
        { label: t("megaMenu.layanan.item5"), href: "#layanan-mahasiswa" },
        { label: t("megaMenu.layanan.item6"), href: "#layanan-mahasiswa" },
      ],
      ctaLabel: t("megaMenu.layanan.promoCta"),
      ctaLink: "#layanan-mahasiswa",
    };
  } else if (activeMenu === "aik") {
    menuData = {
      mainCategories: [
        { label: t("megaMenu.aik.category1Title"), isExternal: false, href: "#aik" },
        { label: t("megaMenu.aik.category2Title"), isExternal: false, href: "#masjid-amal-mulya" },
        { label: "Jurnal & Studi Al-Islam", isExternal: true, href: "https://sibermu.ac.id" },
      ],
      subItems: [
        { label: t("megaMenu.aik.item1"), href: "#aik" },
        { label: t("megaMenu.aik.item2"), href: "#aik" },
        { label: t("megaMenu.aik.item3"), href: "#aik" },
        { label: t("megaMenu.aik.item4"), href: "#masjid-amal-mulya" },
        { label: t("megaMenu.aik.item5"), href: "#masjid-amal-mulya" },
        { label: t("megaMenu.aik.item6"), href: "#masjid-amal-mulya" },
      ],
      ctaLabel: t("megaMenu.aik.promoCta"),
      ctaLink: "#aik",
    };
  }

  return (
    <div
      className="absolute left-0 right-0 top-full w-full z-[110] bg-[#1A2A5B] border-b border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200"
      onMouseLeave={onClose}
    >
      {/* Container Inner Padding */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-10 lg:py-12">
        
        {/* 2-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* KOLOM KIRI (Kategori Utama) */}
          <div className="lg:col-span-3 flex flex-col space-y-6 sm:space-y-7 border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-10">
            {menuData.mainCategories.map((cat, idx) => (
              <a
                key={idx}
                href={cat.href}
                target={cat.isExternal ? "_blank" : undefined}
                rel={cat.isExternal ? "noopener noreferrer" : undefined}
                onClick={(e) => handleAnchorClick(e, cat.href, cat.isExternal)}
                className="font-bold text-base sm:text-[17px] text-white inline-flex items-center justify-between group transition-all hover:underline hover:underline-offset-4 hover:decoration-2 cursor-pointer"
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

          {/* KOLOM KANAN (Sub-Items Quick Links) */}
          <div className="lg:col-span-9 flex flex-col justify-start">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {menuData.subItems.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  onClick={(e) => handleAnchorClick(e, item.href)}
                  className="font-bold text-base text-white/90 hover:text-white hover:underline underline-offset-4 decoration-2 transition-all py-1 cursor-pointer"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* CTA SECTION */}
        <div className="pt-8 mt-10 border-t border-white/10 flex items-center justify-between">
          <a
            href={menuData.ctaLink}
            onClick={(e) => handleAnchorClick(e, menuData.ctaLink)}
            className="inline-flex items-center space-x-3.5 group cursor-pointer"
          >
            {/* Circular Icon Button */}
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
