/* ============================================================
   render.js — builds the Projects / Journey sections from
   content.js. You shouldn't need to touch this file to change
   text: edit content.js instead.
   renderContent(lang) is called by applyLang() in script.js,
   so everything re-renders when the EN/FR toggle is pressed.
   ============================================================ */

(function () {
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  /* a field can be a plain string (same in both languages) or { en, fr } */
  const tr = (v, lang) => (v && typeof v === "object" ? (v[lang] ?? v.en) : v);
  const isVideo = (src) => /\.(mp4|webm)$/i.test(src || "");
  const MOCKUP = document.body.hasAttribute("data-mockup");

  const LABELS = {
    en: { ctx: "Context", how: "Approach", res: "Results", more: "Context · Approach · Results", moreShort: "How it's built",
          visit: "Visit ↗", stack: "Stack", prev: "Previous", next: "Next", edu: "Education", imgTodo: "Visual to add",
          gh: "More on GitHub", ghLine: "Everything else, including the unfinished ones.",
          showMore: (n) => `Show ${n} earlier projects`, showLess: "Show fewer projects" },
    fr: { ctx: "Contexte", how: "Approche", res: "Résultats", more: "Contexte · Approche · Résultats", moreShort: "Comment c'est construit",
          visit: "Voir ↗", stack: "Stack", prev: "Précédent", next: "Suivant", edu: "Formation", imgTodo: "Visuel à ajouter",
          gh: "La suite sur GitHub", ghLine: "Tout le reste, y compris ce qui n'est pas fini.",
          showMore: (n) => `Voir ${n} projets plus anciens`, showLess: "Voir moins de projets" }
  };

  const flag = (c) => (c ? `<img class="flag" src="assets/flags/${esc(c)}.svg" alt="${esc(c.toUpperCase())}" width="16" height="12">` : "");
  /* videos start paused and without a src; the observer below plays them
     only while they're on screen */
  const media = (src, alt, poster) => isVideo(src)
    ? `<video muted loop playsinline preload="none" data-src="${esc(src)}"${poster ? ` poster="${esc(poster)}"` : ""} aria-label="${esc(alt)}"></video>`
    : `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy">`;

  function card(p, lang) {
    const L = LABELS[lang];
    const badge = p.badge ? `<span class="pbadge ${p.badgeStyle || ""}">${esc(tr(p.badge, lang))}</span>` : "";
    const figs = (p.figs || []).map((f) => `<span class="fig">${esc(tr(f, lang))}</span>`).join("");
    const tech = (p.tech || []).map((t) => `<span class="tk">${esc(t)}</span>`).join("");
    const link = p.link ? `<a class="plink" href="${esc(p.link)}" target="_blank" rel="noopener">${p.linkLabel ? esc(tr(p.linkLabel, lang)) : L.visit}</a>` : "";
    const title = tr(p.title, lang);

    let top = "";
    if (p.image) {
      const c = p.credit
        ? (p.credit.url
            ? `<a class="pcredit" href="${esc(p.credit.url)}" target="_blank" rel="noopener">${esc(p.credit.text)}</a>`
            : `<span class="pcredit">${esc(p.credit.text)}</span>`)
        : "";
      top = `<div class="pmedia">${media(p.image, title, p.poster)}${c}</div>`;
    }
    else if (MOCKUP && p.imageHint) top = `<div class="pmedia todo"><span>${L.imgTodo}</span><em>${esc(p.imageHint)}</em></div>`;

    let details = "";
    const d = p.details;
    if (d) {
      const full = d.context && d.results;
      const block = (h, t) => (t ? `<h4>${h}</h4><p>${esc(tr(t, lang))}</p>` : "");
      const res = d.results ? `<h4>${L.res}</h4><ul>${d.results.map((r) => `<li>${esc(tr(r, lang))}</li>`).join("")}</ul>` : "";
      const stack = tech ? `<h4>${L.stack}</h4><div class="tks">${tech}</div>` : "";
      details = `<details class="pmore"><summary>${full ? L.more : L.moreShort}</summary>
        <div class="pdet">${block(L.ctx, d.context)}${block(L.how, d.approach)}${res}${stack}</div></details>`;
    }

    const when = [p.when, p.where].filter(Boolean).map(esc).join(" · ");
    const wide = p.wide;
    return `<article class="pcard${wide ? " wide" : ""}${p.more ? " is-more" : ""}${top ? " has-media" : ""}" id="p-${esc(p.id)}" data-det="${esc(p.det)}" data-conf="${p.conf}">
      <span class="det"><i></i><i></i><i></i><i></i><b class="det-chip">${esc(p.det)} · ${Number(p.conf).toFixed(1)}%</b></span>
      ${top}
      <div class="pbody">
        <div class="phead"><span class="porg">${esc(tr(p.org, lang))}</span>${badge}</div>
        <div class="pwhen">${flag(p.country)}<span>${when}</span></div>
        <h3>${esc(title)}</h3>
        <p class="pdesc">${esc(tr(p.desc, lang))}</p>
        ${figs ? `<div class="figs">${figs}</div>` : ""}
        ${details}
        ${d ? (link ? `<div class="tks">${link}</div>` : "") : `<div class="tks">${tech}${link}</div>`}
      </div>
    </article>`;
  }

  function older(o, lang) {
    const thumb = o.thumb ? media(o.thumb, o.name, isVideo(o.thumb) ? o.thumb.replace(/\.(mp4|webm)$/i, ".jpg") : null) : `<span class="glyph">${esc(o.name.split(/[\s-]/)[0].slice(0, 2))}</span>`;
    return `<a class="otile" href="${esc(o.url)}" target="_blank" rel="noopener">
      <span class="othumb">${thumb}</span>
      <span class="oyear">${esc(o.year)}</span>
      <b>${esc(o.name)} <i>↗</i></b>
      <span class="oline">${esc(tr(o.line, lang))}</span>
    </a>`;
  }
  const moreTile = (lang) => `<a class="otile more" href="https://github.com/JujuDel?tab=repositories" target="_blank" rel="noopener">
      <span class="othumb"><span class="glyph">…</span></span>
      <span class="oyear">github.com/JujuDel</span>
      <b>${LABELS[lang].gh} <i>↗</i></b>
      <span class="oline">${LABELS[lang].ghLine}</span>
    </a>`;

  /* timeline item: flag + company + years, jumping to its project card */
  function stop(j, lang) {
    const years = tr(j.when, lang).split(" · ")[0];
    const inner = `<span class="tl-dot"></span><span class="tl-when">${flag(j.country)}${esc(years)}</span>
      <b>${esc(j.org)}</b><span class="tl-role">${esc(tr(j.role, lang))}</span>`;
    return j.card
      ? `<a class="tl-item" href="#p-${esc(j.card)}" data-card="${esc(j.card)}">${inner}</a>`
      : `<div class="tl-item">${inner}</div>`;
  }
  const edu = (e, lang) => `<span class="edu-item"><i>${esc(tr(e.when, lang))}</i><b>${esc(e.org)}</b><span>${esc(tr(e.role, lang))}</span></span>`;

  let expanded = false;
  function applyMore(lang) {
    const grid = document.getElementById("work-grid"), btn = document.getElementById("work-more");
    if (!grid || !btn) return;
    const n = PROJECTS_WORK.filter((p) => p.more).length;
    grid.classList.toggle("expanded", expanded);
    btn.hidden = n === 0;
    btn.textContent = expanded ? LABELS[lang].showLess : LABELS[lang].showMore(n);
    btn.setAttribute("aria-expanded", String(expanded));
  }
  let LANG_NOW = "en";

  window.renderContent = function (lang) {
    const put = (id, htmlStr) => { const el = document.getElementById(id); if (el) el.innerHTML = htmlStr; };
    put("work-grid", PROJECTS_WORK.map((p) => card(p, lang)).join(""));
    put("side-grid", PROJECTS_SIDE.map((p) => card(p, lang)).join(""));
    put("older-track", OLDER_PROJECTS.map((o) => older(o, lang)).join("") + moreTile(lang));
    put("journey", JOURNEY.map((j) => stop(j, lang)).join(""));
    put("edu", `<span class="edu-lbl">${LABELS[lang].edu}</span>` + EDUCATION.map((e) => edu(e, lang)).join(""));
    LANG_NOW = lang;
    applyMore(lang);
    const prev = document.getElementById("older-prev"), next = document.getElementById("older-next");
    if (prev) prev.setAttribute("aria-label", LABELS[lang].prev);
    if (next) next.setAttribute("aria-label", LABELS[lang].next);
    watchVideos();
  };

  /* play videos only while visible (saves CPU + bandwidth) */
  let io = null;
  function watchVideos() {
    const vids = document.querySelectorAll("video[data-src]");
    const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!("IntersectionObserver" in window)) { vids.forEach((v) => { v.src = v.dataset.src; }); return; }
    if (!io) io = new IntersectionObserver((entries) => entries.forEach((e) => {
      const v = e.target;
      if (e.isIntersecting) { if (!v.src) v.src = v.dataset.src; if (!reduce) v.play().catch(() => {}); }
      else if (!v.paused) v.pause();
    }), { rootMargin: "100px" });
    vids.forEach((v) => io.observe(v));
  }

  /* hover detections: same jitter as the hobby cards, via delegation so it
     survives re-renders */
  document.addEventListener("mouseover", (e) => {
    const c = e.target.closest && e.target.closest(".pcard[data-det]");
    if (!c || c.contains(e.relatedTarget)) return;
    const chip = c.querySelector(".det-chip");
    const conf = Math.min(100, parseFloat(c.dataset.conf) + (Math.random() * 1.4 - 0.7));
    chip.textContent = c.dataset.det + " · " + conf.toFixed(1) + "%";
  });

  /* "show more" button, and timeline links that may point at a hidden card */
  document.addEventListener("click", (e) => {
    const more = e.target.closest && e.target.closest("#work-more");
    if (more) { expanded = !expanded; applyMore(LANG_NOW); return; }
    const stopEl = e.target.closest && e.target.closest(".tl-item[data-card]");
    if (!stopEl) return;
    const card = document.getElementById("p-" + stopEl.dataset.card);
    if (!card) return;
    e.preventDefault();
    if (card.classList.contains("is-more") && !expanded) { expanded = true; applyMore(LANG_NOW); }
    card.scrollIntoView({ behavior: "smooth", block: "center" });
    card.classList.remove("flash"); void card.offsetWidth; card.classList.add("flash");
  });

  /* older-projects strip: arrow buttons scroll by one tile */
  document.addEventListener("click", (e) => {
    const b = e.target.closest && e.target.closest("#older-prev, #older-next");
    if (!b) return;
    const track = document.getElementById("older-track");
    const tile = track.querySelector(".otile");
    const step = tile ? tile.getBoundingClientRect().width + 14 : 260;
    track.scrollBy({ left: b.id === "older-next" ? step : -step, behavior: "smooth" });
  });

  /* sticky mini-nav: appears once the hero header has scrolled away */
  const top = document.querySelector(".hero-top"), bar = document.getElementById("stickynav");
  if (top && bar && "IntersectionObserver" in window) {
    new IntersectionObserver(([en]) => bar.classList.toggle("on", !en.isIntersecting)).observe(top);
  }
})();
