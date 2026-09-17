/**
 * Entry point — renders every section from data.js, then boots the
 * WebGL scenes and the interaction layer.
 */
import * as data from './data.js';
import { paintProject } from './cardart.js';
import {
  initReveals, initCounters, initCursor, initTilt,
  initNav, initMarquee, initForm, runPreloader, reduced, clamp
} from './ui.js';

const $ = (s) => document.querySelector(s);
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

/* ---------------- nav + menu ---------------- */
function renderNav() {
  const links = $('#navLinks');
  const menu = $('#menuList');
  data.nav.forEach((item, i) => {
    const a = el('a', null, item.label);
    a.href = item.href;
    links.append(a);
    menu.append(el('li', null, `<a href="${item.href}"><b>0${i + 1}</b>${item.label}</a>`));
  });
  menu.append(el('li', null, `<a href="#interest"><b>0${data.nav.length + 1}</b>Contact Us</a>`));

  const c = data.company;
  $('#menuAddress').innerHTML = c.address.replace(/, /g, ',<br/>');
  const phone = $('#menuPhone'); phone.textContent = c.phone; phone.href = `tel:${c.phoneHref}`;
  const mail = $('#menuEmail'); mail.textContent = c.email; mail.href = `mailto:${c.email}`;
}

/* ---------------- hero ---------------- */
function renderHero() {
  const h = data.hero;
  $('#heroEyebrow').textContent = h.eyebrow;
  $('#heroLead').textContent = h.lead;
  $('#heroTitle').innerHTML = h.title
    .map((line, i) => `<span class="line"><span${i === h.title.length - 1 ? ' class="accent"' : ''}>${line}</span></span>`)
    .join('');
  $('#heroSub').textContent = h.sub;
  const actions = $('#heroActions');
  h.ctas.forEach((c) => {
    const a = el('a', c.primary ? 'btn' : 'btn btn--ghost',
      `${c.label}${c.primary ? '<i class="btn__arrow">→</i>' : ''}`);
    a.href = c.href;
    a.dataset.cursor = c.primary ? 'Book' : 'View';
    actions.append(a);
  });
}

/* ---------------- projects ---------------- */
function renderProjects() {
  const grid = $('#projectGrid');
  data.projects.forEach((p) => {
    const card = el('article', 'card');
    card.dataset.city = p.city;
    card.dataset.cursor = 'View';
    card.innerHTML = `
      <div class="card__vis">
        <span class="card__badge" data-badge="${p.badge}">${p.badge}</span>
        <canvas></canvas>
        <div class="card__stats">
          ${p.stats.map(([v, l]) => `<div><b>${v}</b><span>${l}</span></div>`).join('')}
        </div>
      </div>
      <div class="card__body">
        <h3 class="card__name">${p.name}</h3>
        <p class="card__loc">${p.location}</p>
        <p class="card__note">${p.note}</p>
        <div class="card__tags">${p.tags.map((t) => `<i>${t}</i>`).join('')}</div>
      </div>`;
    grid.append(card);
    paintProject(card.querySelector('canvas'), p);
  });

  // city filter
  const cities = ['All', ...new Set(data.projects.map((p) => p.city))];
  const bar = $('#filters');
  cities.forEach((city, i) => {
    const b = el('button', i === 0 ? 'is-on' : null, city);
    b.type = 'button';
    b.addEventListener('click', () => {
      bar.querySelectorAll('button').forEach((n) => n.classList.remove('is-on'));
      b.classList.add('is-on');
      grid.querySelectorAll('.card').forEach((card) => {
        card.classList.toggle('is-hidden', city !== 'All' && card.dataset.city !== city);
      });
    });
    bar.append(b);
  });

  const select = $('#fProject');
  ['Not sure yet', ...data.projects.map((p) => p.name)].forEach((n) => select.append(new Option(n, n)));
}

/* ---------------- stats / about / shariah ---------------- */
function renderStats() {
  const host = $('#statsGrid');
  data.stats.forEach((s) => host.append(el('div', 'stat reveal', `
    <b data-count="${s.value}" data-suffix="${s.suffix}">0${s.suffix}</b>
    <span>${s.label}</span><em>${s.note}</em>`)));
}

function renderAbout() {
  const rows = [
    ['Headquarters', 'Lahore, Punjab'],
    ['Cities', 'Lahore · Islamabad · Karachi · Sialkot'],
    ['Portfolio', `${data.projects.length} landmark projects`],
    ['Tallest', 'Burj Quaid — 941 ft'],
    ['Compliance', '100% Shariah']
  ];
  $('#aboutPanel').innerHTML = rows
    .map(([k, v]) => `<div class="panel__row"><span>${k}</span><b>${v}</b></div>`).join('');

  const pillars = $('#pillars');
  data.pillars.forEach((p) => pillars.append(el('div', 'pillar reveal', `<b>${p.title}</b><span>${p.text}</span>`)));
}

/* ---------------- vision / value / careers / blog ---------------- */
function renderVision() {
  $('#visionTitle').textContent = data.vision.title;
  $('#visionSub').textContent = data.vision.sub;
  const grid = $('#visionGrid');
  data.vision.items.forEach((v) => {
    const tile = el('article', 'vtile reveal');
    tile.dataset.cursor = 'Play';
    tile.innerHTML = `
      <canvas></canvas>
      <span class="vtile__len">${v.len}</span>
      <div class="vtile__play"><i></i></div>
      <div class="vtile__body"><b>${v.name}</b><span>${v.sub}</span></div>`;
    grid.append(tile);
    paintProject(tile.querySelector('canvas'), { seed: v.seed, accent: '#d9a441' });
  });
}

function renderValue() {
  $('#valueBadge').textContent = data.value.badge;
  $('#valueTitle').textContent = data.value.title;
  $('#valueText').textContent = data.value.text;
  const ul = $('#valuePoints');
  data.value.points.forEach((p) => ul.append(el('li', 'reveal', p)));
}

function renderCareersAndBlog() {
  $('#careersTitle').textContent = data.careers.title;
  $('#careersText').textContent = data.careers.text;
  const roles = $('#roles');
  data.careers.roles.forEach((r) => roles.append(el('li', 'reveal', r)));

  const posts = $('#posts');
  data.blog.forEach((p) => posts.append(el('article', 'post reveal',
    `<b>${p.tag}</b><h3>${p.title}</h3><span>${p.read}</span>`)));
}

/* ---------------- footer ---------------- */
function renderFooter() {
  const c = data.company;
  $('#footerBlurb').textContent = c.blurb;
  const cols = $('#footerCols');
  Object.entries(data.footerLinks).forEach(([title, links]) => {
    cols.append(el('div', null,
      `<p class="menu__label">${title}</p><ul>${
        links.map(([label, href]) => `<li><a href="${href}">${label}</a></li>`).join('')}</ul>`));
  });
  $('#fAddress').textContent = c.address;
  const p = $('#fPhoneLink'); p.textContent = c.phone; p.href = `tel:${c.phoneHref}`;
  const m = $('#fEmailLink'); m.textContent = c.email; m.href = `mailto:${c.email}`;
  $('#fSite').textContent = c.site;
  $('#cAddress').textContent = c.address;
  const cp = $('#cPhone'); cp.textContent = c.phone; cp.href = `tel:${c.phoneHref}`;
  const ce = $('#cEmail'); ce.textContent = c.email; ce.href = `mailto:${c.email}`;
  $('#year').textContent = new Date().getFullYear();
}

/* country codes for the phone field, as the live form has */
function renderCodes() {
  const codes = ['+92 PK', '+971 AE', '+966 SA', '+44 UK', '+1 US', '+61 AU', '+60 MY', '+90 TR', '+86 CN'];
  const sel = $('#fCode');
  codes.forEach((c) => sel.append(new Option(c, c.split(' ')[0])));
}

/* ---------------- WebGL ---------------- */
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
    $('.hero').style.background = 'radial-gradient(70% 60% at 50% 80%, #2a2a2a, #121212 70%)';
    return;
  }

  const [{ createCity }, { createEmblem }] = await Promise.all([
    import('./three/city.js'),
    import('./three/emblem.js')
  ]);

  const city = createCity(canvas);
  createEmblem($('#emblemCanvas'));

  const hero = $('.hero');
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      city.setScroll(clamp(scrollY / (hero.offsetHeight || innerHeight), 0, 1));
      ticking = false;
    });
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------------- hero intro ---------------- */
function playHeroIntro() {
  document.querySelectorAll('.hero__title .line > span').forEach((s, i) => {
    s.style.transition = 'transform 1.1s cubic-bezier(.22,1,.36,1)';
    s.style.transitionDelay = `${120 + i * 110}ms`;
    s.style.transform = 'translateY(0)';
  });
  document.querySelectorAll('.hero .reveal-line').forEach((n, i) => {
    n.style.transition = 'opacity .9s cubic-bezier(.22,1,.36,1), transform .9s cubic-bezier(.22,1,.36,1)';
    n.style.transitionDelay = `${300 + i * 110}ms`;
    n.style.opacity = '1';
    n.style.transform = 'none';
  });
}

/* ---------------- boot ---------------- */
function boot() {
  renderNav();
  renderHero();
  renderProjects();
  renderStats();
  renderAbout();
  renderVision();
  renderValue();
  renderCareersAndBlog();
  renderCodes();
  renderFooter();

  initMarquee($('#marqueeTrack'), data.marquee);
  initNav();
  initReveals();
  initCounters();
  initCursor();
  initTilt();
  initForm(data.company);
  initWebGL();

  if (reduced) {
    document.querySelectorAll('.hero__title .line > span').forEach((s) => (s.style.transform = 'none'));
    document.querySelectorAll('.hero .reveal-line').forEach((n) => {
      n.style.opacity = '1'; n.style.transform = 'none';
    });
    $('#preloader')?.remove();
    return;
  }
  runPreloader(playHeroIntro);
}

if (document.readyState === 'loading') addEventListener('DOMContentLoaded', boot);
else boot();
