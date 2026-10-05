import logo from "../assets/logo.svg";

export function createElement(tag, classes = [], text = "") {
  const element = document.createElement(tag);
  element.classList.add(...classes);
  if (text) element.textContent = text;
  return element;
}

function createHeader() {
  const header = createElement("header", ["header"]);
  const nav = createElement("nav", ["container"]);

  const img = createElement("img", ["header__logo"]);
  img.src = logo;
  img.alt = "logo";
  img.width = 50;
  img.height = 50;

  const list = createElement("ul", ["header__list"]);
  [
    ["Start Now", "start"],
    ["Scores", "scores"],
  ].forEach(([label, className]) => {
    const item = createElement("li", ["header__item"]);
    item.append(createElement("button", ["header__link", className], label));
    list.append(item);
  });

  nav.append(img, list);
  header.append(nav);
  return header;
}

// содержимое main (игра или таблица) рендерится в game.js / scores.js
function createMain() {
  return createElement("main", ["game", "container"]);
}

function createFooter() {
  const footer = createElement("footer", ["footer"]);
  const container = createElement("div", ["container"]);
  container.append(createElement("blockquote", [], "2026 Mind Game"));
  footer.append(container);
  return footer;
}

document.body.prepend(createHeader(), createMain(), createFooter());
