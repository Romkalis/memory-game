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

export function renderScores(main) {
  const scores = getScores().sort((a, b) => b.score - a.score);

  if (!scores.length) {
    main.replaceChildren(createElement("p", ["scores__empty"], "No results yet"));
    return;
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
  main.replaceChildren(table);
}
