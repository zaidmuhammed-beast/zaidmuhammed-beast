/**
 * Procedural project artwork.
 * Each card gets a seeded 2D-canvas composition: graded night sky, a layered
 * silhouette skyline with one hero tower, lit windows and a water reflection.
 * No bitmap assets, redraws crisply at any DPR, costs nothing on mobile.
 */

const rng = (seed) => () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;

export function paintProject(canvas, project) {
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(devicePixelRatio || 1, 2);
  if (!ctx) {                       // canvas unavailable — fall back to a flat wash
    canvas.style.background = `linear-gradient(180deg,#131824,${project.accent}22 70%,#06070b)`;
    return { redraw() {}, dispose() {} };
  }

  function draw() {
    const w = canvas.clientWidth || 400;
    const h = canvas.clientHeight || 310;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const r = rng(project.seed * 9173 + 41);
    const accent = project.accent || '#d9a441';
    const horizon = h * 0.78;

    /* sky */
    const sky = ctx.createLinearGradient(0, 0, 0, horizon);
    sky.addColorStop(0, '#0a0d14');
    sky.addColorStop(0.55, '#121824');
    sky.addColorStop(1, '#1d2230');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, horizon);

    /* accent glow behind the hero tower */
    const glowX = w * 0.5;
    const glow = ctx.createRadialGradient(glowX, horizon - h * 0.34, 0, glowX, horizon - h * 0.34, h * 0.62);
    glow.addColorStop(0, hexA(accent, 0.34));
    glow.addColorStop(1, hexA(accent, 0));
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, horizon);

    /* stars */
    ctx.fillStyle = 'rgba(255,255,255,.5)';
    for (let i = 0; i < 46; i++) {
      const sx = r() * w, sy = r() * horizon * 0.62, s = r() * 1.1;
      ctx.globalAlpha = 0.15 + r() * 0.5;
      ctx.fillRect(sx, sy, s, s);
    }
    ctx.globalAlpha = 1;

    /* skyline layers: far → near */
    const layers = [
      { shade: '#141a26', hRange: [0.20, 0.36], wRange: [16, 34], windows: 0.25, y: horizon + 2 },
      { shade: '#0e131d', hRange: [0.26, 0.48], wRange: [20, 40], windows: 0.5, y: horizon + 2 },
      { shade: '#080b12', hRange: [0.16, 0.30], wRange: [26, 52], windows: 0.75, y: horizon + 2 }
    ];

    const heroW = Math.max(34, w * 0.15);
    const heroH = h * (0.52 + r() * 0.12);
    const heroX = glowX - heroW / 2;

    layers.forEach((layer, li) => {
      let x = -20;
      while (x < w + 20) {
        const bw = layer.wRange[0] + r() * (layer.wRange[1] - layer.wRange[0]);
        const bh = h * (layer.hRange[0] + r() * (layer.hRange[1] - layer.hRange[0]));
        const by = layer.y - bh;
        const overlapsHero = li === 2 && x + bw > heroX - 6 && x < heroX + heroW + 6;
        if (!overlapsHero) {
          ctx.fillStyle = layer.shade;
          ctx.fillRect(x, by, bw, bh);
          if (r() > 0.68) { // rooftop plant / mast
            ctx.fillRect(x + bw * 0.42, by - 7 - r() * 9, 2, 9 + r() * 9);
          }
          drawWindows(ctx, x, by, bw, bh, r, layer.windows, accent);
        }
        x += bw + 3 + r() * 7;
      }
    });

    /* hero tower — tapered, in front */
    const steps = 5;
    let cx = heroX, cw = heroW, cy = horizon + 2;
    for (let i = 0; i < steps; i++) {
      const sh = heroH / steps;
      cy -= sh;
      ctx.fillStyle = i % 2 ? '#0b0f17' : '#0d121b';
      ctx.fillRect(cx, cy, cw, sh);
      ctx.strokeStyle = hexA(accent, 0.22);
      ctx.lineWidth = 1;
      ctx.strokeRect(cx + 0.5, cy + 0.5, cw - 1, sh - 1);
      drawWindows(ctx, cx, cy, cw, sh, r, 0.95, accent);
      cx += cw * 0.07; cw *= 0.86;
    }
    /* spire + beacon */
    ctx.strokeStyle = accent; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.moveTo(cx + cw / 2, cy); ctx.lineTo(cx + cw / 2, cy - h * 0.1); ctx.stroke();
    ctx.fillStyle = '#ffe6bb';
    ctx.beginPath(); ctx.arc(cx + cw / 2, cy - h * 0.1, 2.4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = hexA('#ffe6bb', 0.2);
    ctx.beginPath(); ctx.arc(cx + cw / 2, cy - h * 0.1, 7, 0, Math.PI * 2); ctx.fill();

    /* ground + reflection */
    ctx.fillStyle = '#05070b';
    ctx.fillRect(0, horizon, w, h - horizon);
    ctx.save();
    ctx.globalAlpha = 0.18;
    ctx.translate(0, horizon * 2 + 4);
    ctx.scale(1, -1);
    ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, w, h);
    ctx.restore();

    /* horizon line + vignette */
    const hl = ctx.createLinearGradient(0, 0, w, 0);
    hl.addColorStop(0, hexA(accent, 0));
    hl.addColorStop(0.5, hexA(accent, 0.55));
    hl.addColorStop(1, hexA(accent, 0));
    ctx.fillStyle = hl;
    ctx.fillRect(0, horizon, w, 1);

    const vig = ctx.createRadialGradient(w / 2, h / 2, h * 0.22, w / 2, h / 2, h * 0.86);
    vig.addColorStop(0, 'rgba(0,0,0,0)');
    vig.addColorStop(1, 'rgba(0,0,0,.6)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, w, h);
  }

  function drawWindows(c, x, y, bw, bh, r, density, accent) {
    const gx = 5, gy = 7;
    for (let i = gx; i < bw - 3; i += gx) {
      for (let j = gy; j < bh - 4; j += gy) {
        if (r() > density * 0.55) continue;
        c.fillStyle = r() > 0.82 ? hexA(accent, 0.85) : `rgba(255,214,156,${0.25 + r() * 0.5})`;
        c.fillRect(x + i, y + j, 2, 3);
      }
    }
  }

  function hexA(hex, a) {
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
  }

  draw();
  const ro = new ResizeObserver(() => draw());
  ro.observe(canvas);
  return { redraw: draw, dispose: () => ro.disconnect() };
}
