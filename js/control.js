/**
 * Phone stage remote — posts page/action commands to the live app.
 */
(function initControlRemote() {
  const statusEl = document.getElementById("status");
  const buttons = Array.from(document.querySelectorAll("[data-page], [data-action]"));
  let lastPage = null;
  let busy = false;

  function setStatus(text, kind) {
    if (!statusEl) return;
    statusEl.textContent = text;
    statusEl.classList.remove("ok", "err");
    if (kind) statusEl.classList.add(kind);
  }

  function markActive(page) {
    lastPage = page;
    buttons.forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.page === page);
    });
  }

  async function send(payload, label) {
    if (busy) return;
    busy = true;
    setStatus(`Sending ${label}…`);
    try {
      const res = await fetch("/api/control", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (payload.page) markActive(payload.page);
      setStatus(`Live · ${label}`, "ok");
      return data;
    } catch (err) {
      setStatus("Could not reach live app", "err");
      console.error(err);
    } finally {
      busy = false;
    }
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      btn.classList.add("is-sent");
      window.setTimeout(() => btn.classList.remove("is-sent"), 160);
      if (btn.dataset.page) {
        await send({ page: btn.dataset.page }, btn.textContent.trim());
      } else if (btn.dataset.action) {
        await send({ action: btn.dataset.action }, btn.textContent.trim());
      }
    });
  });

  const appLink = document.getElementById("appLink");
  if (appLink) {
    appLink.href = `${window.location.origin}/?present=1`;
  }

  markActive(lastPage);
  setStatus("Ready — tap a page");
})();
