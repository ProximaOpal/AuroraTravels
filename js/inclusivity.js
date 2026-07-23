/**
 * Page 5 — Inclusivity
 */
window.AuroraTravels = window.AuroraTravels || {};

window.AuroraTravels.createInclusivityPage = function createInclusivityPage() {
  const page = document.getElementById("pageInclusivity");

  return {
    show() {
      page.style.display = "block";
      requestAnimationFrame(() => page.classList.add("visible"));
    },
    hide() {
      page.classList.remove("visible");
      window.setTimeout(() => {
        if (!page.classList.contains("visible")) page.style.display = "none";
      }, 450);
    },
  };
};
