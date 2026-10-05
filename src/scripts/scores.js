import { createElement } from "./generateMarkup";

const STORAGE_KEY = "memory-game-scores";
const MAX_RESULTS = 5;

// результаты хранятся в порядке добавления: [{ score, date }, ...]
export function getScores() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export function saveScore(score) {
  const scores = [...getScores(), { score, date: Date.now() }];

  // больше 5 — выкидываем самые старые
  const lastScores = scores.slice(-MAX_RESULTS);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lastScores));
  } catch {
    // localStorage недоступен (приватный режим и т.п.) — просто не сохраняем
  }
}

function createScoresTable() {
  // меньше ходов — выше место
  const scores = getScores().sort((a, b) => a.score - b.score);

  if (!scores.length) {
    return createElement("p", ["scores__empty"], "No results yet");
  }

  const table = createElement("table", ["scores"]);
  table.append(createElement("caption", ["scores__caption"], "Last results"));

  const head = createElement("thead");
  const headRow = createElement("tr");
  ["#", "Score", "Date"].forEach((title) => {
    headRow.append(createElement("th", ["scores__cell"], title));
  });
  head.append(headRow);

  const body = createElement("tbody");
  scores.forEach(({ score, date }, index) => {
    const row = createElement("tr");
    row.append(
      createElement("td", ["scores__cell"], String(index + 1)),
      createElement("td", ["scores__cell"], String(score)),
      createElement("td", ["scores__cell"], new Date(date).toLocaleString()),
    );
    body.append(row);
  });

  table.append(head, body);
  return table;
}

// таблица открывается в модалке поверх игры, игра под ней не сбрасывается
// onNewGame передаётся из main.js, чтобы не было циклического импорта с game.js
export function openScores(onNewGame) {
  const modal = createElement("dialog", ["modal"]);
  const content = createElement("div", ["modal__content"]);
  const buttons = createElement("div", ["modal__buttons"]);
  const startBtn = createElement("button", ["modal__btn"], "Start Now");
  const closeBtn = createElement("button", ["modal__btn"], "Close");

  buttons.append(startBtn, closeBtn);
  content.append(createScoresTable(), buttons);
  modal.append(content);
  document.body.append(modal);

  startBtn.addEventListener("click", () => {
    onNewGame();
    modal.close();
  });
  closeBtn.addEventListener("click", () => modal.close());
  // клик по затемнению вокруг окна
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.close();
  });
  // close срабатывает и на кнопку, и на Esc — убираем модалку из DOM
  modal.addEventListener("close", () => modal.remove());

  modal.showModal();
}
