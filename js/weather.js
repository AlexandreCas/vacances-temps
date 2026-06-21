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

// Mapatge de codis WMO → icona (emoji) + descripció en català.
const WMO = {
  0:  ["☀️", "Cel serè"],
  1:  ["🌤️", "Majoritàriament serè"],
  2:  ["⛅", "Parcialment ennuvolat"],
  3:  ["☁️", "Ennuvolat"],
  45: ["🌫️", "Boira"],
  48: ["🌫️", "Boira amb gebre"],
  51: ["🌦️", "Plugim feble"],
  53: ["🌦️", "Plugim moderat"],
  55: ["🌧️", "Plugim intens"],
  56: ["🌧️", "Plugim gelat"],
  57: ["🌧️", "Plugim gelat intens"],
  61: ["🌦️", "Pluja feble"],
  63: ["🌧️", "Pluja moderada"],
  65: ["🌧️", "Pluja forta"],
  66: ["🌧️", "Pluja gelada"],
  67: ["🌧️", "Pluja gelada forta"],
  71: ["🌨️", "Neu feble"],
  73: ["🌨️", "Neu moderada"],
  75: ["❄️", "Neu forta"],
  77: ["🌨️", "Grans de neu"],
  80: ["🌦️", "Ruixats febles"],
  81: ["🌧️", "Ruixats moderats"],
  82: ["⛈️", "Ruixats forts"],
  85: ["🌨️", "Ruixats de neu"],
  86: ["❄️", "Ruixats de neu forts"],
  95: ["⛈️", "Tempesta"],
  96: ["⛈️", "Tempesta amb calamarsa"],
  99: ["⛈️", "Tempesta forta amb calamarsa"],
};

export function descriuCodi(code) {
  const x = WMO[code] || ["❓", "—"];
  return { icona: x[0], text: x[1] };
}
