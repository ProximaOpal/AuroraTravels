/**
 * Static file server for Aurora Travels (Railway / Node hosts).
 * Serves the SPA from the repo root on process.env.PORT.
 * Also hosts a tiny presentation remote API for phone → stage control.
 */
const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const PORT = Number(process.env.PORT) || 8080;
const ROOT = __dirname;
const STK_UPSTREAM =
  process.env.STK_API_BASE_URL || "https://marvel-network-3e75.onrender.com";

/** In-memory demo checkouts when upstream M-Pesa gateway is unavailable. */
const demoPayments = new Map();

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".map": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".pptx":
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
};

/** Shared presentation remote state (phone → projector). */
let remoteState = {
  seq: 0,
  page: null,
  action: null,
  ts: 0,
};

const ALLOWED_PAGES = new Set([
  "home",
  "page1",
  "page2",
  "page3",
  "page4",
  "page5",
]);

const ALLOWED_ACTIONS = new Set([
  "park-next",
  "park-prev",
  "guide-next",
  "guide-prev",
  "craft-next",
  "craft-prev",
  "travel-next",
  "travel-prev",
  "travel-mode",
  "stay-mode",
  "inc-up",
  "inc-down",
  "map-expand",
  "map-collapse",
  "map-fullscreen",
  "map-zoom-in",
  "map-zoom-out",
  "map-pan-up",
  "map-pan-down",
  "map-pan-left",
  "map-pan-right",
  "map-recenter",
  "map-search",
  "map-stop-next",
  "map-stop-prev",
  "map-overview",
  "map-overview-close",
  "park-search",
  "voice-start",
  "voice-end",
  "voice-expand",
]);

function safeJoin(root, requestPath) {
  const decoded = decodeURIComponent((requestPath || "/").split("?")[0]);
  const cleaned = path.normalize(decoded).replace(/^(\.\.[/\\])+/, "");
  const resolved = path.join(root, cleaned);
  if (!resolved.startsWith(root)) return null;
  return resolved;
}

function send(res, status, body, headers = {}) {
  res.writeHead(status, headers);
  res.end(body);
}

function sendJson(res, status, obj) {
  send(res, status, JSON.stringify(obj), {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > 8192) {
        reject(new Error("body too large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

async function handleControlApi(req, res, pathname) {
  if (pathname !== "/api/control") return false;

  if (req.method === "OPTIONS") {
    send(res, 204, "", {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    return true;
  }

  if (req.method === "GET") {
    sendJson(res, 200, remoteState);
    return true;
  }

  if (req.method === "POST") {
    try {
      const raw = await readBody(req);
      const data = raw ? JSON.parse(raw) : {};
      const page =
        typeof data.page === "string" && ALLOWED_PAGES.has(data.page)
          ? data.page
          : null;
      const action =
        typeof data.action === "string" && ALLOWED_ACTIONS.has(data.action)
          ? data.action
          : null;

      if (!page && !action) {
        sendJson(res, 400, { error: "Need page or action" });
        return true;
      }

      remoteState = {
        seq: remoteState.seq + 1,
        page,
        action,
        ts: Date.now(),
      };
      sendJson(res, 200, remoteState);
      return true;
    } catch (err) {
      sendJson(res, 400, { error: "Invalid JSON" });
      return true;
    }
  }

  sendJson(res, 405, { error: "Method not allowed" });
  return true;
}

function createDemoCheckout({ phone, amount }) {
  const id = `DEMO-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  demoPayments.set(id, {
    status: "pending",
    phone,
    amount,
    createdAt: Date.now(),
  });
  // Auto-confirm after a short delay so the UI can poll successfully
  setTimeout(() => {
    const row = demoPayments.get(id);
    if (row && row.status === "pending") {
      row.status = "paid";
      demoPayments.set(id, row);
    }
  }, 3500);
  return id;
}

async function upstreamJson(url, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    const text = await response.text();
    let data = {};
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { message: text.slice(0, 160) };
    }
    return { ok: response.ok, status: response.status, data, text };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      data: { message: err.message || "Upstream unreachable" },
      text: "",
    };
  } finally {
    clearTimeout(timer);
  }
}

async function handleStkApi(req, res, pathname) {
  if (pathname !== "/api/stk-push" && pathname !== "/api/query-payment") {
    return false;
  }

  if (req.method === "OPTIONS") {
    send(res, 204, "", {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    return true;
  }

  if (pathname === "/api/stk-push" && req.method === "POST") {
    try {
      const raw = await readBody(req);
      const body = raw ? JSON.parse(raw) : {};
      const phone = String(body.phone || "").trim();
      const amount = Math.floor(Number(body.amount));
      if (!phone || !amount || amount < 1) {
        sendJson(res, 400, { error: "phone and amount required" });
        return true;
      }

      const upstream = await upstreamJson(`${STK_UPSTREAM}/api/stk-push`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, amount, hours: body.hours || 1 }),
      });

      if (
        upstream.ok &&
        (upstream.data.CheckoutRequestID || upstream.data.checkoutRequestID)
      ) {
        sendJson(res, 200, {
          ...upstream.data,
          CheckoutRequestID:
            upstream.data.CheckoutRequestID || upstream.data.checkoutRequestID,
          demo: false,
        });
        return true;
      }

      // Gateway suspended / down → keep PENZI payment UX working in demo mode
      const suspended =
        upstream.status === 503 ||
        /suspended|unavailable|unreachable|abort/i.test(
          String(upstream.data.message || upstream.text || "")
        );
      if (suspended || !upstream.ok) {
        const checkoutId = createDemoCheckout({ phone, amount });
        sendJson(res, 200, {
          CheckoutRequestID: checkoutId,
          MerchantRequestID: checkoutId,
          demo: true,
          message:
            "Live M-Pesa gateway unavailable — running demo confirmation.",
        });
        return true;
      }

      sendJson(res, upstream.status || 502, {
        error: "gateway_rejection",
        message: upstream.data.message || upstream.data.error || "STK failed",
        ...upstream.data,
      });
      return true;
    } catch (err) {
      sendJson(res, 400, { error: "Invalid JSON" });
      return true;
    }
  }

  if (pathname === "/api/query-payment" && req.method === "GET") {
    let id = "";
    try {
      id = new URL(req.url || "/", `http://${req.headers.host}`).searchParams.get(
        "id"
      );
    } catch {
      id = "";
    }
    if (!id) {
      sendJson(res, 400, { error: "id required" });
      return true;
    }

    if (demoPayments.has(id)) {
      const row = demoPayments.get(id);
      sendJson(res, 200, {
        id,
        status: row.status,
        demo: true,
        phone: row.phone,
        amount: row.amount,
      });
      return true;
    }

    const upstream = await upstreamJson(
      `${STK_UPSTREAM}/api/query-payment?id=${encodeURIComponent(id)}`
    );
    if (upstream.ok) {
      sendJson(res, 200, upstream.data);
      return true;
    }

    sendJson(res, upstream.status || 502, {
      error: "query_failed",
      message: upstream.data.message || "Could not query payment",
      status: "pending",
    });
    return true;
  }

  sendJson(res, 405, { error: "Method not allowed" });
  return true;
}

const server = http.createServer(async (req, res) => {
  let pathname = "/";
  try {
    pathname = new URL(req.url || "/", `http://${req.headers.host}`).pathname;
  } catch {
    pathname = (req.url || "/").split("?")[0] || "/";
  }

  if (await handleControlApi(req, res, pathname)) return;
  if (await handleStkApi(req, res, pathname)) return;

  // Render / uptime health check
  if (pathname === "/healthz" || pathname === "/health") {
    res.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    });
    res.end(
      JSON.stringify({
        ok: true,
        service: "auroratravels",
        penzi: "/dating/",
        ts: Date.now(),
      })
    );
    return;
  }

  let filePath = safeJoin(ROOT, pathname === "/" ? "/index.html" : pathname);
  if (!filePath) {
    return send(res, 403, "Forbidden");
  }

  fs.stat(filePath, (err, stat) => {
    // Serve directory index (e.g. /dating → /dating/index.html)
    if (!err && stat.isDirectory()) {
      const indexPath = path.join(filePath, "index.html");
      return fs.stat(indexPath, (indexErr, indexStat) => {
        if (indexErr || !indexStat.isFile()) {
          return send(res, 404, "Not found");
        }
        return fs.createReadStream(indexPath)
          .on("open", () => {
            res.writeHead(200, {
              "Content-Type": MIME[".html"],
              "Cache-Control": "no-cache",
            });
          })
          .on("error", () => send(res, 500, "Server error"))
          .pipe(res);
      });
    }

    if (err || !stat.isFile()) {
      const fallback = path.join(ROOT, "index.html");
      return fs.readFile(fallback, (readErr, data) => {
        if (readErr) return send(res, 404, "Not found");
        send(res, 200, data, {
          "Content-Type": MIME[".html"],
          "Cache-Control": "no-cache",
        });
      });
    }

    const ext = path.extname(filePath).toLowerCase();
    const type = MIME[ext] || "application/octet-stream";
    const immutable =
      ext === ".png" ||
      ext === ".jpg" ||
      ext === ".jpeg" ||
      ext === ".gif" ||
      ext === ".webp" ||
      ext === ".svg" ||
      ext === ".ico" ||
      ext === ".woff" ||
      ext === ".woff2";
    const cacheControl = immutable
      ? "public, max-age=604800, immutable"
      : "no-cache";
    fs.createReadStream(filePath)
      .on("open", () => {
        res.writeHead(200, {
          "Content-Type": type,
          "Cache-Control": cacheControl,
        });
      })
      .on("error", () => send(res, 500, "Server error"))
      .pipe(res);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Aurora Travels listening on http://0.0.0.0:${PORT}`);
});
