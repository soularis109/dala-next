import { spawnSync } from "node:child_process";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const basePath = (process.env.PAGES_BASE_PATH || "/dala-next").replace(/\/$/, "");
const build = spawnSync(process.execPath, ["node_modules/next/dist/bin/next", "build", "--webpack"], {
  cwd: root,
  stdio: "inherit",
  env: { ...process.env, GITHUB_PAGES: "true", PAGES_BASE_PATH: basePath },
});
if (build.error) throw build.error;
if (build.status !== 0) process.exit(build.status ?? 1);

// Next prefixes its own bundles. Legacy WebGL assets, CSS URLs and plain HTML
// still use public-root paths, so prefix those in the exported files only.
const publicEntries = await readdir(join(root, "public"));
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const publicPath = new RegExp(`(?<![\\w./-])/(${publicEntries.map(escapeRegex).join("|")})(?=[/?#\\s\"'\\\\)]|$)`, "g");
const textExtensions = new Set([".html", ".css", ".js", ".json", ".txt", ".svg", ".xml", ".webmanifest"]);
let updated = 0;
async function prefixAssets(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) {
      await prefixAssets(file);
    } else if (textExtensions.has(extname(file))) {
      const original = await readFile(file, "utf8");
      const prefixed = original.replace(publicPath, `${basePath}/$1`)
        .replaceAll('href="/#', `href="${basePath}/#`)
        .replaceAll('href="/"', `href="${basePath}/"`);
      if (prefixed !== original) {
        await writeFile(file, prefixed);
        updated++;
      }
    }
  }
}
await prefixAssets(join(root, "out"));
await writeFile(join(root, "out", ".nojekyll"), "");
console.log(`GitHub Pages export ready at ${basePath}/ (${updated} files updated).`);
