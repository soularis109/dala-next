"use client";

import { useEffect, useRef } from "react";
import { drawCheckMark, drawStampMark } from "./mosaic";

// Light champagne ink: the section is dark, so a navy imprint (or multiply blending) would disappear.
const INK = "#d6be93";

// Mosaic mark for an investor card: the round "OK" stamp imprint or a check mark, drawn from the same squares as the
// hero document.
export default function InvestorMark({ variant, seed }: { variant: "stamp" | "check"; seed: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (variant === "stamp") drawStampMark(ref.current, INK);
    else drawCheckMark(ref.current, INK, 5 + seed);
  }, [variant, seed]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ display: "block", width: "100%", height: "100%", transform: `rotate(${seed % 2 ? 8 : -12}deg)` }}
    />
  );
}
