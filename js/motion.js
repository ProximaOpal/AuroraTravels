/* PENZI motion controller — Framer-like UX from Klickpin video */

(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $$ (sel, root = document) {
    return [...root.querySelectorAll(sel)];
  }

  function revealOnScroll() {
    const nodes = $$(".mx-reveal, .mx-stagger, .geo-shell");
    nodes.forEach((el) => {
      if (!el.classList.contains("mx-reveal") && el.classList.contains("geo-shell")) {
        el.classList.add("mx-reveal");
      }
    });

    if (reduced) {
      $$(".mx-reveal, .mx-stagger").forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    $$(".mx-reveal, .mx-stagger").forEach((el) => io.observe(el));
  }

  function enhanceCards() {
    const selectors = [
      ".poetry-card",
      ".type-item",
      ".mall-card",
      ".pay-card",
      ".art-upload",
      ".art-pane",
      ".stk-form",
      ".song-item",
      ".char-chip",
    ];
    selectors.forEach((sel) => {
      $$(sel).forEach((el) => {
        el.classList.add("mx-card");
        if (el.classList.contains("pay-card--shop")) el.classList.add("mx-card--green");
        if (el.classList.contains("pay-card--ride")) el.classList.add("mx-card--blue");
      });
    });
  }

  function floatTilt() {
    if (reduced) return;
    $$(".mx-float, .geo-shell, .overlay-panel").forEach((el) => {
      el.classList.add("mx-float");
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.classList.add("is-tilting");
        el.style.transform = `perspective(900px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-2px)`;
      });
      el.addEventListener("pointerleave", () => {
        el.classList.remove("is-tilting");
        el.style.transform = "";
      });
    });
  }

  function buildPersonalityRail() {
    // Personality section now uses psychology + zodiac cards (dating.js).
    return;
  }

  function enhanceHeroCta() {
    // Hero CTA is already a split button in the cinematic landing.
    return;
  }

  function enhancePayButtons() {
    const payBtn = document.getElementById("payBtn");
    if (!payBtn) return;
    payBtn.classList.add("mx-card", "mx-card--green");
  }

  function pulseNavOnExpand() {
    const menu = document.getElementById("menuBtn");
    if (!menu) return;
    menu.addEventListener("click", () => {
      menu.classList.toggle("is-active");
    });
  }

  function watchDynamicCards() {
    // Mall cards / poetry are rendered by other scripts — re-enhance after short delay
    const boost = () => enhanceCards();
    setTimeout(boost, 50);
    setTimeout(boost, 400);
    setTimeout(boost, 1200);
  }

  function init() {
    enhanceHeroCta();
    // Wait a tick so dating.js can render personality/poetry first
    setTimeout(() => {
      buildPersonalityRail();
      enhanceCards();
      revealOnScroll();
      floatTilt();
      enhancePayButtons();
      pulseNavOnExpand();
      watchDynamicCards();
    }, 0);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
