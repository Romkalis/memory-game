import logo from "../assets/logo.svg";

function createElement(tag, classes = [], text = "") {
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
  ["Start Now", "Scores"].forEach((label) => {
    const item = createElement("li", ["header__item"]);
    item.append(createElement("button", ["header__link", "start"], label));
    list.append(item);
  });

  nav.append(img, list);
  header.append(nav);
  return header;
}

function createMain() {
  const main = createElement("main", ["game", "container"]);

  const score = createElement("p", ["score"]);
  score.append(
    createElement("span", ["score__counter"], "Score: 0"),
    createElement("span", ["score__win"], "Pairs found: 0"),
  );

  const grid = createElement("ul", ["game__grid"]);

  main.append(score, grid);
  return main;
}

function createFooter() {
  const footer = createElement("footer", ["footer"]);
  const container = createElement("div", ["container"]);
  container.append(createElement("blockquote", [], "2026 Mind Game"));
  footer.append(container);
  return footer;
}

document.body.prepend(createHeader(), createMain(), createFooter());
