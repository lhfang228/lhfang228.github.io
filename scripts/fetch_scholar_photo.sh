#!/usr/bin/env bash
# Download profile photo from Google Scholar and regenerate square avatars.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
USER_ID="${SCHOLAR_USER_ID:-pFazUOQAAAAJ}"
CITPID="${SCHOLAR_CITPID:-3}"
URL="https://scholar.googleusercontent.com/citations?view_op=medium_photo&user=${USER_ID}&citpid=${CITPID}"
OUT="${ROOT}/assets/photo.jpg"

curl -fsSL -A "Mozilla/5.0" "$URL" -o "$OUT"
echo "Saved $(file -b "$OUT") -> $OUT"

python3 - "$ROOT" << 'PY'
import sys
from pathlib import Path
from PIL import Image

root = Path(sys.argv[1])
im = Image.open(root / "assets/photo.jpg").convert("RGB")
w, h = im.size
side = min(w, h)
left = (w - side) // 2
top = min(max(0, (h - side) // 4), h - side)
im = im.crop((left, top, left + side, top + side))
for size, name in [(280, "photo-avatar.jpg"), (560, "photo-avatar@2x.jpg")]:
    im.resize((size, size), Image.Resampling.LANCZOS).save(
        root / "assets" / name, quality=88, optimize=True
    )
print("Updated photo-avatar.jpg and photo-avatar@2x.jpg")
PY
