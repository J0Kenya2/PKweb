(() => {
  const menuButton = document.querySelector("[data-menu-button]");
  const menu = document.querySelector("[data-menu]");
  const yearNode = document.querySelector("[data-year]");
  const links = document.querySelectorAll("[data-menu] a");

  if (menuButton && menu) {
    menuButton.addEventListener("click", () => {
      menu.classList.toggle("open");
    });
  }

  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  const setActiveByHash = () => {
    const hash = window.location.hash || "#home";
    links.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === hash);
    });
  };

  links.forEach((link) => {
    link.addEventListener("click", () => {
      if (menu) {
        menu.classList.remove("open");
      }
    });
  });

  setActiveByHash();
  window.addEventListener("hashchange", setActiveByHash);
})();
