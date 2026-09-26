#!/usr/bin/env python3
"""Embed copyright and AI-training rights metadata into the site's files, in place, without
re-encoding anything.

- WebP (docs/media/**): adds a VP8X header and an XMP chunk; the VP8 bitstream is untouched.
- JPEG (docs/deck/_assets/**, docs/media/*.jpg): adds an XMP APP1 segment; the scan data is untouched.
- GLB (docs/models/*.glb): writes glTF asset.copyright; the BIN chunk (geometry) is untouched.

Every image write is verified (decoded pixels must be identical) before it replaces the original.
Safe to re-run: files that already carry the metadata are skipped. Run from the repo root:
    python scripts/embed_rights.py           # tag everything that is missing
    python scripts/embed_rights.py --check   # exit 1 if any file lacks the metadata

Rights follow who made the work (see docs/rights.html):
- Frahan and Kuppam assets mirror GPL-3.0 repositories: GPL notice, no "no AI training" flag.
- Team projects: credited to Libish Murugesan and the project team.
- Godrej Properties work: not claimed as Libish's copyright.
- Topologic Studio: original author Wassim Jabi.
- Everything else: (c) Libish Murugesan, all rights reserved, not licensed for AI training.
"""
import glob, hashlib, json, os, re, struct, sys
from html import escape

from PIL import Image

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "docs")
RIGHTS = "https://libishm1.github.io/portfolio/rights.html"
NO_AI = "http://ns.useplus.org/ldf/vocab/DMI-PROHIBITED-AIMLTRAINING"
RESERVED_TERMS = ("All rights reserved. No reproduction, and no use for AI/ML training or text and data mining "
                  "(rights reserved under Art. 4(3) Directive (EU) 2019/790), without written permission. "
                  f"Viewing, linking and short quotation with credit are welcome. Terms: {RIGHTS}")
FRAHAN = ("GPL-3.0-only (Frahan StonePack)", "https://github.com/libishm1/Frahan")
KUPPAM = ("GPL-3.0-only (Kuppam GPR fracture study)", "https://github.com/libishm1/Kuppam_granite-deposit_GPR-Fracture_study")
TEAM = re.compile(r"^(?:d-|dx-|old-)?(?:cclt|log|crease|lattice|thermal|plantd|metal|b4b|proto|bamboo)-")
TEAM_PAGES = re.compile(r"^(?:dx-)?page-(?:03|04|05|10|11|12|13|14|15|20|22|23)-")


def classify(path):
    """Return (creator, rights text, usage terms, web statement, no_ai_training) for a file."""
    n = os.path.basename(path).lower().replace("_", "-")
    n = re.sub(r"-(640|1600|sm|lg)\.(webp|jpg|jpeg)$|\.(webp|jpg|jpeg|glb)$", "", n)
    me = "Libish Murugesan"
    if n.startswith("kuppam-film"):
        return (me, "© 2026 Libish Murugesan. All rights reserved. Not licensed for AI training.", RESERVED_TERMS, RIGHTS, True)
    for prefixes, (lic, url) in ((("frahan-", "d-frahan-"), FRAHAN), (("kuppam-",), KUPPAM)):
        if n.startswith(prefixes):
            return (me, f"© 2026 Libish Murugesan. Licensed under {lic}.",
                    f"Licensed under {lic}; see {url}. Keep the copyright and licence notices.", url, False)
    if n.startswith(("gp-", "d-gp-")):
        return ("Libish Murugesan (computational design, Godrej Properties)",
                "Work produced at Godrej Properties; site data redacted. Shown for portfolio purposes only. "
                "Not licensed for reproduction or AI training.", RESERVED_TERMS, RIGHTS, True)
    if n.startswith(("topologic", "d-topologic")):
        return ("Libish Murugesan; Topologic Studio originally by Wassim Jabi",
                "Topologic Studio: original author Wassim Jabi; improved and developed by Libish Murugesan. "
                "Not licensed for reproduction or AI training.", RESERVED_TERMS, RIGHTS, True)
    if TEAM.match(n) or TEAM_PAGES.match(n):
        return ("Libish Murugesan and the project team",
                "© Libish Murugesan and the project team (credits on the portfolio). All rights reserved. "
                "Not licensed for AI training.", RESERVED_TERMS, RIGHTS, True)
    if n.startswith("plate-"):
        return (me, "© 2016-2024 Libish Murugesan (portfolio plates; team projects are joint work with the named teams). "
                "All rights reserved. Not licensed for AI training.", RESERVED_TERMS, RIGHTS, True)
    return (me, "© 2026 Libish Murugesan. All rights reserved. Not licensed for AI training.", RESERVED_TERMS, RIGHTS, True)


def xmp_packet(path, compact=False):
    creator, rights, usage, web, no_ai = (escape(x) if isinstance(x, str) else x for x in classify(path))
    attrs = f'xmpRights:Marked="True" xmpRights:WebStatement="{web}" photoshop:Credit="Libish Murugesan"'
    if no_ai:
        attrs += f' plus:DataMining="{NO_AI}"'
    body = (f"<dc:creator><rdf:Seq><rdf:li>{creator}</rdf:li></rdf:Seq></dc:creator>"
            f'<dc:rights><rdf:Alt><rdf:li xml:lang="x-default">{rights}</rdf:li></rdf:Alt></dc:rights>')
    if not compact:
        body += (f'<xmpRights:UsageTerms><rdf:Alt><rdf:li xml:lang="x-default">{usage}</rdf:li></rdf:Alt></xmpRights:UsageTerms>'
                 f'<plus:Licensor><rdf:Seq><rdf:li rdf:parseType="Resource"><plus:LicensorURL>{web}</plus:LicensorURL>'
                 "</rdf:li></rdf:Seq></plus:Licensor>")
    ns = ('xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xmpRights="http://ns.adobe.com/xap/1.0/rights/" '
          'xmlns:photoshop="http://ns.adobe.com/photoshop/1.0/" xmlns:plus="http://ns.useplus.org/ldf/xmp/1.0/"')
    return ('<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?><x:xmpmeta xmlns:x="adobe:ns:meta/">'
            '<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">'
            f'<rdf:Description rdf:about="" {ns} {attrs}>{body}</rdf:Description></rdf:RDF></x:xmpmeta>'
            '<?xpacket end="r"?>').encode("utf-8")


def pixels(path):
    im = Image.open(path)
    im.load()
    return im.size, im.mode, hashlib.sha256(im.tobytes()).hexdigest()


def replace_verified(path, data):
    tmp = path + ".tmp"
    with open(tmp, "wb") as f:
        f.write(data)
    if pixels(tmp) != pixels(path):
        os.remove(tmp)
        raise RuntimeError("pixel verification failed: " + path)
    os.replace(tmp, path)


# ---------- WebP ----------
def riff_chunks(b):
    i, out = 12, []
    while i < len(b):
        name, size = b[i:i + 4], struct.unpack("<I", b[i + 4:i + 8])[0]
        out.append((name, b[i + 8:i + 8 + size]))
        i += 8 + size + (size & 1)
    return out


def riff_chunk(name, data):
    return name + struct.pack("<I", len(data)) + data + (b"\0" if len(data) & 1 else b"")


def webp_has(path):
    b = open(path, "rb").read()
    return any(n == b"XMP " for n, _ in riff_chunks(b))


def webp_embed(path):
    b = open(path, "rb").read()
    parts = riff_chunks(b)
    if any(n == b"XMP " for n, _ in parts):
        return "skip"
    if [n for n, _ in parts] != [b"VP8 "]:
        return "unsupported"
    w, h = Image.open(path).size
    vp8x = bytes([0x04, 0, 0, 0]) + (w - 1).to_bytes(3, "little") + (h - 1).to_bytes(3, "little")
    compact = path.endswith(("-640.webp", "-sm.webp"))
    body = b"WEBP" + riff_chunk(b"VP8X", vp8x) + riff_chunk(b"VP8 ", parts[0][1]) + riff_chunk(b"XMP ", xmp_packet(path, compact))
    replace_verified(path, b"RIFF" + struct.pack("<I", len(body)) + body)
    return "ok"


# ---------- JPEG ----------
XMP_SIG = b"http://ns.adobe.com/xap/1.0/\x00"


def jpeg_has(path):
    b = open(path, "rb").read(65536 * 4)
    return XMP_SIG in b


def jpeg_embed(path):
    b = open(path, "rb").read()
    if b[:2] != b"\xff\xd8":
        return "unsupported"
    if XMP_SIG in b[:65536 * 4]:
        return "skip"
    # insert after SOI and any APP0 (JFIF) segment
    i = 2
    if b[i:i + 2] == b"\xff\xe0":
        i += 2 + struct.unpack(">H", b[i + 2:i + 4])[0]
    payload = XMP_SIG + xmp_packet(path)
    seg = b"\xff\xe1" + struct.pack(">H", len(payload) + 2) + payload
    replace_verified(path, b[:i] + seg + b[i:])
    return "ok"


# ---------- GLB ----------
GLB_COPYRIGHT = "© 2026 Libish Murugesan. Frahan StonePack model, licensed GPL-3.0-only."
GLB_LICENSE = "https://github.com/libishm1/Frahan/blob/main/LICENSE"


def glb_split(b):
    magic, ver, total = struct.unpack("<4sII", b[:12])
    assert magic == b"glTF" and ver == 2 and total == len(b)
    jlen, jtype = struct.unpack("<I4s", b[12:20])
    assert jtype == b"JSON"
    return json.loads(b[20:20 + jlen].decode("utf-8")), b[20 + jlen:]


def glb_has(path):
    doc, _ = glb_split(open(path, "rb").read())
    return doc.get("asset", {}).get("copyright") == GLB_COPYRIGHT


def glb_embed(path):
    b = open(path, "rb").read()
    doc, rest = glb_split(b)
    if doc.get("asset", {}).get("copyright") == GLB_COPYRIGHT:
        return "skip"
    doc.setdefault("asset", {})["copyright"] = GLB_COPYRIGHT
    doc["asset"].setdefault("extras", {})["license"] = GLB_LICENSE
    j = json.dumps(doc, separators=(",", ":"), ensure_ascii=False).encode("utf-8")
    j += b" " * (-len(j) % 4)
    out = struct.pack("<4sII", b"glTF", 2, 20 + len(j) + len(rest)) + struct.pack("<I4s", len(j), b"JSON") + j + rest
    doc2, rest2 = glb_split(out)
    assert rest2 == rest and doc2["asset"]["copyright"] == GLB_COPYRIGHT
    tmp = path + ".tmp"
    with open(tmp, "wb") as f:
        f.write(out)
    os.replace(tmp, path)
    return "ok"


def files():
    for f in sorted(glob.glob(os.path.join(ROOT, "**", "*.webp"), recursive=True)):
        yield f, webp_has, webp_embed
    for f in sorted(glob.glob(os.path.join(ROOT, "**", "*.jp*g"), recursive=True)):
        yield f, jpeg_has, jpeg_embed
    for f in sorted(glob.glob(os.path.join(ROOT, "models", "*.glb"))):
        yield f, glb_has, glb_embed


if __name__ == "__main__":
    if "--check" in sys.argv:
        missing = [f for f, has, _ in files() if not has(f)]
        total = sum(1 for _ in files())
        print(f"{total - len(missing)}/{total} files carry rights metadata")
        for f in missing:
            print("  missing:", os.path.relpath(f, ROOT))
        sys.exit(1 if missing else 0)
    stats = {}
    for f, _, embed in files():
        r = embed(f)
        stats[r] = stats.get(r, 0) + 1
        if r == "unsupported":
            print("  unsupported format (not tagged):", os.path.relpath(f, ROOT))
    print(stats)
