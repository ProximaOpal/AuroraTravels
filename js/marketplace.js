/**
 * Page 2 — Kenyan Artifacts marketplace (MOVIESTAN-style UI)
 */
window.AuroraTravels = window.AuroraTravels || {};

window.AuroraTravels.createMarketplace = function createMarketplace({
  artifacts,
  payment,
  onExploreKenya,
}) {
  const page = document.getElementById("pageMarketplace");
  const titleEl = document.getElementById("mvTitle");
  const priceEl = document.getElementById("mvPrice");
  const genresEl = document.getElementById("mvGenres");
  const descEl = document.getElementById("mvDesc");
  const shopNameEl = document.getElementById("mvShopName");
  const shopMapsEl = document.getElementById("mvShopMaps");
  const starsEl = document.getElementById("mvStars");
  const heroVisual = document.getElementById("mvHeroVisual");
  const rail = document.getElementById("mvRail");
  const buyBtn = document.getElementById("mvBuyBtn");
  const addBtn = document.getElementById("mvAddBtn");
  const searchBtn = document.getElementById("mvSearchBtn");
  const searchPanel = document.getElementById("mvSearchPanel");
  const searchInput = document.getElementById("mvSearchInput");
  const menuBtns = document.querySelectorAll(".mv-menu button");

  const payModal = document.getElementById("payModal");
  const payPhone = document.getElementById("payPhone");
  const payAmount = document.getElementById("payAmount");
  const payItemName = document.getElementById("payItemName");
  const payItemPrice = document.getElementById("payItemPrice");
  const payConfirm = document.getElementById("payConfirm");
  const payCancel = document.getElementById("payCancel");
  const payStatusText = document.getElementById("payStatusText");
  const payStatusDot = document.getElementById("payStatusDot");

  let current = 0;
  let railLocked = false;
  const wishlist = new Set();

  function formatPrice(amount) {
    return `KES ${Number(amount).toLocaleString("en-KE")}`;
  }

  function renderStars(rating) {
    starsEl.innerHTML = "";
    for (let i = 1; i <= 5; i += 1) {
      const span = document.createElement("span");
      span.className = i <= rating ? "" : "empty";
      span.innerHTML =
        '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.4l1.1-6.5L2.6 9.3l6.5-.9L12 2.5z"/></svg>';
      starsEl.appendChild(span);
    }
  }

  function buildHeroLayers() {
    heroVisual.innerHTML = "";
    artifacts.forEach((item, index) => {
      const layer = document.createElement("div");
      layer.className = `mv-hero-img${index === 0 ? " active" : ""}`;
      layer.style.backgroundImage = `url('${item.hero}')`;
      layer.dataset.index = String(index);
      heroVisual.appendChild(layer);
    });
  }

  function buildRail() {
    rail.innerHTML = "";
    artifacts.forEach((item, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `mv-poster${index === 0 ? " active" : ""}`;
      btn.dataset.index = String(index);
      btn.setAttribute("aria-label", item.shortTitle);
      btn.innerHTML = `
        <div class="mv-poster-thumb" style="background-image:url('${item.poster}')"></div>
        <span class="mv-poster-label">${item.shortTitle}</span>
      `;
      btn.addEventListener("click", () => select(index, true));
      rail.appendChild(btn);
    });
  }

  function select(index, scrollPoster) {
    if (index < 0 || index >= artifacts.length) return;
    if (index === current && !scrollPoster) return;

    const item = artifacts[index];
    current = index;

    titleEl.classList.add("is-changing");
    descEl.style.opacity = "0";

    window.setTimeout(() => {
      titleEl.textContent = item.title;
      priceEl.textContent = Number(item.price).toLocaleString("en-KE");
      genresEl.textContent = item.category;
      descEl.textContent = item.desc;
      shopNameEl.textContent = `${item.shop.name} · ${item.shop.city}`;
      shopMapsEl.href = item.shop.maps;
      shopMapsEl.textContent = "Open in Google Maps ↗";
      renderStars(item.rating);
      titleEl.classList.remove("is-changing");
      descEl.style.opacity = "1";
    }, 180);

    heroVisual.querySelectorAll(".mv-hero-img").forEach((layer, i) => {
      layer.classList.toggle("active", i === index);
    });

    rail.querySelectorAll(".mv-poster").forEach((poster, i) => {
      poster.classList.toggle("active", i === index);
    });

    if (scrollPoster) {
      const activePoster = rail.querySelector(`.mv-poster[data-index="${index}"]`);
      activePoster?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }

    addBtn.classList.toggle("wish", wishlist.has(item.id));
  }

  function openPayModal() {
    const item = artifacts[current];
    payItemName.textContent = item.shortTitle;
    payItemPrice.textContent = formatPrice(item.price);
    payAmount.value = String(item.price);
    payPhone.value = "";
    payStatusText.textContent = "Ready for M-Pesa STK";
    payStatusDot.className = "pay-status-dot";
    payConfirm.disabled = false;
    payConfirm.textContent = "Buy · STK Push";
    payModal.classList.add("open");
    payModal.setAttribute("aria-hidden", "false");
    window.setTimeout(() => payPhone.focus(), 80);
  }

  function closePayModal() {
    payment.clearPoll();
    payModal.classList.remove("open");
    payModal.setAttribute("aria-hidden", "true");
  }

  async function confirmPay() {
    const item = artifacts[current];
    const amount = Number(payAmount.value) || item.price;

    payConfirm.disabled = true;
    payConfirm.textContent = "Authorizing…";
    payStatusText.textContent = "Sending STK push…";
    payStatusDot.className = "pay-status-dot cyan";

    await payment.startStkPush({
      phone: payPhone.value,
      amount,
      onStatus: (state, attempts) => {
        if (state === "authorizing") {
          payConfirm.textContent = "Authorizing…";
          payStatusText.textContent = "Uplink to M-Pesa…";
        }
        if (state === "polling") {
          payConfirm.textContent = `Syncing (${attempts})`;
          payStatusText.textContent = "Waiting for PIN confirmation…";
          payStatusDot.className = "pay-status-dot cyan";
        }
      },
      onSuccess: () => {
        payConfirm.textContent = "Payment complete";
        payStatusText.textContent = "Verified · receipt secured";
        payStatusDot.className = "pay-status-dot ok";
        window.setTimeout(closePayModal, 1800);
      },
      onError: () => {
        payConfirm.disabled = false;
        payConfirm.textContent = "Buy · STK Push";
        payStatusText.textContent = "Ready for M-Pesa STK";
        payStatusDot.className = "pay-status-dot";
      },
    });
  }

  /* wheel on rail / page → next/prev artifact with smooth animation */
  function onWheel(event) {
    if (!page.classList.contains("visible")) return;
    if (payModal.classList.contains("open")) return;
    if (railLocked) return;

    const delta = event.deltaY || event.deltaX;
    if (Math.abs(delta) < 18) return;

    event.preventDefault();
    railLocked = true;
    const next =
      delta > 0
        ? (current + 1) % artifacts.length
        : (current - 1 + artifacts.length) % artifacts.length;
    select(next, true);
    window.setTimeout(() => {
      railLocked = false;
    }, 520);
  }

  function onKey(event) {
    if (!page.classList.contains("visible")) return;
    if (payModal.classList.contains("open")) {
      if (event.key === "Escape") closePayModal();
      return;
    }
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      select((current + 1) % artifacts.length, true);
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      select((current - 1 + artifacts.length) % artifacts.length, true);
    }
  }

  buyBtn.addEventListener("click", openPayModal);
  addBtn.addEventListener("click", () => {
    const id = artifacts[current].id;
    if (wishlist.has(id)) wishlist.delete(id);
    else wishlist.add(id);
    addBtn.classList.toggle("wish", wishlist.has(id));
    payment.TOAST.success(
      wishlist.has(id) ? "SAVED" : "REMOVED",
      wishlist.has(id)
        ? `${artifacts[current].shortTitle} added to list`
        : `${artifacts[current].shortTitle} removed`
    );
  });

  searchBtn.addEventListener("click", () => {
    searchPanel.classList.toggle("open");
    if (searchPanel.classList.contains("open")) searchInput.focus();
  });

  searchInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    const q = searchInput.value.trim().toLowerCase();
    if (!q) return;
    const idx = artifacts.findIndex(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.shortTitle.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.shop.name.toLowerCase().includes(q)
    );
    if (idx >= 0) {
      select(idx, true);
      searchPanel.classList.remove("open");
    } else {
      payment.TOAST.error("NO_MATCH", "No artifact matched that search.");
    }
  });

  menuBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      menuBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      if (!filter || filter === "all") {
        select(0, true);
        return;
      }
      const idx = artifacts.findIndex((a) =>
        a.category.toLowerCase().includes(filter)
      );
      if (idx >= 0) select(idx, true);
    });
  });

  payCancel.addEventListener("click", closePayModal);
  payConfirm.addEventListener("click", confirmPay);
  payModal.addEventListener("click", (event) => {
    if (event.target === payModal) closePayModal();
  });

  document.getElementById("mvExploreKenya")?.addEventListener("click", () => {
    onExploreKenya?.();
  });

  page.addEventListener("wheel", onWheel, { passive: false });
  document.addEventListener("keydown", onKey);

  buildHeroLayers();
  buildRail();
  current = -1;
  select(0, false);

  return {
    show() {
      page.style.display = "flex";
      requestAnimationFrame(() => page.classList.add("visible"));
    },
    hide() {
      page.classList.remove("visible");
      window.setTimeout(() => {
        if (!page.classList.contains("visible")) page.style.display = "none";
      }, 560);
    },
    isVisible() {
      return page.classList.contains("visible");
    },
  };
};
