// Itinerari del viatge Japó + Maldives (23 jun – 12 jul 2026)
// Cada dia s'associa a una ubicació (per al temps) i a un pla d'activitats.

export const LOCATIONS = {
  abudhabi:  { nom: "Abu Dhabi",            lat: 24.4539, lon: 54.3773,  tz: "Asia/Dubai",
               nota: "Desert: calor extrema i sol molt fort (escala del vol)." },
  kyoto:     { nom: "Kyoto",                lat: 34.9858, lon: 135.7588, tz: "Asia/Tokyo" },
  hiroshima: { nom: "Hiroshima",            lat: 34.3975, lon: 132.4754, tz: "Asia/Tokyo" },
  koyasan:   { nom: "Koyasan (Mont Koya)",  lat: 34.2131, lon: 135.5847, tz: "Asia/Tokyo",
               nota: "Muntanya (~800 m): les nits hi són força més fresques." },
  kawayu:    { nom: "Kawayu Onsen",          lat: 33.8400, lon: 135.7750, tz: "Asia/Tokyo",
               nota: "Termes de muntanya (Kumano): vespres frescos vora el riu." },
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
    date: "2026-06-23", loc: "abudhabi", hotel: "Vol BCN → Abu Dhabi", type: "viatge",
    pla: [
      { t: "logistica", txt: "Sigues a la T1 de Barcelona 3 h abans (enlairament 10:45h)." },
      { t: "vol", txt: "Vol EY112 d'Etihad cap a Abu Dhabi. Nit a bord cap a Àsia." },
    ],
  },
  {
    date: "2026-06-24", loc: "kyoto", hotel: "Kyoto Century Hotel", type: "estada",
    pla: [
      { t: "vol", inc: true, txt: "Aterratge a Osaka (KIX) 11:50h; tràmits, assistència en castellà i trasllat al Kyoto Century Hotel." },
      { t: "lliure", inc: false, txt: "Tarda lliure: Yodobashi Camera (papereria, figures, gachapons), a 5 min." },
      { t: "apat", inc: false, txt: "Sopar: katsu arrebossat al Katsukura (Plaça Porta, planta 11)." },
      { t: "nit", inc: false, txt: "Parada al konbini (Lawson / 7-Eleven): mochi, Pocky i Ramune." },
    ],
  },
  {
    date: "2026-06-25", loc: "kyoto", hotel: "Kyoto Century Hotel", type: "estada",
    pla: [
      { t: "apat", inc: true, txt: "Esmorzar a l'hotel" },
      { t: "visita", inc: true, txt: "Visita guiada (guia en castellà): Sanjusangen-do, Castell de Nijo, Kinkakuji (Pavelló Daurat), jardí del temple Tenryuji i bosc de bambú d'Arashiyama" },
      { t: "apat", inc: true, txt: "Dinar en un restaurant local" },
      { t: "lliure", inc: false, txt: "Tarda lliure: Mercat de Nishiki (Tako Tamago) i galeries Teramachi (Purikura)." },
      { t: "apat", inc: false, txt: "Sopar: Chao Chao Gyoza o Musashi Sushi (kaiten); alternativa fàcil a l'Aeon Mall." },
    ],
  },
  {
    date: "2026-06-26", loc: "kyoto", hotel: "Kyoto Century Hotel", type: "estada",
    pla: [
      { t: "apat", inc: true, txt: "Esmorzar a l'hotel" },
      { t: "visita", inc: true, txt: "Visita guiada de mig dia (castellà): temple Todaiji (gran Buda) i Parc dels cérvols de Nara; santuari Fushimi Inari (toriis) de camí a Kioto" },
      { t: "lliure", inc: false, txt: "Tarda lliure: Kiyomizu-dera i carrerons Sannenzaka/Ninenzaka; botiga Ghibli Donguri Kyowakoku." },
      { t: "apat", inc: false, txt: "Sopar: teppanyaki a Itoh Dining." },
    ],
  },
  {
    date: "2026-06-27", loc: "hiroshima", hotel: "Hotel Granvia Hiroshima", type: "estada",
    pla: [
      { t: "logistica", txt: "⚠️ Les maletes van a Hiroshima per courier (arriben l'endemà). Prepara equipatge de mà ≤10 kg per persona per a 1 nit." },
      { t: "apat", inc: true, txt: "Esmorzar a l'hotel" },
      { t: "tren", inc: true, txt: "Trasllat a l'estació i tren bala Hikari cap a Himeji" },
      { t: "visita", inc: true, txt: "Castell de Himeji (Patrimoni de la Humanitat). Porta mitjons per pujar a la torre; pot haver-hi cues (si no es pot pujar, s'afegeix el Castell d'Osaka el dia 9)." },
      { t: "apat", inc: true, txt: "Dinar en un restaurant local (Kurashiki)" },
      { t: "visita", inc: true, txt: "Tarda a Kurashiki: residència de la família Ohashi i barri històric de Bikan; després cap a Hiroshima i trasllat a l'hotel" },
      { t: "apat", inc: false, txt: "Sopar: okonomiyaki a ekie DINING (Reichan o Micchan), a l'estació." },
    ],
  },
  {
    date: "2026-06-28", loc: "hiroshima", hotel: "Hotel Granvia Hiroshima", type: "estada",
    pla: [
      { t: "apat", inc: true, txt: "Esmorzar a l'hotel" },
      { t: "visita", inc: true, txt: "Visita de dia complet (castellà): Parc de la Pau i museu, Cúpula de la Bomba Atòmica, i santuari Itsukushima a Miyajima (el torii al mar)" },
      { t: "apat", inc: false, txt: "Dinar a l'illa: Momiji Manju i anguila Anago-meshi (Fujitaya)." },
    ],
  },
  {
    date: "2026-06-29", loc: "koyasan", hotel: "Sekisho-in Temple", type: "estada",
    pla: [
      { t: "logistica", txt: "⚠️ Les maletes van directament a Osaka. Prepara equipatge de mà ≤10 kg per persona per a 2 nits (Koyasan i Kawayu Onsen)." },
      { t: "apat", inc: true, txt: "Esmorzar a l'hotel" },
      { t: "tren", inc: true, txt: "Trasllat a l'estació i tren bala Nozomi fins a Shin-Osaka; després cap a Koyasan per carretera" },
      { t: "apat", inc: true, txt: "Dinar en un restaurant local" },
      { t: "visita", inc: true, txt: "Visita guiada de Koyasan (castellà): temple Kongobuji, Danjo Garan i mausoleu d'Okunoin" },
      { t: "allotjament", inc: true, txt: "Trasllat al shukubo (monestir Sekisho-in); sopar vegetarià i nit" },
    ],
  },
  {
    date: "2026-06-30", loc: "kawayu", hotel: "Fujiya Ryokan (Kawayu Onsen)", type: "estada",
    pla: [
      { t: "visita", inc: true, txt: "Serveis religiosos del temple a primera hora del matí (opcional de participar-hi)" },
      { t: "apat", inc: true, txt: "Esmorzar típic japonès vegetarià al shukubo" },
      { t: "visita", inc: true, txt: "Cap a Kumano amb guia (castellà) i recorregut pel Kumano Kodo (~60 min, 4 km, Patrimoni UNESCO)" },
      { t: "apat", inc: true, txt: "Dinar en un restaurant local a Kumano" },
      { t: "visita", inc: true, txt: "Santuari de Kumano Hongu Taisha i Oyunohara" },
      { t: "allotjament", inc: true, txt: "Trasllat al Fujiya Ryokan, sopar i onsen (aigües termals); habitació japonesa amb futon" },
    ],
  },
  {
    date: "2026-07-01", loc: "osaka", hotel: "Citadines Namba Osaka", type: "estada",
    pla: [
      { t: "apat", inc: true, txt: "Esmorzar al ryokan" },
      { t: "tren", inc: true, txt: "Sortida de Kawayu Onsen cap a Osaka en autocar" },
      { t: "visita", inc: true, txt: "Visita d'Osaka: observatori Umeda Sky (Jardí Flotant) i barri de Dotonbori; després check-in a l'hotel" },
      { t: "bugaderia", txt: "🧺 Bugaderia (I): renta roba a l'apartahotel mentre descanseu." },
      { t: "lliure", inc: false, txt: "Tarda/nit lliure: Mercat Kuromon o ambient del temple Aizen-do (Aizen Matsuri)." },
    ],
  },
  {
    date: "2026-07-02", loc: "kanazawa", hotel: "Kanazawa Tokyu Hotel", type: "estada",
    pla: [
      { t: "logistica", txt: "⚠️ Les maletes van directament a Tòquio. Prepara equipatge de mà ≤10 kg per persona per a 2 nits (Kanazawa i Takayama)." },
      { t: "apat", inc: true, txt: "Esmorzar a l'hotel" },
      { t: "tren", inc: true, txt: "Trasllat a l'estació i tren Thunderbird cap a Kanazawa" },
      { t: "visita", inc: true, txt: "Visita guiada de Kanazawa (castellà): jardí Kenroku-en, mercat Oumicho, barri de geishes Higashi Chayagai i barri samurai Nagamachi (residència de la família Nomura)" },
      { t: "allotjament", inc: true, txt: "Trasllat al Kanazawa Tokyu Hotel" },
      { t: "apat", inc: false, txt: "Sopar: Curry no Champion (curry fosc) o Hachiban Ramen. Gelat amb Pa d'Or!" },
    ],
  },
  {
    date: "2026-07-03", loc: "takayama", hotel: "Tokyu Stay Hida Takayama", type: "estada",
    pla: [
      { t: "apat", inc: true, txt: "Esmorzar a l'hotel" },
      { t: "visita", inc: true, txt: "Excursió a Shirakawago (castellà): poble Patrimoni amb cases de Gassho-zukuri" },
      { t: "apat", inc: true, txt: "Dinar en un restaurant local" },
      { t: "visita", inc: true, txt: "Tarda a Takayama: Yatai Kaikan (sala de carrosses festives) i carrer Kami-sannomachi" },
      { t: "allotjament", inc: true, txt: "Trasllat a l'hotel i sopar a l'hotel" },
      { t: "bugaderia", txt: "🧺 Bugaderia (II): rentadora a l'habitació — renta la roba d'estiu abans de les platges." },
      { t: "visita", inc: false, txt: "Onsen (aigües termals) previ pagament. Atenció: no s'admeten tatuatges visibles (consulta opció d'onsen privat)." },
      { t: "lliure", inc: false, txt: "Sushi de vedella de Hida i amulet Sarubobo; cuques de llum vora el riu Miyagawa al vespre." },
    ],
  },
  {
    date: "2026-07-04", loc: "tokyo", hotel: "Grand Nikko Tokyo Daiba", type: "estada",
    pla: [
      { t: "apat", inc: true, txt: "Esmorzar a l'hotel" },
      { t: "tren", inc: true, txt: "Takayama → Nagoya en autocar i tren bala Hikari fins a Odawara; trasllat a Hakone" },
      { t: "apat", inc: true, txt: "Caixa de dinar tipus pícnic" },
      { t: "visita", inc: true, txt: "Parc Nacional de Fuji-Hakone: mini-creuer pel llac Ashi i telefèric (pot variar segons el temps; el Fuji sovint queda tapat a l'estiu)" },
      { t: "allotjament", inc: true, txt: "Cap a Tòquio i trasllat al Grand Nikko Tokyo Daiba" },
      { t: "lliure", inc: false, txt: "Odaiba: Gundam gegant a DiverCity i rèplica de l'Estàtua de la Llibertat." },
      { t: "apat", inc: false, txt: "Sopar: ramen a Ramen Kokugikan (Aqua City)." },
    ],
  },
  {
    date: "2026-07-05", loc: "tokyo", hotel: "Grand Nikko Tokyo Daiba", type: "estada",
    pla: [
      { t: "apat", inc: true, txt: "Esmorzar a l'hotel" },
      { t: "visita", inc: true, txt: "Visita guiada de Tòquio (castellà): Torre de Tòquio, temple Asakusa Kannon i arcada Nakamise, i panoràmica en autobús" },
      { t: "apat", inc: true, txt: "Dinar en un restaurant local (el tour acaba aquí; tornada a l'hotel pel teu compte)" },
      { t: "lliure", inc: false, txt: "Tarda lliure: Harajuku (carrer Takeshita, Kiddy Land a Omotesando) i encreuament de Shibuya." },
      { t: "apat", inc: false, txt: "Sopar: brou personalitzat a Ichiran Ramen." },
    ],
  },
  {
    date: "2026-07-06", loc: "tokyo", hotel: "Grand Nikko Tokyo Daiba", type: "estada",
    pla: [
      { t: "apat", inc: true, txt: "Esmorzar a l'hotel" },
      { t: "lliure", txt: "Dia lliure." },
      { t: "visita", inc: false, txt: "Opcional recomanat pel tour: excursió de dia complet a Nikko amb dinar (Gran Santuari Toshogu i cascada Kegon). Reserva ≥21 dies abans." },
      { t: "visita", inc: false, txt: "La vostra opció: Studio Tour de Harry Potter (Nerima, 4-5 h, interior i fresc)." },
      { t: "lliure", inc: false, txt: "Ikebukuro: Sunshine City, Pokémon Center i sales de gashapon." },
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

// Hotels contractats. Cada hotel cobreix les nits [checkin, checkout).
export const HOTELS = [
  { nom: "Kyoto Century Hotel", ciutat: "Kyoto",
    adreca: "680 Higashi Shiokoji-cho, Shiokoji Sagaru, Higashinotoindori, Shimogyo-ku, Kyoto 600-8216",
    tel: "+81 75 351 0111", web: "http://www.kyoto-centuryhotel.co.jp/",
    checkin: "2026-06-24", checkout: "2026-06-27" },
  { nom: "Granvia Hiroshima", ciutat: "Hiroshima",
    adreca: "1-5 Matsubaracho, Minami-ku, Hiroshima 732-0822",
    tel: "+81 82 262 1111", web: "http://www.hgh.co.jp/english/",
    checkin: "2026-06-27", checkout: "2026-06-29" },
  { nom: "Sekisho-in (habitació japonesa)", ciutat: "Koyasan",
    adreca: "571 Koya-cho, Koyasan, Ito-gun, Wakayama 648-0211",
    tel: "+81 736 56 2734", web: "http://www.sekishoin.jp/",
    checkin: "2026-06-29", checkout: "2026-06-30" },
  { nom: "Fujiya Ryokan (habitació japonesa)", ciutat: "Kawayu Onsen",
    adreca: "1452 Kawayu, Hongu-cho, Tanabe-shi, Wakayama 647-1717",
    tel: "+81 735 42 0007", web: "http://www.fuziya.co.jp/",
    checkin: "2026-06-30", checkout: "2026-07-01" },
  { nom: "Citadines Namba Osaka (Deluxe)", ciutat: "Osaka",
    adreca: "Nihonbashi 3-5-25, Naniwa-ku, Osaka 556-0005",
    tel: "+81 6 6695 7150", web: "https://www.citadines.com/en/japan/osaka/citadines-namba-osaka.html",
    checkin: "2026-07-01", checkout: "2026-07-02" },
  { nom: "Kanazawa Tokyu Hotel", ciutat: "Kanazawa",
    adreca: "2-1-1 Korinbo, Kanazawa-shi, Ishikawa 920-0961",
    tel: "+81 76 231 2411", web: "https://www.tokyuhotelsjapan.com/global/kanazawa-h/index.html",
    checkin: "2026-07-02", checkout: "2026-07-03" },
  { nom: "Tokyu Stay Hida Takayama Musubi no Yu", ciutat: "Takayama, Gifu",
    adreca: "4-301 Hanasato-machi, Takayama-shi, Gifu 506-0026",
    tel: "+81 577 36 1109", web: "https://www.tokyustay.co.jp/e/hotel/HTM/",
    checkin: "2026-07-03", checkout: "2026-07-04" },
  { nom: "Grand Nikko Tokyo Daiba", ciutat: "Tòquio",
    adreca: "2-6-1 Daiba, Minato-ku, Tokyo 135-8701",
    tel: "+81 3 5500 6711", web: "http://www.tokyo.grand-nikko.com/eng/",
    checkin: "2026-07-04", checkout: "2026-07-07" },
  { nom: "Joy Island Maldives by The Cocoon Collection", ciutat: "Maldives",
    adreca: "Kaasfushi, Malé 20026, Maldives",
    checkin: "2026-07-08", checkout: "2026-07-11" },
];

// Retorna l'hotel on es dorm la nit d'una data (o null si és dia de vol/trànsit).
export function hotelPerData(date) {
  return HOTELS.find((h) => date >= h.checkin && date < h.checkout) || null;
}

// Vols per data de sortida. "(+1)" = arriba l'endemà.
export const FLIGHTS = {
  "2026-06-23": {
    segs: [
      { num: "EY112 · Etihad", de: "Barcelona BCN", t1: "T1", surt: "10:45", a: "Abu Dhabi AUH", t2: "Term. A", arr: "19:20", dur: "6h35", seients: "Alex 27C · Yurena 27B · Kenia 27A" },
      { num: "EY814 · Etihad", de: "Abu Dhabi AUH", t1: "Term. A", surt: "21:10", a: "Osaka KIX", t2: "T1", arr: "11:50 (+1)", dur: "9h40", seients: "Alex 18H · Yurena 18J · Kenia 18K" },
    ],
  },
  "2026-07-07": {
    nota: "Equipatge: 20 kg facturat + 7 kg de mà per persona. Escala a Kuala Lumpur de 2h25.",
    segs: [
      { num: "D7523 · AirAsia", de: "Tòquio Haneda HND", t1: "T3", surt: "23:50", a: "Kuala Lumpur KUL", t2: "T2", arr: "06:10 (+1)", dur: "7h20" },
      { num: "AK74 · AirAsia", de: "Kuala Lumpur KUL", t1: "T2", surt: "08:35 (+1)", a: "Malé MLE", t2: "T1", arr: "09:50 (+1)", dur: "4h15" },
    ],
  },
  "2026-07-11": {
    segs: [
      { num: "EY377 · Etihad", de: "Malé MLE", t1: "T1", surt: "21:25", a: "Abu Dhabi AUH", t2: "Term. A", arr: "00:25 (+1)", dur: "4h00", seients: "17A · 17B · 17C" },
    ],
  },
  "2026-07-12": {
    segs: [
      { num: "EY111 · Etihad", de: "Abu Dhabi AUH", t1: "Term. A", surt: "02:30", a: "Barcelona BCN", t2: "T1", arr: "07:35", dur: "7h05" },
    ],
  },
};

// Llista única de localitzacions presents a l'itinerari (per a les crides al temps).
export function localitzacionsUniques() {
  const claus = [...new Set(DAYS.map((d) => d.loc))];
  return claus.map((clau) => ({ clau, ...LOCATIONS[clau] }));
}
