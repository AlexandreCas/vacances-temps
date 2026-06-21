// Itinerari del viatge Japó + Maldives (23 jun – 12 jul 2026)
// Cada dia s'associa a una ubicació (per al temps) i a un pla d'activitats.

export const LOCATIONS = {
  kyoto:     { nom: "Kyoto",                lat: 34.9858, lon: 135.7588, tz: "Asia/Tokyo" },
  hiroshima: { nom: "Hiroshima",            lat: 34.3975, lon: 132.4754, tz: "Asia/Tokyo" },
  koyasan:   { nom: "Koyasan (Mont Koya)",  lat: 34.2131, lon: 135.5847, tz: "Asia/Tokyo",
               nota: "Muntanya (~800 m): les nits hi són força més fresques." },
  osaka:     { nom: "Osaka (Namba)",        lat: 34.6655, lon: 135.5028, tz: "Asia/Tokyo" },
  kanazawa:  { nom: "Kanazawa",             lat: 36.5786, lon: 136.6489, tz: "Asia/Tokyo" },
  takayama:  { nom: "Takayama (Hida)",      lat: 36.1408, lon: 137.2520, tz: "Asia/Tokyo",
               nota: "Vall de muntanya (~570 m): vespres frescos." },
  tokyo:     { nom: "Tòquio (Odaiba)",      lat: 35.6297, lon: 139.7766, tz: "Asia/Tokyo" },
  maldives:  { nom: "Maldives (Kaafu)",     lat: 4.5,     lon: 73.55,    tz: "Indian/Maldives",
               nota: "Tròpic: sol intens (UV molt alt) i possibles ruixats curts." },
};

// pla[].t (tipus): vol | tren | visita | apat | lliure | logistica | bugaderia | nit | allotjament
export const DAYS = [
  {
    date: "2026-06-23", loc: "kyoto", hotel: "Vol d'arribada a Japó", type: "viatge",
    pla: [
      { t: "logistica", txt: "Sigues a la T1 de Barcelona 3 h abans (enlairament 10:45h)." },
      { t: "vol", txt: "Vol EY112 d'Etihad cap a Abu Dhabi. Nit a bord cap a Àsia." },
    ],
  },
  {
    date: "2026-06-24", loc: "kyoto", hotel: "Kyoto Century Hotel", type: "estada",
    pla: [
      { t: "vol", txt: "Aterratge a Osaka (KIX) 11:50h, tràmits i trasllat al Kyoto Century Hotel." },
      { t: "lliure", txt: "Tarda lliure: Yodobashi Camera (papereria, figures, gachapons), a 5 min." },
      { t: "apat", txt: "Sopar: katsu arrebossat al Katsukura (Plaça Porta, planta 11)." },
      { t: "nit", txt: "Parada al konbini (Lawson / 7-Eleven): mochi, Pocky i Ramune." },
    ],
  },
  {
    date: "2026-06-25", loc: "kyoto", hotel: "Kyoto Century Hotel", type: "estada",
    pla: [
      { t: "visita", txt: "Visita guiada: Sanjusangen-do, Castell de Nijo, Kinkakuji i Arashiyama." },
      { t: "lliure", txt: "Tarda: Mercat de Nishiki (Tako Tamago) i galeries Teramachi (Purikura)." },
      { t: "apat", txt: "Sopar: Chao Chao Gyoza o Musashi Sushi (kaiten); alternativa fàcil a l'Aeon Mall." },
    ],
  },
  {
    date: "2026-06-26", loc: "kyoto", hotel: "Kyoto Century Hotel", type: "estada",
    pla: [
      { t: "visita", txt: "Nara: cérvols i Gran Buda de Todaiji; després Fushimi Inari (toriis vermells)." },
      { t: "lliure", txt: "Tarda: Kiyomizu-dera i carrerons Sannenzaka/Ninenzaka; botiga Ghibli Donguri Kyowakoku." },
      { t: "apat", txt: "Sopar: teppanyaki a Itoh Dining." },
    ],
  },
  {
    date: "2026-06-27", loc: "hiroshima", hotel: "Hotel Granvia Hiroshima", type: "estada",
    pla: [
      { t: "logistica", txt: "⚠️ Les maletes grans van a Hiroshima per courier — fes motxilla per 1 nit." },
      { t: "tren", txt: "Tren Hikari cap a Himeji (castell blanc, porta mitjons!) i Kurashiki." },
      { t: "allotjament", txt: "Arribada al Granvia Hiroshima." },
      { t: "apat", txt: "Sopar: okonomiyaki a ekie DINING (Reichan o Micchan), a l'estació." },
    ],
  },
  {
    date: "2026-06-28", loc: "hiroshima", hotel: "Hotel Granvia Hiroshima", type: "estada",
    pla: [
      { t: "visita", txt: "Parc de la Pau d'Hiroshima i ferri a l'illa de Miyajima." },
      { t: "apat", txt: "Dinar a l'illa: Momiji Manju i anguila Anago-meshi (Fujitaya)." },
      { t: "nit", txt: "Tornada a l'hotel d'Hiroshima." },
    ],
  },
  {
    date: "2026-06-29", loc: "koyasan", hotel: "Sekisho-in Temple", type: "estada",
    pla: [
      { t: "logistica", txt: "⚠️ Segon enviament de maletes (Hiroshima → Osaka) — bossa de mà per 2 nits." },
      { t: "tren", txt: "Tren Nozomi fins a Shin-Osaka i autocar cap a Koyasan." },
      { t: "visita", txt: "Cementiri d'Okunoin." },
      { t: "allotjament", txt: "Nit i sopar al monestir budista Sekisho-in." },
    ],
  },
  {
    date: "2026-06-30", loc: "kyoto", hotel: "Fujiya Ryokan (Kyoto)", type: "estada",
    pla: [
      { t: "visita", txt: "Cants dels monjos al matí." },
      { t: "visita", txt: "Kumano Kodo (passeig d'1 h pel bosc) i santuari Kumano Hongu Taisha." },
      { t: "allotjament", txt: "Onsen i sopar japonès al Fujiya Ryokan." },
    ],
  },
  {
    date: "2026-07-01", loc: "osaka", hotel: "Citadines Namba Osaka", type: "estada",
    pla: [
      { t: "tren", txt: "Trasllat a Osaka: Observatori Umeda Sky i neons de Dotonbori." },
      { t: "allotjament", txt: "Check-in al Citadines Namba Osaka." },
      { t: "bugaderia", txt: "🧺 Bugaderia (I): renta roba a l'apartahotel mentre descanseu." },
      { t: "lliure", txt: "Tarda/nit: Mercat Kuromon o ambient del temple Aizen-do (Aizen Matsuri)." },
    ],
  },
  {
    date: "2026-07-02", loc: "kanazawa", hotel: "Kanazawa Tokyu Hotel", type: "estada",
    pla: [
      { t: "logistica", txt: "⚠️ Últim enviament de maletes (Osaka → Tòquio) — bossa per 2 nits." },
      { t: "tren", txt: "Tren Thunderbird a Kanazawa." },
      { t: "visita", txt: "Jardins Kenroku-en, barri de geishes, barri samurai Nagamachi i Museu d'Art del s.XXI." },
      { t: "apat", txt: "Sopar: Curry no Champion (curry fosc) o Hachiban Ramen. Gelat amb Pa d'Or!" },
      { t: "allotjament", txt: "Nit al Kanazawa Tokyu Hotel." },
    ],
  },
  {
    date: "2026-07-03", loc: "takayama", hotel: "Tokyu Stay Hida Takayama", type: "estada",
    pla: [
      { t: "visita", txt: "Vall de Shirakawago (cases Gassho-zukuri) i carrers tradicionals de Takayama." },
      { t: "allotjament", txt: "Check-in al Tokyu Stay Hida Takayama Musubi no Yu." },
      { t: "bugaderia", txt: "🧺 Bugaderia (II): rentadora a l'habitació — renta la roba d'estiu abans de les platges." },
      { t: "lliure", txt: "Tarda: sushi de vedella de Hida i amulet Sarubobo; cuques de llum vora el riu Miyagawa al vespre." },
    ],
  },
  {
    date: "2026-07-04", loc: "tokyo", hotel: "Grand Nikko Tokyo Daiba", type: "estada",
    pla: [
      { t: "tren", txt: "Autocar a Nagoya i tren Hikari a Odawara; Parc Fuji-Hakone (creuer i telefèric)." },
      { t: "allotjament", txt: "Check-in al Grand Nikko Tokyo Daiba." },
      { t: "lliure", txt: "Odaiba: Gundam gegant a DiverCity i rèplica de l'Estàtua de la Llibertat." },
      { t: "apat", txt: "Sopar: ramen a Ramen Kokugikan (Aqua City)." },
    ],
  },
  {
    date: "2026-07-05", loc: "tokyo", hotel: "Grand Nikko Tokyo Daiba", type: "estada",
    pla: [
      { t: "visita", txt: "Torre de Tòquio i temple Asakusa Kannon." },
      { t: "lliure", txt: "Tarda: Harajuku (carrer Takeshita, Kiddy Land a Omotesando) i encreuament de Shibuya." },
      { t: "apat", txt: "Sopar: brou personalitzat a Ichiran Ramen." },
    ],
  },
  {
    date: "2026-07-06", loc: "tokyo", hotel: "Grand Nikko Tokyo Daiba", type: "estada",
    pla: [
      { t: "lliure", txt: "Dia lliure — anime i màgia." },
      { t: "visita", txt: "Studio Tour de Harry Potter (Nerima, 4-5 h, interior i fresc)." },
      { t: "lliure", txt: "Ikebukuro: Sunshine City, Pokémon Center i sales de gashapon." },
    ],
  },
  {
    date: "2026-07-07", loc: "maldives", hotel: "Vol Tòquio → Maldives", type: "viatge",
    pla: [
      { t: "lliure", txt: "Matí a Odaiba: compres al Daiso i botigues retro. Demana el late check-out." },
      { t: "vol", txt: "Vespre: recollida cap a Haneda; vol AirAsia D7 523 a les 23:50h." },
    ],
  },
  {
    date: "2026-07-08", loc: "maldives", hotel: "Joy Island (Cocoon)", type: "estada",
    pla: [
      { t: "vol", txt: "Escala a Kuala Lumpur (2h25m, Kaya Toast). Arribada a Malé 09:50h." },
      { t: "allotjament", txt: "Speedboat del Joy Island fins a la vil·la de platja (tot inclòs)." },
      { t: "logistica", txt: "💰 Propines: porta 50-80 USD en bitllets nous d'1$ i 5$ (2-5$/dia)." },
    ],
  },
  {
    date: "2026-07-09", loc: "maldives", hotel: "Joy Island (Cocoon)", type: "estada",
    pla: [
      { t: "lliure", txt: "Sense horaris: paddle surf i snorkel (peixos pallasso des de la riba)." },
      { t: "nit", txt: "Cinema a l'aire lliure sota les estrelles." },
    ],
  },
  {
    date: "2026-07-10", loc: "maldives", hotel: "Joy Island (Cocoon)", type: "estada",
    pla: [
      { t: "lliure", txt: "Dia de platja i aigua: snorkel, paddle surf i descans." },
      { t: "nit", txt: "Cinema a l'aire lliure." },
    ],
  },
  {
    date: "2026-07-11", loc: "maldives", hotel: "Vol de tornada", type: "viatge",
    pla: [
      { t: "logistica", txt: "Check-out de la vil·la al migdia; piscines i ombres fins al capvespre." },
      { t: "vol", txt: "Llanxa a Malé i vol nocturn EY377 cap a Abu Dhabi a les 21:25h." },
    ],
  },
  {
    date: "2026-07-12", loc: "maldives", hotel: "Vol de tornada", type: "viatge",
    pla: [
      { t: "vol", txt: "Connexió i arribada a Barcelona a les 07:35h. Fi de l'aventura!" },
    ],
  },
];

// Llista única de localitzacions presents a l'itinerari (per a les crides al temps).
export function localitzacionsUniques() {
  const claus = [...new Set(DAYS.map((d) => d.loc))];
  return claus.map((clau) => ({ clau, ...LOCATIONS[clau] }));
}
