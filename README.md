# ABS Developers — interactive web experience

An animated, Three.js-driven site for **ABS Developers**, Pakistan's Shariah-compliant
real estate developer. Single static build — no framework, no build step, one runtime
dependency.

![projects](https://img.shields.io/badge/projects-13-bc3030) ![deps](https://img.shields.io/badge/runtime%20deps-three.js-bc3030) ![build](https://img.shields.io/badge/build%20step-none-bc3030)

## Run it

ES modules need HTTP, not `file://` — opening `index.html` directly shows a blank page:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

Deploy the folder as-is to GitHub Pages, Netlify, Vercel, S3 or nginx.

## Structure

The page follows the company's own information architecture: hero → projects →
register interest → experience our vision → where vision meets value, with About,
Shariah Compliant, Careers and Blog sections behind the same nav the live site uses
(Home · Our Projects · Careers · About Us · Shariah Compliant · Blog).

All 13 developments are included with their real specifications — Burj Quaid (941 ft,
82 storeys, DHA City Karachi), Pearl One Courtyard 1–3 (including Punjab's tallest at
45 storeys), Pearl One Premium, Pearl One Capital, Pearl One Royal, ABS Central,
ABS Executive, Sialkot Central, ABS Mall & Residency 1–2 and Pearl One Tower — each
with its status badge (FLAGSHIP / AVAILABLE / POSSESSION READY / DELIVERED).

## What's under it

**Hero — procedural WebGL skyline.** A seeded night city of instanced towers with a
custom GLSL window grid injected into the standard material, a tapered signature
tower, reflective ground and drifting motes. The camera flies in on load, parallaxes
with the pointer and lifts as you scroll.

**Project artwork — generated, not photographed.** Every card paints its own seeded
skyline onto a 2D canvas, so the site ships with zero image assets, stays sharp at any
DPR, and needs only one WebGL context for the whole page.

**Motion layer — hand-written.** No GSAP, no Lenis. Reveals, word-split headings,
counters, a magnetic cursor, card tilt and the city filter are ~25 KB of plain JS.

## Performance and resilience

| Technique | Where |
|---|---|
| Adaptive resolution — FPS sampled for 1.2 s, pixel ratio stepped down if slow | `src/js/three/city.js` |
| Render loops pause off-screen | city + emblem |
| Fewer instances and particles under 760 px | `createCity()` |
| Device pixel ratio capped at 1.75 | renderer setup |
| Time-based preloader — a slow first frame can't stall it | `src/js/ui.js` |
| Reveals/counters on one rAF scroll sweep, not IntersectionObserver | `src/js/ui.js` |
| WebGL capability check with a CSS fallback; 2D-canvas fallback too | `main.js`, `cardart.js` |
| Full `prefers-reduced-motion` path | throughout |

The sweep matters: an IntersectionObserver only fires when a threshold is *crossed*,
so an anchor jump or End keypress can skip an element and leave it at `opacity: 0`
forever. A sweep activates anything at or above the trigger line regardless.

## Files

```
index.html              markup + import map
src/css/style.css       design system, layout, responsive rules
src/js/data.js          every piece of content on the page
src/js/main.js          renders sections from data, boots everything
src/js/ui.js            reveals, counters, cursor, nav, form
src/js/cardart.js       procedural 2D project artwork
src/js/three/city.js    hero skyline scene
src/js/three/emblem.js  rotating emblem in the About panel
src/vendor/             three.js r169 (MIT, vendored)
```

Edit `src/js/data.js` and the whole page follows — projects, nav, footer, contact
details and copy all render from it.

## Notes

Three.js is vendored rather than loaded from a CDN, so the site works offline and
can't break when a CDN does. Point the import map in `index.html` elsewhere to change
that.

The contact form has no backend; it validates and hands the enquiry to the visitor's
mail client. Wire `initForm()` in `src/js/ui.js` to an endpoint for real submissions.

Project specifications, navigation structure and contact details come from ABS
Developers' own published pages. The layout, code, written copy and every visual here
are original work for this build — no assets, images or marketing text were copied
from the source site.
