/* PENZI cinematic landing intro — calligraphy + photo tutorial */

(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.getElementById("cineIntro");
  if (!root) return;

  const slides = [...root.querySelectorAll(".cine-slide")];
  const steps = [...root.querySelectorAll(".cine-steps li")];
  const bar = document.getElementById("cineBar");
  const scriptEl = document.getElementById("cineScript");
  const lineEl = document.getElementById("cineLine");
  const title = document.getElementById("cineTitle");

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

  let beat = 0;
  let timer = null;
  let done = false;

  function setBeat(i) {
    beat = Math.max(0, Math.min(BEATS.length - 1, i));
    const b = BEATS[beat];

    slides.forEach((s, idx) => s.classList.toggle("is-on", idx === b.slide));
    // 4 photo beats → 3 tutorial steps: 0→0, 1→1, 2–3→2
    const activeStep = Math.min(beat, 2);
    steps.forEach((s, idx) => {
      const on = idx === activeStep;
      const done = idx < activeStep || beat === BEATS.length - 1;
      s.classList.toggle("is-on", on);
      s.classList.toggle("is-done", done && !on);
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
      const p = ((beat + 1) / BEATS.length) * 100;
      bar.style.width = `${p}%`;
    }

    if (title) {
      title.classList.remove("is-write");
      void title.offsetWidth;
      title.classList.add("is-write");
    }
  }

  function finish() {
    if (done) return;
    done = true;
    clearInterval(timer);
    root.classList.add("is-out");
    document.body.classList.remove("is-intro");
    document.body.classList.add("intro-done");
    sessionStorage.setItem("penzi-intro-seen", "1");
    setTimeout(() => {
      root.hidden = true;
      root.setAttribute("aria-hidden", "true");
    }, 900);
  }

  function start() {
    done = false;
    root.hidden = false;
    root.classList.remove("is-out");
    document.body.classList.add("is-intro");
    document.body.classList.remove("intro-done");
    setBeat(0);
    clearInterval(timer);
    if (reduced) return;
    timer = setInterval(() => {
      if (beat >= BEATS.length - 1) {
        clearInterval(timer);
        return;
      }
      setBeat(beat + 1);
    }, 2200);
  }

  function replay() {
    sessionStorage.removeItem("penzi-intro-seen");
    window.scrollTo({ top: 0, behavior: "smooth" });
    start();
  }

  document.getElementById("cineEnter")?.addEventListener("click", finish);
  document.getElementById("cineSkip")?.addEventListener("click", finish);
  document.getElementById("replayIntro")?.addEventListener("click", replay);

  root.addEventListener("keydown", (e) => {
    if (e.key === "Escape") finish();
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      finish();
    }
  });

  // Auto-play once per session
  if (sessionStorage.getItem("penzi-intro-seen") === "1") {
    root.hidden = true;
    document.body.classList.remove("is-intro");
    document.body.classList.add("intro-done");
  } else {
    start();
    // Soft auto-enter after full tutorial
    setTimeout(() => {
      if (!done) finish();
    }, reduced ? 500 : 9800);
  }

  window.PenziIntro = { replay, start, finish };
})();
