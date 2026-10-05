import { shuffle } from "./utils/shuffle";
import { cards } from "./data";
import { createElement } from "./generateMarkup";
import { saveScore } from "./scores";

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

let closeTimer = null;

// каждый вызов строит новую перемешанную игру внутри main
export function renderGame(main) {
  clearTimeout(closeTimer);

  let openedCards = [];
  let findedPair = 0;
  let counter = 0;
  let isLocked = false;

  const scoreBar = createElement("p", ["score"]);
  const score = createElement("span", ["score__counter"], "Score: 0");
  const findedPairs = createElement("span", ["score__win"], "Pairs found: 0");
  scoreBar.append(score, findedPairs);

  const grid = createElement("ul", ["game__grid"]);
  const pairs = shuffle([...cards, ...cards]);
  grid.append(...pairs.map(createCard));

  main.replaceChildren(scoreBar, grid);

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".game__card");

    // клик мимо карточки, по уже открытой/найденной или пока закрываются две неверные
    if (!card || isLocked) return;
    if (card.classList.contains("open") || card.classList.contains("finded")) return;

    card.classList.add("open");
    openedCards.push(card);

    if (openedCards.length < 2) return;

    // ход = открыты две карточки, совпали они или нет
    counter++;
    score.textContent = `Score: ${counter}`;

    const [first, second] = openedCards;

    if (first.dataset.pairId === second.dataset.pairId) {
      first.classList.replace("open", "finded");
      second.classList.replace("open", "finded");
      findedPair++;
      findedPairs.textContent = `Pairs found: ${findedPair}`;
      openedCards = [];

      // всё открыто — игра закончена
      if (findedPair === cards.length) {
        saveScore(counter);
        findedPairs.textContent = `You win! Pairs found: ${findedPair}`;
      }
      return;
    }

    // не совпали — даём посмотреть и закрываем
    isLocked = true;
    closeTimer = setTimeout(() => {
      first.classList.remove("open");
      second.classList.remove("open");
      openedCards = [];
      isLocked = false;
    }, 1000);
  });
}
