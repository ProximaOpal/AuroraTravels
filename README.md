# PENZI

Kenyan dating matchmaker — cinematic landing, Match, Personality, Character, Music, Places + M-Pesa.

## Run locally

```bash
npm start
```

- App: `http://localhost:8080/`
- Health: `http://localhost:8080/healthz`

## Deploy on Render

**Use a Web Service** (not Static Site — there is no Publish Directory).

### Option A — Blueprint

1. Connect this repo in Render → **New → Blueprint**
2. Uses `render.yaml` (`penzi` web service)
3. Optional env: `STK_API_BASE_URL`

### Option B — Manual

| Setting | Value |
|---------|--------|
| Runtime | Node |
| Build command | `npm install` |
| Start command | `npm start` |
| Health check path | `/healthz` |

Render sets `PORT` automatically.

### After deploy

| Path | What |
|------|------|
| `/` | PENZI (landing → **Enter PENZI** → Match) |
| `/healthz` | Health JSON |

Legacy `/dating/` URLs redirect to `/`.

## Payments

STK proxies via this server. If upstream is down, demo checkout still confirms for Places demos.
