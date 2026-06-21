// Gràfic de despeses per dia: columnes Alex i Yurena, apilades per categoria (en €).
import { DAYS } from "./itinerary.js";
import { CATEGORIES, PERSONES, despesesDia, sincronitza } from "./expenses.js";
import { aEuros } from "./rates.js";

const MAXPX = 150;

function dadesDia(date) {
  const out = {};
  PERSONES.forEach((p) => (out[p] = { total: 0, cats: {} }));
  despesesDia(date).forEach((e) => {
    const p = PERSONES.includes(e.who) ? e.who : PERSONES[0];
    const v = aEuros(e.amount, e.cur);
    out[p].total += v;
    out[p].cats[e.cat] = (out[p].cats[e.cat] || 0) + v;
  });
  return out;
}

function dataCurta(iso) {
  const d = new Date(iso + "T12:00:00");
  return `${d.getDate()}/${d.getMonth() + 1}`;
}

function barra(pd, max) {
  const h = pd.total ? Math.max(4, (pd.total / max) * MAXPX) : 0;
  const segs = CATEGORIES.filter((c) => pd.cats[c.id])
    .map((c) => {
      const sh = (pd.cats[c.id] / pd.total) * h;
      return `<div class="ch-seg" style="height:${sh}px;background:${c.color}"></div>`;
    })
    .join("");
  return `<div class="ch-barwrap">
    <span class="ch-val">${pd.total ? Math.round(pd.total) : ""}</span>
    <div class="ch-bar" style="height:${h}px">${segs}</div>
  </div>`;
}

function render(area, buit) {
  const dies = DAYS.map((d) => ({ d, data: dadesDia(d.date) })).filter(
    (x) => x.data[PERSONES[0]].total > 0 || x.data[PERSONES[1]].total > 0
  );
  if (!dies.length) {
    area.innerHTML = "";
    buit.hidden = false;
    return;
  }
  buit.hidden = true;
  const max = Math.max(...dies.flatMap((x) => PERSONES.map((p) => x.data[p].total)));
  area.innerHTML = dies
    .map(
      (x) => `<div class="ch-day">
        <div class="ch-bars">${barra(x.data[PERSONES[0]], max)}${barra(x.data[PERSONES[1]], max)}</div>
        <div class="ch-names"><span>A</span><span>Y</span></div>
        <div class="ch-date">${dataCurta(x.d.date)}</div>
      </div>`
    )
    .join("");
}

export function initChart() {
  const modal = document.getElementById("chart-modal");
  const btn = document.getElementById("chart-btn");
  const legend = document.getElementById("chart-legend");
  const area = document.getElementById("chart-area");
  const buit = document.getElementById("chart-empty");
  if (!modal || !btn || !area) return;

  legend.innerHTML = CATEGORIES.map(
    (c) => `<span class="ch-leg"><i style="background:${c.color}"></i>${c.nom}</span>`
  ).join("");

  function tanca() {
    modal.hidden = true;
    document.body.style.overflow = "";
  }
  btn.addEventListener("click", () => {
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    render(area, buit);
    sincronitza().then((ok) => { if (ok && !modal.hidden) render(area, buit); });
  });
  modal.addEventListener("click", (e) => {
    if (e.target.hasAttribute("data-close")) tanca();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) tanca();
  });
}
