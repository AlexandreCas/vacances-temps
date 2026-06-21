// Despeses sincronitzades amb Supabase + cache local (offline).
import { supaFetchAll, supaInsert, supaDelete } from "./supa.js";

const KEY = "vacances-despeses-v2";
const PERSONA_KEY = "vacances-despeses-persona";

export const PERSONES = ["Alex", "Yurena"];

export function personaPredef() {
  const p = localStorage.getItem(PERSONA_KEY);
  return PERSONES.includes(p) ? p : PERSONES[0];
}
export function desaPersona(p) {
  try { localStorage.setItem(PERSONA_KEY, p); } catch (_) {}
}

export const CATEGORIES = [
  { id: "menjar", ico: "🍜", nom: "Menjar", color: "#e0573e" },
  { id: "compres", ico: "🛍️", nom: "Compres", color: "#5b8cc4" },
  { id: "regal", ico: "🎁", nom: "Regal", color: "#f2b53b" },
  { id: "transport", ico: "🚆", nom: "Transport", color: "#38c8c9" },
  { id: "entrades", ico: "🎟️", nom: "Entrades", color: "#9a7fd0" },
  { id: "altres", ico: "💴", nom: "Altres", color: "#6f798c" },
];
export function catInfo(id) {
  return CATEGORIES.find((c) => c.id === id) || CATEGORIES[CATEGORIES.length - 1];
}

// ---- Estat local ----
let CACHE = carregaLocal();
function carregaLocal() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (_) { return []; }
}
function desaLocal() {
  try { localStorage.setItem(KEY, JSON.stringify(CACHE)); } catch (_) {}
}
function uuid() {
  if (crypto.randomUUID) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

// ---- Consultes ----
export function despesesDia(date) {
  return CACHE.filter((e) => e.date === date);
}
function sumaPerMoneda(list) {
  const t = {};
  list.forEach((e) => { t[e.cur] = (t[e.cur] || 0) + e.amount; });
  return t;
}
function sumaPerPersona(list) {
  const o = {};
  PERSONES.forEach((p) => { o[p] = sumaPerMoneda(list.filter((e) => (e.who || PERSONES[0]) === p)); });
  return o;
}
export const totalsPerMoneda = (date) => sumaPerMoneda(despesesDia(date));
export const totalsPersonaDia = (date) => sumaPerPersona(despesesDia(date));
export const totalsViatge = () => sumaPerMoneda(CACHE);
export const totalsViatgePersona = () => sumaPerPersona(CACHE);

// ---- Modificacions (local immediat + Supabase en segon pla) ----
export function afegeixDespesa(date, d) {
  const exp = { id: uuid(), date, amount: d.amount, cur: d.cur, cat: d.cat, who: d.who, pending: true };
  CACHE.push(exp);
  desaLocal();
  supaInsert(exp).then(() => { exp.pending = false; desaLocal(); }).catch(() => {});
  return exp;
}
export function treuDespesa(id) {
  CACHE = CACHE.filter((e) => e.id !== id);
  desaLocal();
  supaDelete(id).catch(() => {});
}

// ---- Sincronització ----
export async function sincronitza() {
  // Reempeny les despeses locals que encara no s'han pogut desar.
  for (const e of CACHE.filter((x) => x.pending)) {
    try { await supaInsert(e); e.pending = false; } catch (_) {}
  }
  desaLocal();
  try {
    const remote = await supaFetchAll();
    const remoteIds = new Set(remote.map((r) => r.id));
    const pendentsLocal = CACHE.filter((e) => e.pending && !remoteIds.has(e.id));
    CACHE = [...remote, ...pendentsLocal];
    desaLocal();
    return true;
  } catch (_) {
    return false;
  }
}
