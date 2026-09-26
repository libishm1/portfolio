# CLAUDE.md · portfolio editing guide

## How the page is built

`index.html` is a single template file rendered by `support.js`:

- The markup between `<x-dc>` and `<script data-dc-script>` is the **template**. It uses `{{ path }}` holes (dotted lookups only, no expressions), `<sc-for list="{{ ... }}" as="x">` loops and `<sc-if value="{{ ... }}">` conditionals.
- The `<script data-dc-script>` block holds `class Component extends DCLogic { renderVals() { ... } }`. **All content lives here** as plain JS data. Compute anything conditional in `renderVals()`; never write JS inside `{{ }}`.
- Styling is **inline styles only**. `<helmet><style>` holds only resets, `@page` and print rules.

## Where to edit

Inside `renderVals()`:

| What | Where |
|---|---|
| A project's text, tags, images | the `mk({...})` entries in `const projects = [...]` |
| Plate order / section dividers | `const plates = [...]` (uses `projects.slice(a,b)`) |
| Contents page rows | the `contents:` array in the returned object |
| Studio grid (8 cards) | the `isGrid:true` plate's `cards` array |
| Repository index | the `isColophon:true` plate's `repos` array |

`light` / `dark` objects at the top of `renderVals()` are the colour tokens for normal vs. `feature:true` plates.

### Project entry fields

```
page, section, kicker, title, sub, meta[], lead, body ('\n' = paragraph break),
contrib[3], tags[], link, heroCap
feature:true            dark plate
hero + thumbs[2]        big image + two thumbnails
metrics[4] + specLabel  dark metrics panel instead of a photo
hasPair, pairA/B        two images side by side (+ pairAlabel/pairBlabel)
hasTrio, trioA/B/C      two images on top, one full-width below
hasQuad, quadHero, quadRow[3]   hero + row of three (Godrej terrain plate)
```

Keep body copy short: the text column is fixed at ~730 px tall. After edits, check no column overflows.

### Adding a project

1. Drop images in `_assets/img/`.
2. Add an `mk({...})` entry in `projects` at the right position.
3. Update the `slice()` ranges in `plates`, the divider `range` strings, the `page` numbers after it, and the `contents` page ranges.

## Style rules

- Fonts: Spectral (titles, lead), Archivo (body), JetBrains Mono (labels, metadata).
- Palette: paper `#F6F4EF`, ink `#16151C`, body `#56535E`, meta `#918D98`, rule `#DEDAD0`, indigo accent `#34327A`, dark plate `#15142C`, lavender `#B8B2E0`, terracotta kicker `#A8553B`.
- No em dashes in copy. Use a plain hyphen or a middle dot `·`.
- Godrej Properties work: never name sites; keep the "site data is redacted for privacy" note; credit the plotted generative layout to senior colleagues.

## Keep print.html in sync

`print.html` = `index.html` plus `print-color-adjust:exact` on `*` and an auto-print script before `</body>` (runs only with `#print` in the URL). Re-apply after editing `index.html`.
