# DesainKu Studio — Landing Page

Web promosi jasa desain grafis siap pakai. Dibangun dengan **Tailwind CSS CDN** — tidak perlu build step, langsung buka di browser.

---

## 📁 Struktur File

```
desainku/
├── index.html        ← Halaman utama (semua konten)
├── css/
│   └── custom.css    ← Komponen & animasi kustom
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
Cari `6281234567890` di dua file berikut dan ganti dengan nomormu:
- `index.html` — bagian tombol CTA footer
- `js/main.js` — baris `const waNumber = '6281234567890';`

### Nama Brand
Cari `DesainKu` di `index.html` dan ganti sesuai nama studiomu.

### Harga
Semua harga ada di `index.html`, bagian section `#layanan` dan `#harga`.

### Kontak (email, instagram, jam operasional)
Ada di bagian `footer` di `index.html`.

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
- **Navbar sticky** dengan efek scroll
- **Pricing tabs** per layanan (5 tab)
- **FAQ accordion**
- **Modal order** → langsung buka WhatsApp dengan pesan terformat
- **Scroll reveal** animasi halus
- **Active nav** highlight saat scroll

---

## 🛠️ Teknologi

- [Tailwind CSS](https://tailwindcss.com) via CDN (v3)
- [Google Fonts](https://fonts.google.com) — Syne + DM Sans
- Vanilla JavaScript — tanpa framework
