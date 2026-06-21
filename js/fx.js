// Calculadora ¥ / € — tipus de canvi (open.er-api.com), amb desat offline.
const FX_KEY = "vacances-fx-v1";
const FALLBACK = 0.0057; // € per ¥ aproximat (~175 ¥/€) si no hi ha xarxa ni cache

async function obtenirTaxa() {
  try {
    const r = await fetch("https://open.er-api.com/v6/latest/JPY");
    if (!r.ok) throw new Error();
    const d = await r.json();
    if (!d.rates || !d.rates.EUR) throw new Error();
    const date = d.time_last_update_utc
      ? new Date(d.time_last_update_utc).toISOString().slice(0, 10)
      : null;
    const paquet = { rate: d.rates.EUR, date, ts: Date.now() };
    try { localStorage.setItem(FX_KEY, JSON.stringify(paquet)); } catch (_) {}
    return { ...paquet, offline: false };
  } catch (_) {
    const cru = localStorage.getItem(FX_KEY);
    if (cru) return { ...JSON.parse(cru), offline: true };
    return { rate: FALLBACK, date: null, offline: true, aprox: true };
  }
}

export function initFX() {
  const modal = document.getElementById("fx-modal");
  const btn = document.getElementById("fx-btn");
  const jpy = document.getElementById("fx-jpy");
  const eur = document.getElementById("fx-eur");
  const info = document.getElementById("fx-rate");
  if (!modal || !btn) return;

  let taxa = null;

  function pintaInfo() {
    if (!taxa) return;
    const perEuro = Math.round(1 / taxa.rate);
    let txt = `1 € ≈ ${perEuro} ¥`;
    if (taxa.aprox) txt += " · aproximat (sense connexió)";
    else if (taxa.offline) txt += ` · ${taxa.date} (desat)`;
    else txt += ` · actualitzat ${taxa.date}`;
    info.textContent = txt;
  }

  async function asseguraTaxa() {
    if (taxa && !taxa.offline) return;
    taxa = await obtenirTaxa();
    pintaInfo();
  }

  function obre() {
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    asseguraTaxa();
    setTimeout(() => jpy.focus(), 50);
  }
  function tanca() {
    modal.hidden = true;
    document.body.style.overflow = "";
  }

  btn.addEventListener("click", obre);
  modal.addEventListener("click", (e) => {
    if (e.target.hasAttribute("data-close")) tanca();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) tanca();
  });

  jpy.addEventListener("input", () => {
    if (!taxa) return;
    const v = parseFloat(jpy.value);
    eur.value = Number.isFinite(v) ? (v * taxa.rate).toFixed(2) : "";
  });
  eur.addEventListener("input", () => {
    if (!taxa) return;
    const v = parseFloat(eur.value);
    jpy.value = Number.isFinite(v) ? Math.round(v / taxa.rate) : "";
  });
}
