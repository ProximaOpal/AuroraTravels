# Aurora Travels — Kenya

Interactive travel + craft marketplace experience for Kenya.

## Stage remote (phone → projector)

1. On the projector / laptop, open the live app and leave that tab visible.
2. On your phone, open the control page (scan the QR or tap the URL):
   - **Control:** https://web-production-7e14a.up.railway.app/control.html
   - **QR poster:** https://web-production-7e14a.up.railway.app/remote.html
3. Tap **Home / Parks / Travel & Stay / Artifacts / Guides / Inclusivity** — the live app switches pages.
4. Under each page: sub-buttons (e.g. Artifacts **Photo ← / Photo →**, Parks **Park ← / →**, Guides, Travel/Stay, Inclusivity scroll).

Optional: open the projector with `/?present=1` to skip the home auto-advance.

## Pages

1. **Home** — animated Aurora intro.
2. **Parks** — destination map experience.
3. **Travel & Stay** — transport + lodges + M-Pesa.
4. **Artifacts** — Kenyan crafts marketplace.
5. **Guides** — student guide pairing.
6. **Inclusivity** — languages + access pillars.

## Run locally

```bash
npm start
```

Open `http://localhost:8080` (or the Railway URL in production).

## Payments

STK push uses `https://marvel-network-3e75.onrender.com` (`/api/stk-push`, `/api/query-payment`). Enter a valid Kenyan M-Pesa number (`07…` / `254…`) on Buy.
