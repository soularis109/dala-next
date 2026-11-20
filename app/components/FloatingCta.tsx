"use client";

import { useEffect, useRef } from "react";

type Side = "left" | "right" | "center";

const READ_EVERY = 120; // мс між вимірюваннями
const SETTLE = 250; // скільки новий бік має протриматись, перш ніж переїхати
const FADE = 250; // має збігатися з transition opacity у CSS
const LOCK_P = 5; // кінець розльоту документа з печаткою (P.scatterEnd у DocumentStamp)

const smooth = (t: number) => {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
};

// Плаваюча CTA. Ховається, коли на екрані є «рідна» CTA (hero або footer),
// а в решті секцій стоїть у нижньому куті на тому боці, де текст, а не анімація.
// Після розльоту документа з печаткою — завжди знизу по центру, а перед футером перелітає в його кнопку.
export default function FloatingCta() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 1. Ховатися біля hero та footer
    const anchors = Array.from(document.querySelectorAll<HTMLElement>("[data-cta-anchor]"));
    const footerAnchor = anchors.find((a) => a.closest(".footer")) ?? null;
    const onScreen = new Set<Element>(anchors);
    let locked = false;
    const updateVisible = () => {
      // у режимі «центр» футер не ховає кнопку: його робота — переліт
      const n = locked && footerAnchor && onScreen.has(footerAnchor) ? onScreen.size - 1 : onScreen.size;
      el.classList.toggle("is-visible", n === 0);
    };
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) onScreen.add(e.target);
        else onScreen.delete(e.target);
      }
      updateVisible();
    });
    anchors.forEach((a) => io.observe(a));

    // 3. Переліт у кнопку футера
    const btn = el.querySelector<HTMLElement>(".btn");
    const target = document.querySelector<HTMLElement>("[data-cta-target]");
    let merging = false;
    const resetMerge = () => {
      if (!merging) return;
      merging = false;
      if (btn) {
        btn.style.transform = "";
        btn.style.boxShadow = "";
      }
      if (target) target.style.opacity = "";
      el.style.transition = "";
      el.classList.remove("is-merged");
    };
    const merge = () => {
      if (!btn || !target) return;
      merging = true;
      const vh = window.innerHeight;
      const rest = el.getBoundingClientRect(); // обгортка: на її бокс transform кнопки не впливає
      const fb = target.getBoundingClientRect();
      const dx = fb.left + fb.width / 2 - (rest.left + rest.width / 2);
      const dy = fb.top + fb.height / 2 - (rest.top + rest.height / 2);
      // переліт починається, коли кнопка футера виринає з-під нижнього краю, тож плаваюча не пірнає за екран
      const range = Math.max(1, vh + fb.height / 2 - (rest.top + rest.height / 2));
      const m = smooth(1 - dy / range);
      const done = m >= 1;
      const s = 1 + 0.06 * Math.sin(Math.PI * m);
      btn.style.transform = m > 0 ? `translate(${dx * m}px, ${dy * m}px) scale(${s})` : "";
      btn.style.boxShadow = m > 0 ? `0 8px 30px rgba(0,0,0,${0.25 * (1 - m)})` : "";
      el.style.transition = m > 0 ? "none" : ""; // підміна з кнопкою футера — миттєва, в обидва боки
      el.classList.toggle("is-merged", done);
      target.style.opacity = done ? "" : "0";
    };

    // 2. Бік тексту
    const texts = Array.from(document.querySelectorAll<HTMLElement>("[data-cta-text]"));
    let side: Side | null = null;
    let pending: Side | null = null;
    let pendingSince = 0;
    let lastRead = 0;
    let fadeTimer: number | undefined;
    let raf = 0;

    const detect = (): Side | null => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      let best: DOMRect | null = null;
      let bestVisible = 0;
      for (const t of texts) {
        const r = t.getBoundingClientRect();
        const visible = Math.min(r.bottom, vh) - Math.max(r.top, 0);
        if (visible > bestVisible && r.width > 0) {
          bestVisible = visible;
          best = r;
        }
      }
      if (!best) return null;
      if (best.width > vw * 0.6) return "center";
      return best.left + best.width / 2 < vw / 2 ? "left" : "right";
    };

    const apply = (next: Side) => {
      if (side === null) {
        side = next;
        el.dataset.side = next;
        el.classList.add("is-shown");
        return;
      }
      side = next;
      el.classList.remove("is-shown");
      window.clearTimeout(fadeTimer);
      fadeTimer = window.setTimeout(() => {
        el.dataset.side = next;
        el.classList.add("is-shown");
      }, FADE);
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const p: number = (window as unknown as { __siteProgress?: number }).__siteProgress ?? 0;
      const lock = p >= LOCK_P;
      if (lock !== locked) {
        locked = lock;
        updateVisible();
      }
      if (locked) merge();
      else resetMerge();

      if (now - lastRead < READ_EVERY) return;
      lastRead = now;

      if (locked) {
        pending = null;
        if (side !== "center") apply("center");
        return;
      }
      const next = detect();
      if (!next || next === side) {
        pending = null;
        return;
      }
      if (side === null) return apply(next);
      if (next !== pending) {
        pending = next;
        pendingSince = now;
      } else if (now - pendingSince >= SETTLE) {
        pending = null;
        apply(next);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(fadeTimer);
      resetMerge();
    };
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
