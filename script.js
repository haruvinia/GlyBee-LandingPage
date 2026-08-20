const body = document.body;
const toggle = document.querySelector("[data-menu-toggle]");
const drawer = document.querySelector("[data-drawer]");
const backdrop = document.querySelector("[data-drawer-backdrop]");
const drawerLinks = drawer ? drawer.querySelectorAll("a") : [];
const firstDrawerLink = drawerLinks.length ? drawerLinks[0] : null;

function setDrawer(open, returnFocus = false) {
  body.classList.toggle("drawer-open", open);
  if (toggle) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  }
  if (drawer) {
    drawer.setAttribute("aria-hidden", String(!open));
    drawer.inert = !open;
  }
  if (open && firstDrawerLink) {
    firstDrawerLink.focus();
  }
  if (!open && returnFocus && toggle) {
    toggle.focus();
  }
}

if (toggle) {
  toggle.addEventListener("click", () => {
    setDrawer(!body.classList.contains("drawer-open"), true);
  });
}

if (backdrop) {
  backdrop.addEventListener("click", () => setDrawer(false, true));
}

drawerLinks.forEach((link) => {
  link.addEventListener("click", () => setDrawer(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setDrawer(false, true);
  }
});

const termsToggles = document.querySelectorAll("[data-terms-toggle]");

termsToggles.forEach((termsToggle) => {
  const panelId = termsToggle.getAttribute("aria-controls");
  const panel = panelId ? document.getElementById(panelId) : null;

  if (panel) {
    panel.hidden = termsToggle.getAttribute("aria-expanded") !== "true";
  }

  termsToggle.addEventListener("click", () => {
    if (!panel) {
      return;
    }

    const isOpen = termsToggle.getAttribute("aria-expanded") === "true";
    termsToggle.setAttribute("aria-expanded", String(!isOpen));
    panel.hidden = isOpen;
  });
});
