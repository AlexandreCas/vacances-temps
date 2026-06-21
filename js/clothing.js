// Motor de recomanació de roba i maleta a partir del temps previst.
// Funció pura: rep valors meteorològics i retorna consells en català.

// params: { feelsMax, feelsMin, precipProb, precipMm, uvIndex, wind, humitat, loc }
// loc: clau de la localització (per a casos especials com koyasan/maldives)
export function recomanaRoba(p) {
  const peces = [];
  const maleta = new Set();
  let nivell = "";

  const f = p.feelsMax ?? 25;
  const fmin = p.feelsMin ?? f;

  // --- Temperatura (sensació tèrmica diürna) ---
  if (f >= 32) {
    nivell = "Calor intensa";
    peces.push("Roba molt lleugera i transpirable (cotó/lli)", "Samarreta de màniga curta", "Pantalons curts o vestit fresc");
    maleta.add("Samarretes transpirables").add("Pantalons curts").add("Recanvis extra");
  } else if (f >= 27) {
    nivell = "Calorós";
    peces.push("Roba d'estiu lleugera", "Màniga curta");
    maleta.add("Samarretes lleugeres").add("Pantalons curts / fins");
  } else if (f >= 20) {
    nivell = "Agradable";
    peces.push("Màniga curta amb una capa fina per si refresca");
    maleta.add("Una capa fina (camisa/jersei prim)");
  } else if (f >= 14) {
    nivell = "Fresc";
    peces.push("Màniga llarga", "Jaqueta lleugera");
    maleta.add("Jaqueta lleugera").add("Jerseis prims");
  } else {
    nivell = "Fred";
    peces.push("Jaqueta d'abric", "Capes (samarreta + jersei)");
    maleta.add("Jaqueta d'abric").add("Capes tèrmiques");
  }

  // --- Diferència dia/nit important ---
  if (f - fmin >= 8) {
    peces.push(`Porta una capa per a la nit (baixa fins a ~${Math.round(fmin)}°C)`);
    maleta.add("Capa d'abric per al vespre");
  }

  // --- Pluja ---
  if ((p.precipProb ?? 0) >= 50 || (p.precipMm ?? 0) >= 2) {
    peces.push("Paraigua o impermeable", "Calçat resistent a l'aigua");
    maleta.add("Paraigua plegable").add("Impermeable lleuger");
  } else if ((p.precipProb ?? 0) >= 25) {
    peces.push("Porta paraigua plegable per si de cas");
    maleta.add("Paraigua plegable");
  }

  // --- Radiació UV ---
  if ((p.uvIndex ?? 0) >= 8) {
    peces.push("Protecció solar alta (SPF 50)", "Gorra i ulleres de sol");
    maleta.add("Crema solar SPF 50").add("Gorra").add("Ulleres de sol");
  } else if ((p.uvIndex ?? 0) >= 6) {
    peces.push("Crema solar i gorra");
    maleta.add("Crema solar").add("Gorra");
  }

  // --- Vent ---
  if ((p.wind ?? 0) >= 35) {
    peces.push("Tallavent");
    maleta.add("Tallavent");
  }

  // --- Humitat (clau al Japó al juny: tsuyu) ---
  if ((p.humitat ?? 0) >= 75 && f >= 24) {
    peces.push("Teixits que transpirin; porta recanvi de samarreta");
    maleta.add("Samarretes de recanvi").add("Tovalloletes refrescants");
  }

  // --- Casos especials per localització ---
  if (p.loc === "maldives") {
    peces.push("Banyador i samarreta UV per a l'aigua", "Xancletes");
    maleta.add("Banyador").add("Samarreta UV (lycra)").add("Xancletes").add("Ulleres de busseig / snorkel");
  }
  if (p.loc === "koyasan") {
    peces.push("Capa extra per al temple (les nits a la muntanya són fresques)");
    maleta.add("Jersei per al vespre");
  }

  return { nivell, peces, maleta: [...maleta] };
}

// Etiqueta curta per a la vista resum (un badge).
export function badgeRoba(p) {
  const f = p.feelsMax ?? 25;
  const parts = [];
  if (f >= 30) parts.push("🥵 molt lleuger");
  else if (f >= 22) parts.push("👕 estiu");
  else if (f >= 15) parts.push("🧥 capa");
  else parts.push("🧣 abric");
  if ((p.precipProb ?? 0) >= 50 || (p.precipMm ?? 0) >= 2) parts.push("☂️ pluja");
  if ((p.uvIndex ?? 0) >= 8) parts.push("🧴 UV alt");
  return parts.join(" · ");
}
