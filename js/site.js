const year = document.querySelector("[data-year]");
if (year) year.textContent = String(new Date().getFullYear());

const filters = document.querySelectorAll("[data-filter]");
const cards = document.querySelectorAll("[data-kind]");

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const kind = button.getAttribute("data-filter");
    filters.forEach((other) => {
      other.setAttribute("aria-pressed", String(other === button));
    });
    cards.forEach((card) => {
      const match = kind === "all" || card.getAttribute("data-kind") === kind;
      card.classList.toggle("hidden", !match);
    });
  });
});
