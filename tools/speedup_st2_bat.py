"""Acelera st2-bat-hover.gif: menos frames, delays seguros (>=20 ms), tamaño liviano."""
import io
import subprocess
from pathlib import Path

from PIL import Image, ImageSequence

ROOT = Path(__file__).resolve().parent.parent
GIF = ROOT / "assets" / "projects" / "media" / "st2-bat-hover.gif"
FRAME_STEP = 4
MAX_WIDTH = 560
COLORS = 128
DELAY_FACTOR = 1.5
MIN_DELAY_MS = 20


def load_original() -> bytes:
    return subprocess.check_output(
        ["git", "show", "HEAD:assets/projects/media/st2-bat-hover.gif"],
        cwd=ROOT,
    )


def resize_rgba(frame: Image.Image, max_width: int) -> Image.Image:
    rgba = frame.convert("RGBA")
    if rgba.width <= max_width:
        return rgba
    height = int(rgba.height * max_width / rgba.width)
    return rgba.resize((max_width, height), Image.Resampling.LANCZOS)


def rebuild(data: bytes) -> None:
    src = Image.open(io.BytesIO(data))
    palette_src = resize_rgba(src.copy(), MAX_WIDTH)
    palette = palette_src.convert("P", palette=Image.Palette.ADAPTIVE, colors=COLORS)

    frames: list[Image.Image] = []
    durations: list[int] = []

    for i, frame in enumerate(ImageSequence.Iterator(src)):
        if i % FRAME_STEP:
            continue
        frames.append(resize_rgba(frame, MAX_WIDTH).convert("P", palette=palette))
        delay = frame.info.get("duration", 30)
        durations.append(max(MIN_DELAY_MS, int(delay / DELAY_FACTOR)))

    frames[0].save(
        GIF,
        format="GIF",
        save_all=True,
        append_images=frames[1:],
        duration=durations,
        loop=src.info.get("loop", 0),
        disposal=2,
        optimize=True,
    )
    total_ms = sum(durations)
    size_kb = GIF.stat().st_size // 1024
    print(
        f"{GIF.name}: {len(frames)} frames · {total_ms / 1000:.1f}s loop · "
        f"{size_kb} KB · {frames[0].size[0]}×{frames[0].size[1]}"
    )


if __name__ == "__main__":
    rebuild(load_original())
