/* PENZI landing page — slow pencil carve (~4s) → home page 01 */

(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.getElementById("cineIntro");
  if (!root) return;

  const HOME = "index.html";
  const params = new URLSearchParams(location.search);
  const forceReplay = params.get("replay") === "1";

  if (forceReplay) {
    try {
      sessionStorage.removeItem("penzi-intro-seen");
    } catch (e) {}
  } else if (sessionStorage.getItem("penzi-intro-seen") === "1") {
    location.replace(HOME);
    return;
  }

  const slides = [...root.querySelectorAll(".cine-slide")];
  const steps = [...root.querySelectorAll(".cine-steps li")];
  const bar = document.getElementById("cineBar");
  const scriptEl = document.getElementById("cineScript");
  const lineEl = document.getElementById("cineLine");
  const carve = document.getElementById("cineCarve");
  const pencil = document.getElementById("carvePencil");
  const carvePath = document.getElementById("carvePath");
  const clipRect = document.getElementById("carveClipRect");
  const dustLayer = document.getElementById("carveDust");

  // One quiet beat — landing is short and slow
  const BEAT = {
    script: "love, written slowly",
    line: "Matchmaking for the Kenyan ecosystem.",
    slide: 0,
  };

  const CARVE_MS = 3400;
  const LANDING_MS = 4000;
  const VIEW_W = 720;

  let done = false;
  let carveRaf = 0;
  let carveToken = 0;
  let finishTimer = null;

  function easeInOut(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  function clearDust() {
    if (dustLayer) dustLayer.innerHTML = "";
  }

  function sprinkle(x, y) {
    if (!dustLayer || Math.random() > 0.4) return;
    const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    const r = 0.8 + Math.random() * 1.8;
    c.setAttribute("cx", String(x + (Math.random() - 0.5) * 10));
    c.setAttribute("cy", String(y + (Math.random() - 0.5) * 8));
    c.setAttribute("r", String(r));
    dustLayer.appendChild(c);
    const driftX = (Math.random() - 0.5) * 18;
    const driftY = 8 + Math.random() * 16;
    c.animate(
      [
        { transform: "translate(0px, 0px)", opacity: 0.85 },
        { transform: `translate(${driftX}px, ${driftY}px)`, opacity: 0 },
      ],
      { duration: 520 + Math.random() * 380, easing: "ease-out", fill: "forwards" }
    );
    setTimeout(() => c.remove(), 900);
  }

  function placePencil(progress) {
    if (!pencil || !carvePath) return;
    const len = carvePath.getTotalLength();
    const d = Math.max(0, Math.min(1, progress)) * len;
    const p = carvePath.getPointAtLength(d);
    const p2 = carvePath.getPointAtLength(Math.min(len, d + 3));
    const angle = (Math.atan2(p2.y - p.y, p2.x - p.x) * 180) / Math.PI;
    pencil.setAttribute("opacity", "1");
    pencil.setAttribute("transform", `translate(${p.x} ${p.y}) rotate(${angle + 8})`);
    sprinkle(p.x, p.y);
  }

  function setClip(progress) {
    if (!clipRect) return;
    const w = Math.min(VIEW_W, Math.max(0, progress * VIEW_W + 28));
    clipRect.setAttribute("width", String(w));
  }

  function carveWord(token) {
    return new Promise((resolve) => {
      if (!carve) return resolve();
      cancelAnimationFrame(carveRaf);
      clearDust();
      carve.classList.remove("is-carved");
      carve.classList.add("is-carving");
      setClip(0);

      if (reduced || !carvePath) {
        setClip(1);
        if (pencil) pencil.setAttribute("opacity", "0");
        carve.classList.remove("is-carving");
        carve.classList.add("is-carved");
        return resolve();
      }

      const t0 = performance.now();
      const tick = (now) => {
        if (token !== carveToken) return resolve();
        const t = Math.min(1, (now - t0) / CARVE_MS);
        const e = easeInOut(t);
        placePencil(e);
        setClip(e);
        if (bar) bar.style.width = `${Math.max(8, e * 100)}%`;
        if (t < 1) {
          carveRaf = requestAnimationFrame(tick);
        } else {
          setClip(1);
          if (bar) bar.style.width = "100%";
          if (pencil) {
            pencil.animate([{ opacity: 1 }, { opacity: 0 }], {
              duration: 320,
              fill: "forwards",
              easing: "ease",
            });
            setTimeout(() => pencil.setAttribute("opacity", "0"), 320);
          }
          carve.classList.remove("is-carving");
          carve.classList.add("is-carved");
          resolve();
        }
      };
      carveRaf = requestAnimationFrame(tick);
    });
  }

  function showCopy() {
    slides.forEach((s, idx) => s.classList.toggle("is-on", idx === BEAT.slide));
    steps.forEach((s, idx) => {
      s.classList.toggle("is-on", idx === 0);
      s.classList.toggle("is-done", false);
    });
    if (scriptEl) {
      scriptEl.textContent = BEAT.script;
      scriptEl.classList.add("is-in");
    }
    if (lineEl) {
      lineEl.textContent = BEAT.line;
      lineEl.classList.add("is-in");
    }
    if (bar) bar.style.width = "0%";
  }

  function goHome() {
    try {
      sessionStorage.setItem("penzi-intro-seen", "1");
    } catch (e) {}
    // Home page 01 — Match
    location.href = HOME + "?home=1#match";
  }

  function finish() {
    if (done) return;
    done = true;
    carveToken = -1;
    clearTimeout(finishTimer);
    cancelAnimationFrame(carveRaf);
    setClip(1);
    if (carve) {
      carve.classList.add("is-carved");
      carve.classList.remove("is-carving");
    }
    if (pencil) pencil.setAttribute("opacity", "0");
    if (bar) bar.style.width = "100%";
    root.classList.add("is-out");
    setTimeout(goHome, reduced ? 80 : 420);
  }

  function start() {
    done = false;
    root.hidden = false;
    root.removeAttribute("aria-hidden");
    root.classList.remove("is-out");
    document.body.classList.add("is-intro");
    clearTimeout(finishTimer);
    cancelAnimationFrame(carveRaf);
    carveToken += 1;
    const token = carveToken;

    showCopy();
    carveWord(token);

    finishTimer = setTimeout(() => {
      if (!done) finish();
    }, reduced ? 400 : LANDING_MS);
  }

  document.getElementById("cineEnter")?.addEventListener("click", finish);
  document.getElementById("cineSkip")?.addEventListener("click", finish);

  root.addEventListener("keydown", (e) => {
    if (e.key === "Escape") finish();
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      finish();
    }
  });

  start();

  window.PenziIntro = { finish, start, goHome };
})();
