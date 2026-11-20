"use client";

import { useEffect } from "react";

type Line = { l: number; r: number; t: number; b: number };

/** Soft edge (SVG blur stdDeviation), px. */
const SOFT = 3;
/** Trim the line box down to the glyphs: top / bottom inset × font-size. */
const TRIM_TOP = 0.2;
const TRIM_BOTTOM = 0.14;

/** Box of every rendered text line inside `el`, relative to its top-left corner. */
function lines(el: HTMLElement, box: DOMRect): Line[] {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  const out: Line[] = [];
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (!n.textContent?.trim()) continue;
    range.selectNodeContents(n);
    for (const r of range.getClientRects()) {
      if (!r.width || !r.height) continue;
      const rect = { l: r.left - box.left, r: r.right - box.left, t: r.top - box.top, b: r.bottom - box.top };
      const mid = (rect.t + rect.b) / 2;
      // fragments on the same line (split words/spans) merge into one box
      const same = out.find((x) => mid > x.t && mid < x.b);
      if (same) {
        same.l = Math.min(same.l, rect.l);
        same.r = Math.max(same.r, rect.r);
        same.t = Math.min(same.t, rect.t);
        same.b = Math.max(same.b, rect.b);
      } else out.push(rect);
    }
  }
  return out;
}

function measure(el: HTMLElement) {
  const box = el.getBoundingClientRect();
  if (!box.width || !box.height) return;
  const ls = lines(el, box);
  if (!ls.length) return;
  const fs = parseFloat(getComputedStyle(el).fontSize);
  const top = fs * TRIM_TOP;
  const bottom = fs * TRIM_BOTTOM;
  const pad = Math.ceil(SOFT * 2);
  const W = box.width;
  const H = box.height + pad * 2;
  const rects = ls
    .map((x) => {
      const l = Math.max(0, x.l);
      const w = Math.min(W, x.r) - l;
      return `<rect x='${l.toFixed(1)}' y='${(x.t + pad + top).toFixed(1)}' width='${w.toFixed(1)}' height='${Math.max(1, x.b - x.t - top - bottom).toFixed(1)}'/>`;
    })
    .join("");
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='${W.toFixed(1)}' height='${H.toFixed(1)}' viewBox='0 0 ${W.toFixed(1)} ${H.toFixed(1)}'>` +
    `<filter id='s' x='-10%' y='-50%' width='120%' height='200%'><feGaussianBlur stdDeviation='${SOFT}'/></filter>` +
    `<g filter='url(#s)'>${rects}</g></svg>`;
  el.style.setProperty("--tb-pad", `${pad}px`);
  el.style.setProperty("--tb-mask", `url("data:image/svg+xml,${encodeURIComponent(svg)}")`);
}

/** Sizes the `.text-blur` backdrop to each text line without touching layout. */
export default function TextBlurSizer() {
  useEffect(() => {
    const els = () => Array.from(document.querySelectorAll<HTMLElement>(".text-blur"));
    const all = () => els().forEach(measure);
    const timers: number[] = [];

    // Split-text intro animations rotate lines in; re-measure once they settle.
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target as HTMLElement;
        measure(el);
        timers.push(window.setTimeout(() => measure(el), 1200), window.setTimeout(() => measure(el), 2600));
      }
    });
    els().forEach((el) => io.observe(el));

    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(all);
    };
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(all);
    timers.push(window.setTimeout(all, 1500), window.setTimeout(all, 4000));

    return () => {
      io.disconnect();
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, []);
  return null;
}
