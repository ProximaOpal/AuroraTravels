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
3. Optional env: `STK_API_BASE_URL` (default `https://marvel-network-dx6q.onrender.com`), `STK_ALLOW_DEMO=1` for offline demos only

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

STK proxies via this server to **Marvel Network** (`STK_API_BASE_URL`, default `https://marvel-network-dx6q.onrender.com`).

- Real M-Pesa STK push is the default (`POST /api/stk-push` → upstream).
- Demo checkout only when `STK_ALLOW_DEMO=1` and upstream is unreachable.

## Docker / Africa's Talking registry

Image: `registry.africastalking.dev/4jd9r/penzi:latest`

Pushes on every commit to `main` via `.github/workflows/docker-build-push.yml`.

Repo secrets required:

| Secret | Example |
|--------|---------|
| `REGISTRY_HOST` | `registry.africastalking.dev` |
| `REGISTRY_USERNAME` | your registry user |
| `REGISTRY_PASSWORD` | your registry token/password |

```bash
docker build -t registry.africastalking.dev/4jd9r/penzi:latest .
docker run --rm -p 8080:8080 registry.africastalking.dev/4jd9r/penzi:latest
```
