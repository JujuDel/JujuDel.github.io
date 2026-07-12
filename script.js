/* ============================================================
   Julien Delclos — portfolio script
   Everything configurable lives in the constants below.
   ============================================================ */

/* Bump this when you publish a change — it's shown in the footer. */
const LAST_UPDATED = "July 2026";

/* ------------------------------------------------------------
   HERO SCENES — the live panoptic carousel.
   Each scene needs, in assets/scenes/:
     photo : the raw photo (jpg)
     pan   : the panoptic overlay (transparent PNG, same aspect)
     inst  : the instances overlay (transparent PNG, same aspect)
   w/h    : the photo's native pixel size — the frame keeps this
            aspect ratio and morphs between scenes.
   boxes  : the instance bounding boxes, in PERCENT of the image
            (x, y, w, h from top-left), with the label text and
            the color of that instance's mask.
   To add a scene: drop the 3 files, add an entry here. Boxes are
   optional (an empty [] just shows the masks).
   ------------------------------------------------------------ */
const SCENES = [
 { name:"WHARF", w:960, h:1707,
   photo:"assets/scenes/wharf_raw.jpg", pan:"assets/scenes/wharf_pan.png", inst:"assets/scenes/wharf_inst.png",
   boxes:[{cls:"BUOY",color:"#ffcc33",x:88.54,y:50.67,w:6.35,h:4.92},
          {cls:"BACKPACK",color:"#ff814a",x:38.85,y:48.21,w:23.65,h:24.49},
          {cls:"BAG",color:"#f78000",x:75.0,y:59.17,w:4.58,h:5.04},
          {cls:"PERSON",color:"#fa3253",x:39.27,y:46.92,w:10.73,h:19.74},
          {cls:"PERSON",color:"#ff4370",x:65.0,y:49.91,w:11.46,h:19.51},
          {cls:"PERSON",color:"#af233a",x:43.33,y:41.3,w:30.31,h:55.54}]},
 { name:"BAY", w:1707, h:960,
   photo:"assets/scenes/bay_raw.jpg", pan:"assets/scenes/bay_pan.png", inst:"assets/scenes/bay_inst.png",
   boxes:[{cls:"BACKPACK",color:"#ff6037",x:0.0,y:75.1,w:38.49,h:24.9},
          {cls:"PERSON",color:"#fa3253",x:4.04,y:20.73,w:38.66,h:79.27}]},
 { name:"BEACH", w:1280, h:960,
   photo:"assets/scenes/beach_raw.jpg", pan:"assets/scenes/beach_pan.png", inst:"assets/scenes/beach_inst.png",
   boxes:[{cls:"BIRD",color:"#fafa37",x:67.19,y:60.42,w:19.38,h:32.5},
          {cls:"BIRD",color:"#ffff4a",x:85.78,y:23.12,w:3.2,h:3.33},
          {cls:"BIRD",color:"#afaf26",x:21.48,y:6.15,w:4.84,h:4.06},
          {cls:"PHONE",color:"#aaf0d1",x:19.61,y:38.75,w:8.12,h:5.83},
          {cls:"BAG",color:"#f78000",x:8.52,y:74.06,w:16.56,h:25.94},
          {cls:"PERSON",color:"#fa3253",x:6.02,y:19.38,w:30.31,h:52.08},
          {cls:"PERSON",color:"#ff4370",x:0.0,y:0.0,w:71.41,h:100.0}]},
 { name:"STREET", w:1204, h:1600,
   photo:"assets/scenes/street_raw.jpg", pan:"assets/scenes/street_pan.png", inst:"assets/scenes/street_inst.png",
   boxes:[{cls:"SIGN",color:"#c8ff00",x:0.0,y:30.0,w:4.49,h:4.5},
          {cls:"BACKPACK",color:"#ff6037",x:63.46,y:23.94,w:18.44,h:25.94},
          {cls:"BAG",color:"#f78000",x:8.8,y:50.19,w:6.81,h:11.5},
          {cls:"BAG",color:"#ffac00",x:0.0,y:85.12,w:10.38,h:14.88},
          {cls:"CAR",color:"#00e5ff",x:0.0,y:33.81,w:10.38,h:5.19},
          {cls:"PERSON",color:"#fa3253",x:79.32,y:19.56,w:17.77,h:51.69},
          {cls:"PERSON",color:"#ff4370",x:48.67,y:13.94,w:24.42,h:74.62},
          {cls:"PERSON",color:"#af233a",x:24.5,y:21.81,w:25.17,h:50.38},
          {cls:"PERSON",color:"#ff5084",x:8.97,y:22.12,w:30.07,h:60.44},
          {cls:"TRUCK",color:"#ff2e9a",x:70.6,y:3.94,w:29.4,h:27.88}]}
];

/* How long each phase stays on screen, in ms: INPUT, PANOPTIC, INSTANCES. */
const DUR = [1500, 3400, 3200];
/* What the top-right chip reads in each phase. */
const MODES = ["INPUT", "PANOPTIC SEG", "INSTANCES"];

/* ---------- footer stamps ---------- */
document.getElementById("last-updated").textContent = "last_updated: " + LAST_UPDATED;
document.getElementById("year").textContent = new Date().getFullYear();

/* ============================================================
   HERO — the carousel: INPUT → PANOPTIC SEG (scanline sweep) →
   INSTANCES (boxes pop in one by one) → next scene. The frame
   morphs to each scene's native aspect ratio.
   ============================================================ */
const stage = document.querySelector(".stage");
const frame = document.getElementById("frame");
const scan  = document.getElementById("scan");
const modeChip  = document.getElementById("mode-chip");
const stateChip = document.getElementById("state-chip");
const dotsBox   = document.getElementById("dots");
const scenesBox = document.getElementById("scenes");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* build the DOM for each scene: photo + overlay + its boxes */
const els = SCENES.map((s, i) => {
  const d = document.createElement("div");
  d.className = "scene";
  const bxs = s.boxes.map(b => {
    const inside = b.y < 5 ? "in" : "out";   // label goes inside the box when it touches the top edge
    return `<div class="bx" style="left:${b.x}%;top:${b.y}%;width:${b.w}%;height:${b.h}%;border-color:${b.color}">` +
           `<span class="lb ${inside}" style="background:${b.color}">${b.cls}</span></div>`;
  }).join("");
  d.innerHTML = `<img src="${s.photo}" alt="Scene: ${s.name.toLowerCase()}"><img class="ovl" alt=""><div class="bxs">${bxs}</div>`;
  scenesBox.appendChild(d);
  const dot = document.createElement("span");
  dot.setAttribute("aria-label", "Scene: " + s.name.toLowerCase());
  dot.addEventListener("click", () => { stop(); go(i, reducedMotion ? 2 : 0); if (!reducedMotion) loop(); });
  dotsBox.appendChild(dot);
  return d;
});

/* size the frame to a scene's aspect ratio, within the stage */
function fit(s) {
  const r = stage.getBoundingClientRect();
  const MW = Math.min(560, r.width * 0.94);
  const MH = Math.min(660, window.innerHeight * 0.74);
  const k = Math.min(MW / s.w, MH / s.h);
  return [Math.round(s.w * k), Math.round(s.h * k)];
}

let si = 0, phase = 0, timer = null;

function boxesOff(i) { els[i].querySelectorAll(".bx").forEach(b => b.classList.remove("on")); }
function boxesOn(i) {
  els[i].querySelectorAll(".bx").forEach((b, k) => {
    b.style.transitionDelay = (0.25 + k * 0.12) + "s";   // the one-by-one pop
    b.classList.add("on");
  });
}

/* panoptic reveal: the overlay is clipped in behind a bright scanline */
function sweepIn(ovl, src) {
  ovl.src = src;
  ovl.style.transition = "none"; ovl.style.clipPath = "inset(0 100% 0 0)"; ovl.style.opacity = "1";
  void ovl.offsetWidth;
  ovl.style.transition = "clip-path 1.1s cubic-bezier(.65,.05,.35,.95)";
  ovl.style.clipPath = "inset(0 0% 0 0)";
  scan.style.transition = "none"; scan.style.left = "0"; scan.style.opacity = "1";
  void scan.offsetWidth;
  scan.style.transition = "left 1.1s cubic-bezier(.65,.05,.35,.95)";
  scan.style.left = "calc(100% - 2px)";
  setTimeout(() => scan.style.opacity = "0", 1150);
}
/* instances arrive as a quick crossfade of the overlay */
function crossOvl(ovl, src) {
  ovl.style.transition = "opacity .25s linear"; ovl.style.opacity = "0";
  setTimeout(() => { ovl.src = src; ovl.style.clipPath = "inset(0 0 0 0)"; ovl.style.opacity = "1"; }, 260);
}

function go(i, ph) {
  const s = SCENES[i];
  if (i !== si || ph === 0) {
    const [w, h] = fit(s);
    frame.style.width = w + "px"; frame.style.height = h + "px";
    els.forEach((e, k) => e.classList.toggle("on", k === i));
    if (i !== si) { const o = els[si].querySelector(".ovl"); o.style.transition = "none"; o.style.opacity = "0"; boxesOff(si); }
  }
  si = i; phase = ph;
  [...dotsBox.children].forEach((d, k) => d.classList.toggle("on", k === i));
  modeChip.textContent = MODES[ph];
  stateChip.textContent = s.name;
  const ovl = els[i].querySelector(".ovl");
  if (ph === 0)      { ovl.style.transition = "opacity .3s"; ovl.style.opacity = "0"; boxesOff(i); }
  else if (ph === 1) { sweepIn(ovl, s.pan);  boxesOff(i); }
  else               { crossOvl(ovl, s.inst); boxesOn(i); }
}

function step() {
  let ph = phase + 1, i = si;
  if (ph > 2) { ph = 0; i = (si + 1) % SCENES.length; }
  go(i, ph);
}
function loop() { timer = setTimeout(() => { step(); loop(); }, DUR[phase]); }
function stop() { clearTimeout(timer); }

/* start: reduced-motion visitors get a static instances view instead */
{
  const [w0, h0] = fit(SCENES[0]);
  frame.style.width = w0 + "px"; frame.style.height = h0 + "px";
  if (reducedMotion) { go(0, 2); }
  else { go(0, 0); loop(); }
}
window.addEventListener("resize", () => {
  const [w, h] = fit(SCENES[si]);
  frame.style.width = w + "px"; frame.style.height = h + "px";
});
/* preload everything after the page is up, so transitions are instant */
window.addEventListener("load", () => {
  SCENES.forEach(s => { new Image().src = s.photo; new Image().src = s.pan; new Image().src = s.inst; });
});

/* ============================================================
   HOBBIES — hover "detections": the confidence re-computes a
   little differently every time, because neural nets.
   ============================================================ */
document.querySelectorAll(".hcard[data-det]").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    const chip = card.querySelector(".det-chip");
    if (!chip) return;
    const base = parseFloat(card.dataset.conf);
    const conf = Math.min(100, base + (Math.random() * 1.4 - 0.7));
    chip.textContent = card.dataset.det + " · " + conf.toFixed(1) + "%";
  });
});
