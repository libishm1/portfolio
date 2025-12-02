import json
import os
from pathlib import Path

import fitz  # PyMuPDF
from PIL import Image


PDF_PATH = Path(r"C:\Users\lmurugesan\OneDrive - Alfaisal University\portfolio\issuu_downloads\presentation.pdf")
OUTPUT_ROOT = Path("presentation_site")
PAGES_DIR = OUTPUT_ROOT / "pages"
DATA_DIR = OUTPUT_ROOT / "data"


def ensure_dirs():
    PAGES_DIR.mkdir(parents=True, exist_ok=True)
    DATA_DIR.mkdir(parents=True, exist_ok=True)


def page_image_to_jpeg(page, out_path, zoom=2.0, quality=80):
    matrix = fitz.Matrix(zoom, zoom)
    pix = page.get_pixmap(matrix=matrix, alpha=False)
    image = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    image.save(out_path, format="JPEG", quality=quality, optimize=True)


def extract_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    pages = []
    for idx in range(doc.page_count):
        page = doc.load_page(idx)
        text = page.get_text("text").strip()
        image_name = f"page-{idx + 1:02d}.jpg"
        image_path = PAGES_DIR / image_name
        page_image_to_jpeg(page, image_path)
        pages.append(
            {
                "index": idx + 1,
                "image": f"pages/{image_name}",
                "text": text,
            }
        )
    return {
        "title": PDF_PATH.stem,
        "pageCount": len(pages),
        "pages": pages,
    }


def main():
    if not PDF_PATH.exists():
        raise FileNotFoundError(f"PDF not found at {PDF_PATH}")
    ensure_dirs()
    data = extract_pdf(PDF_PATH)
    data_path = DATA_DIR / "pages.json"
    with data_path.open("w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Wrote {len(data['pages'])} pages to {data_path}")


if __name__ == "__main__":
    main()
