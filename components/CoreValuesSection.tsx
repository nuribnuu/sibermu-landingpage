"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useDynamicSectionHeight } from "@/hooks/useDynamicSectionHeight";
import MobileReveal from "@/components/MobileReveal";

export interface CoreValueCard {
  number: string;
  title: string;
  description: string;
}

export const section8ValuesData = {
  id: {
    headline: "Nilai Kemuhammadiyahan",
    subheadline:
      "Delapan nilai utama yang hidup dan menjadi jiwa seluruh pegiat Muhammadiyah, menjadi fondasi gerakan SIBERMU dalam mendidik dan melayani umat.",
    cards: [
      {
        number: "01",
        title: "Al-Qiyam al-Fadhilah (Nilai/Value)",
        description:
          "Semangat 'ashariyah', hadir dan berbuat terbaik di setiap ruang dan waktu, terinspirasi dari Surat Al-'Ashr.",
      },
      {
        number: "02",
        title: "Pemuliaan Manusia",
        description:
          "Sejak awal berdiri, Muhammadiyah mendorong perempuan keluar dari kungkungan tradisi patriarki agar bisa berperan aktif di masyarakat, sebagai pendidik, intelektual, dan lainnya.",
      },
      {
        number: "03",
        title: "Persaudaraan (Ukhuwah)",
        description: "Menjadi titik temu di tengah perbedaan.",
      },
      {
        number: "04",
        title: "Welas Asih",
        description:
          "Pengamalan Al-Ma'un lewat cara yang moderat dan inklusif.",
      },
      {
        number: "05",
        title: "Etos Kerja",
        description:
          "Lebih banyak bekerja daripada bicara, terlihat dari banyaknya amal usaha yang didirikan.",
      },
      {
        number: "06",
        title: "Tauhid yang Pro-Kemanusiaan",
        description:
          "Organisasi tidak berdiri untuk dirinya sendiri, tapi untuk memberi manfaat sebesar-besarnya bagi orang lain.",
      },
      {
        number: "07",
        title: "Nilai Ilmiah dan Keilmuan",
        description:
          "Dikenal cerdas, berilmu, dan selaras antara ucapan dengan tindakan.",
      },
      {
        number: "08",
        title: "Nilai Peradaban",
        description:
          "Menerjemahkan Islam sebagai agama peradaban, berupaya menjadi umat terbaik (khairu ummah).",
      },
    ],
  },
  en: {
    headline: "Core Values of Muhammadiyah",
    subheadline:
      "Eight core values that live within and give spirit to every Muhammadiyah activist — the foundation guiding SIBERMU in educating and serving the community.",
    cards: [
      {
        number: "01",
        title: "Al-Qiyam al-Fadhilah (Core Value)",
        description:
          "The spirit of 'ashariyah' — being present and doing one's best in every moment and place, inspired by Surah Al-'Asr.",
      },
      {
        number: "02",
        title: "Human Dignity",
        description:
          "Since its founding, Muhammadiyah has empowered women to break free from patriarchal tradition and take an active role in society — as educators, intellectuals, and beyond.",
      },
      {
        number: "03",
        title: "Brotherhood (Ukhuwah)",
        description:
          "Becoming a common ground that unites people across differences.",
      },
      {
        number: "04",
        title: "Compassion",
        description:
          "Living out the teachings of Al-Ma'un through a moderate and inclusive approach.",
      },
      {
        number: "05",
        title: "Work Ethic",
        description:
          "Known for action over words, reflected in the many charitable and social enterprises it has established.",
      },
      {
        number: "06",
        title: "Humanity-Oriented Tauhid",
        description:
          "The organization exists not for itself, but to bring maximum benefit to others.",
      },
      {
        number: "07",
        title: "Scientific & Intellectual Spirit",
        description:
          "Known for being knowledgeable and intelligent, with words consistent with actions.",
      },
      {
        number: "08",
        title: "Civilizational Value",
        description:
          "Translating Islam as a religion of civilization, striving to become the best community (khairu ummah).",
      },
    ],
  },
};

export default function CoreValuesSection() {
  const { locale, t } = useLanguage();
  const content = section8ValuesData[locale] || section8ValuesData.id;
  const { containerRef, minHeight, stickyTop } = useDynamicSectionHeight();

  return (
    <section
      id="masjid-amal-mulya"
      data-theme="light"
      style={{
        ...(minHeight ? { minHeight: `${minHeight}px` } : {}),
        ...(stickyTop !== null ? { top: `${stickyTop}px` } : {}),
      }}
      className="relative lg:sticky lg:top-0 min-h-screen w-full bg-slate-50 text-[#1A2A5B] z-[80] flex flex-col justify-center overflow-visible lg:overflow-visible py-14 sm:py-16 lg:pt-[calc(var(--header-marquee-total)+1.5rem)] lg:pb-10 border-t border-slate-200 lg:border-t-2 lg:border-[#ff9e44] scroll-mt-[var(--header-marquee-total)]"
    >
      {/* Subtle Dot Grid Background Pattern */}
      <div className="dot-grid-pattern-light" aria-hidden="true" />

      {/* Main Container */}
      <div ref={containerRef} className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        
        {/* HEADER BLOCK */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <MobileReveal delay={0} rotate={-1.5}>
            <h2 className="font-bold text-3xl sm:text-4xl lg:text-[clamp(2rem,3.2vw,2.875rem)] text-[#1A2A5B] leading-[1.2] tracking-tight mb-3">
              <span className="headline-marker headline-marker-2">
                {t("section8.headline") || content.headline}
              </span>
            </h2>
          </MobileReveal>

          <MobileReveal delay={100}>
            <p className="text-[#706F6F] text-sm sm:text-base lg:text-lg leading-[1.65] font-normal">
              {t("section8.subheadline") || content.subheadline}
            </p>
          </MobileReveal>
        </div>

        {/* 8 CORE VALUES CARDS GRID (4 Columns Desktop 4x2, 2 Columns Tablet 2x4, 1 Column Mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 max-w-7xl mx-auto">
          {content.cards.map((card, idx) => {
            const cardRotate = idx % 2 === 0 ? -2 : 2;
            return (
              <MobileReveal
                key={idx}
                delay={idx * 80}
                rotate={cardRotate}
              >
                <div className="bg-white p-5 sm:p-6 rounded-none border-[3.5px] sm:border-4 border-black shadow-[6px_6px_0px_#000000] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[9px_9px_0px_#000000] relative group h-full">
                  <div>
                    <div className="flex items-start justify-between mb-3.5">
                      {/* NUMBERED BADGE */}
                      <div className="w-9 h-9 sm:w-10 sm:h-10 neobrutalist-badge flex items-center justify-center text-xs sm:text-sm font-extrabold bg-[#FF9E44] text-black shrink-0 border-2 border-black">
                        {card.number}
                      </div>

                      {/* SUBTLE CORNER ACCENT STAR */}
                      <div className="w-7 h-7 rounded-none border border-black/10 flex items-center justify-center text-[#1A2A5B]/30 group-hover:text-[#1A2A5B] group-hover:border-black/30 transition-colors text-xs font-bold">
                        ✦
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-[#1A2A5B] tracking-tight mb-2 uppercase leading-snug">
                        {card.title}
                      </h3>
                      <p className="text-[#706F6F] text-xs sm:text-sm leading-[1.6] font-normal">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              </MobileReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
