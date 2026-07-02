"""Genera CV2026.pdf y CV2026_EN.pdf desde cv.html y cv-en.html."""
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent
OUTPUTS = (
    (ROOT / "cv.html", ROOT / "CV2026.pdf"),
    (ROOT / "cv-en.html", ROOT / "CV2026_EN.pdf"),
)


def export_pdf(page, html: Path, pdf: Path) -> None:
    if not html.exists():
        raise FileNotFoundError(f"No se encontró {html}")
    page.goto(html.as_uri(), wait_until="networkidle")
    page.pdf(
        path=str(pdf),
        format="A4",
        print_background=True,
        margin={"top": "0", "right": "0", "bottom": "0", "left": "0"},
    )
    print(f"Generado: {pdf}")


def main() -> None:
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        for html, pdf in OUTPUTS:
            export_pdf(page, html, pdf)
        browser.close()


if __name__ == "__main__":
    main()
