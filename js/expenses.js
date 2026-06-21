// Despeses per dia, desades al dispositiu (localStorage).
const KEY = "vacances-despeses-v1";
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

function carrega() {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (_) { return {}; }
}
function desa(d) {
  try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (_) {}
}

export function despesesDia(date) {
  return carrega()[date] || [];
}
export function afegeixDespesa(date, exp) {
  const d = carrega();
  (d[date] = d[date] || []).push(exp);
  desa(d);
}
export function treuDespesa(date, i) {
  const d = carrega();
  if (d[date]) {
    d[date].splice(i, 1);
    if (!d[date].length) delete d[date];
    desa(d);
  }
}
function sumaPerMoneda(llista) {
  const t = {};
  llista.forEach((e) => { t[e.cur] = (t[e.cur] || 0) + e.amount; });
  return t;
}
function sumaPerPersona(llista) {
  const out = {};
  PERSONES.forEach((p) => { out[p] = sumaPerMoneda(llista.filter((e) => (e.who || PERSONES[0]) === p)); });
  return out;
}

export function totalsPerMoneda(date) {
  return sumaPerMoneda(despesesDia(date));
}
export function totalsPersonaDia(date) {
  return sumaPerPersona(despesesDia(date));
}
export function totalsViatge() {
  return sumaPerMoneda(Object.values(carrega()).flat());
}
export function totalsViatgePersona() {
  return sumaPerPersona(Object.values(carrega()).flat());
}
