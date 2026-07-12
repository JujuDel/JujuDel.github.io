# jujudel.github.io — portfolio site

**Live at https://jujudel.github.io** — pushing to `main` redeploys it
within a minute or two.

A single-page portfolio. Plain HTML/CSS/JS — no build step, no framework,
no npm install. Open `index.html` in a browser and it works; edit any file
and refresh to see the change.

The design is "champ / contre-champ": a light **human half** (hobbies,
languages) and a dark **machine half** (skills), with a live panoptic
carousel as the hero. Each scene went through my own annotation
pipeline: auto pre-annotation (Mask R-CNN for the things, MobileSAM for
the stuff), hand correction in CVAT, then a resolve step that composes
the final panoptic masks and instance boxes.

## Files

```
index.html        all the content — structure and text live here
style.css         all the styling, organized top-to-bottom to match index.html
script.js         hero carousel + the config constants (see below)
assets/scenes/    per scene: <name>_raw.jpg (photo) + <name>_pan.png and
                  <name>_inst.png (transparent overlays drawn over the photo)
favicon.svg       the tab icon (a tiny detection box)
.gitignore        keeps local working files (annotations, notes) unpublished
```

`index.html` has HTML comments (`<!-- ===== ... ===== -->`) marking every
section — HERO, HUMAN HALF, MACHINE HALF, WHERE THE TWO HALVES HAVE WORKED,
CONTACT — so you can jump straight to what you want with a text search.

## Common edits

**Update the "last updated" stamp** — top of `script.js`:
```js
const LAST_UPDATED = "July 2026";
```
Bump it whenever you publish. (The © year updates itself.)

**Change any text** — it's plain HTML in `index.html`, edit directly.

**Add / remove a hero scene** — two steps:
1. Drop the THREE images into `assets/scenes/`: the raw photo (jpg) and
   the two transparent overlays (`<name>_pan.png`, `<name>_inst.png`,
   same aspect ratio as the photo).
2. Add an entry to the `SCENES` array at the top of `script.js`: the
   photo's native `w`/`h` (the frame morphs to that aspect ratio) and the
   `boxes` list — one line per instance, in PERCENT of the image
   (`x, y, w, h` from the top-left) with its label text and mask color.
   `boxes: []` is fine too (masks only, no boxes).

**Add a hobby** — in the HUMAN HALF section, copy an existing
`<div class="hcard">…</div>` block. The grid handles any count; the wide
coding card always spans the full row.

**Profile links in the hobby cards** — the chess card links to Chess.com
(LuckyJujuD) and Lichess (luckyjuju); the coding card links CodinGame,
HackerRank and LeetCode. LeetGPU, Advent of Code and LeekWars are plain
`<span class="chip">` — to link one, swap the span for
`<a class="chip" href="…" target="_blank" rel="noopener">…</a>`.
Hover styling for linked chips is already in the CSS.

**Edit skills** — MACHINE HALF section: four blocks, each a
`<div class="mcard">` with an inline SVG illustration on top and
`<div class="mrow">` lines below. LEARNING is the wide offline card; the
three below it (INPUT SENSOR → EMBEDDED INFERENCE → POST-PROCESSING) are
the runtime pipeline, connected by the animated `.flow` dividers. The
deliberate rule: about three rows per block, no levels, no percentages.
Resist the urge.

**Add a role** — WHERE THE TWO HALVES HAVE WORKED section, copy a
`<div class="job">…</div>` line. Keep it to one line; the details belong on
LinkedIn.

**Change hero behaviour** — top of `script.js`: `DUR` holds the three
phase durations in ms (INPUT, PANOPTIC, INSTANCES) and `MODES` the labels
the top-right chip cycles through. One scene = INPUT → PANOPTIC SEG
(scanline sweep) → INSTANCES (boxes pop in one by one, 0.12 s apart — the
stagger lives in `boxesOn()` ), then the next scene fades in and the
frame morphs to its aspect ratio. The dots switch scenes. Visitors with
`prefers-reduced-motion` get a static instances view instead of the loop.

**Change a hobby's detection label** — each `.hcard` has `data-det` (the
class name shown on hover) and `data-conf` (the base confidence; script.js
jitters it a little on every hover). The bracket overlay is the
`<span class="det">` inside the card — copy it along when adding a card.
Each hobby's emoji animation is keyed on `data-det` in `style.css`
(look for `det-tilt`, `det-climb`, …).

**Tweak the illustrations** — each machine block has its own small inline
`<svg class="illu">` in `index.html` (network + loss curve, camera, SoC,
output screen); all their animation lives in `style.css` under the
`MACHINE ILLUSTRATIONS` comment (one shared 2.4 s rhythm). They sit
dimmed by default and light up when you hover their card
(`.mcard:hover .illu`).

**Colors / fonts** — all defined once as CSS variables at the top of
`style.css`, with comments. The two-palette split (paper+green vs
navy+cyan) is the identity of the design — change values, keep the idea.

## Previewing locally

Open `index.html` in a browser, or for an exact-like-production preview:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## Updating the live site

This repo IS the site. Edit, preview locally, then:

```
git add .
git commit -m "…"
git push
```

GitHub Pages redeploys `main` automatically. Don't forget to bump
`LAST_UPDATED` at the top of `script.js` — the footer shows it.

A custom domain can be added later in **Settings → Pages → Custom
domain** without touching the code.
