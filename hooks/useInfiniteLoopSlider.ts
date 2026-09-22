"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface UseInfiniteLoopSliderOptions {
  itemCount: number; // Number of items in a single set
  locale?: string;
}

export function useInfiniteLoopSlider({ itemCount, locale }: UseInfiniteLoopSliderOptions) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isResettingRef = useRef(false);

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);

  const getItemWidth = useCallback(() => {
    if (!scrollRef.current || !scrollRef.current.firstElementChild) return 300;
    const item = scrollRef.current.firstElementChild as HTMLElement;
    const style = window.getComputedStyle(scrollRef.current);
    const gap = parseFloat(style.columnGap || style.gap || "24") || 0;
    return item.clientWidth + gap;
  }, []);

  // Center scroll position at the start of Set 2 (index itemCount) on mount or itemCount/locale change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollRef.current) {
        const container = scrollRef.current;
        container.style.scrollBehavior = "auto";
        const width = getItemWidth();
        container.scrollLeft = width * itemCount;
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [locale, itemCount, getItemWidth]);

  // Handle continuous infinite loop on scroll with instantaneous boundary reset
  const handleScroll = useCallback(() => {
    if (!scrollRef.current || isResettingRef.current) return;
    const container = scrollRef.current;
    const width = getItemWidth();
    const singleSetWidth = width * itemCount;
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
  }, [getItemWidth, itemCount, isMouseDown]);

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
    const width = getItemWidth();
    container.style.scrollBehavior = "smooth";
    container.scrollBy({
      left: direction === "left" ? -width : width,
    });
  };

  return {
    scrollRef,
    scroll,
    handleScroll,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
    dragDistance,
  };
}
