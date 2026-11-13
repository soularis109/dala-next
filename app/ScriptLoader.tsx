"use client";

import { useEffect } from "react";

export default function ScriptLoader() {
  useEffect(() => {
    // The engine owns a document-wide promise; remounts reuse the same scene.
    import("../legacy/entry.cjs")
      .then(({ startDala }) => startDala())
      .catch((error: unknown) => console.error("Dala initialization failed", error));
  }, []);
  return null;
}
