// Tipus de canvi amb base euro (open.er-api.com), per convertir despeses a €.
const KEY = "vacances-rates-v1";
const FALLBACK = { JPY: 170, USD: 1.08, EUR: 1 }; // 1 € = X
const SYM = { "¥": "JPY", "$": "USD", "€": "EUR", JPY: "JPY", USD: "USD", EUR: "EUR" };

export function getRates() {
  try {
    const c = JSON.parse(localStorage.getItem(KEY));
    if (c && c.rates) return { ...c.rates, EUR: 1 };
  } catch (_) {}
  return { ...FALLBACK };
}

export async function refreshRates() {
  try {
    const r = await fetch("https://open.er-api.com/v6/latest/EUR");
    if (!r.ok) throw new Error();
    const d = await r.json();
    if (!d.rates || !d.rates.JPY) throw new Error();
    const rates = { JPY: d.rates.JPY, USD: d.rates.USD, EUR: 1 };
    const date = d.time_last_update_utc
      ? new Date(d.time_last_update_utc).toISOString().slice(0, 10)
      : null;
    try { localStorage.setItem(KEY, JSON.stringify({ rates, date })); } catch (_) {}
    return rates;
  } catch (_) {
    return getRates();
  }
}

// Converteix un import d'una moneda (¥/$/€) a euros.
export function aEuros(amount, cur) {
  const r = getRates();
  const code = SYM[cur] || "EUR";
  if (code === "EUR") return amount;
  const per = r[code] || FALLBACK[code] || 1; // 1 € = per <code>
  return amount / per;
}

// Suma a euros un objecte de totals { "¥": x, "$": y, "€": z }.
export function eurosDeTotals(totals) {
  return Object.entries(totals).reduce((s, [cur, v]) => s + aEuros(v, cur), 0);
}
