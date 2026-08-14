# jasadesain.ld — Landing Page

Web promosi jasa desain grafis siap pakai. Dibangun dengan **Tailwind CSS CDN** — tidak perlu build step, langsung buka di browser.

---

## 📁 Struktur File

```
desainku/
├── index.html        ← Halaman utama (semua konten)
├── css/
│   └── custom.css    ← Komponen & animasi kustom (design tokens + plain CSS)
├── js/
│   └── main.js       ← Navbar, FAQ, Tabs, Modal, WhatsApp
└── README.md
```

---

## 🚀 Cara Pakai

1. **Ekstrak ZIP** ke folder mana pun
2. Buka `index.html` langsung di browser — selesai!
3. Tidak perlu npm, tidak perlu build, tidak perlu server

---

## ✏️ Yang Perlu Diganti

### Nomor WhatsApp
Cari `6285732084821` di dua file berikut dan ganti dengan nomormu:
- `index.html` — bagian tombol CTA & footer
- `js/main.js` — baris `const waNumber = '6285732084821';`

### Nama Brand
Brand `jasadesain.ld` terpasang di `index.html` (navbar, footer, CTA) dan `js/main.js` (pesan WhatsApp). Link Instagram & TikTok sudah terhubung ke akun resmi di tombol "Lihat di Instagram" dan footer.

### Harga
Semua harga ada di `index.html`, bagian section `#layanan` dan `#harga`.

### Kontak (email, instagram, jam operasional)
Ada di bagian `footer` di `index.html` — contoh: `halo@jasadesain.ld`, `@jasadesain.ld`.

---

## 🎨 Layanan yang Ditampilkan

| Layanan         | Mulai Harga |
|-----------------|-------------|
| Desain Logo     | Rp 75.000   |
| Desain Cetak    | Rp 50.000   |
| Manual Tracing  | Rp 35.000   |
| Template Canva  | Rp 45.000   |
| Jasa Mockup     | Rp 25.000   |

---

## ✅ Fitur

- **Responsive** — mobile, tablet, desktop
- **Navbar sticky** dengan efek scroll + active nav highlight
- **Marquee klien** — strip nama klien berjalan
- **Portfolio** — bento grid gelap dengan 6 karya
- **Layanan** — grid 2+1 dengan ikon SVG
- **Pricing tabs** per layanan (5 tab, section gelap)
- **Proses** — 5 langkah bernomor
- **Testimoni** — kutipan besar + kartu pendukung (section gelap)
- **FAQ accordion**
- **CTA gelap + Footer** branding jasadesain.ld
- **Modal order** → langsung buka WhatsApp dengan pesan terformat
- **Scroll reveal** animasi halus
- **SVG sprite** — semua ikon dari satu sprite `#i-*`

---

## 🛠️ Teknologi

- [Tailwind CSS](https://tailwindcss.com) via CDN (v3)
- [Google Fonts](https://fonts.google.com) — Space Grotesk + Inter
- Vanilla JavaScript — tanpa framework
