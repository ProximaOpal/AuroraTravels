/**
 * Kenyan / East African artifacts only — masks, carvings, shields, spears, beads, soapstone
 */
window.AuroraTravels = window.AuroraTravels || {};

const ACCENTS = ["#ff4d6d", "#ffd166", "#06d6a0", "#4cc9f0", "#8b5cf6", "#f77f00", "#e63946", "#2a9d8f"];
const ICONS = ["mask", "carving", "spear", "bead", "bracelet", "mask", "carving", "spear"];

/** Curated craft / cultural object photographs (African art & heritage) */
const CRAFT_IMAGES = [
  "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551913902-c92207326525?w=1400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=1400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=1400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544967082-d9d25d747e20?w=1400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1604871000636-074fa5117948?w=1400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=1400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=1400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515405297840-7ebe83dfd6bb?w=1400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=1400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1493106819501-66d381c466f1?w=1400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=1400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1577083552431-6e5fd01988d8?w=1400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=1400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1400&q=80&auto=format&fit=crop&sat=-20",
  "https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=1400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1549490349-8643362247b5?w=1400&q=80&auto=format&fit=crop",
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
