
const searchInput = document.querySelector("#gameSearch");
const filterButtons = document.querySelectorAll(".filter-btn");
const gameCards = document.querySelectorAll(".game-card");
const noResults = document.querySelector("#noResults");

let activeFilter = "all";

function filterGames() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  let visibleCount = 0;

  gameCards.forEach((card) => {
    const category = card.dataset.category;
    const searchableText = card.dataset.name.toLowerCase();
    const matchesCategory =
      activeFilter === "all" || category === activeFilter;
    const matchesSearch = searchableText.includes(searchTerm);
    const shouldShow = matchesCategory && matchesSearch;

    card.hidden = !shouldShow;

    if (shouldShow) {
      visibleCount++;
    }
  });

  noResults.hidden = visibleCount > 0;
}

searchInput.addEventListener("input", filterGames);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    filterGames();
  });

  button.setAttribute(
    "aria-pressed",
    String(button.classList.contains("active"))
  );
});

// Mobile navigation menu
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Toggle navigation"
  );
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the mobile menu after selecting a link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Toggle navigation");
    menuToggle.textContent = "☰";
  });
});

// Automatically show the current year in the footer
document.querySelector("#year").textContent = new Date().getFullYear();
