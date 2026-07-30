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
    const grid = document.getElementById("personalityGrid");
    if (!grid) return;

    // Convert grid into accordion motion rail while keeping selection API
    const items = [...grid.querySelectorAll(".type-item")];
    if (!items.length) return;

    const wrap = document.createElement("div");
    wrap.className = "mx-rail-wrap mx-reveal";

    const nav = document.createElement("div");
    nav.className = "mx-rail__nav";
    nav.innerHTML = `
      <button type="button" class="mx-ring" id="persPrev" aria-label="Previous personality">
        <svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>
      </button>
      <button type="button" class="mx-ring is-active" id="persNext" aria-label="Next personality">
        <svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>
      </button>
    `;

    const rail = document.createElement("div");
    rail.className = "mx-rail";
    rail.setAttribute("role", "listbox");
    rail.setAttribute("aria-label", "Personality types");

    const icons = [
      `<path d="M12 3c-2 3-5 5-5 9a5 5 0 0010 0c0-4-3-6-5-9z"/><path d="M9.5 14.5c.8 1.2 2.2 2 3.5 2s2.7-.8 3.5-2"/>`,
      `<circle cx="12" cy="12" r="7"/><path d="M5 12h14M12 5c2.5 2.2 2.5 11.8 0 14M12 5c-2.5 2.2-2.5 11.8 0 14"/>`,
      `<path d="M4 16l4-8 4 5 3-3 5 6"/>`,
      `<rect x="5" y="6" width="14" height="12" rx="1"/><path d="M5 10h14"/>`,
      `<path d="M4 12c3-4 5-4 8 0s5 4 8 0"/><path d="M4 16c3-4 5-4 8 0s5 4 8 0"/>`,
      `<circle cx="12" cy="12" r="3"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4"/>`,
    ];

    items.forEach((btn, i) => {
      const code = btn.querySelector(".type-code")?.textContent || `P-0${i + 1}`;
      const name = btn.querySelector(".type-name")?.textContent || "Type";
      const desc = btn.querySelector(".type-desc")?.textContent || "";
      const item = document.createElement("button");
      item.type = "button";
      item.className = "mx-rail__item mx-card";
      item.setAttribute("role", "option");
      item.setAttribute("aria-selected", i === 0 ? "true" : "false");
      if (i === 0) item.classList.add("is-active");
      item.dataset.name = name;
      item.innerHTML = `
        <span class="mx-rail__glow" aria-hidden="true"></span>
        <span class="mx-rail__num">${code}</span>
        <span class="mx-rail__icon" aria-hidden="true">
          <svg class="mx-progress" viewBox="0 0 42 42">
            <circle cx="21" cy="21" r="19"></circle>
            <circle class="mx-progress__val" cx="21" cy="21" r="19"></circle>
          </svg>
          <svg viewBox="0 0 24 24">${icons[i % icons.length]}</svg>
        </span>
        <span class="mx-rail__title">${name}</span>
        <span class="mx-rail__cta">Select →</span>
        <span class="mx-rail__body">${desc}</span>
      `;
      item.addEventListener("click", () => activateRailItem(rail, item, name));
      rail.appendChild(item);
    });

    grid.replaceWith(wrap);
    wrap.appendChild(nav);
    wrap.appendChild(rail);

    let index = 0;
    const list = () => [...rail.querySelectorAll(".mx-rail__item")];

    function go(delta) {
      const itemsNow = list();
      index = (index + delta + itemsNow.length) % itemsNow.length;
      activateRailItem(rail, itemsNow[index], itemsNow[index].dataset.name);
      itemsNow[index].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }

    nav.querySelector("#persPrev").addEventListener("click", () => go(-1));
    nav.querySelector("#persNext").addEventListener("click", () => go(1));
  }

  function activateRailItem(rail, item, name) {
    rail.querySelectorAll(".mx-rail__item").forEach((el) => {
      el.classList.remove("is-active");
      el.setAttribute("aria-selected", "false");
    });
    item.classList.add("is-active");
    item.setAttribute("aria-selected", "true");

    // Keep toast UX from dating.js personality selection
    const toast = document.getElementById("toast");
    if (toast) {
      toast.hidden = false;
      toast.textContent = `Personality · ${name}`;
      toast.className = "toast is-ok";
      clearTimeout(activateRailItem._t);
      activateRailItem._t = setTimeout(() => {
        toast.hidden = true;
      }, 2200);
    }
  }

  function enhanceHeroCta() {
    const cta = document.querySelector(".hero-cta .btn-block");
    if (!cta || cta.classList.contains("mx-split")) return;
    const href = cta.getAttribute("href") || "#match";
    const split = document.createElement("a");
    split.className = "mx-split";
    split.href = href;
    split.innerHTML = `<span>Start matching</span><i aria-hidden="true">→</i>`;
    cta.replaceWith(split);
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
