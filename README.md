# Aurora Travels — Kenya

Interactive travel + craft marketplace experience for Kenya, plus **PENZI** at `/dating/`.

## Run locally

```bash
npm start
```

- App: `http://localhost:8080`
- PENZI: `http://localhost:8080/dating/`
- Health: `http://localhost:8080/healthz`

## Deploy on Render

The repo is ready for a **Render Web Service** (Node).

### Option A — Blueprint (recommended)

1. Push this branch / merge to `main`.
2. In Render: **New → Blueprint** → connect `ProximaOpal/AuroraTravels`.
3. Render reads `render.yaml` and creates `auroratravels-penzi`.
4. Optional: set `STK_API_BASE_URL` if you have a live M-Pesa gateway (otherwise demo STK fallback stays on).

### Option B — Manual Web Service

1. **New → Web Service** → connect this GitHub repo.
2. Settings:
   - **Runtime:** Node
   - **Build command:** `npm install`
   - **Start command:** `npm start`
   - **Health check path:** `/healthz`
3. Deploy. Render sets `PORT` automatically (`server.js` already uses `process.env.PORT` and binds `0.0.0.0`).

### After deploy

| Path | What |
|------|------|
| `/` | Aurora Travels |
| `/dating/` | PENZI matchmaker (landing → Enter PENZI → Match) |
| `/healthz` | JSON health check for Render |

No build step / static export needed — `server.js` serves the site and proxies STK.

## Stage remote (phone → projector)

1. On the projector / laptop, open the live app and leave that tab visible.
2. On your phone, open the control page (scan the QR or tap the URL):
   - **Control:** `/control.html` on your deployed host
   - **QR poster:** `/remote.html` on your deployed host
3. Tap **Home / Parks / Travel & Stay / Artifacts / Guides / Inclusivity** — the live app switches pages.

Optional: open the projector with `/?present=1` to skip the home auto-advance.

## Pages

1. **Home** — animated Aurora intro.
2. **Parks** — destination map experience.
3. **Travel & Stay** — transport + lodges + M-Pesa.
4. **Artifacts** — Kenyan crafts marketplace.
5. **Guides** — student guide pairing.
6. **Inclusivity** — languages + access pillars.
7. **PENZI** (`/dating/`) — Kenyan matchmaker.

## Payments

STK push proxies through this server to `STK_API_BASE_URL` (default `https://marvel-network-3e75.onrender.com`). If upstream is down, demo checkout still confirms so Places flows can be demoed. Enter a valid Kenyan M-Pesa number (`07…` / `254…`) on Buy / Places pay.
