"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useInfiniteLoopSlider } from "@/hooks/useInfiniteLoopSlider";

export interface AikCardItem {
  id: string;
  categoryLabel: {
    id: string;
    en: string;
  };
  title: {
    id: string;
    en: string;
  };
  description: {
    id: string;
    en: string;
  };
  image: string;
  link: string;
  ctaText: {
    id: string;
    en: string;
  };
}

export const section7AikData = {
  id: {
    headline: "Kegiatan Keagamaan, Kajian & Syiar",
    subheadline:
      "Dari peringatan hari besar Islam, kajian pembinaan Al-Islam dan Kemuhammadiyahan, hingga syiar dakwah digital — nilai Islam menjadi landasan setiap kegiatan di SiberMu.",
  },
  en: {
    headline: "Religious Activities, Study Sessions & Da'wah",
    subheadline:
      "From Islamic holiday observances and Al-Islam and Kemuhammadiyahan study sessions to digital da'wah outreach — Islamic values are the foundation of every activity at SiberMu.",
  },
};

export const aikCardsList: AikCardItem[] = [
  {
    id: "1",
    categoryLabel: { id: "Kajian", en: "Study Session" },
    title: {
      id: "Pengajian Memperingati Isra Mi'raj Nabi Muhammad SAW 1444 H",
      en: "Isra Mi'raj Commemoration Pengajian 1444 H",
    },
    description: {
      id: "Pengajian dalam rangka memperingati Isra Mi'raj Nabi Muhammad SAW 1444 H.",
      en: "A religious gathering commemorating the Isra Mi'raj of Prophet Muhammad SAW, 1444 H.",
    },
    image: "https://img.youtube.com/vi/R2ZvAveoX6A/hqdefault.jpg",
    link: "https://www.youtube.com/live/R2ZvAveoX6A",
    ctaText: { id: "Tonton", en: "Watch" },
  },
  {
    id: "2",
    categoryLabel: { id: "Kajian", en: "Study Session" },
    title: {
      id: "Pengajian Ramadan 1443 H",
      en: "Ramadan 1443 H Pengajian",
    },
    description: {
      id: "Pengajian Ramadan 1443 H yang diselenggarakan Universitas Siber Muhammadiyah.",
      en: "A Ramadan 1443 H religious gathering held by Universitas Siber Muhammadiyah.",
    },
    image: "https://img.youtube.com/vi/tLVh8KxbtXY/hqdefault.jpg",
    link: "https://www.youtube.com/live/tLVh8KxbtXY",
    ctaText: { id: "Tonton", en: "Watch" },
  },
  {
    id: "3",
    categoryLabel: { id: "Kajian", en: "Study Session" },
    title: {
      id: "Pengajian Syawalan bersama Dr. M. Samsuddin, M.Pd.",
      en: "Syawalan Pengajian with Dr. M. Samsuddin, M.Pd.",
    },
    description: {
      id: "Pengajian Syawalan Universitas Siber Muhammadiyah bersama Bapak Dr. M. Samsuddin, M.Pd.",
      en: "A Syawalan religious gathering at Universitas Siber Muhammadiyah with Dr. M. Samsuddin, M.Pd.",
    },
    image: "https://img.youtube.com/vi/PeSJxevG-9I/hqdefault.jpg",
    link: "https://youtu.be/PeSJxevG-9I",
    ctaText: { id: "Tonton", en: "Watch" },
  },
  {
    id: "4",
    categoryLabel: { id: "Kajian", en: "Study Session" },
    title: {
      id: "Kajian dan Penguatan Al-Islam Kemuhammadiyahan",
      en: "Al-Islam and Kemuhammadiyahan Study & Reinforcement Session",
    },
    description: {
      id: "Kajian pembinaan untuk memperkuat pemahaman nilai Al-Islam dan Kemuhammadiyahan di lingkungan SiberMu.",
      en: "A study session to strengthen understanding of Al-Islam and Kemuhammadiyahan values within the SiberMu community.",
    },
    image: "https://img.youtube.com/vi/iEEzDisMkSw/hqdefault.jpg",
    link: "https://www.youtube.com/live/iEEzDisMkSw",
    ctaText: { id: "Tonton", en: "Watch" },
  },
  {
    id: "5",
    categoryLabel: { id: "Kajian", en: "Study Session" },
    title: {
      id: "Pengajian Bersama Milad 1 Tahun SiberMu",
      en: "Pengajian on SiberMu's 1st Anniversary",
    },
    description: {
      id: "Pengajian bersama dalam rangkaian Closing Ceremony Milad 1 Tahun SiberMu.",
      en: "A joint religious gathering as part of the Closing Ceremony for SiberMu's 1st anniversary (Milad).",
    },
    image: "https://img.youtube.com/vi/yI7aHNmfoYc/hqdefault.jpg",
    link: "https://www.youtube.com/live/yI7aHNmfoYc",
    ctaText: { id: "Tonton", en: "Watch" },
  },
  {
    id: "6",
    categoryLabel: { id: "Syiar", en: "Da'wah" },
    title: {
      id: "Pusat Syiar Digital Muhammadiyah (PSDM)",
      en: "Muhammadiyah Digital Da'wah Center (PSDM)",
    },
    description: {
      id: "Unit dakwah digital Muhammadiyah yang berintegrasi dengan platform MOOCs SiberMu, menghadirkan pelatihan literasi digital untuk masyarakat umum.",
      en: "Muhammadiyah's digital da'wah unit, integrated with SiberMu's MOOCs platform, offering digital literacy training for the public.",
    },
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
    link: "https://moocs.sibermu.ac.id/course/view.php?id=130",
    ctaText: { id: "Selengkapnya", en: "Read More" },
  },
];

export default function AikSection() {
  const { locale, t } = useLanguage();
  const content = section7AikData[locale] || section7AikData.id;

  const {
    scrollRef,
    scroll,
    handleScroll,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
    dragDistance,
  } = useInfiniteLoopSlider({ itemCount: aikCardsList.length, locale });

  // 3 cloned sets of items for seamless infinite looping
  const loopedItems = [
    ...aikCardsList.map((item) => ({ ...item, uniqueKey: `set1-${item.id}` })),
    ...aikCardsList.map((item) => ({ ...item, uniqueKey: `set2-${item.id}` })),
    ...aikCardsList.map((item) => ({ ...item, uniqueKey: `set3-${item.id}` })),
  ];

  return (
    <section
      id="aik"
      data-theme="dark"
      className="relative lg:sticky lg:top-0 min-h-screen lg:h-screen lg:h-[100dvh] bg-[#0b091f] text-white z-[70] flex flex-col justify-center overflow-visible lg:overflow-hidden py-16 sm:py-20 lg:pt-[calc(var(--header-marquee-total)+1.5rem)] lg:pb-8 border-t border-white/5 lg:border-t-2 lg:border-[#ff9e44] scroll-mt-[var(--header-marquee-total)]"
    >
      {/* Dot Grid Background Pattern */}
      <div className="dot-grid-pattern-dark" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        
        {/* HEADER BLOCK */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h2 className="font-bold text-4xl sm:text-5xl lg:text-[50px] text-white leading-[1.2] tracking-tight mb-3">
            <span className="headline-marker headline-marker-1">
              {t("section7.headline") || content.headline}
            </span>
          </h2>
          <p className="text-white/80 text-base sm:text-lg leading-[1.65] font-normal">
            {t("section7.subheadline") || content.subheadline}
          </p>
        </div>

        {/* CAROUSEL WRAPPER WITH OVERLAPPING CIRCULAR NAVIGATION ARROWS */}
        <div className="relative max-w-6xl mx-auto px-2 sm:px-4">
          
          {/* LEFT CIRCULAR ARROW BUTTON */}
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Previous religious activities"
            className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 bg-[#0b091f]/85 backdrop-blur-md text-white border-2 border-white/40 rounded-full flex items-center justify-center font-bold text-lg sm:text-xl hover:bg-[#FF9E44] hover:text-black hover:border-black transition-all shadow-[0_4px_14px_rgba(0,0,0,0.6)] active:scale-95 cursor-pointer"
          >
            ‹
          </button>

          {/* RIGHT CIRCULAR ARROW BUTTON */}
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Next religious activities"
            className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 bg-[#0b091f]/85 backdrop-blur-md text-white border-2 border-white/40 rounded-full flex items-center justify-center font-bold text-lg sm:text-xl hover:bg-[#FF9E44] hover:text-black hover:border-black transition-all shadow-[0_4px_14px_rgba(0,0,0,0.6)] active:scale-95 cursor-pointer"
          >
            ›
          </button>

          {/* DRAGGABLE & INFINITE SCROLLING CAROUSEL CONTAINER */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className="flex gap-4 sm:gap-6 overflow-x-auto py-3 px-1 select-none cursor-grab active:cursor-grabbing no-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {loopedItems.map((item) => {
              const label = item.categoryLabel[locale] || item.categoryLabel.id;
              const cardTitle = item.title[locale] || item.title.id;
              const cardDesc = item.description[locale] || item.description.id;
              const cta = item.ctaText[locale] || item.ctaText.id;

              return (
                <div
                  key={item.uniqueKey}
                  className="w-[calc(50%-8px)] sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] flex-shrink-0 bg-white text-[#1A2A5B] p-5 rounded-none border-[3.5px] border-black shadow-[6px_6px_0px_#000000] flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 hover:shadow-[9px_9px_0px_#000000]"
                >
                  <div>
                    {/* IMAGE FRAME WITH NEOBRUTALISM STYLING */}
                    <div className="relative w-full aspect-[16/10] neobrutalist-frame p-1 rounded-none mb-4 overflow-hidden">
                      <div className="relative w-full h-full overflow-hidden rounded-none">
                        <Image
                          src={item.image}
                          alt={cardTitle}
                          fill
                          unoptimized
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 rounded-none pointer-events-none"
                        />
                      </div>
                    </div>

                    {/* CATEGORY LABEL BADGE */}
                    <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-[#FF9E44] bg-black px-2.5 py-1 mb-2">
                      {label}
                    </span>

                    {/* CARD TITLE */}
                    <h3 className="font-bold text-base sm:text-lg text-[#1A2A5B] leading-snug mb-2">
                      {cardTitle}
                    </h3>

                    {/* CARD DESCRIPTION */}
                    <p className="text-[#706F6F] text-xs sm:text-sm leading-relaxed mb-4">
                      {cardDesc}
                    </p>
                  </div>

                  {/* CARD CTA LINK - FIT CONTENT SIZING (w-fit) */}
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (dragDistance > 5) {
                        e.preventDefault();
                      }
                    }}
                    className="self-start w-fit inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-black bg-[#FF9E44] px-3.5 py-2 border-2 border-black hover:bg-black hover:text-white transition-colors mt-auto"
                  >
                    <span>{cta}</span>
                    <span>→</span>
                  </a>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
