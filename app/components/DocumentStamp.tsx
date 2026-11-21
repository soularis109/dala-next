"use client";

import { useEffect, useRef } from "react";
import { AMBER, BODY, FOLD, FONT, LIGHT, LILAC, PAPER, TEAL, TEXT, TITLE, VIOLET, buildStampMark, cellMaker, clamp255, drawLogoMark, makeRng, mix, paintMosaic, renderMosaic, rgb } from "./mosaic";
import type { Cell, Hover, Mosaic } from "./mosaic";

// Scene A: the stamp on the earlier document ("Spark lightbulb moments"), a pure function of the scroll
// progress published by the engine (window.__siteProgress), so scrolling back reverses it exactly.
// The stamp is timer-driven: it only comes down once the scroll has arrived at the stop of this stage ("Spark lightbulb
// moments" centred, p ~4.167 in ScrollSnap.tsx) and the text is in place, plays for STAMP_SECONDS and rewinds when
// scrolling back.  Only the scatter at the end (4.5-5) is a function of the scroll progress.
const P = { arrive: 4.16, scatter: 4.5, scatterEnd: 5 };
const STAMP_SECONDS = 1.5;
const S = { approach: 0.35, press: 0.5, pressEnd: 0.6, lift: 1, inkStart: 0.5 }; // fractions of STAMP_SECONDS

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
// Returns the matrix (a, b, c, d, e, f), or null when the engine is not there (yet): the caller then keeps the plain CSS position.
type Mat = [number, number, number, number, number, number];
function glueToSheet(el: HTMLElement, uv: number[], hx: number, hy: number, tilt: number, hpx: number, hpy: number, post = ""): Mat | null {
  const project = (window as unknown as { __siteProject?: Project }).__siteProject;
  const c = project?.(...sheetPoint(uv, 0, 0, tilt));
  const px = project?.(...sheetPoint(uv, hx, 0, tilt));
  const py = project?.(...sheetPoint(uv, 0, hy, tilt));
  if (!c || !px || !py) {
    el.style.transform = "";
    el.style.left = "";
    el.style.top = "";
    el.style.transformOrigin = "";
    return null;
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
  return [a, b, cc, d, c[0], c[1]];
}

// ---- the hover motion of the particles, on the squares of the glued canvases ----
// Same formula as the vertex shader (tn in legacy/2601.cjs): within 1.25 + |max(delta)| world units of the cursor a square
// sways by sin / cos(time * r1) * (r2 * 0.35 + delta) sheet units and grows (scale += 0.75 * dist on a base of ~0.51).
type HoverState = { mouse: number[]; delta: number[]; time: number; explode: number; half: number[] };
const GROW = 0.75 / ((84 / 255) * 1.55);

// `m`: the glue matrix (element px -> screen px), `unit`: element px per sheet unit, `rot`: the CSS rotation of the
// canvas about the glue origin (rad), `size` / `origin`: the canvas box in element px and where the glue origin sits in it.
function sheetHover(st: HoverState, m: Mat, unit: number, rot: number, mosaic: Mosaic, size: number[], origin: number[]): Hover | null {
  const [a, b, c, d, e, f] = m;
  const W = window.innerWidth;
  const H = window.innerHeight;
  const mx = (st.mouse[0] * 0.5 + 0.5) * W;
  const my = (0.5 - st.mouse[1] * 0.5) * H;
  const kx = (2 / W) * st.half[0]; // world units per screen px
  const ky = (2 / H) * st.half[1];
  const R = 1.25 + Math.abs(Math.max(st.delta[0], st.delta[1]));
  const amp = Math.abs(st.explode - 1);
  const sx = size[0] / mosaic.w;
  const sy = size[1] / mosaic.h;
  const cr = Math.cos(rot);
  const sr = Math.sin(rot);
  const toScreen = (x: number, y: number) => {
    const qx = x * sx - origin[0];
    const qy = y * sy - origin[1];
    const rx = cr * qx - sr * qy;
    const ry = sr * qx + cr * qy;
    return [a * rx + c * ry + e, b * rx + d * ry + f];
  };
  // quick reject: the cursor zone does not reach the canvas at all
  const corners = [toScreen(0, 0), toScreen(mosaic.w, 0), toScreen(0, mosaic.h), toScreen(mosaic.w, mosaic.h)];
  const cx = corners.reduce((s, p) => s + p[0], 0) / 4;
  const cy = corners.reduce((s, p) => s + p[1], 0) / 4;
  const reach = Math.max(...corners.map((p) => Math.hypot((p[0] - cx) * kx, (p[1] - cy) * ky)));
  if (amp <= 0 || Math.hypot((mx - cx) * kx, (my - cy) * ky) > R + reach) return null;
  return (x, y, r1, r2) => {
    const p = toScreen(x, y);
    const dist01 = Math.hypot((p[0] - mx) * kx, (p[1] - my) * ky);
    if (dist01 >= R) return null;
    const t = 1 - dist01 / R;
    const dist = t * t * (3 - 2 * t) * amp;
    // sheet units (y up) -> rotated element px (y down) -> canvas px
    const ux = dist * Math.sin(st.time * r1) * (r2 * 0.35 + st.delta[0]) * unit;
    const uy = -dist * Math.cos(st.time * r1) * (r2 * 0.35 + st.delta[1]) * unit;
    return [(cr * ux + sr * uy) / sx, (-sr * ux + cr * uy) / sy, 1 + GROW * dist];
  };
}

// Keeps one glued canvas in step with the cursor: redraws while the cursor is over it, once more when it leaves.
type Live = { ctx: CanvasRenderingContext2D | null; mosaic: Mosaic | null; moving: boolean };
function updateLive(live: Live, hover: Hover | null) {
  if (!live.ctx || !live.mosaic) return;
  if (hover) {
    renderMosaic(live.ctx, live.mosaic, hover);
    live.moving = true;
  } else if (live.moving) {
    renderMosaic(live.ctx, live.mosaic);
    live.moving = false;
  }
}

// ---- visa drawn as a grainy mosaic, in the same palette as the document particles ----
const CELL = 6;
const COLS = 54;
const ROWS = 34;

function buildVisa(): Mosaic {
  const W = COLS * CELL;
  const H = ROWS * CELL;
  const cells: Cell[] = [];
  const add = cellMaker(cells, 7);
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
      add(col * CELL + (rnd() - 0.5) * j, row * CELL + (rnd() - 0.5) * j, s, rgb(color));
    }
  }
  return { w: W, h: H, cells };
}

// The stamp body (handle, collar, barrel, rubber pad) built from the same squares as the document.
function buildStampBody(): Mosaic {
  const SC = 5;
  const COLS_B = 26;
  const ROWS_B = 34;
  const cells: Cell[] = [];
  const add = cellMaker(cells, 11);
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
      add(col * SC + (rnd() - 0.5) * j, row * SC + (rnd() - 0.5) * j, size, rgb(color));
    }
  }
  return { w: COLS_B * SC, h: ROWS_B * SC, cells };
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
    const liveA: Live = { ctx: null, mosaic: null, moving: false };
    const liveMarkB: Live = { ctx: null, mosaic: null, moving: false };
    const liveVisa: Live = { ctx: null, mosaic: null, moving: false };
    if (visaB.current) {
      liveVisa.mosaic = buildVisa();
      liveVisa.ctx = paintMosaic(visaB.current, liveVisa.mosaic);
    }
    if (bodyCanvasA.current) paintMosaic(bodyCanvasA.current, buildStampBody());
    if (markCanvasA.current) {
      liveA.mosaic = buildStampMark();
      liveA.ctx = paintMosaic(markCanvasA.current, liveA.mosaic);
    }
    if (markCanvasB.current) drawLogoMark(markCanvasB.current, "/images/FMB%20logo%20transparent.png", (m, ctx) => {
      liveMarkB.mosaic = m;
      liveMarkB.ctx = ctx;
    });
    const hoverState = () => (window as unknown as { __siteHover?: () => HoverState | null }).__siteHover?.() ?? null;
    const MARK_ROT = (-12 * Math.PI) / 180;
    let raf = 0;
    let aA = 0;
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

      // scene A (earlier document): timer-driven, starts when the stage has arrived at its stop
      const targetA = p >= P.arrive ? 1 : 0;
      if (aA !== targetA) {
        const step = dt / STAMP_SECONDS;
        aA = targetA > aA ? Math.min(targetA, aA + step) : Math.max(targetA, aA - step);
      }
      const visibleA = p > P.arrive - 0.3 && p < P.scatterEnd && (aA > 0 || p >= P.arrive);
      if (rootA.current) rootA.current.style.display = visibleA ? "block" : "none";
      if (visibleA) {
        const approach = smooth(aA, 0, S.approach);
        const press = smooth(aA, S.approach, S.press);
        const lift = smooth(aA, S.pressEnd, S.lift);
        const ink = smooth(aA, S.inkStart, S.pressEnd) * (1 - smooth(p, P.scatter, P.scatterEnd));
        lower(bodyA.current, markA.current, approach, press, lift, ink);
        // Every frame (the document keeps easing after the scroll stops): glue the stamp to its spot on the sheet, in the
        // plane of the sheet, so it keeps the tilt of the document and travels, turns and scatters with it.
        const mA = rootA.current && glueToSheet(rootA.current, STAMP_UV, STAMP_HALF, STAMP_HALF, DOC_TILT, MARK_HALF_PX, MARK_HALF_PX);
        // the imprint is part of the sheet once it is inked: its squares sway under the cursor like the sheet's
        const st = mA && ink > 0.01 ? hoverState() : null;
        updateLive(liveA, st && mA && liveA.mosaic ? sheetHover(st, mA, MARK_HALF_PX / STAMP_HALF, MARK_ROT, liveA.mosaic, [190, 190], [95, 95]) : null);
      } else updateLive(liveA, null);

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
        const mVisa = visaB.current && glueToSheet(visaB.current, VISA_UV, VISA_HALF_X, (VISA_HALF_X * VISA_PX[1]) / VISA_PX[0], FINAL_TILT, VISA_PX[0], VISA_PX[1], `translate(${-VISA_PX[0]}px, ${-VISA_PX[1]}px)`);
        const mMark = markB.current && glueToSheet(markB.current, FINAL_MARK_UV, FINAL_MARK_HALF, FINAL_MARK_HALF, FINAL_TILT, FINAL_MARK_PX, FINAL_MARK_PX, `rotate(-12deg) translate(${-FINAL_MARK_PX}px, ${-FINAL_MARK_PX}px)`);
        const glued = Boolean(mVisa && mMark);
        // visa and imprint sway under the cursor with the squares of the sheet they lie on
        const st = hoverState();
        updateLive(liveVisa, st && mVisa && liveVisa.mosaic && a > E.visaIn ? sheetHover(st, mVisa, VISA_PX[0] / VISA_HALF_X, 0, liveVisa.mosaic, [VISA_PX[0] * 2, VISA_PX[1] * 2], VISA_PX) : null);
        updateLive(liveMarkB, st && mMark && liveMarkB.mosaic && p > B.inkStart ? sheetHover(st, mMark, FINAL_MARK_PX / FINAL_MARK_HALF, MARK_ROT, liveMarkB.mosaic, [FINAL_MARK_PX * 2, FINAL_MARK_PX * 2], [FINAL_MARK_PX, FINAL_MARK_PX]) : null);
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
        .document-stamp--b { left: 25%; top: 37.5%; z-index: -1; } /* on the sheet, under the footer copy */
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
