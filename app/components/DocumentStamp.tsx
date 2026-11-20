"use client";

import { useEffect, useRef } from "react";
import { AMBER, BODY, FOLD, FONT, LIGHT, LILAC, PAPER, TEAL, TEXT, TITLE, VIOLET, clamp255, drawLogoMark, drawStampMark, makeRng, mix, prepareCanvas } from "./mosaic";

// Scene A: the stamp on the earlier document ("Spark lightbulb moments"), a pure function of the scroll
// progress published by the engine (window.__siteProgress), so scrolling back reverses it exactly.
// The stamp has lifted (4.15) just before "Spark lightbulb moments" sits in the middle of the screen (p ~4.17, the
// scroll stop in ScrollSnap.tsx).
const P = { approach: 3.8, press: 3.95, pressEnd: 4.03, lift: 4.15, inkStart: 3.97, scatter: 4.5, scatterEnd: 5 };

// Scene B: the last document at the end of the site is the same document, already carrying the stamp imprint
// (fades in while it forms, progress 5.7-5.95); then the visa is applied. The page ends at progress 6, so once
// the document has formed (p >= END_P) the visa plays on a timer (END_SECONDS) and rewinds when scrolling back.
const B = { show: 5.65, inkStart: 5.7, inkEnd: 5.95 };
const END_P = 5.95;
const END_SECONDS = 2.6;
const E = { visaIn: 0.25, visaInEnd: 0.5 };

const smooth = (v: number, a: number, b: number) => {
  const t = Math.max(0, Math.min(1, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

// ---- scene A is glued to the sheet ----
// The sheet is made of particles (WebGL); the engine exposes window.__siteProject(x, y, z): a point in the particle
// simulation space ((p - 0.5) * 2 * radius) -> CSS pixel, through the same matrices as the vertex shader.  The sheet in
// bank 2 (the one the stamp lands on) is the bank 0 sheet turned about Y by DOC_TILT, the pose it has on step 2.
const SHEET_W = 0.6; // sheet size in particle-space fractions, see scripts/generate-hero-document.py
const SHEET_H = 0.8;
const RADIUS = 4.35; // u_factor of the simulation
const DOC_TILT = -0.2 * Math.PI; // same constant as in scripts/generate-hero-streams.py
const STAMP_UV = [0.3, 0.2]; // where the imprint is centred on the sheet: from its left / bottom edge, 0..1
const STAMP_HALF = 1.25; // half side of the imprint canvas on the sheet, particle-space units (circle ~42% of the sheet width)
const MARK_HALF_PX = 95; // half side of the imprint canvas in CSS px (.document-stamp__mark is 190 px)
type Project = (x: number, y: number, z: number) => [number, number] | null;

// Scene B: the final sheet (bank 3, straight: the engine rotation sums to 0 at the end of the page).
const FINAL_TILT = 0;
const VISA_UV = [0.5, 0.62]; // centre of the visa on the sheet
const VISA_HALF_X = 1.45; // half width of the visa on the sheet (~55% of the sheet width)
const VISA_PX = [130, 82]; // half size of the visa canvas in CSS px (260 x 164)
const FINAL_MARK_UV = [0.31, 0.25]; // the FMB imprint on the final sheet, lower left, clear of the sheet edge
const FINAL_MARK_HALF = 0.9754; // 15% smaller than 1.1475 (15% smaller than 1.35 before)
const FINAL_MARK_PX = 100; // half of the 200 px canvas

// Point of the flat sheet at uv (0..1 from its left / bottom edge) plus an offset (dx right / dy up, in sheet units),
// turned about Y by `tilt` like the sheet itself (bank 2: DOC_TILT, the pose of step 2; the final bank 3 sheet: 0).
const sheetPoint = (uv: number[], dx: number, dy: number, tilt: number): [number, number, number] => {
  const x = (uv[0] - 0.5) * SHEET_W * 2 * RADIUS + dx;
  const y = (uv[1] - 0.5) * SHEET_H * 2 * RADIUS + dy;
  return [x * Math.cos(tilt), y, x * Math.sin(tilt)];
};

// Lays `el` flat on the sheet: its centre sits at uv, half its width / height is hx / hy in sheet units, and the engine
// projection gives the CSS matrix, so the element keeps the tilt and perspective of the sheet and follows it.  `hpx`/`hpy`
// are the matrix basis: half the element size in CSS px when `post` centres the element itself (translate(-hpx, -hpy)),
// or the extent of the content around the element origin when its children are already centred on it.
// Returns false when the engine is not there (yet), the caller then keeps the plain CSS position.
function glueToSheet(el: HTMLElement, uv: number[], hx: number, hy: number, tilt: number, hpx: number, hpy: number, post = "") {
  const project = (window as unknown as { __siteProject?: Project }).__siteProject;
  const c = project?.(...sheetPoint(uv, 0, 0, tilt));
  const px = project?.(...sheetPoint(uv, hx, 0, tilt));
  const py = project?.(...sheetPoint(uv, 0, hy, tilt));
  if (!c || !px || !py) {
    el.style.transform = "";
    el.style.left = "";
    el.style.top = "";
    el.style.transformOrigin = "";
    return false;
  }
  // unit vectors of the sheet in CSS px: x to the right of the sheet, y up on the sheet (CSS y points down)
  const a = (px[0] - c[0]) / hpx;
  const b = (px[1] - c[1]) / hpx;
  const cc = -(py[0] - c[0]) / hpy;
  const d = -(py[1] - c[1]) / hpy;
  el.style.left = "0";
  el.style.top = "0";
  el.style.transformOrigin = "0 0";
  el.style.transform = `matrix(${a}, ${b}, ${cc}, ${d}, ${c[0]}, ${c[1]}) ${post}`;
  return true;
}

// ---- visa drawn as a grainy mosaic, in the same palette as the document particles ----
const CELL = 6;
const COLS = 54;
const ROWS = 34;

function drawVisa(canvas: HTMLCanvasElement) {
  const W = COLS * CELL;
  const H = ROWS * CELL;
  const ctx = prepareCanvas(canvas, W, H);
  if (!ctx) return;
  const rnd = makeRng(7);
  const jit = (c: number[], a: number) => {
    const d = (rnd() - 0.5) * 2 * a;
    return c.map((v) => clamp255(v + d));
  };
  const cut = 8;
  const glyph = new Set<string>();
  "VISA".split("").forEach((ch, li) => {
    FONT[ch].forEach((row, r) => [...row].forEach((bit, c) => bit === "1" && glyph.add(`${3 + li * 6 + c},${1 + r}`)));
  });
  const rows: Array<[number, number]> = [[12, 30], [16, 26], [20, 20]];

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const u = col - (COLS - cut);
      const v = row;
      if (u >= 0 && v < cut && u > v) continue; // cut top-right corner
      let color: number[] = jit(PAPER, 20);
      if (u >= 0 && v < cut && v - u <= 2) color = jit(FOLD, 14); // folded flap
      else if (row <= 8) color = glyph.has(`${col},${row}`) ? jit(LIGHT, 8) : jit(TITLE, 12);
      else if (col >= 3 && col <= 15 && row >= 11 && row <= 25) {
        const dh = Math.hypot(col - 9, row - 16.5);
        const db = Math.hypot((col - 9) / 5.5, (row - 25) / 4.5);
        color = dh < 3.2 || db < 1 ? jit(LILAC, 10) : jit(mix(BODY, TEXT, 0.45), 10);
      } else if (col >= 19 && col <= 49 && rows.some(([r, len]) => (row === r || row === r + 1) && col < 19 + len)) {
        color = mix(jit(BODY, 20), jit(TEXT, 8), 0.85);
      } else if (row >= 27 && row <= 28 && col >= 3 && col <= 50) {
        const t = (col - 3) / 47;
        const base = t < 0.5 ? mix(VIOLET, TEAL, t * 2) : mix(TEAL, AMBER, (t - 0.5) * 2);
        color = rnd() < 0.8 ? jit(base, 14) : jit(LIGHT, 10);
      } else if ((row === 30 || row === 32) && col >= 3 && col <= 50 && rnd() < 0.55) {
        color = mix(jit(BODY, 20), jit(TEXT, 8), 0.75);
      }
      // amber glint on the fold
      if (u >= 0 && v < cut && Math.hypot(u - 3.5, v - 2.5) < 3.2 && rnd() < 0.6) color = jit(AMBER, 10);
      // ~4% violet / teal speckles
      if (rnd() < 0.04) color = jit(rnd() < 0.5 ? VIOLET : TEAL, 8);
      const edge = row === 0 || col === 0 || row === ROWS - 1 || col === COLS - 1;
      const j = edge ? 1.6 : 0.5;
      const s = CELL * (0.88 + rnd() * 0.12);
      ctx.fillStyle = `rgb(${color[0] | 0},${color[1] | 0},${color[2] | 0})`;
      ctx.fillRect(col * CELL + (rnd() - 0.5) * j, row * CELL + (rnd() - 0.5) * j, s, s);
    }
  }
}

// The stamp body (handle, collar, barrel, rubber pad) built from the same squares as the document.
function drawStampBody(canvas: HTMLCanvasElement) {
  const SC = 5;
  const COLS_B = 26;
  const ROWS_B = 34;
  const ctx = prepareCanvas(canvas, COLS_B * SC, ROWS_B * SC);
  if (!ctx) return;
  const rnd = makeRng(11);
  const jit = (c: number[], a: number) => {
    const d = (rnd() - 0.5) * 2 * a;
    return c.map((v) => clamp255(v + d));
  };
  const sx = COLS_B / 200;
  const sy = ROWS_B / 260;
  const inRR = (x: number, y: number, x0: number, y0: number, x1: number, y1: number, r: number) => {
    if (x < x0 || x > x1 || y < y0 || y > y1) return false;
    const cx = x < x0 + r ? x0 + r : x > x1 - r ? x1 - r : x;
    const cy = y < y0 + r ? y0 + r : y > y1 - r ? y1 - r : y;
    return Math.hypot(x - cx, y - cy) <= r;
  };
  type Kind = "handle" | "collar" | "body" | "pad" | null;
  const kind = (col: number, row: number): Kind => {
    const x = (col + 0.5) / sx;
    const y = (row + 0.5) / sy;
    if (inRR(x, y, 72, 0, 128, 86, 26)) return "handle";
    if (inRR(x, y, 30, 86, 170, 108, 8)) return "collar";
    if (inRR(x, y, 22, 108, 178, 228, 18)) return "body";
    if (((x - 100) / 78) ** 2 + ((y - 228) / 14) ** 2 <= 1) return "pad";
    return null;
  };
  const DARK = mix(TITLE, TEXT, 0.55);
  const PAD = mix(TEXT, [0, 0, 0], 0.5);
  for (let row = 0; row < ROWS_B; row++) {
    for (let col = 0; col < COLS_B; col++) {
      const k = kind(col, row);
      if (!k) continue;
      const x = (col + 0.5) / sx;
      const y = (row + 0.5) / sy;
      let color: number[];
      if (k === "handle") {
        const t = (x - 72) / 56;
        color = t < 0.28 ? jit(LILAC, 10) : jit(mix(TITLE, VIOLET, t), 12);
        if (Math.hypot(x - 112, y - 14) < 16 && rnd() < 0.55) color = jit(AMBER, 10); // glint, like the fold of the document
      } else if (k === "collar") color = jit(LILAC, 12);
      else if (k === "body") color = jit(x < 44 ? mix(DARK, VIOLET, 0.4) : DARK, 10);
      else color = jit(PAD, 8);
      if (rnd() < 0.04) color = jit(rnd() < 0.5 ? VIOLET : TEAL, 8); // violet / teal speckles
      const edge = !kind(col - 1, row) || !kind(col + 1, row) || !kind(col, row - 1) || !kind(col, row + 1);
      const j = edge ? 1.6 : 0.5;
      const size = SC * (0.88 + rnd() * 0.12);
      ctx.fillStyle = `rgb(${color[0] | 0},${color[1] | 0},${color[2] | 0})`;
      ctx.fillRect(col * SC + (rnd() - 0.5) * j, row * SC + (rnd() - 0.5) * j, size, size);
    }
  }
}


export default function DocumentStamp() {
  const rootA = useRef<HTMLDivElement>(null);
  const bodyA = useRef<HTMLDivElement>(null);
  const markA = useRef<HTMLDivElement>(null);
  const rootB = useRef<HTMLDivElement>(null);
  const markB = useRef<HTMLDivElement>(null);
  const visaB = useRef<HTMLCanvasElement>(null);
  const bodyCanvasA = useRef<HTMLCanvasElement>(null);
  const markCanvasA = useRef<HTMLCanvasElement>(null);
  const markCanvasB = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (visaB.current) drawVisa(visaB.current);
    if (bodyCanvasA.current) drawStampBody(bodyCanvasA.current);
    if (markCanvasA.current) drawStampMark(markCanvasA.current);
    if (markCanvasB.current) drawLogoMark(markCanvasB.current, "/images/FMB%20logo%20transparent.png");
    let raf = 0;
    let lastP = -1;
    let a = 0;
    let lastT = performance.now();

    const lower = (body: HTMLElement | null, mark: HTMLElement | null, approach: number, press: number, lift: number, ink: number) => {
      if (body) {
        const y = -(1 - approach) * 260 + lift * -200;
        const scale = 1 + 0.28 * (1 - approach) - 0.05 * press + 0.12 * lift;
        body.style.transform = `translateY(${y}px) scale(${scale})`;
        body.style.opacity = String(approach * (1 - lift));
      }
      if (mark) mark.style.opacity = String(ink);
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(0.1, (now - lastT) / 1000);
      lastT = now;
      const p: number = (window as unknown as { __siteProgress?: number }).__siteProgress ?? 0;

      // scene A (earlier document)
      if (Math.abs(p - lastP) >= 0.0005) {
        lastP = p;
        const approach = smooth(p, P.approach, P.press);
        const press = smooth(p, P.press, P.pressEnd);
        const lift = smooth(p, P.pressEnd, P.lift);
        const ink = smooth(p, P.inkStart, P.pressEnd) * (1 - smooth(p, P.scatter, P.scatterEnd));
        const visible = p > P.approach - 0.05 && p < P.scatterEnd;
        if (rootA.current) rootA.current.style.display = visible ? "block" : "none";
        lower(bodyA.current, markA.current, approach, press, lift, ink);
      }
      // Every frame (the document keeps easing after the scroll stops): glue the stamp to its spot on the sheet, in the
      // plane of the sheet, so it keeps the tilt of the document and travels, turns and scatters with it.
      if (rootA.current && p > P.approach - 0.05 && p < P.scatterEnd) glueToSheet(rootA.current, STAMP_UV, STAMP_HALF, STAMP_HALF, DOC_TILT, MARK_HALF_PX, MARK_HALF_PX);

      // scene B (last document): imprint follows the scroll, the visa is timer-driven and rewinds
      const target = p >= END_P ? 1 : 0;
      if (a !== target) {
        const step = dt / END_SECONDS;
        a = target > a ? Math.min(target, a + step) : Math.max(target, a - step);
      }
      const showB = p > B.show;
      if (rootB.current) rootB.current.style.display = showB ? "block" : "none";
      if (markB.current) markB.current.style.opacity = String(smooth(p, B.inkStart, B.inkEnd));
      if (visaB.current) visaB.current.style.opacity = String(smooth(a, E.visaIn, E.visaInEnd)); // fades in on the paper, no pop
      if (showB && rootB.current) {
        // both lie flat on the sheet and move with it; the matrices are in screen px, so the root sits at the screen origin
        const glued = [
          visaB.current && glueToSheet(visaB.current, VISA_UV, VISA_HALF_X, (VISA_HALF_X * VISA_PX[1]) / VISA_PX[0], FINAL_TILT, VISA_PX[0], VISA_PX[1], `translate(${-VISA_PX[0]}px, ${-VISA_PX[1]}px)`),
          markB.current && glueToSheet(markB.current, FINAL_MARK_UV, FINAL_MARK_HALF, FINAL_MARK_HALF, FINAL_TILT, FINAL_MARK_PX, FINAL_MARK_PX, `rotate(-12deg) translate(${-FINAL_MARK_PX}px, ${-FINAL_MARK_PX}px)`),
        ].every(Boolean);
        rootB.current.style.left = glued ? "0" : "";
        rootB.current.style.top = glued ? "0" : "";
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <style>{`
        .document-stamp { display: none; position: fixed; width: 0; height: 0; z-index: 5; pointer-events: none; }
        .document-stamp--a { left: 25%; top: 80%; }
        .document-stamp--b { left: 47%; top: 37.5%; z-index: -1; } /* on the sheet, under the footer copy */
        .document-stamp__mark { position: absolute; width: 190px; height: 190px; left: -95px; top: -95px; opacity: 0; transform: rotate(-12deg); mix-blend-mode: multiply; }
        .document-stamp__body { position: absolute; width: 130px; height: 169px; left: -65px; top: -150px; opacity: 0; transform-origin: 50% 100%; filter: drop-shadow(0 14px 18px rgba(0,0,0,.45)); }
        .document-stamp--b .document-stamp__mark { width: 200px; height: 200px; left: -133px; top: 103px; }
        .document-stamp__mark canvas, .document-stamp__body canvas { display: block; width: 100%; height: 100%; }
        .document-stamp__visa { position: absolute; width: 260px; height: 164px; left: -130px; top: -82px; opacity: 0; }
        @media (max-width: 1023px) { .document-stamp--a { left: 50%; top: 62%; } .document-stamp--b { left: 50%; top: 40%; } }
      `}</style>
      <div ref={rootA} className="document-stamp document-stamp--a" aria-hidden="true">
        <div ref={markA} className="document-stamp__mark"><canvas ref={markCanvasA} /></div>
        <div ref={bodyA} className="document-stamp__body"><canvas ref={bodyCanvasA} /></div>
      </div>
      <div ref={rootB} className="document-stamp document-stamp--b" aria-hidden="true">
        <canvas ref={visaB} className="document-stamp__visa" />
        <div ref={markB} className="document-stamp__mark"><canvas ref={markCanvasB} /></div>
      </div>
    </>
  );
}
