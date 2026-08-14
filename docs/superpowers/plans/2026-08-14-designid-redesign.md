# Redesign Landing Page design.id — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebrand "DesainKu Studio" menjadi **design.id** dengan redesign total layout: minimal premium terang, ritme selang-seling gelap/terang, portfolio bento grid, dan ikon SVG — tanpa build step.

**Architecture:** Single-page static (Tailwind CDN + plain CSS components + vanilla JS). Semua komponen visual ditulis sebagai **plain CSS di `css/custom.css`** — TIDAK memakai `@apply`, karena Tailwind Play CDN tidak memproses `@apply` pada stylesheet eksternal (sudah diverifikasi: tombol saat ini transparan/tanpa radius). Tailwind utilities tetap dipakai untuk layout (grid, spacing, responsive) langsung di HTML.

**Tech Stack:** Tailwind CSS v3 CDN, Google Fonts (Space Grotesk + Inter), vanilla JS, CSS custom properties.

## Global Constraints

- **Branding:** semua teks "DesainKu", "DesainKu Studio" → "design.id" (judul, navbar, footer, pesan WA). Logo ditulis `design<span aksen>.id</span>`.
- **Fonts:** Space Grotesk (judul/display) + Inter (teks). Ganti link Google Fonts dan `tailwind.config` `fontFamily.display`/`fontFamily.body`.
- **Warna (token, CSS custom properties di `custom.css`):**
  - `--ink: #111118` (teks utama), `--muted: #6B6860` (teks sekunder), `--paper: #F7F6F2` (bg halaman), `--cream: #EDEAE1` (bg aksen terang)
  - `--brand-*`: 50 `#FFF5F0`, 100 `#FFE8D9`, 200 `#FFCAAA`, 300 `#FFA070`, 400 `#FF7540`, 500 `#E8602A`, 600 `#C85020`, 700 `#A84018`, 800 `#7A2F10`, 900 `#4A1C08`
  - Dark section: `--night: #1F1D18` (bg), `--night-card: #2B2823` (kartu), `--night-line: #3A362F` (border), teks putih/60
- **Ikon:** semua emoji (🎨🖨️✏️📦🏷️ dll) diganti **SVG stroke tipis** via `<symbol>` + `<use>` (sprite SVG di awal `<body>`).
- **Interaksi dipertahankan:** navbar scrolled, mobile menu, scroll reveal, pricing tabs (`switchTab`), FAQ accordion (`toggleFaq`), modal order → WA (`openModal`/`submitOrder`), active nav highlight.
- **Nomor WA:** tetap placeholder `6281234567890`.
- **Tanpa build step:** buka `index.html` langsung di browser.

---

### Task 1: Design Token & Base CSS (`css/custom.css`)

**Files:**
- Rewrite: `css/custom.css` (hapus semua `@apply`, ganti plain CSS + CSS variables)

**Interfaces:**
- Produces: class CSS `btn-primary`, `btn-outline`, `btn-wa`, `btn-light`, `section-eye`, `section-title`, `section-sub`, `reveal`, `card-light`, `icon` (untuk svg), `marquee`, `porto-tile`, `svc-card`, `price-card`/`price-card-dark`, `step-card`, `testi-card`, `faq-item`, `input-field`, `modal`
- Nama variabel: `--ink`, `--muted`, `--paper`, `--cream`, `--brand-600`, `--night`, `--night-card`, `--night-line`, `--font-display`, `--font-body`

- [ ] **Step 1: Tulis ulang `css/custom.css` — token & base**

```css
:root {
  --ink: #111118; --muted: #6B6860; --paper: #F7F6F2; --cream: #EDEAE1;
  --brand-50:#FFF5F0; --brand-100:#FFE8D9; --brand-200:#FFCAAA; --brand-300:#FFA070;
  --brand-400:#FF7540; --brand-500:#E8602A; --brand-600:#C85020; --brand-700:#A84018;
  --brand-800:#7A2F10; --brand-900:#4A1C08;
  --night:#1F1D18; --night-card:#2B2823; --night-line:#3A362F;
  --font-display:'Space Grotesk', sans-serif; --font-body:'Inter', sans-serif;
  --radius: 1.25rem;
}
html { scroll-behavior: smooth; }
body { font-family: var(--font-body); background: var(--paper); color: var(--ink); -webkit-font-smoothing: antialiased; }
.font-display { font-family: var(--font-display); }
```

- [ ] **Step 2: Tombol**

```css
.btn-primary,.btn-outline,.btn-wa,.btn-light {
  display:inline-flex; align-items:center; justify-content:center; gap:.5rem;
  font-weight:600; border-radius:999px; padding:.9rem 1.75rem;
  transition: all .2s ease; cursor:pointer; font-size:.95rem; line-height:1.2;
}
.btn-primary { background: var(--brand-600); color:#fff; }
.btn-primary:hover { background: var(--brand-700); transform: translateY(-2px); }
.btn-outline { border:2px solid rgba(17,17,24,.2); color:var(--ink); background:transparent; }
.btn-outline:hover { border-color: var(--brand-600); color: var(--brand-600); }
.btn-wa { background:#25D366; color:#fff; font-weight:700; }
.btn-wa:hover { background:#1db954; transform: translateY(-2px); }
.btn-light { background:#fff; color:var(--ink); }
.btn-light:hover { background:var(--cream); transform: translateY(-2px); }
.btn-ghost-dark { border:1px solid rgba(255,255,255,.25); color:#fff; background:transparent; }
.btn-ghost-dark:hover { border-color:#fff; background:rgba(255,255,255,.08); }
```

- [ ] **Step 3: Tipografi section + reveal**

```css
.section-eye { display:block; font-size:.75rem; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:var(--brand-600); margin-bottom:.75rem; }
.section-title { font-family:var(--font-display); font-weight:700; font-size:clamp(1.9rem, 4vw, 3rem); line-height:1.15; margin-bottom:1rem; }
.section-sub { color:var(--muted); font-size:1.05rem; max-width:38rem; line-height:1.65; }
.section-dark .section-title { color:#fff; }
.section-dark .section-sub { color:rgba(255,255,255,.6); }
.reveal { opacity:0; transform:translateY(24px); transition:opacity .55s ease, transform .55s ease; }
.reveal.visible { opacity:1; transform:none; }
```

- [ ] **Step 4: Komponen kartu & section dark**

```css
.card-light { background:#fff; border:1px solid var(--cream); border-radius:var(--radius); }
.section-dark { background:var(--night); color:#fff; }
.section-dark .card-light, .section-dark .card { background:var(--night-card); border-color:var(--night-line); }
/* ikon svg */
.icon { width:1.25rem; height:1.25rem; stroke:currentColor; fill:none; stroke-width:1.8; stroke-linecap:round; stroke-linejoin:round; }
```

- [ ] **Step 5: Verifikasi — file valid CSS & kelas dipakai**

Serve proyek (`python3 -m http.server 8777` di folder proyek), buka `http://localhost:8777/index.html` di browser (Playwright), cek `document.styleSheets` memuat custom.css tanpa error console `@apply`. Tombol `.btn-primary` kini punya `background: rgb(200,80,32)` (bukan transparan) dan `border-radius: 999px`.

- [ ] **Step 6: Commit**

```bash
git add css/custom.css
git commit -m "style: rewrite custom.css as plain CSS with design tokens"
```
> Catatan: proyek belum git repo — inisialisasi di Task 1 step 0 jika belum ada: `git init && git add -A && git commit -m "chore: init repo with current state"` (sebelum Step 1).

---

### Task 2: Rebrand Head + Navbar + Hero (`index.html`)

**Files:**
- Modify: `index.html` — `<head>` (title, fonts, config), `<body>` (sprite SVG, navbar, hero), `css/custom.css` (tambah class hero)

**Interfaces:**
- Consumes: token CSS Task 1 (`--font-display`, `--brand-600`, dll)
- Produces: struktur `<section id="home">`, `#navbar`, sprite `<svg style="display:none">` dengan `<symbol id="i-*">`, class hero

- [ ] **Step 1: Update `<head>` — title, fonts, config Tailwind**

```html
<title>design.id — Jasa Desain Grafis: Logo, Cetak, Tracing, Canva & Mockup</title>
<meta name="description" content="Jasa desain grafis profesional dari design.id: logo, desain cetak, manual tracing, template Canva, dan mockup. Harga terjangkau, kualitas premium." />
```

Ganti blok Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

Ganti `fontFamily` di `tailwind.config`:
```js
fontFamily: { display: ['Space Grotesk', 'sans-serif'], body: ['Inter', 'sans-serif'] },
```
Hapus warna `ink/paper/cream/muted` dari config Tailwind (tidak lagi perlu sebagai utility — dipakai via CSS vars), pertahankan skala `brand` dan keyframes `fadeUp/fadeIn` + `animation.fade-up/fade-in`. Tambahkan di config: warna `night: '#1F1D18'`.

- [ ] **Step 2: Sprite SVG — buka `<body>` dengan symbol icons**

```html
<svg style="display:none" xmlns="http://www.w3.org/2000/svg">
  <symbol id="i-logo" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></symbol>
  <symbol id="i-print" viewBox="0 0 24 24"><path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></symbol>
  <symbol id="i-pen" viewBox="0 0 24 24"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></symbol>
  <symbol id="i-layout" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></symbol>
  <symbol id="i-box" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/></symbol>
  <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></symbol>
  <symbol id="i-check" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></symbol>
  <symbol id="i-wa" viewBox="0 0 24 24"><path fill="currentColor" stroke="none" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></symbol>
  <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></symbol>
  <symbol id="i-close" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></symbol>
  <symbol id="i-chevron" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></symbol>
  <symbol id="i-star" viewBox="0 0 24 24"><path fill="currentColor" stroke="none" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></symbol>
  <symbol id="i-quote" viewBox="0 0 24 24"><path fill="currentColor" stroke="none" d="M10 7H6a2 2 0 00-2 2v4a2 2 0 002 2h3v2H5v2h5v-8a2 2 0 00-2-2zm10 0h-4a2 2 0 00-2 2v4a2 2 0 002 2h3v2h-3v2h5v-8a2 2 0 00-2-2z"/></symbol>
</svg>
```

- [ ] **Step 3: Navbar — branding design.id**

```html
<header id="navbar" class="fixed top-0 inset-x-0 z-50 transition-all duration-300">
  <nav class="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between gap-6">
    <a href="#home" class="font-display font-bold text-xl text-ink shrink-0 tracking-tight">
      design<span class="text-brand-600">.id</span>
    </a>
    <ul class="nav-links hidden md:flex items-center gap-7 text-sm font-medium text-muted">
      <li><a href="#portfolio" class="hover:text-brand-600 transition-colors">Portfolio</a></li>
      <li><a href="#layanan" class="hover:text-brand-600 transition-colors">Layanan</a></li>
      <li><a href="#harga" class="hover:text-brand-600 transition-colors">Harga</a></li>
      <li><a href="#proses" class="hover:text-brand-600 transition-colors">Proses</a></li>
      <li><a href="#testimoni" class="hover:text-brand-600 transition-colors">Testimoni</a></li>
      <li><a href="#faq" class="hover:text-brand-600 transition-colors">FAQ</a></li>
    </ul>
    <div class="flex items-center gap-3">
      <a href="#kontak" class="hidden sm:inline-flex btn-primary text-sm px-5 py-2.5">Konsultasi Gratis</a>
      <button id="menuBtn" class="md:hidden p-2 rounded-lg hover:bg-cream transition-colors" aria-label="Menu">
        <svg class="icon w-6 h-6"><use href="#i-menu"/></svg>
      </button>
    </div>
  </nav>
  <div id="mobileMenu" class="hidden md:hidden bg-white border-t border-cream px-6 pb-5 pt-3 flex flex-col gap-4 text-sm font-medium">
    <a href="#portfolio" class="py-1 border-b border-cream text-muted hover:text-brand-600" onclick="closeMobileMenu()">Portfolio</a>
    <a href="#layanan" class="py-1 border-b border-cream text-muted hover:text-brand-600" onclick="closeMobileMenu()">Layanan</a>
    <a href="#harga" class="py-1 border-b border-cream text-muted hover:text-brand-600" onclick="closeMobileMenu()">Harga</a>
    <a href="#proses" class="py-1 border-b border-cream text-muted hover:text-brand-600" onclick="closeMobileMenu()">Proses</a>
    <a href="#testimoni" class="py-1 border-b border-cream text-muted hover:text-brand-600" onclick="closeMobileMenu()">Testimoni</a>
    <a href="#faq" class="py-1 border-b border-cream text-muted hover:text-brand-600" onclick="closeMobileMenu()">FAQ</a>
    <a href="#kontak" class="btn-primary text-center mt-1" onclick="closeMobileMenu()">Konsultasi Gratis</a>
  </div>
</header>
```
> **Penting:** tambahkan class `nav-links` pada `<ul>` desktop — `main.js` meng-query `.nav-links a` untuk active nav (saat ini tidak ada, jadi fitur mati).

- [ ] **Step 4: Hero editorial split**

Tambah di `custom.css`:
```css
.hero-visual { background:var(--night); border-radius:1.75rem; padding:1.75rem; display:flex; flex-direction:column; gap:1rem; position:relative; overflow:hidden; }
.hero-visual::before { content:''; position:absolute; width:14rem; height:14rem; border-radius:50%; background:var(--brand-600); opacity:.22; top:-4rem; right:-4rem; }
.hero-card { background:var(--night-card); border:1px solid var(--night-line); border-radius:1rem; padding:1.1rem 1.25rem; display:flex; align-items:center; gap:.9rem; position:relative; }
.hero-card .ic { width:2.75rem; height:2.75rem; border-radius:.8rem; background:var(--brand-600); color:#fff; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.hero-card .ic svg { width:1.4rem; height:1.4rem; }
.hero-card b { display:block; font-family:var(--font-display); color:#fff; font-size:.95rem; }
.hero-card span { font-size:.75rem; color:rgba(255,255,255,.55); }
```

HTML section `#home`:
```html
<section id="home" class="min-h-screen flex flex-col justify-center pt-24 pb-16 px-6 lg:px-10 max-w-7xl mx-auto">
  <div class="grid lg:grid-cols-[1.1fr_.9fr] gap-14 items-center">
    <div class="reveal">
      <div class="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 rounded-full px-4 py-1.5 text-xs font-bold text-brand-600 mb-6">
        <span class="w-2 h-2 rounded-full bg-brand-500 animate-pulse-dot"></span>
        Studio Desain Grafis Profesional
      </div>
      <h1 class="font-display font-bold text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight mb-6">
        Desain yang<br/><span class="text-brand-600">berbicara</span> untuk<br/>bisnis Anda
      </h1>
      <p class="text-muted text-lg max-w-md mb-8 leading-relaxed">
        Logo berkarakter, desain cetak siap produksi, manual tracing presisi, template Canva siap pakai, hingga mockup produk yang memukau.
      </p>
      <div class="flex flex-wrap gap-3 mb-12">
        <a href="#portfolio" class="btn-primary"><svg class="icon w-5 h-5"><use href="#i-arrow"/></svg> Lihat Karya</a>
        <a href="#kontak" class="btn-outline">Konsultasi Gratis</a>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-cream/80">
        <div><p class="font-display font-bold text-3xl text-ink">800<span class="text-brand-600">+</span></p><p class="text-xs text-muted mt-1">Proyek Selesai</p></div>
        <div><p class="font-display font-bold text-3xl text-ink">350<span class="text-brand-600">+</span></p><p class="text-xs text-muted mt-1">Klien Puas</p></div>
        <div><p class="font-display font-bold text-3xl text-ink">5<span class="text-brand-600">★</span></p><p class="text-xs text-muted mt-1">Rating Rata-rata</p></div>
        <div><p class="font-display font-bold text-3xl text-ink">&lt;3<span class="text-brand-600">hr</span></p><p class="text-xs text-muted mt-1">Waktu Respons</p></div>
      </div>
    </div>
    <div class="hidden lg:block reveal" style="animation-delay:.15s">
      <div class="hero-visual">
        <div class="hero-card"><div class="ic"><svg><use href="#i-logo"/></svg></div><div><b>Desain Logo</b><span>Identitas brand yang kuat</span></div></div>
        <div class="hero-card"><div class="ic" style="background:#1d4ed8"><svg><use href="#i-box"/></svg></div><div><b>Jasa Mockup</b><span>Presentasi produk profesional</span></div></div>
        <div class="hero-card"><div class="ic" style="background:#15803d"><svg><use href="#i-print"/></svg></div><div><b>Desain Cetak</b><span>CMYK siap produksi</span></div></div>
        <p class="text-white/50 text-xs pt-1 pl-1">design.id — dari konsep hingga file final</p>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 5: Verifikasi**

Serve & buka di Playwright: judul tab "design.id", navbar tampil "design.id", hero split 2 kolom (viewport ≥1024px), panel kanan gelap dengan 3 kartu, `.btn-primary` punya bg oranye. Console tanpa error.

- [ ] **Step 6: Commit**

```bash
git add index.html css/custom.css
git commit -m "feat: rebrand to design.id with new navbar and editorial split hero"
```

---

### Task 3: Marquee Klien + Portfolio Bento (gelap)

**Files:**
- Modify: `index.html` — section baru `#portfolio` + marquee setelah hero
- Modify: `css/custom.css` — class marquee & porto

**Interfaces:**
- Produces: `<section id="portfolio" class="section-dark">`, `.marquee`, `.marquee-track`, `.porto-grid`, `.porto-tile`, `.porto-tag`

- [ ] **Step 1: CSS marquee & portfolio**

```css
.marquee { overflow:hidden; border-top:1px solid var(--cream); border-bottom:1px solid var(--cream); padding:1.25rem 0; background:#fff; }
.marquee-track { display:flex; gap:3rem; white-space:nowrap; animation: marquee 28s linear infinite; width:max-content; }
.marquee-track span { font-family:var(--font-display); font-weight:600; font-size:1rem; color:var(--muted); display:flex; align-items:center; gap:3rem; }
@keyframes marquee { to { transform: translateX(-50%); } }
.porto-grid { display:grid; grid-template-columns:repeat(4,1fr); grid-auto-rows:150px; gap:1rem; }
.porto-tile { position:relative; border-radius:1.25rem; overflow:hidden; background:var(--night-card); border:1px solid var(--night-line); display:flex; flex-direction:column; justify-content:flex-end; padding:1.25rem; transition:transform .3s ease, border-color .3s ease; }
.porto-tile:hover { transform:translateY(-4px); border-color:var(--brand-500); }
.porto-tile.big { grid-column:span 2; grid-row:span 2; }
.porto-tile.wide { grid-column:span 2; }
.porto-bg { position:absolute; inset:0; opacity:.85; transition:opacity .3s; }
.porto-tile:hover .porto-bg { opacity:1; }
.porto-tag { align-self:flex-start; font-size:.65rem; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:#fff; background:rgba(0,0,0,.35); border:1px solid rgba(255,255,255,.2); border-radius:999px; padding:.3rem .7rem; position:relative; backdrop-filter:blur(4px); }
.porto-title { font-family:var(--font-display); font-weight:600; color:#fff; font-size:1.05rem; position:relative; margin-top:.75rem; }
.porto-sub { color:rgba(255,255,255,.6); font-size:.8rem; position:relative; }
```

- [ ] **Step 2: Marquee setelah `#home`**

```html
<div class="marquee">
  <div class="marquee-track">
    <span>Kopi Senja ☕ &nbsp;•&nbsp; Skincare Lokalita &nbsp;•&nbsp; Konveksi Jaya Abadi &nbsp;•&nbsp; Katering Bunda &nbsp;•&nbsp; Toko Buku Lembar &nbsp;•&nbsp; Café Rasa &nbsp;•&nbsp; Distro Kreatif &nbsp;•&nbsp; Studio Musik Akustik</span>
    <span>Kopi Senja ☕ &nbsp;•&nbsp; Skincare Lokalita &nbsp;•&nbsp; Konveksi Jaya Abadi &nbsp;•&nbsp; Katering Bunda &nbsp;•&nbsp; Toko Buku Lembar &nbsp;•&nbsp; Café Rasa &nbsp;•&nbsp; Distro Kreatif &nbsp;•&nbsp; Studio Musik Akustik</span>
  </div>
</div>
```
> Emoji ☕ hanya di marquee sebagai aksen — acceptable (bukan ikon UI). Ulangi konten 2× untuk loop seamless.

- [ ] **Step 3: Portfolio bento (section gelap)**

```html
<section id="portfolio" class="section-dark py-24 px-6 lg:px-10">
  <div class="max-w-7xl mx-auto">
    <p class="section-eye reveal">Portfolio</p>
    <div class="flex flex-wrap items-end justify-between gap-6 mb-12">
      <div>
        <h2 class="section-title reveal">Karya yang Sudah Kami Kerjakan</h2>
        <p class="section-sub reveal">Contoh nyata hasil kerja tim kami — dari identitas brand hingga presentasi produk.</p>
      </div>
      <a href="#" class="btn-ghost-dark reveal shrink-0"><svg class="icon w-5 h-5"><use href="#i-layout"/></svg> Lihat di Instagram</a>
    </div>
    <div class="porto-grid">
      <a class="porto-tile big reveal" href="#" onclick="openModal(event,'Desain Logo')">
        <div class="porto-bg" style="background:linear-gradient(135deg,#4A1C08 0%,#C85020 100%)"></div>
        <span class="porto-tag">Logo</span>
        <p class="porto-title">Kopi Senja — Identitas Brand</p>
        <p class="porto-sub">Konsep logo hangat & berkarakter</p>
      </a>
      <a class="porto-tile reveal" href="#" onclick="openModal(event,'Jasa Mockup')">
        <div class="porto-bg" style="background:linear-gradient(135deg,#0F172A 0%,#1D4ED8 100%)"></div>
        <span class="porto-tag">Mockup</span>
        <p class="porto-title">Kemasan Skincare</p>
        <p class="porto-sub">Mockup botol & box</p>
      </a>
      <a class="porto-tile reveal" href="#" onclick="openModal(event,'Desain Cetak')">
        <div class="porto-bg" style="background:linear-gradient(135deg,#052E16 0%,#15803D 100%)"></div>
        <span class="porto-tag">Cetak</span>
        <p class="porto-title">Banner Grand Opening</p>
        <p class="porto-sub">CMYK siap cetak</p>
      </a>
      <a class="porto-tile reveal" href="#" onclick="openModal(event,'Manual Tracing')">
        <div class="porto-bg" style="background:linear-gradient(135deg,#1E1B4B 0%,#7C3AED 100%)"></div>
        <span class="porto-tag">Tracing</span>
        <p class="porto-title">Logo Konveksi</p>
        <p class="porto-sub">Vector presisi untuk bordir</p>
      </a>
      <a class="porto-tile reveal" href="#" onclick="openModal(event,'Template Canva')">
        <div class="porto-bg" style="background:linear-gradient(135deg,#3B0764 0%,#A21CAF 100%)"></div>
        <span class="porto-tag">Canva</span>
        <p class="porto-title">Feed Instagram Katering</p>
        <p class="porto-sub">Template siap edit</p>
      </a>
      <a class="porto-tile wide reveal" href="#" onclick="openModal(event,'Desain Cetak')">
        <div class="porto-bg" style="background:linear-gradient(135deg,#431407 0%,#EA580C 100%)"></div>
        <span class="porto-tag">Cetak</span>
        <p class="porto-title">Brosur Menu Kafe</p>
        <p class="porto-sub">Layout bersih, siap produksi — 2 lipatan A4</p>
      </a>
    </div>
  </div>
</section>
```
> **Grid bento:** tile `big` (col 2 + row 2) di posisi kiri, 2 tile kecil kanan atas, 2 kecil kanan bawah, 1 wide di bawah kiri. Verifikasi visual di desktop: 4 kolom × 3 baris dengan ritme asimetris. Mobile: `porto-grid` jadi 1–2 kolom (tambah media query `grid-template-columns:repeat(2,1fr)` di bawah 640px, `big`/`wide` jadi `grid-column:span 2` di 1 kolom).

- [ ] **Step 4: Verifikasi**

Buka di Playwright viewport 1280×800: section gelap, bento asimetris terlihat, hover tile menaikkan tile. Scroll reveal aktif. Klik tile → modal terbuka dengan layanan sesuai. Viewport 390×844: grid 2 kolom, tidak overflow horizontal.

- [ ] **Step 5: Commit**

```bash
git add index.html css/custom.css
git commit -m "feat: add client marquee and dark bento portfolio section"
```

---

### Task 4: Layanan — Grid 2+1 (terang)

**Files:**
- Modify: `index.html` — section `#layanan`
- Modify: `css/custom.css` — class svc

**Interfaces:**
- Produces: `.svc-grid`, `.svc-card`, `.svc-icon`, `.svc-price`

- [ ] **Step 1: CSS layanan**

```css
.svc-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:1.25rem; }
.svc-card { background:#fff; border:1px solid var(--cream); border-radius:var(--radius); padding:1.75rem; transition:transform .3s ease, box-shadow .3s ease; display:flex; flex-direction:column; }
.svc-card:hover { transform:translateY(-4px); box-shadow:0 18px 40px -18px rgba(17,17,24,.18); }
.svc-card.wide { grid-column:span 2; flex-direction:row; align-items:center; gap:1.5rem; }
.svc-icon { width:3rem; height:3rem; border-radius:.9rem; background:var(--brand-50); color:var(--brand-600); display:flex; align-items:center; justify-content:center; margin-bottom:1.1rem; }
.svc-icon svg { width:1.5rem; height:1.5rem; }
.svc-card.wide .svc-icon { margin-bottom:0; width:4rem; height:4rem; flex-shrink:0; }
.svc-price { margin-top:auto; padding-top:1rem; font-size:.8rem; color:var(--muted); }
.svc-price b { font-family:var(--font-display); font-size:1.35rem; color:var(--ink); }
```

- [ ] **Step 2: HTML section `#layanan` (grid 2+1)**

```html
<section id="layanan" class="py-24 px-6 lg:px-10">
  <div class="max-w-7xl mx-auto">
    <p class="section-eye reveal">Layanan Kami</p>
    <h2 class="section-title reveal">5 Layanan Unggulan</h2>
    <p class="section-sub reveal">Dari identitas brand hingga presentasi produk — semua ada di sini.</p>

    <div class="svc-grid mt-12">
      <!-- Logo -->
      <div class="svc-card reveal">
        <div class="svc-icon"><svg class="icon"><use href="#i-logo"/></svg></div>
        <h3 class="font-display font-bold text-xl mb-2">Desain Logo</h3>
        <p class="text-sm text-muted mb-5 leading-relaxed">Identitas visual yang kuat dan tak terlupakan untuk brand Anda — konsep orisinal, bukan template.</p>
        <p class="svc-price">Mulai dari <b>Rp75K</b></p>
        <a href="#" onclick="openModal(event,'Desain Logo')" class="btn-outline w-full text-center mt-5">Pesan Sekarang</a>
      </div>
      <!-- Cetak -->
      <div class="svc-card reveal" style="animation-delay:.08s">
        <div class="svc-icon" style="background:#EFF6FF; color:#1D4ED8"><svg class="icon"><use href="#i-print"/></svg></div>
        <h3 class="font-display font-bold text-xl mb-2">Desain Cetak</h3>
        <p class="text-sm text-muted mb-5 leading-relaxed">Banner, brosur, flyer, poster — siap produksi, CMYK, resolusi tinggi.</p>
        <p class="svc-price">Mulai dari <b>Rp50K</b></p>
        <a href="#" onclick="openModal(event,'Desain Cetak')" class="btn-outline w-full text-center mt-5">Pesan Sekarang</a>
      </div>
      <!-- Tracing -->
      <div class="svc-card reveal" style="animation-delay:.16s">
        <div class="svc-icon" style="background:#F0FDF4; color:#15803D"><svg class="icon"><use href="#i-pen"/></svg></div>
        <h3 class="font-display font-bold text-xl mb-2">Manual Tracing</h3>
        <p class="text-sm text-muted mb-5 leading-relaxed">Ubah gambar atau foto menjadi vector bersih dan presisi — cocok untuk bordir, cutting, sablon.</p>
        <p class="svc-price">Mulai dari <b>Rp35K</b></p>
        <a href="#" onclick="openModal(event,'Manual Tracing')" class="btn-outline w-full text-center mt-5">Pesan Sekarang</a>
      </div>
      <!-- Canva -->
      <div class="svc-card reveal" style="animation-delay:.24s">
        <div class="svc-icon" style="background:#FAF5FF; color:#7C3AED"><svg class="icon"><use href="#i-layout"/></svg></div>
        <h3 class="font-display font-bold text-xl mb-2">Template Canva</h3>
        <p class="text-sm text-muted mb-5 leading-relaxed">Template Canva custom sesuai brand — tinggal edit, langsung pakai untuk konten sosial media.</p>
        <p class="svc-price">Mulai dari <b>Rp45K</b></p>
        <a href="#" onclick="openModal(event,'Template Canva')" class="btn-outline w-full text-center mt-5">Pesan Sekarang</a>
      </div>
      <!-- Mockup (lebar) -->
      <div class="svc-card wide reveal" style="animation-delay:.32s">
        <div class="svc-icon" style="background:#FFFBEB; color:#B45309"><svg class="icon"><use href="#i-box"/></svg></div>
        <div class="flex-1">
          <h3 class="font-display font-bold text-xl mb-2">Jasa Mockup</h3>
          <p class="text-sm text-muted leading-relaxed">Tampilkan produk atau desain Anda secara realistis dan profesional — kemasan, kaos, tote bag, botol, hingga billboard.</p>
        </div>
        <div class="shrink-0 text-left sm:text-right">
          <p class="svc-price" style="padding-top:0"><b>Rp25K</b><br/><span style="font-size:.75rem">mulai dari</span></p>
          <a href="#" onclick="openModal(event,'Jasa Mockup')" class="btn-primary mt-3">Pesan Sekarang</a>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Verifikasi**

Playwright: 2 kolom kartu (desktop), kartu Mockup lebar full-width dengan layout row, hover mengangkat kartu, tombol membuka modal dengan layanan benar. Mobile: 1 kolom, wide card menumpuk vertikal.

- [ ] **Step 4: Commit**

```bash
git add index.html css/custom.css
git commit -m "feat: redesign services as 2+1 grid with svg icons"
```

---

### Task 5: Harga — Tab per Layanan (gelap)

**Files:**
- Modify: `index.html` — section `#harga` (konten paket dipertahankan, styling gelap)
- Modify: `css/custom.css` — class price dark

**Interfaces:**
- Produces: `.price-tabs`, `.tab-btn` (variasi gelap), `.price-card-dark`, `.price-featured-dark`, `.price-popular`

- [ ] **Step 1: CSS harga gelap**

```css
.price-tabs { display:flex; flex-wrap:wrap; gap:.5rem; }
.price-tabs .tab-btn {
  padding:.65rem 1.25rem; border-radius:999px; font-size:.875rem; font-weight:600;
  border:1px solid var(--night-line); background:transparent; color:rgba(255,255,255,.65);
  transition:all .2s; cursor:pointer;
}
.price-tabs .tab-btn:hover { border-color:var(--brand-400); color:var(--brand-400); }
.price-tabs .tab-active { background:var(--brand-600); border-color:var(--brand-600); color:#fff; }
.price-card-dark {
  background:var(--night-card); border:1px solid var(--night-line); border-radius:var(--radius);
  padding:1.75rem; position:relative; transition:border-color .2s;
}
.price-card-dark:hover { border-color:rgba(255,255,255,.25); }
.price-card-dark.price-featured-dark { border-color:var(--brand-500); }
.price-popular {
  position:absolute; top:-.8rem; left:50%; transform:translateX(-50%);
  background:var(--brand-600); color:#fff; font-size:.6rem; font-weight:700;
  letter-spacing:.1em; text-transform:uppercase; border-radius:999px; padding:.3rem .9rem; white-space:nowrap;
}
.price-tier { font-size:.72rem; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:rgba(255,255,255,.5); margin-bottom:.5rem; }
.price-amount { font-family:var(--font-display); font-weight:700; font-size:2.25rem; color:#fff; margin-bottom:.5rem; }
.price-desc { color:rgba(255,255,255,.6); font-size:.875rem; margin-bottom:1.25rem; }
.price-features { list-style:none; display:flex; flex-direction:column; gap:.6rem; }
.price-features li { font-size:.875rem; color:rgba(255,255,255,.75); display:flex; align-items:flex-start; gap:.5rem; }
.price-features li::before { content:'✓'; color:var(--brand-400); font-weight:700; }
.price-card-dark .btn-outline { border-color:var(--night-line); color:#fff; }
.price-card-dark .btn-outline:hover { border-color:var(--brand-400); color:var(--brand-400); }
```

- [ ] **Step 2: HTML section `#harga`**

```html
<section id="harga" class="section-dark py-24 px-6 lg:px-10">
  <div class="max-w-7xl mx-auto">
    <p class="section-eye reveal">Paket Harga</p>
    <h2 class="section-title reveal">Transparan, Tanpa Biaya Tersembunyi</h2>
    <p class="section-sub reveal">Semua harga sudah termasuk revisi dan file final sesuai paket.</p>

    <div class="price-tabs mt-10 mb-10 reveal" id="priceTabs">
      <button onclick="switchTab('logo')" data-tab="logo" class="tab-btn tab-active">Logo</button>
      <button onclick="switchTab('cetak')" data-tab="cetak" class="tab-btn">Desain Cetak</button>
      <button onclick="switchTab('tracing')" data-tab="tracing" class="tab-btn">Tracing</button>
      <button onclick="switchTab('canva')" data-tab="canva" class="tab-btn">Canva</button>
      <button onclick="switchTab('mockup')" data-tab="mockup" class="tab-btn">Mockup</button>
    </div>

    <div id="pricePanels">
      <div id="panel-logo" class="price-panel grid sm:grid-cols-3 gap-6">
        <!-- 3 kartu paket logo: Starter/Profesional/Brand Kit — konten sama dengan versi lama, class diganti price-card-dark; featured pakai price-featured-dark + price-popular -->
        <!-- … 4 panel lain (cetak, tracing, canva, mockup) sama polanya … -->
      </div>
    </div>
  </div>
</section>
```
> **Konten paket & onclick modal: salin persis dari `index.html` lama (baris 365–566) — harga, fitur, dan `openModal(event,'…')` tidak berubah.** Yang berubah hanya: section jadi `section-dark`, class kartu `price-card` → `price-card-dark`, `price-card-featured` → `price-featured-dark`, emoji pada judul tab dihapus, badge layanan di kartu harga tidak ada (tidak ada di versi lama — tetap tidak ada).

- [ ] **Step 3: Verifikasi**

Playwright: section gelap, 5 tab aktif berganti panel (klik tiap tab, cek panel terlihat/grid), kartu featured berborder oranye dengan badge "PALING POPULER", CTA "Pilih Paket" membuka modal dengan service yang benar.

- [ ] **Step 4: Commit**

```bash
git add index.html css/custom.css
git commit -m "feat: adapt pricing tabs to dark section"
```

---

### Task 6: Proses + Testimoni

**Files:**
- Modify: `index.html` — section `#proses` (terang) & `#testimoni` (gelap)
- Modify: `css/custom.css` — class step & testi

**Interfaces:**
- Produces: `.step-grid`, `.step-card`, `.step-num`, `.testi-featured`, `.testi-card`, `.avatar`

- [ ] **Step 1: CSS proses & testimoni**

```css
.step-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:1rem; }
.step-card { background:#fff; border:1px solid var(--cream); border-radius:var(--radius); padding:1.5rem; position:relative; overflow:hidden; }
.step-num { position:absolute; right:1rem; top:.6rem; font-family:var(--font-display); font-weight:700; font-size:2.75rem; color:var(--cream); line-height:1; }
.step-icon { width:2.5rem; height:2.5rem; border-radius:.75rem; background:var(--brand-50); color:var(--brand-600); display:flex; align-items:center; justify-content:center; margin-bottom:1rem; }
.step-icon svg { width:1.25rem; height:1.25rem; }
@media (max-width:1024px) { .step-grid { grid-template-columns:repeat(2,1fr); } }
@media (max-width:640px) { .step-grid { grid-template-columns:1fr; } }
.testi-featured {
  background:var(--night-card); border:1px solid var(--night-line); border-radius:1.75rem;
  padding:2.5rem; position:relative; overflow:hidden;
}
.testi-featured::before { content:'“'; position:absolute; font-family:Georgia,serif; font-size:10rem; color:var(--brand-600); opacity:.25; top:-2.5rem; left:1.5rem; line-height:1; }
.testi-featured p { font-family:var(--font-display); font-weight:500; font-size:clamp(1.2rem,2.4vw,1.6rem); line-height:1.5; color:#fff; position:relative; }
.testi-featured .who { margin-top:1.5rem; position:relative; display:flex; align-items:center; gap:.75rem; }
.testi-card-dark { background:var(--night-card); border:1px solid var(--night-line); border-radius:var(--radius); padding:1.5rem; }
.testi-card-dark p { font-size:.9rem; color:rgba(255,255,255,.75); line-height:1.65; }
.avatar { width:2.5rem; height:2.5rem; border-radius:999px; display:flex; align-items:center; justify-content:center; font-weight:700; color:#fff; font-size:.85rem; }
.testi-grid { display:grid; grid-template-columns:1.4fr 1fr 1fr; gap:1.25rem; align-items:stretch; }
@media (max-width:1024px) { .testi-grid { grid-template-columns:1fr 1fr; } .testi-featured { grid-column:span 2; } }
@media (max-width:640px) { .testi-grid { grid-template-columns:1fr; } }
```

- [ ] **Step 2: HTML proses (terang, 5 kartu bernomor)**

```html
<section id="proses" class="py-24 px-6 lg:px-10">
  <div class="max-w-7xl mx-auto">
    <p class="section-eye reveal">Alur Kerja</p>
    <h2 class="section-title reveal">Mudah & Transparan</h2>
    <p class="section-sub reveal">Dari konsultasi hingga file final — kamu tahu posisi proyekmu di mana.</p>
    <div class="step-grid mt-12">
      <div class="step-card reveal"><div class="step-num">01</div><div class="step-icon"><svg class="icon"><use href="#i-wa"/></svg></div><h4 class="font-display font-bold mb-2">Konsultasi</h4><p class="text-sm text-muted">Ceritakan kebutuhan & referensi desain via WhatsApp.</p></div>
      <div class="step-card reveal" style="animation-delay:.08s"><div class="step-num">02</div><div class="step-icon"><svg class="icon"><use href="#i-pen"/></svg></div><h4 class="font-display font-bold mb-2">Brief & Penawaran</h4><p class="text-sm text-muted">Kami kirim estimasi harga dan timeline pengerjaan.</p></div>
      <div class="step-card reveal" style="animation-delay:.16s"><div class="step-num">03</div><div class="step-icon"><svg class="icon"><use href="#i-logo"/></svg></div><h4 class="font-display font-bold mb-2">Proses Desain</h4><p class="text-sm text-muted">Tim kami mulai mengerjakan desain sesuai brief.</p></div>
      <div class="step-card reveal" style="animation-delay:.24s"><div class="step-num">04</div><div class="step-icon"><svg class="icon"><use href="#i-arrow"/></svg></div><h4 class="font-display font-bold mb-2">Revisi</h4><p class="text-sm text-muted">Preview dikirim, kamu beri masukan, kami poles.</p></div>
      <div class="step-card reveal" style="animation-delay:.32s"><div class="step-num">05</div><div class="step-icon"><svg class="icon"><use href="#i-box"/></svg></div><h4 class="font-display font-bold mb-2">File Final</h4><p class="text-sm text-muted">Semua file dikirim lengkap, siap cetak & publish.</p></div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: HTML testimoni (gelap, 1 kutipan besar + 2 pendukung)**

```html
<section id="testimoni" class="section-dark py-24 px-6 lg:px-10">
  <div class="max-w-7xl mx-auto">
    <p class="section-eye reveal">Testimoni</p>
    <h2 class="section-title reveal">Kata Klien Kami</h2>
    <p class="section-sub reveal">Lebih dari 350 klien sudah percayakan desain mereka ke design.id.</p>
    <div class="testi-grid mt-12">
      <div class="testi-featured reveal">
        <p>“Mockup kemasan saya terlihat premium banget. Klien saya sampai tanya, 'sudah produksi?' — padahal masih presentasi!”</p>
        <div class="who">
          <div class="avatar" style="background:var(--brand-600)">D</div>
          <div><p style="color:#fff;font-size:.9rem;font-weight:600;margin:0">Dimas Prasetyo</p><p style="color:rgba(255,255,255,.55);font-size:.8rem;margin:0">Founder — Minuman Herbal</p></div>
        </div>
      </div>
      <div class="testi-card-dark reveal" style="animation-delay:.1s">
        <p>“Logo baru kami keren banget! Konsepnya orisinal, tidak pasaran. Revisi cepat direspons. Recommended untuk UMKM!”</p>
        <div class="who" style="display:flex;align-items:center;gap:.75rem;margin-top:1.25rem">
          <div class="avatar" style="background:var(--brand-500)">A</div>
          <div><p style="color:#fff;font-size:.85rem;font-weight:600;margin:0">Ayu Rahmawati</p><p style="color:rgba(255,255,255,.55);font-size:.75rem;margin:0">Owner — Skincare Lokalita</p></div>
        </div>
      </div>
      <div class="testi-card-dark reveal" style="animation-delay:.2s">
        <p>“Manual tracing logo lama saya hasilnya bersih banget, path rapi. Langsung bisa saya pakai buat bordir seragam.”</p>
        <div class="who" style="display:flex;align-items:center;gap:.75rem;margin-top:1.25rem">
          <div class="avatar" style="background:#1D4ED8">B</div>
          <div><p style="color:#fff;font-size:.85rem;font-weight:600;margin:0">Budi Santoso</p><p style="color:rgba(255,255,255,.55);font-size:.75rem;margin:0">Konveksi Jaya Abadi</p></div>
        </div>
      </div>
    </div>
  </div>
</section>
```
> Sesuai spec: Rini (Canva) tidak ditampilkan. 1 kutipan besar (Dimas) + 2 pendukung (Ayu, Budi).

- [ ] **Step 4: Verifikasi**

Playwright: proses grid 5 kolom desktop → 2 kolom tablet → 1 kolom mobile; testimoni 3 kolom desktop (featured lebih lebar 1.4fr), gelap. Kutipan besar tampil dengan tanda kutip dekoratif.

- [ ] **Step 5: Commit**

```bash
git add index.html css/custom.css
git commit -m "feat: redesign process grid and dark testimonial section"
```

---

### Task 7: FAQ + CTA + Footer + Modal

**Files:**
- Modify: `index.html` — `#faq`, `#kontak`, `footer`, `#orderModal`
- Modify: `css/custom.css` — class faq dark-ish & modal

**Interfaces:**
- Produces: `.faq-item` (baru), `.cta-box`, `.input-field`, `#orderModal.open`

- [ ] **Step 1: CSS FAQ + CTA**

```css
.faq-item { background:#fff; border:1px solid var(--cream); border-radius:1rem; overflow:hidden; }
.faq-q { width:100%; display:flex; align-items:center; justify-content:space-between; gap:1rem; text-align:left; font-weight:600; font-size:.95rem; padding:1.25rem 1.5rem; cursor:pointer; transition:color .2s; background:none; border:none; font-family:var(--font-body); color:var(--ink); }
.faq-q:hover { color:var(--brand-600); }
.faq-q svg { transition:transform .3s; }
.faq-item.open .faq-q svg { transform:rotate(180deg); }
.faq-a { display:none; font-size:.9rem; color:var(--muted); line-height:1.65; padding:0 1.5rem 1.25rem; }
.faq-item.open .faq-a { display:block; }
.cta-box { background:var(--night); border-radius:2rem; padding:3.5rem 2rem; position:relative; overflow:hidden; text-align:center; }
.cta-box::before { content:''; position:absolute; width:20rem; height:20rem; border-radius:50%; background:var(--brand-600); opacity:.22; top:-8rem; right:-6rem; }
.cta-box::after { content:''; position:absolute; width:14rem; height:14rem; border-radius:50%; background:var(--brand-400); opacity:.15; bottom:-6rem; left:-4rem; }
.input-field { width:100%; border:2px solid var(--cream); border-radius:.75rem; padding:.75rem 1rem; font-size:.875rem; font-family:var(--font-body); color:var(--ink); background:#fff; outline:none; transition:border-color .2s; }
.input-field:focus { border-color:var(--brand-500); }
```

- [ ] **Step 2: HTML FAQ (terang, accordion dipertahankan — konten 5 pertanyaan lama, icon chevron SVG)**

```html
<section id="faq" class="py-24 px-6 lg:px-10">
  <div class="max-w-3xl mx-auto">
    <p class="section-eye text-center reveal">FAQ</p>
    <h2 class="section-title text-center mx-auto reveal">Pertanyaan Umum</h2>
    <p class="section-sub text-center mx-auto reveal">Jawaban untuk hal-hal yang paling sering ditanyakan.</p>
    <div class="mt-12 flex flex-col gap-3" id="faqList">
      <div class="faq-item reveal">
        <button class="faq-q" onclick="toggleFaq(this)"><span>Berapa lama proses pengerjaannya?</span><svg class="icon w-4 h-4 shrink-0"><use href="#i-chevron"/></svg></button>
        <div class="faq-a">Tergantung jenis layanan. Logo 1–3 hari, desain cetak 1–2 hari, manual tracing 1–2 hari, template Canva 2–4 hari, mockup 1 hari. Semua bisa lebih cepat dengan paket express.</div>
      </div>
      <!-- 4 pertanyaan lain: salin dari index.html lama baris 694–724, ganti <svg ...> dengan <svg class="icon w-4 h-4 shrink-0"><use href="#i-chevron"/></svg> -->
    </div>
  </div>
</section>
```

- [ ] **Step 3: HTML CTA (`#kontak`) + Footer**

```html
<section id="kontak" class="py-24 px-6 lg:px-10">
  <div class="max-w-4xl mx-auto">
    <div class="cta-box reveal">
      <p class="text-white/50 text-xs font-bold uppercase tracking-widest mb-4" style="position:relative">Mulai Sekarang</p>
      <h2 class="font-display font-bold text-white text-4xl lg:text-5xl mb-5" style="position:relative">Siap Wujudkan<br/>Desain Impian?</h2>
      <p class="text-white/60 mb-10 max-w-md mx-auto" style="position:relative">Konsultasikan kebutuhan desain kamu sekarang — gratis, tanpa tekanan. Tim kami siap bantu dari nol.</p>
      <div class="flex flex-wrap justify-center gap-4" style="position:relative">
        <a href="https://wa.me/6281234567890?text=Halo%20design.id%2C%20saya%20mau%20konsultasi%20desain" target="_blank" class="btn-wa">
          <svg class="icon w-5 h-5" style="fill:currentColor;stroke:none"><use href="#i-wa"/></svg>
          Chat WhatsApp Sekarang
        </a>
        <a href="#layanan" class="btn-ghost-dark">Lihat Layanan</a>
      </div>
    </div>
  </div>
</section>

<footer class="bg-[#14120f] text-white/60 py-14 px-6 lg:px-10">
  <div class="max-w-7xl mx-auto">
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
      <div class="lg:col-span-2">
        <a href="#home" class="font-display font-bold text-xl text-white tracking-tight">design<span class="text-brand-500">.id</span></a>
        <p class="mt-3 text-sm leading-relaxed max-w-xs">Studio desain grafis profesional untuk bisnis lokal. Logo, cetak, tracing, Canva, dan mockup — semua di satu tempat.</p>
        <div class="flex gap-3 mt-5">
          <a href="#" class="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-600 flex items-center justify-center transition-colors text-xs font-bold">IG</a>
          <a href="#" class="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-600 flex items-center justify-center transition-colors text-xs font-bold">FB</a>
          <a href="https://wa.me/6281234567890" target="_blank" class="w-9 h-9 rounded-full bg-white/10 hover:bg-green-600 flex items-center justify-center transition-colors">
            <svg class="icon w-4 h-4" style="fill:currentColor;stroke:none"><use href="#i-wa"/></svg>
          </a>
        </div>
      </div>
      <div>
        <h5 class="font-display font-bold text-white text-sm mb-4">Layanan</h5>
        <ul class="flex flex-col gap-2.5 text-sm">
          <li><a href="#layanan" class="hover:text-white transition-colors">Desain Logo</a></li>
          <li><a href="#layanan" class="hover:text-white transition-colors">Desain Cetak</a></li>
          <li><a href="#layanan" class="hover:text-white transition-colors">Manual Tracing</a></li>
          <li><a href="#layanan" class="hover:text-white transition-colors">Template Canva</a></li>
          <li><a href="#layanan" class="hover:text-white transition-colors">Jasa Mockup</a></li>
        </ul>
      </div>
      <div>
        <h5 class="font-display font-bold text-white text-sm mb-4">Kontak</h5>
        <ul class="flex flex-col gap-2.5 text-sm">
          <li>0812-XXXX-XXXX</li>
          <li>halo@design.id</li>
          <li>@design.id</li>
          <li>Senin–Sabtu, 08.00–21.00</li>
        </ul>
      </div>
    </div>
    <div class="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
      <p>© 2026 design.id. All rights reserved.</p>
      <p>Desain yang berbicara untuk bisnis Anda.</p>
    </div>
  </div>
</footer>
```

- [ ] **Step 4: Modal order — update branding & icon**

Modal dipertahankan: form nama/WA/layanan/catatan, tombol "Kirim via WhatsApp". Perubahan: judul tetap "Pesan Layanan", teks footer modal & `submitOrder` message → "design.id". Ikon close "✕" diganti `<svg class="icon w-4 h-4"><use href="#i-close"/></svg>`. Select layanan tetap 5 opsi (tanpa emoji).

- [ ] **Step 5: Verifikasi**

Playwright: FAQ accordion buka/tutup + rotate chevron; CTA box gelap dengan blob oranye; tombol WA → href wa.me dengan teks "Halo design.id"; modal terbuka via tombol layanan, close via ✕/Escape/klik luar; footer branding design.id.

- [ ] **Step 6: Commit**

```bash
git add index.html css/custom.css
git commit -m "feat: restyle faq, cta, footer, and modal with design.id branding"
```

---

### Task 8: JS Updates + Verifikasi Final

**Files:**
- Modify: `js/main.js` — pesan WA, hapus/normalisasi icon d

**Interfaces:**
- Consumes: `#menuIcon` path `d` — ganti ke `<use>` (JS tidak lagi memanipulasi `d`), struktur `#navbar`, `.nav-links`

- [ ] **Step 1: Update `js/main.js` — mobile menu icon via sprite**

`menuIcon` lama memakai `setAttribute('d', …)` — sekarang icon memakai `<use>`, ganti pendekatan: tambahkan dua symbol `#i-menu`/`#i-close`, dan JS toggle class hidden pada `<use>`:

```js
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuUse = document.getElementById('menuUse'); // <use href="#i-menu"> di dalam svg tombol

menuBtn.addEventListener('click', () => {
  const isOpen = !mobileMenu.classList.contains('hidden');
  mobileMenu.classList.toggle('hidden', isOpen);
  menuUse.setAttribute('href', isOpen ? '#i-menu' : '#i-close');
});
function closeMobileMenu() {
  mobileMenu.classList.add('hidden');
  menuUse.setAttribute('href', '#i-menu');
}
```
> Update HTML navbar: `<svg class="icon w-6 h-6"><use id="menuUse" href="#i-menu"/></svg>` — hapus `#menuIcon` path. Hapus juga blok `switchTab` dll? Tidak — semua JS lain (switchTab, toggleFaq, reveal, modal, active nav) dipertahankan persis.

- [ ] **Step 2: Update `submitOrder` — brand design.id**

```js
const msg = [
  `Halo design.id! 👋`,
  ``,
  `Saya ingin memesan layanan desain:`,
  ``,
  `*Nama:* ${name}`,
  `*No. WA:* ${wa}`,
  `*Layanan:* ${service}`,
  `*Catatan:* ${note || '-'}`,
  ``,
  `Mohon info lebih lanjut ya, terima kasih! 🙏`,
].join('\n');
```
> `waNumber` tetap `'6281234567890'`.

- [ ] **Step 3: Cek sisa emoji UI**

Grep `index.html` — pastikan tidak ada emoji di UI (kecuali marquee aksen & pesan WA). Ganti jika ada. Cek juga `js/main.js` — emoji di pesan WA diperbolehkan (pesan ke user, bukan UI).

- [ ] **Step 4: Verifikasi menyeluruh (Playwright)**

1. Load `http://localhost:8777/index.html` viewport 1280×800 — console 0 error (selain favicon 404 yang bisa diabaikan atau tambah `<link rel="icon">` data-uri).
2. Navigasi anchor: klik tiap link navbar → scroll ke section benar; active nav highlight bekerja (class `text-brand-600`).
3. Harga: klik tiap 5 tab → panel berubah.
4. FAQ: klik 2 pertanyaan → accordion.
5. Modal: buka dari kartu layanan & paket harga, submit dengan nama/WA → cek `window.open` URL memuat `wa.me/6281234567890?text=` berisi `Halo design.id!`.
6. Responsive: 390×844 — menu hamburger buka/tutup, grid berubah, tidak ada overflow-x.
7. Screenshot tiap viewport, cek tidak ada elemen overflow/menabrak (visual).

- [ ] **Step 5: Update README**

`README.md`: ganti nama brand → design.id, perbarui deskripsi font (Space Grotesk + Inter), tambahkan section Portfolio ke daftar fitur, ganti contoh kontak (halo@design.id, @design.id).

- [ ] **Step 6: Commit final**

```bash
git add js/main.js index.html README.md
git commit -m "feat: update js interactions and branding to design.id, final polish"
```

---

## Self-Review

**Spec coverage:**
- Rebrand design.id → Task 2, 7, 8 ✓
- Fonts Space Grotesk + Inter → Task 2 ✓
- Hero editorial split → Task 2 ✓
- Marquee klien → Task 3 ✓
- Portfolio bento (gelap) → Task 3 ✓
- Layanan grid 2+1 → Task 4 ✓
- Harga tab per layanan (gelap) → Task 5 ✓
- Proses grid 2 baris → Task 6 ✓
- Testimoni 1 besar + 2 pendukung (gelap) → Task 6 ✓
- FAQ → Task 7 ✓
- CTA gelap + footer → Task 7 ✓
- Modal & interaksi dipertahankan → Task 8 ✓
- Emoji → SVG (sprite) → Task 2, 8 ✓
- Tanpa build step → seluruh plan ✓

**Placeholder scan:** tidak ada "TBD/TODO". Satu area memakai instruksi "salin persis dari baris lama" — itu disengaja (konten sudah ada di repo, bukan placeholder) dan spesifik dengan nomor baris.

**Type consistency:** `#i-*` symbol names konsisten di semua task (i-logo, i-print, i-pen, i-layout, i-box, i-arrow, i-check, i-wa, i-menu, i-close, i-chevron, i-star, i-quote). Class CSS konsisten. `menuUse` dipakai di Task 2 & 8. `switchTab/toggleFaq/openModal/closeMobileMenu` nama sama dengan JS lama.
