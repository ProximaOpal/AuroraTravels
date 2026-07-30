/* PENZI — matchmaking, personality, poetry, pencil art, music */

const PROFILES = [
  {
    id: "amina",
    name: "Amina Hassan",
    city: "Mombasa",
    lat: -4.0435,
    lng: 39.6682,
    photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=640&q=80&auto=format&fit=crop",
    match: true,
    age: 27,
    birthdate: "12 Mar 1999",
    career: "Marine biologist",
    company: "Kenya Marine & Fisheries",
    education: "BSc Marine Science · UoN",
    height: "168 cm",
    languages: "Swahili, English, Arabic",
    faith: "Muslim",
    looking: "Long-term · intentional",
    interests: ["Snorkeling", "Poetry", "Coast food", "Jazz"],
    bio: "Raised by the tide. I collect shells and soft conversations.",
    personStars: 5.0,
    personVotes: 4,
    dateStars: 4.5,
    dateCount: 20,
    mallHint: "village",
  },
  {
    id: "brian",
    name: "Brian Okello",
    city: "Nairobi",
    lat: -1.2921,
    lng: 36.8219,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=640&q=80&auto=format&fit=crop",
    match: false,
    age: 29,
    birthdate: "3 Aug 1996",
    career: "Product designer",
    company: "Fintech · Westlands",
    education: "BDes · TUK",
    height: "180 cm",
    languages: "English, Luo, Swahili",
    faith: "Christian",
    looking: "Dating with clarity",
    interests: ["Cycling", "Afrobeats", "Design critique", "Brunch"],
    bio: "Pixel-perfect by day, matatu playlists by night.",
    personStars: 4.6,
    personVotes: 11,
    dateStars: 4.2,
    dateCount: 14,
    mallHint: "sarit",
  },
  {
    id: "wanjiku",
    name: "Wanjiku Kamau",
    city: "Nyeri",
    lat: -0.4167,
    lng: 36.9500,
    photo: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=640&q=80&auto=format&fit=crop",
    match: false,
    age: 26,
    birthdate: "21 Jan 2000",
    career: "Coffee agronomist",
    company: "Highland Co-op",
    education: "BSc Agriculture · Egerton",
    height: "165 cm",
    languages: "Kikuyu, English, Swahili",
    faith: "Christian",
    looking: "Someone grounded",
    interests: ["Hiking", "Film", "Farm mornings", "Tea"],
    bio: "I know soil the way some people know cities.",
    personStars: 4.8,
    personVotes: 7,
    dateStars: 4.7,
    dateCount: 9,
    mallHint: "gardencity",
  },
  {
    id: "otieno",
    name: "Otieno Ochieng",
    city: "Kisumu",
    lat: -0.0917,
    lng: 34.7680,
    photo: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=640&q=80&auto=format&fit=crop",
    match: false,
    age: 31,
    birthdate: "9 Nov 1994",
    career: "Civil engineer",
    company: "Lake Basin Dev.",
    education: "BEng · JKUAT",
    height: "183 cm",
    languages: "Luo, English, Swahili",
    faith: "Christian",
    looking: "Partnership",
    interests: ["Football", "Lake sunsets", "Cooking", "Maps"],
    bio: "I build bridges — literal ones, and the quiet kind.",
    personStars: 4.3,
    personVotes: 9,
    dateStars: 4.1,
    dateCount: 18,
    mallHint: "tworivers",
  },
  {
    id: "zawadi",
    name: "Zawadi Mbwana",
    city: "Lamu",
    lat: -2.2717,
    lng: 40.9020,
    photo: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=640&q=80&auto=format&fit=crop",
    match: true,
    age: 25,
    birthdate: "17 May 2000",
    career: "Heritage guide",
    company: "Lamu Old Town Tours",
    education: "BA History · KU",
    height: "170 cm",
    languages: "Swahili, English",
    faith: "Muslim",
    looking: "Soft life, deep roots",
    interests: ["Dhow sailing", "Storytelling", "Henna art", "Oud"],
    bio: "Stone streets, open doors, and mango at noon.",
    personStars: 4.9,
    personVotes: 6,
    dateStars: 4.8,
    dateCount: 11,
    mallHint: "westgate",
  },
  {
    id: "kevin",
    name: "Kevin Cheruiyot",
    city: "Eldoret",
    lat: 0.5143,
    lng: 35.2698,
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=640&q=80&auto=format&fit=crop",
    match: false,
    age: 28,
    birthdate: "2 Feb 1998",
    career: "Physio · athletics",
    company: "High Altitude Camp",
    education: "BSc Physiotherapy · Moi",
    height: "178 cm",
    languages: "Kalenjin, English, Swahili",
    faith: "Christian",
    looking: "Active partner",
    interests: ["Running", "Recovery science", "Podcasts", "Nyama"],
    bio: "Sunrise miles. Ice baths. Bad jokes on long runs.",
    personStars: 4.4,
    personVotes: 13,
    dateStars: 4.0,
    dateCount: 22,
    mallHint: "trm",
  },
  {
    id: "faith",
    name: "Faith Chebet",
    city: "Nakuru",
    lat: -0.3031,
    lng: 36.0800,
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=640&q=80&auto=format&fit=crop",
    match: false,
    age: 24,
    birthdate: "28 Sep 2001",
    career: "Wildlife ranger",
    company: "KWS · Lake Nakuru",
    education: "Dip. Wildlife · Mweka",
    height: "166 cm",
    languages: "Kalenjin, English, Swahili",
    faith: "Christian",
    looking: "Adventure + care",
    interests: ["Birding", "Camping", "Photography", "Gospel"],
    bio: "Flamingos at dawn beat any city skyline.",
    personStars: 4.7,
    personVotes: 5,
    dateStars: 4.6,
    dateCount: 8,
    mallHint: "junction",
  },
  {
    id: "juma",
    name: "Juma Ali",
    city: "Malindi",
    lat: -3.2192,
    lng: 40.1169,
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=640&q=80&auto=format&fit=crop",
    match: false,
    age: 30,
    birthdate: "14 Jul 1995",
    career: "Chef",
    company: "Coastal Kitchen",
    education: "Culinary Arts · KCCT",
    height: "175 cm",
    languages: "Swahili, English, Italian",
    faith: "Muslim",
    looking: "Foodie who stays",
    interests: ["Seafood", "Markets", "Football", "Travel"],
    bio: "I season with lemon, chili, and patience.",
    personStars: 4.5,
    personVotes: 15,
    dateStars: 4.4,
    dateCount: 27,
    mallHint: "yaya",
  },
  {
    id: "njeri",
    name: "Njeri Wambui",
    city: "Thika",
    lat: -1.0333,
    lng: 37.0693,
    photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=640&q=80&auto=format&fit=crop",
    match: false,
    age: 27,
    birthdate: "5 Dec 1998",
    career: "Software engineer",
    company: "Remote · EU clients",
    education: "BSc CS · Strathmore",
    height: "162 cm",
    languages: "English, Kikuyu, Swahili",
    faith: "Christian",
    looking: "Curious minds",
    interests: ["Hackathons", "Indie films", "Yoga", "Cats"],
    bio: "Debug by day. Soft playlists after deploy.",
    personStars: 4.6,
    personVotes: 10,
    dateStars: 4.3,
    dateCount: 16,
    mallHint: "gardencity",
  },
  {
    id: "hassan",
    name: "Hassan Abdi",
    city: "Garissa",
    lat: -0.4532,
    lng: 39.6461,
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=640&q=80&auto=format&fit=crop",
    match: false,
    age: 32,
    birthdate: "19 Apr 1994",
    career: "Public health officer",
    company: "County Health",
    education: "MPH · KU",
    height: "181 cm",
    languages: "Somali, Swahili, English",
    faith: "Muslim",
    looking: "Respect & family",
    interests: ["Community work", "Camel milk chai", "Poetry", "Chess"],
    bio: "I measure care in clinic visits and quiet evenings.",
    personStars: 4.8,
    personVotes: 8,
    dateStars: 4.5,
    dateCount: 12,
    mallHint: "diamond",
  },
  {
    id: "imani",
    name: "Imani Njoroge",
    city: "Nairobi",
    lat: -1.2670,
    lng: 36.8100,
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=640&q=80&auto=format&fit=crop",
    match: true,
    age: 26,
    birthdate: "8 Jun 1999",
    career: "Fashion stylist",
    company: "Freelance · Kilimani",
    education: "Fashion Design · Riara",
    height: "172 cm",
    languages: "English, Swahili, French",
    faith: "Spiritual",
    looking: "Creative chemistry",
    interests: ["Runways", "Thrift flips", "Dancehall", "Galleries"],
    bio: "Color theory and good boundaries.",
    personStars: 4.9,
    personVotes: 18,
    dateStars: 4.6,
    dateCount: 25,
    mallHint: "hub",
  },
  {
    id: "diana",
    name: "Diana Atieno",
    city: "Kitale",
    lat: 1.0157,
    lng: 35.0062,
    photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=640&q=80&auto=format&fit=crop",
    match: false,
    age: 28,
    birthdate: "11 Oct 1997",
    career: "Primary teacher",
    company: "County school",
    education: "BEd · Moi",
    height: "164 cm",
    languages: "Luhya, English, Swahili",
    faith: "Christian",
    looking: "Kindness first",
    interests: ["Kids’ books", "Gardening", "Choir", "Baking"],
    bio: "Patience is my superpower. Scones help.",
    personStars: 5.0,
    personVotes: 12,
    dateStars: 4.7,
    dateCount: 10,
    mallHint: "westgate",
  },
  {
    id: "mwangi",
    name: "James Mwangi",
    city: "Nanyuki",
    lat: 0.0144,
    lng: 37.0734,
    photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=640&q=80&auto=format&fit=crop",
    match: false,
    age: 33,
    birthdate: "22 Mar 1993",
    career: "Safari guide",
    company: "Conservancy partner",
    education: "KPSGA Silver",
    height: "179 cm",
    languages: "Kikuyu, English, Swahili",
    faith: "Christian",
    looking: "Outdoor soul",
    interests: ["Wildlife", "Stargazing", "Campfire stories", "Gin"],
    bio: "I can spot an elephant and still miss a text.",
    personStars: 4.5,
    personVotes: 14,
    dateStars: 4.4,
    dateCount: 19,
    mallHint: "rosslyn",
  },
  {
    id: "aisha",
    name: "Aisha Noor",
    city: "Mombasa",
    lat: -4.0500,
    lng: 39.6660,
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=640&q=80&auto=format&fit=crop",
    match: false,
    age: 29,
    birthdate: "30 Jan 1997",
    career: "Lawyer",
    company: "Coast chambers",
    education: "LLB · UoN · Dip. KSL",
    height: "167 cm",
    languages: "Swahili, English, Arabic",
    faith: "Muslim",
    looking: "Equal partnership",
    interests: ["Debate", "Swimming", "True crime pods", "Halwa"],
    bio: "I argue cases and share fries. Both seriously.",
    personStars: 4.7,
    personVotes: 9,
    dateStars: 4.3,
    dateCount: 15,
    mallHint: "galleria",
  },
  {
    id: "leo",
    name: "Leo Kim",
    city: "Nairobi",
    lat: -1.2833,
    lng: 36.8167,
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=640&q=80&auto=format&fit=crop",
    match: false,
    age: 30,
    birthdate: "16 Aug 1995",
    career: "Architect",
    company: "Studio · Upper Hill",
    education: "BArch · UoN",
    height: "176 cm",
    languages: "English, Korean, Swahili",
    faith: "Agnostic",
    looking: "Design-minded partner",
    interests: ["Brutalism", "Vinyl", "City walks", "Kimchi"],
    bio: "Kenya-raised, Seoul summers. Clean lines, open heart.",
    personStars: 4.4,
    personVotes: 6,
    dateStars: 4.2,
    dateCount: 13,
    mallHint: "yaya",
  },
  {
    id: "priya",
    name: "Priya Shah",
    city: "Nairobi",
    lat: -1.2700,
    lng: 36.8050,
    photo: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=640&q=80&auto=format&fit=crop",
    match: true,
    age: 27,
    birthdate: "4 Apr 1999",
    career: "Pharmacist",
    company: "Westlands pharmacy",
    education: "BPharm · KU",
    height: "160 cm",
    languages: "English, Gujarati, Swahili, Hindi",
    faith: "Hindu",
    looking: "Family-friendly dating",
    interests: ["Bollywood", "Hiking Ngong", "Cooking", "Festivals"],
    bio: "I dose medicine carefully and laughter generously.",
    personStars: 4.8,
    personVotes: 16,
    dateStars: 4.5,
    dateCount: 21,
    mallHint: "sarit",
  },
  {
    id: "sam",
    name: "Sam Omwenga",
    city: "Kisii",
    lat: -0.6817,
    lng: 34.7667,
    photo: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=640&q=80&auto=format&fit=crop",
    match: false,
    age: 28,
    birthdate: "25 Dec 1997",
    career: "Agribusiness founder",
    company: "Green Basket KE",
    education: "BCom · KU",
    height: "177 cm",
    languages: "Kisii, English, Swahili",
    faith: "Christian",
    looking: "Builder energy",
    interests: ["Startups", "Avocado farms", "Gym", "Gospel"],
    bio: "Supply chains by weekday. Salsa lessons on weekends.",
    personStars: 4.2,
    personVotes: 7,
    dateStars: 4.0,
    dateCount: 17,
    mallHint: "junction",
  },
  {
    id: "mercy",
    name: "Mercy Jepkorir",
    city: "Kericho",
    lat: -0.3689,
    lng: 35.2833,
    photo: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=640&q=80&auto=format&fit=crop",
    match: false,
    age: 25,
    birthdate: "7 Sep 2000",
    career: "Tea sommelier",
    company: "Estate hospitality",
    education: "Hospitality · Utalii",
    height: "169 cm",
    languages: "Kalenjin, English, Swahili",
    faith: "Christian",
    looking: "Gentle & ambitious",
    interests: ["Tea tasting", "Rain walks", "Sketching", "Choir"],
    bio: "Misty mornings, green hills, and soft hellos.",
    personStars: 4.9,
    personVotes: 5,
    dateStars: 4.8,
    dateCount: 7,
    mallHint: "hub",
  },
];

const YOU = {
  id: "you",
  name: "You",
  city: "Nairobi",
  lat: -1.286389,
  lng: 36.817223,
  photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=640&q=80&auto=format&fit=crop",
  match: false,
  age: 28,
  birthdate: "15 Feb 1998",
  career: "Creative strategist",
  company: "PENZI member",
  education: "BA Media · USIU",
  height: "174 cm",
  languages: "English, Swahili",
  faith: "Open",
  looking: "Intentional connection",
  interests: ["Poetry", "Maps", "Music", "Weekend markets"],
  bio: "Building bonds across Kenya — starting with honesty.",
  personStars: 4.7,
  personVotes: 8,
  dateStars: 4.4,
  dateCount: 12,
  mallHint: "westgate",
  isYou: true,
};

const PSYCH_TRAITS = [
  {
    id: "openness",
    name: "Openness",
    emoji: "🧠",
    icon: "✦",
    desc: "Curious minds that chase new art, ideas, and places.",
  },
  {
    id: "conscientious",
    name: "Conscientiousness",
    emoji: "📋",
    icon: "▣",
    desc: "Plans, follow-through, and respect for other people’s time.",
  },
  {
    id: "extraversion",
    name: "Extraversion",
    emoji: "🔊",
    icon: "◎",
    desc: "Energy from people — rooms light up when they walk in.",
  },
  {
    id: "agreeableness",
    name: "Agreeableness",
    emoji: "🤝",
    icon: "♡",
    desc: "Warmth, empathy, and low-drama conflict repair.",
  },
  {
    id: "stability",
    name: "Emotional Stability",
    emoji: "🌊",
    icon: "◯",
    desc: "Steady under pressure — safe harbor energy.",
  },
];

const ZODIAC = [
  {
    id: "aries",
    name: "Aries",
    emoji: "♈",
    symbol: "🐏",
    range: "Mar 21 – Apr 19",
    start: [3, 21],
    end: [4, 19],
    traits: ["extraversion", "openness"],
    blurb: "Bold starters. Direct, warm, and allergic to waiting.",
    cartoon: "aries-ram",
  },
  {
    id: "taurus",
    name: "Taurus",
    emoji: "♉",
    symbol: "🐂",
    range: "Apr 20 – May 20",
    start: [4, 20],
    end: [5, 20],
    traits: ["conscientious", "stability"],
    blurb: "Sensual steadiness. Loyalty with good taste.",
    cartoon: "taurus-earth",
  },
  {
    id: "gemini",
    name: "Gemini",
    emoji: "♊",
    symbol: "👯",
    range: "May 21 – Jun 20",
    start: [5, 21],
    end: [6, 20],
    traits: ["openness", "extraversion"],
    blurb: "Quick wit, dual moods, forever curious.",
    cartoon: "gemini-twins",
  },
  {
    id: "cancer",
    name: "Cancer",
    emoji: "♋",
    symbol: "🦀",
    range: "Jun 21 – Jul 22",
    start: [6, 21],
    end: [7, 22],
    traits: ["agreeableness", "stability"],
    blurb: "Home-builders. Soft shells, deep care.",
    cartoon: "cancer-shell",
  },
  {
    id: "leo",
    name: "Leo",
    emoji: "♌",
    symbol: "🦁",
    range: "Jul 23 – Aug 22",
    start: [7, 23],
    end: [8, 22],
    traits: ["extraversion", "agreeableness"],
    blurb: "Warm spotlight energy — generous and proud.",
    cartoon: "leo-sun",
  },
  {
    id: "virgo",
    name: "Virgo",
    emoji: "♍",
    symbol: "🌾",
    range: "Aug 23 – Sep 22",
    start: [8, 23],
    end: [9, 22],
    traits: ["conscientious", "openness"],
    blurb: "Detail lovers who show care through precision.",
    cartoon: "virgo-grain",
  },
  {
    id: "libra",
    name: "Libra",
    emoji: "♎",
    symbol: "⚖️",
    range: "Sep 23 – Oct 22",
    start: [9, 23],
    end: [10, 22],
    traits: ["agreeableness", "extraversion"],
    blurb: "Harmony seekers — beauty, balance, fair talk.",
    cartoon: "libra-scale",
  },
  {
    id: "scorpio",
    name: "Scorpio",
    emoji: "♏",
    symbol: "🦂",
    range: "Oct 23 – Nov 21",
    start: [10, 23],
    end: [11, 21],
    traits: ["stability", "openness"],
    blurb: "Intense loyalty. Depth over small talk.",
    cartoon: "scorpio-depth",
  },
  {
    id: "sagittarius",
    name: "Sagittarius",
    emoji: "♐",
    symbol: "🏹",
    range: "Nov 22 – Dec 21",
    start: [11, 22],
    end: [12, 21],
    traits: ["openness", "extraversion"],
    blurb: "Road-trip souls — honest, funny, unbound.",
    cartoon: "sagittarius-bow",
  },
  {
    id: "capricorn",
    name: "Capricorn",
    emoji: "♑",
    symbol: "🐐",
    range: "Dec 22 – Jan 19",
    start: [12, 22],
    end: [1, 19],
    traits: ["conscientious", "stability"],
    blurb: "Quiet ambition. Builds empires and trust.",
    cartoon: "capricorn-peak",
  },
  {
    id: "aquarius",
    name: "Aquarius",
    emoji: "♒",
    symbol: "💧",
    range: "Jan 20 – Feb 18",
    start: [1, 20],
    end: [2, 18],
    traits: ["openness", "agreeableness"],
    blurb: "Future-minded rebels with soft ideals.",
    cartoon: "aquarius-wave",
  },
  {
    id: "pisces",
    name: "Pisces",
    emoji: "♓",
    symbol: "🐟",
    range: "Feb 19 – Mar 20",
    start: [2, 19],
    end: [3, 20],
    traits: ["agreeableness", "openness"],
    blurb: "Dreamers who feel the room before speaking.",
    cartoon: "pisces-dream",
  },
];

/** Illustrated cartoon face for Personality zodiac cards (not real photos). */
function cartoonAvatar(seed) {
  const s = encodeURIComponent(String(seed || "penzi").toLowerCase());
  return `https://api.dicebear.com/9.x/lorelei/svg?seed=${s}&backgroundColor=f7f5f2&radius=50`;
}

const GENERATIONS = [
  {
    id: "genz",
    label: "GEN Z",
    blurb: "Memes, late-night voice notes, and honesty before polish — rooted in Kenya.",
  },
  {
    id: "millennial",
    label: "MILLENNIAL",
    blurb: "Career chapters, intentional dating, and playlists that still slap.",
  },
  {
    id: "traditional",
    label: "TRADITIONAL",
    blurb: "Respect, family circles, and clear intentions. Culture is how you love.",
  },
  {
    id: "creative",
    label: "CREATIVE",
    blurb: "Poetry drafts, gallery Sundays, studio nights. You match through what you make.",
  },
  {
    id: "adventurer",
    label: "ADVENTURER",
    blurb: "Road trips to Naivasha, sunrise hikes, new cities. Connection is a shared map.",
  },
  {
    id: "soft",
    label: "SOFT LIFE",
    blurb: "Low drama, high care. You curate peace and invite someone into it.",
  },
];

/** Generation activities with Nairobi GPS + real imagery */
const GEN_ACTIVITIES = {
  genz: [
    {
      emoji: "🎬",
      title: "Movies",
      place: "Westgate Cinema",
      blurb: "Late screening + post-credit snacks.",
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=640&q=80&auto=format&fit=crop",
      lat: -1.25695,
      lng: 36.80515,
      mallId: "westgate",
    },
    {
      emoji: "🪩",
      title: "Clubbing",
      place: "Westlands nightlife",
      blurb: "Afrobeats floor, soft launches, group energy.",
      image: "https://images.unsplash.com/photo-1571266028247-d9b850220196?w=640&q=80&auto=format&fit=crop",
      lat: -1.2670,
      lng: 36.8100,
      mallId: "sarit",
    },
    {
      emoji: "⚽",
      title: "Sports",
      place: "Nyayo Stadium belt",
      blurb: "Pick-up football or courtside vibes.",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=640&q=80&auto=format&fit=crop",
      lat: -1.3045,
      lng: 36.8245,
      mallId: null,
    },
    {
      emoji: "🎧",
      title: "Live sets",
      place: "The Alchemist · Westlands",
      blurb: "DJ nights and outdoor hangouts.",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=640&q=80&auto=format&fit=crop",
      lat: -1.2685,
      lng: 36.8065,
      mallId: "oasis",
    },
  ],
  millennial: [
    {
      emoji: "☕",
      title: "Brunch",
      place: "Karen / The Hub",
      blurb: "Slow plates, deep talk, no rush.",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=640&q=80&auto=format&fit=crop",
      lat: -1.31925,
      lng: 36.71515,
      mallId: "hub",
    },
    {
      emoji: "🖼️",
      title: "Gallery walk",
      place: "Nairobi Gallery circuit",
      blurb: "Contemporary Kenyan art + wine.",
      image: "https://images.unsplash.com/photo-1518998053901-5348d3961b3e?w=640&q=80&auto=format&fit=crop",
      lat: -1.2921,
      lng: 36.8219,
      mallId: "yaya",
    },
    {
      emoji: "🧘",
      title: "Yoga class",
      place: "Kilimani studios",
      blurb: "Breathwork then iced matcha.",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=640&q=80&auto=format&fit=crop",
      lat: -1.29185,
      lng: 36.78795,
      mallId: "yaya",
    },
    {
      emoji: "🍷",
      title: "Wine tasting",
      place: "Two Rivers",
      blurb: "Local pours and soft playlists.",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=640&q=80&auto=format&fit=crop",
      lat: -1.21085,
      lng: 36.79515,
      mallId: "tworivers",
    },
  ],
  traditional: [
    {
      emoji: "⛪",
      title: "Sunday service",
      place: "Community church",
      blurb: "Faith first, lunch with family after.",
      image: "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=640&q=80&auto=format&fit=crop",
      lat: -1.2833,
      lng: 36.8167,
      mallId: null,
    },
    {
      emoji: "🍲",
      title: "Family lunch",
      place: "Home / Garden City",
      blurb: "Nyama choma energy, introductions matter.",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=640&q=80&auto=format&fit=crop",
      lat: -1.23195,
      lng: 36.87825,
      mallId: "gardencity",
    },
    {
      emoji: "💍",
      title: "Introduction visit",
      place: "Family home",
      blurb: "Respect protocols, bring something thoughtful.",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=640&q=80&auto=format&fit=crop",
      lat: -1.2700,
      lng: 36.8050,
      mallId: "sarit",
    },
    {
      emoji: "🧺",
      title: "Market morning",
      place: "City Market",
      blurb: "Fresh produce and long walks home.",
      image: "https://images.unsplash.com/photo-1488459716781-31f4e259b147?w=640&q=80&auto=format&fit=crop",
      lat: -1.2841,
      lng: 36.8255,
      mallId: null,
    },
  ],
  creative: [
    {
      emoji: "🎨",
      title: "Studio night",
      place: "GoDown Arts Centre",
      blurb: "Paint, collab, leave with paint on your sleeve.",
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=640&q=80&auto=format&fit=crop",
      lat: -1.3120,
      lng: 36.7900,
      mallId: "junction",
    },
    {
      emoji: "📸",
      title: "Photo walk",
      place: "CBD textures",
      blurb: "Golden hour frames around town.",
      image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=640&q=80&auto=format&fit=crop",
      lat: -1.286389,
      lng: 36.817223,
      mallId: null,
    },
    {
      emoji: "✍️",
      title: "Poetry open mic",
      place: "Alliance Française",
      blurb: "Lines that land — and people who listen.",
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=640&q=80&auto=format&fit=crop",
      lat: -1.2980,
      lng: 36.7900,
      mallId: "yaya",
    },
    {
      emoji: "🎶",
      title: "Live band",
      place: "Nairobi live rooms",
      blurb: "Guitar, brass, and slow dancing in place.",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=640&q=80&auto=format&fit=crop",
      lat: -1.2680,
      lng: 36.8070,
      mallId: "westgate",
    },
  ],
  adventurer: [
    {
      emoji: "🥾",
      title: "Ngong Hills hike",
      place: "Ngong Hills",
      blurb: "Wind, ridge views, picnic at the top.",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=640&q=80&auto=format&fit=crop",
      lat: -1.4000,
      lng: 36.6400,
      mallId: null,
    },
    {
      emoji: "🦓",
      title: "Day safari",
      place: "Nairobi National Park",
      blurb: "City skyline behind wildlife.",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=640&q=80&auto=format&fit=crop",
      lat: -1.3733,
      lng: 36.8583,
      mallId: "galleria",
    },
    {
      emoji: "🚴",
      title: "Karura ride",
      place: "Karura Forest",
      blurb: "Trails, waterfall, coffee after.",
      image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=640&q=80&auto=format&fit=crop",
      lat: -1.2390,
      lng: 36.8300,
      mallId: "rosslyn",
    },
    {
      emoji: "🏕️",
      title: "Camping weekend",
      place: "Hell’s Gate / Naivasha",
      blurb: "Stars, bikes, and early mist.",
      image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=640&q=80&auto=format&fit=crop",
      lat: -0.8500,
      lng: 36.3500,
      mallId: null,
    },
  ],
  soft: [
    {
      emoji: "Spa",
      title: "Spa afternoon",
      place: "Waterfront Karen",
      blurb: "Massage, silence, slow tea.",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=640&q=80&auto=format&fit=crop",
      lat: -1.32955,
      lng: 36.71195,
      mallId: "waterfront",
    },
    {
      emoji: "📖",
      title: "Bookstore date",
      place: "Bookstop / Junction",
      blurb: "Paperbacks and quiet corners.",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=640&q=80&auto=format&fit=crop",
      lat: -1.29855,
      lng: 36.76205,
      mallId: "junction",
    },
    {
      emoji: "🌅",
      title: "Sunset picnic",
      place: "Uhuru Gardens",
      blurb: "Blankets, fruit, soft playlists.",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=640&q=80&auto=format&fit=crop",
      lat: -1.3200,
      lng: 36.7600,
      mallId: "galleria",
    },
    {
      emoji: "🪴",
      title: "Plant market",
      place: "City / roadside nurseries",
      blurb: "Pick a plant together — long-term energy.",
      image: "https://images.unsplash.com/photo-1466692476866-aef1dfb1e735?w=640&q=80&auto=format&fit=crop",
      lat: -1.2920,
      lng: 36.8000,
      mallId: "prestige",
    },
  ],
};

// Fix soft spa emoji
GEN_ACTIVITIES.soft[0].emoji = "💆";

const POEMS = [
  {
    id: "p1",
    text: "Nairobi dusk 🌆\nand your laugh finds me\nbetween matatu lights ✨",
    author: "Anon · Westlands",
  },
  {
    id: "p2",
    text: "Coast salt on skin 🌊\nI keep your name\nlike a tide returning 💫",
    author: "Anon · Nyali",
  },
  {
    id: "p3",
    text: "Two cups of chai ☕\none quiet table\nand all the words we don't need 🤍",
    author: "Anon · Karen",
  },
  {
    id: "p4",
    text: "If love is a road 🛤️\nlet ours be red earth\nand morning mist 🌿",
    author: "Anon · Limuru",
  },
];

const SONGS = [
  { title: "Suzanna", artist: "Sauti Sol" },
  { title: "Short N Sweet", artist: "Nyashinski" },
  { title: "Melanin", artist: "Sauti Sol · Patoranking" },
  { title: "Nerea", artist: "Sauti Sol" },
  { title: "Wabebe", artist: "Bien · Mega" },
  { title: "Kuna Kitu", artist: "Cizu" },
  { title: "Feeling", artist: "Bensoul" },
  { title: "Nakupenda", artist: "H_art the Band" },
];

const SCENES = [
  { id: "raw", label: "Raw" },
  { id: "soft", label: "Soft light" },
  { id: "high", label: "High contrast" },
  { id: "grain", label: "Grain" },
  { id: "warm", label: "Warm dusk" },
];

function starsLabel(n) {
  const full = Math.round(n);
  return "★".repeat(Math.max(0, Math.min(5, full))) + ` ${n.toFixed(1)}`;
}

function ratingHTML(p) {
  return `
    <div class="rating-chip">
      <span class="rating-chip__people" title="Average from people">${starsLabel(p.personStars)} · ${p.personVotes} people</span>
      <span class="rating-chip__dates" title="Average across dates">${p.dateStars.toFixed(1)}★ · ${p.dateCount} dates</span>
    </div>
  `;
}

/* ——— state ——— */
const state = {
  matches: 0,
  selectedPersonality: null,
  selectedCharacter: "genz",
  activeSong: null,
  artImage: null,
  scene: "raw",
  matchLocked: false,
  activeProfile: null,
  prefs: null,
  spinning: false,
};

/* ——— helpers ——— */
function $(sel, root = document) {
  return root.querySelector(sel);
}

function $all(sel, root = document) {
  return [...root.querySelectorAll(sel)];
}

function showToast(msg, kind = "") {
  const el = $("#toast");
  el.hidden = false;
  el.textContent = msg;
  el.className = "toast" + (kind ? ` is-${kind}` : "");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => {
    el.hidden = true;
  }, 2400);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function findProfile(idOrName) {
  if (idOrName === "you" || idOrName === YOU.id) return YOU;
  return PROFILES.find((p) => p.id === idOrName || p.name === idOrName) || null;
}

/* ——— profile overlay ——— */
function openProfile(profile) {
  if (!profile) return;
  state.activeProfile = profile;
  $("#profilePhoto").src = profile.photo;
  $("#profilePhoto").alt = profile.name;
  $("#profileMeta").textContent = profile.isYou ? "Your profile" : `${profile.city} · ${profile.age}`;
  $("#profileLove").textContent = profile.isYou ? "this is you" : "possible match";
  $("#profileName").textContent = profile.name;
  $("#profileRole").textContent = `${profile.career} · ${profile.company}`;
  $("#profileRatings").innerHTML = `
    <div class="rating-block geo-tile geo-tile--tl">
      <p class="meta-label">People</p>
      <p class="rating-big">${profile.personStars.toFixed(1)}★</p>
      <p class="rating-sub">from ${profile.personVotes} people</p>
    </div>
    <div class="rating-block geo-tile geo-tile--br">
      <p class="meta-label">Dates</p>
      <p class="rating-big">${profile.dateStars.toFixed(1)}★</p>
      <p class="rating-sub">across ${profile.dateCount} dates</p>
    </div>
  `;
  const rows = [
    ["Location", profile.city],
    ["Birthdate", profile.birthdate],
    ["Age", String(profile.age)],
    ["Career", profile.career],
    ["Workplace", profile.company],
    ["Education", profile.education],
    ["Height", profile.height],
    ["Languages", profile.languages],
    ["Faith", profile.faith],
    ["Looking for", profile.looking],
    ["About", profile.bio],
  ];
  $("#profileGrid").innerHTML = rows
    .map(
      ([k, v]) => `
      <div class="profile-row">
        <dt class="meta-label">${k}</dt>
        <dd>${k === "Location" ? `<button type="button" class="loc-link" data-lat="${profile.lat}" data-lng="${profile.lng}" data-label="${profile.name} · ${profile.city}" data-mall="${profile.mallHint || ""}">${v} → map</button>` : v}</dd>
      </div>`
    )
    .join("");
  $("#profileTags").innerHTML = profile.interests
    .map((t) => `<span class="interest-tag">${t}</span>`)
    .join("");
  $("#profileConnect").hidden = !!profile.isYou;
  $("#profileOverlay").hidden = false;
}

function closeProfile() {
  $("#profileOverlay").hidden = true;
}

function focusProfileOnMap(profile) {
  closeProfile();
  const places = document.getElementById("places");
  if (places) places.scrollIntoView({ behavior: "smooth", block: "start" });
  const go = () => {
    if (window.PenziPlaces?.focusLocation) {
      window.PenziPlaces.focusLocation({
        lat: profile.lat,
        lng: profile.lng,
        label: `${profile.name} · ${profile.city}`,
        mallId: profile.mallHint || null,
      });
      showToast(`Map · ${profile.city}`, "ok");
    } else {
      showToast("Map loading…", "err");
    }
  };
  setTimeout(go, 450);
}

/* ——— matchmaking ——— */
function renderConstant() {
  $("#constantImg").src = YOU.photo;
  $("#constantName").textContent = YOU.name;
  $("#constantTag").textContent = YOU.city;
  $("#constantRating").innerHTML = ratingHTML(YOU);
}

function renderOrbit(list = PROFILES) {
  const track = $("#orbitTrack");
  track.innerHTML = "";
  list.forEach((p, i) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "orbit-card";
    card.dataset.match = p.match ? "1" : "0";
    card.dataset.id = p.id;
    card.dataset.name = p.name;
    card.style.animationDelay = `${i * 40}ms`;
    card.innerHTML = `
      <img class="avatar" src="${p.photo}" alt="${p.name}" width="96" height="96" loading="lazy">
      <p class="avatar-name">${p.name.split(" ")[0]}</p>
      <p class="avatar-tag">${p.city}</p>
      ${ratingHTML(p)}
    `;
    card.addEventListener("click", () => openProfile(p));
    track.appendChild(card);
  });
}

function clearMatchVisuals() {
  const ring = $("#constantRing");
  ring.className = "ring ring--idle";
  $("#matchConnector").classList.remove("is-on");
  $all(".orbit-card.is-matched").forEach((c) => c.classList.remove("is-matched"));
  const seat = $("#matchSeat");
  if (seat) {
    seat.hidden = true;
    seat.classList.remove("is-win");
    $("#matchSeatFrame").innerHTML = "";
  }
  state.matchLocked = false;
  state.spinning = false;
}

function showMatchSeat(profile) {
  const seat = $("#matchSeat");
  const frame = $("#matchSeatFrame");
  seat.hidden = false;
  seat.classList.add("is-win");
  frame.innerHTML = `
    <img src="${profile.photo}" alt="${profile.name}">
    <p class="avatar-name">${profile.name.split(" ")[0]}</p>
  `;
  $("#matchSeatLabel").textContent = "match found";
}

function celebrateMatch(profile) {
  const ring = $("#constantRing");
  const connector = $("#matchConnector");
  const status = $("#matchStatus");
  const card = $(`.orbit-card[data-id="${profile.id}"]`);

  ring.className = "ring ring--success";
  if (card) {
    card.classList.add("is-matched", "is-focus");
    card.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }
  connector.classList.add("is-on");
  showMatchSeat(profile);
  status.innerHTML = `<p class="ok">Match found · ${profile.name}</p>`;
  state.matches += 1;
  $("#matchBadge").textContent = String(state.matches);
  setTimeout(() => {
    $("#successSub").textContent = `${YOU.name} ↔ ${profile.name} · ${profile.personStars.toFixed(1)}★ people · ${profile.dateStars.toFixed(1)}★ dates`;
    $("#successOverlay").hidden = false;
  }, 650);
  showToast("Match found", "ok");
}

function attemptMatchById(id) {
  if (state.matchLocked || state.spinning) return;
  const profile = findProfile(id);
  if (!profile || profile.isYou) return;
  state.matchLocked = true;
  if (profile.match) {
    celebrateMatch(profile);
  } else {
    const ring = $("#constantRing");
    ring.className = "ring ring--error";
    $("#matchStatus").innerHTML = `<p class="bad">No bond with ${profile.name}</p>`;
    setTimeout(() => {
      $("#errorOverlay").hidden = false;
    }, 350);
    showToast("No match", "err");
    setTimeout(() => {
      ring.className = "ring ring--idle";
      state.matchLocked = false;
    }, 900);
  }
}

/** Fast horizontal spin then land on a matchable profile in the seat. */
function spinConnect() {
  if (state.spinning || state.matchLocked) return;
  const rail = $("#orbitRail");
  const track = $("#orbitTrack");
  const cards = $all(".orbit-card");
  if (!cards.length) return;

  const preferred = state.prefs?.area
    ? PROFILES.filter((p) => p.match && p.city === state.prefs.area)
    : [];
  const matchPool = preferred.length
    ? preferred
    : PROFILES.filter((p) => p.match);
  const winner =
    matchPool[Math.floor(Math.random() * matchPool.length)] ||
    PROFILES.find((p) => p.match) ||
    PROFILES[0];

  state.spinning = true;
  state.matchLocked = true;
  clearMatchVisuals();
  state.matchLocked = true;
  state.spinning = true;
  $("#matchSeat").hidden = true;
  $("#tryMatchBtn").disabled = true;
  $("#matchStatus").innerHTML = `<p class="status-idle">Spinning constellation…</p>`;
  rail.classList.add("is-spinning");

  const winnerCard = $(`.orbit-card[data-id="${winner.id}"]`);
  const maxScroll = Math.max(0, track.scrollWidth - rail.clientWidth);
  let t = 0;
  const duration = 2200;
  const start = performance.now();

  function frame(now) {
    t = Math.min(1, (now - start) / duration);
    // Ease out cubic after frantic middle
    const frenzy = Math.sin(t * Math.PI * 10) * (1 - t) * 0.35;
    const base = t * t * (3 - 2 * t); // smoothstep
    const target =
      winnerCard && winnerCard.offsetLeft
        ? Math.min(maxScroll, Math.max(0, winnerCard.offsetLeft - rail.clientWidth * 0.35))
        : maxScroll * base;
    const wander = (Math.sin(now / 40) * 0.5 + 0.5) * maxScroll * (1 - t);
    rail.scrollLeft = t < 0.75 ? wander + frenzy * maxScroll : target;
    if (t < 1) {
      requestAnimationFrame(frame);
    } else {
      rail.classList.remove("is-spinning");
      if (winnerCard) {
        winnerCard.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
      $("#tryMatchBtn").disabled = false;
      state.spinning = false;
      celebrateMatch(winner);
    }
  }
  requestAnimationFrame(frame);
}

/* ——— preference prompt ——— */
function showPrefPrompt() {
  const card = $("#prefCard");
  if (!card) return;
  if (state.prefs || sessionStorage.getItem("penzi-prefs-skip") === "1") {
    card.hidden = true;
    return;
  }
  card.hidden = false;
}

function wirePrefs() {
  const section = $("#match");
  if (!section) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) showPrefPrompt();
      });
    },
    { threshold: 0.35 }
  );
  io.observe(section);

  $("#prefForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    state.prefs = {
      vibe: $("#prefVibe").value.trim(),
      must: $("#prefMust").value.trim(),
      deal: $("#prefDeal").value.trim(),
      area: $("#prefArea").value,
    };
    sessionStorage.setItem("penzi-prefs", JSON.stringify(state.prefs));
    $("#prefSaved").hidden = false;
    $("#prefSaved").textContent = `Saved · ${state.prefs.vibe}`;
    showToast("Preferences saved", "ok");
    setTimeout(() => {
      $("#prefCard").hidden = true;
    }, 900);
  });

  $("#prefSkip")?.addEventListener("click", () => {
    sessionStorage.setItem("penzi-prefs-skip", "1");
    $("#prefCard").hidden = true;
  });

  try {
    const saved = sessionStorage.getItem("penzi-prefs");
    if (saved) state.prefs = JSON.parse(saved);
  } catch {
    /* ignore */
  }
}

/* ——— personality / zodiac / character calendar ——— */
function parseBirthdate(str) {
  // e.g. "12 Mar 1999"
  const m = String(str || "").trim().match(/^(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})$/);
  if (!m) return null;
  const months = {
    Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
    Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12,
  };
  const month = months[m[2]];
  if (!month) return null;
  return { day: Number(m[1]), month, year: Number(m[3]) };
}

function zodiacForDate(month, day) {
  for (const z of ZODIAC) {
    const [sm, sd] = z.start;
    const [em, ed] = z.end;
    if (sm <= em) {
      if ((month === sm && day >= sd) || (month === em && day <= ed) || (month > sm && month < em)) {
        return z;
      }
    } else {
      // Capricorn wraps year
      if ((month === sm && day >= sd) || (month === em && day <= ed) || month > sm || month < em) {
        return z;
      }
    }
  }
  return ZODIAC[0];
}

function peopleForZodiac(z) {
  return [YOU, ...PROFILES].filter((p) => {
    const bd = parseBirthdate(p.birthdate);
    if (!bd) return false;
    return zodiacForDate(bd.month, bd.day).id === z.id;
  });
}

function renderPersonalities() {
  const traitWrap = $("#psychTraits");
  const grid = $("#zodiacGrid");
  if (!traitWrap || !grid) return;

  traitWrap.innerHTML = "";
  PSYCH_TRAITS.forEach((t) => {
    const el = document.createElement("button");
    el.type = "button";
    el.className = "psych-chip geo-tile geo-tile--br mx-card";
    el.innerHTML = `
      <span class="psych-emoji">${t.emoji}</span>
      <span class="psych-name">${t.icon} ${t.name}</span>
      <span class="psych-desc">${t.desc}</span>
    `;
    el.addEventListener("click", () => {
      $all(".psych-chip").forEach((c) => c.classList.remove("is-active"));
      el.classList.add("is-active");
      $all(".zodiac-card").forEach((card) => {
        const ids = (card.dataset.traits || "").split(",");
        card.classList.toggle("is-dim", !ids.includes(t.id));
        card.classList.toggle("is-hot", ids.includes(t.id));
      });
      showToast(`Trait · ${t.name}`, "ok");
    });
    traitWrap.appendChild(el);
  });

  grid.innerHTML = "";
  ZODIAC.forEach((z) => {
    const matches = peopleForZodiac(z);
    // Personality avatars are cartoons — never real profile photos
    const photo = cartoonAvatar(matches[0]?.name || z.cartoon || z.id);
    const names = matches.map((p) => p.name.split(" ")[0]).slice(0, 3).join(", ");
    const traitNames = z.traits
      .map((id) => PSYCH_TRAITS.find((t) => t.id === id)?.name)
      .filter(Boolean)
      .join(" · ");

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "zodiac-card geo-tile geo-tile--tl mx-card";
    btn.setAttribute("role", "option");
    btn.dataset.traits = z.traits.join(",");
    btn.innerHTML = `
      <div class="zodiac-top">
        <img class="zodiac-photo zodiac-photo--cartoon" src="${photo}" alt="${z.name} cartoon avatar" width="72" height="72" loading="lazy">
        <span class="zodiac-emoji" aria-hidden="true">${z.emoji}</span>
      </div>
      <p class="zodiac-symbol">${z.symbol} ${z.name}</p>
      <p class="meta-label">${z.range}</p>
      <p class="zodiac-blurb">${z.blurb}</p>
      <p class="zodiac-traits">${traitNames}</p>
      <p class="zodiac-matches meta-label">${matches.length ? `In PENZI · ${names}` : "No birthdays yet"}</p>
    `;
    btn.addEventListener("click", () => {
      $all(".zodiac-card").forEach((c) => c.classList.remove("is-active"));
      btn.classList.add("is-active");
      state.selectedPersonality = z.name;
      showToast(`${z.emoji} ${z.name}`, "ok");
      if (matches[0] && !matches[0].isYou) openProfile(matches[0]);
    });
    grid.appendChild(btn);
  });
}

function renderCharacters() {
  const rail = $("#characterRail");
  if (!rail) return;
  rail.innerHTML = "";
  GENERATIONS.forEach((c) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "char-chip";
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", c.id === state.selectedCharacter ? "true" : "false");
    btn.textContent = c.label;
    btn.addEventListener("click", () => selectCharacter(c.id));
    rail.appendChild(btn);
  });
  selectCharacter(state.selectedCharacter, false);
  renderCalendar();
  wireCalendar();
}

function selectCharacter(id, toastOn = true) {
  const c = GENERATIONS.find((x) => x.id === id) || GENERATIONS[0];
  state.selectedCharacter = c.id;
  $("#characterDisplay").textContent = c.label;
  $("#characterBlurb").textContent = c.blurb;
  $all(".char-chip").forEach((el) => {
    el.setAttribute("aria-selected", el.textContent === c.label ? "true" : "false");
  });
  if (toastOn) showToast(`Generation · ${c.label}`);
}

const calState = {
  year: 2026,
  month: 6, // July (0-index)
  wired: false,
};

function renderCalendar() {
  const grid = $("#calGrid");
  const title = $("#calTitle");
  if (!grid || !title) return;

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  title.textContent = `${monthNames[calState.month]} ${calState.year}`;

  const first = new Date(calState.year, calState.month, 1);
  const startPad = first.getDay();
  const daysInMonth = new Date(calState.year, calState.month + 1, 0).getDate();
  const today = new Date();

  grid.innerHTML = "";
  for (let i = 0; i < startPad; i++) {
    const pad = document.createElement("span");
    pad.className = "cal-day is-pad";
    grid.appendChild(pad);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "cal-day";
    btn.textContent = String(d);
    btn.setAttribute("aria-label", `${monthNames[calState.month]} ${d}`);
    if (
      today.getFullYear() === calState.year &&
      today.getMonth() === calState.month &&
      today.getDate() === d
    ) {
      btn.classList.add("is-today");
    }
    // Weekend accent
    const dow = new Date(calState.year, calState.month, d).getDay();
    if (dow === 0 || dow === 6) btn.classList.add("is-weekend");
    btn.addEventListener("click", () => openActivitiesForDay(d));
    grid.appendChild(btn);
  }
}

function wireCalendar() {
  if (calState.wired) return;
  calState.wired = true;
  $("#calPrev")?.addEventListener("click", () => {
    calState.month -= 1;
    if (calState.month < 0) {
      calState.month = 11;
      calState.year -= 1;
    }
    renderCalendar();
  });
  $("#calNext")?.addEventListener("click", () => {
    calState.month += 1;
    if (calState.month > 11) {
      calState.month = 0;
      calState.year += 1;
    }
    renderCalendar();
  });
  $("#activityClose")?.addEventListener("click", () => {
    $("#activityOverlay").hidden = true;
  });
  $("#activityOverlay")?.addEventListener("click", (e) => {
    if (e.target.id === "activityOverlay") $("#activityOverlay").hidden = true;
  });
}

function openActivitiesForDay(day) {
  const gen = GENERATIONS.find((g) => g.id === state.selectedCharacter) || GENERATIONS[0];
  const list = GEN_ACTIVITIES[gen.id] || GEN_ACTIVITIES.genz;
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  $("#activityMeta").textContent = `${gen.label} · ${monthNames[calState.month]} ${day}`;
  $("#activityLove").textContent = "make plans";
  $("#activityTitle").textContent = `${gen.label} activities`;
  $("#activitySub").textContent = "Emoji-tagged plans with real Nairobi places — open any on the map.";

  const wrap = $("#activityList");
  wrap.innerHTML = "";
  list.forEach((a) => {
    const card = document.createElement("article");
    card.className = "activity-card geo-tile geo-tile--br mx-card";
    card.innerHTML = `
      <img class="activity-img" src="${a.image}" alt="${a.title}" loading="lazy">
      <div class="activity-copy">
        <p class="activity-emoji">${a.emoji} ${a.title}</p>
        <p class="meta-label">${a.place}</p>
        <p class="activity-blurb">${a.blurb}</p>
        <button type="button" class="btn-block btn-block--blue activity-map-btn">Show on map</button>
      </div>
    `;
    card.querySelector(".activity-map-btn").addEventListener("click", () => {
      $("#activityOverlay").hidden = true;
      const places = document.getElementById("places");
      places?.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        if (window.PenziPlaces?.focusLocation) {
          window.PenziPlaces.focusLocation({
            lat: a.lat,
            lng: a.lng,
            label: `${a.emoji} ${a.title} · ${a.place}`,
            mallId: a.mallId,
          });
          // Prefer live GPS when available
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                window.PenziPlaces.focusLocation({
                  lat: a.lat,
                  lng: a.lng,
                  label: `${a.emoji} ${a.title} · near you`,
                  mallId: a.mallId,
                });
                // Still mark user GPS with blue radial via places API if exposed
                showToast(`Map · ${a.title}`, "ok");
              },
              () => showToast(`Map · ${a.title}`, "ok"),
              { enableHighAccuracy: true, timeout: 8000 }
            );
          } else {
            showToast(`Map · ${a.title}`, "ok");
          }
        }
      }, 450);
    });
    wrap.appendChild(card);
  });
  $("#activityOverlay").hidden = false;
}

/* ——— poetry ——— */
function renderPoetry() {
  const list = $("#poetryList");
  if (!list) return;
  list.innerHTML = "";
  POEMS.forEach((poem, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "song-item poetry-song";
    btn.innerHTML = `
      <span class="song-num">${String(i + 1).padStart(2, "0")}</span>
      <div>
        <p class="song-title poetry-line">${poem.text}</p>
        <p class="song-artist">${poem.author}</p>
      </div>
      <span class="poetry-send meta-label">Send →</span>
    `;
    btn.addEventListener("click", () => {
      btn.classList.add("is-playing", "is-sent");
      const send = btn.querySelector(".poetry-send");
      if (send) send.textContent = "Sent ✓";
      showToast("Poem sent", "ok");
    });
    list.appendChild(btn);
  });
}

function wireExpressTabs() {
  const tabs = $all(".express-tab");
  if (!tabs.length) return;
  const panels = {
    poetry: $("#panelPoetry"),
    art: $("#panelArt"),
    songs: $("#panelSongs"),
  };
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const id = tab.dataset.panel;
      tabs.forEach((t) => {
        const on = t === tab;
        t.classList.toggle("is-on", on);
        t.setAttribute("aria-selected", on ? "true" : "false");
      });
      Object.entries(panels).forEach(([key, el]) => {
        if (!el) return;
        el.hidden = key !== id;
      });
    });
  });
}

/* ——— art / pencil ——— */
function renderScenes() {
  const wrap = $("#sceneBtns");
  if (!wrap) return;
  wrap.innerHTML = "";
  SCENES.forEach((s) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "scene-btn";
    btn.textContent = s.label;
    btn.setAttribute("aria-pressed", s.id === state.scene ? "true" : "false");
    btn.addEventListener("click", () => {
      if (!state.artImage) {
        showToast("Upload an image first", "err");
        return;
      }
      state.scene = s.id;
      $all(".scene-btn").forEach((b) => b.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");
      drawArt();
    });
    wrap.appendChild(btn);
  });
}

function loadArtFile(file) {
  if (!file || !file.type.startsWith("image/")) {
    showToast("Use an image file", "err");
    $("#errorOverlay").hidden = false;
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      state.artImage = img;
      $("#artCanvases").hidden = false;
      $("#sceneRail").hidden = false;
      drawArt();
      showToast("Pencil scene ready", "ok");
    };
    img.onerror = () => {
      showToast("Could not read image", "err");
      $("#errorOverlay").hidden = false;
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
}

function drawArt() {
  const img = state.artImage;
  if (!img) return;

  const maxW = 720;
  const scale = Math.min(1, maxW / img.width);
  const w = Math.round(img.width * scale);
  const h = Math.round(img.height * scale);

  const orig = $("#canvasOriginal");
  const pencil = $("#canvasPencil");
  orig.width = pencil.width = w;
  orig.height = pencil.height = h;

  const octx = orig.getContext("2d");
  const pctx = pencil.getContext("2d");
  octx.clearRect(0, 0, w, h);
  octx.drawImage(img, 0, 0, w, h);

  const buf = document.createElement("canvas");
  buf.width = w;
  buf.height = h;
  const bctx = buf.getContext("2d");
  bctx.drawImage(img, 0, 0, w, h);

  applyScene(bctx, w, h, state.scene);
  const sketch = toPencil(bctx, w, h);
  pctx.putImageData(sketch, 0, 0);
}

function applyScene(ctx, w, h, scene) {
  const data = ctx.getImageData(0, 0, w, h);
  const d = data.data;
  for (let i = 0; i < d.length; i += 4) {
    let r = d[i];
    let g = d[i + 1];
    let b = d[i + 2];

    if (scene === "soft") {
      r = r * 0.92 + 18;
      g = g * 0.94 + 14;
      b = b * 0.9 + 10;
    } else if (scene === "high") {
      const contrast = 1.35;
      r = (r - 128) * contrast + 128;
      g = (g - 128) * contrast + 128;
      b = (b - 128) * contrast + 128;
    } else if (scene === "warm") {
      r = Math.min(255, r * 1.12 + 8);
      g = g * 0.98;
      b = b * 0.82;
    } else if (scene === "grain") {
      const n = (Math.random() - 0.5) * 28;
      r += n;
      g += n;
      b += n;
    }

    d[i] = clamp(r);
    d[i + 1] = clamp(g);
    d[i + 2] = clamp(b);
  }
  ctx.putImageData(data, 0, 0);
}

function toPencil(ctx, w, h) {
  const src = ctx.getImageData(0, 0, w, h);
  const gray = new Uint8ClampedArray(w * h);

  for (let i = 0, p = 0; i < src.data.length; i += 4, p++) {
    gray[p] = 0.299 * src.data[i] + 0.587 * src.data[i + 1] + 0.114 * src.data[i + 2];
  }

  const inverted = new Float32Array(w * h);
  for (let i = 0; i < gray.length; i++) inverted[i] = 255 - gray[i];

  const blurred = boxBlur(inverted, w, h, 3);
  const out = ctx.createImageData(w, h);

  for (let i = 0, p = 0; i < out.data.length; i += 4, p++) {
    const g = gray[p];
    const bl = blurred[p] || 1;
    let v = (g * 255) / (255 - bl + 1);
    v = Math.min(255, v);
    out.data[i] = v;
    out.data[i + 1] = v;
    out.data[i + 2] = Math.min(255, v * 0.98);
    out.data[i + 3] = 255;
  }
  return out;
}

function boxBlur(src, w, h, radius) {
  const out = new Float32Array(src.length);
  const tmp = new Float32Array(src.length);
  const r = radius;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let sum = 0;
      let count = 0;
      for (let k = -r; k <= r; k++) {
        const xx = Math.min(w - 1, Math.max(0, x + k));
        sum += src[y * w + xx];
        count++;
      }
      tmp[y * w + x] = sum / count;
    }
  }
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let sum = 0;
      let count = 0;
      for (let k = -r; k <= r; k++) {
        const yy = Math.min(h - 1, Math.max(0, y + k));
        sum += tmp[yy * w + x];
        count++;
      }
      out[y * w + x] = sum / count;
    }
  }
  return out;
}

function clamp(n) {
  return Math.max(0, Math.min(255, n));
}

/* ——— music ——— */
function renderSongs() {
  const list = $("#songList");
  if (!list) return;
  list.innerHTML = "";
  SONGS.forEach((s, i) => {
    const li = document.createElement("li");
    li.className = "song-item";
    li.innerHTML = `
      <span class="song-num">${String(i + 1).padStart(2, "0")}</span>
      <div>
        <p class="song-title">${s.title}</p>
        <p class="song-artist">${s.artist}</p>
      </div>
      <div class="song-bars" aria-hidden="true"><span></span><span></span><span></span></div>
    `;
    li.addEventListener("click", () => {
      $all(".song-item").forEach((el) => el.classList.remove("is-playing"));
      if (state.activeSong === i) {
        state.activeSong = null;
        showToast("Paused");
        return;
      }
      li.classList.add("is-playing");
      state.activeSong = i;
      showToast(`Playing · ${s.title}`, "ok");
    });
    list.appendChild(li);
  });
}

/* ——— overlays / nav ——— */
function wireUI() {
  $("#menuBtn").addEventListener("click", () => {
    const nav = $("#sideNav");
    const open = nav.hasAttribute("hidden");
    if (open) nav.removeAttribute("hidden");
    else nav.setAttribute("hidden", "");
    $("#menuBtn").setAttribute("aria-expanded", open ? "true" : "false");
  });

  $("#shareBtn").addEventListener("click", async () => {
    const data = {
      title: "PENZI",
      text: "Matchmaking for the Kenyan ecosystem",
      url: location.href,
    };
    try {
      if (navigator.share) await navigator.share(data);
      else {
        await navigator.clipboard.writeText(location.href);
        showToast("Link copied", "ok");
      }
    } catch {
      showToast("Share cancelled");
    }
  });

  $("#reshuffleBtn").addEventListener("click", () => {
    clearMatchVisuals();
    renderOrbit(shuffle(PROFILES));
    $("#matchStatus").innerHTML = `<p class="status-idle">Constellation reshuffled</p>`;
    showToast("Profiles reshuffled");
  });

  $("#tryMatchBtn").addEventListener("click", () => {
    spinConnect();
  });

  $("#constantProfile").addEventListener("click", () => openProfile(YOU));
  $("#constantProfile").addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openProfile(YOU);
    }
  });

  $("#profileClose").addEventListener("click", closeProfile);
  $("#profileOverlay").addEventListener("click", (e) => {
    if (e.target.id === "profileOverlay") closeProfile();
  });
  $("#profileLocate").addEventListener("click", () => {
    if (state.activeProfile) focusProfileOnMap(state.activeProfile);
  });
  $("#profileConnect").addEventListener("click", () => {
    const p = state.activeProfile;
    closeProfile();
    if (p && !p.isYou) {
      // Spin toward this person if matchable, else attempt
      if (p.match) {
        // Ensure they are in view then celebrate after short spin
        spinConnect();
      } else {
        attemptMatchById(p.id);
      }
    }
  });
  $("#profileGrid").addEventListener("click", (e) => {
    const btn = e.target.closest(".loc-link");
    if (!btn || !state.activeProfile) return;
    focusProfileOnMap(state.activeProfile);
  });

  $("#successClose").addEventListener("click", () => {
    $("#successOverlay").hidden = true;
    state.matchLocked = false;
  });

  $("#errorClose").addEventListener("click", () => {
    $("#errorOverlay").hidden = true;
    state.matchLocked = false;
    clearMatchVisuals();
  });

  const drop = $("#artDrop");
  const input = $("#artInput");
  $("#artPickBtn").addEventListener("click", () => input.click());
  drop.addEventListener("click", (e) => {
    if (e.target.id === "artPickBtn") return;
    input.click();
  });
  input.addEventListener("change", () => {
    if (input.files?.[0]) loadArtFile(input.files[0]);
  });
  ["dragenter", "dragover"].forEach((ev) => {
    drop.addEventListener(ev, (e) => {
      e.preventDefault();
      drop.classList.add("is-drag");
    });
  });
  ["dragleave", "drop"].forEach((ev) => {
    drop.addEventListener(ev, (e) => {
      e.preventDefault();
      drop.classList.remove("is-drag");
    });
  });
  drop.addEventListener("drop", (e) => {
    const file = e.dataTransfer?.files?.[0];
    if (file) loadArtFile(file);
  });

  const rail = $("#orbitRail");
  let ticking = false;
  rail.addEventListener("scroll", () => {
    if (ticking || state.spinning) return;
    ticking = true;
    requestAnimationFrame(() => {
      const mid = rail.getBoundingClientRect().left + rail.clientWidth / 2;
      let best = null;
      let bestDist = Infinity;
      $all(".orbit-card").forEach((c) => {
        const r = c.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - mid);
        if (d < bestDist) {
          bestDist = d;
          best = c;
        }
      });
      $all(".orbit-card.is-focus").forEach((c) => {
        if (c !== best) c.classList.remove("is-focus");
      });
      if (best) best.classList.add("is-focus");
      ticking = false;
    });
  });

  wirePrefs();
}

function init() {
  renderConstant();
  renderOrbit(PROFILES);
  renderPersonalities();
  renderCharacters();
  renderPoetry();
  renderScenes();
  renderSongs();
  wireExpressTabs();
  wireUI();
}

document.addEventListener("DOMContentLoaded", init);
