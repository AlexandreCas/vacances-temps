// Itinerari del viatge Japó + Maldives (23 jun – 12 jul 2026)
// Cada dia s'associa a una ubicació per poder mostrar-ne el temps.

export const LOCATIONS = {
  kyoto: {
    nom: "Kyoto",
    lat: 34.9858,
    lon: 135.7588,
    tz: "Asia/Tokyo",
  },
  hiroshima: {
    nom: "Hiroshima",
    lat: 34.3975,
    lon: 132.4754,
    tz: "Asia/Tokyo",
  },
  koyasan: {
    nom: "Koyasan (Mont Koya)",
    lat: 34.2131,
    lon: 135.5847,
    tz: "Asia/Tokyo",
    nota: "Muntanya (~800 m): les nits hi són força més fresques.",
  },
  osaka: {
    nom: "Osaka (Namba)",
    lat: 34.6655,
    lon: 135.5028,
    tz: "Asia/Tokyo",
  },
  kanazawa: {
    nom: "Kanazawa",
    lat: 36.5786,
    lon: 136.6489,
    tz: "Asia/Tokyo",
  },
  tokyo: {
    nom: "Tòquio (Odaiba)",
    lat: 35.6297,
    lon: 139.7766,
    tz: "Asia/Tokyo",
  },
  maldives: {
    nom: "Maldives (Kaafu)",
    lat: 4.5,
    lon: 73.55,
    tz: "Indian/Maldives",
    nota: "Tròpic: sol intens i possibles ruixats curts.",
  },
};

// type: "estada" (nit a l'hotel) | "viatge" (dia de vol / trànsit)
export const DAYS = [
  { date: "2026-06-23", loc: "kyoto",     hotel: "Vol d'arribada a Japó", type: "viatge" },
  { date: "2026-06-24", loc: "kyoto",     hotel: "Kyoto Century Hotel",   type: "estada" },
  { date: "2026-06-25", loc: "kyoto",     hotel: "Kyoto Century Hotel",   type: "estada" },
  { date: "2026-06-26", loc: "kyoto",     hotel: "Kyoto Century Hotel",   type: "estada" },
  { date: "2026-06-27", loc: "hiroshima", hotel: "Hotel Granvia Hiroshima", type: "estada" },
  { date: "2026-06-28", loc: "hiroshima", hotel: "Hotel Granvia Hiroshima", type: "estada" },
  { date: "2026-06-29", loc: "koyasan",   hotel: "Sekisho-in Temple",     type: "estada" },
  { date: "2026-06-30", loc: "kyoto",     hotel: "Fujiya Ryokan (Kyoto)", type: "estada" },
  { date: "2026-07-01", loc: "osaka",     hotel: "Citadines Namba Osaka", type: "estada" },
  { date: "2026-07-02", loc: "kanazawa",  hotel: "Kanazawa Tokyu Hotel",  type: "estada" },
  { date: "2026-07-03", loc: "kanazawa",  hotel: "Kanazawa Tokyu Hotel",  type: "estada" },
  { date: "2026-07-04", loc: "tokyo",     hotel: "Grand Nikko Tokyo Daiba", type: "estada" },
  { date: "2026-07-05", loc: "tokyo",     hotel: "Grand Nikko Tokyo Daiba", type: "estada" },
  { date: "2026-07-06", loc: "tokyo",     hotel: "Grand Nikko Tokyo Daiba", type: "estada" },
  { date: "2026-07-07", loc: "maldives",  hotel: "Vol Tòquio → Maldives",  type: "viatge" },
  { date: "2026-07-08", loc: "maldives",  hotel: "Joy Island (Cocoon)",   type: "estada" },
  { date: "2026-07-09", loc: "maldives",  hotel: "Joy Island (Cocoon)",   type: "estada" },
  { date: "2026-07-10", loc: "maldives",  hotel: "Joy Island (Cocoon)",   type: "estada" },
  { date: "2026-07-11", loc: "maldives",  hotel: "Vol de tornada",        type: "viatge" },
  { date: "2026-07-12", loc: "maldives",  hotel: "Vol de tornada",        type: "viatge" },
];

// Llista única de localitzacions presents a l'itinerari (per a les crides al temps).
export function localitzacionsUniques() {
  const claus = [...new Set(DAYS.map((d) => d.loc))];
  return claus.map((clau) => ({ clau, ...LOCATIONS[clau] }));
}
