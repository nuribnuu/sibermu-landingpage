"use client";

import { useState, useEffect, useRef } from "react";

export function useDynamicSectionHeight() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [minHeight, setMinHeight] = useState<number | null>(null);
  const [stickyTop, setStickyTop] = useState<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateHeight = () => {
      if (typeof window === "undefined" || window.innerWidth < 1024) {
        setMinHeight(null);
        setStickyTop(null);
        return;
      }

      const headerMarqueeTotal = parseInt(
        getComputedStyle(document.documentElement)
          .getPropertyValue("--header-marquee-total") || "110",
        10
      );

      // Measure true rendered content height
      const contentHeight = container.getBoundingClientRect().height;

      // Calculate total required height including top marquee offset & padding
      const totalRequiredHeight = Math.ceil(
        contentHeight + (headerMarqueeTotal || 110) + 64
      );

      const viewportHeight = window.innerHeight;

      if (totalRequiredHeight > viewportHeight) {
        // Calculate negative top offset so content scrolls up until bottom is visible before sticking
        const topOffset = Math.floor(viewportHeight - totalRequiredHeight);
        // Add pin buffer so user has scroll distance to read content comfortably
        const pinBuffer = Math.round(viewportHeight * 0.35);
        const dynamicMinHeight = totalRequiredHeight + pinBuffer;

        setMinHeight(dynamicMinHeight);
        setStickyTop(topOffset);
      } else {
        setMinHeight(null);
        setStickyTop(null);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });

    resizeObserver.observe(container);
    window.addEventListener("resize", updateHeight);
    updateHeight();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return { containerRef, minHeight, stickyTop };
}
