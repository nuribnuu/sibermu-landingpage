"use client";

import React, { useState, useEffect } from "react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const footerEl = document.getElementById("footer");
    if (!footerEl) return;

    if (typeof window === "undefined") return;

    if (!("IntersectionObserver" in window) || !window.IntersectionObserver) {
      const handleScroll = () => {
        const rect = footerEl.getBoundingClientRect();
        setIsVisible(rect.top < window.innerHeight && rect.bottom >= 0);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.05,
      }
    );

    observer.observe(footerEl);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={handleScrollToTop}
      aria-label="Kembali ke atas"
      title="Kembali ke atas"
      className={`fixed bottom-28 left-5 sm:left-6 lg:bottom-8 lg:left-8 z-[110] w-14 h-14 sm:w-15 sm:h-15 rounded-full flex items-center justify-center bg-[#FF9E44] text-[#1A2A5B] border-[3.5px] border-black shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] hover:bg-[#f59238] transition-all duration-300 transform active:scale-95 cursor-pointer ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <svg
        className="w-6 h-6 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
