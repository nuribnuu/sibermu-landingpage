import ScrollSequence from "@/components/ScrollSequence";
import MarqueeBanner from "@/components/MarqueeBanner";
import ScrollIndicator from "@/components/ScrollIndicator";

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

        {/* Section 2: Feature Section (Sticky top-0, z-index 20) */}
        <section
          data-theme="light"
          className="sticky top-0 h-screen h-[100dvh] bg-slate-50 text-[#1A2A5B] relative z-20 flex flex-col justify-center items-center overflow-hidden pt-24 sm:pt-32"
        >
          <div className="max-w-4xl text-center space-y-6 px-8">
            <span className="text-emerald-600 font-semibold text-sm tracking-wider uppercase">
              Transformasi Digital Pendidikan
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1A2A5B]">
              Pembelajaran Tanpa Batas Ruang & Waktu
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Universitas Siber Muhammadiyah menghadirkan ekosistem perkuliahan digital berbasis teknologi mutakhir untuk membentuk lulusan yang berdaya saing global.
            </p>
          </div>
        </section>

        {/* Section 3: Campus Section (Sticky top-0 full viewport, z-index 30) */}
        <section
          data-theme="dark"
          className="sticky top-0 h-screen h-[100dvh] bg-[#0b091f] text-white px-8 pt-24 sm:pt-32 relative z-30 flex flex-col justify-center items-center overflow-hidden"
        >
          <div className="max-w-4xl text-center space-y-6">
            <span className="text-emerald-400 font-semibold text-sm tracking-wider uppercase">
              Keunggulan SiberMu
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Inovasi Akademik & Nilai Islam Berkemajuan
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
              Menggabungkan keunggulan akademik, fleksibilitas perkuliahan online, dan pembinaan karakter Islami yang kokoh.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
