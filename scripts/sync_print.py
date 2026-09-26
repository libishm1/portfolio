"""Regenerate docs/deck/print.html from docs/deck/index.html (see docs/deck/CLAUDE.md).

print.html = index.html + print-color-adjust on * + an auto-print script that runs only with #print.
Run after every edit to the deck:  python scripts/sync_print.py
"""
from pathlib import Path
import re

DECK = Path(__file__).resolve().parents[1] / "docs" / "deck"
html = (DECK / "index.html").read_text(encoding="utf-8")
plates = 26

reset = "  *{box-sizing:border-box;}"
assert reset in html, "reset rule not found"
html = html.replace(reset, "  *{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact;}", 1)
auto = f"""</script>
<script>
addEventListener('load',()=>{{(async()=>{{
  for(let i=0;i<120;i++){{ if(document.querySelectorAll('.plate').length>={plates}) break; await new Promise(r=>setTimeout(r,100)); }}
  try{{ await document.fonts.ready; }}catch(e){{}}
  const imgs=Array.from(document.images).filter(i=>!i.complete);
  await Promise.race([Promise.allSettled(imgs.map(i=>i.decode())),new Promise(r=>setTimeout(r,8000))]);
  if(location.hash==='#print') setTimeout(()=>window.print(),700);
}})();}});
</script>
</body>"""
end = re.search(r"</script>\s*</body>", html)
assert end, "closing script/body not found"
html = html[: end.start()] + auto + html[end.end():]
(DECK / "print.html").write_text(html, encoding="utf-8", newline="\n")
print("docs/deck/print.html regenerated")
