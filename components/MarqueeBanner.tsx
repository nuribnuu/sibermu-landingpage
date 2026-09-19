"use client";

import React from "react";

export default function MarqueeBanner() {
  const marqueeItems = [
    "SELAMAT DATANG DI BIRO KEMAHASISWAAN DAN AIK",
    "WELCOME TO THE STUDENT AFFAIRS AND AIK BUREAU",
    "SELAMAT DATANG DI BIRO KEMAHASISWAAN DAN AIK",
    "WELCOME TO THE STUDENT AFFAIRS AND AIK BUREAU",
  ];

  return (
    <div className="w-full bg-[#FF9E44] h-[38px] sm:h-[46px] lg:h-[50px] overflow-hidden flex items-center select-none relative z-30 shadow-sm border-t-[2.5px] border-b-[2.5px] sm:border-t-[3px] sm:border-b-[3px] border-[#1A2A5B]">

      {/* Single track container (w-max) containing 2 identical copies side-by-side */}
      <div className="flex w-max items-center animate-marquee">
        {/* Copy 1 */}
        <div className="flex shrink-0 items-center whitespace-nowrap">
          {marqueeItems.map((item, idx) => (
            <React.Fragment key={`c1-${idx}`}>
              <span className="font-bold text-[#1A2A5B] uppercase text-[12px] sm:text-[14px] lg:text-[16px] tracking-[0.5px] px-4 sm:px-6">
                {item}
              </span>
              <span className="text-[#1A2A5B] text-[10px] sm:text-[12px] lg:text-[14px] px-2 sm:px-4 opacity-90 shrink-0">
                ★
              </span>
            </React.Fragment>
          ))}
        </div>

        {/* Copy 2 (Identical replica for seamless loop at -50%) */}
        <div className="flex shrink-0 items-center whitespace-nowrap" aria-hidden="true">
          {marqueeItems.map((item, idx) => (
            <React.Fragment key={`c2-${idx}`}>
              <span className="font-bold text-[#1A2A5B] uppercase text-[12px] sm:text-[14px] lg:text-[16px] tracking-[0.5px] px-4 sm:px-6">
                {item}
              </span>
              <span className="text-[#1A2A5B] text-[10px] sm:text-[12px] lg:text-[14px] px-2 sm:px-4 opacity-90 shrink-0">
                ★
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
