/* SAGE MARKETING LTD. — shared interactions
   Kept intentionally small: a mobile menu and a clearly labelled form demo. */
(() => {
  "use strict";

  const header = document.querySelector("[data-header]");
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");

  if (header && navToggle && nav) {
    const toggleLabel = navToggle.querySelector(".nav-toggle-label");
    const desktopQuery = window.matchMedia("(min-width: 881px)");
    let menuOpen = false;

    const setMenu = (open) => {
      menuOpen = open;
      header.classList.toggle("nav-open", open);
      navToggle.setAttribute("aria-expanded", String(open));
      if (toggleLabel) {
        toggleLabel.textContent = open ? "Close menu" : "Open menu";
      }
    };

    navToggle.addEventListener("click", () => {
      setMenu(!menuOpen);
    });

    // Close the panel after choosing a page on small screens.
    nav.addEventListener("click", (event) => {
      if (event.target.closest("a") && !desktopQuery.matches) {
        setMenu(false);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuOpen) {
        setMenu(false);
        navToggle.focus();
      }
    });

    document.addEventListener("click", (event) => {
      if (menuOpen && !header.contains(event.target)) {
        setMenu(false);
      }
    });

    const closeOnDesktop = (event) => {
      if (event.matches) {
        setMenu(false);
      }
    };

    if (typeof desktopQuery.addEventListener === "function") {
      desktopQuery.addEventListener("change", closeOnDesktop);
    } else {
      desktopQuery.addListener(closeOnDesktop);
    }
  }

  const demoForm = document.querySelector("[data-demo-form]");
  if (demoForm) {
    const status = demoForm.querySelector("[data-form-status]");

    demoForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!demoForm.checkValidity()) {
        demoForm.reportValidity();
        return;
      }

      if (status) {
        status.textContent =
          "Demo complete — your note stayed right here in the browser. This static form has no backend, so nothing was sent or stored.";
        status.hidden = false;
        status.focus();
      }

      demoForm.reset();
    });

    demoForm.addEventListener("input", () => {
      if (status && !status.hidden) {
        status.hidden = true;
      }
    });
  }
})();
