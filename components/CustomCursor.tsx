"use client";

import React, { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [hoverText, setHoverText] = useState<string | null>(null);
  const [isEnabled, setIsEnabled] = useState(false);

  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Custom cursor only active for desktop (>= 1024px) with mouse pointer
    const checkEligibility = () => {
      const isDesktop = window.innerWidth >= 1024;
      const isFinePointer = window.matchMedia("(pointer: fine)").matches;
      return isDesktop && isFinePointer;
    };

    const updateEnableState = () => {
      const enabled = checkEligibility();
      setIsEnabled(enabled);
      if (enabled) {
        document.documentElement.classList.add("custom-cursor-active");
      } else {
        document.documentElement.classList.remove("custom-cursor-active");
        setIsVisible(false);
      }
    };

    updateEnableState();

    window.addEventListener("resize", updateEnableState);
    return () => {
      window.removeEventListener("resize", updateEnableState);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest(
        'a, button, input, select, textarea, [role="button"], .cursor-pointer, [onclick], [data-cursor-hover]'
      );

      if (interactiveEl) {
        setIsHovered(true);
        const customText = interactiveEl.getAttribute("data-cursor-text");
        setHoverText(customText || null);
      } else {
        setIsHovered(false);
        setHoverText(null);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Animation loop using Lerp interpolation (Factor ~0.22 for ~80-120ms response)
    const lerpFactor = 0.22;
    const animate = () => {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerpFactor;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerpFactor;

      if (cursorRef.current) {
        const x = Math.round(currentPos.current.x * 100) / 100;
        const y = Math.round(currentPos.current.y * 100) / 100;
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);

      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [isEnabled, isVisible]);

  if (!isEnabled) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`fixed top-0 left-0 pointer-events-none z-[99999] transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{ willChange: "transform" }}
    >
      {/* Neobrutalism Custom Cursor */}
      <div
        className={`relative flex items-center justify-center transition-all duration-150 ease-out -translate-x-1/2 -translate-y-1/2 ${
          isHovered
            ? "w-7 h-7 bg-[#FF9E44] border-2 border-white ring-2 ring-black rotate-3 shadow-[3px_3px_0px_#000000]"
            : "w-4.5 h-4.5 bg-white border-2 border-white mix-blend-difference rotate-0"
        } ${isClicked ? "scale-75" : ""}`}
      >
        {/* Inner core indicator */}
        <div
          className={`transition-all duration-150 ${
            isHovered
              ? "w-2 h-2 bg-black border border-white"
              : "w-1 h-1 bg-black"
          }`}
        />

        {/* Optional hover badge */}
        {hoverText && (
          <div className="absolute left-full ml-2 px-2 py-0.5 bg-black text-[#FF9E44] text-[10px] font-black uppercase tracking-wider whitespace-nowrap border border-white shadow-[2px_2px_0px_#000000]">
            {hoverText}
          </div>
        )}
      </div>
    </div>
  );
}
