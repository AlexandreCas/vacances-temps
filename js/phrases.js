// Frases japoneses més útils, agrupades per situació (japonès · romaji · català).
export const FRASES = [
  {
    grup: "Salutacions",
    items: [
      { jp: "こんにちは", ro: "Konnichiwa", ca: "Hola / Bon dia" },
      { jp: "おはようございます", ro: "Ohayō gozaimasu", ca: "Bon dia (al matí)" },
      { jp: "こんばんは", ro: "Konbanwa", ca: "Bona tarda/nit" },
      { jp: "おやすみなさい", ro: "Oyasuminasai", ca: "Bona nit (a dormir)" },
      { jp: "さようなら", ro: "Sayōnara", ca: "Adéu" },
      { jp: "また ね", ro: "Mata ne", ca: "Fins ara" },
    ],
  },
  {
    grup: "Cortesia",
    items: [
      { jp: "ありがとうございます", ro: "Arigatō gozaimasu", ca: "Gràcies (formal)" },
      { jp: "どうも", ro: "Dōmo", ca: "Gràcies (informal)" },
      { jp: "すみません", ro: "Sumimasen", ca: "Perdó / Disculpi (cridar atenció)" },
      { jp: "ごめんなさい", ro: "Gomen nasai", ca: "Ho sento" },
      { jp: "お願いします", ro: "Onegai shimasu", ca: "Si us plau" },
      { jp: "どうぞ", ro: "Dōzo", ca: "Endavant / Tingui" },
      { jp: "はい / いいえ", ro: "Hai / Iie", ca: "Sí / No" },
      { jp: "大丈夫です", ro: "Daijōbu desu", ca: "Estic bé / Cap problema" },
    ],
  },
  {
    grup: "Restaurant i menjar",
    items: [
      { jp: "いただきます", ro: "Itadakimasu", ca: "(abans de menjar) Que aprofiti" },
      { jp: "ごちそうさまでした", ro: "Gochisōsama deshita", ca: "(després) Gràcies pel menjar" },
      { jp: "美味しい！", ro: "Oishii!", ca: "Boníssim!" },
      { jp: "お勘定お願いします", ro: "Okanjō onegaishimasu", ca: "El compte, si us plau" },
      { jp: "メニューをください", ro: "Menyū o kudasai", ca: "La carta, si us plau" },
      { jp: "乾杯！", ro: "Kanpai!", ca: "Salut! (brindis)" },
      { jp: "水 / お茶", ro: "Mizu / Ocha", ca: "Aigua / Te" },
      { jp: "ベジタリアンです", ro: "Bejitarian desu", ca: "Sóc vegetarià/ana" },
    ],
  },
  {
    grup: "Compres i preus",
    items: [
      { jp: "いくらですか？", ro: "Ikura desu ka?", ca: "Quant val?" },
      { jp: "これをください", ro: "Kore o kudasai", ca: "Vull això, si us plau" },
      { jp: "カードで払えますか？", ro: "Kādo de haraemasu ka?", ca: "Puc pagar amb targeta?" },
      { jp: "袋をください", ro: "Fukuro o kudasai", ca: "Una bossa, si us plau" },
    ],
  },
  {
    grup: "Orientar-se",
    items: [
      { jp: "トイレはどこですか？", ro: "Toire wa doko desu ka?", ca: "On és el bany?" },
      { jp: "駅はどこですか？", ro: "Eki wa doko desu ka?", ca: "On és l'estació?" },
      { jp: "これは○○行きますか？", ro: "Kore wa ○○ ikimasu ka?", ca: "Va cap a ○○ (això)?" },
      { jp: "右 / 左 / まっすぐ", ro: "Migi / Hidari / Massugu", ca: "Dreta / Esquerra / Recte" },
    ],
  },
  {
    grup: "Ajuda i emergència",
    items: [
      { jp: "英語を話せますか？", ro: "Eigo o hanasemasu ka?", ca: "Parla anglès?" },
      { jp: "わかりません", ro: "Wakarimasen", ca: "No ho entenc" },
      { jp: "もう一度お願いします", ro: "Mō ichido onegaishimasu", ca: "Una altra vegada, si us plau" },
      { jp: "助けて！", ro: "Tasukete!", ca: "Ajuda!" },
      { jp: "病院 / 薬局", ro: "Byōin / Yakkyoku", ca: "Hospital / Farmàcia" },
    ],
  },
];

export function initFrases() {
  const modal = document.getElementById("ph-modal");
  const btn = document.getElementById("ph-btn");
  const llista = document.getElementById("ph-list");
  if (!modal || !btn || !llista) return;

  llista.innerHTML = FRASES.map(
    (g) => `<div class="ph-group">
      <p class="ph-grup">${g.grup}</p>
      ${g.items
        .map(
          (it) => `<div class="ph-row">
            <div class="ph-jp">${it.jp}<span class="ph-ro">${it.ro}</span></div>
            <div class="ph-ca">${it.ca}</div>
          </div>`
        )
        .join("")}
    </div>`
  ).join("");

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
