/**
 * Aurora Travels — main UI: destinations, drawer, overview, landing
 */
(function initAuroraTravels() {
  const { destinations, utils, createMapController } = window.AuroraTravels;
  const { escapeHtml, whenReady } = utils;

  let current = 0;

  const heroBg = document.getElementById("heroBg");
  const destTitle = document.getElementById("destTitle");
  const destDesc = document.getElementById("destDesc");
  const regionTag = document.getElementById("regionTag");
  const extTag = document.getElementById("extTag");
  const locVal = document.getElementById("locVal");
  const mapLink = document.getElementById("mapLink");
  const coordVal = document.getElementById("coordVal");
  const distVal = document.getElementById("distVal");
  const tempVal = document.getElementById("tempVal");

  const searchBtn = document.getElementById("searchBtn");
  const searchWrap = document.getElementById("searchWrap");
  const destSearchInput = document.getElementById("destSearchInput");
  const searchHint = document.getElementById("searchHint");
  const defaultSearchHint = searchHint.textContent;

  const menuBtn = document.getElementById("menuBtn");
  const drawer = document.getElementById("drawer");
  const scrim = document.getElementById("scrim");
  const drawerList = document.getElementById("drawerList");

  const overview = document.getElementById("overview");
  const cardGrid = document.getElementById("cardGrid");
  const lightbox = document.getElementById("lightbox");

  const landing = document.getElementById("landing");
  const landingOverlay = document.getElementById("landingOverlay");
  const stage = document.getElementById("stage");

  const mapController = createMapController({
    destinations,
    escapeHtml,
    whenReady,
  });

  const parkCounter = document.getElementById("parkCounter");
  const heroTitle = document.querySelector(".hero-title");

  function render() {
    const destination = destinations[current];
    heroBg.style.opacity = "0";

    window.setTimeout(() => {
      heroBg.style.backgroundImage = `url('${destination.img}')`;
      heroBg.style.opacity = "1";
    }, 150);

    if (heroTitle) heroTitle.textContent = destination.name;
    destTitle.textContent = destination.name;
    destDesc.textContent = destination.desc;
    regionTag.textContent = destination.region;
    extTag.textContent = destination.ext;
    locVal.textContent = destination.loc;
    coordVal.textContent = destination.coord;
    distVal.textContent = destination.dist;
    mapLink.href = `https://www.google.com/maps/search/?api=1&query=${destination.mapQ}`;
    mapLink.setAttribute(
      "aria-label",
      `Open ${destination.name} in Google Maps`
    );
    if (parkCounter) {
      const n = String(current + 1).padStart(2, "0");
      const t = String(destinations.length).padStart(2, "0");
      parkCounter.textContent = `${n} / ${t}`;
    }

    mapController.flyMapTo(destination);
  }

  heroBg.style.transition = "opacity .35s ease";
  render();

  document.getElementById("nextBtn").addEventListener("click", () => {
    current = (current + 1) % destinations.length;
    render();
  });

  document.getElementById("prevBtn").addEventListener("click", () => {
    current = (current - 1 + destinations.length) % destinations.length;
    render();
  });

  /* ---- destination / landmark search ---- */
  function setSearchOpen(open) {
    searchWrap.classList.toggle("open", open);
    searchBtn.classList.toggle("active", open);
    searchBtn.setAttribute("aria-expanded", String(open));
    if (open) {
      whenReady(() => destSearchInput.focus(), 150);
    } else {
      destSearchInput.value = "";
      searchHint.textContent = defaultSearchHint;
    }
  }

  searchBtn.addEventListener("click", () => {
    setSearchOpen(!searchWrap.classList.contains("open"));
  });

  function jumpToStop(destIndex, stop) {
    current = destIndex;
    render();
    whenReady(() => mapController.jumpToStop(stop), 250);
  }

  async function runDestinationSearch(raw) {
    const query = raw.trim().toLowerCase();
    if (!query) return;

    const destIdx = destinations.findIndex(
      (d) =>
        d.name.toLowerCase().includes(query) ||
        d.region.toLowerCase().includes(query)
    );

    if (destIdx !== -1) {
      current = destIdx;
      render();
      searchHint.textContent = `Showing "${destinations[destIdx].name}"`;
      return;
    }

    for (let i = 0; i < destinations.length; i += 1) {
      const stop = destinations[i].stops.find((s) =>
        s.name.toLowerCase().includes(query)
      );
      if (stop) {
        searchHint.textContent = `Found "${stop.name}" near ${destinations[i].name}`;
        jumpToStop(i, stop);
        return;
      }
    }

    searchHint.textContent = `No local match — searching the map for "${raw.trim()}"…`;
    if (!mapController.mapWidget.classList.contains("expanded")) {
      mapController.setExpanded(true);
    }
    await mapController.runMapSearch(raw);
    searchHint.textContent = defaultSearchHint;
  }

  destSearchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      runDestinationSearch(destSearchInput.value);
    }
    if (event.key === "Escape") {
      setSearchOpen(false);
    }
  });

  /* ---- page navigation drawer ---- */
  function openDrawer() {
    drawer.classList.add("open");
    scrim.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    menuBtn.setAttribute("aria-expanded", "true");
    document.body.classList.add("drawer-open");
    syncNavActive();
  }

  function closeDrawer() {
    drawer.classList.remove("open");
    scrim.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("drawer-open");
  }

  menuBtn.addEventListener("click", openDrawer);
  document.getElementById("closeDrawer").addEventListener("click", closeDrawer);
  scrim.addEventListener("click", closeDrawer);

  /* ---- overview grid ---- */
  destinations.forEach((destination, index) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "card";
    card.style.backgroundImage = `url('${destination.img}')`;
    card.setAttribute("aria-label", `View ${destination.name}`);

    const label = document.createElement("span");
    label.textContent = destination.name;
    card.appendChild(label);

    card.addEventListener("click", () => {
      current = index;
      render();
      overview.classList.remove("open");
    });

    cardGrid.appendChild(card);
  });

  document.getElementById("backBtn").addEventListener("click", () => {
    overview.classList.add("open");
  });
  document.getElementById("closeOverview").addEventListener("click", () => {
    overview.classList.remove("open");
  });

  /* ---- video lightbox ---- */
  function openLightbox() {
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
  }

  document.getElementById("videoBar").addEventListener("click", openLightbox);
  document
    .getElementById("closeLightbox")
    .addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  /* ---- global keyboard shortcuts ---- */
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    if (lightbox.classList.contains("open")) {
      closeLightbox();
      return;
    }
    if (drawer.classList.contains("open")) {
      closeDrawer();
      return;
    }
    if (overview.classList.contains("open")) {
      overview.classList.remove("open");
      return;
    }
    if (mapController.mapWidget.classList.contains("expanded")) {
      mapController.setExpanded(false);
      return;
    }
    if (searchWrap.classList.contains("open")) {
      setSearchOpen(false);
    }
  });

  /* ---- subtle live temp variation ---- */
  window.setInterval(() => {
    const t = 30 + Math.round(Math.random() * 4);
    tempVal.textContent = `${t}°`;
  }, 8000);

  /* ---- landing → page navigation ---- */
  const {
    artifacts,
    payment,
    createMarketplace,
    guides,
    createGuidesPage,
    travelModes,
    stays,
    createTravelPage,
  } = window.AuroraTravels;

  let activePage = "home";
  let transitionBusy = false;

  const marketplace = createMarketplace({
    artifacts,
    payment,
    onNavigate: (page) => goToPage(page),
  });

  const guidesPage = createGuidesPage({
    guides,
    onNavigate: (page) => goToPage(page),
  });

  const inclusivityPage = window.AuroraTravels.createInclusivityPage();

  const travelPage = createTravelPage({
    travelModes,
    stays,
    payment,
    onNavigate: (page) => goToPage(page),
  });

  const globalHeader = document.getElementById("globalHeader");

  function syncNavActive() {
    document
      .querySelectorAll(
        ".global-nav button[data-page], .global-logo[data-page], .page-nav-item"
      )
      .forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.page === activePage);
      });
  }

  function setHeaderVisible(show) {
    if (!globalHeader) return;
    if (show) globalHeader.removeAttribute("hidden");
    else globalHeader.setAttribute("hidden", "");
  }

  function hideLanding() {
    landing.style.display = "none";
    landing.classList.remove("visible-home");
  }

  function showLanding() {
    landing.style.display = "flex";
    landing.classList.add("visible-home");
  }

  function hideAllContent(except) {
    if (except !== "page3") marketplace.hide();
    if (except !== "page4") guidesPage.hide();
    if (except !== "page2") travelPage.hide();
    if (except !== "page5") inclusivityPage.hide();
    if (except !== "page1") stage.classList.remove("visible");
  }

  function goToPage(page, { animate = true } = {}) {
    if (transitionBusy && animate) return;
    if (page === activePage && page !== "home") {
      closeDrawer();
      return;
    }

    const run = () => {
      activePage = page;
      closeDrawer();
      overview.classList.remove("open");

      if (page === "home") {
        hideAllContent();
        showLanding();
        setHeaderVisible(false);
        syncNavActive();
        return;
      }

      hideLanding();
      hideAllContent(page);
      setHeaderVisible(true);

      if (page === "page1") {
        stage.classList.add("visible");
        mapController.invalidate();
      } else if (page === "page2") {
        travelPage.show();
      } else if (page === "page3") {
        marketplace.show();
      } else if (page === "page4") {
        guidesPage.show();
      } else if (page === "page5") {
        inclusivityPage.show();
      }

      syncNavActive();
    };

    if (!animate || activePage === page) {
      run();
      return;
    }

    transitionBusy = true;
    landingOverlay.classList.add("run");
    window.setTimeout(() => {
      run();
    }, 600);
    window.setTimeout(() => {
      landingOverlay.classList.remove("run");
      transitionBusy = false;
    }, 1080);
  }

  /* ---- presentation remote (phone → this display) ---- */
  const presentMode = new URLSearchParams(window.location.search).has("present");
  let remoteSeq = 0;
  let autoAdvanceTimer = null;

  function applyRemoteCommand(cmd) {
    if (!cmd || !cmd.seq || cmd.seq <= remoteSeq) return;
    remoteSeq = cmd.seq;
    if (autoAdvanceTimer) {
      window.clearTimeout(autoAdvanceTimer);
      autoAdvanceTimer = null;
    }

    if (cmd.page) {
      goToPage(cmd.page, { animate: false });
    }

    // Let page shell paint before stepping galleries.
    window.setTimeout(() => {
      if (cmd.action === "park-next") {
        document.getElementById("nextBtn")?.click();
      } else if (cmd.action === "park-prev") {
        document.getElementById("prevBtn")?.click();
      } else if (cmd.action === "guide-next") {
        guidesPage.next();
      } else if (cmd.action === "guide-prev") {
        guidesPage.prev();
      } else if (cmd.action === "craft-next") {
        marketplace.next();
      } else if (cmd.action === "craft-prev") {
        marketplace.prev();
      } else if (cmd.action === "travel-next") {
        travelPage.next();
      } else if (cmd.action === "travel-prev") {
        travelPage.prev();
      } else if (cmd.action === "travel-mode") {
        travelPage.setMode("travel");
      } else if (cmd.action === "stay-mode") {
        travelPage.setMode("stay");
      } else if (cmd.action === "inc-up") {
        inclusivityPage.scrollBy(-320);
      } else if (cmd.action === "inc-down") {
        inclusivityPage.scrollBy(320);
      }
    }, cmd.page ? 40 : 0);
  }

  async function pollRemote() {
    try {
      const res = await fetch("/api/control", { cache: "no-store" });
      if (!res.ok) return;
      applyRemoteCommand(await res.json());
    } catch {
      /* offline / local file — ignore */
    }
  }

  // Always listen so projector can stay on the normal URL.
  window.setInterval(pollRemote, 450);
  pollRemote();

  drawerList.querySelectorAll(".page-nav-item").forEach((btn) => {
    btn.addEventListener("click", () => goToPage(btn.dataset.page));
  });

  document
    .querySelectorAll("#globalHeader [data-page]")
    .forEach((btn) => {
      btn.addEventListener("click", () => goToPage(btn.dataset.page));
    });

  function onLandingKey(event) {
    if (activePage !== "home" || landing.style.display === "none") return;
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      goToPage("page1");
    }
  }

  function onLandingWheel(event) {
    if (activePage !== "home" || landing.style.display === "none") return;
    if (Math.abs(event.deltaY) < 8 && Math.abs(event.deltaX) < 8) return;
    event.preventDefault();
    goToPage("page1");
  }

  window.addEventListener("keydown", onLandingKey);
  window.addEventListener("wheel", onLandingWheel, { passive: false });

  // Soft auto-advance from home → page 1 if idle (skip in present mode)
  if (!presentMode) {
    window.addEventListener("load", () => {
      autoAdvanceTimer = window.setTimeout(() => {
        if (activePage === "home") goToPage("page1");
      }, 5200);
    });
  }

  window.AuroraTravels.remote = {
    goToPage: (page) => goToPage(page, { animate: false }),
    presentMode,
  };

  syncNavActive();

  // ElevenLabs uses its own `placement` attribute for screen position.
  // Keep the attribute correct if the embed rewrites the host.
  function ensureConvaiPlacement() {
    const el = document.querySelector("elevenlabs-convai");
    if (!el) return;
    if (el.getAttribute("placement") !== "bottom-left") {
      el.setAttribute("placement", "bottom-left");
    }
    if (el.getAttribute("variant") !== "compact") {
      el.setAttribute("variant", "compact");
    }
    el.classList.add("aurora-convai");
  }
  ensureConvaiPlacement();
  window.setInterval(ensureConvaiPlacement, 2000);
})();
