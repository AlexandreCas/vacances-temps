// Preguntes freqüents (en acordió, dins d'un modal).
const MAIL = `<a href="mailto:incidents@directiatravel.com">incidents@directiatravel.com</a>`;

export const FAQ = [
  {
    q: "Què faig si tinc una emergència durant el viatge?",
    a: `Davant qualsevol problema, escriu a ${MAIL} o truca als telèfons d'assistència en destí (els tens a "Contactes d'assistència") per resoldre-ho a l'instant.`,
  },
  {
    q: "On m'he de dirigir en arribar a l'aeroport?",
    a: `A la zona d'arribades, després de recollir les maletes, hi haurà un assistent/guia amb un cartell de Directia Travel o els vostres noms. Tingueu a mà el telèfon d'emergències per si cal trucar-hi.`,
  },
  {
    q: "Amb qui contacto si el trasllat no em ve a buscar?",
    a: `Si arribes a la zona d'arribades i no trobes ningú, truca als telèfons d'emergència per contactar amb el transferista i acordar la recollida.`,
  },
  {
    q: "Puc canviar d'hotel en destí?",
    a: `Sí, es pot sol·licitar, però sol sortir força més car: l'hotel no acostuma a permetre cancel·lar sense despeses, més la diferència de tarifa. Surt molt millor fer el canvi amb antelació, abans de sortir de viatge.`,
  },
  {
    q: "Què he d'incloure a l'equipatge de mà?",
    a: `Tota la documentació personal i del viatge, diners, medicació, objectes de valor i electrònica (carregadors, càmera, tablet…). També una muda per poder-te canviar si la maleta facturada no arriba a temps.`,
  },
  {
    q: "Quines precaucions he de tenir amb l'equipatge?",
    a: `Etiqueta cada maleta amb nom, adreça i telèfon, i fes-li una foto per identificar-la fàcilment. Guarda sempre la targeta d'embarcament i el resguard de l'equipatge facturat: són imprescindibles per a qualsevol reclamació.`,
  },
  {
    q: "Equipatge d'alt valor: el puc reclamar?",
    a: `La responsabilitat màxima de l'aerolínia és d'uns 1.131 DEG (≈ 1.350 €, varia segons cotització). Si el contingut val més i vols poder reclamar-lo, has de fer una "declaració especial de valor" en facturar (amb un suplement).`,
  },
  {
    q: "Incidència amb l'equipatge: què faig primer?",
    a: `Comunica-ho immediatament a l'aerolínia i demana el <strong>PIR</strong> (Part d'Irregularitat d'Equipatge) al mostrador, <strong>abans de sortir de l'aeroport</strong>. Hi han de constar les teves dades, el número de vol i la referència de l'equipatge.`,
  },
  {
    q: "I si l'aerolínia fa malbé la maleta?",
    a: `A més del PIR, tens <strong>7 dies</strong> des de rebre-la per fer una reclamació formal per escrit a l'aerolínia.`,
  },
  {
    q: "I si l'equipatge arriba amb retard?",
    a: `A més del PIR, tens <strong>21 dies</strong> per reclamar per escrit. Pots reclamar les despeses ocasionades pel retard (fora del teu domicili); guarda'n les factures.`,
  },
  {
    q: "I si l'aerolínia perd la maleta?",
    a: `Si no apareix en 21 dies, es considera extraviada. A més del PIR, tens <strong>2 anys</strong> per reclamar per escrit. Sovint demanen una llista valorada del contingut (amb un import màxim a cobrir).`,
  },
  {
    q: "Si he volat amb diverses aerolínies, a quina reclamo?",
    a: `A qualsevol de les aerolínies amb què hagis viatjat.`,
  },
  {
    q: "Què faig si em cancel·len el vol?",
    a: `L'aerolínia t'ha d'oferir el reemborsament del bitllet o un nou bitllet fins al destí final per la via més ràpida. Si és el vol d'anada, avisa al país de destí tan aviat com ho sàpigues perquè reorganitzin la recollida.`,
  },
  {
    q: "Quins drets addicionals tinc si em cancel·len el vol?",
    a: `L'aerolínia ha de cobrir manutenció i/o allotjament si cal, i 2 trucades. Conserva les factures per reclamar-ne la devolució.`,
  },
  {
    q: "Tinc dret a compensació per cancel·lació?",
    a: `Depèn de l'antelació amb què avisin i de si hi ha circumstàncies excepcionals. Guarda les targetes d'embarcament; tens fins a <strong>5 anys</strong> per reclamar.`,
  },
  {
    q: "Què faig si el vol es retarda?",
    a: `L'aerolínia és responsable de fer-te arribar al destí. Si el retard a la sortida supera les 4 h, t'han de donar menjar i beguda, allotjament i trasllats si cal, i un mitjà de comunicació. Si és l'anada, avisa al destí.`,
  },
  {
    q: "Tinc dret a compensació per retard?",
    a: `Si arribes 3 h o més tard del previst i no és per una circumstància extraordinària, pots tenir dret a compensació segons la distància del vol i el retard. Guarda les targetes d'embarcament; fins a 5 anys per reclamar.`,
  },
  {
    q: "I si el vol no arriba a temps per connectar?",
    a: `L'aerolínia és responsable de fer-te arribar al destí final. Explica el teu cas a la tripulació perquè t'ajudi i t'indiqui on dirigir-te per agafar un altre vol.`,
  },
  {
    q: "He de recollir les maletes a les escales?",
    a: `Normalment no: es facturen a l'origen i arriben al destí final sense recollir-les. En casos excepcionals (seguretat) pot caldre canviar-les de cinta; t'ho indicarien a facturació. És molt poc freqüent en vols amb Àsia.`,
  },
  {
    q: "On em dirigeixo davant qualsevol incidència en destí?",
    a: `Primer, comenta-ho amb el teu guia perquè ho resolgui de seguida. Si no quedes satisfet, escriu-nos com abans a ${MAIL}.`,
  },
];

export function initFaq() {
  const modal = document.getElementById("faq-modal");
  const btn = document.getElementById("faq-btn");
  const llista = document.getElementById("faq-list");
  if (!modal || !btn || !llista) return;

  llista.innerHTML = FAQ.map(
    (f) => `<details class="faq-item">
      <summary>${f.q}</summary>
      <div class="faq-a">${f.a}</div>
    </details>`
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
