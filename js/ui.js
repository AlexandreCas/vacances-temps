// Helpers de render (generen HTML a partir de les dades).
import { descriuCodi, iconaSVG, classePanell } from "./weather.js";
import { recomanaRoba, chipsRoba } from "./clothing.js";
import { LOCATIONS, hotelPerData, FLIGHTS, CONTACTES } from "./itinerary.js";
import {
  CATEGORIES, PERSONES, personaPredef, despesesDia,
  totalsPerMoneda, totalsPersonaDia, totalsViatge, totalsViatgePersona, catInfo,
} from "./expenses.js";
import { eurosDeTotals } from "./rates.js";

const eur = (totals) => `≈ ${Math.round(eurosDeTotals(totals))} €`;

export function formatImport(v, cur) {
  return cur === "¥" ? Math.round(v).toLocaleString("ca-ES") : v.toFixed(2);
}
function fmtTotals(t) {
  const parts = Object.entries(t).map(([cur, v]) => `${formatImport(v, cur)} ${cur}`);
  return parts.length ? parts.join(" · ") : "—";
}

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
    .map((it) => {
      const tag =
        it.inc === true
          ? `<span class="pi-tag inc">inclòs</span>`
          : it.inc === false
          ? `<span class="pi-tag opc">no inclòs</span>`
          : "";
      return `<li class="plan-item plan--${it.t}">
        <span class="pi-ico">${PLA_ICONA[it.t] || "•"}</span>
        <span class="pi-txt">${it.txt}${tag}</span>
      </li>`;
    })
    .join("");
  return `<details class="card plan coll" open>
    <summary class="kicker">Què faré avui</summary>
    <ul class="plan-list">${items}</ul>
  </details>`;
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
        ${s.seients ? `<div class="fl-seats">💺 Seients · ${s.seients}</div>` : ""}
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
  return `<details class="card hotel coll">
    <summary class="kicker">On dormo</summary>
    <h3 class="wear-h">${h.nom}</h3>
    <p class="hotel-addr">📍 ${h.adreca}</p>
    <div class="hotel-meta">
      <span><i>Entrada</i>${formatData(h.checkin, true)}</span>
      <span><i>Sortida</i>${formatData(h.checkout, true)}</span>
      <span><i>Nits</i>${nits}</span>
    </div>
    <div class="hotel-links">${links}</div>
  </details>`;
}

function fmtPersones(perPersona) {
  return PERSONES.filter((p) => Object.keys(perPersona[p]).length)
    .map((p) => `<span class="desp-pers"><i>${p}</i> ${fmtTotals(perPersona[p])}</span>`)
    .join("");
}

export function renderDespeses(dia, obert = false) {
  const items = despesesDia(dia.date);
  const totals = totalsPerMoneda(dia.date);
  const perPersona = totalsPersonaDia(dia.date);
  const defCur = dia.loc === "maldives" ? "$" : dia.loc === "abudhabi" ? "€" : "¥";
  const defPers = personaPredef();
  const opCur = (c) => `<option ${c === defCur ? "selected" : ""}>${c}</option>`;
  const opPers = (p) => `<option ${p === defPers ? "selected" : ""}>${p}</option>`;

  const llista = items.length
    ? items
        .map((e) => {
          const c = catInfo(e.cat);
          return `<li class="desp-row">
            <span class="desp-ico">${c.ico}</span>
            <span class="desp-cat">${c.nom}<span class="desp-who">${e.who || PERSONES[0]}</span></span>
            <span class="desp-amt">${formatImport(e.amount, e.cur)} ${e.cur}</span>
            <button class="desp-del" data-id="${e.id}" type="button" aria-label="Esborrar">&times;</button>
          </li>`;
        })
        .join("")
    : `<li class="desp-buit">Encara no hi ha despeses aquest dia.</li>`;

  return `<details class="card coll despeses" id="despeses-card"${obert ? " open" : ""}>
    <summary class="kicker">Despeses${items.length ? ` · ${fmtTotals(totals)} · ${eur(totals)}` : ""}</summary>
    <ul class="desp-list">${llista}</ul>
    ${items.length ? `<p class="desp-persones">${fmtPersones(perPersona)}</p>` : ""}
    <div class="desp-form">
      <input class="desp-amount" type="number" inputmode="decimal" placeholder="Import" />
      <select class="desp-cur">${opCur("¥")}${opCur("€")}${opCur("$")}</select>
      <select class="desp-fcat">${CATEGORIES.map((c) => `<option value="${c.id}">${c.ico} ${c.nom}</option>`).join("")}</select>
      <div class="desp-form-end">
        <select class="desp-fwho">${PERSONES.map(opPers).join("")}</select>
        <button class="desp-add" type="button">Afegir</button>
      </div>
    </div>
  </details>`;
}

export function renderResumDespeses() {
  const t = totalsViatge();
  if (!Object.keys(t).length) return "";
  const perPersona = totalsViatgePersona();
  const persEur = PERSONES.filter((p) => Object.keys(perPersona[p]).length)
    .map((p) => `<span class="desp-pers"><i>${p}</i> ${eur(perPersona[p])}</span>`)
    .join("");
  return `<section class="card">
    <p class="kicker">Despeses del viatge</p>
    <p class="desp-total-gran">${eur(t)}</p>
    <p class="desp-subtotal">${fmtTotals(t)}</p>
    <p class="desp-persones">${persEur}</p>
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

  const wear = `<details class="card wear coll" open>
    <summary class="kicker">Què em poso</summary>
    <h3 class="wear-h">${roba.nivell}</h3>
    <div class="chips">
      ${chips.map((ch) => `<span class="chip-roba chip--${ch[2]}"><span class="ce">${ch[0]}</span>${ch[1]}</span>`).join("")}
    </div>
    ${loc.nota ? `<p class="note">${loc.nota}</p>` : ""}
    <details class="more">
      <summary>Consells complets</summary>
      <ul>${roba.peces.map((x) => `<li>${x}</li>`).join("")}</ul>
    </details>
  </details>`;

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

  return hero + renderPla(dia) + renderVols(dia) + renderHotel(dia) + wear + stats + hourly + renderDespeses(dia);
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
  </section>` + renderPla(dia) + renderVols(dia) + renderHotel(dia) + renderDespeses(dia);
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

// ---- Contactes d'assistència ----
export function renderContactes() {
  const telHref = (t) => "tel:" + t.replace(/[^+\d]/g, "");
  return `<section class="card">
    <p class="kicker">Contactes d'assistència</p>
    ${CONTACTES.map(
      (z) => `<div class="ct-zona">
        <p class="ct-tit">${z.zona}</p>
        <ul class="ct-list">
          ${z.items
            .map((it) =>
              it.email
                ? `<li><span class="ct-lab">${it.lab}</span><a href="mailto:${it.email}">${it.email}</a></li>`
                : `<li><span class="ct-lab">${it.lab}</span><a href="${telHref(it.tel)}">${it.tel}</a></li>`
            )
            .join("")}
        </ul>
        ${z.nota ? `<p class="ct-nota">${z.nota}</p>` : ""}
      </div>`
    ).join("")}
  </section>`;
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
