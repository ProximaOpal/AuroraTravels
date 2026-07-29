/* PENZI — matchmaking, personality, poetry, pencil art, music */

const PROFILES = [
  { name: "Amina", city: "Mombasa", seed: "amina-ke", match: true },
  { name: "Brian", city: "Nairobi", seed: "brian-ke", match: false },
  { name: "Wanjiku", city: "Nyeri", seed: "wanjiku-ke", match: false },
  { name: "Otieno", city: "Kisumu", seed: "otieno-ke", match: false },
  { name: "Zawadi", city: "Lamu", seed: "zawadi-ke", match: true },
  { name: "Kevin", city: "Eldoret", seed: "kevin-ke", match: false },
  { name: "Faith", city: "Nakuru", seed: "faith-ke", match: false },
  { name: "Juma", city: "Malindi", seed: "juma-ke", match: false },
  { name: "Njeri", city: "Thika", seed: "njeri-ke", match: false },
  { name: "Hassan", city: "Garissa", seed: "hassan-ke", match: false },
  { name: "Imani", city: "Nairobi", seed: "imani-ke", match: true },
  { name: "Diana", city: "Kitale", seed: "diana-ke", match: false },
  { name: "Mwangi", city: "Nanyuki", seed: "mwangi-ke", match: false },
  { name: "Aisha", city: "Mombasa", seed: "aisha-ke", match: false },
  { name: "Leo", city: "Nairobi", seed: "leo-ke", match: false },
  { name: "Halima", city: "Lamu", seed: "halima-ke", match: false },
  { name: "Sam", city: "Kisii", seed: "sam-ke", match: false },
  { name: "Mercy", city: "Kericho", seed: "mercy-ke", match: false },
];

const YOU = { name: "You", city: "Nairobi", seed: "penzi-you" };

const PERSONALITIES = [
  { code: "P-01", name: "SAVANNA", desc: "Warm, steady, open sky energy." },
  { code: "P-02", name: "COAST", desc: "Soft humor, salt air, late walks." },
  { code: "P-03", name: "HIGHLAND", desc: "Quiet depth, coffee, long talks." },
  { code: "P-04", name: "CITY", desc: "Fast wit, night markets, drive." },
  { code: "P-05", name: "RIVER", desc: "Flowing, curious, always learning." },
  { code: "P-06", name: "EARTH", desc: "Grounded, loyal, family-first." },
];

const CHARACTERS = [
  {
    id: "genz",
    label: "GEN Z",
    blurb: "Memes, late-night voice notes, and honesty before polish. You want chemistry that feels current — but rooted in Kenya.",
  },
  {
    id: "millennial",
    label: "MILLENNIAL",
    blurb: "Career chapters, intentional dating, and playlists that still slap. You build slowly and mean it.",
  },
  {
    id: "traditional",
    label: "TRADITIONAL",
    blurb: "Respect, family circles, and clear intentions. Culture is not a costume — it is how you love.",
  },
  {
    id: "creative",
    label: "CREATIVE",
    blurb: "Poetry drafts, gallery Sundays, studio nights. You match through what you make.",
  },
  {
    id: "adventurer",
    label: "ADVENTURER",
    blurb: "Road trips to Naivasha, sunrise hikes, new cities. Connection is a shared map.",
  },
  {
    id: "soft",
    label: "SOFT LIFE",
    blurb: "Low drama, high care. You curate peace and invite someone into it.",
  },
];

const POEMS = [
  {
    id: "p1",
    text: "Nairobi dusk 🌆\nand your laugh finds me\nbetween matatu lights ✨",
    author: "Anon · Westlands",
  },
  {
    id: "p2",
    text: "Coast salt on skin 🌊\nI keep your name\nlike a tide returning 💫",
    author: "Anon · Nyali",
  },
  {
    id: "p3",
    text: "Two cups of chai ☕\none quiet table\nand all the words we don't need 🤍",
    author: "Anon · Karen",
  },
  {
    id: "p4",
    text: "If love is a road 🛤️\nlet ours be red earth\nand morning mist 🌿",
    author: "Anon · Limuru",
  },
];

const SONGS = [
  { title: "Suzanna", artist: "Sauti Sol" },
  { title: "Short N Sweet", artist: "Nyashinski" },
  { title: "Melanin", artist: "Sauti Sol · Patoranking" },
  { title: "Nerea", artist: "Sauti Sol" },
  { title: "Wabebe", artist: "Bien · Mega" },
  { title: "Kuna Kitu", artist: "Cizu" },
  { title: "Feeling", artist: "Bensoul" },
  { title: "Nakupenda", artist: "H_art the Band" },
];

const SCENES = [
  { id: "raw", label: "Raw" },
  { id: "soft", label: "Soft light" },
  { id: "high", label: "High contrast" },
  { id: "grain", label: "Grain" },
  { id: "warm", label: "Warm dusk" },
];

function avatarUrl(seed, size = 256) {
  return `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(seed)}&size=${size}&backgroundColor=e10600,f7f5f2,0a0a0a`;
}

/* ——— state ——— */
const state = {
  matches: 0,
  selectedPersonality: null,
  selectedCharacter: "genz",
  activeSong: null,
  artImage: null,
  scene: "raw",
  matchLocked: false,
};

/* ——— helpers ——— */
function $(sel, root = document) {
  return root.querySelector(sel);
}

function $all(sel, root = document) {
  return [...root.querySelectorAll(sel)];
}

function showToast(msg, kind = "") {
  const el = $("#toast");
  el.hidden = false;
  el.textContent = msg;
  el.className = "toast" + (kind ? ` is-${kind}` : "");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => {
    el.hidden = true;
  }, 2400);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ——— matchmaking ——— */
function renderConstant() {
  $("#constantImg").src = avatarUrl(YOU.seed, 220);
  $("#constantName").textContent = YOU.name;
  $("#constantTag").textContent = YOU.city;
}

function renderOrbit(list = PROFILES) {
  const track = $("#orbitTrack");
  track.innerHTML = "";
  list.forEach((p, i) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "orbit-card";
    card.dataset.match = p.match ? "1" : "0";
    card.dataset.name = p.name;
    card.style.animationDelay = `${i * 40}ms`;
    card.innerHTML = `
      <img class="avatar" src="${avatarUrl(p.seed, 180)}" alt="${p.name}" width="96" height="96" loading="lazy">
      <p class="avatar-name">${p.name}</p>
      <p class="avatar-tag">${p.city}</p>
    `;
    card.addEventListener("click", () => attemptMatch(card));
    track.appendChild(card);
  });
}

function clearMatchVisuals() {
  const ring = $("#constantRing");
  ring.className = "ring ring--idle";
  $("#matchConnector").classList.remove("is-on");
  $all(".orbit-card.is-matched").forEach((c) => c.classList.remove("is-matched"));
  state.matchLocked = false;
}

function attemptMatch(card) {
  if (state.matchLocked) return;
  state.matchLocked = true;

  const isMatch = card.dataset.match === "1";
  const ring = $("#constantRing");
  const connector = $("#matchConnector");
  const status = $("#matchStatus");

  $all(".orbit-card.is-focus").forEach((c) => c.classList.remove("is-focus"));
  card.classList.add("is-focus");
  card.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });

  if (isMatch) {
    ring.className = "ring ring--success";
    card.classList.add("is-matched");
    connector.classList.add("is-on");
    status.innerHTML = `<p class="ok">Bond formed with ${card.dataset.name}</p>`;
    state.matches += 1;
    $("#matchBadge").textContent = String(state.matches);
    setTimeout(() => {
      $("#successSub").textContent = `${YOU.name} ↔ ${card.dataset.name} · green line locked`;
      $("#successOverlay").hidden = false;
    }, 550);
    showToast("Match success", "ok");
  } else {
    ring.className = "ring ring--error";
    status.innerHTML = `<p class="bad">No bond with ${card.dataset.name}</p>`;
    setTimeout(() => {
      $("#errorOverlay").hidden = false;
    }, 350);
    showToast("No match", "err");
    setTimeout(() => {
      ring.className = "ring ring--idle";
      state.matchLocked = false;
    }, 900);
  }
}

function tryNearestFocus() {
  const rail = $("#orbitRail");
  const cards = $all(".orbit-card");
  if (!cards.length) return;
  const mid = rail.getBoundingClientRect().left + rail.clientWidth / 2;
  let best = cards[0];
  let bestDist = Infinity;
  cards.forEach((c) => {
    const r = c.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const d = Math.abs(cx - mid);
    if (d < bestDist) {
      bestDist = d;
      best = c;
    }
  });
  attemptMatch(best);
}

/* ——— personality / character ——— */
function renderPersonalities() {
  const grid = $("#personalityGrid");
  grid.innerHTML = "";
  PERSONALITIES.forEach((p) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "type-item";
    btn.setAttribute("role", "option");
    btn.setAttribute("aria-selected", "false");
    btn.innerHTML = `
      <span class="type-code">${p.code}</span>
      <span class="type-name">${p.name}</span>
      <span class="type-desc">${p.desc}</span>
    `;
    btn.addEventListener("click", () => {
      $all(".type-item").forEach((el) => el.setAttribute("aria-selected", "false"));
      btn.setAttribute("aria-selected", "true");
      state.selectedPersonality = p.name;
      showToast(`Personality · ${p.name}`, "ok");
    });
    grid.appendChild(btn);
  });
}

function renderCharacters() {
  const rail = $("#characterRail");
  rail.innerHTML = "";
  CHARACTERS.forEach((c) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "char-chip";
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", c.id === state.selectedCharacter ? "true" : "false");
    btn.textContent = c.label;
    btn.addEventListener("click", () => selectCharacter(c.id));
    rail.appendChild(btn);
  });
  selectCharacter(state.selectedCharacter, false);
}

function selectCharacter(id, toast = true) {
  const c = CHARACTERS.find((x) => x.id === id) || CHARACTERS[0];
  state.selectedCharacter = c.id;
  $("#characterDisplay").textContent = c.label;
  $("#characterBlurb").textContent = c.blurb;
  $all(".char-chip").forEach((el) => {
    el.setAttribute("aria-selected", el.textContent === c.label ? "true" : "false");
  });
  if (toast) showToast(`Character · ${c.label}`);
}

/* ——— poetry ——— */
function renderPoetry() {
  const list = $("#poetryList");
  list.innerHTML = "";
  POEMS.forEach((poem) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "poetry-card";
    btn.innerHTML = `
      <p class="poetry-text">${poem.text}</p>
      <div class="poetry-meta">
        <span class="meta-label">${poem.author}</span>
        <span class="poetry-send">Send →</span>
      </div>
    `;
    btn.addEventListener("click", () => {
      btn.classList.add("is-sent");
      btn.querySelector(".poetry-send").textContent = "Sent ✓";
      showToast("Poem sent", "ok");
    });
    list.appendChild(btn);
  });
}

/* ——— art / pencil ——— */
function renderScenes() {
  const wrap = $("#sceneBtns");
  wrap.innerHTML = "";
  SCENES.forEach((s) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "scene-btn";
    btn.textContent = s.label;
    btn.setAttribute("aria-pressed", s.id === state.scene ? "true" : "false");
    btn.addEventListener("click", () => {
      if (!state.artImage) {
        showToast("Upload an image first", "err");
        return;
      }
      state.scene = s.id;
      $all(".scene-btn").forEach((b) => b.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");
      drawArt();
    });
    wrap.appendChild(btn);
  });
}

function loadArtFile(file) {
  if (!file || !file.type.startsWith("image/")) {
    showToast("Use an image file", "err");
    $("#errorOverlay").hidden = false;
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      state.artImage = img;
      $("#artCanvases").hidden = false;
      $("#sceneRail").hidden = false;
      drawArt();
      showToast("Pencil scene ready", "ok");
    };
    img.onerror = () => {
      showToast("Could not read image", "err");
      $("#errorOverlay").hidden = false;
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
}

function drawArt() {
  const img = state.artImage;
  if (!img) return;

  const maxW = 720;
  const scale = Math.min(1, maxW / img.width);
  const w = Math.round(img.width * scale);
  const h = Math.round(img.height * scale);

  const orig = $("#canvasOriginal");
  const pencil = $("#canvasPencil");
  orig.width = pencil.width = w;
  orig.height = pencil.height = h;

  const octx = orig.getContext("2d");
  const pctx = pencil.getContext("2d");
  octx.clearRect(0, 0, w, h);
  octx.drawImage(img, 0, 0, w, h);

  // scene prep on a buffer
  const buf = document.createElement("canvas");
  buf.width = w;
  buf.height = h;
  const bctx = buf.getContext("2d");
  bctx.drawImage(img, 0, 0, w, h);

  applyScene(bctx, w, h, state.scene);
  const sketch = toPencil(bctx, w, h);
  pctx.putImageData(sketch, 0, 0);
}

function applyScene(ctx, w, h, scene) {
  const data = ctx.getImageData(0, 0, w, h);
  const d = data.data;
  for (let i = 0; i < d.length; i += 4) {
    let r = d[i];
    let g = d[i + 1];
    let b = d[i + 2];

    if (scene === "soft") {
      r = r * 0.92 + 18;
      g = g * 0.94 + 14;
      b = b * 0.9 + 10;
    } else if (scene === "high") {
      const contrast = 1.35;
      r = (r - 128) * contrast + 128;
      g = (g - 128) * contrast + 128;
      b = (b - 128) * contrast + 128;
    } else if (scene === "warm") {
      r = Math.min(255, r * 1.12 + 8);
      g = g * 0.98;
      b = b * 0.82;
    } else if (scene === "grain") {
      const n = (Math.random() - 0.5) * 28;
      r += n;
      g += n;
      b += n;
    }

    d[i] = clamp(r);
    d[i + 1] = clamp(g);
    d[i + 2] = clamp(b);
  }
  ctx.putImageData(data, 0, 0);
}

function toPencil(ctx, w, h) {
  const src = ctx.getImageData(0, 0, w, h);
  const gray = new Uint8ClampedArray(w * h);

  for (let i = 0, p = 0; i < src.data.length; i += 4, p++) {
    gray[p] = 0.299 * src.data[i] + 0.587 * src.data[i + 1] + 0.114 * src.data[i + 2];
  }

  // invert + blur approximation via box sample, then color-dodge blend
  const inverted = new Float32Array(w * h);
  for (let i = 0; i < gray.length; i++) inverted[i] = 255 - gray[i];

  const blurred = boxBlur(inverted, w, h, 3);
  const out = ctx.createImageData(w, h);

  for (let i = 0, p = 0; i < out.data.length; i += 4, p++) {
    const g = gray[p];
    const bl = blurred[p] || 1;
    // color dodge: base / (1 - blend)
    let v = (g * 255) / (255 - bl + 1);
    v = Math.min(255, v);
    // slight paper tone
    out.data[i] = v;
    out.data[i + 1] = v;
    out.data[i + 2] = Math.min(255, v * 0.98);
    out.data[i + 3] = 255;
  }
  return out;
}

function boxBlur(src, w, h, radius) {
  const out = new Float32Array(src.length);
  const tmp = new Float32Array(src.length);
  const r = radius;

  // horizontal
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let sum = 0;
      let count = 0;
      for (let k = -r; k <= r; k++) {
        const xx = Math.min(w - 1, Math.max(0, x + k));
        sum += src[y * w + xx];
        count++;
      }
      tmp[y * w + x] = sum / count;
    }
  }
  // vertical
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let sum = 0;
      let count = 0;
      for (let k = -r; k <= r; k++) {
        const yy = Math.min(h - 1, Math.max(0, y + k));
        sum += tmp[yy * w + x];
        count++;
      }
      out[y * w + x] = sum / count;
    }
  }
  return out;
}

function clamp(n) {
  return Math.max(0, Math.min(255, n));
}

/* ——— music ——— */
function renderSongs() {
  const list = $("#songList");
  list.innerHTML = "";
  SONGS.forEach((s, i) => {
    const li = document.createElement("li");
    li.className = "song-item";
    li.innerHTML = `
      <span class="song-num">${String(i + 1).padStart(2, "0")}</span>
      <div>
        <p class="song-title">${s.title}</p>
        <p class="song-artist">${s.artist}</p>
      </div>
      <div class="song-bars" aria-hidden="true"><span></span><span></span><span></span></div>
    `;
    li.addEventListener("click", () => {
      $all(".song-item").forEach((el) => el.classList.remove("is-playing"));
      if (state.activeSong === i) {
        state.activeSong = null;
        showToast("Paused");
        return;
      }
      li.classList.add("is-playing");
      state.activeSong = i;
      showToast(`Playing · ${s.title}`, "ok");
    });
    list.appendChild(li);
  });
}

/* ——— overlays / nav ——— */
function wireUI() {
  $("#menuBtn").addEventListener("click", () => {
    const nav = $("#sideNav");
    const open = nav.hasAttribute("hidden");
    if (open) nav.removeAttribute("hidden");
    else nav.setAttribute("hidden", "");
    $("#menuBtn").setAttribute("aria-expanded", open ? "true" : "false");
  });

  $("#shareBtn").addEventListener("click", async () => {
    const data = {
      title: "PENZI",
      text: "Matchmaking for the Kenyan ecosystem",
      url: location.href,
    };
    try {
      if (navigator.share) await navigator.share(data);
      else {
        await navigator.clipboard.writeText(location.href);
        showToast("Link copied", "ok");
      }
    } catch {
      showToast("Share cancelled");
    }
  });

  $("#reshuffleBtn").addEventListener("click", () => {
    clearMatchVisuals();
    renderOrbit(shuffle(PROFILES));
    $("#matchStatus").innerHTML = `<p class="status-idle">Constellation reshuffled</p>`;
    showToast("Profiles reshuffled");
  });

  $("#tryMatchBtn").addEventListener("click", () => {
    clearMatchVisuals();
    tryNearestFocus();
  });

  $("#successClose").addEventListener("click", () => {
    $("#successOverlay").hidden = true;
    state.matchLocked = false;
  });

  $("#errorClose").addEventListener("click", () => {
    $("#errorOverlay").hidden = true;
    state.matchLocked = false;
    clearMatchVisuals();
  });

  const drop = $("#artDrop");
  const input = $("#artInput");
  $("#artPickBtn").addEventListener("click", () => input.click());
  drop.addEventListener("click", (e) => {
    if (e.target.id === "artPickBtn") return;
    input.click();
  });
  input.addEventListener("change", () => {
    if (input.files?.[0]) loadArtFile(input.files[0]);
  });
  ["dragenter", "dragover"].forEach((ev) => {
    drop.addEventListener(ev, (e) => {
      e.preventDefault();
      drop.classList.add("is-drag");
    });
  });
  ["dragleave", "drop"].forEach((ev) => {
    drop.addEventListener(ev, (e) => {
      e.preventDefault();
      drop.classList.remove("is-drag");
    });
  });
  drop.addEventListener("drop", (e) => {
    const file = e.dataTransfer?.files?.[0];
    if (file) loadArtFile(file);
  });

  // highlight orbit card nearest center while scrolling
  const rail = $("#orbitRail");
  let ticking = false;
  rail.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const mid = rail.getBoundingClientRect().left + rail.clientWidth / 2;
      let best = null;
      let bestDist = Infinity;
      $all(".orbit-card").forEach((c) => {
        const r = c.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - mid);
        if (d < bestDist) {
          bestDist = d;
          best = c;
        }
      });
      $all(".orbit-card.is-focus").forEach((c) => {
        if (c !== best) c.classList.remove("is-focus");
      });
      if (best) best.classList.add("is-focus");
      ticking = false;
    });
  });
}

function init() {
  renderConstant();
  renderOrbit(PROFILES);
  renderPersonalities();
  renderCharacters();
  renderPoetry();
  renderScenes();
  renderSongs();
  wireUI();
}

document.addEventListener("DOMContentLoaded", init);
