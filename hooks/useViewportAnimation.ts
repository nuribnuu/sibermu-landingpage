"use client";

import { useEffect, useRef, useState } from "react";

interface UseViewportAnimationOptions {
  rootMargin?: string;
  threshold?: number | number[];
}

export function useViewportAnimation<T extends HTMLElement = HTMLDivElement>({
  rootMargin = "50px 0px 50px 0px",
  threshold = 0,
}: UseViewportAnimationOptions = {}) {
  const ref = useRef<T | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold]);

  return { ref, isIntersecting };
}
