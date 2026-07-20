# Aurora Travels — Kenya

Interactive travel experience exploring destinations across Kenya: Maasai Mara, Mount Kenya, and Lamu Old Town.

## Project structure

```
auroratravels/
├── index.html          # Page markup
├── css/
│   └── styles.css      # Layout, landing, map, panels
├── js/
│   ├── destinations.js # Destination catalogue
│   ├── utils.js        # Shared helpers (HTML escape, motion prefs)
│   ├── map.js          # Leaflet map, search, expand, fullscreen
│   └── app.js          # UI wiring: nav, drawer, overview, landing
└── README.md
```

## Run locally

Serve the folder over HTTP (required for some browser APIs and CDN assets):

```bash
# Python
python3 -m http.server 8080

# Node
npx serve .
```

Then open `http://localhost:8080`.

## Features

- Landing intro with wipe transition into the app
- Destination carousel (prev / next) with hero imagery
- Leaflet map: pins, expand, fullscreen, Nominatim search (Kenya)
- Destination / landmark search in the detail panel
- Destinations drawer and overview grid
- Heritage video lightbox
- ElevenLabs conversational AI widget

## Notes

- Map geocoding uses [Nominatim](https://nominatim.org/) and is limited to Kenya (`countrycodes=ke`). Respect their [usage policy](https://operations.osmfoundation.org/policies/nominatim/) for production traffic.
- Images are loaded from Unsplash; map tiles from OpenStreetMap.
