// Generates the designer brief assets in designer-brief/:
//  01-master-document-EXAMPLE.png  (an example of the master document the designer should produce)
//  02-master-document-GUIDE.png    (the same page with the 40x40 mosaic grid, cut corner and safe zones overlaid)
//  03-master-document-TEMPLATE.png (transparent overlay only: grid + cut corner, to place on top of the design)
// Geometry comes from scripts/generate-document-particles.mjs (page 4.25 x 5.75, fold 1.05) scaled to 2048 px wide.
import { createRequire } from "node:module";
import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const sharp = createRequire(join(root, "tools-candidates", "package.json"))("sharp");
const out = join(root, "designer-brief");
mkdirSync(out, { recursive: true });

const W = 2048;
const H = 2770; // 4.25 : 5.75
const PX = W / 4.25; // px per world unit
const FOLD = Math.round(1.05 * PX); // 506 px
const GRID = 40;
const CW = W / GRID; // 51.2
const CH = H / GRID; // 69.25
const M = 150;
const INK = "#041E42";
const GOLD = "#D6BE93";
const GOLD_DEEP = "#B9975B";
const PAPER = "#FCFAF5";

const rect = (x, y, w, h, fill, o = 1, rx = 0) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" fill-opacity="${o}"/>`;
const stroke = (x, y, w, h, c, sw, o = 1, rx = 0) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="none" stroke="${c}" stroke-width="${sw}" stroke-opacity="${o}"/>`;
const line = (x1, y1, x2, y2, c, sw, o = 1) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${sw}" stroke-opacity="${o}"/>`;
const circle = (cx, cy, r, fill, o = 1) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" fill-opacity="${o}"/>`;
const ring = (cx, cy, r, c, sw, o = 1) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${c}" stroke-width="${sw}" stroke-opacity="${o}"/>`;
const bar = (x, y, w, h = 30, o = 0.6) => rect(x, y, w, h, INK, o, h / 2);

// Page silhouette: top-right corner is cut off (transparent) along the diagonal.
const pagePath = `M0 0 H${W - FOLD} L${W} ${FOLD} V${H} H0 Z`;

function design() {
  let s = "";
  // header band
  s += rect(0, 0, W, FOLD, INK);
  s += rect(M, 150, 330, 34, GOLD, 1, 17);
  s += rect(M, 250, 1050, 110, PAPER, 1, 10);
  s += rect(M, 390, 700, 40, PAPER, 0.55, 20);
  // intro paragraph
  [1, 0.96, 0.99, 0.62].forEach((k, i) => (s += bar(M, 640 + i * 78, (W - 2 * M) * k, 30, 0.62)));
  // three info cards
  const cw = (W - 2 * M - 2 * 60) / 3;
  for (let i = 0; i < 3; i++) {
    const x = M + i * (cw + 60);
    s += rect(x, 1030, cw, 400, i === 1 ? GOLD : INK, i === 1 ? 0.35 : 0.06, 24);
    s += rect(x + 40, 1075, 150, 150, i === 1 ? GOLD_DEEP : INK, i === 1 ? 1 : 0.9, 24);
    s += bar(x + 40, 1275, cw - 140, 34, 0.85) + bar(x + 40, 1340, cw - 80, 26, 0.5);
  }
  // chart block
  s += stroke(M, 1520, W - 2 * M, 640, INK, 4, 0.18, 24);
  const hs = [150, 260, 210, 360, 470, 400, 520];
  hs.forEach((h, i) => (s += rect(M + 90 + i * 245, 2090 - h, 150, h, i === 4 ? GOLD : INK, i === 4 ? 1 : 0.85, 10)));
  s += line(M + 60, 2090, W - M - 60, 2090, INK, 5, 0.35);
  s += `<polyline points="${hs.map((h, i) => `${M + 165 + i * 245},${2040 - h}`).join(" ")}" fill="none" stroke="${GOLD_DEEP}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>`;
  // second paragraph + seal + signature
  [1, 0.94, 0.55].forEach((k, i) => (s += bar(M, 2290 + i * 78, (W - 2 * M - 420) * k, 30, 0.62)));
  s += circle(W - M - 150, 2470, 135, GOLD) + ring(W - M - 150, 2470, 105, PAPER, 6, 0.9) + ring(W - M - 150, 2470, 70, PAPER, 4, 0.6);
  s += `<path d="M${M} 2640 c 60 -100, 110 60, 190 -35 s 90 -90, 150 15 s 120 -75, 200 -8" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round" stroke-opacity="0.85"/>`;
  s += line(M - 10, 2680, M + 520, 2680, INK, 5, 0.4);
  return s;
}

// The folded flap sits on the page side of the diagonal (lower-left triangle of the corner square).
const flap = `<polygon points="${W - FOLD},0 ${W - FOLD},${FOLD} ${W},${FOLD}" fill="${GOLD}"/>
<line x1="${W - FOLD}" y1="0" x2="${W}" y2="${FOLD}" stroke="${INK}" stroke-width="6" stroke-opacity="0.18"/>`;

const base = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs><clipPath id="page"><path d="${pagePath}"/></clipPath></defs>
<g clip-path="url(#page)">${rect(0, 0, W, H, PAPER)}${design()}${flap}</g>
<path d="${pagePath}" fill="none" stroke="${INK}" stroke-opacity="0.12" stroke-width="4"/>
</svg>`;

function grid(withLabels) {
  let g = "";
  for (let i = 0; i <= GRID; i++) {
    const major = i % 10 === 0;
    g += line(i * CW, 0, i * CW, H, major ? "#E0322E" : "#2F6FED", major ? 3 : 1, major ? 0.8 : 0.35);
    g += line(0, i * CH, W, i * CH, major ? "#E0322E" : "#2F6FED", major ? 3 : 1, major ? 0.8 : 0.35);
  }
  const cut = `<polygon points="${W - FOLD},0 ${W},0 ${W},${FOLD}" fill="#E0322E" fill-opacity="0.28"/>
  <polygon points="${W - FOLD},0 ${W},0 ${W},${FOLD}" fill="none" stroke="#E0322E" stroke-width="5" stroke-dasharray="26 14"/>`;
  const safe = `<rect x="${M}" y="${M}" width="${W - 2 * M}" height="${H - 2 * M}" fill="none" stroke="#12A150" stroke-width="5" stroke-dasharray="30 16"/>`;
  let labels = "";
  if (withLabels) {
    const t = (x, y, txt, c = "#E0322E", size = 44) => `<text x="${x}" y="${y}" font-family="Helvetica, Arial, sans-serif" font-size="${size}" font-weight="700" fill="${c}">${txt}</text>`;
    labels =
      t(W - FOLD + 60, 150, "СКОС") + t(W - FOLD + 60, 205, "(прозоре)", "#E0322E", 36) +
      t(M + 10, M - 24, "безпечна зона 150 px", "#12A150", 36) +
      t(20, H - 22, `сітка 40 × 40 = 1600 листків · клітинка ${CW} × ${CH.toFixed(1)} px · червоні лінії кожні 10 клітинок`, "#E0322E", 34);
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${cut}${g}${safe}${labels}</svg>`;
}

const exampleBuf = await sharp(Buffer.from(base)).png({ compressionLevel: 9 }).toBuffer();
await sharp(exampleBuf).toFile(join(out, "01-master-document-EXAMPLE.png"));
await sharp(exampleBuf).composite([{ input: Buffer.from(grid(true)) }]).png({ compressionLevel: 9 }).toFile(join(out, "02-master-document-GUIDE.png"));
await sharp(Buffer.from(grid(false))).png({ compressionLevel: 9 }).toFile(join(out, "03-master-document-TEMPLATE.png"));
copyFileSync(join(root, "public", "images", "document-atlas-v3.png"), join(out, "04-reference-atlas-v3.png"));
console.log("wrote designer-brief/ assets", { W, H, FOLD, CW, CH });
