import ScrollSequence from "@/components/ScrollSequence";
import MarqueeBanner from "@/components/MarqueeBanner";
import ScrollIndicator from "@/components/ScrollIndicator";
import HeroSecondarySection from "@/components/HeroSecondarySection";
import CampusExcellenceSection from "@/components/CampusExcellenceSection";

export default function Home() {
  return (
    <main className="relative bg-black">
      {/* Sticky Stacking Cascade Container */}
      <div className="relative w-full">
        {/* Section 1: Hero Section (600vh scroll sequence, z-index 10) */}
        <section data-theme="light" className="h-[600vh] relative z-10">
          <ScrollSequence />
          <ScrollIndicator />
        </section>

        {/* Independent Sticky Running Text Banner (z-index 40, top: var(--header-height)) */}
        <div className="running-text-sticky">
          <MarqueeBanner />
        </div>

        {/* Section 2: Secondary Hero Section (Sticky top-0, z-index 20) */}
        <HeroSecondarySection />

        {/* Section 3: Dark Navy Section - Dua Ruang. Satu Perjalanan. (Sticky top-0, z-index 30) */}
        <CampusExcellenceSection />
      </div>
    </main>
  );
}



