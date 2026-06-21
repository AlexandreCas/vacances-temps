// Helpers de render (generen HTML a partir de les dades).
import { descriuCodi, iconaSVG, classePanell } from "./weather.js";
import { recomanaRoba, chipsRoba } from "./clothing.js";
import { LOCATIONS, hotelPerData, FLIGHTS } from "./itinerary.js";

const DIES_SET = ["dg", "dl", "dt", "dc", "dj", "dv", "ds"];
const MESOS = ["gen", "feb", "març", "abr", "maig", "juny", "jul", "ago", "set", "oct", "nov", "des"];

export function formatData(iso, llarg = false) {
  const d = new Date(iso + "T12:00:00");
  const dia = DIES_SET[d.getDay()];
  if (llarg) return `${dia.toUpperCase()} ${d.getDate()} ${MESOS[d.getMonth()]}`;
  return `${dia} ${d.getDate()}`;
}

const num = (v, suf = "") => (v == null || Number.isNaN(v) ? "—" : `${Math.round(v)}${suf}`);

function nomLloc(loc) {
  const m = loc.nom.match(/^(.*?)\s*\((.*)\)$/);
  return m ? { main: m[1], sub: m[2] } : { main: loc.nom, sub: "" };
}

const PLA_ICONA = {
  vol: "✈️", tren: "🚆", visita: "📍", apat: "🍜",
  lliure: "🗺️", logistica: "⚠️", bugaderia: "🧺", nit: "🌙", allotjament: "🏨",
};

function renderPla(dia) {
  if (!dia.pla || !dia.pla.length) return "";
  const items = dia.pla
    .map(
      (it) => `<li class="plan-item plan--${it.t}">
        <span class="pi-ico">${PLA_ICONA[it.t] || "•"}</span>
        <span class="pi-txt">${it.txt}</span>
      </li>`
    )
    .join("");
  return `<section class="card plan">
    <p class="kicker">Què faré avui</p>
    <ul class="plan-list">${items}</ul>
  </section>`;
}

function renderVols(dia) {
  const f = FLIGHTS[dia.date];
  if (!f) return "";
  const segs = f.segs
    .map(
      (s) => `<div class="flight">
        <div class="fl-num">✈️ ${s.num}</div>
        <div class="fl-route">
          <div class="fl-pt">
            <span class="fl-time">${s.surt}</span>
            <span class="fl-air">${s.de}</span>
            <span class="fl-term">${s.t1 || ""}</span>
          </div>
          <div class="fl-line"><span>${s.dur || ""}</span></div>
          <div class="fl-pt fl-pt--end">
            <span class="fl-time">${s.arr}</span>
            <span class="fl-air">${s.a}</span>
            <span class="fl-term">${s.t2 || ""}</span>
          </div>
        </div>
      </div>`
    )
    .join("");
  return `<section class="card flights">
    <p class="kicker">Vols</p>
    ${segs}
    ${f.nota ? `<p class="fl-nota">${f.nota}</p>` : ""}
  </section>`;
}

function renderHotel(dia) {
  const h = hotelPerData(dia.date);
  if (!h) return "";
  const nits = Math.round((new Date(h.checkout) - new Date(h.checkin)) / 86400000);
  const maps =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(`${h.nom} ${h.ciutat}`);
  const links = [
    `<a href="${maps}" target="_blank" rel="noopener">Mapa ↗</a>`,
    h.web ? `<a href="${h.web}" target="_blank" rel="noopener">Web ↗</a>` : "",
    h.tel ? `<a href="tel:${h.tel.replace(/\s/g, "")}">Trucar</a>` : "",
  ].join("");
  return `<section class="card hotel">
    <p class="kicker">On dormo</p>
    <h3 class="wear-h">${h.nom}</h3>
    <p class="hotel-addr">📍 ${h.adreca}</p>
    <div class="hotel-meta">
      <span><i>Entrada</i>${formatData(h.checkin, true)}</span>
      <span><i>Sortida</i>${formatData(h.checkout, true)}</span>
      <span><i>Nits</i>${nits}</span>
    </div>
    <div class="hotel-links">${links}</div>
  </section>`;
}

function paramsRoba(dia, r, hores) {
  const humitat = hores.length ? Math.max(...hores.map((h) => h.humitat ?? 0)) : null;
  return {
    feelsMax: r.stmax,
    feelsMin: r.stmin,
    precipProb: r.pluja_prob,
    precipMm: r.pluja_mm,
    uvIndex: r.uv,
    wind: r.vent,
    humitat,
    loc: dia.loc,
  };
}

// ---- Rail de dies (scroll horitzontal) ----
export function renderSelector(days, indexActiu, getResum) {
  return days
    .map((d, i) => {
      const loc = LOCATIONS[d.loc];
      const r = getResum ? getResum(d) : null;
      const main = nomLloc(loc).main;
      const actiu = i === indexActiu ? " actiu" : "";
      const viatge = d.type === "viatge" ? " viatge" : "";
      const glyph = r ? iconaSVG(descriuCodi(r.code).key, "ico-xs") : `<span class="chip-buit">·</span>`;
      const temp = r ? `<span class="chip-t">${num(r.tmax, "°")}</span>` : "";
      return `<button class="chip${actiu}${viatge}" data-idx="${i}">
        <span class="chip-d">${formatData(d.date)}</span>
        ${glyph}
        ${temp}
        <span class="chip-c">${main}</span>
      </button>`;
    })
    .join("");
}

// ---- Vista detallada d'un dia ----
export function renderDetall(dia, r, hores) {
  const loc = LOCATIONS[dia.loc];
  if (!r) return renderSenseDades(dia, loc);

  const c = descriuCodi(r.code);
  const panell = classePanell(c.to, dia.loc);
  const { main, sub } = nomLloc(loc);
  const esViatge = dia.type === "viatge";

  const pr = paramsRoba(dia, r, hores);
  const roba = recomanaRoba(pr);
  const chips = chipsRoba(pr);

  const hero = `<section class="sky sky--${panell}${esViatge ? " sky--viatge" : ""}">
    <div class="sky-fx" aria-hidden="true"></div>
    <div class="sky-inner">
      <div class="sky-top">
        <span class="eyebrow">${formatData(dia.date, true)}</span>
        ${esViatge ? `<span class="transit">${iconaSVG("plane", "ico-xs")} en trànsit</span>` : ""}
      </div>
      <h2 class="sky-place">${main}${sub ? `<span class="sky-sub">${sub}</span>` : ""}</h2>
      <p class="sky-hotel">${esViatge ? "" : "🏨 "}${dia.hotel}</p>
      <div class="sky-main">
        <span class="sky-temp">${num(r.tmax)}<span class="o">°</span></span>
        <span class="sky-cond">${iconaSVG(c.key, "ico-xl")}<span>${c.text}</span></span>
      </div>
      <p class="sky-feel">Sensació ${num(r.stmax, "°")} &nbsp;·&nbsp; mínima ${num(r.tmin, "°")}</p>
    </div>
  </section>`;

  const wear = `<section class="card wear">
    <p class="kicker">Què em poso</p>
    <h3 class="wear-h">${roba.nivell}</h3>
    <div class="chips">
      ${chips.map((ch) => `<span class="chip-roba chip--${ch[2]}"><span class="ce">${ch[0]}</span>${ch[1]}</span>`).join("")}
    </div>
    ${loc.nota ? `<p class="note">${loc.nota}</p>` : ""}
    <details class="more">
      <summary>Consells complets</summary>
      <ul>${roba.peces.map((x) => `<li>${x}</li>`).join("")}</ul>
    </details>
  </section>`;

  const filesHores = hores
    .filter((_, i) => i % 2 === 0)
    .map((h) => {
      const hc = descriuCodi(h.code);
      return `<div class="hour">
        <span class="hh">${h.hora}</span>
        ${iconaSVG(hc.key, "ico-sm")}
        <span class="ht">${num(h.temp, "°")}</span>
        <span class="hr">${iconaSVG("drop", "ico-mini")}${num(h.pluja_prob, "%")}</span>
      </div>`;
    })
    .join("");

  const hourly = hores.length
    ? `<section class="card">
        <p class="kicker">Hora a hora <span class="kicker-sub">hora local</span></p>
        <div class="hours">${filesHores}</div>
      </section>`
    : "";

  const stat = (key, lab, val) =>
    `<div class="stat">${iconaSVG(key, "ico-sm")}<span class="stat-v">${val}</span><span class="stat-l">${lab}</span></div>`;
  const humitat = hores.length ? Math.max(...hores.map((h) => h.humitat ?? 0)) : null;
  const stats = `<section class="card">
    <p class="kicker">Detall del dia</p>
    <div class="stats">
      ${stat("thermo", "Sensació", num(r.stmax, "°"))}
      ${stat("drop", "Pluja", num(r.pluja_prob, "%"))}
      ${stat("sun", "UV", num(r.uv))}
      ${stat("wind", "Vent", num(r.vent) + " km/h")}
      ${stat("drop", "Humitat", num(humitat, "%"))}
      ${stat("drop", "Precip.", num(r.pluja_mm, " mm"))}
    </div>
  </section>`;

  return hero + renderPla(dia) + renderVols(dia) + renderHotel(dia) + wear + stats + hourly;
}

function renderSenseDades(dia, loc) {
  const { main, sub } = nomLloc(loc);
  return `<section class="sky sky--futur">
    <div class="sky-inner">
      <span class="eyebrow">${formatData(dia.date, true)}</span>
      <h2 class="sky-place">${main}${sub ? `<span class="sky-sub">${sub}</span>` : ""}</h2>
      <p class="sky-hotel">${dia.hotel}</p>
      <div class="far">
        ${iconaSVG("cloud", "ico-xl")}
        <div>
          <strong>Encara sense previsió</strong>
          <span>Aquest dia és massa lluny (més enllà de 16 dies). Es completarà sol a mesura que s'acosti.</span>
        </div>
      </div>
    </div>
  </section>` + renderPla(dia) + renderVols(dia) + renderHotel(dia);
}

// ---- Vista ruta (10 dies) com a línia de temps ----
export function renderResumLlista(days, getResum) {
  const legs = days
    .map((d, i) => {
      const loc = LOCATIONS[d.loc];
      const { main } = nomLloc(loc);
      const r = getResum(d);
      const esViatge = d.type === "viatge";
      const pre = esViatge ? `${iconaSVG("plane", "ico-mini")} ` : "";

      if (!r) {
        return `<button class="leg leg--futur" data-idx="${i}">
          <span class="leg-rail"><span class="leg-dot dot--futur"></span></span>
          <div class="leg-body">
            <div class="leg-head"><span class="leg-date">${formatData(d.date, true)}</span></div>
            <div class="leg-place">${pre}${main}</div>
            <div class="leg-meta leg-far">Previsió aviat</div>
          </div>
        </button>`;
      }
      const c = descriuCodi(r.code);
      const tone = classePanell(c.to, d.loc);
      const chips = chipsRoba(paramsRoba(d, r, []))
        .slice(0, 3)
        .map((ch) => ch[0])
        .join(" ");
      return `<button class="leg" data-idx="${i}">
        <span class="leg-rail"><span class="leg-dot dot--${tone}">${iconaSVG(c.key, "ico-mini")}</span></span>
        <div class="leg-body">
          <div class="leg-head">
            <span class="leg-date">${formatData(d.date, true)}</span>
            <span class="leg-temp">${num(r.tmax, "°")}<i>${num(r.tmin, "°")}</i></span>
          </div>
          <div class="leg-place">${pre}${main} <span class="leg-hotel">· ${d.hotel}</span></div>
          <div class="leg-meta">
            <span class="leg-rain">${iconaSVG("drop", "ico-mini")}${num(r.pluja_prob, "%")}</span>
            <span class="leg-chips">${chips}</span>
          </div>
        </div>
      </button>`;
    })
    .join("");
  return `<div class="journey">${legs}</div>`;
}

// ---- Llista de maleta agregada ----
export function renderMaleta(items) {
  if (!items.length) return "";
  return `<section class="card pack">
    <p class="kicker">Maleta</p>
    <h3 class="wear-h">Què endur-te</h3>
    <ul class="pack-list">
      ${items.map((x) => `<li>${iconaSVG("check", "ico-sm")}<span>${x}</span></li>`).join("")}
    </ul>
  </section>`;
}
