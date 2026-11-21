export const hexc = (s: string): [number, number, number] => [1, 3, 5].map((i) => parseInt(s.slice(i, i + 2), 16)) as [number, number, number];
// Brand palette, same as the document sheet (scripts/generate-hero-document.py): navy / champagne / ivory.
export const BODY = hexc("#d2cdc2");
export const PAPER = [240, 236, 226]; // the visa body: as bright as the sheet it lies on once the engine has lit it
export const TITLE = hexc("#0b2a58");
export const TEXT = hexc("#1d3a66");
export const VIOLET = hexc("#0b2a58");
export const TEAL = hexc("#d6be93");
export const AMBER = hexc("#d6be93");
export const LILAC = hexc("#f6f2e9");
export const FOLD: [number, number, number] = [176, 164, 140];
export const LIGHT = hexc("#f6f2e9");
export const FONT: Record<string, string[]> = {
  V: ["10001", "10001", "10001", "10001", "10001", "01010", "00100"],
  I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
  L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
  O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  K: ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
};

// ---- shared helpers for the mosaic drawings (visa, stamp and stamp imprint all use the document's squares) ----
export const clamp255 = (v: number) => Math.max(0, Math.min(255, v));
export const mix = (a: number[], b: number[], t: number) => a.map((v, i) => v * (1 - t) + b[i] * t);
export const makeRng = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
// A mosaic is kept as a list of squares so it can be redrawn every frame with the hover motion of the document particles
// (see DocumentStamp): x / y is the top-left corner in canvas px, s the side, r1 / r2 constant randoms like a_random.
export type Cell = { x: number; y: number; s: number; color: string; r1: number; r2: number; tile?: { sx: number; sy: number; sw: number; sh: number } };
export type Mosaic = { w: number; h: number; cells: Cell[]; overlay?: HTMLCanvasElement };
// Offset (canvas px) and scale of one square under the cursor, or null when the square is out of reach.
export type Hover = (cx: number, cy: number, r1: number, r2: number) => [number, number, number] | null;

export const rgb = (c: number[]) => `rgb(${c[0] | 0},${c[1] | 0},${c[2] | 0})`;

// Second random stream for r1 / r2, so the main stream (and with it the look of every mosaic) is unchanged.
export const cellMaker = (cells: Cell[], seed: number) => {
  const r = makeRng(seed + 7777);
  return (x: number, y: number, s: number, color: string, tile?: Cell["tile"]) => cells.push({ x, y, s, color, r1: r(), r2: r(), tile });
};

// Draws a mosaic; with `hover` every square is moved / grown like the particles of the sheet under the cursor.
export function renderMosaic(ctx: CanvasRenderingContext2D, m: Mosaic, hover?: Hover) {
  ctx.clearRect(0, 0, m.w, m.h);
  for (const c of m.cells) {
    if (c.tile && !hover) continue; // at rest the overlay is drawn in one piece (below), no seams between tiles
    let { x, y, s } = c;
    const h = hover?.(x + s / 2, y + s / 2, c.r1, c.r2);
    if (h) {
      const s2 = s * h[2];
      x += h[0] - (s2 - s) / 2;
      y += h[1] - (s2 - s) / 2;
      s = s2;
    }
    if (c.tile && m.overlay) ctx.drawImage(m.overlay, c.tile.sx, c.tile.sy, c.tile.sw, c.tile.sh, x, y, s, s);
    else {
      ctx.fillStyle = c.color;
      ctx.fillRect(x, y, s, s);
    }
  }
  if (!hover && m.overlay) ctx.drawImage(m.overlay, 0, 0, m.w, m.h);
}

export function paintMosaic(canvas: HTMLCanvasElement, m: Mosaic) {
  const ctx = prepareCanvas(canvas, m.w, m.h);
  if (ctx) renderMosaic(ctx, m);
  return ctx;
}

export function prepareCanvas(canvas: HTMLCanvasElement, w: number, h: number) {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.scale(dpr, dpr);
  return ctx;
}

// The round "APPROVED" imprint made of squares: two rings, "OK" in the pixel font around the band, the Cyprus flag in the middle.
export function drawStampMark(canvas: HTMLCanvasElement, inkColor?: string) {
  return paintMosaic(canvas, buildStampMark(inkColor));
}

export function buildStampMark(inkColor?: string): Mosaic {
  const SC = 4;
  const N = 50;
  const cells: Cell[] = [];
  const add = cellMaker(cells, 23);
  const rnd = makeRng(23);
  const jit = (c: number[], a: number) => {
    const d = (rnd() - 0.5) * 2 * a;
    return c.map((v) => clamp255(v + d));
  };
  const ink: boolean[][] = Array.from({ length: N }, () => Array<boolean>(N).fill(false));
  const c = N / 2;
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      const d = Math.hypot(col + 0.5 - c, row + 0.5 - c);
      if (Math.abs(d - 22) <= 1 || Math.abs(d - 19) <= 0.55 || Math.abs(d - 11.5) <= 0.55) ink[row][col] = true;
    }
  }
  // "OK·" five times along the band between the rings, letters upright towards the outside, reading clockwise
  const text = "OK·OK·OK·OK·OK·";
  const RMID = 15;
  const theta0 = 0.14;
  [...text].forEach((ch, slot) => {
    const rows = ch === "·" ? ["00000", "00000", "00000", "00100", "00000", "00000", "00000"] : FONT[ch];
    rows.forEach((line, gy) => [...line].forEach((bit, gx) => {
      if (bit !== "1") return;
      const theta = theta0 + (slot * 6 + gx) / RMID;
      const r = 18 - gy;
      const col = Math.floor(c + r * Math.sin(theta));
      const row = Math.floor(c - r * Math.cos(theta));
      if (col >= 0 && col < N && row >= 0 && row < N) ink[row][col] = true;
    }));
  });
  // the Cyprus flag in the middle: the island (Karpas peninsula to the north-east) over two olive branches
  const FLAG = [
    "00000000000000110",
    "01100000000011100",
    "01111111111111000",
    "11111111111111000",
    "01111111111110000",
    "00111111111100000",
    "00001111110000000",
    "00000011000000000",
    "00000000000000000",
    "01000000000000010",
    "00110100000101100",
    "00011110001111000",
    "00000011111000000",
  ];
  const r0 = c - Math.floor(FLAG.length / 2);
  const c0 = c - Math.floor(FLAG[0].length / 2);
  FLAG.forEach((line, y) => [...line].forEach((bit, x) => {
    if (bit === "1") ink[r0 + y][c0 + x] = true;
  }));
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      if (!ink[row][col] || rnd() < 0.1) continue; // ~10% holes: an uneven imprint
      const color = inkColor ? jit(hexc(inkColor), 14) : rnd() < 0.2 ? jit(VIOLET, 12) : jit(TITLE, 14);
      const size = SC * (0.9 + rnd() * 0.1);
      add(col * SC + (rnd() - 0.5) * 0.8, row * SC + (rnd() - 0.5) * 0.8, size, rgb(color));
    }
  }
  return { w: N * SC, h: N * SC, cells };
}

// A bold check mark made of squares, in the given colour (hex), for the investor marks.
export function drawCheckMark(canvas: HTMLCanvasElement, color: string, seed = 5) {
  const SC = 4;
  const N = 30;
  const ctx = prepareCanvas(canvas, N * SC, N * SC);
  if (!ctx) return;
  const rnd = makeRng(seed);
  const base = hexc(color);
  const pts: Array<[number, number]> = [[5, 16], [12, 23], [25, 7]];
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      const px = col + 0.5;
      const py = row + 0.5;
      let hit = false;
      for (let i = 0; i < pts.length - 1 && !hit; i++) {
        const [x0, y0] = pts[i];
        const [x1, y1] = pts[i + 1];
        const t = Math.max(0, Math.min(1, ((px - x0) * (x1 - x0) + (py - y0) * (y1 - y0)) / ((x1 - x0) ** 2 + (y1 - y0) ** 2)));
        hit = Math.hypot(px - (x0 + t * (x1 - x0)), py - (y0 + t * (y1 - y0))) <= 2.2;
      }
      if (!hit || rnd() < 0.1) continue;
      const d = (rnd() - 0.5) * 28;
      const c = base.map((v) => clamp255(v + d));
      const size = SC * (0.9 + rnd() * 0.1);
      ctx.fillStyle = `rgb(${c[0] | 0},${c[1] | 0},${c[2] | 0})`;
      ctx.fillRect(col * SC + (rnd() - 0.5) * 0.8, row * SC + (rnd() - 0.5) * 0.8, size, size);
    }
  }
}

// The FMB logo (a PNG asset) as a stamp imprint made of squares: the picture is sampled cell by cell, its dark blue /
// black ink becomes the site navy, its yellow stars the site gold, transparent cells stay empty.

// The site gold, deepened so it still reads as ink on the paper under mix-blend-mode: multiply.
const GOLD_INK = mix(AMBER, [150, 105, 35], 0.55);

export function drawLogoMark(canvas: HTMLCanvasElement, src: string, done?: (m: Mosaic, ctx: CanvasRenderingContext2D) => void) {
  buildLogoMark(src, (m) => {
    const ctx = paintMosaic(canvas, m);
    if (ctx) done?.(m, ctx);
  });
}

export function buildLogoMark(src: string, done: (m: Mosaic) => void) {
  const img = new Image();
  img.onload = () => {
    // bounding box of the opaque pixels, read on a small copy
    const probe = document.createElement("canvas");
    const pw = 300;
    const ph = Math.round((pw * img.height) / img.width);
    probe.width = pw;
    probe.height = ph;
    const pctx = probe.getContext("2d", { willReadFrequently: true });
    if (!pctx) return;
    pctx.drawImage(img, 0, 0, pw, ph);
    const pd = pctx.getImageData(0, 0, pw, ph).data;
    let x0 = pw, y0 = ph, x1 = 0, y1 = 0;
    for (let y = 0; y < ph; y++) for (let x = 0; x < pw; x++) {
      if (pd[(y * pw + x) * 4 + 3] < 100) continue;
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    }
    if (x1 < x0) return;
    // the logo fitted into a square N x N grid
    const SC = 3;
    const N = 72;
    const side = Math.max(x1 - x0, y1 - y0) + 1;
    const cx = (x0 + x1 + 1) / 2;
    const cy = (y0 + y1 + 1) / 2;
    const grid = document.createElement("canvas");
    grid.width = N;
    grid.height = N;
    const gctx = grid.getContext("2d", { willReadFrequently: true });
    if (!gctx) return;
    const k = img.width / pw;
    gctx.drawImage(img, (cx - side / 2) * k, (cy - side / 2) * k, side * k, side * k, 0, 0, N, N);
    const gd = gctx.getImageData(0, 0, N, N).data;

    const cells: Cell[] = [];
    const add = cellMaker(cells, 29);
    const rnd = makeRng(23);
    const jit = (c: number[], a: number) => {
      const d = (rnd() - 0.5) * 2 * a;
      return c.map((v) => clamp255(v + d));
    };

    // The lettering ("F.M.B. VIP / IMMIGRATION / SERVICES") is too fine for the N x N grid, so it is taken from the PNG
    // at full resolution: the dark, non-blue pixels in the middle of the ring, recoloured to the stamp ink.
    const T = N * SC * Math.min(2, window.devicePixelRatio || 1); // the backing store size, so the text is as sharp as the screen allows
    const text = document.createElement("canvas");
    text.width = T;
    text.height = T;
    const tctx = text.getContext("2d", { willReadFrequently: true });
    if (!tctx) return;
    tctx.drawImage(img, (cx - side / 2) * k, (cy - side / 2) * k, side * k, side * k, 0, 0, T, T);
    const td = tctx.getImageData(0, 0, T, T);
    const tp = td.data;
    const R = T / 2;
    const textR = 0.6 * R; // inside the stars
    for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
      const i = (y * T + x) * 4;
      const [r, g, b, a] = [tp[i], tp[i + 1], tp[i + 2], tp[i + 3]];
      const dark = Math.max(r, g, b);
      const isText = a > 40 && b - r < 40 && dark < 200 && Math.hypot(x - R, y - R) < textR;
      const ink = isText ? Math.min(1, (200 - dark) / 140) : 0; // black letters full ink, their grey shadow lighter
      tp[i] = TITLE[0];
      tp[i + 1] = TITLE[1];
      tp[i + 2] = TITLE[2];
      tp[i + 3] = clamp255(a * ink * (0.9 + rnd() * 0.2));
    }
    tctx.putImageData(td, 0, 0);
    // the cells the lettering covers are left to it, so the mosaic does not smear the letters
    const tgrid = document.createElement("canvas");
    tgrid.width = N;
    tgrid.height = N;
    const tgctx = tgrid.getContext("2d", { willReadFrequently: true });
    if (!tgctx) return;
    tgctx.drawImage(text, 0, 0, N, N);
    const tgd = tgctx.getImageData(0, 0, N, N).data;

    for (let row = 0; row < N; row++) {
      for (let col = 0; col < N; col++) {
        const i = (row * N + col) * 4;
        if (Math.hypot(col + 0.5 - N / 2, row + 0.5 - N / 2) < (textR / R) * (N / 2) && tgd[i + 3] > 10) continue; // lettering
        if (gd[i + 3] < 90 || rnd() < 0.1) continue; // transparent, or one of the ~10% holes of an uneven imprint
        const [r, g, b] = [gd[i], gd[i + 1], gd[i + 2]];
        const gold = r > 140 && g > 110 && b < 120;
        const color = gold ? jit(GOLD_INK, 12) : rnd() < 0.2 ? jit(VIOLET, 12) : jit(TITLE, 14);
        const size = SC * (0.9 + rnd() * 0.1);
        add(col * SC + (rnd() - 0.5) * 0.6, row * SC + (rnd() - 0.5) * 0.6, size, rgb(color));
      }
    }
    // the lettering on top, cut into one tile per grid cell so it moves with the squares under the cursor
    const tw = T / N;
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < N; col++) {
        if (tgd[(row * N + col) * 4 + 3] > 0) add(col * SC, row * SC, SC, "", { sx: col * tw, sy: row * tw, sw: tw, sh: tw });
      }
    }
    done({ w: N * SC, h: N * SC, cells, overlay: text });
  };
  img.src = src;
}
