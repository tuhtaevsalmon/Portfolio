/* ============================================
   Портфолио — Мухаммадсалмон Тухтаев
   Логика: меню, тема, анимации, лайтбокс
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Год в футере ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Тема (тёмная / светлая) ---------- */
  const themeToggle = document.getElementById("themeToggle");
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("theme");
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  const initialTheme = savedTheme || (prefersLight ? "light" : "dark");
  root.setAttribute("data-theme", initialTheme);

  themeToggle?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  /* ---------- Мобильное меню ---------- */
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  const closeMenu = () => {
    navMenu?.classList.remove("open");
    navToggle?.classList.remove("open");
  };

  navToggle?.addEventListener("click", () => {
    navMenu?.classList.toggle("open");
    navToggle.classList.toggle("open");
  });

  document.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (e) => {
    if (
      navMenu?.classList.contains("open") &&
      !navMenu.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      closeMenu();
    }
  });

  /* ---------- Навбар при прокрутке + прогресс ---------- */
  const navbar = document.getElementById("navbar");
  const progress = document.getElementById("scrollProgress");
  const toTop = document.getElementById("toTop");

  const onScroll = () => {
    const scrollY = window.scrollY;
    navbar?.classList.toggle("scrolled", scrollY > 30);
    toTop?.classList.toggle("show", scrollY > 500);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    if (progress) progress.style.width = pct + "%";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- Активная ссылка навигации ---------- */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav__link");

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${id}`
            );
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => navObserver.observe(s));

  /* ---------- Анимация появления ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("visible"), i * 80);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------- Эффект печатной машинки ---------- */
  const typedEl = document.getElementById("typed");
  if (typedEl) {
    const roles = [
      "Junior C++ Developer",
      "Web Developer",
      "Qt Desktop Developer",
      "WordPress Developer",
      "Algorithm Enthusiast",
    ];
    let roleIndex = 0;
    let charIndex = roles[0].length;
    let deleting = false;

    const type = () => {
      const current = roles[roleIndex];
      typedEl.textContent = current.substring(0, charIndex);

      if (!deleting && charIndex < current.length) {
        charIndex++;
        setTimeout(type, 90);
      } else if (!deleting && charIndex === current.length) {
        deleting = true;
        setTimeout(type, 1800);
      } else if (deleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, 45);
      } else {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(type, 350);
      }
    };
    setTimeout(type, 2000);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
});
