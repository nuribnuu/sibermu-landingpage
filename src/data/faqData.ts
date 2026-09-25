// faqData.ts
// Data FAQ Bilingual untuk SIBERMU ASSISTANT (scripted, berbasis quick-reply)

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQCategory {
  topic: string;
  items: FAQItem[];
}

export type FAQStructure = Record<string, FAQCategory>;

export const faqData: { id: FAQStructure; en: FAQStructure } = {
  id: {
    prodi: {
      topic: "Program Studi",
      items: [
        {
          id: "prodi-list",
          question: "Apa saja program studi yang ada di SIBERMU?",
          answer:
            "SIBERMU memiliki 6 program studi sarjana: Informatika, Sistem Informasi, Administrasi Kesehatan, Hukum, Manajemen, dan Akuntansi. Info lengkap tiap prodi ada di www.sibermu.ac.id/akademik",
        },
        {
          id: "prodi-jenjang",
          question: "Apakah ada program S2 atau S3?",
          answer: "Saat ini SIBERMU hanya membuka program sarjana (S1).",
        },
        {
          id: "prodi-daftar-singkatan",
          question: "Apa saja daftar program studi beserta jenjangnya?",
          answer:
            "1) Informatika — S1 PJJ Informatika\n2) Sistem Informasi — S1 PJJ Sistem Informasi\n3) Administrasi Kesehatan — S1 PJJ Administrasi Kesehatan\n4) Hukum — S1 PJJ Hukum\n5) Manajemen — S1 PJJ Manajemen\n6) Akuntansi — S1 PJJ Akuntansi",
        },
      ],
    },

    perkuliahan: {
      topic: "Teknis Perkuliahan",
      items: [
        {
          id: "kuliah-teknis",
          question: "Bagaimana teknis perkuliahan di SIBERMU?",
          answer:
            "Perkuliahan dilakukan full secara daring dan fleksibel melalui pembelajaran terbimbing menggunakan aplikasi yang telah disediakan. Untuk mata kuliah yang membutuhkan praktikum, magang, atau praktik lapangan, mahasiswa akan dibantu oleh tutor di wilayah regionalnya masing-masing seperti UPBJJ (Unit Program Belajar Jarak Jauh). Masa studi normal 4-5 tahun; jalur paruh waktu kemungkinan memakan waktu lebih lama.",
        },
        {
          id: "kuliah-paruh-penuh",
          question: "Apa perbedaan kuliah paruh waktu dan penuh waktu?",
          answer:
            "Penuh waktu: mahasiswa dapat mengambil minimal 18 SKS per semester. Paruh waktu: minimal 9 SKS per semester, direkomendasikan untuk mahasiswa yang mengambil jalur karyawan. Pilihan ini berdampak pada lama studi.",
        },
        {
          id: "kuliah-tatap-muka",
          question: "Apakah kuliah online ada tatap mukanya?",
          answer:
            "SIBERMU memfasilitasi tatap muka sebanyak 3 kali, didampingi oleh tutor di Lokasi PJJ yang telah ditunjuk oleh SIBERMU. Fasilitas tatap muka ini tidak wajib dilakukan oleh mahasiswa.",
        },
        {
          id: "kuliah-untuk-siapa",
          question:
            "Apakah kuliah online di SIBERMU hanya untuk yang sudah bekerja?",
          answer:
            "Tidak. Kuliah di SIBERMU diperuntukkan juga bagi yang baru lulus SMA/SMK/MA dari berbagai jurusan, dan tidak ada batasan usia.",
        },
      ],
    },

    biaya: {
      topic: "Biaya Kuliah",
      items: [
        {
          id: "biaya-akses",
          question: "Di mana saya dapat mengakses info biaya kuliah?",
          answer:
            "Silakan akses di halaman Admisi pada bagian Biaya Kuliah, atau klik www.sibermu.ac.id/admisi",
        },
        {
          id: "biaya-uang-masuk",
          question: "Berapa uang masuk di SIBERMU?",
          answer:
            "Uang masuk Rp610.000 (sudah termasuk seluruh SIBERMU Kit: Jas Almamater, KTM, & Merch).",
        },
        {
          id: "biaya-penuh-waktu",
          question: "Berapa biaya kuliah untuk jalur penuh waktu?",
          answer:
            "Rp2.140.000 per semester, terdiri dari Registrasi Semester (Rp250.000) dan SPP Semester (Rp1.890.000). Biaya SPP Semester meliputi Biaya SPP Variabel, Biaya Ujian, dan Biaya Tutorial.",
        },
        {
          id: "biaya-paruh-waktu",
          question: "Berapa biaya kuliah untuk jalur paruh waktu?",
          answer:
            "Rp1.195.000 per semester, terdiri dari Registrasi Semester (Rp250.000) dan SPP Semester (Rp945.000). Biaya SPP Semester meliputi Biaya SPP Variabel, Biaya Ujian, dan Biaya Tutorial.",
        },
        {
          id: "biaya-cicilan",
          question: "Apakah biaya kuliah bisa dicicil/diangsur?",
          answer:
            "Bisa. Total biaya pendidikan dapat diangsur 2x: tahap awal (uang masuk, her registrasi, dan SPP Tahap 1) dan pertengahan semester (SPP Tahap 2).",
        },
        {
          id: "biaya-pembayaran",
          question: "Bagaimana cara melakukan pembayaran perkuliahan?",
          answer:
            "Pembayaran pendaftaran bagi mahasiswa baru dapat diakses melalui admissions.sibermu.ac.id, dengan pilihan metode pembayaran mulai dari transfer via BRI, BCA, Mandiri, sampai LinkAja. Untuk pembayaran perkuliahan selanjutnya, dapat dilakukan dengan metode pembayaran yang sama melalui student.sibermu.ac.id",
        },
        {
          id: "biaya-beasiswa",
          question: "Apakah saat ini ada program beasiswa di SIBERMU?",
          answer: "Mohon maaf, saat ini SIBERMU belum memiliki program beasiswa.",
        },
      ],
    },

    ijazah: {
      topic: "Ijazah & Gelar",
      items: [
        {
          id: "ijazah-sama",
          question:
            "Apakah gelar dan ijazah kuliah online sama dengan kuliah tatap muka?",
          answer:
            "Ya, baik kuliah online maupun kuliah tatap muka, gelar dan ijazahnya sama.",
        },
        {
          id: "ijazah-lanjut-s2",
          question: "Apakah ijazah SIBERMU bisa digunakan untuk melanjutkan S2?",
          answer:
            "Bisa. Ijazah di SIBERMU sama dengan ijazah kuliah konvensional/offline dan terdaftar resmi di PDDIKTI, sehingga setelah lulus, ijazah dapat digunakan untuk melanjutkan studi lanjut S2 maupun S3.",
        },
      ],
    },

    lokasi: {
      topic: "Lokasi & Kontak",
      items: [
        {
          id: "lokasi-kampus",
          question: "Di mana lokasi SIBERMU berada?",
          answer:
            "Kantor pusat berada di Yogyakarta, berlokasi di Jalan HOS Cokroaminoto No. 17, Pakuncen, Wirobrajan, Kota Yogyakarta 55253. Anda juga dapat mengunjungi kami melalui UPBJJ (Unit Program Belajar Jarak Jauh) di Kuningan (Jalan R.A. Moertasiah Soepomo No. 28B, Kuningan) dan Kendari (Jalan K.H. Ahmad Dahlan No. 10, Kota Kendari).",
        },
        {
          id: "kontak-admin",
          question:
            "Bagaimana cara menghubungi SIBERMU jika masih ada pertanyaan?",
          answer:
            "Hubungi SIBERMU melalui 0274-5015518 atau WhatsApp di 0851-7431-4147.",
        },
      ],
    },

    pindahProdi: {
      topic: "Pindah Program Studi",
      items: [
        {
          id: "pindah-prodi",
          question:
            "Apakah mahasiswa dapat pindah program studi setelah dinyatakan diterima / mendapat NIM?",
          answer:
            "Mohon maaf, mahasiswa tidak dapat berpindah program studi setelah NIM terbit atau telah dinyatakan diterima sebagai mahasiswa baru di program studi yang dipilih. Mahasiswa dapat berpindah ke program studi lain hanya jika telah lulus seleksi administrasi saat pendaftaran dan NIM belum terbit — silakan hubungi admin penmaru untuk mempermudah proses ini. Pastikan mempertimbangkan pilihan program studi dengan baik-baik sebelum mendaftar.",
        },
      ],
    },

    visiMisi: {
      topic: "Visi, Misi & Tujuan",
      items: [
        {
          id: "visi",
          question: "Apa visi SIBERMU?",
          answer:
            "Menjadi Perguruan Tinggi Siber terpercaya, terdepan dan terkemuka yang menyediakan akses pendidikan berkualitas secara luas berdasarkan nilai-nilai Islam berkemajuan.",
        },
        {
          id: "misi",
          question: "Apa misi SIBERMU?",
          answer:
            "1) Menyelenggarakan Tri Dharma Perguruan Tinggi berbasis Teknologi Informasi.\n2) Menjadikan Al-Islam dan Kemuhammadiyahan sebagai sumber nilai setiap aktivitas.\n3) Menyelenggarakan layanan pendidikan modular berbasis teknologi informasi.\n4) Mendukung penyelenggaraan pembelajaran online di Indonesia.",
        },
        {
          id: "tujuan",
          question: "Apa tujuan SIBERMU?",
          answer:
            "1) Menghasilkan sarjana berkarakter Islami yang kompeten dalam penguasaan ilmu dan teknologi.\n2) Menghasilkan penelitian yang bermanfaat bagi kehidupan.\n3) Menyelesaikan persoalan-persoalan di masyarakat untuk meningkatkan produktivitas.\n4) Terselenggaranya pengelolaan perguruan tinggi berbasis daring dengan layanan prima yang bertanggung jawab.\n5) Terselenggaranya proses belajar mengajar menggunakan sarana dan prasarana yang mutakhir.\n6) Terjalinnya jaringan kerja sama di tingkat daerah, nasional, dan internasional.",
        },
      ],
    },

    akreditasi: {
      topic: "Akreditasi",
      items: [
        {
          id: "akreditasi-institusi",
          question: "Apa status akreditasi SIBERMU?",
          answer:
            'Universitas Siber Muhammadiyah (SIBERMU) telah terakreditasi oleh BAN-PT dengan status akreditasi "Baik" berdasarkan Surat Keputusan BAN-PT No. 485/SK/BAN-PT/AK/PT/IV/2024, berlaku hingga 29 April 2029.',
        },
        {
          id: "akreditasi-prodi",
          question: "Apakah semua program studi di SIBERMU sudah terakreditasi?",
          answer:
            "Ya, seluruh 6 program studi telah terakreditasi:\n- S1 PJJ Informatika (hingga 5 Desember 2029)\n- S1 PJJ Sistem Informasi (hingga 16 Desember 2029)\n- S1 PJJ Administrasi Kesehatan (hingga 28 November 2029)\n- S1 PJJ Akuntansi (hingga 20 Desember 2029)\n- S1 PJJ Manajemen (hingga 13 Desember 2029)\n- S1 PJJ Hukum (hingga 12 Desember 2030)",
        },
      ],
    },

    karir: {
      topic: "Karir & Lowongan",
      items: [
        {
          id: "karir-lowongan",
          question:
            "Apakah ada lowongan untuk tenaga pengajar atau tenaga pendidik?",
          answer:
            "Saat ini SIBERMU belum membuka lowongan baik untuk tenaga pengajar maupun tenaga pendidik. Simak terus website dan media sosial kami untuk perkembangan informasi lebih lanjut.",
        },
      ],
    },
  },

  en: {
    prodi: {
      topic: "Study Programs",
      items: [
        {
          id: "prodi-list",
          question: "What study programs are available at SIBERMU?",
          answer:
            "SIBERMU offers 6 undergraduate (Bachelor's) degree programs: Informatics, Information Systems, Healthcare Administration, Law, Management, and Accounting. Full details for each program are available at www.sibermu.ac.id/akademik",
        },
        {
          id: "prodi-jenjang",
          question: "Are there Master's (S2) or Doctoral (S3) programs available?",
          answer: "Currently, SIBERMU only offers undergraduate (Bachelor's/S1) degree programs.",
        },
        {
          id: "prodi-daftar-singkatan",
          question: "What is the list of study programs and degree levels?",
          answer:
            "1) Informatics — S1 Distance Learning Informatics\n2) Information Systems — S1 Distance Learning Information Systems\n3) Healthcare Administration — S1 Distance Learning Healthcare Administration\n4) Law — S1 Distance Learning Law\n5) Management — S1 Distance Learning Management\n6) Accounting — S1 Distance Learning Accounting",
        },
      ],
    },

    perkuliahan: {
      topic: "How Classes Work",
      items: [
        {
          id: "kuliah-teknis",
          question: "How do classes work at SIBERMU?",
          answer:
            "Classes are conducted fully online and flexibly through guided learning using our dedicated platforms. For courses requiring lab work, internships, or field practice, students are supported by regional tutors at UPBJJ (Distance Learning Program Units). Normal study duration is 4-5 years; part-time tracks may take longer.",
        },
        {
          id: "kuliah-paruh-penuh",
          question: "What is the difference between part-time and full-time study?",
          answer:
            "Full-time: students take a minimum of 18 credits (SKS) per semester. Part-time: minimum of 9 credits per semester, recommended for employed students. This choice impacts overall study duration.",
        },
        {
          id: "kuliah-tatap-muka",
          question: "Are there any face-to-face (onsite) sessions in online learning?",
          answer:
            "SIBERMU facilitates 3 optional face-to-face sessions guided by tutors at designated Distance Learning locations. Attending these sessions is optional.",
        },
        {
          id: "kuliah-untuk-siapa",
          question: "Is online study at SIBERMU only for employed professionals?",
          answer:
            "No. SIBERMU is also open to recent high school / vocational graduates from any major, with no age restrictions.",
        },
      ],
    },

    biaya: {
      topic: "Tuition Fees",
      items: [
        {
          id: "biaya-akses",
          question: "Where can I find tuition fee details?",
          answer:
            "Please check the Admissions page under Tuition Fees, or visit www.sibermu.ac.id/admisi",
        },
        {
          id: "biaya-uang-masuk",
          question: "How much is the initial entrance fee at SIBERMU?",
          answer:
            "Entrance fee is Rp610,000 (includes the complete SIBERMU Kit: Alma Mater Jacket, Student ID, & Merchandise).",
        },
        {
          id: "biaya-penuh-waktu",
          question: "How much is the tuition fee for the full-time track?",
          answer:
            "Rp2,140,000 per semester, consisting of Semester Registration (Rp250,000) and Semester SPP (Rp1,890,000). Tuition covers variable SPP, exams, and tutorial fees.",
        },
        {
          id: "biaya-paruh-waktu",
          question: "How much is the tuition fee for the part-time track?",
          answer:
            "Rp1,195,000 per semester, consisting of Semester Registration (Rp250,000) and Semester SPP (Rp945,000). Tuition covers variable SPP, exams, and tutorial fees.",
        },
        {
          id: "biaya-cicilan",
          question: "Can tuition fees be paid in installments?",
          answer:
            "Yes. Total education fees can be paid in 2 installments: initial stage (entrance fee, re-registration, & Stage 1 SPP) and mid-semester (Stage 2 SPP).",
        },
        {
          id: "biaya-pembayaran",
          question: "How do I make tuition payments?",
          answer:
            "Registration payments for new students can be completed via admissions.sibermu.ac.id with payment methods including BRI, BCA, Mandiri transfers, and LinkAja. Subsequent semester payments are processed through student.sibermu.ac.id.",
        },
        {
          id: "biaya-beasiswa",
          question: "Are there any scholarship programs currently available?",
          answer: "Currently, SIBERMU does not offer scholarship programs.",
        },
      ],
    },

    ijazah: {
      topic: "Diploma & Degree",
      items: [
        {
          id: "ijazah-sama",
          question: "Are online study degrees and diplomas identical to traditional ones?",
          answer:
            "Yes, degrees and diplomas earned from online study are identical to traditional face-to-face degrees.",
        },
        {
          id: "ijazah-lanjut-s2",
          question: "Can SIBERMU diplomas be used to pursue a Master's (S2) degree?",
          answer:
            "Yes. SIBERMU diplomas are officially registered with PDDIKTI and equal to conventional degrees, allowing graduates to continue to Master's (S2) or Doctoral (S3) studies.",
        },
      ],
    },

    lokasi: {
      topic: "Location & Contact",
      items: [
        {
          id: "lokasi-kampus",
          question: "Where is SIBERMU located?",
          answer:
            "Headquarters are located in Yogyakarta at Jalan HOS Cokroaminoto No. 17, Pakuncen, Wirobrajan, Yogyakarta 55253. You can also visit our regional UPBJJ centers in Kuningan (Jalan R.A. Moertasiah Soepomo No. 28B, Kuningan) and Kendari (Jalan K.H. Ahmad Dahlan No. 10, Kendari City).",
        },
        {
          id: "kontak-admin",
          question: "How can I contact SIBERMU if I have further questions?",
          answer:
            "Contact SIBERMU via phone at 0274-5015518 or WhatsApp at 0851-7431-4147.",
        },
      ],
    },

    pindahProdi: {
      topic: "Changing Study Program",
      items: [
        {
          id: "pindah-prodi",
          question: "Can students change study programs after acceptance or receiving a Student ID (NIM)?",
          answer:
            "Unfortunately, students cannot switch study programs once NIM is issued or after official acceptance into their chosen program. Program changes are only permitted during the initial registration process prior to NIM issuance by contacting admissions staff. Please consider your program choice carefully before registering.",
        },
      ],
    },

    visiMisi: {
      topic: "Vision, Mission & Objectives",
      items: [
        {
          id: "visi",
          question: "What is SIBERMU's vision?",
          answer:
            "To become a trusted, leading cyber university providing broad access to quality education grounded in progressive Islamic values.",
        },
        {
          id: "misi",
          question: "What is SIBERMU's mission?",
          answer:
            "1) Execute Higher Education Tri Dharma based on Information Technology.\n2) Embed Al-Islam & Kemuhammadiyahan as core values in all activities.\n3) Provide modular IT-based educational services.\n4) Support online learning development in Indonesia.",
        },
        {
          id: "tujuan",
          question: "What are SIBERMU's objectives?",
          answer:
            "1) Produce graduates with Islamic character competent in science & technology.\n2) Conduct impactful research for society.\n3) Solve societal challenges to enhance productivity.\n4) Deliver accountable, top-tier online university governance.\n5) Conduct teaching & learning using state-of-the-art facilities.\n6) Build regional, national, and international collaboration networks.",
        },
      ],
    },

    akreditasi: {
      topic: "Accreditation",
      items: [
        {
          id: "akreditasi-institusi",
          question: "What is SIBERMU's institutional accreditation status?",
          answer:
            'Universitas Siber Muhammadiyah (SIBERMU) is accredited by BAN-PT with a "Baik" (Good) grade under Decree BAN-PT No. 485/SK/BAN-PT/AK/PT/IV/2024, valid until April 29, 2029.',
        },
        {
          id: "akreditasi-prodi",
          question: "Are all study programs at SIBERMU accredited?",
          answer:
            "Yes, all 6 study programs are accredited:\n- S1 Distance Learning Informatics (until Dec 5, 2029)\n- S1 Distance Learning Information Systems (until Dec 16, 2029)\n- S1 Distance Learning Healthcare Administration (until Nov 28, 2029)\n- S1 Distance Learning Accounting (until Dec 20, 2029)\n- S1 Distance Learning Management (until Dec 13, 2029)\n- S1 Distance Learning Law (until Dec 12, 2030)",
        },
      ],
    },

    karir: {
      topic: "Career & Job Openings",
      items: [
        {
          id: "karir-lowongan",
          question: "Are there job openings for academic or administrative staff?",
          answer:
            "Currently, SIBERMU has no open positions for teaching or administrative staff. Stay tuned to our website and social media for future updates.",
        },
      ],
    },
  },
};

export default faqData;
