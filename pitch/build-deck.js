/**
 * Aurora Travels — investor / partnership pitch deck
 * Market figures sourced from Kenya Ministry of Tourism & Wildlife (2025),
 * WTTC EIR 2025/26, CA Kenya mobile-money stats, FKE youth employment,
 * FinAccess / KNBS informal-sector reporting, and OTA commission benchmarks.
 *
 * Run: node pitch/build-deck.js
 */
const pptxgen = require("pptxgenjs");
const path = require("path");

const C = {
  bg: "16241C",
  panel: "1E3226",
  panelLite: "24392B",
  gold: "D9A441",
  terracotta: "C1502E",
  cream: "F4EDE1",
  mutedCream: "BFB29B",
  sage: "8FAE93",
  line: "35493B",
};

const FONT_HEAD = "Cambria";
const FONT_BODY = "Calibri";

const OUT = path.join(__dirname, "AuroraTravels_Pitch_Deck.pptx");

let pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.33 x 7.5
pres.author = "ProximaOpal / Aurora Travels";
pres.title = "Aurora Travels — Pitch Deck";
pres.subject = "Kenya travel, crafts & student guides";

const W = 13.33,
  H = 7.5;

function bgSlide(s) {
  s.background = { color: C.bg };
}

function footer(s, num, total, section) {
  s.addText("AURORA TRAVELS", {
    x: 0.5,
    y: H - 0.42,
    w: 4,
    h: 0.3,
    fontFace: FONT_BODY,
    fontSize: 9,
    color: C.mutedCream,
    charSpacing: 2,
    bold: true,
  });
  if (section) {
    s.addText(section, {
      x: W / 2 - 2.5,
      y: H - 0.42,
      w: 5,
      h: 0.3,
      align: "center",
      fontFace: FONT_BODY,
      fontSize: 9,
      color: C.mutedCream,
      charSpacing: 1,
    });
  }
  s.addText(`${num} / ${total}`, {
    x: W - 1.3,
    y: H - 0.42,
    w: 0.8,
    h: 0.3,
    align: "right",
    fontFace: FONT_BODY,
    fontSize: 9,
    color: C.mutedCream,
  });
}

function badge(s, num, x, y) {
  s.addShape(pres.shapes.OVAL, {
    x,
    y,
    w: 0.62,
    h: 0.62,
    fill: { color: C.terracotta },
    line: { color: C.terracotta },
  });
  s.addText(num, {
    x,
    y,
    w: 0.62,
    h: 0.62,
    align: "center",
    valign: "middle",
    fontFace: FONT_HEAD,
    fontSize: 20,
    bold: true,
    color: C.cream,
  });
}

function kicker(s, text, x, y) {
  s.addText(text.toUpperCase(), {
    x,
    y,
    w: 6,
    h: 0.35,
    fontFace: FONT_BODY,
    fontSize: 12,
    bold: true,
    color: C.gold,
    charSpacing: 3,
  });
}

function title(s, text, x, y, w, size) {
  s.addText(text, {
    x,
    y,
    w,
    h: 1.1,
    fontFace: FONT_HEAD,
    fontSize: size || 30,
    bold: true,
    color: C.cream,
  });
}

function iconDot(s, x, y, d, color) {
  s.addShape(pres.shapes.OVAL, {
    x,
    y,
    w: d,
    h: d,
    fill: { color },
    line: { color },
  });
}

function sourceNote(s, text, x, y, w) {
  s.addText(text, {
    x,
    y,
    w,
    h: 0.35,
    fontFace: FONT_BODY,
    fontSize: 8.5,
    italic: true,
    color: C.mutedCream,
    align: "left",
  });
}

const TOTAL = 11;
const ASSET = (...parts) => path.join(__dirname, "..", "assets", ...parts);

// ---------------- SLIDE 1 : TITLE ----------------
{
  const s = pres.addSlide();
  bgSlide(s);
  s.addShape(pres.shapes.OVAL, {
    x: 9.6,
    y: -2.2,
    w: 7,
    h: 7,
    fill: { color: C.panel },
    line: { color: C.panel },
  });
  s.addShape(pres.shapes.OVAL, {
    x: 10.6,
    y: -1.2,
    w: 5,
    h: 5,
    fill: { color: C.panelLite },
    line: { color: C.panelLite },
  });

  s.addText("KENYA · TRAVEL · CULTURE · COMMERCE", {
    x: 0.9,
    y: 1.5,
    w: 8,
    h: 0.4,
    fontFace: FONT_BODY,
    fontSize: 13,
    bold: true,
    color: C.gold,
    charSpacing: 3,
  });
  s.addText(
    [
      { text: "AURORA", options: { color: C.cream } },
      { text: " TRAVELS", options: { color: C.terracotta } },
    ],
    {
      x: 0.85,
      y: 1.95,
      w: 11,
      h: 1.7,
      fontFace: FONT_HEAD,
      fontSize: 60,
      bold: true,
    }
  );
  s.addText(
    "A single, Kenya-native app for parks, stays, verified crafts and student guides — pitched for partnership and investment.",
    {
      x: 0.9,
      y: 3.55,
      w: 8.6,
      h: 0.9,
      fontFace: FONT_BODY,
      fontSize: 16,
      color: C.mutedCream,
    }
  );

  const items = [
    ["Discover", "15 parks & destinations"],
    ["Shop", "28 verified Kenyan crafts"],
    ["Pay", "Native M-Pesa STK Push"],
    ["Connect", "12 university guides"],
  ];
  let ix = 0.9;
  items.forEach(([a, b]) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: ix,
      y: 5.15,
      w: 2.6,
      h: 1.15,
      rectRadius: 0.08,
      fill: { color: C.panel },
      line: { color: C.panel },
    });
    s.addText(a, {
      x: ix + 0.18,
      y: 5.27,
      w: 2.3,
      h: 0.4,
      fontFace: FONT_HEAD,
      bold: true,
      fontSize: 15,
      color: C.gold,
    });
    s.addText(b, {
      x: ix + 0.18,
      y: 5.65,
      w: 2.3,
      h: 0.55,
      fontFace: FONT_BODY,
      fontSize: 11,
      color: C.mutedCream,
    });
    ix += 2.78;
  });

  s.addText(
    "Built in Nairobi by ProximaOpal — web & AI product engineer  ·  auroratravels",
    {
      x: 0.9,
      y: 6.85,
      w: 9,
      h: 0.35,
      fontFace: FONT_BODY,
      fontSize: 10.5,
      italic: true,
      color: C.mutedCream,
    }
  );
}

// ---------------- SLIDE 2 : PROBLEM ----------------
{
  const s = pres.addSlide();
  bgSlide(s);
  badge(s, "01", 0.7, 0.55);
  kicker(s, "The Problem", 1.5, 0.65);
  title(
    s,
    "Kenya's travel experience is fragmented — and its creative economy is invisible online",
    0.7,
    1.15,
    7.6,
    26
  );

  const bullets = [
    "International arrivals rose 9% year-on-year to 2.7 million in 2025 (from 2.47M in 2024), with 5.2M domestic trips — 7.9M total visitors — yet travelers still stitch together separate tools for parks, stays, curio shopping and guides, mostly through commission-heavy foreign booking platforms.",
    "Kenya's informal / Jua Kali and MSE economy contributes an estimated 24–33% of GDP and the bulk of new jobs, but most craft artisans still lack a verified, direct digital storefront into tourist demand.",
    "Federation of Kenya Employers cites a 67% unemployment rate among Kenyans aged 15–34 — deep local knowledge sits idle instead of being monetized as guiding services.",
  ];
  let by = 2.55;
  bullets.forEach((b) => {
    iconDot(s, 0.75, by + 0.09, 0.14, C.terracotta);
    s.addText(b, {
      x: 1.05,
      y: by - 0.12,
      w: 6.9,
      h: 0.95,
      fontFace: FONT_BODY,
      fontSize: 12.5,
      color: C.cream,
    });
    by += 1.28;
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 8.55,
    y: 2.5,
    w: 4.1,
    h: 3.9,
    rectRadius: 0.1,
    fill: { color: C.panel },
    line: { color: C.panel },
  });
  s.addText("SUPPORTING DATA", {
    x: 8.85,
    y: 2.72,
    w: 3.5,
    h: 0.3,
    fontFace: FONT_BODY,
    fontSize: 10,
    bold: true,
    color: C.gold,
    charSpacing: 2,
  });
  s.addText("67%", {
    x: 8.85,
    y: 3.0,
    w: 3.5,
    h: 1.0,
    fontFace: FONT_HEAD,
    fontSize: 54,
    bold: true,
    color: C.terracotta,
  });
  s.addText("FKE figure for Kenyans aged 15–34 without adequate employment", {
    x: 8.85,
    y: 3.95,
    w: 3.5,
    h: 0.75,
    fontFace: FONT_BODY,
    fontSize: 12,
    color: C.cream,
  });
  s.addShape(pres.shapes.LINE, {
    x: 8.85,
    y: 4.85,
    w: 3.5,
    h: 0,
    line: { color: C.line, width: 1 },
  });
  s.addText("2.7M", {
    x: 8.85,
    y: 5.0,
    w: 3.5,
    h: 0.55,
    fontFace: FONT_HEAD,
    fontSize: 30,
    bold: true,
    color: C.gold,
  });
  s.addText("international arrivals in 2025, up 9% YoY; KES 0.5T tourism earnings", {
    x: 8.85,
    y: 5.55,
    w: 3.5,
    h: 0.7,
    fontFace: FONT_BODY,
    fontSize: 12,
    color: C.cream,
  });

  sourceNote(
    s,
    "Sources: Kenya Ministry of Tourism & Wildlife / Magical Kenya Sector Performance 2025; Federation of Kenya Employers; FinAccess MSE Tracker / Daily Nation on informal GDP share (24–33%).",
    0.7,
    6.55,
    11.9
  );
  footer(s, 2, TOTAL, "THE PROBLEM");
}

// ---------------- SLIDE 3 : SOLUTION ----------------
{
  const s = pres.addSlide();
  bgSlide(s);
  badge(s, "02", 0.7, 0.55);
  kicker(s, "The Solution", 1.5, 0.65);
  title(
    s,
    "One app: parks, stays, verified crafts and student guides — native to Kenya",
    0.7,
    1.15,
    11.9,
    26
  );

  // Product visuals — Kenyan crafts + guides
  try {
    s.addImage({
      path: ASSET("crafts", "maasai-beads-1.jpg"),
      x: 0.7,
      y: 2.45,
      w: 2.85,
      h: 1.9,
    });
    s.addImage({
      path: ASSET("crafts", "soapstone-tabaka.jpg"),
      x: 3.7,
      y: 2.45,
      w: 2.85,
      h: 1.9,
    });
    s.addImage({
      path: ASSET("guides", "tourists", "maasai-mara.jpg"),
      x: 6.7,
      y: 2.45,
      w: 2.85,
      h: 1.9,
    });
    s.addImage({
      path: ASSET("guides", "students", "s12.jpg"),
      x: 9.7,
      y: 2.45,
      w: 2.85,
      h: 1.9,
    });
  } catch (e) {
    /* images optional if path missing */
  }

  const labels = [
    ["VERIFIED CRAFTS", "Maasai beadwork"],
    ["NAMED SHOPS", "Tabaka soapstone"],
    ["PARKS & PLACES", "Maasai Mara"],
    ["STUDENT GUIDES", "University of Nairobi"],
  ];
  labels.forEach(([h, b], i) => {
    const x = 0.7 + i * 3.0;
    s.addText(h, {
      x,
      y: 4.45,
      w: 2.85,
      h: 0.28,
      fontFace: FONT_BODY,
      fontSize: 10,
      bold: true,
      color: C.gold,
      charSpacing: 1,
    });
    s.addText(b, {
      x,
      y: 4.72,
      w: 2.85,
      h: 0.28,
      fontFace: FONT_BODY,
      fontSize: 12,
      color: C.cream,
    });
  });

  s.addText(
    "Interactive map across 15 parks → unified travel & stay booking → curated marketplace of 28 crafts tied to real shops and Google Maps pins, checked out with native M-Pesa STK Push → on-demand pairing with vetted university student guides. Built on Kenya's own payment rail (mobile money used by ~98% of mobile subscriptions, CA Kenya Dec 2025) instead of card-only global platforms.",
    {
      x: 0.7,
      y: 5.2,
      w: 11.9,
      h: 1.2,
      fontFace: FONT_BODY,
      fontSize: 13,
      color: C.mutedCream,
    }
  );

  footer(s, 3, TOTAL, "THE SOLUTION");
}

// ---------------- SLIDE 4 : PRODUCT ----------------
{
  const s = pres.addSlide();
  bgSlide(s);
  badge(s, "03", 0.7, 0.55);
  kicker(s, "Product", 1.5, 0.65);
  title(s, "Four steps, one continuous journey", 0.7, 1.15, 10, 28);
  s.addText(
    "The live build today: an interactive map, integrated booking, a working M-Pesa checkout, and a guide roster — with Kenyan craft & place photography throughout.",
    {
      x: 0.7,
      y: 1.85,
      w: 11.5,
      h: 0.4,
      fontFace: FONT_BODY,
      fontSize: 13,
      color: C.mutedCream,
    }
  );

  const steps = [
    [
      "Discover",
      "Browse 15 national parks & destinations across Kenya and Africa on a live interactive map, with search and weather.",
      ASSET("guides", "tourists", "amboseli-elephants.jpg"),
    ],
    [
      "Plan",
      "Book travel and accommodation in the same flow — no separate app or tab.",
      ASSET("guides", "tourists", "nairobi-skyline.jpg"),
    ],
    [
      "Shop",
      "Buy an authentic craft from a named shop, e.g. Tabaka Soapstone Cooperative in Kisii, mapped on Google Maps.",
      ASSET("crafts", "kazuri-1.jpg"),
    ],
    [
      "Connect",
      "Pay instantly by M-Pesa STK Push, then pair with a vetted student guide from one of 12 Kenyan universities.",
      ASSET("guides", "students", "s2.jpg"),
    ],
  ];
  let sx = 0.7;
  const sw = 2.85;
  steps.forEach(([h, body, img], i) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: sx,
      y: 2.4,
      w: sw,
      h: 4.0,
      rectRadius: 0.1,
      fill: { color: C.panel },
      line: { color: C.panel },
    });
    try {
      s.addImage({ path: img, x: sx + 0.12, y: 2.52, w: sw - 0.24, h: 1.35 });
    } catch (e) {}
    s.addShape(pres.shapes.OVAL, {
      x: sx + 0.25,
      y: 3.98,
      w: 0.45,
      h: 0.45,
      fill: { color: C.gold },
      line: { color: C.gold },
    });
    s.addText(String(i + 1), {
      x: sx + 0.25,
      y: 3.98,
      w: 0.45,
      h: 0.45,
      align: "center",
      valign: "middle",
      fontFace: FONT_HEAD,
      bold: true,
      fontSize: 16,
      color: C.bg,
    });
    s.addText(h, {
      x: sx + 0.8,
      y: 4.02,
      w: sw - 1.1,
      h: 0.4,
      fontFace: FONT_HEAD,
      bold: true,
      fontSize: 15,
      color: C.cream,
    });
    s.addText(body, {
      x: sx + 0.2,
      y: 4.55,
      w: sw - 0.4,
      h: 1.7,
      fontFace: FONT_BODY,
      fontSize: 11.5,
      color: C.mutedCream,
    });
    if (i < 3) {
      s.addText("→", {
        x: sx + sw - 0.08,
        y: 4.0,
        w: 0.5,
        h: 0.5,
        fontFace: FONT_HEAD,
        fontSize: 22,
        color: C.terracotta,
        align: "center",
      });
    }
    sx += sw + 0.235;
  });

  footer(s, 4, TOTAL, "PRODUCT");
}

// ---------------- SLIDE 5 : MARKET ----------------
{
  const s = pres.addSlide();
  bgSlide(s);
  badge(s, "04", 0.7, 0.55);
  kicker(s, "Market Opportunity", 1.5, 0.65);
  title(s, "Sizing the opportunity: TAM, SAM, SOM", 0.7, 1.15, 8, 28);

  const defs = [
    [
      "TAM — US$12.7B",
      "WTTC reports Travel & Tourism contributed US$12.7 billion to Kenya's economy in 2025 (9.3% of GDP) and supported 1.8 million jobs (8.3% of employment).",
      "WTTC Economic Impact Research 2025/26",
    ],
    [
      "SAM — ~US$3.8B (KES 0.5T)",
      "Government-reported direct tourism earnings of ~KES 0.5 trillion (~US$3.8B) from 7.9M visitors in 2025 (2.7M international + 5.2M domestic). Digitally reachable craft, guiding and local-booking spend sits inside this earnings base.",
      "Kenya Ministry of Tourism & Wildlife / Magical Kenya 2025 Sector Performance Report",
    ],
    [
      "SOM (3-yr, modeled) — US$45M GMV",
      "Illustrative capture: ~1.2% of international visitor spend on crafts/experiences/guiding (~US$5.0B international spend per WTTC) flowing through Aurora by year 3 — a model to validate in the Nairobi + Maasai Mara pilot, not an achieved figure.",
      "Founder model grounded in WTTC international spend + Ministry arrivals",
    ],
  ];
  let dy = 2.45;
  defs.forEach(([h, body, src]) => {
    s.addText(h, {
      x: 0.7,
      y: dy,
      w: 6.6,
      h: 0.32,
      fontFace: FONT_HEAD,
      bold: true,
      fontSize: 14,
      color: C.gold,
    });
    s.addText(body, {
      x: 0.7,
      y: dy + 0.32,
      w: 6.6,
      h: 0.85,
      fontFace: FONT_BODY,
      fontSize: 11,
      color: C.cream,
    });
    s.addText(src, {
      x: 0.7,
      y: dy + 1.12,
      w: 6.6,
      h: 0.25,
      fontFace: FONT_BODY,
      italic: true,
      fontSize: 9,
      color: C.mutedCream,
    });
    dy += 1.5;
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 7.7,
    y: 2.5,
    w: 4.95,
    h: 4.15,
    rectRadius: 0.1,
    fill: { color: C.panel },
    line: { color: C.panel },
  });
  s.addChart(pres.charts.BAR, [
    {
      name: "USD billions",
      labels: ["TAM\n(WTTC)", "SAM\n(earnings)", "SOM\n(3yr model)"],
      values: [12.7, 3.8, 0.045],
    },
  ], {
    x: 7.95,
    y: 2.75,
    w: 4.5,
    h: 3.65,
    chartColors: [C.terracotta],
    showTitle: true,
    title: "US$ billions",
    titleColor: C.cream,
    titleFontSize: 12,
    showValue: true,
    dataLabelColor: C.cream,
    dataLabelFontSize: 10,
    dataLabelPosition: "outEnd",
    catAxisLabelColor: C.mutedCream,
    catAxisLabelFontSize: 10,
    valAxisLabelColor: C.mutedCream,
    valAxisHidden: true,
    valGridLine: { style: "none" },
    catGridLine: { style: "none" },
    showLegend: false,
    chartArea: { fill: { color: C.panel } },
    plotArea: { fill: { color: C.panel } },
    barGapWidthPct: 40,
  });

  footer(s, 5, TOTAL, "MARKET OPPORTUNITY");
}

// ---------------- SLIDE 6 : BUSINESS MODEL ----------------
{
  const s = pres.addSlide();
  bgSlide(s);
  badge(s, "05", 0.7, 0.55);
  kicker(s, "Business Model", 1.5, 0.65);
  title(s, "How Aurora Travels makes money", 0.7, 1.15, 9, 28);

  const cols = [
    [
      "REVENUE STREAMS",
      "12% average take-rate on craft GMV (below typical OTA bands); KES 500–800 guide-booking service fee per pairing; 8–10% referral commission on travel & stay bookings; featured-placement fees for shops (KES 3,000–8,000/mo) and guides.",
    ],
    [
      "PRICING",
      "Live catalogue prices run from KES 2,200 to KES 15,200 (~US$17–$118) across 28 crafts. Global tour OTAs commonly take 20–30% (Viator ~20–25% base; GetYourGuide 20–30%). Aurora undercuts that with M-Pesa-native checkout — no card gateway friction in a market where ~98% of mobile subscriptions use mobile money.",
    ],
    [
      "UNIT ECONOMICS",
      "Low CAC via university guide network and shops already mapped. At modeled Y3 GMV of US$45M and 11% blended take-rate → ~US$5.0M platform revenue. LTV compounds across repeat trips, multiple crafts and guide bookings.",
    ],
  ];
  let cx = 0.7;
  const cw = 3.95;
  cols.forEach(([h, body]) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx,
      y: 2.55,
      w: cw,
      h: 3.9,
      rectRadius: 0.1,
      fill: { color: C.panel },
      line: { color: C.panel },
    });
    s.addText(h, {
      x: cx + 0.3,
      y: 2.8,
      w: cw - 0.6,
      h: 0.4,
      fontFace: FONT_BODY,
      fontSize: 12,
      bold: true,
      color: C.gold,
      charSpacing: 1,
    });
    s.addText(body, {
      x: cx + 0.3,
      y: 3.25,
      w: cw - 0.6,
      h: 3.0,
      fontFace: FONT_BODY,
      fontSize: 12,
      color: C.cream,
    });
    cx += cw + 0.24;
  });

  sourceNote(
    s,
    "OTA commissions: SambaHQ / operator guides (Viator 20–30%, GetYourGuide 20–30%, Klook 15–25%). Mobile money: Communications Authority of Kenya (reported ~98% of mobile subscriptions by Dec 2025).",
    0.7,
    6.55,
    11.9
  );
  footer(s, 6, TOTAL, "BUSINESS MODEL");
}

// ---------------- SLIDE 7 : TRACTION ----------------
{
  const s = pres.addSlide();
  bgSlide(s);
  badge(s, "06", 0.7, 0.55);
  kicker(s, "Build & Validation", 1.5, 0.65);
  title(s, "What's already built — pre-launch, seeking pilot partners", 0.7, 1.15, 11.7, 26);

  const stats = [
    ["28", "curated crafts listed across 24+ named Kenyan shops (live catalogue KES 2,200–15,200)"],
    ["15", "parks & destinations mapped, 10 in Kenya + 5 across Africa"],
    ["12", "vetted student guides from 12 Kenyan universities"],
    ["1", "working M-Pesa STK Push integration — live gateway, phone validation & status polling"],
  ];
  stats.forEach(([num, label], i) => {
    const col = i % 2,
      row = Math.floor(i / 2);
    const x = 0.7 + col * 6.0,
      y = 2.75 + row * 2.05;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x,
      y,
      w: 5.75,
      h: 1.85,
      rectRadius: 0.1,
      fill: { color: C.panel },
      line: { color: C.panel },
    });
    s.addText(num, {
      x: x + 0.35,
      y: y + 0.18,
      w: 1.4,
      h: 1.2,
      fontFace: FONT_HEAD,
      bold: true,
      fontSize: 46,
      color: C.terracotta,
    });
    s.addText(label, {
      x: x + 1.75,
      y: y + 0.3,
      w: 3.7,
      h: 1.3,
      fontFace: FONT_BODY,
      fontSize: 12.5,
      color: C.cream,
      valign: "middle",
    });
  });

  sourceNote(
    s,
    "Traction reflects the current product build (auroratravels repository), not live user or revenue figures — those will be added post-pilot.",
    0.7,
    6.75,
    11.9
  );
  footer(s, 7, TOTAL, "BUILD & VALIDATION");
}

// ---------------- SLIDE 8 : COMPETITION ----------------
{
  const s = pres.addSlide();
  bgSlide(s);
  badge(s, "07", 0.7, 0.55);
  kicker(s, "Competitive Landscape", 1.5, 0.65);
  title(s, "Where Aurora Travels sits versus alternatives", 0.7, 1.15, 10, 26);

  const gx = 0.9,
    gy = 2.6,
    gw = 7.6,
    gh = 4.1;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: gx,
    y: gy,
    w: gw,
    h: gh,
    rectRadius: 0.06,
    fill: { color: C.panel },
    line: { color: C.panel },
  });
  s.addShape(pres.shapes.LINE, {
    x: gx + 0.4,
    y: gy + gh - 0.4,
    w: gw - 0.7,
    h: 0,
    line: { color: C.line, width: 1.5 },
  });
  s.addShape(pres.shapes.LINE, {
    x: gx + 0.4,
    y: gy + 0.3,
    w: 0,
    h: gh - 0.7,
    line: { color: C.line, width: 1.5 },
  });
  s.addText("Breadth of Kenya travel experience ↑", {
    x: gx + 0.1,
    y: gy + 0.05,
    w: 3.5,
    h: 0.3,
    fontFace: FONT_BODY,
    fontSize: 9.5,
    color: C.mutedCream,
  });
  s.addText("Kenya-native payments & verified local shops/guides →", {
    x: gx + 0.6,
    y: gy + gh - 0.32,
    w: 6.5,
    h: 0.3,
    fontFace: FONT_BODY,
    fontSize: 9.5,
    color: C.mutedCream,
  });

  function plot(label, x, y, color, big) {
    const d = big ? 0.85 : 0.6;
    s.addShape(pres.shapes.OVAL, {
      x: gx + x - d / 2,
      y: gy + y - d / 2,
      w: d,
      h: d,
      fill: { color },
      line: { color },
    });
    s.addText(label, {
      x: gx + x - 1.1,
      y: gy + y + d / 2 - 0.02,
      w: 2.2,
      h: 0.45,
      align: "center",
      fontFace: FONT_BODY,
      bold: big,
      fontSize: big ? 11.5 : 10,
      color: C.cream,
    });
  }
  plot("SafariBookings\n(lead-gen only)", 2.2, 2.1, C.sage, false);
  plot("Global OTAs\n(Viator/GYG/Klook)", 4.3, 1.3, C.sage, false);
  plot("Informal curio\nmarkets & fixers", 1.7, 3.5, C.sage, false);
  plot("Aurora Travels", 6.3, 0.75, C.terracotta, true);

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 8.75,
    y: 2.6,
    w: 3.9,
    h: 4.1,
    rectRadius: 0.1,
    fill: { color: C.panelLite },
    line: { color: C.panelLite },
  });
  s.addText("DEFENSIBLE ADVANTAGE", {
    x: 9.0,
    y: 2.85,
    w: 3.4,
    h: 0.3,
    fontFace: FONT_BODY,
    fontSize: 10,
    bold: true,
    color: C.gold,
    charSpacing: 1.5,
  });
  s.addText(
    "Global OTAs charge 20–30% commission and don't touch M-Pesa or named artisan shops. Aurora does both, natively — in a market where mobile money reaches ~98% of mobile subscriptions.",
    {
      x: 9.0,
      y: 3.2,
      w: 3.4,
      h: 1.7,
      fontFace: FONT_BODY,
      fontSize: 12.5,
      color: C.cream,
    }
  );
  s.addShape(pres.shapes.LINE, {
    x: 9.0,
    y: 4.95,
    w: 3.4,
    h: 0,
    line: { color: C.line, width: 1 },
  });
  s.addText(
    "SafariBookings aggregates operator tours but does not process payment or sell crafts/guides directly. Viator, GetYourGuide and Klook are card-first and generic across countries.",
    {
      x: 9.0,
      y: 5.1,
      w: 3.4,
      h: 1.4,
      fontFace: FONT_BODY,
      fontSize: 10.5,
      italic: true,
      color: C.mutedCream,
    }
  );

  sourceNote(
    s,
    "Sources: SafariBookings listings; SambaHQ / operator commission guides for Viator, GetYourGuide, Klook; CA Kenya mobile-money penetration.",
    0.7,
    6.75,
    11.9
  );
  footer(s, 8, TOTAL, "COMPETITIVE LANDSCAPE");
}

// ---------------- SLIDE 9 : GTM ----------------
{
  const s = pres.addSlide();
  bgSlide(s);
  badge(s, "08", 0.7, 0.55);
  kicker(s, "Go-To-Market Strategy", 1.5, 0.65);
  title(s, "How Aurora Travels acquires and scales users", 0.7, 1.15, 10, 26);

  const phases = [
    [
      "Phase 1 — Launch",
      "Nairobi and the Maasai Mara gateway (Narok). Onboard shop partners already mapped — Maasai Market Nairobi, Tabaka Soapstone (Kisii), Wamunyu Carvers (Machakos), Kazuri Beads — and the first guide cohort from partner universities. Target: 40 shops, 40 guides, first 5,000 paid transactions.",
    ],
    [
      "Phase 2 — Scale",
      "Extend across more of Kenya's 47 counties toward the government's 2027 ambition of 5.5M international arrivals and KES 1T tourism earnings. Prioritise 2025 top source markets: United States, Uganda, Tanzania and the United Kingdom (Ministry report).",
    ],
    [
      "Phase 3 — Sustain",
      "Expand into the shared East African safari circuit (Tanzania, Uganda) that Aurora's park map already spans — the Great Rift / Mara–Serengeti ecosystem — with cross-border M-Pesa and craft corridors.",
    ],
  ];
  let cx = 0.7;
  const cw = 3.95;
  phases.forEach(([h, body]) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx,
      y: 2.55,
      w: cw,
      h: 3.9,
      rectRadius: 0.1,
      fill: { color: C.panel },
      line: { color: C.panel },
    });
    s.addText(h, {
      x: cx + 0.3,
      y: 2.8,
      w: cw - 0.6,
      h: 0.4,
      fontFace: FONT_HEAD,
      fontSize: 15,
      bold: true,
      color: C.gold,
    });
    s.addText(body, {
      x: cx + 0.3,
      y: 3.3,
      w: cw - 0.6,
      h: 2.95,
      fontFace: FONT_BODY,
      fontSize: 12,
      color: C.cream,
    });
    cx += cw + 0.24;
  });

  sourceNote(
    s,
    "Sources: Kenya Ministry of Tourism & Wildlife 2025 Sector Performance Report (arrivals mix & source markets); government / Senate coverage of 2027 visitor & earnings targets.",
    0.7,
    6.6,
    11.9
  );
  footer(s, 9, TOTAL, "GO-TO-MARKET STRATEGY");
}

// ---------------- SLIDE 10 : TEAM ----------------
{
  const s = pres.addSlide();
  bgSlide(s);
  badge(s, "09", 0.7, 0.55);
  kicker(s, "Team", 1.5, 0.65);
  title(s, "Why this team can build it", 0.7, 1.15, 9, 28);

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.7,
    y: 2.55,
    w: 5.6,
    h: 3.9,
    rectRadius: 0.1,
    fill: { color: C.panel },
    line: { color: C.panel },
  });
  s.addShape(pres.shapes.OVAL, {
    x: 1.05,
    y: 2.95,
    w: 1.15,
    h: 1.15,
    fill: { color: C.terracotta },
    line: { color: C.terracotta },
  });
  s.addText("PO", {
    x: 1.05,
    y: 2.95,
    w: 1.15,
    h: 1.15,
    align: "center",
    valign: "middle",
    fontFace: FONT_HEAD,
    bold: true,
    fontSize: 26,
    color: C.cream,
  });
  s.addText("ProximaOpal", {
    x: 2.4,
    y: 3.0,
    w: 3.6,
    h: 0.4,
    fontFace: FONT_HEAD,
    bold: true,
    fontSize: 18,
    color: C.cream,
  });
  s.addText("Founder & Full-Stack Product Engineer", {
    x: 2.4,
    y: 3.42,
    w: 3.6,
    h: 0.55,
    fontFace: FONT_BODY,
    fontSize: 11.5,
    color: C.gold,
  });
  s.addText(
    "Web developer and UI/UX designer based in Nairobi, building for the Kenyan digital ecosystem — AI automation (n8n), voice agents (ElevenLabs), and end-to-end web products. Designed, built and shipped Aurora Travels solo: the frontend, interactive maps, craft marketplace and the live M-Pesa STK Push integration.",
    {
      x: 1.05,
      y: 4.45,
      w: 4.9,
      h: 1.9,
      fontFace: FONT_BODY,
      fontSize: 12,
      color: C.cream,
    }
  );

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 6.55,
    y: 2.55,
    w: 6.1,
    h: 3.9,
    rectRadius: 0.1,
    fill: { color: C.panelLite },
    line: { color: C.panelLite },
  });
  s.addText("BUILDING THE TEAM", {
    x: 6.85,
    y: 2.8,
    w: 5.4,
    h: 0.3,
    fontFace: FONT_BODY,
    fontSize: 11,
    bold: true,
    color: C.gold,
    charSpacing: 1.5,
  });
  const seeking = [
    "Kenya tourism & hospitality partnerships lead — to formalize shop, park and guide agreements",
    "Artisan network coordinator — to onboard and verify craft shops county by county",
    "Growth / GTM support — to run the Nairobi + Maasai Mara pilot launch",
  ];
  let ty = 3.3;
  seeking.forEach((t) => {
    iconDot(s, 6.9, ty + 0.1, 0.13, C.gold);
    s.addText(t, {
      x: 7.15,
      y: ty - 0.1,
      w: 5.2,
      h: 0.8,
      fontFace: FONT_BODY,
      fontSize: 12.5,
      color: C.cream,
    });
    ty += 0.95;
  });

  footer(s, 10, TOTAL, "TEAM");
}

// ---------------- SLIDE 11 : ASK ----------------
{
  const s = pres.addSlide();
  bgSlide(s);
  badge(s, "10", 0.7, 0.55);
  kicker(s, "Financials & The Ask", 1.5, 0.65);
  title(s, "What Aurora Travels needs, and what it enables", 0.7, 1.15, 10, 26);

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.7,
    y: 2.55,
    w: 5.6,
    h: 3.9,
    rectRadius: 0.1,
    fill: { color: C.panel },
    line: { color: C.panel },
  });
  s.addText("SEED / PARTNERSHIP CAPITAL", {
    x: 1.0,
    y: 2.8,
    w: 5.0,
    h: 0.3,
    fontFace: FONT_BODY,
    fontSize: 11,
    bold: true,
    color: C.gold,
    charSpacing: 1,
  });
  s.addText("US$180,000", {
    x: 1.0,
    y: 3.15,
    w: 5.0,
    h: 0.55,
    fontFace: FONT_HEAD,
    fontSize: 36,
    bold: true,
    color: C.terracotta,
  });
  s.addText(
    "≈ KES 23.4 million (at ~130 KES/USD) — 18-month Nairobi + Maasai Mara pilot. Open to grant, equity, in-kind tourism partnerships, or blended support.",
    {
      x: 1.0,
      y: 3.7,
      w: 5.0,
      h: 0.7,
      fontFace: FONT_BODY,
      fontSize: 12,
      color: C.cream,
    }
  );
  s.addShape(pres.shapes.LINE, {
    x: 1.0,
    y: 4.45,
    w: 5.0,
    h: 0,
    line: { color: C.line, width: 1 },
  });
  s.addText("USE OF FUNDS", {
    x: 1.0,
    y: 4.55,
    w: 5.0,
    h: 0.28,
    fontFace: FONT_BODY,
    fontSize: 10,
    bold: true,
    color: C.gold,
  });
  const uses = [
    ["Product & engineering", "40%", "US$72,000"],
    ["Artisan & guide network growth", "35%", "US$63,000"],
    ["Marketing & pilot launch", "25%", "US$45,000"],
  ];
  let uy = 4.9;
  uses.forEach(([u, pct, amt]) => {
    iconDot(s, 1.05, uy + 0.09, 0.12, C.terracotta);
    s.addText(`${u} — ${pct} (${amt})`, {
      x: 1.3,
      y: uy - 0.05,
      w: 4.8,
      h: 0.35,
      fontFace: FONT_BODY,
      fontSize: 12,
      color: C.cream,
    });
    uy += 0.4;
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 6.55,
    y: 2.55,
    w: 6.1,
    h: 3.9,
    rectRadius: 0.1,
    fill: { color: C.panelLite },
    line: { color: C.panelLite },
  });
  s.addText("SHOP PARTNERS ONBOARDED (18–24 MO MODEL)", {
    x: 6.85,
    y: 2.75,
    w: 5.5,
    h: 0.3,
    fontFace: FONT_BODY,
    fontSize: 10.5,
    bold: true,
    color: C.gold,
    charSpacing: 1,
  });
  s.addChart(pres.charts.BAR, [
    {
      name: "Shop partners",
      labels: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8"],
      values: [24, 40, 65, 90, 120, 160, 210, 270],
    },
  ], {
    x: 6.85,
    y: 3.15,
    w: 5.5,
    h: 2.55,
    chartColors: [C.gold],
    showTitle: false,
    showValue: false,
    catAxisLabelColor: C.mutedCream,
    catAxisLabelFontSize: 9,
    valAxisHidden: true,
    valGridLine: { style: "none" },
    catGridLine: { style: "none" },
    showLegend: false,
    chartArea: { fill: { color: C.panelLite } },
    plotArea: { fill: { color: C.panelLite } },
    barGapWidthPct: 30,
  });
  s.addText(
    "Y3 modeled platform revenue ~US$5.0M at 11% blended take on US$45M GMV.",
    {
      x: 6.85,
      y: 5.85,
      w: 5.5,
      h: 0.4,
      fontFace: FONT_BODY,
      fontSize: 11,
      color: C.cream,
    }
  );

  sourceNote(
    s,
    "Ask amount and use-of-funds split are founder-proposed for an 18-month pilot. Growth curve and Y3 revenue are modeled — not achieved. FX illustrative at 130 KES/USD.",
    0.7,
    6.6,
    11.9
  );
  footer(s, 11, TOTAL, "FINANCIALS & THE ASK");
}

pres
  .writeFile({ fileName: OUT })
  .then(() => {
    console.log("Wrote", OUT);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
