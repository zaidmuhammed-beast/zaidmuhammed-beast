/**
 * Interaction layer — dependency-free.
 * IntersectionObserver reveals, word-split headings, rAF counters, a magnetic
 * cursor, a drag/wheel project rail, nav behaviour and form validation.
 */

export const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const isTouch = matchMedia('(hover: none)').matches;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;

/* ----------- shared visibility sweep -----------
 * One rAF-throttled scroll pass drives reveals and counters.
 * An IntersectionObserver only fires when a threshold is *crossed*, so a jump
 * (anchor link, End key, restored scroll position) can skip an element and
 * leave it hidden forever. A sweep can't miss: anything at or above the trigger
 * line is activated, whether we saw it arrive or not.
 */
const watched = [];
let sweepQueued = false;

function queueSweep() {
  if (sweepQueued) return;
  sweepQueued = true;
  requestAnimationFrame(sweep);
}

function sweep() {
  sweepQueued = false;
  const line = innerHeight * 0.88;
  for (let i = watched.length - 1; i >= 0; i--) {
    const w = watched[i];
    const r = w.el.getBoundingClientRect();
    if (r.top > line) continue;              // not reached yet
    // passed above the fold without ever being animated → show it instantly
    w.fire(r.bottom < 0);
    watched.splice(i, 1);
  }
}

function watch(el, fire) {
  watched.push({ el, fire });
  queueSweep();
}

addEventListener('scroll', queueSweep, { passive: true });
addEventListener('resize', queueSweep);

/* ---------------- reveals ---------------- */
export function initReveals(root = document) {
  const items = [...root.querySelectorAll('.reveal, .reveal-line, .split, .step, .hero__title')];
  if (reduced) { items.forEach(show); return; }

  items.forEach((el) => {
    if (el.classList.contains('split')) splitWords(el);
    if (el.classList.contains('reveal') || el.classList.contains('reveal-line')) {
      el.style.transition = 'opacity .9s cubic-bezier(.22,1,.36,1), transform .9s cubic-bezier(.22,1,.36,1)';
    }
    const siblings = [...(el.parentElement?.children || [])].filter((n) => n.classList.contains('reveal'));
    const delay = el.classList.contains('reveal') ? Math.max(0, siblings.indexOf(el)) * 90 : 0;
    watch(el, (instant) => {
      if (instant || !delay) show(el);
      else setTimeout(() => show(el), delay);
    });
  });
}

function show(el) {
  el.classList.add('is-in');
  if (el.classList.contains('reveal') || el.classList.contains('reveal-line')) {
    el.style.opacity = '1';
    el.style.transform = 'none';
  }
  el.querySelectorAll('.word > span, .line > span').forEach((s, i) => {
    s.style.transition = 'transform 1s cubic-bezier(.22,1,.36,1)';
    s.style.transitionDelay = `${i * 55}ms`;
    s.style.transform = 'translateY(0)';
  });
}

export function splitWords(el) {
  if (el.dataset.split) return;
  el.dataset.split = '1';
  const html = el.innerHTML.split(/\s+/).map((w) => `<span class="word"><span>${w}</span></span>`).join(' ');
  el.innerHTML = html;
}

/* ---------------- counters ---------------- */
export function initCounters(root = document) {
  root.querySelectorAll('[data-count]').forEach((el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    watch(el, (instant) => {
      const dur = (reduced || instant) ? 0 : 1500;
      if (!dur) { el.textContent = target + suffix; return; }
      const t0 = performance.now();
      const tick = (now) => {
        const p = clamp((now - t0) / dur, 0, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 4))) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  });
}

/* ---------------- cursor + magnetic ---------------- */
export function initCursor() {
  const cur = document.getElementById('cursor');
  if (!cur || isTouch || reduced) { cur?.remove(); return; }
  const dot = cur.querySelector('.cursor__dot');
  const ring = cur.querySelector('.cursor__ring');
  const label = cur.querySelector('.cursor__label');
  const m = { x: innerWidth / 2, y: innerHeight / 2 };
  const r = { x: m.x, y: m.y };

  addEventListener('pointermove', (e) => { m.x = e.clientX; m.y = e.clientY; }, { passive: true });
  (function raf() {
    r.x = lerp(r.x, m.x, 0.16);
    r.y = lerp(r.y, m.y, 0.16);
    dot.style.transform = `translate(${m.x}px,${m.y}px) translate(-50%,-50%)`;
    ring.style.transform = `translate(${r.x}px,${r.y}px) translate(-50%,-50%)`;
    label.style.transform = `translate(${r.x}px,${r.y}px) translate(-50%,-50%)`;
    requestAnimationFrame(raf);
  })();

  document.querySelectorAll('a,button,[data-cursor],.card,.svc').forEach((el) => {
    el.addEventListener('pointerenter', () => {
      cur.classList.add('is-active');
      label.textContent = el.dataset.cursor || '';
    });
    el.addEventListener('pointerleave', () => {
      cur.classList.remove('is-active');
      label.textContent = '';
    });
  });

  // magnetic buttons
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('pointermove', (e) => {
      const b = btn.getBoundingClientRect();
      const x = (e.clientX - b.left - b.width / 2) * 0.28;
      const y = (e.clientY - b.top - b.height / 2) * 0.4;
      btn.style.transform = `translate(${x}px,${y}px)`;
    });
    btn.addEventListener('pointerleave', () => { btn.style.transform = 'translate(0,0)'; });
  });
}

/* ---------------- card tilt ---------------- */
export function initTilt(selector = '.card') {
  if (isTouch || reduced) return;
  document.querySelectorAll(selector).forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const b = card.getBoundingClientRect();
      const px = (e.clientX - b.left) / b.width - 0.5;
      const py = (e.clientY - b.top) / b.height - 0.5;
      card.style.transform =
        `perspective(900px) rotateY(${px * 7}deg) rotateX(${-py * 7}deg) translateY(-6px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });
}

/* ---------------- horizontal rail ---------------- */
export function initRail(railEl, barEl) {
  if (!railEl) return;
  let down = false, startX = 0, startScroll = 0, moved = 0;

  railEl.addEventListener('pointerdown', (e) => {
    down = true; moved = 0;
    startX = e.clientX; startScroll = railEl.scrollLeft;
    railEl.classList.add('is-dragging');
    railEl.setPointerCapture?.(e.pointerId);
  });
  railEl.addEventListener('pointermove', (e) => {
    if (!down) return;
    const dx = e.clientX - startX;
    moved = Math.abs(dx);
    railEl.scrollLeft = startScroll - dx;
  });
  const end = () => { down = false; railEl.classList.remove('is-dragging'); };
  railEl.addEventListener('pointerup', end);
  railEl.addEventListener('pointercancel', end);
  railEl.addEventListener('pointerleave', end);
  railEl.addEventListener('click', (e) => { if (moved > 8) e.preventDefault(); }, true);

  // vertical wheel → horizontal, but hand back at the ends so the page keeps scrolling
  railEl.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
    const max = railEl.scrollWidth - railEl.clientWidth;
    const next = railEl.scrollLeft + e.deltaY;
    if (next > 0 && next < max) { e.preventDefault(); railEl.scrollLeft = next; }
  }, { passive: false });

  const update = () => {
    const max = railEl.scrollWidth - railEl.clientWidth || 1;
    const p = clamp(railEl.scrollLeft / max, 0, 1);
    if (barEl) {
      const track = 1 - 0.12;
      barEl.style.transform = `translateX(${(p * track * 100) / 0.12}%)`;
    }
  };
  railEl.addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
  update();
}

/* ---------------- nav + menu + progress ---------------- */
export function initNav() {
  const nav = document.getElementById('nav');
  const bar = document.getElementById('scrollBar');
  const burger = document.getElementById('burger');
  const menu = document.getElementById('menu');
  let last = 0;

  const onScroll = () => {
    const y = scrollY;
    nav.classList.toggle('is-stuck', y > 40);
    nav.classList.toggle('is-hidden', y > 400 && y > last && !menu.classList.contains('is-open'));
    last = y;
    const max = document.body.scrollHeight - innerHeight || 1;
    if (bar) bar.style.width = `${clamp(y / max, 0, 1) * 100}%`;
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const toggle = (open) => {
    menu.classList.toggle('is-open', open);
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('is-locked', open);
  };
  burger?.addEventListener('click', () => toggle(!menu.classList.contains('is-open')));
  menu?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => toggle(false)));
  addEventListener('keydown', (e) => { if (e.key === 'Escape') toggle(false); });

  // active link
  const links = [...document.querySelectorAll('.nav__links a')];
  const sections = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((l) => l.classList.toggle('is-current', l.getAttribute('href') === `#${e.target.id}`));
    });
  }, { threshold: 0.4, rootMargin: '-20% 0px -40% 0px' });
  sections.forEach((s) => io.observe(s));
}

/* ---------------- marquee ---------------- */
export function initMarquee(track, items) {
  if (!track) return;
  const chunk = items.map((t) => `<span>${t}</span>`).join('');
  track.innerHTML = chunk + chunk + chunk;
  if (reduced) return;
  let x = 0;
  const speed = 0.45;
  let width = 0;
  const measure = () => { width = track.scrollWidth / 3; };
  measure();
  addEventListener('resize', measure);
  (function raf() {
    x -= speed;
    if (width && -x >= width) x += width;
    track.style.transform = `translate3d(${x}px,0,0)`;
    requestAnimationFrame(raf);
  })();
}

/* ---------------- form ---------------- */
export function initForm(company) {
  const form = document.getElementById('form');
  const note = document.getElementById('formNote');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    ['fName', 'fPhone', 'fEmail'].forEach((id) => {
      const input = document.getElementById(id);
      const valid = id === 'fEmail'
        ? /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(input.value.trim())
        : input.value.trim().length > 1;
      input.parentElement.classList.toggle('is-error', !valid);
      if (!valid) ok = false;
    });
    if (!ok) { note.textContent = 'Please check the highlighted fields.'; return; }

    // No backend in this build — hand the enquiry to the user's mail client.
    const data = new FormData(form);
    const body = [
      `Name: ${data.get('name')}`,
      `Phone: ${data.get('phone')}`,
      `Email: ${data.get('email')}`,
      `Project: ${data.get('project')}`,
      '',
      data.get('message') || ''
    ].join('\n');
    note.textContent = 'Opening your mail app with this enquiry…';
    location.href = `mailto:${company.email}?subject=${encodeURIComponent(
      `Enquiry — ${data.get('project')}`)}&body=${encodeURIComponent(body)}`;
    form.reset();
  });
}

/* ---------------- preloader ---------------- */
export function runPreloader(onDone) {
  const el = document.getElementById('preloader');
  const bar = document.getElementById('preloaderBar');
  const pct = document.getElementById('preloaderPct');
  const t0 = performance.now();
  const RAMP = 1100;        // ms to reach the holding point
  const HOLD = 96;          // % held until the page reports ready
  let ready = false, done = false;

  // Progress is driven by elapsed time, not frame count, so a slow first
  // frame (software WebGL, low-end phones) can't stall the bar.
  const tick = (now) => {
    const t = clamp((now - t0) / RAMP, 0, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    const p = ready ? Math.max(HOLD * eased, HOLD) + (100 - HOLD) * clamp((now - readyAt) / 260, 0, 1)
                    : HOLD * eased;
    bar.style.width = `${p}%`;
    pct.textContent = Math.round(p);
    if (p >= 99.5 && !done) {
      done = true;
      el.classList.add('is-done');
      el.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 650, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards' }
      ).onfinish = () => { el.remove(); onDone?.(); };
      return;
    }
    requestAnimationFrame(tick);
  };

  let readyAt = Infinity;
  const markReady = () => { if (!ready) { ready = true; readyAt = performance.now(); } };
  Promise.race([
    Promise.all([
      document.fonts?.ready ?? Promise.resolve(),
      new Promise((res) => (document.readyState === 'complete' ? res() : addEventListener('load', res)))
    ]),
    new Promise((res) => setTimeout(res, 2600))   // never hold the page hostage to a slow font
  ]).then(markReady);

  // hard stop: the intro must never outlive this
  setTimeout(markReady, 5000);

  requestAnimationFrame(tick);
}

export { clamp, lerp };
