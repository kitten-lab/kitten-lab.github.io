const year = document.querySelector("[data-year]");
if (year) year.textContent = String(new Date().getFullYear());

const filters = document.querySelectorAll("[data-filter]");
const grid = document.querySelector(".grid");
const cards = grid ? grid.querySelectorAll(".card") : [];
const workTitle = document.querySelector("#work h2");

const titles = {
  feature: "featured",
  product: "products",
  game: "games",
  tool: "tools",
  desk: "desks",
  all: "all of it",
};

function cardMatches(card, kind) {
  if (kind === "all") return true;
  if (kind === "feature") return card.hasAttribute("data-feature");
  return card.getAttribute("data-kind") === kind;
}

function applyFilter(kind) {
  if (!grid) return;
  grid.dataset.view = kind;
  if (workTitle) workTitle.textContent = titles[kind] || kind;
  filters.forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(button.getAttribute("data-filter") === kind),
    );
  });
  cards.forEach((card) => {
    card.classList.toggle("hidden", !cardMatches(card, kind));
  });
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    applyFilter(button.getAttribute("data-filter"));
  });
});

const start = document.querySelector("[data-filter][aria-pressed='true']");
applyFilter(start ? start.getAttribute("data-filter") : "feature");
