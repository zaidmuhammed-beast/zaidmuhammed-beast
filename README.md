# ABS Developers — interactive web experience

An animated, Three.js-driven website for **ABS Developers (Pvt.) Ltd.**, Pakistan's
Shariah-compliant real estate developer. Built as a single static site with no build
step, no framework and one runtime dependency.

![sections](https://img.shields.io/badge/sections-7-d9a441) ![deps](https://img.shields.io/badge/runtime%20deps-three.js-d9a441) ![build](https://img.shields.io/badge/build%20step-none-d9a441)

## Run it

Any static server works — ES modules need HTTP, not `file://`:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Deploy by uploading the folder as-is (GitHub Pages, Netlify, Vercel, S3, nginx).

## What's in it

**Hero — procedural WebGL skyline.** A seeded night city of ~260 instanced towers
with a custom GLSL window-grid injected into the standard material, a tapered
signature tower, reflective ground plane, drifting motes and volumetric fog. The
camera flies in on load, parallaxes with the pointer and lifts as you scroll.

**Project artwork — generated, not photographed.** Each portfolio card paints its own
seeded skyline onto a 2D canvas (graded sky, layered silhouettes, lit windows,
reflection), so the site ships with zero image assets and stays sharp at any DPR
while using only one extra WebGL context for the whole page.

**Motion layer — hand-written, no GSAP.** IntersectionObserver reveals with stagger,
word-split headings, rAF counters, a magnetic cursor, 3D card tilt and a
drag/wheel/swipe project rail. Total JS outside Three.js is ~25 KB unminified.

## Performance

| Technique | Where |
|---|---|
| Adaptive resolution — FPS sampled for 1.2 s, pixel ratio stepped down if slow | `src/js/three/city.js` |
| Render loops pause off-screen via IntersectionObserver | city + emblem |
| Lower instance and particle counts under 760 px | `createCity()` |
| Device pixel ratio capped at 1.75 | renderer setup |
| Time-based preloader — a slow first frame can't stall it | `src/js/ui.js` |
| WebGL capability check with a CSS gradient fallback | `src/js/main.js` |
| Full `prefers-reduced-motion` path — animation off, content visible | throughout |

## Structure

```
index.html              markup + import map
src/css/style.css       design system, layout, responsive rules
src/js/data.js          all ABS Developers content in one place
src/js/main.js          renders sections from data, boots everything
src/js/ui.js            reveals, counters, cursor, rail, nav, form
src/js/cardart.js       procedural 2D project artwork
src/js/three/city.js    hero skyline scene
src/js/three/emblem.js  rotating emblem in the About panel
src/vendor/             three.js r169 (MIT, vendored for offline use)
```

Content lives in `src/js/data.js` — projects, services, stats and contact details
are rendered from it, so editing that one file updates the whole page.

## Notes

Three.js is vendored locally rather than loaded from a CDN so the site works
offline and can't break when a CDN does. To switch back, point the import map in
`index.html` at your CDN of choice.

The contact form has no backend; it validates input and hands the enquiry to the
visitor's mail client. Wire `initForm()` in `src/js/ui.js` to an endpoint to change that.

Company information (projects, locations, contact details) is drawn from ABS
Developers' public profiles. The design, copy and all visuals here are original
work for this build and are not a reproduction of the company's own site.
