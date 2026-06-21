// Helpers de render (generen HTML a partir de les dades).
import { descriuCodi } from "./weather.js";
import { recomanaRoba, badgeRoba } from "./clothing.js";
import { LOCATIONS } from "./itinerary.js";

const DIES_SET = ["dg", "dl", "dt", "dc", "dj", "dv", "ds"];
const MESOS = ["gen", "feb", "març", "abr", "maig", "juny", "jul", "ago", "set", "oct", "nov", "des"];

export function formatData(iso, llarg = false) {
  const d = new Date(iso + "T12:00:00");
  const dia = DIES_SET[d.getDay()];
  if (llarg) return `${dia} ${d.getDate()} ${MESOS[d.getMonth()]}`;
  return `${dia} ${d.getDate()}`;
}

const num = (v, suf = "") => (v == null || Number.isNaN(v) ? "—" : `${Math.round(v)}${suf}`);

// ---- Selector de dies (chips horitzontals) ----
export function renderSelector(days, indexActiu) {
  return days
    .map((d, i) => {
      const loc = LOCATIONS[d.loc];
      const actiu = i === indexActiu ? " actiu" : "";
      const viatge = d.type === "viatge" ? " viatge" : "";
      return `<button class="chip${actiu}${viatge}" data-idx="${i}">
        <span class="chip-data">${formatData(d.date)}</span>
        <span class="chip-ciutat">${loc.nom.split(" (")[0]}</span>
      </button>`;
    })
    .join("");
}

// ---- Vista detallada d'un dia ----
export function renderDetall(dia, resumDiari, hores) {
  const loc = LOCATIONS[dia.loc];

  if (!resumDiari) {
    return `<div class="card avis">
      <h2>${formatData(dia.date, true)} · ${loc.nom}</h2>
      <p class="hotel">${dia.hotel}</p>
      <p class="sense-dades">⏳ Previsió encara no disponible (massa lluny en el temps).
      Es podrà consultar a mesura que s'acosti la data.</p>
    </div>`;
  }

  const c = descriuCodi(resumDiari.code);
  const roba = recomanaRoba({
    feelsMax: resumDiari.stmax,
    feelsMin: resumDiari.stmin,
    precipProb: resumDiari.pluja_prob,
    precipMm: resumDiari.pluja_mm,
    uvIndex: resumDiari.uv,
    wind: resumDiari.vent,
    humitat: hores.length ? Math.max(...hores.map((h) => h.humitat ?? 0)) : null,
    loc: dia.loc,
  });

  const etiquetaViatge = dia.type === "viatge"
    ? `<span class="tag-viatge">✈️ dia de viatge</span>` : "";
  const notaLloc = loc.nota ? `<p class="nota-lloc">ℹ️ ${loc.nota}</p>` : "";

  const filesHores = hores
    .filter((_, i) => i % 2 === 0) // cada 2 hores per no saturar
    .map((h) => {
      const hc = descriuCodi(h.code);
      return `<div class="hora">
        <span class="h-hora">${h.hora}</span>
        <span class="h-icona">${hc.icona}</span>
        <span class="h-temp">${num(h.temp, "°")}</span>
        <span class="h-pluja">${num(h.pluja_prob, "%")}💧</span>
      </div>`;
    })
    .join("");

  return `<div class="card detall">
    <div class="detall-cap">
      <div>
        <h2>${formatData(dia.date, true)} · ${loc.nom} ${etiquetaViatge}</h2>
        <p class="hotel">🏨 ${dia.hotel}</p>
      </div>
      <div class="cond-gran">
        <span class="icona-gran">${c.icona}</span>
        <span class="cond-text">${c.text}</span>
      </div>
    </div>

    <div class="metriques">
      <div class="m"><span class="m-val">${num(resumDiari.tmax, "°")}</span><span class="m-lab">màx</span></div>
      <div class="m"><span class="m-val">${num(resumDiari.tmin, "°")}</span><span class="m-lab">mín</span></div>
      <div class="m"><span class="m-val">${num(resumDiari.stmax, "°")}</span><span class="m-lab">sensació</span></div>
      <div class="m"><span class="m-val">${num(resumDiari.pluja_prob, "%")}</span><span class="m-lab">pluja</span></div>
      <div class="m"><span class="m-val">${num(resumDiari.uv)}</span><span class="m-lab">UV</span></div>
      <div class="m"><span class="m-val">${num(resumDiari.vent)}</span><span class="m-lab">vent km/h</span></div>
    </div>

    ${notaLloc}

    <div class="roba">
      <h3>👕 Com vestir-te — ${roba.nivell}</h3>
      <ul>${roba.peces.map((x) => `<li>${x}</li>`).join("")}</ul>
    </div>

    ${hores.length ? `<div class="hores-wrap">
      <h3>⏱️ Per hores</h3>
      <div class="hores">${filesHores}</div>
    </div>` : ""}
  </div>`;
}

// ---- Vista resum (10 dies) ----
export function renderResumLlista(days, getResumDiari) {
  return days
    .map((d, i) => {
      const loc = LOCATIONS[d.loc];
      const r = getResumDiari(d);
      if (!r) {
        return `<button class="fila-resum buida" data-idx="${i}">
          <span class="fr-data">${formatData(d.date, true)}</span>
          <span class="fr-ciutat">${loc.nom}</span>
          <span class="fr-temp">⏳ —</span>
        </button>`;
      }
      const c = descriuCodi(r.code);
      const badge = badgeRoba({
        feelsMax: r.stmax,
        precipProb: r.pluja_prob,
        precipMm: r.pluja_mm,
        uvIndex: r.uv,
      });
      const viatge = d.type === "viatge" ? "✈️ " : "";
      return `<button class="fila-resum" data-idx="${i}">
        <span class="fr-data">${formatData(d.date, true)}</span>
        <span class="fr-ciutat">${viatge}${loc.nom}</span>
        <span class="fr-icona">${c.icona}</span>
        <span class="fr-temp">${num(r.tmax, "°")}/${num(r.tmin, "°")}</span>
        <span class="fr-pluja">${num(r.pluja_prob, "%")}💧</span>
        <span class="fr-badge">${badge}</span>
      </button>`;
    })
    .join("");
}

// ---- Llista de maleta agregada ----
export function renderMaleta(items) {
  if (!items.length) return "";
  return `<div class="card maleta">
    <h3>🧳 Llista de maleta (tot el viatge)</h3>
    <ul>${items.map((x) => `<li>${x}</li>`).join("")}</ul>
  </div>`;
}
