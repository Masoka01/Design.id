/* =============================================
   jasadesain.ld — main.js
============================================= */

/* ── Navbar scroll effect ─────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── Mobile menu ──────────────────────────── */
const menuBtn    = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuUse    = document.getElementById('menuUse'); // <use href="#i-menu"> di dalam svg tombol

menuBtn.addEventListener('click', () => {
  const isOpen = !mobileMenu.classList.contains('hidden');
  mobileMenu.classList.toggle('hidden', isOpen);
  menuUse.setAttribute('href', isOpen ? '#i-menu' : '#i-close');
});

function closeMobileMenu() {
  mobileMenu.classList.add('hidden');
  menuUse.setAttribute('href', '#i-menu');
}

/* ── Scroll reveal ────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = el.style.animationDelay || '0s';
      const ms = parseFloat(delay) * 1000;
      setTimeout(() => el.classList.add('visible'), ms);
      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));

/* ── Pricing tabs ─────────────────────────── */
function switchTab(name) {
  // Panels
  document.querySelectorAll('.price-panel').forEach(p => {
    p.classList.add('hidden');
    p.classList.remove('grid');
  });
  const target = document.getElementById(`panel-${name}`);
  if (target) {
    target.classList.remove('hidden');
    target.classList.add('grid');
  }

  // Tab buttons
  document.querySelectorAll('[data-tab]').forEach(btn => {
    btn.classList.toggle('tab-active', btn.dataset.tab === name);
  });
}

/* ── FAQ accordion ────────────────────────── */
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));

  // Toggle clicked
  if (!isOpen) item.classList.add('open');
}

/* ── Modal ────────────────────────────────── */
function openModal(event, service) {
  event.preventDefault();
  const sel = document.getElementById('f-service');
  // Match service name to an option value
  const options = [...sel.options];
  const match = options.find(o => o.value.toLowerCase().includes(service.split(' ')[1]?.toLowerCase() || '') );
  if (match) sel.value = match.value;
  // Set by full name if possible
  const exactMatch = options.find(o => service.startsWith(o.value));
  if (exactMatch) sel.value = exactMatch.value;

  document.getElementById('orderModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('orderModal').classList.remove('open');
  document.body.style.overflow = '';
}

function closeModalOutside(event) {
  if (event.target === document.getElementById('orderModal')) closeModal();
}

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

/* ── Order submission ─────────────────────── */
function submitOrder() {
  const name    = document.getElementById('f-name').value.trim();
  const wa      = document.getElementById('f-wa').value.trim();
  const service = document.getElementById('f-service').value;
  const note    = document.getElementById('f-note').value.trim();

  if (!name || !wa) {
    alert('Nama dan nomor WhatsApp wajib diisi!');
    return;
  }

  const msg = [
    `Halo jasadesain.ld! 👋`,
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

  // ⚠️  Ganti nomor WA di bawah ini
  const waNumber = '6285732084821';
  window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  closeModal();
}

/* ── Smooth active nav link ───────────────── */
const sections  = document.querySelectorAll('section[id], header[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => {
        a.classList.toggle(
          'text-brand-600',
          a.getAttribute('href') === `#${entry.target.id}`
        );
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));
