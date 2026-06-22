// Frases i vocabulari útils en japonès, per pestanyes (japonès · pronunciació · català).
export const FRASES = [
  {
    grup: "Salutacions",
    items: [
      { jp: "こんにちは", ro: "Konnichiwa", ca: "Hola / Bon dia" },
      { jp: "おはようございます", ro: "Ohayō gozaimasu", ca: "Bon dia (al matí)" },
      { jp: "こんばんは", ro: "Konbanwa", ca: "Bona tarda/nit" },
      { jp: "おやすみなさい", ro: "Oyasuminasai", ca: "Bona nit (a dormir)" },
      { jp: "さようなら", ro: "Sayōnara", ca: "Adéu" },
      { jp: "またね", ro: "Mata ne", ca: "Fins ara" },
      { jp: "はじめまして", ro: "Hajimemashite", ca: "Encantat de conèixe't" },
      { jp: "お元気ですか？", ro: "Ogenki desu ka?", ca: "Com estàs?" },
    ],
  },
  {
    grup: "Cortesia",
    items: [
      { jp: "ありがとうございます", ro: "Arigatō gozaimasu", ca: "Gràcies (formal)" },
      { jp: "どうも", ro: "Dōmo", ca: "Gràcies (informal)" },
      { jp: "どういたしまして", ro: "Dō itashimashite", ca: "De res" },
      { jp: "すみません", ro: "Sumimasen", ca: "Perdó / Disculpi (cridar atenció)" },
      { jp: "ごめんなさい", ro: "Gomen nasai", ca: "Ho sento" },
      { jp: "お願いします", ro: "Onegai shimasu", ca: "Si us plau" },
      { jp: "どうぞ", ro: "Dōzo", ca: "Endavant / Tingui" },
      { jp: "はい / いいえ", ro: "Hai / Iie", ca: "Sí / No" },
      { jp: "大丈夫です", ro: "Daijōbu desu", ca: "Estic bé / Cap problema" },
      { jp: "わかりました", ro: "Wakarimashita", ca: "Entès" },
    ],
  },
  {
    grup: "Al restaurant",
    items: [
      { jp: "メニューをください", ro: "Menyū o kudasai", ca: "La carta, si us plau" },
      { jp: "これをください", ro: "Kore o kudasai", ca: "Vull això, si us plau" },
      { jp: "おすすめは何ですか？", ro: "Osusume wa nan desu ka?", ca: "Què recomaneu?" },
      { jp: "お勘定お願いします", ro: "Okanjō onegaishimasu", ca: "El compte, si us plau" },
      { jp: "美味しい！", ro: "Oishii!", ca: "Boníssim!" },
      { jp: "いただきます", ro: "Itadakimasu", ca: "(abans de menjar) Que aprofiti" },
      { jp: "ごちそうさまでした", ro: "Gochisōsama deshita", ca: "(després) Gràcies pel menjar" },
      { jp: "乾杯！", ro: "Kanpai!", ca: "Salut! (brindis)" },
      { jp: "水をください", ro: "Mizu o kudasai", ca: "Aigua, si us plau" },
      { jp: "ベジタリアンです", ro: "Bejitarian desu", ca: "Sóc vegetarià/ana" },
      { jp: "辛くないですか？", ro: "Karakunai desu ka?", ca: "No és picant?" },
      { jp: "持ち帰りで", ro: "Mochikaeri de", ca: "Per emportar" },
    ],
  },
  {
    grup: "Imprescindibles",
    items: [
      { jp: "寿司", ro: "Sushi", ca: "⭐ El clàssic: arròs i peix cru" },
      { jp: "ラーメン", ro: "Rāmen", ca: "⭐ Sopa de fideus (mil versions)" },
      { jp: "天ぷら", ro: "Tempura", ca: "⭐ Arrebossat lleuger i fregit" },
      { jp: "とんかつ", ro: "Tonkatsu", ca: "⭐ Filet de porc cruixent" },
      { jp: "お好み焼き", ro: "Okonomiyaki", ca: "⭐ Coca salada (Osaka i Hiroshima)" },
      { jp: "たこ焼き", ro: "Takoyaki", ca: "⭐ Boletes de pop (Osaka)" },
      { jp: "焼き鳥", ro: "Yakitori", ca: "⭐ Broquetes de pollastre a la brasa" },
      { jp: "餃子", ro: "Gyōza", ca: "⭐ Dumplings a la planxa" },
      { jp: "和牛", ro: "Wagyū", ca: "⭐ Vedella japonesa premium (Kobe…)" },
      { jp: "うなぎ", ro: "Unagi", ca: "⭐ Anguila a la brasa amb salsa" },
      { jp: "抹茶", ro: "Matcha", ca: "⭐ Te verd en pols (i postres)" },
      { jp: "大福", ro: "Daifuku", ca: "⭐ Mochi dolç farcit" },
    ],
  },
  {
    grup: "Tipus de menjar",
    items: [
      { jp: "寿司", ro: "Sushi", ca: "Arròs avinagrat amb peix cru" },
      { jp: "刺身", ro: "Sashimi", ca: "Peix cru tallat" },
      { jp: "ラーメン", ro: "Rāmen", ca: "Sopa de fideus" },
      { jp: "うどん", ro: "Udon", ca: "Fideus gruixuts" },
      { jp: "そば", ro: "Soba", ca: "Fideus de fajol" },
      { jp: "天ぷら", ro: "Tempura", ca: "Verdura/marisc arrebossat i fregit" },
      { jp: "とんかつ", ro: "Tonkatsu", ca: "Filet de porc arrebossat" },
      { jp: "餃子", ro: "Gyōza", ca: "Dumplings a la planxa" },
      { jp: "お好み焼き", ro: "Okonomiyaki", ca: "Coca salada a la planxa" },
      { jp: "たこ焼き", ro: "Takoyaki", ca: "Boletes de pop" },
      { jp: "焼き鳥", ro: "Yakitori", ca: "Broquetes de pollastre" },
      { jp: "おにぎり", ro: "Onigiri", ca: "Bola d'arròs farcida" },
      { jp: "牛丼", ro: "Gyūdon", ca: "Bol d'arròs amb vedella" },
      { jp: "カツ丼", ro: "Katsudon", ca: "Bol d'arròs amb tonkatsu" },
      { jp: "カレー", ro: "Karē", ca: "Curri japonès" },
      { jp: "味噌汁", ro: "Miso shiru", ca: "Sopa de miso" },
      { jp: "唐揚げ", ro: "Karaage", ca: "Pollastre fregit" },
      { jp: "うなぎ", ro: "Unagi", ca: "Anguila a la brasa" },
      { jp: "枝豆", ro: "Edamame", ca: "Faves de soja" },
      { jp: "抹茶", ro: "Matcha", ca: "Te verd en pols" },
      { jp: "餅", ro: "Mochi", ca: "Pastisset d'arròs" },
      { jp: "たい焼き", ro: "Taiyaki", ca: "Pastís en forma de peix (farcit)" },
    ],
  },
  {
    grup: "Compres i diners",
    items: [
      { jp: "いくらですか？", ro: "Ikura desu ka?", ca: "Quant val?" },
      { jp: "高いです", ro: "Takai desu", ca: "És car" },
      { jp: "カードで払えますか？", ro: "Kādo de haraemasu ka?", ca: "Puc pagar amb targeta?" },
      { jp: "現金", ro: "Genkin", ca: "Efectiu" },
      { jp: "免税", ro: "Menzei", ca: "Lliure d'impostos (tax free)" },
      { jp: "見てもいいですか？", ro: "Mite mo ii desu ka?", ca: "Puc mirar (només)?" },
      { jp: "袋をください", ro: "Fukuro o kudasai", ca: "Una bossa, si us plau" },
    ],
  },
  {
    grup: "Orientar-se",
    items: [
      { jp: "トイレはどこですか？", ro: "Toire wa doko desu ka?", ca: "On és el bany?" },
      { jp: "駅はどこですか？", ro: "Eki wa doko desu ka?", ca: "On és l'estació?" },
      { jp: "右 / 左 / まっすぐ", ro: "Migi / Hidari / Massugu", ca: "Dreta / Esquerra / Recte" },
      { jp: "ここ / あそこ", ro: "Koko / Asoko", ca: "Aquí / Allà" },
      { jp: "電車 / バス", ro: "Densha / Basu", ca: "Tren / Autobús" },
      { jp: "〜まで行きたいです", ro: "... made ikitai desu", ca: "Vull anar a..." },
    ],
  },
  {
    grup: "Números",
    items: [
      { jp: "一", ro: "Ichi", ca: "1" },
      { jp: "二", ro: "Ni", ca: "2" },
      { jp: "三", ro: "San", ca: "3" },
      { jp: "四", ro: "Yon", ca: "4" },
      { jp: "五", ro: "Go", ca: "5" },
      { jp: "六", ro: "Roku", ca: "6" },
      { jp: "七", ro: "Nana", ca: "7" },
      { jp: "八", ro: "Hachi", ca: "8" },
      { jp: "九", ro: "Kyū", ca: "9" },
      { jp: "十", ro: "Jū", ca: "10" },
      { jp: "百", ro: "Hyaku", ca: "100" },
      { jp: "千", ro: "Sen", ca: "1.000" },
      { jp: "万", ro: "Man", ca: "10.000" },
    ],
  },
  {
    grup: "Emergència",
    items: [
      { jp: "助けて！", ro: "Tasukete!", ca: "Ajuda!" },
      { jp: "英語を話せますか？", ro: "Eigo o hanasemasu ka?", ca: "Parla anglès?" },
      { jp: "わかりません", ro: "Wakarimasen", ca: "No ho entenc" },
      { jp: "もう一度お願いします", ro: "Mō ichido onegaishimasu", ca: "Una altra vegada, si us plau" },
      { jp: "痛いです", ro: "Itai desu", ca: "Em fa mal" },
      { jp: "アレルギーがあります", ro: "Arerugī ga arimasu", ca: "Tinc al·lèrgia" },
      { jp: "病院 / 薬局", ro: "Byōin / Yakkyoku", ca: "Hospital / Farmàcia" },
      { jp: "警察", ro: "Keisatsu", ca: "Policia" },
    ],
  },
];

export function initFrases() {
  const modal = document.getElementById("ph-modal");
  const btn = document.getElementById("ph-btn");
  const tabsEl = document.getElementById("ph-tabs");
  const llista = document.getElementById("ph-list");
  if (!modal || !btn || !llista || !tabsEl) return;

  let actiu = 0;

  function pintaTabs() {
    tabsEl.innerHTML = FRASES.map(
      (g, i) => `<button class="ph-tab${i === actiu ? " actiu" : ""}" data-i="${i}">${g.grup}</button>`
    ).join("");
  }
  function pintaLlista() {
    llista.innerHTML = FRASES[actiu].items
      .map(
        (it) => `<div class="ph-row">
          <div class="ph-jp"><span class="ph-pro">${it.ro}</span><span class="ph-kana">${it.jp}</span></div>
          <div class="ph-ca">${it.ca}</div>
        </div>`
      )
      .join("");
    llista.scrollTop = 0;
  }

  pintaTabs();
  pintaLlista();

  tabsEl.addEventListener("click", (e) => {
    const b = e.target.closest(".ph-tab");
    if (!b) return;
    actiu = Number(b.dataset.i);
    pintaTabs();
    pintaLlista();
    b.scrollIntoView({ inline: "center", block: "nearest" });
  });

  function tanca() {
    modal.hidden = true;
    document.body.style.overflow = "";
  }
  btn.addEventListener("click", () => {
    modal.hidden = false;
    document.body.style.overflow = "hidden";
  });
  modal.addEventListener("click", (e) => {
    if (e.target.hasAttribute("data-close")) tanca();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) tanca();
  });
}
