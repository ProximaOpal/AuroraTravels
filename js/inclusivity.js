/**
 * Page 5 — Inclusivity
 */
window.AuroraTravels = window.AuroraTravels || {};

window.AuroraTravels.createInclusivityPage = function createInclusivityPage() {
  const page = document.getElementById("pageInclusivity");

  return {
    show() {
      if (!page) return;
      page.style.display = "block";
      page.style.opacity = "1";
      page.style.pointerEvents = "auto";
      requestAnimationFrame(() => page.classList.add("visible"));
    },
    hide() {
      if (!page) return;
      page.classList.remove("visible");
      page.style.opacity = "";
      page.style.pointerEvents = "";
      window.setTimeout(() => {
        if (!page.classList.contains("visible")) page.style.display = "none";
      }, 450);
    },
  };
};
