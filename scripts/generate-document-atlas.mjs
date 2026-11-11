// Generates public/images/document-atlas-v3.png: a clean, minimalist 4x3 atlas of 12 document designs.
// Vector (SVG) -> PNG via sharp (installed in tools-candidates/). Deterministic, no network, no credits.
// Layout contract with legacy/2601.cjs (paperFragmentSurface): every tile is a square cell; the sheet UV 0..1 maps to
// x 0.18..0.82 and y 0.025..0.975 of the cell, so the document rectangle must fill exactly that area.
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const sharp = createRequire(join(root, "tools-candidates", "package.json"))("sharp");

const CELL = 1024;
const COLS = 4;
const ROWS = 3;
const DOC = { x: 0.18 * CELL, y: 0.025 * CELL, w: 0.64 * CELL, h: 0.95 * CELL }; // 655 x 973
const M = 58; // inner margin
const W = DOC.w;
const H = DOC.h;

const INK = "#041E42";
const GOLD = "#D6BE93";
const GOLD_DEEP = "#B9975B";
const PAPER = "#FCFAF5";

function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r = (n) => Math.round(n * 10) / 10;
const rect = (x, y, w, h, fill, o = 1, rx = 0) =>
  `<rect x="${r(x)}" y="${r(y)}" width="${r(w)}" height="${r(h)}" rx="${rx}" fill="${fill}" fill-opacity="${o}"/>`;
const stroke = (x, y, w, h, c, sw = 2, o = 1, rx = 0) =>
  `<rect x="${r(x)}" y="${r(y)}" width="${r(w)}" height="${r(h)}" rx="${rx}" fill="none" stroke="${c}" stroke-width="${sw}" stroke-opacity="${o}"/>`;
const line = (x1, y1, x2, y2, c = INK, sw = 2, o = 0.2) =>
  `<line x1="${r(x1)}" y1="${r(y1)}" x2="${r(x2)}" y2="${r(y2)}" stroke="${c}" stroke-width="${sw}" stroke-opacity="${o}"/>`;
const circle = (cx, cy, rad, fill, o = 1) => `<circle cx="${r(cx)}" cy="${r(cy)}" r="${r(rad)}" fill="${fill}" fill-opacity="${o}"/>`;
const ring = (cx, cy, rad, c, sw = 3, o = 1) =>
  `<circle cx="${r(cx)}" cy="${r(cy)}" r="${r(rad)}" fill="none" stroke="${c}" stroke-width="${sw}" stroke-opacity="${o}"/>`;

// Pseudo-text: rounded bars with stable rhythm (readable as "text" at a distance, no fake letters).
function bars(rand, x, y, w, count, gap = 26, h = 9, o = 0.62, lastShort = true) {
  let out = "";
  for (let i = 0; i < count; i++) {
    const last = lastShort && i === count - 1;
    const len = last ? w * (0.35 + rand() * 0.25) : w * (0.9 + rand() * 0.1);
    out += rect(x, y + i * gap, len, h, INK, o, h / 2);
  }
  return out;
}
const title = (x, y, w, h = 26) => rect(x, y, w, h, INK, 1, 3);
const sub = (x, y, w) => rect(x, y, w, 10, INK, 0.4, 5);
const signature = (x, y, w) =>
  `<path d="M${x} ${y} c ${w * 0.1} -34, ${w * 0.18} 20, ${w * 0.3} -12 s ${w * 0.14} -30, ${w * 0.22} 6 s ${w * 0.2} -26, ${w * 0.3} -2" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round" stroke-opacity="0.85"/>` +
  line(x - 6, y + 22, x + w, y + 22, INK, 2, 0.35);
const check = (x, y, s, c = INK) =>
  `<path d="M${x + s * 0.2} ${y + s * 0.52} l ${s * 0.22} ${s * 0.22} l ${s * 0.42} -${s * 0.5}" fill="none" stroke="${c}" stroke-width="${s * 0.14}" stroke-linecap="round" stroke-linejoin="round"/>`;

const designs = [
  // 1. Report cover
  (g) =>
    rect(0, 0, W, 150, INK) + rect(M, 190, 150, 12, GOLD, 1, 6) + title(M, 240, W * 0.66, 38) + title(M, 296, W * 0.45, 38) +
    bars(g, M, 372, W - 2 * M, 3, 26, 9, 0.5) + rect(M, H - 250, W - 2 * M, 1.5, INK, 0.2) +
    rect(M, H - 210, 150, 150, GOLD, 1) + rect(M + 170, H - 210, 150, 150, INK, 0.08) + bars(g, M + 345, H - 205, 190, 4, 30, 9, 0.45, false),
  // 2. Letter
  (g) =>
    rect(M, M, 60, 60, GOLD, 1) + bars(g, W - M - 150, M + 6, 150, 3, 22, 8, 0.4, false) + title(M, 190, 250, 26) + sub(M, 238, 160) +
    bars(g, M, 306, W - 2 * M, 7, 30) + bars(g, M, 560, W - 2 * M, 5, 30) + signature(M, H - 150, 220) + rect(M, H - 80, 120, 8, INK, 0.45, 4),
  // 3. Invoice
  (g) => {
    let rows = "";
    for (let i = 0; i < 7; i++) {
      const y = 400 + i * 58;
      rows += line(M, y + 46, W - M, y + 46, INK, 1.5, 0.16) + rect(M, y + 14, 120 + g() * 150, 9, INK, 0.55, 4.5) + rect(W - M - 70, y + 14, 70, 9, INK, 0.55, 4.5);
    }
    return title(M, M, 190, 30) + sub(M, M + 50, 120) + bars(g, W - M - 140, M, 140, 3, 22, 8, 0.4, false) +
      rect(M, 330, W - 2 * M, 44, INK) + rect(M + 14, 348, 80, 9, PAPER, 0.9, 4.5) + rect(W - M - 80, 348, 66, 9, PAPER, 0.9, 4.5) + rows +
      rect(W - M - 240, H - 190, 240, 66, INK) + rect(W - M - 224, H - 163, 80, 10, PAPER, 0.9, 5) + rect(W - M - 90, H - 163, 66, 10, GOLD, 1, 5);
  },
  // 4. Checklist
  (g) => {
    let items = "";
    for (let i = 0; i < 8; i++) {
      const y = 250 + i * 80;
      const done = i < 4;
      items += stroke(M, y, 38, 38, INK, 3, 0.85, 8) + (done ? rect(M + 3, y + 3, 32, 32, GOLD, 0.35, 6) + check(M, y, 38) : "") + rect(M + 70, y + 14, (W - 2 * M - 70) * (0.5 + g() * 0.5), 10, INK, done ? 0.4 : 0.7, 5);
    }
    return rect(0, 0, 18, H, GOLD) + title(M, M + 10, 280, 34) + rect(M, M + 66, 90, 6, GOLD_DEEP, 1, 3) + items;
  },
  // 5. Chart report
  (g) => {
    let bar = "";
    const heights = [90, 150, 120, 200, 260, 230];
    heights.forEach((hh, i) => (bar += rect(M + 10 + i * 78, 640 - hh, 52, hh, i === 4 ? GOLD : INK, i === 4 ? 1 : 0.85, 4)));
    return title(M, M, 300, 32) + sub(M, M + 54, 190) + bars(g, M, 190, W - 2 * M, 3, 28, 9, 0.5) +
      stroke(M - 10, 330, W - 2 * M + 20, 360, INK, 1.5, 0.18, 6) + line(M, 640, W - M, 640, INK, 2, 0.35) + bar +
      `<polyline points="${M + 36},560 ${M + 114},490 ${M + 192},520 ${M + 270},420 ${M + 348},360 ${M + 426},388" fill="none" stroke="${GOLD_DEEP}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>` +
      bars(g, M, 740, (W - 2 * M) * 0.46, 5, 28, 9, 0.5) + bars(g, M + (W - 2 * M) * 0.54, 740, (W - 2 * M) * 0.46, 5, 28, 9, 0.5);
  },
  // 6. Certificate
  (g) =>
    stroke(26, 26, W - 52, H - 52, INK, 3, 0.9) + stroke(40, 40, W - 80, H - 80, GOLD_DEEP, 1.5, 0.9) +
    ring(W / 2, 200, 62, GOLD_DEEP, 4) + ring(W / 2, 200, 46, GOLD_DEEP, 2) + circle(W / 2, 200, 22, GOLD) +
    title(W / 2 - 170, 330, 340, 36) + rect(W / 2 - 100, 394, 200, 8, GOLD_DEEP, 1, 4) +
    `<g transform="translate(${W / 2 - (W - 220) / 2}, 450)">${bars(g, 0, 0, W - 220, 5, 30, 9, 0.5)}</g>` +
    circle(W / 2, H - 230, 56, GOLD) + ring(W / 2, H - 230, 44, PAPER, 2, 0.9) + line(M + 20, H - 120, M + 200, H - 120, INK, 2, 0.45) + line(W - M - 200, H - 120, W - M - 20, H - 120, INK, 2, 0.45),
  // 7. Form
  (g) => {
    let fields = "";
    for (let i = 0; i < 6; i++) {
      const y = 230 + i * 98;
      fields += rect(M, y, 90 + g() * 70, 8, INK, 0.5, 4) + stroke(M, y + 22, W - 2 * M, 40, INK, 2, 0.45, 4);
    }
    return rect(0, 0, W, 12, INK) + title(M, M + 20, 240, 30) + sub(M, M + 72, 150) + fields +
      stroke(M, H - 128, 28, 28, INK, 3, 0.85, 6) + rect(M + 44, H - 120, 110, 9, INK, 0.5, 4.5) + stroke(M + 200, H - 128, 28, 28, INK, 3, 0.85, 6) + check(M + 200, H - 128, 28) + rect(M + 244, H - 120, 110, 9, INK, 0.5, 4.5);
  },
  // 8. ID / profile
  (g) =>
    rect(0, 0, W, 190, INK) + circle(M + 70, 190, 78, PAPER) + circle(M + 70, 190, 66, GOLD) + circle(M + 70, 172, 22, INK, 0.75) + `<path d="M${M + 24} 236 q ${46} -54 ${92} 0 z" fill="${INK}" fill-opacity="0.75"/>` +
    title(M + 170, 150, 230, 28) + sub(M + 170, 200, 150) +
    bars(g, M, 320, W - 2 * M, 2, 34, 9, 0.5, false) + rect(M, 440, W - 2 * M, 1.5, INK, 0.2) +
    bars(g, M, 480, (W - 2 * M) * 0.45, 4, 38, 9, 0.5, false) + bars(g, M + (W - 2 * M) * 0.55, 480, (W - 2 * M) * 0.45, 4, 38, 9, 0.5, false) +
    rect(M, 700, W - 2 * M, 100, GOLD, 0.35, 6) + bars(g, M + 20, 724, W - 2 * M - 40, 2, 30, 9, 0.55, true) + rect(M, H - 100, W - 2 * M, 38, INK),
  // 9. Contract
  (g) => {
    let clauses = "";
    for (let i = 0; i < 4; i++) {
      const y = 200 + i * 135;
      clauses += rect(M, y, 34, 34, INK, 1, 6) + rect(M + 10, y + 12, 14, 10, PAPER, 0.95, 3) + rect(M + 54, y + 4, 180 + g() * 80, 12, INK, 0.85, 6) + bars(g, M + 54, y + 38, W - 2 * M - 54, 2, 26, 8, 0.45);
    }
    return title(M, M, 340, 34) + rect(M, M + 56, 100, 6, GOLD_DEEP, 1, 3) + clauses +
      line(M, H - 112, M + 220, H - 112, INK, 2, 0.5) + rect(M, H - 90, 100, 8, INK, 0.4, 4) + line(W - M - 220, H - 112, W - M, H - 112, INK, 2, 0.5) + signature(W - M - 190, H - 126, 170);
  },
  // 10. Memo
  (g) =>
    rect(M, M, W - 2 * M, 14, INK, 1, 7) + title(M, 120, 230, 30) + bars(g, M, 190, 200, 3, 24, 8, 0.45, false) + rect(M, 290, W - 2 * M, 1.5, INK, 0.2) +
    bars(g, M, 334, (W - 2 * M) / 2 - 14, 11, 30, 9, 0.6) + bars(g, M + (W - 2 * M) / 2 + 14, 334, (W - 2 * M) / 2 - 14, 11, 30, 9, 0.6) +
    rect(M + (W - 2 * M) / 2 + 14, 334 + 3 * 30 - 6, (W - 2 * M) / 2 - 14, 26, GOLD, 0.45, 4),
  // 11. Timeline
  (g) => {
    let nodes = "";
    for (let i = 0; i < 5; i++) {
      const y = 230 + i * 150;
      nodes += circle(M + 20, y, 17, i === 2 ? GOLD : INK, i === 2 ? 1 : 0.9) + circle(M + 20, y, 7, PAPER) + rect(M + 70, y - 14, 130 + g() * 120, 14, INK, 0.9, 7) + bars(g, M + 70, y + 18, W - 2 * M - 70, 2, 24, 8, 0.45);
    }
    return title(M, M, 260, 30) + sub(M, M + 54, 170) + line(M + 20, 230, M + 20, 230 + 4 * 150, GOLD_DEEP, 3, 0.8) + nodes;
  },
  // 12. Approval stamp
  (g) =>
    title(M, M, 280, 30) + sub(M, M + 54, 150) + bars(g, M, 200, W - 2 * M, 6, 30, 9, 0.55) +
    rect(M, 440, W - 2 * M, 130, GOLD, 0.3, 6) + bars(g, M + 22, 470, W - 2 * M - 44, 3, 30, 9, 0.55) +
    ring(W - M - 120, H - 230, 92, "#9A2B2B", 7, 0.9) + ring(W - M - 120, H - 230, 74, "#9A2B2B", 2.5, 0.9) + check(W - M - 170, H - 280, 100, "#9A2B2B") +
    bars(g, M, H - 300, 220, 3, 28, 9, 0.5, true) + signature(M, H - 110, 200),
];

const docs = designs.map((fn, i) => {
  const body = fn(rng(0xa71a5 + i * 977));
  const border = stroke(0.75, 0.75, W - 1.5, H - 1.5, INK, 1.5, 0.1);
  return `<g transform="translate(${r((i % COLS) * CELL + DOC.x)}, ${r((ROWS - 1 - Math.floor(i / COLS)) * CELL + DOC.y)})">
    <clipPath id="c${i}"><rect width="${r(W)}" height="${r(H)}"/></clipPath>
    <g clip-path="url(#c${i})">${rect(0, 0, W, H, PAPER)}${body}${border}</g></g>`;
});

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${COLS * CELL}" height="${ROWS * CELL}" viewBox="0 0 ${COLS * CELL} ${ROWS * CELL}">${docs.join("")}</svg>`;
const out = join(root, "public", "images", "document-atlas-v3.png");
await sharp(Buffer.from(svg), { density: 72 }).png({ compressionLevel: 9, palette: false }).toFile(out);
console.log("wrote", out);
