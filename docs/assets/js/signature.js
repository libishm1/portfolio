/* Signature layer (loaded after app.js). Chosen over the plain layer in two blind A/B rounds (Sep 2026).
   Adds stone accents per section, the cover dimension line, legend filters, a title block on each
   case study, a measuring readout over images and a revision stamp in the footer. */
(function () {
  'use strict';
  const P = window.PORTFOLIO;
  if (!P) return;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const acc = (sec) => `var(--acc-${sec})`;
  document.documentElement.classList.add('sig');

  // ---- stone accent per section (contents letters, filter swatches) ----
  $$('#filters button[data-f]').forEach((b) => { if (/^[A-D]$/.test(b.dataset.f)) b.style.setProperty('--acc', acc(b.dataset.f)); });
  $$('#contents a[data-filter]').forEach((a) => a.style.setProperty('--acc', acc(a.dataset.filter)));
  const vt = $$('#filters [data-view]');
  if (vt.length === 2) { vt[0].textContent = 'Grid'; vt[1].textContent = 'Index'; }

  // ---- cover: dimension line measuring the body of work ----
  const rule = $('.hero__rule');
  if (rule) {
    const count = (P.stats || []).find((x) => /projects/.test(x.k));
    rule.outerHTML = `<div class="dimline" aria-hidden="true"><i></i><span>${count ? count.v + ' projects & studies' : 'selected works'}</span><i></i></div>`;
  }

  // ---- title block closing each case study ----
  const caseEl = $('#case');
  const secTitle = Object.fromEntries(P.sections.map((s) => [s.id, s.title]));
  const addBlock = () => {
    const m = location.hash.match(/^#\/work\/([\w-]+)/);
    if (!m || !caseEl || caseEl.hidden || $('.tblock', caseEl)) return;
    const p = P.projects.find((q) => q.slug === m[1]);
    const foot = $('.case__foot', caseEl);
    if (!p || !foot) return;
    caseEl.style.setProperty('--acc', acc(p.section));
    const inSec = P.projects.filter((q) => q.section === p.section);
    const sheet = `${p.section} · ${String(inSec.indexOf(p) + 1).padStart(2, '0')} / ${String(inSec.length).padStart(2, '0')}`;
    foot.insertAdjacentHTML('beforebegin', `<div class="tblock" aria-label="Project title block">
      <div><small>Project</small><b>${esc(p.title)}</b></div>
      <div><small>Sheet</small><b><span class="acc"></span>${esc(sheet)}</b></div>
      <div><small>Section</small><b>${esc(secTitle[p.section])}</b></div>
      <div><small>Year</small><b>${esc(p.year)}</b></div>
    </div>`);
  };
  if (caseEl) new MutationObserver(addBlock).observe(caseEl, { childList: true });
  addBlock();

  // ---- measuring readout: pixel coordinates in the source image, like picking a point ----
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (fine) {
    const tag = document.createElement('div');
    tag.className = 'readout';
    tag.setAttribute('aria-hidden', 'true');
    document.body.appendChild(tag);
    const SEL = '.card__media, .tile, .compare, .stepper__view, .lb__stage';
    let raf = 0;
    document.addEventListener('mousemove', (e) => {
      const box = e.target.closest && e.target.closest(SEL);
      const img = box ? box.querySelector('img.is-on, img') : null;
      if (!img || !img.naturalWidth) { tag.classList.remove('is-on'); return; }
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = img.getBoundingClientRect();
        const u = (e.clientX - r.left) / r.width, v = (e.clientY - r.top) / r.height;
        if (u < 0 || u > 1 || v < 0 || v > 1) { tag.classList.remove('is-on'); return; }
        tag.innerHTML = `<b>+</b> x ${String(Math.round(u * img.naturalWidth)).padStart(4, '0')} · y ${String(Math.round(v * img.naturalHeight)).padStart(4, '0')} px`;
        tag.style.left = e.clientX + 'px';
        tag.style.top = e.clientY + 'px';
        tag.classList.add('is-on');
      });
    }, { passive: true });
    document.addEventListener('mouseleave', () => tag.classList.remove('is-on'));
  }

  // ---- footer revision stamp, as on a drawing ----
  const foot = $('.foot span');
  if (foot) foot.insertAdjacentHTML('afterend', '<span class="rev"><i>R2</i> 26.09.2026 · redesign, Kuppam GPR, 3D Lab</span>');
})();
