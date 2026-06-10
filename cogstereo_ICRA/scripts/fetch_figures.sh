#!/usr/bin/env bash
# Fetch figures from arXiv LaTeX source for CogStereo project page.
set -euo pipefail

ARXIV_ID="${1:-2510.22119}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ASSETS="$ROOT/docs/assets/images"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

echo "Downloading arXiv source ${ARXIV_ID}..."
curl -sL "https://arxiv.org/e-print/${ARXIV_ID}" -o "$TMP/source.tar.gz"
mkdir -p "$TMP/src" "$ASSETS"
tar -xzf "$TMP/source.tar.gz" -C "$TMP/src"

FIG_DIR="$TMP/src/fig1"
if [[ ! -d "$FIG_DIR" ]]; then
  echo "fig1/ not found in arXiv source." >&2
  exit 1
fi

convert_one() {
  local pdf="$1"
  local out_name="$2"
  local src_pdf="$FIG_DIR/$pdf"
  if [[ ! -f "$src_pdf" ]]; then
    echo "Skip missing: $pdf" >&2
    return 0
  fi
  echo "Converting $pdf -> ${out_name}.png"
  pdftoppm -png -r 220 -singlefile "$src_pdf" "$TMP/$out_name" 2>/dev/null \
    || pdftoppm -png -r 220 "$src_pdf" "$TMP/$out_name"
  local png_path
  png_path="$(ls "$TMP/${out_name}"*.png | head -1)"
  if command -v pngquant >/dev/null 2>&1; then
    pngquant --quality=75-95 --speed 1 --force --output "$ASSETS/${out_name}.png" "$png_path"
  else
    cp "$png_path" "$ASSETS/${out_name}.png"
  fi
}

convert_one motivation_cropped.pdf teaser_motivation
convert_one overview_framwork_new2_cropped.pdf framework_overview
convert_one vis_error_cropped.pdf uncertainty_ablation
convert_one vis_euroc.pdf euroc_zero_shot
convert_one vis_euroc_v2.pdf multi_benchmark
convert_one vis_zero_v2.pdf zero_shot_comparison

echo "Generating WebP variants..."
python3 "$ROOT/scripts/optimize_images.py" "$ASSETS"

echo "Done. Figures written to $ASSETS"
