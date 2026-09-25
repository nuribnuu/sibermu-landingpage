"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollSequence from "@/components/ScrollSequence";
import MarqueeBanner from "@/components/MarqueeBanner";
import ScrollIndicator from "@/components/ScrollIndicator";
import HeroSecondarySection from "@/components/HeroSecondarySection";
import TwoSpacesSection from "@/components/TwoSpacesSection";
import StudentOrganizationsSection from "@/components/StudentOrganizationsSection";
import AchievementsSection from "@/components/AchievementsSection";
import ServicesSection from "@/components/ServicesSection";
import AikActivitiesSection from "@/components/AikActivitiesSection";
import CoreValuesSection from "@/components/CoreValuesSection";
import ClosingCtaSection from "@/components/ClosingCtaSection";
import FooterSection from "@/components/FooterSection";
import FloatingContactButton from "@/components/FloatingContactButton";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("sibermu_loaded") === "true") {
        setIsLoading(false);
      }
    } catch {
      // ignore fallback
    }
  }, []);

  return (
    <main className="relative bg-black">
      {/* Full-Screen Radial Gradient Loading Screen Overlay */}
      {isLoading && (
        <LoadingScreen
          progress={progress}
          isLoaded={isLoaded}
          onComplete={() => setIsLoading(false)}
        />
      )}

      {/* Header and Mobile Bottom Navigation Bar - ONLY rendered when loading is false */}
      {!isLoading && (
        <>
          <Header />
          <FloatingContactButton />
        </>
      )}

      {/* Sticky Stacking Cascade Container */}
      <div className="relative w-full">
        {/* Section 1: Hero Section (420vh scroll sequence with full disappearing sequence, z-index 10) */}
        <section id="hero" data-theme="light" className="h-[500vh] relative z-10">
          <ScrollSequence
            onProgress={(p) => setProgress(p)}
            onLoaded={() => setIsLoaded(true)}
          />
          <ScrollIndicator />
        </section>

        {/* Section 2 to Section 9 Track Container for Native Sticky Marquee */}
        <div className="relative w-full">
          {/* Native CSS Sticky Marquee Container (z-index 95, top: var(--header-height)) */}
          <div className="sticky top-[var(--header-height)] z-[95] w-full h-0 pointer-events-none">
            <div className="pointer-events-auto">
              <MarqueeBanner />
            </div>
          </div>

          {/* Section 2: Secondary Hero Section (Sticky top-0, z-index 20) */}
          <HeroSecondarySection />

          {/* Section 3: Dark Navy Section - Dua Ruang. Satu Perjalanan. (Sticky top-0, z-index 30, id="dua-dunia") */}
          <TwoSpacesSection />

          {/* Section 4: Light Section - Life at SIBERMU (Sticky top-0, z-index 40, id="life-at-sibermu") */}
          <StudentOrganizationsSection />

          {/* Section 5: Dark Navy Section - Prestasi (Sticky top-0, z-index 50, id="prestasi") */}
          <AchievementsSection />

          {/* Section 6: Light Section - Layanan Mahasiswa (Sticky top-0, z-index 60, id="layanan-mahasiswa") */}
          <ServicesSection />

          {/* Section 7: Dark Navy Section - AIK (Sticky top-0, z-index 70, id="aik") */}
          <AikActivitiesSection />

          {/* Section 8: Light Section - Masjid Amal Mulya / Nilai Kemuhammadiyahan (Sticky top-0, z-index 80, id="masjid-amal-mulya") */}
          <CoreValuesSection />

          {/* Section 9: Dark Navy Section - Closing CTA (Sticky top-0, z-index 90, id="closing-cta") */}
          <ClosingCtaSection />

          {/* Section 10: Light Section - Full-Width Footer (id="footer") */}
          <FooterSection />
        </div>
      </div>
    </main>
  );
}
