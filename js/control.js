/**
 * Phone stage remote — posts page/action commands to the live app,
 * plus local ElevenLabs voice streaming on this device.
 * Accordion: child controls start collapsed.
 */
(function initControlRemote() {
  const statusEl = document.getElementById("status");
  const blocks = Array.from(document.querySelectorAll("[data-accordion]"));
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
    document.querySelectorAll(".page-btn[data-page]").forEach((btn) => {
      const isPage = btn.dataset.page === page && !btn.dataset.panel;
      const isMap =
        page === "page1" && btn.dataset.panel === "map" && lastPage === "page1";
      // Highlight the primary page button; Maps stays highlighted only while its panel is open.
      btn.classList.toggle(
        "is-active",
        btn.dataset.panel === "map"
          ? btn.closest("[data-accordion]")?.classList.contains("is-open") &&
              page === "page1"
          : btn.dataset.page === page && !btn.dataset.panel
      );
    });
  }

  function setOpen(block, open) {
    if (!block) return;
    const toggle = block.querySelector(".accordion-toggle");
    const children = block.querySelector(".remote-children");
    block.classList.toggle("is-open", open);
    if (toggle) toggle.setAttribute("aria-expanded", String(open));
    if (children) {
      if (open) children.removeAttribute("hidden");
      else children.setAttribute("hidden", "");
    }
  }

  function collapseAll(except) {
    blocks.forEach((block) => {
      if (block !== except) setOpen(block, false);
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

  function flash(btn) {
    btn.classList.add("is-sent");
    window.setTimeout(() => btn.classList.remove("is-sent"), 160);
  }

  // Main page / accordion toggles
  blocks.forEach((block) => {
    const toggle = block.querySelector(".page-btn");
    if (!toggle) return;

    toggle.addEventListener("click", async () => {
      flash(toggle);
      const hasChildren = !!block.querySelector(".remote-children");
      const willOpen = hasChildren && !block.classList.contains("is-open");

      if (hasChildren) {
        collapseAll(willOpen ? block : null);
        setOpen(block, willOpen);
      } else {
        collapseAll(null);
      }

      const page = toggle.dataset.page || null;
      const label = toggle.childNodes[0]?.textContent?.trim() || toggle.textContent.trim();
      if (page) {
        await send({ page }, label);
      } else {
        setStatus(willOpen ? `${label} open` : `${label} closed`, "ok");
      }

      // Maps: also expand the map widget on stage when opening the panel
      if (willOpen && toggle.dataset.panel === "map") {
        await send({ page: "page1", action: "map-expand" }, "Expand map");
      }
    });
  });

  // Child action buttons (not accordion toggles, not local-only)
  document.querySelectorAll(".sub-btn").forEach((btn) => {
    if (btn.hasAttribute("data-local")) return;
    btn.addEventListener("click", async (event) => {
      event.stopPropagation();
      flash(btn);
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

  document.getElementById("phoneVoiceStart")?.addEventListener("click", () => {
    flash(document.getElementById("phoneVoiceStart"));
    startPhoneVoice();
  });

  document.getElementById("phoneVoiceEnd")?.addEventListener("click", () => {
    endPhoneVoice();
  });

  const appLink = document.getElementById("appLink");
  if (appLink) {
    appLink.href = `${window.location.origin}/?present=1`;
  }

  // Start fully collapsed
  collapseAll(null);
  setStatus("Ready — tap a section to expand");
})();
