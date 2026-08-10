const body = document.body;
const toggle = document.querySelector("[data-menu-toggle]");
const drawer = document.querySelector("[data-drawer]");
const backdrop = document.querySelector("[data-drawer-backdrop]");
const drawerLinks = drawer ? drawer.querySelectorAll("a") : [];

function setDrawer(open) {
  body.classList.toggle("drawer-open", open);
  if (toggle) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  }
}

if (toggle) {
  toggle.addEventListener("click", () => {
    setDrawer(!body.classList.contains("drawer-open"));
  });
}

if (backdrop) {
  backdrop.addEventListener("click", () => setDrawer(false));
}

drawerLinks.forEach((link) => {
  link.addEventListener("click", () => setDrawer(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setDrawer(false);
  }
});
