/* Portfolio app: renders content from data.js (window.PORTFOLIO) and media.js (window.MEDIA). */
(function () {
  'use strict';
  const P = window.PORTFOLIO;
  // test hooks for screenshots: ?still renders without motion, ?solo=<section id> shows one section
  const qs = new URLSearchParams(location.search);
  if (qs.has('still')) document.documentElement.classList.add('is-still');
  if (qs.get('solo')) document.querySelectorAll('main > section, main > .ticker').forEach((el) => { el.hidden = el.id !== qs.get('solo'); });
  const MEDIA = window.MEDIA || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // ---------- media helpers ----------
  const src = (slug, size) => `media/${slug}-${size || 1600}.webp`;
  const dims = (slug) => MEDIA[slug] || [1600, 1200];
  const img = (slug, alt, size, extra = '') => {
    const [w, h] = dims(slug);
    const s = size || 640;
    const ww = s === 640 ? Math.round(w * Math.min(1, 640 / Math.max(w, h))) : w;
    const hh = s === 640 ? Math.round(h * Math.min(1, 640 / Math.max(w, h))) : h;
    return `<img src="${src(slug, s)}" width="${ww}" height="${hh}" alt="${esc(alt)}" loading="lazy" decoding="async" draggable="false" ${extra}>`;
  };
  // normalise gallery entries: ['slug','caption', {wide}] -> {slug, cap, wide}
  const norm = (e) => Array.isArray(e) ? { slug: e[0], cap: e[1] || '', ...(e[2] || {}) } : e;
  const toLb = (list, title) => list.map((e) => { const n = norm(e); return { full: src(n.slug, 1600), thumb: src(n.slug, 640), title: n.title || title || '', cap: n.cap || '' }; });
  const paras = (t) => String(t || '').split(/\n/).filter(Boolean).map((x) => `<p>${esc(x)}</p>`).join('');
  const linkBtns = (links, cls = '') => (links || []).map((l) => `<a class="btn ${cls}" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} <span class="arr">↗</span></a>`).join('');

  const sections = Object.fromEntries(P.sections.map((s) => [s.id, s]));
  const projects = P.projects;
  projects.forEach((p) => {
    const inSec = projects.filter((q) => q.section === p.section);
    p.no = `${p.section} · ${String(inSec.indexOf(p) + 1).padStart(2, '0')}`;
    p.gallery = (p.images || []).map(norm);
    p.cover = p.cover || (p.gallery[0] && p.gallery[0].slug);
  });

  // ---------- deter casual saving of images (as on the previous site) ----------
  const mediaSel = 'img, video, canvas, .tile, .card__media, .plates, .compare, .stepper';
  document.addEventListener('contextmenu', (e) => { if (e.target.closest && e.target.closest(mediaSel)) e.preventDefault(); });
  document.addEventListener('dragstart', (e) => { if (e.target.closest && e.target.closest(mediaSel)) e.preventDefault(); });

  // ---------- nav ----------
  const nav = $('#nav');
  const prog = $('#navProgress');
  const onScroll = () => {
    nav.classList.toggle('is-scrolled', scrollY > 10);
    const h = document.documentElement.scrollHeight - innerHeight;
    prog.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + '%';
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  $('#navToggle').addEventListener('click', () => {
    const open = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', open);
    $('#navToggle').setAttribute('aria-expanded', open);
  });
  $$('#navLinks a').forEach((a) => a.addEventListener('click', () => { nav.classList.remove('is-open'); $('#navToggle').setAttribute('aria-expanded', 'false'); }));
  const navMap = new Map($$('#navLinks a[href^="#"]').map((a) => [a.getAttribute('href').slice(1), a]));
  const secObs = new IntersectionObserver((ents) => {
    ents.forEach((en) => {
      if (!en.isIntersecting) return;
      navMap.forEach((a) => a.classList.remove('is-active'));
      const a = navMap.get(en.target.id);
      if (a) a.classList.add('is-active');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  navMap.forEach((_, id) => { const el = document.getElementById(id); if (el) secObs.observe(el); });

  // ---------- ticker ----------
  const tk = (P.ticker || []).map((t) => `<span>${esc(t)}</span>`).join('');
  $('#ticker').innerHTML = tk + tk;

  // ---------- contents + stats ----------
  $('#contents').innerHTML = P.sections.map((s) => {
    const n = projects.filter((p) => p.section === s.id).length;
    return `<a href="#work" data-filter="${s.id}"><span class="l">${s.id}</span><span class="t">${esc(s.title)}<small>${esc(s.short)}</small></span><span class="n">${n} projects</span></a>`;
  }).join('') + (P.extraContents || []).map((c) => `<a href="${c.href}"><span class="l">${esc(c.tag)}</span><span class="t">${esc(c.title)}<small>${esc(c.sub)}</small></span><span class="n">${esc(c.n || '')}</span></a>`).join('');
  $$('#contents a[data-filter]').forEach((a) => a.addEventListener('click', () => setFilter(a.dataset.filter)));

  $('#stats').innerHTML = (P.stats || []).map((s) => `<div class="stat"><b data-count="${esc(s.v)}">${esc(s.v)}</b><span>${esc(s.k)}</span></div>`).join('');
  const countUp = (el) => {
    const raw = el.dataset.count;
    const m = raw.match(/^([^\d]*)([\d,.]+)(.*)$/);
    if (!m || reduced || document.documentElement.classList.contains('is-still')) return;
    const target = parseFloat(m[2].replace(/,/g, ''));
    const dec = (m[2].split('.')[1] || '').length;
    const t0 = performance.now();
    const dur = 1400;
    const step = (t) => {
      const k = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - k, 3);
      const v = (target * e).toFixed(dec);
      el.textContent = m[1] + Number(v).toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + m[3];
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const statObs = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { $$('[data-count]', en.target).forEach(countUp); statObs.unobserve(en.target); } }), { threshold: .4 });
  statObs.observe($('#stats'));

  // ---------- feature: Kuppam ----------
  const K = projects.find((p) => p.slug === P.featureSlug);
  if (K) renderFeature(K);
  function renderFeature(p) {
    const f = P.feature || {};
    const v = f.video;
    const li = P.linkedin || {};
    const hasLi = !!li.embed;
    $('#kuppam').innerHTML = `
      <div class="section__bar eyebrow"><span>${esc(sections[p.section].id)} · ${esc(sections[p.section].title)} · New</span><span>${esc(p.year)}</span></div>
      <div class="feature__grid">
        <div class="rv">
          <div class="film" id="film">
            ${v ? `<video id="filmVideo" playsinline muted loop controls preload="none" poster="${esc(v.poster)}" aria-label="${esc(v.label || 'Project film')}"><source src="${esc(v.src)}" type="video/mp4"></video>` : ''}
          </div>
          ${hasLi ? `<div class="film__tabs"><button type="button" aria-pressed="true" data-film="video">Film</button><button type="button" aria-pressed="false" data-film="li">On LinkedIn</button></div>` : ''}
          <div class="film__cap">${esc(v ? v.cap : '')}${li.post ? ` · <a href="${esc(li.post)}" target="_blank" rel="noopener" style="color:var(--lavender)">Watch the post on LinkedIn ↗</a>` : ''}</div>
        </div>
        <div class="rv">
          <div class="kicker feature__new"><i></i>${esc(p.kicker)}</div>
          <h2 class="h2">${esc(p.title)}</h2>
          <p class="sub">${esc(p.sub)}</p>
          <div class="chips" style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px">${(p.meta || []).map((m) => `<span class="chip">${esc(m)}</span>`).join('')}</div>
          <p class="lead" style="margin:0 0 14px">${esc(p.lead)}</p>
          <div class="body">${paras(p.body)}</div>
          ${p.metrics ? `<div class="metrics">${p.metrics.map((m) => `<div><b>${esc(m.v)}</b><span>${esc(m.k)}</span></div>`).join('')}</div>` : ''}
          <ul class="contrib">${(p.contrib || []).map((c) => `<li>${esc(c)}</li>`).join('')}</ul>
          ${p.credits ? `<p class="muted" style="font-size:13px;margin:0 0 20px">${esc(p.credits)}</p>` : ''}
          <div class="links">${linkBtns(p.links)}<button type="button" class="btn btn--solid" data-case="${p.slug}">Full case study <span class="arr">→</span></button></div>
        </div>
      </div>
      <div class="strip" id="featureStrip">${p.gallery.map((g, i) => `<button type="button" class="tile" data-i="${i}" aria-label="${esc(g.cap)}">${img(g.slug, g.cap)}<span class="tile__cap">${esc(g.cap)}</span></button>`).join('')}</div>
      ${f.iframe ? `<div class="live" id="live">
        <div class="live__facade">
          ${f.iframePoster ? img(f.iframePoster, '', 1600) : ''}
          <div class="eyebrow" style="color:var(--lavender)">Live model · runs in your browser</div>
          <div style="font-family:var(--f-display);font-size:clamp(24px,3vw,38px);line-height:1.1;max-width:640px">Open the fracture model here, or in its own tab</div>
          <div class="links" style="justify-content:center"><button type="button" class="btn btn--solid" id="liveLoad">Load interactive model</button><a class="btn" href="${esc(f.iframe)}" target="_blank" rel="noopener">New tab <span class="arr">↗</span></a></div>
        </div>
      </div>` : ''}`;
    $$('#featureStrip .tile').forEach((b) => b.addEventListener('click', () => openLb(toLb(p.gallery, p.title), +b.dataset.i)));
    const lb = $('#liveLoad');
    if (lb) lb.addEventListener('click', () => {
      $('#live').innerHTML = `<div class="live__bar"><span>Kuppam GPR · live model</span><a href="${esc(f.iframe)}" target="_blank" rel="noopener">Open in new tab ↗</a></div><iframe src="${esc(f.iframe)}" title="Kuppam GPR fracture model" loading="lazy" allow="fullscreen" allowfullscreen style="top:34px;height:calc(100% - 34px)"></iframe>`;
    });
    // autoplay the (captioned, silent-by-default) film while in view
    const vid = $('#filmVideo');
    const conn = navigator.connection || {};
    if (vid && !reduced && !conn.saveData) {
      new IntersectionObserver((ents) => ents.forEach((en) => {
        if (en.isIntersecting) { vid.preload = 'auto'; const pr = vid.play(); if (pr) pr.catch(() => {}); } else if (!vid.paused) vid.pause();
      }), { threshold: .55 }).observe(vid);
    }
    if (hasLi) {
      $$('[data-film]').forEach((b) => b.addEventListener('click', () => {
        $$('[data-film]').forEach((x) => x.setAttribute('aria-pressed', x === b));
        const film = $('#film');
        if (b.dataset.film === 'li') {
          if (vid) vid.pause();
          film.querySelectorAll('iframe').forEach((x) => x.remove());
          film.insertAdjacentHTML('beforeend', `<iframe src="${esc(li.embed)}" title="LinkedIn post" allowfullscreen loading="lazy" style="background:#fff"></iframe>`);
        } else film.querySelectorAll('iframe').forEach((x) => x.remove());
      }));
    }
  }

  // ---------- work grid ----------
  const grid = $('#workGrid');
  let html = '';
  P.sections.forEach((s) => {
    const list = projects.filter((p) => p.section === s.id);
    html += `<div class="divider" data-sec="${s.id}" style="background:${s.bg}">
      <div class="divider__letter" aria-hidden="true">${s.id}</div>
      <div><div class="eyebrow">Section ${s.id} · ${list.length} projects</div><h3>${esc(s.title)}</h3><p>${esc(s.blurb)}</p></div></div>`;
    list.forEach((p) => {
      html += `<button type="button" class="card rv" data-sec="${s.id}" data-slug="${p.slug}" data-no="${esc(p.no)}" aria-label="${esc(p.title)}: open case study">
        <div class="card__media">${img(p.cover, p.title, 640, 'class="is-on"')}
          <span class="card__no">${esc(p.no)}</span>
          <span class="card__badges">${p.isNew ? '<span class="new">New</span>' : ''}${p.model ? '<span>3D</span>' : ''}${p.video ? '<span>Film</span>' : ''}${p.compare ? '<span>Compare</span>' : ''}</span>
          <span class="card__dots">${p.gallery.slice(0, 5).map((_, i) => `<i class="${i === 0 ? 'is-on' : ''}"></i>`).join('')}</span>
        </div>
        <div class="card__meta"><span class="kicker">${esc(p.kicker)}</span><span class="yr">${esc(p.year)}</span></div>
        <div class="card__title">${esc(p.title)}</div>
        <div class="card__sub">${esc(p.sub)}</div>
        <div class="card__tags">${(p.tags || []).slice(0, 4).map((t) => `<span>${esc(t)}</span>`).join('')}</div>
      </button>`;
    });
  });
  grid.innerHTML = html;
  $('#workCount').textContent = `${projects.length} projects`;

  // hover: flick through images
  $$('.card', grid).forEach((card) => {
    const p = projects.find((q) => q.slug === card.dataset.slug);
    const media = $('.card__media', card);
    const dots = $$('.card__dots i', card);
    const slugs = p.gallery.slice(0, 5).map((g) => g.slug);
    let timer = null, k = 0, built = false;
    const show = (i) => {
      $$('img', media).forEach((im, j) => { im.classList.toggle('is-on', j === i); im.classList.toggle('is-off', j !== i); });
      dots.forEach((d, j) => d.classList.toggle('is-on', j === i));
    };
    card.addEventListener('mouseenter', () => {
      if (slugs.length < 2 || reduced) return;
      if (!built) { slugs.slice(1).forEach((s) => $('.card__no', media).insertAdjacentHTML('beforebegin', img(s, '', 640, 'class="is-off"'))); built = true; }
      k = 0;
      timer = setInterval(() => { k = (k + 1) % slugs.length; show(k); }, 950);
    });
    card.addEventListener('mouseleave', () => { clearInterval(timer); show(0); });
    card.addEventListener('click', () => openCase(p.slug));
  });

  // list-view peek preview
  const peek = $('#peek');
  grid.addEventListener('mousemove', (e) => {
    if (!grid.classList.contains('is-list')) return;
    const card = e.target.closest('.card');
    if (!card) { peek.classList.remove('is-on'); return; }
    const p = projects.find((q) => q.slug === card.dataset.slug);
    const im = $('img', peek);
    const want = src(p.cover, 640);
    if (!im.src.endsWith(want)) im.src = want;
    peek.style.left = Math.min(innerWidth - 320, e.clientX + 24) + 'px';
    peek.style.top = Math.max(70, e.clientY - 110) + 'px';
    peek.classList.add('is-on');
  });
  grid.addEventListener('mouseleave', () => peek.classList.remove('is-on'));

  // filters
  const filters = $('#filters');
  filters.innerHTML = `<button type="button" aria-pressed="true" data-f="all">All<i>${projects.length}</i></button>` +
    P.sections.map((s) => `<button type="button" aria-pressed="false" data-f="${s.id}">${s.id} · ${esc(s.chip)}<i>${projects.filter((p) => p.section === s.id).length}</i></button>`).join('') +
    `<button type="button" aria-pressed="false" data-f="robot">With robots<i>${projects.filter((p) => p.robot).length}</i></button>` +
    `<span class="view-toggle"><button type="button" aria-pressed="true" data-view="grid" aria-label="Grid view">▦</button><button type="button" aria-pressed="false" data-view="list" aria-label="List view">☰</button></span>`;
  function setFilter(f) {
    $$('button[data-f]', filters).forEach((b) => b.setAttribute('aria-pressed', b.dataset.f === f));
    $$('.card', grid).forEach((c) => {
      const p = projects.find((q) => q.slug === c.dataset.slug);
      const show = f === 'all' || c.dataset.sec === f || (f === 'robot' && p.robot);
      c.classList.toggle('is-hidden', !show);
      if (show) c.classList.add('in');
    });
    $$('.divider', grid).forEach((d) => { d.hidden = !(f === 'all' || d.dataset.sec === f); });
  }
  $$('button[data-f]', filters).forEach((b) => b.addEventListener('click', () => setFilter(b.dataset.f)));
  $$('button[data-view]', filters).forEach((b) => b.addEventListener('click', () => {
    $$('button[data-view]', filters).forEach((x) => x.setAttribute('aria-pressed', x === b));
    grid.classList.toggle('is-list', b.dataset.view === 'list');
    peek.classList.remove('is-on');
  }));

  // ---------- case study overlay ----------
  const caseEl = $('#case');
  let current = null, lastFocus = null;
  function caseHTML(p) {
    const s = sections[p.section];
    const i = projects.indexOf(p);
    const prev = projects[(i - 1 + projects.length) % projects.length];
    const next = projects[(i + 1) % projects.length];
    const cmpSet = p.compare ? [p.compare.a, p.compare.b] : [];
    const hero = p.gallery[0] && !cmpSet.includes(p.gallery[0].slug) ? p.gallery[0] : null;
    const rest = hero ? p.gallery.slice(1) : p.gallery;
    const stepSlugs = new Set(((p.steps && p.steps.items) || []).map((x) => x[0]));
    const cmp = p.compare;
    const gal = rest.filter((g) => !stepSlugs.has(g.slug) && !(cmp && (g.slug === cmp.a || g.slug === cmp.b)));
    return `
      <div class="case__bar"><span>${esc(p.no)} · ${esc(s.title)}</span>
        <div class="case__nav"><button type="button" data-go="${prev.slug}" aria-label="Previous project">‹</button><button type="button" data-go="${next.slug}" aria-label="Next project">›</button><button type="button" id="caseClose" aria-label="Close case study">×</button></div></div>
      <div class="case__body">
        <div class="case__text">
          <div class="kicker">${esc(p.kicker)}</div>
          <h2 id="caseTitle">${esc(p.title)}</h2>
          <p class="sub">${esc(p.sub)}</p>
          <div class="chips">${(p.meta || []).map((m) => `<span class="chip">${esc(m)}</span>`).join('')}</div>
          <p class="lead">${esc(p.lead)}</p>
          <div class="body">${paras(p.body)}</div>
          ${p.metrics ? `<div class="metrics">${p.metrics.map((m) => `<div><b>${esc(m.v)}</b><span>${esc(m.k)}</span></div>`).join('')}</div>` : ''}
          ${p.contrib ? `<h4>Selected contributions</h4><ul class="contrib">${p.contrib.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>` : ''}
          ${p.note ? `<p class="case__note">${esc(p.note)}</p>` : ''}
          ${p.credits ? `<p class="case__note">${esc(p.credits)}</p>` : ''}
          <div class="case__tags">${(p.tags || []).map((t) => `<span>${esc(t)}</span>`).join('')}</div>
          <div class="links">${linkBtns(p.links)}${p.model ? `<button type="button" class="btn btn--solid" data-model="${p.model}">Open in 3D Lab <span class="arr">→</span></button>` : ''}${p.slug === P.featureSlug ? `<button type="button" class="btn btn--solid" data-jump="#kuppam">Watch the film <span class="arr">→</span></button>` : ''}</div>
        </div>
        <div class="case__media">
          ${hero ? `<button type="button" class="tile hero-img" data-g="0" aria-label="${esc(hero.cap)}">${img(hero.slug, hero.cap, 1600, 'loading="eager"')}</button><div class="case__cap">${esc(hero.cap)}</div>` : ''}
          ${cmp ? `<div class="case__section-label">${esc(cmp.title || 'Compare')} · drag</div>
            <div class="compare" style="aspect-ratio:${cmp.ratio || '4 / 3'}">${img(cmp.a, cmp.al, 1600, 'class="a"')}${img(cmp.b, cmp.bl, 1600, 'class="b"')}
              <span class="tile__label">${esc(cmp.al)}</span><span class="tile__label r">${esc(cmp.bl)}</span><div class="compare__handle"></div>
              <input type="range" min="0" max="100" value="50" aria-label="Compare ${esc(cmp.al)} and ${esc(cmp.bl)}"></div>` : ''}
          ${p.steps ? `<div class="case__section-label">${esc(p.steps.title)}</div>
            <div class="stepper"><div class="stepper__view">${p.steps.items.map((x, j) => img(x[0], x[1], 1600, `class="${j === 0 ? 'is-on' : ''}"`)).join('')}</div>
            <div class="stepper__steps" role="tablist">${p.steps.items.map((x, j) => `<button type="button" role="tab" aria-selected="${j === 0}" data-step="${j}"><b>${String(j + 1).padStart(2, '0')}</b><span>${esc(x[1])}</span></button>`).join('')}</div></div>` : ''}
          ${gal.length ? `<div class="case__section-label">Gallery · ${gal.length + 1} images</div>
            <div class="case__gallery">${gal.map((g) => `<button type="button" class="tile ${g.wide ? 'is-wide' : ''} ${g.contain ? 'tile--contain' : ''}" data-g="${p.gallery.indexOf(g)}" aria-label="${esc(g.cap)}">${img(g.slug, g.cap, g.wide ? 1600 : 640)}<span class="tile__cap">${esc(g.cap)}</span></button>`).join('')}</div>` : ''}
        </div>
        <div class="case__foot"><button type="button" data-go="${prev.slug}"><small>← Previous</small><span>${esc(prev.title)}</span></button><button type="button" data-go="${next.slug}"><small>Next →</small><span>${esc(next.title)}</span></button></div>
      </div>`;
  }
  function showCase(slug) {
    const p = projects.find((q) => q.slug === slug);
    if (!p) return hideCase();
    const wasOpen = !caseEl.hidden;
    if (!wasOpen) lastFocus = document.activeElement;
    current = p;
    caseEl.classList.toggle('is-dark', !!p.feature);
    caseEl.innerHTML = caseHTML(p);
    caseEl.hidden = false;
    caseEl.scrollTop = 0;
    document.body.classList.add('is-locked');
    requestAnimationFrame(() => caseEl.classList.add('is-open'));
    document.title = `${p.title} · Libish Murugesan`;
    wireCase(p);
    $('#caseClose').focus({ preventScroll: true });
  }
  function wireCase(p) {
    $('#caseClose').addEventListener('click', closeCase);
    $$('[data-go]', caseEl).forEach((b) => b.addEventListener('click', () => openCase(b.dataset.go, true)));
    $$('[data-g]', caseEl).forEach((b) => b.addEventListener('click', () => openLb(toLb(p.gallery, p.title), +b.dataset.g)));
    $$('[data-model]', caseEl).forEach((b) => b.addEventListener('click', () => { closeCase(); setTimeout(() => { document.getElementById('lab').scrollIntoView(); dispatchEvent(new CustomEvent('lab:load', { detail: b.dataset.model })); }, 60); }));
    $$('[data-jump]', caseEl).forEach((b) => b.addEventListener('click', () => { const t = b.dataset.jump; closeCase(); setTimeout(() => document.querySelector(t).scrollIntoView(), 60); }));
    const cmp = $('.compare', caseEl);
    if (cmp) { const r = $('input', cmp); r.addEventListener('input', () => cmp.style.setProperty('--pos', r.value + '%')); }
    const st = $('.stepper', caseEl);
    if (st) {
      const ims = $$('.stepper__view img', st);
      const bs = $$('[data-step]', st);
      const go = (j) => { ims.forEach((im, k) => im.classList.toggle('is-on', k === j)); bs.forEach((b, k) => b.setAttribute('aria-selected', k === j)); };
      bs.forEach((b) => b.addEventListener('click', () => go(+b.dataset.step)));
      $('.stepper__view', st).addEventListener('click', () => { const j = bs.findIndex((b) => b.getAttribute('aria-selected') === 'true'); go((j + 1) % bs.length); });
    }
  }
  function hideCase() {
    if (caseEl.hidden) return;
    caseEl.classList.remove('is-open');
    document.body.classList.remove('is-locked');
    document.title = 'Libish Murugesan · Computational Design Portfolio';
    current = null;
    setTimeout(() => { if (!current) { caseEl.hidden = true; caseEl.innerHTML = ''; } }, 380);
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
  }
  // pushed = we added a history entry for the open case (so Back / close returns to the page)
  let pushed = false;
  function openCase(slug, replace) {
    const url = '#/work/' + slug;
    if (replace && !caseEl.hidden) history.replaceState({ case: slug }, '', url);
    else { history.pushState({ case: slug }, '', url); pushed = true; }
    showCase(slug);
  }
  function closeCase() {
    if (pushed) { pushed = false; history.back(); }
    else { history.replaceState(null, '', location.pathname + location.search + '#work'); hideCase(); }
  }
  const route = () => {
    const m = location.hash.match(/^#\/work\/([\w-]+)/);
    if (m) { if (!current || current.slug !== m[1]) showCase(m[1]); } else { pushed = false; hideCase(); }
  };
  addEventListener('popstate', route);
  addEventListener('hashchange', route);
  $$('[data-case]').forEach((b) => b.addEventListener('click', () => openCase(b.dataset.case)));

  // ---------- lightbox ----------
  const lb = $('#lb'), lbImg = $('#lbImg'), lbStage = $('#lbStage');
  let lbItems = [], lbI = 0, lbFocus = null;
  function openLb(items, i) {
    lbItems = items; lbFocus = document.activeElement;
    $('#lbThumbs').innerHTML = items.length > 1 ? items.map((it, j) => `<button type="button" data-j="${j}" aria-label="Image ${j + 1}"><img src="${it.thumb}" alt="" loading="lazy" draggable="false"></button>`).join('') : '';
    $$('#lbThumbs button').forEach((b) => b.addEventListener('click', () => lbShow(+b.dataset.j)));
    lb.hidden = false;
    document.body.classList.add('is-locked');
    requestAnimationFrame(() => lb.classList.add('is-open'));
    lbShow(i || 0);
    $('#lbClose').focus({ preventScroll: true });
  }
  function lbShow(i) {
    lbI = (i + lbItems.length) % lbItems.length;
    const it = lbItems[lbI];
    lbStage.classList.remove('is-zoom');
    lbImg.style.transform = '';
    lbImg.style.opacity = .25;
    const pre = new Image();
    pre.onload = pre.onerror = () => { lbImg.src = it.full; lbImg.alt = it.cap || it.title; lbImg.style.opacity = 1; };
    pre.src = it.full;
    $('#lbCount').textContent = `${String(lbI + 1).padStart(2, '0')} / ${String(lbItems.length).padStart(2, '0')}`;
    $('#lbCap').innerHTML = `${it.title ? `<b>${esc(it.title)}</b>` : ''}${esc(it.cap)}`;
    $$('#lbThumbs button').forEach((b, j) => b.setAttribute('aria-current', j === lbI));
    const cur = $(`#lbThumbs button[data-j="${lbI}"]`);
    if (cur) cur.scrollIntoView({ block: 'nearest', inline: 'center' });
    $('#lbPrev').hidden = $('#lbNext').hidden = lbItems.length < 2;
  }
  function closeLb() {
    lb.classList.remove('is-open');
    setTimeout(() => { lb.hidden = true; lbImg.removeAttribute('src'); }, 300);
    if (caseEl.hidden) document.body.classList.remove('is-locked');
    if (lbFocus && document.contains(lbFocus)) lbFocus.focus({ preventScroll: true });
  }
  $('#lbClose').addEventListener('click', closeLb);
  $('#lbPrev').addEventListener('click', () => lbShow(lbI - 1));
  $('#lbNext').addEventListener('click', () => lbShow(lbI + 1));
  lb.addEventListener('click', (e) => { if (e.target === lb || e.target === lbStage) closeLb(); });
  lbImg.addEventListener('click', (e) => {
    const z = !lbStage.classList.contains('is-zoom');
    lbStage.classList.toggle('is-zoom', z);
    if (z) {
      const r = lbImg.getBoundingClientRect();
      lbImg.style.transformOrigin = `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`;
      lbImg.style.transform = 'scale(2.4)';
    } else lbImg.style.transform = '';
  });
  lbStage.addEventListener('mousemove', (e) => {
    if (!lbStage.classList.contains('is-zoom')) return;
    const r = lbStage.getBoundingClientRect();
    lbImg.style.transformOrigin = `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`;
  });
  let tx = null, ty = null;
  lbStage.addEventListener('touchstart', (e) => { if (e.touches.length === 1) { tx = e.touches[0].clientX; ty = e.touches[0].clientY; } }, { passive: true });
  lbStage.addEventListener('touchend', (e) => {
    if (tx == null || lbStage.classList.contains('is-zoom')) return;
    const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) lbShow(lbI + (dx < 0 ? 1 : -1));
    else if (dy > 90) closeLb();
    tx = ty = null;
  });

  // keyboard
  addEventListener('keydown', (e) => {
    if (!lb.hidden) {
      if (e.key === 'Escape') closeLb();
      else if (e.key === 'ArrowRight') lbShow(lbI + 1);
      else if (e.key === 'ArrowLeft') lbShow(lbI - 1);
      return;
    }
    if (!caseEl.hidden && current) {
      if (e.key === 'Escape') closeCase();
      else if ((e.key === 'ArrowRight' || e.key === 'ArrowLeft') && !(e.target.matches && e.target.matches('input'))) {
        const i = projects.indexOf(current);
        openCase(projects[(i + (e.key === 'ArrowRight' ? 1 : -1) + projects.length) % projects.length].slug, true);
      }
    }
  });

  // ---------- Frahan stone gallery ----------
  const stone = P.stone || [];
  $('#stoneGallery').innerHTML = stone.map((g, i) => {
    const n = norm(g);
    return `<button type="button" class="tile rv" data-i="${i}" aria-label="${esc(n.title || n.cap)}">${img(n.slug, n.title || n.cap, 640)}<span class="tile__cap"><b style="font-family:var(--f-display);font-weight:400;font-size:15px;display:block">${esc(n.title || '')}</b>${esc(n.cap)}</span></button>`;
  }).join('');
  $$('#stoneGallery .tile').forEach((b) => b.addEventListener('click', () => openLb(stone.map((g) => { const n = norm(g); return { full: src(n.slug, 1600), thumb: src(n.slug, 640), title: n.title || '', cap: n.cap }; }), +b.dataset.i)));
  if (P.stoneIntro) $('#stoneIntro').textContent = P.stoneIntro;

  // ---------- studio ----------
  $('#studioGrid').innerHTML = (P.studio || []).map((s, i) => `
    <button type="button" class="scard rv" data-i="${i}" aria-label="${esc(s.title)}: open images">
      <div class="tile">${img(norm(s.images[0]).slug, s.title, 640)}</div>
      <h3>${esc(s.title)}</h3><p>${esc(s.sub)}</p><span class="count">${s.images.length} image${s.images.length > 1 ? 's' : ''} ↗</span>
    </button>`).join('');
  $$('#studioGrid .scard').forEach((b) => b.addEventListener('click', () => { const s = P.studio[+b.dataset.i]; openLb(toLb(s.images, s.title), 0); }));

  // ---------- publications ----------
  const pubs = (P.pubs || []).slice().sort((a, b) => (b.year || 0) - (a.year || 0));
  $('#pubCount').textContent = pubs.length ? `${pubs.length} records` : '';
  $('#pubs').innerHTML = pubs.map((p) => {
    const url = p.url || (p.doi ? 'https://doi.org/' + p.doi : '');
    return `<article class="pub rv">
      <div class="pub__yr">${esc(p.year)}</div>
      <div class="pub__main">
        <div class="pub__type">${esc(p.type)}${p.venue ? ` · ${esc(p.venue)}` : ''}</div>
        <h3>${url ? `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(p.title)}</a>` : esc(p.title)}</h3>
        ${p.authors ? `<div class="pub__au">${esc(p.authors)}</div>` : ''}
        ${p.note ? `<p>${esc(p.note)}</p>` : ''}
      </div>
      <div class="pub__links">${p.doi ? `<a href="https://doi.org/${esc(p.doi)}" target="_blank" rel="noopener" class="mono">DOI ${esc(p.doi)} ↗</a>` : url ? `<a href="${esc(url)}" target="_blank" rel="noopener" class="mono">Open ↗</a>` : ''}${p.project && projects.some((q) => q.slug === p.project) ? `<button type="button" class="mono" data-case="${p.project}">Project →</button>` : ''}</div>
    </article>`;
  }).join('');
  $$('#pubs [data-case]').forEach((b) => b.addEventListener('click', () => openCase(b.dataset.case)));
  $('#profiles').innerHTML = (P.profiles || []).map((l) => `<a class="btn" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} <span class="arr">↗</span></a>`).join('');
  if (P.orcid) { const o = $('#orcidLink'); o.href = 'https://orcid.org/' + P.orcid; o.hidden = false; }

  // ---------- archive plates ----------
  const nPlates = P.archivePlates || 23;
  const plates = Array.from({ length: nPlates }, (_, i) => String(i + 1).padStart(2, '0'));
  const titles = P.archiveTitles || {};
  $('#plates').innerHTML = plates.map((n, i) => `<button type="button" data-i="${i}" aria-label="Plate ${n}${titles[+n] ? ': ' + esc(titles[+n]) : ''}"><img src="media/archive/plate-${n}-sm.webp" alt="" loading="lazy" draggable="false"><span>${n}${titles[+n] ? ' · ' + esc(titles[+n]) : ''}</span></button>`).join('');
  const plateItems = plates.map((n) => ({ full: `media/archive/plate-${n}-lg.webp`, thumb: `media/archive/plate-${n}-sm.webp`, title: `Plate ${n}`, cap: titles[+n] || '' }));
  $$('#plates button').forEach((b) => b.addEventListener('click', () => openLb(plateItems, +b.dataset.i)));
  $$('[data-scroll]').forEach((b) => b.addEventListener('click', () => { const el = $('#plates'); el.scrollBy({ left: +b.dataset.scroll * el.clientWidth * .8, behavior: reduced ? 'auto' : 'smooth' }); }));

  // ---------- repositories ----------
  $('#repos').innerHTML = (P.repos || []).map((r) => `<a href="${esc(r.url)}" target="_blank" rel="noopener"><span class="nm">${esc(r.name)}</span><span class="ds">${esc(r.desc)}</span><span class="arr">↗</span></a>`).join('');

  // ---------- reveal on scroll ----------
  const rvObs = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); rvObs.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px' });
  $$('.rv').forEach((el) => rvObs.observe(el));

  // deep link on load
  if (/^#\/work\//.test(location.hash)) { const m = location.hash.match(/^#\/work\/([\w-]+)/); history.replaceState({ case: m[1] }, '', location.hash); showCase(m[1]); }

  window.__portfolio = { openCase, openLb };
})();
