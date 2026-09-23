"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import MarqueeBanner from "@/components/MarqueeBanner";
import { useDynamicSectionHeight } from "@/hooks/useDynamicSectionHeight";

// SECTION 2 BILINGUAL CONTENT DATA STRUCTURE
export const section2Data = {
  id: {
    headline: {
      line1: "Mari bertumbuh, berkarya,",
      line2: "dan berdampak dengan keimanan",
    },
    subheadline:
      "Kehidupan mahasiswa SiberMu adalah ruang untuk belajar, berorganisasi, berprestasi, dan memberi manfaat dengan berlandaskan nilai Al-Islam dan Kemuhammadiyahan.",
    cta: "Jelajahi →",
    statBadgeTitle: "500+ Mahasiswa",
    statBadgeSubtitle: "Aktif & Berprestasi",
    photoBadgeText: "KAMPUS SIBER TERDEPAN",
    altMainPhoto: "Mahasiswa SiberMu Diskusi & Pembelajaran Digital",
    altSmallPhoto: "Kegiatan Al-Islam & Kemuhammadiyahan",
  },
  en: {
    headline: {
      line1: "Let's grow, create,",
      line2: "and transform with faith",
    },
    subheadline:
      "Student life at SiberMu is a space to learn, organize, achieve, and make an impact — grounded in the values of Al-Islam and Kemuhammadiyahan.",
    cta: "Explore →",
    statBadgeTitle: "500+ Active &",
    statBadgeSubtitle: "Accomplished Students",
    photoBadgeText: "LEADING CYBER CAMPUS",
    altMainPhoto: "SiberMu Students Digital Learning & Discussion",
    altSmallPhoto: "Al-Islam & Kemuhammadiyahan Activities",
  },
};

export default function HeroSecondarySection() {
  const { locale } = useLanguage();
  const content = section2Data[locale] || section2Data.id;
  const { containerRef, minHeight, stickyTop } = useDynamicSectionHeight();

  const handleScrollToDuaDunia = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const heroEl = document.getElementById("hero");
    const heroSecEl = document.getElementById("hero-secondary");
    const top = (heroEl?.offsetHeight || 0) + (heroSecEl?.offsetHeight || 0);
    window.scrollTo({ top, behavior: "smooth" });
  };

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
          {/* Responsive Alignment Rule: < 1024px centered (text-center, items-center), >= 1024px left aligned (lg:text-left, lg:items-start) */}
          <div className="lg:col-span-5 flex flex-col items-center text-center lg:items-start lg:text-left space-y-6 lg:space-y-8">
            
            {/* Headline (Two Lines with Inline Gold Stabilo Highlight - Natural Box-Decoration-Break Wrap) */}
            <h2 className="font-bold text-3xl sm:text-4xl lg:text-[clamp(2.25rem,4vw,3.5rem)] text-[#1A2A5B] leading-[1.25] sm:leading-[1.2] lg:leading-[1.18] tracking-tight">
              <span className="headline-marker headline-marker-1">
                {content.headline.line1}
              </span>
              <br />
              <span className="headline-marker headline-marker-2">
                {content.headline.line2}
              </span>
            </h2>




            {/* Subheadline */}
            <p className="text-[#706F6F] text-base sm:text-lg leading-[1.65] font-normal max-w-[480px] mx-auto lg:mx-0">
              {content.subheadline}
            </p>

            {/* CTA Button (SHARP CORNERS - ZERO BORDER RADIUS - SINGLE PRIMARY ANCHOR BUTTON) */}
            {/* Responsive Container Rule: < 1024px centered (justify-center), >= 1024px left aligned (lg:justify-start) */}
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

          </div>

          {/* RIGHT COLUMN (~55% on desktop: Layered Framed Image Composition) */}
          {/* Responsive Rule: < 1024px image container centered (justify-center, mx-auto), >= 1024px right aligned (lg:justify-end) */}
          <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-end mt-4 lg:mt-0 w-full">
            
            {/* Subtle Gradient Background Glow */}
            <div className="absolute w-72 h-72 lg:w-96 lg:h-96 bg-[#1A2A5B]/10 rounded-full blur-3xl -z-10 pointer-events-none" />

            {/* Main Visual Composition Container */}
            <div className="relative w-full max-w-[520px] aspect-[4/3] sm:aspect-[14/10] my-4 mx-auto lg:mr-0 lg:ml-auto">
              
              {/* 1. DUPLICATE / LAYERED BACKGROUND FRAME (NEOBRUTALISM STYLE - TILTED STACK) */}
              <div
                className="absolute inset-0 neobrutalist-card-layer p-1.5 rounded-none transform translate-x-3 translate-y-3 sm:translate-x-5 sm:translate-y-5 rotate-[1.5deg] sm:rotate-[2deg] -z-10"
                aria-hidden="true"
              />

              {/* 2. MAIN FRAMED PHOTO (NEOBRUTALISM FRAME - THICK BLACK BORDER + HARD OFFSET SHADOW + SUBTLE TILT) */}
              <div className="relative w-full h-full neobrutalist-frame p-1.5 sm:p-2 rounded-none transform -rotate-[1deg] sm:-rotate-[1.5deg] group transition-transform duration-300 hover:rotate-0 z-10">
                <div className="relative w-full h-full overflow-hidden rounded-none">
                  <Image
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop"
                    alt={content.altMainPhoto}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 rounded-none"
                    priority
                  />
                </div>
              </div>



              {/* 3. SMALL OVERLAPPING CORNER PHOTO (NEOBRUTALISM FRAME - OPPOSITE TILT FOR SCRAPBOOK EFFECT) */}
              <div className="absolute -bottom-5 -left-5 sm:-bottom-7 sm:-left-7 w-36 sm:w-48 aspect-video neobrutalist-frame-small p-1 sm:p-1.5 rounded-none transform rotate-[1.5deg] sm:rotate-[2.5deg] z-20 transition-transform duration-300 hover:rotate-0">
                <div className="relative w-full h-full overflow-hidden rounded-none">
                  <Image
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop"
                    alt={content.altSmallPhoto}
                    fill
                    sizes="200px"
                    className="object-cover object-center rounded-none"
                  />
                </div>
              </div>


              {/* 4. CONSOLIDATED NEOBRUTALISM FLOATING STAT CARD (BOTTOM-RIGHT OVERLAPPING EDGE) */}
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-[#FF9E44] border-[3.5px] sm:border-4 border-black p-3 sm:p-4 rounded-none shadow-[5px_5px_0px_#000000] sm:shadow-[6px_6px_0px_#000000] transform -rotate-[1.5deg] sm:-rotate-[2deg] flex items-center space-x-3 sm:space-x-3.5 z-30 transition-transform duration-300 hover:rotate-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-black text-white flex items-center justify-center font-black text-sm sm:text-base rounded-none shrink-0 border border-black shadow-[2px_2px_0px_#000000]">
                  ★
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-extrabold text-xs sm:text-base text-black leading-tight">
                    {content.statBadgeTitle}
                  </span>
                  <span className="text-[11px] sm:text-xs text-black/80 font-bold">
                    {content.statBadgeSubtitle}
                  </span>
                </div>
              </div>


            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

