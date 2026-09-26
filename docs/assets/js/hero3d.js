// Hero: irregular stones packed along a Möbius strip. Drag to turn, hover to lift.
import * as THREE from 'three';
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';

const stage = document.getElementById('heroStage');
const canvas = document.getElementById('heroCanvas');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const still = new URLSearchParams(location.search).has('still'); // skip the intro (used for screenshots)

function start() {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (e) {
    canvas.remove();
    return;
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0, 0.2, 10.5);

  scene.add(new THREE.HemisphereLight(0xf6f4ef, 0x3a3872, 1.6));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(4, 7, 6);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xb8b2e0, 1.4);
  rim.position.set(-6, -3, -4);
  scene.add(rim);

  // ---- irregular stone prototypes ----
  const rand = mulberry32(7);
  const protos = [];
  for (let k = 0; k < 6; k++) {
    let g = new THREE.IcosahedronGeometry(1, 1);
    g.deleteAttribute('normal');
    g.deleteAttribute('uv');
    g = mergeVertices(g);
    const pos = g.attributes.position;
    const v = new THREE.Vector3();
    const bias = new THREE.Vector3(rand() - .5, rand() - .5, rand() - .5).multiplyScalar(.5);
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const n = 0.72 + 0.5 * rand() + v.dot(bias) * .4;
      v.multiplyScalar(n);
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    g.computeVertexNormals();
    protos.push(g);
  }

  // ---- Möbius strip sampling ----
  const R = 2.45, W = 1.2;
  const NU = innerWidth < 700 ? 110 : 150, NV = innerWidth < 700 ? 12 : 14;
  const total = NU * NV;
  document.getElementById('heroCount').textContent = total.toLocaleString('en-US');
  const mob = (u, v, out) => {
    const c = Math.cos(u / 2);
    return out.set((R + v * c) * Math.cos(u), (R + v * c) * Math.sin(u), v * Math.sin(u / 2));
  };
  const palette = ['#F2EFE6', '#E8E3D8', '#DDD6CA', '#CFC8BB', '#BFB8AC', '#AEA79D'].map((c) => new THREE.Color(c));
  const accents = [new THREE.Color('#34327A'), new THREE.Color('#2A2840'), new THREE.Color('#A8553B'), new THREE.Color('#6A64B0')];

  const group = new THREE.Group();
  group.rotation.set(-0.95, 0.28, 0.9);
  scene.add(group);

  const mat = new THREE.MeshStandardMaterial({ roughness: .78, metalness: 0, flatShading: true });
  const meshes = protos.map(() => null);
  const counts = protos.map(() => 0);
  const assign = new Uint8Array(total);
  for (let i = 0; i < total; i++) { assign[i] = Math.floor(rand() * protos.length); counts[assign[i]]++; }
  protos.forEach((g, k) => {
    const m = new THREE.InstancedMesh(g, mat, counts[k]);
    m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    m.frustumCulled = false;
    meshes[k] = m;
    group.add(m);
  });

  // per-stone data
  const base = new Float32Array(total * 3), nrm = new Float32Array(total * 3), from = new Float32Array(total * 3);
  const quat = [], scl = new Float32Array(total * 3), phase = new Float32Array(total), lift = new Float32Array(total), slot = new Uint32Array(total);
  const p = new THREE.Vector3(), pu = new THREE.Vector3(), pv = new THREE.Vector3(), n = new THREE.Vector3(), t2 = new THREE.Vector3();
  const mtx = new THREE.Matrix4(), q = new THREE.Quaternion(), qz = new THREE.Quaternion(), yAxis = new THREE.Vector3(0, 1, 0);
  const fill = protos.map(() => 0);
  const du = (Math.PI * 2) / NU, dv = (2 * W) / NV;
  let i = 0;
  for (let a = 0; a < NU; a++) {
    for (let b = 0; b < NV; b++, i++) {
      const u = (a + .5 + (rand() - .5) * .5 + (b % 2) * .5) * du;
      const v = -W + (b + .5 + (rand() - .5) * .35) * dv;
      mob(u, v, p);
      mob(u + 1e-3, v, pu).sub(p).normalize();
      mob(u, v + 1e-3, pv).sub(p).normalize();
      n.crossVectors(pu, pv).normalize();
      base.set([p.x, p.y, p.z], i * 3);
      nrm.set([n.x, n.y, n.z], i * 3);
      // orient: stone's local Y -> surface normal, then random spin about it
      q.setFromUnitVectors(yAxis, n);
      qz.setFromAxisAngle(n, rand() * Math.PI * 2);
      quat.push(qz.clone().multiply(q));
      const s = 0.062 + rand() * 0.034;
      scl.set([s * (1 + rand() * .35), s * (0.42 + rand() * .22), s * (0.9 + rand() * .3)], i * 3);
      phase[i] = rand() * Math.PI * 2;
      // scattered start for the assembly animation
      t2.set(rand() - .5, rand() - .5, rand() - .5).normalize().multiplyScalar(5 + rand() * 5);
      from.set([t2.x, t2.y, t2.z], i * 3);
      const k = assign[i];
      slot[i] = fill[k]++;
      const r = rand();
      const col = r < .07 ? accents[0] : r < .1 ? accents[1] : r < .125 ? accents[2] : r < .16 ? accents[3] : palette[Math.floor(rand() * palette.length)];
      meshes[k].setColorAt(slot[i], col);
    }
  }
  meshes.forEach((m) => { if (m.instanceColor) m.instanceColor.needsUpdate = true; });

  // ---- interaction ----
  const pointer = new THREE.Vector2(9, 9);
  let hovering = false, dragging = false, lastX = 0, lastY = 0, velY = 0, velX = 0;
  const rect = () => canvas.getBoundingClientRect();
  canvas.addEventListener('pointermove', (e) => {
    const r = rect();
    pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    hovering = true;
    if (dragging) {
      velY += (e.clientX - lastX) * 0.00045;
      velX += (e.clientY - lastY) * 0.00035;
      lastX = e.clientX; lastY = e.clientY;
    }
  });
  canvas.addEventListener('pointerleave', () => { hovering = false; pointer.set(9, 9); });
  canvas.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'touch') return; // keep page scroll on touch; tap still lifts
    dragging = true; lastX = e.clientX; lastY = e.clientY; canvas.setPointerCapture(e.pointerId);
  });
  const endDrag = () => { dragging = false; };
  canvas.addEventListener('pointerup', endDrag);
  canvas.addEventListener('pointercancel', endDrag);

  // ---- sizing / visibility ----
  const resize = () => {
    const w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.position.z = w / h < 0.9 ? 13.5 : 10.5;
    camera.updateProjectionMatrix();
  };
  new ResizeObserver(resize).observe(stage);
  resize();
  let visible = true;
  new IntersectionObserver((ents) => { visible = ents[0].isIntersecting; if (visible) loop(); }, { threshold: 0 }).observe(stage);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) loop(); });

  // ---- animate ----
  const t0 = performance.now();
  const ASSEMBLE = reduced || still ? 0 : 2600;
  const wp = new THREE.Vector3(), sv = new THREE.Vector3(), pos = new THREE.Vector3();
  const aspectFix = () => camera.aspect;
  let running = false;
  function frame(now) {
    const t = (now - t0) / 1000;
    const k = ASSEMBLE ? Math.min(1, (now - t0) / ASSEMBLE) : 1;
    if (!reduced) group.rotation.z += 0.0016 + velY;
    else group.rotation.z += velY;
    group.rotation.x += velX;
    group.rotation.x = Math.max(-1.7, Math.min(-0.2, group.rotation.x));
    velY *= 0.93; velX *= 0.9;
    group.updateMatrixWorld();

    for (let i = 0; i < total; i++) {
      const j = i * 3;
      pos.set(base[j], base[j + 1], base[j + 2]);
      // pointer lift: project stone to screen
      let target = 0;
      if (hovering) {
        wp.copy(pos).applyMatrix4(group.matrixWorld).project(camera);
        const dx = (wp.x - pointer.x) * aspectFix(), dy = wp.y - pointer.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 0.32 && wp.z < 1) target = Math.pow(1 - d / 0.32, 2) * 0.55;
      }
      lift[i] += (target - lift[i]) * 0.12;
      const breathe = reduced ? 0 : Math.sin(t * 1.3 + phase[i] + i * 0.002) * 0.012;
      const L = lift[i] + breathe;
      pos.x += nrm[j] * L; pos.y += nrm[j + 1] * L; pos.z += nrm[j + 2] * L;
      if (k < 1) {
        const e = easeOutCubic(Math.min(1, Math.max(0, (k - (i % NV) * 0.012 - (Math.floor(i / NV) / NU) * 0.25) / 0.6)));
        pos.x = from[j] + (pos.x - from[j]) * e; pos.y = from[j + 1] + (pos.y - from[j + 1]) * e; pos.z = from[j + 2] + (pos.z - from[j + 2]) * e;
      }
      const g = 1 + lift[i] * 1.2;
      sv.set(scl[j] * g, scl[j + 1] * g, scl[j + 2] * g);
      mtx.compose(pos, quat[i], sv);
      meshes[assign[i]].setMatrixAt(slot[i], mtx);
    }
    meshes.forEach((m) => { m.instanceMatrix.needsUpdate = true; });
    renderer.render(scene, camera);
  }
  function loop() {
    if (running) return;
    running = true;
    const tick = (now) => {
      if (!visible || document.hidden) { running = false; return; }
      frame(now);
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  loop();
  stage.classList.add('has-3d');
  if (matchMedia('(hover: none)').matches) { const h = document.getElementById('heroLiftHint'); if (h) h.textContent = 'Tap to lift'; }
}

function easeOutCubic(x) { return 1 - Math.pow(1 - x, 3); }
function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

try { start(); } catch (e) { console.warn('hero 3D disabled', e); }
