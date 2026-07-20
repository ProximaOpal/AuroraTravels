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

  function render() {
    const destination = destinations[current];
    heroBg.style.opacity = "0";

    window.setTimeout(() => {
      heroBg.style.backgroundImage = `url('${destination.img}')`;
      heroBg.style.opacity = "1";
    }, 150);

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

  /* ---- menu drawer ---- */
  function openDrawer() {
    drawer.classList.add("open");
    scrim.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    menuBtn.setAttribute("aria-expanded", "true");
    document.body.classList.add("drawer-open");
  }

  function closeDrawer() {
    drawer.classList.remove("open");
    scrim.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("drawer-open");
  }

  destinations.forEach((destination, index) => {
    const li = document.createElement("li");
    li.setAttribute("role", "button");
    li.tabIndex = 0;

    const img = document.createElement("img");
    img.src = destination.thumb;
    img.alt = "";
    img.width = 52;
    img.height = 52;
    img.loading = "lazy";

    const meta = document.createElement("div");
    const nameEl = document.createElement("div");
    nameEl.className = "dn";
    nameEl.textContent = destination.name;
    const regionEl = document.createElement("div");
    regionEl.className = "dt";
    regionEl.textContent = destination.region;
    meta.append(nameEl, regionEl);

    li.append(img, meta);

    const select = () => {
      current = index;
      render();
      closeDrawer();
      overview.classList.remove("open");
    };

    li.addEventListener("click", select);
    li.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        select();
      }
    });

    drawerList.appendChild(li);
  });

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

  /* ---- landing → app transition (auto, uses the wipe) ---- */
  window.addEventListener("load", () => {
    window.setTimeout(() => {
      landingOverlay.classList.add("run");
      window.setTimeout(() => {
        landing.style.display = "none";
        stage.classList.add("visible");
        mapController.invalidate();
      }, 600);
      window.setTimeout(() => {
        landingOverlay.classList.remove("run");
      }, 1080);
    }, 2400);
  });
})();
