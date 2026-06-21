// Busca mines — joc senzill dins d'un modal, optimitzat per a mòbil.
const ROWS = 9;
const COLS = 9;
const MINES = 10;

let board = [];
let started = false;
let over = false;
let flagMode = false;
let elBoard, elMines, elReset, elFlag, premut;

const idx = (r, c) => r * COLS + c;

function veins(i) {
  const r = Math.floor(i / COLS);
  const c = i % COLS;
  const out = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (!dr && !dc) continue;
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) out.push(idx(nr, nc));
    }
  }
  return out;
}

function nova() {
  board = Array.from({ length: ROWS * COLS }, () => ({ mine: false, rev: false, flag: false, adj: 0 }));
  started = false;
  over = false;
  elReset.textContent = "🙂";
  actualitzaMines();
  pinta();
}

function plantaMines(safe) {
  const prohibit = new Set([safe, ...veins(safe)]);
  let posats = 0;
  while (posats < MINES) {
    const i = Math.floor(Math.random() * board.length);
    if (board[i].mine || prohibit.has(i)) continue;
    board[i].mine = true;
    posats++;
  }
  board.forEach((c, i) => {
    if (!c.mine) c.adj = veins(i).filter((j) => board[j].mine).length;
  });
}

function obre(i) {
  const c = board[i];
  if (c.rev || c.flag) return;
  c.rev = true;
  if (c.adj === 0 && !c.mine) veins(i).forEach(obre);
}

function comprovaVictoria() {
  if (board.every((c) => c.mine || c.rev)) {
    over = true;
    elReset.textContent = "😎";
  }
}

function clicCel(i) {
  if (over) return;
  const c = board[i];
  if (flagMode) { toggleFlag(i); return; }
  if (c.flag || c.rev) return;
  if (!started) { plantaMines(i); started = true; }
  if (c.mine) {
    over = true;
    elReset.textContent = "💀";
    board.forEach((x) => { if (x.mine) x.rev = true; });
    c.boom = true;
    pinta();
    return;
  }
  obre(i);
  comprovaVictoria();
  pinta();
}

function toggleFlag(i) {
  if (over) return;
  const c = board[i];
  if (c.rev) return;
  c.flag = !c.flag;
  actualitzaMines();
  pinta();
}

function actualitzaMines() {
  const flags = board.filter((c) => c.flag).length;
  elMines.textContent = "💣 " + (MINES - flags);
}

function pinta() {
  elBoard.style.gridTemplateColumns = `repeat(${COLS}, 1fr)`;
  elBoard.innerHTML = board
    .map((c, i) => {
      let cls = "cell";
      let txt = "";
      if (c.rev) {
        cls += " rev";
        if (c.mine) { cls += c.boom ? " boom" : " mine"; txt = "💣"; }
        else if (c.adj > 0) { cls += " n" + c.adj; txt = c.adj; }
      } else if (c.flag) {
        cls += " flag";
        txt = "🚩";
      }
      return `<button class="${cls}" data-i="${i}">${txt}</button>`;
    })
    .join("");
}

export function initGame() {
  const modal = document.getElementById("game-modal");
  const btn = document.getElementById("game-btn");
  elBoard = document.getElementById("game-board");
  elMines = document.getElementById("game-mines");
  elReset = document.getElementById("game-reset");
  elFlag = document.getElementById("game-flag");
  if (!modal || !btn || !elBoard) return;

  function tanca() {
    modal.hidden = true;
    document.body.style.overflow = "";
  }
  btn.addEventListener("click", () => {
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    nova();
  });
  modal.addEventListener("click", (e) => {
    if (e.target.hasAttribute("data-close")) tanca();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) tanca();
  });

  elReset.addEventListener("click", nova);
  elFlag.addEventListener("click", () => {
    flagMode = !flagMode;
    elFlag.setAttribute("aria-pressed", String(flagMode));
  });

  // Clic / toc per descobrir.
  elBoard.addEventListener("click", (e) => {
    const b = e.target.closest(".cell");
    if (b) clicCel(+b.dataset.i);
  });
  // Clic dret per marcar bandera (escriptori).
  elBoard.addEventListener("contextmenu", (e) => {
    const b = e.target.closest(".cell");
    if (!b) return;
    e.preventDefault();
    toggleFlag(+b.dataset.i);
  });
  // Mantenir premut per marcar bandera (mòbil).
  elBoard.addEventListener("touchstart", (e) => {
    const b = e.target.closest(".cell");
    if (!b) return;
    premut = setTimeout(() => { premut = null; toggleFlag(+b.dataset.i); }, 450);
  }, { passive: true });
  elBoard.addEventListener("touchend", () => {
    if (premut) { clearTimeout(premut); premut = null; }
  });
}
