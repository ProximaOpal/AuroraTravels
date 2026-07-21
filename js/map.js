/**
 * Leaflet map widget — satellite default, amenities, search routes, fly-to pulse
 */
window.AuroraTravels = window.AuroraTravels || {};

window.AuroraTravels.createMapController = function createMapController({
  destinations,
  escapeHtml,
  whenReady,
}) {
  const mapWidget = document.getElementById("mapWidget");
  const mapSearchToggle = document.getElementById("mapSearchToggle");
  const mapSearchInput = document.getElementById("mapSearchInput");
  const mapExpandBtn = document.getElementById("mapExpandBtn");
  const mapCollapseBtn = document.getElementById("mapCollapseBtn");
  const mapFullscreenBtn = document.getElementById("mapFullscreenBtn");

  const first = destinations[0];
  const map = L.map("leafletMap", {
    zoomControl: false,
    attributionControl: true,
    preferCanvas: false,
  }).setView([first.lat, first.lng], first.zoom);

  // Satellite tiles under markers / amenities
  map.createPane("satellitePane");
  map.getPane("satellitePane").style.zIndex = 200;
  map.createPane("satLabelPane");
  map.getPane("satLabelPane").style.zIndex = 250;

  const SAT_ATTRIB =
    "Tiles &copy; Esri — Source: Esri, Maxar, Earthstar Geographics";

  // Imagery only — never street OSM
  const SATELLITE_URLS = [
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
  ];

  let satelliteLayer = null;
  let satUrlIndex = 0;
  let satErrorCount = 0;

  function addSatelliteLayer(urlIndex) {
    if (satelliteLayer) {
      map.removeLayer(satelliteLayer);
      satelliteLayer = null;
    }
    satUrlIndex = urlIndex;
    satErrorCount = 0;
    satelliteLayer = L.tileLayer(SATELLITE_URLS[urlIndex], {
      attribution: SAT_ATTRIB,
      maxZoom: 19,
      maxNativeZoom: 19,
      tileSize: 256,
      updateWhenIdle: false,
      updateWhenZooming: true,
      keepBuffer: 4,
      crossOrigin: true,
      className: "sat-tiles",
      pane: "satellitePane",
      errorTileUrl:
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
    });
    satelliteLayer.on("tileerror", () => {
      satErrorCount += 1;
      if (satErrorCount >= 4 && satUrlIndex < SATELLITE_URLS.length - 1) {
        addSatelliteLayer(satUrlIndex + 1);
      }
    });
    satelliteLayer.on("load", () => {
      mapWidget.classList.add("sat-ready");
    });
    satelliteLayer.addTo(map);
  }

  addSatelliteLayer(0);

  // Place-name labels over satellite (imagery still underneath)
  L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
    {
      attribution: "",
      maxZoom: 19,
      opacity: 0.75,
      pane: "satLabelPane",
      className: "sat-labels",
      updateWhenIdle: false,
    }
  ).addTo(map);

  if (!mapWidget.querySelector(".map-sat-badge")) {
    const badge = document.createElement("div");
    badge.className = "map-sat-badge";
    badge.textContent = "SATELLITE";
    badge.setAttribute("aria-hidden", "true");
    mapWidget.appendChild(badge);
  }

  const markerLayer = L.layerGroup().addTo(map);
  const amenityLayer = L.layerGroup().addTo(map);
  const routeLayer = L.layerGroup().addTo(map);
  let searchMarker = null;
  let pulseCircle = null;
  let pulseRing = null;
  let lastOrigin = L.latLng(first.lat, first.lng);
  let flyToken = 0;

  const AMENITY_DEFS = [
    { key: "lodge", label: "Safari Lodge", color: "#f59e0b", glyph: "⌂" },
    { key: "camp", label: "Campsite", color: "#10b981", glyph: "⛺" },
    { key: "gate", label: "Park Gate", color: "#ef4444", glyph: "⬡" },
    { key: "water", label: "Waterhole", color: "#38bdf8", glyph: "◉" },
    { key: "view", label: "Viewpoint", color: "#a78bfa", glyph: "◎" },
    { key: "airstrip", label: "Airstrip", color: "#f8fafc", glyph: "✈" },
    { key: "ranger", label: "Ranger Post", color: "#f97316", glyph: "⚑" },
    { key: "clinic", label: "Clinic", color: "#fb7185", glyph: "+" },
    { key: "fuel", label: "Fuel / Pump", color: "#facc15", glyph: "⛽" },
    { key: "picnic", label: "Picnic Site", color: "#34d399", glyph: "❀" },
    { key: "shop", label: "Curio Shop", color: "#e879f9", glyph: "◆" },
    { key: "toilet", label: "Restroom", color: "#94a3b8", glyph: "☰" },
  ];

  function amenityIcon(def) {
    return L.divIcon({
      className: "map-amenity-icon",
      html: `<div class="amenity-bubble" style="--c:${def.color}" title="${def.label}"><span>${def.glyph}</span></div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });
  }

  function goldPinIcon(size) {
    return L.divIcon({
      className: "map-pin-icon",
      html: `<svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true"><path d="M12 2C8 2 5 5 5 9c0 5.5 7 13 7 13s7-7.5 7-13c0-4-3-7-7-7z" fill="#8b5cf6" stroke="#fff" stroke-width="1"/></svg>`,
      iconSize: [size, size],
      iconAnchor: [size / 2, size],
    });
  }

  function whitePinIcon(size) {
    return L.divIcon({
      className: "map-pin-icon",
      html: `<svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true"><path d="M12 2C8 2 5 5 5 9c0 5.5 7 13 7 13s7-7.5 7-13c0-4-3-7-7-7z" fill="#fdfbff" stroke="#1e1626" stroke-width="1"/></svg>`,
      iconSize: [size, size],
      iconAnchor: [size / 2, size],
    });
  }

  function searchPinIcon() {
    return L.divIcon({
      className: "map-pin-icon",
      html: `<svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true"><path d="M12 2C8 2 5 5 5 9c0 5.5 7 13 7 13s7-7.5 7-13c0-4-3-7-7-7z" fill="#241333" stroke="#fff" stroke-width="1.2"/></svg>`,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
    });
  }

  function clearSearchMarker() {
    if (searchMarker) {
      map.removeLayer(searchMarker);
      searchMarker = null;
    }
  }

  function clearPulse() {
    if (pulseCircle) {
      map.removeLayer(pulseCircle);
      pulseCircle = null;
    }
    if (pulseRing) {
      map.removeLayer(pulseRing);
      pulseRing = null;
    }
  }

  function showFlyPulse(latlng) {
    clearPulse();
    const center = L.latLng(latlng);

    pulseCircle = L.circle(center, {
      radius: 350,
      color: "#3b82f6",
      weight: 2,
      fillColor: "#3b82f6",
      fillOpacity: 0.22,
      className: "fly-pulse-fill",
    }).addTo(map);

    pulseRing = L.circle(center, {
      radius: 350,
      color: "#60a5fa",
      weight: 3,
      fillOpacity: 0,
      className: "fly-pulse-ring",
    }).addTo(map);

    let radius = 350;
    const max = 2800;
    const step = () => {
      if (!pulseRing || !map.hasLayer(pulseRing)) return;
      radius += 90;
      pulseRing.setRadius(radius);
      pulseCircle.setRadius(Math.min(radius * 0.45, 1200));
      pulseCircle.setStyle({
        fillOpacity: Math.max(0.05, 0.28 - radius / 9000),
      });
      if (radius < max) {
        requestAnimationFrame(step);
      } else {
        window.setTimeout(clearPulse, 900);
      }
    };
    requestAnimationFrame(step);
  }

  function flyWithPulse(latlng, zoom, duration = 1.1) {
    const token = ++flyToken;
    map.flyTo(latlng, zoom, { duration });
    map.once("moveend", () => {
      if (token !== flyToken) return;
      showFlyPulse(latlng);
      lastOrigin = L.latLng(latlng);
    });
  }

  function offsetPoint(lat, lng, metersNorth, metersEast) {
    const dLat = metersNorth / 111320;
    const dLng = metersEast / (111320 * Math.cos((lat * Math.PI) / 180));
    return [lat + dLat, lng + dLng];
  }

  function buildAmenities(destination) {
    amenityLayer.clearLayers();
    const base = destination.amenities || [];

    // Seed many amenity overlays around the park centre + stops
    const seeds = [
      ...destination.stops.map((s, i) => ({
        lat: s.lat,
        lng: s.lng,
        def: AMENITY_DEFS[i % AMENITY_DEFS.length],
        name: s.name,
      })),
    ];

    const offsets = [
      [420, 180],
      [-380, 260],
      [520, -300],
      [-260, -420],
      [700, 80],
      [-640, 140],
      [180, 560],
      [-120, -620],
      [860, -200],
      [-780, 340],
      [300, -700],
      [-480, 620],
      [980, 260],
      [-900, -160],
      [120, 820],
      [-220, -880],
    ];

    offsets.forEach((pair, i) => {
      const [n, e] = pair;
      const [lat, lng] = offsetPoint(destination.lat, destination.lng, n, e);
      seeds.push({
        lat,
        lng,
        def: AMENITY_DEFS[i % AMENITY_DEFS.length],
        name: `${AMENITY_DEFS[i % AMENITY_DEFS.length].label}`,
      });
    });

    base.forEach((a, i) => {
      seeds.push({
        lat: a.lat,
        lng: a.lng,
        def: AMENITY_DEFS.find((d) => d.key === a.type) || AMENITY_DEFS[i % AMENITY_DEFS.length],
        name: a.name || a.type,
      });
    });

    seeds.forEach((item) => {
      L.marker([item.lat, item.lng], { icon: amenityIcon(item.def) })
        .addTo(amenityLayer)
        .bindPopup(
          `<b>${escapeHtml(item.name)}</b><br><span style="opacity:.75">${escapeHtml(item.def.label)}</span>`
        );
    });
  }

  function renderMapMarkers(destination) {
    markerLayer.clearLayers();
    destination.stops.forEach((stop, index) => {
      const icon = index === 0 ? goldPinIcon(30) : whitePinIcon(24);
      L.marker([stop.lat, stop.lng], { icon })
        .addTo(markerLayer)
        .bindPopup(`<b>${escapeHtml(stop.name)}</b>`);
    });
    buildAmenities(destination);
  }

  function drawToAndFro(from, to) {
    routeLayer.clearLayers();
    const outbound = L.polyline([from, to], {
      color: "#38bdf8",
      weight: 4,
      opacity: 0.95,
      dashArray: "10 8",
      lineCap: "round",
    }).addTo(routeLayer);

    // Slightly offset return path for visible "fro" leg
    const mid = L.latLng(
      (from.lat + to.lat) / 2 + 0.035,
      (from.lng + to.lng) / 2 - 0.035
    );
    const inbound = L.polyline([to, mid, from], {
      color: "#818cf8",
      weight: 3.5,
      opacity: 0.85,
      dashArray: "2 10",
      lineCap: "round",
    }).addTo(routeLayer);

    try {
      map.fitBounds(L.featureGroup([outbound, inbound]).getBounds().pad(0.25), {
        animate: true,
        duration: 0.8,
      });
    } catch (err) {
      // ignore fit bounds errors for identical points
    }
  }

  function invalidate() {
    whenReady(() => {
      map.invalidateSize({ pan: false });
      if (satelliteLayer) satelliteLayer.redraw();
    }, 60);
    whenReady(() => map.invalidateSize({ pan: false }), 320);
  }

  function flyMapTo(destination) {
    clearSearchMarker();
    routeLayer.clearLayers();
    const target = L.latLng(destination.lat, destination.lng);
    flyWithPulse(target, destination.zoom, 1.1);
    renderMapMarkers(destination);
    lastOrigin = target;
  }

  function setExpanded(open) {
    mapWidget.classList.toggle("expanded", open);
    mapCollapseBtn.style.display = open ? "flex" : "none";
    mapExpandBtn.style.display = open ? "none" : "flex";
    mapExpandBtn.setAttribute("aria-expanded", String(open));
    whenReady(() => {
      map.invalidateSize();
      if (satelliteLayer) satelliteLayer.redraw();
    }, 480);
  }

  function toggleMapSearch(forceOpen) {
    const open =
      forceOpen !== undefined
        ? forceOpen
        : !mapSearchInput.classList.contains("open");
    mapSearchInput.classList.toggle("open", open);
    mapSearchToggle.classList.toggle("active", open);
    mapSearchToggle.setAttribute("aria-expanded", String(open));
    if (open) {
      mapSearchInput.focus();
    } else {
      mapSearchInput.value = "";
    }
  }

  async function runMapSearch(query) {
    const trimmed = query.trim();
    if (!trimmed) return false;

    const previousPlaceholder = mapSearchInput.placeholder;
    mapSearchInput.placeholder = "Searching…";

    try {
      const url =
        "https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=ke&q=" +
        encodeURIComponent(trimmed);
      const res = await fetch(url, {
        headers: { Accept: "application/json" },
      });

      if (!res.ok) throw new Error("Geocoding request failed");

      const data = await res.json();
      if (data && data[0]) {
        const { lat, lon, display_name: displayName } = data[0];
        const target = L.latLng(Number(lat), Number(lon));
        clearSearchMarker();
        const shortPlace = escapeHtml(
          String(displayName).split(",").slice(0, 2).join(", ")
        );
        searchMarker = L.marker(target, { icon: searchPinIcon() })
          .addTo(map)
          .bindPopup(`<b>${escapeHtml(trimmed)}</b><br>${shortPlace}`)
          .openPopup();

        drawToAndFro(lastOrigin, target);
        flyWithPulse(target, 13, 1.15);

        if (!mapWidget.classList.contains("expanded")) {
          setExpanded(true);
        }
        return true;
      }

      mapSearchInput.placeholder = "No results — try again…";
      return false;
    } catch (err) {
      console.warn("Map search failed:", err);
      mapSearchInput.placeholder = "Search unavailable — try again";
      return false;
    } finally {
      window.setTimeout(() => {
        mapSearchInput.placeholder =
          previousPlaceholder || "Search a place in Kenya…";
      }, 2500);
    }
  }

  function jumpToStop(stop) {
    const target = L.latLng(stop.lat, stop.lng);
    drawToAndFro(lastOrigin, target);
    flyWithPulse(target, 15, 1.0);
    const marker = markerLayer.getLayers().find((layer) => {
      const ll = layer.getLatLng();
      return (
        Math.abs(ll.lat - stop.lat) < 1e-6 && Math.abs(ll.lng - stop.lng) < 1e-6
      );
    });
    if (marker) marker.openPopup();
    if (!mapWidget.classList.contains("expanded")) {
      setExpanded(true);
    }
  }

  function requestFullscreen() {
    const el = mapWidget;
    const enter =
      el.requestFullscreen ||
      el.webkitRequestFullscreen ||
      el.msRequestFullscreen;
    const exit =
      document.exitFullscreen ||
      document.webkitExitFullscreen ||
      document.msExitFullscreen;

    try {
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        if (enter) enter.call(el);
      } else if (exit) {
        exit.call(document);
      }
    } catch (err) {
      console.warn("Fullscreen unavailable:", err);
    }
  }

  mapSearchToggle.addEventListener("click", () => toggleMapSearch());
  mapSearchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      runMapSearch(mapSearchInput.value);
    }
    if (event.key === "Escape") {
      toggleMapSearch(false);
    }
  });

  mapExpandBtn.addEventListener("click", () => setExpanded(true));
  mapCollapseBtn.addEventListener("click", () => setExpanded(false));
  mapFullscreenBtn.addEventListener("click", requestFullscreen);

  document.getElementById("zoomIn").addEventListener("click", () => map.zoomIn());
  document.getElementById("zoomOut").addEventListener("click", () => map.zoomOut());

  document.addEventListener("fullscreenchange", () => {
    const active = Boolean(document.fullscreenElement);
    mapFullscreenBtn.classList.toggle("active", active);
    mapFullscreenBtn.setAttribute("aria-pressed", String(active));
    whenReady(() => map.invalidateSize(), 200);
  });
  document.addEventListener("webkitfullscreenchange", () => {
    const active = Boolean(document.webkitFullscreenElement);
    mapFullscreenBtn.classList.toggle("active", active);
    mapFullscreenBtn.setAttribute("aria-pressed", String(active));
    whenReady(() => map.invalidateSize(), 200);
  });

  renderMapMarkers(first);
  whenReady(() => map.invalidateSize(), 300);

  return {
    map,
    mapWidget,
    flyMapTo,
    setExpanded,
    runMapSearch,
    jumpToStop,
    clearSearchMarker,
    invalidate,
    toggleMapSearch,
  };
};
