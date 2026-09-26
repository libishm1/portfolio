# Libish Murugesan · Computational Design Portfolio

Live site: **https://libishm1.github.io/portfolio/**

An interactive portfolio of robotic fabrication, geometry processing, stone and heritage work (2015 - 2026), plus a print version of the same work as landscape plates.

## What is on the site

| Section | What it does |
|---|---|
| Cover | Live Three.js scene: irregular stones packed on a Möbius strip. Drag to turn, hover to lift stones. |
| Kuppam GPR | The 2026 ground-penetrating radar fracture study: the film, key numbers, links to the live model, code and dataset DOI. The live model can be loaded in the page. |
| Work | 18 projects in four sections (A robotic fabrication, B sensing & heritage, C tools & software, D architecture). Filter by section or "with robots", grid or list view. Each card opens a case study with the full image set, process steppers and drag-to-compare sliders. Case studies have their own URLs (`#/work/<slug>`). |
| 3D Lab | Frahan StonePack models (Güell-style rubble vaults, pendentive vault, rubble arch, walls) as GLB: orbit, hover a stone for its size, explode the assembly, cut a section. |
| Frahan gallery | Renders from the Frahan StonePack examples. |
| Studio | Nine studio and prototyping projects, each a lightbox gallery. |
| Publications | Papers, preprints and datasets with DOIs (eCAADe, Caerdroia, Research Square, Zenodo, figshare). |
| Archive | All 23 plates of the 2015 - 2022 portfolio, zoomable. |
| Print portfolio | `docs/deck/` - the designed plate version. `deck/print.html#print` opens the print dialog (Save as PDF, margins none, background graphics on). |

## Layout

```
docs/                     the published site (GitHub Pages serves this folder)
  index.html              page structure
  assets/css/site.css     design system (Spectral / Archivo / JetBrains Mono, paper + indigo)
  assets/css/signature.css + assets/js/signature.js
                          signature layer: ruler section rules, Frahan stone accents per section,
                          legend filters, survey-grid letterboxing, drawing title blocks, revision stamp
  assets/js/data.js       ALL content: projects, studio, publications, repos, 3D models
  assets/js/media.js      generated image sizes (scripts/media_manifest.py)
  assets/js/app.js        rendering, filters, case studies, lightbox
  assets/js/hero3d.js     cover scene
  assets/js/lab3d.js      GLB viewer
  assets/vendor/three/    Three.js r186 (vendored, MIT)
  media/                  images as <slug>-640.webp and <slug>-1600.webp; archive/ plates; video/
  models/                 GLB models for the 3D Lab
  deck/                   print portfolio (see deck/README.md and deck/CLAUDE.md)
scripts/                  media manifest, pre-deploy check, print sync, rights metadata (embed_rights.py)
LICENSE.md                all rights reserved, with the MIT / GPL-3.0 exceptions
.github/workflows/pages.yml   deploys docs/ to GitHub Pages on every push to main
```

## Editing

- **Text, images, links:** edit `docs/assets/js/data.js`. Copy rule: no em dashes, use a hyphen or `·`.
- **New images:** add `docs/media/<slug>-1600.webp` (long edge ≤ 1600) and `<slug>-640.webp`, then run `python scripts/media_manifest.py`. Reference the slug in `data.js`.
- **LinkedIn post:** set `linkedin.post` (the post URL) and optionally `linkedin.embed` (the iframe `src` from LinkedIn's "Embed this post") in `data.js`.
- **Print deck:** edit `docs/deck/index.html` only, then run `python scripts/sync_print.py` to regenerate `print.html`.
- **Check before pushing:** `python scripts/check_site.py` lists any referenced file that is missing. The deploy workflow runs the same check.
- **Preview locally:** `cd docs && python -m http.server 8000`, then open http://localhost:8000.

## Rights and protection

- `docs/rights.html` states what is welcome and what needs permission; the footer links to it.
- Every page carries the W3C TDMRep reservation (`tdm-reservation`, `tdm-policy.json`), a licence link and a plain notice to automated agents in the page source.
- `python scripts/embed_rights.py` writes copyright and IPTC "no AI training" metadata into every image and model without changing a pixel (Frahan and Kuppam assets get their GPL-3.0 notice instead). The deploy workflow runs it too, so new images are tagged automatically.
- The previous site (old presentation PDF and full-size page scans) is no longer in this repository; it is archived offline.

## Deployment

Pushing to `main` runs `.github/workflows/pages.yml`, which checks the files and deploys `docs/` with GitHub Actions (Settings → Pages → Source: GitHub Actions).

## How the current version was reviewed (Sep 2026)

Four independent reviews ran before this release: usability (desktop and 390 px mobile, keyboard, contrast, performance, links), print crops (every frame of the 26-plate deck rendered to PDF), a fact-check of every claim against the CV, the original plates, repositories and project records, and a voice review against Libish's own writing. The signature layer was chosen over the plain layer in two blind A/B judgements (round 1: plain 7.4 vs signature 7.0 as first built; round 2, after trimming: plain 7.0 vs signature 8.5).
