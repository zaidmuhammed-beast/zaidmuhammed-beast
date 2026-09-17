/**
 * Entry point — renders every section from data.js, then boots the
 * WebGL scenes and the interaction layer.
 */
import * as data from './data.js';
import { paintProject } from './cardart.js';
import {
  initReveals, initCounters, initCursor, initTilt, initRail,
  initNav, initMarquee, initForm, runPreloader, reduced, clamp
} from './ui.js';

const $ = (sel) => document.querySelector(sel);
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

/* ---------------- render: hero stats ---------------- */
function renderHeroStats() {
  const host = $('#heroStats');
  data.heroStats.forEach((s) => host.append(el('div', 'hs reveal', `<b>${s.k}</b><span>${s.v}</span>`)));
}

/* ---------------- render: stats ---------------- */
function renderStats() {
  const host = $('#statsGrid');
  data.stats.forEach((s) => {
    host.append(el('div', 'stat reveal', `
      <b data-count="${s.value}" data-suffix="${s.suffix}">0${s.suffix}</b>
      <span>${s.label}</span><em>${s.note}</em>`));
  });
}

/* ---------------- render: services ---------------- */
function renderServices() {
  const host = $('#servicesList');
  data.services.forEach((s) => {
    host.append(el('article', 'svc reveal', `
      <span class="svc__n">${s.n}</span>
      <h3 class="svc__title">${s.title}</h3>
      <p class="svc__text">${s.text}</p>
      <div class="svc__tags">${s.tags.map((t) => `<i>${t}</i>`).join('')}</div>`));
  });
}

/* ---------------- render: projects ---------------- */
function renderProjects() {
  const track = $('#railTrack');
  data.projects.forEach((p) => {
    const card = el('article', 'card');
    card.dataset.cursor = 'Drag';
    card.style.setProperty('--accent', p.accent);
    card.innerHTML = `
      <div class="card__vis">
        <span class="card__status">${p.status}</span>
        <span class="card__city">${p.city}</span>
        <canvas></canvas>
      </div>
      <div class="card__body">
        <h3 class="card__name">${p.name}</h3>
        <p class="card__loc">${p.location} · ${p.scale}</p>
        <p class="card__text">${p.text}</p>
        <div class="card__facts">
          ${p.facts.map(([k, v]) => `<div><span>${k}</span><b>${v}</b></div>`).join('')}
        </div>
      </div>`;
    track.append(card);
    paintProject(card.querySelector('canvas'), p);
  });

  // project picker in the contact form + footer list
  const select = $('#fProject');
  ['Not sure yet', ...data.projects.map((p) => p.name)].forEach((name) => {
    select.append(new Option(name, name));
  });
  const fp = $('#footerProjects');
  data.projects.slice(0, 5).forEach((p) => {
    fp.append(el('li', null, `<a href="#projects">${p.name}</a>`));
  });
}

/* ---------------- render: pillars + steps ---------------- */
function renderPillarsAndSteps() {
  const pillars = $('#pillars');
  data.pillars.forEach((p) => pillars.append(el('div', 'pillar reveal', `<b>${p.title}</b><span>${p.text}</span>`)));

  const steps = $('#steps');
  data.steps.forEach((s) => steps.append(el('li', 'step reveal', `
    <b>${s.n}</b><h3>${s.title}</h3><p>${s.text}</p>`)));
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
    // Graceful fallback: a static gradient skyline keeps the hero intact.
    canvas.remove();
    document.querySelector('.hero').style.background =
      'radial-gradient(70% 60% at 50% 80%, #1b2130, #08090c 70%)';
    return;
  }

  const [{ createCity }, { createEmblem }] = await Promise.all([
    import('./three/city.js'),
    import('./three/emblem.js')
  ]);

  const city = createCity(canvas);
  createEmblem($('#emblemCanvas'));

  // scroll drives the hero camera lift
  const hero = $('.hero');
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const p = clamp(scrollY / (hero.offsetHeight || innerHeight), 0, 1);
      city.setScroll(p);
      ticking = false;
    });
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------------- hero intro ---------------- */
function playHeroIntro() {
  const lines = document.querySelectorAll('.hero__title .line > span');
  lines.forEach((s, i) => {
    s.style.transition = 'transform 1.1s cubic-bezier(.22,1,.36,1)';
    s.style.transitionDelay = `${120 + i * 110}ms`;
    s.style.transform = 'translateY(0)';
  });
  document.querySelectorAll('.hero .reveal-line, .hero .hs').forEach((n, i) => {
    n.style.transition = 'opacity .9s cubic-bezier(.22,1,.36,1), transform .9s cubic-bezier(.22,1,.36,1)';
    n.style.transitionDelay = `${320 + i * 110}ms`;
    n.style.opacity = '1';
    n.style.transform = 'none';
  });
}

/* ---------------- boot ---------------- */
function boot() {
  renderHeroStats();
  renderStats();
  renderServices();
  renderProjects();
  renderPillarsAndSteps();

  $('#year').textContent = new Date().getFullYear();

  initMarquee($('#marqueeTrack'), data.marquee);
  initNav();
  initReveals();
  initCounters();
  initCursor();
  initTilt();
  initRail($('#rail'), $('#railBar'));
  initForm(data.company);

  initWebGL();

  if (reduced) {
    document.querySelectorAll('.hero__title .line > span').forEach((s) => (s.style.transform = 'none'));
    document.querySelectorAll('.hero .reveal-line, .hero .hs').forEach((n) => {
      n.style.opacity = '1'; n.style.transform = 'none';
    });
    document.getElementById('preloader')?.remove();
    return;
  }

  runPreloader(playHeroIntro);
}

if (document.readyState === 'loading') addEventListener('DOMContentLoaded', boot);
else boot();
