// Derived asset (public/assets/** is never modified): cuts the stamp body out of the designer's public/assets/stamp/S-01.svg
// (the file has an opaque #F6F2E9 background rect and a soft ground-shadow circle) and writes public/images/stamp-body.png,
// trimmed, transparent, used as the camera-facing stamp sprite in legacy/2601.cjs (class Stamp).
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const sharp = createRequire(join(root, "tools-candidates", "package.json"))("sharp");
let svg = readFileSync(join(root, "public", "assets", "stamp", "S-01.svg"), "utf8");
const before = svg.length;
svg = svg.replace(/<rect x="0" y="0" width="1400" height="1400"[^>]*\/>/, ""); // opaque background
svg = svg.replace(/<circle cx="708" cy="841" r="260"[^>]*\/>/, ""); // ground shadow
if (svg.length === before) throw new Error("S-01.svg layout changed: background/shadow elements not found");
await sharp(Buffer.from(svg), { density: 192 })
  .trim()
  .png({ compressionLevel: 9 })
  .toFile(join(root, "public", "images", "stamp-body.png"));
const meta = await sharp(join(root, "public", "images", "stamp-body.png")).metadata();
console.log(`wrote public/images/stamp-body.png (${meta.width}x${meta.height}, aspect h/w = ${(meta.height / meta.width).toFixed(3)})`);
