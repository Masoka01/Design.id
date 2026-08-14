# Design Spec — Redesign Landing Page design.id

- **Tanggal:** 2026-08-14
- **Status:** Disetujui user (brainstorming visual companion)
- **Proyek:** `/run/media/mayoni/Data/Coding/desainku`

## Ringkasan

Rebrand & redesign total landing page dari "DesainKu Studio" menjadi **design.id** dengan arah visual **minimal premium terang** (aksen oranye dipertahankan). Semua interaksi yang ada (modal order → WhatsApp, pricing tabs, FAQ accordion, scroll reveal, navbar sticky) tetap berfungsi.

## Masalah yang Dipecahkan

1. Terlalu template / kurang premium → hapus emoji, tipografi baru, ritme section gelap-terang
2. Tidak ada portfolio / bukti karya → tambah section Portfolio dengan bento grid
3. Layout monoton / datar → ritme selang-seling kuat (terang ↔ gelap)

## Keputusan Visual (hasil brainstorming)

| Aspek | Keputusan |
|---|---|
| Branding | Rebrand semua "DesainKu" → **design.id** |
| Alur section | **Karya Dulu**: Hero → Marquee Klien → Portfolio → Layanan → Harga → Proses → Testimoni → FAQ → CTA |
| Hero | **Editorial Split**: teks kiri, panel visual gelap kanan (3 preview karya, tanpa foto) |
| Portfolio | **Bento Grid asimetris** (1 tile besar + tile kecil), section gelap |
| Layanan | **Grid 2 kolom + 1 kartu lebar** (mockup sebagai penutup) |
| Harga | **Tab per layanan dipertahankan** (5 tab × 3 paket), diadaptasi untuk bg gelap |
| Proses | **Grid 2 baris bernomor** (01–05) |
| Testimoni | **Kutipan besar di tengah** + 2 pendukung |
| Ritme warna | Selang-seling kuat: Hero/marquee terang → Portfolio gelap → Layanan terang → Harga gelap → Proses terang → Testimoni gelap → FAQ terang → CTA+Footer gelap |
| Tipografi | **Space Grotesk** (judul) + **Inter** (teks) — menggantikan Syne/DM Sans |
| Ikon | Semua emoji diganti **ikon SVG minimal** (stroke tipis) |
| Warna | Aksen oranye `#E8602A` dipertahankan, token krem/tinta dirapikan |

## Arsitektur

Stack tetap: **Tailwind CSS CDN + custom.css + vanilla JS** — tanpa build step, buka langsung di browser (sesuai README).

- `index.html` — struktur halaman ditulis ulang
- `css/custom.css` — token warna, tipografi, komponen (btn, card, tab, faq, reveal) diadaptasi
- `js/main.js` — interaksi dipertahankan; `waNumber` placeholder tetap; nama brand di pesan WA diubah ke design.id

## Detail Section

### 1. Navbar (terang)
- Logo "design.id" (huruf kecil, font display, aksen oranye pada `.id` atau sejenis)
- Link: Portfolio, Layanan, Harga, Proses, Testimoni, FAQ
- CTA "Konsultasi Gratis" → `#kontak`
- Mobile: hamburger menu (dipertahankan), scrolled state (dipertahankan)

### 2. Hero (terang, editorial split)
- Kiri: badge kecil "Studio Desain Grafis", H1 display besar "Desain yang berbicara untuk bisnis Anda", paragraf deskripsi, CTA "Lihat Layanan" + "Konsultasi Gratis", statistik (800+ proyek, 350+ klien, 5★ rating, <3hr respons)
- Kanan: panel visual **gelap** berisi 3 kartu preview karya (Logo, Mockup, Cetak) — dibuat dengan CSS, bukan foto
- Copy hero disempurnakan (bahasa natural, bukan template-y)

### 3. Marquee Klien (terang, opsional tipis)
- Strip teks berjalan dengan nama/tipe klien (UMKM, kafe, konveksi, skincare, dll) sebagai bukti sosial
- Nama klien generik/placeholder — user bisa ganti nanti

### 4. Portfolio (gelap, bento grid) — section baru
- Grid asimetris: 1 tile besar (col-span 2, row-span 2) + tile kecil beragam rasio
- 6–8 item, masing-masing: gradient placeholder + label jenis layanan (Logo/Cetak/Tracing/Canva/Mockup)
- Hover: judul karya + tombol "Pesan via WhatsApp"
- CTA kecil: "Lihat semua karya di Instagram" (link `#` placeholder)
- Placeholder: gradient CSS (bukan gambar file) — mudah diganti nanti

### 5. Layanan (terang, grid 2+1)
- 4 kartu: Desain Logo, Desain Cetak, Manual Tracing, Template Canva
- 1 kartu lebar penutup: Jasa Mockup
- Tiap kartu: ikon SVG, judul, deskripsi, "Mulai dari Rp…", tombol "Pesan Sekarang" → modal order
- Kartu CTA gelap "Butuh layanan custom?" tetap ada di grid (isi sama, gaya diselaraskan)

### 6. Harga (gelap, tab per layanan)
- Tab: Logo / Cetak / Tracing / Canva / Mockup (interaksi dipertahankan)
- 3 paket per tab (konten harga & fitur tetap seperti sekarang)
- Kartu paket versi gelap: bg gelap, border, paket populer dengan aksen oranye
- CTA "Pilih Paket" → modal order

### 7. Proses (terang, grid 2 baris)
- 5 langkah bernomor (01–05): Konsultasi, Brief & Penawaran, Proses Desain, Revisi, File Final
- Grid responsif bernomor (01–05): 5 kartu membentuk grid 2 baris di desktop & mobile

### 8. Testimoni (gelap, kutipan besar)
- Layout tetap: **1 kutipan besar di tengah + 2 kartu pendukung** (total 3 dari 4 testimoni yang ada — kutipan utama = Dimas/Founder, pendukung = Ayu & Budi; Rini tidak ditampilkan)
- Gaya kartu gelap diselaraskan

### 9. FAQ (terang)
- Accordion dipertahankan, 5 pertanyaan yang ada
- Gaya kartu diselaraskan dengan token baru

### 10. CTA (gelap)
- Blok gelap "Siap Wujudkan Desain Impian?" + tombol WhatsApp (nomor placeholder `6281234567890` dipertahankan)
- Aksen oranye pada blob/dekorasi

### 11. Footer (gelap)
- Branding design.id, deskripsi singkat, sosial (ig/fb/wa placeholder), link layanan, kontak (placeholder), copyright 2026

### 12. Modal Order (dipertahankan)
- Form nama, WA, layanan, catatan → WhatsApp
- Teks pesan WA disesuaikan: "Halo design.id!"

## Interaksi yang Dipertahankan

- Navbar scrolled state
- Mobile menu toggle
- Scroll reveal (`IntersectionObserver`)
- Pricing tabs (`switchTab`)
- FAQ accordion (`toggleFaq`)
- Modal order → WhatsApp (`openModal`, `submitOrder`)
- Active nav highlight

## Aset

- **Tanpa gambar**: portfolio memakai gradient placeholder CSS; hero memakai panel visual CSS
- Placeholder mudah diganti dengan gambar karya asli nantinya (struktur HTML menyediakan slot img)

## Out of Scope

- Tanpa build step / tooling baru (tetap buka langsung di browser)
- Tanpa halaman baru (tetap single page)
- Tanpa perubahan harga/isi layanan (hanya tampilan)
- Nomor WhatsApp tetap placeholder (user mengganti manual, sesuai README)
