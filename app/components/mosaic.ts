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
export function prepareCanvas(canvas: HTMLCanvasElement, w: number, h: number) {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.scale(dpr, dpr);
  return ctx;
}

// The round "APPROVED" imprint made of squares: two rings, "OK" in the pixel font around the band, a check in the middle.
export function drawStampMark(canvas: HTMLCanvasElement, inkColor?: string) {
  const SC = 4;
  const N = 50;
  const ctx = prepareCanvas(canvas, N * SC, N * SC);
  if (!ctx) return;
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
  // thick check mark in the middle
  const pts: Array<[number, number]> = [[19, 25.5], [23.5, 30], [31.5, 20.5]];
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      const px = col + 0.5;
      const py = row + 0.5;
      for (let i = 0; i < pts.length - 1; i++) {
        const [x0, y0] = pts[i];
        const [x1, y1] = pts[i + 1];
        const t = Math.max(0, Math.min(1, ((px - x0) * (x1 - x0) + (py - y0) * (y1 - y0)) / ((x1 - x0) ** 2 + (y1 - y0) ** 2)));
        if (Math.hypot(px - (x0 + t * (x1 - x0)), py - (y0 + t * (y1 - y0))) <= 1.2) ink[row][col] = true;
      }
    }
  }
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      if (!ink[row][col] || rnd() < 0.1) continue; // ~10% holes: an uneven imprint
      const color = inkColor ? jit(hexc(inkColor), 14) : rnd() < 0.2 ? jit(VIOLET, 12) : jit(TITLE, 14);
      const size = SC * (0.9 + rnd() * 0.1);
      ctx.fillStyle = `rgb(${color[0] | 0},${color[1] | 0},${color[2] | 0})`;
      ctx.fillRect(col * SC + (rnd() - 0.5) * 0.8, row * SC + (rnd() - 0.5) * 0.8, size, size);
    }
  }
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
