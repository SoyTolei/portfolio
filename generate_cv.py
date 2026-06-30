"""Genera CV2026.pdf desde cv.html usando Playwright."""
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent
HTML = ROOT / "cv.html"
PDF = ROOT / "CV2026.pdf"


def main() -> None:
    if not HTML.exists():
        raise FileNotFoundError(f"No se encontró {HTML}")

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto(HTML.as_uri(), wait_until="networkidle")
        page.pdf(
            path=str(PDF),
            format="A4",
            print_background=True,
            margin={"top": "0", "right": "0", "bottom": "0", "left": "0"},
        )
        browser.close()

    print(f"Generado: {PDF}")


if __name__ == "__main__":
    main()
