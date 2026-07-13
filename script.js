/* ============================================================
   Julien Delclos — portfolio script
   Everything configurable lives in the constants below.
   ============================================================ */

/* ------------------------------------------------------------
   i18n — EN/FR toggle (button in the header) + browser-language
   auto-detect on first visit (no server, so navigator.language
   is the only signal we get for "visiting from France"). One
   static page, content swapped client-side:
     data-i18n="key"      -> el.textContent = dict[key]
     data-i18n-html="key" -> el.innerHTML   = dict[key]  (strings
                              with nested markup, e.g. <em>)
   To add a language: add a dict below + tag elements in
   index.html. Bump "lastUpdated" per language when you publish.
   ------------------------------------------------------------ */
const I18N = {
  en: {
    "nav.human": "Human",
    "nav.machine": "Machine",
    "nav.contact": "Contact",
    "hero.title": `I see the world twice.<span class="m">// once through a sensor, once through a network</span>`,
    "hero.sub1": "Software · Computer Vision · Deep Learning · 3D Vision | ex-Stereolabs LeadSW.",
    "hero.sub2": "(Yep, that's me on the images!)",
    "hero.scroll": "SCROLL ↓",
    "hero.modes": ["INPUT", "PANOPTIC SEG", "INSTANCES"],
    "meta.title": "Julien Delclos — Lead Software & Senior Computer Vision Engineer",
    "meta.desc": "Julien Delclos - Software · Computer Vision · Deep Learning · 3D Vision | ex-Stereolabs LeadSW. I see the world twice: once through a sensor, once through a network. C++, CUDA, PyTorch, TensorRT.",
    "og.title": "Julien Delclos — Computer Vision Engineer",
    "og.desc": "I see the world twice — once through a sensor, once through a network.",
    "human.secno": "01 — THE HUMAN HALF",
    "human.h2": `Made of <em>hobbies</em>, mostly.`,
    "human.intro": "French, exported to Italy, Germany, Sweden, and now Australia. The rest of the time, you'll find me here:",
    "human.chess.h3": "Chess",
    "human.chess.p": "Rating proportional to ego. Currently both are recalibrating.",
    "human.boulder.h3": "Bouldering",
    "human.boulder.p": "Climb as high as the technical debt. Falls gracefully.",
    "human.sky.h3": "Skydiving",
    "human.sky.p": "Debugging multi-threaded code is a lot less scary once you've jumped out of a plane.",
    "human.volley.h3": "Volleyball",
    "human.volley.p": "Middle blocker. Loud at the net, quieter in code reviews.",
    "human.code.h3": "Code, but for fun",
    "human.code.p": "Apparently eight hours a day isn't enough.",
    "human.langline": `Speaks <span>French</span>, <span>English</span>, some <span>German</span> (and is trying its luck in <span>Chinese</span>).`,
    "machine.secno": "02 — THE MACHINE HALF",
    "machine.intro": "I turn perception research into systems that run in real time on small hardware. That's the job, in one sentence.",
    "machine.learn.lbl": `LEARNING <em class="off">— offline</em>`,
    "machine.learn.row1": "PyTorch · Datasets & Training",
    "machine.learn.row2": "Detection & Segmentation",
    "machine.learn.row3": "Multitask & Incremental Learning",
    "machine.deploy": "Trained → Quantized → Shipped",
    "machine.input.svg": "Any Camera · Any fps",
    "machine.input.lbl": "INPUT SENSOR",
    "machine.input.row1": "Stereo & Depth",
    "machine.input.row2": "3D Geometry",
    "machine.input.row3": "SLAM / Visual Odometry",
    "machine.embed.svg": "TensorRT · Real-time",
    "machine.embed.lbl": "EMBEDDED INFERENCE",
    "machine.embed.row2": "Quantization",
    "machine.embed.row3": "Mostly Jetson (but could be elsewhere)",
    "machine.post.svg": "Boxes · Masks · 3D",
    "machine.post.lbl": "POST-PROCESSING",
    "machine.post.row2": "Clustering & Tracking",
    "machine.post.row3": "2D → 3D Geometry",
    "meet.h2": `Where the two halves <em>have worked</em>`,
    "meet.p": "The short version. The long one (role by role, with the war stories) lives on LinkedIn.",
    "meet.cvbtn": "Full history on LinkedIn ↗",
    "meet.job1": "2026 — Now · Sydney · Australia",
    "meet.job2": "2024 — 2026 · Paris · France",
    "meet.job3": "2022 — 2024 · Göteborg · Sweden",
    "meet.job4": "2021 — 2022 · Stuttgart · Germany",
    "contact.h2": `<span class="s">Say hello</span> <span class="m">// or send a stack trace</span>`,
    "footer.australia": "Australia",
    "lastUpdated": "July 2026",
    "langBtn": "FR"
  },
  fr: {
    "nav.human": "Humain",
    "nav.machine": "Machine",
    "nav.contact": "Contact",
    "hero.title": `Je vois le monde deux fois.<span class="m">// une fois via un capteur, une fois via un réseau</span>`,
    "hero.sub1": "Logiciel · Vision par ordinateur · Deep Learning · Vision 3D | ex-Lead SW chez Stereolabs.",
    "hero.sub2": "(Oui, c'est bien moi sur les photos !)",
    "hero.scroll": "DÉFILER ↓",
    "hero.modes": ["INPUT", "SEG. PANOPTIQUE", "INSTANCES"],
    "meta.title": "Julien Delclos — Lead Software & Senior Ingénieur Computer Vision",
    "meta.desc": "Julien Delclos - Logiciel · Vision par ordinateur · Deep Learning · Vision 3D | ex-Lead SW chez Stereolabs. Je vois le monde deux fois : une fois via un capteur, une fois via un réseau. C++, CUDA, PyTorch, TensorRT.",
    "og.title": "Julien Delclos — Ingénieur Computer Vision",
    "og.desc": "Je vois le monde deux fois — une fois via un capteur, une fois via un réseau.",
    "human.secno": "01 — LA MOITIÉ HUMAINE",
    "human.h2": `Fait de <em>loisirs</em>, surtout.`,
    "human.intro": "Français, exporté en Italie, en Allemagne, en Suède, et maintenant en Australie. Le reste du temps, tu me trouveras ici :",
    "human.chess.h3": "Échecs",
    "human.chess.p": "Classement proportionnel à l'ego. Les deux sont actuellement en recalibrage.",
    "human.boulder.h3": "Escalade de bloc",
    "human.boulder.p": "Grimpe aussi haut que la dette technique. Chute avec élégance.",
    "human.sky.h3": "Parachutisme",
    "human.sky.p": "Déboguer du code multi-thread fait beaucoup moins peur une fois qu'on a sauté d'un avion.",
    "human.volley.h3": "Volley-ball",
    "human.volley.p": "Central au filet. Bruyant au filet, plus discret en code review.",
    "human.code.h3": "Coder, mais pour le plaisir",
    "human.code.p": "Apparemment huit heures par jour ne suffisent pas.",
    "human.langline": `Parle <span>français</span>, <span>anglais</span>, un peu d'<span>allemand</span> (et tente sa chance en <span>chinois</span>).`,
    "machine.secno": "02 — LA MOITIÉ MACHINE",
    "machine.intro": "Je transforme la recherche en perception en systèmes qui tournent en temps réel sur du petit matériel embarqué. C'est le métier, en une phrase.",
    "machine.learn.lbl": `APPRENTISSAGE <em class="off">— hors-ligne</em>`,
    "machine.learn.row1": "PyTorch · Données & Entraînement",
    "machine.learn.row2": "Détection & Segmentation",
    "machine.learn.row3": "Multi-tâche & Apprentissage Incrémental",
    "machine.deploy": "Entraîné → Quantifié → Déployé",
    "machine.input.svg": "N'importe quelle caméra · N'importe quel fps",
    "machine.input.lbl": "CAPTEUR D'ENTRÉE",
    "machine.input.row1": "Stéréo & Profondeur",
    "machine.input.row2": "Géométrie 3D",
    "machine.input.row3": "SLAM / Odométrie visuelle",
    "machine.embed.svg": "TensorRT · Temps réel",
    "machine.embed.lbl": "INFÉRENCE EMBARQUÉE",
    "machine.embed.row2": "Quantification",
    "machine.embed.row3": "Principalement sur Jetson (mais pourrait tourner ailleurs)",
    "machine.post.svg": "Boîtes · Masques · 3D",
    "machine.post.lbl": "POST-TRAITEMENT",
    "machine.post.row2": "Clustering & Suivi",
    "machine.post.row3": "Géométrie 2D → 3D",
    "meet.h2": `Où les deux moitiés <em>ont travaillé</em>`,
    "meet.p": "La version courte. La longue (poste par poste, avec les anecdotes) est sur LinkedIn.",
    "meet.cvbtn": "Historique complet sur LinkedIn ↗",
    "meet.job1": "2026 — Aujourd'hui · Sydney · Australie",
    "meet.job2": "2024 — 2026 · Paris · France",
    "meet.job3": "2022 — 2024 · Göteborg · Suède",
    "meet.job4": "2021 — 2022 · Stuttgart · Allemagne",
    "contact.h2": `<span class="s">Dis bonjour</span> <span class="m">// ou envoie une stack trace</span>`,
    "footer.australia": "Australie",
    "lastUpdated": "Juillet 2026",
    "langBtn": "EN"
  }
};

/* localStorage is unavailable in some privacy modes — fail open to English */
function detectLang() {
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "fr") return saved;
  } catch (e) { /* ignore */ }
  return (navigator.language || "").toLowerCase().startsWith("fr") ? "fr" : "en";
}
let LANG = detectLang();

/* swap every tagged element + the <head> meta to the given language.
   Safe to call before the hero carousel builds its DOM below (it only
   touches elements already present in the static HTML / the lang button). */
function applyLang(lang) {
  LANG = lang;
  const dict = I18N[lang];
  document.documentElement.lang = lang;

  document.getElementById("doc-title").textContent = dict["meta.title"];
  document.getElementById("meta-desc").setAttribute("content", dict["meta.desc"]);
  document.getElementById("og-title").setAttribute("content", dict["og.title"]);
  document.getElementById("og-desc").setAttribute("content", dict["og.desc"]);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) el.textContent = dict[key];
  });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.getAttribute("data-i18n-html");
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });

  const langBtn = document.getElementById("lang-toggle");
  if (langBtn) langBtn.textContent = dict["langBtn"];

  const lastUpdatedEl = document.getElementById("last-updated");
  if (lastUpdatedEl) lastUpdatedEl.textContent = "last_updated: " + dict["lastUpdated"];

  try { localStorage.setItem("lang", lang); } catch (e) { /* ignore */ }
}
applyLang(LANG);

document.getElementById("lang-toggle").addEventListener("click", () => {
  applyLang(LANG === "en" ? "fr" : "en");
  /* the hero mode chip is built by the carousel below and isn't covered
     by data-i18n — refresh it immediately instead of waiting for the
     next phase transition */
  if (typeof modeChip !== "undefined" && modeChip) modeChip.textContent = I18N[LANG]["hero.modes"][phase];
});

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
/* What the top-right chip reads in each phase — per language, see I18N above ("hero.modes"). */

/* ---------- footer stamp ---------- */
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
  modeChip.textContent = I18N[LANG]["hero.modes"][ph];
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
