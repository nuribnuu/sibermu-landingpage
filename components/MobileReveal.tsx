"use client";

import React, { useEffect, useRef, useState } from "react";

export interface MobileRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Delay in milliseconds (e.g. 0, 100, 150)
  duration?: number; // Duration in milliseconds (default 450)
  rotate?: number; // Initial rotation in degrees (e.g. -3 to 3)
  threshold?: number; // IntersectionObserver threshold (default 0.15)
  once?: boolean; // Run only once (default true)
  as?: React.ElementType; // HTML element or component (default 'div')
  style?: React.CSSProperties;
}

export default function MobileReveal({
  children,
  className = "",
  delay = 0,
  duration = 450,
  rotate = 0,
  threshold = 0.15,
  once = true,
  as: Component = "div",
  style,
  ...props
}: MobileRevealProps & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsRevealed(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -5% 0px",
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once]);

  const customStyles: React.CSSProperties = {
    ...style,
    ["--mobile-reveal-delay" as string]: `${delay}ms`,
    ["--mobile-reveal-duration" as string]: `${duration}ms`,
    ["--mobile-reveal-rotate" as string]: `${rotate}deg`,
  };

  return (
    <Component
      ref={ref}
      className={`mobile-reveal-element ${isRevealed ? "is-revealed" : ""} ${className}`}
      style={customStyles}
      {...props}
    >
      {children}
    </Component>
  );
}

export { MobileReveal as ScrollReveal };
