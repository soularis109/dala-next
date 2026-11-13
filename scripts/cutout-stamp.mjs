// Derived assets only: retain the original S-01 side-view cutout and generate
// a top-down body whose canvas/footprint matches the existing ink impression.
// public/assets/** is read-only; the runtime uses stamp-body-top.png.
import { createRequire } from "node:module";
import { readFileSync, writeFileSync } from "node:fs";
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

// Keep the impression's transparent margins. Trimming the new artwork would
// make equally sized body/ink meshes have different circular contact sizes.
const { data, info } = await sharp(join(root, "public", "assets", "stamp", "stamp-impression-alpha.png"))
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const cx = info.width / 2;
const cy = info.height / 2;
let inkRadius = 0;
for (let y = 0; y < info.height; y++) {
  for (let x = 0; x < info.width; x++) {
    if (data[(y * info.width + x) * info.channels + info.channels - 1] === 0) continue;
    inkRadius = Math.max(inkRadius, Math.hypot(x + 0.5 - cx, y + 0.5 - cy));
  }
}
if (inkRadius === 0) throw new Error("The stamp impression has no visible ink");
const radius = Math.ceil(inkRadius) + 2;
const n = value => Number(value.toFixed(3));
const topSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${info.width}" height="${info.height}" viewBox="0 0 ${info.width} ${info.height}">
  <title>Stamp viewed from above</title>
  <defs>
    <linearGradient id="navy" x2=".75" y2="1"><stop stop-color="#0D2A4C"/><stop offset="1" stop-color="#041E42"/></linearGradient>
    <linearGradient id="brass" x2="1" y2=".15"><stop stop-color="#B59A70"/><stop offset=".5" stop-color="#D6BE93"/><stop offset="1" stop-color="#F0E0BC"/></linearGradient>
  </defs>
  <circle cx="${cx}" cy="${cy}" r="${radius}" fill="url(#navy)" stroke="url(#brass)" stroke-width="10"/>
  <circle cx="${cx}" cy="${cy}" r="${radius - 22}" fill="none" stroke="#D6BE93" stroke-width="2" opacity=".55"/>
  <rect x="${n(cx - radius * 0.72)}" y="${n(cy - radius * 0.16)}" width="${n(radius * 1.44)}" height="${n(radius * 0.32)}" rx="${n(radius * 0.14)}" fill="url(#brass)"/>
  <circle cx="${cx}" cy="${cy}" r="${n(radius * 0.4)}" fill="url(#navy)" stroke="url(#brass)" stroke-width="7"/>
  <circle cx="${cx}" cy="${cy}" r="${n(radius * 0.3)}" fill="none" stroke="#D6BE93" stroke-width="2" opacity=".6"/>
</svg>\n`;
writeFileSync(join(root, "public", "images", "stamp-body-top.svg"), topSvg);
await sharp(Buffer.from(topSvg))
  .resize(info.width, info.height)
  .png({ compressionLevel: 9 })
  .toFile(join(root, "public", "images", "stamp-body-top.png"));
console.log(`wrote public/images/stamp-body-top.svg and .png (${info.width}x${info.height}, ink radius ${n(inkRadius)}, body radius ${radius})`);
