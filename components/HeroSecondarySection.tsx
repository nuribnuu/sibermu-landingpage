"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import MarqueeBanner from "@/components/MarqueeBanner";
import { useDynamicSectionHeight } from "@/hooks/useDynamicSectionHeight";
import MobileReveal from "@/components/MobileReveal";
import { smoothScrollToTarget } from "@/utils/smoothScroll";

// SECTION 2 BILINGUAL CONTENT DATA STRUCTURE
export const section2Data = {
  id: {
    headline: {
      line1: "Mari Bertumbuh, Berkarya,",
      line2: "dan Berdampak dengan Keimanan",
    },
    subheadline:
      "Kehidupan mahasiswa SIBERMU adalah ruang untuk belajar, berorganisasi, berprestasi, dan memberi manfaat dengan berlandaskan nilai Al-Islam dan Kemuhammadiyahan.",
    cta: "Jelajahi →",
    statBadgeTitle: "6000+ Mahasiswa ",
    statBadgeSubtitle: "Memilih SIBERMU",
    photoBadgeText: "KAMPUS SIBER TERDEPAN",
    tagKemahasiswaan: "KEMAHASISWAAN",
    tagAik: "AL-ISLAM & KEMUHAMMADIYAHAN",
    altKemahasiswaanPhoto: "Mahasiswa SIBERMU Diskusi & Pembelajaran Digital",
    altAikPhoto: "Kegiatan Al-Islam & Kemuhammadiyahan",
  },
  en: {
    headline: {
      line1: "Let's Grow, Create,",
      line2: "and Transform with Faith",
    },
    subheadline:
      "Student life at SIBERMU is a space to learn, organize, achieve, and make an impact — grounded in the values of Al-Islam and Kemuhammadiyahan.",
    cta: "Explore →",
    statBadgeTitle: "6000+ Students",
    statBadgeSubtitle: "Choose SIBERMU",
    photoBadgeText: "LEADING CYBER CAMPUS",
    tagKemahasiswaan: "STUDENT AFFAIRS",
    tagAik: "AL-ISLAM & KEMUHAMMADIYAHAN",
    altKemahasiswaanPhoto: "SIBERMU Students Digital Learning & Discussion",
    altAikPhoto: "Al-Islam & Kemuhammadiyahan Activities",
  },
};

export default function HeroSecondarySection() {
  const { locale } = useLanguage();
  const content = section2Data[locale] || section2Data.id;
  const { containerRef, minHeight, stickyTop } = useDynamicSectionHeight();

  // Photo stack active index: 0 = Kemahasiswaan, 1 = AIK
  const [activeIndex, setActiveIndex] = useState<0 | 1>(0);

  // Auto-swap stack position every 4.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === 0 ? 1 : 0));
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const handleScrollToDuaDunia = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    smoothScrollToTarget("dua-dunia");
  };

  const photos = [
    {
      id: "kemahasiswaan",
      tag: content.tagKemahasiswaan,
      src: "/section/hero/kemahasiswaan-section-2.jpeg",
      alt: content.altKemahasiswaanPhoto,
    },
    {
      id: "aik",
      tag: content.tagAik,
      src: "/section/hero/aik-section-2.jpeg",
      alt: content.altAikPhoto,
    },
  ];

  return (
    <section
      id="hero-secondary"
      data-theme="light"
      style={{
        ...(minHeight ? { minHeight: `${minHeight}px` } : {}),
        ...(stickyTop !== null ? { top: `${stickyTop}px` } : {}),
      }}
      className="relative lg:sticky lg:top-0 min-h-screen w-full bg-slate-50 text-[#1A2A5B] z-[20] flex flex-col justify-center overflow-visible lg:overflow-visible py-16 sm:py-20 lg:pt-[calc(var(--header-marquee-total)+1.5rem)] lg:pb-8 scroll-mt-[var(--header-marquee-total)]"
    >
      {/* Subtle Dot Grid Background Pattern with Top-Bottom Fade Mask */}
      <div className="dot-grid-pattern-light" aria-hidden="true" />

      {/* Main Container */}
      <div ref={containerRef} className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* LEFT COLUMN (~45% on desktop: Headline + Subheadline + CTA) */}
          <div className="lg:col-span-5 flex flex-col items-center text-center lg:items-start lg:text-left space-y-6 lg:space-y-8">
            
            {/* Headline */}
            <MobileReveal delay={0} rotate={-2}>
              <h2 className="font-bold text-3xl sm:text-4xl lg:text-[clamp(2.25rem,4vw,3.5rem)] text-[#1A2A5B] leading-[1.25] sm:leading-[1.2] lg:leading-[1.18] tracking-tight">
                <span className="headline-marker headline-marker-1">
                  {content.headline.line1}
                </span>
                <br />
                <span className="headline-marker headline-marker-2">
                  {content.headline.line2}
                </span>
              </h2>
            </MobileReveal>

            {/* Subheadline */}
            <MobileReveal delay={100}>
              <p className="text-[#706F6F] text-base sm:text-lg leading-[1.65] font-normal max-w-[480px] mx-auto lg:mx-0">
                {content.subheadline}
              </p>
            </MobileReveal>

            {/* CTA Button */}
            <MobileReveal delay={200} rotate={1.5} className="w-full sm:w-auto">
              <div className="flex items-center justify-center lg:justify-start pt-1 sm:pt-2 w-full sm:w-auto">
                <a
                  href="#dua-dunia"
                  onClick={handleScrollToDuaDunia}
                  className="bg-[#1A2A5B] text-white hover:bg-[#121e42] font-semibold text-sm sm:text-[15px] px-8 py-3.5 rounded-none flex items-center justify-center space-x-2.5 transition-all duration-200 border border-[#1A2A5B] group shadow-sm shrink-0 w-full sm:w-auto cursor-pointer"
                >
                  <span>{content.cta.replace(/\s*→$/, "")}</span>
                  <span className="text-base group-hover:translate-x-1.5 transition-transform inline-block">
                    →
                  </span>
                </a>
              </div>
            </MobileReveal>

          </div>

          {/* RIGHT COLUMN (~55% on desktop: Stacked Neobrutalism Photos Composition) */}
          <MobileReveal delay={150} rotate={2} className="lg:col-span-7 w-full">
            <div className="relative flex flex-col items-center justify-center lg:items-end mt-4 lg:mt-0 w-full">
              
              {/* Subtle Gradient Background Glow */}
              <div className="absolute w-72 h-72 lg:w-96 lg:h-96 bg-[#1A2A5B]/10 rounded-full blur-3xl -z-10 pointer-events-none" />

            {/* STACKED PHOTO CONTAINER */}
            <div className="relative w-full max-w-[460px] sm:max-w-[520px] aspect-[4/3] sm:aspect-[14/10] my-2 sm:my-4 mx-auto lg:mr-0 lg:ml-auto select-none">
              
              {photos.map((photo, index) => {
                const isFront = activeIndex === index;

                return (
                  <div
                    key={photo.id}
                    className={`absolute inset-0 w-full h-full p-1.5 sm:p-2 bg-white border-[3.5px] sm:border-4 border-black rounded-none transition-all duration-500 ease-in-out ${
                      isFront
                        ? "z-20 transform -rotate-[1.5deg] translate-x-0 translate-y-0 shadow-[8px_8px_0px_#000000] sm:shadow-[10px_10px_0px_#000000]"
                        : "z-10 transform rotate-[3.5deg] sm:rotate-[4deg] translate-x-3 translate-y-3 sm:translate-x-5 sm:translate-y-5 shadow-[5px_5px_0px_#000000] sm:shadow-[7px_7px_0px_#000000]"
                    }`}
                  >
                    {/* PHOTO INNER CONTAINER */}
                    <div className="relative w-full h-full overflow-hidden rounded-none">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        className="object-cover object-center transition-transform duration-500 rounded-none pointer-events-none"
                        priority={index === 0}
                      />
                      {/* TOP LEFT CATEGORY BADGE */}
                      <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 z-10 bg-black text-[#FF9E44] text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 sm:px-3 py-1 border border-black shadow-[2px_2px_0px_#000000]">
                        {photo.tag}
                      </div>
                    </div>

                    {/* FLOATING STAT BADGE (ATTACHED TO FRONT PHOTO) */}
                    {isFront && (
                      <div className="absolute -bottom-4 -right-3 sm:-bottom-5 sm:-right-5 bg-[#FF9E44] border-[3.5px] sm:border-4 border-black p-2.5 sm:p-3.5 rounded-none shadow-[5px_5px_0px_#000000] sm:shadow-[6px_6px_0px_#000000] transform -rotate-[1deg] flex items-center space-x-2.5 sm:space-x-3 z-30 transition-all duration-300">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-black text-white flex items-center justify-center font-black text-xs sm:text-sm rounded-none shrink-0 border border-black shadow-[2px_2px_0px_#000000]">
                          ★
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="font-extrabold text-xs sm:text-sm text-black leading-tight">
                            {content.statBadgeTitle}
                          </span>
                          <span className="text-[10px] sm:text-xs text-black/80 font-bold">
                            {content.statBadgeSubtitle}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

            </div>

          </div>
        </MobileReveal>

      </div>
    </div>
    </section>
  );
}


