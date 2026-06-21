// Integració amb Open-Meteo (gratuït, sense API key) + cache offline.
import { localitzacionsUniques } from "./itinerary.js";

const CACHE_KEY = "vacances-temps-cache-v1";
const API = "https://api.open-meteo.com/v1/forecast";

const HOURLY = [
  "temperature_2m",
  "apparent_temperature",
  "precipitation_probability",
  "precipitation",
  "weather_code",
  "wind_speed_10m",
  "relative_humidity_2m",
  "uv_index",
];
const DAILY = [
  "weather_code",
  "temperature_2m_max",
  "temperature_2m_min",
  "apparent_temperature_max",
  "apparent_temperature_min",
  "precipitation_probability_max",
  "precipitation_sum",
  "uv_index_max",
  "wind_speed_10m_max",
];

// Descarrega la previsió de totes les localitzacions en una sola crida.
// Open-Meteo accepta latituds/longituds separades per comes i retorna un array.
export async function carregarTemps() {
  const llocs = localitzacionsUniques();
  const lats = llocs.map((l) => l.lat).join(",");
  const lons = llocs.map((l) => l.lon).join(",");
  const url =
    `${API}?latitude=${lats}&longitude=${lons}` +
    `&hourly=${HOURLY.join(",")}` +
    `&daily=${DAILY.join(",")}` +
    `&timezone=auto&forecast_days=16`;

  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    let dades = await resp.json();
    // Amb una sola coordenada l'API retorna un objecte; normalitzem a array.
    if (!Array.isArray(dades)) dades = [dades];

    const perLloc = {};
    llocs.forEach((l, i) => {
      perLloc[l.clau] = dades[i];
    });

    const paquet = { ts: Date.now(), perLloc };
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(paquet));
    } catch (_) {}
    return { ...paquet, offline: false };
  } catch (err) {
    // Sense xarxa: fem servir l'última còpia desada.
    const cru = localStorage.getItem(CACHE_KEY);
    if (cru) {
      const paquet = JSON.parse(cru);
      return { ...paquet, offline: true };
    }
    throw err;
  }
}

// Extreu el resum diari d'una localització per a una data concreta (YYYY-MM-DD).
export function diaPerData(dadesLloc, data) {
  if (!dadesLloc || !dadesLloc.daily) return null;
  const i = dadesLloc.daily.time.indexOf(data);
  if (i === -1) return null; // fora de la finestra de previsió
  const d = dadesLloc.daily;
  return {
    code: d.weather_code[i],
    tmax: d.temperature_2m_max[i],
    tmin: d.temperature_2m_min[i],
    stmax: d.apparent_temperature_max[i],
    stmin: d.apparent_temperature_min[i],
    pluja_prob: d.precipitation_probability_max[i],
    pluja_mm: d.precipitation_sum[i],
    uv: d.uv_index_max[i],
    vent: d.wind_speed_10m_max[i],
  };
}

// Extreu les hores d'una localització per a una data concreta.
export function horesPerData(dadesLloc, data) {
  if (!dadesLloc || !dadesLloc.hourly) return [];
  const h = dadesLloc.hourly;
  const out = [];
  h.time.forEach((t, i) => {
    if (!t.startsWith(data)) return;
    out.push({
      hora: t.slice(11, 16),
      temp: h.temperature_2m[i],
      sens: h.apparent_temperature[i],
      pluja_prob: h.precipitation_probability[i],
      pluja_mm: h.precipitation[i],
      code: h.weather_code[i],
      vent: h.wind_speed_10m[i],
      humitat: h.relative_humidity_2m[i],
      uv: h.uv_index[i],
    });
  });
  return out;
}

// Mapatge de codis WMO → [glyph, to (cel), descripció].
// "to" agrupa la condició per pintar el panell-cel: clar | ennuvolat | pluja | tempesta | boira | neu
const WMO = {
  0:  ["sun",     "clar",      "Cel serè"],
  1:  ["partly",  "clar",      "Majoritàriament serè"],
  2:  ["partly",  "ennuvolat", "Parcialment ennuvolat"],
  3:  ["cloud",   "ennuvolat", "Ennuvolat"],
  45: ["fog",     "boira",     "Boira"],
  48: ["fog",     "boira",     "Boira amb gebre"],
  51: ["drizzle", "pluja",     "Plugim feble"],
  53: ["drizzle", "pluja",     "Plugim moderat"],
  55: ["drizzle", "pluja",     "Plugim intens"],
  56: ["drizzle", "pluja",     "Plugim gelat"],
  57: ["drizzle", "pluja",     "Plugim gelat intens"],
  61: ["rain",    "pluja",     "Pluja feble"],
  63: ["rain",    "pluja",     "Pluja moderada"],
  65: ["rain",    "pluja",     "Pluja forta"],
  66: ["rain",    "pluja",     "Pluja gelada"],
  67: ["rain",    "pluja",     "Pluja gelada forta"],
  71: ["snow",    "neu",       "Neu feble"],
  73: ["snow",    "neu",       "Neu moderada"],
  75: ["snow",    "neu",       "Neu forta"],
  77: ["snow",    "neu",       "Grans de neu"],
  80: ["showers", "pluja",     "Ruixats febles"],
  81: ["showers", "pluja",     "Ruixats moderats"],
  82: ["storm",   "tempesta",  "Ruixats forts"],
  85: ["snow",    "neu",       "Ruixats de neu"],
  86: ["snow",    "neu",       "Ruixats de neu forts"],
  95: ["storm",   "tempesta",  "Tempesta"],
  96: ["storm",   "tempesta",  "Tempesta amb calamarsa"],
  99: ["storm",   "tempesta",  "Tempesta forta"],
};

export function descriuCodi(code) {
  const x = WMO[code] || ["cloud", "ennuvolat", "—"];
  return { key: x[0], to: x[1], text: x[2] };
}

// ---- Icones SVG fetes a mida (estil de línia coherent) ----
const GLYPHS = {
  sun:
    '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  partly:
    '<path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M20 12h2"/><path d="m19.07 4.93-1.41 1.41"/><path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"/><path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"/>',
  cloud:
    '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>',
  fog:
    '<path d="M4 14.9A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.24"/><path d="M16 17H7"/><path d="M17 21H9"/>',
  drizzle:
    '<path d="M4 14.9A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.24"/><path d="M8 19v1"/><path d="M8 14v1"/><path d="M16 19v1"/><path d="M16 14v1"/><path d="M12 21v1"/><path d="M12 16v1"/>',
  rain:
    '<path d="M4 14.9A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.24"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/>',
  showers:
    '<path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M20 12h2"/><path d="m19.07 4.93-1.41 1.41"/><path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"/><path d="M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24"/><path d="M11 20v2"/><path d="M7 19v2"/>',
  storm:
    '<path d="M6 16.3A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.97"/><path d="m13 12-3 5h4l-3 5"/>',
  snow:
    '<path d="M4 14.9A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.24"/><path d="M8 15h.01"/><path d="M8 19h.01"/><path d="M12 17h.01"/><path d="M12 21h.01"/><path d="M16 15h.01"/><path d="M16 19h.01"/>',
  // icones d'interfície
  plane:
    '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2Z"/>',
  drop:
    '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7Z"/>',
  thermo:
    '<path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>',
  wind:
    '<path d="M12.8 19.6A2 2 0 1 0 14 16H2"/><path d="M17.5 8a2.5 2.5 0 1 1 2 4H2"/><path d="M9.8 4.4A2 2 0 1 1 11 8H2"/>',
  check:
    '<path d="M20 6 9 17l-5-5"/>',
};

export function iconaSVG(key, cls = "") {
  const g = GLYPHS[key] || GLYPHS.cloud;
  return (
    `<svg class="ico ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" ` +
    `stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${g}</svg>`
  );
}

// Classe del panell-cel segons la condició i la localització.
export function classePanell(to, loc) {
  if (loc === "maldives") {
    if (to === "pluja" || to === "tempesta") return "tropical-pluja";
    return "tropical";
  }
  return to;
}
