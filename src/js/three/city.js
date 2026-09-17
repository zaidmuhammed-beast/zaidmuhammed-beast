/**
 * Hero scene — a procedural night skyline.
 * Instanced tower blocks with a shader-driven window grid, a taller
 * signature tower at the centre, reflective ground haze and drifting motes.
 * Everything is generated from a seeded PRNG so the layout is deterministic.
 */
import * as THREE from 'three';

const rand = (seed) => () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296;

/* ---- window-grid shader injected into MeshStandardMaterial ---- */
function windowMaterial(opts = {}) {
  const mat = new THREE.MeshStandardMaterial({
    color: opts.color ?? 0x0d1017,
    roughness: 0.62,
    metalness: 0.42
  });
  mat.userData.uTime = { value: 0 };
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = mat.userData.uTime;
    shader.uniforms.uGlow = { value: new THREE.Color(opts.glow ?? 0xffcf86) };
    shader.uniforms.uDensity = { value: opts.density ?? 1.0 };
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>
        varying vec3 vLocal;
        varying vec3 vNrm;
        varying float vInst;`)
      .replace('#include <begin_vertex>', `#include <begin_vertex>
        vLocal = position;
        vNrm = normal;
        #ifdef USE_INSTANCING
          vInst = instanceMatrix[3][0] * 3.17 + instanceMatrix[3][2] * 7.13;
        #else
          vInst = 0.0;
        #endif`);
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
        uniform float uTime;
        uniform vec3 uGlow;
        uniform float uDensity;
        varying vec3 vLocal;
        varying vec3 vNrm;
        varying float vInst;
        float hash(vec2 p){ return fract(sin(dot(p, vec2(41.7, 289.1))) * 43758.5453); }`)
      .replace('#include <dithering_fragment>', `#include <dithering_fragment>
        // pick the two horizontal axes that face the camera-side wall
        vec2 uvw = abs(vNrm.x) > 0.5 ? vec2(vLocal.z, vLocal.y) : vec2(vLocal.x, vLocal.y);
        vec2 cell = vec2(floor(uvw.x * 9.0 * uDensity), floor(uvw.y * 26.0 * uDensity));
        vec2 f = fract(vec2(uvw.x * 9.0 * uDensity, uvw.y * 26.0 * uDensity));
        float pane = step(0.18, f.x) * step(f.x, 0.82) * step(0.22, f.y) * step(f.y, 0.78);
        float lit = hash(cell + vInst);
        float flick = 0.55 + 0.45 * sin(uTime * 0.9 + lit * 40.0);
        float on = step(0.52, lit) * mix(0.55, 1.0, flick);
        float side = 1.0 - abs(vNrm.y);           // no windows on roofs
        gl_FragColor.rgb += uGlow * pane * on * side * 0.78;`);
  };
  return mat;
}

export function createCity(canvas, opts = {}) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const renderer = new THREE.WebGLRenderer({
    canvas, antialias: window.devicePixelRatio < 2, alpha: false, powerPreference: 'high-performance'
  });
  renderer.setClearColor(0x06070a, 1);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.06;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x08090d, 0.0125);

  const camera = new THREE.PerspectiveCamera(46, 1, 0.5, 400);
  camera.position.set(0, 16, 78);

  /* ---------- lighting ---------- */
  scene.add(new THREE.HemisphereLight(0x22304a, 0x05060a, 0.55));
  const key = new THREE.DirectionalLight(0xffcf8e, 1.5);
  key.position.set(-30, 46, 24);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x5b7fc7, 0.7);
  rim.position.set(38, 22, -30);
  scene.add(rim);
  const glowPoint = new THREE.PointLight(0xd9a441, 90, 120, 2);
  glowPoint.position.set(0, 30, 10);
  scene.add(glowPoint);

  /* ---------- city blocks ---------- */
  const mobile = innerWidth < 760;
  const COUNT = opts.count ?? (mobile ? 130 : 260);
  const geo = new THREE.BoxGeometry(1, 1, 1);
  const mat = windowMaterial({ color: 0x090c12, glow: 0xf0b972 });
  const city = new THREE.InstancedMesh(geo, mat, COUNT);
  city.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

  const r = rand(20140);
  const dummy = new THREE.Object3D();
  const towers = [];
  for (let i = 0; i < COUNT; i++) {
    // ring layout: keep the middle clear for the signature tower
    const a = r() * Math.PI * 2;
    const rad = 14 + Math.pow(r(), 0.62) * 96;
    const x = Math.cos(a) * rad;
    const z = Math.sin(a) * rad * 0.8 - 12;
    const far = Math.min(1, rad / 80);
    const h = (4 + Math.pow(r(), 2.4) * 46) * (1 - far * 0.32);
    const w = 3 + r() * 5.5;
    const d = 3 + r() * 5.5;
    towers.push({ x, z, h, w, d, phase: r() * Math.PI * 2, speed: 0.25 + r() * 0.5 });
    dummy.position.set(x, h / 2, z);
    dummy.scale.set(w, h, d);
    dummy.rotation.y = r() * 0.5;
    dummy.updateMatrix();
    city.setMatrixAt(i, dummy.matrix);
  }
  scene.add(city);

  /* ---------- signature tower (centre) ---------- */
  const signature = new THREE.Group();
  const segMat = windowMaterial({ color: 0x141922, glow: 0xffd79a, density: 1.15 });
  const SEGS = 9;
  for (let i = 0; i < SEGS; i++) {
    const t = i / SEGS;
    const s = 9 - t * 6.2;
    const segH = 11 - t * 3.4;
    const m = new THREE.Mesh(new THREE.BoxGeometry(s, segH, s), segMat);
    m.position.y = i * (segH * 0.92) + segH / 2 + 1;
    m.rotation.y = t * 0.55;
    signature.add(m);
  }
  const spireMat = new THREE.MeshStandardMaterial({
    color: 0xd9a441, roughness: 0.22, metalness: 1, emissive: 0xd9a441, emissiveIntensity: 0.45
  });
  const spire = new THREE.Mesh(new THREE.ConeGeometry(1.5, 22, 5), spireMat);
  spire.position.y = 80;
  signature.add(spire);
  const beacon = new THREE.Mesh(
    new THREE.SphereGeometry(0.9, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xffe0a8 })
  );
  beacon.position.y = 92;
  signature.add(beacon);
  signature.position.set(0, 0, -6);
  scene.add(signature);

  /* halo around the spire */
  const halo = new THREE.Mesh(
    new THREE.RingGeometry(3, 12, 64),
    new THREE.MeshBasicMaterial({
      color: 0xd9a441, transparent: true, opacity: 0.1, side: THREE.DoubleSide, depthWrite: false
    })
  );
  halo.rotation.x = -Math.PI / 2;
  halo.position.set(0, 74, -6);
  scene.add(halo);

  /* ---------- ground ---------- */
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(600, 600),
    new THREE.MeshStandardMaterial({ color: 0x05060a, roughness: 0.32, metalness: 0.85 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.02;
  scene.add(ground);

  const grid = new THREE.GridHelper(420, 70, 0xd9a441, 0x1a2030);
  grid.material.transparent = true;
  grid.material.opacity = 0.16;
  grid.position.y = 0.02;
  scene.add(grid);

  /* ---------- motes ---------- */
  const PCOUNT = mobile ? 320 : 900;
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(PCOUNT * 3);
  for (let i = 0; i < PCOUNT; i++) {
    pPos[i * 3] = (r() - 0.5) * 230;
    pPos[i * 3 + 1] = r() * 95;
    pPos[i * 3 + 2] = (r() - 0.5) * 200 - 20;
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const motes = new THREE.Points(pGeo, new THREE.PointsMaterial({
    color: 0xffd79a, size: 0.42, transparent: true, opacity: 0.5,
    depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true
  }));
  scene.add(motes);

  /* ---------- interaction state ---------- */
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  let scrollT = 0, scrollTarget = 0, intro = 0, running = true, raf = 0;
  let frames = 0, sampled = 0, qualityLocked = false;
  const clock = new THREE.Clock();

  function onPointer(e) {
    const p = e.touches ? e.touches[0] : e;
    pointer.tx = (p.clientX / innerWidth) * 2 - 1;
    pointer.ty = (p.clientY / innerHeight) * 2 - 1;
  }
  addEventListener('pointermove', onPointer, { passive: true });

  let quality = 1;                       // scales pixel ratio, dropped if frames are slow
  function resize() {
    const w = canvas.clientWidth || innerWidth;
    const h = canvas.clientHeight || innerHeight;
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75) * quality);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = w / h < 0.9 ? 70 : (w < 900 ? 54 : 46);
    camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(() => { resize(); tuneFog(); });
  ro.observe(canvas);
  function tuneFog() {
    scene.fog.density = camera.aspect < 0.9 ? 0.0072 : 0.0125;
  }
  resize();
  tuneFog();

  /* pause when off-screen */
  const io = new IntersectionObserver(([e]) => { running = e.isIntersecting; if (running) loop(); },
    { threshold: 0 });
  io.observe(canvas);

  function loop() {
    if (!running) { cancelAnimationFrame(raf); return; }
    raf = requestAnimationFrame(loop);
    const t = clock.getElapsedTime();
    const dt = Math.min(clock.getDelta(), 0.05);

    // adaptive quality: sample the first ~1.2s of frames and step the
    // resolution down once if the device can't hold a smooth rate.
    if (!qualityLocked && t > 0.6) {
      frames++; sampled += dt;
      if (sampled > 1.2) {
        qualityLocked = true;
        const fps = frames / sampled;
        if (fps < 45) {
          quality = fps < 26 ? 0.6 : 0.78;
          resize();
          if (fps < 26) { motes.visible = false; scene.fog.density = 0.016; }
        }
      }
    }

    intro = Math.min(1, intro + dt * 0.28);
    const ease = 1 - Math.pow(1 - intro, 3);

    pointer.x += (pointer.tx - pointer.x) * 0.055;
    pointer.y += (pointer.ty - pointer.y) * 0.055;
    scrollT += (scrollTarget - scrollT) * 0.07;

    mat.userData.uTime.value = t;
    segMat.userData.uTime.value = t;

    // camera: fly in on load, orbit with pointer, rise with scroll
    // portrait screens need more distance, or the skyline reads as a thin strip
    const portrait = camera.aspect < 0.9;
    const dolly = (150 - ease * 48 + scrollT * 26) * (portrait ? 1.16 : 1);
    const orbit = pointer.x * 0.34 + (reduced ? 0 : Math.sin(t * 0.06) * 0.06);
    camera.position.x = Math.sin(orbit) * dolly;
    camera.position.z = Math.cos(orbit) * dolly;
    camera.position.y = (portrait ? 5 : 8) + ease * 9 - pointer.y * 7 + scrollT * 46;
    camera.lookAt(0, (portrait ? 20 : 26) + scrollT * 26, -6);

    signature.rotation.y = t * 0.035 + pointer.x * 0.08;
    halo.rotation.z = t * 0.2;
    halo.material.opacity = 0.07 + Math.sin(t * 1.4) * 0.035;
    beacon.material.color.setScalar(0.7 + Math.sin(t * 3) * 0.3);
    spireMat.emissiveIntensity = 0.35 + Math.sin(t * 2.1) * 0.18;

    motes.rotation.y = t * 0.012;
    motes.position.y = Math.sin(t * 0.25) * 2.5;
    glowPoint.intensity = 70 + Math.sin(t * 1.8) * 22;

    renderer.render(scene, camera);
  }
  loop();

  return {
    setScroll(v) { scrollTarget = v; },
    dispose() {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect(); ro.disconnect();
      removeEventListener('pointermove', onPointer);
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) [].concat(o.material).forEach((m) => m.dispose());
      });
      renderer.dispose();
    }
  };
}
