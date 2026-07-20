/**
 * Shared DOM / string helpers
 */
window.AuroraTravels = window.AuroraTravels || {};

window.AuroraTravels.utils = {
  /** Escape text for safe insertion into HTML */
  escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  },

  /** Prefer requestAnimationFrame-friendly size refresh for Leaflet */
  whenReady(fn, delay = 0) {
    window.setTimeout(() => {
      requestAnimationFrame(fn);
    }, delay);
  },
};
