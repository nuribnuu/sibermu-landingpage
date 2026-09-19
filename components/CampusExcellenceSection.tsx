"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

// SECTION 3 "DUA RUANG. SATU PERJALANAN." BILINGUAL DATA STRUCTURE
export const section3DuaDuniaData = {
  id: {
    headline: {
      line1: "Dua Ruang.",
      line2: "Satu Perjalanan.",
    },
    card1: {
      title: "KEMAHASISWAAN",
      description:
        "Tempat mahasiswa mengembangkan potensi, membangun jejaring, berorganisasi, berprestasi, dan mempersiapkan diri menghadapi dunia profesional.",
      buttonText: "Jelajahi Kemahasiswaan",
      altImage: "Kegiatan Kemahasiswaan & Organisasi SiberMu",
    },
    card2: {
      title: "AL-ISLAM & KEMUHAMMADIYAHAN",
      description:
        "Nilai yang menjadi landasan dalam membentuk mahasiswa yang berilmu, berakhlak, dan berkemajuan.",
      buttonText: "Kenali AIK",
      altImage: "Pembinaan Al-Islam & Kemuhammadiyahan SiberMu",
    },
  },
  en: {
    headline: {
      line1: "Two Spaces.",
      line2: "One Journey.",
    },
    card1: {
      title: "STUDENT AFFAIRS",
      description:
        "A space for students to develop their potential, build networks, organize, achieve, and prepare for the professional world.",
      buttonText: "Explore Student Affairs",
      altImage: "SiberMu Student Affairs & Organizations",
    },
    card2: {
      title: "AL-ISLAM & KEMUHAMMADIYAHAN",
      description:
        "The values that form the foundation for shaping students who are knowledgeable, principled, and progressive.",
      buttonText: "Discover AIK",
      altImage: "SiberMu Al-Islam & Kemuhammadiyahan Studies",
    },
  },
};

export default function CampusExcellenceSection() {
  const { locale } = useLanguage();
  const content = section3DuaDuniaData[locale] || section3DuaDuniaData.id;

  return (
    <section
      id="dua-dunia"
      data-theme="dark"
      className="relative lg:sticky lg:top-0 min-h-screen lg:h-screen lg:h-[100dvh] bg-[#0b091f] text-white z-30 flex flex-col justify-center overflow-visible lg:overflow-hidden py-16 sm:py-20 lg:py-0 border-t border-white/5 scroll-mt-14 sm:scroll-mt-16 lg:scroll-mt-0"
    >
      {/* Subtle Dot Grid Background Pattern with Top-Bottom Fade Mask */}
      <div className="dot-grid-pattern-dark" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        
        {/* HEADLINE BLOCK */}
        {/* Center-aligned headline with Gold Stabilo Highlight */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="font-bold text-4xl sm:text-5xl lg:text-[52px] xl:text-[58px] text-white leading-[1.25] sm:leading-[1.2] lg:leading-[1.18] tracking-tight">
            <span className="headline-marker headline-marker-1">
              {content.headline.line1}
            </span>{" "}
            <span className="headline-marker headline-marker-2">
              {content.headline.line2}
            </span>
          </h2>
        </div>

        {/* 2 CARDS GRID (DUA RUANG. SATU PERJALANAN.) */}
        {/* Desktop: 2 columns | Mobile/Tablet (< 1024px): 1 column stack */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch max-w-5xl mx-auto">
          
          {/* CARD 01: KEMAHASISWAAN */}
          <div className="group bg-white p-6 sm:p-8 rounded-none border-[3.5px] sm:border-4 border-black shadow-[6px_6px_0px_#000000] sm:shadow-[8px_8px_0px_#000000] flex flex-col justify-between transition-all duration-400 ease-out hover:-translate-y-1.5 hover:shadow-[10px_10px_0px_#000000]">
            
            <div className="flex flex-col space-y-6">
              {/* IMAGE FRAME WITH NEOBRUTALISM STYLING & ROTATION */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] neobrutalist-frame p-1.5 rounded-none transform -rotate-[1.5deg] transition-transform duration-500 ease-out group-hover:rotate-0 overflow-visible">
                <div className="relative w-full h-full overflow-hidden rounded-none">
                  <Image
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop"
                    alt={content.card1.altImage}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out rounded-none"
                  />
                  {/* Subtle Dark/Navy Overlay Shift on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A2A5B]/20 via-transparent to-transparent group-hover:from-[#1A2A5B]/40 transition-colors duration-400 pointer-events-none" />
                </div>

                {/* NUMBERED CARD BADGE */}
                <div className="absolute -top-3 -right-3 w-8 h-8 sm:w-9 sm:h-9 neobrutalist-badge flex items-center justify-center text-xs sm:text-sm z-20">
                  01
                </div>
              </div>

              {/* CARD CONTENT (TITLE + DESCRIPTION) */}
              <div className="flex flex-col space-y-3 pt-2">
                <h3 className="font-bold text-xl sm:text-2xl text-[#1A2A5B] tracking-tight uppercase">
                  {content.card1.title}
                </h3>
                <p className="text-[#706F6F] text-sm sm:text-[15px] leading-[1.65] font-normal">
                  {content.card1.description}
                </p>
              </div>
            </div>

            {/* CTA BUTTON */}
            <div className="pt-6 sm:pt-8 w-full">
              <Link
                href="/kemahasiswaan"
                className="w-full bg-[#1A2A5B] text-white hover:bg-[#121e42] font-semibold text-sm sm:text-[15px] px-7 py-3.5 rounded-none flex items-center justify-center space-x-2.5 transition-all duration-200 border border-[#1A2A5B] shadow-sm"
              >
                <span>{content.card1.buttonText}</span>
                <span className="text-base transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </Link>
            </div>

          </div>

          {/* CARD 02: AL-ISLAM & KEMUHAMMADIYAHAN */}
          <div className="group bg-white p-6 sm:p-8 rounded-none border-[3.5px] sm:border-4 border-black shadow-[6px_6px_0px_#000000] sm:shadow-[8px_8px_0px_#000000] flex flex-col justify-between transition-all duration-400 ease-out hover:-translate-y-1.5 hover:shadow-[10px_10px_0px_#000000]">
            
            <div className="flex flex-col space-y-6">
              {/* IMAGE FRAME WITH NEOBRUTALISM STYLING & ROTATION (OPPOSITE ROTATION FOR VARIATION) */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] neobrutalist-frame p-1.5 rounded-none transform rotate-[1.5deg] transition-transform duration-500 ease-out group-hover:rotate-0 overflow-visible">
                <div className="relative w-full h-full overflow-hidden rounded-none">
                  <Image
                    src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1000&auto=format&fit=crop"
                    alt={content.card2.altImage}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out rounded-none"
                  />
                  {/* Subtle Gold Overlay Shift on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FF9E44]/20 via-transparent to-transparent group-hover:from-[#FF9E44]/40 transition-colors duration-400 pointer-events-none" />
                </div>

                {/* NUMBERED CARD BADGE */}
                <div className="absolute -top-3 -right-3 w-8 h-8 sm:w-9 sm:h-9 neobrutalist-badge flex items-center justify-center text-xs sm:text-sm z-20">
                  02
                </div>
              </div>

              {/* CARD CONTENT (TITLE + DESCRIPTION) */}
              <div className="flex flex-col space-y-3 pt-2">
                <h3 className="font-bold text-xl sm:text-2xl text-[#1A2A5B] tracking-tight uppercase">
                  {content.card2.title}
                </h3>
                <p className="text-[#706F6F] text-sm sm:text-[15px] leading-[1.65] font-normal">
                  {content.card2.description}
                </p>
              </div>
            </div>

            {/* CTA BUTTON */}
            <div className="pt-6 sm:pt-8 w-full">
              <Link
                href="/aik"
                className="w-full bg-[#1A2A5B] text-white hover:bg-[#121e42] font-semibold text-sm sm:text-[15px] px-7 py-3.5 rounded-none flex items-center justify-center space-x-2.5 transition-all duration-200 border border-[#1A2A5B] shadow-sm"
              >
                <span>{content.card2.buttonText}</span>
                <span className="text-base transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
