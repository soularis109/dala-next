export type FinaleMode = "folder" | "document";

declare global {
  interface Window {
    __DALA_FINALE_MODE__?: FinaleMode;
  }
}

export function normalizeFinaleMode(value: string | null | undefined): FinaleMode {
  return value === "document" ? "document" : "folder";
}

export function publishFinaleMode(value: FinaleMode, updateUrl = true) {
  const mode = normalizeFinaleMode(value);
  window.__DALA_FINALE_MODE__ = mode;
  if (updateUrl) {
    const url = new URL(window.location.href);
    url.searchParams.set("finale", mode);
    window.history.replaceState(window.history.state, "", url);
  }
  window.dispatchEvent(new CustomEvent("dala:finale-mode", { detail: mode }));
}
