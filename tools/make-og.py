#!/usr/bin/env python3
"""
Regenerate assets/og-cover.jpg — the link-preview image.

It's the BAY scene cut down the middle: raw photo on the left, panoptic
masks on the right, with a lit scanline on the seam (the same move the hero
carousel makes, frozen into one frame). The split sits just past the face,
so a preview shows both who you are and what you do.

Run from the repo root:  python3 tools/make-og.py
Needs Pillow + numpy:    pip install pillow numpy
"""
from PIL import Image, ImageDraw, ImageFilter
import numpy as np

SCENE = "bay"          # which scene to use (needs <scene>_raw.jpg + <scene>_pan.png)
SPLIT = 0.34           # where the seam falls, as a fraction of the width
OUT_W, OUT_H = 1200, 630   # the size every social crawler expects

raw = Image.open(f"assets/scenes/{SCENE}_raw.jpg").convert("RGB")
pan = Image.open(f"assets/scenes/{SCENE}_pan.png").convert("RGBA").resize(raw.size, Image.LANCZOS)

# crop to the 1200x630 aspect, centred vertically
w, h = raw.size
new_h = int(w / (OUT_W / OUT_H))
box = (0, (h - new_h) // 2, w, (h - new_h) // 2 + new_h)
raw_c = raw.crop(box).resize((OUT_W, OUT_H), Image.LANCZOS)
pan_c = pan.crop(box).resize((OUT_W, OUT_H), Image.LANCZOS)

# masks composited over the photo, then pasted onto the right half only
blended = raw_c.copy()
blended.paste(pan_c, (0, 0), pan_c)

x = int(OUT_W * SPLIT)
out = raw_c.copy()
out.paste(blended.crop((x, 0, OUT_W, OUT_H)), (x, 0))

# additive cyan glow on the seam, then a crisp white line on top
glow = Image.new("RGB", (OUT_W, OUT_H), (0, 0, 0))
ImageDraw.Draw(glow).rectangle([x - 3, 0, x + 3, OUT_H], fill=(108, 196, 232))
glow = glow.filter(ImageFilter.GaussianBlur(14))
out = Image.fromarray(
    np.clip(np.asarray(out).astype(np.int16) + np.asarray(glow).astype(np.int16), 0, 255).astype("uint8")
)
ImageDraw.Draw(out).line([(x, 0), (x, OUT_H)], fill=(255, 255, 255), width=2)

out.save("assets/og-cover.jpg", quality=88, optimize=True)
print(f"wrote assets/og-cover.jpg ({out.size[0]}x{out.size[1]})")
