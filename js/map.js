/**
 * Leaflet map widget: markers, search, expand, fullscreen
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
  }).setView([first.lat, first.lng], first.zoom);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
    maxZoom: 19,
  }).addTo(map);

  const markerLayer = L.layerGroup().addTo(map);
  let searchMarker = null;

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

  function renderMapMarkers(destination) {
    markerLayer.clearLayers();
    destination.stops.forEach((stop, index) => {
      const icon = index === 0 ? goldPinIcon(30) : whitePinIcon(24);
      L.marker([stop.lat, stop.lng], { icon })
        .addTo(markerLayer)
        .bindPopup(`<b>${escapeHtml(stop.name)}</b>`);
    });
  }

  function invalidate() {
    whenReady(() => map.invalidateSize(), 60);
  }

  function flyMapTo(destination) {
    clearSearchMarker();
    map.flyTo([destination.lat, destination.lng], destination.zoom, {
      duration: 1.1,
    });
    renderMapMarkers(destination);
  }

  function setExpanded(open) {
    mapWidget.classList.toggle("expanded", open);
    mapCollapseBtn.style.display = open ? "flex" : "none";
    mapExpandBtn.style.display = open ? "none" : "flex";
    mapExpandBtn.setAttribute("aria-expanded", String(open));
    whenReady(() => map.invalidateSize(), 480);
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
        headers: {
          Accept: "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Geocoding request failed");
      }

      const data = await res.json();
      if (data && data[0]) {
        const { lat, lon, display_name: displayName } = data[0];
        clearSearchMarker();
        const shortPlace = escapeHtml(
          String(displayName).split(",").slice(0, 2).join(", ")
        );
        searchMarker = L.marker([lat, lon], { icon: searchPinIcon() })
          .addTo(map)
          .bindPopup(`<b>${escapeHtml(trimmed)}</b><br>${shortPlace}`)
          .openPopup();
        map.flyTo([lat, lon], 13, { duration: 1.1 });
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
        mapSearchInput.placeholder = previousPlaceholder || "Search a place in Kenya…";
      }, 2500);
    }
  }

  function jumpToStop(stop) {
    map.flyTo([stop.lat, stop.lng], 15, { duration: 1.0 });
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

  // Initial markers for first destination
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
