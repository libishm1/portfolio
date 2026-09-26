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
  assets/js/data.js       ALL content: projects, studio, publications, repos, 3D models
  assets/js/media.js      generated image sizes (scripts/media_manifest.py)
  assets/js/app.js        rendering, filters, case studies, lightbox
  assets/js/hero3d.js     cover scene
  assets/js/lab3d.js      GLB viewer
  assets/vendor/three/    Three.js r186 (vendored, MIT)
  media/                  images as <slug>-640.webp and <slug>-1600.webp; archive/ plates; video/
  models/                 GLB models for the 3D Lab
  deck/                   print portfolio (see deck/README.md and deck/CLAUDE.md)
presentation_site/        the previous site, kept as source
scripts/                  media manifest, pre-deploy check, old PDF extraction
.github/workflows/pages.yml   deploys docs/ to GitHub Pages on every push to main
```

## Editing

- **Text, images, links:** edit `docs/assets/js/data.js`. Copy rule: no em dashes, use a hyphen or `·`.
- **New images:** add `docs/media/<slug>-1600.webp` (long edge ≤ 1600) and `<slug>-640.webp`, then run `python scripts/media_manifest.py`. Reference the slug in `data.js`.
- **LinkedIn post:** set `linkedin.post` (the post URL) and optionally `linkedin.embed` (the iframe `src` from LinkedIn's "Embed this post") in `data.js`.
- **Check before pushing:** `python scripts/check_site.py` lists any referenced file that is missing. The deploy workflow runs the same check.
- **Preview locally:** `cd docs && python -m http.server 8000`, then open http://localhost:8000.

## Deployment

Pushing to `main` runs `.github/workflows/pages.yml`, which checks the files and deploys `docs/` with GitHub Actions (Settings → Pages → Source: GitHub Actions).
