/**
 * About page — company story, board of directors and the benefits list,
 * rendered from `about` in data.js.
 */
import * as data from './data.js';
import { renderChrome } from './chrome.js';
import { initReveals, initCounters, initCursor, initNav, initTilt, reduced, clamp } from './ui.js';

const $ = (s) => document.querySelector(s);
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

const a = data.about;
const initials = (name) => name.replace(/^(Dr|Ar\.|Mr|Ms)\s+/i, '')
  .split(/\s+/).slice(0, 2).map((w) => w[0]).join('');

function render() {
  $('#aTitle').innerHTML = ['About', 'ABS Developers']
    .map((line) => `<span class="line"><span>${line}</span></span>`).join('');
  $('#aLead').textContent = a.lead;

  const pillars = $('#aPillars');
  a.pillars.forEach((p) => pillars.append(el('i', null, p)));

  const story = $('#aStory');
  a.story.forEach((p, i) => story.append(el('p', i === 0 ? 'lede reveal' : 'reveal', p)));

  $('#aPanel').innerHTML = [
    ['Founded', String(data.company.founded)],
    ['Headquarters', 'Lahore, Punjab'],
    ['Portfolio', `${data.projects.length} landmark projects`],
    ['Cities', 'Lahore · Islamabad · Karachi · Sialkot'],
    ['Compliance', '100% Shariah']
  ].map(([k, v]) => `<div class="panel__row"><span>${k}</span><b>${v}</b></div>`).join('');

  const stats = $('#statsGrid');
  data.stats.forEach((s) => stats.append(el('div', 'stat reveal', `
    <b data-count="${s.value}" data-suffix="${s.suffix}">0${s.suffix}</b>
    <span>${s.label}</span><em>${s.note}</em>`)));

  $('#aBoardNote').textContent = a.boardNote;
  const board = $('#aBoard');
  a.board.forEach((m) => board.append(el('article', 'bcard reveal', `
    <span class="bcard__mono" aria-hidden="true">${initials(m.name)}</span>
    <h3>${m.name}</h3><p>${m.role}</p>`)));

  $('#aWhyTitle').textContent = a.whyTitle;
  $('#aWhyNote').textContent = a.whyNote;
  const why = $('#aWhy');
  a.why.forEach(([title, text], i) => why.append(el('article', 'lcard reveal',
    `<b>${String(i + 1).padStart(2, '0')}</b><h3>${title}</h3><p>${text}</p>`)));
}

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
  const [{ createCity }, { createEmblem }] = await Promise.all([
    import('./three/city.js'), import('./three/emblem.js')
  ]);
  const city = createCity(canvas);
  createEmblem($('#emblemCanvas'));
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

function boot() {
  renderChrome();
  render();
  initNav();
  initReveals();
  initCounters();
  initCursor();
  initTilt('.bcard, .lcard');
  initWebGL();

  requestAnimationFrame(() => {
    document.querySelectorAll('.phero .reveal-line').forEach((n, i) => {
      n.style.transition = 'opacity .9s cubic-bezier(.22,1,.36,1), transform .9s cubic-bezier(.22,1,.36,1)';
      n.style.transitionDelay = reduced ? '0ms' : `${200 + i * 100}ms`;
      n.style.opacity = '1';
      n.style.transform = 'none';
    });
    document.querySelectorAll('.phero__title .line > span').forEach((s, i) => {
      s.style.transition = 'transform 1.05s cubic-bezier(.22,1,.36,1)';
      s.style.transitionDelay = reduced ? '0ms' : `${120 + i * 90}ms`;
      s.style.transform = 'translateY(0)';
    });
  });
}

if (document.readyState === 'loading') addEventListener('DOMContentLoaded', boot);
else boot();
