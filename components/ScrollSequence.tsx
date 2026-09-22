"use client";

import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 180;
const currentFramePath = (index: number) => {
  const frameStr = String(index).padStart(3, "0");
  return `/assets/ezgif-frame-${frameStr}.png`;
};

interface ScrollSequenceProps {
  onProgress?: (progress: number) => void;
  onLoaded?: () => void;
}

export default function ScrollSequence({
  onProgress,
  onLoaded,
}: ScrollSequenceProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  const onProgressRef = useRef(onProgress);
  const onLoadedRef = useRef(onLoaded);

  useEffect(() => {
    onProgressRef.current = onProgress;
    onLoadedRef.current = onLoaded;
  }, [onProgress, onLoaded]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const images: HTMLImageElement[] = [];
    let loadedCount = 0;
    let currentFrameIndex = 1;
    let targetFrameIndex = 1;
    let animationFrameId: number;

    const renderFrame = (index: number) => {
      const img = images[index];
      if (!img || !img.complete) return;

      // 1. Fallback Background Safety Net: isi canvas dengan warna senada foto hero (bukan hitam)
      const bgGradient = context.createLinearGradient(0, 0, 0, canvas.height);
      bgGradient.addColorStop(0, "#b2c4d6");
      bgGradient.addColorStop(1, "#9cb2c7");
      context.fillStyle = bgGradient;
      context.fillRect(0, 0, canvas.width, canvas.height);

      const isMobile = window.innerWidth < 768;
      const imgRatio = img.width / img.height;
      const canvasRatio = canvas.width / canvas.height;
      let drawWidth: number, drawHeight: number, drawX: number, drawY: number;

      if (isMobile) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
        drawX = 0;

        if (drawHeight < canvas.height) {
          drawHeight = canvas.height;
          drawWidth = canvas.height * imgRatio;
          drawX = (canvas.width - drawWidth) / 2;
          drawY = 0;
        } else {
          drawY = (canvas.height - drawHeight) * 0.05;
        }
      } else {
        if (canvasRatio > imgRatio) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgRatio;
          drawX = 0;
          drawY = (canvas.height - drawHeight) / 2;
        } else {
          drawHeight = canvas.height;
          drawWidth = canvas.height * imgRatio;
          drawX = (canvas.width - drawWidth) / 2;
          drawY = (canvas.height - drawHeight) * 0.15;
        }
      }

      context.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    };

    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      renderFrame(currentFrameIndex);
    };

    let isFinished = false;
    let fallbackTimeoutTimer: NodeJS.Timeout;

    const onPreloadComplete = () => {
      if (isFinished) return;
      isFinished = true;
      if (fallbackTimeoutTimer) clearTimeout(fallbackTimeoutTimer);
      setIsLoaded(true);
      setProgress(100);
      if (onProgressRef.current) onProgressRef.current(100);
      if (onLoadedRef.current) onLoadedRef.current();
      updateCanvasSize();
      renderFrame(1);
    };

    const preloadImages = () => {
      fallbackTimeoutTimer = setTimeout(() => {
        if (!isFinished) {
          onPreloadComplete();
        }
      }, 10000);

      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        let loaded = false;

        const handleLoad = () => {
          if (loaded) return;
          loaded = true;
          loadedCount++;
          const currentPercent = Math.min(
            100,
            Math.floor((loadedCount / TOTAL_FRAMES) * 100),
          );
          setProgress(currentPercent);
          if (onProgressRef.current) onProgressRef.current(currentPercent);
          if (loadedCount >= TOTAL_FRAMES) {
            onPreloadComplete();
          }
        };

        img.onload = handleLoad;
        img.onerror = handleLoad;
        img.src = currentFramePath(i);
        images[i] = img;
      }
    };

    const updateFrameOnScroll = () => {
      const heroSection = document.getElementById("hero");
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      let heroTop = 0;
      let heroHeight = window.innerHeight * 3.0;

      if (heroSection) {
        heroTop = heroSection.offsetTop;
        heroHeight = heroSection.offsetHeight;
      }

      const relativeScroll = scrollTop - heroTop;
      const maxPinScroll = heroHeight - window.innerHeight; // Point where Section 2 starts sliding up from bottom
      const totalScroll = heroHeight; // Point where Section 2 100% covers Section 1

      if (totalScroll <= 0) return;

      // Touch EXPLORE happens at Frame 105.
      // Pinning ends at Frame 168 (OVERLAP_START_FRAME: character has dissolved into wisps/smoke & transparent headset per ezgif-frame-180.png).
      // During overlap (Section 2 slide-up), frames move 168 -> 200 as Section 2 covers Section 1.
      const TOUCH_FRAME = 105;
      const PIN_END_FRAME = 160;
      const OVERLAP_END_FRAME = 180;
      const STAGE1_RATIO = 0.65;

      let calculatedFrame: number;

      if (relativeScroll <= maxPinScroll) {
        const pinProgress = Math.max(0, relativeScroll / maxPinScroll);
        if (pinProgress <= STAGE1_RATIO) {
          const p1 = pinProgress / STAGE1_RATIO;
          calculatedFrame = 1 + Math.floor(p1 * (TOUCH_FRAME - 1));
        } else {
          const p2 = (pinProgress - STAGE1_RATIO) / (1 - STAGE1_RATIO);
          calculatedFrame =
            TOUCH_FRAME + Math.floor(p2 * (PIN_END_FRAME - TOUCH_FRAME));
        }
      } else {
        // Section 2 is actively sliding up from bottom to top over Section 1
        const overlapProgress = Math.min(
          1,
          (relativeScroll - maxPinScroll) / window.innerHeight,
        );
        calculatedFrame =
          PIN_END_FRAME +
          Math.floor(overlapProgress * (OVERLAP_END_FRAME - PIN_END_FRAME));
      }

      const frameIndex = Math.min(TOTAL_FRAMES, Math.max(1, calculatedFrame));
      targetFrameIndex = frameIndex;
    };

    const animate = () => {
      if (currentFrameIndex !== targetFrameIndex) {
        currentFrameIndex = targetFrameIndex;
        renderFrame(currentFrameIndex);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", updateFrameOnScroll, { passive: true });
    window.addEventListener("resize", () => {
      updateCanvasSize();
      updateFrameOnScroll();
    });
    window.addEventListener("orientationchange", () => {
      updateCanvasSize();
      updateFrameOnScroll();
    });

    preloadImages();
    updateFrameOnScroll();
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (fallbackTimeoutTimer) clearTimeout(fallbackTimeoutTimer);
      window.removeEventListener("scroll", updateFrameOnScroll);
      window.removeEventListener("resize", updateCanvasSize);
      window.removeEventListener("orientationchange", updateCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="hero-lightpass"
      className="fixed top-0 left-0 w-full max-w-full h-[100dvh] z-10 pointer-events-none object-cover block"
    />
  );
}
