/* PENZI Places — Nairobi satellite map, mall overlays, M-Pesa STK */

(() => {
  const CONFIG = Object.freeze({
    // Same-origin proxy → Marvel Network STK (real push; demo only if server allows)
    API_BASE_URL: "",
    POLL_INTERVAL_MS: 2500,
    POLL_MAX_ATTEMPTS: 16,
    GPS_ZOOM: 16,
    AUTH_RADIUS_M: 420,
  });

  /** Real shopping centres in Nairobi (WGS84). */
  const MALLS = [
    { id: "westgate", name: "Westgate Shopping Mall", area: "Westlands", lat: -1.25695, lng: 36.80515 },
    { id: "sarit", name: "Sarit Centre", area: "Westlands", lat: -1.26135, lng: 36.80395 },
    { id: "village", name: "Village Market", area: "Gigiri", lat: -1.22835, lng: 36.80455 },
    { id: "tworivers", name: "Two Rivers Mall", area: "Ruaka", lat: -1.21085, lng: 36.79515 },
    { id: "gardencity", name: "Garden City Mall", area: "Thika Rd", lat: -1.23195, lng: 36.87825 },
    { id: "trm", name: "Thika Road Mall", area: "Roysambu", lat: -1.21945, lng: 36.88815 },
    { id: "junction", name: "The Junction Mall", area: "Ngong Rd", lat: -1.29855, lng: 36.76205 },
    { id: "yaya", name: "Yaya Centre", area: "Kilimani", lat: -1.29185, lng: 36.78795 },
    { id: "hub", name: "The Hub Karen", area: "Karen", lat: -1.31925, lng: 36.71515 },
    { id: "waterfront", name: "Waterfront Karen", area: "Karen", lat: -1.32955, lng: 36.71195 },
    { id: "galleria", name: "Galleria Mall", area: "Langata", lat: -1.33685, lng: 36.76725 },
    { id: "nextgen", name: "Nextgen Mall", area: "Mombasa Rd", lat: -1.31655, lng: 36.83415 },
    { id: "capital", name: "Capital Centre", area: "Mombasa Rd", lat: -1.32015, lng: 36.83105 },
    { id: "southfield", name: "Southfield Mall", area: "South C", lat: -1.32055, lng: 36.83555 },
    { id: "prestige", name: "Prestige Plaza", area: "Ngong Rd", lat: -1.29255, lng: 36.78695 },
    { id: "diamond", name: "Diamond Plaza", area: "Parklands", lat: -1.26105, lng: 36.81915 },
    { id: "rosslyn", name: "Rosslyn Riviera Mall", area: "Rosslyn", lat: -1.20815, lng: 36.79705 },
    { id: "mountain", name: "Mountain Mall", area: "Thika Rd", lat: -1.24695, lng: 36.87415 },
    { id: "ciata", name: "Ciata City Mall", area: "Kiambu Rd", lat: -1.21985, lng: 36.89015 },
    { id: "adams", name: "Adams Arcade", area: "Ngong Rd", lat: -1.30015, lng: 36.78005 },
    { id: "crossroads", name: "Crossroad Mall", area: "Karen", lat: -1.31845, lng: 36.70355 },
    { id: "lavington", name: "Lavington Mall", area: "Lavington", lat: -1.28355, lng: 36.76845 },
    { id: "oasis", name: "Oasis Mall", area: "Westlands", lat: -1.26485, lng: 36.80425 },
    { id: "spring", name: "Spring Valley Mall", area: "Spring Valley", lat: -1.25415, lng: 36.78155 },
  ];

  const API = (() => {
    const BASE = CONFIG.API_BASE_URL;
    const request = async (url, options = {}) => {
      try {
        const response = await fetch(url, options);
        const text = await response.text();
        let data = {};
        try {
          data = text ? JSON.parse(text) : {};
        } catch {
          data = { message: text.slice(0, 120) || "Invalid gateway response" };
        }
        return { ok: response.ok, status: response.status, data };
      } catch (err) {
        return { ok: false, error: err.message, data: { message: err.message } };
      }
    };
    return {
      stkPush: (phone, amount) =>
        request(`${BASE}/api/stk-push`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone,
            amount: Math.floor(amount),
            hours: 1,
          }),
        }),
      queryPayment: (id) =>
        request(`${BASE}/api/query-payment?id=${encodeURIComponent(id)}`),
    };
  })();

  function friendlyPayError(raw, status) {
    const text = String(raw || "").trim();
    const lower = text.toLowerCase();
    if (
      status === 502 ||
      status === 503 ||
      status === 504 ||
      lower.includes("<!doctype") ||
      lower.includes("<html") ||
      lower.includes("<title>502") ||
      lower.includes("<title>503")
    ) {
      return "Payment gateway waking up — tap Try again in a moment.";
    }
    if (status === 429 || lower.includes("too many requests")) {
      return "M-Pesa gateway busy — wait a few seconds and try again.";
    }
    if (lower.includes("<") && lower.includes(">")) {
      return "Payment gateway temporarily unavailable — try again shortly.";
    }
    return text.slice(0, 160) || "Payment could not be started.";
  }

  function showPayError(message) {
    const sub = $("#payErrorSub");
    if (sub) sub.textContent = message || "Payment could not be started.";
    const overlay = $("#payErrorOverlay");
    if (overlay) overlay.hidden = false;
    toast(message || "Payment error", "err");
  }

  const PHONE = {
    isValid: (raw) => /^(07|01|254|\+254)\d{8}$/.test(String(raw).trim()),
    normalise: (raw) => {
      let p = String(raw).trim();
      if (p.startsWith("+")) p = p.slice(1);
      if (p.startsWith("0")) p = `254${p.slice(1)}`;
      return p;
    },
  };

  const state = {
    map: null,
    markers: new Map(),
    selectedId: null,
    payType: "shopping",
    gpsCircle: null,
    gpsMarker: null,
    amenityCircle: null,
    routeOut: null,
    routeBack: null,
    lastGps: null,
    activePoll: null,
    paying: false,
    mapReady: false,
  };

  function $(sel, root = document) {
    return root.querySelector(sel);
  }

  function toast(msg, kind = "") {
    const el = $("#toast");
    if (!el) return;
    el.hidden = false;
    el.textContent = msg;
    el.className = "toast" + (kind ? ` is-${kind}` : "");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => {
      el.hidden = true;
    }, 3200);
  }

  function setPayDot(mode) {
    const dot = $("#payStatusDot");
    if (!dot) return;
    dot.className = "status-dot" + (mode ? ` status-dot--${mode}` : "");
  }

  function mallIcon(active) {
    return L.divIcon({
      className: "mall-marker" + (active ? " is-active" : ""),
      html: `<span class="mall-pin"></span>`,
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    });
  }

  function initMap() {
    const el = $("#placesMap");
    if (!el || typeof L === "undefined") return;

    const map = L.map(el, {
      zoomControl: false,
      attributionControl: true,
      preferCanvas: true,
    }).setView([-1.286389, 36.817223], 12);

    map.createPane("satellitePane");
    map.getPane("satellitePane").style.zIndex = 200;

    const SAT_URLS = [
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
    ];

    let satLayer = null;
    let satIdx = 0;
    let satErrors = 0;

    function addSat(i) {
      if (satLayer) map.removeLayer(satLayer);
      satIdx = i;
      satErrors = 0;
      satLayer = L.tileLayer(SAT_URLS[i], {
        attribution:
          "Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics",
        maxZoom: 19,
        maxNativeZoom: 19,
        className: "sat-tiles",
        pane: "satellitePane",
        errorTileUrl:
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
      });
      satLayer.on("tileerror", () => {
        satErrors += 1;
        if (satErrors >= 4 && satIdx < SAT_URLS.length - 1) addSat(satIdx + 1);
      });
      satLayer.addTo(map);
    }

    addSat(0);
    L.control.zoom({ position: "bottomright" }).addTo(map);

    MALLS.forEach((m) => {
      const marker = L.marker([m.lat, m.lng], {
        icon: mallIcon(false),
        title: m.name,
      }).addTo(map);
      marker.bindTooltip(m.name, {
        direction: "top",
        offset: [0, -8],
        className: "mall-tip",
      });
      marker.on("click", () => selectMall(m.id, { fromMap: true }));
      state.markers.set(m.id, marker);
    });

    state.map = map;
    state.mapReady = true;

    // Invalidate size when section enters view
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            map.invalidateSize();
            if (!state.selectedId) {
              const bounds = L.latLngBounds(MALLS.map((m) => [m.lat, m.lng]));
              map.fitBounds(bounds.pad(0.12));
            }
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe($("#places"));
  }

  function renderMallCards() {
    const rail = $("#mallRail");
    if (!rail) return;
    rail.innerHTML = "";
    MALLS.forEach((m, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className =
        "mall-card geo-tile " +
        ["geo-tile--br", "geo-tile--tl", "geo-tile--tr", "geo-tile--bl"][i % 4];
      btn.dataset.id = m.id;
      btn.innerHTML = `
        <span class="meta-label">${m.area}</span>
        <span class="mall-card-name">${m.name}</span>
        <span class="mall-card-go">Focus →</span>
      `;
      btn.addEventListener("click", () => selectMall(m.id));
      rail.appendChild(btn);
    });
  }

  function selectMall(id, { fromMap = false } = {}) {
    const mall = MALLS.find((m) => m.id === id);
    if (!mall || !state.map) return;

    state.selectedId = id;
    $("#stkTarget").textContent = `${mall.name} · ${mall.area}`;

    document.querySelectorAll(".mall-card").forEach((el) => {
      el.classList.toggle("is-active", el.dataset.id === id);
    });

    state.markers.forEach((marker, mid) => {
      marker.setIcon(mallIcon(mid === id));
    });

    if (state.amenityCircle) {
      state.map.removeLayer(state.amenityCircle);
      state.amenityCircle = null;
    }

    state.amenityCircle = L.circle([mall.lat, mall.lng], {
      radius: CONFIG.AUTH_RADIUS_M,
      color: "#2f6fed",
      weight: 2,
      fillColor: "#2f6fed",
      fillOpacity: 0.18,
      className: "gps-radial",
    }).addTo(state.map);

    if (state.payType === "transport") {
      maybeDrawTransport(mall);
    } else {
      clearTransportRoutes();
      state.map.flyTo([mall.lat, mall.lng], CONFIG.GPS_ZOOM, { duration: 1.1 });
    }

    if (!fromMap) {
      const card = document.querySelector(`.mall-card[data-id="${id}"]`);
      card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }

  function clearGpsLayers() {
    if (!state.map) return;
    if (state.gpsCircle) {
      state.map.removeLayer(state.gpsCircle);
      state.gpsCircle = null;
    }
    if (state.gpsMarker) {
      state.map.removeLayer(state.gpsMarker);
      state.gpsMarker = null;
    }
  }

  function clearTransportRoutes() {
    if (!state.map) return;
    if (state.routeOut) {
      state.map.removeLayer(state.routeOut);
      state.routeOut = null;
    }
    if (state.routeBack) {
      state.map.removeLayer(state.routeBack);
      state.routeBack = null;
    }
  }

  /** Midpoint nudged sideways so outbound ≠ return visually. */
  function bentMid(a, b, sway = 0.22) {
    const mx = (a.lat + b.lat) / 2;
    const my = (a.lng + b.lng) / 2;
    const dx = b.lat - a.lat;
    const dy = b.lng - a.lng;
    return [mx - dy * sway, my + dx * sway];
  }

  /** Draw to-and-fro polylines: You → place (blue) and place → You (red dashed). */
  function drawTransportRoundTrip(from, mall) {
    if (!state.map || !from || !mall) return;
    clearTransportRoutes();

    const origin = [from.lat, from.lng];
    const dest = [mall.lat, mall.lng];
    const midOut = bentMid(from, mall, 0.12);
    const midBack = bentMid(mall, from, 0.18);

    state.routeOut = L.polyline([origin, midOut, dest], {
      color: "#2f6fed",
      weight: 4.5,
      opacity: 0.95,
      lineJoin: "round",
      className: "route-poly route-poly--out",
    })
      .bindTooltip("To · transport", { sticky: true })
      .addTo(state.map);

    state.routeBack = L.polyline([dest, midBack, origin], {
      color: "#e10600",
      weight: 3.5,
      opacity: 0.88,
      dashArray: "10 9",
      lineJoin: "round",
      className: "route-poly route-poly--back",
    })
      .bindTooltip("Fro · return", { sticky: true })
      .addTo(state.map);

    const bounds = L.latLngBounds([origin, dest, midOut, midBack]);
    state.map.fitBounds(bounds.pad(0.28), { maxZoom: 15, animate: true });
  }

  function maybeDrawTransport(mall) {
    if (state.payType !== "transport" || !mall) {
      clearTransportRoutes();
      return;
    }
    const from =
      state.lastGps ||
      (YOU_FALLBACK());
    drawTransportRoundTrip(from, mall);
  }

  function YOU_FALLBACK() {
    // Nairobi CBD if GPS not yet available
    return { lat: -1.286389, lng: 36.817223 };
  }

  function placeBlueRadial(lat, lng, { label = "You" } = {}) {
    clearGpsLayers();
    state.gpsCircle = L.circle([lat, lng], {
      radius: CONFIG.AUTH_RADIUS_M,
      color: "#2f6fed",
      weight: 2,
      fillColor: "#3b82f6",
      fillOpacity: 0.22,
      className: "gps-radial gps-radial--pulse",
    }).addTo(state.map);

    state.gpsMarker = L.circleMarker([lat, lng], {
      radius: 7,
      color: "#fff",
      weight: 2,
      fillColor: "#2f6fed",
      fillOpacity: 1,
    })
      .bindTooltip(label, { permanent: false, direction: "top" })
      .addTo(state.map);

    state.map.flyTo([lat, lng], CONFIG.GPS_ZOOM, { duration: 1.2 });
  }

  function nearestMall(lat, lng) {
    let best = MALLS[0];
    let bestD = Infinity;
    MALLS.forEach((m) => {
      const d = Math.hypot(m.lat - lat, m.lng - lng);
      if (d < bestD) {
        bestD = d;
        best = m;
      }
    });
    return best;
  }

  function requestGps({ thenSelect = true } = {}) {
    const status = $("#gpsStatus");
    if (!navigator.geolocation) {
      status.textContent = "GPS unavailable";
      toast("GPS not supported", "err");
      return Promise.reject(new Error("no_gps"));
    }
    status.textContent = "Locating…";
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude: lat, longitude: lng } = pos.coords;
          state.lastGps = { lat, lng };
          placeBlueRadial(lat, lng);
          status.textContent = `GPS · ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
          if (thenSelect) {
            const near = nearestMall(lat, lng);
            selectMall(near.id);
            toast(`Near ${near.name}`, "ok");
          } else if (state.payType === "transport" && state.selectedId) {
            const mall = MALLS.find((m) => m.id === state.selectedId);
            maybeDrawTransport(mall);
          }
          resolve({ lat, lng });
        },
        (err) => {
          status.textContent = "GPS denied";
          toast(err.message || "Location denied", "err");
          reject(err);
        },
        { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
      );
    });
  }

  function authenticatePlaceThenPay(mall) {
    // Zoom amenity + blue radial, then attempt GPS lock
    selectMall(mall.id);
    setPayDot("auth");
    $("#gpsStatus").textContent = "Authenticating place…";

    return requestGps({ thenSelect: false })
      .then(({ lat, lng }) => {
        state.lastGps = { lat, lng };
        placeBlueRadial(lat, lng, { label: "You" });
        if (state.amenityCircle) {
          state.map.removeLayer(state.amenityCircle);
        }
        state.amenityCircle = L.circle([mall.lat, mall.lng], {
          radius: CONFIG.AUTH_RADIUS_M,
          color: "#2f6fed",
          weight: 2,
          fillColor: "#2f6fed",
          fillOpacity: 0.16,
          className: "gps-radial",
        }).addTo(state.map);
        if (state.payType === "transport") {
          drawTransportRoundTrip({ lat, lng }, mall);
          $("#gpsStatus").textContent = `Route · to & fro · ${mall.name}`;
        } else {
          clearTransportRoutes();
          state.map.flyTo([mall.lat, mall.lng], CONFIG.GPS_ZOOM, { duration: 0.9 });
          $("#gpsStatus").textContent = `Authenticated · ${mall.name}`;
        }
        return true;
      })
      .catch(() => {
        $("#gpsStatus").textContent =
          state.payType === "transport"
            ? "GPS skipped · demo route from CBD"
            : "GPS skipped · amenity locked";
        if (!state.amenityCircle) {
          state.amenityCircle = L.circle([mall.lat, mall.lng], {
            radius: CONFIG.AUTH_RADIUS_M,
            color: "#2f6fed",
            weight: 2,
            fillColor: "#2f6fed",
            fillOpacity: 0.18,
            className: "gps-radial gps-radial--pulse",
          }).addTo(state.map);
        }
        if (state.payType === "transport") {
          maybeDrawTransport(mall);
        }
        return false;
      });
  }

  function clearPoll() {
    if (state.activePoll) {
      clearInterval(state.activePoll);
      state.activePoll = null;
    }
  }

  function resetPayBtn() {
    const btn = $("#payBtn");
    btn.disabled = false;
    btn.textContent = "Confirm & pay";
    state.paying = false;
    setPayDot("");
  }

  function showPaySuccess(mall, amount, type) {
    $("#paySuccessSub").textContent = `${type} · KES ${amount} · ${mall.name}`;
    $("#paySuccessOverlay").hidden = false;
    toast("Payment verified", "ok");
    if (type === "Transport") {
      maybeDrawTransport(mall);
    }
  }

  function pollPayment(checkoutID, mall, amount, type) {
    clearPoll();
    let attempts = 0;
    const btn = $("#payBtn");
    setPayDot("sync");

    state.activePoll = setInterval(async () => {
      attempts += 1;
      btn.textContent = `Syncing (${attempts})`;
      const { ok, data } = await API.queryPayment(checkoutID);

      if (ok && data.status === "paid") {
        clearPoll();
        setPayDot("ok");
        btn.textContent = "Transaction complete";
        showPaySuccess(mall, amount, type);
        setTimeout(resetPayBtn, 1200);
      } else if (ok && (data.status === "failed" || data.status === "cancelled")) {
        clearPoll();
        setPayDot("err");
        showPayError("Transaction failed or cancelled on the phone.");
        resetPayBtn();
      } else if (attempts >= CONFIG.POLL_MAX_ATTEMPTS) {
        clearPoll();
        setPayDot("err");
        showPayError("No M-Pesa response yet. Try again shortly.");
        resetPayBtn();
      }
    }, CONFIG.POLL_INTERVAL_MS);
  }

  async function handlePayment(e) {
    e.preventDefault();
    if (state.paying) return;

    const mall = MALLS.find((m) => m.id === state.selectedId);
    if (!mall) {
      showPayError("Select a shopping centre first.");
      return;
    }

    const phoneRaw = $("#payPhone").value;
    const amount = Number($("#payAmount").value);
    if (!PHONE.isValid(phoneRaw)) {
      showPayError("Invalid M-Pesa format. Use 07… / 01… / 254…");
      return;
    }
    if (!amount || amount < 1) {
      showPayError("Enter a valid amount (KES 1+).");
      return;
    }

    const type = state.payType === "transport" ? "Transport" : "Shopping";
    state.paying = true;
    const btn = $("#payBtn");
    btn.disabled = true;
    btn.textContent = "Authorizing…";
    setPayDot("auth");

    await authenticatePlaceThenPay(mall);

    btn.textContent = "Sending STK…";
    const phone = PHONE.normalise(phoneRaw);
    const { ok, data, status } = await API.stkPush(phone, amount);

    if (ok && (data.CheckoutRequestID || data.checkoutRequestID)) {
      const checkoutId = data.CheckoutRequestID || data.checkoutRequestID;
      const demo = !!data.demo;
      toast(demo ? "Demo STK · confirming…" : "STK sent · enter PIN", "ok");
      pollPayment(checkoutId, mall, Math.floor(amount), type);
    } else {
      const raw =
        (typeof data?.detail === "string" ? data.detail : null) ||
        data?.message ||
        data?.error ||
        "";
      showPayError(
        friendlyPayError(
          raw,
          status
        ) || "Gateway rejection. Check number and try again."
      );
      resetPayBtn();
    }
  }

  function wireUI() {
    $("#gpsLocateBtn")?.addEventListener("click", () => {
      requestGps({ thenSelect: true }).catch(() => {});
    });

    $("#payTypeShop")?.addEventListener("click", () => {
      state.payType = "shopping";
      $("#payTypeShop").classList.add("is-active");
      $("#payTypeRide").classList.remove("is-active");
      if (!$("#payAmount").value) $("#payAmount").value = "50";
      clearTransportRoutes();
      const mall = MALLS.find((m) => m.id === state.selectedId);
      if (mall && state.map) {
        state.map.flyTo([mall.lat, mall.lng], CONFIG.GPS_ZOOM, { duration: 0.8 });
      }
    });

    $("#payTypeRide")?.addEventListener("click", () => {
      state.payType = "transport";
      $("#payTypeRide").classList.add("is-active");
      $("#payTypeShop").classList.remove("is-active");
      if (Number($("#payAmount").value) < 100) $("#payAmount").value = "150";
      const mall = MALLS.find((m) => m.id === state.selectedId);
      if (mall) {
        maybeDrawTransport(mall);
        toast("Route · to & fro on map", "ok");
      } else {
        toast("Pick a place for the transport route", "err");
      }
    });

    $("#stkForm")?.addEventListener("submit", handlePayment);

    $("#paySuccessClose")?.addEventListener("click", () => {
      $("#paySuccessOverlay").hidden = true;
    });

    $("#payErrorClose")?.addEventListener("click", () => {
      $("#payErrorOverlay").hidden = true;
    });

    $("#payErrorOverlay")?.addEventListener("click", (e) => {
      if (e.target.id === "payErrorOverlay") $("#payErrorOverlay").hidden = true;
    });
  }

  function init() {
    renderMallCards();
    initMap();
    wireUI();

    window.PenziPlaces = {
      focusLocation({ lat, lng, label = "Location", mallId = null } = {}) {
        if (!state.map) return;
        if (mallId) {
          const exists = MALLS.some((m) => m.id === mallId);
          if (exists) {
            selectMall(mallId);
            $("#gpsStatus").textContent = label;
            return;
          }
        }
        if (typeof lat !== "number" || typeof lng !== "number") return;
        if (state.amenityCircle) {
          state.map.removeLayer(state.amenityCircle);
          state.amenityCircle = null;
        }
        placeBlueRadial(lat, lng, { label });
        state.amenityCircle = L.circle([lat, lng], {
          radius: CONFIG.AUTH_RADIUS_M,
          color: "#2f6fed",
          weight: 2,
          fillColor: "#2f6fed",
          fillOpacity: 0.16,
          className: "gps-radial gps-radial--pulse",
        }).addTo(state.map);
        state.map.flyTo([lat, lng], CONFIG.GPS_ZOOM, { duration: 1.1 });
        $("#gpsStatus").textContent = label;
        $("#stkTarget").textContent = label;
      },
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
