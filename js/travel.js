/**
 * Page 2 — Unified travel + accommodation booking (Page 1 layout twin)
 */
window.AuroraTravels = window.AuroraTravels || {};

window.AuroraTravels.createTravelPage = function createTravelPage({
  travelModes,
  stays,
  payment,
  onNavigate,
}) {
  const page = document.getElementById("pageTravel");
  const heroBg = document.getElementById("travelHeroBg");
  const heroTitle = document.getElementById("travelHeroTitle");
  const heroSub = document.getElementById("travelHeroSub");
  const modePill = document.getElementById("travelModePill");
  const cardsEl = document.getElementById("travelCards");
  const headingTitle = document.getElementById("travelHeadingTitle");
  const headingDesc = document.getElementById("travelHeadingDesc");
  const pinLabel = document.getElementById("travelPinLabel");
  const toggleTravel = document.getElementById("toggleTravel");
  const toggleStay = document.getElementById("toggleStay");
  const prevBtn = document.getElementById("travelPrev");
  const nextBtn = document.getElementById("travelNext");

  const overlay = document.getElementById("bookOverlay");
  const bookTitle = document.getElementById("bookTitle");
  const bookSub = document.getElementById("bookSub");
  const bookOperator = document.getElementById("bookOperator");
  const bookEta = document.getElementById("bookEta");
  const bookPrice = document.getElementById("bookPrice");
  const bookPhone = document.getElementById("bookPhone");
  const bookAmount = document.getElementById("bookAmount");
  const bookDate = document.getElementById("bookDate");
  const bookPay = document.getElementById("bookPay");
  const bookCancel = document.getElementById("bookCancel");
  const bookStatus = document.getElementById("bookStatus");

  let mode = "travel"; // travel | stay
  let current = 0;

  function list() {
    return mode === "travel" ? travelModes : stays;
  }

  function formatPrice(n) {
    return `KES ${Number(n).toLocaleString("en-KE")}`;
  }

  function renderHero(item) {
    heroBg.style.opacity = "0";
    window.setTimeout(() => {
      heroBg.style.backgroundImage = `url('${item.hero}')`;
      heroBg.style.opacity = "1";
    }, 120);
    heroTitle.textContent = item.name;
    heroSub.textContent = item.blurb;
    modePill.textContent = item.tag;
  }

  function renderCards() {
    const items = list();
    cardsEl.innerHTML = "";
    items.forEach((item, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `travel-card${index === current ? " active" : ""}`;
      btn.innerHTML = `
        <div class="travel-card-thumb" style="background-image:url('${item.thumb}')"></div>
        <div class="travel-card-body">
          <strong>${item.name}</strong>
          <span>${item.blurb}</span>
        </div>
        <div class="travel-card-meta">
          <div class="tag">${item.tag}</div>
          <div class="price">${formatPrice(item.price)}</div>
        </div>
      `;
      btn.addEventListener("click", () => {
        current = index;
        renderHero(item);
        renderCards();
        openBooking(item);
      });
      cardsEl.appendChild(btn);
    });
  }

  function setMode(next) {
    mode = next;
    current = 0;
    toggleTravel.classList.toggle("active", mode === "travel");
    toggleStay.classList.toggle("active", mode === "stay");
    pinLabel.textContent =
      mode === "travel" ? "Kenya & East Africa mobility" : "Stay across Kenya";
    headingTitle.textContent =
      mode === "travel" ? "Book your journey" : "Book your stay";
    headingDesc.textContent =
      mode === "travel"
        ? "Plane, train, coach, taxi, bike and ferry — one M-Pesa checkout for getting around Kenya and beyond."
        : "Safari camps, coastal houses, Rift cottages and city hotels — reserve with STK push.";
    const item = list()[0];
    renderHero(item);
    renderCards();
  }

  function openBooking(item) {
    bookTitle.textContent = item.name;
    bookSub.textContent = item.blurb;
    bookOperator.textContent = item.operator;
    bookEta.textContent = item.eta;
    bookPrice.textContent = `${formatPrice(item.price)} · ${item.unit}`;
    bookAmount.value = String(item.price);
    bookPhone.value = "";
    bookDate.value = "";
    bookStatus.textContent = "Ready for M-Pesa STK";
    bookPay.disabled = false;
    bookPay.textContent = "Pay · STK Push";
    overlay.classList.add("open");
  }

  function closeBooking() {
    payment.clearPoll();
    overlay.classList.remove("open");
  }

  async function confirmBooking() {
    const item = list()[current];
    const amount = Number(bookAmount.value) || item.price;
    bookPay.disabled = true;
    bookPay.textContent = "Authorizing…";
    bookStatus.textContent = "Sending STK push…";

    await payment.startStkPush({
      phone: bookPhone.value,
      amount,
      onStatus: (state, attempts) => {
        if (state === "polling") {
          bookPay.textContent = `Syncing (${attempts})`;
          bookStatus.textContent = "Waiting for M-Pesa PIN…";
        }
      },
      onSuccess: () => {
        bookPay.textContent = "Booked";
        bookStatus.textContent = "Payment verified · booking held";
        window.setTimeout(closeBooking, 1600);
      },
      onError: () => {
        bookPay.disabled = false;
        bookPay.textContent = "Pay · STK Push";
        bookStatus.textContent = "Ready for M-Pesa STK";
      },
    });
  }

  function step(delta) {
    const items = list();
    current = (current + delta + items.length) % items.length;
    renderHero(items[current]);
    renderCards();
  }

  toggleTravel.addEventListener("click", () => setMode("travel"));
  toggleStay.addEventListener("click", () => setMode("stay"));
  prevBtn.addEventListener("click", () => step(-1));
  nextBtn.addEventListener("click", () => step(1));
  bookCancel.addEventListener("click", closeBooking);
  bookPay.addEventListener("click", confirmBooking);
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closeBooking();
  });

  page.querySelectorAll("[data-page]").forEach((btn) => {
    if (btn.closest(".travel-toggle")) return;
    btn.addEventListener("click", () => {
      if (btn.dataset.page) onNavigate?.(btn.dataset.page);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (!page.classList.contains("visible")) return;
    if (overlay.classList.contains("open") && event.key === "Escape") {
      closeBooking();
      return;
    }
    if (event.key === "ArrowRight") step(1);
    if (event.key === "ArrowLeft") step(-1);
  });

  setMode("travel");

  return {
    show() {
      page.style.display = "block";
      requestAnimationFrame(() => page.classList.add("visible"));
    },
    hide() {
      closeBooking();
      page.classList.remove("visible");
      window.setTimeout(() => {
        if (!page.classList.contains("visible")) page.style.display = "none";
      }, 360);
    },
    next() {
      step(1);
    },
    prev() {
      step(-1);
    },
    setMode(next) {
      setMode(next === "stay" ? "stay" : "travel");
    },
  };
};
