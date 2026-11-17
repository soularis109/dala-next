"use client";

import { useEffect, useRef } from "react";

// Scene A: the stamp on the earlier document ("Spark lightbulb moments"), a pure function of the scroll
// progress published by the engine (window.__dalaProgress), so scrolling back reverses it exactly.
const P = { approach: 3.95, press: 4.1, pressEnd: 4.18, lift: 4.3, inkStart: 4.12, scatter: 4.5, scatterEnd: 5 };

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

// ---- visa drawn as a grainy mosaic, in the same palette as the document particles ----
const CELL = 6;
const COLS = 54;
const ROWS = 34;
const hexc = (s: string): [number, number, number] => [1, 3, 5].map((i) => parseInt(s.slice(i, i + 2), 16)) as [number, number, number];
const BODY = hexc("#c8c8cc");
const TITLE = hexc("#6a4de8");
const TEXT = hexc("#55555b");
const VIOLET = hexc("#7c5cff");
const TEAL = hexc("#2fbf9f");
const AMBER = hexc("#e8a13a");
const LILAC = hexc("#c9b6ff");
const FOLD: [number, number, number] = [150, 150, 156];
const LIGHT = hexc("#ececf0");
const FONT: Record<string, string[]> = {
  V: ["10001", "10001", "10001", "10001", "10001", "01010", "00100"],
  I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
};

function drawVisa(canvas: HTMLCanvasElement) {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const W = COLS * CELL;
  const H = ROWS * CELL;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.scale(dpr, dpr);
  let seed = 7;
  const rnd = () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const jit = (c: number[], a: number) => {
    const d = (rnd() - 0.5) * 2 * a;
    return c.map((v) => Math.max(0, Math.min(255, v + d)));
  };
  const mix = (a: number[], b: number[], t: number) => a.map((v, i) => v * (1 - t) + b[i] * t);
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
      let color: number[] = jit(BODY, 20);
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

const STAMP_MARK = (id: string) => (
  <svg viewBox="0 0 200 200" width="100%" height="100%">
    <defs>
      <path id={id} d="M 30 100 A 70 70 0 1 1 170 100 A 70 70 0 1 1 30 100" />
    </defs>
    <g fill="none" stroke="#2c2370" strokeWidth="6" opacity="0.9">
      <circle cx="100" cy="100" r="88" />
      <circle cx="100" cy="100" r="76" strokeWidth="2.5" />
      <circle cx="100" cy="100" r="46" strokeWidth="2.5" />
    </g>
    <text fill="#2c2370" fontSize="15" fontWeight="700" letterSpacing="2.5" textAnchor="middle" opacity="0.9">
      <textPath href={`#${id}`} startOffset="50%">APPROVED · DALA · APPROVED · DALA ·</textPath>
    </text>
    <path d="M 76 102 L 94 120 L 126 82" fill="none" stroke="#2c2370" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
  </svg>
);

const STAMP_BODY = (
  <svg viewBox="0 0 200 260" width="100%" height="100%">
    <rect x="72" y="0" width="56" height="86" rx="26" fill="#3a2f9a" />
    <rect x="72" y="0" width="56" height="86" rx="26" fill="url(#stamp-shine)" />
    <rect x="30" y="86" width="140" height="22" rx="8" fill="#5b4de0" />
    <rect x="22" y="108" width="156" height="120" rx="18" fill="#2a2275" />
    <ellipse cx="100" cy="228" rx="78" ry="14" fill="#14103f" />
    <defs>
      <linearGradient id="stamp-shine" x1="0" x2="1">
        <stop offset="0" stopColor="#fff" stopOpacity="0.25" />
        <stop offset="0.4" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

export default function DocumentStamp() {
  const rootA = useRef<HTMLDivElement>(null);
  const bodyA = useRef<HTMLDivElement>(null);
  const markA = useRef<HTMLDivElement>(null);
  const rootB = useRef<HTMLDivElement>(null);
  const markB = useRef<HTMLDivElement>(null);
  const visaB = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (visaB.current) drawVisa(visaB.current);
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
      const p: number = (window as unknown as { __dalaProgress?: number }).__dalaProgress ?? 0;

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

      // scene B (last document): imprint follows the scroll, the visa is timer-driven and rewinds
      const target = p >= END_P ? 1 : 0;
      if (a !== target) {
        const step = dt / END_SECONDS;
        a = target > a ? Math.min(target, a + step) : Math.max(target, a - step);
      }
      if (rootB.current) rootB.current.style.display = p > B.show ? "block" : "none";
      if (markB.current) markB.current.style.opacity = String(smooth(p, B.inkStart, B.inkEnd));
      if (visaB.current) {
        const visaIn = smooth(a, E.visaIn, E.visaInEnd);
        visaB.current.style.opacity = String(visaIn);
        visaB.current.style.transform = `scale(${1.22 - 0.22 * visaIn})`;
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <style>{`
        .document-stamp { display: none; position: fixed; width: 0; height: 0; z-index: 5; pointer-events: none; }
        .document-stamp--a { left: 35%; top: 80%; }
        .document-stamp--b { left: 47%; top: 37.5%; }
        .document-stamp__mark { position: absolute; width: 190px; height: 190px; left: -95px; top: -95px; opacity: 0; transform: rotate(-12deg); mix-blend-mode: multiply; }
        .document-stamp__body { position: absolute; width: 130px; height: 169px; left: -65px; top: -150px; opacity: 0; transform-origin: 50% 100%; filter: drop-shadow(0 14px 18px rgba(0,0,0,.45)); }
        .document-stamp--b .document-stamp__mark { width: 165px; height: 165px; left: -133px; top: 103px; }
        .document-stamp__visa { position: absolute; width: 260px; height: 164px; left: -130px; top: -82px; opacity: 0; filter: drop-shadow(0 0 18px rgba(255,255,255,.22)) drop-shadow(0 12px 22px rgba(0,0,0,.45)); }
        @media (max-width: 1023px) { .document-stamp--a { left: 50%; top: 62%; } .document-stamp--b { left: 50%; top: 40%; } }
      `}</style>
      <div ref={rootA} className="document-stamp document-stamp--a" aria-hidden="true">
        <div ref={markA} className="document-stamp__mark">{STAMP_MARK("stamp-arc-a")}</div>
        <div ref={bodyA} className="document-stamp__body">{STAMP_BODY}</div>
      </div>
      <div ref={rootB} className="document-stamp document-stamp--b" aria-hidden="true">
        <canvas ref={visaB} className="document-stamp__visa" />
        <div ref={markB} className="document-stamp__mark">{STAMP_MARK("stamp-arc-b")}</div>
      </div>
    </>
  );
}
