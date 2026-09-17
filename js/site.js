const year = document.querySelector("[data-year]");
if (year) year.textContent = String(new Date().getFullYear());

const filters = document.querySelectorAll("[data-filter]");
const cards = document.querySelectorAll("[data-kind]");
const grid = document.querySelector(".grid");
const workTitle = document.querySelector("#work h2");

const titles = {
  feature: "featured",
  product: "products",
  game: "games",
  tool: "tools",
  desk: "desks",
  all: "all of it",
};

function applyFilter(kind) {
  if (grid) grid.dataset.view = kind;
  if (workTitle) workTitle.textContent = titles[kind] || kind;
  filters.forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(button.getAttribute("data-filter") === kind),
    );
  });
  cards.forEach((card) => {
    const match =
      kind === "all" ||
      (kind === "feature" && card.hasAttribute("data-feature")) ||
      card.getAttribute("data-kind") === kind;
    card.classList.toggle("hidden", !match);
  });
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    applyFilter(button.getAttribute("data-filter"));
  });
});

const start = document.querySelector("[data-filter][aria-pressed='true']");
applyFilter(start ? start.getAttribute("data-filter") : "feature");
