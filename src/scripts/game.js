import { shuffle } from "./utils/shuffle";
import { cards } from "./data";

const pairs = shuffle([...cards, ...cards]);
console.log(pairs);
const grid = document.querySelector(".game__grid");

grid.replaceChildren(...pairs.map(createCard));

function createCard({ id, src }) {
  const card = document.createElement("li");
  card.classList.add("game__card");
  card.classList.add("close");
  card.dataset.pairId = id;

  const image = document.createElement("img");
  image.classList.add("game__pic");
  image.src = src;
  image.alt = id;

  card.append(image);
  return card;
}
