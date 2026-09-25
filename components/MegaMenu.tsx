"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { smoothScrollToTarget } from "@/utils/smoothScroll";

interface MegaMenuProps {
  activeMenu: "kemahasiswaan" | "aik" | null;
  onClose: () => void;
}

export default function MegaMenu({ activeMenu, onClose }: MegaMenuProps) {
  const { t } = useLanguage();

  if (!activeMenu) return null;

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    isExternal?: boolean
  ) => {
    if (isExternal) return;
    if (href.startsWith("#") || href.startsWith("/#")) {
      e.preventDefault();
      const targetId = href.replace(/^\/?#/, "");
      smoothScrollToTarget(targetId, 750);
      onClose();
    }
  };

  let menuData = {
    title: "",
    items: [] as { label: string; href: string }[],
    ctaLabel: "",
    ctaLink: "",
  };

  if (activeMenu === "kemahasiswaan") {
    menuData = {
      title: t("nav.kemahasiswaan"),
      items: [
        { label: t("megaMenu.kemahasiswaan.item1"), href: "#life-at-sibermu" },
        { label: t("megaMenu.kemahasiswaan.item2"), href: "#prestasi" },
        { label: t("megaMenu.kemahasiswaan.item3"), href: "#layanan-mahasiswa" },
      ],
      ctaLabel: t("megaMenu.kemahasiswaan.promoCta"),
      ctaLink: "#life-at-sibermu",
    };
  } else if (activeMenu === "aik") {
    menuData = {
      title: t("nav.aik"),
      items: [
        { label: t("megaMenu.aik.item1"), href: "#aik" },
        { label: t("megaMenu.aik.item2"), href: "#masjid-amal-mulya" },
      ],
      ctaLabel: t("megaMenu.aik.promoCta"),
      ctaLink: "#aik",
    };
  }

  const gridColsClass =
    menuData.items.length === 2 ? "grid-cols-1 sm:grid-cols-2 max-w-3xl" : "grid-cols-1 sm:grid-cols-3";

  return (
    <div
      className="absolute left-0 right-0 top-full w-full z-[110] bg-[#1A2A5B] border-b border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200"
      onMouseLeave={onClose}
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-8 lg:py-10">
        <div className={`grid ${gridColsClass} gap-6 sm:gap-8`}>
          {menuData.items.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              onClick={(e) => handleAnchorClick(e, item.href)}
              className="group p-5 bg-white/5 border border-white/10 hover:border-[#FF9E44] hover:bg-white/10 transition-all duration-200 flex items-center justify-between cursor-pointer"
            >
              <span className="font-bold text-base sm:text-lg text-white group-hover:text-[#FF9E44] transition-colors leading-snug">
                {item.label}
              </span>
              <span className="text-[#FF9E44] text-lg transition-transform group-hover:translate-x-1 shrink-0 ml-3">
                →
              </span>
            </a>
          ))}
        </div>

        <div className="pt-6 mt-8 border-t border-white/10 flex items-center justify-between">
          <a
            href={menuData.ctaLink}
            onClick={(e) => handleAnchorClick(e, menuData.ctaLink)}
            className="inline-flex items-center space-x-3 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-none border border-white/30 flex items-center justify-center text-[#FF9E44] group-hover:border-[#FF9E44] group-hover:bg-[#FF9E44]/10 transition-all shrink-0">
              <svg
                className="w-4 h-4 text-[#FF9E44] group-hover:translate-x-0.5 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7-7 7M3 12h18" />
              </svg>
            </div>
            <span className="font-semibold text-sm text-white group-hover:text-[#FF9E44] transition-colors">
              {menuData.ctaLabel}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
