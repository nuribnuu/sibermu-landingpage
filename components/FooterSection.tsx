"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import MobileReveal from "@/components/MobileReveal";
import { smoothScrollToTarget } from "@/utils/smoothScroll";

export default function FooterSection() {
  const { locale, t } = useLanguage();

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const targetId = href.replace(/^\/?#/, "");
    smoothScrollToTarget(targetId);
  };

  const socialLinks = [
    {
      name: "Website",
      url: "https://sibermu.ac.id/",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3.6 9h16.8M3.6 15h16.8"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11.5 3a17 17 0 000 18M12.5 3a17 17 0 010 18"
          />
        </svg>
      ),
    },
    {
      name: "Facebook",
      url: "https://web.facebook.com/sibermu",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/sibermu/",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
          />
        </svg>
      ),
    },
    {
      name: "X",
      url: "https://x.com/sibermu",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/channel/UCeyzSDwnAzK3Hfza5hMcICw",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/school/sibermu/home/",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.77a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
        </svg>
      ),
    },
  ];

  const officialLinks = [
    {
      href: "https://sibermu.ac.id/profil/visi-dan-misi/",
      key: "visiMisi",
      label: t("footer.officialLinks.visiMisi"),
    },
    {
      href: "https://sibermu.ac.id/akreditasi/",
      key: "akreditasi",
      label: t("footer.officialLinks.akreditasi"),
    },
    {
      href: "https://sibermu.ac.id/admisi/",
      key: "admisi",
      label: t("footer.officialLinks.admisi"),
    },
    {
      href: "https://sibermu.ac.id/admisi/#price",
      key: "biayaKuliah",
      label: t("footer.officialLinks.biayaKuliah"),
    },
    {
      href: "https://sibermu.ac.id/faq/",
      key: "faq",
      label: t("footer.officialLinks.faq"),
    },
    {
      href: "https://sibermu.ac.id/karir/",
      key: "karir",
      label: t("footer.officialLinks.karir"),
    },
    {
      href: "https://sibermu.ac.id/versimu/",
      key: "versimu",
      label: t("footer.officialLinks.versimu"),
    },
  ];

  return (
    <footer
      id="footer"
      data-theme="light"
      className="relative z-[91] w-full bg-slate-50 text-[#1A2A5B] border-t-4 border-[#ff9e44] pt-14 sm:pt-16 lg:pt-20 pb-32 sm:pb-28 lg:pb-20 overflow-hidden"
    >
      {/* Subtle Dot Grid Background Pattern */}
      <div className="dot-grid-pattern-light" aria-hidden="true" />

      {/* Main Container */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        {/* 4-COLUMN BALANCED GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 sm:pb-14">
          {/* COLUMN 1: Brand & About (Span 4 on Desktop) */}
          <MobileReveal delay={0} rotate={-1.5} className="lg:col-span-4 flex flex-col space-y-4 md:border-r md:border-black/10 md:pr-8 lg:pr-8">
            <a
              href="#hero"
              onClick={(e) => handleAnchorClick(e, "#hero")}
              className="inline-block cursor-pointer focus:outline-none"
            >
              <Image
                src="/logo.png"
                alt="SIBERMU Logo"
                width={140}
                height={36}
                className="h-7 sm:h-8 w-auto object-contain [filter:brightness(0)_opacity(0.85)] hover:scale-105 transition-transform"
              />
            </a>

            <h3 className="font-bold text-base sm:text-lg text-[#1A2A5B] leading-snug">
              {t("footer.brandName")}
            </h3>

            <p className="text-sm text-[#706F6F] leading-[1.65] font-normal max-w-sm">
              {t("footer.tagline")}
            </p>

            {/* Badges for Operational Permit & Accreditation */}
            <div className="flex flex-wrap items-center gap-2 pt-1.5">
              <span className="inline-flex items-center px-2.5 py-1 text-[11px] font-bold text-[#1A2A5B] bg-[#FF9E44]/25 border border-[#FF9E44] rounded-none shadow-sm">
                {t("footer.accreditation")}
              </span>
              <span className="inline-flex items-center px-2.5 py-1 text-[11px] font-semibold text-[#1A2A5B] bg-[#1A2A5B]/10 border border-[#1A2A5B]/20 rounded-none shadow-sm">
                {t("footer.operationalPermit")}
              </span>
            </div>

            {/* Social Media Icons List */}
            <div className="pt-2 flex items-center flex-wrap gap-2.5">
              {socialLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-none bg-white border-2 border-black shadow-[3px_3px_0px_#000000] flex items-center justify-center text-[#1A2A5B] hover:bg-[#FF9E44] hover:text-black hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#000000] transition-all duration-200 cursor-pointer"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </MobileReveal>

          {/* COLUMN 2: Official Links / Tautan Resmi (Span 2 on Desktop) */}
          <MobileReveal delay={100} rotate={1.5} className="lg:col-span-2 flex flex-col space-y-3.5">
            <h4 className="font-bold text-base text-[#1A2A5B] uppercase tracking-wider pb-1.5 border-b-2 border-black/10">
              {t("footer.officialLinksTitle")}
            </h4>
            <ul className="flex flex-col space-y-2.5 text-xs sm:text-sm text-[#706F6F] leading-relaxed font-normal">
              {officialLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#1A2A5B] hover:underline transition-colors cursor-pointer inline-flex items-center space-x-1.5"
                  >
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </MobileReveal>

          {/* COLUMN 3: Halaman Depan / Main Campus & Contact (Span 3 on Desktop) */}
          <MobileReveal delay={200} rotate={-1} className="lg:col-span-3 flex flex-col space-y-6">
            {/* Contact Section */}
            <div className="flex flex-col space-y-3.5">
              <h4 className="font-bold text-base text-[#1A2A5B] uppercase tracking-wider pb-1.5 border-b-2 border-black/10">
                {t("footer.contactTitle")}
              </h4>
              <ul className="text-xs sm:text-sm text-[#706F6F] leading-relaxed font-normal space-y-2.5">
                <li>
                  <a
                    href="mailto:humas@sibermu.ac.id"
                    className="hover:text-[#1A2A5B] hover:underline transition-colors block"
                  >
                    <span>{t("footer.contactEmailLabel")}</span>{" "}
                    humas@sibermu.ac.id
                  </a>
                </li>
                <li>
                  <a
                    href="tel:02745015518"
                    className="hover:text-[#1A2A5B] hover:underline transition-colors block"
                  >
                    <span>{t("footer.contactPhoneLabel")}</span> 0274-5015518
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/6285179946901"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#1A2A5B] hover:underline transition-colors block"
                  >
                    <span>{t("footer.contactWaLabel")}</span> 0851-7994-6901
                  </a>
                </li>
              </ul>
            </div>
            {/* Main Campus Section */}
            <div className="flex flex-col space-y-3.5">
              <h4 className="font-bold text-base text-[#1A2A5B] uppercase tracking-wider pb-1.5 border-b-2 border-black/10">
                {t("footer.campusTitle")}
              </h4>
              <ul className="text-xs sm:text-sm text-[#706F6F] leading-relaxed font-normal space-y-2.5">
                <li>
                  <a
                    href="https://maps.app.goo.gl/gKfntxc9mQEj1XW87"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#1A2A5B] hover:underline transition-colors cursor-pointer block"
                  >
                    {t("footer.addressLine1")}
                  </a>
                </li>
              </ul>
            </div>
          </MobileReveal>

          {/* COLUMN 4: Page Credits (Span 3 on Desktop) */}
          <MobileReveal delay={300} rotate={1} className="lg:col-span-3 flex flex-col space-y-3.5">
            <h4 className="font-bold text-base text-[#1A2A5B] uppercase tracking-wider pb-1.5 border-b-2 border-black/10">
              {t("footer.creditsTitle")}
            </h4>
            <div className="flex flex-col space-y-2.5 text-xs sm:text-sm text-[#706F6F] leading-relaxed font-normal">
              <p>{t("footer.credits.icons")}</p>
              <p>
                <a
                  href="https://docs.wpbeaverbuilder.com/bb-theme/defaults-for-styles/typography/customizer-font-family-setting-system-ui/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#1A2A5B] hover:underline transition-colors block"
                >
                  {t("footer.credits.fontsFull")}
                </a>
              </p>
              <p>
                <a
                  href="https://flow.google.com/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#1A2A5B] hover:underline transition-colors block"
                >
                  {t("footer.credits.heroAnimFull")}
                </a>
              </p>
              <p>
                <a
                  href="https://gemini.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#1A2A5B] hover:underline transition-colors block"
                >
                  {t("footer.credits.illustrationsFull")}
                </a>
              </p>
              <p>{t("footer.credits.achievements")}</p>
              <p>{t("footer.credits.videoThumbnails")}</p>
              <p>
                <a
                  href="https://sibermu.ac.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#1A2A5B] hover:underline transition-colors block"
                >
                  {t("footer.credits.referencesFull")}
                </a>
              </p>
            </div>
          </MobileReveal>
        </div>

        {/* BOTTOM BAR DIVIDER, LEGALITY BADGE & COPYRIGHT */}
        <MobileReveal delay={350} rotate={0} className="border-t border-slate-200 sm:border-black/10 pt-8 sm:pt-10 flex flex-col items-center justify-center text-center text-xs sm:text-sm text-[#706F6F] font-normal space-y-2">
          <p>{t("footer.copyrightLine1")}</p>
          <p>{t("footer.copyrightLine2")}</p>
        </MobileReveal>
      </div>
    </footer>
  );
}
