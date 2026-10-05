import { shuffle } from "./utils/shuffle";
import { cards } from "./data";

const pairs = shuffle([...cards, ...cards]);
const grid = document.querySelector(".game__grid");

grid.replaceChildren(...pairs.map(createCard));

function createCard({ id, src }) {
  const card = document.createElement("li");
  card.classList.add("game__card");
  card.classList.add("close");
  card.dataset.pairId = id;

  const front = document.createElement("div");
  front.classList.add("game__card--front");
  const back = document.createElement("div");
  back.classList.add("game__card--back");
  card.append(front);
  card.append(back);

  const cover = document.createElement("img");
  cover.classList.add("game__cover");
  cover.src = "/src/assets/pattern.webp";
  cover.alt = "card front side";

  const image = document.createElement("img");
  image.classList.add("game__pic");
  image.src = src;
  image.alt = id;

  front.append(cover);
  back.append(image);
  return card;
}

let openedCards = [];
let findedPair = 0;
let counter = 0;
let isLocked = false;
let closeTimer = null;

const score = document.querySelector(".score__counter");
const findedPairs = document.querySelector(".score__win");

grid.addEventListener("click", (e) => {
  const card = e.target.closest(".game__card");

  // клик мимо карточки, по уже открытой/найденной или пока закрываются две неверные
  if (!card || isLocked) return;
  if (card.classList.contains("open") || card.classList.contains("finded")) return;

  card.classList.add("open");
  openedCards.push(card);
  counter++;
  score.textContent = `Score: ${counter}`;

  if (openedCards.length < 2) return;

  const [first, second] = openedCards;

  if (first.dataset.pairId === second.dataset.pairId) {
    first.classList.replace("open", "finded");
    second.classList.replace("open", "finded");
    findedPair++;
    findedPairs.textContent = `Pairs found: ${findedPair}`;
    openedCards = [];
    return;
  }

  // не совпали — даём посмотреть и закрываем
  isLocked = true;
  closeTimer = setTimeout(() => {
    clearAllCards();
    openedCards = [];
    isLocked = false;
  }, 1000);
});

function clearAllCards() {
  grid
    .querySelectorAll(".open")
    .forEach((card) => card.classList.remove("open"));
}

// запуск\перезапуск игры
const startBtn = document.querySelector(".start");
startBtn.addEventListener("click", () => startGame());

function startGame() {
  clearTimeout(closeTimer);
  isLocked = false;
  clearAllCards();
  grid
    .querySelectorAll(".finded")
    .forEach((card) => card.classList.remove("finded"));
  openedCards = [];
  findedPair = 0;
  counter = 0;
  score.textContent = `Score: ${counter}`;
  findedPairs.textContent = `Pairs found: ${findedPair}`;
}
