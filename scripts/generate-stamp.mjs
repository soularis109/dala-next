// Generates public/images/stamp-mark.png — the ink imprint left on the lying document by the stamp ("обробка").
// 512x512, transparent background, a single deep-red ink colour with a slightly worn (speckled) edge.
// Shapes only (no text) so the result does not depend on installed fonts.
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const sharp = createRequire(join(root, "tools-candidates", "package.json"))("sharp");
const outPath = join(root, "public", "images", "stamp-mark.png");

const S = 512;
const C = S / 2;
const INK = "#B3282D";

const ring = (r, sw, extra = "") => `<circle cx="${C}" cy="${C}" r="${r}" fill="none" stroke="${INK}" stroke-width="${sw}" ${extra}/>`;
const bar = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${INK}"/>`;
const star = (cx, cy, r) => {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 === 0 ? r : r * 0.45;
    return `${(cx + Math.cos(a) * rr).toFixed(1)},${(cy + Math.sin(a) * rr).toFixed(1)}`;
  }).join(" ");
  return `<polygon points="${pts}" fill="${INK}"/>`;
};

let s = "";
s += ring(236, 14);
s += ring(212, 5);
s += ring(196, 10, 'stroke-dasharray="7 11"');
s += ring(158, 8);
// check mark in the upper half
s += `<path d="M178 190 L232 242 L338 128" fill="none" stroke="${INK}" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/>`;
// banner with pseudo-text (like "APPROVED")
s += `<rect x="86" y="268" width="340" height="86" rx="10" fill="none" stroke="${INK}" stroke-width="9"/>`;
[[112, 292, 54], [176, 292, 36], [222, 292, 70], [300, 292, 44], [352, 292, 52]].forEach(([x, y, w]) => (s += bar(x, y, w, 16)));
[[112, 322, 70], [192, 322, 44], [244, 322, 80], [334, 322, 70]].forEach(([x, y, w]) => (s += bar(x, y, w, 16)));
// row of stars under the banner
[0, 1, 2].forEach((i) => (s += star(C - 60 + i * 60, 404, 19)));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
<defs>
  <filter id="worn" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" result="warp"/>
    <feDisplacementMap in="SourceGraphic" in2="warp" scale="7" xChannelSelector="R" yChannelSelector="G" result="wobbly"/>
    <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="2" seed="11" result="grain"/>
    <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -9 6.15" result="mask"/>
    <feComposite in="wobbly" in2="mask" operator="in"/>
  </filter>
</defs>
<g filter="url(#worn)" opacity="0.94">${s}</g>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(outPath);
console.log(`wrote ${outPath} (${S}x${S})`);
