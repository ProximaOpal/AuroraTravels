/**
 * PENZI — static file server + M-Pesa STK proxy (Render / Node hosts).
 * Serves the matchmaker from the repo root on process.env.PORT.
 */
const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const PORT = Number(process.env.PORT) || 8080;
const ROOT = __dirname;
const STK_UPSTREAM =
  process.env.STK_API_BASE_URL || "https://marvel-network-dx6q.onrender.com";
/** Demo STK only when explicitly enabled (STK_ALLOW_DEMO=1). Real push is default. */
const STK_ALLOW_DEMO = process.env.STK_ALLOW_DEMO === "1";

/** In-memory demo checkouts when STK_ALLOW_DEMO=1 and upstream is unavailable. */
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
};

function send(res, status, body, type = "text/plain; charset=utf-8") {
  res.writeHead(status, { "Content-Type": type, "Cache-Control": "no-store" });
  res.end(body);
}

function sendJson(res, status, data) {
  send(res, status, JSON.stringify(data), "application/json; charset=utf-8");
}

function safeJoin(root, reqPath) {
  const decoded = decodeURIComponent(reqPath.split("?")[0] || "/");
  const cleaned = path.normalize(decoded).replace(/^(\.\.[/\\])+/, "");
  const full = path.join(root, cleaned);
  if (!full.startsWith(root)) return null;
  return full;
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

/** Marvel gateway expects 2547XXXXXXXX / 2541XXXXXXXX. */
function normalisePhone(raw) {
  let p = String(raw || "").trim().replace(/\s+/g, "");
  if (p.startsWith("+")) p = p.slice(1);
  if (p.startsWith("0")) p = `254${p.slice(1)}`;
  return p;
}

function upstreamMessage(data) {
  if (!data || typeof data !== "object") return "Upstream error";
  const detail = data.detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    return detail
      .map((d) => (typeof d === "string" ? d : d.msg || JSON.stringify(d)))
      .join("; ");
  }
  return data.message || data.error || data.ResponseDescription || "Upstream error";
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
      data = { message: text.slice(0, 160) || "Invalid upstream response" };
    }
    return { ok: response.ok, status: response.status, data };
  } catch (err) {
    return {
      ok: false,
      status: 503,
      data: { message: err.name === "AbortError" ? "Upstream timeout" : err.message },
    };
  } finally {
    clearTimeout(timer);
  }
}

function demoStk(res, payload, reason) {
  const id = `DEMO-${Date.now()}`;
  const amount = Math.floor(Number(payload.amount) || 1);
  demoPayments.set(id, {
    status: "pending",
    amount,
    phone: payload.phone || "",
    created: Date.now(),
  });
  setTimeout(() => {
    const row = demoPayments.get(id);
    if (row && row.status === "pending") row.status = "paid";
  }, 2500);

  sendJson(res, 200, {
    CheckoutRequestID: id,
    checkoutRequestID: id,
    demo: true,
    message: reason || "Demo STK (upstream unavailable)",
  });
}

async function handleStkApi(req, res, pathname) {
  if (pathname !== "/api/stk-push" && pathname !== "/api/query-payment") {
    return false;
  }

  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.end();
    return true;
  }

  if (pathname === "/api/stk-push" && req.method === "POST") {
    let payload = {};
    try {
      payload = JSON.parse((await readBody(req)) || "{}");
    } catch {
      sendJson(res, 400, { message: "Invalid JSON body" });
      return true;
    }

    const phone = normalisePhone(payload.phone || payload.phoneNumber || "");
    if (!/^254[17]\d{8}$/.test(phone)) {
      sendJson(res, 400, {
        message: "Invalid Phone: Use 07… / 01… / 2547… / 2541…",
        detail: "Invalid Phone: Use 2547XXXXXXXX",
      });
      return true;
    }

    const amount = Math.floor(Number(payload.amount) || 0);
    if (!amount || amount < 1) {
      sendJson(res, 400, { message: "Amount must be at least 1" });
      return true;
    }

    const forward = {
      phone,
      amount,
      hours: Number(payload.hours) || 1,
      accountReference: payload.accountReference || "PENZI",
      transactionDesc: payload.transactionDesc || "PENZI Places",
    };

    const upstream = await upstreamJson(`${STK_UPSTREAM}/api/stk-push`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(forward),
    });

    if (upstream.ok && (upstream.data.CheckoutRequestID || upstream.data.checkoutRequestID)) {
      sendJson(res, 200, { ...upstream.data, demo: false });
      return true;
    }

    if (STK_ALLOW_DEMO && (upstream.status >= 500 || upstream.status === 0)) {
      demoStk(res, forward, upstreamMessage(upstream.data));
      return true;
    }

    sendJson(res, upstream.status || 502, {
      message: upstreamMessage(upstream.data),
      detail: upstream.data?.detail,
      upstream: upstream.data,
    });
    return true;
  }

  if (pathname === "/api/query-payment" && req.method === "GET") {
    const id = new URL(req.url || "/", `http://${req.headers.host}`).searchParams.get("id") || "";
    if (!id) {
      sendJson(res, 400, { message: "Missing id" });
      return true;
    }

    if (id.startsWith("DEMO-")) {
      if (!STK_ALLOW_DEMO) {
        sendJson(res, 404, { message: "Demo payments disabled" });
        return true;
      }
      const row = demoPayments.get(id) || { status: "paid" };
      sendJson(res, 200, { status: row.status || "paid", demo: true });
      return true;
    }

    const upstream = await upstreamJson(
      `${STK_UPSTREAM}/api/query-payment?id=${encodeURIComponent(id)}`
    );
    sendJson(res, upstream.ok ? 200 : upstream.status || 502, upstream.data);
    return true;
  }

  sendJson(res, 405, { message: "Method not allowed" });
  return true;
}

const server = http.createServer(async (req, res) => {
  let pathname = "/";
  try {
    pathname = new URL(req.url || "/", `http://${req.headers.host}`).pathname;
  } catch {
    pathname = (req.url || "/").split("?")[0] || "/";
  }

  // Legacy /dating URLs → site root
  if (pathname === "/dating" || pathname === "/dating/") {
    res.writeHead(301, { Location: "/" });
    res.end();
    return;
  }
  if (pathname.startsWith("/dating/")) {
    res.writeHead(301, { Location: pathname.slice("/dating".length) || "/" });
    res.end();
    return;
  }

  if (await handleStkApi(req, res, pathname)) return;

  if (pathname === "/healthz" || pathname === "/health") {
    sendJson(res, 200, {
      ok: true,
      service: "penzi",
      stkUpstream: STK_UPSTREAM,
      stkAllowDemo: STK_ALLOW_DEMO,
      ts: Date.now(),
    });
    return;
  }

  let filePath = safeJoin(ROOT, pathname === "/" ? "/index.html" : pathname);
  if (!filePath) return send(res, 403, "Forbidden");

  fs.stat(filePath, (err, stat) => {
    if (!err && stat.isDirectory()) {
      const indexPath = path.join(filePath, "index.html");
      return fs.stat(indexPath, (indexErr, indexStat) => {
        if (indexErr || !indexStat.isFile()) return send(res, 404, "Not found");
        return fs
          .createReadStream(indexPath)
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

    if (err || !stat.isFile()) return send(res, 404, "Not found");

    const ext = path.extname(filePath).toLowerCase();
    const type = MIME[ext] || "application/octet-stream";
    fs.createReadStream(filePath)
      .on("open", () => {
        res.writeHead(200, {
          "Content-Type": type,
          "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=3600",
        });
      })
      .on("error", () => send(res, 500, "Server error"))
      .pipe(res);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`PENZI listening on http://0.0.0.0:${PORT}`);
  console.log(`STK upstream: ${STK_UPSTREAM} (demo=${STK_ALLOW_DEMO ? "on" : "off"})`);
});
