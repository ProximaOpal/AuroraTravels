/**
 * Page 2 — Expanding pill gallery (GIF clone)
 * Click a side pill → it expands to the featured card; previous featured shrinks into a pill.
 */
window.AuroraTravels = window.AuroraTravels || {};

window.AuroraTravels.createMarketplace = function createMarketplace({
  artifacts,
  payment,
  onNavigate,
}) {
  const page = document.getElementById("pageMarketplace");
  const track = document.getElementById("galTrack");

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
  let animating = false;
  const cards = [];

  const ICONS = {
    bead: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3.2" fill="currentColor"/><circle cx="12" cy="12" r="7.2" stroke="currentColor" stroke-width="1.6"/><path d="M12 2.8v2.2M12 19v2.2M2.8 12h2.2M19 12h2.2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    mask: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 10c0-4.4 3.6-8 8-8s8 3.6 8 8v3.5c0 2.4-1.2 4.6-3.2 5.9L12 22l-4.8-2.6A7.1 7.1 0 0 1 4 13.5V10z" stroke="currentColor" stroke-width="1.6"/><path d="M8.5 11.5c.6-.7 1.4-1 2.2-1M15.5 11.5c-.6-.7-1.4-1-2.2-1M9 15c1 .9 2 .9 3 .9s2 0 3-.9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    carving: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l3.2 5.2L21 9.2l-4.2 4.3.9 5.8L12 16.8 6.3 19.3l.9-5.8L3 9.2l5.8-1L12 3z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    bracelet: '<svg viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="12" rx="8" ry="5.5" stroke="currentColor" stroke-width="1.7"/><ellipse cx="12" cy="12" rx="4.8" ry="3.2" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="6.6" r="1.2" fill="currentColor"/></svg>',
    spear: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 2l2.2 5.2L20 9l-4.4 3.2L16.8 18 12 15.2 7.2 18l1.2-5.8L4 9l5.8-1.8L12 2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 15.2V22" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  };

  function formatPrice(amount) {
    return `KES ${Number(amount).toLocaleString("en-KE")}`;
  }

  function buildCards() {
    track.innerHTML = "";
    cards.length = 0;

    artifacts.forEach((item, index) => {
      const card = document.createElement("article");
      card.className = `gal-card${index === 0 ? " active" : ""}`;
      card.dataset.index = String(index);
      card.setAttribute("role", "button");
      card.tabIndex = index === 0 ? -1 : 0;
      card.setAttribute(
        "aria-label",
        `${item.shop}: ${item.artifact}, ${formatPrice(item.price)}`
      );

      card.innerHTML = `
        <div class="gal-card-media" style="background-image:url('${item.image}')"></div>
        <div class="gal-card-shade"></div>
        <div class="gal-badge" style="color:${item.accent}">${ICONS[item.icon] || ICONS.bead}</div>
        <div class="gal-meta">
          <div class="gal-meta-text">
            <h2 class="gal-shop">${item.shop}</h2>
            <p class="gal-artifact">${item.artifact} · ${item.city}</p>
          </div>
          <div class="gal-meta-actions">
            <div class="gal-price"><span>PRICE</span>${Number(item.price).toLocaleString("en-KE")}</div>
            <div class="gal-actions">
              <a class="gal-btn gal-btn-maps" href="${item.maps}" target="_blank" rel="noopener noreferrer">Maps</a>
              <button type="button" class="gal-btn gal-btn-buy" data-buy="${index}">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7L8 5z"/></svg>
                Buy
              </button>
            </div>
          </div>
        </div>
      `;

      card.addEventListener("click", (event) => {
        if (event.target.closest("[data-buy]") || event.target.closest("a")) return;
        activate(index);
      });

      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activate(index);
        }
      });

      track.appendChild(card);
      cards.push(card);
    });

    track.querySelectorAll("[data-buy]").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        event.stopPropagation();
        const idx = Number(btn.getAttribute("data-buy"));
        activate(idx, false);
        openPayModal(idx);
      });
    });
  }

  function activate(index, allowToggle = true) {
    if (index < 0 || index >= artifacts.length) return;
    if (index === current && allowToggle) return;
    if (animating) return;

    const direction = index > current ? "right" : "left";
    animating = true;
    current = index;

    cards.forEach((card, i) => {
      const active = i === index;
      card.classList.remove("is-entering-left", "is-entering-right");
      card.classList.toggle("active", active);
      card.tabIndex = active ? -1 : 0;
      if (active) {
        card.classList.add(
          direction === "right" ? "is-entering-right" : "is-entering-left"
        );
      }
    });

    const activeCard = cards[index];
    if (activeCard) {
      activeCard.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }

    window.setTimeout(() => {
      cards[index]?.classList.remove("is-entering-left", "is-entering-right");
      animating = false;
    }, 780);
  }

  function openPayModal(index = current) {
    const item = artifacts[index];
    payItemName.textContent = `${item.artifact}`;
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

  function onWheel(event) {
    if (!page.classList.contains("visible")) return;
    if (payModal.classList.contains("open")) return;
    if (animating) return;
    const delta = event.deltaY || event.deltaX;
    if (Math.abs(delta) < 20) return;
    event.preventDefault();
    const next =
      delta > 0
        ? (current + 1) % artifacts.length
        : (current - 1 + artifacts.length) % artifacts.length;
    activate(next);
  }

  function onKey(event) {
    if (!page.classList.contains("visible")) return;
    if (payModal.classList.contains("open")) {
      if (event.key === "Escape") closePayModal();
      return;
    }
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      activate((current + 1) % artifacts.length);
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      activate((current - 1 + artifacts.length) % artifacts.length);
    }
  }

  payCancel.addEventListener("click", closePayModal);
  payConfirm.addEventListener("click", confirmPay);
  payModal.addEventListener("click", (event) => {
    if (event.target === payModal) closePayModal();
  });

  page.addEventListener("wheel", onWheel, { passive: false });
  document.addEventListener("keydown", onKey);

  buildCards();

  return {
    show() {
      page.style.display = "flex";
      requestAnimationFrame(() => page.classList.add("visible"));
    },
    hide() {
      page.classList.remove("visible");
      window.setTimeout(() => {
        if (!page.classList.contains("visible")) page.style.display = "none";
      }, 480);
    },
    isVisible() {
      return page.classList.contains("visible");
    },
  };
};
