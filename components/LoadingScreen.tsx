"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface LoadingScreenProps {
  progress: number;
  isLoaded: boolean;
  onComplete?: () => void;
}

export default function LoadingScreen({
  progress,
  isLoaded,
  onComplete,
}: LoadingScreenProps) {
  const [shouldRender, setShouldRender] = useState<boolean>(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [displayProgress, setDisplayProgress] = useState(0);

  // 1. Always lock body scroll on mount — NO sessionStorage check, loading
  //    screen now shows on every refresh unconditionally.
  useEffect(() => {
    document.documentElement.classList.add("loading-active");
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.classList.remove("loading-active");
      document.body.style.overflow = "";
    };
  }, []);

  // 2. Smoothly Update Display Progress
  useEffect(() => {
    if (shouldRender !== true) return;
    setDisplayProgress((prev) => (progress > prev ? progress : prev));
  }, [progress, shouldRender]);

  // 3. Hard Fallback Timeout (10 seconds)
  useEffect(() => {
    if (shouldRender !== true) return;
    const fallbackTimer = setTimeout(() => {
      setDisplayProgress(100);
    }, 10000);
    return () => clearTimeout(fallbackTimer);
  }, [shouldRender]);

  // 4. Trigger Exit Animation on 100% or isLoaded
  useEffect(() => {
    if (shouldRender !== true) return;

    if (displayProgress >= 100 || isLoaded) {
      const exitDelayTimer = setTimeout(() => {
        setIsFadingOut(true);

        // Unmount happens after the clip-path shrink animation finishes
        const unmountTimer = setTimeout(() => {
          document.body.style.overflow = "";
          setShouldRender(false);
          if (onComplete) onComplete();
        }, 900);

        return () => clearTimeout(unmountTimer);
      }, 400);

      return () => clearTimeout(exitDelayTimer);
    }
  }, [displayProgress, isLoaded, shouldRender, onComplete]);

  if (shouldRender !== true) return null;

  const formattedProgress = String(
    Math.min(100, Math.max(0, displayProgress)),
  ).padStart(3, "0");

  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 inset-0 z-[100000] w-full max-w-full h-screen m-0 p-0 flex flex-col items-center justify-between select-none overflow-hidden pointer-events-auto`}
      style={{
        backgroundColor: "#0A0C1E",
        backgroundImage:
          "radial-gradient(circle at 50% 45%, #352B8C 0%, #18164E 55%, #0A0C1E 100%)",
        clipPath: isFadingOut
          ? "circle(0% at 50% 50%)"
          : "circle(150% at 50% 50%)",
        WebkitClipPath: isFadingOut
          ? "circle(0% at 50% 50%)"
          : "circle(150% at 50% 50%)",
        transition: "clip-path 900ms cubic-bezier(0.65, 0, 0.35, 1)",
        pointerEvents: isFadingOut ? "none" : "auto",
      }}
    >
      {/* Inner content fades out faster than the clip-path shrink, so the
          logo/orbit disappear cleanly before the circle fully closes */}
      <div
        className={`flex flex-col items-center justify-between w-full h-full transition-opacity duration-300 ease-in-out ${
          isFadingOut ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="w-full h-6 sm:h-12 shrink-0" />

        <div className="relative flex flex-col items-center justify-center my-auto">
          <div className="relative flex items-center justify-center w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] lg:w-[360px] lg:h-[360px] shrink-0">
            <div className="absolute inset-0 w-full h-full animate-[spin_15s_linear_infinite]">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.18)"
                  strokeWidth="0.6"
                />
                <circle
                  cx="50"
                  cy="2"
                  r="1.8"
                  fill="rgba(255, 255, 255, 0.9)"
                />
              </svg>
            </div>

            <div className="absolute w-[160px] h-[160px] sm:w-[240px] sm:h-[240px] lg:w-[270px] lg:h-[270px] animate-spin-reverse">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.35)"
                  strokeWidth="1.2"
                  strokeDasharray="5 5"
                />
              </svg>
            </div>

            <div className="relative z-10 flex items-center justify-center w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] lg:w-[140px] lg:h-[140px] bg-white rounded-full shadow-[0_0_40px_rgba(75,63,168,0.5)] border border-white/20 transform transition-transform duration-300 hover:scale-105">
              <Image
                src="/logo.png"
                alt="SIBERMU Logo"
                width={140}
                height={36}
                className="w-[36%] h-auto object-contain [filter:brightness(0)_opacity(0.9)]"
                priority
              />
            </div>
          </div>

          <div className="mt-8 sm:mt-10 lg:mt-12 text-white/90 font-mono tracking-[0.25em] text-sm sm:text-base font-semibold">
            <span>{formattedProgress}</span>
            <span className="mx-2 text-cyan-400 font-bold">.</span>
            <span>100</span>
          </div>
        </div>

        <div className="w-full h-6 sm:h-12 shrink-0" />
      </div>
    </div>
  );
}
