"use client";

import { useEffect, useRef } from "react";

// Плаваюча CTA: закріплена справа знизу. Ховається, коли на екрані є «рідна» CTA (hero або footer).
export default function FloatingCta() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.dataset.side = "right";
    el.classList.add("is-shown");

    const anchors = Array.from(document.querySelectorAll<HTMLElement>("[data-cta-anchor]"));
    const onScreen = new Set<Element>(anchors);
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) onScreen.add(e.target);
        else onScreen.delete(e.target);
      }
      el.classList.toggle("is-visible", onScreen.size === 0);
    });
    anchors.forEach((a) => io.observe(a));

    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="floating-cta">
      <a
        className="btn t-16 t-14@xs t-16@sm t-ls-0.025 t-600 t-uppercase"
        aria-label="Book Appointment"
        href="#"
        target="_blank"
        rel="noopener"
      >
        <span className="btn__text pointer-events-none">Book Appointment</span>
        <div className="btn__hover pointer-events-none" aria-hidden="true"></div>
      </a>
    </div>
  );
}
