// Derived asset (public/assets/** is never modified): the designer's folder-cover-alpha.png has a tab on the free edge and
// a vertical elastic-band line, but an open folder also needs a plain back wall and a plain inside of the cover.
// This script writes public/images/folder-panel.png: the same 2048x2048 canvas as the cover, tab removed (right border
// patched from a tab-free row) and the band line painted over with the neighbouring navy columns.
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const sharp = createRequire(join(root, "tools-candidates", "package.json"))("sharp");
const src = join(root, "public", "assets", "folder", "folder-cover-alpha.png");
const out = join(root, "public", "images", "folder-panel.png");

// measured on folder-cover-alpha.png (alpha bbox x 260..1857, y 90..1955): body right edge 1785, tab x 1786..1857, y 803..1127
const BODY_RIGHT = 1785;
const TAB_Y0 = 795;
const TAB_Y1 = 1135;
const BAND_X0 = 1640;
const BAND_X1 = 1664;

const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;
const px = (x, y) => (y * W + x) * C;

// 1. remove the tab, patch the body's right border on the tab rows from a clean row
for (let y = TAB_Y0; y <= TAB_Y1; y++) {
  for (let x = BODY_RIGHT - 30; x <= BODY_RIGHT; x++) for (let c = 0; c < C; c++) data[px(x, y) + c] = data[px(x, TAB_Y0 - 40) + c];
  for (let x = BODY_RIGHT + 1; x < W; x++) data[px(x, y) + 3] = 0;
}
for (let y = 0; y < H; y++) for (let x = BODY_RIGHT + 1; x < W; x++) data[px(x, y) + 3] = 0;
// 2. paint the band line over with the columns to its left
const span = BAND_X1 - BAND_X0 + 1;
for (let y = 0; y < H; y++) for (let k = 0; k < span; k++) for (let c = 0; c < C; c++) data[px(BAND_X0 + k, y) + c] = data[px(BAND_X0 - span - 4 + k, y) + c];

await sharp(data, { raw: { width: W, height: H, channels: C } }).png({ compressionLevel: 9 }).toFile(out);
console.log(`wrote ${out}`);
