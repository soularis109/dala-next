// Generates a screen-space-friendly 4x3 atlas for documents that render at roughly 10-40 px tall.
// It intentionally uses a few large, high-contrast marks instead of print-sized details.
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const sharp = createRequire(join(root, "tools-candidates", "package.json"))("sharp");

const CELL = 1024;
const COLS = 4;
const ROWS = 3;
const DOC = { x: 0.18 * CELL, y: 0.025 * CELL, w: 0.64 * CELL, h: 0.95 * CELL };
const W = DOC.w;
const H = DOC.h;
const M = 64;

const NAVY = "#041E42";
const NAVY_SOFT = "#40536D";
const GREY = "#8F999A";
const GREY_LIGHT = "#C8CBC6";
const GOLD = "#D6BE93";
const PAPER = "#FCFAF5";

const n = (value) => Math.round(value * 10) / 10;
const rect = (x, y, width, height, fill, opacity = 1, radius = 0) =>
  `<rect x="${n(x)}" y="${n(y)}" width="${n(width)}" height="${n(height)}" rx="${n(radius)}" fill="${fill}" fill-opacity="${opacity}"/>`;
const outline = (x, y, width, height, color, strokeWidth = 8, radius = 0, opacity = 1) =>
  `<rect x="${n(x)}" y="${n(y)}" width="${n(width)}" height="${n(height)}" rx="${n(radius)}" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-opacity="${opacity}"/>`;
const line = (x1, y1, x2, y2, color, strokeWidth = 12, opacity = 1) =>
  `<line x1="${n(x1)}" y1="${n(y1)}" x2="${n(x2)}" y2="${n(y2)}" stroke="${color}" stroke-width="${strokeWidth}" stroke-opacity="${opacity}" stroke-linecap="round"/>`;
const circle = (cx, cy, radius, fill, opacity = 1) =>
  `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(radius)}" fill="${fill}" fill-opacity="${opacity}"/>`;
const ring = (cx, cy, radius, color, strokeWidth = 12, opacity = 1) =>
  `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(radius)}" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-opacity="${opacity}"/>`;

function bars(x, y, widths, height = 26, gap = 42, color = GREY, opacity = 1) {
  return widths.map((width, index) => rect(x, y + index * gap, width, height, color, opacity, height / 2)).join("");
}

function header(width = 300, accent = true) {
  return rect(M, M, width, 58, NAVY, 1, 10) + (accent ? rect(M, M + 82, 150, 20, GOLD, 1, 10) : "");
}

const microBars = (x, y, widths, color = GREY) => bars(x, y, widths, 48, 94, color);
const designs = [
  // Summary
  header(330) + microBars(M, 250, [W - 2 * M, W - 2 * M - 150]) +
    rect(M, 520, W - 2 * M, 170, GOLD, 0.48, 18) + rect(M + 42, 578, 330, 50, NAVY_SOFT, 1, 14),

  // Form
  header(280, false) + [270, 520, 770].map((y, index) =>
    rect(M, y, 180 + index * 35, 46, NAVY_SOFT, 1, 12) + outline(M, y + 72, W - 2 * M, 110, GREY, 15, 14, 0.85)
  ).join(""),

  // Checklist
  header(300) + [280, 520, 760].map((y, index) =>
    outline(M, y, 92, 92, NAVY_SOFT, 17, 14) +
    (index === 0 ? `<path d="M${M + 20} ${y + 50}l22 22 42-58" fill="none" stroke="${NAVY}" stroke-width="19" stroke-linecap="round" stroke-linejoin="round"/>` : "") +
    microBars(M + 140, y + 5, [W - 2 * M - 150, W - 2 * M - 270], index === 0 ? NAVY_SOFT : GREY)
  ).join(""),

  // Profile
  rect(0, 0, W, 250, NAVY) + circle(M + 110, 250, 95, GOLD) + circle(M + 110, 222, 34, NAVY_SOFT) +
    rect(M + 250, 192, 270, 50, PAPER, 0.92, 12) + microBars(M, 430, [W - 2 * M, W - 2 * M - 130]) +
    rect(M, 700, W - 2 * M, 155, GOLD, 0.48, 18),

  // Chart
  header(290) + line(M, 760, W - M, 760, GREY, 18, 0.8) +
    [250, 430, 330].map((height, index) => rect(M + 70 + index * 170, 760 - height, 105, height, index === 1 ? GOLD : NAVY_SOFT, 1, 14)).join(""),

  // Certificate
  outline(28, 28, W - 56, H - 56, NAVY_SOFT, 18, 12) + outline(58, 58, W - 116, H - 116, GOLD, 13, 10) +
    ring(W / 2, 270, 104, GOLD, 22) + circle(W / 2, 270, 58, GOLD, 0.78) +
    rect(W / 2 - 205, 510, 410, 78, NAVY, 1, 14) + microBars(W / 2 - 220, 670, [440, 330]),

  // Split report
  header(260) + rect(M, 290, 235, 310, NAVY_SOFT, 0.2, 18) + rect(W - M - 235, 290, 235, 310, GOLD, 0.45, 18) +
    rect(M + 38, 390, 160, 52, NAVY_SOFT, 1, 14) + rect(W - M - 198, 390, 160, 52, NAVY_SOFT, 1, 14) +
    microBars(M, 740, [W - 2 * M, W - 2 * M - 170]),

  // Approval
  header(320) + microBars(M, 260, [W - 2 * M, W - 2 * M - 150]) +
    rect(M, 530, W - 2 * M, 175, GOLD, 0.5, 18) + ring(W - M - 125, H - 155, 105, NAVY_SOFT, 22),

  // Contract
  header(330) + [300, 550, 800].map((y, index) =>
    rect(M, y, 92, 92, index === 1 ? GOLD : NAVY_SOFT, 1, 14) + microBars(M + 140, y, [W - 2 * M - 150, W - 2 * M - 290])
  ).join(""),

  // Two-column memo
  rect(M, M, W - 2 * M, 68, NAVY, 1, 12) +
    microBars(M, 300, [210, 250, 180], NAVY_SOFT) + microBars(W / 2 + 20, 300, [220, 170, 240], GREY) +
    rect(W / 2 + 20, 650, 235, 120, GOLD, 0.52, 15),

  // Timeline
  header(285) + line(M + 52, 310, M + 52, 820, GOLD, 23) + [330, 560, 790].map((y, index) =>
    circle(M + 52, y, 45, index === 1 ? GOLD : NAVY_SOFT) + microBars(M + 145, y - 25, [330, 230], index === 1 ? NAVY_SOFT : GREY)
  ).join(""),

  // Table
  header(300) + rect(M, 280, W - 2 * M, 105, NAVY, 1, 14) + [450, 650, 850].map((y, index) =>
    rect(M, y, W - 2 * M, 120, index === 1 ? GOLD : GREY_LIGHT, index === 1 ? 0.4 : 0.55, 14) +
    rect(M + 35, y + 35, 220, 50, NAVY_SOFT, 0.9, 12) + rect(W - M - 175, y + 35, 140, 50, NAVY_SOFT, 0.76, 12)
  ).join(""),
];

const documents = designs.map((body, index) => {
  const column = index % COLS;
  const row = ROWS - 1 - Math.floor(index / COLS);
  return `<g transform="translate(${n(column * CELL + DOC.x)} ${n(row * CELL + DOC.y)})">
    <clipPath id="micro-${index}"><rect width="${n(W)}" height="${n(H)}" rx="6"/></clipPath>
    <g clip-path="url(#micro-${index})">
      ${rect(0, 0, W, H, PAPER)}
      ${body}
      ${outline(4, 4, W - 8, H - 8, GREY_LIGHT, 8, 6, 0.8)}
    </g>
  </g>`;
});

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${COLS * CELL}" height="${ROWS * CELL}" viewBox="0 0 ${COLS * CELL} ${ROWS * CELL}">${documents.join("")}</svg>`;
const output = join(root, "public", "images", "document-atlas-micro.png");

await sharp(Buffer.from(svg), { density: 72 }).png({ compressionLevel: 9, palette: false }).toFile(output);
console.log(`wrote ${output} (${COLS * CELL}x${ROWS * CELL})`);
