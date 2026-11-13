import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { deflateSync } from "node:zlib";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const imagesDir = join(repoRoot, "public", "images");
const modelsDir = join(repoRoot, "public", "models");
const size = 200;
const bankSize = 100;
const particleCount = bankSize * bankSize;
const formationRadius = 4.35;

mkdirSync(imagesDir, { recursive: true });
mkdirSync(modelsDir, { recursive: true });

function mulberry32(seed) {
  return function random() {
    let value = (seed += 0x6d2b79f5);
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function worldToTexture([x, y, z]) {
  return [
    clamp(0.5 + x / (formationRadius * 2), 0.002, 0.998),
    clamp(0.5 + y / (formationRadius * 2), 0.002, 0.998),
    clamp(0.5 + z / (formationRadius * 2), 0.002, 0.998),
  ];
}

// A4 (0.7071), same aspect as the designer's public/assets/document/document-*.png (1448x2048), plain rectangle:
// `fold: 0` disables the old cut/dog-ear corner (isCutCorner/isFold return false), so the master image maps 1:1.
const page = {
  width: 4.25,
  height: 6.01,
  depth: 0.24,
  fold: 0,
};

function isCutCorner(x, y) {
  const right = page.width / 2;
  const top = page.height / 2;
  if (x <= right - page.fold || y <= top - page.fold) return false;
  const localX = x - (right - page.fold);
  const localY = y - (top - page.fold);
  return localX + localY > page.fold;
}

function isFold(x, y) {
  const right = page.width / 2;
  const top = page.height / 2;
  if (x <= right - page.fold || y <= top - page.fold) return false;
  const localX = x - (right - page.fold);
  const localY = y - (top - page.fold);
  return localX + localY <= page.fold;
}

function randomPagePoint(random, resolved = false) {
  const right = page.width / 2;
  const top = page.height / 2;
  const category = random();
  let x;
  let y;
  let z;

  if (category < 0.81) {
    do {
      x = (random() - 0.5) * page.width;
      y = (random() - 0.5) * page.height;
    } while (isCutCorner(x, y));
    z = page.depth * 0.5 + (random() - 0.5) * (resolved ? 0.035 : 0.1);
  } else if (category < 0.93) {
    do {
      x = (random() - 0.5) * page.width;
      y = (random() - 0.5) * page.height;
    } while (isCutCorner(x, y));
    z = page.depth * -0.5 + (random() - 0.5) * 0.045;
  } else if (category < 0.985) {
    const edge = Math.floor(random() * 4);
    if (edge === 0) {
      x = -right;
      y = (random() - 0.5) * page.height;
    } else if (edge === 1) {
      x = right;
      y = -top + random() * (page.height - page.fold);
    } else if (edge === 2) {
      x = -right + random() * (page.width - page.fold);
      y = top;
    } else {
      x = (random() - 0.5) * page.width;
      y = -top;
    }
    z = (random() - 0.5) * page.depth;
  } else {
    const a = random();
    const b = random();
    const u = Math.min(a, b);
    const v = Math.max(a, b) - Math.min(a, b);
    x = right - page.fold + u * page.fold;
    y = top - page.fold + v * page.fold;
    if (isCutCorner(x, y)) y = top - page.fold + (page.fold - (x - (right - page.fold))) * 0.85;
    z = page.depth * 0.5 + 0.1 + random() * 0.055;
  }

  return [x, y, z];
}

function resolvedPagePoint(index, random) {
  const column = index % bankSize;
  const row = Math.floor(index / bankSize);
  const nx = (column + 0.5 + (random() - 0.5) * 0.5) / bankSize;
  const ny = (row + 0.5 + (random() - 0.5) * 0.5) / bankSize;
  let x = (nx - 0.5) * page.width;
  let y = (ny - 0.5) * page.height;

  if (isCutCorner(x, y)) {
    const right = page.width / 2;
    const top = page.height / 2;
    const localX = x - (right - page.fold);
    y = top - page.fold + (page.fold - localX) * 0.82;
  }

  const horizontalCurve = ((nx - 0.5) ** 2 - 0.08) * 0.34;
  const verticalCurve = Math.sin(ny * Math.PI) * 0.035;
  const z = page.depth * 0.5 + horizontalCurve + verticalCurve + Math.sin(nx * Math.PI * 2) * 0.018 + (random() - 0.5) * 0.025;
  return [x, y, z];
}

// Hero state: one continuous horizontal band of documents, left edge → right edge.
// The page column (nx) maps to the band X and the page row (ny) to the band thickness, so
// left/right halves of the band assemble into the left/right halves of the page.
// On desktop the simulation stretches this bank's X by `heroBandStretch` (legacy/2601.cjs)
// so the band spans the full viewport; texture positions must stay inside ±formationRadius.
// Banks 2 and 3: the same flat document for the stamp ("обробка") state. Same 100x100 grid layout as the resolved page
// (so the 40x40 mosaic tiles it) but perfectly flat: no curvature, straight bottom edge, minimal depth jitter.
function flatPagePoint(index, random) {
  const column = index % bankSize;
  const row = Math.floor(index / bankSize);
  const nx = (column + 0.5 + (random() - 0.5) * 0.3) / bankSize;
  const ny = (row + 0.5 + (random() - 0.5) * 0.3) / bankSize;
  const x = (nx - 0.5) * page.width;
  let y = (ny - 0.5) * page.height;
  if (isCutCorner(x, y)) {
    const right = page.width / 2;
    const top = page.height / 2;
    y = top - page.fold + (page.fold - (x - (right - page.fold))) * 0.82;
  }
  return [x, y, page.depth * 0.5 + (random() - 0.5) * 0.012];
}

function scatteredPoint(base, random) {
  const nx = base[0] / page.width + 0.5;
  const ny = base[1] / page.height + 0.5;
  const u = clamp(nx + (random() - 0.5) * 0.06, 0, 1);
  // Band height ≈ 80% of the hero viewport: visible height at the particle camera is ≈ 9.33 units, so ±3.7 at the extreme; the band uses ±3.4 to keep clear of the header.
  const wave = Math.sin(u * Math.PI * 2.2 + 0.6) * 0.22 + Math.sin(u * Math.PI * 5.3) * 0.07;
  const thickness = (ny - 0.5) * 6.3 + (random() - 0.5) * 0.4;
  return [
    clamp((u - 0.5) * 8.3, -4.15, 4.15),
    clamp(wave + thickness, -3.4, 3.4),
    clamp((random() - 0.5) * 1.1 + Math.sin(u * Math.PI * 3.1) * 0.18, -1.2, 1.2),
  ];
}

const formations = [[], [], [], []];
for (let index = 0; index < particleCount; index++) {
  const baseRandom = mulberry32(0xd0c000 + index * 17);
  const scatterRandom = mulberry32(0xd0c100 + index * 31);
  const resolvedRandom = mulberry32(0xd0c300 + index * 61);
  const base = resolvedPagePoint(index, baseRandom);
  const flat = flatPagePoint(index, resolvedRandom);
  formations[0].push(scatteredPoint(base, scatterRandom));
  formations[1].push(base);
  formations[2].push(flat);
  formations[3].push(flat);
}

const positionPixels = new Float32Array(size * size * 3);
const scalePixels = new Uint8Array(size * size * 3);
const colorPixels = new Uint8Array(size * size * 3);
const visaColorPixels = new Uint8Array(bankSize * bankSize * 3);

const palette = {
  paper: [180, 181, 180],
  paperLight: [232, 225, 213],
  ivory: [246, 242, 233],
  champagne: [214, 190, 147],
  navy: [4, 30, 66],
  navySoft: [64, 83, 109],
  ink: [4, 30, 66],
};

// A deliberately coarse 40x40 glyph mask. The renderer displays a 40x40
// sub-grid of the 100x100 simulation on desktop, so every stroke is at least
// two visible document cells wide and remains legible after sub-sampling.
function inRect(x, y, x0, y0, x1, y1) {
  return x >= x0 && x <= x1 && y >= y0 && y <= y1;
}

function distanceToSegment(x, y, ax, ay, bx, by) {
  const dx = bx - ax;
  const dy = by - ay;
  const lengthSquared = dx * dx + dy * dy;
  const t = lengthSquared > 0 ? clamp(((x - ax) * dx + (y - ay) * dy) / lengthSquared, 0, 1) : 0;
  return Math.hypot(x - (ax + dx * t), y - (ay + dy * t));
}

function isVisaLetterCell(x, y) {
  // V
  const v = distanceToSegment(x + 0.5, y + 0.5, 2.5, 12, 6, 27.5) <= 1.15
    || distanceToSegment(x + 0.5, y + 0.5, 9.5, 12, 6, 27.5) <= 1.15;

  // I
  const i = inRect(x, y, 12, 12, 17, 13)
    || inRect(x, y, 14, 14, 15, 25)
    || inRect(x, y, 12, 26, 17, 27);

  // S
  const s = inRect(x, y, 20, 12, 27, 13)
    || inRect(x, y, 20, 14, 21, 18)
    || inRect(x, y, 20, 19, 27, 20)
    || inRect(x, y, 26, 21, 27, 25)
    || inRect(x, y, 20, 26, 27, 27);

  // А: two diagonals, a two-cell crossbar and a reinforced apex.
  const a = distanceToSegment(x + 0.5, y + 0.5, 33, 12, 28.5, 27.5) <= 1.15
    || distanceToSegment(x + 0.5, y + 0.5, 33, 12, 37.5, 27.5) <= 1.15
    || inRect(x, y, 30, 20, 36, 21)
    || inRect(x, y, 32, 12, 34, 13);

  return v || i || s || a;
}

for (let y = 0; y < bankSize; y++) {
  for (let x = 0; x < bankSize; x++) {
    const cellX = Math.min(39, Math.floor(((x + 0.5) * 40) / bankSize));
    const cellY = Math.min(39, Math.floor(((y + 0.5) * 40) / bankSize));
    const isLetter = isVisaLetterCell(cellX, cellY);
    const isChampagne = ((cellX * 11 + cellY * 7) % 23) < 4;
    const color = isLetter ? palette.navy : isChampagne ? palette.champagne : palette.ivory;
    visaColorPixels.set(color, (y * bankSize + x) * 3);
  }
}

function pickPaperColor(target, position, random) {
  const [x, y] = position;
  const isResolvedDocument = target === 1 || target === 3;

  if (isResolvedDocument && isFold(x, y)) return palette.champagne;
  if (isResolvedDocument && y > 2.35 && y < 2.7 && x < 0.65) return palette.navy;

  const lineBands = target === 3 ? [1.35, 0.78, 0.21, -1.05, -1.62] : [1.25, 0.58, -0.12, -1.38];
  if (isResolvedDocument && lineBands.some((line) => Math.abs(y - line) < 0.105) && x < 1.65) {
    return random() > 0.82 ? palette.champagne : palette.ink;
  }

  if (target === 0) {
    const colors = [palette.paper, palette.champagne, palette.navySoft, palette.navy, palette.navySoft];
    return colors[Math.floor(random() * colors.length)];
  }

  const value = random();
  if (value < 0.68) return palette.paper;
  if (value < 0.85) return palette.paperLight;
  if (value < 0.94) return palette.champagne;
  if (value < 0.975) return palette.navySoft;
  return palette.navy;
}

for (let target = 0; target < 4; target++) {
  const bankX = (target % 2) * bankSize;
  const bankY = Math.floor(target / 2) * bankSize;

  for (let index = 0; index < particleCount; index++) {
    const localX = index % bankSize;
    const localY = Math.floor(index / bankSize);
    const pixelX = bankX + localX;
    const pixelY = bankY + localY;
    const pixelIndex = (pixelY * size + pixelX) * 3;
    const texturePosition = worldToTexture(formations[target][index]);
    // Keep both stamp banks identical in position, scale and color.
    const materialTarget = target === 2 ? 3 : target;
    const random = mulberry32(0xc01000 + materialTarget * 100_003 + index * 73);
    const scale = target === 0 ? 0.78 + random() * 0.4 : 0.38 + random() * 0.24;
    const color = pickPaperColor(materialTarget, formations[target][index], random);

    positionPixels.set(texturePosition, pixelIndex);
    const scaleByte = Math.round(clamp(scale, 0, 1) * 255);
    scalePixels.set([scaleByte, scaleByte, scaleByte], pixelIndex);
    colorPixels.set(color, pixelIndex);
  }
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const typeBuffer = Buffer.from(type);
  const chunk = Buffer.alloc(12 + data.length);
  chunk.writeUInt32BE(data.length, 0);
  typeBuffer.copy(chunk, 4);
  data.copy(chunk, 8);
  chunk.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 8 + data.length);
  return chunk;
}

function writeRgbPng(path, width, height, pixels) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header[8] = 8;
  header[9] = 2;
  const scanlines = Buffer.alloc(height * (width * 3 + 1));
  for (let y = 0; y < height; y++) {
    const destination = y * (width * 3 + 1);
    scanlines[destination] = 0;
    Buffer.from(pixels.buffer, pixels.byteOffset + y * width * 3, width * 3).copy(scanlines, destination + 1);
  }
  writeFileSync(path, Buffer.concat([
    signature,
    pngChunk("IHDR", header),
    pngChunk("IDAT", deflateSync(scanlines, { level: 9 })),
    pngChunk("IEND", Buffer.alloc(0)),
  ]));
}

function writePfm(path, width, height, pixels) {
  const header = Buffer.from(`PF\n${width} ${height}\n-1.0\n`);
  const body = Buffer.alloc(width * height * 3 * 4);
  let offset = 0;
  for (let y = height - 1; y >= 0; y--) {
    for (let x = 0; x < width; x++) {
      const source = (y * width + x) * 3;
      body.writeFloatLE(pixels[source], offset);
      body.writeFloatLE(pixels[source + 1], offset + 4);
      body.writeFloatLE(pixels[source + 2], offset + 8);
      offset += 12;
    }
  }
  writeFileSync(path, Buffer.concat([header, body]));
}

const sheet = {
  right: 0.36,
  top: 0.5,
  foldX: 0.16,
  foldY: 0.19,
};

// Two levels of detail share one silhouette and UV layout:
// - core: ~80 triangles, used by the 10k/5k instanced formation;
// - near: ~1k triangles, used by the 180/48 close foreground sheets.
const documentLods = {
  core: {
    cols: 3,
    rows: 4,
    thickness: 0.045,
    curl: 0.018,
    wave: 0.004,
    bevel: 0,
    wobble: 0,
    flapSegments: 2,
    flapLift: 0.022,
    flapUnderside: false,
    flapWalls: false,
  },
  near: {
    cols: 10,
    rows: 14,
    thickness: 0.02,
    curl: 0.026,
    wave: 0.006,
    bevel: 0.006,
    wobble: 0.0035,
    flapSegments: 6,
    flapLift: 0.05,
    flapUnderside: true,
    flapWalls: true,
  },
};

function createDocumentGeometry(lod) {
  const { cols, rows, thickness, curl, wave, bevel, wobble, flapSegments, flapLift, flapUnderside, flapWalls } = lod;
  const R = sheet.right;
  const T = sheet.top;
  const fx = sheet.foldX;
  const fy = sheet.foldY;
  const h = thickness / 2;
  const positions = [];
  const normals = [];
  const uvs = [];
  const indices = [];
  const smoothTriangles = [];
  const wobbleRandom = mulberry32(0xd0c5ee7);

  const normalize = (v) => {
    const length = Math.hypot(...v);
    return length > 1e-9 ? v.map((value) => value / length) : [0, 0, 1];
  };
  const surface = (x, y) => curl * ((x / R) ** 2 - 0.33) + wave * Math.sin(y * Math.PI * 1.3 + x * 2.1);
  const uvOf = (x, y) => [(x + R) / (2 * R), y + T];
  const cornerOf = (x, y) => [(x - (R - fx)) / fx, (y - (T - fy)) / fy];
  const fromCorner = (a, b) => [R - fx + a * fx, T - fy + b * fy];

  function project(x, y) {
    const [a, b] = cornerOf(x, y);
    if (a <= 0 || b <= 0 || a + b <= 1) return [x, y, false];
    const excess = (a + b - 1) / 2;
    return [...fromCorner(a - excess, b - excess), true];
  }

  function breakpoints(count, min, max, forced) {
    const values = Array.from({ length: count + 1 }, (_, index) => min + ((max - min) * index) / count);
    let best = 1;
    for (let index = 1; index < count; index++) {
      if (Math.abs(values[index] - forced) < Math.abs(values[best] - forced)) best = index;
    }
    values[best] = forced;
    return values;
  }

  function addVertex(position, normal, uv) {
    positions.push(...position);
    normals.push(...normal);
    uvs.push(...uv);
    return positions.length / 3 - 1;
  }

  function vertex(index) {
    return [positions[index * 3], positions[index * 3 + 1], positions[index * 3 + 2]];
  }

  // Adds a triangle and flips its winding if it disagrees with the vertex normals.
  function addTriangle(a, b, c, smooth = false) {
    const pa = vertex(a);
    const pb = vertex(b);
    const pc = vertex(c);
    const ab = pb.map((value, index) => value - pa[index]);
    const ac = pc.map((value, index) => value - pa[index]);
    const face = [ab[1] * ac[2] - ab[2] * ac[1], ab[2] * ac[0] - ab[0] * ac[2], ab[0] * ac[1] - ab[1] * ac[0]];
    let expected = [0, 0, 0];
    for (const index of [a, b, c]) {
      expected = expected.map((value, axis) => value + normals[index * 3 + axis]);
    }
    const dot = face[0] * expected[0] + face[1] * expected[1] + face[2] * expected[2];
    const triangle = dot < 0 ? [a, c, b] : [a, b, c];
    indices.push(...triangle);
    if (smooth) smoothTriangles.push(triangle);
  }

  // Main sheet surfaces.
  const xs = breakpoints(cols, -R, R, R - fx);
  const ys = breakpoints(rows, -T, T, T - fy);
  const grid = [];
  for (let j = 0; j <= rows; j++) {
    const row = [];
    for (let i = 0; i <= cols; i++) {
      const [px, py, projected] = project(xs[i], ys[j]);
      let x = px;
      let y = py;
      const uv = uvOf(x, y);
      if (wobble && !projected) {
        const offset = (wobbleRandom() - 0.5) * 2 * wobble;
        if (i === 0) x -= offset;
        if (i === cols) x += offset;
        if (j === 0) y -= offset;
        if (j === rows) y += offset;
      }
      const z = surface(x, y);
      row.push({
        x,
        y,
        z,
        front: addVertex([x, y, z + h], [0, 0, 1], uv),
        back: addVertex([x, y, z - h], [0, 0, -1], [uv[0] + 2, uv[1]]),
      });
    }
    grid.push(row);
  }

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const v00 = grid[j][i];
      const v10 = grid[j][i + 1];
      const v11 = grid[j + 1][i + 1];
      const v01 = grid[j + 1][i];
      addTriangle(v00.front, v10.front, v11.front, true);
      addTriangle(v00.front, v11.front, v01.front, true);
      addTriangle(v00.back, v11.back, v10.back, true);
      addTriangle(v00.back, v01.back, v11.back, true);
    }
  }

  // Edge walls with an optional micro bevel.
  const loop = [];
  for (let i = 0; i < cols; i++) loop.push(grid[0][i]);
  for (let j = 0; j < rows; j++) loop.push(grid[j][cols]);
  for (let i = cols; i > 0; i--) loop.push(grid[rows][i]);
  for (let j = rows; j > 0; j--) loop.push(grid[j][0]);

  const outward = loop.map((point, index) => {
    const previous = loop[(index - 1 + loop.length) % loop.length];
    const next = loop[(index + 1) % loop.length];
    let sum = [0, 0];
    for (const [from, to] of [[previous, point], [point, next]]) {
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const length = Math.hypot(dx, dy);
      if (length > 1e-6) sum = [sum[0] + dy / length, sum[1] - dx / length];
    }
    const length = Math.hypot(...sum) || 1;
    return [sum[0] / length, sum[1] / length];
  });

  const ringSpecs = bevel
    ? [
        { out: 0, dz: h, n: [0.75, 0.66] },
        { out: bevel, dz: h - bevel, n: [1, 0.2] },
        { out: bevel, dz: -h + bevel, n: [1, -0.2] },
        { out: 0, dz: -h, n: [0.75, -0.66] },
      ]
    : [
        { out: 0, dz: h, n: [0.85, 0.5] },
        { out: 0, dz: -h, n: [0.85, -0.5] },
      ];

  const rings = ringSpecs.map((spec, ringIndex) =>
    loop.map((point, index) => {
      const [nx, ny] = outward[index];
      const normal = normalize([nx * spec.n[0], ny * spec.n[0], spec.n[1]]);
      return addVertex(
        [point.x + nx * spec.out, point.y + ny * spec.out, point.z + spec.dz],
        normal,
        [index / loop.length, ringIndex / (ringSpecs.length - 1)],
      );
    }),
  );

  for (let ring = 0; ring < rings.length - 1; ring++) {
    for (let index = 0; index < loop.length; index++) {
      const next = (index + 1) % loop.length;
      const a = rings[ring][index];
      const b = rings[ring][next];
      const c = rings[ring + 1][next];
      const d = rings[ring + 1][index];
      addTriangle(a, d, b);
      addTriangle(b, d, c);
    }
  }

  // Dog-ear: the cut-off corner folded back over the front face.
  const flapTop = [];
  const flapBottom = [];
  for (let j = 0; j <= flapSegments; j++) {
    flapTop.push([]);
    flapBottom.push([]);
    for (let i = 0; i <= flapSegments - j; i++) {
      const a = i / flapSegments;
      const b = j / flapSegments;
      const [x, y] = fromCorner(a, b);
      const fold = 1 - (a + b);
      const base = surface(x, y) + h + 0.0015 + flapLift * fold ** 1.7;
      const original = uvOf(...fromCorner(1 - b, 1 - a));
      flapTop[j].push(addVertex([x, y, base + thickness], [0, 0, 1], [original[0] + 2, original[1] + 2]));
      flapBottom[j].push(flapUnderside ? addVertex([x, y, base], [0, 0, -1], [original[0], original[1] + 2]) : -1);
    }
  }

  for (let j = 0; j < flapSegments; j++) {
    for (let i = 0; i < flapSegments - j; i++) {
      addTriangle(flapTop[j][i], flapTop[j][i + 1], flapTop[j + 1][i], true);
      if (flapUnderside) addTriangle(flapBottom[j][i], flapBottom[j + 1][i], flapBottom[j][i + 1], true);
      if (i + j < flapSegments - 1) {
        addTriangle(flapTop[j][i + 1], flapTop[j + 1][i + 1], flapTop[j + 1][i], true);
        if (flapUnderside) addTriangle(flapBottom[j][i + 1], flapBottom[j + 1][i], flapBottom[j + 1][i + 1], true);
      }
    }
  }

  if (flapWalls) {
    const walls = [
      { points: Array.from({ length: flapSegments + 1 }, (_, j) => [0, j]), normal: [-1, 0] },
      { points: Array.from({ length: flapSegments + 1 }, (_, i) => [i, 0]), normal: [0, -1] },
    ];
    for (const wall of walls) {
      const top = [];
      const bottom = [];
      wall.points.forEach(([i, j], index) => {
        const topPosition = vertex(flapTop[j][i]);
        const normal = normalize([wall.normal[0], wall.normal[1], 0.15]);
        const uvX = index / flapSegments;
        top.push(addVertex(topPosition, normal, [uvX, 0]));
        bottom.push(addVertex([topPosition[0], topPosition[1], topPosition[2] - thickness], normal, [uvX, 1]));
      });
      for (let index = 0; index < flapSegments; index++) {
        addTriangle(top[index], bottom[index], top[index + 1]);
        addTriangle(top[index + 1], bottom[index], bottom[index + 1]);
      }
    }
  }

  // Smooth normals for the curved paper surfaces.
  const accumulated = new Map();
  for (const [a, b, c] of smoothTriangles) {
    const pa = vertex(a);
    const pb = vertex(b);
    const pc = vertex(c);
    const ab = pb.map((value, index) => value - pa[index]);
    const ac = pc.map((value, index) => value - pa[index]);
    const face = [ab[1] * ac[2] - ab[2] * ac[1], ab[2] * ac[0] - ab[0] * ac[2], ab[0] * ac[1] - ab[1] * ac[0]];
    for (const index of [a, b, c]) {
      const current = accumulated.get(index) || [0, 0, 0];
      accumulated.set(index, current.map((value, axis) => value + face[axis]));
    }
  }
  for (const [index, sum] of accumulated) {
    if (Math.hypot(...sum) < 1e-12) continue;
    const normal = normalize(sum);
    normals[index * 3] = normal[0];
    normals[index * 3 + 1] = normal[1];
    normals[index * 3 + 2] = normal[2];
  }

  if (positions.length / 3 > 65535) throw new Error("Document LOD exceeds 16-bit index range");

  return {
    positions: new Float32Array(positions),
    normals: new Float32Array(normals),
    uvs: new Float32Array(uvs),
    indices: new Uint16Array(indices),
  };
}

function pad4(buffer, byte = 0) {
  const padding = (4 - (buffer.length % 4)) % 4;
  return padding ? Buffer.concat([buffer, Buffer.alloc(padding, byte)]) : buffer;
}

function writeDocumentGlb(path, lod) {
  const geometry = createDocumentGeometry(lod);
  const positionBuffer = Buffer.from(geometry.positions.buffer);
  const normalBuffer = Buffer.from(geometry.normals.buffer);
  const uvBuffer = Buffer.from(geometry.uvs.buffer);
  const indexBuffer = Buffer.from(geometry.indices.buffer);
  const parts = [positionBuffer, normalBuffer, uvBuffer, indexBuffer];
  const offsets = [];
  let byteOffset = 0;
  for (const part of parts) {
    offsets.push(byteOffset);
    byteOffset += part.length;
  }
  const binary = pad4(Buffer.concat(parts));
  const positionValues = [...geometry.positions];
  const xs = positionValues.filter((_, index) => index % 3 === 0);
  const ys = positionValues.filter((_, index) => index % 3 === 1);
  const zs = positionValues.filter((_, index) => index % 3 === 2);
  const vertexCount = geometry.positions.length / 3;
  const gltf = {
    asset: { generator: "Dala document particle generator", version: "2.0" },
    scene: 0,
    scenes: [{ nodes: [0] }],
    nodes: [{ mesh: 0, name: "document-particle" }],
    meshes: [{
      name: "document-particle-mesh",
      primitives: [{ attributes: { POSITION: 0, NORMAL: 1, TEXCOORD_0: 2 }, indices: 3 }],
    }],
    accessors: [
      { bufferView: 0, componentType: 5126, count: vertexCount, type: "VEC3", min: [Math.min(...xs), Math.min(...ys), Math.min(...zs)], max: [Math.max(...xs), Math.max(...ys), Math.max(...zs)] },
      { bufferView: 1, componentType: 5126, count: vertexCount, type: "VEC3" },
      { bufferView: 2, componentType: 5126, count: vertexCount, type: "VEC2" },
      { bufferView: 3, componentType: 5123, count: geometry.indices.length, type: "SCALAR" },
    ],
    bufferViews: [
      { buffer: 0, byteOffset: offsets[0], byteLength: positionBuffer.length, target: 34962 },
      { buffer: 0, byteOffset: offsets[1], byteLength: normalBuffer.length, target: 34962 },
      { buffer: 0, byteOffset: offsets[2], byteLength: uvBuffer.length, target: 34962 },
      { buffer: 0, byteOffset: offsets[3], byteLength: indexBuffer.length, target: 34963 },
    ],
    buffers: [{ byteLength: binary.length }],
  };
  const json = pad4(Buffer.from(JSON.stringify(gltf)), 0x20);
  const header = Buffer.alloc(12);
  header.writeUInt32LE(0x46546c67, 0);
  header.writeUInt32LE(2, 4);
  header.writeUInt32LE(12 + 8 + json.length + 8 + binary.length, 8);
  const jsonHeader = Buffer.alloc(8);
  jsonHeader.writeUInt32LE(json.length, 0);
  jsonHeader.writeUInt32LE(0x4e4f534a, 4);
  const binaryHeader = Buffer.alloc(8);
  binaryHeader.writeUInt32LE(binary.length, 0);
  binaryHeader.writeUInt32LE(0x004e4942, 4);
  writeFileSync(path, Buffer.concat([header, jsonHeader, json, binaryHeader, binary]));
  return { vertices: vertexCount, triangles: geometry.indices.length / 3 };
}

const pfmPath = join(imagesDir, ".document-positions.pfm");
const exrPath = join(imagesDir, "document-positions.exr");
writePfm(pfmPath, size, size, positionPixels);

try {
  // The legacy EXR decoder bundled with the original animation only supports
  // uncompressed scanlines. ZIP-compressed EXR files fail at runtime.
  execFileSync("ffmpeg", ["-loglevel", "error", "-y", "-i", pfmPath, "-frames:v", "1", exrPath]);
} catch (error) {
  if (!existsSync(exrPath)) throw new Error("ffmpeg is required to generate document-positions.exr", { cause: error });
} finally {
  if (existsSync(pfmPath)) unlinkSync(pfmPath);
}

writeRgbPng(join(imagesDir, "document-scales.png"), size, size, scalePixels);
writeRgbPng(join(imagesDir, "document-colors.png"), size, size, colorPixels);
writeRgbPng(join(imagesDir, "document-visa-colors.png"), bankSize, bankSize, visaColorPixels);
const coreStats = writeDocumentGlb(join(modelsDir, "document-core.glb"), documentLods.core);
const nearStats = writeDocumentGlb(join(modelsDir, "document-near.glb"), documentLods.near);

console.log(`Generated document-core.glb (${coreStats.triangles} triangles), document-near.glb (${nearStats.triangles} triangles), four deterministic formations and document-visa-colors.png.`);
