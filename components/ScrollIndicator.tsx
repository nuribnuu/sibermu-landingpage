"use client";

import React, { useState, useEffect } from "react";

export default function ScrollIndicator() {
  const [isPastSection1, setIsPastSection1] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if scroll has passed Section 1 (600vh total height)
      const section1End = window.innerHeight * 5.2;
      setIsPastSection1(window.scrollY > section1End);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-24 sm:top-28 lg:top-32 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none transition-all duration-500 ease-in-out ${
        isPastSection1 ? "opacity-0 invisible translate-y-2" : "opacity-100 visible translate-y-0"
      }`}
      aria-hidden="true"
    >
      {/* Mouse Icon Outer Outline */}
      <div className="w-7 h-11 sm:w-8 sm:h-12 border-[2.2px] border-[#1A2A5B] rounded-full flex justify-center pt-2 shadow-sm bg-white/20 backdrop-blur-[2px]">
        {/* Scroll Wheel Inner Line */}
        <div className="w-1 h-2.5 bg-[#1A2A5B] rounded-full animate-scroll-wheel" />
      </div>

      {/* Double Chevron Arrows below mouse */}
      <div className="flex flex-col items-center -space-y-1.5 mt-1.5">
        <svg
          className="w-4 h-4 text-[#1A2A5B] animate-chevron-bounce-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
        </svg>
        <svg
          className="w-4 h-4 text-[#1A2A5B] animate-chevron-bounce-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
