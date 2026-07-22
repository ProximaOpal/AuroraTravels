/**
 * Static file server for Aurora Travels (Railway / Node hosts).
 * Serves the SPA from the repo root on process.env.PORT.
 */
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT) || 8080;
const ROOT = __dirname;

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
  ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
};

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

const server = http.createServer((req, res) => {
  let filePath = safeJoin(ROOT, req.url === "/" ? "/index.html" : req.url);
  if (!filePath) {
    return send(res, 403, "Forbidden");
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      // SPA-style fallback for clean URLs
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
    fs.createReadStream(filePath)
      .on("open", () => {
        res.writeHead(200, {
          "Content-Type": type,
          "Cache-Control":
            ext === ".html" ? "no-cache" : "public, max-age=86400",
        });
      })
      .on("error", () => send(res, 500, "Server error"))
      .pipe(res);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Aurora Travels listening on http://0.0.0.0:${PORT}`);
});
