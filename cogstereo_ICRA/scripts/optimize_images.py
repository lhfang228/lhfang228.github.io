#!/usr/bin/env python3
"""Generate WebP variants for project page PNG figures."""

from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image


def convert_png_to_webp(png_path: Path, quality: int = 82) -> Path:
    webp_path = png_path.with_suffix(".webp")
    with Image.open(png_path) as img:
        img.save(webp_path, format="WEBP", quality=quality, method=6)
    return webp_path


def main() -> int:
    assets = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("docs/assets/images")
    if not assets.is_dir():
        print(f"Assets directory not found: {assets}", file=sys.stderr)
        return 1

    pngs = sorted(assets.glob("*.png"))
    if not pngs:
        print("No PNG files found.")
        return 0

    for png in pngs:
        webp = convert_png_to_webp(png)
        before = png.stat().st_size
        after = webp.stat().st_size
        ratio = 100 * after / before
        print(f"{png.name}: {before // 1024}KB -> {webp.name}: {after // 1024}KB ({ratio:.0f}%)")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
