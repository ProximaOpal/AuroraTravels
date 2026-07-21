"""
Fill Afrihealth Innovation Template with Aurora Travels content.
Preserves all colors, theme, layout, and decorative images — text only.
"""
from pathlib import Path
from pptx import Presentation

SRC = Path(__file__).resolve().parent / "Afrihealth_Innovation_Template.pptx"
OUT = Path(__file__).resolve().parent / "AuroraTravels_Pitch_Deck.pptx"


def set_text(shape, text: str) -> None:
    """Replace shape text while keeping first-run formatting."""
    if shape is None or not shape.has_text_frame:
        return
    tf = shape.text_frame
    lines = text.split("\n")
    while len(tf.paragraphs) < len(lines):
        tf.add_paragraph()
    for i, para in enumerate(tf.paragraphs):
        if i < len(lines):
            line = lines[i]
            if para.runs:
                para.runs[0].text = line
                for r in para.runs[1:]:
                    r.text = ""
            else:
                run = para.add_run()
                run.text = line
        else:
            for r in para.runs:
                r.text = ""


def first_contains(slide, fragment: str):
    for shape in slide.shapes:
        if not shape.has_text_frame:
            continue
        full = "\n".join(p.text for p in shape.text_frame.paragraphs)
        if fragment in full:
            return shape
    return None


def first_exact(slide, exact: str):
    for shape in slide.shapes:
        if not shape.has_text_frame:
            continue
        full = "\n".join(p.text for p in shape.text_frame.paragraphs).strip()
        if full == exact.strip():
            return shape
    return None


def main() -> None:
    prs = Presentation(str(SRC))
    assert len(prs.slides) == 11

    # ---- SLIDE 1: Title ----
    s = prs.slides[0]
    set_text(first_contains(s, "PITCH DECK TEMPLATE"), "AURORA TRAVELS")
    set_text(
        first_contains(s, "Afrihealth Innovation Challenge"),
        "Afrihealth Innovation Challenge 2026",
    )
    set_text(
        first_contains(s, "Replace the guidance text"),
        "A Kenya-native app for parks, stays, verified crafts and student guides — "
        "connecting travelers to artisans and university guides with M-Pesa checkout.\n"
        "Built in Nairobi by ProximaOpal · auroratravels",
    )

    # ---- SLIDE 2: Problem ----
    s = prs.slides[1]
    set_text(
        first_contains(s, "What health challenge"),
        "Kenya’s travel experience is fragmented — and its creative economy is invisible online",
    )
    set_text(
        first_contains(s, "Describe the specific health"),
        "• International arrivals rose 9% YoY to 2.7M in 2025 (5.2M domestic; 7.9M total), "
        "yet travelers still stitch together separate tools for parks, stays, crafts and guides "
        "— mostly via commission-heavy foreign platforms.\n"
        "• Kenya’s informal / Jua Kali and MSE economy contributes an estimated 24–33% of GDP, "
        "but most craft artisans lack a verified digital storefront into tourist demand.\n"
        "• Federation of Kenya Employers cites 67% unemployment among Kenyans aged 15–34 — "
        "deep local knowledge sits idle instead of being monetized as guiding.",
    )
    set_text(
        first_contains(s, "Supporting data point"),
        "Supporting data point\n"
        "67% — FKE figure for ages 15–34 without adequate employment\n"
        "2.7M international arrivals in 2025 (+9% YoY)\n"
        "KES ~0.5T (~US$3.8B) tourism earnings (Ministry / Magical Kenya 2025)",
    )

    # ---- SLIDE 3: Solution ----
    s = prs.slides[2]
    set_text(
        first_contains(s, "How does your innovation"),
        "One app: parks, stays, verified Kenyan crafts and student guides — paid by M-Pesa",
    )
    set_text(
        first_contains(s, "One-sentence description"),
        "A single web experience from discovering Kenya’s parks to buying a named artisan craft "
        "and pairing with a vetted university guide — checked out with native M-Pesa STK Push.",
    )
    set_text(
        first_contains(s, "The core mechanism"),
        "Interactive map (15 parks) → travel & stay booking → marketplace of 28 crafts tied to "
        "real shops and Google Maps pins → on-demand pairing with guides from 12 Kenyan universities.",
    )
    set_text(
        first_contains(s, "The unique insight"),
        "Built on Kenya’s own payment rail (~98% of mobile subscriptions use mobile money, CA Kenya) "
        "instead of card-only global OTAs; every shop and guide is named and mappable; "
        "guiding fees go to Kenyan students.",
    )

    # ---- SLIDE 4: Product ----
    s = prs.slides[3]
    set_text(
        first_contains(s, "Show the user journey"),
        "Four steps, one continuous journey — live build today",
    )
    set_text(
        first_contains(s, "Insert 3–5 step"),
        "Interactive map, integrated booking, working M-Pesa checkout, and a guide roster — "
        "with Kenyan craft and place photography throughout Artifacts and Guides.",
    )
    step_titles = []
    step_descs = []
    for shape in s.shapes:
        if not shape.has_text_frame:
            continue
        t = "\n".join(p.text for p in shape.text_frame.paragraphs).strip()
        if t.startswith("Step ") and len(t) <= 8:
            step_titles.append(shape)
        elif t == "[brief description]":
            step_descs.append(shape)
    labels = ["Discover", "Plan", "Shop", "Connect"]
    bodies = [
        "Browse 15 parks & destinations on a live interactive map",
        "Book travel and accommodation in the same flow",
        "Buy authentic crafts from named Kenyan shops (Tabaka, Kazuri, Maasai Market)",
        "Pay by M-Pesa STK Push, then pair with a vetted student guide",
    ]
    for i, shape in enumerate(step_titles[:4]):
        set_text(shape, labels[i])
    for i, shape in enumerate(step_descs[:4]):
        set_text(shape, bodies[i])

    # ---- SLIDE 5: Market ----
    s = prs.slides[4]
    set_text(
        first_contains(s, "Replace with your figures"),
        "TAM US$12.7B  ·  SAM ~US$3.8B  ·  SOM US$45M GMV (3-yr model)",
    )
    set_text(
        first_contains(s, "Total Addressable Market"),
        "• TAM — US$12.7B: WTTC Travel & Tourism contribution to Kenya in 2025 "
        "(9.3% of GDP; 1.8M jobs).\n"
        "• SAM — ~US$3.8B (KES 0.5T): Ministry-reported direct tourism earnings from 7.9M visitors "
        "(2.7M international + 5.2M domestic).\n"
        "• SOM (3-yr, modeled) — US$45M GMV: illustrative ~1.2% capture of international visitor "
        "spend on crafts / experiences / guiding (~US$5.0B international spend, WTTC).\n"
        "• Sources: WTTC EIR 2025/26; Kenya Ministry of Tourism & Wildlife / Magical Kenya 2025.",
    )

    # ---- SLIDE 6: Business model ----
    s = prs.slides[5]
    set_text(
        first_contains(s, "Subscription, transaction fee"),
        "Craft GMV take-rate (~12%); guide-booking service fee (KES 500–800); "
        "8–10% referral on travel & stay; featured placement for shops "
        "(KES 3,000–8,000/mo) and guides.",
    )
    set_text(
        first_contains(s, "What do customers pay"),
        "Live catalogue KES 2,200–15,200 (~US$17–$118) across 28 crafts. "
        "Modeled below typical OTA 20–30% commissions (Viator / GetYourGuide) "
        "because checkout is native M-Pesa.",
    )
    set_text(
        first_contains(s, "Customer acquisition cost"),
        "Low CAC via university guide network and mapped shop partners. "
        "At modeled Y3 GMV US$45M and ~11% blended take-rate → ~US$5.0M platform revenue. "
        "LTV compounds across trips, crafts and guides.",
    )

    # ---- SLIDE 7: Traction ----
    s = prs.slides[6]
    set_text(
        first_contains(s, "Proof that this is working"),
        "Pre-launch product build — seeking pilot partners (not live revenue yet)",
    )
    nums = []
    for shape in s.shapes:
        if not shape.has_text_frame:
            continue
        t = "\n".join(p.text for p in shape.text_frame.paragraphs).strip()
        if t == "[ number ]":
            nums.append(shape)
    for i, val in enumerate(["28", "24+", "Pre-rev", "1"][: len(nums)]):
        set_text(nums[i], val)
    for old, new in [
        ("Users / Patients Reached", "Curated crafts listed"),
        ("Pilot Partners", "Named Kenyan shops mapped"),
        ("Revenue / Funding Raised", "Seeking pilot capital"),
        ("Key Milestone", "Live M-Pesa STK Push"),
    ]:
        set_text(first_exact(s, old), new)

    # ---- SLIDE 8: Competition ----
    s = prs.slides[7]
    set_text(
        first_contains(s, "Axis 2"),
        "Kenya-native payments & verified local shops/guides →",
    )
    set_text(first_contains(s, "Axis 1"), "Breadth of Kenya travel experience ↑")
    set_text(first_exact(s, "You"), "Aurora Travels")
    for old, new in [
        ("Comp. A", "SafariBookings"),
        ("Comp. B", "Viator / GYG / Klook"),
        ("Comp. C", "Informal curios"),
    ]:
        set_text(first_exact(s, old), new)
    set_text(
        first_contains(s, "Label both axes"),
        "• Global OTAs charge 20–30% and are card-first; they don’t sell named Kenyan "
        "artisan shops or student guides.\n"
        "• SafariBookings lists tours but does not process payment or sell crafts/guides directly.\n"
        "• Defensible advantage: M-Pesa-native checkout + verified local shops/guides "
        "in one Kenya-first journey (~98% mobile-money reach).",
    )

    # ---- SLIDE 9: GTM ----
    s = prs.slides[8]
    set_text(
        first_contains(s, "Initial geography"),
        "Nairobi + Maasai Mara gateway (Narok). Onboard mapped shops — Maasai Market, "
        "Tabaka Soapstone, Wamunyu Carvers, Kazuri — and first university guide cohort. "
        "Target: 40 shops, 40 guides, first 5,000 paid transactions.",
    )
    set_text(
        first_contains(s, "Expansion plan"),
        "Extend across more of Kenya’s 47 counties toward 2027 targets "
        "(5.5M international arrivals; KES 1T earnings). Prioritise 2025 top source markets: "
        "US, Uganda, Tanzania, UK.",
    )
    set_text(
        first_contains(s, "Path to regional"),
        "Expand into the East African safari circuit (Tanzania, Uganda) already on Aurora’s "
        "park map — Mara–Serengeti / Great Rift corridor — with cross-border craft and guide networks.",
    )

    # ---- SLIDE 10: Team ----
    s = prs.slides[9]
    photo_ph, name_ph, role_ph, bio_ph = [], [], [], []
    for shape in s.shapes:
        if not shape.has_text_frame:
            continue
        t = "\n".join(p.text for p in shape.text_frame.paragraphs).strip()
        if t == "[ photo ]":
            photo_ph.append(shape)
        elif t == "[ Name ]":
            name_ph.append(shape)
        elif t == "[ Role ]":
            role_ph.append(shape)
        elif t.startswith("[ One line"):
            bio_ph.append(shape)
    team = [
        (
            "PO",
            "ProximaOpal",
            "Founder & Full-Stack Product Engineer",
            "Nairobi-based web/AI builder; shipped Aurora Travels solo including maps, "
            "marketplace and live M-Pesa STK Push.",
        ),
        (
            "—",
            "Open role",
            "Tourism partnerships lead",
            "Formalize shop, park and guide agreements across Kenya.",
        ),
        (
            "—",
            "Open role",
            "Artisan network coordinator",
            "Onboard and verify craft shops county by county.",
        ),
        (
            "—",
            "Open role",
            "Growth / GTM support",
            "Run the Nairobi + Maasai Mara pilot launch.",
        ),
    ]
    for i, (photo, name, role, bio) in enumerate(team):
        if i < len(photo_ph):
            set_text(photo_ph[i], photo)
        if i < len(name_ph):
            set_text(name_ph[i], name)
        if i < len(role_ph):
            set_text(role_ph[i], role)
        if i < len(bio_ph):
            set_text(bio_ph[i], bio)

    # ---- SLIDE 11: Ask ----
    s = prs.slides[10]
    set_text(
        first_contains(s, "Funding / support requested"),
        "Funding / support requested\n"
        "US$180,000 (~KES 23.4M at ~130 KES/USD) — 18-month Nairobi + Maasai Mara pilot.\n"
        "Open to grant, equity, in-kind tourism partnerships, or blended support.\n"
        "Use of funds:\n"
        "• Product & engineering — 40% (US$72,000)\n"
        "• Artisan & guide network growth — 35% (US$63,000)\n"
        "• Marketing & pilot launch — 25% (US$45,000)",
    )
    set_text(
        first_contains(s, "12–24 month projection"),
        "12–24 month projection\n"
        "Shop partners onboarded (model): 24 → 40 → 65 → 90 → 120 → 160 → 210 → 270 over 8 quarters.\n"
        "Y3 modeled platform revenue ~US$5.0M at 11% blended take on US$45M GMV.\n"
        "Headline metric: named Kenyan shops live on Aurora with M-Pesa checkout.",
    )

    OUT.parent.mkdir(parents=True, exist_ok=True)
    prs.save(str(OUT))
    print(f"Wrote {OUT} ({OUT.stat().st_size} bytes)")

    # Sanity check: template theme still present / no leftover placeholders
    prs2 = Presentation(str(OUT))
    leftovers = []
    for i, slide in enumerate(prs2.slides, 1):
        for shape in slide.shapes:
            if not shape.has_text_frame:
                continue
            t = "\n".join(p.text for p in shape.text_frame.paragraphs)
            for needle in (
                "[Insert",
                "[brief description]",
                "[ number ]",
                "[ Name ]",
                "Replace the guidance",
                "PITCH DECK TEMPLATE",
            ):
                if needle in t:
                    leftovers.append((i, needle, t[:80]))
    if leftovers:
        print("WARN leftovers:", leftovers)
    else:
        print("No major placeholders left")


if __name__ == "__main__":
    main()
