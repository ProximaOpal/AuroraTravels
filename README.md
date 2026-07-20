# Aurora Travels — Kenya

Interactive travel + craft marketplace experience for Kenya.

## Pages

1. **Landing** — animated Aurora intro. Press **Space**, **Enter**, or **scroll** to continue (auto-advances if idle).
2. **Artifacts marketplace** — cinematic shop of Kenyan crafts with real shop locations, Google Maps links, KES prices, and M-Pesa STK push checkout.
3. **Explore Kenya** — destination map experience (from marketplace → “Explore Kenya map”).

## Project structure

```
auroratravels/
├── index.html
├── css/
│   ├── styles.css          # Landing + destinations app
│   └── marketplace.css     # Page 2 marketplace UI
├── js/
│   ├── destinations.js
│   ├── artifacts.js        # Craft catalogue + shops
│   ├── payment.js          # M-Pesa STK push + polling
│   ├── marketplace.js
│   ├── map.js
│   ├── utils.js
│   └── app.js
└── README.md
```

## Run locally

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Payments

STK push uses `https://marvel-network-3e75.onrender.com` (`/api/stk-push`, `/api/query-payment`). Enter a valid Kenyan M-Pesa number (`07…` / `254…`) on Buy.
