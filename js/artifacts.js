/**
 * Kenyan artifacts — masks, carvings, shields, spears, beads, soapstone, baskets.
 * Images: Wikimedia Commons photos of Kenyan crafts / markets (local assets).
 * Each item includes a spoken/text description for Atlas (ElevenLabs agent).
 */
window.AuroraTravels = window.AuroraTravels || {};

const ACCENTS = ["#ff4d6d", "#ffd166", "#06d6a0", "#4cc9f0", "#8b5cf6", "#f77f00", "#e63946", "#2a9d8f"];
const ICONS = ["mask", "carving", "spear", "bead", "bracelet", "mask", "carving", "spear"];

/** Authentic Kenyan craft photographs (Wikimedia Commons → /assets/crafts) */
const CRAFT_IMAGES = [
  "assets/crafts/maasai-beads-1.jpg",
  "assets/crafts/soapstone-tabaka.jpg",
  "assets/crafts/akamba-carver.jpg",
  "assets/crafts/kazuri-1.jpg",
  "assets/crafts/spears-shields.jpg",
  "assets/crafts/wood-carvings-kenya.jpg",
  "assets/crafts/lamu-door-1.jpg",
  "assets/crafts/kiondo-1.jpg",
  "assets/crafts/calabash-kenya.jpg",
  "assets/crafts/turkana-jewelry-1.jpg",
  "assets/crafts/soapstone-art.jpg",
  "assets/crafts/mombasa-oldtown.jpg",
  "assets/crafts/samburu-beads.jpg",
  "assets/crafts/kiondo-2.jpg",
  "assets/crafts/maasai-beading.jpg",
  "assets/crafts/lamu-door-2.jpg",
  "assets/crafts/calabash-2.jpg",
  "assets/crafts/kiondo-3.jpg",
  "assets/crafts/maasai-beads-2.jpg",
  "assets/crafts/soapstone-cutter.jpg",
  "assets/crafts/turkana-jewelry-2.jpg",
  "assets/crafts/kazuri-2.jpg",
  "assets/crafts/samburu-beadwork.jpg",
  "assets/crafts/maasai-market-1.jpg",
  "assets/crafts/maasai-blankets.jpg",
  "assets/crafts/spears-shields.jpg",
  "assets/crafts/kazuri-3.jpg",
  "assets/crafts/maasai-market-2.jpg",
];

/**
 * [artifact, shop, city, priceKES, mapsQuery, description]
 */
const CATALOGUE = [
  ["Maasai Beaded Collar", "Maasai Market", "Nairobi", 4500, "Maasai+Market+Nairobi",
    "A layered Maasai beaded collar in bright glass seed beads — traditionally worn for ceremony. Hand-strung at Nairobi’s Maasai Market; cool and textured against the skin."],
  ["Kisii Soapstone Mask", "Tabaka Cooperative", "Kisii", 6200, "Tabaka+Soapstone+Kisii",
    "A hand-carved soapstone face mask from Tabaka Hills in Kisii — soft stone that feels silky, often left natural cream or tinted with earth pigments."],
  ["Akamba Ebony Figure", "Wamunyu Carvers", "Machakos", 8900, "Wamunyu+wood+carving",
    "A polished Akamba hardwood figure from Wamunyu workshops — dense dark wood, smooth to the touch, carved as an animal or human form for home display."],
  ["Kazuri Ceramic Beads", "Kazuri Beads", "Karen, Nairobi", 2800, "Kazuri+Beads+Karen",
    "Glazed ceramic bead jewellery from Kazuri Beads in Karen — a women-led Kenyan enterprise. Lightweight, colourful, and kiln-fired for lasting colour."],
  ["Maasai Spear & Shield", "African Heritage", "Nairobi", 12500, "African+Heritage+House+Nairobi",
    "A decorative Maasai spear paired with a painted hide shield — cultural symbols of protection. Display pieces with leather, wood, and bold geometric paint."],
  ["Kalenjin Guard Shield", "Rift Craft Traders", "Eldoret", 9800, "Eldoret+handicraft+market",
    "A Rift Valley guard shield inspired by Kalenjin warrior forms — curved wood face, taut covering, and painted motifs from highland craft traders in Eldoret."],
  ["Coastal Spirit Mask", "Lamu Old Town Shops", "Lamu", 7600, "Lamu+Old+Town+Handicrafts",
    "A Swahili-coast spirit mask carved in Lamu Old Town — warm hardwood, ocean-worn finish, and motifs that echo island ceremony and dhow culture."],
  ["Kiondo Sisal Basket", "City Market Stalls", "Nairobi CBD", 3500, "City+Market+Nairobi",
    "A classic Kenyan kiondo — woven sisal (and sometimes leather handles) used for market days and home storage. Strong, flexible, and lightly fragrant of plant fibre."],
  ["Engraved Calabash", "Banana Hill Gallery", "Kiambu", 2200, "Banana+Hill+Art+Gallery",
    "A dried calabash gourd engraved with geometric lines — traditionally used for milk or porridge. Light, hollow, and warm in the hand."],
  ["Turkana Beaded Armour", "Northern Craft Collective", "Lodwar", 5400, "Lodwar+Kenya+market",
    "Heavy Turkana-style beadwork chest or neck armour in strong colour bands — bold, dense bead rows meant for ceremony and identity in northern Kenya."],
  ["Kamba Animal Carving", "Wamunyu Workshops", "Machakos", 4100, "Wamunyu+Kenya",
    "A smaller Akamba animal carving — elephant, giraffe, or antelope — sanded smooth for gifts and shelves. Compact, detailed, and travel-friendly."],
  ["Swahili Carved Panel", "Mombasa Old Town", "Mombasa", 15200, "Mombasa+Old+Town+crafts",
    "A rectangular Swahili wood panel with deep floral or geometric relief — the same carving language as Lamu and Mombasa doors. Heavy, aromatic hardwood."],
  ["Samburu Bead Collar", "Archer's Post Traders", "Samburu", 3900, "Samburu+beadwork",
    "A Samburu beaded collar with tight colour rings — related to Maasai styles but with its own northern palette. Soft leather backing, bright glass beads."],
  ["Luo Woven Fish Trap", "Kisumu Lakeside Market", "Kisumu", 2700, "Kisumu+handicraft",
    "A woven Luo-inspired fish trap form from Kisumu lakeside makers — open lattice of reeds or cane, a sculptural piece that tells Lake Victoria fishing stories."],
  ["Nandi Ceremonial Rungu", "Kalenjin Heritage Stall", "Kapsabet", 4800, "Kapsabet+Kenya",
    "A ceremonial rungu (club) with a carved knob handle — Kalenjin highland craft. Balanced hardwood, often lightly oiled to a soft sheen."],
  ["Giriama Wooden Fetish", "Kilifi Craft Walk", "Kilifi", 6700, "Kilifi+crafts",
    "A coastal Giriama-inspired wooden figure from Kilifi craft walks — compact carving with protective symbolism, textured grain, and matte finish."],
  ["Borana Wooden Headrest", "Marsabit Traders", "Marsabit", 3200, "Marsabit+Kenya",
    "A Borana-style wooden headrest — the classic curved pillow used by pastoral communities. Smooth, portable, and sculptural on a shelf."],
  ["Kikuyu Milk Gourd Set", "Nyeri Craft Cooperative", "Nyeri", 2500, "Nyeri+crafts",
    "A small set of Kikuyu milk gourds from Nyeri cooperatives — nested or paired calabashes for serving. Light, traditional, and kitchen-ready."],
  ["Long Maasai Spear", "Narok Cultural Yard", "Narok", 7200, "Narok+Maasai+market",
    "A long decorative Maasai spear from Narok cultural yards near the Mara — slender shaft, metal tip, made for display rather than use."],
  ["Hand-Carved Dhow Model", "Malindi Woodworkers", "Malindi", 5800, "Malindi+handicrafts",
    "A miniature Swahili dhow from Malindi woodworkers — lateen sail, carved hull, and coastal timber. A desk-size story of Indian Ocean trade."],
  ["Pokot Beaded Belt", "West Pokot Collective", "Kapenguria", 3600, "Kapenguria+Kenya",
    "A Pokot beaded belt with dense colour blocks — wearable art from West Pokot collectives. Flexible bead weave on a sturdy backing."],
  ["Meru Carved Honey Pot", "Meru Central Market", "Meru", 3100, "Meru+town+market",
    "A Meru carved honey pot — rounded wood vessel with lid, echoing highland beekeeping. Warm wood scent, food-safe finish when noted by the seller."],
  ["Taita Soapstone Bowl", "Voi Craft Centre", "Taita-Taveta", 2900, "Voi+Kenya+crafts",
    "A shallow soapstone bowl from Taita-Taveta / Voi craft centres — cool stone, gently scooped interior, perfect for keys or jewellery."],
  ["Rendille Camel Bell", "Desert Craft Collective", "Marsabit", 2400, "Marsabit+market",
    "A Rendille-style camel bell — metal or wood clapper in a carved housing. Rings softly; a desert pastoral object made decorative."],
  ["Embu Hardwood Stool", "Embu Wood Guild", "Embu", 4300, "Embu+Kenya+crafts",
    "A low Embu hardwood stool — three or four legs, smooth seat, built for everyday sitting. Sturdy grain and a natural oil finish."],
  ["Kalenjin War Shield", "Nandi Hills Atelier", "Nandi Hills", 11200, "Nandi+Hills+Kenya",
    "A large Kalenjin war-shield form from Nandi Hills ateliers — oval face, painted geometry, statement wall piece with highland provenance."],
  ["Makonde-Style Mask", "Coast Carvers Union", "Mtwapa", 8100, "Mtwapa+Kenya",
    "A Makonde-style mask carved on the Kenyan coast — elongated features, deep cuts, dark stain. Bold sculpture for collectors of East African form."],
  ["Maasai Beaded Belt", "Kajiado Market Row", "Kajiado", 3300, "Kajiado+Maasai+market",
    "A slim Maasai beaded belt from Kajiado market rows — colourful bead bands on leather, adjustable, made for everyday wear or gifting."],
];

window.AuroraTravels.artifacts = CATALOGUE.map(
  ([artifact, shop, city, price, mapsQ, description], index) => ({
    id: `artifact-${index + 1}`,
    artifact,
    shop,
    city,
    price,
    description,
    accent: ACCENTS[index % ACCENTS.length],
    icon: ICONS[index % ICONS.length],
    image: CRAFT_IMAGES[index % CRAFT_IMAGES.length],
    maps: `https://www.google.com/maps/search/?api=1&query=${mapsQ}+Kenya`,
  })
);
