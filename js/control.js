/**
 * Phone stage remote — posts page/action commands to the live app,
 * plus local ElevenLabs voice streaming on this device.
 */
(function initControlRemote() {
  const statusEl = document.getElementById("status");
  const buttons = Array.from(
    document.querySelectorAll("button[data-page], button[data-action]")
  ).filter((btn) => !btn.hasAttribute("data-local"));
  let lastPage = null;
  let busy = false;

  function setStatus(text, kind) {
    if (!statusEl) return;
    statusEl.textContent = text;
    statusEl.classList.remove("ok", "err");
    if (kind) statusEl.classList.add(kind);
  }

  function markActive(page) {
    if (!page) return;
    lastPage = page;
    document.querySelectorAll(".page-btn").forEach((btn) => {
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
      await res.json();
      if (payload.page) markActive(payload.page);
      setStatus(`Live · ${label}`, "ok");
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

      const page = btn.dataset.page || null;
      const action = btn.dataset.action || null;
      const label = btn.textContent.trim();
      const payload = {};
      if (page) payload.page = page;
      if (action) payload.action = action;
      await send(payload, label);
    });
  });

  /* ---- phone-local ElevenLabs stream ---- */
  function getPhoneWidget() {
    return document.getElementById("phoneConvai");
  }

  function callPhoneWidget(method) {
    const el = getPhoneWidget();
    if (!el) return false;
    try {
      if (typeof el[method] === "function") {
        el[method]();
        return true;
      }
    } catch (err) {
      console.warn("Phone widget method failed:", method, err);
    }
    try {
      const btn = el.shadowRoot?.querySelector("button");
      if (btn) {
        btn.click();
        return true;
      }
    } catch (err) {
      console.warn("Phone widget click fallback failed:", err);
    }
    return false;
  }

  async function startPhoneVoice() {
    // Avoid dual audio: end the projector call first.
    await send({ action: "voice-end" }, "End on stage");
    setStatus("Starting phone mic…");
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (callPhoneWidget("startConversation") || tries > 10) {
        window.clearInterval(timer);
        if (tries <= 10) setStatus("Phone voice live — speak to Aurora", "ok");
        else setStatus("Tap the widget bubble if mic didn’t start", "err");
      }
    }, 200);
  }

  function endPhoneVoice() {
    if (callPhoneWidget("endConversation")) {
      setStatus("Phone call ended", "ok");
    } else {
      setStatus("No active phone call", "err");
    }
  }

  document
    .getElementById("phoneVoiceStart")
    ?.addEventListener("click", () => {
      document.getElementById("phoneVoiceStart")?.classList.add("is-sent");
      window.setTimeout(
        () => document.getElementById("phoneVoiceStart")?.classList.remove("is-sent"),
        160
      );
      startPhoneVoice();
    });

  document.getElementById("phoneVoiceEnd")?.addEventListener("click", () => {
    endPhoneVoice();
  });

  const appLink = document.getElementById("appLink");
  if (appLink) {
    appLink.href = `${window.location.origin}/?present=1`;
  }

  markActive(lastPage);
  setStatus("Ready — pages, map, or Aurora voice");
})();
