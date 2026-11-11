"use client";

import { useEffect, useState } from "react";

type FolderVariant = "a" | "b" | "c";

declare global {
  interface Window {
    __DALA_FOLDER_VARIANT__?: FolderVariant;
  }
}

const VARIANTS: { value: FolderVariant; label: string; title: string }[] = [
  { value: "a", label: "A", title: "Переворот" },
  { value: "b", label: "B", title: "Розліт" },
  { value: "c", label: "C", title: "Під’їзд" },
];

function normalize(value: string | null | undefined): FolderVariant {
  return value === "b" || value === "c" ? value : "a";
}

function publish(value: FolderVariant, updateUrl = true) {
  window.__DALA_FOLDER_VARIANT__ = value;
  if (updateUrl) {
    const url = new URL(window.location.href);
    url.searchParams.set("folder", value);
    window.history.replaceState(window.history.state, "", url);
  }
  window.dispatchEvent(new CustomEvent("dala:folder-variant", { detail: value }));
}

export default function FolderVariantToggle() {
  const [variant, setVariant] = useState<FolderVariant>("a");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const initial = normalize(new URLSearchParams(window.location.search).get("folder"));
    const onVariant = (event: Event) => {
      const value = normalize((event as CustomEvent<string>).detail);
      setVariant(value);
    };
    const onPopState = () => {
      const value = normalize(new URLSearchParams(window.location.search).get("folder"));
      setVariant(value);
      publish(value, false);
    };
    window.addEventListener("dala:folder-variant", onVariant);
    window.addEventListener("popstate", onPopState);
    const initialRaf = window.requestAnimationFrame(() => {
      setVariant(initial);
      publish(initial, false);
    });

    let raf = 0;
    const updateVisibility = () => {
      const footer = document.querySelector<HTMLElement>(".footer");
      if (footer) {
        const rect = footer.getBoundingClientRect();
        const next = rect.top < window.innerHeight * 0.9 && rect.bottom > window.innerHeight * 0.1;
        setVisible((current) => (current === next ? current : next));
      }
      raf = window.requestAnimationFrame(updateVisibility);
    };
    raf = window.requestAnimationFrame(updateVisibility);

    return () => {
      window.cancelAnimationFrame(initialRaf);
      window.cancelAnimationFrame(raf);
      window.removeEventListener("dala:folder-variant", onVariant);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="folder-variant-toggle" role="group" aria-label="Варіант анімації папки">
      <span className="folder-variant-toggle__caption" aria-hidden="true">
        Folder
      </span>
      {VARIANTS.map((item) => (
        <button
          className="folder-variant-toggle__button"
          type="button"
          aria-label={`${item.label}: ${item.title}`}
          aria-pressed={variant === item.value}
          title={item.title}
          onClick={() => {
            setVariant(item.value);
            publish(item.value);
          }}
          key={item.value}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
