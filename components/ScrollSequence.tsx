"use client";

import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 209;

const currentFramePath = (index: number) => {
  const frameStr = String(index).padStart(3, "0");
  return `/assets/ezgif-frame-${frameStr}.png`;
};

export default function ScrollSequence() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

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
        // MOBILE (< 768px): Hybrid Fill - canvas selalu terisi 100dvh penuh tanpa area hitam/kosong,
        // subjek (kepala, VR, wajah & tangan) diposisikan di focal area teratas.
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
        // DESKTOP & TABLET (>= 768px): Cover mode dengan focal position terfokus di bagian atas-tengah
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

    const onPreloadComplete = () => {
      setIsLoaded(true);
      updateCanvasSize();
      renderFrame(1);
    };

    const preloadImages = () => {
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = currentFramePath(i);
        const handleLoad = () => {
          loadedCount++;
          if (loadedCount === TOTAL_FRAMES) {
            onPreloadComplete();
          }
        };
        img.onload = handleLoad;
        img.onerror = handleLoad;
        images[i] = img;
      }
    };

    const updateFrameOnScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const maxScrollTop =
        document.documentElement.scrollHeight - window.innerHeight;
      if (maxScrollTop <= 0) return;
      const scrollFraction = Math.min(1, Math.max(0, scrollTop / maxScrollTop));

      const frameIndex = Math.min(
        TOTAL_FRAMES,
        Math.max(1, Math.floor(scrollFraction * TOTAL_FRAMES) + 1)
      );
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
    window.addEventListener("resize", updateCanvasSize);
    window.addEventListener("orientationchange", updateCanvasSize);

    preloadImages();
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", updateFrameOnScroll);
      window.removeEventListener("resize", updateCanvasSize);
      window.removeEventListener("orientationchange", updateCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Preloader Overlay */}
      <div
        id="loader"
        className={`fixed inset-0 z-[1000] flex items-center justify-center bg-black transition-all duration-500 ease-in-out ${
          isLoaded ? "opacity-0 pointer-events-none invisible" : "opacity-100"
        }`}
      >
        <div className="w-10 h-10 border-[3px] border-white/10 border-t-white rounded-full animate-spin" />
      </div>

      {/* Frame Sequence Canvas (100dvh full viewport height) */}
      <canvas
        ref={canvasRef}
        id="hero-lightpass"
        className="fixed top-0 left-0 w-screen h-[100dvh] z-10 pointer-events-none object-cover block"
      />
    </>
  );
}
