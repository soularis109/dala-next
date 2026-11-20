"use client";

import { useEffect } from "react";

// Scrolling down goes stage by stage. Every stage ends with its text centred in the viewport. A stage that has a
// scroll-driven animation in it ("auto") is played by one wheel gesture; a stage without animation ("free") scrolls
// as before but stops at its text, so the next stage starts with a new gesture. Scrolling up is untouched: free.
//
// Animation thresholds (sectionProgress = section index + fraction through it) live in legacy/2601.cjs (particles),
// DocumentStamp.tsx (stamp 3.8-4.15, scene B 5.65-6) and FloatingCta.tsx (lock at 5).

// Autoplay speed: duration grows with the distance (in viewport heights), clamped.
const DURATION_BASE_MS = 1600;
const DURATION_PER_VH_MS = 900;
const DURATION_MIN_MS = 2000;
const DURATION_MAX_MS = 4200;

// A pause in wheel events longer than this starts a new gesture (swallows trackpad inertia of the previous one).
const GESTURE_GAP_MS = 180;
// Ignore sub-pixel differences when deciding whether a stop is ahead of the current target.
const EPS = 2;

type Ass = {
  currentPos: number;
  targetPos: number;
  scrollTo: (px: number, emit?: boolean) => void;
};

// A stop is a scroll position; `free` describes the stage that ends at it (the one coming from the previous stop).
type Stop = { px: number; free: boolean };

const getAss = (): Ass | undefined => (window as unknown as { __ass?: Ass }).__ass;

function stops(ass: Ass): Stop[] {
  const sections = Array.from(document.querySelectorAll<HTMLElement>(".js-section"));
  if (sections.length < 7) return [];

  const vh = window.innerHeight;
  const docTop = (r: DOMRect) => r.top + ass.currentPos;
  const boxes = sections.map((el) => {
    const r = el.getBoundingClientRect();
    return { top: docTop(r), height: r.height };
  });
  const last = boxes[boxes.length - 1];
  const maxScroll = Math.max(0, last.top + last.height - vh);

  // Scroll position that puts the box in the middle of the viewport.
  const centre = (top: number, bottom: number) => (top + bottom) / 2 - vh / 2;

  // Text block of a heading: its tallest ancestor inside the section that still fits in the viewport.
  const headingBlock = (h: HTMLElement, section: HTMLElement) => {
    let el: HTMLElement = h;
    while (el.parentElement && el.parentElement !== section && el.parentElement.getBoundingClientRect().height < vh * 1.05) {
      el = el.parentElement;
    }
    const r = el.getBoundingClientRect();
    return centre(docTop(r), docTop(r) + r.height);
  };
  const heading = (sectionIndex: number, nth = 0) => {
    const section = sections[sectionIndex];
    const h = section.querySelectorAll<HTMLElement>("h2")[nth];
    return h ? headingBlock(h, section) : undefined;
  };
  // Manifesto sub-blocks have no heading: centre the union of their paragraphs.
  const manifesto = Array.from(sections[2].querySelectorAll<HTMLElement>(".manifesto--introduction")).map((block) => {
    const rects = Array.from(block.querySelectorAll("p")).map((p) => p.getBoundingClientRect());
    if (!rects.length) return undefined;
    return centre(ass.currentPos + Math.min(...rects.map((r) => r.top)), ass.currentPos + Math.max(...rects.map((r) => r.bottom)));
  });

  const raw: Array<{ px: number | undefined; free?: boolean }> = [
    { px: 0 },
    { px: heading(1) }, // Introduction: sheet moves left and fills
    ...manifesto.map((px) => ({ px })), // scatter, turn, morph into streams
    { px: heading(3) }, // "Build a better world of work": streams fold into the document
    { px: heading(4) }, // "Spark lightbulb moments": stamp pressed and lifted (DocumentStamp.tsx P.lift = 4.15)
    { px: heading(5, 0) }, // "Our team": scatter after the stamp is done (~5.0)
    { px: heading(5, 1), free: true }, // "Our investors": no animation in between
    { px: maxScroll }, // footer: final sheet and scene B
  ];

  const result: Stop[] = [];
  for (const s of raw) {
    if (s.px === undefined) continue;
    const px = Math.max(0, Math.min(maxScroll, s.px));
    if (result.length && px <= result[result.length - 1].px + EPS) continue;
    result.push({ px, free: !!s.free });
  }
  return result;
}

const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

export default function ScrollSnap() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (reduceMotion || coarsePointer) return;

    let raf = 0;
    let playing = false;
    let lastWheelAt = 0;

    const stop = () => {
      cancelAnimationFrame(raf);
      playing = false;
    };

    const play = (ass: Ass, to: number) => {
      const from = ass.targetPos;
      const distanceVh = Math.abs(to - from) / window.innerHeight;
      const duration = Math.max(DURATION_MIN_MS, Math.min(DURATION_MAX_MS, DURATION_BASE_MS + DURATION_PER_VH_MS * distanceVh));
      const startedAt = performance.now();
      playing = true;

      const frame = (now: number) => {
        const t = Math.min(1, (now - startedAt) / duration);
        ass.scrollTo(from + (to - from) * easeInOutSine(t), false);
        if (t < 1) {
          raf = requestAnimationFrame(frame);
        } else {
          playing = false;
        }
      };
      raf = requestAnimationFrame(frame);
    };

    const loaderCovers = () => {
      const loader = document.querySelector<HTMLElement>(".js-site-loader");
      if (!loader) return false;
      const style = getComputedStyle(loader);
      return style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0";
    };

    const swallow = (e: WheelEvent) => {
      e.preventDefault();
      e.stopImmediatePropagation();
    };

    const onWheel = (e: WheelEvent) => {
      // Pinch-zoom and horizontal gestures (sliders) belong to the browser or the component, not to the page.
      if (e.ctrlKey || e.deltaY === 0 || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      const ass = getAss();
      if (!ass || loaderCovers()) return;

      const now = performance.now();
      const newGesture = now - lastWheelAt > GESTURE_GAP_MS;
      lastWheelAt = now;

      // Up: cancel any autoplay and let the engine scroll freely, exactly as before.
      if (e.deltaY < 0) {
        stop();
        return;
      }

      if (playing) return swallow(e);

      const pos = ass.targetPos;
      const next = stops(ass).find((s) => s.px > pos + EPS);
      if (!next) return swallow(e);

      if (next.free) {
        // No animation here: the engine scrolls as usual, but it stops at the text of this stage.
        if (pos + e.deltaY >= next.px) {
          swallow(e);
          ass.scrollTo(next.px, false);
        }
        return;
      }

      // Animated stage: one gesture plays all of it.
      swallow(e);
      if (newGesture) play(ass, next.px);
    };

    // Capture phase on window: runs before the engine's own wheel listener (also on window).
    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    return () => {
      window.removeEventListener("wheel", onWheel, { capture: true });
      stop();
    };
  }, []);

  return null;
}
