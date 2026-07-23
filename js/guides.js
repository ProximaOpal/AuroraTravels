/**
 * Page 4 — Pair up with a Guide
 * Hero: Kenyan tourist / place scenes · Thumbnails: Kenyan / East African people
 * Images sourced from Wikimedia Commons (local assets).
 */
window.AuroraTravels = window.AuroraTravels || {};

window.AuroraTravels.guides = [
  {
    id: "amina",
    name: "Amina Wanjiku",
    role: "Nairobi City Guide",
    school: "University of Nairobi",
    tourist: "assets/guides/tourists/nairobi-skyline.jpg",
    student: "assets/guides/students/s12.jpg",
  },
  {
    id: "brian",
    name: "Brian Otieno",
    role: "Rift Valley Trek Lead",
    school: "Kenyatta University",
    tourist: "assets/guides/tourists/mt-kenya.jpg",
    student: "assets/guides/students/s8.jpg",
  },
  {
    id: "faith",
    name: "Faith Chebet",
    role: "Kalenjin Heritage Walk",
    school: "Moi University",
    tourist: "assets/guides/tourists/nairobi-buffalo.jpg",
    student: "assets/guides/students/s1.jpg",
  },
  {
    id: "daniel",
    name: "Daniel Kamau",
    role: "Safari Photography",
    school: "USIU-Africa",
    tourist: "assets/guides/tourists/amboseli-elephants.jpg",
    student: "assets/guides/students/s2.jpg",
  },
  {
    id: "zara",
    name: "Zara Hassan",
    role: "Swahili Coast Guide",
    school: "Technical University of Mombasa",
    tourist: "assets/guides/tourists/mombasa.jpg",
    student: "assets/guides/students/s7.jpg",
  },
  {
    id: "kevin",
    name: "Kevin Mutiso",
    role: "Mount Kenya Base Camp",
    school: "Dedan Kimathi University",
    tourist: "assets/guides/tourists/amboseli-2.jpg",
    student: "assets/guides/students/s4.jpg",
  },
  {
    id: "mercy",
    name: "Mercy Achieng",
    role: "Lake Victoria Culture",
    school: "Maseno University",
    tourist: "assets/guides/tourists/lake-victoria.jpg",
    student: "assets/guides/students/s3.jpg",
  },
  {
    id: "james",
    name: "James Lekishon",
    role: "Maasai Mara Field Guide",
    school: "Maasai Mara University",
    tourist: "assets/guides/tourists/maasai-mara.jpg",
    student: "assets/guides/students/s11.jpg",
  },
  {
    id: "nina",
    name: "Nina Wekesa",
    role: "Craft Market Navigator",
    school: "Strathmore University",
    tourist: "assets/guides/tourists/maasai-market.jpg",
    student: "assets/guides/students/s5.jpg",
  },
  {
    id: "omar",
    name: "Omar Ali",
    role: "Lamu Archipelago Host",
    school: "Pwani University",
    tourist: "assets/guides/tourists/lamu.jpg",
    student: "assets/guides/students/s6.jpg",
  },
  {
    id: "grace",
    name: "Grace Njeri",
    role: "Food & Market Trails",
    school: "Jomo Kenyatta University",
    tourist: "assets/guides/tourists/lamu-2.jpg",
    student: "assets/guides/students/s10.jpg",
  },
  {
    id: "sam",
    name: "Sam Kiprop",
    role: "Highlands Walking Tour",
    school: "University of Eldoret",
    tourist: "assets/guides/tourists/maasai-guide.jpg",
    student: "assets/guides/students/s9.jpg",
  },
];

window.AuroraTravels.createGuidesPage = function createGuidesPage({
  guides,
  onNavigate,
}) {
  const page = document.getElementById("pageGuides");
  const hero = document.getElementById("gdHero");
  const heroNext = document.getElementById("gdHeroNext");
  const copy = document.getElementById("gdCopy");
  const kicker = document.getElementById("gdKicker");
  const person = document.getElementById("gdName");
  const school = document.getElementById("gdSchool");
  const counter = document.getElementById("gdCounter");
  const rail = document.getElementById("gdRail");
  const prevBtn = document.getElementById("gdPrev");
  const nextBtn = document.getElementById("gdNext");

  let current = 0;
  let busy = false;

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function buildRail() {
    rail.innerHTML = "";
    guides.forEach((guide, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `gd-thumb${index === 0 ? " active" : ""}`;
      btn.dataset.index = String(index);
      btn.setAttribute("aria-label", guide.name);
      btn.innerHTML = `<img src="${guide.student}" alt="" loading="lazy">`;
      btn.addEventListener("click", () => select(index));
      rail.appendChild(btn);
    });
  }

  function select(index) {
    if (index < 0 || index >= guides.length || index === current || busy) return;
    busy = true;

    const guide = guides[index];
    const direction = index > current ? 1 : -1;
    current = index;

    copy.classList.add("is-swap");
    heroNext.style.backgroundImage = `url('${guide.tourist}')`;
    heroNext.style.transform = `scale(1.06) translateX(${direction * 2}%)`;
    heroNext.classList.add("show");

    window.setTimeout(() => {
      hero.style.backgroundImage = `url('${guide.tourist}')`;
      hero.classList.add("is-live");
      heroNext.classList.remove("show");
      heroNext.style.transform = "";

      kicker.textContent = guide.role;
      person.textContent = guide.name;
      school.textContent = guide.school;
      counter.textContent = `${pad(index + 1)} / ${pad(guides.length)}`;
      copy.classList.remove("is-swap");

      rail.querySelectorAll(".gd-thumb").forEach((thumb, i) => {
        thumb.classList.toggle("active", i === index);
      });
      rail.querySelector(`.gd-thumb[data-index="${index}"]`)?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });

      busy = false;
    }, 420);
  }

  function step(delta) {
    const next = (current + delta + guides.length) % guides.length;
    select(next);
  }

  prevBtn.addEventListener("click", () => step(-1));
  nextBtn.addEventListener("click", () => step(1));

  page.addEventListener(
    "wheel",
    (event) => {
      if (!page.classList.contains("visible") || busy) return;
      if (Math.abs(event.deltaY) < 18 && Math.abs(event.deltaX) < 18) return;
      event.preventDefault();
      step(event.deltaY > 0 || event.deltaX > 0 ? 1 : -1);
    },
    { passive: false }
  );

  document.addEventListener("keydown", (event) => {
    if (!page.classList.contains("visible")) return;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      step(1);
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      step(-1);
    }
  });

  buildRail();
  const first = guides[0];
  hero.style.backgroundImage = `url('${first.tourist}')`;
  hero.classList.add("is-live");
  kicker.textContent = first.role;
  person.textContent = first.name;
  school.textContent = first.school;
  counter.textContent = `01 / ${pad(guides.length)}`;

  return {
    show() {
      page.style.display = "block";
      requestAnimationFrame(() => page.classList.add("visible"));
    },
    hide() {
      page.classList.remove("visible");
      window.setTimeout(() => {
        if (!page.classList.contains("visible")) page.style.display = "none";
      }, 450);
    },
    next() {
      step(1);
    },
    prev() {
      step(-1);
    },
  };
};
