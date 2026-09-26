# Libish Murugesan · Computational Design Portfolio

A 25-plate landscape portfolio (1320 × 880 px per plate) that is both a **static website** and a **print-to-PDF document**. All text is live HTML, so it stays selectable in the exported PDF.

## Files

```
index.html          the portfolio (open in a browser / served by GitHub Pages)
print.html          same content; opening print.html#print triggers the print dialog
support.js          small runtime that renders the template (loads React 18 from unpkg)
_assets/img/        curated images (cover, repo screenshots, Godrej terrain work)
_assets/extracted/  images cropped from the 2015–2022 portfolio pages
.nojekyll           required so GitHub Pages serves the underscore-prefixed _assets folder
CLAUDE.md           editing guide for Claude Code sessions
```

## View locally

The page loads images by relative path, so serve the folder rather than double-clicking:

```bash
cd portfolio_site
python -m http.server 8000
# open http://localhost:8000
```

## Publish on GitHub Pages

1. Copy the contents of this folder into your repo (root, or a `docs/` folder), e.g. `libishm1/portfolio`.
2. Keep `.nojekyll` next to `index.html`.
3. Repo **Settings → Pages → Build and deployment → Deploy from a branch** → `main` / `(root)` or `/docs`.
4. The site appears at `https://libishm1.github.io/<repo>/`.

## Export the PDF

Open `print.html#print` in Chrome or Edge. In the print dialog:

- Destination: **Save as PDF**
- Margins: **None**
- **Background graphics: on**

Each plate prints as one 1320 × 880 page (`@page` is set in the file). Images are pre-downsized so the PDF stays under ~10 MB.

If you edit `index.html`, copy the change into `print.html` too (or regenerate it: `print.html` = `index.html` + the print-color CSS line + the auto-print script before `</body>`).
