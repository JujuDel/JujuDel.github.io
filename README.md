# jujudel.github.io — portfolio site

**Live at https://juliendelclos.com** — pushing to `main` redeploys it
within a minute or two.

A single-page portfolio. Plain HTML/CSS/JS — no build step, no framework,
no npm install. Open `index.html` in a browser and it works; edit any file
and refresh to see the change.

The design is "champ / contre-champ": a light **human half** (hobbies,
languages) and a dark **machine half** (skills), with a live panoptic
carousel as the hero. Its masks and boxes are made with
[panoptic-prelabel](https://github.com/JujuDel/panoptic-prelabel): its
`export-web` step writes the `<name>_raw.jpg` / `_pan.png` / `_inst.png`
files in `assets/scenes/` and the boxes for the `SCENES` array in
`script.js`.

## Files

```
index.html        all the content — structure and text live here
style.css         all the styling, organized top-to-bottom to match index.html
script.js         hero carousel + the config constants (see below)
assets/scenes/    per scene: <name>_raw.jpg (photo) + <name>_pan.png and
                  <name>_inst.png (transparent overlays drawn over the photo)
assets/og-cover.jpg  the link-preview image (raw | panoptic split)
tools/make-og.py  regenerates og-cover.jpg from a scene
favicon.svg       the tab icon (a tiny detection box)
CNAME             the custom domain (juliendelclos.com)
robots.txt        allows everything, points at the sitemap
sitemap.xml       one URL — bump <lastmod> when you publish
.gitignore        keeps local working files (annotations, notes) unpublished
```

`index.html` has HTML comments (`<!-- ===== ... ===== -->`) marking every
section — HERO, HUMAN HALF, MACHINE HALF, WHERE THE TWO HALVES HAVE WORKED,
CONTACT — so you can jump straight to what you want with a text search.

## Common edits

**Update the "last updated" stamp** — it's per-language, inside the `I18N`
dict at the top of `script.js`: the `"lastUpdated"` key in both `en` and
`fr`. Bump both whenever you publish, and the `<lastmod>` in `sitemap.xml`
while you're there. (The © year updates itself.)

**Change any text** — every visible string lives in the `I18N` dict at the
top of `script.js`, keyed by the `data-i18n` attribute on the element. The
text sitting in `index.html` is only what shows before the script runs, so
**change both or the HTML copy silently becomes dead text.**
There are three attribute flavours: `data-i18n` (sets textContent),
`data-i18n-html` (innerHTML, for strings containing `<em>`/`<span>`), and
`data-i18n-title` (the `title=""` tooltip, for elements whose visible text
is the same in both languages).

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

**Profile links in the hobby cards** — the coding card links ShowTracker,
CodinGame, HackerRank and LeetCode. LeetGPU and Advent of Code are plain
`<span class="chip">` — to link one, swap the span for
`<a class="chip" href="…" target="_blank" rel="noopener">…</a>`.
Hover styling for linked chips is already in the CSS. `class="chip ship"`
is the filled green variant, for something you built rather than a
practice platform.

**The live chess ratings** — the chess card pulls real numbers from
`api.chess.com` and `lichess.org` (both public, no key, both CORS-clean
from this origin — verified from the live domain). Four rules the code
sticks to, in `script.js` under `LIVE RATINGS`:

- The numbers written in `index.html` are a **fallback**, and are only
  overwritten on a successful fetch. If either API is down, blocked or
  slow, that card renders exactly as served — it can never look broken.
  Refresh those numbers by hand once in a while so the floor stays recent.
- Nothing is requested until the card scrolls into view.
- Results are cached in `localStorage` for 6 h (`RATING_TTL`).
- It picks the time control by a fixed preference order (`PERF_ORDER`,
  longest first: rapid → blitz → bullet → classical → daily) and takes the
  first one with at least `MIN_GAMES` (20) behind it. Not the most-played
  one: that would show Chess.com blitz off 650 games and hide a rapid
  rating 200 points higher. The games floor is there because Lichess
  reports every unplayed pool as a provisional 1500.

The pulsing green dot (`.is-live`) is added only when a fetch actually
won, so a fallback number never claims to be live. To change accounts,
edit the two URLs in `fetchChessCom()` / `fetchLichess()` **and** the
`href`s on the two `.rating` links.

**The availability badge** — the `<span class="visa">` at the top of the
CONTACT section; text lives under the `"contact.visa"` key in both `I18N`
dicts. Deliberately factual (where, what timezone) rather than a claim
about work rights or job hunting — change it to whatever is true.

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
phase durations in ms (INPUT, PANOPTIC, INSTANCES); the labels the
top-right chip cycles through are the `"hero.modes"` array inside each
language's `I18N` dict. One scene = INPUT → PANOPTIC SEG
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

GitHub Pages redeploys `main` automatically. Don't forget to bump the
`"lastUpdated"` key in **both** `I18N` dicts (the footer shows it) and
`<lastmod>` in `sitemap.xml`.

The custom domain lives in the `CNAME` file and in **Settings → Pages →
Custom domain**. Keep "Enforce HTTPS" ticked.

## Link previews

`assets/og-cover.jpg` is what LinkedIn, Slack and X show when the URL is
pasted: the BAY scene split down the middle, raw photo on the left,
panoptic masks on the right, seam lit like the hero's scanline. Regenerate
it after changing scenes with:

```
python3 tools/make-og.py     # needs pillow + numpy
```

Edit `SCENE` / `SPLIT` at the top of that script to recut it. The split
defaults to 0.34, which lands just past the face. After changing the
image, re-scrape the URL in LinkedIn's Post Inspector so the old preview
gets flushed from their cache.

## Analytics

`index.html` loads [GoatCounter](https://www.goatcounter.com/) — no
cookies, no personal data, nothing to consent to. **It needs a free
account with the site code `juliendelclos`**; until that exists the
script 404s silently and the page is unaffected. Delete the last
`<script>` in `index.html` to opt out entirely.
