"use client";

import { useEffect } from "react";

let started = false;

export default function ScriptLoader() {
  useEffect(() => {
    if (started) return; // захист від подвійного ефекту в StrictMode
    started = true;
    // Розпаковані модулі оригінального бандла (legacy/) збираються Next як звичайні модулі.
    import("../legacy/entry.cjs").then(() => {
      // theme.js ініціалізується на DOMContentLoaded, який уже відбувся.
      window.dispatchEvent(new Event("DOMContentLoaded"));
    });
  }, []);
  return null;
}
