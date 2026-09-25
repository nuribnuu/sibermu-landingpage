"use client";

let activeAnimationId: number | null = null;

/**
 * Calculates a dynamic scroll duration proportional to the scroll distance in pixels.
 * Provides consistent visual velocity across short, medium, and long scrolls.
 */
export function calculateDynamicDuration(absDistance: number): number {
  const MIN_DURATION = 500;  // ms for short distances (e.g. adjacent sections)
  const MAX_DURATION = 1500; // ms for long distances (e.g. Hero to Footer)

  // Formula: Base 450ms + 0.15ms per pixel of distance, clamped between MIN and MAX.
  // Example distances:
  // - 500px  => 525ms
  // - 1500px => 675ms
  // - 3000px => 900ms
  // - 6000px => 1350ms
  // - 8000px+ => 1500ms
  const calculated = 450 + absDistance * 0.15;
  return Math.min(MAX_DURATION, Math.max(MIN_DURATION, Math.round(calculated)));
}

/**
 * Returns the exact cumulative scroll Y position for a given section ID,
 * taking into account desktop sticky stacking heights or mobile fixed header offsets.
 */
export function getTargetScrollTop(targetId: string): number {
  if (typeof window === "undefined") return 0;
  if (!targetId || targetId === "hero" || targetId === "#hero") return 0;

  const cleanId = targetId.replace(/^\/?#/, "");

  const sectionIds = [
    "hero",
    "hero-secondary",
    "dua-dunia",
    "life-at-sibermu",
    "prestasi",
    "layanan-mahasiswa",
    "aik",
    "masjid-amal-mulya",
    "closing-cta",
  ];

  const isDesktop = window.innerWidth >= 1024;
  const targetIndex = sectionIds.indexOf(cleanId);

  if (targetIndex === -1) {
    // Fallback for custom elements outside sectionIds
    const targetEl = document.getElementById(cleanId);
    if (!targetEl) return 0;
    const top = targetEl.getBoundingClientRect().top + window.scrollY;
    const offset = isDesktop ? 0 : 80;
    return Math.max(0, top - offset);
  }

  // Calculate cumulative scroll Y position for stacked sections
  let totalTop = 0;
  for (let i = 0; i < targetIndex; i++) {
    const sec = document.getElementById(sectionIds[i]);
    if (sec) {
      totalTop += sec.offsetHeight;
    }
  }

  if (!isDesktop) {
    // Mobile viewport offset for sticky header + marquee banner
    let headerMarqueeTotal = 80;
    const cssVal = getComputedStyle(document.documentElement)
      .getPropertyValue("--header-marquee-total");
    if (cssVal) {
      headerMarqueeTotal = parseInt(cssVal, 10) || 80;
    }
    // Subtract header height + 8px padding buffer so section heading is not obscured
    totalTop = Math.max(0, totalTop - headerMarqueeTotal - 8);
  }

  return totalTop;
}

/**
 * Custom smooth scroll using requestAnimationFrame with cubic ease-in-out curve.
 * @param targetY The target vertical scroll position in pixels
 * @param customDuration Optional explicit duration in milliseconds. If omitted, duration is calculated dynamically based on distance.
 * @param onComplete Optional callback when scroll animation completes
 */
export function smoothScrollTo(
  targetY: number,
  customDuration?: number,
  onComplete?: () => void
): void {
  if (typeof window === "undefined") return;

  // Cancel any currently running smooth scroll animation to prevent conflicts
  if (activeAnimationId !== null) {
    cancelAnimationFrame(activeAnimationId);
    activeAnimationId = null;
  }

  const startY = window.scrollY || window.pageYOffset;
  const distance = targetY - startY;
  const absDistance = Math.abs(distance);

  // If distance is negligible, scroll instantly and finish
  if (absDistance < 2) {
    window.scrollTo(0, targetY);
    if (onComplete) onComplete();
    return;
  }

  // Calculate dynamic duration if customDuration is not specified
  const duration =
    typeof customDuration === "number" && customDuration > 0
      ? customDuration
      : calculateDynamicDuration(absDistance);

  const html = document.documentElement;
  const originalScrollBehavior = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto"; // Prevent browser native smooth-scroll damping conflict

  const startTime = performance.now();

  // Cubic Ease-In-Out for luxurious, smooth, non-abrupt motion
  const easeInOutCubic = (t: number): number => {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const cleanup = () => {
    html.style.scrollBehavior = originalScrollBehavior;
    activeAnimationId = null;
  };

  const step = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * easeProgress);

    if (progress < 1) {
      activeAnimationId = requestAnimationFrame(step);
    } else {
      window.scrollTo(0, targetY);
      cleanup();
      if (onComplete) onComplete();
    }
  };

  activeAnimationId = requestAnimationFrame(step);
}

/**
 * Convenience helper to scroll to a section ID smoothly with header offset and dynamic duration
 */
export function smoothScrollToTarget(
  targetId: string,
  customDuration?: number,
  onComplete?: () => void
): void {
  const targetY = getTargetScrollTop(targetId);
  smoothScrollTo(targetY, customDuration, onComplete);
}
