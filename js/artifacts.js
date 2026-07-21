/**
 * Kenyan artifacts — masks, carvings, shields, spears, beads, soapstone, baskets.
 * Images: Wikimedia Commons photos of Kenyan crafts / markets (local assets).
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

const CATALOGUE = [
  ["Maasai Beaded Collar", "Maasai Market", "Nairobi", 4500, "Maasai+Market+Nairobi"],
  ["Kisii Soapstone Mask", "Tabaka Cooperative", "Kisii", 6200, "Tabaka+Soapstone+Kisii"],
  ["Akamba Ebony Figure", "Wamunyu Carvers", "Machakos", 8900, "Wamunyu+wood+carving"],
  ["Kazuri Ceramic Beads", "Kazuri Beads", "Karen, Nairobi", 2800, "Kazuri+Beads+Karen"],
  ["Maasai Spear & Shield", "African Heritage", "Nairobi", 12500, "African+Heritage+House+Nairobi"],
  ["Kalenjin Guard Shield", "Rift Craft Traders", "Eldoret", 9800, "Eldoret+handicraft+market"],
  ["Coastal Spirit Mask", "Lamu Old Town Shops", "Lamu", 7600, "Lamu+Old+Town+Handicrafts"],
  ["Kiondo Sisal Basket", "City Market Stalls", "Nairobi CBD", 3500, "City+Market+Nairobi"],
  ["Engraved Calabash", "Banana Hill Gallery", "Kiambu", 2200, "Banana+Hill+Art+Gallery"],
  ["Turkana Beaded Armour", "Northern Craft Collective", "Lodwar", 5400, "Lodwar+Kenya+market"],
  ["Kamba Animal Carving", "Wamunyu Workshops", "Machakos", 4100, "Wamunyu+Kenya"],
  ["Swahili Carved Panel", "Mombasa Old Town", "Mombasa", 15200, "Mombasa+Old+Town+crafts"],
  ["Samburu Bead Collar", "Archer's Post Traders", "Samburu", 3900, "Samburu+beadwork"],
  ["Luo Woven Fish Trap", "Kisumu Lakeside Market", "Kisumu", 2700, "Kisumu+handicraft"],
  ["Nandi Ceremonial Rungu", "Kalenjin Heritage Stall", "Kapsabet", 4800, "Kapsabet+Kenya"],
  ["Giriama Wooden Fetish", "Kilifi Craft Walk", "Kilifi", 6700, "Kilifi+crafts"],
  ["Borana Wooden Headrest", "Marsabit Traders", "Marsabit", 3200, "Marsabit+Kenya"],
  ["Kikuyu Milk Gourd Set", "Nyeri Craft Cooperative", "Nyeri", 2500, "Nyeri+crafts"],
  ["Long Maasai Spear", "Narok Cultural Yard", "Narok", 7200, "Narok+Maasai+market"],
  ["Hand-Carved Dhow Model", "Malindi Woodworkers", "Malindi", 5800, "Malindi+handicrafts"],
  ["Pokot Beaded Belt", "West Pokot Collective", "Kapenguria", 3600, "Kapenguria+Kenya"],
  ["Meru Carved Honey Pot", "Meru Central Market", "Meru", 3100, "Meru+town+market"],
  ["Taita Soapstone Bowl", "Voi Craft Centre", "Taita-Taveta", 2900, "Voi+Kenya+crafts"],
  ["Rendille Camel Bell", "Desert Craft Collective", "Marsabit", 2400, "Marsabit+market"],
  ["Embu Hardwood Stool", "Embu Wood Guild", "Embu", 4300, "Embu+Kenya+crafts"],
  ["Kalenjin War Shield", "Nandi Hills Atelier", "Nandi Hills", 11200, "Nandi+Hills+Kenya"],
  ["Makonde-Style Mask", "Coast Carvers Union", "Mtwapa", 8100, "Mtwapa+Kenya"],
  ["Maasai Beaded Belt", "Kajiado Market Row", "Kajiado", 3300, "Kajiado+Maasai+market"],
];

window.AuroraTravels.artifacts = CATALOGUE.map(([artifact, shop, city, price, mapsQ], index) => ({
  id: `artifact-${index + 1}`,
  artifact,
  shop,
  city,
  price,
  accent: ACCENTS[index % ACCENTS.length],
  icon: ICONS[index % ICONS.length],
  image: CRAFT_IMAGES[index % CRAFT_IMAGES.length],
  maps: `https://www.google.com/maps/search/?api=1&query=${mapsQ}+Kenya`,
}));
