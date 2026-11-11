// Generates public/images/master-form.png — the "анкета-бланк" master image that the 40x40 mosaic of
// mini-documents shows when they assemble into one large page (see legacy/2601.cjs, `t_master`).
// Same geometry as designer-brief/01-master-document-EXAMPLE.png: 2048x2770 (page 4.25 x 5.75), 40x40 grid, fold 506 px.
// It is a placeholder-quality blank that can be replaced by a designer's PNG with the same size/layout.
//
// Colour/space contract:
//  - image row 0 is the TOP of the page; the shader flips it (flipY) so grid row 0 = bottom of the page;
//  - the cut corner (triangle (W-F,0)-(W,0)-(W,F)) is painted as paper (the sheets there are projected onto the diagonal);
//  - fully opaque PNG.
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const sharp = createRequire(join(root, "tools-candidates", "package.json"))("sharp");
const outPath = join(root, "public", "images", "master-form.png");

const W = 2048;
const H = 2770;
const FOLD = Math.round(1.05 * (W / 4.25)); // 506
const M = 150;

const INK = "#041E42";
const GOLD = "#D6BE93";
const PAPER = "#E4E1DA"; // greyish form paper
const PANEL = "#F3F1EC";
const GREY = "#B9B6AE";

const rect = (x, y, w, h, fill, o = 1, rx = 0) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" fill-opacity="${o}"/>`;
const frame = (x, y, w, h, c, sw, o = 1, rx = 0) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="none" stroke="${c}" stroke-width="${sw}" stroke-opacity="${o}"/>`;
const bar = (x, y, w, h, o = 0.7) => rect(x, y + 0, w, h, INK, Math.min(1, o * 1.35), h / 2); // boosted: sheets are tiny on screen

let s = "";

// page background + form header
s += rect(0, 0, W, H, PAPER);
s += rect(0, H - 150, W, 150, INK, 0.07);

// --- photo block (top-left): frame + person silhouette
const PX = M;
const PY = M;
const PW = 640;
const PH = 800;
s += rect(PX, PY, PW, PH, PANEL, 1, 16);
s += `<clipPath id="photo"><rect x="${PX}" y="${PY}" width="${PW}" height="${PH}" rx="16"/></clipPath>`;
s += `<g clip-path="url(#photo)">
  ${rect(PX, PY, PW, PH, GREY, 0.55)}
  <circle cx="${PX + PW / 2}" cy="${PY + 300}" r="150" fill="${INK}" fill-opacity="0.85"/>
  <path d="M${PX - 40} ${PY + PH} C ${PX + 20} ${PY + 540}, ${PX + 200} ${PY + 500}, ${PX + PW / 2} ${PY + 500} S ${PX + PW - 20} ${PY + 540}, ${PX + PW + 40} ${PY + PH} Z" fill="${INK}" fill-opacity="0.85"/>
</g>`;
s += frame(PX, PY, PW, PH, INK, 10, 0.85, 16);
// photo corner ticks
[[PX, PY], [PX + PW, PY], [PX, PY + PH], [PX + PW, PY + PH]].forEach(([x, y]) => {
  s += `<circle cx="${x}" cy="${y}" r="16" fill="${GOLD}" stroke="${INK}" stroke-width="5" stroke-opacity="0.8"/>`;
});

// --- title + first fields to the right of the photo (kept clear of the cut corner at the top right)
const RX = PX + PW + 90; // 880
const RW = W - FOLD - 60 - RX; // keep left of the cut corner
s += bar(RX, PY + 10, RW * 0.92, 92, 0.9); // form title
s += bar(RX, PY + 140, RW * 0.55, 34, 0.45); // subtitle
for (let i = 0; i < 3; i++) {
  const y = PY + 280 + i * 175;
  s += bar(RX, y, 260, 30, 0.55); // label
  s += rect(RX, y + 54, RW, 90, PANEL, 1, 10);
  s += frame(RX, y + 54, RW, 90, INK, 8, 0.9, 10);
}
// fields 1 and 2 are (lightly) filled, field 3 is empty: it is unclear whether the form is completed
s += bar(RX + 28, PY + 280 + 54 + 30, RW * 0.5, 30, 0.7);
s += bar(RX + 28, PY + 280 + 175 + 54 + 30, RW * 0.32, 30, 0.7);

// --- full-width fields under the photo
const rows = 5;
for (let i = 0; i < rows; i++) {
  const y = PY + PH + 110 + i * 205;
  s += bar(M, y, 330 + (i % 3) * 90, 30, 0.55);
  s += rect(M, y + 56, W - 2 * M, 100, PANEL, 1, 10);
  s += frame(M, y + 56, W - 2 * M, 100, INK, 8, 0.9, 10);
  if (i === 0) s += bar(M + 28, y + 56 + 35, (W - 2 * M) * 0.58, 30, 0.7); // filled
  if (i === 3) s += bar(M + 28, y + 56 + 35, (W - 2 * M) * 0.34, 30, 0.7); // filled
}

// --- checkbox row
const cy = PY + PH + 110 + rows * 205 + 20; // ~2075
for (let i = 0; i < 4; i++) {
  const x = M + i * 450;
  s += rect(x, cy, 86, 86, PANEL, 1, 10);
  s += frame(x, cy, 86, 86, INK, 6, 0.8, 10);
  if (i === 1) s += `<path d="M${x + 16} ${cy + 46} l 24 24 l 38 -56" fill="none" stroke="${INK}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.85"/>`;
  s += bar(x + 120, cy + 28, 250, 30, 0.5);
}

// --- signature + stamp placeholder
const sy = cy + 190; // ~2265
s += bar(M, sy, 320, 30, 0.55);
s += `<line x1="${M}" y1="${sy + 210}" x2="${M + 800}" y2="${sy + 210}" stroke="${INK}" stroke-width="7" stroke-opacity="0.6"/>`;
s += `<circle cx="${W - M - 210}" cy="${sy + 130}" r="190" fill="none" stroke="${INK}" stroke-width="8" stroke-opacity="0.45" stroke-dasharray="34 22"/>`;
s += bar(W - M - 330, sy + 120, 240, 28, 0.35);

// --- folded flap (champagne triangle on the page side of the diagonal) + cut corner painted as paper
s += `<polygon points="${W - FOLD},0 ${W},0 ${W},${FOLD}" fill="${PAPER}"/>`;
s += `<polygon points="${W - FOLD},0 ${W - FOLD},${FOLD} ${W},${FOLD}" fill="${GOLD}"/>`;
s += `<line x1="${W - FOLD}" y1="0" x2="${W}" y2="${FOLD}" stroke="${INK}" stroke-width="6" stroke-opacity="0.2"/>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${s}</svg>`;
await sharp(Buffer.from(svg)).flatten({ background: PAPER }).png({ compressionLevel: 9 }).toFile(outPath);
console.log(`wrote ${outPath} (${W}x${H}, fold ${FOLD}px)`);
