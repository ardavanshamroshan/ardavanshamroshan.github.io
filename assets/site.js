(() => {
  const roles = [
    "Open source author",
    "Laravel & Filament plugins",
    "Python DX utilities",
    "Full-stack builder",
  ];

  const typedEl = document.querySelector("[data-typed]");
  const yearEl = document.querySelector("[data-year]");
  const header = document.querySelector(".site-header");
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  let roleIndex = 0;
  let letterCount = 0;
  let deleting = false;

  const tick = () => {
    if (!typedEl) return;

    const current = roles[roleIndex];
    const done = letterCount === current.length;
    const empty = letterCount === 0;
    const delay = done && !deleting ? 1200 : deleting ? 34 : 58;

    window.setTimeout(() => {
      if (done && !deleting) {
        deleting = true;
        tick();
        return;
      }

      if (deleting && empty) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        tick();
        return;
      }

      letterCount += deleting ? -1 : 1;
      typedEl.textContent = current.slice(0, letterCount);
      tick();
    }, delay);
  };

  tick();

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  themeToggle?.addEventListener("click", () => {
    const nextDark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", nextDark);
    localStorage.setItem("theme", nextDark ? "dark" : "light");
  });

  // Migrate first visit / old system preference into dark default
  if (!localStorage.getItem("theme")) {
    localStorage.setItem("theme", "dark");
  }

  menuToggle?.addEventListener("click", () => {
    if (!mobileNav) return;
    const open = mobileNav.hasAttribute("hidden");
    if (open) mobileNav.removeAttribute("hidden");
    else mobileNav.setAttribute("hidden", "");
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  mobileNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.setAttribute("hidden", "");
      menuToggle?.setAttribute("aria-label", "Open menu");
    });
  });
})();
