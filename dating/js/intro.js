/* PENZI landing page — pencil-carved calligraphy + short tutorial → home */

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
    // Already welcomed — go straight to home
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

  const BEATS = [
    {
      script: "love, written slowly",
      line: "Matchmaking for the Kenyan ecosystem.",
      slide: 0,
    },
    {
      script: "find your bond",
      line: "Scroll the constellation. Ratings. Real people.",
      slide: 1,
    },
    {
      script: "stars & plans",
      line: "Zodiac, traits, and a calendar of places to meet.",
      slide: 2,
    },
    {
      script: "on the map",
      line: "GPS, shopping centres, and quiet M-Pesa moments.",
      slide: 3,
    },
  ];

  const CARVE_MS = 3400;
  const VIEW_W = 720;

  let beat = 0;
  let timer = null;
  let done = false;
  let carveRaf = 0;
  let carveToken = 0;

  function easeInOut(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  function clearDust() {
    if (dustLayer) dustLayer.innerHTML = "";
  }

  function sprinkle(x, y) {
    if (!dustLayer || Math.random() > 0.45) return;
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
        if (t < 1) {
          carveRaf = requestAnimationFrame(tick);
        } else {
          setClip(1);
          if (pencil) {
            pencil.animate([{ opacity: 1 }, { opacity: 0 }], {
              duration: 450,
              fill: "forwards",
              easing: "ease",
            });
            setTimeout(() => pencil.setAttribute("opacity", "0"), 450);
          }
          carve.classList.remove("is-carving");
          carve.classList.add("is-carved");
          resolve();
        }
      };
      carveRaf = requestAnimationFrame(tick);
    });
  }

  function setBeat(i) {
    beat = Math.max(0, Math.min(BEATS.length - 1, i));
    const b = BEATS[beat];

    slides.forEach((s, idx) => s.classList.toggle("is-on", idx === b.slide));
    const activeStep = Math.min(beat, 2);
    steps.forEach((s, idx) => {
      const on = idx === activeStep;
      const complete = idx < activeStep || beat === BEATS.length - 1;
      s.classList.toggle("is-on", on);
      s.classList.toggle("is-done", complete && !on);
    });

    if (scriptEl) {
      scriptEl.classList.remove("is-in");
      void scriptEl.offsetWidth;
      scriptEl.textContent = b.script;
      scriptEl.classList.add("is-in");
    }
    if (lineEl) {
      lineEl.classList.remove("is-in");
      void lineEl.offsetWidth;
      lineEl.textContent = b.line;
      lineEl.classList.add("is-in");
    }

    if (bar) {
      bar.style.width = `${((beat + 1) / BEATS.length) * 100}%`;
    }
  }

  function goHome() {
    try {
      sessionStorage.setItem("penzi-intro-seen", "1");
    } catch (e) {}
    location.href = HOME + "?home=1";
  }

  function finish() {
    if (done) return;
    done = true;
    carveToken = -1;
    clearInterval(timer);
    cancelAnimationFrame(carveRaf);
    setClip(1);
    if (carve) {
      carve.classList.add("is-carved");
      carve.classList.remove("is-carving");
    }
    if (pencil) pencil.setAttribute("opacity", "0");
    root.classList.add("is-out");
    // Brief exit motion, then open the separate home page
    setTimeout(goHome, reduced ? 120 : 780);
  }

  function start() {
    done = false;
    root.hidden = false;
    root.removeAttribute("aria-hidden");
    root.classList.remove("is-out");
    document.body.classList.add("is-intro");
    clearInterval(timer);
    cancelAnimationFrame(carveRaf);
    carveToken += 1;
    const token = carveToken;

    setBeat(0);
    carveWord(token);

    if (reduced) return;

    timer = setInterval(() => {
      if (beat >= BEATS.length - 1) {
        clearInterval(timer);
        return;
      }
      setBeat(beat + 1);
    }, 2500);
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
  setTimeout(() => {
    if (!done) finish();
  }, reduced ? 500 : 11800);

  window.PenziIntro = { finish, start, goHome };
})();
