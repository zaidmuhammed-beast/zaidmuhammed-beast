/**
 * About-panel emblem — an abstract faceted form in brushed gold that
 * turns slowly and tilts toward the pointer. Small canvas, small budget.
 */
import * as THREE from 'three';

export function createEmblem(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
  camera.position.set(0, 0, 6.4);

  scene.add(new THREE.AmbientLight(0x334155, 1.1));
  const l1 = new THREE.DirectionalLight(0xffe0ae, 4.4); l1.position.set(3, 4, 5); scene.add(l1);
  const l2 = new THREE.DirectionalLight(0x7d9ad4, 2.4); l2.position.set(-4, -2, -3); scene.add(l2);
  const l3 = new THREE.PointLight(0xffc978, 22, 14, 2); l3.position.set(0, 1.5, 3.4); scene.add(l3);

  const group = new THREE.Group();

  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.5, 0),
    new THREE.MeshStandardMaterial({
      color: 0xd9a441, metalness: 0.55, roughness: 0.3, flatShading: true,
      emissive: 0x4a3312, emissiveIntensity: 0.85
    })
  );
  group.add(core);

  const shell = new THREE.Mesh(
    new THREE.IcosahedronGeometry(2.25, 1),
    new THREE.MeshBasicMaterial({ color: 0xd9a441, wireframe: true, transparent: true, opacity: 0.22 })
  );
  group.add(shell);

  const band = new THREE.Mesh(
    new THREE.TorusGeometry(2.6, 0.018, 8, 120),
    new THREE.MeshBasicMaterial({ color: 0xf2cd82, transparent: true, opacity: 0.55 })
  );
  band.rotation.x = Math.PI / 2.4;
  group.add(band);

  scene.add(group);

  const p = { x: 0, y: 0, tx: 0, ty: 0 };
  const onMove = (e) => {
    const r = canvas.getBoundingClientRect();
    p.tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    p.ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
  };
  addEventListener('pointermove', onMove, { passive: true });

  function resize() {
    const w = canvas.clientWidth || 300, h = canvas.clientHeight || 240;
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(resize); ro.observe(canvas); resize();

  let running = false, raf = 0;
  const clock = new THREE.Clock();
  const io = new IntersectionObserver(([e]) => {
    running = e.isIntersecting;
    if (running) { clock.start(); loop(); } else cancelAnimationFrame(raf);
  }, { threshold: 0 });
  io.observe(canvas);

  function loop() {
    if (!running) return;
    raf = requestAnimationFrame(loop);
    const t = clock.getElapsedTime();
    p.x += (p.tx - p.x) * 0.06;
    p.y += (p.ty - p.y) * 0.06;
    group.rotation.y = t * 0.35 + p.x * 0.5;
    group.rotation.x = Math.sin(t * 0.4) * 0.16 + p.y * 0.3;
    shell.rotation.y = -t * 0.22;
    band.rotation.z = t * 0.5;
    core.scale.setScalar(1 + Math.sin(t * 1.6) * 0.03);
    renderer.render(scene, camera);
  }

  return {
    dispose() {
      running = false; cancelAnimationFrame(raf);
      io.disconnect(); ro.disconnect(); removeEventListener('pointermove', onMove);
      scene.traverse((o) => { o.geometry?.dispose?.(); [].concat(o.material || []).forEach((m) => m.dispose?.()); });
      renderer.dispose();
    }
  };
}
