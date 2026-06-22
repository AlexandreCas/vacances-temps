// Controlador principal de l'app.
import { DAYS } from "./itinerary.js";
import { carregarTemps, diaPerData, horesPerData } from "./weather.js";
import { recomanaRoba } from "./clothing.js";
import { initFX } from "./fx.js";
import { initFrases } from "./phrases.js";
import { initGame } from "./game.js";
import { initChart } from "./chart.js";
import { initFaq } from "./faq.js";
import { refreshRates } from "./rates.js";
import { afegeixDespesa, treuDespesa, desaPersona, sincronitza } from "./expenses.js";
import {
  renderSelector,
  renderDetall,
  renderResumLlista,
  renderMaleta,
  renderContactes,
  renderDespeses,
  renderResumDespeses,
  formatData,
} from "./ui.js";

const $ = (sel) => document.querySelector(sel);

const estat = {
  temps: null, // { ts, perLloc, offline }
  idx: 0, // dia seleccionat
  vista: "detall", // "detall" | "resum"
};

// Tria el dia inicial: avui si és dins del viatge, si no el primer dia.
function indexInicial() {
  const d = new Date();
  const avui = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const i = DAYS.findIndex((dia) => dia.date === avui);
  if (i !== -1) return i; // estem dins del viatge → dia actual
  if (avui < DAYS[0].date) return 0; // encara no ha començat → primer dia
  return DAYS.length - 1; // ja ha acabat → últim dia
}

function resumDe(dia) {
  const lloc = estat.temps?.perLloc?.[dia.loc];
  return diaPerData(lloc, dia.date);
}
function horesDe(dia) {
  const lloc = estat.temps?.perLloc?.[dia.loc];
  return horesPerData(lloc, dia.date);
}

function renderEstatCarrega(text) {
  $("#contingut").innerHTML = `<div class="card avis"><p>${text}</p></div>`;
}

function renderBanner() {
  const b = $("#banner");
  if (!estat.temps) {
    b.textContent = "";
    b.className = "banner";
    return;
  }
  const fa = Math.round((Date.now() - estat.temps.ts) / 60000);
  if (estat.temps.offline) {
    b.textContent = `⚠️ Sense connexió (fa ${fa} min)`;
    b.className = "banner offline";
  } else {
    b.textContent = `✓ Actualitzat`;
    b.className = "banner ok";
  }
}

function renderSelectorDom() {
  $("#selector").innerHTML = renderSelector(DAYS, estat.idx, resumDe);
  // centra el chip actiu
  const actiu = $("#selector .chip.actiu");
  if (actiu) actiu.scrollIntoView({ inline: "center", block: "nearest" });
}

function renderContingut() {
  const c = $("#contingut");
  if (estat.vista === "detall") {
    const dia = DAYS[estat.idx];
    c.className = "contingut vista-detall";
    c.innerHTML = renderDetall(dia, resumDe(dia), horesDe(dia));
  } else {
    c.className = "contingut vista-ruta";
    c.innerHTML =
      renderResumLlista(DAYS, resumDe) + renderResumDespeses() + renderContactes() + renderMaleta(maletaAgregada());
  }
}

// Uneix les recomanacions de maleta de tots els dies amb previsió.
function maletaAgregada() {
  const set = new Set();
  for (const dia of DAYS) {
    const r = resumDe(dia);
    if (!r) continue;
    const hores = horesDe(dia);
    const roba = recomanaRoba({
      feelsMax: r.stmax,
      feelsMin: r.stmin,
      precipProb: r.pluja_prob,
      precipMm: r.pluja_mm,
      uvIndex: r.uv,
      wind: r.vent,
      humitat: hores.length ? Math.max(...hores.map((h) => h.humitat ?? 0)) : null,
      loc: dia.loc,
    });
    roba.maleta.forEach((x) => set.add(x));
  }
  return [...set];
}

function refrescaDespeses() {
  const card = document.getElementById("despeses-card");
  if (!card) return;
  card.outerHTML = renderDespeses(DAYS[estat.idx], true);
}

// Redibuixa el contingut, però NO si l'usuari està escrivint en un camp
// (evita que la sincronització faci desaparèixer el teclat a mig editar).
function refrescaSegur() {
  const ae = document.activeElement;
  if (ae && ae.matches && ae.matches("#contingut input, #contingut select, #contingut textarea")) return;
  renderContingut();
}

function renderTot() {
  renderBanner();
  renderSelectorDom();
  renderContingut();
  $("#tab-detall").classList.toggle("actiu", estat.vista === "detall");
  $("#tab-resum").classList.toggle("actiu", estat.vista === "resum");
}

function lligarEsdeveniments() {
  $("#selector").addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    estat.idx = Number(btn.dataset.idx);
    estat.vista = "detall";
    renderTot();
  });

  $("#contingut").addEventListener("click", (e) => {
    // Afegir despesa
    const add = e.target.closest(".desp-add");
    if (add) {
      const card = add.closest(".despeses");
      const amount = parseFloat(card.querySelector(".desp-amount").value);
      if (!Number.isFinite(amount) || amount <= 0) return;
      const cur = card.querySelector(".desp-cur").value;
      const cat = card.querySelector(".desp-fcat").value;
      const who = card.querySelector(".desp-fwho").value;
      afegeixDespesa(DAYS[estat.idx].date, { amount, cur, cat, who });
      desaPersona(who);
      refrescaDespeses();
      return;
    }
    // Esborrar despesa
    const del = e.target.closest(".desp-del");
    if (del) {
      treuDespesa(del.dataset.id);
      refrescaDespeses();
      return;
    }
    // Navegar des de la vista ruta
    const fila = e.target.closest(".fila-resum");
    if (!fila) return;
    estat.idx = Number(fila.dataset.idx);
    estat.vista = "detall";
    renderTot();
  });

  $("#tab-detall").addEventListener("click", () => {
    estat.vista = "detall";
    renderTot();
  });
  $("#tab-resum").addEventListener("click", () => {
    estat.vista = "resum";
    renderTot();
    sincronitza().then((ok) => { if (ok && estat.vista === "resum") refrescaSegur(); });
  });

  // Puja les despeses pendents quan torna la connexió o es reobre l'app.
  const syncRefresca = () => sincronitza().then((ok) => { if (ok) refrescaSegur(); });
  window.addEventListener("online", syncRefresca);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) syncRefresca(); });
}

async function inici() {
  estat.idx = indexInicial();
  lligarEsdeveniments();
  initFX();
  initFrases();
  initGame();
  initChart();
  initFaq();
  refreshRates();
  renderEstatCarrega("⏳ Carregant la previsió del temps…");
  try {
    estat.temps = await carregarTemps();
  } catch (err) {
    renderEstatCarrega(
      "❌ No s'ha pogut carregar la previsió i no hi ha dades desades. Comprova la connexió i recarrega."
    );
    return;
  }
  renderTot();
  // Sincronitza les despeses amb Supabase i refresca quan acabi.
  sincronitza().then((ok) => { if (ok) refrescaSegur(); });
}

// Registre del service worker (PWA / offline).
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
  // Quan s'activa una versió nova, recarrega automàticament (una sola vegada).
  let recarregant = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (recarregant) return;
    recarregant = true;
    window.location.reload();
  });
}

inici();
