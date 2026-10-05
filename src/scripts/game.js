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
  

  const front = document.createElement('div')
  front.classList.add("game__card--front");
  const back = document.createElement('div')
  back.classList.add("game__card--back");
  card.append(front)
  card.append(back)


  const cover = document.createElement("img");
  cover.classList.add("game__cover");
  cover.src = '/src/assets/pattern.webp';
  cover.alt = 'card front side';

  const image = document.createElement("img");
  image.classList.add("game__pic");
  image.src = src;
  image.alt = id;

  front.append(cover);
  back.append(image);
  return card;
}


let openedCards = []

grid.addEventListener('click', (e) => {
    const card = e.target;

    if (openedCards.length >= 2) {
        // тут над написать проверку - если карточки совпали то исключаем их из кликомании

        if (openedCards[0] === openedCards[1]) {
             grid.querySelectorAll('.open')
                 .forEach( card => card.classList.add('finded'))
        }

        clearAllCards()
        openedCards = [];
        return
    }

    if (card.classList.contains('open')) {
        card.classList.remove('open')
    } else {
        card.classList.add('open')
        
        const cardName = card.dataset.pairId;
        openedCards.push(cardName)
        console.log(openedCards)
    }
})

function clearAllCards () {
    grid.querySelectorAll('.open')
        .forEach( card => card.classList.remove('open'))
}

