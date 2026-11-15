// Rasterizes the versioned A4 master SVG used by the WebGL document mosaic.
// The original document-master.svg and document-*.png files remain untouched for A/B comparison.
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { readFile } from "node:fs/promises";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const sharp = createRequire(join(root, "tools-candidates", "package.json"))("sharp");
const documentDir = join(root, "public", "assets", "document");
const source = join(documentDir, "document-master-v2.svg");

const outputs = [
  { height: 1024, width: 724 },
  { height: 2048, width: 1448 },
  { height: 4096, width: 2896 },
];

const svg = await readFile(source, "utf8");
const inkPattern = /<g data-form-ink="true">([\s\S]*?)<\/g>/g;
const ink = [...svg.matchAll(inkPattern)].map(match => match[1]).join("\n");
if (ink.match(/<(?:rect|path) /g)?.length !== 7) throw new Error("Expected six form values and one checkmark");
const blank = svg.replace(inkPattern, "");
const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="840" height="1188" viewBox="0 0 840 1188">${ink}</svg>`;

for (const { height, width } of outputs) {
  const target = join(documentDir, `document-v2-${height}.png`);
  await sharp(source, { density: 384 })
    .resize(width, height, { fit: "fill", kernel: sharp.kernel.lanczos3 })
    .flatten({ background: "#F6F2E9" })
    .png({ compressionLevel: 9, palette: false })
    .toFile(target);
  for (const [name, artwork] of [["blank", blank], ["ink", overlay]]) {
    await sharp(Buffer.from(artwork), { density: 384 })
      .resize(width, height, { fit: "fill", kernel: sharp.kernel.lanczos3 })
      .png({ compressionLevel: 9, palette: false })
      .toFile(join(documentDir, `document-form-${name}-${height}.png`));
  }
  console.log(`wrote document textures (${width}x${height})`);
}
