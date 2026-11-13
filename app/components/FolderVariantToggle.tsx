"use client";

import { useEffect, useState } from "react";
import { normalizeFinaleMode, publishFinaleMode, type FinaleMode } from "../lib/finaleControls";

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
  const [mode, setMode] = useState<FinaleMode>("folder");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const initial = normalize(new URLSearchParams(window.location.search).get("folder"));
    const onVariant = (event: Event) => {
      const value = normalize((event as CustomEvent<string>).detail);
      setVariant(value);
    };
    const onMode = (event: Event) => setMode(normalizeFinaleMode((event as CustomEvent<string>).detail));
    const onPopState = () => {
      publishFinaleMode(normalizeFinaleMode(new URLSearchParams(window.location.search).get("finale")), false);
      const value = normalize(new URLSearchParams(window.location.search).get("folder"));
      setVariant(value);
      publish(value, false);
    };
    window.addEventListener("dala:folder-variant", onVariant);
    window.addEventListener("dala:finale-mode", onMode);
    window.addEventListener("popstate", onPopState);
    const initialRaf = window.requestAnimationFrame(() => {
      publishFinaleMode(normalizeFinaleMode(new URLSearchParams(window.location.search).get("finale")), false);
      setVariant(initial);
      publish(initial, false);
    });

    let raf = 0;
    const updateVisibility = () => {
      const next = [...document.querySelectorAll<HTMLElement>(".js-team-section, .folder-finale-stage, .footer")]
        .some((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top < window.innerHeight * 0.9 && rect.bottom > window.innerHeight * 0.1;
        });
      setVisible((current) => (current === next ? current : next));
      const bar = document.querySelector<HTMLElement>(".footer__bar")?.getBoundingClientRect();
      const panel = document.querySelector<HTMLElement>(".folder-variant-toggle");
      const bottom = bar && bar.top >= 0 && bar.top < window.innerHeight && bar.bottom > 0
        ? `${window.innerHeight - bar.top + 12}px` : "5.75rem";
      if (panel && panel.style.getPropertyValue("--finale-control-bottom") !== bottom) {
        panel.style.setProperty("--finale-control-bottom", bottom);
      }
      raf = window.requestAnimationFrame(updateVisibility);
    };
    raf = window.requestAnimationFrame(updateVisibility);

    return () => {
      window.cancelAnimationFrame(initialRaf);
      window.cancelAnimationFrame(raf);
      window.removeEventListener("dala:folder-variant", onVariant);
      window.removeEventListener("dala:finale-mode", onMode);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="folder-variant-toggle">
      <div className="folder-variant-toggle__row" role="group" aria-label="Вигляд фіналу">
        {(["folder", "document"] as const).map((value) => (
          <button
            key={value}
            type="button"
            className="folder-variant-toggle__button folder-variant-toggle__mode"
            aria-pressed={mode === value}
            onClick={() => publishFinaleMode(value)}
          >
            {value === "folder" ? "Папка" : "Документ"}
          </button>
        ))}
      </div>
      {mode === "folder" && (
        <div className="folder-variant-toggle__row folder-variant-toggle__variants" role="group" aria-label="Варіант анімації папки">
          <span className="folder-variant-toggle__caption" aria-hidden="true">Folder</span>
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
      )}
    </div>
  );
}
