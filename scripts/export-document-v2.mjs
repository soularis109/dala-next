// Rasterizes the versioned A4 master SVG used by the WebGL document mosaic.
// The original document-master.svg and document-*.png files remain untouched for A/B comparison.
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const sharp = createRequire(join(root, "tools-candidates", "package.json"))("sharp");
const documentDir = join(root, "public", "assets", "document");
const source = join(documentDir, "document-master-v2.svg");

const outputs = [
  { height: 1024, width: 724 },
  { height: 2048, width: 1448 },
  { height: 4096, width: 2896 },
];

for (const { height, width } of outputs) {
  const target = join(documentDir, `document-v2-${height}.png`);
  await sharp(source, { density: 384 })
    .resize(width, height, { fit: "fill", kernel: sharp.kernel.lanczos3 })
    .flatten({ background: "#F6F2E9" })
    .png({ compressionLevel: 9, palette: false })
    .toFile(target);
  console.log(`wrote ${target} (${width}x${height})`);
}
