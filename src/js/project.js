/**
 * Project detail page.
 * Reads the page id from <body data-project="…">, renders the project's
 * specifications, location, galleries, landmarks and amenities from data.js,
 * then boots the shared hero scene and interaction layer.
 */
import * as data from './data.js';
import { paintProject } from './cardart.js';
import { initReveals, initCursor, initNav, initForm, initTilt, reduced, clamp } from './ui.js';

const $ = (s) => document.querySelector(s);
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

const page = data.projectPages[document.body.dataset.project];
if (!page) throw new Error(`Unknown project page: ${document.body.dataset.project}`);

/* ---------------- shared chrome ---------------- */
function renderChrome() {
  const links = $('#navLinks');
  const menu = $('#menuList');
  data.nav.forEach((item, i) => {
    const href = item.href === '#home' ? 'index.html' : `index.html${item.href}`;
    const a = el('a', null, item.label);
    a.href = href;
    links.append(a);
    menu.append(el('li', null, `<a href="${href}"><b>0${i + 1}</b>${item.label}</a>`));
  });
  menu.append(el('li', null, `<a href="#interest"><b>0${data.nav.length + 1}</b>Contact Us</a>`));

  const c = data.company;
  $('#menuAddress').innerHTML = c.address.replace(/, /g, ',<br/>');
  const set = (id, text, href) => { const n = $(id); if (!n) return; n.textContent = text; if (href) n.href = href; };
  set('#menuPhone', c.phone, `tel:${c.phoneHref}`);
  set('#menuEmail', c.email, `mailto:${c.email}`);
  set('#cAddress', c.address);
  set('#cPhone', c.phone, `tel:${c.phoneHref}`);
  set('#cEmail', c.email, `mailto:${c.email}`);
  set('#fAddress', c.address);
  set('#fPhoneLink', c.phone, `tel:${c.phoneHref}`);
  set('#fEmailLink', c.email, `mailto:${c.email}`);
  set('#fSite', c.site);
  set('#footerBlurb', c.blurb);
  $('#year').textContent = new Date().getFullYear();

  const cols = $('#footerCols');
  Object.entries(data.footerLinks).forEach(([title, links2]) => {
    cols.append(el('div', null, `<p class="menu__label">${title}</p><ul>${
      links2.map(([label, href]) =>
        `<li><a href="${href.startsWith('#interest') ? href : `index.html${href}`}">${label}</a></li>`).join('')
    }</ul>`));
  });

  const sel = $('#fProject');
  ['Not sure yet', ...data.projects.map((p) => p.name)].forEach((n) => sel.append(new Option(n, n)));
  sel.value = page.name;

  const codes = ['+92 PK', '+971 AE', '+966 SA', '+44 UK', '+1 US', '+61 AU', '+60 MY', '+90 TR', '+86 CN'];
  const code = $('#fCode');
  codes.forEach((c2) => code.append(new Option(c2, c2.split(' ')[0])));
}

/* ---------------- hero ---------------- */
function renderHero() {
  $('#pEyebrow').textContent = page.eyebrow;
  $('#pTitle').innerHTML = page.name.split(' ')
    .map((w) => `<span class="line"><span>${w}</span></span>`).join('');
  $('#pTagline').textContent = page.tagline;
  $('#pStand').textContent = page.standfirst;
  $('#pMarket').textContent = page.marketedBy || '';

  const specs = $('#pSpecs');
  page.specs.forEach(([v, l]) => specs.append(el('div', 'pspec', `<b>${v}</b><span>${l}</span>`)));

  const appr = $('#pApprovals');
  if (appr) (page.approvals || []).forEach((a) => appr.append(el('i', null, a)));
  const market = $('#pMarket');
  if (market && !page.marketedBy) market.remove();
}

/* ---------------- location ---------------- */
function renderLocation() {
  const grid = $('#travelGrid');
  if (grid && page.travel) {
    $('#travelTitle').textContent = page.travel.title;
    page.travel.items.forEach(([time, from]) => {
      grid.append(el('div', 'tcard reveal', `<b>${time}</b><span>${from}</span>`));
    });
  }
  if (page.location) {
    const t = $('#locTitle'), x = $('#locText');
    if (t) t.textContent = page.location.title;
    if (x) x.textContent = page.location.text;
  }
}

/* ---------------- residential + commercial mix ---------------- */
function renderUnits() {
  const rows = (host, items) => {
    if (!host || !items) return;
    items.forEach((u) => host.append(el('article', 'unit reveal', `
      <div class="unit__head"><h3>${u.type}</h3>${u.size ? `<b>${u.size}</b>` : ''}</div>
      ${u.note ? `<p>${u.note}</p>` : ''}`)));
  };
  rows($('#unitList'), page.units);
  rows($('#commercialList'), page.commercial);
}

/* ---------------- booking process ---------------- */
function renderBooking() {
  const host = $('#bookingSteps');
  if (!host || !page.booking) return;
  const b = page.booking;
  const note = $('#bookingNote');
  if (note) note.textContent = b.note || '';
  b.steps.forEach((st, i) => host.append(el('li', 'bstep reveal', `
    <b>${String(i + 1).padStart(2, '0')}</b><h3>${st.title}</h3><p>${st.text}</p>`)));
  const cts = $('#bookingContacts');
  if (cts) (b.contacts || []).forEach(([label, value, href]) => {
    cts.append(el('li', 'reveal', `<span>${label}</span><b><a href="${href}">${value}</a></b>`));
  });
}

/* ---------------- galleries ---------------- */
function renderGalleries() {
  const host = $('#galleryHost');
  if (!host || !page.galleries) return;
  page.galleries.forEach((g, gi) => {
    const block = el('div', 'gblock');
    block.innerHTML = `
      <header class="sec-head">
        <p class="tag reveal">${g.sub}</p>
        <h2 class="h2 split">${g.title}</h2>
      </header>
      <div class="gtiles"></div>`;
    const tiles = block.querySelector('.gtiles');
    for (let i = 0; i < g.tiles; i++) {
      const t = el('figure', 'gtile reveal', '<canvas></canvas>');
      t.dataset.cursor = 'View';
      tiles.append(t);
      paintProject(t.querySelector('canvas'), { seed: page.seed * 31 + gi * 7 + i, accent: page.accent });
    }
    host.append(block);
  });
}

/* ---------------- landmarks + amenities ---------------- */
function setText(sel, value) {
  const n = $(sel);
  if (n && value) n.textContent = value;
}

function renderHeadings() {
  setText('#unitsTitle', page.unitsTitle);
  setText('#unitsNote', page.unitsNote);
  setText('#commercialTitle', page.commercialTitle);
  setText('#landmarksTag', page.landmarksTag);
  setText('#landmarksTitle', page.landmarksTitle);
  setText('#bookingTitle', page.booking?.title);
  setText('#travelTitle', page.travel?.title);
}

/* A project renders only the sections it has data for — drop the rest so no
 * empty heading is left standing. */
function pruneEmptySections() {
  document.querySelectorAll('main section[data-needs]').forEach((sec) => {
    const host = sec.querySelector(sec.dataset.needs);
    if (!host || (!host.children.length && !host.textContent.trim())) sec.remove();
  });
}

function renderFeatures() {
  const grid = $('#landmarkGrid');
  if (grid && page.landmarks) {
    page.landmarks.forEach(([title, text], i) => {
      grid.append(el('article', 'lcard reveal',
        `<b>${String(i + 1).padStart(2, '0')}</b><h3>${title}</h3><p>${text}</p>`));
    });
  }
  const list = $('#amenList');
  if (list && page.amenities) page.amenities.forEach((a) => list.append(el('li', 'reveal', a)));
}

/* ---------------- WebGL hero ---------------- */
async function initWebGL() {
  const canvas = $('#cityCanvas');
  const supported = (() => {
    try {
      const c = document.createElement('canvas');
      return !!(c.getContext('webgl2') || c.getContext('webgl'));
    } catch { return false; }
  })();
  if (!supported) {
    canvas.remove();
    $('.phero').style.background = 'radial-gradient(70% 60% at 50% 80%, #1b2130, #08090c 70%)';
    return;
  }
  const { createCity } = await import('./three/city.js');
  const city = createCity(canvas);
  const hero = $('.phero');
  let ticking = false;
  addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      city.setScroll(clamp(scrollY / (hero.offsetHeight || innerHeight), 0, 1));
      ticking = false;
    });
  }, { passive: true });
}

/* ---------------- boot ---------------- */
function boot() {
  renderChrome();
  renderHero();
  renderLocation();
  renderUnits();
  renderBooking();
  renderGalleries();
  renderFeatures();
  renderHeadings();

  pruneEmptySections();

  initNav();
  initReveals();
  initCursor();
  initTilt('.gtile, .lcard, .unit');
  initForm(data.company);
  initWebGL();

  // the detail page has no preloader — reveal the hero immediately
  const show = (n, i) => {
    n.style.transition = 'opacity .9s cubic-bezier(.22,1,.36,1), transform .9s cubic-bezier(.22,1,.36,1)';
    n.style.transitionDelay = reduced ? '0ms' : `${200 + i * 100}ms`;
    n.style.opacity = '1';
    n.style.transform = 'none';
  };
  requestAnimationFrame(() => {
    document.querySelectorAll('.phero .reveal-line').forEach(show);
    document.querySelectorAll('.phero__title .line > span').forEach((s, i) => {
      s.style.transition = 'transform 1.05s cubic-bezier(.22,1,.36,1)';
      s.style.transitionDelay = reduced ? '0ms' : `${120 + i * 90}ms`;
      s.style.transform = 'translateY(0)';
    });
  });
}

if (document.readyState === 'loading') addEventListener('DOMContentLoaded', boot);
else boot();
