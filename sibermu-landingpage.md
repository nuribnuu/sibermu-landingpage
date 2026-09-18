# BRIEF WEBSITE LOMBA SIBERMU

## Konsep, Struktur Halaman, Copywriting, UI/UX, dan Animasi

Saya sarankan website ini **jangan dibuat seperti website kampus biasa** yang isinya hanya teks, kartu berita, dan foto kegiatan. Karena ruang lingkup lombanya hanya **Kemahasiswaan** dan **Al-Islam & Kemuhammadiyahan**, kita bisa membuatnya seperti **digital experience tentang kehidupan mahasiswa SiberMu**: modern, digital, interaktif, tetapi tetap membawa karakter Islam Berkemajuan.

SiberMu sendiri memosisikan pembelajaran sebagai pendidikan siber yang fleksibel dan berbasis nilai Islam berkemajuan, sementara struktur kelembagaan 2026–2029 juga menempatkan AIK dan Kemahasiswaan sebagai satu rumpun pengelolaan. ([Universitas Siber Muhammadiyah - SiberMu][1])

---

# 1. BIG IDEA WEBSITE

### Konsep utama

> **“Bertumbuh dengan Ilmu, Berkarya dengan Nilai.”**

Website memperlihatkan bahwa mahasiswa SiberMu tidak hanya:

**belajar → lulus**

tetapi:

**Belajar → Bertumbuh → Berorganisasi → Berprestasi → Mengabdi**

dan seluruh proses tersebut berada dalam landasan:

**Al-Islam & Kemuhammadiyahan**

Secara visual, konsepnya adalah:

> **Digital Campus × Student Life × Islamic Values**

Jadi feel website:

**Modern — Clean — Dynamic — Human — Digital — Islamic — Premium**

Bukan:

**formal — kaku — penuh teks — seperti portal akademik.**

---

# 2. SITEMAP WEBSITE

Karena Anda sudah menetapkan bahwa **header menggunakan tombol yang berpindah halaman**, saya sarankan struktur:

```text
/
├── Beranda
│
├── Kemahasiswaan
│   ├── Organisasi & UKM
│   ├── Pengembangan Mahasiswa
│   ├── Prestasi
│   └── Layanan Mahasiswa
│
├── Al-Islam & Kemuhammadiyahan
│   ├── Tentang AIK
│   ├── Nilai Islam Berkemajuan
│   ├── Pembinaan AIK
│   └── Kemuhammadiyahan
│
├── Kegiatan
│   ├── Kegiatan Kemahasiswaan
│   └── Kegiatan AIK
│
└── Tentang SiberMu
    └── Identitas / Nilai
```

Tetapi supaya pengerjaan lomba **tidak terlalu besar**, secara implementasi saya sarankan cukup **7 route utama**:

```text
/
 /kemahasiswaan
 /organisasi
 /prestasi
 /layanan
 /aik
 /kegiatan
 /nilai
```

Header:

**Beranda | Kemahasiswaan | Prestasi | Layanan | AIK & Kemuhammadiyahan | Kegiatan**

Tombol **Tentang SiberMu** cukup ditempatkan di footer karena bukan fokus utama lomba.

---

# 3. GLOBAL HEADER

## Desktop

Header sticky di bagian atas.

```text
┌──────────────────────────────────────────────────────────────────┐
│  [SIBERMU]    Beranda  Kemahasiswaan  Prestasi  Layanan  AIK  Kegiatan │
│                                                   [Explore →]   │
└──────────────────────────────────────────────────────────────────┘
```

### Behavior

Saat scroll:

Header berubah dari:

**transparent → white/blur**

dengan shadow sangat tipis.

Menu aktif menggunakan pill:

```text
[ Kemahasiswaan ]
```

bukan sekadar underline.

### Mobile

```text
[SIBERMU]                         ☰
```

Klik hamburger:

```text
Beranda
Kemahasiswaan
Prestasi
Layanan
AIK & Kemuhammadiyahan
Kegiatan

[ Jelajahi SiberMu ]
```

---

# 4. BERANDA

Ini harus menjadi halaman paling kuat secara visual.

## SECTION 01 — HERO

### Headline

> **Bertumbuh dengan Ilmu.
> Berkarya dengan Nilai.**

### Subheadline

> Kehidupan mahasiswa SiberMu adalah ruang untuk belajar, berkembang, berprestasi, dan memberi manfaat dengan berlandaskan nilai Al-Islam dan Kemuhammadiyahan.

### CTA

**Jelajahi Kemahasiswaan →**

**Kenali AIK →**

### Visual

Gunakan **split layout**:

Kiri:

Headline + copy + CTA

Kanan:

Komposisi foto/video mahasiswa SiberMu.

Jangan menggunakan foto mahasiswa sekadar formal sedang tersenyum.

Lebih bagus:

- laptop
- diskusi
- organisasi
- presentasi
- kegiatan sosial
- kajian
- masjid

Gabungkan dengan visual digital seperti:

```text
gradient glow
+
grid
+
floating card
+
small UI elements
```

---

# 5. BERANDA — SECTION “DUA DUNIA”

Setelah hero, tampilkan konsep utama website.

### Headline

> **Dua Ruang. Satu Perjalanan.**

Dua kartu besar:

### CARD 01

**KEMAHASISWAAN**

> Tempat mahasiswa mengembangkan potensi, membangun jejaring, berorganisasi, berprestasi, dan mempersiapkan diri menghadapi dunia profesional.

Button:

**Jelajahi Kemahasiswaan →**

### CARD 02

**AL-ISLAM & KEMUHAMMADIYAHAN**

> Nilai yang menjadi landasan dalam membentuk mahasiswa yang berilmu, berakhlak, dan berkemajuan.

Button:

**Kenali AIK →**

### UI

Dua card besar yang ketika hover:

- card naik 6px
- image bergerak perlahan
- gradient berubah
- arrow bergeser kanan

---

# 6. BERANDA — “LIFE AT SIBERMU”

### Headline

> **Lebih dari Sekadar Kuliah**

Copy:

> Di SiberMu, mahasiswa memiliki ruang untuk mengembangkan kemampuan akademik, soft skill, minat dan bakat, organisasi, karier, hingga kontribusi kepada masyarakat.

Empat feature:

```text
01
Organisasi
Berlatih memimpin dan berkolaborasi.

02
Pengembangan Diri
Mengasah soft skill dan potensi.

03
Prestasi
Membawa karya mahasiswa ke tingkat nasional maupun internasional.

04
Kontribusi
Menghadirkan ilmu dalam masyarakat.
```

Dokumen resmi SiberMu memang mencatat layanan minat-bakat, soft skill, pengembangan karier, lomba/prestasi, konseling dan bimbingan akademik. ([spmi.sibermu -][2])

---

# 7. BERANDA — PRESTASI

Visual jangan seperti tabel.

Gunakan **horizontal achievement cards**.

### Headline

> **Mahasiswa yang Berkarya**

Subheadline:

> Prestasi menjadi salah satu ruang bagi mahasiswa SiberMu untuk menguji gagasan, kreativitas, dan kemampuan mereka di luar ruang perkuliahan.

Kategori filter:

```text
Semua
Akademik
Nonakademik
Nasional
Internasional
Publikasi
```

Contoh card:

### TOP 5

**Youth Innovation Forum**

Singapore — Malaysia — Thailand

**Internasional**

---

### JUARA 1

**ADRENALINE Essay Writing Competition**

**Regional Jawa–Bali**

---

### JUARA 2

**Medical Scientific Competition and Award**

**Nasional**

---

### PUBLIKASI

**Penelitian Mahasiswa**

**Jurnal Nasional Terakreditasi**

Data prestasi tersebut bersumber dari laporan dan publikasi resmi SiberMu. ([Sistem Informasi][3])

CTA:

**Lihat Seluruh Prestasi →**

---

# 8. BERANDA — AIK

Bagian ini harus menjadi salah satu **signature section** website.

Background sedikit berbeda.

### Headline

> **Ilmu yang Berakar pada Nilai**

Copy:

> Al-Islam dan Kemuhammadiyahan menjadi bagian penting dalam perjalanan pendidikan mahasiswa SiberMu. Nilai Islam menjadi landasan untuk mengembangkan ilmu, teknologi, akhlak, dan kemanfaatan bagi masyarakat.

SiberMu secara resmi menyatakan AIK sebagai sumber nilai setiap aktivitas institusi, sementara Muhammadiyah menempatkan AIK sebagai ciri khas pendidikan tinggi Muhammadiyah dan 'Aisyiyah. ([Universitas Siber Muhammadiyah - SiberMu][1])

Visual:

```text
         ILMU
          │
     AL-ISLAM & AIK
      /     |      \
   AKHLAK  ILMU   AMAL
      \     |      /
        BERKEMAJUAN
```

CTA:

**Eksplorasi AIK →**

---

# 9. BERANDA — ISLAM BERKEMAJUAN

### Headline

> **Murni. Modern. Moderat. Manfaat.**

Empat item horizontal:

### MURNI

Berpegang pada nilai Islam.

### MODERN

Terbuka terhadap ilmu dan perkembangan zaman.

### MODERAT

Menghadirkan Islam yang berorientasi pada kemaslahatan.

### MANFAAT

Ilmu diwujudkan menjadi kontribusi.

Empat kata ini digunakan dalam materi resmi Muhammadiyah untuk menjelaskan orientasi Islam Berkemajuan. ([Universitas Siber Muhammadiyah - SiberMu][1])

Animasi:

Ketika section masuk viewport:

```text
MURNI → muncul
MODERN → muncul
MODERAT → muncul
MANFAAT → muncul
```

dengan stagger 100–150ms.

---

# 10. BERANDA — MASJID AMAL MULYA

### Headline

> **Masjid yang Menghidupkan Kebersamaan**

Copy:

> Masjid Amal Mulya menjadi ruang ibadah, pembinaan, kajian, interaksi sosial, dan penguatan hubungan antara sivitas akademika SiberMu dengan masyarakat.

Kegiatan yang dapat ditampilkan:

```text
Subuh Berjamaah
Subuh Bergizi
Kajian AIK
Kajian Hadis
Baca Tulis Al-Qur'an
Kegiatan Sosial Islami
```

Kegiatan tersebut tercantum dalam laporan resmi SiberMu.

Visual:

Foto masjid besar + overlay floating cards:

```text
KAJIAN AIK
SUBUH BERJAMAAH
BTA
KEGIATAN SOSIAL
```

---

# 11. BERANDA — CTA PENUTUP

Full-width section.

### Headline

> **Temukan Perjalananmu di SiberMu.**

Subheadline:

> Belajar. Bertumbuh. Berprestasi. Memberi manfaat.

CTA:

**Jelajahi Kemahasiswaan**

**Eksplorasi AIK**

---

# 12. HALAMAN KEMAHAasiswaan

Route:

`/kemahasiswaan`

Hero:

> **Bukan Sekadar Mahasiswa.
> Jadilah Bagian dari Perjalanan.**

Subheadline:

> Ruang untuk mengembangkan potensi, membangun pengalaman, menciptakan karya, dan memberi dampak.

---

## Section: “Student Journey”

Gunakan horizontal timeline:

```text
01
JOIN
↓
02
EXPLORE
↓
03
CREATE
↓
04
ACHIEVE
↓
05
CONTRIBUTE
```

Copy:

**JOIN**
Memulai perjalanan sebagai bagian dari SiberMu.

**EXPLORE**
Menemukan minat, potensi dan lingkungan belajar.

**CREATE**
Menghasilkan karya dan pengalaman.

**ACHIEVE**
Mengikuti kompetisi dan menghasilkan prestasi.

**CONTRIBUTE**
Menggunakan ilmu untuk memberikan manfaat.

Ini menjadi elemen storytelling utama.

---

# 13. HALAMAN ORGANISASI

Route:

`/organisasi`

Hero:

> **Temukan Ruang untuk Bertumbuh Bersama.**

Copy:

> Organisasi dan Unit Kegiatan Mahasiswa menjadi ruang bagi mahasiswa untuk mengembangkan kepemimpinan, minat, bakat, kreativitas, komunikasi, dan kemampuan bekerja sama.

Karena daftar lengkap UKM terbaru tidak semuanya tersedia secara publik, developer **jangan membuat nama/logo UKM fiktif**.

Struktur card:

```text
[LOGO]

NAMA UKM

Kategori
Minat / Bakat / Organisasi

Deskripsi singkat

[ Lihat Profil → ]
```

Data yang nantinya dapat diisi:

- Nama
- Logo
- Deskripsi
- Bidang
- Pembina
- Pengurus
- Program kerja
- Prestasi
- Galeri

---

# 14. HALAMAN PRESTASI

Route:

`/prestasi`

Ini harus terasa seperti **digital trophy room**.

Hero:

> **Karya yang Berani Tampil.
> Prestasi yang Layak Dikenang.**

Filter:

```text
Semua
Akademik
Nonakademik
Nasional
Internasional
Publikasi
```

Card format:

```text
┌────────────────────────────┐
│        [ FOTO ]            │
│                            │
│ JUARA 1                    │
│ Nama Kompetisi             │
│                            │
│ Nama Mahasiswa             │
│ Program Studi              │
│                            │
│ Nasional        2024       │
└────────────────────────────┘
```

Hover:

Foto zoom 1.04x + informasi muncul.

---

# 15. HALAMAN LAYANAN

Route:

`/layanan`

Hero:

> **Semua yang Kamu Butuhkan,
> Ada di Sini.**

Cari layanan:

```text
[ 🔍 Cari layanan mahasiswa... ]
```

Kategori:

### AKADEMIK

- KRS
- Panduan Akademik
- LMS
- Tugas Akhir
- Penilaian
- Aduan Nilai
- MBKM

### ADMINISTRASI

- Cuti
- Aktif Kembali
- Pengunduran Diri
- Pindah Program Studi
- KTM
- Yudisium

### DIGITAL

- Portal Mahasiswa
- LMS
- Perpustakaan
- Repository
- E-Resources
- E-Lab

### PENGEMBANGAN

- Bimbingan
- Konseling
- Soft Skill
- Karier
- Minat & Bakat
- Prestasi

Layanan seperti KRS, LMS, akademik, cuti, aktif kembali, pengunduran diri, KTM, tugas akhir dan layanan terkait memang tersedia dalam ekosistem layanan resmi SiberMu. ([Universitas Siber Muhammadiyah - SiberMu][4])

### UX penting

Jangan membuat 20 tombol langsung terlihat.

Gunakan:

**Category → Card → Detail**

Misalnya:

> Akademik
> → KRS
> → halaman/detail panduan

---

# 16. HALAMAN AIK

Route:

`/aik`

Hero:

> **Ilmu yang Berakar.
> Teknologi yang Berdampak.**

Copy:

> Al-Islam dan Kemuhammadiyahan menjadi landasan nilai dalam perjalanan pendidikan di SiberMu.

---

## Section: Apa Itu AIK?

Gunakan layout editorial.

### Kiri

Big typography:

> **AIK**

### Kanan

> Al-Islam dan Kemuhammadiyahan merupakan bagian penting dari identitas pendidikan Muhammadiyah. AIK mencakup pemahaman dan pengamalan Islam sekaligus pemahaman terhadap Muhammadiyah sebagai gerakan Islam berkemajuan.

Secara konseptual, pedoman AIK Muhammadiyah mencakup rumpun **kemanusiaan dan keimanan; ibadah, akhlak dan muamalah; Kemuhammadiyahan; serta Islam dan ilmu pengetahuan.**

---

# 17. AIK DALAM PERJALANAN KULIAH

Visual dibuat seperti journey.

```text
AIK 01
Memahami

        ↓

AIK 02
Menghayati & Mengamalkan

        ↓

AIK 03
Memahami Kemuhammadiyahan
```

Jangan mengunci deskripsi mata kuliah secara terlalu spesifik untuk seluruh prodi karena struktur kurikulum bisa berbeda.

Untuk prodi yang datanya tersedia, developer dapat menghubungkan detail masing-masing program studi.

---

# 18. HALAMAN NILAI

Route:

`/nilai`

Hero:

> **Nilai yang Mengarahkan Ilmu.**

Kemudian empat kartu besar:

# MURNI

> Menjaga kemurnian nilai Islam sebagai landasan kehidupan.

# MODERN

> Mengembangkan cara berpikir dan kemampuan untuk menjawab tantangan zaman.

# MODERAT

> Mengedepankan keseimbangan, keterbukaan dan kemaslahatan.

# MANFAAT

> Menjadikan ilmu sebagai jalan untuk memberi manfaat.

Kemudian section:

### MIRACLE

Tampilkan nilai inti SiberMu:

**M — Berkemajuan**
**I — Ihsan**
**R — Respect**
**A — Inspirative**
**C — Creative**
**H — Helpful**
**I — Innovative**

Ini dapat menjadi visual interaktif:

```text
             M
             │
      I ─────┼───── R
             │
      A ─────┼───── C
             │
         H ──┼── I
```

Atau lebih clean:

**M I R A C L E**

setiap huruf dapat di-hover untuk menampilkan penjelasan.

Nilai MIRACLE tercantum dalam Laporan Rektor SiberMu 2024.

---

# 19. HALAMAN KEGIATAN

Route:

`/kegiatan`

Gunakan layout seperti **digital magazine**.

Filter:

```text
Semua
Kemahasiswaan
AIK
Prestasi
Sosial
```

Card:

```text
[IMAGE]

AIK
Kajian...

12 SEP 2026

Judul kegiatan

Lihat Cerita →
```

Klik card → halaman detail:

```text
Foto hero
Judul
Kategori
Tanggal
Isi
Galeri
Related event
```

---

# 20. SECTION KHUSUS “MASJID AMAL MULYA”

Pada halaman kegiatan, buat satu featured story besar:

> **Masjid Amal Mulya**

> Dari ruang ibadah menjadi ruang kebersamaan, pembinaan, dan kontribusi sosial.

Kemudian:

```text
Subuh Berjamaah
Kajian
BTA
Subuh Bergizi
Kegiatan Sosial
```

Ini bisa menjadi salah satu visual paling kuat untuk menunjukkan **AIK yang benar-benar hidup**, bukan hanya teori.

---

# 21. FOOTER

Footer jangan terlalu besar.

```text
SIBERMU

Bertumbuh dengan Ilmu.
Berkarya dengan Nilai.

KEMAHASISWAAN
Organisasi
Prestasi
Layanan

AIK
Tentang AIK
Nilai
Kegiatan

LINK
Website SiberMu
Portal Mahasiswa
LMS
Perpustakaan

────────────────────────────

© Universitas Siber Muhammadiyah
Yogyakarta
```

---

# 22. DESIGN SYSTEM

## Warna

Karena identitas digital SiberMu saat ini kuat dengan warna biru, gunakan **blue-based visual system** yang diturunkan dari identitas SiberMu, bukan membuat palet baru yang terlalu jauh dari brand resminya. Identitas resmi SiberMu dan logo tersedia pada laman profil resmi. ([Universitas Siber Muhammadiyah - SiberMu][1])

Rekomendasi awal:

```text
Primary Blue      #0866A6
Deep Navy         #08263D
Surface           #F6F9FC
White             #FFFFFF
Text              #10202D
Muted             #64748B
AIK Accent        #16805A
```

**AIK Accent** digunakan hanya sebagai aksen, bukan warna dominan.

---

# 23. TYPOGRAPHY

Saya sarankan:

### Heading

**Plus Jakarta Sans / Manrope**

### Body

**Inter**

Karakter:

```text
Heading:
bold
large
tight line-height

Body:
regular
comfortable
1.6–1.7 line height
```

Hero bisa menggunakan heading:

```text
72px desktop
48px tablet
38px mobile
```

Jangan menggunakan terlalu banyak jenis font.

---

# 24. GRID

Desktop:

```text
Max Width: 1200–1280px
12 Column Grid
Gap: 24px
```

Mobile:

```text
4 Column
Padding: 20px
```

Spacing:

```text
8
12
16
24
32
48
64
96
120
```

Jangan membuat setiap section memiliki padding yang sama. Gunakan rhythm:

**small → medium → large → visual break → medium**

agar halaman terasa editorial.

---

# 25. ANIMASI

Kunci desain:

> **Animation should support storytelling, not show off.**

Gunakan **Framer Motion / Motion** atau library sejenis.

### Page transition

Ketika pindah route:

```text
opacity 0
↓
opacity 1
```

durasi sekitar:

**250–350ms**

---

### Hero

Headline:

```text
opacity + translateY(20px)
```

CTA sedikit terlambat.

Image:

```text
opacity + scale(.96)
→ scale(1)
```

---

### Card

Hover:

```text
translateY(-4px)
shadow increase
```

Jangan menggunakan bounce.

---

### Image

Gunakan subtle zoom:

```text
scale 1
→ 1.04
```

---

### Number/stat

Apabila ada angka statistik resmi, gunakan count-up.

Tetapi **jangan membuat angka statistik fiktif hanya supaya animasi terlihat menarik**.

---

# 26. MICROINTERACTION

Beberapa elemen yang akan membuat website terasa premium:

### Button

Default:

`Jelajahi →`

Hover:

`Jelajahi → →`

Arrow bergerak 4–6px.

### Navigation

Active menu berubah menjadi pill.

### Card

Saat hover:

```text
image zoom
title sedikit naik
arrow muncul
```

### Filter Prestasi

Saat klik:

```text
Old content fade out
New content fade in
```

bukan reload halaman.

---

# 27. UX YANG SANGAT PENTING

### Jangan menggunakan scroll navigation sebagai navigasi utama.

Benar:

```text
Header
↓
Klik Kemahasiswaan
↓
/kemahasiswaan
```

Bukan:

```text
Klik Kemahasiswaan
↓
scroll ke section
```

Tetapi **di dalam halaman tetap boleh ada anchor navigation** untuk halaman panjang.

Contohnya:

```text
Kemahasiswaan
Overview | Organisasi | Pengembangan | Prestasi | Layanan
```

Klik subnav boleh scroll ke section dalam halaman tersebut.

Jadi:

**Global navigation = route/page**

**Local navigation = scroll section**

Ini yang menurut saya paling ideal.

---

# 28. MOBILE UX

Website harus dibuat mobile-first.

Pada mobile:

Hero:

```text
Headline
↓
Subheadline
↓
CTA
↓
Image
```

Jangan:

```text
text + image berdampingan
```

karena akan terlalu sempit.

Card yang desktop 3 kolom:

```text
1
↓
2
↓
3
```

Sedangkan card prestasi bisa menggunakan:

**horizontal swipe carousel**.

---

# 29. ACCESSIBILITY

Minimal:

- contrast ratio aman
- font minimal 16px body
- tombol cukup besar
- keyboard navigable
- alt text semua image
- `prefers-reduced-motion`
- jangan membuat informasi hanya dapat dipahami lewat animasi
- fokus state untuk keyboard

Animasi harus otomatis berhenti/berkurang bagi pengguna yang mengaktifkan reduced motion.

---

# 30. PERFORMANCE

Karena website ini kemungkinan besar dilombakan dari sisi visual, jangan sampai berat.

Developer gunakan:

- WebP/AVIF
- lazy loading image
- responsive image
- compressed video
- jangan autoplay video resolusi besar
- preload hanya font penting
- animasi GPU-friendly
- avoid huge background video

Hero video kalau digunakan harus mempunyai fallback image.

---

# 31. STRUKTUR KOMPONEN

Kalau menggunakan React/Next.js:

```text
components/
│
├── layout/
│   ├── Header
│   ├── Footer
│   ├── MobileMenu
│   └── PageTransition
│
├── ui/
│   ├── Button
│   ├── Card
│   ├── Badge
│   ├── SectionHeading
│   ├── FilterTabs
│   └── ImageReveal
│
├── student/
│   ├── StudentJourney
│   ├── OrganizationCard
│   ├── AchievementCard
│   └── ServiceCard
│
└── aik/
    ├── AikJourney
    ├── ValueCard
    ├── Miracle
    └── ActivityCard
```

Data sebaiknya dipisahkan:

```text
data/
├── achievements.ts
├── organizations.ts
├── services.ts
├── activities.ts
└── aik-values.ts
```

Jadi ketika ada data baru, web developer **tidak perlu membongkar komponen UI**.

---

# 32. STRUKTUR DATA PRESTASI

Contoh:

```javascript
{
  id: 1,
  title: "Youth Innovation Forum",
  category: "Academic",
  level: "International",
  achievement: "Top 5",
  student: "Nama Mahasiswa",
  program: "Program Studi",
  year: 2024,
  image: "/images/prestasi/..."
}
```

Dengan begini filter dapat dibuat otomatis.

---

# 33. STRUKTUR DATA KEGIATAN

```javascript
{
  id: 1,
  title: "Kajian AIK",
  category: "AIK",
  date: "2026-09-...",
  image: "...",
  excerpt: "...",
  content: "..."
}
```

---

# 34. USER FLOW UTAMA

### User datang dari lomba/juri

```text
LANDING
   ↓
Hero
   ↓
Dua dunia
   ↓
Kemahasiswaan / AIK
   ↓
Explore
   ↓
Prestasi / Kegiatan
   ↓
Layanan
   ↓
Closing CTA
```

### Jika user ingin mengetahui mahasiswa

```text
Home
 ↓
Kemahasiswaan
 ↓
Organisasi
 ↓
Prestasi
 ↓
Layanan
```

### Jika user ingin mengetahui AIK

```text
Home
 ↓
AIK
 ↓
Nilai Islam Berkemajuan
 ↓
Kemuhammadiyahan
 ↓
Kegiatan
 ↓
Masjid Amal Mulya
```

---

# 35. KONSEP VISUAL YANG SAYA SARANKAN UNTUK LOMBA

Yang membedakan website ini dari website universitas biasa adalah **storytelling**.

Jangan menjadikan homepage:

```text
Hero
3 card
4 card
6 card
Berita
Footer
```

Itu terlalu generik.

Buat alurnya seperti:

```text
WHO ARE WE?

       ↓

STUDENT LIFE

       ↓

WHAT CAN STUDENTS BECOME?

       ↓

ACHIEVEMENT

       ↓

WHAT GUIDES THEM?

       ↓

AIK

       ↓

HOW DOES IT LIVE?

       ↓

MASJID + ACTIVITIES

       ↓

WHAT VALUE DO THEY CARRY?

       ↓

ISLAM BERKEMAJUAN

       ↓

EXPLORE SIBERMU
```

Ini membuat website terasa seperti **pengalaman**, bukan sekadar kumpulan informasi.

---

# 36. ARAH ART DIRECTION

Saya sarankan style visual:

### **Digital Editorial**

Gabungan:

**Apple-like clean layout**

- **modern university website**
- **subtle Islamic geometry**
- **digital technology aesthetic**

Gunakan:

- rounded rectangle moderat
- grid
- whitespace besar
- typography besar
- image cards
- gradient lembut
- garis tipis
- glass effect secara terbatas
- subtle Islamic geometric pattern

Hindari:

- pattern masjid berlebihan
- ornamen Arab terlalu banyak
- warna hijau penuh
- icon stock yang generik
- animasi berlebihan
- gradient neon berlebihan
- carousel otomatis di mana-mana

Karena identitas utamanya adalah:

> **Universitas Siber Muhammadiyah**

bukan website lembaga dakwah.

---

# 37. SATU ELEMEN VISUAL YANG BISA JADI “SIGNATURE”

Saya sangat menyarankan membuat **“AIK Orbit”**.

Visual:

```text
              ILMU
               ●
               │
      AKHLAK ● ◎ ● TEKNOLOGI
               │
               ●
             AMAL
```

Di tengah:

### **ISLAM BERKEMAJUAN**

Kemudian orbit mengelilinginya:

**Ilmu — Akhlak — Teknologi — Amal — Masyarakat**

Saat user hover:

```
TEKNOLOGI
Mengembangkan kemampuan untuk menjawab
tantangan zaman.
```

Ini bisa menjadi visual yang sangat memorable untuk juri karena menyatukan:

**SiberMu + AIK + teknologi + mahasiswa.**

---

# 38. KESIMPULAN BRIEF UNTUK WEB DEVELOPER

Developer bisa menerima arahan utama seperti ini:

> **Buat website multi-page Universitas Siber Muhammadiyah dengan fokus Kemahasiswaan dan Al-Islam & Kemuhammadiyahan. Website harus terasa modern, digital, premium, human-centered, dan memiliki storytelling yang kuat. Global navigation menggunakan multi-page routing, bukan single-page scrolling.**
>
> **Kemahasiswaan** menampilkan organisasi/UKM, pengembangan mahasiswa, prestasi, layanan akademik, layanan digital, konseling, soft skill, karier dan pengalaman mahasiswa.
>
> **AIK** menampilkan posisi AIK sebagai sumber nilai, perjalanan AIK dalam pendidikan, Islam Berkemajuan, Kemuhammadiyahan, pembinaan keislaman, kegiatan Masjid Amal Mulya, kajian, BTA, Subuh Berjamaah, Subuh Bergizi dan kegiatan sosial.
>
> Gunakan desain **Digital Editorial + Modern Islamic Technology**, dengan visual bersih, typography kuat, whitespace luas, blue-based SiberMu identity, aksen hijau secukupnya, subtle Islamic geometry, microinteraction dan page transition yang ringan.
>
> **Tidak boleh ada data, angka, UKM, prestasi, kegiatan, jadwal atau statistik yang dibuat-buat. Semua konten faktual harus berasal dari data resmi SiberMu/Muhammadiyah atau ditandai sebagai placeholder untuk diisi kemudian.**

Situs resmi SiberMu saat ini juga menegaskan karakter universitas sebagai perguruan tinggi siber dengan pembelajaran online yang fleksibel, dan informasi resmi tersebut sebaiknya menjadi konteks visual yang mendasari desain tanpa menggeser fokus lomba dari Kemahasiswaan dan AIK. ([Universitas Siber Muhammadiyah - SiberMu][5])

**Untuk lomba, saya akan memilih struktur 7 halaman di atas, bukan membuat puluhan halaman.** Kontennya cukup dalam untuk menunjukkan riset, tetapi experience-nya tetap terasa ringkas, modern, dan fokus.

[1]: https://sibermu.ac.id/profil/?utm_source=chatgpt.com "Profil - Universitas Siber Muhammadiyah"
[2]: https://spmi.sibermu.ac.id/?utm_source=chatgpt.com "Home - spmi.sibermu"
[3]: https://si.sibermu.ac.id/wp-content/uploads/2024/03/BUKU-PBMU-LPPM-SiberMu-2024.pdf?utm_source=chatgpt.com "Desain Program Proyek Berbasis Masyarakat untuk Mahasiswa"
[4]: https://sibermu.ac.id/yudisium/?utm_source=chatgpt.com "Yudisium - Universitas Siber Muhammadiyah"
[5]: https://sibermu.ac.id/?utm_source=chatgpt.com "Halaman Depan - Universitas Siber Muhammadiyah"
