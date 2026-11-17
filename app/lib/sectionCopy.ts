// Set to false to restore section copy and CTAs without changing the scene.
export const HIDE_SECTION_COPY = true;

export const sectionCopyProps = {
  "data-section-copy-hidden": HIDE_SECTION_COPY ? "true" : undefined,
  "aria-hidden": HIDE_SECTION_COPY ? true : undefined,
  inert: HIDE_SECTION_COPY ? true : undefined,
} as const;
