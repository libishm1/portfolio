"""Pre-deploy check: every image, model and video referenced by the site exists in docs/.

Run from the repo root:  python scripts/check_site.py
Exits non-zero (and the Pages workflow stops) if anything is missing.
"""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
data = (DOCS / "assets" / "js" / "data.js").read_text(encoding="utf-8")
html = (DOCS / "index.html").read_text(encoding="utf-8")

missing = []

# image slugs used in data.js -> media/<slug>-640.webp and -1600.webp
project_slugs = set(re.findall(r"slug:\s*['\"]([a-z0-9-]+)['\"]", data)) | set(re.findall(r"featureSlug:\s*['\"]([a-z0-9-]+)['\"]", data))
project_slugs |= set(re.findall(r"project['\"]?:\s*['\"]([a-z0-9-]+)['\"]", data))
slugs = set(re.findall(r"['\"]((?:old|d|dx|frahan|kuppam)-[a-z0-9-]+)['\"]", data)) - project_slugs
for s in sorted(slugs):
    for size in ("640", "1600"):
        if not (DOCS / "media" / f"{s}-{size}.webp").exists():
            missing.append(f"media/{s}-{size}.webp")

# explicit files: models, video, posters, archive plates
for ref in re.findall(r"['\"]((?:models|media)/[^'\"]+\.(?:glb|mp4|webm|webp|jpg|png|vtt))['\"]", data + html):
    if not (DOCS / ref).exists():
        missing.append(ref)
n_plates = int(re.search(r"archivePlates:\s*(\d+)", data).group(1))
for i in range(1, n_plates + 1):
    for suf in ("sm", "lg"):
        if not (DOCS / "media" / "archive" / f"plate-{i:02d}-{suf}.webp").exists():
            missing.append(f"media/archive/plate-{i:02d}-{suf}.webp")

# local scripts and styles in index.html
for ref in re.findall(r"(?:src|href)=\"((?:assets|deck)/[^\"#?]+)\"", html):
    if not (DOCS / ref).exists():
        missing.append(ref)

if missing:
    print("Missing files referenced by the site:")
    for m in sorted(set(missing)):
        print("  -", m)
    sys.exit(1)
print(f"ok: {len(slugs)} image slugs, {n_plates} archive plates, all referenced files present")
