// 3D Lab: GLB viewer for Frahan StonePack models (orbit, hover a stone, explode, section cut).
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const MODELS = (window.PORTFOLIO && window.PORTFOLIO.models) || [];
const $ = (id) => document.getElementById(id);
const stage = $('labStage'), canvas = $('labCanvas');
const tabs = $('labTabs');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

if (!MODELS.length) {
  document.getElementById('lab').hidden = true;
  document.querySelectorAll('a[href="#lab"]').forEach((a) => { a.hidden = true; });
} else {
  tabs.innerHTML = MODELS.map((m, i) => `<button type="button" aria-pressed="${i === 0}" data-id="${esc(m.id)}"><span class="n">${String(i + 1).padStart(2, '0')}</span><span class="t">${esc(m.title)}</span><span class="s">${esc(m.sub || '')}</span></button>`).join('');
  init();
}

function init() {
  const qsModel = new URLSearchParams(location.search).get('model');
  let ready = false, pendingId = (MODELS.find((m) => m.id === qsModel) || MODELS[0]).id;
  let renderer, scene, camera, controls, loader, root = null, parts = [], center = new THREE.Vector3(), size = 1, home = null;
  const clip = new THREE.Plane(new THREE.Vector3(-1, 0, 0), 1e6);
  const hiMat = new THREE.MeshStandardMaterial({ color: 0xb8b2e0, emissive: 0x34327a, emissiveIntensity: .35, roughness: .6, side: THREE.DoubleSide, clippingPlanes: [clip] });
  let hovered = null, visible = false, loadToken = 0;
  const cache = new Map();
  const coarse = matchMedia('(pointer: coarse)').matches; // phones and tablets

  const boot = () => {
    if (ready) return;
    ready = true;
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.82;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.localClippingEnabled = true;
    scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environmentIntensity = 0.42;
    camera = new THREE.PerspectiveCamera(38, 1, 0.01, 2000);
    const sun = new THREE.DirectionalLight(0xfff1e0, 1.9);
    sun.name = 'sun';
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.bias = -0.0004;
    scene.add(sun, sun.target);
    scene.add(new THREE.HemisphereLight(0xe9e6f2, 0x2a2840, 0.9));
    const ground = new THREE.Mesh(new THREE.CircleGeometry(1, 96), new THREE.ShadowMaterial({ opacity: .32 }));
    ground.name = 'ground';
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
    controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.autoRotate = !reduced;
    controls.autoRotateSpeed = 0.7;
    controls.maxPolarAngle = Math.PI * 0.94;
    controls.enableZoom = false; // wheel scrolls the page until the visitor clicks into the model
    if (coarse) {
      controls.enableZoom = true; // pinch zooms on phones
      canvas.style.touchAction = 'pan-y'; // in the page: a sideways swipe turns the model, a vertical swipe scrolls
    }
    $('labRotate').setAttribute('aria-pressed', controls.autoRotate);
    loader = new GLTFLoader();
    new ResizeObserver(resize).observe(stage);
    resize();
    wireUI();
    load(pendingId);
    loop();
  };

  function resize() {
    if (!renderer) return;
    const w = stage.clientWidth, h = stage.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  function setLoading(on, text, pct) {
    const el = $('labLoading');
    el.hidden = !on;
    if (text) $('labLoadingText').textContent = text;
    $('labBar').style.width = (pct || 0) + '%';
  }

  function dispose(obj) {
    obj.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
    });
  }

  function load(id) {
    const m = MODELS.find((x) => x.id === id) || MODELS[0];
    pendingId = m.id;
    tabs.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.id === m.id));
    $('labDesc').textContent = m.desc || '';
    if (!ready) return;
    const token = ++loadToken;
    setLoading(true, `Loading ${m.title}`, 2);
    const done = (gltf) => {
      if (token !== loadToken) return;
      cache.set(m.file, gltf);
      mount(gltf.scene.clone(true), m);
      setLoading(false);
    };
    if (cache.has(m.file)) return done(cache.get(m.file));
    loader.load(m.file, done, (e) => {
      if (token !== loadToken) return;
      const total = e.total || m.bytes || 0;
      if (total) setLoading(true, `Loading ${m.title}`, Math.min(98, (e.loaded / total) * 100));
    }, (err) => { console.error(err); if (token === loadToken) setLoading(true, 'Could not load this model'); });
  }

  function mount(obj, m) {
    if (root) { scene.remove(root); dispose(root); }
    hovered = null;
    root = obj;
    parts = [];
    const box = new THREE.Box3().setFromObject(root);
    box.getCenter(center);
    const dim = box.getSize(new THREE.Vector3());
    size = Math.max(dim.x, dim.y, dim.z) || 1;
    // sit on the ground, centred
    root.position.set(-center.x, -box.min.y, -center.z);
    root.updateMatrixWorld(true);
    const box2 = new THREE.Box3().setFromObject(root);
    box2.getCenter(center);
    const tmp = new THREE.Box3(), c = new THREE.Vector3();
    let idx = 0;
    // models without meaningful colours (one or two flat colours) get per-stone warm stone tones
    const cols = new Set();
    root.traverse((o) => { if (o.isMesh) { const sm = Array.isArray(o.material) ? o.material[0] : o.material; cols.add(sm && sm.color ? sm.color.getHexString() : '-'); } });
    const recolor = m.recolor || cols.size <= 2;
    root.traverse((o) => {
      if (!o.isMesh) return;
      o.castShadow = true;
      o.receiveShadow = true;
      const src = Array.isArray(o.material) ? o.material[0] : o.material;
      const mat = new THREE.MeshStandardMaterial({
        color: recolor ? stoneColor(idx) : src && src.color ? src.color.clone() : new THREE.Color(0xd8d2c6),
        vertexColors: !!(o.geometry.attributes.color),
        roughness: 0.82, metalness: 0, side: THREE.DoubleSide, clippingPlanes: [clip],
        flatShading: !o.geometry.attributes.normal,
      });
      o.material = mat;
      tmp.setFromObject(o);
      tmp.getCenter(c);
      const s = tmp.getSize(new THREE.Vector3());
      const dir = c.clone().sub(center);
      dir.y *= 0.6;
      if (dir.lengthSq() < 1e-9) dir.set(0, 1, 0);
      parts.push({ mesh: o, base: o.position.clone(), dir: dir.normalize().multiplyScalar(dir.length() + size * 0.05), parentInv: new THREE.Matrix4().copy(o.parent.matrixWorld).invert(), size: s, i: ++idx, mat });
    });
    // explode direction in parent space
    parts.forEach((p) => { p.dirLocal = p.dir.clone().transformDirection(p.parentInv).multiplyScalar(p.dir.length()); });
    scene.add(root);
    // ground + light scale
    const ground = scene.getObjectByName('ground');
    ground.scale.setScalar(size * 1.6);
    ground.position.set(0, 0, 0);
    const sun = scene.getObjectByName('sun');
    sun.position.set(size * 0.8, size * 1.6, size * 0.9);
    sun.target.position.set(0, dim.y * 0.3, 0);
    const sc = sun.shadow.camera;
    sc.left = sc.bottom = -size; sc.right = sc.top = size; sc.near = 0.01; sc.far = size * 5;
    sc.updateProjectionMatrix();
    // camera
    const target = new THREE.Vector3(0, dim.y * 0.45, 0);
    const cam = m.camera || {};
    const dirV = new THREE.Vector3(...(cam.dir || [1, 0.55, 1.25])).normalize();
    const dist = size * (cam.dist || 1.55);
    camera.near = size / 500; camera.far = size * 20; camera.updateProjectionMatrix();
    camera.position.copy(target).addScaledVector(dirV, dist);
    controls.target.copy(target);
    controls.minDistance = size * 0.15;
    controls.maxDistance = size * 5;
    controls.update();
    home = { pos: camera.position.clone(), target: target.clone() };
    applyExplode();
    applyCut();
    applyWire();
    $('labHudL').textContent = `${m.title} · ${parts.length.toLocaleString('en-US')} ${m.unit || 'pieces'}`;
    $('labHudR').textContent = m.bbox ? m.bbox : `${dim.x.toFixed(1)} × ${dim.z.toFixed(1)} × ${dim.y.toFixed(1)} m`;
  }

  function applyExplode() {
    const k = (+$('labExplode').value) / 100;
    $('labExplodeVal').textContent = Math.round(k * 100) + '%';
    const e = k * k * 0.9;
    parts.forEach((p) => { p.mesh.position.copy(p.base).addScaledVector(p.dirLocal, e); });
  }
  function applyCut() {
    const v = +$('labCut').value;
    if (v >= 100 || !root) { clip.constant = 1e6; $('labCutVal').textContent = 'off'; return; }
    const box = new THREE.Box3().setFromObject(root);
    const x = box.min.x + (box.max.x - box.min.x) * (v / 100);
    clip.constant = x; // keeps x < constant
    $('labCutVal').textContent = v + '%';
  }
  function applyWire() {
    const on = $('labWire').getAttribute('aria-pressed') === 'true';
    parts.forEach((p) => { p.mat.wireframe = on; });
  }

  // hover a stone
  const ray = new THREE.Raycaster(), ptr = new THREE.Vector2();
  let ptrDirty = false, ptrClient = [0, 0];
  canvas.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return; // on touch a drag orbits; stones are read by tapping
    const r = canvas.getBoundingClientRect();
    ptr.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ptrClient = [e.clientX - r.left, e.clientY - r.top];
    ptrDirty = true;
  });
  canvas.addEventListener('pointerleave', (e) => {
    if (e.pointerType === 'touch') return; // a lifted finger "leaves" too; the tapped stone's label stays up
    setHover(null);
    if (controls && !coarse) controls.enableZoom = false;
  });
  canvas.addEventListener('pointerdown', () => { if (controls) { controls.autoRotate = false; controls.enableZoom = true; $('labRotate').setAttribute('aria-pressed', 'false'); } });

  // touch: tap a stone to read its size, double-tap to reset the view
  let down = null, lastTap = 0, tipTimer = 0;
  // gestures are timed with each event's own timeStamp (when the finger moved), not when the
  // handler ran, so a busy main thread on a slow phone does not turn taps into non-taps
  canvas.addEventListener('pointerdown', (e) => { if (e.pointerType === 'touch' && e.isPrimary) down = { x: e.clientX, y: e.clientY, t: e.timeStamp }; });
  canvas.addEventListener('pointerup', (e) => {
    if (e.pointerType !== 'touch' || !down || !e.isPrimary) return;
    const tap = Math.hypot(e.clientX - down.x, e.clientY - down.y) < 10 && e.timeStamp - down.t < 800; // a held tap (no movement) also reads a stone
    down = null;
    if (!tap) return;
    if (e.timeStamp - lastTap < 400) { lastTap = 0; resetView(); setHover(null); return; }
    lastTap = e.timeStamp;
    const r = canvas.getBoundingClientRect();
    ptr.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ptrClient = [e.clientX - r.left, e.clientY - r.top];
    ptrDirty = true;
    pick();
    clearTimeout(tipTimer);
    tipTimer = setTimeout(() => setHover(null), 2600);
  });
  function resetView() {
    if (!home) return;
    controls.enableDamping = false;
    controls.update(); // flush leftover drag inertia so the view lands exactly home
    camera.position.copy(home.pos);
    controls.target.copy(home.target);
    controls.update();
    controls.enableDamping = true;
  }

  // explore mode: the viewer fills the screen (native fullscreen where the browser allows it, a fixed
  // overlay on iPhone). Inside it one finger orbits in every direction, two fingers pinch and pan.
  const isFull = () => stage.classList.contains('is-full');
  const sliders = Array.from(document.querySelectorAll('.lab__panel .slider'));
  const sliderMark = document.createComment('lab sliders');
  if (sliders[0]) sliders[0].parentNode.insertBefore(sliderMark, sliders[0]);
  stage.insertAdjacentHTML('beforeend', `<div class="lab__hint" id="labHint" aria-hidden="true"></div>
    <div class="lab__fullbar" id="labFullbar">
      <div class="lab__fullnav"><button type="button" data-model-step="-1" aria-label="Previous model">‹</button><span id="labFullTitle"></span><button type="button" data-model-step="1" aria-label="Next model">›</button></div>
      <button type="button" class="lab__close" id="labClose">Close</button>
    </div>`);
  const setHint = () => {
    $('labHint').textContent = !coarse ? '' : isFull()
      ? 'Drag to orbit · pinch to zoom · two fingers to pan · double-tap to reset'
      : 'Swipe sideways to turn · pinch to zoom · ⤢ to explore';
  };
  const setFullTitle = () => { const m = MODELS.find((x) => x.id === pendingId); $('labFullTitle').textContent = m ? m.title : ''; };
  function enterFull() {
    if (isFull()) return;
    boot();
    stage.classList.add('is-full');
    document.body.classList.add('is-locked');
    sliders.forEach((el) => $('labFullbar').insertBefore(el, $('labClose')));
    canvas.style.touchAction = 'none';
    $('labFull').setAttribute('aria-label', 'Close full screen');
    if (stage.requestFullscreen && !document.fullscreenElement) stage.requestFullscreen().catch(() => {});
    setHint();
    setFullTitle();
    loop();
    $('labClose').focus({ preventScroll: true });
  }
  function exitFull() {
    if (!isFull()) return;
    stage.classList.remove('is-full');
    if ($('case').hidden && $('lb').hidden) document.body.classList.remove('is-locked');
    sliders.forEach((el) => sliderMark.parentNode.insertBefore(el, sliderMark));
    canvas.style.touchAction = coarse ? 'pan-y' : 'none';
    $('labFull').setAttribute('aria-label', 'Fullscreen');
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    setHint();
    $('labFull').focus({ preventScroll: true });
  }
  document.addEventListener('fullscreenchange', () => { if (!document.fullscreenElement && isFull()) exitFull(); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && isFull()) exitFull(); });
  $('labClose').addEventListener('click', exitFull);
  $('labFullbar').addEventListener('click', (e) => {
    const b = e.target.closest('[data-model-step]');
    if (!b) return;
    const i = MODELS.findIndex((m) => m.id === pendingId);
    const next = MODELS[(i + +b.dataset.modelStep + MODELS.length) % MODELS.length];
    $('labExplode').value = 0; $('labCut').value = 100;
    load(next.id);
    setFullTitle();
  });
  setHint();

  function pick() {
    if (!ptrDirty || !parts.length) return;
    ptrDirty = false;
    ray.setFromCamera(ptr, camera);
    const hits = ray.intersectObjects(parts.map((p) => p.mesh), false).filter((h) => clip.distanceToPoint(h.point) >= 0 || clip.constant > 1e5);
    setHover(hits.length ? parts.find((p) => p.mesh === hits[0].object) : null);
  }
  function setHover(p) {
    if (hovered === p) { if (p) moveTip(); return; }
    if (hovered) hovered.mesh.material = hovered.mat;
    hovered = p;
    const tip = $('labTip');
    if (!p) { tip.classList.remove('is-on'); return; }
    hiMat.wireframe = p.mat.wireframe;
    p.mesh.material = hiMat;
    const s = p.size;
    tip.textContent = `#${p.i} · ${s.x.toFixed(2)} × ${s.z.toFixed(2)} × ${s.y.toFixed(2)} m`;
    tip.classList.add('is-on');
    moveTip();
  }
  function moveTip() { const tip = $('labTip'); tip.style.left = ptrClient[0] + 'px'; tip.style.top = ptrClient[1] + 'px'; }

  function wireUI() {
    $('labExplode').addEventListener('input', applyExplode);
    $('labCut').addEventListener('input', applyCut);
    $('labWire').addEventListener('click', (e) => { const b = e.currentTarget; b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'); applyWire(); });
    $('labRotate').addEventListener('click', (e) => { controls.autoRotate = !controls.autoRotate; e.currentTarget.setAttribute('aria-pressed', controls.autoRotate); });
    $('labReset').addEventListener('click', () => {
      resetView();
      $('labExplode').value = 0; $('labCut').value = 100; applyExplode(); applyCut();
    });
  }
  // the ⤢ button works before the viewer has booted too
  $('labFull').addEventListener('click', () => (isFull() ? exitFull() : enterFull()));

  let running = false;
  function loop() {
    if (running) return;
    running = true;
    const tick = () => {
      if (!visible && !isFull()) { running = false; return; }
      controls.update();
      pick();
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  tabs.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-id]');
    if (!b) return;
    $('labExplode').value = 0; $('labCut').value = 100;
    boot();
    load(b.dataset.id);
  });
  addEventListener('lab:load', (e) => { boot(); load(e.detail); });

  load(pendingId); // sets the selected tab and description; the model itself loads on boot
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible) { boot(); loop(); }
  }, { rootMargin: '200px 0px' }).observe(stage);
}

// deterministic warm stone tone per piece
function stoneColor(i) {
  const r = (n) => { const x = Math.sin((i + 1) * 12.9898 + n * 78.233) * 43758.5453; return x - Math.floor(x); };
  return new THREE.Color().setHSL((24 + r(1) * 18) / 360, 0.12 + r(2) * 0.18, 0.42 + r(3) * 0.26);
}
