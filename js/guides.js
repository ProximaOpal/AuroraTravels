/**
 * Page 3 — Pair up with a Guide
 * Main hero: tourist scenes · Thumbnails: student guides
 */
window.AuroraTravels = window.AuroraTravels || {};

window.AuroraTravels.guides = [
  {
    id: "amina",
    name: "Amina Wanjiku",
    role: "Nairobi City Guide",
    school: "University of Nairobi",
    tourist:
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1800&q=80&auto=format&fit=crop",
    student:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80&auto=format&fit=crop",
  },
  {
    id: "brian",
    name: "Brian Otieno",
    role: "Rift Valley Trek Lead",
    school: "Kenyatta University",
    tourist:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1800&q=80&auto=format&fit=crop",
    student:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop",
  },
  {
    id: "faith",
    name: "Faith Chebet",
    role: "Kalenjin Heritage Walk",
    school: "Moi University",
    tourist:
      "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=1800&q=80&auto=format&fit=crop",
    student:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&auto=format&fit=crop",
  },
  {
    id: "daniel",
    name: "Daniel Kamau",
    role: "Safari Photography",
    school: "USIU-Africa",
    tourist:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1800&q=80&auto=format&fit=crop",
    student:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop",
  },
  {
    id: "zara",
    name: "Zara Hassan",
    role: "Swahili Coast Guide",
    school: "Technical University of Mombasa",
    tourist:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&q=80&auto=format&fit=crop",
    student:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80&auto=format&fit=crop",
  },
  {
    id: "kevin",
    name: "Kevin Mutiso",
    role: "Mount Kenya Base Camp",
    school: "Dedan Kimathi University",
    tourist:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1800&q=80&auto=format&fit=crop",
    student:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80&auto=format&fit=crop",
  },
  {
    id: "mercy",
    name: "Mercy Achieng",
    role: "Lake Victoria Culture",
    school: "Maseno University",
    tourist:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1800&q=80&auto=format&fit=crop",
    student:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80&auto=format&fit=crop",
  },
  {
    id: "james",
    name: "James Lekishon",
    role: "Maasai Mara Field Guide",
    school: "Maasai Mara University",
    tourist:
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1800&q=80&auto=format&fit=crop",
    student:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80&auto=format&fit=crop",
  },
  {
    id: "nina",
    name: "Nina Wekesa",
    role: "Craft Market Navigator",
    school: "Strathmore University",
    tourist:
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1800&q=80&auto=format&fit=crop",
    student:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80&auto=format&fit=crop",
  },
  {
    id: "omar",
    name: "Omar Ali",
    role: "Lamu Archipelago Host",
    school: "Pwani University",
    tourist:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1800&q=80&auto=format&fit=crop",
    student:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&auto=format&fit=crop",
  },
  {
    id: "grace",
    name: "Grace Njeri",
    role: "Food & Market Trails",
    school: "Jomo Kenyatta University",
    tourist:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1800&q=80&auto=format&fit=crop",
    student:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80&auto=format&fit=crop",
  },
  {
    id: "sam",
    name: "Sam Kiprop",
    role: "Highlands Running Tour",
    school: "University of Eldoret",
    tourist:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1800&q=80&auto=format&fit=crop",
    student:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80&auto=format&fit=crop",
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

  page.querySelectorAll(".gd-menu-inline button[data-page]").forEach((btn) => {
    btn.addEventListener("click", () => onNavigate?.(btn.dataset.page));
  });

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
  };
};
