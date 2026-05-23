import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist");
const PORT = 4173;
const BASE = `http://localhost:${PORT}`;

const ROUTES = ["/", "/signup"];

function mime(path) {
  if (path.endsWith(".js")) return "application/javascript";
  if (path.endsWith(".css")) return "text/css";
  if (path.endsWith(".svg")) return "image/svg+xml";
  if (path.endsWith(".html")) return "text/html";
  return "application/octet-stream";
}

function startStaticServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let path = req.url?.split("?")[0] ?? "/";
      if (path === "/") path = "/index.html";
      else if (!path.includes(".")) path = "/index.html";

      const file = join(distDir, path === "/index.html" ? "index.html" : path.slice(1));
      if (!existsSync(file)) {
        const fallback = join(distDir, "index.html");
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(readFileSync(fallback));
        return;
      }
      res.writeHead(200, { "Content-Type": mime(file) });
      res.end(readFileSync(file));
    });
    server.listen(PORT, () => resolve(server));
  });
}

async function runAudit(url) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless", "--no-sandbox"] });
  const result = await lighthouse(url, {
    logLevel: "error",
    output: "json",
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    port: chrome.port,
  });
  await chrome.kill();
  return result?.lhr;
}

async function main() {
  if (!existsSync(join(distDir, "index.html"))) {
    console.error("Run npm run build first.");
    process.exit(1);
  }

  const server = await startStaticServer();
  const summary = {};

  try {
    for (const route of ROUTES) {
      const url = `${BASE}${route}`;
      console.log(`\nAuditing ${url}…`);
      const lhr = await runAudit(url);
      if (!lhr) continue;
      summary[route] = {};
      for (const [cat, data] of Object.entries(lhr.categories)) {
        summary[route][cat] = Math.round(data.score * 100);
        console.log(`  ${cat}: ${summary[route][cat]}`);
      }
    }

    const outPath = join(__dirname, "..", "lighthouse-summary.json");
    writeFileSync(outPath, JSON.stringify(summary, null, 2));
    console.log(`\nWrote ${outPath}`);
  } finally {
    server.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
