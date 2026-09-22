"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export const section5PrestasiData = {
  id: {
    headline: "Prestasi",
    subheadline:
      "Ruang bagi mahasiswa SiberMu untuk menguji ide, kreativitas, dan kemampuan mereka hingga melampaui bangku kuliah.",
    cardCta: "Selengkapnya",
    items: [
      {
        id: "1",
        categoryLabel: "Nasional",
        title: "Juara 2 Esai Ilmiah MIDBRAIN 2023",
        description:
          "Nada Pratiwi dan Rahmat Simbolon raih Juara 2 Lomba Esai Ilmiah Nasional MIDBRAIN UIN Malang 2023.",
        image:
          "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
        link: "https://sibermu.ac.id/en/artikel/mahasiswa-sibermu-berhasil-juarai-lomba-esai-ilmiah-tingkat-nasional-medical-scientific-competition-and-award-of-uin-malang-midbrain-2023/",
      },
      {
        id: "2",
        categoryLabel: "Internasional",
        title: "Bronze Medal & Best Presenter Internasional",
        description:
          "Mahasiswa SiberMu meraih Bronze Medal & Best Presenter Award di ajang Global Leadership for Sustainable Economy and Well-Being.",
        image:
          "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
        link: "https://www.instagram.com/p/DX_YuVKAcc2/?img_index=1",
      },
      {
        id: "3",
        categoryLabel: "Nasional",
        title: "Publikasi Jurnal Nasional Terakreditasi",
        description:
          "Lanang Febria Galing Gumilang lulus sidang Tugas Akhir dan mempublikasikan penelitian hukumnya pada jurnal nasional terakreditasi.",
        image:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop",
        link: "https://sibermu.ac.id/kosong/mahasiswa-s1-pjj-hukum-sibermu-lulus-ujian-tugas-akhir-dan-publikasikan-penelitian-pada-jurnal-nasional-terakreditasi/",
      },
      {
        id: "4",
        categoryLabel: "Nasional",
        title: "Juara Pesona Kartini Nusantara 2025",
        description:
          "Rahmania Arunita terpilih sebagai Juara Pesona Kartini Nusantara 2025, mewakili semangat perempuan muda inspiratif Indonesia.",
        image:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
        link: "https://www.kompasiana.com/feraagustina21/681e1ac3ed64155c10754302/rahmania-arunita-mahasiwi-universitas-siber-muhammadiyah-yogyakarta-asal-samarinda-timur-raih-juara-pesona-kartini-nusantara-2025",
      },
      {
        id: "5",
        categoryLabel: "Nasional",
        title: "Capaian Gemilang di Kompetisi Akademik Nasional",
        description:
          "Fitria Nisail Laily, mahasiswa Prodi Hukum SiberMu, meraih capaian gemilang dalam berbagai kompetisi akademik tingkat nasional.",
        image:
          "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
        link: "https://www.facebook.com/sibermu/posts/prestasi-tidak-lahir-dari-keberuntungan-tetapi-dari-kerja-keras-konsistensi-dan-/1455892489623607/",
      },
      {
        id: "6",
        categoryLabel: "Internasional",
        title:
          "Juara 1 Best Presentation Project — Indonesian Youth Excursion Network Malaysia",
        description:
          "Amelia, mahasiswa SiberMu, meraih 1st Best Presentation Project di ajang Indonesian Youth Excursion Network #10 di Malaysia.",
        image:
          "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800&auto=format&fit=crop",
        link: "https://www.instagram.com/p/DGKUyiFhapH/?img_index=1",
      },
    ],
  },
  en: {
    headline: "Achievements",
    subheadline:
      "A space for SiberMu students to test their ideas, creativity, and abilities beyond the classroom.",
    cardCta: "Read More",
    items: [
      {
        id: "1",
        categoryLabel: "National",
        title: "2nd Place, MIDBRAIN 2023 Scientific Essay Competition",
        description:
          "Nada Pratiwi and Rahmat Simbolon won 2nd place in the MIDBRAIN 2023 National Scientific Essay Competition at UIN Malang.",
        image:
          "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
        link: "https://sibermu.ac.id/en/artikel/mahasiswa-sibermu-berhasil-juarai-lomba-esai-ilmiah-tingkat-nasional-medical-scientific-competition-and-award-of-uin-malang-midbrain-2023/",
      },
      {
        id: "2",
        categoryLabel: "International",
        title: "International Bronze Medal & Best Presenter",
        description:
          "SiberMu students won a Bronze Medal & Best Presenter Award at the Global Leadership for Sustainable Economy and Well-Being forum.",
        image:
          "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
        link: "https://www.instagram.com/p/DX_YuVKAcc2/?img_index=1",
      },
      {
        id: "3",
        categoryLabel: "National",
        title: "Published in an Accredited National Journal",
        description:
          "Lanang Febria Galing Gumilang passed his thesis defense and published his legal research in an accredited national journal.",
        image:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop",
        link: "https://sibermu.ac.id/kosong/mahasiswa-s1-pjj-hukum-sibermu-lulus-ujian-tugas-akhir-dan-publikasikan-penelitian-pada-jurnal-nasional-terakreditasi/",
      },
      {
        id: "4",
        categoryLabel: "National",
        title: "Winner, Pesona Kartini Nusantara 2025",
        description:
          "Rahmania Arunita was crowned winner of Pesona Kartini Nusantara 2025, representing the spirit of inspiring young Indonesian women.",
        image:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
        link: "https://www.kompasiana.com/feraagustina21/681e1ac3ed64155c10754302/rahmania-arunita-mahasiwi-universitas-siber-muhammadiyah-yogyakarta-asal-samarinda-timur-raih-juara-pesona-kartini-nusantara-2025",
      },
      {
        id: "5",
        categoryLabel: "National",
        title: "Outstanding Achievements in National Academic Competitions",
        description:
          "Fitria Nisail Laily, a SiberMu Law student, achieved outstanding results in various national academic competitions.",
        image:
          "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
        link: "https://www.facebook.com/sibermu/posts/prestasi-tidak-lahir-dari-keberuntungan-tetapi-dari-kerja-keras-konsistensi-dan-/1455892489623607/",
      },
      {
        id: "6",
        categoryLabel: "International",
        title:
          "1st Place Best Presentation Project — Indonesian Youth Excursion Network Malaysia",
        description:
          "Amelia, a SiberMu student, won 1st Best Presentation Project at the 10th Indonesian Youth Excursion Network event in Malaysia.",
        image:
          "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800&auto=format&fit=crop",
        link: "https://www.instagram.com/p/DGKUyiFhapH/?img_index=1",
      },
    ],
  },
};

export default function PrestasiSection() {
  const { locale, t } = useLanguage();
  const content = section5PrestasiData[locale] || section5PrestasiData.id;
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);
  const isResettingRef = useRef(false);

  // 3 cloned sets of items for seamless infinite looping
  const loopedItems = [
    ...content.items.map((item) => ({ ...item, uniqueKey: `set1-${item.id}` })),
    ...content.items.map((item) => ({ ...item, uniqueKey: `set2-${item.id}` })),
    ...content.items.map((item) => ({ ...item, uniqueKey: `set3-${item.id}` })),
  ];

  const getCardWidth = () => {
    if (!scrollRef.current || !scrollRef.current.firstElementChild) return 300;
    const card = scrollRef.current.firstElementChild as HTMLElement;
    const style = window.getComputedStyle(scrollRef.current);
    const gap = parseFloat(style.columnGap || style.gap || "24") || 24;
    return card.clientWidth + gap;
  };

  // Center scroll position at the start of set 2 on mount or locale change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollRef.current) {
        const container = scrollRef.current;
        container.style.scrollBehavior = "auto";
        const cardWidth = getCardWidth();
        container.scrollLeft = cardWidth * content.items.length;
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [locale, content.items.length]);

  // Handle continuous infinite loop on scroll with instantaneous (0ms) boundary reset
  const handleScroll = () => {
    if (!scrollRef.current || isResettingRef.current) return;
    const container = scrollRef.current;
    const cardWidth = getCardWidth();
    const singleSetWidth = cardWidth * content.items.length;
    const currentScroll = container.scrollLeft;

    // Reset when scrolling past the end of Set 2 into Set 3
    if (currentScroll >= singleSetWidth * 2 - 5) {
      isResettingRef.current = true;
      container.style.scrollBehavior = "auto";
      const offset = currentScroll - singleSetWidth * 2;
      container.scrollLeft = singleSetWidth + offset;
      if (isMouseDown) {
        setScrollLeftState((prev) => prev - singleSetWidth);
      }
      requestAnimationFrame(() => {
        isResettingRef.current = false;
      });
    }
    // Reset when scrolling before the start of Set 2 into Set 1
    else if (currentScroll <= 5) {
      isResettingRef.current = true;
      container.style.scrollBehavior = "auto";
      const offset = currentScroll;
      container.scrollLeft = singleSetWidth + offset;
      if (isMouseDown) {
        setScrollLeftState((prev) => prev + singleSetWidth);
      }
      requestAnimationFrame(() => {
        isResettingRef.current = false;
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsMouseDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
    setDragDistance(0);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !scrollRef.current) return;
    e.preventDefault();
    const container = scrollRef.current;
    container.style.scrollBehavior = "auto";
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    setDragDistance(Math.abs(x - startX));
    container.scrollLeft = scrollLeftState - walk;
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cardWidth = getCardWidth();
    container.style.scrollBehavior = "smooth";
    container.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
    });
  };

  return (
    <section
      id="prestasi"
      data-theme="dark"
      className="relative lg:sticky lg:top-0 min-h-screen lg:h-screen lg:h-[100dvh] bg-[#0b091f] text-white z-[50] flex flex-col justify-center overflow-visible lg:overflow-hidden py-16 sm:py-20 lg:pt-[calc(var(--header-marquee-total)+1.5rem)] lg:pb-8 border-t border-white/5 lg:border-t-2 lg:border-[#ff9e44] scroll-mt-[var(--header-marquee-total)]"
    >
      {/* Dot Grid Background Pattern Dark */}
      <div className="dot-grid-pattern-dark" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        
        {/* HEADER BLOCK */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h2 className="font-bold text-4xl sm:text-5xl lg:text-[50px] text-white leading-[1.2] tracking-tight mb-3">
            <span className="headline-marker headline-marker-2">
              {t("section5.headline") || content.headline}
            </span>
          </h2>
          <p className="text-white/70 text-base sm:text-lg leading-[1.65] font-normal">
            {t("section5.subheadline") || content.subheadline}
          </p>
        </div>

        {/* CAROUSEL WRAPPER WITH OVERLAPPING CIRCULAR NAVIGATION ARROWS */}
        <div className="relative max-w-6xl mx-auto px-2 sm:px-4">
          
          {/* LEFT CIRCULAR ARROW BUTTON */}
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Previous achievements"
            className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 bg-[#0b091f]/85 backdrop-blur-md text-white border-2 border-white/40 rounded-full flex items-center justify-center font-bold text-lg sm:text-xl hover:bg-[#FF9E44] hover:text-black hover:border-black transition-all shadow-[0_4px_14px_rgba(0,0,0,0.6)] active:scale-95 cursor-pointer"
          >
            ‹
          </button>

          {/* RIGHT CIRCULAR ARROW BUTTON */}
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Next achievements"
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
            {loopedItems.map((item) => (
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
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500 rounded-none pointer-events-none"
                      />
                    </div>
                  </div>

                  <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-[#FF9E44] bg-black px-2.5 py-1 mb-2">
                    {item.categoryLabel}
                  </span>

                  <h3 className="font-bold text-base sm:text-lg text-[#1A2A5B] leading-snug mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#706F6F] text-xs sm:text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {/* CARD CTA LINK - BOTTOM LEFT & FIT CONTENT */}
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
                  <span>{content.cardCta}</span>
                  <span>→</span>
                </a>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
